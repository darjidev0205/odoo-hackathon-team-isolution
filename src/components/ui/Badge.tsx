import clsx from "clsx";

type BadgeVariant = "green" | "amber" | "red" | "blue" | "gray" | "purple";

interface BadgeProps {
  variant: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  green:  "bg-emerald-100 text-emerald-800",
  amber:  "bg-amber-100 text-amber-800",
  red:    "bg-red-100 text-red-800",
  blue:   "bg-blue-100 text-blue-800",
  gray:   "bg-gray-100 text-gray-700",
  purple: "bg-indigo-100 text-indigo-800",
};

export default function Badge({ variant, children, className }: BadgeProps) {
  return (
    <span className={clsx(
      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold whitespace-nowrap",
      variantStyles[variant],
      className
    )}>
      {children}
    </span>
  );
}
