import React from "react";
import { twMerge } from "tailwind-merge";

type ButtonProps = {
  className?: string;
  buttonType: "primary" | "secondary" | "primary-transparent" | "delete";
  onClick?: () => void;
  children: React.ReactNode;
  ref?: React.ForwardedRef<HTMLButtonElement>;
  disabled?: boolean;
};

function Button({
  className,
  buttonType,
  onClick,
  children,
  ref,
  disabled,
}: ButtonProps) {
  // Define base and variant styles
  const baseStyles = "text-sm px-4 py-2 rounded-md";
  const variantStyles =
    buttonType === "primary"
      ? "border border-sky-500 bg-sky-500 hover:bg-sky-600 text-white"
      : buttonType === "secondary"
        ? "border border-slate-200 text-slate-500 hover:border-slate-300 hover:bg-slate-200"
        : buttonType === "delete"
          ? "bg-red-500 text-white hover:bg-red-600"
          : buttonType === "primary-transparent"
            ? "border border-sky-500 hover:bg-sky-500"
            : "";

  // Merge class names
  const buttonClasses = twMerge(`${baseStyles} ${variantStyles}`, className);

  return (
    <button  disabled={disabled} ref={ref} className={buttonClasses} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
