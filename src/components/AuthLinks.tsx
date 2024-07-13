"use client";
import { useEffect, useState } from "react";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import Link from "next/link";
import { Collapse, Tooltip, useMediaQuery, useTheme } from "@mui/material";
import { handleSignOut } from "../lib/cognitoActions";
import { usePathname, useRouter } from "next/navigation";
import useAuthUser from "@blogshow/hooks/useUser";
import Image from "next/image";
import { UserIcon } from "@heroicons/react/24/outline";
import DialogComponent from "./Dialog";

const AuthLinks = () => {
  const user = useAuthUser();
  const status = user ? "authed" : "notauthed";

  const theme = useTheme();
  const pathname = usePathname();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);
  const toggleMenu = () => setOpen(prev => !prev);
  const isDownMd = useMediaQuery(theme.breakpoints.down("md"));

  const handleProfileClick = () => {
    setOpenLogoutDialog(true);
  };

  const handleLogout = async () => {
    await handleSignOut();
    setOpenLogoutDialog(false);
    router.replace("/login");
  };

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const Login = <Link href="/login">Login</Link>;

  const Logout = (
    <>
      <Link href="/dashboard/write">Write</Link>
      <Tooltip title="Logout">
        <button className="pointer border-gray-400 border-[2px] rounded-[50%]" onClick={handleProfileClick}>
          {!user?.picture ? (
            <UserIcon className="dark:text-gray-700 text-white rounded-[50%] p-2 bg-gray-700 dark:bg-[#f0f0f0] h-12 w-12" />
          ) : (
            <figure>
              <Image
                loader={() => user.picture}
                loading="lazy"
                src={user.picture}
                width={50}
                height={50}
                alt="user-profile-img"
                className="rounded-[50%]"
              />
            </figure>
          )}
        </button>
      </Tooltip>
    </>
  );

  const Menu = (
    <Collapse className="absolute left-0 top-[100px] w-full" in={open}>
      <div className="py-6 bg-white border-b-4 dark:border-b-[#626262] border-b-[#f0f0f0] dark:bg-[#0f172a] w-full flex flex-col items-center justify-center gap-10 text-3xl z-50">
        <Link href="/dashboard">Homepage</Link>
        <Link href="/dashboard/about">About</Link>
        <Link href="/dashboard/contact">Contact</Link>
        {status === "notauthed" ? Login : Logout}
      </div>
    </Collapse>
  );

  if (status === "notauthed") {
    return (
      <>
        <Link href="/login" className="link">
          Login
        </Link>
        <div onClick={toggleMenu} className="hidden cursor-pointer burger">
          {open ? <CloseRoundedIcon /> : <MenuRoundedIcon />}
        </div>
        {open ? Menu : <></>}
      </>
    );
  }
  return (
    <>
      <div onClick={toggleMenu} className="hidden cursor-pointer burger">
        {open ? <CloseRoundedIcon /> : <MenuRoundedIcon />}
      </div>
      {Menu}
      {!isDownMd ? Logout : <></>}
      <DialogComponent
        title="Sign out"
        description="Are you sure you want to sign out?"
        variant="warning"
        onConfirm={handleLogout}
        open={openLogoutDialog}
        setOpen={setOpenLogoutDialog}
      />
    </>
  );
};

export default AuthLinks;
