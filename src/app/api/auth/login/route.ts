import { prisma } from "@/src/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { createSession } from "@/src/lib/session";
import { loginSchema } from "@/src/lib/schemas/login.schema";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = loginSchema.safeParse(body);
    const isBannedUser = await prisma.user.findUnique({
      where: { email: result.data?.email },
    });
    if (isBannedUser?.isBanned) {
      return NextResponse.json({
        message: "حساب شما مسدود شده است",
      },{status:403});
    }
    if (!result.success) {
      return NextResponse.json(
        {
          errors: result.error.flatten().fieldErrors,
          success: false,
        },
        { status: 400 },
      );
    }
    const fields = result.data;
    const user = await prisma.user.findUnique({
      where: { email: fields.email },
    });
    if (!user) {
      return NextResponse.json(
        {
          message: "ایمیل یا رمز عبور  اشتباه است",
          success: false,
        },
        { status: 401 },
      );
    }

    const verifyPassword = await bcrypt.compare(fields.password, user.password);
    if (!verifyPassword) {
      return NextResponse.json(
        {
          message: "ایمیل یا رمز عبور  اشتباه است",
          success: false,
        },
        { status: 401 },
      );
    }

    await createSession({ id: user.id, role: user.role });
    return NextResponse.json(
      {
        message: "ورود به حساب موفق بود",
        success: true,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Internal Server error", error },
      { status: 500 },
    );
  }
}
