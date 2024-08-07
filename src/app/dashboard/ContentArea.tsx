"use client"
import { useAppContext } from "@/contexts/ContextApi";
import TopBar from "./components/TopBar";
import StatsBar from "./components/StatsBar";
import AllProjects from "./components/AllProjects";
import FavoriteComponents from "./components/FavoriteComponents";
import {SoftLayer} from "@/lib/utils"

export default function ContentArea() {
  const {
    showSideBarObject: { showSideBar },
    isMobileViewObject: { isMobileView },
  } = useAppContext();
  return (
    <div className="w-full contentArea-background p-5">
      <TopBar />
      <StatsBar/>
      <AllProjects/>
      <FavoriteComponents/>
      {isMobileView && showSideBar && <SoftLayer />}
    </div>
  );
}


