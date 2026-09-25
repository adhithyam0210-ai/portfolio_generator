import React from 'react';
import { PortfolioProfile } from '@/lib/types';
import { Github, Linkedin, Mail, MapPin, ExternalLink, Sparkles, Zap, Layers, Download, CheckCircle2, Code2 } from 'lucide-react';

interface TemplateProps {
  profile: PortfolioProfile;
  isPublicView?: boolean;
}

export const FigmaGlassTemplate: React.FC<TemplateProps> = ({ profile, isPublicView }) => {
  const { personal, education, experience, projects, skills } = profile;

  return (
    <div className="bg-[#050814] text-slate-100 min-h-screen font-sans pb-24 relative overflow-hidden selection:bg-cyan-500 selection:text-slate-950">
      
      {/* Background Glowing Figma Blobs */}
      <div className="absolute top-10 left-10 w-[500px] h-[500px] bg-gradient-to-tr from-cyan-500/20 via-indigo-500/20 to-purple-500/20 rounded-full blur-[140px] pointer-events-none -z-10"></div>
      <div className="absolute top-1/2 right-10 w-[600px] h-[600px] bg-gradient-to-tr from-pink-500/15 via-rose-500/15 to-amber-500/15 rounded-full blur-[160px] pointer-events-none -z-10"></div>

      {/* TOP FIGMA BRAND BAR */}
      <div className="border-b border-cyan-500/20 bg-slate-950/60 backdrop-blur-md py-4 px-6 sm:px-12 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 via-indigo-500 to-pink-500 p-0.5 shadow-lg shadow-cyan-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[6px] flex items-center justify-center font-black text-xs text-cyan-400">
              Fi
            </div>
          </div>
          <span className="font-black text-xs tracking-wider uppercase text-cyan-400">
            Figma Glass UI • Portfolio Config
          </span>
        </div>

        <div className="flex items-center gap-3 text-xs font-bold text-slate-300">
          {personal.githubUrl && (
            <a href={personal.githubUrl} target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors">
              GitHub
            </a>
          )}
          {personal.linkedinUrl && (
            <a href={personal.linkedinUrl} target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors">
              LinkedIn
            </a>
          )}
        </div>
      </div>

      <div className="w-full max-w-[1500px] mx-auto px-4 sm:px-8 lg:px-12 pt-12 space-y-16">
        
        {/* HERO FIGMA GLASS PANEL */}
        <div className="bg-slate-900/60 backdrop-blur-xl p-8 sm:p-14 rounded-3xl border border-cyan-500/30 shadow-[0_0_50px_rgba(6,182,212,0.1)] relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="space-y-5 max-w-3xl text-center md:text-left">
            <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-gradient-to-r from-cyan-500/20 via-indigo-500/20 to-pink-500/20 border border-cyan-400/40 text-cyan-300 text-xs font-extrabold uppercase tracking-wider">
              <Zap className="w-3.5 h-3.5 text-cyan-400 fill-cyan-400" />
              Figma Neo-Glass Design System
            </span>

            <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
              {personal.fullName}
            </h1>

            <p className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-300 to-pink-400">
              {personal.headline}
            </p>

            <p className="text-slate-300 text-sm leading-relaxed max-w-2xl font-normal">
              {personal.bio}
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs font-medium text-slate-300 pt-2">
              {personal.location && (
                <span className="flex items-center gap-1.5 bg-slate-950/80 px-3 py-1.5 rounded-full border border-slate-800">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                  {personal.location}
                </span>
              )}
              {personal.email && (
                <a href={`mailto:${personal.email}`} className="flex items-center gap-1.5 bg-slate-950/80 px-3 py-1.5 rounded-full border border-slate-800 hover:text-cyan-300 transition-colors">
                  <Mail className="w-3.5 h-3.5 text-pink-400" />
                  {personal.email}
                </a>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-4">
              {personal.githubUrl && (
                <a
                  href={personal.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-950 hover:bg-slate-900 text-slate-200 border border-cyan-500/30 text-xs font-bold transition-all shadow-md"
                >
                  <Github className="w-4 h-4 text-cyan-400" />
                  GitHub Repository
                </a>
              )}
              {isPublicView && (
                <a
                  href="/resume"
                  target="_blank"
                  className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 text-xs font-black shadow-lg shadow-cyan-500/25 transition-all hover:scale-[1.02]"
                >
                  <Download className="w-4 h-4" />
                  Download ATS Resume
                </a>
              )}
            </div>
          </div>

          {/* Profile Avatar with Neon Glow Ring */}
          {personal.avatarUrl && (
            <div className="relative shrink-0">
              <div className="w-44 h-44 sm:w-56 sm:h-56 rounded-3xl p-1 bg-gradient-to-br from-cyan-400 via-indigo-500 to-pink-500 shadow-2xl shadow-cyan-500/30">
                <img
                  src={personal.avatarUrl}
                  alt={personal.fullName}
                  className="w-full h-full object-cover rounded-[22px]"
                />
              </div>
            </div>
          )}
        </div>

        {/* PROJECTS SECTION */}
        <section className="space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black text-white flex items-center gap-2">
              <Code2 className="w-6 h-6 text-cyan-400" />
              Featured Applications
            </h2>
            <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 px-3 py-1 rounded-full border border-cyan-800">
              {projects.length} Repositories
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((proj, idx) => (
              <div
                key={proj.id}
                className="bg-slate-900/50 backdrop-blur-lg p-6 rounded-3xl border border-slate-800 hover:border-cyan-500/50 transition-all duration-300 space-y-4 flex flex-col justify-between group shadow-xl"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold bg-cyan-950 text-cyan-400 border border-cyan-800 px-2.5 py-0.5 rounded-full">
                      App #{idx + 1}
                    </span>
                    {proj.featured && (
                      <span className="text-[10px] font-extrabold bg-pink-950 text-pink-400 border border-pink-800 px-2.5 py-0.5 rounded-full">
                        ★ Featured
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-black text-white group-hover:text-cyan-400 transition-colors">{proj.title}</h3>
                  <p className="text-xs text-slate-300 font-normal leading-relaxed">{proj.description}</p>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {proj.technologies.map((tech, i) => (
                      <span key={i} className="text-[10px] font-mono font-semibold bg-slate-950 text-slate-300 border border-slate-800 px-2 py-0.5 rounded-md">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-slate-800/80">
                  {proj.githubUrl && (
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 text-center py-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs font-bold transition-colors"
                    >
                      GitHub Repo
                    </a>
                  )}
                  {proj.liveUrl && (
                    <a
                      href={proj.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 text-center py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 text-xs font-black transition-all shadow-md"
                    >
                      Live Demo ↗
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SKILLS & EXPERIENCE GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Skills */}
          <div className="bg-slate-900/50 backdrop-blur-lg p-8 rounded-3xl border border-slate-800 space-y-6">
            <h3 className="text-lg font-black text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-cyan-400" />
              Skill Architecture
            </h3>

            <div className="space-y-5">
              <div>
                <span className="text-xs font-bold uppercase text-cyan-400 block mb-2 font-mono">Languages</span>
                <div className="flex flex-wrap gap-2">
                  {skills.languages.map((sk, i) => (
                    <span key={i} className="bg-cyan-950/60 border border-cyan-800/60 text-cyan-200 px-3 py-1 rounded-xl text-xs font-semibold">
                      {sk}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-xs font-bold uppercase text-pink-400 block mb-2 font-mono">Frameworks</span>
                <div className="flex flex-wrap gap-2">
                  {skills.frameworks.map((sk, i) => (
                    <span key={i} className="bg-pink-950/60 border border-pink-800/60 text-pink-200 px-3 py-1 rounded-xl text-xs font-semibold">
                      {sk}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-xs font-bold uppercase text-indigo-400 block mb-2 font-mono">Tools</span>
                <div className="flex flex-wrap gap-2">
                  {skills.tools.map((sk, i) => (
                    <span key={i} className="bg-indigo-950/60 border border-indigo-800/60 text-indigo-200 px-3 py-1 rounded-xl text-xs font-semibold">
                      {sk}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Work & Education */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Experience */}
            <div className="bg-slate-900/50 backdrop-blur-lg p-8 rounded-3xl border border-slate-800 space-y-6">
              <h3 className="text-lg font-black text-white">Experience</h3>

              <div className="space-y-6">
                {experience.map((exp) => (
                  <div key={exp.id} className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-base text-white">{exp.role}</span>
                      <span className="text-xs font-mono text-cyan-400 bg-slate-900 px-2.5 py-0.5 rounded border border-slate-800">
                        {exp.startDate} – {exp.endDate}
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-cyan-400">{exp.company} {exp.location ? `• ${exp.location}` : ''}</p>
                    <ul className="list-disc list-inside text-xs text-slate-300 space-y-1 font-normal pt-1">
                      {exp.description.map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="bg-slate-900/50 backdrop-blur-lg p-8 rounded-3xl border border-slate-800 space-y-6">
              <h3 className="text-lg font-black text-white">Education</h3>

              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id} className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-sm text-white">{edu.institution}</span>
                      <span className="text-xs font-mono text-slate-400">{edu.startYear} – {edu.endYear}</span>
                    </div>
                    <p className="text-xs text-cyan-400 font-semibold">{edu.degree} in {edu.fieldOfStudy} {edu.gpa ? `(GPA: ${edu.gpa})` : ''}</p>
                    {edu.coursework && <p className="text-xs text-slate-400">Coursework: {edu.coursework}</p>}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
