"use client";

import { authConfig } from "@blogshow/lib/amplifyConfig";
import { Amplify } from "aws-amplify";

Amplify.configure({ Auth: authConfig }, { ssr: true });

export default function ConfigureAmplifyClientSide() {
  return null;
}
