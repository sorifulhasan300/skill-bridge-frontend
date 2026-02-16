import { Roles } from "@/constants/constants";
import { userService } from "@/service/session.service";
import { NextRequest, NextResponse } from "next/server";

export const proxy = async (request: NextRequest) => {
  const pathName = request.nextUrl.pathname;
  const sessionToken = request.cookies.get("better-auth.session_token");

  if (!sessionToken) {
    const isPublicPath = pathName === "/login" || pathName === "/register";
    if (!isPublicPath) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next();
  }

  const sessionResponse = await userService.getSession();
  const user = sessionResponse?.data?.user;
  const userRole = user?.role;

  if (!user) {
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.delete("better-auth.session_token");
    return response;
  }

  if (pathName.startsWith("/verify-email")) {
    return NextResponse.next();
  }

  const isAdmin = userRole === Roles.admin;
  const isStudent = userRole === Roles.student;
  const isTutor = userRole === Roles.tutor;

  if (pathName.startsWith("/admin-dashboard") && !isAdmin) {
    const redirectPath = isTutor ? "/tutor-dashboard" : "/student-dashboard";
    return NextResponse.redirect(new URL(redirectPath, request.url));
  }

  if (pathName.startsWith("/student-dashboard") && !isStudent) {
    const redirectPath = isAdmin ? "/admin-dashboard" : "/tutor-dashboard";
    return NextResponse.redirect(new URL(redirectPath, request.url));
  }

  if (pathName.startsWith("/tutor-dashboard") && !isTutor) {
    const redirectPath = isAdmin ? "/admin-dashboard" : "/student-dashboard";
    return NextResponse.redirect(new URL(redirectPath, request.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: [
    "/admin-dashboard/:path*",
    "/student-dashboard/:path*",
    "/tutor-dashboard/:path*",
    "/verify-email/:path*",
  ],
};
