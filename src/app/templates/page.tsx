'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { TemplateRenderer } from '@/components/templates/TemplateRenderer';
import { TemplateId } from '@/lib/types';
import { 
  Palette, 
  Check, 
  Sparkles, 
  ArrowRight, 
  Eye, 
  Monitor, 
  Tablet, 
  Smartphone, 
  Moon, 
  Sun, 
  Lock, 
  Share2,
  CheckCircle2
} from 'lucide-react';
import Link from 'next/link';

export default function TemplatesPage() {
  const { profile, setTemplateId } = useAuth();
  const [viewport, setViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [previewDark, setPreviewDark] = useState(false);
  const [appliedNotification, setAppliedNotification] = useState<string | null>(null);

  if (!profile) return null;

  const currentTemplate = profile.settings?.templateId || 'modern-glass';

  const templatesList = [
    // Modern Glass - Featured
    {
      id: 'modern-glass',
      name: 'Modern Glass',
      tag: 'FEATURED • FROSTED GLASS & EMERALD',
      pillLabel: 'Modern Glass',
      pillBadge: 'Featured',
      description: 'Ultra-modern frosted glass aesthetic with subtle ambient gradient, clean typography, responsive device preview, and direct CV download.',
      accentColor: 'from-emerald-500 to-teal-600',
    },
    // 8 Role-Specific Technical Student Templates
    {
      id: 'role-uiux',
      name: 'UI/UX Designer (Bento Grid)',
      tag: 'MINIMALIST • CORAL ACCENTS (#FF6B6B)',
      pillLabel: 'Bento Grid',
      pillBadge: 'Popular',
      description: 'Clean, modern, minimalist layout. Large typography intro, case-study thumbnail cards, interactive design grid, and user-flow styling.',
      accentColor: 'from-[#FF6B6B] to-rose-600',
    },
    {
      id: 'role-fullstack',
      name: 'Full Stack Developer',
      tag: 'TERMINAL DARK • ELECTRIC BLUE (#3A86EF)',
      pillLabel: 'Full-Stack Terminal',
      pillBadge: 'Dev',
      description: 'Developer-centric dark mode (#0B132B). Terminal-style hero header, code snippet blocks, technology badge pills, and live repo cards.',
      accentColor: 'from-[#3A86EF] to-amber-500',
    },
    {
      id: 'role-cybersecurity',
      name: 'Cybersecurity Analyst',
      tag: 'TACTICAL MATRIX • NEON GREEN (#00FF66)',
      pillLabel: 'Cyberpunk HUD',
      pillBadge: 'Futuristic',
      description: 'Command-center tactical matrix. Threat intelligence feed cards, security hardening project blocks, certification badge rows, and audit logs.',
      accentColor: 'from-[#00FF66] to-emerald-600',
    },
    {
      id: 'aurora-creative',
      name: 'Creative Aurora',
      tag: 'BEHANCE GLASS • AURORA GLOW',
      pillLabel: 'Creative Flair',
      pillBadge: 'Vibrant',
      description: 'Vibrant aurora radial gradients, neon glass cards, tech stack tags, and glowing interactive elements.',
      accentColor: 'from-purple-500 via-pink-500 to-cyan-400',
    },
    {
      id: 'minimal-nordic',
      name: 'Minimalist Nordic',
      tag: 'NORDIC ARCHITECTURAL • SAND & SERIF',
      pillLabel: 'Swiss Minimalist',
      pillBadge: 'Clean',
      description: 'Architectural studio layout inspired by Scandinavian design. Refined serif typography, monochrome sand tones, and clean line dividers.',
      accentColor: 'from-stone-600 to-stone-900',
    },
    {
      id: 'role-ai-researcher',
      name: 'AI Researcher',
      tag: 'FUTURISTIC ACADEMIC • MAGENTA & CYAN',
      pillLabel: 'AI Neural',
      pillBadge: 'Academic',
      description: 'Futuristic academic theme (#18122B). Publication log feed, neural-themed section dividers, metric evaluation charts, and arXiv style cards.',
      accentColor: 'from-[#D946EF] to-[#06B6D4]',
    },
    {
      id: 'role-devops',
      name: 'DevOps Engineer',
      tag: 'CLOUD INFRASTRUCTURE • STEEL & ORANGE',
      pillLabel: 'DevOps Cloud',
      pillBadge: 'Infra',
      description: 'Cloud-infrastructure systematic layout. CI/CD pipeline workflow visual charts, architecture modules, and container tool grids.',
      accentColor: 'from-sky-400 to-[#F97316]',
    },
    {
      id: 'role-qa',
      name: 'Software Tester / QA Engineer',
      tag: 'DIAGNOSTIC PRECISION • PASS EMERALD (#2A9D8F)',
      pillLabel: 'QA Suite',
      pillBadge: 'Testing',
      description: 'Diagnostic precision layout. Monospace diagnostic header, categorized QA tool badges, test suite overview cards with pass/fail indicators.',
      accentColor: 'from-[#2A9D8F] to-[#E63946]',
    },
    {
      id: 'role-ml-engineer',
      name: 'Machine Learning Engineer',
      tag: 'COMPUTATIONAL TENSOR • INDIGO & ORANGE',
      pillLabel: 'ML Compute',
      pillBadge: 'PyTorch',
      description: 'High-performance computational design. Bold algorithmic intro, ML framework pills (PyTorch, TensorFlow, MLflow), model architecture cards.',
      accentColor: 'from-[#6366F1] to-[#F97316]',
    },
    {
      id: 'role-data-analyst',
      name: 'Data Analyst',
      tag: 'BI DASHBOARD • VISUAL CYAN (#0EA5E9)',
      pillLabel: 'BI Analytics',
      pillBadge: 'Dashboards',
      description: 'Insight-driven BI dashboard layout. Headline KPI summary blocks, analytical tool badges (SQL, Python, PowerBI, Tableau), dashboard project previews.',
      accentColor: 'from-[#0EA5E9] to-[#EAB308]',
    },
    {
      id: 'canva-pop',
      name: 'Canva Pop Art',
      tag: 'CANVA VIBRANT • POP ART',
      pillLabel: 'Canva Pop',
      pillBadge: 'Art',
      description: 'Canva / Figma inspired layout with vibrant pastel pill tags, playful card shadows, floating stickers, and high-impact headshot avatar.',
      accentColor: 'from-amber-400 via-rose-400 to-indigo-500',
    },
    {
      id: 'adobe-behance',
      name: 'Adobe Creative Studio',
      tag: 'ADOBE BEHANCE • DARK GRID SHOWCASE',
      pillLabel: 'Adobe Behance',
      pillBadge: 'Studio',
      description: 'Adobe Portfolio & Behance inspired theme with dark grid cards, banner project covers, and clean typography headers.',
      accentColor: 'from-blue-600 to-indigo-700',
    },
    {
      id: 'figma-glass',
      name: 'Figma Neo-Glass',
      tag: 'FIGMA GLASS UI • NEON RADIANCY',
      pillLabel: 'Figma Glass',
      pillBadge: 'UI/UX',
      description: 'Figma Glass UI design system featuring ultra-modern frosted glass panels, radiant cyan & magenta gradients, and glowing skill tags.',
      accentColor: 'from-cyan-400 via-indigo-500 to-pink-500',
    },
    {
      id: 'executive-classic',
      name: 'Executive Corporate',
      tag: 'MCKINSEY CLASSIC • CORPORATE NAVY',
      pillLabel: 'Corporate',
      pillBadge: 'Executive',
      description: 'Refined corporate executive theme with dark navy headers, structured 2-column experience list, and gold accents.',
      accentColor: 'from-blue-900 to-slate-900',
    },
    {
      id: 'frost-academic',
      name: 'Frost Academic',
      tag: 'LIGHT ICE-BLUE • ACADEMIC FOCUS',
      pillLabel: 'Frost Ice',
      pillBadge: 'Classic',
      description: 'Clean ice-blue & white theme inspired by modern agency layouts. Circular image badges, impact stats bar, and structured academic sections.',
      accentColor: 'from-blue-600 to-sky-500',
    },
    {
      id: 'coral-modernist',
      name: 'Coral Modernist',
      tag: 'WHITE & CORAL • MODERNIST',
      pillLabel: 'Coral Studio',
      pillBadge: 'Light',
      description: 'Crisp white layout with vibrant coral accents, floating headshot portrait card, service capabilities grid, and portfolio showcase.',
      accentColor: 'from-rose-500 to-pink-600',
    },
    {
      id: 'cyber-violet',
      name: 'Cyber Violet',
      tag: 'CYBER MIDNIGHT • VIOLET GLOW',
      pillLabel: 'Cyber Midnight',
      pillBadge: 'Neon',
      description: 'Deep midnight dark theme with electric violet glow, accordion list services, category tabs for recent works, and stats bar.',
      accentColor: 'from-purple-600 to-indigo-600',
    },
    {
      id: 'crimson-studio',
      name: 'Crimson Studio',
      tag: 'STUDIO BLACK • CRIMSON RED',
      pillLabel: 'Crimson Dark',
      pillBadge: 'Bold',
      description: 'Studio black theme with bold crimson red primary accents, highlighted card spotlight, statistics grid, and crimson buttons.',
      accentColor: 'from-rose-600 to-red-700',
    },
    {
      id: 'nexus-developer',
      name: 'Nexus Developer',
      tag: 'DEVELOPER DARK • TERMINAL',
      pillLabel: 'Nexus Tech',
      pillBadge: 'Code',
      description: 'Sleek dark developer theme with code snippets, glowing badges, terminal bar, and project repository cards.',
      accentColor: 'from-blue-500 to-indigo-600',
    },
    {
      id: 'slate-editorial',
      name: 'Slate Editorial',
      tag: 'EDITORIAL • MONOCHROME',
      pillLabel: 'Editorial',
      pillBadge: 'Minimal',
      description: 'Clean, editorial typography-focused layout with refined border dividers and subtle monochrome tones.',
      accentColor: 'from-slate-600 to-slate-800',
    },
  ];

  const handleApplyTemplate = (id: string, name: string) => {
    setTemplateId(id as TemplateId);
    setAppliedNotification(`Applied "${name}" as your active template!`);
    setTimeout(() => setAppliedNotification(null), 3000);
  };

  const selectedTmplObj = templatesList.find(t => t.id === currentTemplate) || templatesList[0];

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 py-8 px-4 sm:px-8 lg:px-12 font-sans space-y-8 w-full max-w-[1700px] mx-auto">
      
      {/* HEADER */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <span className="px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-extrabold uppercase tracking-wider inline-flex items-center gap-1.5">
          <Palette className="w-3.5 h-3.5" /> Modern Glass & Technical Role Templates
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">Choose Your Unique Portfolio Style</h1>
        <p className="text-slate-600 text-xs sm:text-sm">
          Select a template below to test and apply instantly. Test responsiveness in Desktop, Tablet, and Mobile views.
        </p>
      </div>

      {/* TOP TEMPLATE PILLS SELECTOR (Matching Image 2) */}
      <div className="bg-white/90 backdrop-blur-md p-2 rounded-2xl border border-slate-200 shadow-sm overflow-x-auto no-scrollbar flex items-center gap-2">
        {templatesList.map((tmpl) => {
          const isSelected = currentTemplate === tmpl.id;
          return (
            <button
              key={tmpl.id}
              onClick={() => handleApplyTemplate(tmpl.id, tmpl.name)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                isSelected
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              <span>{tmpl.pillLabel || tmpl.name}</span>
              {tmpl.pillBadge && (
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                  isSelected 
                    ? 'bg-emerald-500 text-white' 
                    : 'bg-white text-slate-700 border border-slate-200'
                }`}>
                  {tmpl.pillBadge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* BROWSER MOCKUP HEADER & PREVIEW CONTAINER (Matching Image 2 & Image 3) */}
      <div className="space-y-4 pt-2">
        
        {/* Mock Browser Control Bar (Image 2 & 3) */}
        <div className="bg-white rounded-2xl border border-slate-200 p-3 shadow-md flex flex-wrap items-center justify-between gap-4">
          
          {/* Left: Window Dots & Fake URL Pill */}
          <div className="flex items-center gap-3 flex-1 min-w-[280px]">
            <div className="flex items-center gap-1.5 shrink-0 pl-1">
              <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-400 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
            </div>

            <div className="flex items-center gap-1.5 bg-slate-100 px-3.5 py-1.5 rounded-xl border border-slate-200 text-xs font-mono text-slate-600 flex-1 max-w-md truncate">
              <Lock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="truncate">portfoliocraft.com/portfolio/{profile.username}?style={currentTemplate}</span>
            </div>
          </div>

          {/* Right: Device Viewport Switcher & Apply Button (Image 3) */}
          <div className="flex items-center gap-3">
            
            {/* Viewport Switcher (Desktop | Tablet | Mobile) */}
            <div className="bg-slate-100 p-1 rounded-xl border border-slate-200 flex items-center gap-1">
              <button
                onClick={() => setViewport('desktop')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  viewport === 'desktop'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <Monitor className="w-3.5 h-3.5" />
                <span>Desktop</span>
              </button>

              <button
                onClick={() => setViewport('tablet')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  viewport === 'tablet'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <Tablet className="w-3.5 h-3.5" />
                <span>Tablet</span>
              </button>

              <button
                onClick={() => setViewport('mobile')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  viewport === 'mobile'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Mobile</span>
              </button>
            </div>

            {/* Dark / Light Toggle icon */}
            <button
              onClick={() => setPreviewDark(!previewDark)}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
              title="Toggle preview lighting"
            >
              {previewDark ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Use Template Action Button */}
            <button
              onClick={() => handleApplyTemplate(selectedTmplObj.id, selectedTmplObj.name)}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-md flex items-center gap-1.5"
            >
              <span>Use {selectedTmplObj.name.split('(')[0].trim()}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

        {/* Applied Notification Banner */}
        {appliedNotification && (
          <div className="bg-emerald-500 text-white text-xs font-bold px-4 py-2.5 rounded-2xl shadow-lg flex items-center justify-between animate-fadeIn">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              {appliedNotification}
            </span>
            <Link href={`/u/${profile.username}`} target="_blank" className="underline hover:opacity-80">
              View Live Portfolio →
            </Link>
          </div>
        )}

        {/* DYNAMIC VIEWPORT CONTAINER */}
        <div className="bg-slate-200/50 p-4 sm:p-8 rounded-3xl border border-slate-200 flex justify-center overflow-x-auto">
          <div 
            className={`transition-all duration-300 ease-in-out bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-300 ${
              viewport === 'desktop'
                ? 'w-full max-w-[1280px]'
                : viewport === 'tablet'
                ? 'w-[768px] max-w-full rounded-2xl border-4 border-slate-700 viewport-tablet'
                : 'w-[390px] max-w-full rounded-3xl border-8 border-slate-800 viewport-mobile'
            }`}
          >
            <TemplateRenderer profile={profile} />
          </div>
        </div>

      </div>

      {/* ALL TEMPLATES CARD GRID */}
      <div className="pt-6 space-y-4">
        <h2 className="text-xl font-black text-slate-900">All Available Portfolio Styles ({templatesList.length})</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templatesList.map((tmpl) => {
            const isSelected = currentTemplate === tmpl.id;
            return (
              <div
                key={tmpl.id}
                className={`bg-white p-6 rounded-3xl border transition-all duration-300 space-y-5 flex flex-col justify-between ${
                  isSelected
                    ? 'border-emerald-600 ring-2 ring-emerald-500/20 shadow-xl'
                    : 'border-slate-200 hover:border-emerald-300 shadow-md'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className={`text-[9px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-gradient-to-r ${tmpl.accentColor} text-white shadow-sm`}>
                      {tmpl.tag}
                    </span>

                    {isSelected && (
                      <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                        <Check className="w-3.5 h-3.5" /> Active
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-extrabold text-slate-900">{tmpl.name}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{tmpl.description}</p>
                </div>

                <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
                  <button
                    onClick={() => handleApplyTemplate(tmpl.id, tmpl.name)}
                    className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                      isSelected
                        ? 'bg-emerald-600 text-white shadow-md'
                        : 'bg-slate-900 hover:bg-emerald-600 text-white'
                    }`}
                  >
                    {isSelected ? 'Selected' : 'Apply Design'}
                  </button>

                  <Link
                    href={`/u/${profile.username}`}
                    target="_blank"
                    className="px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 text-xs font-bold flex items-center gap-1"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
