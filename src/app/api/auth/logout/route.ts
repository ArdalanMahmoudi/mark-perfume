import { prisma } from "@/src/lib/prisma";
import { deleteSession } from "@/src/lib/session";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
    await deleteSession()
    return NextResponse.json({
        message:"با موفقیت از حسابتان خارج شدید"
    })
}