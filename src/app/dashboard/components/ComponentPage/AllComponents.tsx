import { useRef, useState } from "react";
import {
  Preview as PreviewIcon,
  Code as CodeIcon,
  FavoriteBorder as FavoriteBorderIcon,
  Favorite as FavoriteIcon,
  MoreVert as MoreVertIcon,
} from "@mui/icons-material";
import { Checkbox, IconButton } from "@mui/material";
import { LiveProvider, LiveError, LivePreview } from "react-live";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useAppContext } from "@/contexts/ContextApi";
import { Project, Component } from "@/lib/allData";

export default function AllComponents() {
  const {
    selectedProjectObject: { selectedProject },
  } = useAppContext();

  return (
    <div className="mt-10 flex flex-col gap-6">
      {selectedProject?.components.map(
        (component: Component, index: number) => (
          <div key={index}>
            <SingleComponent component={component} />
          </div>
        )
      )}
    </div>
  );
}

const SingleComponent = ({ component }: { component: Component }) => {
  
  const {
    allProjectsObject: { allProjects, setAllProjects },
    selectedProjectObject: { setSelectedProject, selectedProject },
    openDropDownObject: { openDropDown, setOpenDropDown },
    dropDownPositionObject: { setDropDownPosition },
    selectedComponentObject:{setSelectedComponent},
    openComponentEditorObject:{setOpenComponentEditor},
  } = useAppContext();

  const iconRef = useRef<HTMLDivElement>(null);

  const [tabMenu, setTabMenu] = useState([
    {
      id: 1,
      icon: <PreviewIcon className="text-[19px]" />,
      name: "Preview",
      isSelected: true,
    },
    {
      id: 2,
      icon: <CodeIcon className="text-[19px]" />,
      name: "Jsx",
      isSelected: false,
    },
  ]);

  const changeTabState = (index: number) => {
    setTabMenu((prevTabMenu) =>
      prevTabMenu.map((singleItem, i) =>
        i === index
          ? { ...singleItem, isSelected: true }
          : { ...singleItem, isSelected: false }
      )
    );
  };

  const [isFavorite, setFavorite] = useState(component.isFavorite);

  const updateFavoriteState = () => {
    const newAllProjects = allProjects.map((project: Project) => {
      //update original allProject components
      const updatedComponents = project.components.map((comp: Component) => {
        if (comp._id === component._id) {
          return {
            ...comp,
            isFavorite: !comp.isFavorite,
          };
        }
        return comp;
      });
      if (updatedComponents !== project.components) {
        return { ...project, components: updatedComponents };
      }
      return project;
    });

    //update selectedProject with newAllProject
    if (selectedProject) {
      const updatedSelectedProject = newAllProjects.find(
        (project: Project) => project._id === selectedProject._id
      );
      if (updatedSelectedProject) {
        setSelectedProject(updatedSelectedProject);
      }
    }

    setAllProjects(newAllProjects);
    setFavorite(!isFavorite); // Update local state
  };

  const TailwindWrapper = ({ children }: { children: React.ReactNode }) => (
    <div className="tailwind-styles">{children}</div>
  );

  const openTheDropDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (iconRef.current) {
      const rect = iconRef.current.getBoundingClientRect();
      const top = rect.top;
      const left = rect.left;

      // open The Drop Down
      setOpenDropDown(true);
      // update the dropDownPosition
      setDropDownPosition({ top: top, left: left });
      //set value of the selectedComponent
      setSelectedComponent(component)
    }
  };

  const openTheComponentEditor=()=>{
    setSelectedComponent(component)
    setOpenComponentEditor(true);
  }
  

  return (
    <div className="bg-white w-full rounded-lg p-8 py-8 mb-6 shadow-md">
      {/* Component Title */}
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <span 
          onClick={openTheComponentEditor}
          className="font-bold text-[19px] text-black hover:text-sky-500 cursor-pointer">
            {component.name}
          </span>
          <Checkbox
            onChange={updateFavoriteState}
            checked={isFavorite}
            icon={<FavoriteBorderIcon className="text-slate-400 text-[20px]" />}
            checkedIcon={<FavoriteIcon className="text-red-500" />}
          />
          <IconButton></IconButton>
        </div>
        {/* TODO: set selectedComponent value */}
        <div ref={iconRef} onClick={openTheDropDown}>
          <IconButton>
            <MoreVertIcon className="text-slate-400 text-[20px]" />
          </IconButton>
        </div>
      </div>

      {/* Component Preview and Code Buttons */}
      <div className="flex gap-2 mt-6 text-[13px]">
        {tabMenu.map((item, index) => (
          <div
            key={index}
            onClick={() => changeTabState(index)}
            className={`flex gap-1 items-center cursor-pointer select-none text-slate-400 px-3 py-1 rounded-md ${
              item.isSelected ? "bg-sky-500 text-white" : "hover:bg-slate-100"
            }`}
          >
            {item.icon}
            <span className="mt-[2px]">{item.name}</span>
          </div>
        ))}
      </div>

      {/* The Components */}
      {tabMenu[0].isSelected ? (
        <div className="w-full border text-black rounded-md border-slate-200 mt-6 p-4">
          <LiveProvider
            code={component.code}
            noInline={false}
            scope={{ TailwindWrapper }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <LiveError className="rounded-lg border border-red-200 p-4 text-red-600" />
              <div className="tailwind-styles">
                <LivePreview className="rounded-lg border border-gray-200 p-4" />
              </div>
            </div>
          </LiveProvider>
        </div>
      ) : (
        <div className="border rounded-md mt-6 w-full p-4 bg-gray-900">
          <SyntaxHighlighter
            language="javascript"
            style={dracula}
            wrapLines={true}
            wrapLongLines={true}
          >
            {component.code}
          </SyntaxHighlighter>
        </div>
      )}
    </div>
  );
};
