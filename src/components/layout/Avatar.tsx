"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Roles } from "@/constants/constants";
import { useAuth } from "@/context/auth-context";
import { authClient } from "@/lib/auth-client";
import { BadgeCheck, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type ExtendedUser = {
  id: string;
  email: string;
  image: string;
  role: "ADMIN" | "STUDENT" | "TUTOR";
  name?: string;
};
export function DropdownMenuAvatar() {
  const auth = useAuth();
  const session = auth?.session;
  const refreshAuth = auth?.refreshAuth;
  const router = useRouter();
  const user = session?.user as ExtendedUser;
  const role = user?.role;
  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: async () => {
          toast.success("Signed out successfully");
          router.push("/login");
          if (refreshAuth) await refreshAuth();
          auth?.setSession(null);
        },
        onError: (ctx) => {
          toast.error(ctx.error.message || "Something went wrong");
        },
      },
    });
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user?.image} alt={user?.name || user?.email} />
            <AvatarFallback className="rounded-lg">{(user?.name || user?.email)?.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56 rounded-lg"
        align="end"
        sideOffset={4}
      >
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <Avatar className="h-8 w-8 rounded-lg">
              <AvatarImage src={user?.image} alt={user?.name || user?.email} />
              <AvatarFallback className="rounded-lg">{(user?.name || user?.email)?.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">{user?.name || user?.email}</span>
              <span className="truncate text-xs">{user?.email}</span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => {
              if (role === Roles.admin) router.push("/admin-dashboard");
              else if (role === Roles.tutor) router.push("/tutor-dashboard");
              else router.push("/student-dashboard");
            }}
          >
            <BadgeCheck />
            Dashboard
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut}>
          <LogOut />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
