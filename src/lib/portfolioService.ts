import { supabase, isSupabaseConfigured } from './supabase';
import { PortfolioProfile } from './types';

/**
 * Service to sync portfolio data with Supabase PostgreSQL database
 */
export const portfolioService = {
  /**
   * Save or update an entire user portfolio in Supabase
   */
  async savePortfolio(profile: PortfolioProfile): Promise<{ success: boolean; error?: string }> {
    if (!isSupabaseConfigured()) {
      console.warn('Supabase credentials not configured in .env.local - skipping remote sync');
      return { success: false, error: 'Supabase credentials not configured' };
    }

    try {
      // 1. Upsert Profile table
      const { error: profileError } = await supabase
        .from('profiles')
        .upsert(
          {
            id: profile.userId,
            username: profile.username,
            email: profile.personal.email,
            full_name: profile.personal.fullName,
            headline: profile.personal.headline,
            bio: profile.personal.bio,
            location: profile.personal.location,
            avatar_url: profile.personal.avatarUrl,
            resume_url: profile.personal.resumeUrl,
            resume_file_name: profile.personal.resumeFileName,
            github: profile.personal.githubUrl,
            linkedin: profile.personal.linkedinUrl,
            website: profile.personal.portfolioUrl,
            template_id: profile.settings.templateId,
            theme_color: profile.settings.primaryColor,
            font_family: profile.settings.fontFamily,
            is_published: profile.isPublished ?? true,
            portfolio_json: profile, // Full JSON snapshot for rapid hydration
            updated_at: new Date().toISOString(),
          },
          { onConflict: 'id' }
        );

      if (profileError) throw profileError;

      // 2. Sync Education
      if (profile.education && profile.education.length > 0) {
        await supabase.from('education').delete().eq('profile_id', profile.userId);
        const eduRows = profile.education.map((edu) => ({
          id: edu.id,
          profile_id: profile.userId,
          institution: edu.institution,
          degree: edu.degree,
          field_of_study: edu.fieldOfStudy,
          start_year: edu.startYear,
          end_year: edu.endYear,
          gpa: edu.gpa || null,
          coursework: edu.coursework || null,
        }));
        await supabase.from('education').insert(eduRows);
      }

      // 3. Sync Experience
      if (profile.experience && profile.experience.length > 0) {
        await supabase.from('experience').delete().eq('profile_id', profile.userId);
        const expRows = profile.experience.map((exp) => ({
          id: exp.id,
          profile_id: profile.userId,
          role: exp.role,
          company: exp.company,
          location: exp.location || null,
          start_date: exp.startDate,
          end_date: exp.endDate,
          description: exp.description || [],
        }));
        await supabase.from('experience').insert(expRows);
      }

      // 4. Sync Projects
      if (profile.projects && profile.projects.length > 0) {
        await supabase.from('projects').delete().eq('profile_id', profile.userId);
        const projRows = profile.projects.map((proj) => ({
          id: proj.id,
          profile_id: profile.userId,
          title: proj.title,
          description: proj.description,
          technologies: proj.technologies || [],
          github_url: proj.githubUrl || null,
          live_url: proj.liveUrl || null,
          featured: proj.featured ?? false,
          category: proj.category || 'Web Development',
        }));
        await supabase.from('projects').insert(projRows);
      }

      // 5. Sync Skills
      if (profile.skills) {
        await supabase.from('skills').delete().eq('profile_id', profile.userId);
        await supabase.from('skills').insert({
          profile_id: profile.userId,
          languages: profile.skills.languages || [],
          frameworks: profile.skills.frameworks || [],
          tools: profile.skills.tools || [],
          other: profile.skills.softSkills || [],
        });
      }

      return { success: true };
    } catch (err: any) {
      console.error('Error saving portfolio to Supabase:', err);
      return { success: false, error: err.message || 'Unknown database error' };
    }
  },

  /**
   * Fetch public portfolio by username from Supabase
   */
  async getPortfolioByUsername(username: string): Promise<PortfolioProfile | null> {
    if (!isSupabaseConfigured()) {
      return null;
    }

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('username', username)
        .eq('is_published', true)
        .single();

      if (error || !data) return null;

      if (data.portfolio_json) {
        return data.portfolio_json as PortfolioProfile;
      }

      return null;
    } catch (err) {
      console.error('Error fetching portfolio from Supabase:', err);
      return null;
    }
  },
};
