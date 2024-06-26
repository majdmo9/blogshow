"use client";
import GoogleIcon from "@mui/icons-material/Google";
import { Divider } from "@mui/material";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { InputProps } from "./types";
import { handleSignIn, loginWithGoogle } from "@blogshow/lib/cognitoActions";
import { objectToFormData } from "@blogshow/utils/convertObjToFormData";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Login = () => {
  const router = useRouter();
  const { register, handleSubmit, reset } = useForm<InputProps>();

  const login = async (values: InputProps) => {
    const data = objectToFormData(values);
    await handleSignIn(data, router);
    reset();
  };

  return (
    <div className="flex items-center justify-center mt-[60px] gap-24 xl:gap-32">
      <div className="p-[30px] sm:py-[50px] sm:px-[100px] md:py-[120px] flex-col flex gap-[10px] dark:bg-[#1f273a] bg-[#f0f0f0] rounded-md">
        <h2>Welcome Back👋</h2>
        <form onSubmit={handleSubmit(login)} className="mb-6">
          <div className="mb-4">
            <input
              type="email"
              id="email"
              className="outline-none w-full p-3 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
              placeholder="Email"
              {...register("email")}
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              id="password"
              className="outline-none w-full p-3 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
              placeholder="Password"
              {...register("password")}
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Login
          </button>
        </form>
        <Divider className="dark:before:border-t-[#a6a6a6] dark:after:border-t-[#a6a6a6] before:border-t-[#626262] after:border-t-[#626262] text-[#626262] dark:text-[#a6a6a6]">
          OR
        </Divider>

        <button className="socialButton bg-[#ff5555] w-full" type="submit" onClick={loginWithGoogle}>
          <GoogleIcon /> Sign in with Google
        </button>

        <p className="text-center">
          {"Didn't"} have an account yet?{" "}
          <Link href="/signup" className="text-blue-500">
            Sign up
          </Link>
        </p>
      </div>
      <figure className="h-[500px] lg:flex hidden">
        <Image width={800} height={800} src="/images/login.jpg" alt="login-graphic" className="h-full w-full rounded-md" />
      </figure>
    </div>
  );
};

export default Login;
