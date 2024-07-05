import { CategoryProps } from "@blogshow/types/category";
import { categoryAPI } from "./api";
import { getRandomLightColor } from "@blogshow/utils/colors/getRandomColor";

export const createCategory = async ({ id, image }: CategoryProps): Promise<{ message: string }> => {
  const color = getRandomLightColor();
  const res = await fetch(categoryAPI.createCategory(), {
    method: "POST",
    next: { tags: ["category"] },
    body: JSON.stringify({ id, image, color }),
  });
  return await res.json();
};
