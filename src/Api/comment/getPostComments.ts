import Axios from "@/lib/axiosConfig";
import { CommentResponseProps } from "@/types/comment";
import { commentAPI } from "./api";
import { convertKeysToCamelCase } from "@/utils/camelize";

export const getPostComments = async (postId: string): Promise<CommentResponseProps[]> => {
  const res = await Axios.get<CommentResponseProps[]>(commentAPI.getPostComments(postId));
  return res.data.map(item => convertKeysToCamelCase(item)) as CommentResponseProps[];
};
