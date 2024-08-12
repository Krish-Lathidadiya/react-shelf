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
import { Toaster } from "react-hot-toast";
import ComponentPage from "./ComponentPage";
import DropDown from "./components/DropDown";
import ConfirmationDeleteWindow from "./components/DeleteWindow";
import AllProjectsWindow from "./components/AllProjectsWindow";
import ComponentEditor from "./components/ComponentPage/ComponentEditor";
import SortingDropDown from "./components/SortingDropDown";
import AllFavoriteComponents from "./components/AllFavoriteComponents";
import FilterDropDown from "./components/FilterDropDown";
export type SelectedIcon = {
  icon: React.ReactNode;
  name: string;
};

export default function Dashboard() {
  const {
    openProjectWindowObject: { openProjectWindow },
    showComponentPageObject: { showComponentPage },
    openDeleteWindowObject: { openDeleteWindow },
    openComponentEditorObject: { openComponentEditor },
    openAllProjectsWindowObject: { openAllProjectsWindow },
  } = useAppContext();

  const [selectedIcon, setSelectedIcon] = useState<SelectedIcon>({
    icon: <CodeIcon />,
    name: "CodeIcon",
  });

  const getTheIconSelected = (icon: IconsData) => {
    setSelectedIcon({ icon: icon.icon, name: icon.name });
  };

  return (
    <div className="flex poppins relative border">
      <AllProjectsWindow />
      <AllFavoriteComponents/>
      <FilterDropDown/>
      <SortingDropDown/>
      <ComponentEditor />
      <ConfirmationDeleteWindow />
      <DropDown />
      <Toaster />
      <IconWindow onUpdateIconSelected={getTheIconSelected} />
      <AddProjectWindow selectedIcon={selectedIcon} setSelectedIcon={setSelectedIcon}/>
      {(openProjectWindow ||
        openDeleteWindow ||
        openComponentEditor ||
        openAllProjectsWindow) && (<SoftLayer />)}

      <Sidebar />
      {showComponentPage ? <ComponentPage /> : <ContentArea />}
    </div>
  );
}
