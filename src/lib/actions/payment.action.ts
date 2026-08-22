"use server"

import { redirect } from "next/navigation";
import { prisma } from "../prisma"

const ZARINPAL_MERCHANT_ID = process.env.ZARINPAL_MERCHANT_ID!;
const ZARINPAL_REQUEST_URL = "https://sandbox.zarinpal.com/pg/v4/payment/request.json";
const ZARINPAL_STARTPAY_URL = "https://sandbox.zarinpal.com/pg/StartPay"

export async function initialPayment(orderId:string) {
    const order = await prisma.order.findUnique({
        where:{id:orderId}
    })
    if (!order) {
        throw new Error("سفارش یافت نشد")
    }
    const amount = order.totalPrice
    const response = await fetch(ZARINPAL_REQUEST_URL, {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
            merchant_id:ZARINPAL_MERCHANT_ID,
            amount,
            callback_url: `${process.env.NEXT_PUBLIC_BASE_URL}/verify?orderId=${order.id}`,
            description:`پرداخت سفارش ${order.id}`
        })
    })
    const data = await response.json()
    if (data.data?.code !== 100) {
        throw new Error("خطا اتصال به درگاه پرداخت")
    }
    const authority = data.data.authority;
    await prisma.payment.create({
        data:{
            orderId:order.id,
            amount,
            authority,
            status:'PENDING'
        }
    })
    redirect(`${ZARINPAL_STARTPAY_URL}/${authority}`)
}