import {
  Category as CategoryIcon,
  AccountTree as AccountTreeIcon,
  Favorite as FavoriteIcon,
} from "@mui/icons-material";
import { useState } from "react";
import { Skeleton } from "@mui/material";
import { useAppContext } from "@/contexts/ContextApi";
type StatisticCard = {
  id: number;
  name: string;
  icon: React.ReactNode;
  count: number;
};

export default function StatsBar() {
  const [statisticCards, setStatisticCard] = useState<StatisticCard[]>([
    {
      id: 1,
      name: "Project Created",
      icon: <AccountTreeIcon className="text-sky-400" />,
      count: 3,
    },
    {
      id: 2,
      name: "Components Added",
      icon: <CategoryIcon className="text-sky-400" />,
      count: 12,
    },
    {
      id: 3,
      name: "Favorites Components",
      icon: <FavoriteIcon className="text-sky-400" />,
      count: 3,
    },
  ]);
  return (
    <div className="mt-8">
      <div className="grid grid-cols-3 gap-4 rounded-lg mt-2">
        {statisticCards.map((card, index) => (
          <div key={index}>
            <CategoriesCard singleCard={card} />
          </div>
        ))}
      </div>
    </div>
  );
}

const CategoriesCard = ({ singleCard }: { singleCard: StatisticCard }) => {
  const {
    isLoadingObject: { isLoading },
  } = useAppContext();
  return (
    <div className="flex gap-4 items-center p-4 bg-white rounded-lg">
      {/* Card Icons */}
      <div className="w-[45px] h-[45px] bg-sky-100 rounded-full flex items-center justify-center max-md:hidden">
        {singleCard.icon}
      </div>
      {/* Card Text */}
      <div className="flex flex-col max-sm:justify-center">
        {isLoading ? (
          <Skeleton className="mb-2" variant="rectangular" width={105} height={25}/>
        ) : (
          <span className="font-bold text-2xl text-black">
            {singleCard.count}
          </span>
        )}

        <span className="text-sm font-bold text-slate-400 max-sm:text-[11px] max-sm:text-center">
          {singleCard.name}
        </span>
      </div>
    </div>
  );
};
