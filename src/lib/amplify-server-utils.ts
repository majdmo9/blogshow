import { NextServer, createServerRunner } from "@aws-amplify/adapter-nextjs";
import { fetchAuthSession, getCurrentUser } from "aws-amplify/auth/server";
import awsmobile from "@blogshow/aws-exports";

export const { runWithAmplifyServerContext } = createServerRunner({
  config: awsmobile,
});

export async function authenticatedUser(context: NextServer.Context) {
  return await runWithAmplifyServerContext({
    nextServerContext: context,
    operation: async contextSpec => {
      try {
        const session = await fetchAuthSession(contextSpec);
        if (!session.tokens) {
          return;
        }
        const user = await getCurrentUser(contextSpec);

        return user;
      } catch (error) {
        console.log(error);
      }
    },
  });
}
