"use client";

import Button from "@/components/Common/Button";
import { useAppContext } from "@/contexts/ContextApi";
import {
  Close as CloseIcon,
  Category as CategoryIcon,
} from "@mui/icons-material";
import { useEffect, useRef } from "react";
import { SelectedIcon } from "../page";

interface AddProjectWindowProps {
  selectedIcon: SelectedIcon;
}

export default function AddProjectWindow({
  selectedIcon,
}: AddProjectWindowProps) {
  const {
    isMobileViewObject: { isMobileView },
    openProjectWindowObject: { openProjectWindow, setOpenProjectWindow },
    openIconWindowObject: { setOpenIconWindow },
  } = useAppContext();

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (openProjectWindow) {
      inputRef.current?.focus();
    }
  }, [openProjectWindow]);

  return (
    <div
      className={`${openProjectWindow ? "absolute" : "hidden"} ${
        isMobileView ? "w-[80%]" : "w-[40%]"
      } h-[288px] border border-slate-50 bg-white rounded-md shadow-md left-1/2 top-40 -translate-x-1/2 z-20`}
    >
      {/* Header */}
      <div className="flex justify-between items-center pt-7 px-7">
        <div className="flex items-center gap-2">
          {/* Project Icon */}
          <div className="w-[30px] h-[30px] bg-sky-200 rounded-full flex items-center justify-center">
            <CategoryIcon
              sx={{ fontSize: 17 }}
              className="text-sky-400 text-[12px]"
            />
          </div>
          {/* Category Header */}
          <span className="font-semibold text-lg text-black">New Project</span>
        </div>

        <CloseIcon
          onClick={() => setOpenProjectWindow(false)}
          sx={{ fontSize: 16 }}
          className="text-slate-400 hover:shadow-md text-[18px] cursor-pointer hover:text-slate-500"
        />
      </div>

      {/* Body */}
      <div className="flex flex-col gap-2 mt-11 px-7">
        <span className="text-black text-[13px] font-medium">Project Name</span>
        <div className="flex gap-3">
          {/* Input */}
          <input
            ref={inputRef}
            type="text"
            placeholder="Enter Project Name..."
            className="p-[10px] text-[12px] w-full rounded-md border outline-none focus:ring-2 focus:ring-sky-500"
          />
          {/* Icon */}
          <div
            onClick={() => setOpenIconWindow(true)}
            className="w-12 h-10 text-white flex items-center justify-center bg-sky-500 rounded-lg cursor-pointer"
          >
            {selectedIcon?.icon}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="w-full mt-11 flex gap-3 justify-end px-7 items-center">
        {/* Cancel Button */}
        <Button
          onClick={() => setOpenProjectWindow(false)}
          buttonType="secondary"
          className="p-2 px-6 transition-all"
        >
          Cancel
        </Button>
        <Button buttonType="primary" className="p-2 px-3 transition-all">
          Add a Project
        </Button>
      </div>
    </div>
  );
}
