import { prisma } from "../src/lib/prisma";

async function seedData() {
  console.log("Seeding Divisi (Departments)...");

  const departmentsData = [
    { name: "FINANCE" },
    { name: "MANAJEMEN" },
    { name: "MARKETING" },
    { name: "PROJECT" },
  ];

  for (const dept of departmentsData) {
    const existing = await prisma.department.findFirst({
      where: { name: dept.name },
    });
    if (!existing) {
      await prisma.department.create({
        data: {
          name: dept.name,
          status: "active",
        },
      });
      console.log(`Created Department: ${dept.name}`);
    } else {
      await prisma.department.update({
        where: { id: existing.id },
        data: { status: "active" },
      });
      console.log(`Updated Department: ${dept.name}`);
    }
  }

  console.log("\nSeeding Jabatan...");

  const jabatansData = [
    { name: "MANAJER" },
    { name: "PIC" },
    { name: "STAFF" },
    { name: "SUPERVISOR" },
    { name: "TEKNIS" },
  ];

  for (const jab of jabatansData) {
    const existing = await prisma.jabatan.findFirst({
      where: { name: jab.name },
    });
    if (!existing) {
      await prisma.jabatan.create({
        data: {
          name: jab.name,
          status: "active",
        },
      });
      console.log(`Created Jabatan: ${jab.name}`);
    } else {
      await prisma.jabatan.update({
        where: { id: existing.id },
        data: { status: "active" },
      });
      console.log(`Updated Jabatan: ${jab.name}`);
    }
  }

  console.log("\nSeeding Posisi (Positions)...");

  const positionsData = [
    { name: "OPERASIONAL" },
    { name: "MARKETPLACE" },
    { name: "WEB/SOFT DEVELOPER" },
    { name: "SOSMED" },
    { name: "CUSTOMER SERVICE" },
    { name: "ADMIN" },
  ];

  for (const pos of positionsData) {
    const existing = await prisma.position.findFirst({
      where: { name: pos.name },
    });
    if (!existing) {
      await prisma.position.create({
        data: {
          name: pos.name,
          status: "active",
        },
      });
      console.log(`Created Position: ${pos.name}`);
    } else {
      await prisma.position.update({
        where: { id: existing.id },
        data: { status: "active" },
      });
      console.log(`Updated Position: ${pos.name}`);
    }
  }

  console.log("\nData Divisi, Jabatan, dan Posisi berhasil diisi!");
}

seedData()
  .catch((err) => console.error("SEED_ERROR:", err))
  .finally(() => prisma.$disconnect());
