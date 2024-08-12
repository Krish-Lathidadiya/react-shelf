import { useEffect, useRef } from "react";
import {
  EditOutlined as EditOutlinedIcon,
  ContentCopy as ContentCopyIcon,
  DeleteOutlineOutlined as DeleteOutlineOutlinedIcon,
} from "@mui/icons-material";
import { useAppContext } from "@/contexts/ContextApi";
import { Component, Project } from "@/lib/allData";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";

export default function DropDown() {
  const {
    dropDownPositionObject: { dropDownPosition, setDropDownPosition },
    openDropDownObject: { openDropDown, setOpenDropDown },
    openDeleteWindowObject: { openDeleteWindow, setOpenDeleteWindow },
    selectedComponentObject: { selectedComponent, setSelectedComponent },
    selectedProjectObject: { selectedProject, setSelectedProject },
    allProjectsObject: { allProjects, setAllProjects },
    openComponentEditorObject:{setOpenComponentEditor,openComponentEditor},
  } = useAppContext();

  const dropDownRef = useRef<HTMLDivElement>(null);
  // console.log("openDropDown",openDropDown);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropDownRef.current &&
        !dropDownRef.current.contains(e.target as Node)
      ) {
        setOpenDropDown(false);
        // TODO:handle we go outside selectedComponent can be it cause of not work delete component properly
        if (openDeleteWindow) {
          console.log("Selected Component is a  null ");
          setSelectedComponent(null);
        }
      }
    };

    const handleScroll = () => {
      setOpenDropDown(false);
      setSelectedComponent(null);
    };

    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY !== 0) {
        setOpenDropDown(false);
        setSelectedComponent(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("wheel", handleWheel, { passive: true });

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("wheel", handleWheel);
    };
  }, [setOpenDropDown]);

  // Make sure that the selected component is null when the dropdowmn is closed and component editor is closed
  useEffect(()=>{
    if(openDropDown===false && !openComponentEditor && !openDeleteWindow){
      setSelectedComponent(null);
    }
  },[openDropDown]);

  // console.log("select component track",selectedComponent);

  const deleteComponentFunction = () => {
    setOpenDropDown(false);
    setOpenDeleteWindow(true);
  };

  const duplicateComponentFunction = () => {
    console.log("selected component to duplicate",selectedComponent);
    if (selectedProject && selectedComponent) {
      try {
        // Step 1: Create a new component project object with a new id and a new name based on the selected component
        const newComponentObject: Component = {
          ...selectedComponent,
          _id: uuidv4(),
          name: `${selectedComponent.name} Copy`,
          createdAt: new Date().toISOString(),
        };

        // Step 2: Add the new component to the selected project
        const updatedSelectedProject = {
          ...selectedProject,
          components: [...selectedProject.components, newComponentObject],
        };

        // Step 3: Sort the components by createdAt (to show the most recent on top)
        updatedSelectedProject.components.sort((a, b) => {
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        });

        // Step 4: Update the selected project in the selectedProject state
        setSelectedProject(updatedSelectedProject);

        // Step 5: Add a copy of the selected component in the allProjects state
        const updatedAllProjects = allProjects.map((project) => {
          if (project._id === selectedProject._id) {
            return updatedSelectedProject;
          }
          return project;
        });
        setAllProjects(updatedAllProjects);

        // Success feedback
        toast.success("Component has been duplicated successfully");
      } catch (error) {
        // Error feedback
        toast.error("Failed to duplicate component");
      }
    }

    // End Last Close Drop down
    setOpenDropDown(false);
  };

  return (
    <div
      ref={dropDownRef}
      // set left and top positon to look good
      style={{
        top: dropDownPosition.top + 54,
        left: dropDownPosition.left - 135,
        visibility: openDropDown ? "visible" : "hidden",
      }}
      className="bg-white z-50 px-5 border border-slate-50 fixed py-4 w-[160px] select-none shadow-md rounded-lg flex flex-col gap-5"
    >
      {/* Edit Icon */}
      <div 
      onClick={()=>{
        window.scrollTo({
          top:0,
          behavior:"smooth",
        })
        setOpenComponentEditor(true);
        setOpenDropDown(false);
      }}
      className="flex gap-1 items-center text-slate-600 cursor-pointer hover:text-sky-500">
        <EditOutlinedIcon sx={{ fontSize: 21 }} className="text-[21px]" />
        <span className="text-[14px]">Edit</span>
      </div>
      {/* Duplicate Icon */}
      <div
      onClick={duplicateComponentFunction}
      className="flex gap-1 items-center text-slate-600 cursor-pointer hover:text-sky-500">
        <ContentCopyIcon sx={{ fontSize: 21 }} className="text-[21px]" />
        <span className="text-[14px]">Duplicate</span>
      </div>
      {/* Divider Line */}
      <hr className="border-t border-slate-200" />
      {/* Remove icon */}
      <div
        onClick={deleteComponentFunction}
        className="flex gap-1 items-center text-slate-600 cursor-pointer hover:text-red-500"
      >
        <DeleteOutlineOutlinedIcon
          sx={{ fontSize: 21 }}
          className="text-[21px]"
        />
        <span className="text-[14px]">Delete</span>
      </div>
    </div>
  );
}
