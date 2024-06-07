import { Spinner } from "flowbite-react";
import { Suspense, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import { useAuth } from "../hooks/auth";
import PageNotFound from "../pages/PageNotFound";
import AssetProductPage from "../pages/assets";
import AttendancePage from "../pages/attendance";
import SignInPage from "../pages/authentication/sign-in";
import BundlingPage from "../pages/bundling";
import BundlingDetailPage from "../pages/bundlingDetail";
import CategoryPage from "../pages/category";
import ChangePasswordPage from "../pages/changePassword";
import DashboardPage from "../pages/dashboard";
import EmployeePage from "../pages/employee";
import MasterProductPage from "../pages/products";
import RakPage from "../pages/rak";
import StockOpnamePage from "../pages/stockOpnames";
import StockTransactionPage from "../pages/stockTransaction";
import DetailStockTransactionPage from "../pages/stockTransactionDetail";
import SupplierPage from "../pages/supplier";

// import DashboardPage from "../pages";

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
          <Route path="/asset" element={<AssetProductPage />} />
          <Route path="/category-product" element={<CategoryPage />} />
          <Route path="/rak-product" element={<RakPage />} />
          <Route path="/stock-opname" element={<StockOpnamePage />} />
          {/* bundling routes */}
          <Route path="/bundling" element={<BundlingPage />} />
          <Route path="/bundling/:code" element={<BundlingDetailPage />} />
          {/* stock transaction routes */}
          <Route path="/stock-transaction" element={<StockTransactionPage />} />
          <Route
            path="/stock-transaction/:id"
            element={<DetailStockTransactionPage />}
          />
          <Route path="/supplier" element={<SupplierPage />} />
          {/* user routes */}
          <Route path="/employee" element={<EmployeePage />} />
          <Route path="/attendance" element={<AttendancePage />} />
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
