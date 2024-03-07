import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { Flowbite } from "flowbite-react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import theme from "./flowbite-theme";
import "./index.css";
import DashboardPage from "./pages";
import PageNotFound from "./pages/PageNotFound";
import SignInPage from "./pages/authentication/sign-in";
import CategoryPage from "./pages/category";
import EmployeePage from "./pages/employee";
import MasterProductPage from "./pages/products/master";
import ChangePasswordPage from "./pages/changePassword";

const container = document.getElementById("root");

if (!container) {
  throw new Error("React root element doesn't exist!");
}

const root = createRoot(container);

const staleTime = 1000 * 60 * 60 * 5; // 5 hours

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      cacheTime: staleTime,
      staleTime,
      refetchOnWindowFocus: false,
    },
  },
});

root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Flowbite theme={{ theme }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<DashboardPage />} index />
            {/* product routes */}
            <Route path="/master-product" element={<MasterProductPage />} />
            <Route path="/category-product" element={<CategoryPage />} />
            {/* user routes */}
            <Route path="/employee" element={<EmployeePage />} />
            {/* other routes */}
            <Route path="/sign-in" element={<SignInPage />} />
            <Route path="/change-password" element={<ChangePasswordPage />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </Flowbite>
    </QueryClientProvider>
  </StrictMode>
);
