import { defineStore } from "pinia";
import { supabase } from "boot/supabase";

interface UserMetadata {
  first_name?: string;
  last_name?: string;
  avatar_url?: string;
}

interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  avatar_url: string;
}

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null as User | null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.user,
  },

  actions: {
    async login(email: string, password: string) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      if (data.user) {
        const metadata = data.user.user_metadata as UserMetadata;
        this.user = {
          id: data.user.id,
          email: data.user.email || '',
          first_name: metadata.first_name || '',
          last_name: metadata.last_name || '',
          avatar_url: metadata.avatar_url || '',
        };
      }
    },

    async logout() {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      this.user = null;
    },

    async fetchUser() {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) throw error;
      if (user) {
        const metadata = user.user_metadata as UserMetadata;
        this.user = {
          id: user.id,
          email: user.email || '',
          first_name: metadata.first_name || '',
          last_name: metadata.last_name || '',
          avatar_url: metadata.avatar_url || '',
        };
      }
    },
  },
});
