import { CategoryResponseProps } from "@blogshow/types/category";
import { categoryAPI } from "./api";

export const getCategories = async (): Promise<{ data: CategoryResponseProps[] }> => {
  const res = await fetch(categoryAPI.getCategories(), { method: "GET", next: { tags: ["category"] } });

  return await res.json();
};
