"use client";
import { useState } from "react";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import Link from "next/link";
import { Tooltip, useMediaQuery, useTheme } from "@mui/material";
import { handleSignOut } from "@/lib/cognitoActions";
import { useRouter } from "next/navigation";
import useAuthUser from "@/hooks/useUser";
import Image from "next/image";

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
          <figure>
            <Image loader={() => user?.picture} src={user?.picture} width={50} height={50} alt="user-profile-img" className="rounded-[50%]" />
          </figure>
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
