class StorageService {
  private storage: Storage;

  constructor() {
    this.storage = localStorage;
  }

  get<T>(key: string): T | null {
    try {
      const raw = this.storage.getItem(key);
      if (!raw) return null;
      return JSON.parse(raw) as T;
    } catch {
      return null;
    }
  }

  set<T>(key: string, value: T): void {
    try {
      this.storage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`[Storage] Failed to save ${key}:`, error);
    }
  }

  remove(key: string): void {
    try {
      this.storage.removeItem(key);
    } catch (error) {
      console.error(`[Storage] Failed to remove ${key}:`, error);
    }
  }

  has(key: string): boolean {
    try {
      return this.storage.getItem(key) !== null;
    } catch {
      return false;
    }
  }

  clear(): void {
    try {
      this.storage.clear();
    } catch (error) {
      console.error('[Storage] Failed to clear:', error);
    }
  }
}

export const storage = new StorageService();