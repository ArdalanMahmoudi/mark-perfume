import { prisma } from "@/src/lib/prisma";
import FailVerifyTemplate from "@/src/templates/payment/_components/FailVerifyTemplate";
import SuccessVerifyTemplate from "@/src/templates/payment/_components/SuccessVerifyTemplate";

import Link from "next/link";
import React from "react";

const ZARINPAL_VERIFY_URL =
  "https://sandbox.zarinpal.com/pg/v4/payment/verify.json";
const ZARINPAL_MERCHANT_ID = process.env.ZARINPAL_MERCHANT_ID!;

type Props = {
  searchParams: Promise<{
    Authority?: string;
    Status?: string;
    orderId?: string;
  }>;
};
const VerifyPaymentPage = async ({ searchParams }: Props) => {
  const { Authority, Status, orderId } = await searchParams;
  if (!Authority || !orderId) {
    return <div>درخواست نامعتبر</div>;
  }
  const payment = await prisma.payment.findUnique({
    where: { authority: Authority },
    include: { order: true },
  });
  if (!payment) {
    return <div>پرداخت یافت نشد</div>;
  }
  if (Status !== "OK") {
    await prisma.payment.update({
      where: { id: payment.id },
      data: { status: "FAILED" },
    });
    return <FailVerifyTemplate refId={payment.refId} />;
  }

  const response = await fetch(ZARINPAL_VERIFY_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      merchant_id: ZARINPAL_MERCHANT_ID,
      amount: payment.amount,
      authority: Authority,
    }),
  });
  const data = await response.json();
  if (data.data?.code === 100 || data.data?.code === 101) {
    const paidAt = new Date()
    await prisma.$transaction([
      prisma.payment.update({
        where: { id: payment.id },
        data: {
          status: "SUCCESS",
          refId: String(data.data.ref_id),
          paidAt,
        },
      }),
      prisma.order.update({
        where: { id: payment.orderId },
        data: { status: "PAID" },
      }),
    ]);
    return (
      <SuccessVerifyTemplate
        refId={data.data.ref_id}
        amount={payment.amount}
        paidAt={paidAt}
      />
    );
  }
  await prisma.payment.update({
    where: { id: payment.id },
    data: { status: "FAILED" },
  });
  return <FailVerifyTemplate refId={data.data.ref_id} />;
};

export default VerifyPaymentPage;
