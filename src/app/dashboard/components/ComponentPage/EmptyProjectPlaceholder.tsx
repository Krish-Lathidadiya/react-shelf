import Button from "@/components/Common/Button";
import { useAppContext } from "@/contexts/ContextApi";
import { TextToIcon } from "@/lib/utils";
import { Add as AddIcon } from "@mui/icons-material";
export default function EmptyProjectPlaceholder() {
  const {
    selectedProjectObject: { selectedProject },
    openComponentEditorObject:{setOpenComponentEditor}
  } = useAppContext();
  return (
    <div className="p-1 gap-5 flex flex-col justify-center h-[500px] mt-[68px] mb-[34px] items-center">
      {selectedProject?.icon !== undefined && (
        <div className="w-28 h-28 bg-slate-200 rounded-full flex items-center justify-center">
          {TextToIcon({
            text: selectedProject?.icon,
            fontSize: 60,
            className: "text-slate-100",
          })}
        </div>
      )}

      <div className="flex flex-col">
        <h3 className="font-semibold text-[19px] mb-1 text-center">
          {`There are no components Yet...`}
        </h3>
        <p className="text-gray-400 text-center text-[14px]">
          Please click below to add your first component
        </p>
      </div>
      <Button
      onClick={()=>setOpenComponentEditor(true)}
        buttonType="primary"
        className="flex gap-1 items-center p-2 text-center px-3 pr-5"
      >
        <AddIcon />
        <span className="text-black text-sm">Add new component</span>
      </Button>
    </div>
  );
}
