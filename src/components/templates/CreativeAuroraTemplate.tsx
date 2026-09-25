import React from 'react';
import { PortfolioProfile } from '@/lib/types';
import { Github, Linkedin, Mail, MapPin, ExternalLink, Sparkles, Layers, Award, Download } from 'lucide-react';

interface TemplateProps {
  profile: PortfolioProfile;
  isPublicView?: boolean;
}

export const CreativeAuroraTemplate: React.FC<TemplateProps> = ({ profile, isPublicView }) => {
  const { personal, education, experience, projects, skills } = profile;

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen font-sans relative overflow-hidden pb-24 selection:bg-purple-500 selection:text-white">
      
      {/* Background Aurora Radial Gradients */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-tr from-purple-600/20 to-pink-600/20 rounded-full blur-[140px] pointer-events-none -z-10"></div>
      <div className="absolute bottom-1/3 right-10 w-[500px] h-[500px] bg-gradient-to-tr from-cyan-600/20 to-blue-600/20 rounded-full blur-[140px] pointer-events-none -z-10"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-16">
        
        {/* HERO CARD */}
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-purple-500/20 shadow-2xl relative">
          <div className="flex flex-col md:flex-row items-center gap-8 justify-between">
            <div className="space-y-4 max-w-2xl text-center md:text-left">
              <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-purple-300 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-pink-400" />
                Creative & Technical Portfolio
              </span>

              <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
                Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">{personal.fullName}</span>
              </h1>

              <p className="text-lg font-semibold text-cyan-300">
                {personal.headline}
              </p>

              <p className="text-slate-300 text-sm leading-relaxed">
                {personal.bio}
              </p>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs font-medium text-slate-300 pt-2">
                {personal.location && (
                  <span className="flex items-center gap-1.5 bg-slate-900/60 px-3 py-1.5 rounded-full border border-slate-800">
                    <MapPin className="w-3.5 h-3.5 text-pink-400" />
                    {personal.location}
                  </span>
                )}
                {personal.email && (
                  <a href={`mailto:${personal.email}`} className="flex items-center gap-1.5 bg-slate-900/60 px-3 py-1.5 rounded-full border border-slate-800 hover:text-white transition-colors">
                    <Mail className="w-3.5 h-3.5 text-cyan-400" />
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
                    className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-purple-500/30 text-xs font-bold transition-all shadow-md"
                  >
                    <Github className="w-4 h-4 text-purple-400" />
                    GitHub Profile
                  </a>
                )}
                {personal.linkedinUrl && (
                  <a 
                    href={personal.linkedinUrl} 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-cyan-500/30 text-xs font-bold transition-all shadow-md"
                  >
                    <Linkedin className="w-4 h-4 text-cyan-400" />
                    LinkedIn Connection
                  </a>
                )}
                {isPublicView && (
                  <a 
                    href="/resume"
                    target="_blank"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 text-white text-xs font-black shadow-lg shadow-purple-500/25 hover:scale-[1.03] transition-all"
                  >
                    <Download className="w-4 h-4" />
                    Get ATS Resume
                  </a>
                )}
              </div>
            </div>

            {/* Profile Avatar */}
            {personal.avatarUrl && (
              <div className="relative">
                <div className="w-44 h-44 sm:w-52 sm:h-52 rounded-3xl p-1 bg-gradient-to-tr from-purple-500 via-pink-500 to-cyan-500 shadow-2xl">
                  <img 
                    src={personal.avatarUrl} 
                    alt={personal.fullName}
                    className="w-full h-full object-cover rounded-[22px] bg-slate-950"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* FEATURED PROJECTS */}
        <section className="space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-widest text-pink-400">Portfolio</span>
            <h2 className="text-3xl font-black text-white">Highlighted Creations</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((proj) => (
              <div 
                key={proj.id}
                className="glass-panel p-6 rounded-2xl border border-slate-800 hover:border-pink-500/40 transition-all duration-300 space-y-4 flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-extrabold text-white group-hover:text-pink-300 transition-colors">
                      {proj.title}
                    </h3>
                    <Layers className="w-5 h-5 text-purple-400 opacity-60 group-hover:opacity-100 transition-opacity" />
                  </div>

                  <p className="text-slate-300 text-xs leading-relaxed">
                    {proj.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {proj.technologies.map((tech, i) => (
                      <span 
                        key={i}
                        className="text-[11px] font-semibold bg-gradient-to-r from-purple-500/10 to-pink-500/10 text-pink-300 border border-pink-500/20 px-2.5 py-0.5 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-800/80 text-xs font-semibold">
                  {proj.githubUrl && (
                    <a href={proj.githubUrl} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white flex items-center gap-1.5">
                      <Github className="w-3.5 h-3.5 text-purple-400" />
                      Repository
                    </a>
                  )}
                  {proj.liveUrl && (
                    <a href={proj.liveUrl} target="_blank" rel="noreferrer" className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 ml-auto">
                      Launch Demo <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* EXPERIENCE */}
        <section className="space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-widest text-cyan-400">Career Journey</span>
            <h2 className="text-3xl font-black text-white">Experience & Leadership</h2>
          </div>

          <div className="space-y-6">
            {experience.map((exp) => (
              <div key={exp.id} className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="text-lg font-extrabold text-white">{exp.role}</h3>
                    <p className="text-xs font-bold text-cyan-400">{exp.company} {exp.location && `• ${exp.location}`}</p>
                  </div>
                  <span className="text-xs font-bold text-purple-300 bg-purple-500/10 border border-purple-500/20 px-3 py-1 rounded-full self-start sm:self-auto">
                    {exp.startDate} - {exp.endDate}
                  </span>
                </div>

                <ul className="space-y-2 text-xs text-slate-300">
                  {exp.description.map((bullet, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-pink-400 mt-1.5 shrink-0"></span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* SKILLS GRID */}
        <section className="glass-panel p-8 rounded-3xl border border-slate-800 space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <Award className="w-6 h-6 text-purple-400" />
            <h2 className="text-xl font-black text-white">Skill Sets & Technologies</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs">
            <div className="space-y-2">
              <h4 className="font-extrabold text-purple-400 uppercase tracking-wider text-[11px]">Languages</h4>
              <div className="flex flex-wrap gap-1.5">
                {skills.languages.map((s, i) => (
                  <span key={i} className="bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-lg text-slate-300">{s}</span>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="font-extrabold text-pink-400 uppercase tracking-wider text-[11px]">Frameworks</h4>
              <div className="flex flex-wrap gap-1.5">
                {skills.frameworks.map((s, i) => (
                  <span key={i} className="bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-lg text-slate-300">{s}</span>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="font-extrabold text-cyan-400 uppercase tracking-wider text-[11px]">Tools</h4>
              <div className="flex flex-wrap gap-1.5">
                {skills.tools.map((s, i) => (
                  <span key={i} className="bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-lg text-slate-300">{s}</span>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="font-extrabold text-amber-400 uppercase tracking-wider text-[11px]">Soft Skills</h4>
              <div className="flex flex-wrap gap-1.5">
                {skills.softSkills.map((s, i) => (
                  <span key={i} className="bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-lg text-slate-300">{s}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* EDUCATION */}
        <section className="glass-panel p-8 rounded-3xl border border-slate-800 space-y-4">
          <h2 className="text-xl font-black text-white border-b border-slate-800 pb-3">Education</h2>
          {education.map((edu) => (
            <div key={edu.id} className="space-y-2 text-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between font-extrabold text-white text-sm">
                <span>{edu.institution}</span>
                <span className="text-xs font-semibold text-purple-400">{edu.startYear} - {edu.endYear}</span>
              </div>
              <p className="text-cyan-300 font-semibold">{edu.degree} in {edu.fieldOfStudy} {edu.gpa && `(GPA: ${edu.gpa})`}</p>
              {edu.coursework && <p className="text-slate-400 leading-relaxed"><strong className="text-slate-200">Coursework:</strong> {edu.coursework}</p>}
            </div>
          ))}
        </section>

      </div>
    </div>
  );
};
