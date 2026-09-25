-- ==============================================================================
-- PORTFOLIFY - SUPABASE POSTGRESQL DATABASE SCHEMA & POLICIES
-- Copy and run this entire script inside the Supabase SQL Editor.
-- ==============================================================================

-- 1. Enable Required Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==============================================================================
-- 2. TABLE DEFINITIONS
-- ==============================================================================

-- 2.1 PROFILES TABLE
CREATE TABLE IF NOT EXISTS public.profiles (
    id TEXT PRIMARY KEY,                          -- User ID or Auth UID
    username TEXT UNIQUE NOT NULL,                -- Public portfolio slug (e.g. 'adhithya')
    email TEXT,
    full_name TEXT NOT NULL,
    headline TEXT,
    bio TEXT,
    location TEXT,
    avatar_url TEXT,
    resume_url TEXT,
    resume_file_name TEXT,
    github TEXT,
    linkedin TEXT,
    twitter TEXT,
    website TEXT,
    template_id TEXT NOT NULL DEFAULT 'modern-glass',
    theme_color TEXT NOT NULL DEFAULT 'blue',
    font_family TEXT NOT NULL DEFAULT 'sans',
    is_published BOOLEAN NOT NULL DEFAULT true,
    portfolio_json JSONB,                         -- Full snapshot for fast hydration & versioning
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Index for fast lookup by username and published status
CREATE INDEX IF NOT EXISTS idx_profiles_username ON public.profiles(username);
CREATE INDEX IF NOT EXISTS idx_profiles_is_published ON public.profiles(is_published);

-- 2.2 EDUCATION TABLE
CREATE TABLE IF NOT EXISTS public.education (
    id TEXT PRIMARY KEY,
    profile_id TEXT NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    institution TEXT NOT NULL,
    degree TEXT NOT NULL,
    field_of_study TEXT NOT NULL,
    start_year TEXT,
    end_year TEXT,
    gpa TEXT,
    coursework TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_education_profile_id ON public.education(profile_id);

-- 2.3 EXPERIENCE TABLE
CREATE TABLE IF NOT EXISTS public.experience (
    id TEXT PRIMARY KEY,
    profile_id TEXT NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    role TEXT NOT NULL,
    company TEXT NOT NULL,
    location TEXT,
    start_date TEXT,
    end_date TEXT,
    description TEXT[],
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_experience_profile_id ON public.experience(profile_id);

-- 2.4 PROJECTS TABLE
CREATE TABLE IF NOT EXISTS public.projects (
    id TEXT PRIMARY KEY,
    profile_id TEXT NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    technologies TEXT[],
    github_url TEXT,
    live_url TEXT,
    featured BOOLEAN NOT NULL DEFAULT false,
    category TEXT NOT NULL DEFAULT 'Web Development',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_projects_profile_id ON public.projects(profile_id);

-- 2.5 SKILLS TABLE
CREATE TABLE IF NOT EXISTS public.skills (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id TEXT NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    languages TEXT[] DEFAULT '{}',
    frameworks TEXT[] DEFAULT '{}',
    tools TEXT[] DEFAULT '{}',
    other TEXT[] DEFAULT '{}',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_skills_profile_id ON public.skills(profile_id);

-- 2.6 ANALYTICS & PAGE VIEWS TABLE
CREATE TABLE IF NOT EXISTS public.portfolio_analytics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id TEXT NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    visitor_ip_hash TEXT,
    referrer TEXT,
    user_agent TEXT,
    visited_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_analytics_profile_id ON public.portfolio_analytics(profile_id);

-- ==============================================================================
-- 3. AUTOMATIC UPDATED_AT TRIGGER
-- ==============================================================================

CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_profiles_updated_at ON public.profiles;
CREATE TRIGGER trigger_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();

-- ==============================================================================
-- 4. ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.education ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_analytics ENABLE ROW LEVEL SECURITY;

-- 4.1 Profiles Policies:
-- Anyone can view published profiles
DROP POLICY IF EXISTS "Public can view published profiles" ON public.profiles;
CREATE POLICY "Public can view published profiles"
ON public.profiles FOR SELECT
USING (is_published = true OR auth.uid()::text = id);

-- Anyone or authenticated users can insert/update profile
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
CREATE POLICY "Users can insert their own profile"
ON public.profiles FOR INSERT
WITH CHECK (true);

DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
CREATE POLICY "Users can update their own profile"
ON public.profiles FOR UPDATE
USING (true)
WITH CHECK (true);

-- 4.2 Child Tables (Education, Experience, Projects, Skills) Policies:
-- Public can read child tables of published profiles
DROP POLICY IF EXISTS "Public can view education of published profiles" ON public.education;
CREATE POLICY "Public can view education of published profiles"
ON public.education FOR SELECT
USING (EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = education.profile_id AND (profiles.is_published = true OR auth.uid()::text = profiles.id)));

DROP POLICY IF EXISTS "Manage education" ON public.education;
CREATE POLICY "Manage education"
ON public.education FOR ALL
USING (true)
WITH CHECK (true);

DROP POLICY IF EXISTS "Public can view experience of published profiles" ON public.experience;
CREATE POLICY "Public can view experience of published profiles"
ON public.experience FOR SELECT
USING (EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = experience.profile_id AND (profiles.is_published = true OR auth.uid()::text = profiles.id)));

DROP POLICY IF EXISTS "Manage experience" ON public.experience;
CREATE POLICY "Manage experience"
ON public.experience FOR ALL
USING (true)
WITH CHECK (true);

DROP POLICY IF EXISTS "Public can view projects of published profiles" ON public.projects;
CREATE POLICY "Public can view projects of published profiles"
ON public.projects FOR SELECT
USING (EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = projects.profile_id AND (profiles.is_published = true OR auth.uid()::text = profiles.id)));

DROP POLICY IF EXISTS "Manage projects" ON public.projects;
CREATE POLICY "Manage projects"
ON public.projects FOR ALL
USING (true)
WITH CHECK (true);

DROP POLICY IF EXISTS "Public can view skills of published profiles" ON public.skills;
CREATE POLICY "Public can view skills of published profiles"
ON public.skills FOR SELECT
USING (EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = skills.profile_id AND (profiles.is_published = true OR auth.uid()::text = profiles.id)));

DROP POLICY IF EXISTS "Manage skills" ON public.skills;
CREATE POLICY "Manage skills"
ON public.skills FOR ALL
USING (true)
WITH CHECK (true);

DROP POLICY IF EXISTS "Public can insert analytics" ON public.portfolio_analytics;
CREATE POLICY "Public can insert analytics"
ON public.portfolio_analytics FOR INSERT
WITH CHECK (true);

DROP POLICY IF EXISTS "Users can view their analytics" ON public.portfolio_analytics;
CREATE POLICY "Users can view their analytics"
ON public.portfolio_analytics FOR SELECT
USING (true);

-- ==============================================================================
-- 5. STORAGE BUCKETS FOR AVATARS & RESUMES
-- ==============================================================================

-- Create public storage buckets for file uploads
INSERT INTO storage.buckets (id, name, public)
VALUES 
    ('avatars', 'avatars', true),
    ('resumes', 'resumes', true)
ON CONFLICT (id) DO NOTHING;

-- Storage RLS: Anyone can view uploaded assets
DROP POLICY IF EXISTS "Public read storage avatars" ON storage.objects;
CREATE POLICY "Public read storage avatars"
ON storage.objects FOR SELECT
USING (bucket_id = 'avatars');

DROP POLICY IF EXISTS "Public read storage resumes" ON storage.objects;
CREATE POLICY "Public read storage resumes"
ON storage.objects FOR SELECT
USING (bucket_id = 'resumes');

-- Storage RLS: Anyone can upload assets
DROP POLICY IF EXISTS "Allow uploads to avatars" ON storage.objects;
CREATE POLICY "Allow uploads to avatars"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'avatars');

DROP POLICY IF EXISTS "Allow uploads to resumes" ON storage.objects;
CREATE POLICY "Allow uploads to resumes"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'resumes');

-- ==============================================================================
-- 6. SAMPLE SEED DATA (OPTIONAL TEST RECORD)
-- ==============================================================================

INSERT INTO public.profiles (
    id,
    username,
    email,
    full_name,
    headline,
    bio,
    location,
    avatar_url,
    template_id,
    is_published
) VALUES (
    'user_demo_1',
    'adhithya',
    'adhithya@example.com',
    'Adhithya',
    'Software Engineer & Full Stack Developer',
    'Passionate engineer specialized in scalable web applications, modern frontend architecture, and cloud systems.',
    'San Francisco, CA',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    'modern-glass',
    true
) ON CONFLICT (id) DO NOTHING;

-- Done! Your Supabase database is ready to power Portfolify.
