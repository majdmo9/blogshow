import Axios from "../../lib/axiosConfig";
import { commentAPI } from "./api";
import { CommentEditProps } from "@blogshow/types/comment";

export const editComment = async ({ id, content }: CommentEditProps): Promise<{ message: string }> => {
  const res = await Axios.put(commentAPI.editComment(id), { content });
  return res.data;
};
