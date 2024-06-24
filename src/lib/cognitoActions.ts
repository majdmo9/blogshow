"use client";

import { signUp, confirmSignUp, signIn, signOut, resendSignUpCode, signInWithRedirect } from "aws-amplify/auth";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const loginWithGoogle = async () => {
  await signInWithRedirect({ provider: "Google" });
};

export async function handleSignUp(formData: FormData, router: AppRouterInstance) {
  try {
    await signUp({
      username: String(formData.get("email")),
      password: String(formData.get("password")),
      options: {
        userAttributes: {
          email: String(formData.get("email")),
        },
        // optional
        autoSignIn: true,
      },
    });
  } catch (error) {
    return getErrorMessage(error);
  }
  router.push(`/confirm-signup?email=${formData.get("email")}`);
}

export async function handleSendEmailVerificationCode(formData: FormData) {
  let message;
  try {
    await resendSignUpCode({
      username: String(formData.get("email")),
    });
    message = "Code sent successfully";
  } catch (error) {
    message = getErrorMessage(error);
  }

  return message;
}

export async function handleConfirmSignUp(formData: FormData, router: AppRouterInstance) {
  try {
    await confirmSignUp({
      username: String(formData.get("email")),
      confirmationCode: String(formData.get("code")),
    });
  } catch (error) {
    return getErrorMessage(error);
  }
  router.push("/login");
}

export async function handleSignIn(formData: FormData, router: AppRouterInstance) {
  let redirectLink = "/";
  try {
    const { nextStep } = await signIn({
      username: String(formData.get("email")),
      password: String(formData.get("password")),
    });
    if (nextStep.signInStep === "CONFIRM_SIGN_UP") {
      await resendSignUpCode({
        username: String(formData.get("email")),
      });
      redirectLink = `/confirm-signup?email=${formData.get("email")}`;
    }
  } catch (error) {
    return getErrorMessage(error);
  }

  router.push(redirectLink);
}

export const handleSignOut = async (router: AppRouterInstance) => {
  try {
    await signOut();
  } catch (error) {
    console.log(getErrorMessage(error));
  }
  router.push("/login");
};
