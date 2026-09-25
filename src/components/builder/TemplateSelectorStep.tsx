'use client';

import React from 'react';
import { TemplateId } from '@/lib/types';
import { Check, Sparkles, Palette, ArrowRight } from 'lucide-react';

interface TemplateSelectorStepProps {
  selectedTemplate: TemplateId;
  onSelectTemplate: (templateId: TemplateId) => void;
  onContinue?: () => void;
}

export const TemplateSelectorStep: React.FC<TemplateSelectorStepProps> = ({
  selectedTemplate,
  onSelectTemplate,
  onContinue,
}) => {
  const templates = [
    {
      id: 'modern-glass' as TemplateId,
      name: 'Modern Glass (Featured)',
      category: 'FEATURED',
      desc: 'Ultra-modern frosted glass aesthetic, subtle gradient backdrop, direct CV download.',
      badgeStyle: 'bg-emerald-500 text-white',
      selectedStyle: 'bg-emerald-600 text-white border-emerald-600 shadow-lg',
      hoverStyle: 'hover:border-emerald-400',
    },
    {
      id: 'role-uiux' as TemplateId,
      name: 'UI/UX Designer (Bento Grid)',
      category: 'DESIGN',
      desc: 'Clean minimalist layout, coral accents (#FF6B6B), case-study thumbnail cards.',
      badgeStyle: 'bg-rose-500 text-white',
      selectedStyle: 'bg-rose-500 text-white border-rose-600 shadow-lg',
      hoverStyle: 'hover:border-rose-400',
    },
    {
      id: 'role-fullstack' as TemplateId,
      name: 'Full Stack Developer',
      category: 'DEV',
      desc: 'Developer-centric dark mode, deep navy & electric blue, terminal header.',
      badgeStyle: 'bg-blue-600 text-white',
      selectedStyle: 'bg-[#0B132B] text-white border-[#3A86EF] shadow-lg',
      hoverStyle: 'hover:border-blue-400',
    },
    {
      id: 'role-ai-researcher' as TemplateId,
      name: 'AI Researcher',
      category: 'AI / RESEARCH',
      desc: 'Futuristic academic theme, midnight purple, glowing magenta & cyan accents.',
      badgeStyle: 'bg-fuchsia-600 text-white',
      selectedStyle: 'bg-[#18122B] text-white border-fuchsia-500 shadow-lg',
      hoverStyle: 'hover:border-purple-400',
    },
    {
      id: 'role-cybersecurity' as TemplateId,
      name: 'Cybersecurity Analyst',
      category: 'SECURITY',
      desc: 'Command-center tactical matrix, obsidian dark & neon green (#00FF66).',
      badgeStyle: 'bg-emerald-600 text-white',
      selectedStyle: 'bg-[#0A0E14] text-white border-[#00FF66] shadow-lg',
      hoverStyle: 'hover:border-emerald-400',
    },
    {
      id: 'role-devops' as TemplateId,
      name: 'DevOps Engineer',
      category: 'INFRASTRUCTURE',
      desc: 'Cloud-infrastructure systematic layout, CI/CD pipeline charts, steel & orange.',
      badgeStyle: 'bg-sky-600 text-white',
      selectedStyle: 'bg-[#0F172A] text-white border-sky-400 shadow-lg',
      hoverStyle: 'hover:border-sky-400',
    },
    {
      id: 'role-qa' as TemplateId,
      name: 'Software Tester / QA',
      category: 'TESTING',
      desc: 'Diagnostic precision, bug-report crimson & automated-pass emerald green.',
      badgeStyle: 'bg-teal-600 text-white',
      selectedStyle: 'bg-[#2A9D8F] text-white border-emerald-700 shadow-lg',
      hoverStyle: 'hover:border-emerald-400',
    },
    {
      id: 'role-ml-engineer' as TemplateId,
      name: 'Machine Learning Engineer',
      category: 'ML / COMPUTE',
      desc: 'Computational tensor layout, dark graphite & electric violet with orange badges.',
      badgeStyle: 'bg-indigo-600 text-white',
      selectedStyle: 'bg-[#0B0F19] text-white border-[#6366F1] shadow-lg',
      hoverStyle: 'hover:border-indigo-400',
    },
    {
      id: 'role-data-analyst' as TemplateId,
      name: 'Data Analyst',
      category: 'BI & ANALYTICS',
      desc: 'Insight-driven BI dashboard, executive scorecard blocks, visual cyan (#0EA5E9).',
      badgeStyle: 'bg-sky-600 text-white',
      selectedStyle: 'bg-white text-slate-900 border-sky-500 shadow-lg ring-2 ring-sky-500/20',
      hoverStyle: 'hover:border-sky-400',
    },
    {
      id: 'canva-pop' as TemplateId,
      name: 'Canva Pop Art',
      category: 'CREATIVE',
      desc: 'Canva inspired vibrant pastel pill tags, playful card shadows, floating stickers.',
      badgeStyle: 'bg-amber-500 text-white',
      selectedStyle: 'bg-gradient-to-r from-amber-500 to-rose-500 text-white shadow-lg',
      hoverStyle: 'hover:border-amber-400',
    },
    {
      id: 'adobe-behance' as TemplateId,
      name: 'Adobe Creative Studio',
      category: 'PORTFOLIO',
      desc: 'Adobe Behance inspired dark grid cards, banner project covers, and clean typography.',
      badgeStyle: 'bg-blue-600 text-white',
      selectedStyle: 'bg-blue-900 text-white border-blue-500 shadow-lg',
      hoverStyle: 'hover:border-blue-400',
    },
    {
      id: 'figma-glass' as TemplateId,
      name: 'Figma Neo-Glass',
      category: 'NEO-GLASS',
      desc: 'Frosted glass panels, radiant cyan & magenta gradients, glowing skill tags.',
      badgeStyle: 'bg-purple-600 text-white',
      selectedStyle: 'bg-purple-900 text-white border-purple-400 shadow-lg',
      hoverStyle: 'hover:border-purple-400',
    },
    {
      id: 'minimal-nordic' as TemplateId,
      name: 'Minimalist Nordic',
      category: 'EDITORIAL',
      desc: 'Architectural studio layout inspired by Scandinavian design, serif typography.',
      badgeStyle: 'bg-stone-700 text-white',
      selectedStyle: 'bg-stone-900 text-white border-stone-600 shadow-lg',
      hoverStyle: 'hover:border-stone-400',
    },
    {
      id: 'aurora-creative' as TemplateId,
      name: 'Creative Aurora',
      category: 'AURORA',
      desc: 'Vibrant aurora radial gradients, neon glass cards, tech stack tags.',
      badgeStyle: 'bg-pink-600 text-white',
      selectedStyle: 'bg-purple-900 text-white border-pink-500 shadow-lg',
      hoverStyle: 'hover:border-pink-400',
    },
    {
      id: 'frost-academic' as TemplateId,
      name: 'Frost Academic',
      category: 'ACADEMIC',
      desc: 'Light ice-blue theme with impact stats bar and structured academic sections.',
      badgeStyle: 'bg-blue-500 text-white',
      selectedStyle: 'bg-blue-600 text-white border-blue-700 shadow-lg',
      hoverStyle: 'hover:border-blue-400',
    },
    {
      id: 'coral-modernist' as TemplateId,
      name: 'Coral Modernist',
      category: 'MODERNIST',
      desc: 'Crisp white with vibrant coral accents, floating portrait photo, project grid.',
      badgeStyle: 'bg-rose-500 text-white',
      selectedStyle: 'bg-rose-500 text-white border-rose-500 shadow-lg',
      hoverStyle: 'hover:border-rose-300',
    },
    {
      id: 'cyber-violet' as TemplateId,
      name: 'Cyber Violet',
      category: 'CYBER',
      desc: 'Deep midnight dark with electric violet glow, stats counter, category filter.',
      badgeStyle: 'bg-purple-600 text-white',
      selectedStyle: 'bg-purple-600 text-white border-purple-600 shadow-lg',
      hoverStyle: 'hover:border-purple-300',
    },
    {
      id: 'nexus-developer' as TemplateId,
      name: 'Nexus Developer',
      category: 'CODE',
      desc: 'Sleek dark developer theme, glowing badges, terminal bar, code snippets.',
      badgeStyle: 'bg-blue-600 text-white',
      selectedStyle: 'bg-blue-600 text-white border-blue-600 shadow-lg',
      hoverStyle: 'hover:border-slate-300',
    },
    {
      id: 'slate-editorial' as TemplateId,
      name: 'Slate Editorial',
      category: 'MONOCHROME',
      desc: 'Clean, editorial typography-focused layout with refined border dividers.',
      badgeStyle: 'bg-slate-700 text-white',
      selectedStyle: 'bg-slate-800 text-white border-slate-800 shadow-lg',
      hoverStyle: 'hover:border-slate-300',
    },
    {
      id: 'crimson-studio' as TemplateId,
      name: 'Crimson Studio',
      category: 'LUXURY',
      desc: 'High-contrast luxury dark aesthetic with rich ruby and crimson accents.',
      badgeStyle: 'bg-rose-700 text-white',
      selectedStyle: 'bg-rose-950 text-white border-rose-600 shadow-lg',
      hoverStyle: 'hover:border-rose-400',
    },
    {
      id: 'executive-classic' as TemplateId,
      name: 'Executive Classic',
      category: 'EXECUTIVE',
      desc: 'Corporate board-level layout with navy prestige and gold leadership accents.',
      badgeStyle: 'bg-amber-600 text-white',
      selectedStyle: 'bg-slate-900 text-white border-amber-500 shadow-lg',
      hoverStyle: 'hover:border-amber-400',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <Palette className="w-5 h-5 text-blue-600" />
          <h2 className="text-lg font-black text-slate-900">
            Step 1: Choose Your Portfolio Style
          </h2>
        </div>
        <p className="text-xs text-slate-500">
          Pick a template first. As you add your details in the upcoming steps, the real-time preview will adapt instantly in this style.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {templates.map((tmpl) => {
          const isSelected = selectedTemplate === tmpl.id;
          return (
            <button
              key={tmpl.id}
              type="button"
              onClick={() => onSelectTemplate(tmpl.id)}
              className={`p-4 rounded-2xl border text-left space-y-2 transition-all ${
                isSelected
                  ? tmpl.selectedStyle
                  : `bg-slate-50 border-slate-200 text-slate-800 ${tmpl.hoverStyle}`
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-sm flex items-center gap-1.5">
                  {tmpl.name}
                </span>
                {isSelected ? (
                  <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 text-white" />
                  </span>
                ) : (
                  <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold ${tmpl.badgeStyle}`}>
                    {tmpl.category}
                  </span>
                )}
              </div>
              <p className={`text-xs leading-relaxed ${isSelected ? 'opacity-90' : 'text-slate-500'}`}>
                {tmpl.desc}
              </p>
            </button>
          );
        })}
      </div>

      {onContinue && (
        <div className="pt-4 flex items-center justify-between border-t border-slate-200">
          <span className="text-xs font-bold text-slate-500">
            Selected Style: <strong className="text-blue-600 uppercase font-black">{selectedTemplate}</strong>
          </span>
          <button
            type="button"
            onClick={onContinue}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-lg transition-all"
          >
            Confirm Template & Fill Details <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
