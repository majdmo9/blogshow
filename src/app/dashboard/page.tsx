"use client";
import Dashboard from "@blogshow/components/Dashboard";
import { useCategories } from "@blogshow/hooks/useCategories";

const DashboardPage = () => {
  const { categories } = useCategories();
  return <Dashboard categories={categories} />;
};

export default DashboardPage;
