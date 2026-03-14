import clsx from "clsx";
import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
  size?: "sm" | "md";
}

const variantStyles = {
  primary:   "bg-indigo-600 hover:bg-indigo-700 text-white border-transparent",
  secondary: "bg-white hover:bg-gray-50 text-gray-800 border-gray-300",
  danger:    "bg-red-600 hover:bg-red-700 text-white border-transparent",
};

const sizeStyles = {
  sm: "px-2.5 py-1 text-xs",
  md: "px-3.5 py-2 text-sm",
};

export default function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        "inline-flex items-center gap-1.5 font-semibold rounded-lg border transition-colors disabled:opacity-50 whitespace-nowrap",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
