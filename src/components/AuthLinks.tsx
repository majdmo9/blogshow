"use client";
import { useState } from "react";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import Link from "next/link";
import { Tooltip, useMediaQuery, useTheme } from "@mui/material";
import { handleSignOut } from "@blogshow/lib/cognitoActions";
import { useRouter } from "next/navigation";
import useAuthUser from "@blogshow/hooks/useUser";
import Image from "next/image";
import { UserIcon } from "@heroicons/react/24/outline";

const AuthLinks = () => {
  const user = useAuthUser();
  const status = user ? "authed" : "notauthed";

  const theme = useTheme();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const toggleMenu = () => setOpen(prev => !prev);
  const isDownMd = useMediaQuery(theme.breakpoints.down("md"));

  const Login = <Link href="/login">Login</Link>;

  const Logout = (
    <>
      <Link href="/dashboard/write">Write</Link>
      <Tooltip title="Logout">
        <button className="pointer" onClick={() => handleSignOut(router)}>
          {!user?.picture ? (
            <UserIcon className="dark:text-gray-700 text-white rounded-[50%] p-2 bg-gray-700 dark:bg-[#f0f0f0] h-12 w-12" />
          ) : (
            <figure>
              <Image loader={() => user?.picture} src={user?.picture} width={50} height={50} alt="user-profile-img" className="rounded-[50%]" />
            </figure>
          )}
        </button>
      </Tooltip>
    </>
  );

  const Menu = (
    <div className="absolute top-[100px] left-0 dark:bg-[#0f172a] min-h-[calc(100vh-100px)] w-full flex flex-col items-center justify-center gap-10 text-4xl z-50">
      <Link href="/dashboard">Homepage</Link>
      <Link href="/dashboard/about">About</Link>
      <Link href="/dashboard/contact">Contact</Link>
      {status === "notauthed" ? Login : Logout}
    </div>
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
      {open ? Menu : !isDownMd ? Logout : <></>}
    </>
  );
};

export default AuthLinks;
