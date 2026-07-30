import { prisma } from "../src/lib/prisma";

async function main() {
  try {
    const todayRecords = await prisma.attendance.findMany({
      take: 5,
      select: {
        id: true,
        user_id: true,
        attendance_date: true,
        work_mode: true,
        check_out_work_mode: true,
        status: true,
      },
    });

    console.log("SUCCESS FETCHING ATTENDANCE RECORDS:", todayRecords.length);
    console.log(todayRecords);
  } catch (err) {
    console.error("ERROR FETCHING ATTENDANCE RECORDS:", err);
  }
}

main().finally(() => prisma.$disconnect());
