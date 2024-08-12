import Button from "@/components/Common/Button";
import { useAppContext } from "@/contexts/ContextApi";
import { Close as CloseIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { Component, Project } from "@/lib/allData";
import toast from "react-hot-toast";
export default function ConfirmationDeleteWindow() {
  const {
    openDeleteWindowObject: { openDeleteWindow, setOpenDeleteWindow },
    selectedProjectObject: { selectedProject, setSelectedProject },
    selectedComponentObject: { selectedComponent },
    allProjectsObject: { allProjects, setAllProjects },
    dropDownPositionObject: { dropDownPosition },
    openAllProjectsWindowObject: { openAllProjectsWindow },
  } = useAppContext();

  const deleteProjectFunction = () => {
    // Delete the project
    try {
      const updatedAllProjects = allProjects.filter(
        (project: Project) => project._id !== selectedProject?._id
      );

      setAllProjects(updatedAllProjects);
      setOpenDeleteWindow(false);
      toast.success("Project deleted successfully");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const deleteComponentFunction = () => {
    console.log("selected component:", selectedComponent);
    try {
      // Filter Component from the selectedProject
      if (!selectedComponent) {
        // If there's no selected component, simply close the delete window and return
        setOpenDeleteWindow(false);
        toast.error("No component selected for deletion.");
        return;
      }

      if (selectedProject) {
        const updatedSelectedProject = {
          ...selectedProject,
          components: selectedProject.components.filter(
            (component: Component) => component._id !== selectedComponent?._id
          ),
        };

        // Update selected project state
        setSelectedProject(updatedSelectedProject);
      }

      // Delete Component from allProjects
      const updatedAllProjects = allProjects.map((project: Project) => {
        if (project._id === selectedProject?._id) {
          return {
            ...project,
            components: project.components.filter(
              (component: Component) => component._id !== selectedComponent?._id
            ),
          };
        }
        return project;
      });

      // Update all projects state
      setAllProjects(updatedAllProjects);

      // Close the delete confirmation window
      setOpenDeleteWindow(false);

      // Show success message
      toast.success("Component deleted successfully");
    } catch (error) {
      // Error handling
      console.error("Delete error: ", error);
      toast.error("Something went wrong");
    }
  };

  // console.log("drop down position", dropDownPosition);
  return (
    <div
      style={{
        visibility: openDeleteWindow ? "visible" : "hidden",
        // top: dropDownPosition.top,
        // left: dropDownPosition.left - 500,
      }}
      // className="w-[40%] max-sm:w-[90%] fixed p-8 px-9 border border-slate-100 bg-white shadow-md  z-50"
       className="w-[40%] max-sm:w-[90%] fixed p-8 px-9 border border-slate-100 bg-white shadow-md top-8 left-1/2  -translate-x-1/2 z-50" 
    >
      {/* 1.Header Icon */}
      <div className="flex justify-between items-start">
        {/* Delete and Close Icon */}
        <div className="w-[42px] h-[42px] bg-red-200 rounded-full flex items-center justify-center">
          <DeleteIcon className="text-red-500 text-[24px]" />
        </div>
        <CloseIcon
          onClick={() => setOpenDeleteWindow(false)}
          sx={{ fontSize: 18 }}
          className="text-slate-400 text-[18px] cursor-pointer hover:text-slate-500"
        />
      </div>
      {/* 2.Message */}
      <div className="flex flex-col mt-7">
        {/* main message */}
        <span className="font-bold">
          Permanently delete this {""}{" "}
          {openAllProjectsWindow ? "project" : "component"} ?
        </span>
        {/* second message */}
        <span className="text-slate-400 text-[13px] mt-2">
          Are you sure you want to delete this{""}
          {openAllProjectsWindow ? "project" : "components"}?
        </span>
        <span className="text-red-500 font-semibold mt-4 text-[13px]">
          This section cannot be undone
        </span>
      </div>
      {/* 3.Buttons */}
      <div className="flex justify-end gap-4 mt-9 mb-2 text-[12px]">
        <Button
          buttonType="secondary"
          onClick={() => setOpenDeleteWindow(false)}
        >
          Cancel
        </Button>
        <Button
          onClick={
            openAllProjectsWindow
              ? deleteProjectFunction
              : deleteComponentFunction
          }
          buttonType="delete"
        >
          Delete{""}
          {openAllProjectsWindow ? "Project" : "Component"}
        </Button>
      </div>
    </div>
  );
}
