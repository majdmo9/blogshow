"use client";
import { CommentEditProps, CommentResponseProps } from "@blogshow/types/comment";
import User from "../User";
import useAuthUser from "@blogshow/hooks/useUser";
import { useForm } from "react-hook-form";
import { useState } from "react";
import EditDeleteControls from "../lib/EditDeleteControls";
import { toast } from "react-toastify";
import { commentAPI } from "@blogshow/Api/comment/api";

const Comment = ({
  commentData: { content, createdAt, author, authorImage, id },
  fetchComments,
}: {
  commentData: CommentResponseProps;
  fetchComments: () => Promise<void>;
}) => {
  const user = useAuthUser();
  const {
    register,
    formState: { isDirty },
    setValue,
    getValues,
    setFocus,
  } = useForm<Omit<CommentEditProps, "id">>();

  const [editMode, setEditMode] = useState(false);

  const handleEdit = async (values: Omit<CommentEditProps, "id">) => {
    if (!id || !isDirty || !editMode) return;
    try {
      const res = await commentAPI.CRUD.editComment({ id, content: values.content });
      if (res.message) {
        await fetchComments();
        toast.success(res.message);
      }
    } catch (err: any) {
      toast.error(err.message);
    }
  };
  const handleDelete = async () => {
    try {
      const res = await commentAPI.CRUD.deleteComment(id);
      if (res.message) {
        await fetchComments();
        toast.success(res.message);
      }
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const handleEditMode = async () => {
    if (!editMode) {
      setTimeout(() => setFocus("content"), 100);
      setValue("content", content);
      setEditMode(true);
    } else {
      await handleEdit(getValues());
      setEditMode(false);
    }
  };

  return (
    <div className="mb-[50px]">
      <div className="mb-[20px]">
        <User author={author} authorImage={authorImage} createdAt={createdAt} />
      </div>
      <div className="flex justify-between items-center w-full gap-4">
        {editMode ? (
          <input {...register("content")} placeholder="Comment.." className="w-full dark:bg-gray-600 rounded-sm text-white px-4" />
        ) : (
          <p className="text-lg font-light">{content}</p>
        )}
        {user?.email === author ? (
          <EditDeleteControls onDelete={handleDelete} onEdit={handleEditMode} isDirty={isDirty} editMode={editMode} />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Comment;
