import Featured from "./Featured";
import CategoryList from "./CategoryList";
import CardList from "./CardList";
import Menu from "./Menu";
import { CategoryResponseProps } from "@blogshow/types/category";

interface Props {
  categories: CategoryResponseProps[];
}

const Dashboard = ({ categories }: Props) => {
  return (
    <main>
      <Featured />
      <CategoryList categories={categories} />
      <section className="flex gap-[50px]">
        <CardList />
        <Menu categories={categories} />
      </section>
    </main>
  );
};

export default Dashboard;
