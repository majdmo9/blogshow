"use client";
import { useCategories } from "@blogshow/hooks/useCategories";
import { usePosts } from "@blogshow/hooks/usePosts";
import Image from "next/image";
import Link from "next/link";

interface Props {
  hasImage?: boolean;
}

const MenuPosts = ({ hasImage = false }: Props) => {
  const { posts } = usePosts(4);
  const { categories } = useCategories();

  return (
    <div className="flex flex-col gap-[35px] mt-[35px] mb-[60px]">
      {posts.map(post => (
        <Link key={post.id} href="/" className="flex items-center gap-[20px]">
          {hasImage ? (
            <figure className="flex-1 relative aspect-square">
              <Image
                loader={() => post.imageUrl}
                src={post.imageUrl}
                alt="img"
                fill
                className="object-cover border-[3px] border-gray-400 rounded-[50%]"
              />
            </figure>
          ) : (
            <></>
          )}
          <div className="flex-[4] flex flex-col gap-[5px]">
            <span
              className="py-[3px] px-[8px] rounded-2xl text-white w-fit capitalize"
              style={{ background: categories.find(cat => cat.id === post.category)?.color }}
            >
              {post.category}
            </span>
            <h3 className="text-lg font-medium text-[#626262] dark:text-[#a6a6a6]">{post.title.slice(0, 20)}</h3>
            <div className="text-xs">
              <span>{post.author}</span>
              <span className="text-gray-400"> - {new Date(post.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default MenuPosts;
