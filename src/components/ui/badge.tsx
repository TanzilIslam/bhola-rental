import { cn } from "@/lib/utils";

type Variant = "default" | "success" | "warning" | "destructive" | "muted";

const variantClasses: Record<Variant, string> = {
  default:     "bg-primary/10 text-primary",
  success:     "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  warning:     "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  destructive: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  muted:       "bg-muted text-muted-foreground",
};

interface BadgeProps {
  label: string;
  variant?: Variant;
  className?: string;
}

export function Badge({ label, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        variantClasses[variant],
        className
      )}
    >
      {label}
    </span>
  );
}
