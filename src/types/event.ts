export interface Event {
  id: number;
  title: string;
  description: string;
  date: string; // ISO date string
  time: string;
  location: string;
  organizer_id: number;
  organizer_name: string;
  organizer_avatar: string;
  participants: number[]; // Array of user IDs
  max_participants?: number; // Optional maximum number of participants
  photo_urls: string[];
  category: string;
  comments: EventComment[];
}

export interface EventComment {
  id: number;
  event_id: number;
  user_id: number;
  user_name: string;
  user_avatar: string;
  content: string;
  created_at: string; // ISO date string
} 