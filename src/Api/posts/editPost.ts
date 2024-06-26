import Axios from "@blogshow/lib/axiosConfig";
import { postsAPI } from "./api";
import { PostEditProps } from "@blogshow/types/post";

export const editPost = async ({ postId, ...props }: PostEditProps): Promise<{ message: string }> => {
  const res = await Axios.put(postsAPI.editPost(postId), { ...props });
  return res.data;
};
