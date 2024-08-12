import { useAppContext } from "@/contexts/ContextApi";
import {
  DragIndicatorRounded as DragIndicatorRoundedIcon,
  Category as CategoryIcon,
  EditRounded as EditRoundedIcon,
  Delete as DeleteIcon,
  Search as SeachIcon,
} from "@mui/icons-material";
import { CircularProgress } from "@mui/material";
import EmptyProjectPlaceholder from "../ComponentPage/EmptyProjectPlaceholder";
import { Project } from "@/lib/allData";
import { TextToIcon } from "@/lib/utils";
import toast from "react-hot-toast";

export default function ProjectsList({ searchQuery }: { searchQuery: string }) {
  const {
    allProjectsObject: { allProjects },
    isLoadingObject: { isLoading },
    sortedProjectsObject:{sortedProjects}
  } = useAppContext();

  const filterAllProjectsBySearchQuery = sortedProjects.filter((project) =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <div className="w-full bg-slate-50 h-[64%] rounded-lg p-3 flex flex-col gap-3">
      {isLoading && (
        <div className="flex flex-col gap-3 justify-center items-center w-full mt-28">
          <CircularProgress value={100} />
          <span className="text-slate-400 text-sm">Loading..</span>
        </div>
      )}

      {allProjects.length === 0 && !isLoading ? (
        <EmptyProjectPlaceholder />
      ) : (
        <>
          {filterAllProjectsBySearchQuery.length > 0 ? (
            <>
              {filterAllProjectsBySearchQuery.map((project, index) => (
                <SingleProject key={index} project={project} />
              ))}
            </>
          ) : (
            <>{!isLoading && <NoFoundProjectSearched />}</>
          )}
        </>
      )}
    </div>
  );
}

const SingleProject = ({ project }: { project: Project }) => {
  const {
    selectedProjectObject: { selectedProject, setSelectedProject },
    openProjectWindowObject: { openProjectWindow, setOpenProjectWindow },
    openAllProjectsWindowObject: { setOpenAllProjectsWindow },
    showComponentPageObject: { setShowComponentPage },
    openDeleteWindowObject: { setOpenDeleteWindow },
  } = useAppContext();

  const editTheProjectClicked = () => {
    setOpenProjectWindow(true);
    setSelectedProject(project);
  };

  console.log("selectedProject :", selectedProject);

  const openTheProject = () => {
    setSelectedProject(project);
    setOpenAllProjectsWindow(false);
    setShowComponentPage(true);
  };

  const deleteTheProjectClicked = () => {
    setOpenDeleteWindow(true);
    setSelectedProject(project);
  };

  return (
    <div className="w-full bg-white rounded-md flex gap-3 items-center justify-between p-3">
      {/* 1.Project icon and Name */}
      <div className="flex gap-3 items-center">
        <DragIndicatorRoundedIcon className="text-slate-400" />
        {/* Project icon */}
        <div>
          <div className="w-[30px] h-[30px] bg-sky-200 rounded-full flex items-center justify-center">
            {TextToIcon({
              text: project.icon,
              fontSize: 17,
              className: "text-sky-400 text-[17px]",
            })}
          </div>
        </div>
        {/* Project Name */}
        <div className="flex flex-col">
          <span
            className="font-bold text-black
          cursor-pointer hover:text-sky-500"
            onClick={openTheProject}
          >
            {project.name}
          </span>
          <span className="text-slate-400 text-[12px]">
            {project.components.length} Components
          </span>
        </div>
      </div>

      {/*2. Action Buttons */}
      <div className="flex gap-2 items-center">
        {/* Edit Button */}
        <div
          onClick={editTheProjectClicked}
          className="rounded-full w-7 h-7  flex items-center justify-center cursor-pointer bg-slate-200 hover:bg-slate-300"
        >
          <EditRoundedIcon className="text-slate-400" sx={{ fontSize: 15 }} />
        </div>

        {/* Delete Button */}
        <div
          onClick={deleteTheProjectClicked}
          className="
        rounded-full w-7 h-7  flex items-center justify-center cursor-pointer bg-slate-200 hover:bg-slate-300"
        >
          <DeleteIcon className="text-slate-400" sx={{ fontSize: 15 }} />
        </div>
      </div>
    </div>
  );
};

export const NoFoundProjectSearched = () => {
  return (
    <div className="p-1 gap-5 flex flex-col items-center justify-center pt-[90px]">
      <SeachIcon sx={{ fontSize: 80 }} className="text-[70px] text-slate-200" />
      <div className="">
        <p className="text-gray-400 w-72 text-center text-[13px]">
          {`Oops! That project seems to be missing. Try searching with a different keyword.`}
        </p>
      </div>
    </div>
  );
};
