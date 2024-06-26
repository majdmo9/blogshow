import Axios from "@blogshow/lib/axiosConfig";
import { postsAPI } from "./api";

export const deletePost = async (postId: string): Promise<{ message: string }> => {
  const res = await Axios.delete(postsAPI.deletePost(postId));
  return res.data;
};
