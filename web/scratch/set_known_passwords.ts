import { prisma } from "../src/lib/prisma";
import bcrypt from "bcryptjs";

async function main() {
  const adminHash = await bcrypt.hash("admin123", 10);
  const employeeHash = await bcrypt.hash("123456", 10);

  // Update admins
  await prisma.user.updateMany({
    where: { role: { in: ["admin", "owner"] } },
    data: { password_hash: adminHash },
  });

  // Update employees
  await prisma.user.updateMany({
    where: { role: "employee" },
    data: { password_hash: employeeHash },
  });

  console.log("ALL ADMIN & EMPLOYEE PASSWORDS RESET SUCCESSFULLY!");
}

main().finally(() => prisma.$disconnect());
