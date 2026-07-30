import { prisma } from "../src/lib/prisma";

async function main() {
  const columnsToAdd = [
    { name: "wfh_quota_monthly", type: "INT DEFAULT 0" },
    { name: "visible_password", type: "VARCHAR(255) NULL" },
    { name: "bank_name", type: "VARCHAR(100) NULL" },
  ];

  for (const col of columnsToAdd) {
    try {
      await prisma.$executeRawUnsafe(
        `ALTER TABLE users ADD COLUMN ${col.name} ${col.type};`
      );
      console.log(`SUCCESS: Column ${col.name} added!`);
    } catch (err: any) {
      if (err?.message?.includes("Duplicate column name")) {
        console.log(`INFO: Column ${col.name} already exists.`);
      } else {
        console.error(`ERROR adding ${col.name}:`, err.message);
      }
    }
  }
}

main().finally(() => prisma.$disconnect());
