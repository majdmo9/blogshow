"use client";
import ModeNightRoundedIcon from "@mui/icons-material/ModeNightRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import { useThemeContext } from "@/context/ThemeContext";
const ThemeToggle = () => {
  const { toggleTheme } = useThemeContext();

  return (
    <div className="flex w-[40px] h-[20px] rounded-full pointer bg-black items-center justify-between px-[3px] relative dark:bg-white bg-[#0f172a]">
      <ModeNightRoundedIcon className="text-[10px] !w-[14px] !h-[14px] text-yellow-500" />
      <div
        className="w-[20px] h-[20px] rounded-[50%] bg-white absolute right-0 cursor-pointer dark:left-0 dark:bg-[#0f172a] border-3 dark:border-white border-[#0f172a] border"
        onClick={toggleTheme}
      ></div>
      <LightModeRoundedIcon fontSize="small" className="!w-[14px] !h-[14px] text-yellow-500" />
    </div>
  );
};

export default ThemeToggle;
