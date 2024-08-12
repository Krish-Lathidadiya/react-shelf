import { useAppContext } from "@/contexts/ContextApi";
import { Close as CloseIcon } from "@mui/icons-material";
export default function ComponentsNumber() {
  const {
    allFavoritesComponentsObject: { allFavoritesComponents },
    isLoadingObject: { isLoading },
    selectedProjectToFilterObject: {
      selectedProjectToFilter,
      setSelectedProjectToFilter,
    },
  } = useAppContext();

  return (
    <div className="mt-11 mb-[13px] flex gap-2 items-center justify-between text-[13px]">
      {/* 1.favorite component count */}
      <div className="flex gap-1">
        <span className="text-slate-400">{`You've set`}</span>
        <span className="text-sky-500 font-semibold">
          {allFavoritesComponents.length}
        </span>
        <span className="text-slate-400">components as favorite</span>
      </div>
      {/* 2. Display project Name filter */}
      {selectedProjectToFilter && (
        <div className="">
          <span className="text-slate-400">You are filtering by :</span>
          <span className="text-[12px] rounded-lg bg-sky-100 text-sky-500 p-[6px] px-2">
            {selectedProjectToFilter}
            <CloseIcon
              onClick={() => setSelectedProjectToFilter(null)}
              sx={{ fontSize: 16 }}
              className="text-sky-500 pl-1 cursor-pointer"
            />
          </span>
        </div>
      )}
    </div>
  );
}
