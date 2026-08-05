const { PrismaClient } = require("@prisma/client");

(async () => {
  const prisma = new PrismaClient();
  try {
    const constraint = await prisma.$queryRawUnsafe(`
      SELECT TABLE_NAME, COLUMN_NAME, CONSTRAINT_NAME, REFERENCED_TABLE_NAME, REFERENCED_COLUMN_NAME
      FROM information_schema.KEY_COLUMN_USAGE
      WHERE TABLE_SCHEMA = DATABASE()
        AND TABLE_NAME = 'shift_swap_requests'
        AND REFERENCED_TABLE_NAME = 'users'
    `);
    console.log("CONSTRAINT:", JSON.stringify(constraint, null, 2));

    const orphanRequesters = await prisma.$queryRawUnsafe(`
      SELECT ssr.id, ssr.requester_id, ssr.target_user_id
      FROM shift_swap_requests ssr
      LEFT JOIN users u ON ssr.requester_id = u.id
      WHERE ssr.requester_id IS NOT NULL
        AND u.id IS NULL
      LIMIT 50;
    `);
    console.log(
      "ORPHAN REQUESTERS:",
      JSON.stringify(orphanRequesters, null, 2),
    );

    const orphanTargets = await prisma.$queryRawUnsafe(`
      SELECT ssr.id, ssr.requester_id, ssr.target_user_id
      FROM shift_swap_requests ssr
      LEFT JOIN users u2 ON ssr.target_user_id = u2.id
      WHERE ssr.target_user_id IS NOT NULL
        AND u2.id IS NULL
      LIMIT 50;
    `);
    console.log("ORPHAN TARGETS:", JSON.stringify(orphanTargets, null, 2));
  } catch (error) {
    console.error("ERROR:", error);
  } finally {
    await prisma.$disconnect();
  }
})();
