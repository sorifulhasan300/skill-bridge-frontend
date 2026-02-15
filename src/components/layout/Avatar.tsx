"use client";
import { getSession } from "@/action/action";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Roles } from "@/constants/constants";
import { useAuth } from "@/context/auth-context";
import { authClient } from "@/lib/auth-client";
import { BadgeCheckIcon, LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
export function DropdownMenuAvatar() {
  const auth = useAuth();
  const session = auth?.session;
  const refreshAuth = auth?.refreshAuth;
  const router = useRouter();
  const role = session?.user?.role;
  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: async () => {
          toast.success("Signed out successfully");
          router.push("/login");
          if (refreshAuth) await refreshAuth();
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
        <Button variant="ghost" size="icon" className="rounded-full">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="shadcn" />
            <AvatarFallback>LR</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => {
              if (role === Roles.admin) router.push("/admin-dashboard");
              else if (role === Roles.tutor) router.push("/tutor-dashboard");
              else router.push("/student-dashboard");
            }}
            className="flex items-center gap-2"
          >
            <BadgeCheckIcon />
            Dashboard
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut}>
          <LogOutIcon />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
