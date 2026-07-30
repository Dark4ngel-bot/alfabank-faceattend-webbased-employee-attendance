import { prisma } from "../src/lib/prisma";

async function main() {
  const adminUser = await prisma.user.findFirst({
    where: {
      role: { in: ["admin", "owner"] },
    },
    select: {
      id: true,
      email: true,
      role: true,
      name: true,
    },
  });

  console.log("ADMIN USER IN DB:", adminUser);
}

main().finally(() => prisma.$disconnect());
