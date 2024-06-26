"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { InputProps } from "./types";
import { handleConfirmSignUp, handleSendEmailVerificationCode } from "@blogshow/lib/cognitoActions";
import { objectToFormData } from "@blogshow/utils/convertObjToFormData";

const ConfirmSignUp = () => {
  const router = useRouter();
  const query = useSearchParams();
  const email = query?.get("email");

  const { register, handleSubmit, reset } = useForm<InputProps>();

  const onSubmit = async (values: InputProps) => {
    const data = objectToFormData({ email, code: values.confirmCode });
    const res = await handleConfirmSignUp(data, router);
    console.log({ res });

    reset();
  };

  return (
    <div className="flex items-center justify-center mt-[60px]">
      <div className="p-[30px] sm:py-[50px] sm:px-[100px] md:py-[150px] md:px-[200px] flex-col flex gap-[10px] dark:bg-[#1f273a] bg-[#f0f0f0] rounded-md">
        <form onSubmit={handleSubmit(onSubmit)} className="mb-6">
          <div className="mb-4">
            <input
              type="text"
              id="confirm-code"
              className="outline-none w-full p-3 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
              placeholder="Verification code.."
              {...register("confirmCode")}
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Submit
          </button>
        </form>
        <p className="m-auto">
          {"Didn't"} recive a code?{" "}
          <button
            onClick={async () => {
              const res = await handleSendEmailVerificationCode(objectToFormData({ email }));
              console.log({ res });
            }}
            className="text-blue-500"
          >
            Resend Code
          </button>
        </p>
      </div>
    </div>
  );
};

export default ConfirmSignUp;
