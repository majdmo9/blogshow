import { UserIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import React from "react";

interface Props {
  author: string;
  createdAt: string;
  authorImage: string;
}

const User = ({ author, authorImage, createdAt }: Props) => {
  return (
    <div className="flex items-center gap-[20px]">
      <figure className="w-[50px] h-[50px] relative">
        {!authorImage ? (
          <UserIcon className="dark:text-gray-800 text-white rounded-[50%] p-2 bg-gray-700 dark:bg-[#f0f0f0] h-12 w-12" />
        ) : (
          <Image
            loader={() => authorImage}
            src={authorImage}
            alt="user-img"
            fill
            className="object-cover rounded-[50%] border-gray-400 border-[2px]"
          />
        )}
      </figure>
      <div className="flex flex-col gap-[5px] text-[#626262] dark:text-[#a6a6a6]">
        <span className="text-lg md:text-xl font-medium">{author}</span>
        <span className="text-sm">{new Date(createdAt).toLocaleString()}</span>
      </div>
    </div>
  );
};

export default User;
