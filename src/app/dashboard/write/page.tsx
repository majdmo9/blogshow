"use client";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.bubble.css";
import { useState } from "react";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import AddPhotoAlternateRoundedIcon from "@mui/icons-material/AddPhotoAlternateRounded";
import VideoCameraBackRoundedIcon from "@mui/icons-material/VideoCameraBackRounded";
import { Collapse } from "@mui/material";
import useAuthUser from "@blogshow/hooks/useUser";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { postsAPI } from "@blogshow/Api/posts/api";
import Dialog from "@blogshow/components/Dialog";
import Image from "next/image";
import SelectComponent from "@blogshow/components/lib/Select";
import { CategoryResponseProps } from "@blogshow/types/category";
import IFrame from "@blogshow/components/IFrame";
import { isValidImageUrl } from "@blogshow/utils/URL/isValidImage";
import { isValidYouTubeUrl } from "@blogshow/utils/URL/isValidYoutubeUrl";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const WritePage = () => {
  const user = useAuthUser();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [openVideoDialog, setOpenVideoDialog] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<CategoryResponseProps>();

  const toggleOpen = () => setOpen(prev => !prev);

  const handlePublish = async () => {
    if (!category) {
      toast.error("Category is required!");
      return;
    }
    if (!imageUrl) {
      toast.error("Image is required!");
      return;
    }
    try {
      const res = await postsAPI.CRUD.createPost({
        title,
        description: text,
        createdAt: new Date().toISOString(),
        author: user.email,
        authorId: user.userId,
        category: category?.id,
        imageUrl,
        videoUrl,
        authorImage: user.picture,
      });
      const message = await res;
      toast.success(message.message);
      router.push("/dashboard");
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  return (
    <div className="w-full">
      <div className="flex xl:flex-row flex-col justify-between gap-2 w-full">
        <div className="xl:hidden block">
          <SelectComponent setSelectedCat={setCategory} />
        </div>
        <div>
          <input
            onChange={e => setTitle(e.target.value)}
            type="text"
            placeholder="Title*"
            className="mb-4 bg-transparent pl-0 pb-0 p-[50px] w-full text-3xl md:text-4xl lg:text-5xl outline-none border-b-2 border-[#a6a6a6]"
            maxLength={35}
          />
          <div>
            <div className="flex relative">
              <button onClick={toggleOpen}>
                <AddCircleOutlinedIcon className="text-[#626262] dark:text-[#25D366]" />
              </button>
              <Collapse in={open} orientation="horizontal" className="absolute z-10 dark:bg-[#0f172a] bg-white left-[50px]">
                <div className="flex items-center gap-[10px]">
                  <button onClick={() => setOpenDialog(true)}>
                    <AddPhotoAlternateRoundedIcon className="text-[#626262] dark:text-[#25D366]" />
                  </button>
                  <button onClick={() => setOpenVideoDialog(true)}>
                    <VideoCameraBackRoundedIcon className="text-[#626262] dark:text-[#25D366]" />
                  </button>
                </div>
              </Collapse>
            </div>
            <div className="flex items-start min-h-[409px]">
              <ReactQuill className="mt-4 w-full" theme="bubble" value={text} onChange={setText} placeholder="Write your Post...*" />
            </div>
          </div>
        </div>
        <div className="xl:block hidden">
          <SelectComponent setSelectedCat={setCategory} />
        </div>
      </div>
      <div className="flex flex-col w-full items-start justify-start gap-6">
        {imageUrl && !openDialog ? (
          <Image loader={() => imageUrl} src={imageUrl} alt="post-img" width={400} height={400} className="object-contain rounded-sm" />
        ) : (
          <></>
        )}
        {videoUrl && !openVideoDialog ? <IFrame url={videoUrl} /> : <></>}
      </div>
      <div className="w-full flex justify-end">
        <button
          onClick={handlePublish}
          className="bg-[#25D366] md:w-fit w-full ml-auto mt-6  py-3 px-5 rounded-sm text-black dark:text-white font-semibold tracking-wider disabled:bg-slate-400"
          disabled={!text || !title || !category}
        >
          Publish
        </button>
      </div>
      <Dialog
        open={openDialog}
        setOpen={setOpenDialog}
        title="Add Image"
        description="Add your image URL"
        confirmBtn="Submit"
        content={<input type="url" onChange={e => setImageUrl(e.target.value)} placeholder="Image url.." className="input" />}
        onConfirm={async () => {
          if (await isValidImageUrl(imageUrl)) {
            setImageUrl(imageUrl);
            setOpenDialog(false);
          } else {
            toast.error("URL must reffer to an image!");
          }
        }}
        onClose={() => {
          setImageUrl("");
          setOpenDialog(false);
        }}
      />
      <Dialog
        open={openVideoDialog}
        setOpen={setOpenVideoDialog}
        title="Add Video"
        description="Add your Youtube video URL.."
        confirmBtn="Submit"
        content={<input type="url" onChange={e => setVideoUrl(e.target.value)} placeholder="Video url.." className="input" />}
        onConfirm={() => {
          if (isValidYouTubeUrl(videoUrl)) {
            setVideoUrl(videoUrl);
            setOpenVideoDialog(false);
          } else {
            toast.error("URL must reffer to a youtube video!");
          }
        }}
        onClose={() => {
          setVideoUrl("");
          setOpenVideoDialog(false);
        }}
      />
    </div>
  );
};

export default WritePage;
