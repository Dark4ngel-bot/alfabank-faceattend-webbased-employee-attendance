import { prisma } from "../src/lib/prisma";

async function main() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        employee_code: true,
        name: true,
        email: true,
        visible_password: true,
        role: true,
        status: true,
      },
      orderBy: {
        role: "asc",
      },
    });

    console.log("=== LIST AKUN LENGKAP ===");
    users.forEach((u) => {
      console.log(`[${u.role.toUpperCase()}] ${u.name} | Email: ${u.email} | Password: ${u.visible_password || "123456"}`);
    });
  } catch (error) {
    console.error("ERROR_FETCHING_ACCOUNTS:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
