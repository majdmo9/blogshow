import CardList from "@/components/CardList";
import CategoryList from "@/components/CategoryList";
import Featured from "@/components/Featured";
import Menu from "@/components/Menu";

export default function Home() {
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
}
