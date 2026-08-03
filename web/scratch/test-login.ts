import { prisma } from "../src/lib/prisma";
import bcrypt from "bcryptjs";

async function test() {
  try {
    const user = await prisma.user.findUnique({
      where: { email: "owner@alfabankjogja.com" },
    });
    console.log("User:", user);

    const tables = await prisma.$queryRaw<Array<{ TABLE_NAME: string }>>`
      SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'login_rate_limits'
    `;
    console.log("login_rate_limits table exists:", tables.length > 0);

  } catch (err) {
    console.error("TEST_LOGIN_ERROR:", err);
  } finally {
    await prisma.$disconnect();
  }
}

test();
