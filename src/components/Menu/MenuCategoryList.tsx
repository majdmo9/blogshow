import { CategoryResponseProps } from "@blogshow/types/category";
import { hexToRgba } from "@blogshow/utils/colors/hexToRgba";
import Link from "next/link";

interface Props {
  categories: CategoryResponseProps[];
}

const MenuCategoryList = ({ categories }: Props) => {
  if (!categories) return <></>;
  return (
    <div className="mt-[35px] mb-[60px] gap-[20px] flex flex-wrap">
      {categories.map(cat => (
        <Link
          key={cat.id}
          href={`/dashboard/blog?cat=${cat.id}`}
          style={{ background: hexToRgba(cat.color, 0.7) }}
          className="py-[10px] px-[25px] rounded-md style"
        >
          {cat.id}
        </Link>
      ))}
    </div>
  );
};

export default MenuCategoryList;
