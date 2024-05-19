import { StrictMode, useEffect, useState } from "react";

import { Flowbite } from "flowbite-react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import theme from "./flowbite-theme";
import "./index.css";
import MainPage from "./layouts/main";
import SignInPage from "./pages/authentication/sign-in";

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

export const App = () => {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const dark = localStorage.getItem("theme") === "dark";
    setDark(dark);
  }, []);

  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <Flowbite theme={{ theme, dark }}>
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
};
