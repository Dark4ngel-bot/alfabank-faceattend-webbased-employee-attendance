import { prisma } from "../src/lib/prisma";
import bcrypt from "bcryptjs";

async function main() {
  const users = await prisma.user.findMany({
    select: { email: true, role: true, name: true, password_hash: true },
  });

  const passwords = ["admin123", "password123", "12345678", "password", "employee123", "karyawan123", "123456"];

  for (const user of users) {
    let matched = false;
    for (const pass of passwords) {
      if (await bcrypt.compare(pass, user.password_hash)) {
        console.log(`User: ${user.name} (${user.role}) | Email: ${user.email} | Password: ${pass}`);
        matched = true;
        break;
      }
    }
    if (!matched) {
      console.log(`User: ${user.name} (${user.role}) | Email: ${user.email} | Password: (UNKNOWN HASH)`);
    }
  }
}

main().finally(() => prisma.$disconnect());
