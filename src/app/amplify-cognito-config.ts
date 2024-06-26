"use client";
import { Amplify } from "aws-amplify";
import awsmobile from "@blogshow/aws-exports";

Amplify.configure(awsmobile, { ssr: true });

export default function ConfigureAmplifyClientSide() {
  return null;
}
