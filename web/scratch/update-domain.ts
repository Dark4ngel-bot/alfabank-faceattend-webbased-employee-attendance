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
  const users = await prisma.user.findMany();
  for (const user of users) {
    const emailLower = user.email.toLowerCase();
    if (
      emailLower.endsWith("@creativemu.id") ||
      emailLower.endsWith("@alfabank.com") ||
      emailLower.endsWith("@alfabank.id")
    ) {
      const username = user.email.split("@")[0];
      const newEmail = `${username}@alfabankjogja.com`;
      await prisma.user.update({
        where: { id: user.id },
        data: { email: newEmail },
      });
      console.log(`Updated email: ${user.email} -> ${newEmail}`);
    }
  }

  // Ensure admin@alfabankjogja.com exists with known password
  const adminEmail = "admin@alfabankjogja.com";
  const password = "adminpassword123";
  const password_hash = await bcrypt.hash(password, 10);

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      name: "Admin AlfaBank Jogja",
      password_hash,
      role: "admin",
      status: "active",
    },
    create: {
      name: "Admin AlfaBank Jogja",
      email: adminEmail,
      password_hash,
      role: "admin",
      status: "active",
    },
  });

  console.log("DOMAIN_UPDATE_SUCCESS:", JSON.stringify({ email: adminEmail, password }));
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
