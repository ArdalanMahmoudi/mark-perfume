import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";
import bcrypt from "bcrypt";

const connectionString = process.env.DATABASE_URL;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("در حال پاکسازی دیتابیس...");
  await prisma.orderItem.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.order.deleteMany();
  await prisma.comment.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  console.log("در حال ساخت کاربر ادمین...");
  const hashedPassword = await bcrypt.hash("Admin123456", 10);
  const admin = await prisma.user.create({
    data: {
      username: "Admin",
      email: "admin@markperfume.ir",
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  console.log("در حال ساخت دسته‌بندی‌ها...");
  const floralCategory = await prisma.category.create({
    data: { name: "گلی (Floral)", slug: "floral" },
  });
  const woodyCategory = await prisma.category.create({
    data: { name: "چوبی (Woody)", slug: "woody" },
  });

  console.log("در حال ساخت محصولات...");
  await prisma.product.create({
    data: {
      name: "عطر Floral Bloom Eau De Parfum با حجم 100 میلی‌لیتر",
      slug: "floral-bloom-eau-de-parfum-100ml",
      description: "عطری گلدار و لطیف با رایحه‌ای ماندگار",
      details: "این عطر ساخته شده از بهترین اسانس‌های گلی و مناسب فصول بهار و تابستان است.",
      price: 3960000,
      discount: 12,
      volume: 100,
      stock: 15,
      categoryId: floralCategory.id,
      thumbnail: "/images/product/product 1.jpg",
      specification: [
        { key: "حجم", value: "100 میلی‌لیتر" },
        { key: "خانواده رایحه", value: "گلی" },
      ],
      gallery: {
        create: [
          { url: "/images/product/product 2.jpg", alt: "Floral Bloom" },
          { url: "/images/product/product 3.jpg", alt: "Floral Bloom 2" },
        ],
      },
    },
  });

  await prisma.product.create({
    data: {
      name: "ادو پرفیوم مردانه امپریو آرمانی مدل Stronger With You",
      slug: "emporio-armani-stronger-with-you",
      description: "عطری مردانه با رایحه‌ای گرم و ماندگار",
      details: "مناسب استفاده روزانه و مجالس رسمی، با ترکیبی از ادویه و چوب.",
      price: 4900000,
      discount: 0,
      volume: 100,
      stock: 8,
      categoryId: woodyCategory.id,
      thumbnail: "/images/product/product_veking_thumbnail.webp",
      specification: [
        { key: "حجم", value: "100 میلی‌لیتر" },
        { key: "خانواده رایحه", value: "چوبی" },
      ],
      gallery: {
        create: [
          { url: "/images/product/product_veking_g1.webp", alt: "Stronger With You" },
          { url: "/images/product/product_veking_g2.webp", alt: "Stronger With You 2" },
        ],
      },
    },
  });

  await prisma.product.create({
    data: {
      name: "عطر چوبی Woody Essence با حجم 50 میلی‌لیتر",
      slug: "woody-essence-50ml",
      description: "رایحه‌ای اصیل و چوبی برای عصرهای پاییزی",
      details: "ترکیبی از چوب صندل و مشک، مناسب فصول سرد سال.",
      price: 2450000,
      discount: 20,
      volume: 50,
      stock: 0,
      categoryId: woodyCategory.id,
      thumbnail: "/images/product/product_sav_thumbnail.webp",
      specification: [
        { key: "حجم", value: "50 میلی‌لیتر" },
        { key: "خانواده رایحه", value: "چوبی" },
      ],
      gallery: {
        create: [
          { url: "/images/product/product_sav_g1.webp", alt: "Woody Essence" },
          { url: "/images/product/product_sav_g2.webp", alt: "Woody Essence 2" },
        ],
      },
    },
  });

  console.log("✅ Seed با موفقیت انجام شد");
  console.log(`ادمین ساخته شد: ${admin.email} / پسورد: Admin123456`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });