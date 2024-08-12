"use client";

import React, {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
  SetStateAction,
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

type DropDownPositionType = {
  left: number;
  top: number;
};

type SortingOptionsType = {
  category: string;
  options: {
    label: string;
    value: string;
    selected: boolean;
  }[];
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
  showComponentPageObject: {
    showComponentPage: boolean;
    setShowComponentPage: React.Dispatch<React.SetStateAction<boolean>>;
  };
  selectedProjectObject: {
    selectedProject: Project | null;
    setSelectedProject: React.Dispatch<React.SetStateAction<Project | null>>;
  };
  dropDownPositionObject: {
    dropDownPosition: DropDownPositionType;
    setDropDownPosition: React.Dispatch<
      React.SetStateAction<DropDownPositionType>
    >;
  };
  openDropDownObject: {
    openDropDown: boolean;
    setOpenDropDown: React.Dispatch<React.SetStateAction<boolean>>;
  };
  openDeleteWindowObject: {
    openDeleteWindow: boolean;
    setOpenDeleteWindow: React.Dispatch<React.SetStateAction<boolean>>;
  };
  selectedComponentObject: {
    selectedComponent: Component | null;
    setSelectedComponent: React.Dispatch<
      React.SetStateAction<Component | null>
    >;
  };
  openComponentEditorObject: {
    openComponentEditor: boolean;
    setOpenComponentEditor: React.Dispatch<React.SetStateAction<boolean>>;
  };
  openAllProjectsWindowObject: {
    openAllProjectsWindow: boolean;
    setOpenAllProjectsWindow: React.Dispatch<React.SetStateAction<boolean>>;
  };
  openSortingDropDownObject: {
    openSortingDropDown: boolean;
    setOpenSortingDropDown: React.Dispatch<React.SetStateAction<boolean>>;
  };
  sortingDropDownPositionsObject: {
    sortingDropDownPositions: DropDownPositionType;
    setSortingDropDownPositions: React.Dispatch<
      React.SetStateAction<DropDownPositionType>
    >;
  };
  sortedProjectsObject: {
    sortedProjects: Project[];
    setSortedProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  };
  sortingOptionsObject: {
    sortingOptions: SortingOptionsType[];
    setSortingOptions: React.Dispatch<
      React.SetStateAction<SortingOptionsType[]>
    >;
  };
  openAllFavoriteComponentsObject: {
    openAllFavoriteComponentsWindow: boolean;
    setOpenAllFavoriteComponentsWindow: React.Dispatch<
      React.SetStateAction<boolean>
    >;
  };
  openFilterDropDownObject: {
    openFilterDropDown: boolean;
    setOpenFilterDropDown: React.Dispatch<React.SetStateAction<boolean>>;
  };
  filterDropDownPositionObject: {
    filterDropDownPositions: DropDownPositionType;
    setFilterDropDownPositions: React.Dispatch<
      React.SetStateAction<DropDownPositionType>
    >;
  };
  selectedProjectToFilterObject: {
    selectedProjectToFilter: string | null;
    setSelectedProjectToFilter: React.Dispatch<
      React.SetStateAction<string | null>
    >;
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
  showComponentPageObject: {
    showComponentPage: false,
    setShowComponentPage: () => {},
  },
  selectedProjectObject: {
    selectedProject: null,
    setSelectedProject: () => {},
  },
  dropDownPositionObject: {
    dropDownPosition: { left: 0, top: 0 },
    setDropDownPosition: () => {},
  },
  openDropDownObject: {
    openDropDown: false,
    setOpenDropDown: () => {},
  },
  openDeleteWindowObject: {
    openDeleteWindow: false,
    setOpenDeleteWindow: () => {},
  },
  selectedComponentObject: {
    selectedComponent: null,
    setSelectedComponent: () => {},
  },
  openComponentEditorObject: {
    openComponentEditor: false,
    setOpenComponentEditor: () => {},
  },
  openAllProjectsWindowObject: {
    openAllProjectsWindow: false,
    setOpenAllProjectsWindow: () => {},
  },
  openSortingDropDownObject: {
    openSortingDropDown: false,
    setOpenSortingDropDown: () => {},
  },
  sortingDropDownPositionsObject: {
    sortingDropDownPositions: { top: 0, left: 0 },
    setSortingDropDownPositions: () => {},
  },
  sortedProjectsObject: {
    sortedProjects: [],
    setSortedProjects: () => {},
  },
  sortingOptionsObject: {
    sortingOptions: [],
    setSortingOptions: () => {},
  },
  openAllFavoriteComponentsObject: {
    openAllFavoriteComponentsWindow: false,
    setOpenAllFavoriteComponentsWindow: () => {},
  },
  openFilterDropDownObject: {
    openFilterDropDown: false,
    setOpenFilterDropDown: () => {},
  },
  filterDropDownPositionObject: {
    filterDropDownPositions: { left: 0, top: 0 },
    setFilterDropDownPositions: () => {},
  },
  selectedProjectToFilterObject: {
    selectedProjectToFilter: null,
    setSelectedProjectToFilter: () => {},
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
  const [showComponentPage, setShowComponentPage] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedComponent, setSelectedComponent] = useState<Component | null>(
    null
  );
  const [dropDownPosition, setDropDownPosition] = useState({
    left: 0,
    top: 0,
  });
  const [openDropDown, setOpenDropDown] = useState(false);
  const [openDeleteWindow, setOpenDeleteWindow] = useState(false);
  const [openComponentEditor, setOpenComponentEditor] = useState(false);
  const [openAllProjectsWindow, setOpenAllProjectsWindow] = useState(false);
  // sorting drop down
  const [openSortingDropDown, setOpenSortingDropDown] = useState(false);
  const [sortingDropDownPositions, setSortingDropDownPositions] = useState({
    left: 0,
    top: 0,
  });
  const [sortedProjects, setSortedProjects] = useState<Project[]>([]);

  const [sortingOptions, setSortingOptions] = useState<SortingOptionsType[]>(
    () => {
      const savedState = localStorage.getItem("sortingOptions");
      return savedState
        ? JSON.parse(savedState)
        : [
            {
              category: "Order",
              options: [
                { label: "A-Z", value: "asc", selected: true },
                { label: "Z-A", value: "desc", selected: false },
              ],
            },
            {
              category: "Date",
              options: [
                { label: "Newest", value: "newest", selected: false },
                { label: "Oldest", value: "oldest", selected: false },
              ],
            },
          ];
    }
  );

  const [openAllFavoriteComponentsWindow, setOpenAllFavoriteComponentsWindow] =
    useState(false);
  const [openFilterDropDown, setOpenFilterDropDown] = useState(false);
  const [filterDropDownPositions, setFilterDropDownPositions] = useState({
    left: 0,
    top: 0,
  });
  const [selectedProjectToFilter, setSelectedProjectToFilter] = useState<
    string | null
  >(null);

  //set isMobileView
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 640);
    };

    handleResize(); // Initial call to set state based on current window size

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize); // Cleanup on unmount
  }, []);

  //Simulate the fetch using setTimeout
  useEffect(() => {
    const fetchAllProjects = () => {
      setTimeout(() => {
        // Sort all the components in the allProjects by createdAt
        allProjectsData.forEach((project) => {
          project.components.sort((a, b) => {
            return (
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
          });
        });

        // Update the all Projects
        setAllProjects(allProjectsData);
        setSortedProjects(allProjectsData);
        // set Loading to false
        setIsLoading(false);
      }, 3000);
    };
    fetchAllProjects();
  }, []);

  //update favorite components whe allProjects chages
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

  // update drop down when menu item is selected
  useEffect(() => {
    if (menuItems[0].isSelected) {
      setSelectedProject(null);
      setShowComponentPage(false);
    }
    if (menuItems[1].isSelected) {
      setOpenAllProjectsWindow(true);
      setSelectedProject(null);
      setShowComponentPage(false);
    }
    if (menuItems[2].isSelected) {
      setOpenAllFavoriteComponentsWindow(true);
      setShowComponentPage(false);
    }
  }, [menuItems]);

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
        showComponentPageObject: {
          showComponentPage,
          setShowComponentPage,
        },
        selectedProjectObject: {
          selectedProject,
          setSelectedProject,
        },
        dropDownPositionObject: {
          dropDownPosition,
          setDropDownPosition,
        },
        openDropDownObject: {
          openDropDown,
          setOpenDropDown,
        },
        openDeleteWindowObject: {
          openDeleteWindow,
          setOpenDeleteWindow,
        },
        selectedComponentObject: {
          selectedComponent,
          setSelectedComponent,
        },
        openComponentEditorObject: {
          openComponentEditor,
          setOpenComponentEditor,
        },
        openAllProjectsWindowObject: {
          openAllProjectsWindow,
          setOpenAllProjectsWindow,
        },
        openSortingDropDownObject: {
          openSortingDropDown,
          setOpenSortingDropDown,
        },
        sortingDropDownPositionsObject: {
          sortingDropDownPositions,
          setSortingDropDownPositions,
        },
        sortedProjectsObject: {
          sortedProjects,
          setSortedProjects,
        },
        sortingOptionsObject: {
          sortingOptions,
          setSortingOptions,
        },
        openAllFavoriteComponentsObject: {
          openAllFavoriteComponentsWindow,
          setOpenAllFavoriteComponentsWindow,
        },
        openFilterDropDownObject: {
          openFilterDropDown,
          setOpenFilterDropDown,
        },
        filterDropDownPositionObject: {
          filterDropDownPositions,
          setFilterDropDownPositions,
        },
        selectedProjectToFilterObject: {
          selectedProjectToFilter,
          setSelectedProjectToFilter,
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
