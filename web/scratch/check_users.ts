import { prisma } from "../src/lib/prisma";

async function main() {
  try {
    const allUsers = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        status: true,
        created_at: true,
      },
    });

    console.log("TOTAL USERS IN DB:", allUsers.length);
    console.dir(allUsers, { depth: null });
  } catch (error) {
    console.error("ERROR FETCHING USERS:", error);
  }
}

main().finally(() => prisma.$disconnect());
