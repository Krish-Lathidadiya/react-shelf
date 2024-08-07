"use client";

import React, {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from "react";
import {
  Category,
  Favorite,
  Home,
  LightMode as LightModeIcon,
  DarkMode as DarkModeIcon,
} from "@mui/icons-material";
import { Component, Project, allProjectsData } from "@/lib/allData";

export type MenuItem = {
  id: string;
  name: string;
  icon: ReactNode;
  isSelected: boolean;
};

export type DarkModeMenu = {
  id: string;
  name: string;
  icon: ReactNode;
  isSelected: boolean;
};

type AppContextType = {
  menuItemsObject: {
    menuItems: MenuItem[];
    setMenuItems: React.Dispatch<React.SetStateAction<MenuItem[]>>;
  };
  openSideBarObject: {
    openSideBar: boolean;
    setOpenSideBar: React.Dispatch<React.SetStateAction<boolean>>;
  };
  darkModeMenuObject: {
    darkModeMenu: DarkModeMenu[];
    setDarkModeMenu: React.Dispatch<React.SetStateAction<DarkModeMenu[]>>;
  };
  openDarkModeMenuObject: {
    openDarkModeMenu: boolean;
    setOpenDarkModeMenu: React.Dispatch<React.SetStateAction<boolean>>;
  };
  showSearchBarObject: {
    showSearchBar: boolean;
    setShowSearchBar: React.Dispatch<React.SetStateAction<boolean>>;
  };
  isMobileViewObject: {
    isMobileView: boolean;
    setIsMobileView: React.Dispatch<React.SetStateAction<boolean>>;
  };
  showSideBarObject: {
    showSideBar: boolean;
    setShowSideBar: React.Dispatch<React.SetStateAction<boolean>>;
  };
  allProjectsObject: {
    allProjects: Project[];
    setAllProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  };
  isLoadingObject: {
    isLoading: boolean;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  };
  allFavoritesComponentsObject: {
    allFavoritesComponents: Component[];
    setAllFavoritesComponents: React.Dispatch<
      React.SetStateAction<Component[]>
    >;
  };
  openProjectWindowObject: {
    openProjectWindow: boolean;
    setOpenProjectWindow: React.Dispatch<React.SetStateAction<boolean>>;
  };
  openIconWindowObject: {
    openIconWindow: boolean;
    setOpenIconWindow: React.Dispatch<React.SetStateAction<boolean>>;
  };
};

const defaultState: AppContextType = {
  menuItemsObject: {
    menuItems: [],
    setMenuItems: () => {},
  },
  openSideBarObject: {
    openSideBar: true,
    setOpenSideBar: () => {},
  },
  darkModeMenuObject: {
    darkModeMenu: [],
    setDarkModeMenu: () => {},
  },
  openDarkModeMenuObject: {
    openDarkModeMenu: false,
    setOpenDarkModeMenu: () => {},
  },
  showSearchBarObject: {
    showSearchBar: false,
    setShowSearchBar: () => {},
  },
  isMobileViewObject: {
    isMobileView: false,
    setIsMobileView: () => {},
  },
  showSideBarObject: {
    showSideBar: true,
    setShowSideBar: () => {},
  },
  allProjectsObject: {
    allProjects: [],
    setAllProjects: () => {},
  },
  isLoadingObject: {
    isLoading: true,
    setIsLoading: () => {},
  },
  allFavoritesComponentsObject: {
    allFavoritesComponents: [],
    setAllFavoritesComponents: () => {},
  },
  openProjectWindowObject: {
    openProjectWindow: false,
    setOpenProjectWindow: () => {},
  },
  openIconWindowObject: {
    openIconWindow: false,
    setOpenIconWindow: () => {},
  },
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

  const [openDarkModeMenu, setOpenDarkModeMenu] = useState(false);
  const [darkModeMenu, setDarkModeMenu] = useState<DarkModeMenu[]>([
    {
      id: "1",
      name: "Light",
      icon: <LightModeIcon fontSize="small" />,
      isSelected: true,
    },
    {
      id: "2",
      name: "Dark",
      icon: <DarkModeIcon fontSize="small" />,
      isSelected: false,
    },
  ]);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [openSideBar, setOpenSideBar] = useState(true);
  // const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 640);
  const [isMobileView, setIsMobileView] = useState(false);
  const [showSideBar, setShowSideBar] = useState(true);
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [allFavoritesComponents, setAllFavoritesComponents] = useState<
    Component[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [openProjectWindow, setOpenProjectWindow] = useState(false);
  const [openIconWindow, setOpenIconWindow] = useState(false);

  //set isMobileView
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 640);
    };

    handleResize(); // Initial call to set state based on current window size

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize); // Cleanup on unmount
  }, []);

  //fetch all projects using setTimeout
  useEffect(() => {
    const fetchAllProjects = () => {
      setTimeout(() => {
        setAllProjects(allProjectsData);
        setIsLoading(false);
      }, 2000);
    };
    fetchAllProjects();
  }, []);

  //filter all favorite components
  useEffect(() => {
    if (allProjects.length > 0) {
      const favoriteComponents = allProjects.flatMap((project) =>
        project.components.filter((component) => component.isFavorite)
      );

      setAllFavoritesComponents(favoriteComponents);
    }
  }, [allProjects]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedSideBarValue = localStorage.getItem("openedSideBar");
      setOpenSideBar(
        storedSideBarValue ? JSON.parse(storedSideBarValue) : true
      );

      const storedDarkModeValue = localStorage.getItem("darkMode");
      if (storedDarkModeValue) {
        const parsedValue = JSON.parse(storedDarkModeValue);
        setDarkModeMenu((prevMenu) =>
          prevMenu.map((item) => ({
            ...item,
            isSelected: item.name === parsedValue,
          }))
        );
        document.documentElement.classList.toggle(
          "dark",
          parsedValue === "Dark"
        );
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("openedSideBar", JSON.stringify(openSideBar));
  }, [openSideBar]);

  useEffect(() => {
    const selectedMode = darkModeMenu.find((item) => item.isSelected);
    if (selectedMode) {
      localStorage.setItem("darkMode", JSON.stringify(selectedMode.name));
      document.documentElement.classList.toggle(
        "dark",
        selectedMode.name === "Dark"
      );
    }
  }, [darkModeMenu]);

  return (
    <AppContext.Provider
      value={{
        menuItemsObject: {
          menuItems,
          setMenuItems,
        },
        openSideBarObject: {
          openSideBar,
          setOpenSideBar,
        },
        darkModeMenuObject: {
          darkModeMenu,
          setDarkModeMenu,
        },
        openDarkModeMenuObject: {
          openDarkModeMenu,
          setOpenDarkModeMenu,
        },
        showSearchBarObject: {
          showSearchBar,
          setShowSearchBar,
        },
        isMobileViewObject: {
          isMobileView,
          setIsMobileView,
        },
        showSideBarObject: {
          showSideBar,
          setShowSideBar,
        },
        allProjectsObject: {
          allProjects,
          setAllProjects,
        },
        isLoadingObject: {
          isLoading,
          setIsLoading,
        },
        allFavoritesComponentsObject: {
          allFavoritesComponents,
          setAllFavoritesComponents,
        },
        openProjectWindowObject: {
          openProjectWindow,
          setOpenProjectWindow,
        },
        openIconWindowObject: {
          openIconWindow,
          setOpenIconWindow,
        },
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook for using the context
export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
