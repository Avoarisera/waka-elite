-- Create locations table
CREATE TABLE IF NOT EXISTS public.locations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  address TEXT,
  city TEXT NOT NULL,
  country TEXT NOT NULL,
  budget NUMERIC(10,2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Add RLS policies for locations
ALTER TABLE public.locations ENABLE ROW LEVEL SECURITY;

-- Allow public access to locations (read-only)
CREATE POLICY "Allow public read access to locations" 
  ON public.locations 
  FOR SELECT 
  USING (true);

-- Allow authenticated users to insert locations
CREATE POLICY "Allow authenticated users to insert locations" 
  ON public.locations 
  FOR INSERT 
  TO authenticated 
  WITH CHECK (true);

-- Allow users to update their own locations
CREATE POLICY "Allow users to update their own locations" 
  ON public.locations 
  FOR UPDATE 
  TO authenticated 
  USING (true);

-- Add foreign keys to ideas and projects tables
ALTER TABLE public.ideas 
  ADD COLUMN IF NOT EXISTS location_id UUID REFERENCES public.locations(id) ON DELETE SET NULL;

ALTER TABLE public.projects 
  ADD COLUMN IF NOT EXISTS location_id UUID REFERENCES public.locations(id) ON DELETE SET NULL;

-- Add some sample locations
INSERT INTO public.locations (name, address, city, country, budget)
VALUES
  ('Hub Innovation', '123 Avenue de la Technologie', 'Paris', 'France', 5000),
  ('Centre Culturel Africain', '45 Rue des Arts', 'Dakar', 'Sénégal', 3000),
  ('Espace Collaboratif Métropole', '78 Rue du Progrès', 'Lyon', 'France', 4500),
  ('Tech Campus', '88 Innovation Street', 'Nairobi', 'Kenya', 6000),
  ('Centre de Recherche Durable', '12 Eco Avenue', 'Abidjan', 'Côte d''Ivoire', 3500);

-- Create or replace function for updating timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add trigger for updating timestamp
CREATE TRIGGER update_locations_updated_at
BEFORE UPDATE ON public.locations
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column(); 