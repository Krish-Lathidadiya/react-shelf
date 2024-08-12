import { useAppContext } from "@/contexts/ContextApi";
import {
  EditRounded as EditRoundedIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
} from "@mui/icons-material";
import { CircularProgress } from "@mui/material";
import { Component, Project } from "@/lib/allData";
import { openTheDeleteWindow, openComponent } from "../FavoriteComponents";

export default function ComponentsList({
  searchInput,
}: {
  searchInput: string;
}) {
  const {
    allFavoritesComponentsObject: { allFavoritesComponents },
    isLoadingObject: { isLoading },
    selectedProjectToFilterObject: {
      selectedProjectToFilter,
      setSelectedProjectToFilter,
    },
  } = useAppContext();

  // combine search bar search and with filter drop down search
  const filterBySearchInput = selectedProjectToFilter
    ? allFavoritesComponents
        .filter((item) => {
          return item.name.toLowerCase().includes(searchInput.toLowerCase());
        })
        .filter((item) => {
          return item.projectName === selectedProjectToFilter;
        })
    : allFavoritesComponents.filter((item) => {
        return item.name.toLowerCase().includes(searchInput.toLowerCase());
      });

  return (
    <div className="w-full bg-slate-50 h-[64%] rounded-lg p-3 flex flex-col gap-3">
      {isLoading && (
        <div className="flex flex-col gap-3 justify-center items-center w-full mt-28">
          <CircularProgress value={100} />
          <span className="text-slate-400 text-sm">Loading...</span>
        </div>
      )}
      {allFavoritesComponents.length === 0 && !isLoading ? (
        <EmptyProjectsPlaceholder />
      ) : (
        <>
          {filterBySearchInput.length > 0 ? (
            <>
              {filterBySearchInput.map((component, index) => (
                <SingleComponent key={index} item={component} />
              ))}
            </>
          ) : (
            <>{!isLoading && <NoFoundProjectsSearched />}</>
          )}
        </>
      )}
    </div>
  );
}

const SingleComponent = ({ item }: { item: Component }) => {
  const {
    allProjectsObject: { allProjects },
    selectedComponentObject: { setSelectedComponent },
    selectedProjectObject: { setSelectedProject },
    openDeleteWindowObject: { setOpenDeleteWindow },
    openComponentEditorObject: { setOpenComponentEditor },
  } = useAppContext();
  return (
    <div className="w-full bg-white rounded-md flex gap-3 items-center justify-between p-3 px-5">
      {/* 1.Component list */}
      <div className="flex gap-3 items-center">
        {/* Blue Circle */}
        <div>
          <div className="w-[10px] h-[10px] bg-sky-500 rounded-full flex items-center justify-center"></div>
        </div>
        {/* Component Name */}
        <div className="flex flex-col">
          <span
            onClick={() =>
              openComponent({
                component: item,
                allProjects: allProjects,
                setSelectedComponent: setSelectedComponent,
                setOpenComponentEditor: setOpenComponentEditor,
                setSelectedProject: setSelectedProject,
              })
            }
            className="font-bold cursor-pointer hover:text-sky-500"
          >
            {item.name}
          </span>
          <div>
            <span className="text-[11px] p-1 px-2 bg-sky-100 text-sky-500 rounded-lg">
              {item.projectName}
            </span>
          </div>
        </div>
      </div>
      {/* 2. Action Buttons */}
      <div className="flex gap-2 items-center">
        {/* Edit Button */}
        <div
          onClick={() =>
            openComponent({
              component: item,
              allProjects: allProjects,
              setSelectedComponent: setSelectedComponent,
              setOpenComponentEditor: setOpenComponentEditor,
              setSelectedProject: setSelectedProject,
            })
          }
          className="rounded-full w-7 h-7  flex items-center justify-center cursor-pointer bg-slate-200 hover:bg-slate-300"
        >
          <EditRoundedIcon sx={{ fontSize: 15 }} className="text-slate-400" />
        </div>
        {/* Delete Button */}
        <div
          onClick={() =>
            openTheDeleteWindow({
              component: item,
              allProjects: allProjects,
              setSelectedComponent: setSelectedComponent,
              setSelectedProject: setSelectedProject,
              setOpenDeleteWindow: setOpenDeleteWindow,
            })
          }
          className="rounded-full w-7 h-7  flex items-center justify-center cursor-pointer bg-slate-200 hover:bg-slate-300"
        >
          <DeleteIcon sx={{ fontSize: 15 }} className="text-slate-400" />
        </div>
      </div>
    </div>
  );
};

const EmptyProjectsPlaceholder = () => {
  return (
    <div className="p-1 gap-5 flex flex-col justify-center pt-[150px] items-center">
      <div className="">
        <p className="text-gray-400 w-64  text-center text-[15px]">
          {`It seems like you haven't set a component as favorite yet.`}
        </p>
      </div>
    </div>
  );
};

const NoFoundProjectsSearched = () => {
  return (
    <div className="p-1 gap-5 flex flex-col justify-center pt-[90px] items-center">
      <SearchIcon
        sx={{ fontSize: 80 }}
        className="text-[70px] text-slate-200"
      />
      <div className="">
        <p className="text-gray-400 w-72 text-center text-[13px]">
          {`Oops ! That project seems to be missing. Try searching with a different keyword.`}
        </p>
      </div>
    </div>
  );
};
