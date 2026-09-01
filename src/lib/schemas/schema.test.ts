import { describe, expect, it } from "vitest";
import { createProductSchema } from "./product.schema";

// یه فایل fake برای تست
const createFakeFile = (name = "test.jpg") =>
  new File(["dummy content"], name, { type: "image/jpeg" });

describe("create product schema", () => {
  it("should validate a valid product", () => {
    const result = createProductSchema.safeParse({
      name: "Product 1",
      description: "This is a product with enough characters",
      price: 100,
      discount: 10,
      categoryId: "cat-123",
      details: "Some details about the product",
      stock: 50,
      volume: 1,
      specification: [{ key: "Color", value: "Red" }],
      thumbnail: createFakeFile(),
      gallery: [createFakeFile("img1.jpg"), createFakeFile("img2.jpg")],
    });

    expect(result.success).toBe(true);
  });

  it("should throw an error for an invalid product", () => {
    const result = createProductSchema.safeParse({
      name: "", // خیلی کوتاهه
      description: "short", // کمتر از ۱۰ کاراکتر
      price: -100, // منفیه
      discount: 110, // بیشتر از ۱۰۰
      categoryId: "", // خالیه
      stock: 50,
      details: "Some details about the product",
      volume: 1,
      specification: [],
      thumbnail: undefined,
      gallery: [],
    });

    expect(result.success).toBe(false);
  });
});
