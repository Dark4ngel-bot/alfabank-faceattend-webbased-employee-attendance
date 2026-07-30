import { prisma } from "../src/lib/prisma";

async function main() {
  const columns = [
    { name: "check_out_work_mode", type: "VARCHAR(20) NULL" },
    { name: "check_in_work_mode", type: "VARCHAR(20) NULL" },
  ];

  for (const col of columns) {
    try {
      await prisma.$executeRawUnsafe(
        `ALTER TABLE attendances ADD COLUMN ${col.name} ${col.type};`
      );
      console.log(`SUCCESS: Column ${col.name} added to attendances table!`);
    } catch (err: any) {
      if (err?.message?.includes("Duplicate column name")) {
        console.log(`INFO: Column ${col.name} already exists in attendances.`);
      } else {
        console.error(`ERROR adding ${col.name}:`, err.message);
      }
    }
  }
}

main().finally(() => prisma.$disconnect());
