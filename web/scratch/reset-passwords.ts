import bcrypt from "bcryptjs";
import { prisma } from "../src/lib/prisma";

async function main() {
  const adminPasswordHash = await bcrypt.hash("adminpassword123", 10);
  const employeePasswordHash = await bcrypt.hash("password123", 10);

  // Update admin password
  await prisma.user.updateMany({
    where: { role: "admin" },
    data: { password_hash: adminPasswordHash },
  });

  // Update employee passwords
  await prisma.user.updateMany({
    where: { role: { in: ["employee", "cs", "owner"] } },
    data: { password_hash: employeePasswordHash },
  });

  console.log("Passwords updated successfully!");
}

main().finally(() => prisma.$disconnect());
