"use client";
import React, { ChangeEvent, useState } from "react";
import Button from "@/components/Common/Button";
import { useAppContext } from "@/contexts/ContextApi";
import {
  Close as CloseIcon,
  Category as CategoryIcon,
  ErrorOutline as ErrorOutlineIcon,
} from "@mui/icons-material";
import { useEffect, useRef } from "react";
import { SelectedIcon } from "../page";
import { v4 as uuidv4 } from "uuid";
import { Project } from "@/lib/allData";
import toast from "react-hot-toast";
import { useUser } from "@clerk/nextjs";
import { TextToIcon } from "@/lib/utils";

interface AddProjectWindowProps {
  selectedIcon: SelectedIcon;
  setSelectedIcon: React.Dispatch<React.SetStateAction<SelectedIcon>>;
}

export default function AddProjectWindow({
  selectedIcon,
  setSelectedIcon,
}: AddProjectWindowProps) {
  const {
    isMobileViewObject: { isMobileView },
    openProjectWindowObject: { openProjectWindow, setOpenProjectWindow },
    openIconWindowObject: { setOpenIconWindow },
    allProjectsObject: { allProjects, setAllProjects },
    selectedProjectObject: { selectedProject, setSelectedProject },
  } = useAppContext();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [projectName, setProjectName] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { user } = useUser();

  useEffect(() => {
    if (openProjectWindow) {
      inputRef.current?.focus();
    }
  }, [openProjectWindow]);

  // This useEffect handles the input focus and error message
  useEffect(() => {
    // Reset the project name
    if (!selectedProject) {
      setProjectName("");

      //set the default icon
      const iconObject = {
        icon: TextToIcon({
          text: "codeIcon",
          className: "text-white",
        }),
        name: "codeIcon",
      };

      //update the selectedIcon
      setSelectedIcon(iconObject);
    } else {
      // Update the input name when we want to edit the project
      setProjectName(selectedProject.name);
      const iconObject = {
        icon: TextToIcon({
          text: selectedProject.icon,
          className: "text-white",
        }),
        name: selectedProject.icon,
      };

      setSelectedIcon(iconObject);
    }

    const focusInput = () => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    };

    //Schedule focus setting for the next render
    setTimeout(focusInput, 0);
    setErrorMessage("");
  }, [openProjectWindow]);

  const handleInputUpdate = (e: ChangeEvent<HTMLInputElement>) => {
    setErrorMessage("");
    setProjectName(e.target.value);
  };

  const addNewProject = () => {
    if (projectName.trim() === "") {
      setErrorMessage("Project name cannot be empty");
      inputRef.current?.focus();
      return;
    }

    // check if the project name already exists
    if (
      allProjects.find(
        (project) =>
          project.name.toLocaleLowerCase() == projectName.toLocaleLowerCase()
      )
    ) {
      setErrorMessage("Project name already exists");
      inputRef.current?.focus();
      return;
    }

    const newProject: Project = {
      _id: uuidv4(),
      clerkUserId: user?.id as string,
      name: projectName,
      icon: selectedIcon.name,
      createdAt: new Date().toISOString(),
      components: [],
    };
    // Adding the new project to all projects
    try {
      setAllProjects([...allProjects, newProject]);
      toast.success("Project added successfully");
      setOpenProjectWindow(false);
    } catch (error) {
      toast.error("Failed to add project");
    }
  };

  const editTheProject = () => {
    //Check if the project name is not empty
    if (projectName.trim() === "") {
      setErrorMessage("Project name cannot be empty");
      inputRef.current?.focus();
      return;
    }

    try {
      if (selectedProject) {
        // Step 1: update the selected project
        // Step 2: update the all projects

        const updateSelectedProject: Project = {
          ...selectedProject,
          name: projectName,
          icon: selectedIcon.name,
        };

        const updateAllProjects = allProjects.map((singleProject) =>
          singleProject._id === updateSelectedProject._id
            ? updateSelectedProject
            : singleProject
        );

        setAllProjects(updateAllProjects)
        setOpenProjectWindow(false);
        setSelectedProject(null);
        toast.success("project has been updated");
      }
    } catch (error) {
      toast.error("Something went wrong")
    }
  }; 

  return (
    <div
      className={`${openProjectWindow ? "absolute" : "hidden"} ${
        isMobileView ? "w-[80%]" : "w-[40%]"
      } h-[288px] border border-slate-50 bg-white rounded-md shadow-md left-1/2 top-40 -translate-x-1/2 z-50`}
    >
      {/* Header */}
      <div className="flex justify-between items-center pt-7 px-7">
        <div className="flex items-center gap-2">
          {/* Project Icon */}
          <div className="w-[30px] h-[30px] bg-sky-200 rounded-full flex items-center justify-center">
            <CategoryIcon
              sx={{ fontSize: 17 }}
              className="text-sky-400 text-[12px]"
            />
          </div>
          {/* Category Header */}
          <span className="font-semibold text-lg text-black">
            {!selectedProject ? "New Project" : "Edit Project"}
          </span>
        </div>

        <CloseIcon
          onClick={() => {
            setOpenProjectWindow(false);
            setSelectedProject(null);
          }}
          sx={{ fontSize: 16 }}
          className="text-slate-400 hover:shadow-md text-[18px] cursor-pointer hover:text-slate-500"
        />
      </div>

      {/* Body */}
      <div className="flex flex-col gap-2 mt-11 px-7 w-full">
        <span className="text-black text-[13px] font-medium">Project Name</span>
        <div className="flex gap-3">
          {/* Input */}
          <input
            ref={inputRef}
            value={projectName}
            onChange={handleInputUpdate}
            type="text"
            placeholder="Enter Project Name..."
            className="text-black p-[10px] text-[12px] w-full rounded-md border outline-none focus:ring-2 focus:ring-sky-500"
          />

          {/* Icon */}
          <div
            onClick={() => setOpenIconWindow(true)}
            className="w-12 h-10 text-white flex items-center justify-center bg-sky-500 rounded-lg cursor-pointer"
          >
            {selectedIcon?.icon}
          </div>
        </div>
        {/* Error Message */}
        <div
          className={`flex items-center gap-2 mt-2 ${
            errorMessage ? "" : "hidden"
          }`}
        >
          <ErrorOutlineIcon sx={{ fontSize: 14 }} className="text-red-500" />
          <span className="text-[12px] text-red-500 mt-[2px]">
            {errorMessage}
          </span>
        </div>
      </div>

      {/* Footer */}
      <div className="w-full mt-5 mb-5 flex gap-3 justify-end px-7 items-center">
        {/* Cancel Button */}
        <Button
          onClick={() => {
            setOpenProjectWindow(false);
            setSelectedProject(null);
          }}
          buttonType="secondary"
          className="p-2 px-6 transition-all"
        >
          Cancel
        </Button>
        <Button
          onClick={selectedProject ? editTheProject : addNewProject}
          buttonType="primary"
          className="p-2 px-3 transition-all"
        >
          {!selectedProject ? "Add Project" : "Editing project"}
        </Button>
      </div>
    </div>
  );
}
