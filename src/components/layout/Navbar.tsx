"use client";

import React, { useState } from "react";
import {
  GraduationCap,
  Menu,
  ArrowRight,
  LogOut,
  LayoutDashboard,
} from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ModeToggle } from "./ModeToggler";
import { DropdownMenuAvatar } from "./Avatar";
import { Roles } from "@/constants/constants";
import { Spinner } from "../ui/spinner";
import { useAuth } from "@/context/auth-context";

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

interface NavbarProps {
  className?: string;
  auth?: {
    login: { title: string; url: string };
    signup: { title: string; url: string };
  };
}

const Navbar = ({
  auth = {
    login: { title: "Login", url: "/login" },
    signup: { title: "Sign up", url: "/signup" },
  },
  className,
}: NavbarProps) => {
  const pathname = usePathname();
  const authContext = useAuth();
  const session = authContext?.session;
  const isLoading = authContext?.isLoading || false;
  const [isOpen, setIsOpen] = useState(false); // মোবাইল মেনু স্টেট
  const role = session?.user?.role;

  const menu: MenuItem[] = [
    { title: "Home", url: "/" },
    { title: "Tutors", url: "/tutors" },
    { title: "About", url: "/about" },
    { title: "Resources", url: "/resources" },
    { title: "Careers", url: "/careers" },
    { title: "Support", url: "/support" },
  ];

  // মোবাইল মেনু ক্লোজ করার ফাংশন
  const closeMenu = () => setIsOpen(false);

  return (
    <section
      className={cn(
        "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-3",
        className,
      )}
    >
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary transition-transform group-hover:scale-105">
              <GraduationCap className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold tracking-tight block">
              TutorHub
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center flex-1 justify-center">
            <NavigationMenu>
              <NavigationMenuList>
                {menu.map((item) => (
                  <NavigationMenuItem key={item.title}>
                    <Link href={item.url}>
                      <NavigationMenuLink
                        className={cn(
                          navigationMenuTriggerStyle(),
                          pathname === item.url
                            ? "bg-muted text-foreground font-bold"
                            : "text-muted-foreground",
                        )}
                      >
                        {item.title}
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <div className="hidden md:block">
              <ModeToggle />
            </div>

            {isLoading ? (
              <Spinner className="h-5 w-5" />
            ) : session ? (
              <DropdownMenuAvatar />
            ) : (
              <div className="hidden lg:flex items-center gap-2">
                <Button asChild variant="ghost" size="sm">
                  <Link href={auth.login.url}>{auth.login.title}</Link>
                </Button>
                <Button asChild size="sm">
                  <Link href={auth.signup.url}>{auth.signup.title}</Link>
                </Button>
              </div>
            )}

            {/* Mobile Menu Trigger */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[300px] flex flex-col p-6"
              >
                <SheetHeader className="text-left border-b pb-4">
                  <SheetTitle className="flex items-center gap-2">
                    <GraduationCap className="h-6 w-6 text-primary" />
                    TutorHub
                  </SheetTitle>
                </SheetHeader>

                {/* Mobile Menu Items */}
                <div className="flex flex-col gap-2 mt-6 overflow-y-auto flex-grow">
                  {menu.map((item) => (
                    <Link
                      key={item.title}
                      href={item.url}
                      onClick={closeMenu}
                      className={cn(
                        "text-base font-semibold py-3 border-b border-transparent transition-all",
                        pathname === item.url
                          ? "text-primary ml-1"
                          : "text-foreground",
                      )}
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>

                {/* Mobile Bottom Section */}
                <div className="border-t pt-6 space-y-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-muted-foreground">
                      Theme
                    </span>
                    <ModeToggle />
                  </div>

                  {session ? (
                    <div className="grid gap-2">
                      <Button
                        className="w-full justify-between"
                        variant="secondary"
                        asChild
                        onClick={closeMenu}
                      >
                        <Link
                          href={
                            role === Roles.admin
                              ? "/admin-dashboard"
                              : role === Roles.tutor
                                ? "/tutor-dashboard"
                                : "/student-dashboard"
                          }
                        >
                          Dashboard <LayoutDashboard className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-2">
                      <Button asChild variant="outline" onClick={closeMenu}>
                        <Link href={auth.login.url}>{auth.login.title}</Link>
                      </Button>
                      <Button asChild onClick={closeMenu}>
                        <Link href={auth.signup.url}>{auth.signup.title}</Link>
                      </Button>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </div>
    </section>
  );
};

export { Navbar };
