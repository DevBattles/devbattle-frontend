import { cn } from "@/lib/utils";

function Select({ className, children, ...props }) {
  return (
    <select
      className={cn(
        "flex h-10 w-full rounded-xl border border-slate-700 bg-[#0F172A] px-4 py-2 text-white outline-none focus:border-emerald-400 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      {children}
    </select>
  );
}

function SelectItem({ value, children, ...props }) {
  return (
    <option value={value} {...props}>
      {children}
    </option>
  );
}

export { Select, SelectItem };
