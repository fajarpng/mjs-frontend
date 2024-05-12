import { Spinner } from "flowbite-react";
import { Suspense, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import { useAuth } from "../hooks/auth";
import DashboardPage from "../pages";
import PageNotFound from "../pages/PageNotFound";
import SignInPage from "../pages/authentication/sign-in";
import CategoryPage from "../pages/category";
import ChangePasswordPage from "../pages/changePassword";
import EmployeePage from "../pages/employee";
import MasterProductPage from "../pages/products";
import StockOpnamePage from "../pages/stockOpnames";
import StockTransactionPage from "../pages/stockTransaction";
import SupplierPage from "../pages/supplir";

const MainLayout = function () {
  return (
    <div>
      <Navbar />
      <div className="flex items-start pt-16">
        <Sidebar />
        <MainContent />
      </div>
    </div>
  );
};

const MainContent = function () {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) navigate("/sign-in", { replace: true });
  }, [user, navigate]);

  return (
    <main className="relative ml-64 h-full w-full bg-gray-50 dark:bg-gray-900">
      <Suspense fallback={<Spinner color="primary" />}>
        <Routes>
          <Route path="/" element={<DashboardPage />} index />
          {/* product routes */}
          <Route path="/product" element={<MasterProductPage />} />
          <Route path="/category-product" element={<CategoryPage />} />
          <Route path="/stock-opname" element={<StockOpnamePage />} />
          <Route path="/stock-transaction" element={<StockTransactionPage />} />
          <Route path="/supplier" element={<SupplierPage />} />
          {/* user routes */}
          <Route path="/employee" element={<EmployeePage />} />
          {/* other routes */}
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/change-password" element={<ChangePasswordPage />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </main>
  );
};
export default MainLayout;
