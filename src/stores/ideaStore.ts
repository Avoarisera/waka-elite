import { defineStore } from "pinia";
import { supabase } from "boot/supabase";

interface Idea {
  id: string;
  title: string;
  description: string;
  budget: number;
  votes_count: number;
  created_at: string;
}

export const useIdeaStore = defineStore("idea", {
  state: () => ({
    ideas: [] as Idea[],
  }),

  actions: {
    async fetchIdeas() {
      const { data, error } = await supabase
        .from("ideas")
        .select("*")
        .order("votes_count", { ascending: false });
      if (error) throw error;
      this.ideas = data;
    },

    async addIdea(title: string, description: string, budget: number) {
      const { data, error } = await supabase
        .from("ideas")
        .insert([{ title, description, budget }]);
      if (error) throw error;
      if (data) {
        this.ideas.push(data[0]);
      }
    },

    async voteIdea(ideaId: string) {
      // Vérifier si l'utilisateur a déjà voté
      const { data: existingVote, error: checkError } = await supabase
        .from("votes")
        .select("id")
        .eq("idea_id", ideaId)
        .single();

      if (checkError && checkError.code !== 'PGRST116') {
        throw checkError;
      }

      if (existingVote) {
        // L'utilisateur a déjà voté, on supprime le vote
        const { error: deleteError } = await supabase
          .from("votes")
          .delete()
          .eq("id", existingVote.id);

        if (deleteError) throw deleteError;

        // Mettre à jour le compteur de votes
        const { error: updateError } = await supabase.rpc('decrement_votes_count', { idea_id: ideaId });
        if (updateError) throw updateError;

        // Mettre à jour l'idée dans le store
        const idea = this.ideas.find(i => i.id === ideaId);
        if (idea) {
          idea.votes_count--;
        }
      } else {
        // L'utilisateur n'a pas encore voté, on ajoute le vote
        const { error: insertError } = await supabase
          .from("votes")
          .insert([{ idea_id: ideaId }]);

        if (insertError) throw insertError;

        // Mettre à jour le compteur de votes
        const { error: updateError } = await supabase.rpc('increment_votes_count', { idea_id: ideaId });
        if (updateError) throw updateError;

        // Mettre à jour l'idée dans le store
        const idea = this.ideas.find(i => i.id === ideaId);
        if (idea) {
          idea.votes_count++;
        }
      }
    },
  },
});
