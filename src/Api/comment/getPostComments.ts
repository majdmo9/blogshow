import Axios from "@blogshow/lib/axiosConfig";
import { CommentResponseProps } from "@blogshow/types/comment";
import { commentAPI } from "./api";
import { convertKeysToCamelCase } from "@blogshow/utils/camelize";

export const getPostComments = async (postId: string): Promise<CommentResponseProps[]> => {
  const res = await Axios.get<CommentResponseProps[]>(commentAPI.getPostComments(postId));
  return res.data.map(item => convertKeysToCamelCase(item)) as CommentResponseProps[];
};
