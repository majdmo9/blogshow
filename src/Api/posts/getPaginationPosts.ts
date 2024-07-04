import { PostPropsResponse } from "@blogshow/types/post";
import { postsAPI } from "./api";
import { convertKeysToCamelCase } from "@blogshow/utils/camelize";
import Axios from "../../lib/axiosConfig";
import { isAxiosError } from "axios";

export const getPaginationPosts = async (
  limit: number,
  nextKey: string | null = null,
  userId: string
): Promise<{ data: PostPropsResponse[]; nextKey: string | null } | number> => {
  try {
    const res = await Axios.get(postsAPI.getPaginationPosts(limit, nextKey, userId));
    const tempRes = await res.data;
    const data = tempRes.data.map((item: PostPropsResponse) => convertKeysToCamelCase(item));
    const body = { ...tempRes, data };
    return body;
  } catch (err: any) {
    if (isAxiosError(err) && err.response) {
      return err.response.status;
    }
    return err;
  }
};
