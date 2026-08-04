import bcrypt from "bcryptjs";
import { prisma } from "../src/lib/prisma";

async function testFullLogin() {
  const user = await prisma.user.findUnique({
    where: { email: "admin@alfabankjogja.com" },
  });

  if (!user) {
    console.error("User not found!");
    return;
  }

  const valid = await bcrypt.compare("admin123", user.password_hash);
  console.log("Password valid for admin@alfabankjogja.com (admin123):", valid);
}

testFullLogin().finally(() => prisma.$disconnect());
