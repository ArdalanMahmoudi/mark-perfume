export const calculatedDiscountedPrice = ({
  price,
  discount,
}: {
  price: number;
  discount?: number;
}) => {
  let totalPrice = 0;
  if (discount && discount > 0) {
    const discountedPrice = price * (discount / 100);
    totalPrice = Math.round((price - discountedPrice) / 1000) * 1000;
    return totalPrice;
  } else {
    return (totalPrice = price);
  }
};

const ones = ["صفر", "یک", "دو", "سه", "چهار", "پنج", "شش", "هفت", "هشت", "نه"];

const teens = [
  "ده",
  "یازده",
  "دوازده",
  "سیزده",
  "چهارده",
  "پانزده",
  "شانزده",
  "هفده",
  "هجده",
  "نوزده",
];

const tens = [
  "",
  "",
  "بیست",
  "سی",
  "چهل",
  "پنجاه",
  "شصت",
  "هفتاد",
  "هشتاد",
  "نود",
];

const hundreds = [
  "",
  "صد",
  "دویست",
  "سیصد",
  "چهارصد",
  "پانصد",
  "ششصد",
  "هفتصد",
  "هشتصد",
  "نهصد",
];

const scales = ["", "هزار", "میلیون", "میلیارد", "تریلیون"];

function threeDigitsToWords(num: number): string {
  const result: string[] = [];

  const hundred = Math.floor(num / 100);
  const remainder = num % 100;

  if (hundred > 0) {
    result.push(hundreds[hundred]);
  }

  if (remainder > 0) {
    if (result.length) {
      result.push("و");
    }

    if (remainder < 10) {
      result.push(ones[remainder]);
    } else if (remainder < 20) {
      result.push(teens[remainder - 10]);
    } else {
      const ten = Math.floor(remainder / 10);
      const one = remainder % 10;

      result.push(tens[ten]);

      if (one > 0) {
        result.push("و", ones[one]);
      }
    }
  }

  return result.join(" ");
}

export function numberToPersianWords(num: number): string {
  if (!Number.isFinite(num)) {
    throw new Error("عدد نامعتبر است");
  }

  if (num === 0) {
    return "صفر";
  }

  if (!Number.isInteger(num)) {
    throw new Error("عدد باید صحیح باشد");
  }

  if (num < 0) {
    return `منفی ${numberToPersianWords(Math.abs(num))}`;
  }

  const parts: string[] = [];
  let scaleIndex = 0;

  while (num > 0) {
    const chunk = num % 1000;

    if (chunk > 0) {
      const words = threeDigitsToWords(chunk);

      if (scaleIndex > 0) {
        parts.unshift(`${words} ${scales[scaleIndex]}`);
      } else {
        parts.unshift(words);
      }
    }

    num = Math.floor(num / 1000);
    scaleIndex++;
  }

  return parts.join(" و ");
}
