import { CategoryPostProps } from "@blogshow/types/post";
import Image from "next/image";
import Link from "next/link";

interface Props {
  post: CategoryPostProps;
  compKey: string;
  line: boolean;
}

const Card = ({ post: { title, description, createdAt, category, imageUrl, id }, compKey }: Props) => {
  return (
    <div className="mb-[50px] lg:px-0 flex gap-[50px] items-center bg-gray-50 dark:bg-slate-800  rounded-s shadow-lg overflow-hidden" key={compKey}>
      <figure className="w-full lg:block hidden">
        <Image loader={() => imageUrl} src={imageUrl} width={800} height={800} alt="post-image" className="object-cover !min-h-[455px]" />
      </figure>
      <div className="w-full py-3 px-4 flex flex-col gap-[30px]">
        <div>
          <span className="text-gray-400">{new Date(createdAt).toLocaleString()} - </span>
          <span className="font-medium text-[#aa0022]">{category}</span>
        </div>
        <Link href={`/${id}`}>
          <h1 className="text-3xl font-semibold">{title}</h1>
        </Link>
        <div
          className="text-[#626262] dark:text-[#a6a6a6] leading-6"
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
