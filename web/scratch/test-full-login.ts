import bcrypt from "bcryptjs";
import { prisma } from "../src/lib/prisma";

async function testFullLogin() {
  const user = await prisma.user.findUnique({
    where: { email: "owner@alfabankjogja.com" },
  });

  if (!user) {
    console.error("User not found!");
    return;
  }

  const valid = await bcrypt.compare("password123", user.password_hash);
  console.log("Password valid:", valid);
}

testFullLogin().finally(() => prisma.$disconnect());
