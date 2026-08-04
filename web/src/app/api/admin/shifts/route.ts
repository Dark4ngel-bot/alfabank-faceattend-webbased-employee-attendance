import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireOwner } from "@/lib/api-auth";

export const runtime = "nodejs";

type AllowedRole = "admin" | "owner";

const VIEW_ROLES: AllowedRole[] = ["admin", "owner"];
const MANAGE_ROLES: AllowedRole[] = ["admin", "owner"];

const defaultShifts = [
  {
    name: "UTAMA",
    tolerance_minutes: 5,
    start_time: "08:00",
    end_time: "17:00",
    check_in_open: "07:00",
    check_out_open: "16:50",
    status: "active",
  },
  {
    name: "MAGANG",
    tolerance_minutes: 0,
    start_time: "08:00",
    end_time: "17:00",
    check_in_open: "07:00",
    check_out_open: "16:50",
    status: "active",
  },
  {
    name: "SHIFT PAGI",
    tolerance_minutes: 5,
    start_time: "07:30",
    end_time: "15:30",
    check_in_open: "06:30",
    check_out_open: "15:20",
    status: "active",
  },
  {
    name: "SHIFT SIANG",
    tolerance_minutes: 5,
    start_time: "13:00",
    end_time: "21:00",
    check_in_open: "11:00",
    check_out_open: "20:50",
    status: "active",
  },
];

function getCurrentUser(req: NextRequest) {
  return requireOwner(req);
}

function sortShifts<T extends { name: string }>(shifts: T[]) {
  const order = ["UTAMA", "MAGANG", "SHIFT PAGI", "SHIFT SIANG"];

  return [...shifts].sort((a, b) => {
    const aIndex = order.indexOf(a.name.toUpperCase());
    const bIndex = order.indexOf(b.name.toUpperCase());

    if (aIndex === -1 && bIndex === -1) {
      return a.name.localeCompare(b.name);
    }

    if (aIndex === -1) return 1;
    if (bIndex === -1) return -1;

    return aIndex - bIndex;
  });
}

async function ensureDefaultShifts() {
  await Promise.all(
    defaultShifts.map((shift) =>
      prisma.shift.upsert({
        where: {
          name: shift.name,
        },
        update: {},
        create: shift,
      }),
    ),
  );
}

export async function GET(req: NextRequest) {
  try {
    const currentUser = await getCurrentUser(req);

    if (
      currentUser.status !== "active" ||
      !VIEW_ROLES.includes(currentUser.role as AllowedRole)
    ) {
      return NextResponse.json(
        { message: "Akses ditolak." },
        { status: 403 },
      );
    }

    await ensureDefaultShifts();

    const shifts = await prisma.shift.findMany({
      select: {
        id: true,
        name: true,
        tolerance_minutes: true,
        start_time: true,
        end_time: true,
        check_in_open: true,
        check_out_open: true,
        status: true,
        _count: {
          select: {
            users: true,
            work_schedules: true,
          },
        },
      },
    });

    return NextResponse.json({
      shifts: sortShifts(shifts),
    });
  } catch (error) {
    console.error("GET /api/admin/shifts error:", error);

    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Gagal mengambil data shift.",
      },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const currentUser = await getCurrentUser(req);

    if (
      currentUser.status !== "active" ||
      !MANAGE_ROLES.includes(currentUser.role as AllowedRole)
    ) {
      return NextResponse.json(
        { message: "Akses ditolak." },
        { status: 403 },
      );
    }

    const body = await req.json();
    const name = String(body.name || "").trim();
    const status = String(body.status || "active");

    if (!name) {
      return NextResponse.json(
        { message: "Nama shift wajib diisi." },
        { status: 400 },
      );
    }

    const shift = await prisma.shift.create({
      data: {
        name,
        status,
        tolerance_minutes: 5,
        start_time: "08:00",
        end_time: "17:00",
        check_in_open: "07:00",
        check_out_open: "16:50",
      },
    });

    return NextResponse.json({
      message: "Shift berhasil ditambahkan.",
      shift,
    });
  } catch (error) {
    console.error("POST /api/admin/shifts error:", error);

    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Gagal menambahkan shift.",
      },
      { status: 500 },
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const currentUser = await getCurrentUser(req);

    if (
      currentUser.status !== "active" ||
      !MANAGE_ROLES.includes(currentUser.role as AllowedRole)
    ) {
      return NextResponse.json(
        { message: "Akses ditolak. Hanya admin yang dapat mengubah shift." },
        { status: 403 },
      );
    }

    const body = await req.json();

    const id = String(body.id || "");
    const name = body.name !== undefined ? String(body.name || "").trim() : undefined;
    const toleranceMinutes = body.tolerance_minutes !== undefined ? Number(body.tolerance_minutes) : undefined;
    const startTime = body.start_time !== undefined ? String(body.start_time) : undefined;
    const endTime = body.end_time !== undefined ? String(body.end_time) : undefined;
    const checkInOpen = body.check_in_open !== undefined ? String(body.check_in_open) : undefined;
    const checkOutOpen = body.check_out_open !== undefined ? String(body.check_out_open) : undefined;
    const status = body.status !== undefined ? String(body.status) : undefined;

    if (!id) {
      return NextResponse.json(
        { message: "ID shift wajib dikirim." },
        { status: 400 },
      );
    }

    if (toleranceMinutes !== undefined && (Number.isNaN(toleranceMinutes) || toleranceMinutes < 0)) {
      return NextResponse.json(
        { message: "Toleransi telat tidak valid." },
        { status: 400 },
      );
    }

    if (status !== undefined && !["active", "inactive"].includes(status)) {
      return NextResponse.json(
        { message: "Status shift hanya boleh active atau inactive." },
        { status: 400 },
      );
    }

    const existingShift = await prisma.shift.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!existingShift) {
      return NextResponse.json(
        { message: "Shift tidak ditemukan." },
        { status: 404 },
      );
    }

    const updateData: Record<string, unknown> = {};
    if (name !== undefined) updateData.name = name;
    if (toleranceMinutes !== undefined) updateData.tolerance_minutes = toleranceMinutes;
    if (startTime !== undefined) updateData.start_time = startTime;
    if (endTime !== undefined) updateData.end_time = endTime;
    if (checkInOpen !== undefined) updateData.check_in_open = checkInOpen;
    if (checkOutOpen !== undefined) updateData.check_out_open = checkOutOpen;
    if (status !== undefined) updateData.status = status;

    const shift = await prisma.shift.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        name: true,
        tolerance_minutes: true,
        start_time: true,
        end_time: true,
        check_in_open: true,
        check_out_open: true,
        status: true,
        created_at: true,
        updated_at: true,
      },
    });

    return NextResponse.json({
      message: "Shift berhasil diperbarui.",
      shift,
    });
  } catch (error) {
    console.error("PATCH /api/admin/shifts error:", error);

    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Gagal memperbarui data shift.",
      },
      { status: 500 },
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const currentUser = await getCurrentUser(req);

    if (
      currentUser.status !== "active" ||
      !MANAGE_ROLES.includes(currentUser.role as AllowedRole)
    ) {
      return NextResponse.json(
        { message: "Akses ditolak." },
        { status: 403 },
      );
    }

    const url = new URL(req.url);
    const id = url.searchParams.get("id") || "";

    if (!id) {
      return NextResponse.json(
        { message: "ID shift wajib dikirim." },
        { status: 400 },
      );
    }

    await prisma.shift.delete({
      where: { id },
    });

    return NextResponse.json({
      message: "Shift berhasil dihapus.",
    });
  } catch (error) {
    console.error("DELETE /api/admin/shifts error:", error);

    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Gagal menghapus shift.",
      },
      { status: 500 },
    );
  }
}
