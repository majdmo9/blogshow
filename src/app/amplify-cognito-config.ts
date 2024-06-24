"use client";
import awsmobile from "@/aws-exports";
import { Amplify } from "aws-amplify";

Amplify.configure(awsmobile, { ssr: true });

export default function ConfigureAmplifyClientSide() {
  return null;
}
