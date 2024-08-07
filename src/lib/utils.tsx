import React from "react";
import {
  Category as CategoryIcon,
  Rectangle as RectangleIcon,
} from "@mui/icons-material";

type TextToIconProps = {
  text: string;
  size?: "small" | "medium" | "large";
};

export const TextToIcon = ({ text, size }: TextToIconProps) => {
  switch (text) {
    case "categoryIcon":
      return <CategoryIcon fontSize={size} className="text-sky-400" />;
    case "RectangleIcon":
      return <RectangleIcon fontSize={size} className="text-sky-400" />;
    default:
      return <CategoryIcon fontSize={size} className="text-sky-400" />;
  }
};

export const SoftLayer = () => {
  return (
    <div
      className="w-full h-full fixed top-0 right-0
      z-40 bg-black opacity-30"
    ></div>
  );
};
