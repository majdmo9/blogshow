import Axios from "../../lib/axiosConfig";
import { postsAPI } from "./api";
import { convertKeysToCamelCase } from "@blogshow/utils/camelize";
import { PostPropsResponse } from "@blogshow/types/post";

export const getPost = async (id: string, userId: string): Promise<PostPropsResponse> => {
  const res = await Axios.get(postsAPI.getPost(id, userId));
  return convertKeysToCamelCase(res.data) as PostPropsResponse;
};
