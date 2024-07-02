"use client";
import CardList from "@blogshow/components/CardList";
import Menu from "@blogshow/components/Menu";
import { useCategories } from "@blogshow/hooks/useCategories";
import { useSearchParams } from "next/navigation";

const BlogPage = () => {
  const searchParams = useSearchParams();
  const cat = searchParams?.get("cat");
  const { categories } = useCategories();
  return (
    <div>
      <h1 className="text-3xl text-white py-[5px] px-[10px] font-bold text-center bg-orange-300 rounded-sm">{cat} Blog</h1>
      <div className="flex gap-[50px]">
        <CardList />
        <Menu categories={categories} />
      </div>
    </div>
  );
};

export default BlogPage;
