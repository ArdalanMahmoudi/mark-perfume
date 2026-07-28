import { prisma } from "@/src/lib/prisma";
import { registerSchema } from "@/src/lib/schemas/register.schema";
import { createSession } from "@/src/lib/session";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { roles } from "@/src/lib/constant";

export async function POST(req: Request) {
  try {

    const body = await req.json();

    const result = registerSchema.safeParse(body);
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

    const existingUser = await prisma.user.findUnique({
      where: { email: fields.email },
    });
    if (existingUser) {
      return NextResponse.json(
        { message: "این ایمیل قبلا ثبت شده است", success: false },
        { status: 409 },
      );
    }
    const userCount = await prisma.user.count();
    const hashedPassword = await bcrypt.hash(fields.password, 12);
    const user = await prisma.user.create({
      data: {
        username: fields.username,
        email: fields.email,
        role: userCount === 0 ? roles.ADMIN as string : roles.USER as string,
        password: hashedPassword,
      },
    });
    await createSession(user.id);
    return NextResponse.json(
      {
        success: true,
        message:"ثبت نام انجام شد",
        user,
      },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Internal Server error", error },
      { status: 500 },
    );
  }
}
