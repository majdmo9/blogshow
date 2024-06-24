import { PostPropsResponse } from "@/types/post";
import { postsAPI } from "./api";
import { convertKeysToCamelCase } from "@/utils/camelize";
import Axios from "@/lib/axiosConfig";

export const getPaginationPosts = async (
  limit: number,
  nextKey: string | null = null
): Promise<{ data: PostPropsResponse[]; nextKey: string | null }> => {
  try {
    const res = await Axios.get(postsAPI.getPaginationPosts(limit, nextKey));
    const tempRes = await res.data;
    const data = tempRes.data.map((item: PostPropsResponse) => convertKeysToCamelCase(item));
    const body = { ...tempRes, data };
    return body;
  } catch (err: any) {
    return err;
  }
};
