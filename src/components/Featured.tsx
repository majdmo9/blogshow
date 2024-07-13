"use client";
import { PostPropsResponse } from "@blogshow/types/post";
import Image from "next/image";
import { useEffect, useState } from "react";
import Loader from "./Loader";
import { useRouter } from "next/navigation";
import useAuthUser from "@blogshow/hooks/useUser";
import { usePosts } from "@blogshow/context/PostsContext";
import Link from "next/link";

const Featured = () => {
  const router = useRouter();
  const user = useAuthUser();

  const { posts, loading } = usePosts();
  const [post, setPost] = useState<PostPropsResponse>();
  console.log({ post, posts, loading });

  useEffect(() => {
    if (posts.length && !loading) {
      setPost(posts[0] as PostPropsResponse);
    }
  }, [posts, loading]);

  if (loading && !post) {
    return (
      <div className="w-full flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (!user?.userId) {
    return (
      <div className="mt-[30px]">
        <h1 className="text-2xl md:text-3xl lg:text-4xl  font-light">
          <span className="font-bold">Welcome👋! </span>
          <Link href="/login" className="underline">
            Sign in
          </Link>{" "}
          or{" "}
          <Link href="signup" className="underline">
            sign up
          </Link>{" "}
          to start blogging.
        </h1>
      </div>
    );
  }
  if (!post) {
    return (
      <div className="mt-[30px]">
        <h1 className="text-2xl md:text-3xl lg:text-4xl  font-light">
          <span className="font-bold">I&apos;m really sorry for hiding the data.</span> My website is all about showing you how experienced I am. To
          make it up to you, I&apos;ll renew your fetching credits early. Thanks for understanding!
        </h1>
      </div>
    );
  }

  return (
    <div className="mt-[30px]">
      <h1 className="text-3xl md:text-4xl lg:text-5xl xl:6xl font-light">
        <span className="font-bold">Unveiling the Power of Mindfulness:</span> A Journey to Inner Peace and Productivity
      </h1>
      <div className="xl:mt-[60px] lg:mt-[50px] md:mt-[40px] mt-[30px] flex items-center gap-[50px]">
        <figure className="flex-1 h-500 relative rounded-sm overflow-hidden">
          <Image loader={() => post.imageUrl} src={post.imageUrl} alt="post-image" fill className="object-cover w-full h-full" />
        </figure>
        <div className="flex-1 flex flex-col gap-[20px]">
          <h1 className="text-4xl font-semibold">{post.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: post.description.slice(0, 300) + "..." }} />
          <button onClick={() => router.push(`/dashboard/${post.id}`)} className="px-4 py-3 rounded-md bg-[#ddd] dark:text-black w-fit outline-none">
            Read More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Featured;
