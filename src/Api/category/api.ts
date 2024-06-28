import { getCategories } from "./getCategories";
import { createCategory } from "./createCategory";

export const categoryAPI = {
  baseUrl: String(process.env.NEXT_PUBLIC_API_BASE_URL),
  CRUD: {
    getCategories,
    createCategory,
  },
  getCategories: function () {
    return `${this.baseUrl}/api/category/get-categories`;
  },
  createCategory: function () {
    return `${this.baseUrl}/api/category/create-category`;
  },
};
