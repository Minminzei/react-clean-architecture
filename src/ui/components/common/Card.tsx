import React from "react";
import { cn } from "@/ui/lib/shadcn";

function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-lg border bg-card text-card-foreground shadow-sm bg-white",
        className
      )}
    >
      <div style={{ padding: "24px" }}>{children}</div>
    </div>
  );
}

export { Card };
