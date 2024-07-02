import MenuPosts from "./MenuPosts";
import MenuCategoryList from "./MenuCategoryList";
import { CategoryResponseProps } from "@blogshow/types/category";

interface Props {
  categories: CategoryResponseProps[];
}

const Menu = ({ categories }: Props) => {
  return (
    <aside className="flex-[2] mt-[60px] lg:block hidden">
      <h2 className="text-md font-normal text-gray-500">{"What's hot"}</h2>
      <h1 className="text-3xl font-semibold">Most Popular</h1>
      <MenuPosts hasImage categories={categories} />
      <h2 className="text-md font-normal text-gray-500">Discover by topic</h2>
      <h1 className="text-3xl font-semibold">Categories</h1>
      <MenuCategoryList categories={categories} />
      <h2 className="text-md font-normal text-gray-500">Chosen by the editor</h2>
      <h1 className="text-3xl font-semibold">Editors pick</h1>
      <MenuPosts categories={categories} />
    </aside>
  );
};

export default Menu;
