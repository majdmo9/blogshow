"use client";
import { PostPropsResponse } from "@blogshow/types/post";
import { LocalStorageVariables } from "@blogshow/utils/constants";
import Image from "next/image";
import { useEffect, useState } from "react";
import Loader from "./Loader";
import { useRouter } from "next/navigation";

const Featured = () => {
  const router = useRouter();

  const [post, setPost] = useState<PostPropsResponse>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (typeof window !== "undefined") {
      const res = localStorage.getItem(LocalStorageVariables.LatestPost);
      if (res) {
        setPost(JSON.parse(res));
      }
    }
    setLoading(false);
  }, []);

  if (loading || !post) {
    return <Loader />;
  }

  return (
    <div className="mt-[30px]">
      <h1 className="text-3xl md:text-4xl lg:text-5xl xl:6xl  font-light">
        <span className="font-bold">Unveiling the Power of Mindfulness:</span> A Journey to Inner Peace and Productivity
      </h1>
      <div className="xl:mt-[60px] lg:mt-[50px] md:mt-[40px] mt-[30px] flex items-center gap-[50px]">
        <figure className="flex-1 h-500 relative">
          <Image loader={() => post.imageUrl} src={post.imageUrl} alt="post-image" fill className="object-cover w-full h-full" />
        </figure>
        <div className="flex-1 flex flex-col gap-[20px]">
          <h1 className="text-4xl font-semibold">{post.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: post.description }} />
          <button onClick={() => router.push(`/dashboard/${post.id}`)} className="px-4 py-3 rounded-md bg-[#ddd] dark:text-black w-fit outline-none">
            Read More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Featured;
