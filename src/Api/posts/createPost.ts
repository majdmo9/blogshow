import { PostProps } from "@blogshow/types/post";
import { postsAPI } from "./api";
import axios from "axios";

export const createPost = async ({ ...props }: PostProps): Promise<{ message: string }> => {
  const res = await axios.post(postsAPI.createPostUrl(), { ...props });
  return res.data;
};
