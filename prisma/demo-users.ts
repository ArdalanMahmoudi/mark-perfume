import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";
import bcrypt from "bcrypt";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  const password = await bcrypt.hash("Demo123456", 10);

  await prisma.user.upsert({
    where: { email: "demo-user@markperfume.ir" },
    update: {},
    create: { username: "کاربر دمو", email: "demo-user@markperfume.ir", password, role: "USER" },
  });

  await prisma.user.upsert({
    where: { email: "demo-admin@markperfume.ir" },
    update: {},
    create: { username: "ادمین دمو", email: "demo-admin@markperfume.ir", password, role: "VIEWER" },
  });

  console.log("done");
}

main().finally(() => prisma.$disconnect());