import {
  Bookmark as BookmarkIcon,
  Brush as BrushIcon,
  BubbleChart as BubbleChartIcon,
  Cast as CastIcon,
  Category as CategoryIcon,
} from "@mui/icons-material";

import React, { useCallback, useEffect } from "react";
import { IconsData } from "./AllIconsArray";
import { useAppContext } from "@/contexts/ContextApi";

export default function AllIconsData({
  allIconsState,
  setAllIconsState,
}: {
  allIconsState: IconsData[];
  setAllIconsState: React.Dispatch<React.SetStateAction<IconsData[]>>;
}) {
  const {
    selectedProjectObject: { selectedProject },
    openIconWindowObject: { openIconWindow },
  } = useAppContext();
  // Memoize the handleClickedIcon function
  const handleClickedIcon = useCallback(
    (singleIcon: IconsData) => {
      setAllIconsState((prevState) =>
        prevState.map((icon) => ({
          ...icon,
          isSelected: icon.id === singleIcon.id ? !icon.isSelected : false,
        }))
      );
    },
    [setAllIconsState]
  );

  useEffect(() => {
    if (selectedProject) {
      setAllIconsState((prevState) =>
        prevState.map((icon) => ({
          ...icon,
          isSelected: icon.name === selectedProject?.icon,
        }))
      );
    }
  }, [openIconWindow]); //Dependency on selectedProject only

  return (
    <div className="flex flex-wrap gap-2 text-sky-500 p-3">
      {allIconsState.map((singleIcon) => {
        // Use a variable to store conditional class names
        const iconClass = `p-2 w-9 h-9 shadow-sm border border-slate-50 flex items-center justify-center rounded-lg hover:bg-sky-500 hover:text-white ${
          singleIcon.isSelected
            ? "bg-sky-500 text-white"
            : "bg-white text-sky-500"
        }`;

        return (
          <div
            key={singleIcon.id}
            onClick={() => handleClickedIcon(singleIcon)}
            className={iconClass}
          >
            {singleIcon.icon}
          </div>
        );
      })}
    </div>
  );
}
