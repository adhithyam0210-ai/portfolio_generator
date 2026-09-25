import React from 'react';
import { PortfolioProfile } from '@/lib/types';
import { Github, Linkedin, Mail, MapPin, ExternalLink, ArrowUpRight, Award, FileText, Layout, Layers, Star, Download } from 'lucide-react';

interface TemplateProps {
  profile: PortfolioProfile;
  isPublicView?: boolean;
}

export const AdobeBehanceTemplate: React.FC<TemplateProps> = ({ profile, isPublicView }) => {
  const { personal, education, experience, projects, skills } = profile;

  return (
    <div className="bg-[#0D0D0D] text-slate-100 min-h-screen font-sans pb-24 selection:bg-blue-600 selection:text-white">
      
      {/* ADOBE BEHANCE STYLE TOP BRAND BAR */}
      <div className="border-b border-slate-800 bg-[#141414] py-4 px-6 sm:px-12 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 font-black text-white flex items-center justify-center text-sm shadow-md">
            Be
          </div>
          <span className="font-extrabold text-sm tracking-wider uppercase text-slate-200">
            Adobe Portfolio • Showcase
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs font-bold text-slate-400">
          {personal.githubUrl && (
            <a href={personal.githubUrl} target="_blank" rel="noreferrer" className="hover:text-blue-400 transition-colors">
              GitHub
            </a>
          )}
          {personal.linkedinUrl && (
            <a href={personal.linkedinUrl} target="_blank" rel="noreferrer" className="hover:text-blue-400 transition-colors">
              LinkedIn
            </a>
          )}
          {isPublicView && (
            <a href="/resume" target="_blank" className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-1.5 rounded-full text-xs font-bold transition-all">
              Resume PDF
            </a>
          )}
        </div>
      </div>

      <div className="w-full max-w-[1500px] mx-auto px-4 sm:px-8 lg:px-12 pt-12 space-y-16">
        
        {/* HERO FEATURED BANNER */}
        <div className="bg-[#171717] rounded-3xl p-8 sm:p-14 border border-slate-800 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="space-y-4 max-w-3xl text-center md:text-left">
            <span className="px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-extrabold uppercase tracking-widest inline-block">
              Adobe Creative Studio
            </span>

            <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
              {personal.fullName}
            </h1>

            <p className="text-xl font-bold text-blue-400">
              {personal.headline}
            </p>

            <p className="text-slate-300 text-sm leading-relaxed max-w-2xl font-normal">
              {personal.bio}
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs font-medium text-slate-400 pt-2">
              {personal.location && (
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-blue-400" />
                  {personal.location}
                </span>
              )}
              {personal.email && (
                <a href={`mailto:${personal.email}`} className="flex items-center gap-1.5 hover:text-white transition-colors">
                  <Mail className="w-4 h-4 text-blue-400" />
                  {personal.email}
                </a>
              )}
            </div>
          </div>

          {/* Profile Avatar */}
          {personal.avatarUrl && (
            <div className="relative shrink-0">
              <img
                src={personal.avatarUrl}
                alt={personal.fullName}
                className="w-44 h-44 sm:w-56 sm:h-56 rounded-2xl object-cover border-2 border-slate-700 shadow-2xl"
              />
            </div>
          )}
        </div>

        {/* BEHANCE CREATIVE PROJECTS GRID */}
        <section className="space-y-8">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-2xl font-black text-white">Project Showcase</h2>
              <p className="text-xs text-slate-400">Selected work samples & engineering builds</p>
            </div>
            <span className="text-xs font-bold text-blue-400 uppercase tracking-widest bg-blue-950/60 px-3 py-1 rounded-full border border-blue-800">
              {projects.length} Curated Work
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((proj, idx) => (
              <div
                key={proj.id}
                className="bg-[#171717] rounded-2xl border border-slate-800 overflow-hidden hover:border-blue-500/50 transition-all duration-300 group flex flex-col justify-between"
              >
                {/* Project Header Banner */}
                <div className="h-48 bg-gradient-to-tr from-slate-900 via-blue-950/40 to-slate-900 p-6 flex flex-col justify-between border-b border-slate-800 group-hover:from-blue-950/60 group-hover:to-indigo-950/60 transition-colors">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-extrabold uppercase bg-slate-950/80 text-blue-400 border border-slate-700 px-2.5 py-0.5 rounded-full">
                      BEHANCE FEATURED
                    </span>
                    <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-blue-400 transition-colors" />
                  </div>

                  <div>
                    <h3 className="text-xl font-black text-white group-hover:text-blue-400 transition-colors">{proj.title}</h3>
                    <p className="text-[11px] text-slate-400 truncate mt-1">{proj.technologies.join(' • ')}</p>
                  </div>
                </div>

                {/* Body & Links */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <p className="text-xs text-slate-300 leading-relaxed font-normal">{proj.description}</p>

                  <div className="flex items-center gap-3 pt-4 border-t border-slate-800/80">
                    {proj.githubUrl && (
                      <a
                        href={proj.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 text-center py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-bold transition-colors"
                      >
                        GitHub
                      </a>
                    )}
                    {proj.liveUrl && (
                      <a
                        href={proj.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 text-center py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-extrabold transition-colors shadow-md"
                      >
                        View Project
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* TWO-COLUMN DETAILS SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Skills */}
          <div className="bg-[#171717] p-8 rounded-3xl border border-slate-800 space-y-6">
            <h3 className="text-lg font-black text-white border-b border-slate-800 pb-3">
              Capabilities & Tools
            </h3>

            <div className="space-y-6">
              <div>
                <h4 className="text-xs font-bold uppercase text-blue-400 mb-2">Languages</h4>
                <div className="flex flex-wrap gap-2">
                  {skills.languages.map((sk, i) => (
                    <span key={i} className="bg-slate-900 border border-slate-800 text-slate-200 px-3 py-1 rounded-lg text-xs font-semibold">
                      {sk}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase text-blue-400 mb-2">Frameworks & Libraries</h4>
                <div className="flex flex-wrap gap-2">
                  {skills.frameworks.map((sk, i) => (
                    <span key={i} className="bg-slate-900 border border-slate-800 text-slate-200 px-3 py-1 rounded-lg text-xs font-semibold">
                      {sk}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase text-blue-400 mb-2">Developer Tools</h4>
                <div className="flex flex-wrap gap-2">
                  {skills.tools.map((sk, i) => (
                    <span key={i} className="bg-slate-900 border border-slate-800 text-slate-200 px-3 py-1 rounded-lg text-xs font-semibold">
                      {sk}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Experience & Education */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Experience */}
            <div className="bg-[#171717] p-8 rounded-3xl border border-slate-800 space-y-6">
              <h3 className="text-lg font-black text-white border-b border-slate-800 pb-3">
                Experience Timeline
              </h3>

              <div className="space-y-6">
                {experience.map((exp) => (
                  <div key={exp.id} className="border-l-2 border-blue-600 pl-4 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-base text-white">{exp.role}</span>
                      <span className="text-xs font-mono text-slate-400 bg-slate-900 px-2.5 py-0.5 rounded border border-slate-800">
                        {exp.startDate} – {exp.endDate}
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-blue-400">{exp.company} {exp.location ? `• ${exp.location}` : ''}</p>
                    <ul className="list-disc list-inside text-xs text-slate-300 space-y-1 pt-1 font-normal">
                      {exp.description.map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="bg-[#171717] p-8 rounded-3xl border border-slate-800 space-y-6">
              <h3 className="text-lg font-black text-white border-b border-slate-800 pb-3">
                Education
              </h3>

              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-sm text-white">{edu.institution}</span>
                      <span className="text-xs font-mono text-slate-400">{edu.startYear} – {edu.endYear}</span>
                    </div>
                    <p className="text-xs text-blue-400 font-semibold">{edu.degree} in {edu.fieldOfStudy} {edu.gpa ? `(GPA: ${edu.gpa})` : ''}</p>
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
