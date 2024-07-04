import { CategoryResponseProps } from "@blogshow/types/category";
import { categoryAPI } from "./api";
import Axios from "../../lib/axiosConfig";

export const getCategories = async (): Promise<{ data: CategoryResponseProps[] }> => {
  const res = await Axios.get(categoryAPI.getCategories());
  return res.data;
};
