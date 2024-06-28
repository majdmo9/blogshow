import { getCategories } from "./getCategories";
import { createCategory } from "./createCategory";

export const categoryAPI = {
  baseUrl: "http://localhost:3000",
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
