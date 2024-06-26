"use client";
import Loader from "@blogshow/components/Loader";
import { Backdrop, CircularProgress } from "@mui/material";
import { createContext, useContext, useState } from "react";

interface Props {
  children: JSX.Element;
}

export const BackdropContext = createContext<{ isBackdropOpen: boolean; openBackdrop: () => void; closeBackdrop: () => void }>({
  isBackdropOpen: false,
  openBackdrop: () => {},
  closeBackdrop: () => {},
});

export const BackdropContextProvider = ({ children }: Props) => {
  const [open, setOpen] = useState<boolean>(false);

  const openBackdrop = () => setOpen(true);
  const closeBackdrop = () => setOpen(false);

  return (
    <BackdropContext.Provider value={{ isBackdropOpen: open, openBackdrop, closeBackdrop }}>
      <Backdrop sx={{ zIndex: theme => theme.zIndex.drawer + 1, color: "#fff" }} open={open}>
        <Loader />
      </Backdrop>
      {children}
    </BackdropContext.Provider>
  );
};

export const useBackdrop = () => useContext(BackdropContext);
