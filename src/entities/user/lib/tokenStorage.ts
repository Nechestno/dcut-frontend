
import { storage } from '@shared/lib/localStorage';

const TOKEN_KEY = 'auth_token';

export const tokenStorage = {
  getToken: (): string | null => storage.get<string>(TOKEN_KEY),

  setToken: (token: string): void => storage.set(TOKEN_KEY, token),

  removeToken: (): void => {
    storage.remove(TOKEN_KEY);
  },

  isAuthenticated: (): boolean => storage.has(TOKEN_KEY),

  clearAll: (): void => {
    storage.remove(TOKEN_KEY);
  },
};