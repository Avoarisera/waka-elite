import { supabase } from '../boot/supabase';
import type { Idea } from '../types/models';

export const ideaService = {
  async getAllIdeas(): Promise<Idea[]> {
    const { data, error } = await supabase
      .from('ideas')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  async getIdeasByUserId(userId: string): Promise<Idea[]> {
    const { data, error } = await supabase
      .from('ideas')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  async getIdeaById(id: string): Promise<Idea> {
    const { data, error } = await supabase
      .from('ideas')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  async createIdea(idea: Omit<Idea, 'id' | 'created_at' | 'updated_at'>): Promise<Idea> {
    const { data, error } = await supabase
      .from('ideas')
      .insert([idea])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateIdea(id: string, idea: Partial<Idea>): Promise<Idea> {
    const { data, error } = await supabase
      .from('ideas')
      .update(idea)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async deleteIdea(id: string): Promise<void> {
    const { error } = await supabase
      .from('ideas')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
}; 