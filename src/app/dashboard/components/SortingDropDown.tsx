import { useAppContext } from "@/contexts/ContextApi";
import { Project } from "@/lib/allData";
import { useEffect, useRef, useState } from "react";

export default function SortingDropDown() {
  const {
    openSortingDropDownObject: { openSortingDropDown, setOpenSortingDropDown },
    sortingDropDownPositionsObject: {
      sortingDropDownPositions: { top, left },
    },
    allProjectsObject: { allProjects },
    sortedProjectsObject: { sortedProjects, setSortedProjects },
    sortingOptionsObject: { sortingOptions, setSortingOptions },
  } = useAppContext();

  const DropDownRef = useRef<HTMLDivElement>(null);

  //  The function updates the sortingOptions state to mark the clicked option as selected.
  const handleOptionClick = (categoryIndex: number, optionIndex: number) => {
    // Update the sortingOptions state
    setSortingOptions((prevOptions) => {
      const newOptions = prevOptions.map((category, cIndex) => ({
        ...category,
        options: category.options.map((option, oIndex) => ({
          ...option,
          selected: cIndex === categoryIndex && oIndex === optionIndex,
        })),
      }));

      // Find the selected option after the state has been updated
      const selectedOption = sortingOptions
        .flatMap((c) => c.options)
        .find((o) => o.selected);

      console.log("selectedOptions", selectedOption);

      if (selectedOption) {
        // Sort the project based on the selected option
        const sorted = sortProjects(allProjects, selectedOption.value);
        setSortedProjects(sorted);
      }
      //   Save to local storage immediately
      localStorage.setItem("sortingOptions", JSON.stringify(newOptions));
      return newOptions;
    });

    setOpenSortingDropDown(false);
  };

  console.log("sortedProjects", sortedProjects);
  console.log("allProjects", allProjects);

  // Save to localStorage whenever sortingOptins changes
  useEffect(() => {
    localStorage.setItem("sortingOptions", JSON.stringify(sortingOptions));
  }, [sortingOptions]);

  //   This function takes the array of projects and the selected sorting option, then sorts the projects accordingly:
  const sortProjects = (projects: Project[], sortOption: string): Project[] => {
    const sortedProjects = [...projects];
    switch (sortOption) {
      case "asc":
        sortedProjects.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "desc":
        sortedProjects.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "newest":
        sortedProjects.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case "oldest":
        sortedProjects.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
        break;
      default:
        return projects;
    }
    return sortedProjects;
  };

  useEffect(() => {
    // Find the selected option in the sortingOptions array

    const selectedOption = sortingOptions.find((category) =>
      category.options.find((option) => option.selected)
    );

    const sorted = sortProjects(
      allProjects,
      selectedOption?.options.find((option) => option.selected)?.value as string
    );

    console.log("sorterd", sorted);
    setSortedProjects(sorted);
  }, [allProjects]);

  // useEffect for Closing Dropdown on Outside Click or Scroll
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        DropDownRef.current &&
        !DropDownRef.current.contains(e.target as Node)
      ) {
        setOpenSortingDropDown(false);
      }
    };

    const handleScroll = () => {
      setOpenSortingDropDown(false);
    };

    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY !== 0) {
        setOpenSortingDropDown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("wheel", handleWheel);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("wheel", handleWheel);
    };
  }, [openSortingDropDown]);
  return (
    <div
      ref={DropDownRef}
      style={{
        display: openSortingDropDown ? "block" : "none",
        top: top + 35,
        left: left - 100,
      }}
      className="bg-white text-sm z-[60] px-4 border-slate-50 fixed py-6 w-[160px] select-none shadow-md rounded-lg gap-10 flex flex-col"
    >
      {sortingOptions.map((category, categoryIndex) => (
        <div
          key={categoryIndex}
          className="flex flex-col gap-1 text-slate-600 cursor-pointer"
        >
          <span
            className={`text-[13px] font-bold text-black ${
              category.category === "Date" ? "mt-3" : ""
            }`}
          >
            {category.category}
          </span>
          {/* Sub */}
          <div className="flex flex-col gap-2 ml-2 mt-1">
            {category.options.map((option, optionIndex) => (
              <div
                onClick={() => handleOptionClick(categoryIndex, optionIndex)}
                key={optionIndex}
                className="flex gap-1 items-center text-slate-600 cursor-pointer hover:text-sky-500"
              >
                <span className={`${option.selected ? "text-sky-500" : ""}`}>
                  {option.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
