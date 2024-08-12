import React, { useEffect, useState, useRef } from "react";
import {
  Close as CloseIcon,
  FormatShapes as FormatShapesIcon,
  Code as CodeIcon,
  Apps as AppsIcon,
  TextFields as TextFieldsIcon,
  Save as SaveIcon,
  FavoriteBorder as FavoriteBorderIcon,
  Favorite as FavoriteIcon,
  ContentCopy as ContentCopyIcon,
  DoneAll as DoneAllIcon,
} from "@mui/icons-material";
import { Checkbox, IconButton } from "@mui/material";
import { LiveProvider, LiveError, LivePreview } from "react-live";
import AceEditor from "react-ace";
//prettier
import prettier from "prettier/standalone";
import babelPlugin from "prettier/plugins/babel";
import estreePlugin from "prettier/plugins/estree";
// Import Ace editor theme and modes
// Import necessary modes and themes
import "ace-builds/src-noconflict/mode-jsx";
import "ace-builds/src-noconflict/theme-tomorrow";
import "ace-builds/src-noconflict/ext-language_tools";
import { useAppContext } from "@/contexts/ContextApi";
import Button from "@/components/Common/Button";
import { Component } from "@/lib/allData";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";

export default function ComponentEditor() {
  const {
    openComponentEditorObject: { openComponentEditor, setOpenComponentEditor },
    allProjectsObject: { allProjects, setAllProjects },
    selectedProjectObject: { setSelectedProject, selectedProject },
    selectedComponentObject: { selectedComponent, setSelectedComponent },
  } = useAppContext();

  const [code, setCode] = useState(``);
  const [inputName, setInputName] = useState<string>("");
  const [copySuccess, setCopySuccess] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const editorInstanceRef = useRef<any>(null);
  const aceEditorRef = useRef<AceEditor | null>(null);

  //Formate the code using prettier
  const formatCode = async (codeToFormat:string) => {
    if (aceEditorRef.current) {
      try {
        const formatted = await prettier.format(codeToFormat, {
          parser: "babel",
          plugins: [babelPlugin, estreePlugin],
          singleQuote: true,
          trailingComma: "all",
        });
        setCode(formatted);
        aceEditorRef.current.editor.setValue(formatted, 1);
      } catch (error) {
        console.error("Formatting failed: " + error);
      }
    }
  };

  // Copy code from clipboard
  const copyTheCode = () => {
    navigator.clipboard
      .writeText(code)
      .then(() => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 1400);
      })
      .catch(() => {
        toast.error("Failed to copy code");
      });
  };

  // Handle changes of Ace editor
  const handleChange = (newValue: string) => {
    setCode(newValue);
  };

  const saveComponent = () => {
    // check if the project name is not empty
    if (inputName.trim() === "") {
      toast.error("Please enter a component name");
      inputRef.current?.focus();
      return;
    }
    // Check if code is not empty
    if (code.trim() == "") {
      toast.error("Please enter a code");
      aceEditorRef.current?.editor.focus();
      return;
    }
    if (!selectedProject) {
      toast.error("No project selected");
      return;
    }
    if (!selectedComponent) {
      //if does not selectedComponent create a new component
      //Creating a new component
      const newComponent: Component = {
        _id: uuidv4(),
        name: inputName,
        code: code,
        isFavorite: false,
        createdAt: new Date().toISOString(),
        projectName: selectedProject.name,
      };

      // Check if the component name already exists in the current(selected) project
      if (
        selectedProject.components.some(
          (component) =>
            component.name.toLowerCase() === inputName.toLowerCase()
        )
      ) {
        toast.error("Component name already exists in this project");
        return;
      }
      addNewComponent(newComponent);
      setSelectedComponent(newComponent);
      toast.success("New component created successfully");
      formatCode(newComponent.code);
    } else {
      //Means Edit
      //Updating an existing component
      const updatedComponent: Component = {
        ...selectedComponent,
        name: inputName,
        code: code,
      };

      // Check if the new name conflicts with other components (excluding the current one)
      if (
        selectedProject.components.some(
          (component) =>
            component._id !== selectedComponent._id &&
            component.name.toLowerCase() === inputName.toLowerCase()
        )
      ) {
        toast.error("Component name already exists in this project");
        return;
      }

      updateExistingComponent(updatedComponent);
      setSelectedComponent(updatedComponent);
      toast.success("Component updated successfully");
    }
  };

  const addNewComponent = (newComponent: Component) => {
    //add this component to selectedProejct and also allProejct

    if (selectedProject && allProjects) {
      const updatedProject = {
        ...selectedProject,
        components: [...selectedProject.components, newComponent],
      };

      const updatedAllProjects = allProjects.map((project) =>
        project._id === selectedProject._id ? updatedProject : project
      );

      setSelectedProject(updatedProject);
      setAllProjects(updatedAllProjects);
    }
  };

  const updateExistingComponent = (updatedComponent: Component) => {
    if (selectedProject && allProjects) {
      const updatedComponents = selectedProject.components.map((component) =>
        component._id === updatedComponent._id ? updatedComponent : component
      );

      const updatedProject = {
        ...selectedProject,
        component: updatedComponents,
      };

      const updatedAllProjects = allProjects.map((project) =>
        project._id === selectedProject._id ? updatedProject : project
      );

      setSelectedProject(updatedProject);
      setAllProjects(updatedAllProjects);
    }
  };

  console.log("Selected Component", selectedComponent);

  const updateTheFavoriteState = () => {
    //Step 1: Update the selected component isFavorite field
    //Step 2: Update the selectedProject
    //Step 3: Update the allProjects

    if (
      selectedComponent !== null &&
      allProjects !== null &&
      selectedProject !== null
    ) {
      // Update the isFavorite state in the selected Component
      const updatedComponent = {
        ...selectedComponent,
        isFavorite: !selectedComponent.isFavorite,
      };

      // Update the component array in the selectedProject
      const updatedComponents = selectedProject.components.map((component) =>
        component._id === selectedComponent._id ? updatedComponent : component
      );

      const updatedSelectedProject = {
        ...selectedProject,
        components: updatedComponents,
      };

      // Update the selectedProject in the allProjects
      const updatedAllProjects = allProjects.map((project) =>
        project._id === selectedProject._id ? updatedSelectedProject : project
      );

      // Update all the states
      setSelectedComponent(updatedComponent);
      setSelectedProject(updatedSelectedProject);
      setAllProjects(updatedAllProjects);
    } else {
      console.error("Selected component,Project, or all projects is null");
    }
  };

  //when the component is first rendered , focus on the input and formate the code
  //and the empty the fields
  useEffect(() => {
    if (openComponentEditor) {
      inputRef.current?.focus();

      if (!selectedComponent) {
        resetEditor();
      } else {
        setInputName(selectedComponent?.name);
        setCode(selectedComponent?.code);
        if (editorInstanceRef.current) {
          editorInstanceRef.current.setValue(selectedComponent.code, -1);
          //Formate the code after setting it
          formatCode(selectedComponent.code);
        }
      }
    } else {
      resetEditor();
    }
  }, [openComponentEditor, selectedComponent]);

  const resetEditor = () => {
    setCode("");
    setInputName("");
    if (editorInstanceRef.current) {
      editorInstanceRef.current.setValue("", -1);
    }
  };

  return (
    <div
      style={{ display: openComponentEditor ? "flex" : "none" }}
      className="w-[96%] h-[735px] max-sm:h-[90%] max-sm:flex-col border-slate-100 flex-row overflow-hidden bg-white absolute left-1/2 top-2 rounded-2xl shadow-md -translate-x-1/2 z-50 "
    >
      {/* 1.Left Part */}
      <div className="w-1/2 max-sm:w-full h-full">
        {/* Header */}
        <div className="flex justify-between items-center pt-7 px-8 ">
          <div className="flex items-center gap-2">
            {/* Category icon */}
            <div className="w-[30px] h-[30px] bg-sky-200 rounded-full flex items-center justify-center">
              <FormatShapesIcon
                sx={{ fontSize: 17 }}
                className="text-sky-300 text-[17px]"
              />
            </div>
            {/* Category Header */}
            <span className="font-semibold">Component Editor</span>
          </div>
          <CloseIcon
            onClick={() => {
              setOpenComponentEditor(false);
              setSelectedComponent(null);
              resetEditor(); //Reset the input name
            }}
            sx={{ fontSize: 16 }}
            className="text-slate-400 hover:text-slate-500 text-[18px] cursor-pointer"
          />
        </div>

        {/* Input Name */}
        <div className="flex flex-col gap-2 pt-14 px-8">
          {/* Input Label */}
          <div className="flex gap-3">
            <span className="flex gap-1 items-center text-[13px]">
              <TextFieldsIcon className="text-[15px]" />
              <span>Component Name</span>
            </span>
            <div>
              <Checkbox
                onClick={updateTheFavoriteState}
                icon={<FavoriteBorderIcon sx={{ fontSize: 19 }} />}
                checkedIcon={
                  <FavoriteIcon
                    sx={{ fontSize: 19 }}
                    className="text-red-500"
                  />
                }
              />
            </div>
          </div>

          {/* Input */}
          <div className="flex gap-3">
            <input
              ref={inputRef}
              type="text"
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
              placeholder="Enter Component Name..."
              className="p-[10px] text-[12px] w-full rounded-md border outline-none"
            />
          </div>
        </div>

        {/* Input Code */}
        <div className="flex flex-col gap-2 pt-6 px-8">
          <div className="flex justify-between">
            {/* Input Label */}
            <span className="flex gap-1 items-center text-[13px]">
              <CodeIcon className="text-[15px] font-bold" />
              <span>JSX Code</span>
            </span>

            {/* Copty the code */}
            <IconButton onClick={copyTheCode}>
              {!copySuccess ? (
                <ContentCopyIcon sx={{ fontSize: 17 }} />
              ) : (
                <DoneAllIcon sx={{ fontSize: 17 }} />
              )}
            </IconButton>
            <Button
              onClick={saveComponent}
              buttonType="primary"
              className="p-2 transition-all"
            >
              <SaveIcon sx={{ fontSize: 17 }} />
            </Button>
          </div>

          <div className="border border-slate-200 rounded-md relative mt-1">
            {/* Copy Button */}
            <AceEditor
              ref={aceEditorRef}
              onLoad={(editorInstance) => {
                editorInstanceRef.current = editorInstance;
              }}
              mode="jsx"
              theme="Dreamweaver"
              onChange={handleChange}
              name="jsxEditor"
              value={code}
              editorProps={{ $blockScrolling: true }}
              setOptions={{
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: true,
                enableSnippets: true,
                showLineNumbers: true,
                tabSize: 2,
              }}
              fontSize={14}
              width="100%"
              height="440px"
            />
          </div>
        </div>
      </div>
      {/* 2.Right Part */}
      <div className="w-1/2 py-2 max-sm:w-full max-sm:border-t border-1 max-sm:mt-5 border-slate-100 h-full">
        <LiveProvider code={code} noInline={false} scope={{ React }}>
          <div className=" ">
            <LiveError className="rounded-lg border-gray-200 p-4 text-red-600 bg-red-100" />
            <LivePreview className="rounded-lg border-gray-200 p-4 bg-gray-100" />
          </div>
        </LiveProvider>
      </div>
    </div>
  );
}
