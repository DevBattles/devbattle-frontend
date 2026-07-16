import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-slate-900",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30",
        secondary:
          "border-transparent bg-slate-700 text-slate-300 hover:bg-slate-600",
        destructive:
          "border-transparent bg-red-500/20 text-red-400 hover:bg-red-500/30",
        outline: "border-slate-600 text-slate-300",
        success:
          "border-transparent bg-green-500/20 text-green-400 hover:bg-green-500/30",
        warning:
          "border-transparent bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30",
        info: "border-transparent bg-blue-500/20 text-blue-400 hover:bg-blue-500/30",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Badge({ className, variant, ...props }) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
