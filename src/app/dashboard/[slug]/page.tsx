"use client";
import { postsAPI } from "@blogshow/Api/posts/api";
import Comments from "@blogshow/components/Comments";
import IFrame from "@blogshow/components/IFrame";
import Loader from "@blogshow/components/Loader";
import Menu from "@blogshow/components/Menu";
import User from "@blogshow/components/User";
import EditDeleteControls from "@blogshow/components/lib/EditDeleteControls";
import { useCategories } from "@blogshow/hooks/useCategories";
import useAuthUser from "@blogshow/hooks/useUser";
import { PostEditProps, PostPropsResponse } from "@blogshow/types/post";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import { toast } from "react-toastify";

const SlugPage = () => {
  const user = useAuthUser();
  const { categories } = useCategories();
  const searchParams = useParams();
  const router = useRouter();
  const id = searchParams?.slug as string;

  const [post, setPost] = useState<PostPropsResponse>();
  const [editMode, setEditMode] = useState(false);
  const [description, setDescription] = useState(post?.description);
  const {
    register,

    formState: { isDirty },
    setValue,
    getValues,
  } = useForm<Omit<PostEditProps, "postId" | "description">>();

  const fetchPost = async () => {
    if (!user?.userId) return;
    const res = await postsAPI.CRUD.getPost(id, user.userId);
    if (res) {
      setPost(res);
      setDescription(res.description);
    }
  };

  const handleEdit = async (values: Omit<PostEditProps, "postId" | "description">) => {
    if (!post?.id || !isDirty || !editMode) return;
    try {
      const res = await postsAPI.CRUD.editPost({ postId: post.id, description, ...values });
      if (res.message) {
        await fetchPost();
        toast.success(res.message);
        setEditMode(false);
      }
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const handleDeletePost = async () => {
    if (!post?.id) return;
    try {
      const res = await postsAPI.CRUD.deletePost(post.id);
      if (res.message) {
        toast.success(res.message);
        router.replace("/dashboard");
      }
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const handleEditMode = async () => {
    if (!editMode) {
      setValue("title", post?.title);
      setValue("imageUrl", post?.imageUrl);
      setValue("videoUrl", post?.videoUrl);
      setEditMode(true);
    } else {
      await handleEdit(getValues());
      setEditMode(false);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [user]);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div>
      {user?.userId === post.authorId ? (
        <EditDeleteControls
          onDelete={handleDeletePost}
          onEdit={handleEditMode}
          isDirty={isDirty}
          editMode={editMode}
          deleteMessage="Are you sure you want to delete the blog post?"
        />
      ) : (
        <></>
      )}
      <div className="flex md:flex-row flex-col items-center gap-[50px]">
        <div className="flex-1">
          {editMode ? (
            <div className="mt-6 mb-10 flex flex-col gap-2 w-full">
              <h1 className="font-semibold text-2xl">Title</h1>
              <input type="text" {...register("title")} placeholder="Title.." className="input w-full" />
            </div>
          ) : (
            <h1 className="xl:text-4xl md:text-3xl sm:text-2xl text-xl md:mt-0 mt-4 font-bold mb-[50px]">{post?.title}</h1>
          )}
          <User author={post.author} authorImage={post.authorImage} createdAt={post.createdAt} />
        </div>
        {editMode ? (
          <div className="mt-6 mb-10 flex flex-col gap-2 w-full md:w-1/2">
            <h1 className="font-semibold text-2xl">Image URL</h1>
            <input type="url" {...register("imageUrl")} placeholder="Image url.." className="input w-full" />
          </div>
        ) : (
          <figure className="flex-1 h-[350px] relative">
            <Image
              loader={() => post.imageUrl}
              src={post.imageUrl}
              alt="img"
              width={300}
              height={300}
              className="object-contain min-w-full h-full rounded-md"
            />
          </figure>
        )}
      </div>
      <div className="flex gap-[50px]">
        <div className="flex-[5] mt-[60px]">
          {editMode ? (
            <div className="flex items-start gap-[30px] h-[409px] relative overflow-auto">
              <ReactQuill className="w-full mt-4" theme="bubble" value={description} onChange={setDescription} placeholder="Write your Post..." />
            </div>
          ) : (
            <div className="mb-6" dangerouslySetInnerHTML={{ __html: post.description }} />
          )}
          {editMode ? (
            <div className="mt-6 mb-10 flex flex-col gap-2 w-full">
              <h1 className="font-semibold text-2xl">Video URL</h1>
              <input type="url" {...register("videoUrl")} placeholder="Video url.." className="input" />
            </div>
          ) : (
            <IFrame url={post.videoUrl as string} />
          )}
          <div className="mt-6">
            <Comments />
          </div>
        </div>
        <Menu categories={categories} />
      </div>
    </div>
  );
};

export default SlugPage;
