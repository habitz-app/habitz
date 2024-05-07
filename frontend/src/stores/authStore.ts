import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { createSelectors } from '@/lib/createSelectors';

type State = {
  accessToken: string | undefined;
};

type Actions = {
  setAccessToken: (accessToken: string | undefined) => void;
  clear: () => void;
};

type AuthStore = State & Actions;

const initialState: State = {
  accessToken: undefined,
};

const authStore = create<AuthStore>()(
  devtools((set) => ({
    // states
    ...initialState,
    // actions
    setAccessToken: (accessToken: string | undefined) => set({ accessToken }),
    clear: () => set(initialState),
  })),
);

export default createSelectors(authStore);
