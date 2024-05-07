import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { createSelectors } from '@/lib/createSelectors';

type State = {
  userId: number;
  name: string;
  nickName: string;
  profileImage: string;
  role: string;
};

type Actions = {
  setUser: (user: State) => void;
  setUserId: (userId: number) => void;
  setName: (name: string) => void;
  setNickName: (nickName: string) => void;
  setProfileImage: (url: string) => void;
  setRole: (role: string) => void;
  clear: () => void;
};

type UserStore = State & Actions;

const initialState: State = {
  userId: 0,
  name: '',
  nickName: '',
  profileImage: '',
  role: '',
};

const createUserStore = create<UserStore>()(
  devtools((set) => ({
    // states
    ...initialState,
    // actions
    setUser: (user: State) => set(user),
    setUserId: (userId: number) => set({ userId }),
    setName: (name: string) => set({ name }),
    setNickName: (nickName: string) => set({ nickName }),
    setProfileImage: (profileImage: string) => set({ profileImage }),
    setRole: (role: string) => set({ role }),
    clear: () => set(initialState),
  })),
);

const useUserStore = createSelectors(createUserStore);

export default useUserStore;
