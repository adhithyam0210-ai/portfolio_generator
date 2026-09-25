'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, PortfolioProfile, TemplateId } from '@/lib/types';
import { INITIAL_USER, INITIAL_PROFILE } from '@/lib/mockData';
import { portfolioService } from '@/lib/portfolioService';

interface AuthContextType {
  user: User | null;
  profile: PortfolioProfile | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, username: string, password: string) => Promise<boolean>;
  logout: () => void;
  updatePersonal: (personal: PortfolioProfile['personal']) => void;
  updateEducation: (education: PortfolioProfile['education']) => void;
  updateExperience: (experience: PortfolioProfile['experience']) => void;
  updateProjects: (projects: PortfolioProfile['projects']) => void;
  updateSkills: (skills: PortfolioProfile['skills']) => void;
  setTemplateId: (templateId: TemplateId) => void;
  togglePublish: () => void;
  incrementProfileViews: () => void;
  incrementResumeDownloads: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<PortfolioProfile | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('portfolify_user');
      const savedProfile = localStorage.getItem('portfolify_profile');

      if (savedUser && savedProfile) {
        setUser(JSON.parse(savedUser));
        setProfile(JSON.parse(savedProfile));
      } else {
        setUser(INITIAL_USER);
        setProfile(INITIAL_PROFILE);
      }
    } catch (err) {
      console.error('Failed to load local storage data:', err);
      setUser(INITIAL_USER);
      setProfile(INITIAL_PROFILE);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const saveState = (updatedUser: User | null, updatedProfile: PortfolioProfile | null) => {
    setUser(updatedUser);
    setProfile(updatedProfile);
    if (updatedUser) {
      localStorage.setItem('portfolify_user', JSON.stringify(updatedUser));
    } else {
      localStorage.removeItem('portfolify_user');
    }
    if (updatedProfile) {
      localStorage.setItem('portfolify_profile', JSON.stringify(updatedProfile));
      // Background sync to Supabase PostgreSQL database
      portfolioService.savePortfolio(updatedProfile).catch((err) => {
        console.warn('Supabase sync skipped/deferred:', err);
      });
    } else {
      localStorage.removeItem('portfolify_profile');
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    await new Promise((res) => setTimeout(res, 300));
    const newUser: User = {
      id: 'usr_' + Date.now(),
      name: email.split('@')[0].replace('.', ' '),
      email,
      username: email.split('@')[0].toLowerCase().replace(/[^a-z0-0]/g, ''),
      createdAt: new Date().toISOString(),
    };
    
    const newProfile: PortfolioProfile = {
      ...INITIAL_PROFILE,
      userId: newUser.id,
      username: newUser.username,
      personal: {
        ...INITIAL_PROFILE.personal,
        fullName: newUser.name,
        email: newUser.email,
        portfolioUrl: `https://portfolify.app/u/${newUser.username}`,
      },
    };

    saveState(newUser, newProfile);
    return true;
  };

  const signup = async (name: string, email: string, username: string, password: string): Promise<boolean> => {
    await new Promise((res) => setTimeout(res, 300));
    const cleanUsername = username.toLowerCase().trim().replace(/\s+/g, '-');
    const newUser: User = {
      id: 'usr_' + Date.now(),
      name,
      email,
      username: cleanUsername,
      createdAt: new Date().toISOString(),
    };

    const newProfile: PortfolioProfile = {
      ...INITIAL_PROFILE,
      userId: newUser.id,
      username: cleanUsername,
      personal: {
        ...INITIAL_PROFILE.personal,
        fullName: name,
        email,
        portfolioUrl: `https://portfolify.app/u/${cleanUsername}`,
      },
    };

    saveState(newUser, newProfile);
    return true;
  };

  const logout = () => {
    saveState(null, null);
  };

  const updatePersonal = (personal: PortfolioProfile['personal']) => {
    if (!profile) return;
    const updated = { ...profile, personal };
    saveState(user, updated);
  };

  const updateEducation = (education: PortfolioProfile['education']) => {
    if (!profile) return;
    const updated = { ...profile, education };
    saveState(user, updated);
  };

  const updateExperience = (experience: PortfolioProfile['experience']) => {
    if (!profile) return;
    const updated = { ...profile, experience };
    saveState(user, updated);
  };

  const updateProjects = (projects: PortfolioProfile['projects']) => {
    if (!profile) return;
    const updated = { ...profile, projects };
    saveState(user, updated);
  };

  const updateSkills = (skills: PortfolioProfile['skills']) => {
    if (!profile) return;
    const updated = { ...profile, skills };
    saveState(user, updated);
  };

  const setTemplateId = (templateId: TemplateId) => {
    if (!profile) return;
    const updated = {
      ...profile,
      settings: { ...profile.settings, templateId },
    };
    saveState(user, updated);
  };

  const togglePublish = () => {
    if (!profile) return;
    const current = profile.isPublished !== false;
    const updated = {
      ...profile,
      isPublished: !current,
    };
    saveState(user, updated);
  };

  const incrementProfileViews = () => {
    if (!profile) return;
    const updated = {
      ...profile,
      analytics: {
        ...profile.analytics,
        viewsCount: profile.analytics.viewsCount + 1,
        lastViewedAt: new Date().toLocaleTimeString(),
      },
    };
    saveState(user, updated);
  };

  const incrementResumeDownloads = () => {
    if (!profile) return;
    const updated = {
      ...profile,
      analytics: {
        ...profile.analytics,
        resumeDownloads: profile.analytics.resumeDownloads + 1,
      },
    };
    saveState(user, updated);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
        updatePersonal,
        updateEducation,
        updateExperience,
        updateProjects,
        updateSkills,
        setTemplateId,
        togglePublish,
        incrementProfileViews,
        incrementResumeDownloads,
      }}
    >
      {isLoaded ? children : null}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
