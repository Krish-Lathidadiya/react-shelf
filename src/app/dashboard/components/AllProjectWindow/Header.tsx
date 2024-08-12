import { useAppContext } from "@/contexts/ContextApi";
import {
  Category as CategoryIcon,
  Close as CloseIcon,
} from "@mui/icons-material";

export default function Header() {
  const {
    openAllProjectsWindowObject: { setOpenAllProjectsWindow },
    menuItemsObject: { menuItems, setMenuItems },
  } = useAppContext();

  const closeTheWindow = () => {
    // Update menuItems to set the first item as selected
    setMenuItems((prevMenuItems) =>
      prevMenuItems.map((prevMenuItem) => ({
        ...prevMenuItem,
        isSelected: prevMenuItem.id === menuItems[0].id,
      }))
    );

    setOpenAllProjectsWindow(false);
  };
  return (
    <div className="flex justify-between items-center">
      {/* Category icon and Text */}
      <div className="flex items-center gap-2">
        <div className="w-[30px] h-[30px] bg-sky-200 rounded-full flex items-center justify-center">
          <CategoryIcon
            sx={{ fontSize: 17 }}
            className="text-sky-400 text-[17px]"
          />
        </div>
        <span className="text-xl font-bold text-black">All Projects</span>
      </div>

      {/* Close button */}
      <div>
        <CloseIcon
          onClick={closeTheWindow}
          sx={{ fontSize: 16 }}
          className="text-slate-400 hover:text-slate-500 cursor-pointer"
        />
      </div>
    </div>
  );
}
