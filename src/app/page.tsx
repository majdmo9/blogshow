"use client";
import { useEffect } from "react";
import isEmpty from "lodash/isEmpty";
import { kvAPI } from "@blogshow/Api/kv/api";
import useAuthUser from "@blogshow/hooks/useUser";
import Dashboard from "@blogshow/components/Dashboard";
import { useCategories } from "@blogshow/hooks/useCategories";

const Home = () => {
  const user = useAuthUser();
  const { categories } = useCategories();

  useEffect(() => {
    const fetchUser = async () => {
      if (user?.userId) {
        const res = await kvAPI.CRUD.getUser(user.userId);
        if (isEmpty(res)) {
          await kvAPI.CRUD.createUser(user.userId);
        }
      }
    };
    fetchUser();
  }, [user]);

  return <Dashboard categories={categories} />;
};
export default Home;
