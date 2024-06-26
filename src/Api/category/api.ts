import { getCategories } from "./getCategories";
import { createCategory } from "./createCategory";

export const categoryAPI = {
  baseUrl: "https://main.d3p9fe2sn9xfhh.amplifyapp.com",
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
