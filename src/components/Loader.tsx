import { CircularProgress } from "@mui/material";
import React from "react";

const Loader = ({ isSmall = false }: { isSmall?: boolean }) => {
  return <CircularProgress size={isSmall ? 20 : 40} className="dark:!text-[#ddd] !text-[#aa0022]" />;
};

export default Loader;
