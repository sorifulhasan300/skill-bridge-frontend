import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex flex-col justify-center items-center h-screen gap-2">
      <Loader2 className="h-10 w-10 animate-spin text-primary" />

      <p className="text-xl font-medium text-muted-foreground animate-pulse">
        Loading Dashboard...
      </p>
    </div>
  );
}
