'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { TemplateRenderer } from '@/components/templates/TemplateRenderer';
import { INITIAL_PROFILE } from '@/lib/mockData';
import { portfolioService } from '@/lib/portfolioService';
import { PortfolioProfile } from '@/lib/types';
import { CloudOff, Loader2 } from 'lucide-react';

export default function PublicPortfolioPage({ params }: { params: { username: string } }) {
  const { profile, incrementProfileViews } = useAuth();
  const [remoteProfile, setRemoteProfile] = useState<PortfolioProfile | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Increment view counter when recruiter views public portfolio
    incrementProfileViews();

    const fetchRemote = async () => {
      if (profile && profile.username.toLowerCase() === params.username.toLowerCase()) {
        return;
      }
      setLoading(true);
      const data = await portfolioService.getPortfolioByUsername(params.username.toLowerCase());
      if (data) {
        setRemoteProfile(data);
      }
      setLoading(false);
    };

    fetchRemote();
  }, [params.username, profile]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  // Use active profile if matching username, else remote Supabase profile, else fallback initial profile
  const displayProfile =
    profile && profile.username.toLowerCase() === params.username.toLowerCase()
      ? profile
      : remoteProfile || { ...INITIAL_PROFILE, username: params.username };

  if (displayProfile.isPublished === false) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-slate-50 text-center space-y-4 font-sans">
        <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 shadow-sm">
          <CloudOff className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-black text-slate-900">This Portfolio is Currently Unpublished</h1>
        <p className="text-sm text-slate-600 max-w-md">
          The owner of this portfolio (@{params.username}) has temporarily set it to unpublished mode.
        </p>
        <Link href="/" className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-md transition-all">
          Return to Homepage
        </Link>
      </div>
    );
  }

  return <TemplateRenderer profile={displayProfile} isPublicView={true} />;
}
