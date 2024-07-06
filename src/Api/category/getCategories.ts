import { CategoryResponseProps } from "@blogshow/types/category";
import { categoryAPI } from "./api";
import Axios from "@blogshow/lib/axiosConfig";

export const getCategories = async (): Promise<{ data: CategoryResponseProps[] }> => {
  const res = await Axios.put(categoryAPI.getCategories());
  return res.data;
};
