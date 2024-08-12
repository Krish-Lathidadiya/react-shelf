import { useAppContext } from "@/contexts/ContextApi";
import { SoftLayer } from "@/lib/utils";
import TopBar from "./components/ComponentPage/TopBar";
import AllComponents from "./components/ComponentPage/AllComponents";
import EmptyProjectPlaceholder from "./components/ComponentPage/EmptyProjectPlaceholder";
import DropDown from "./components/DropDown";
export default function ComponentPage() {
  const {
    showSearchBarObject: { showSearchBar },
    isMobileViewObject: { isMobileView },
    showComponentPageObject: { showComponentPage },
    selectedProjectObject: { selectedProject },
  } = useAppContext();
  return (
    <div className="w-full min-h-screen p-3 px-4 pt-5  componentsPage-background">
      <TopBar />
      {showSearchBar && isMobileView && showComponentPage && <SoftLayer />}
      {selectedProject?.components.length === 0 && <EmptyProjectPlaceholder />}
      <AllComponents />
    </div>
  );
}
