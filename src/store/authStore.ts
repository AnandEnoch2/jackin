import { create } from 'zustand';
import useUserStore from './userStore';

interface User {
  _id: string;
  name: string;
  email: string;
  mobile: string;
  isAdmin: boolean;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (identifier: string, password: string, method?: 'email' | 'mobile') => Promise<void>;
  register: (name: string, email: string, password: string, mobile: string) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

// Changed admin credentials
const ADMIN_EMAIL = 'admin@gmail.com';
const ADMIN_PASSWORD = 'admin123';

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  loading: true,

  register: async (name: string, email: string, password: string, mobile: string) => {
    try {
      if (email === ADMIN_EMAIL) {
        throw new Error('Email already exists');
      }

      const userStore = useUserStore.getState();
      const existingUser = userStore.users.find(u => u.email === email || u.mobile === mobile);
      if (existingUser) {
        throw new Error('User already exists with this email or mobile number');
      }

      const user = {
        _id: `user_${Date.now()}`,
        name,
        email,
        mobile,
        isAdmin: false,
        createdAt: new Date().toISOString()
      };

      userStore.addUser(user);

      return user;
    } catch (error) {
      throw error;
    }
  },

  login: async (identifier, password, method = 'email') => {
    try {
      // Admin login
      if (identifier === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        const adminUser = {
          _id: 'admin',
          name: 'Admin',
          email: ADMIN_EMAIL,
          mobile: '0000000000',
          isAdmin: true,
          createdAt: new Date().toISOString()
        };

        const userStore = useUserStore.getState();
        if (!userStore.users.find(u => u.email === ADMIN_EMAIL)) {
          userStore.addUser(adminUser);
        }

        const token = 'admin-token';
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(adminUser));
        set({ user: adminUser, isAuthenticated: true });
        return;
      }

      // Regular user login
      const userStore = useUserStore.getState();
      const user = userStore.users.find(u => 
        method === 'email' ? u.email === identifier : u.mobile === identifier
      );
      
      if (user) {
        localStorage.setItem('token', `user_token_${user._id}`);
        localStorage.setItem('user', JSON.stringify(user));
        set({ user, isAuthenticated: true });
        return;
      }

      throw new Error('Invalid credentials');
    } catch (error) {
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    set({ user: null, isAuthenticated: false });
  },

  checkAuth: async () => {
    try {
      const token = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');

      if (!token || !storedUser) {
        set({ loading: false });
        return;
      }

      const user = JSON.parse(storedUser);
      set({ user, isAuthenticated: true, loading: false });
    } catch (error) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      set({ loading: false });
    }
  }
}));

export default useAuthStore;