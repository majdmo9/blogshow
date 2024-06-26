import CardList from "@blogshow/components/CardList";
import CategoryList from "@blogshow/components/CategoryList";
import Featured from "@blogshow/components/Featured";
import Menu from "@blogshow/components/Menu";

const Home = () => {
  return (
    <>
      <Featured />
      <CategoryList />
      <section className="flex gap-[50px]">
        <CardList />
        <Menu />
      </section>
    </>
  );
};
export default Home;
