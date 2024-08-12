import Button from "@/components/Common/Button";
import { useAppContext } from "@/contexts/ContextApi";
import {
  SearchRounded as SearchRoundedIcon,
  AddOutlined as AddOutlinedIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import { ChangeEvent, useEffect, useRef } from "react";
export default function SearchBar({
  searchQuery,
  setSearchQuery,
}: {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}) {
  const {
    openProjectWindowObject: { openProjectWindow, setOpenProjectWindow },
    openAllProjectsWindowObject: { openAllProjectsWindow },
  } = useAppContext();

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Focus the input only when openAllProjectWindow opens (true)
    if (openAllProjectsWindow) {
      const focusInput = () => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      };
      if (!openProjectWindow) {
        //Schedule focus setting for the next render
        setTimeout(focusInput, 0);
      }
    }
  }, [openAllProjectsWindow, openProjectWindow]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  return (
    <div className="flex gap-5 items-center justify-between mt-12 relative">
      {/* Seach input and icon */}
      <div
        className={`h-[42px] bg-slate-50 flex items-center text-sm rounded-md pl-3 gap-1 w-[85%]`}
      >
        <SearchRoundedIcon className="text-slate-400" />
        <input
          ref={inputRef}
          value={searchQuery}
          onChange={handleChange}
          type="text"
          placeholder="Search a Project..."
          className="bg-transparent outline-none w-full font-light"
        />
        {/* Close Icon */}
        {searchQuery.length > 0 && (
          <div
            onClick={() => setSearchQuery("")}
            className="text-slate-400 cursor-pointer absolute right-2 top-3"
          >
            <CloseIcon sx={{ fontSize: 17 }} />
          </div>
        )}
      </div>
      {/* Crtaete New Project Button */}
      <Button
        buttonType="primary"
        className="ml-2 p-[10px] flex w-[15%] items-center justify-center max-lg:w-[25%]"
      >
        <AddOutlinedIcon sx={{ fontSize: 17 }} />
        <span className="max-md:hidden">Create New</span>
      </Button>
    </div>
  );
}
