"use server";

import { redirect } from "next/navigation";
import { prisma } from "../prisma";
import { getCurrentUser } from "../queries/user.queries";

const ZARINPAL_MERCHANT_ID = process.env.ZARINPAL_MERCHANT_ID!;
const ZARINPAL_REQUEST_URL = "https://sandbox.zarinpal.com/pg/v4/payment/request.json";
const ZARINPAL_STARTPAY_URL = "https://sandbox.zarinpal.com/pg/StartPay";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export async function initialPayment(orderId: string) {
  // احراز هویت
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("ابتدا وارد حساب کاربری شوید");
  }

  
  const order = await prisma.order.findUnique({
    where: { id: orderId },
  });
  if (!order || order.userId !== user.id) {
    throw new Error("سفارش یافت نشد");
  }

  if (order.status !== "PENDING") {
    throw new Error("این سفارش قابل پرداخت نیست");
  }

  // race condition 
  const existingPending = await prisma.payment.findFirst({
    where: { orderId: order.id, status: "PENDING" },
  });
  if (existingPending) {
    redirect(`${ZARINPAL_STARTPAY_URL}/${existingPending.authority}`);
  }

  //  درخواست به زرین‌پال
  const amount = order.totalPrice * 10;

  const response = await fetch(ZARINPAL_REQUEST_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      merchant_id: ZARINPAL_MERCHANT_ID,
      amount,
      callback_url: `${baseUrl}/verify?orderId=${order.id}`,
      description: `پرداخت سفارش ${order.id}`,
    }),
  });
  const data = await response.json();

  if (data.data?.code !== 100) {
    throw new Error("خطا اتصال به درگاه پرداخت");
  }

  const authority = data.data.authority;

  await prisma.payment.create({
    data: {
      orderId: order.id,
      amount,
      authority,
      status: "PENDING",
    },
  });

  redirect(`${ZARINPAL_STARTPAY_URL}/${authority}`);
}