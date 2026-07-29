type EmploymentPeriodUser = {
  id: string;
  role: string | null;
  status: string | null;
  employment_end_date: Date | string | null;
};

function getJakartaDateKey(value: Date) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Jakarta",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(value);
}

function normalizeDateKey(value: Date | string | null) {
  if (!value) return "";

  if (value instanceof Date) {
    return getJakartaDateKey(value);
  }

  const text = String(value).trim();

  if (!text) return "";

  return text.slice(0, 10);
}

export function isEmploymentExpired(
  employmentEndDate: Date | string | null,
  now = new Date(),
) {
  const endDateKey = normalizeDateKey(employmentEndDate);

  if (!endDateKey) return false;

  return getJakartaDateKey(now) > endDateKey;
}

export async function deactivateExpiredEmployee(user: EmploymentPeriodUser) {
  if (
    String(user.role || "").toLowerCase() !== "employee" ||
    String(user.status || "").toLowerCase() !== "active" ||
    !isEmploymentExpired(user.employment_end_date)
  ) {
    return false;
  }

  const { prisma } = await import("@/lib/prisma");

  await prisma.user.updateMany({
    where: {
      id: user.id,
      status: "active",
    },
    data: {
      status: "inactive",
    },
  });

  return true;
}

export function getRemainingContractText(
  employmentEndDate: Date | string | null,
  now = new Date(),
) {
  if (!employmentEndDate) return "Tetap / Tidak Berbatas";

  const endDate = new Date(employmentEndDate);
  if (Number.isNaN(endDate.getTime())) return "-";

  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const target = new Date(
    endDate.getFullYear(),
    endDate.getMonth(),
    endDate.getDate(),
  );

  const diffTime = target.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) {
    return "Kontrak Berakhir";
  }
  if (diffDays === 0) {
    return "Berakhir Hari Ini";
  }

  if (diffDays < 30) {
    return `${diffDays} Hari Tersisa`;
  }

  const months = Math.floor(diffDays / 30);
  const days = diffDays % 30;

  if (days === 0) {
    return `${months} Bulan Tersisa`;
  }

  return `${months} Bulan ${days} Hari Tersisa`;
}

