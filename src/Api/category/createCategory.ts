import { CategoryProps } from "@/types/category";
import { categoryAPI } from "./api";
import { getRandomLightColor } from "@/utils/colors/getRandomColor";
import Axios from "@/lib/axiosConfig";

export const createCategory = async ({ id, image }: CategoryProps): Promise<{ message: string }> => {
  const color = getRandomLightColor();
  const res = await Axios.post(categoryAPI.createCategory(), {
    id,
    image,
    color,
  });
  return res.data;
};
