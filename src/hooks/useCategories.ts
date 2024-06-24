import { categoryAPI } from "@/Api/category/api";
import { CategoryResponseProps } from "@/types/category";
import { useEffect, useState } from "react";

export const useCategories = () => {
  const [categories, setCategories] = useState<CategoryResponseProps[]>([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data: { data: CategoryResponseProps[] } = await categoryAPI.CRUD.getCategories();
        setCategories(data.data);
      } catch (err) {
        console.log({ err });
      }
    };
    fetchCategories();
  }, []);

  return { categories };
};
