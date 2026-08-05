import { NextRequest } from "next/server";

const protectedRoutes = ["/dashboard"]
const adminRoutes = ["/admin"]
const authRoutes = ["/login","register"]
export async function middleware(req:NextRequest) {
    const {pathname} = req.nextUrl;
}