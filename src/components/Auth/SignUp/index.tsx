"use client";
import GoogleIcon from "@mui/icons-material/Google";
import { Divider } from "@mui/material";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { InputProps } from "./types";
import { handleSignUp, loginWithGoogle } from "@blogshow/lib/cognitoActions";
import { useRouter } from "next/navigation";
import { objectToFormData } from "@blogshow/utils/convertObjToFormData";
import { toast } from "react-toastify";
const SignUp = () => {
  const router = useRouter();
  const { register, handleSubmit, reset } = useForm<InputProps>();

  const onRegister = async (values: InputProps) => {
    const data = objectToFormData(values);
    const res = await handleSignUp(data, router);
    toast.success(res);
    reset();
  };

  return (
    <div className="flex items-center justify-center mt-[60px]">
      <div className="p-[30px] sm:py-[50px] sm:px-[100px] md:py-[150px] md:px-[200px] flex-col flex gap-[10px] dark:bg-[#1f273a] bg-[#f0f0f0] rounded-md">
        <form onSubmit={handleSubmit(onRegister)} className="mb-6">
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
          <div className="mb-6">
            <input
              type="password"
              id="password"
              className="outline-none w-full p-3 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
              placeholder="Verify password"
              {...register("verifyPassword")}
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Register
          </button>
        </form>
        <Divider className="dark:before:border-t-[#a6a6a6] dark:after:border-t-[#a6a6a6] before:border-t-[#626262] after:border-t-[#626262] text-[#626262] dark:text-[#a6a6a6]">
          OR
        </Divider>
        <button className="socialButton bg-[#ff5555]" onClick={loginWithGoogle}>
          <GoogleIcon /> Sign up with Google
        </button>
        <p className="m-auto">
          Already rigestered?{" "}
          <Link href="/login" className="text-blue-500">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
