import { useAppContext } from "@/contexts/ContextApi";
import {
  KeyboardArrowUpRounded as KeyboardArrowUpRoundedIcon,
  KeyboardArrowDownRounded as KeyboardArrowDownRoundedIcon,
} from "@mui/icons-material";
import { useRef } from "react";

export default function SortByComponent() {
  const {
    allProjectsObject: { allProjects, setAllProjects },
    openSortingDropDownObject: { openSortingDropDown, setOpenSortingDropDown },
    sortingDropDownPositionsObject: { setSortingDropDownPositions },
    sortingOptionsObject: { sortingOptions },
  } = useAppContext();

  const nameRef = useRef<HTMLDivElement>(null);

  // open sorting drop down with specific drop down position
  const openSortingDropDownFunction = () => {
    if (nameRef.current) {
      const rect = nameRef.current.getBoundingClientRect();
      const top = rect.top;
      const left = rect.left;

      setSortingDropDownPositions({ top: top, left: left });
    }
    setOpenSortingDropDown(true);
  };

  const selectedName = sortingOptions.find((category) =>
    category.options.some((option) => option.selected)
  );
  return (
    <div className="mt-11 mb-[13px] flex gap-2 items-center justify-between text-[13px]">
      <div className="flex gap-1">
        <span className="text-slate-500">You have</span>
        <span className="text-sky-500 font-semibold">{allProjects.length}</span>
        <span className="text-slate-400">projects!</span>
      </div>
      <div className="flex gap-2 items-center">
        <span className="text-sky-500 flex gap-1 items-center">Sort By:</span>
        <div
          ref={nameRef}
          onClick={openSortingDropDownFunction}
          className="text-sky-500 flex gap-1 items-center cursor-pointer"
        >
          <span>{selectedName?.category}</span>
          {openSortingDropDown ? (
            <KeyboardArrowUpRoundedIcon className="text-[13px]" />
          ) : (
            <KeyboardArrowDownRoundedIcon className="text-[13px]" />
          )}
        </div>
      </div>
    </div>
  );
}
