import Link from "next/link";
import Image from "next/image";
import { hexToRgba } from "@blogshow/utils/colors/hexToRgba";
import { CategoryResponseProps } from "@blogshow/types/category";

interface Props {
  categories: CategoryResponseProps[];
}

const CategoryList = ({ categories }: Props) => {
  return (
    <div>
      <h1 className="my-10 font-semibold text-2xl">Popular Categories</h1>
      <div className="flex flex-wrap justify-center gap-4">
        {categories.map(item => (
          <Link href={`/dashboard/blog?cat=${item.id}`} className="py-3 category" key={item.id} style={{ background: hexToRgba(item.color, 0.7) }}>
            {item.image ? (
              <figure>
                <Image
                  loader={() => item.image}
                  src={item.image}
                  alt="logo"
                  width={32}
                  height={32}
                  className="object-cover w-10 h-10 rounded-[50%]"
                />
              </figure>
            ) : (
              <></>
            )}
            <span>{item.id.length > 12 ? item.id.slice(0, 12) + "..." : item.id}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
