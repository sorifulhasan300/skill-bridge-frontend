"use client";

import React, { useState } from "react";
import { Plus, Loader2, Image as ImageIcon, Edit2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { createCategory, updateCategory } from "@/action/action"; // Don't forget to import updateCategory

interface Category {
  id: string;
  name: string;
  icon: string;
  createdAt: string;
}

export default function ManageCategories({
  categories,
}: {
  categories: Category[];
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    icon: "",
  });

  const handleEditClick = (category: Category) => {
    setSelectedId(category.id);
    setFormData({ name: category.name, icon: category.icon });
    setOpen(true);
  };

  const handleAddClick = () => {
    setSelectedId(null);
    setFormData({ name: "", icon: "" });
    setOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.icon) {
      return toast.error("Please fill all fields");
    }

    try {
      setIsPending(true);
      let res;

      if (selectedId) {
        // Edit logic
        res = await updateCategory(selectedId, formData);
      } else {
        // Create logic
        res = await createCategory(formData);
      }
      
      if (res.success) {
        toast.success(
          selectedId ? "Updated successfully" : "Created successfully",
        );
        setOpen(false);
        router.refresh();
      } else {
        toast.error(res.error || "Something went wrong");
      }
    } catch (error) {
      toast.error("Operation failed");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Manage Categories</h1>
        <Button onClick={handleAddClick} className="flex items-center gap-2">
          <Plus className="size-4" /> Add Category
        </Button>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>
                {selectedId ? "Edit Category" : "Create New Category"}
              </DialogTitle>
              <DialogDescription>
                {selectedId
                  ? "Update category details below."
                  : "Add a new subject category."}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Category Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="e.g. Biology"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="icon">Icon Name/URL</Label>
                <Input
                  id="icon"
                  value={formData.icon}
                  onChange={(e) =>
                    setFormData({ ...formData, icon: e.target.value })
                  }
                  placeholder="e.g. bio.jpg"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" disabled={isPending} className="w-full">
                {isPending ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : selectedId ? (
                  "Update Category"
                ) : (
                  "Create Category"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Icon</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories?.map((category) => (
              <TableRow key={category.id}>
                <TableCell>
                  <div className="size-8 rounded bg-slate-100 flex items-center justify-center">
                    <ImageIcon className="size-4 text-slate-500" />
                  </div>
                </TableCell>
                <TableCell className="font-medium">{category.name}</TableCell>
                <TableCell className="text-muted-foreground">
                  {new Date(category.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEditClick(category)}
                  >
                    <Edit2 className="size-4 mr-1" /> Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
