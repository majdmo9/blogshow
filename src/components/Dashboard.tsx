import Featured from "./Featured";
import CategoryList from "./CategoryList";
import CardList from "./CardList";
import Menu from "./Menu";

const Dashboard = () => {
  return (
    <main>
      <Featured />
      <CategoryList />
      <section className="flex gap-[50px]">
        <CardList />
        <Menu />
      </section>
    </main>
  );
};

export default Dashboard;
