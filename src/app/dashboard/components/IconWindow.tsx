import { useAppContext } from "@/contexts/ContextApi";
import { Apps as AppsIcon, Close as CloseIcon } from "@mui/icons-material";
import Button from "@/components/Common/Button";
import AllIconsData from "@/lib/AllIconsData";
import { useState } from "react";
import { AllIconsArray, IconsData } from "@/lib/AllIconsArray";
export default function IconWindow({
  onUpdateIconSelected,
}: {
  onUpdateIconSelected: (icon: IconsData) => void;
}) {
  const {
    isMobileViewObject: { isMobileView },
    openIconWindowObject: { openIconWindow, setOpenIconWindow },
  } = useAppContext();

  console.log("openIconWindow", openIconWindow);

  const [allIconsState, setAllIconsState] =
    useState<IconsData[]>(AllIconsArray);

  return (
    <div
      className={`${openIconWindow ? "absolute" : "hidden"} ${
        isMobileView ? "w-[80%]" : "w-[40%]"
      } h-[490px]  bg-white rounded-lg shadow-md left-1/2  top-20 -translate-x-1/2 z-50`}
    >
      {/* Header */}
      <div className="flex justify-between items-center pt-7 px-7 mb-8">
        <div className="flex items-center gap-2">
          {/* Category Icon */}
          <div className="w-[30px] h-[30px] bg-sky-200 rounded-full flex items-center justify-center">
            <AppsIcon
              sx={{ fontSize: 17 }}
              className="text-sky-400 text-[17px]"
            />
          </div>
          {/* Category Header */}
          <span className="font-semibold text-lg text-black">Project icons</span>
        </div>
        <CloseIcon
          onClick={() => setOpenIconWindow(false)}
          className="text-slate-400 hover:text-slate-500 hover:shadow-md text-[18px] cursor-pointer"
        />
      </div>

      {/* Message */}
      <div className="mx-7 w-[80%] text-[12px] text-slate-400">
        {`Please select the icons you'd like to use from the collection below:`}
      </div>
      {/* All Icons Area */}
      <div className="w-full flex flex-col items-center mt-3">
        <div className="border border-slate-100 w-[92%] h-[280px] overflow-auto rounded-md bg-slate-100">
          {/* All icos */}
          <AllIconsData
            allIconsState={allIconsState}
            setAllIconsState={setAllIconsState}
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-4 mt-6 px-7 text-[12px]">
        <Button onClick={() => setOpenIconWindow(false)} buttonType="secondary">
          Cancel
        </Button>
        <Button
          onClick={() => {
            onUpdateIconSelected(
              allIconsState.filter((icon) => icon.isSelected)[0]
            );
            setOpenIconWindow(false);
          }}
          buttonType="primary"
        >
          Save
        </Button>
      </div>
    </div>
  );
}
