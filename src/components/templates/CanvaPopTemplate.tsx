import React from 'react';
import { PortfolioProfile } from '@/lib/types';
import { Github, Linkedin, Mail, MapPin, ExternalLink, Sparkles, Heart, Star, Award, Download, Code, Layers } from 'lucide-react';

interface TemplateProps {
  profile: PortfolioProfile;
  isPublicView?: boolean;
}

export const CanvaPopTemplate: React.FC<TemplateProps> = ({ profile, isPublicView }) => {
  const { personal, education, experience, projects, skills } = profile;

  return (
    <div className="bg-[#FAF8F5] text-slate-900 min-h-screen font-sans pb-24 selection:bg-amber-300 selection:text-slate-900">
      
      {/* CANVA-STYLE TOP BANNER */}
      <div className="bg-gradient-to-r from-amber-300 via-rose-300 to-indigo-300 py-16 px-4 sm:px-8 relative overflow-hidden border-b-4 border-slate-900">
        
        {/* Decorative Floating Stickers */}
        <div className="absolute top-4 left-6 bg-white border-2 border-slate-900 px-3 py-1 rounded-full text-xs font-black rotate-[-6deg] shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] hidden sm:block">
          ✨ Canva Style
        </div>
        <div className="absolute bottom-4 right-10 bg-amber-400 border-2 border-slate-900 px-4 py-1.5 rounded-full text-xs font-black rotate-[5deg] shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] hidden sm:block">
          🚀 Open to Hire
        </div>

        <div className="w-full max-w-[1500px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 text-center md:text-left max-w-3xl">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border-2 border-slate-900 text-slate-900 text-xs font-black shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] uppercase">
              <Sparkles className="w-4 h-4 text-amber-500 fill-amber-400" />
              Creative Student Portfolio
            </span>

            <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight leading-tight">
              Hello! I'm <span className="bg-white px-3 py-1 rounded-2xl border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] inline-block">{personal.fullName}</span>
            </h1>

            <p className="text-xl font-extrabold text-slate-800">
              {personal.headline}
            </p>

            <p className="text-slate-700 text-sm font-medium leading-relaxed max-w-2xl">
              {personal.bio}
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2">
              {personal.location && (
                <span className="flex items-center gap-1.5 bg-white border-2 border-slate-900 px-3 py-1 rounded-full text-xs font-bold shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
                  <MapPin className="w-3.5 h-3.5 text-rose-500" />
                  {personal.location}
                </span>
              )}
              {personal.email && (
                <a href={`mailto:${personal.email}`} className="flex items-center gap-1.5 bg-white border-2 border-slate-900 px-3 py-1 rounded-full text-xs font-bold shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] hover:bg-amber-100">
                  <Mail className="w-3.5 h-3.5 text-indigo-600" />
                  {personal.email}
                </a>
              )}
            </div>

            {/* Social Buttons */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-4">
              {personal.githubUrl && (
                <a
                  href={personal.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-slate-900 text-white border-2 border-slate-900 text-xs font-black shadow-[4px_4px_0px_0px_rgba(251,191,36,1)] hover:translate-y-[-2px] transition-transform"
                >
                  <Github className="w-4 h-4 text-amber-400" />
                  GitHub
                </a>
              )}
              {personal.linkedinUrl && (
                <a
                  href={personal.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-blue-600 text-white border-2 border-slate-900 text-xs font-black shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] hover:translate-y-[-2px] transition-transform"
                >
                  <Linkedin className="w-4 h-4 text-white" />
                  LinkedIn
                </a>
              )}
              {isPublicView && (
                <a
                  href="/resume"
                  target="_blank"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-rose-500 text-white border-2 border-slate-900 text-xs font-black shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] hover:translate-y-[-2px] transition-transform"
                >
                  <Download className="w-4 h-4" />
                  ATS Resume PDF
                </a>
              )}
            </div>
          </div>

          {/* Canva Sticker Avatar */}
          {personal.avatarUrl && (
            <div className="relative shrink-0">
              <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-3xl border-4 border-slate-900 overflow-hidden bg-amber-200 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)]">
                <img
                  src={personal.avatarUrl}
                  alt={personal.fullName}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="w-full max-w-[1500px] mx-auto px-4 sm:px-8 pt-12 space-y-16">
        
        {/* PROJECTS SECTION (Canva Cards Grid) */}
        <section className="space-y-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-400 border-2 border-slate-900 flex items-center justify-center shadow-[3px_3px_0px_0px_rgba(15,23,42,1)]">
              <Code className="w-5 h-5 text-slate-900" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-900">Featured Portfolio Work</h2>
              <p className="text-xs text-slate-600 font-bold">Interactive web applications and technical solutions</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((proj, idx) => {
              const bgColors = ['bg-amber-100', 'bg-rose-100', 'bg-sky-100', 'bg-indigo-100', 'bg-emerald-100'];
              const cardBg = bgColors[idx % bgColors.length];
              return (
                <div
                  key={proj.id}
                  className={`${cardBg} p-6 rounded-3xl border-3 border-slate-900 shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] space-y-4 flex flex-col justify-between hover:translate-y-[-4px] transition-transform`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase tracking-wider bg-white border-2 border-slate-900 px-3 py-1 rounded-full shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
                        Project #{idx + 1}
                      </span>
                      {proj.featured && (
                        <span className="text-[10px] font-black bg-amber-400 text-slate-900 border-2 border-slate-900 px-2.5 py-0.5 rounded-full">
                          ★ Featured
                        </span>
                      )}
                    </div>

                    <h3 className="text-xl font-black text-slate-900">{proj.title}</h3>
                    <p className="text-xs text-slate-700 font-medium leading-relaxed">{proj.description}</p>

                    {/* Tech Pills */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {proj.technologies.map((tech, i) => (
                        <span key={i} className="text-[10px] font-extrabold bg-white border border-slate-900 px-2.5 py-1 rounded-lg">
                          #{tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pt-3 border-t-2 border-slate-900/20">
                    {proj.githubUrl && (
                      <a
                        href={proj.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 text-center py-2 rounded-xl bg-white border-2 border-slate-900 text-xs font-black hover:bg-slate-900 hover:text-white transition-colors"
                      >
                        GitHub Repo
                      </a>
                    )}
                    {proj.liveUrl && (
                      <a
                        href={proj.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 text-center py-2 rounded-xl bg-slate-900 text-white border-2 border-slate-900 text-xs font-black hover:bg-amber-400 hover:text-slate-900 transition-colors"
                      >
                        Live Demo ↗
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* SKILLS & EXPERIENCE GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Skills Column */}
          <div className="bg-white p-8 rounded-3xl border-3 border-slate-900 shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] space-y-6">
            <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              Technical Skill Stack
            </h3>

            <div className="space-y-4">
              <div>
                <span className="text-xs font-black uppercase text-indigo-600 block mb-2">Languages</span>
                <div className="flex flex-wrap gap-2">
                  {skills.languages.map((sk, i) => (
                    <span key={i} className="bg-indigo-50 border-2 border-slate-900 px-3 py-1 rounded-xl text-xs font-extrabold text-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
                      {sk}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-xs font-black uppercase text-rose-600 block mb-2">Frameworks</span>
                <div className="flex flex-wrap gap-2">
                  {skills.frameworks.map((sk, i) => (
                    <span key={i} className="bg-rose-50 border-2 border-slate-900 px-3 py-1 rounded-xl text-xs font-extrabold text-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
                      {sk}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-xs font-black uppercase text-amber-600 block mb-2">Tools & Infra</span>
                <div className="flex flex-wrap gap-2">
                  {skills.tools.map((sk, i) => (
                    <span key={i} className="bg-amber-50 border-2 border-slate-900 px-3 py-1 rounded-xl text-xs font-extrabold text-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
                      {sk}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Work & Education Column */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Experience */}
            <div className="bg-white p-8 rounded-3xl border-3 border-slate-900 shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] space-y-6">
              <h3 className="text-lg font-black text-slate-900">Work Experience & Internships</h3>

              <div className="space-y-6">
                {experience.map((exp) => (
                  <div key={exp.id} className="p-5 rounded-2xl bg-amber-50/60 border-2 border-slate-900 space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <span className="font-black text-base text-slate-900">{exp.role}</span>
                      <span className="text-xs font-black bg-white border border-slate-900 px-3 py-0.5 rounded-full inline-block w-fit">
                        {exp.startDate} – {exp.endDate}
                      </span>
                    </div>
                    <p className="text-xs font-extrabold text-indigo-700">{exp.company} {exp.location ? `• ${exp.location}` : ''}</p>
                    <ul className="list-disc list-inside text-xs text-slate-700 space-y-1 font-medium pt-1">
                      {exp.description.map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="bg-white p-8 rounded-3xl border-3 border-slate-900 shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] space-y-6">
              <h3 className="text-lg font-black text-slate-900">Education & Qualifications</h3>

              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id} className="p-5 rounded-2xl bg-rose-50/60 border-2 border-slate-900 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-black text-sm text-slate-900">{edu.institution}</span>
                      <span className="text-xs font-mono font-bold text-slate-600">{edu.startYear} – {edu.endYear}</span>
                    </div>
                    <p className="text-xs font-bold text-rose-700">{edu.degree} in {edu.fieldOfStudy} {edu.gpa ? `(GPA: ${edu.gpa})` : ''}</p>
                    {edu.coursework && <p className="text-xs text-slate-600 font-medium">Coursework: {edu.coursework}</p>}
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
