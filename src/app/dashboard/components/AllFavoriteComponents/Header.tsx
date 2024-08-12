import { useAppContext } from "@/contexts/ContextApi";
import {
  FavoriteRounded as FavoriteRoundedIcon,
  Close as CloseIcon,
} from "@mui/icons-material";

export default function Header() {
  const {
    openAllFavoriteComponentsObject: { setOpenAllFavoriteComponentsWindow },
    menuItemsObject: { menuItems, setMenuItems },
    selectedComponentObject:{setSelectedComponent}
  } = useAppContext();

  const closeTheWindow = () => {
    // set the first item to selected as true and other as a false
    const newMenuItems = menuItems.map((item) => {
      return { ...item, isSelected: false };
    });
    newMenuItems[0].isSelected = true;
    setMenuItems(newMenuItems);
    setOpenAllFavoriteComponentsWindow(false);
    setSelectedComponent(null);
  };

  return (
    <div className="flex justify-between items-center">
      {/* 1.Favorite Icon and Text */}
      <div className="flex items-center gap-2">
        <div className="w-[30px] h-[30px] bg-sky-200 rounded-full flex items-center justify-center">
          <FavoriteRoundedIcon
            sx={{ fontSize: 17 }}
            className="text-sky-400 text-[17px]"
          />
        </div>
        <span className="text-lg font-bold text-black">
          Favorite Components
        </span>
      </div>
      {/* 2.Close Buton */}
      <div onClick={closeTheWindow}>
        <CloseIcon
          sx={{ fontSize: 16 }}
          className="text-slate-400 cursor-pointer hover:text-slate-500"
        />
      </div>
    </div>
  );
}
