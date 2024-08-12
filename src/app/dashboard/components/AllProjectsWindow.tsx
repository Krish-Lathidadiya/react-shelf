import { useAppContext } from "@/contexts/ContextApi";
import Header from "./AllProjectWindow/Header";
import SearchBar from "./AllProjectWindow/SearchBar";
import SortByComponent from "./AllProjectWindow/SortByComponent";
import ProjectsList from "./AllProjectWindow/ProjectsList";
import { Search as SeachIcon } from "@mui/icons-material";
import { useEffect, useState } from "react";

export default function AllProjectsWindow() {
  const {
    openAllProjectsWindowObject: {
      openAllProjectsWindow,
      setOpenAllProjectsWindow,
    },
    openSideBarObject: { openSideBar, setOpenSideBar },
  } = useAppContext();

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (openAllProjectsWindow && openSideBar) {
      setOpenSideBar(false);
    }
  }, [openAllProjectsWindow, openSideBar, setOpenSideBar]);

  return (
    <div
      style={{ display: openAllProjectsWindow ? "block" : "none" }}
      className="w-[77%] max-sm:[90%] p-9 border border-slate-50 h-[82%] bg-white rounded-xl shadow-md absolute left-1/2 top-8 -translate-x-1/2 z-50"
    >
      <Header />
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <SortByComponent />
      <ProjectsList searchQuery={searchQuery} />
    </div>
  );
}
