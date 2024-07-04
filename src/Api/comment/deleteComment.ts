import Axios from "../../lib/axiosConfig";
import { commentAPI } from "./api";

export const deleteComment = async (commentId: string): Promise<{ message: string }> => {
  const res = await Axios.delete(commentAPI.deleteComment(commentId));
  return res.data;
};
