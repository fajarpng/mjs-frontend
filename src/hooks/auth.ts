import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { TEmployee } from "../types";

interface TAuthState {
  user?: TEmployee | null;
  token?: string;
  // eslint-disable-next-line no-unused-vars
  setUser: (data: { token: string; employee: TEmployee }) => void;
  setLogout: () => void;
}

export const useAuth = create<TAuthState>()(
  persist(
    (set) => ({
      setUser: ({ token, employee }) => set(() => ({ token, user: employee })),
      setLogout: () => set(() => ({ user: null })),
    }),
    { name: "mjsuseAuth" }
  )
);
