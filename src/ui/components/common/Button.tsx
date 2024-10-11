import { cn } from "@/ui/lib/shadcn";
import { Icon, IconName } from "@/ui/components/common/Icon";

type Variant = "primary" | "secondary" | "destructive" | "success" | "ghost";

export function Button({
  children,
  onClick,
  className = "",
  variant = "primary",
}: {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
  variant?: Variant;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2",
        className,
        variant
      )}
    >
      {children}
    </button>
  );
}

export function IconButton({
  iconName,
  iconColor,
  iconSize,
  onClick,
  className = "",
}: {
  iconName: IconName;
  iconColor?: string;
  iconSize?: number;
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full border border-slate-300 p-2 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-200 hover:border-slate-800 focus:text-white focus:bg-slate-200 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none",
        className
      )}
    >
      <Icon name={iconName} size={iconSize} color={iconColor} />
    </button>
  );
}
