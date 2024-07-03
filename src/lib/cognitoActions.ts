"use client";
import { getErrorMessage } from "@blogshow/utils/getErrorMessage";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { signUp, confirmSignUp, signIn, signOut, resendSignUpCode, signInWithRedirect, autoSignIn } from "aws-amplify/auth";

export const loginWithGoogle = async () => {
  window.open(
    `https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=${process.env.NEXT_PUBLIC_API_BASE_URL}&scope=profile email openid&response_type=code&client_id=${process.env.GOOGLE_OAUTH_CLIENT_ID}&prompt=select_account`,
    "_self"
  );
  signInWithRedirect({ provider: "Google" });
};

export async function handleSignUp(formData: FormData, router: AppRouterInstance) {
  try {
    const res = await signUp({
      username: String(formData.get("email")),
      password: String(formData.get("password")),
      options: {
        userAttributes: { email: String(formData.get("email")) },
        autoSignIn: true,
      },
    });

    if (res.nextStep.signUpStep === "COMPLETE_AUTO_SIGN_IN") {
      return "Sign up successful";
    }
    if (res.isSignUpComplete) {
      return "Sign up successful";
    }
  } catch (error) {
    return getErrorMessage(error);
  }
  router.push(`/confirm-signup?email=${formData.get("email")}`);
}

export async function handleSendEmailVerificationCode(formData: FormData) {
  let message;
  try {
    await resendSignUpCode({ username: String(formData.get("email")) });
    message = "Code sent successfully";
  } catch (error) {
    message = getErrorMessage(error);
  }

  return message;
}

export async function handleConfirmSignUp(formData: FormData) {
  try {
    const res = await confirmSignUp({
      username: String(formData.get("email")),
      confirmationCode: String(formData.get("code")),
    });
    if (res.nextStep.signUpStep === "COMPLETE_AUTO_SIGN_IN") {
      return "Registered successfuly, Now you can Signin..";
    }
    return "";
  } catch (error) {
    return getErrorMessage(error);
  }
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

export const handleAutoSignin = async () => {
  try {
    await autoSignIn();
  } catch (error) {
    return getErrorMessage(error);
  }
};

export const handleSignOut = async () => {
  try {
    await signOut();
  } catch (error) {
    console.log(getErrorMessage(error));
  }
};
