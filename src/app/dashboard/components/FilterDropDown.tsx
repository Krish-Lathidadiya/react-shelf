import { useAppContext } from "@/contexts/ContextApi";
import {
  SearchRounded as SearchRoundedIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Checkbox } from "@mui/material";

export default function FilterDropDown() {
  const {
    openFilterDropDownObject: { openFilterDropDown, setOpenFilterDropDown },
    filterDropDownPositionObject: { filterDropDownPositions },
    isMobileViewObject: { isMobileView },
    allProjectsObject: { allProjects },
    selectedProjectToFilterObject: {
      selectedProjectToFilter,
      setSelectedProjectToFilter,
    },
  } = useAppContext();

  const filterDropDownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        filterDropDownRef.current &&
        !filterDropDownRef.current.contains(e.target as Node)
      ) {
        setOpenFilterDropDown(false);
      }

      function handleScroll() {
        setOpenFilterDropDown(false);
      }
      function handleWheel(e: WheelEvent) {
        if (e.deltaY !== 0) {
          setOpenFilterDropDown(false);
        }
      }

      document.addEventListener("mousedown", handleClickOutside);
      window.addEventListener("scroll", handleScroll);
      window.addEventListener("wheel", handleWheel);

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        document.removeEventListener("scroll", handleScroll);
        window.removeEventListener("wheel", handleWheel);
      };
    };
  }, [setOpenFilterDropDown]);

  const [searchInput, setSearchInput] = useState("");

  //   project have at least one favorite component
  const projectWithFavoriteInfo = allProjects
    .map((project) => {
      const favoriteComponents = project.components.filter(
        (component) => component.isFavorite
      );

      const favoriteCount = favoriteComponents.length;

      return {
        ...project,
        favoriteCount,
      };
    })
    .filter((project) => project.favoriteCount > 0);

  // We only select one project to filter
  const handleProjectSelect = (projectName: string) => {
    setSelectedProjectToFilter((prevSelected) =>
      prevSelected === projectName ? null : projectName
    );
    setOpenFilterDropDown(false);
  };

  const handleClearSelection = () => {
    setSelectedProjectToFilter(null);
    setSearchInput("");
  };

  const searchFilteredProjects = projectWithFavoriteInfo.filter((project) =>
    project.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  console.log("openFilterDropDown:", openFilterDropDown);

  return (
    <div
      ref={filterDropDownRef}
      style={{
        display: openFilterDropDown ? "flex" : "none",
        top: filterDropDownPositions.top + 54,
        left: isMobileView
          ? filterDropDownPositions.left - 230
          : filterDropDownPositions.left - 98,
      }}
      className="bg-white p-3  z-[60] border border-slate-50 absolute py-4 w-[310px] select-none shadow-md rounded-lg flex-col gap-5"
    >
      {/* Seacrh Bar */}
      <SearchBar searchInput={searchInput} setSearchInput={setSearchInput} />
      {/* Selected Project */}
      {selectedProjectToFilter && (
        <div className="flex gap-1 items-center">
          <span className="text-[12px] rounded-lg bg-sky-100 text-sky-500 p-[6px] px-2">
            {selectedProjectToFilter}
          </span>
          <CloseIcon
            onClick={handleClearSelection}
            sx={{ fontSize: 16 }}
            className="text-sky-500 pl-1 cursor-pointer"
          />
        </div>
      )}

      {/* Divider Line */}
      <hr className="border-t border-slate-200" />
      {/* Unique Projects */}
      <div className="flex flex-col gap-2 overflow-auto h-60 p-2 rounded-md text-slate-600 cursor-pointer bg-slate-50">
        {/* Project 1 */}
        {searchFilteredProjects.length === 0 && (
          <div className="text-[13px] text-slate-400 p-3">
            No projects found...
          </div>
        )}
        {searchFilteredProjects.map((project) => (
          <div className="text-[13px] bg-white rounded-lg p-[9px]  px-3 flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Checkbox
                checked={selectedProjectToFilter === project.name}
                onClick={() => handleProjectSelect(project.name)}
                size="small"
              />
              <span>{project.name}</span>
            </div>
            <span className="text-sky-400 p-1 px-2 rounded-full">
              {project.favoriteCount}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

const SearchBar = ({
  searchInput,
  setSearchInput,
}: {
  searchInput: string;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const {
    openFilterDropDownObject: { openFilterDropDown },
  } = useAppContext();
  const inputRef = useRef<HTMLInputElement>(null);
  const handleSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  useEffect(() => {
    if (openFilterDropDown) {
      inputRef.current?.focus();
    }
  }, [openFilterDropDown]);
  return (
    <div
      className={`h-[38px] bg-slate-50 flex items-center text-[13px] rounded-md pl-2 gap-1 w-[100%]`}
    >
      <div className="flex items-center gap-1">
        <SearchRoundedIcon sx={{ fontSize: 17 }} className="text-slate-400" />
        <input
          ref={inputRef}
          onChange={handleSearchInput}
          value={searchInput}
          type="text"
          placeholder="Search for a project..."
          className="bg-transparent outline-none w-full font-light"
        />
      </div>
      {searchInput && (
        <CloseIcon
          sx={{ fontSize: 24 }}
          onClick={() => setSearchInput("")}
          className="text-slate-400 cursor-pointer pr-2"
        />
      )}
    </div>
  );
};
