import {
  Code as CodeIcon,
  DeveloperMode as DeveloperModeIcon,
  Web as WebIcon,
  DesktopWindows as DesktopWindowsIcon,
  PhoneIphone as PhoneIphoneIcon,
} from "@mui/icons-material";

export type IconsData = {
  id: number;
  icon: React.ReactNode;
  name:string,
  isSelected: boolean;
};

export const AllIconsArray: IconsData[] = [
  {
    id: 1,
    icon: <CodeIcon className="text-[20px]" />,
    name:"CodeIcon",
    isSelected: true,
  },
  {
    id: 2,
    icon: <DeveloperModeIcon className="text-[20px]" />,
    name:"DeveloperModeIcon",
    isSelected: false,
  },
  {
    id: 3,
    icon: <WebIcon className="text-[20px]" />,
    name:"WebIcon",
    isSelected: false,
  },
  {
    id: 4,
    icon: <DesktopWindowsIcon className="text-[20px]" />,
    name:"DesktopWindowsIcon",
    isSelected: false,
  },
  {
    id: 5,
    icon: <PhoneIphoneIcon className="text-[20px]" />,
    name:"PhoneIphoneIcon",
    isSelected: false,
  },
];
