"use server";
import { patternEmail, patternPassword } from "@/src/lib/constant";
import { prisma } from "@/src/lib/prisma";
import { createSession } from "@/src/lib/session";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import { registerSchema } from "../schemas/register.schema";

export async function registerAction(prevState: any, formData: FormData) {
  const fields = {
    username: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  };

  const result = registerSchema.safeParse(fields);
  if (!result.success) {
    return {
      errors:result.error.flatten().fieldErrors,
      values:fields
    }
  }
  
  const existingUser = await prisma.user.findUnique({ where: { email:fields.email } });
  if (existingUser) {
    return { message: "this user has already registered!" };
  }
  const userCount = await prisma.user.findMany();
  const hashedPassword = await bcrypt.hash(fields.password, 12);
  const user = await prisma.user.create({
    data: {
      ...fields,
      role: userCount.length > 0 ? "USER" : "ADMIN",
      password: hashedPassword,
    },
  });
  await createSession(user.id);
  return {
    success: true,
  };
}

export async function login(prevState: any, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return {
      error: "User not found",
    };
  }
  const isValidEmail = patternEmail.test(email);
  const isValidPassword = patternPassword.test(password);
  if (!isValidEmail || !isValidPassword) {
    return {
      error: "Email or Password invalid",
    };
  }
  const verifyPassword = await bcrypt.compare(password, user.password);
  if (!verifyPassword) {
    return {
      error: "Email or Password incorrect",
    };
  }
  if (!email.length || password.trim().length < 8) {
    return {
      error: "Enter a valid email or password",
    };
  }
  await createSession(user.id);
}
