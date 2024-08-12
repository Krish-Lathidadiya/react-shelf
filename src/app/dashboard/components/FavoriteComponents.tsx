import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
} from "@mui/icons-material";
import Button from "@/components/Common/Button";
import { useAppContext } from "@/contexts/ContextApi";
import { Component,Project } from "@/lib/allData";
import moment from "moment";
import { CircularProgress } from "@mui/material";

export default function FavoriteComponents() {
  const {
    allFavoritesComponentsObject: { allFavoritesComponents },
    isLoadingObject: { isLoading },
    openComponentEditorObject: { setOpenComponentEditor },
    selectedComponentObject: { setSelectedComponent },
  } = useAppContext();

  return (
    <div className="bg-white w-full p-8 rounded-lg mt-4">
      {/* Main Header */}
      <div className="flex justify-between">
        <span className="font-bold text-black text-lg">
          Favorite Components
        </span>

        {/* Button */}
        <Button
          buttonType="primary"
          className={`${
            allFavoritesComponents.length === 0
              ? "opacity-50 cursor-not-allowed"
              : "opacity-1"
          } p-2 px-3 flex gap-2 items-center`}
        >
          <VisibilityIcon fontSize="small" />
          <span className="max-sm:hidden">View All</span>
        </Button>
      </div>

      {/* Header's List */}
      <div className="grid grid-cols-4 mt-6 text-sm items-center text-slate-400 px-4 max-sm:grid-cols-2">
        <span>Components Name</span>
        <span className="max-sm:hidden">Created At</span>
        <span className="max-sm:hidden">Projects</span>
        <span>Actions</span>
      </div>

      {/* Components */}

      {isLoading && (
        <div className="flex flex-col gap-3 justify-center items-center w-full mt-[70px] mb-7">
          <CircularProgress value={100} />
          <span className="text-slate-400 text-sm">Loading...</span>
        </div>
      )}

      {!isLoading && allFavoritesComponents.length === 0 ? (
        <div className="flex justify-center items-center mt-[70px] mb-8 text-slate-400 text-sm">
          No favorites components set yet..
        </div>
      ) : (
        <div className="px-4 flex flex-col gap-1 mt-1">
          {allFavoritesComponents.slice(0, 5).map((component) => (
            <div key={component._id}>
              <SingleFavoriteComponent component={component} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const SingleFavoriteComponent = ({ component }: { component: Component }) => {
  const {
    openComponentEditorObject: { setOpenComponentEditor },
    selectedComponentObject: { setSelectedComponent },
    allProjectsObject: { allProjects, setAllProjects },
    selectedProjectObject: { setSelectedProject },
    openDeleteWindowObject: { setOpenDeleteWindow },
  } = useAppContext();




  return (
    <div className="grid grid-cols-4 gap-4 text-sm items-center rounded-lg p-2 max-sm:grid-cols-2">
      {/* Component Name */}
      <span
          onClick={()=>
            openComponent({
              component,
              allProjects,
              setSelectedComponent,
              setOpenComponentEditor,
              setSelectedProject,
            })
          }
        className="hover:text-sky-500 text-black cursor-pointer"
      >
        {component?.name}
      </span>
      {/* Component Date */}
      <div className="max-sm:hidden text-black">
        {moment(component?.createdAt).format("YYYY-MM-DD HH:mm:ss")}
      </div>
      {/* Project */}
      <span className="justify-self-start max-sm:hidden">
        <span className="inline-block rounded-2xl bg-sky-500 text-white text-[12px] px-4 py-1 whitespace-normal">
          {component?.projectName}
        </span>
      </span>

      {/* Actions button */}
      <div className="flex gap-2">
        {/* Modify Button */}
        <div 
        onClick={()=>
          openComponent({
            component,
            allProjects,
            setSelectedComponent,
            setOpenComponentEditor,
            setSelectedProject,
          })
        }
        className="bg-sky-500 rounded-full w-7 h-7 flex items-center justify-center hover:bg-sky-600 cursor-pointer">
          <EditIcon
            fontSize="small"
            className="text-white text-[13px]"
          />
        </div>
        <div 
        onClick={()=>
          openTheDeleteWindow({
            component,
            allProjects,
            setSelectedComponent,
            setSelectedProject,
            setOpenDeleteWindow,
          })
        }
        className="bg-sky-500 rounded-full w-7 h-7 flex items-center justify-center hover:bg-sky-600 cursor-pointer">
          <DeleteIcon
            // onClick={openTheDeleteWindow}
            fontSize="small"
            className="text-white text-[13px]"
          />
        </div>
      </div>
    </div>
  );
};


export const openTheDeleteWindow = ({
  component,
  allProjects,
  setSelectedComponent,
  setSelectedProject,
  setOpenDeleteWindow,
}: {
  component: Component;
  allProjects: Project[];
  setSelectedComponent: (component: Component) => void;
  setSelectedProject: (project: Project) => void;
  setOpenDeleteWindow: (open: boolean) => void;
}) => {
  // Get the project and set it in the selectedProject state
  const project = allProjects.find(
    (project) =>
      project.name.toLowerCase() === component.projectName.toLowerCase()
  );
  if (project) {
    setSelectedProject(project);
  } else {
    console.log("Project not found for component " + component.name);
  }
  setSelectedComponent(component);
  setOpenDeleteWindow(true);
};

export const openComponent = ({
  component,
  allProjects,
  setSelectedComponent,
  setOpenComponentEditor,
  setSelectedProject,
}:{
  component:Component,
  allProjects:Project[],
  setSelectedComponent:React.Dispatch<React.SetStateAction<Component | null>>;
  setOpenComponentEditor:React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedProject:React.Dispatch<React.SetStateAction<Project | null>>;
}) => {
  // Scroll to the top of the page or the component editor
  window.scrollTo({ top: 0, behavior: "smooth" });
  setSelectedComponent(component);
  setOpenComponentEditor(true);
  //Get the proejct and set it in the selectedProject state
  const project = allProjects.find(
    (project) =>
      project.name.toLowerCase() == component.projectName.toLowerCase()
  );

  if (project) {
    setSelectedProject(project);
  } else {
    console.log("Project not found for component " + component.name);
  }
};
