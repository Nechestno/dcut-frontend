import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type{ User, LoginCredentials, UserState } from './types';
import { tokenStorage } from '../lib/tokenStorage';
import {storage} from '@shared/lib/localStorage'
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      ...initialState,

      setUser: (user: User | null) => {
        set({ user });
      },

      setAuthenticated: (status: boolean) => {
        set({ isAuthenticated: status });
      },

      setLoading: (status: boolean) => {
        set({ isLoading: status });
      },

      setError: (error: string | null) => {
        set({ error });
      },

      login: async (credentials: LoginCredentials) => {
        set({ isLoading: true, error: null });
        
        try {
          await new Promise((resolve) => setTimeout(resolve, 500));
          
          if (!credentials.email || !credentials.password) {
            throw new Error('Все поля должны быть заполнены');
          }
          
          if (credentials.password.length < 3) {
            throw new Error('Пароль должен быть от 3 символов');
          }

          const user: User = {
            id: uuidv4(),
            email: credentials.email,
          };

          const token = 'fake-jwt-token-' + Date.now();

          tokenStorage.setToken(token);

          set({
            user,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Login failed',
            isLoading: false,
          });
          throw error;
        }
      },

      logout: () => {
        storage.clear();
        set({
          user: null,
          isAuthenticated: false,
          error: null,
          isLoading: false,
        });
      },
      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: 'user-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);