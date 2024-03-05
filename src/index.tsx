import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { Flowbite } from "flowbite-react";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import theme from "./flowbite-theme";
import "./index.css";
import DashboardPage from "./pages";
import PageNotFound from "./pages/PageNotFound";
import SignInPage from "./pages/authentication/sign-in";
import MasterBarangPage from "./pages/products/master";
import { QueryClient, QueryClientProvider } from "react-query";
import EmployeePage from "./pages/user/employee";

const container = document.getElementById("root");

if (!container) {
  throw new Error("React root element doesn't exist!");
}

const root = createRoot(container);

const staleTime = 1000 * 60 * 60 * 0.5; // half hours

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
            <Route path="/master-product" element={<MasterBarangPage />} />
            <Route path="/employee" element={<EmployeePage />} />
            <Route path="/sign-in" element={<SignInPage />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </Flowbite>
    </QueryClientProvider>
  </StrictMode>
);
