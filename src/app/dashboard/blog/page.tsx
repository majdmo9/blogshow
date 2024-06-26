"use client";
import CardList from "@blogshow/components/CardList";
import Menu from "@blogshow/components/Menu";
import { useSearchParams } from "next/navigation";

const BlogPage = () => {
  const searchParams = useSearchParams();
  const cat = searchParams?.get("cat");
  return (
    <div>
      <h1 className="text-3xl text-white py-[5px] px-[10px] font-bold text-center bg-orange-300 rounded-sm">{cat} Blog</h1>
      <div className="flex gap-[50px]">
        <CardList />
        <Menu />
      </div>
    </div>
  );
};

export default BlogPage;
