"use client";

import { User, UserStatus } from "@/types/user.types";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";
import {
  Loader2,
  MoreHorizontalIcon,
  ShieldCheck,
  ShieldAlert,
  UserX,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { updateUserStatus } from "@/action/action";

export default function ManageUsersTable({ users }: { users: User[] }) {
  console.log(users);
  const router = useRouter();
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<{
    id: string;
    status: string;
  } | null>(null);
  const [isPending, setIsPending] = useState(false);

  const handleUpdateStatus = async (id: string, newStatus: UserStatus) => {
    setIsPending(true);
    const toastId = toast.loading("Updating user....");

    try {
      const res = await updateUserStatus(id, newStatus);

      if (res.error) {
        toast.error(res.error, { id: toastId });
      } else {
        toast.success(`User is now ${newStatus}`, { id: toastId });

        router.refresh();
      }
    } catch (error) {
      toast.error("Something went wrong", { id: toastId });
    } finally {
      setIsPending(false);
      setIsAlertOpen(false);
      setSelectedUser(null);
    }
  };

  return (
    <div className="border rounded-md bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">Profile</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Joined</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users?.length > 0 ? (
            users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={user.image || ""} alt={user.name} />
                    <AvatarFallback>
                      {user.name?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <span
                    className={cn(
                      "px-2 py-1 rounded-full text-xs font-bold",
                      user.status === "ACTIVE" && "bg-green-100 text-green-700",
                      user.status === "INACTIVE" &&
                        "bg-yellow-100 text-yellow-700",
                      user.status === "BLOCKED" && "bg-red-100 text-red-700",
                    )}
                  >
                    {user.status}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="capitalize text-slate-600">
                    {user.role.toLowerCase()}
                  </span>
                </TableCell>
                <TableCell className="text-slate-500">
                  {new Date(user.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </TableCell>

                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="size-8">
                        <MoreHorizontalIcon className="size-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-40">
                      <DropdownMenuLabel>Update Status</DropdownMenuLabel>
                      <DropdownMenuSeparator />

                      {/* Active Button */}
                      <DropdownMenuItem
                        onClick={() =>
                          handleUpdateStatus(user.id, UserStatus.ACTIVE)
                        }
                        disabled={user.status === "ACTIVE"}
                        className="cursor-pointer"
                      >
                        <ShieldCheck className="mr-2 h-4 w-4 text-green-600" />
                        <span>Set Active</span>
                      </DropdownMenuItem>

                      {/* Inactive Button */}
                      <DropdownMenuItem
                        onClick={() =>
                          handleUpdateStatus(user.id, UserStatus.INACTIVE)
                        }
                        disabled={user.status === "INACTIVE"}
                        className="cursor-pointer"
                      >
                        <ShieldAlert className="mr-2 h-4 w-4 text-yellow-600" />
                        <span>Set Inactive</span>
                      </DropdownMenuItem>

                      {/* Block Button */}
                      <DropdownMenuItem
                        className="text-destructive focus:text-destructive cursor-pointer"
                        onSelect={() => {
                          setSelectedUser({
                            id: user.id,
                            status: UserStatus.BLOCKED,
                          });
                          setIsAlertOpen(true);
                        }}
                        disabled={user.status === "BLOCKED"}
                      >
                        <UserX className="mr-2 h-4 w-4" />
                        <span>Block User</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center">
                No users found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Confirmation for Blocking */}
      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to block this user?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Blocking a user will restrict their access to the platform. You
              can unblock them later by setting their status to Active.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              disabled={isPending}
              onClick={(e) => {
                e.preventDefault();
                if (selectedUser)
                  handleUpdateStatus(selectedUser.id, UserStatus.BLOCKED);
              }}
              className="bg-red-600 hover:bg-red-700"
            >
              {isPending ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Confirm Block"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
