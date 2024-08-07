"use client";

import { useAppContext } from "@/contexts/ContextApi";
import {
  Search as SearchIcon,
  CloseRounded as CloseRoundedIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";
import { DarkModeMenu as DarkModeMenuType } from "@/contexts/ContextApi";
import { useEffect, useRef } from "react";
import { UserButton, useUser } from "@clerk/nextjs";

export default function TopBar() {
  return (
    <div className="bg-white w-full p-3 rounded-lg px-6 flex justify-between items-center">
      <DashboardText />
      <SearchBar />
      <div className="flex gap-4 items-center">
        <DarkMode />
        <ProfileAccount />
      </div>
    </div>
  );
}

const DashboardText = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const {
    showSideBarObject: { setShowSideBar },
  } = useAppContext();

  // if (!isLoaded || !isSignedIn) {
  //   return null;
  // }
  return (
    <div className="flex flex-col">
      {/* MenuIcon */}
      <div onClick={() => setShowSideBar(true)} className="hidden max-sm:block cursor-pointer">
        <MenuIcon className="text-slate-500 " />
      </div>
      {/* Dashboard Text */}
      <div className="flex flex-col max-sm:hidden">
        <span className="font-semibold">Welcome Back,{user?.lastName}</span>
        <span className="text-slate-400 text-[11px] font-light">
          we are happy to see you again
        </span>
      </div>
    </div>
  );
};

const SearchBar = () => {
  const {
    showSearchBarObject: { showSearchBar, setShowSearchBar },
  } = useAppContext();

  const searchBarRef = useRef<HTMLDivElement>(null);

  //toggle the search bar
  const handleClickedSearchBar = () => {
    if (!showSearchBar) {
      setShowSearchBar(true);
    }
  };

  //showSearchBar false when outside the search bar
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        searchBarRef.current &&
        !searchBarRef.current.contains(e.target as Node)
      ) {
        setShowSearchBar(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setShowSearchBar]);
  return (
    <div
      ref={searchBarRef}
      onClick={handleClickedSearchBar}
      className={`bg-slate-100 w-1/3 ${
        !showSearchBar && "cursor-pointer"
      }cursor-pointer hover:bg-slate-200 transition-all p-[8px] flex gap-1 justify-center items-center rounded-md`}
    >
      {showSearchBar ? <InputSearchBar /> : <SeacrhIconAndText />}
    </div>
  );
};

const SeacrhIconAndText = () => {
  return (
    <div className="flex gap-1 items-center">
      <SearchIcon fontSize="small" className="text-slate-500" />
      <span className="text-slate-500 text-sm">Search</span>
    </div>
  );
};

const InputSearchBar = () => {
  const {
    showSearchBarObject: { setShowSearchBar },
  } = useAppContext();

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleCloseClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowSearchBar(false);
  };

  return (
    <div className="px-2 flex justify-between items-center w-full">
      <input
        ref={inputRef}
        placeholder="Search a components..."
        type="text"
        className="w-full bg-slate-100 outline-none text-[13px] placeholder:text-slate-400"
      />
      <CloseRoundedIcon
        fontSize="small"
        className="text-slate-500 text-[10px] cursor-pointer"
        onClick={handleCloseClick}
      />
    </div>
  );
};

const DarkModeMenu = () => {
  const {
    openDarkModeMenuObject: { openDarkModeMenu, setOpenDarkModeMenu },
    darkModeMenuObject: { darkModeMenu, setDarkModeMenu },
  } = useAppContext();

  // console.log("dark mode menu", darkModeMenu);

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenDarkModeMenu(false);
      }
    };

    if (openDarkModeMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openDarkModeMenu, setOpenDarkModeMenu]);

  const changeSelection = (menuItem: DarkModeMenuType) => {
    setDarkModeMenu((prevMenuItem) =>
      prevMenuItem.map((prevItem) =>
        prevItem.id === menuItem.id
          ? {
              ...prevItem,
              isSelected: true,
            }
          : {
              ...prevItem,
              isSelected: false,
            }
      )
    );
  };

  return (
    <div
      ref={menuRef}
      className={`${
        openDarkModeMenu ? "absolute" : "hidden"
      } p-3 border border-slate-50 select-none pr-10 bg-white rounded-md absolute right-[3px] top-8 flex flex-col py-4 gap-[18px] shadow-md`}
    >
      {darkModeMenu.map((item) => (
        <div
          key={item.id}
          onClick={() => changeSelection(item)}
          className="flex gap-2 items-center cursor-pointer hover:text-sky-500"
        >
          {item.icon}
          <span className="text-[12px] font-light">{item.name}</span>
        </div>
      ))}
    </div>
  );
};

const DarkMode = () => {
  const {
    darkModeMenuObject: { darkModeMenu, setDarkModeMenu },
    openDarkModeMenuObject: { openDarkModeMenu, setOpenDarkModeMenu },
  } = useAppContext();

  const handleClicked = () => {
    setOpenDarkModeMenu(!openDarkModeMenu);
  };
  return (
    <div onClick={handleClicked} className="relative">
      <div className="text-sky-500 cursor-pointer">
        {darkModeMenu[0].isSelected && darkModeMenu[0].icon}
        {darkModeMenu[1].isSelected && darkModeMenu[1].icon}
      </div>
      <DarkModeMenu />
    </div>
  );
};

const ProfileAccount = () => {
  return (
    <div className="flex gap-3 items-center">
      <div className="w-[36px] h-[37px] bg-slate-100 rounded-full">
        <UserButton />
      </div>
    </div>
  );
};
