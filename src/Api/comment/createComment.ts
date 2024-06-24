import { CommentProps } from "@/types/comment";
import { commentAPI } from "./api";
import Axios from "@/lib/axiosConfig";

export const createComment = async ({ content, createdAt, author, authorId, authorImage, postId }: CommentProps): Promise<{ message: string }> => {
  const res = await Axios.post(commentAPI.createComment(), { content, createdAt, author, authorId, authorImage, postId });
  return res.data;
};
