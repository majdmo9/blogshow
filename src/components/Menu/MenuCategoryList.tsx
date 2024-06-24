"use client";
import { categoryAPI } from "@/Api/category/api";
import { CategoryResponseProps } from "@/types/category";
import { hexToRgba } from "@/utils/colors/hexToRgba";
import Link from "next/link";
import { useEffect, useState } from "react";

const MenuCategoryList = () => {
  const [categories, setCategories] = useState<CategoryResponseProps[]>([]);
  useEffect(() => {
    const fetchCategories = async () => {
      const res = await categoryAPI.CRUD.getCategories();
      if (res.data) {
        setCategories(res.data);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="mt-[35px] mb-[60px] gap-[20px] flex flex-wrap">
      {categories.map(cat => (
        <Link
          key={cat.id}
          href={`/dashboard/blog?cat=${cat.id}`}
          style={{ background: hexToRgba(cat.color, 0.7) }}
          className="py-[10px] px-[25px] rounded-md style"
        >
          {cat.id}
        </Link>
      ))}
    </div>
  );
};

export default MenuCategoryList;
