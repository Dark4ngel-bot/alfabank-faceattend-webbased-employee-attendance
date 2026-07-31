import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../src/generated/prisma/client";

const adapter = new PrismaMariaDb({
  host: process.env.DATABASE_HOST || "127.0.0.1",
  port: Number(process.env.DATABASE_PORT || 3306),
  user: process.env.DATABASE_USER || "root",
  password: process.env.DATABASE_PASSWORD || undefined,
  database: process.env.DATABASE_NAME || "faceattend_alfabank",
  connectionLimit: 5,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  const user = await prisma.user.findUnique({
    where: { email: "admin@alfabank.com" },
  });

  if (!user) {
    console.log("LOGIN_TEST_RESULT: USER_NOT_FOUND");
    return;
  }

  const isPasswordValid = await bcrypt.compare("adminpassword123", user.password_hash);
  console.log("LOGIN_TEST_RESULT:", JSON.stringify({
    email: user.email,
    role: user.role,
    status: user.status,
    passwordMatch: isPasswordValid
  }));
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
