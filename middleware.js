// middleware.js
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  // Skip middleware for auth-related paths to avoid interference
  if (
    pathname.startsWith("/api/auth") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon.ico")
  ) {
    return NextResponse.next();
  }

  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  console.log("=== MIDDLEWARE DEBUG ===");
  console.log("Path:", pathname);
  console.log("Has Token:", !!token);
  console.log("User Email:", token?.email || "None");

  const protectedPaths = [
    "/properties/add",
    "/properties/saved",
    "/profile",
    "/messages",
  ];

  const isProtected = protectedPaths.some((path) => pathname.startsWith(path));

  // Allow access to unauthorized page without checks
  if (pathname === "/unauthorized") {
    return NextResponse.next();
  }

  // Block access to protected routes if not authenticated
  if (isProtected && !token) {
    console.log("❌ Blocking access to:", pathname);
    const url = new URL("/unauthorized", req.url);
    url.searchParams.set("from", pathname);
    return NextResponse.redirect(url);
  }

  // Allow all other requests
  return NextResponse.next();
}

export const config = {
  matcher: ["/properties/:path*", "/profile", "/messages", "/unauthorized"],
};
