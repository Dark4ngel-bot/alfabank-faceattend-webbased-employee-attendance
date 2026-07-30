import { prisma } from "../src/lib/prisma";

async function main() {
  try {
    const employees = await prisma.user.findMany({
      where: {
        role: "employee",
      },
      select: {
        id: true,
        employee_code: true,
        name: true,
        email: true,
        role: true,
        employee_type: true,
        phone: true,
        status: true,
        employment_status: true,
        employment_start_date: true,
        employment_end_date: true,
        birth_place: true,
        birth_date: true,
        bank_code: true,
        bank_account_number: true,
        nik: true,
        profile_photo: true,
        jabatan: {
          select: { id: true, name: true }
        },
        department: {
          select: { id: true, name: true }
        },
        position: {
          select: { id: true, name: true }
        },
        shift: {
          select: { id: true, name: true, tolerance_minutes: true }
        },
        registered_office: {
          select: { id: true, name: true, address: true }
        }
      },
      orderBy: {
        created_at: "desc",
      },
    });

    console.log("SUCCESS FETCHING EMPLOYEES:", employees.length);
    console.log(employees.slice(0, 3));
  } catch (error) {
    console.error("ERROR FETCHING EMPLOYEES:", error);
  }
}

main().finally(() => prisma.$disconnect());
