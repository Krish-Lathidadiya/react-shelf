"use client";

import React, { useEffect, useRef } from "react";
import { KeyboardArrowLeft, Logout } from "@mui/icons-material";
import { SiReact } from "react-icons/si";
import { useAppContext } from "@/contexts/ContextApi";
import { MenuItem } from "@/contexts/ContextApi";

export default function Sidebar() {
  const {
    openSideBarObject: { openSideBar, setOpenSideBar },
    isMobileViewObject: { isMobileView },
    showSideBarObject: { showSideBar, setShowSideBar },
  } = useAppContext();

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        isMobileView
      ) {
        setShowSideBar(false);
      }
    };

    if (showSideBar) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSideBar, setShowSideBar, isMobileView]);

  useEffect(() => {
    if (isMobileView) {
      setOpenSideBar(true);
      setShowSideBar(false);
    } else {
      setShowSideBar(true);
    }
  }, [isMobileView, setOpenSideBar, setShowSideBar]);

  return (
    <div
      ref={menuRef}
      style={{ position: isMobileView ? "fixed" : "relative" }}
      className={`sidebar-background h-auto pt-12 transition-all duration-300 ${
        showSideBar ? "block" : "hidden"
      } ${openSideBar ? "w-[320px] p-6" : "w-[100px] p-4"}`}
    >
      <RoundedArrowIcon />
      <Logo />
      <Links />
      <LogOutButton />
    </div>
  );
}

const RoundedArrowIcon = () => {
  const {
    openSideBarObject: { openSideBar, setOpenSideBar },
  } = useAppContext();

  const handleClick = () => {
    setOpenSideBar(!openSideBar);
  };

  return (
    <div
      onClick={handleClick}
      className="w-7 h-7 z-40 rounded-full absolute right-[-11px] top-[95px] flex items-center justify-center"
    >
      <div className="bg-sky-500 rounded-full w-[70%] h-[70%] flex items-center justify-center cursor-pointer">
        <KeyboardArrowLeft
          fontSize="small"
          className={`text-white text-[12px] ${
            openSideBar ? "-rotate-180" : ""
          }`}
        />
      </div>
    </div>
  );
};

const Logo = () => {
  const {
    openSideBarObject: { openSideBar },
  } = useAppContext();

  return (
    <div className="flex gap-2 items-center">
      <div className="bg-sky-500 p-[6px] rounded-md w-12 h-12 flex items-center justify-center">
        <SiReact className="text-white text-[22px]" />
      </div>
      {openSideBar && (
        <div className="flex gap-1 text-[23px]">
          <span className="font-bold text-sky-500">React</span>
          <span className="text-slate-600">Shelf</span>
        </div>
      )}
    </div>
  );
};

const Links = () => {
  const {
    openSideBarObject: { openSideBar },
    menuItemsObject: { menuItems, setMenuItems },
  } = useAppContext();

  const handleItemClick = (item: MenuItem) => {
    setMenuItems((prevItems) =>
      prevItems.map((prevItem) =>
        prevItem.id === item.id
          ? { ...prevItem, isSelected: true }
          : { ...prevItem, isSelected: false }
      )
    );
  };

  return (
    <div
      className={`mt-44 flex flex-col gap-2 text-[15px] ${
        openSideBar ? "ml-3" : "ml-0"
      }`}
    >
      {menuItems.map((link) => (
        <div
          key={link.id}
          onClick={() => handleItemClick(link)}
          className={`p-[7px] select-none cursor-pointer rounded-lg flex items-center gap-2 w-[75%] ${
            link.isSelected
              ? "bg-sky-500 text-white"
              : "text-slate-400 hover:text-sky-500"
          }`}
        >
          {link.icon}
          {openSideBar && <span className="mt-0.5">{link.name}</span>}
        </div>
      ))}
    </div>
  );
};

const LogOutButton = () => {
  const {
    openSideBarObject: { openSideBar },
  } = useAppContext();

  return (
    <div
      className={`p-[7px] hover:text-sky-500 select-none cursor-pointer mt-14 text-[15px] rounded-lg flex items-center gap-2 w-[75%] text-slate-400 ${
        openSideBar ? "ml-3" : "ml-0"
      }`}
    >
      <Logout />
      {openSideBar && <span className="mt-0.5">Log Out</span>}
    </div>
  );
};
