import { PostPropsResponse } from "@/types/post";
import Image from "next/image";
import Link from "next/link";

interface Props {
  post: PostPropsResponse;
  compKey: string;
}

const Card = ({ post: { title, description, createdAt, category, imageUrl, id }, compKey }: Props) => {
  return (
    <div className="mb-[50px] flex gap-[50px] items-center" key={compKey}>
      <figure className="flex-1 relative h-[350px] lg:block hidden">
        <Image loader={() => imageUrl} src={imageUrl} fill alt="post-image" className="object-cover" />
      </figure>
      <div className="flex-1 flex flex-col gap-[30px]">
        <div>
          <span className="text-gray-400">{new Date(createdAt).toLocaleString()} - </span>
          <span className="font-medium text-[#aa0022]">{category}</span>
        </div>
        <Link href={`/${id}`}>
          <h1 className="text-3xl font-semibold">{title}</h1>
        </Link>
        <div
          className="text-[#626262] dark:text-[#a6a6a6] leading-10"
          dangerouslySetInnerHTML={{ __html: (description?.length ?? 0) > 300 ? description.slice(0, 300) + "..." : description }}
        />
        <Link href={`/dashboard/${id}`} className="border-b-[1px] border-[#aa0022] w-fit py-[2px]">
          Read More
        </Link>
      </div>
    </div>
  );
};

export default Card;
