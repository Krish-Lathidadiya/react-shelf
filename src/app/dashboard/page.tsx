"use client";

import { useAppContext } from "../../contexts/ContextApi";
import { UserButton, UserProfile } from "@clerk/nextjs";
import Sidebar from "./Sidebar";
import ContentArea from "./ContentArea";
import AddProjectWindow from "./components/AddProjectWindow";
import IconWindow from "./components/IconWindow";
import { SoftLayer } from "@/lib/utils";
import { useState } from "react";
import { Code as CodeIcon } from "@mui/icons-material";
import { IconsData } from "@/lib/AllIconsArray";

export type SelectedIcon = {
  icon: React.ReactNode;
  name: string;
};

export default function Dashboard() {
  const {
    openProjectWindowObject: { openProjectWindow },
  } = useAppContext();

  const [selectedIcon, setSelectedIcon] = useState<SelectedIcon>({
    icon: <CodeIcon />,
    name: "CodeIcon",
  });

  const getTheIconSelected = (icon: IconsData) => {
    setSelectedIcon({ icon: icon.icon, name: icon.name });
  };

  return (
    <div className="flex poppins relative">
      <IconWindow onUpdateIconSelected={getTheIconSelected} />
      <AddProjectWindow selectedIcon={selectedIcon} />
      {openProjectWindow && <SoftLayer />}
      <Sidebar />
      <ContentArea />
    </div>
  );
}
