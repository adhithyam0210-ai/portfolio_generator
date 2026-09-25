'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { ShareModal } from '@/components/ShareModal';
import { 
  Sparkles, 
  ExternalLink, 
  Copy, 
  Check, 
  Eye, 
  Download, 
  Wand2, 
  Palette, 
  FileText, 
  GraduationCap, 
  Briefcase, 
  Code2, 
  User, 
  ArrowRight,
  TrendingUp,
  Globe,
  CloudOff,
  Cloud,
  Share2,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export default function DashboardPage() {
  const { user, profile, isAuthenticated, setTemplateId, togglePublish } = useAuth();
  const [copied, setCopied] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  if (!isAuthenticated || !profile) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center space-y-4 bg-[#f8fafc]">
        <h2 className="text-2xl font-bold text-slate-900">Please log in to access your dashboard</h2>
        <div className="flex gap-4 pt-2">
          <Link href="/login" className="px-6 py-2.5 rounded-full bg-blue-600 text-white font-extrabold text-xs shadow-md">Log In</Link>
          <Link href="/signup" className="px-6 py-2.5 rounded-full bg-slate-900 text-white font-extrabold text-xs shadow-md">Sign Up</Link>
        </div>
      </div>
    );
  }

  const { personal, education, experience, projects, skills, settings, analytics } = profile;
  const isPublished = profile.isPublished !== false;
  const publicUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}/u/${profile.username}` 
    : `https://portfolify.app/u/${profile.username}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(publicUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const checklistItems = [
    {
      label: 'Personal Profile (Name, Title, Bio)',
      completed: Boolean(personal.fullName && (personal.targetRole || personal.headline) && personal.bio),
    },
    {
      label: 'Projects (at least 1 project)',
      completed: projects.length >= 1,
    },
    {
      label: 'Skills & Proficiencies (at least 3 skills)',
      completed: (skills.languages.length + skills.frameworks.length + skills.tools.length) >= 3,
    },
    {
      label: 'Work Experience (at least 1 role)',
      completed: experience.length >= 1,
    },
    {
      label: 'Education & Degree',
      completed: education.length >= 1,
    },
    {
      label: 'Uploaded Resume Document',
      completed: Boolean(personal.resumeUrl),
    },
    {
      label: 'Social Links (LinkedIn / GitHub)',
      completed: Boolean(personal.linkedinUrl || personal.githubUrl),
    },
  ];

  const completedCount = checklistItems.filter(i => i.completed).length;
  const completionScore = Math.round((completedCount / checklistItems.length) * 100);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 py-10 px-4 sm:px-8 lg:px-12 font-sans space-y-8 w-full max-w-[1700px] mx-auto">
      
      {/* HEADER BANNER */}
      <div className="bg-white p-8 rounded-3xl border border-blue-100 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl relative overflow-hidden">
        <div className="space-y-2">
          <span className="px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold inline-block">
            Student Dashboard
          </span>

          <h1 className="text-3xl sm:text-4xl font-black text-slate-900">
            Welcome back, {personal.fullName}!
          </h1>

          <p className="text-slate-600 text-xs sm:text-sm">
            {personal.headline}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/builder"
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-slate-900 hover:bg-blue-600 text-white font-extrabold text-xs shadow-lg transition-all hover:scale-[1.02]"
          >
            <Wand2 className="w-4 h-4" />
            Launch Builder Wizard
          </Link>

          <Link
            href="/resume"
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 font-extrabold text-xs transition-all shadow-sm"
          >
            <FileText className="w-4 h-4" />
            Export ATS Resume
          </Link>
        </div>
      </div>

      {/* IMAGE 5: SIDE-BY-SIDE PUBLIC PORTFOLIO LINK & PROFILE COMPLETION SCORE CARDS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* CARD 1: YOUR PUBLIC PORTFOLIO LINK */}
        <div className="lg:col-span-6 bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-5">
          <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                YOUR PUBLIC PORTFOLIO LINK
              </span>
              <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-extrabold uppercase tracking-wide ${
                isPublished 
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                  : 'bg-amber-50 text-amber-700 border border-amber-200'
              }`}>
                {isPublished ? 'PUBLISHED' : 'UNPUBLISHED'}
              </span>
            </div>

            {/* URL Input Box */}
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-2xl px-3.5 py-2.5">
              <Globe className="w-4 h-4 text-emerald-600 shrink-0" />
              <input
                type="text"
                readOnly
                value={publicUrl}
                className="bg-transparent text-xs font-mono text-slate-700 w-full focus:outline-none select-all truncate"
              />
              <button
                onClick={copyToClipboard}
                title="Copy Link"
                className="p-1 rounded-lg hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Notification Banner */}
            {isPublished ? (
              <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-emerald-50/70 border border-emerald-200/80 text-emerald-800 text-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Your portfolio is public and accessible worldwide. Share your link below!</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-amber-50/70 border border-amber-200/80 text-amber-800 text-xs">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Your portfolio is unpublished and hidden from public visitors.</span>
              </div>
            )}
          </div>

          {/* Action Buttons Row */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
            <button
              onClick={togglePublish}
              className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 border ${
                isPublished
                  ? 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-600 shadow-sm'
              }`}
            >
              {isPublished ? (
                <>
                  <CloudOff className="w-4 h-4 text-slate-500" />
                  <span>Unpublish</span>
                </>
              ) : (
                <>
                  <Cloud className="w-4 h-4 text-white" />
                  <span>Publish Now</span>
                </>
              )}
            </button>

            <button
              onClick={() => setIsShareModalOpen(true)}
              className="flex-1 py-2.5 px-4 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold transition-all flex items-center justify-center gap-1.5"
            >
              <Share2 className="w-4 h-4 text-slate-600" />
              <span>Share</span>
            </button>

            <Link
              href={`/u/${profile.username}`}
              target="_blank"
              title="Preview Portfolio"
              className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold transition-all flex items-center justify-center"
            >
              <Eye className="w-4 h-4" />
            </Link>

            <Link
              href={`/u/${profile.username}`}
              target="_blank"
              title="Open Link"
              className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold transition-all flex items-center justify-center"
            >
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* CARD 2: PROFILE COMPLETION SCORE */}
        <div className="lg:col-span-6 bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-sm space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            {/* Header & Percentage */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                PROFILE COMPLETION SCORE
              </span>
              <span className="text-2xl font-black text-emerald-600 font-mono">
                {completionScore}%
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-emerald-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${completionScore}%` }}
              />
            </div>

            {/* Checklist items */}
            <div className="space-y-2.5 pt-1 text-xs font-medium text-slate-700">
              {checklistItems.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between py-0.5">
                  <div className="flex items-center gap-2">
                    {item.completed ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border-2 border-slate-300 shrink-0" />
                    )}
                    <span className={item.completed ? 'text-slate-800' : 'text-slate-500'}>
                      {item.label}
                    </span>
                  </div>
                  
                  <span className={`text-[11px] font-bold ${item.completed ? 'text-emerald-600' : 'text-slate-400'}`}>
                    {item.completed ? 'Done' : 'Pending'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* ANALYTICS COUNTERS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-md space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold">
            <span>Profile Views</span>
            <Eye className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-3xl font-black text-slate-900">{analytics.viewsCount}</div>
          <p className="text-[11px] text-blue-600 font-bold flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +24% traffic this week
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-md space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold">
            <span>Resume PDF Downloads</span>
            <Download className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-3xl font-black text-slate-900">{analytics.resumeDownloads}</div>
          <p className="text-[11px] text-slate-500 font-semibold">Direct ATS exports by recruiters</p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-md space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold">
            <span>Active Template</span>
            <Palette className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-lg font-extrabold text-slate-900 capitalize">{settings.templateId.replace('-', ' ')}</div>
          <Link href="/templates" className="text-[11px] text-blue-600 font-bold hover:underline block">
            Change design template →
          </Link>
        </div>
      </div>



      {/* Share Modal Dialog */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        url={`/u/${profile.username}`}
        title={`${personal.fullName}'s Portfolio`}
      />

    </div>
  );
}
