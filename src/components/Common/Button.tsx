import React from "react";
import { twMerge } from "tailwind-merge";

type ButtonProps = {
  className?: string;
  buttonType: "primary" | "secondary" | "primary-transparent";
  onClick?: () => void;
  children: React.ReactNode;
};

function Button({ className, buttonType, onClick, children }: ButtonProps) {
  // Define base and variant styles
  const baseStyles = "text-sm px-4 py-2 rounded-md";
  const variantStyles =
    buttonType === "primary"
      ? "border border-sky-500 bg-sky-500 hover:bg-sky-600 text-white"
      : buttonType === "secondary"
      ? "border border-slate-200 text-slate-400 hover:border-slate-300 hover:bg-slate-50"
      : buttonType === "primary-transparent"
      ? "border border-sky-500 hover:bg-sky-500"
      : "";

  // Merge class names
  const buttonClasses = twMerge(`${baseStyles} ${variantStyles}`, className);

  return (
    <button className={buttonClasses} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
