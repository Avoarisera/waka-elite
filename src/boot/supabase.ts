
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://favyidpvraxlnkbqykhd.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZhdnlpZHB2cmF4bG5rYnF5a2hkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI3NDE0ODksImV4cCI6MjA1ODMxNzQ4OX0.hqOe9gvpkuCwkeqxhWMV4Z8DJeSnvxObj-ojVht7IBo'
export const supabase = createClient(supabaseUrl, supabaseKey);
