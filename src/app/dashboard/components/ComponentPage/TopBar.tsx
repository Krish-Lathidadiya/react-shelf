import Button from "@/components/Common/Button";
import { useAppContext } from "@/contexts/ContextApi";
import {
  ArrowBack as ArrowBackIcon,
  Search as SearchIcon,
  Close as CloseIcon,
  AddOutlined,
  Menu as MenuIcon,
} from "@mui/icons-material";

export default function TopBar() {
  const {
    showComponentPageObject: { setShowComponentPage },
    showSideBarObject: { setShowSideBar, showSideBar },
    selectedProjectObject: { setSelectedProject, selectedProject },
    openComponentEditorObject:{setOpenComponentEditor}
  } = useAppContext();
  return (
    <div className="flex justify-between items-center gap-4 bg-white p-3 px-4 rounded-lg w-full shadow-md">
      <div className="flex gap-5 items-center">
        {/* 1.Back Button */}
        <div
          onClick={() => {
            setShowComponentPage(false);
            setSelectedProject(null);
          }}
          className="border mt-[2px] p-[2px] text-slate-400 flex h-7 gap-1 px-2 items-center justify-center rounded-md cursor-pointer"
        >
          <ArrowBackIcon sx={{ fontSize: 11 }} className="text-[11px]" />
          <span className="max-sm:hidden">Back</span>
        </div>
        {/* Category Title And Icon */}
        <div className="flex gap-2 items-center">
          <div className="flex flex-col">
            <span className="font-bold text-black text-xl">
              {selectedProject?.name}
            </span>
            <span className="text-slate-400 text-[11px]">
              {selectedProject?.components.length} Components
            </span>
          </div>
        </div>
      </div>

      {/* 2.Search Bar */}
      <div className="relative p-2 text-[13px] w-[34%] flex px-[15px] h-13 rounded-3xl bg-slate-100 items-center gap-2 ">
        <SearchIcon className="text-slate-400 text-[19px]" />
        <input
          type="text"
          placeholder="Search a component..."
          className="bg-slate-100 outline-none font-light text-[12px] w-full"
        />
        {/* close Icon */}

        <div className="absolute right-2 top-[50%] transform -translate-y-1/2 cursor-pointer w-5 h-5 flex justify-center items-center bg-slate-300 rounded-full hover:bg-slate-400 hover:text-slate-300">
          <CloseIcon
            sx={{ fontSize: 14 }}
            className="text-slate-400 hover:text-slate-300 text-[14px]"
          />
        </div>
      </div>

      {/* 3.Add Component Button */}
      <div className="flex gap-2 items-center">
        {selectedProject !== undefined &&
          selectedProject !== null &&
          selectedProject?.components?.length > 0 && (
            <Button
            onClick={()=>setOpenComponentEditor(true)}
              buttonType="primary"
              className="h-[33px] px-3 flex items-center"
            >
              <AddOutlined sx={{ fontSize: 16 }} className="" />
              <span className="max-sm:hidden">Component</span>
            </Button>
          )}

        <div className="hidden max-sm:block rounded-md p-1 hover:bg-slate-100">
          <MenuIcon 
            onClick={() => setShowSideBar(true)}
            className="text-slate-500 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}
