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
  const email = "admin@alfabank.com";
  const password = "adminpassword123";
  const password_hash = await bcrypt.hash(password, 10);

  const admin = await prisma.user.upsert({
    where: { email },
    update: {
      name: "Admin AlfaBank",
      password_hash,
      role: "admin",
      status: "active",
    },
    create: {
      name: "Admin AlfaBank",
      email,
      password_hash,
      role: "admin",
      status: "active",
    },
  });

  console.log("SUCCESS_RESET_ADMIN:", JSON.stringify({ email: admin.email, password }));
}

main()
  .catch((e) => console.error("ERROR_RESET_ADMIN:", e))
  .finally(() => prisma.$disconnect());
