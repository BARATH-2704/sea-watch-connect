-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Table: Profiles (extends auth.users)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('citizen', 'coastal_guard', 'admin')) DEFAULT 'citizen',
  trust_score INTEGER DEFAULT 50 CHECK (trust_score >= 0 AND trust_score <= 100),
  reports_count INTEGER DEFAULT 0,
  preferred_language TEXT DEFAULT 'en',
  theme TEXT DEFAULT 'light' CHECK (theme IN ('light', 'dark')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table: Hazards
CREATE TABLE public.hazards (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  hazard_type TEXT NOT NULL CHECK (hazard_type IN ('storm', 'oil-spill', 'marine-debris', 'harmful-algae', 'injured-animal', 'water-quality', 'other')),
  description TEXT,
  latitude DECIMAL(10, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL,
  location_name TEXT,
  user_id UUID REFERENCES public.profiles(id) NOT NULL,
  status TEXT DEFAULT 'reported' CHECK (status IN ('reported', 'verified', 'rejected', 'false-alarm')),
  confidence_score INTEGER DEFAULT 0 CHECK (confidence_score >= 0 AND confidence_score <= 100),
  media_url TEXT,
  source TEXT DEFAULT 'app' CHECK (source IN ('app', 'sms', 'social-media', 'radio')),
  source_details JSONB DEFAULT '{}'::JSONB,
  details JSONB DEFAULT '{}'::JSONB,
  original_language TEXT DEFAULT 'en',
  translated_description TEXT,
  urgency_level TEXT DEFAULT 'normal' CHECK (urgency_level IN ('low', 'normal', 'high', 'critical')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table: Radio Transmissions
CREATE TABLE public.radio_transmissions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  audio_url TEXT NOT NULL,
  original_language TEXT DEFAULT 'en',
  transcribed_text TEXT,
  translated_text TEXT,
  hazard_type TEXT CHECK (hazard_type IN ('storm', 'oil-spill', 'marine-debris', 'harmful-algae', 'injured-animal', 'water-quality', 'other')),
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  confidence REAL DEFAULT 0,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'approved', 'rejected')),
  processed_by UUID REFERENCES public.profiles(id),
  emergency_keywords TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW(),
  processed_at TIMESTAMPTZ
);

-- Table: Alert Subscriptions
CREATE TABLE public.alert_subscriptions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) NOT NULL,
  latitude DECIMAL(10, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL,
  location_name TEXT,
  radius_km INTEGER DEFAULT 10,
  hazard_types TEXT[] DEFAULT '{}',
  notification_methods JSONB DEFAULT '["push"]'::JSONB,
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hazards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.radio_transmissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.alert_subscriptions ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Admins can view all profiles" ON public.profiles FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Hazards policies
CREATE POLICY "Anyone can view hazards" ON public.hazards FOR SELECT USING (true);
CREATE POLICY "Users can create hazards" ON public.hazards FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own hazards" ON public.hazards FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Admins can manage all hazards" ON public.hazards FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Radio transmissions policies
CREATE POLICY "Coastal guards and admins can create radio transmissions" ON public.radio_transmissions FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('coastal_guard', 'admin'))
);
CREATE POLICY "Admins can manage radio transmissions" ON public.radio_transmissions FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Alert subscriptions policies
CREATE POLICY "Users can manage own alert subscriptions" ON public.alert_subscriptions FOR ALL USING (auth.uid() = user_id);

-- Create indexes for performance
CREATE INDEX hazards_location_idx ON public.hazards (latitude, longitude);
CREATE INDEX hazards_created_at_idx ON public.hazards (created_at DESC);
CREATE INDEX hazards_status_idx ON public.hazards (status);
CREATE INDEX hazards_urgency_idx ON public.hazards (urgency_level);
CREATE INDEX radio_transmissions_status_idx ON public.radio_transmissions (status);
CREATE INDEX profiles_role_idx ON public.profiles (role);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_hazards_updated_at BEFORE UPDATE ON public.hazards FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Function to create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, username, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', NEW.email),
    COALESCE(NEW.raw_user_meta_data->>'role', 'citizen')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for automatic profile creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();