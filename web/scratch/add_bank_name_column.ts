import { prisma } from "../src/lib/prisma";

async function main() {
  try {
    await prisma.$executeRawUnsafe(
      "ALTER TABLE users ADD COLUMN bank_name VARCHAR(100) NULL AFTER birth_date;"
    );
    console.log("SUCCESS: bank_name column added to users table.");
  } catch (error: any) {
    if (error?.message?.includes("Duplicate column name")) {
      console.log("INFO: bank_name column already exists.");
    } else {
      console.error("ERROR adding bank_name column:", error);
    }
  }
}

main().finally(() => prisma.$disconnect());
