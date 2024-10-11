import React from "react";
import { cn } from "@/ui/lib/shadcn";

export function Stack({
  children,
  direction,
  className = "",
}: {
  children: React.ReactNode;
  direction: "col" | "row";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex",
        direction === "col" ? `flex-col space-y-3` : `flex-row space-x-3`,
        className
      )}
    >
      {children}
    </div>
  );
}
