import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { roles } from "./lib/constant";

type SessionPayload = {
  id: string;
  role: string;
};
const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

async function verifySessionEdge(token: string) {
  try {
    const { payload } = await jwtVerify(token, encodedKey);
    return payload as SessionPayload;
  } catch {
    return null;
  }
}

const protectedRoutes = ["/dashboard"];
const adminRoutes = ["/admin"];
const authRoutes = ["/login", "register"];
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const cookie = req.cookies.get("session")?.value;
  const isAdminRoute = adminRoutes.some((route) => pathname.startsWith(route));
  const isProtectRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  const session = cookie ? await verifySessionEdge(cookie) : null;
  if ((isAdminRoute || isProtectRoute) && !session) {
    const res = NextResponse.redirect(new URL("/login", req.url));
    if (cookie) {
      res.cookies.delete("session");
      return res;
    }
  }
  if (isAdminRoute && session && session.role !== roles.ADMIN) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  if (isAuthRoute && session) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*",
    "/login",
    "/register"
  ],
};
