"use client";

import { GraduationCap, Menu, ArrowRight } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
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
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
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
import { logout } from "@/service/logout.service";

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

interface Navbar1Props {
  className?: string;
  logo?: {
    url: string;
    title: string;
  };
  menu?: MenuItem[];
  auth?: {
    login: { title: string; url: string };
    signup: { title: string; url: string };
  };
}

const Navbar = ({
  logo = { url: "/", title: "TutorHub" },
  menu = [
    { title: "Home", url: "/" },
    { title: "Tutors", url: "/tutors" },
    { title: "Careers", url: "/careers" },
    { title: "Support", url: "/support" },
  ],
  auth = {
    login: { title: "Login", url: "/login" },
    signup: { title: "Sign up", url: "/signup" },
  },
  className,
}: Navbar1Props) => {
  const pathname = usePathname();
  const router = useRouter();
  const authContext = useAuth();
  const session = authContext?.session;
  const isLoading = authContext?.isLoading || false;
  const role = session?.user?.role;

  // --- Helper: Render Desktop Menu ---
  const renderMenuItem = (item: MenuItem) => {
    if (item.items) {
      const isSubActive = item.items.some((sub) => pathname === sub.url);
      return (
        <NavigationMenuItem key={item.title}>
          <NavigationMenuTrigger
            className={cn(
              isSubActive && "bg-muted text-foreground font-semibold",
            )}
          >
            {item.title}
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-80 p-2">
              {item.items.map((subItem) => (
                <NavigationMenuLink asChild key={subItem.title}>
                  <SubMenuLink
                    item={subItem}
                    isActive={pathname === subItem.url}
                  />
                </NavigationMenuLink>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      );
    }

    const isActive = pathname === item.url;
    return (
      <NavigationMenuItem key={item.title}>
        <Link href={item.url} legacyBehavior passHref>
          <NavigationMenuLink
            className={cn(
              navigationMenuTriggerStyle(),
              isActive
                ? "bg-muted text-foreground font-bold"
                : "text-muted-foreground",
            )}
          >
            {item.title}
          </NavigationMenuLink>
        </Link>
      </NavigationMenuItem>
    );
  };

  // --- Helper: Render Mobile Menu ---
  const renderMobileMenuItem = (item: MenuItem) => {
    const isActive = pathname === item.url;
    if (item.items) {
      return (
        <AccordionItem
          key={item.title}
          value={item.title}
          className="border-b-0"
        >
          <AccordionTrigger className="py-2 text-base font-semibold hover:no-underline">
            {item.title}
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-2 ml-4 border-l pl-4">
            {item.items.map((subItem) => (
              <Link
                key={subItem.title}
                href={subItem.url}
                className={cn(
                  "text-sm py-1 transition-colors",
                  pathname === subItem.url
                    ? "text-primary font-bold"
                    : "text-muted-foreground",
                )}
              >
                {subItem.title}
              </Link>
            ))}
          </AccordionContent>
        </AccordionItem>
      );
    }

    return (
      <Link
        key={item.title}
        href={item.url}
        className={cn(
          "text-base font-semibold py-2 rounded-md transition-all",
          isActive ? "text-primary translate-x-1" : "text-foreground",
        )}
      >
        {item.title}
      </Link>
    );
  };

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
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary transition-transform group-hover:scale-105">
              <GraduationCap className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold tracking-tight hidden sm:block">
              TutorHub
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center">
            <NavigationMenu>
              <NavigationMenuList>
                {menu?.map((item) => renderMenuItem(item))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              <ModeToggle />
            </div>

            {isLoading ? (
              <Spinner />
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

            {/* Mobile Sheet Trigger */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] flex flex-col">
                <SheetHeader className="text-left border-b pb-4">
                  <SheetTitle className="flex items-center gap-2">
                    <GraduationCap className="h-6 w-6 text-primary" />
                    TutorHub
                  </SheetTitle>
                </SheetHeader>

                <div className="flex flex-col gap-4 mt-6 flex-grow">
                  <Accordion type="single" collapsible className="w-full">
                    {menu?.map((item) => renderMobileMenuItem(item))}
                  </Accordion>
                </div>

                <div className="border-t pt-6 space-y-3">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm font-medium">Theme</span>
                    <ModeToggle />
                  </div>
                  {session ? (
                    <>
                      <Button
                        className="w-full justify-start gap-2"
                        variant="secondary"
                        asChild
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
                          Dashboard <ArrowRight className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button
                        variant="destructive"
                        className="w-full"
                        onClick={() => logout()}
                      >
                        Logout
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button asChild variant="outline" className="w-full">
                        <Link href={auth.login.url}>{auth.login.title}</Link>
                      </Button>
                      <Button asChild className="w-full">
                        <Link href={auth.signup.url}>{auth.signup.title}</Link>
                      </Button>
                    </>
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

const SubMenuLink = ({
  item,
  isActive,
}: {
  item: MenuItem;
  isActive: boolean;
}) => {
  return (
    <Link
      href={item.url}
      className={cn(
        "flex flex-col gap-1 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none",
        isActive ? "bg-muted" : "hover:bg-muted",
      )}
    >
      <div className="flex items-center gap-2">
        {item.icon && <span className="text-primary">{item.icon}</span>}
        <div
          className={cn(
            "text-sm font-semibold",
            isActive ? "text-primary" : "text-foreground",
          )}
        >
          {item.title}
        </div>
      </div>
      {item.description && (
        <p className="text-xs leading-snug text-muted-foreground line-clamp-2">
          {item.description}
        </p>
      )}
    </Link>
  );
};

export { Navbar };
