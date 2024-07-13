"use client";
import Link from "next/link";
import Comment from "./Comment";
import useAuthUser from "@blogshow/hooks/useUser";
import { useEffect, useState } from "react";
import { CommentResponseProps } from "@blogshow/types/comment";
import { commentAPI } from "@blogshow/Api/comment/api";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";
import Loader from "../Loader";

const Comments = () => {
  const user = useAuthUser();
  const params = useParams();
  const postId = params?.slug as string;

  const [commentToCreate, setCommentToCreate] = useState("");
  const [comments, setComments] = useState<CommentResponseProps[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchComments = async () => {
    try {
      const res = await commentAPI.CRUD.getPostComments(postId);
      if (res.length) {
        setComments(res);
      }
    } catch (err) {
      setComments([]);
      console.log(err);
    }
  };

  const createComment = async () => {
    if (!commentToCreate.trim()) return;
    setLoading(true);
    try {
      const res = await commentAPI.CRUD.createComment({
        content: commentToCreate.trim(),
        author: user.email,
        authorId: user.userId,
        authorImage: user.picture,
        createdAt: new Date().toLocaleString(),
        postId,
      });
      setCommentToCreate("");
      toast.success(res.message);
      await fetchComments();
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [postId]);

  return (
    <div className="w-full flex flex-col">
      <h1 className="text-3xl font-bold text-[#626262] dark:text-[#a6a6a6] mb-[30px]">Comments</h1>
      {user?.email ? (
        <div className="flex sm:flex-row flex-col items-center justify-between gap-3 sm:gap-[30px]">
          <textarea
            value={commentToCreate}
            onChange={e => setCommentToCreate(e.target.value)}
            placeholder="Write a comment..."
            className="sm:p-[20px] p-2 w-full text-black rounded-sm"
          />

          <button
            onClick={createComment}
            className="w-full sm:w-[80px] sm:h-[65px] font-semibold text-white bg-orange-600 hover:bg-orange-500 transition-all rounded-md flex items-center justify-center gap-2"
          >
            {loading ? <Loader isSmall /> : "Send"}
          </button>
        </div>
      ) : (
        <Link href="/login" className="underline text-md lg:text-lg text-orange-600 m-auto">
          Login to write your comment
        </Link>
      )}
      <div className="mt-[50px]">
        {comments.map(comment => (
          <Comment key={comment.id} commentData={comment} fetchComments={fetchComments} />
        ))}
      </div>
    </div>
  );
};

export default Comments;
