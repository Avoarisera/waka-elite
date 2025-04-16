export interface Location {
  id: string;
  name: string;
  address: string;
  city: string;
  country: string;
  budget: number;
  created_at: string;
  updated_at: string;
}

export interface Idea {
  id: string;
  user_id: string;
  title: string;
  description: string;
  location_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: string;
  user_id: string;
  idea_id: string | null;
  title: string;
  description: string;
  budget: number;
  location_id: string | null;
  created_at: string;
  updated_at: string;
} 