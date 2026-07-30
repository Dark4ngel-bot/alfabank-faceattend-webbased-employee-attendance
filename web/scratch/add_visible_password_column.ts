import { prisma } from "../src/lib/prisma";

async function main() {
  try {
    await prisma.$executeRawUnsafe(
      "ALTER TABLE users ADD COLUMN visible_password VARCHAR(255) NULL AFTER password_hash;"
    );
    console.log("SUCCESS: visible_password column added to users table!");
  } catch (err: any) {
    if (err?.message?.includes("Duplicate column name")) {
      console.log("INFO: visible_password column already exists!");
    } else {
      console.error("ERROR ADDING COLUMN:", err);
    }
  }
}

main().finally(() => prisma.$disconnect());
