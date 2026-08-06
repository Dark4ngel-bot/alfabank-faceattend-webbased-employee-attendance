import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../src/generated/prisma/client";

const adapter = new PrismaMariaDb({
  host: process.env.DATABASE_HOST || "127.0.0.1",
  port: Number(process.env.DATABASE_PORT || 3306),
  user: process.env.DATABASE_USER || "root",
  password: process.env.DATABASE_PASSWORD || undefined,
  database: process.env.DATABASE_NAME || "faceattend_db",
  connectionLimit: 5,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  await prisma.officeLocation.upsert({
    where: {
      name: "Alfabank",
    },
    update: {
      address:
        "Jl. Glagahsari No.46C, Warungboto, Kec. Umbulharjo, Kota Yogyakarta, Daerah Istimewa Yogyakarta 55164, Indonesia",
      latitude: -7.810501,
      longitude: 110.391257,
      radius_meters: 100,
      status: "active",
    },
    create: {
      name: "Alfabank",
      address:
        "Jl. Glagahsari No.46C, Warungboto, Kec. Umbulharjo, Kota Yogyakarta, Daerah Istimewa Yogyakarta 55164, Indonesia",
      latitude: -7.810501,
      longitude: 110.391257,
      radius_meters: 100,
      status: "active",
    },
  });

  console.log("Data kantor berhasil dibuat.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
