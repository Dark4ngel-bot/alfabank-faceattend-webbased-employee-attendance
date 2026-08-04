import bcrypt from "bcryptjs";
import { prisma } from "../src/lib/prisma";

async function main() {
  const password_hash = await bcrypt.hash("adminpassword123", 10);

  // Check if cs@alfabankjogja.com exists
  const existingCs = await prisma.user.findFirst({
    where: {
      OR: [
        { email: "cs@alfabankjogja.com" },
        { email: "cs@alfabank.id" },
        { email: "cs@creativemu.id" },
        { name: { contains: "CS" } },
      ],
    },
  });

  if (existingCs) {
    const updated = await prisma.user.update({
      where: { id: existingCs.id },
      data: {
        name: "Admin AlfaBank Jogja",
        email: "admin@alfabankjogja.com",
        role: "admin",
        password_hash,
      },
    });
    console.log("UPDATED_USER_TO_ADMIN2:", updated);
  } else {
    const created = await prisma.user.create({
      data: {
        name: "Admin AlfaBank Jogja",
        email: "admin@alfabankjogja.com",
        role: "admin",
        status: "active",
        employee_code: "CR-0021",
        password_hash,
      },
    });
    console.log("CREATED_ADMIN2:", created);
  }
}

main().finally(() => prisma.$disconnect());
