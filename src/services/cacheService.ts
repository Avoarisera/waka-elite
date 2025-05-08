const CACHE_KEY_USERS = 'cached_users';

export const cacheService = {
  // Save users to local storage
  saveUsers(users: any[]): void {
    try {
      localStorage.setItem(CACHE_KEY_USERS, JSON.stringify(users));
    } catch (error) {
      console.error('Error saving users to cache:', error);
    }
  },

  // Get users from local storage
  getUsers(): any[] {
    try {
      const cachedUsers = localStorage.getItem(CACHE_KEY_USERS);
      return cachedUsers ? JSON.parse(cachedUsers) : [];
    } catch (error) {
      console.error('Error retrieving users from cache:', error);
      return [];
    }
  },

  // Clear users cache
  clearUsersCache(): void {
    try {
      localStorage.removeItem(CACHE_KEY_USERS);
    } catch (error) {
      console.error('Error clearing users cache:', error);
    }
  }
};