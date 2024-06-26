import Axios from "@blogshow/lib/axiosConfig";
import { postsAPI } from "./api";
import { convertKeysToCamelCase } from "@blogshow/utils/camelize";
import { PostPropsResponse } from "@blogshow/types/post";

export const getPost = async (id: string): Promise<PostPropsResponse> => {
  const res = await Axios.get(postsAPI.getPost(id));
  return convertKeysToCamelCase(res.data) as PostPropsResponse;
};
