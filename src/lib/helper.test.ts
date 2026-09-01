import { describe, it, expect } from "vitest";
import { calculatedDiscountedPrice, numberToPersianWords } from "./helper";

describe("calculatedDiscountedPrice", () => {
  it("قیمت رو با تخفیف حساب و به نزدیک‌ترین هزار گرد کنه", () => {
    expect(calculatedDiscountedPrice({ price: 100000, discount: 10 })).toBe(
      90000,
    );
  });

  it("وقتی discount نال یا undefined باشه، قیمت اصلی برگرده", () => {
    expect(calculatedDiscountedPrice({ price: 50000 })).toBe(50000);
  });

  it("وقتی discount صفره، قیمت اصلی برگرده", () => {
    expect(calculatedDiscountedPrice({ price: 50000, discount: 0 })).toBe(
      50000,
    );
  });

  it("تخفیف ۱۰۰ درصد یعنی قیمت صفر", () => {
    expect(calculatedDiscountedPrice({ price: 50000, discount: 100 })).toBe(0);
  });

  it("قیمتی که گرد نیست رو به نزدیک‌ترین هزار گرد کنه", () => {
    expect(calculatedDiscountedPrice({ price: 12345, discount: 15 })).toBe(
      10000,
    );
  });
});

describe("numberToPersianWords", () => {
  it("عدد رو به حروف فارسی تبدیل کنه", () => {
    expect(numberToPersianWords(123456789)).toBe(
      "صد و بیست و سه میلیون و چهارصد و پنجاه و شش هزار و هفتصد و هشتاد و نه",
    );
    expect(numberToPersianWords(0)).toBe("صفر");
    expect(numberToPersianWords(10)).toBe("ده");
    expect(numberToPersianWords(15)).toBe("پانزده");
    expect(numberToPersianWords(20)).toBe("بیست");
    expect(numberToPersianWords(99)).toBe("نود و نه");
    expect(numberToPersianWords(100)).toBe("صد");
    expect(numberToPersianWords(101)).toBe("صد و یک");
    expect(numberToPersianWords(110)).toBe("صد و ده");
    expect(numberToPersianWords(115)).toBe("صد و پانزده");
    expect(numberToPersianWords(120)).toBe("صد و بیست");
    expect(numberToPersianWords(999)).toBe("نهصد و نود و نه");
    expect(numberToPersianWords(1000)).toBe("یک هزار");
    expect(numberToPersianWords(1001)).toBe("یک هزار و یک");
    expect(numberToPersianWords(1010)).toBe("یک هزار و ده");
    expect(numberToPersianWords(1100)).toBe("یک هزار و صد");
    expect(numberToPersianWords(1111)).toBe("یک هزار و صد و یازده");
    expect(numberToPersianWords(10000)).toBe("ده هزار");
    expect(numberToPersianWords(100000)).toBe("صد هزار");
    expect(numberToPersianWords(1000000)).toBe("یک میلیون");
    expect(numberToPersianWords(10000000)).toBe("ده میلیون");
    expect(numberToPersianWords(100000000)).toBe("صد میلیون");
    expect(numberToPersianWords(1000000000)).toBe("یک میلیارد");
  });
  it("عدد منفی رو به حروف فارسی تبدیل کنه", () => {
    expect(numberToPersianWords(-123456789)).toBe(
      "منفی صد و بیست و سه میلیون و چهارصد و پنجاه و شش هزار و هفتصد و هشتاد و نه",
    );
  });

});
