import Button from "@/components/Common/Button";
import { useAppContext } from "@/contexts/ContextApi";
import {
  Search as SearchIcon,
  FilterListRounded as FilterListRoundedIcon,
  KeyboardArrowDownRounded as KeyboardArrowDownRoundedIcon,
  KeyboardArrowUpRounded as KeyboardArrowUpRoundedIcon,
} from "@mui/icons-material";
import { useEffect, useRef } from "react";

export default function SearchBar({
  searchInput,
  setSearchInput,
}: {
  searchInput: string;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
}) {
  const {
    openFilterDropDownObject: { openFilterDropDown, setOpenFilterDropDown },
    filterDropDownPositionObject: { setFilterDropDownPositions },
    openAllFavoriteComponentsObject: { openAllFavoriteComponentsWindow },
    allFavoritesComponentsObject: { allFavoritesComponents },
  } = useAppContext();

  const buttonRef = useRef<HTMLButtonElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Focus the input only when openAllProjectWindow opens (true)
    if (openAllFavoriteComponentsWindow) {
      const focusInput = () => {
        if (searchInputRef.current) {
          searchInputRef.current?.focus();
        }
      };
      if (!openFilterDropDown) {
        // Schedule focus setting for the next render
        setTimeout(focusInput, 0);
      }
    }
  }, [openAllFavoriteComponentsWindow]);

  // Opern Filter Drop Down
  const openFilterDropDownFx = () => {
    setOpenFilterDropDown(true);
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const top = rect.top;
      const left = rect.left;
      setFilterDropDownPositions({ top: top, left: left });
    }
  };
  return (
    <div className="flex gap-5 items-center justify-between mt-12 relative">
      {/* 1.Seacrh Input */}
      <div
        className={`h-[42px] bg-slate-50 flex items-center text-sm rounded-md pl-3 gap-1 w-[80%]`}
      >
        <SearchIcon className="text-slate-400" />
        <input
          ref={searchInputRef}
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          type="text"
          placeholder="Seach for a component..."
          className="bg-transparent outline-none w-full font-light"
        />
      </div>
      {/* 2.Filter Option */}
      <Button
        ref={buttonRef}
        onClick={openFilterDropDownFx}
        buttonType="primary"
        disabled={allFavoritesComponents.length === 0}
        className={`${allFavoritesComponents.length === 0 && "opacity-[0.5]"} ml-2 p-[10px] flex gap-2 w-[20%] items-center`}
      >
        <FilterListRoundedIcon sx={{ fontSize: 17 }} />
        <span className="max-md:hidden">
          Filter By: <span className="font-semibold text-black ">Project</span>
        </span>
        {openFilterDropDown ? (
          <KeyboardArrowUpRoundedIcon sx={{ fontSize: 17 }} />
        ) : (
          <KeyboardArrowDownRoundedIcon sx={{ fontSize: 17 }} />
        )}
      </Button>
    </div>
  );
}
