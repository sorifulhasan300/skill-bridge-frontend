import { NextRequest, NextResponse } from "next/server";
import { userService } from "./service/session.service";
import { Roles } from "./constants/constants";

export const proxy = async (request: NextRequest) => {
  const { data: sessionData } = await userService.getSession();
  const pathName = request.nextUrl.pathname;

  const authenticated = !!(sessionData && sessionData.user);

  const userRole = sessionData?.user?.role;
  const isAdmin = userRole === Roles.admin;
  const isStudent = userRole === Roles.student;
  const isTutor = userRole === Roles.tutor;

  if (!authenticated) {
    if (pathName !== "/login" && pathName !== "/register") {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }
  // check admin Dashboard
  if (!isAdmin && pathName.startsWith("/admin-dashboard")) {
    if (isStudent) {
      return NextResponse.redirect(new URL("/student-dashboard", request.url));
    }
    if (isTutor) {
      return NextResponse.redirect(new URL("/tutor-dashboard", request.url));
    }
  }

  // check student Dashboard

  if (!isStudent && pathName.startsWith("/student-dashboard")) {
    if (isAdmin) {
      return NextResponse.redirect(new URL("/admin-dashboard", request.url));
    }
    if (isTutor) {
      return NextResponse.redirect(new URL("/tutor-dashboard", request.url));
    }
  }

  // check tutor Dashboard
  if (!isTutor && pathName.startsWith("/tutor-dashboard")) {
    if (isAdmin) {
      return NextResponse.redirect(new URL("/admin-dashboard", request.url));
    }
    if (isStudent) {
      return NextResponse.redirect(new URL("/student-dashboard", request.url));
    }
  }
  return NextResponse.next();
};
export const config = {
  matcher: [
    "/dashboard",
    "/admin-dashboard",
    "/admin-dashboard/:path*",

    "/student-dashboard",
    "/student-dashboard/:path*",

    "/tutor-dashboard/:path*",
    "/tutor-dashboard",
  ],
};
