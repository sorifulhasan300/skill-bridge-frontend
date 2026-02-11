import { NextRequest, NextResponse } from "next/server";
import { userService } from "./service/session.service";
import { Roles } from "./constants/constants";

export const proxy = async (request: NextRequest) => {
  const { data } = await userService.getSession();
  const pathName = request.nextUrl.pathname;

  const authenticated = !!data;
  const isAdmin = data?.user?.role === Roles.admin;
  const isStudent = data?.user?.role === Roles.student;
  const isTutor = data?.user?.role === Roles.tutor;

  if (!authenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
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
    "/admin-dashboard",
    "/admin-dashboard/:path*",

    "/student-dashboard",
    "/student-dashboard/:path*",

    "/tutor-dashboard/:path*",
    "/tutor-dashboard",
  ],
};
