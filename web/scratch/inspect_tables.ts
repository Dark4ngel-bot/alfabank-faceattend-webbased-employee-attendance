import { prisma } from "../src/lib/prisma";

async function main() {
  const tables = await prisma.$queryRawUnsafe<Array<{ TABLE_NAME: string }>>(
    "SELECT TABLE_NAME FROM information_schema.tables WHERE TABLE_SCHEMA = DATABASE();"
  );
  console.log("TABLES IN DB:", tables.map((t) => t.TABLE_NAME));

  const attendanceTable = tables.find(t => t.TABLE_NAME.toLowerCase() === "attendance" || t.TABLE_NAME.toLowerCase() === "attendances");
  if (attendanceTable) {
    const tableName = attendanceTable.TABLE_NAME;
    console.log(`FOUND ATTENDANCE TABLE: "${tableName}"`);

    try {
      await prisma.$executeRawUnsafe(
        `ALTER TABLE \`${tableName}\` ADD COLUMN check_out_work_mode VARCHAR(20) NULL AFTER work_mode;`
      );
      console.log(`SUCCESS: Column check_out_work_mode added to ${tableName}!`);
    } catch (err: any) {
      if (err?.message?.includes("Duplicate column name")) {
        console.log(`INFO: Column check_out_work_mode already exists in ${tableName}.`);
      } else {
        console.error(`ERROR adding check_out_work_mode:`, err.message);
      }
    }
  }
}

main().finally(() => prisma.$disconnect());
