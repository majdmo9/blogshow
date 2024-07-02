"use client";
import React, { Dispatch, SetStateAction, useState } from "react";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import { categoryAPI } from "@blogshow/Api/category/api";
import { CategoryResponseProps } from "@blogshow/types/category";
import DialogComponent from "../Dialog";
import { toast } from "react-toastify";
import { useCategories } from "@blogshow/hooks/useCategories";
import { MaxCategoriesLimit } from "@blogshow/utils/constants";

interface Props {
  setSelectedCat: Dispatch<SetStateAction<CategoryResponseProps | undefined>>;
}

const SelectComponent = ({ setSelectedCat }: Props) => {
  const [open, setOpen] = useState(false);
  const [categoryTitle, setCategoryTitle] = useState("");
  const [categoryImage, setCategoryImage] = useState("");

  const { categories, fetchCategories } = useCategories();

  const handleCreateCategory = async () => {
    try {
      if (categories.length >= MaxCategoriesLimit) {
        toast.error("You have exceeded the limit for creating additional categories.");
      }
      if (!categoryTitle || !categoryImage) return;
      const res = await categoryAPI.CRUD.createCategory({ id: categoryTitle, image: categoryImage });
      if (res) {
        toast.success(res.message);
        await fetchCategories();
        setOpen(false);
      }
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  return (
    <div className="w-full">
      <div className="flex gap-2 items-center w-full">
        <select
          onChange={e => setSelectedCat(categories.find(el => el.id === e.target.value) || categories[0])}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block min-w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 ring-0 dark:text-white !outline-none !focus:outline-none"
        >
          <option selected>*Choose a Category</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>
              {cat.id}
            </option>
          ))}
        </select>
        <button onClick={() => setOpen(prev => !prev)} className="button">
          <AddCircleOutlinedIcon className="dark:text-[#ddd] text-[#aa0022]" />
        </button>
      </div>
      <DialogComponent
        title="Add category"
        setOpen={setOpen}
        open={open}
        onConfirm={handleCreateCategory}
        confirmBtn="Submit"
        content={
          <div className="flex flex-col gap-2 w-full mt-2 items-center">
            <input type="text" onChange={e => setCategoryTitle(e.target.value.trim())} autoFocus className="input" placeholder="Title.." />
            <input type="url" onChange={e => setCategoryImage(e.target.value.trim())} className="input" placeholder="Image URL.." />
          </div>
        }
      />
    </div>
  );
};

export default SelectComponent;
