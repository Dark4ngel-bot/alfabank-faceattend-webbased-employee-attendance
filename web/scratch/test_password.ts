import { prisma } from "../src/lib/prisma";
import bcrypt from "bcryptjs";

async function main() {
  const admin = await prisma.user.findFirst({
    where: { email: "admin@creativemu.id" },
    select: { email: true, password_hash: true },
  });

  const employee = await prisma.user.findFirst({
    where: { email: "dylanr@creativemu.id" },
    select: { email: true, password_hash: true },
  });

  const testPasswords = ["admin123", "password123", "12345678", "password", "Creativemu123!"];

  if (admin) {
    console.log("Testing Admin:", admin.email);
    for (const pass of testPasswords) {
      if (await bcrypt.compare(pass, admin.password_hash)) {
        console.log(`FOUND ADMIN PASSWORD: ${pass}`);
      }
    }
  }

  if (employee) {
    console.log("Testing Employee:", employee.email);
    for (const pass of testPasswords) {
      if (await bcrypt.compare(pass, employee.password_hash)) {
        console.log(`FOUND EMPLOYEE PASSWORD: ${pass}`);
      }
    }
  }
}

main().finally(() => prisma.$disconnect());
