import { GraduationCap } from "lucide-react";

export function Logo() {
  return (
    <div className="flex items-center gap-2 px-2">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
        <GraduationCap className="h-6 w-6 text-primary-foreground" />
      </div>
      <div className="flex flex-col">
        <span className="text-lg font-semibold leading-tight">TutorHub</span>
        <span className="text-xs text-muted-foreground">Find Your Tutor</span>
      </div>
    </div>
  );
}
