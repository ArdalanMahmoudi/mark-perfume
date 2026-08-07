"use server";
import { cookies } from "next/headers";
import { prisma } from "./prisma";
import { jwtVerify, SignJWT } from "jose";
import { getCurrentUser } from "./queries/user.queries";
import { roles } from "./constant";

type SessionPayload = {
  id: string;
  role: string;
};
const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export async function createSession(payload: SessionPayload) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const session = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);


  const cookieStore = await cookies();

  cookieStore.set("session", session, {
    httpOnly: true,
    // secure:true,  ---> https
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

export async function verifySession() {
    const cookieStore = await cookies()
    const cookie = cookieStore.get("session")?.value
    if (!cookie) {
        return null
    }
    try{
        const {payload} = await jwtVerify(cookie, encodedKey)
        return payload as SessionPayload
    }catch{
        return null
    }
}


export async function deleteSession () {
    const cookieStore = await cookies()
    cookieStore.delete('session')
}

export async function requireAdmin ()  {
  const user = await getCurrentUser();
  if (!user || user.role !== roles.ADMIN) {
    throw new Error("Unauthorized");
  }
  return user;
};
