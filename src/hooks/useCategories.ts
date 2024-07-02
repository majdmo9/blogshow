import { categoryAPI } from "@blogshow/Api/category/api";
import { CategoryResponseProps } from "@blogshow/types/category";
import { useCallback, useEffect, useState } from "react";

export const useCategories = () => {
  const [categories, setCategories] = useState<CategoryResponseProps[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchCategories = useCallback(async () => {
    if (categories.length || loading) return;
    setLoading(true);
    try {
      const data: { data: CategoryResponseProps[] } = await categoryAPI.CRUD.getCategories();
      setCategories(data.data);
      setLoading(false);
    } catch (err) {
      console.log({ err });
      setLoading(false);
    }
  }, [categories.length, loading]);

  useEffect(() => {
    fetchCategories();
  }, []);

  return { categories, fetchCategories };
};
