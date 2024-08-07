import {
  Landslide as LandslideIcon,
  AddOutlined as AddOutlinedIcon,
  AddModerator as AddModeratorIcon
} from "@mui/icons-material";
import Button from "@/components/Common/Button";
import { useAppContext } from "@/contexts/ContextApi";
import { Project } from "@/lib/allData";
import { TextToIcon } from "@/lib/utils";
import { CircularProgress } from "@mui/material";

export default function AllProjects() {
  const {
    openProjectWindowObject: { setOpenProjectWindow },
    allProjectsObject: { allProjects },
    isLoadingObject: { isLoading },
  } = useAppContext();

  return (
    <div className="bg-white w-full p-8 rounded-lg mt-4">
      {/* Header */}
      <span className="text-lg flex gap-2 justify-between items-center">
        {/* Cards Heading */}
        <div className="flex gap-4 items-center">
          <span className="font-bold text-lg text-black">All Projects</span>
          <span className="text-[14px] text-sky-600 cursor-pointer">More</span>
        </div>
        {/* New Project button */}
        {!isLoading && allProjects.length > 0 && (
          <Button buttonType="primary" className="py-[2px] px-3" onClick={() => setOpenProjectWindow(true)}>
            <AddOutlinedIcon fontSize="small" />
            <span className="text-[13px]">New Project</span>
          </Button>
        )}
      </span>

      {/* Loading Indicator */}
      {isLoading && (
        <div className="flex flex-col gap-3 justify-center items-center w-full mt-16">
          <CircularProgress />
          <span className="text-slate-400">Loading...</span>
        </div>
      )}

      {/* Projects Display */}
      {!isLoading && allProjects.length === 0 ? (
        <EmptyProjectsPlaceholder />
      ) : (
        <div className="flex flex-wrap gap-4 mt-7 mb-2 max-sm:grid max-sm:grid-cols-1">
          {allProjects?.map((project, index) => (
            <div key={index}>
              <SingleProject singleProject={project} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
const SingleProject = ({ singleProject }: { singleProject: Project }) => {
  return (
    <div className="w-[200px] border border-slate-100 rounded-md p-5 flex gap-2 justify-center  flex-col items-center max-sm:w-full">
      {/* The Icon */}
      <div className="w-[70px] h-[70px] bg-sky-100 rounded-full flex items-center justify-center">
        {/* <LandslideIcon className="text-[30px] text-sky-400" /> */}
        {TextToIcon({ text: singleProject.icon, size: "medium" })}
      </div>

      {/* Name and components count */}
      <div className="flex flex-col items-center justify-center">
        <span className="font-bold text-lg cursor-pointer hover:text-sky-500 text-black select-none">
          {singleProject.name}
        </span>
        <span className="text-[12px] text-slate-400 text-center">
          {singleProject.components?.length} Components
        </span>
      </div>
    </div>
  );
};

const EmptyProjectsPlaceholder = () => {
  return (
    <div className="p-1 gap-5 flex flex-col justify-center h-[200px] mt-[68px] mb-[34px] items-center">
      <AddModeratorIcon sx={{fontSize:80}} className="text-[70px] text-slate-200"/>
      <div>
        <h3 className="font-semibold text-[15px] mb-1 text-center">{`There are no projects Yet...`}</h3>
        <p>Please click below to add you first project.</p>
      </div>
      <Button buttonType="primary" className="px-7 p-2 text-center ">
        Add New Project
      </Button>
    </div>
  );
};
