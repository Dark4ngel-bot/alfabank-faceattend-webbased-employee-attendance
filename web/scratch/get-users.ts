import { prisma } from "../src/lib/prisma";

async function main() {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
      employee_code: true,
    },
    orderBy: {
      role: "asc",
    },
  });

  console.log(JSON.stringify(users, null, 2));
}

main().finally(() => prisma.$disconnect());
