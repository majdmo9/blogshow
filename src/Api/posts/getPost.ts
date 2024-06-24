import Axios from "@/lib/axiosConfig";
import { postsAPI } from "./api";
import { convertKeysToCamelCase } from "@/utils/camelize";
import { PostPropsResponse } from "@/types/post";

export const getPost = async (id: string): Promise<PostPropsResponse> => {
  const res = await Axios.get(postsAPI.getPost(id));
  return convertKeysToCamelCase(res.data) as PostPropsResponse;
};
