import { CategoryPostProps } from "@blogshow/types/post";
import { postsAPI } from "./api";
import { convertKeysToCamelCase } from "@blogshow/utils/camelize";
import Axios from "../../lib/axiosConfig";
import { isAxiosError } from "axios";

export const getCategoryPosts = async (
  limit: number,
  nextKey: string | null = null,
  userId: string,
  category: string
): Promise<{ data: CategoryPostProps[]; nextKey: string | null } | number> => {
  try {
    const res = await Axios.get(postsAPI.getCategoryPosts(limit, nextKey, userId, category));
    const tempRes = await res.data;
    const data = tempRes.data.map((item: CategoryPostProps) => convertKeysToCamelCase(item));
    const body = { ...tempRes, data };
    return body;
  } catch (err: any) {
    console.log({ err });
    if (isAxiosError(err) && err.response) {
      return err.response.status;
    }
    return err;
  }
};
