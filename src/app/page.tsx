'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import DashboardPage from '@/app/dashboard/page';
import { 
  Sparkles, 
  Wand2, 
  FileText, 
  CheckCircle2, 
  BarChart3, 
  ArrowRight, 
  Star,
  ShieldCheck,
  Zap,
  Layout,
  Code2
} from 'lucide-react';

export default function LandingPage() {
  const { isAuthenticated } = useAuth();

  // Logged-in users immediately view their Dashboard page as default (no landing page hero/content shown)
  if (isAuthenticated) {
    return <DashboardPage />;
  }

  return (
    <div className="bg-[#f8fafc] text-slate-800 overflow-hidden font-sans">
      
      {/* HERO SECTION (Light Blue & White Snowly-Inspired Aesthetic) */}
      <section className="relative pt-16 pb-20 px-4 sm:px-8 lg:px-12 w-full max-w-[1700px] mx-auto text-center space-y-8">
        
        {/* Soft ice-blue gradient blob */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-gradient-to-tr from-sky-200/50 via-blue-100/50 to-indigo-100/50 rounded-full blur-[120px] pointer-events-none -z-10"></div>

        {/* Rating Stars & Trust Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-blue-200/80 text-blue-700 text-xs font-bold shadow-md shadow-blue-500/5">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <span className="text-slate-700 font-extrabold">5.0 (500+ Student Reviews)</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-slate-900 tracking-tight leading-[1.12] max-w-5xl mx-auto">
          Fast, Reliable & Professional <span className="text-gradient-blue">Student Portfolios</span> & ATS Resumes
        </h1>

        {/* Subtitle */}
        <p className="text-slate-600 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
          Create unique, recruiter-ready portfolios and auto-generated ATS-compliant resumes in under 5 minutes without writing code. Choose from 6+ stunning designer templates.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          {isAuthenticated ? (
            <Link
              href="/dashboard"
              className="w-full sm:w-auto px-8 py-4 rounded-full text-base font-extrabold text-white bg-slate-900 hover:bg-blue-600 shadow-xl transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
            >
              Go to Your Dashboard <ArrowRight className="w-5 h-5" />
            </Link>
          ) : (
            <Link
              href="/signup"
              className="w-full sm:w-auto px-8 py-4 rounded-full text-base font-extrabold text-white bg-slate-900 hover:bg-blue-600 shadow-xl transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
            >
              Get Started Free <ArrowRight className="w-5 h-5" />
            </Link>
          )}

          <Link
            href="/templates"
            className="w-full sm:w-auto px-8 py-4 rounded-full text-base font-bold text-slate-700 bg-white hover:bg-blue-50 border border-blue-200 transition-all flex items-center justify-center gap-2 shadow-sm"
          >
            Explore 6+ Design Templates
          </Link>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-xs text-slate-600 font-semibold">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-blue-600" /> 100% Free for College Students
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-blue-600" /> 98% ATS Resume Pass Rate
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-blue-600" /> Instant Shareable URL (/u/username)
          </span>
        </div>

      </section>

      {/* IMPACT IN NUMBERS STATS BANNER (Snowly Style) */}
      <section className="border-y border-blue-100 bg-white py-10 shadow-sm">
        <div className="w-full max-w-[1700px] mx-auto px-4 sm:px-8 lg:px-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl sm:text-4xl font-black text-slate-900">500+</div>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-1">Cleared Every Semester</p>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-black text-blue-600">6+ Unique</div>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-1">Design Templates</p>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-black text-slate-900">99%</div>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-1">Student Satisfaction</p>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-black text-blue-600">100% Free</div>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-1">Zero Hidden Fees</p>
          </div>
        </div>
      </section>

      {/* TEMPLATE GALLERY PREVIEW SHOWCASE */}
      <section className="py-20 px-4 sm:px-8 lg:px-12 w-full max-w-[1700px] mx-auto space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-extrabold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            6+ DESIGNER TEMPLATES
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900">Choose Your Ideal Portfolio Layout</h2>
          <p className="text-slate-600 text-sm">Switch templates anytime with one click. Your content automatically populates in real-time.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Template 1: Snowly Frost */}
          <div className="bg-white p-6 rounded-3xl border border-blue-100 shadow-lg hover:shadow-xl transition-all space-y-4 flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="h-44 rounded-2xl bg-gradient-to-tr from-sky-100 to-blue-50 p-4 border border-blue-200/60 flex flex-col justify-between overflow-hidden">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-extrabold bg-blue-600 text-white px-2.5 py-0.5 rounded-full">LIGHT ICE-BLUE</span>
                  <span className="text-[10px] text-slate-500 font-mono">Snowly Frost</span>
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-black text-slate-900">Fast, Reliable Software Solutions</span>
                  <p className="text-[10px] text-slate-600">5.0 Star Rated Student Engineer</p>
                </div>
              </div>
              <h3 className="text-lg font-black text-slate-900 group-hover:text-blue-600 transition-colors">1. Snowly Frost</h3>
              <p className="text-xs text-slate-600">Clean ice-blue & white theme, circular avatar badges, stats counter bar, and testimonial cards.</p>
            </div>
          </div>

          {/* Template 2: Jone Lee Modern */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-lg hover:shadow-xl transition-all space-y-4 flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="h-44 rounded-2xl bg-slate-50 p-4 border border-slate-200 flex flex-col justify-between overflow-hidden">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-extrabold bg-rose-500 text-white px-2.5 py-0.5 rounded-full">CORAL ACCENT</span>
                  <span className="text-[10px] text-slate-500 font-mono">Jone Lee</span>
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-black text-slate-900">Hi, I'm Jone Lee a Professional Coder</span>
                  <p className="text-[10px] text-rose-500 font-bold">What I Do — 6 Services Cards</p>
                </div>
              </div>
              <h3 className="text-lg font-black text-slate-900 group-hover:text-rose-500 transition-colors">2. Jone Lee Modern</h3>
              <p className="text-xs text-slate-600">Crisp white background with vibrant coral accents, floating headshot badge, and services grid.</p>
            </div>
          </div>

          {/* Template 3: Daniel Violet */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-lg hover:shadow-xl transition-all space-y-4 flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="h-44 rounded-2xl bg-[#0b0a15] p-4 border border-purple-900/40 flex flex-col justify-between overflow-hidden">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-extrabold bg-purple-600 text-white px-2.5 py-0.5 rounded-full">CYBER MIDNIGHT</span>
                  <span className="text-[10px] text-purple-300 font-mono">Daniel Morgan</span>
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-black text-white">Front-End Developer & UI UX</span>
                  <p className="text-[10px] text-purple-400 font-bold">Category Tabs & Accordion Services</p>
                </div>
              </div>
              <h3 className="text-lg font-black text-slate-900 group-hover:text-purple-600 transition-colors">3. Daniel Violet</h3>
              <p className="text-xs text-slate-600">Deep midnight dark theme with violet glow, accordion services list, and tabbed portfolio filter.</p>
            </div>
          </div>

          {/* Template 4: Jessica Crimson */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-lg hover:shadow-xl transition-all space-y-4 flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="h-44 rounded-2xl bg-[#0a0a0a] p-4 border border-rose-950/40 flex flex-col justify-between overflow-hidden">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-extrabold bg-rose-600 text-white px-2.5 py-0.5 rounded-full">STUDIO BLACK</span>
                  <span className="text-[10px] text-rose-400 font-mono">Jessica</span>
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-black text-white">Graphic Designer & Developer</span>
                  <p className="text-[10px] text-rose-500 font-bold">Crimson Red Spotlight Card</p>
                </div>
              </div>
              <h3 className="text-lg font-black text-slate-900 group-hover:text-rose-600 transition-colors">4. Jessica Crimson</h3>
              <p className="text-xs text-slate-600">Studio black theme with bold crimson red primary accents, highlighted card spotlight, and stats grid.</p>
            </div>
          </div>

          {/* Template 5: Modern Tech */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-lg hover:shadow-xl transition-all space-y-4 flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="h-44 rounded-2xl bg-slate-950 p-4 border border-slate-800 flex flex-col justify-between overflow-hidden">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-extrabold bg-blue-600 text-white px-2.5 py-0.5 rounded-full">DARK SLEEK</span>
                  <span className="text-[10px] text-blue-400 font-mono">Developer</span>
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-black text-white">Software Engineer Config</span>
                  <p className="text-[10px] text-blue-400 font-bold">Terminal Snippets & Badges</p>
                </div>
              </div>
              <h3 className="text-lg font-black text-slate-900 group-hover:text-blue-600 transition-colors">5. Modern Tech</h3>
              <p className="text-xs text-slate-600">Dark sleek developer theme with code snippets, glowing badges, and project cards.</p>
            </div>
          </div>

          {/* Template 6: Minimalist Slate */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-lg hover:shadow-xl transition-all space-y-4 flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="h-44 rounded-2xl bg-slate-900 p-4 border border-slate-800 flex flex-col justify-between overflow-hidden">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-extrabold bg-slate-700 text-white px-2.5 py-0.5 rounded-full">EDITORIAL</span>
                  <span className="text-[10px] text-slate-400 font-mono">Minimalist</span>
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-black text-white">Editorial Typography</span>
                  <p className="text-[10px] text-slate-400 font-bold">Monochrome Elegance</p>
                </div>
              </div>
              <h3 className="text-lg font-black text-slate-900 group-hover:text-slate-600 transition-colors">6. Minimalist Slate</h3>
              <p className="text-xs text-slate-600">Clean, editorial typography-focused layout with refined border dividers.</p>
            </div>
          </div>

        </div>
      </section>

      {/* CORE FEATURES GRID */}
      <section className="py-20 bg-white border-t border-blue-100 px-4 sm:px-8 lg:px-12 w-full max-w-[1700px] mx-auto space-y-16">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-extrabold uppercase tracking-widest text-blue-600">Platform Capabilities</span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900">Everything You Need To Get Hired</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="p-8 rounded-3xl bg-blue-50/50 border border-blue-100 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-bold shadow-md shadow-blue-500/20">
              <Wand2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-extrabold text-slate-900">6-Step Portfolio Builder</h3>
            <p className="text-slate-600 text-xs leading-relaxed">
              Captures your Bio, Education, Work Experience, GitHub Repos, Live Demo links, and Skills with real-time preview.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-blue-50/50 border border-blue-100 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-bold shadow-md shadow-blue-500/20">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-extrabold text-slate-900">ATS Resume Auto-Generator</h3>
            <p className="text-slate-600 text-xs leading-relaxed">
              Auto-compiles profile data into standardized single-column ATS resume layout ready for single-click PDF export.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-blue-50/50 border border-blue-100 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-bold shadow-md shadow-blue-500/20">
              <BarChart3 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-extrabold text-slate-900">Analytics & Share Link</h3>
            <p className="text-slate-600 text-xs leading-relaxed">
              Get your custom shareable link (<code className="text-blue-700 font-bold bg-white px-1.5 py-0.5 rounded border border-blue-200">/u/username</code>) and track recruiter profile views.
            </p>
          </div>

        </div>
      </section>

      {/* FINAL CALL TO ACTION */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center space-y-8">
        <div className="bg-gradient-to-tr from-blue-600 to-indigo-700 text-white p-12 sm:p-16 rounded-3xl shadow-2xl space-y-6">
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight">
            Ready to Stand Out to Tech Recruiters?
          </h2>

          <p className="text-blue-100 text-sm sm:text-base max-w-2xl mx-auto">
            Build a high-impact portfolio and ATS resume in under 5 minutes today.
          </p>

          <div className="pt-2">
            <Link
              href="/signup"
              className="inline-block px-10 py-4 rounded-full text-base font-extrabold text-blue-900 bg-white hover:bg-blue-50 shadow-xl transition-all hover:scale-[1.03]"
            >
              Get Started Free Now
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
