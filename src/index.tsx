import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { Flowbite } from "flowbite-react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import theme from "./flowbite-theme";
import "./index.css";
import MainPage from "./layouts/main";
import SignInPage from "./pages/authentication/sign-in";

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
            <Route path="/sign-in" element={<SignInPage />} />
            <Route path="/*" element={<MainPage />} />
          </Routes>
        </BrowserRouter>
      </Flowbite>
    </QueryClientProvider>
  </StrictMode>
);
