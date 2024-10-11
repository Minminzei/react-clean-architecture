import { cn } from "@/ui/lib/shadcn";

function Avatar({
  src,
  alt = "picture",
  className = "",
}: {
  src: string;
  alt?: string;
  className?: string;
}) {
  return (
    <img
      className={cn("w-6 h-6 rounded-full", className)}
      src={src}
      alt={alt}
    />
  );
}

export { Avatar };
