import Header from "./AllFavoriteComponents/Header";
import SearchBar from "./AllFavoriteComponents/SearchBar";
import ComponentsList from "./AllFavoriteComponents/ComponentsList";
import ComponentsNumber from "./AllFavoriteComponents/ComponentsNumber";
import { useAppContext } from "@/contexts/ContextApi";
import { useState } from "react";

export default function AllFavoriteComponents() {
  const {
    openAllFavoriteComponentsObject: { openAllFavoriteComponentsWindow },
  } = useAppContext();

  const [searchInput, setSearchInput] = useState("");
  return (
    <div
      style={{ display: openAllFavoriteComponentsWindow ? "block" : "none" }}
      className="w-[77%] max-sm:[90%] p-9 border border-slate-50 h-[700px] bg-white rounded-xl shadow-md absolute left-1/2 top-8 -translate-x-1/2 z-50"
    >
      <Header />
      <SearchBar searchInput={searchInput} setSearchInput={setSearchInput} />
      <ComponentsNumber />
      <ComponentsList searchInput={searchInput} />
    </div>
  );
}
