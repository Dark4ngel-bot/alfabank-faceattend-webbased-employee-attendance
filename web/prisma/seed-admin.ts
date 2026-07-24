require("dotenv/config");

const bcrypt = require("bcryptjs");
const { PrismaMariaDb } = require("@prisma/adapter-mariadb");
const { PrismaClient } = require("../src/generated/prisma/client");

function getDatabaseConfig() {
  if (process.env.DATABASE_URL) {
    const databaseUrl = new URL(process.env.DATABASE_URL);
    const isRemoteTls =
      databaseUrl.hostname.includes("tidbcloud.com") ||
      databaseUrl.searchParams.get("ssl") === "true" ||
      databaseUrl.searchParams.get("sslaccept") === "strict";

    return {
      host: databaseUrl.hostname,
      port: Number(databaseUrl.port || 3306),
      user: decodeURIComponent(databaseUrl.username),
      password: decodeURIComponent(databaseUrl.password) || undefined,
      database:
        databaseUrl.pathname.replace(/^\//, "") ||
        process.env.DATABASE_NAME ||
        "faceattend_db",
      connectionLimit: 5,
      ...(isRemoteTls ? { ssl: { rejectUnauthorized: true } } : {}),
    };
  }

  return {
    host: process.env.DATABASE_HOST || "127.0.0.1",
    port: Number(process.env.DATABASE_PORT || 3306),
    user: process.env.DATABASE_USER || "root",
    password: process.env.DATABASE_PASSWORD || undefined,
    database: process.env.DATABASE_NAME || "faceattend_db",
    connectionLimit: 5,
  };
}

const adapter = new PrismaMariaDb(getDatabaseConfig());

const prisma = new PrismaClient({ adapter });

async function main() {
  const password_hash = await bcrypt.hash("123456", 10);

  await prisma.user.upsert({
    where: {
      email: "owner@creativemu.com",
    },
    update: {
      name: "Owner Creativemu",
      password_hash,
      role: "owner",
      status: "active",
    },
    create: {
      name: "Owner Creativemu",
      email: "owner@creativemu.com",
      password_hash,
      role: "owner",
      status: "active",
    },
  });

  console.log("Owner berhasil dibuat");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
