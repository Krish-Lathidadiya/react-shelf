"use client";

import React, { createContext, useState, ReactNode, useContext, useEffect } from "react";
import { Category, Favorite, Home } from "@mui/icons-material";

export type MenuItem = {
  id: string;
  name: string;
  icon: ReactNode;
  isSelected: boolean;
};

type AppContextType = {
  menuItems: MenuItem[];
  setMenuItems: React.Dispatch<React.SetStateAction<MenuItem[]>>;
  openSideBar: boolean;
  setOpenSideBar: React.Dispatch<React.SetStateAction<boolean>>;
};

const defaultState: AppContextType = {
  menuItems: [],
  setMenuItems: () => {},
  openSideBar: true,
  setOpenSideBar: () => {},
};

// Create the context with default values
const AppContext = createContext<AppContextType>(defaultState);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    {
      id: "1",
      name: "Home",
      icon: <Home />,
      isSelected: true,
    },
    {
      id: "2",
      name: "Projects",
      icon: <Category />,
      isSelected: false,
    },
    {
      id: "3",
      name: "Favorites",
      icon: <Favorite />,
      isSelected: false,
    },
  ]);

  const [openSideBar, setOpenSideBar] = useState(true);

  // Load the openSideBar state from localStorage on the client side
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedValue = localStorage.getItem("openedSideBar");
      setOpenSideBar(storedValue !== null ? JSON.parse(storedValue) : true);
    }
  }, []);

  // Save the openSideBar state to localStorage on change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem("openedSideBar", JSON.stringify(openSideBar));
    }
  }, [openSideBar]);

  return (
    <AppContext.Provider value={{ menuItems, setMenuItems, openSideBar, setOpenSideBar }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook for using the context
export const useAppContext = () => useContext(AppContext);
