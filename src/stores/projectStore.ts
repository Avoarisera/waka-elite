import { defineStore } from "pinia";
import { supabase } from "boot/supabase";

export interface Project {
  id: string;
  idea_id: string | null;
  user_id: string;
  title: string;
  description: string;
  budget: number;
  location_id: string | null;
  created_at: string;
}

export const useProjectStore = defineStore("project", {
  state: () => ({
    projects: [] as Project[],
  }),

  actions: {
    // 🔹 Récupérer tous les projets
    async fetchProjects() {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      this.projects = data;
    },

    // 🔹 Ajouter un projet
    async addProject({
      idea_id = null,
      user_id,
      title,
      description,
      budget,
      location_id = null,
    }: {
      idea_id?: string | null;
      user_id: string;
      title: string;
      description: string;
      budget: number;
      location_id?: string | null;
    }) {
      const { data, error } = await supabase
        .from("projects")
        .insert([{ idea_id, user_id, title, description, budget, location_id }])
        .select();

      if (error) throw error;

      if (data) {
        this.projects.unshift(data[0]); // Ajouter en haut de la liste
      }
    },
  },
});
