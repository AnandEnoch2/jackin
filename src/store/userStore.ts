import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { toast } from 'react-hot-toast';

export interface User {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  createdAt: string;
}

interface UserStore {
  users: User[];
  loading: boolean;
  error: string | null;
  addUser: (user: User) => void;
  updateUser: (id: string, user: Partial<User>) => void;
  deleteUser: (id: string) => void;
}

const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      users: [],
      loading: false,
      error: null,

      addUser: (user) => {
        set((state) => {
          // Check if user already exists
          const exists = state.users.some(u => u.email === user.email);
          if (exists) {
            return state;
          }
          return {
            users: [...state.users, user],
          };
        });
      },

      updateUser: (id, userData) => {
        set((state) => ({
          users: state.users.map((user) =>
            user._id === id ? { ...user, ...userData } : user
          ),
        }));
        toast.success('User updated successfully');
      },

      deleteUser: (id) => {
        set((state) => {
          // Prevent deleting admin user
          const user = state.users.find(u => u._id === id);
          if (user?.isAdmin) {
            toast.error('Cannot delete admin user');
            return state;
          }
          return {
            users: state.users.filter((user) => user._id !== id),
          };
        });
        toast.success('User deleted successfully');
      },
    }),
    {
      name: 'user-store',
    }
  )
);

export default useUserStore;