import React from "react";
import { Loader2 } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  variant?: "primary" | "secondary" | "danger";
}

export const Button: React.FC<ButtonProps> = ({
  children,
  isLoading,
  variant = "primary",
  className = "",
  disabled,
  ...props
}) => {
  const baseStyles =
    "px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2";

  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white disabled:bg-blue-400",
    secondary:
      "bg-gray-200 hover:bg-gray-300 text-gray-800 disabled:bg-gray-100",
    danger: "bg-red-600 hover:bg-red-700 text-white disabled:bg-red-400",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
      {children}
    </button>
  );
};
