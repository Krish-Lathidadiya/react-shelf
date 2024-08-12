import React from "react";
import {
  Category as CategoryIcon,
  Rectangle as RectangleIcon,
  Code as CodeIcon,
  DeveloperMode as DeveloperModeIcon,
  Web as WebIcon,
  DesktopWindows as DesktopWindowsIcon,
  PhoneIphone as PhoneIphoneIcon,
} from "@mui/icons-material";

type TextToIconProps = {
  text: string;
  size?: "small" | "medium" | "large";
  fontSize?: number;
  className?: string;
};

export const TextToIcon = ({
  text,
  size = "medium",
  fontSize,
  className = "",
}: TextToIconProps) => {
  const commonProps = {
    sx: fontSize ? { fontSize } : {},
    fontSize: size,
    className: `text-sky-400 ${className}`,
  };

  switch (text) {
    case "categoryIcon":
      return <CategoryIcon {...commonProps} />;
    case "RectangleIcon":
      return <RectangleIcon {...commonProps} />;
    case "CodeIcon":
      return <CodeIcon {...commonProps} />;
    case "DeveloperModeIcon":
      return <DeveloperModeIcon {...commonProps} />;
    case "WebIcon":
      return <WebIcon {...commonProps} />;
    case "DesktopWindowsIcon":
      return <DesktopWindowsIcon {...commonProps} />;
    case "PhoneIphoneIcon":
      return <PhoneIphoneIcon {...commonProps} />;
    default:
      return <CategoryIcon {...commonProps} />;
  }
};

export const SoftLayer = () => {
  return (
    <div className="w-full h-full fixed top-0 left-0 z-[1000] bg-black opacity-30"></div>
  );
};

// <div className="w-full h-full fixed top-0 right-0 z-40 bg-black opacity-30"></div>
