import { prisma } from "../src/lib/prisma";

async function main() {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
    },
    orderBy: {
      role: "asc",
    },
  });

  console.dir(users, { depth: null });
}

main().finally(() => prisma.$disconnect());
