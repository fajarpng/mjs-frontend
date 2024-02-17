import { create } from "zustand";
import { persist } from "zustand/middleware";

interface TUserState {
  name?: string;
  token?: string;
}

interface TAuthState {
  user?: TUserState | null;
  setUser: (user: TUserState) => void;
  setLogout: () => void;
}

export const useAuth = create<TAuthState>()(
  persist(
    (set) => ({
      setUser: (user) => set(() => ({ user })),
      setLogout: () => set(() => ({ user: null })),
    }),
    { name: "mjsAuthStore" }
  )
);
