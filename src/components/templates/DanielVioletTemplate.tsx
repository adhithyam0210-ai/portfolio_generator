import React, { useState } from 'react';
import { PortfolioProfile } from '@/lib/types';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin, 
  GraduationCap, 
  Briefcase, 
  Code2, 
  Wand2, 
  Download, 
  ExternalLink,
  User 
} from 'lucide-react';

interface TemplateProps {
  profile: PortfolioProfile;
  isPublicView?: boolean;
}

export const DanielVioletTemplate: React.FC<TemplateProps> = ({ profile, isPublicView }) => {
  const { personal, education, experience, projects, skills } = profile;
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category?.toLowerCase().includes(activeCategory.toLowerCase()));

  return (
    <div className="bg-[#0b0a15] text-slate-100 min-h-screen font-sans selection:bg-purple-600 selection:text-white pb-24">
      
      {/* HEADER */}
      <header className="border-b border-purple-900/30 px-6 py-5 bg-[#0d0b1a]/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white font-bold text-xs shadow-lg shadow-purple-600/40">
              {personal.fullName.split(' ').map(n => n[0]).join('')}
            </div>
            <span className="font-extrabold text-lg text-white tracking-wide">{personal.fullName}</span>
          </div>

          <div className="flex items-center gap-4 text-xs font-bold">
            {isPublicView && (
              <a
                href="/resume"
                target="_blank"
                className="px-5 py-2 rounded-full bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-600/30 transition-all"
              >
                DOWNLOAD RESUME PDF
              </a>
            )}
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-20">
        
        {/* SECTION 1: PERSONAL BIO / HERO SECTION */}
        <section id="bio" className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pt-4">
          
          <div className="md:col-span-7 space-y-4 sm:space-y-5 text-left">
            <span className="text-xs font-semibold text-purple-300 uppercase tracking-widest inline-block">
              Candidate Portfolio
            </span>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-violet-300 to-indigo-400">
                {personal.fullName}
              </span>
            </h1>

            <p className="text-base sm:text-lg font-bold text-purple-300">
              {personal.headline}
            </p>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-xl font-normal">
              {personal.bio}
            </p>

            {/* Social Buttons + Download CV */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={personal.resumeUrl || "/resume"}
                download={personal.resumeUrl ? (personal.resumeFileName || `${personal.fullName.replace(/\s+/g, '_')}_Resume.pdf`) : undefined}
                target={personal.resumeUrl ? undefined : "_blank"}
                className="px-5 py-2.5 rounded-full border border-purple-500/50 bg-purple-950/40 hover:bg-purple-600 text-white font-bold text-xs transition-all shadow-lg shadow-purple-900/20 flex items-center gap-2"
              >
                <Download className="w-4 h-4" /> Download CV
              </a>

              <div className="flex items-center gap-2">
                {personal.githubUrl && (
                  <a href={personal.githubUrl} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full border border-purple-800/60 bg-purple-950/30 flex items-center justify-center text-slate-300 hover:text-white hover:border-purple-500 transition-colors">
                    <Github className="w-4 h-4" />
                  </a>
                )}
                {personal.linkedinUrl && (
                  <a href={personal.linkedinUrl} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full border border-purple-800/60 bg-purple-950/30 flex items-center justify-center text-slate-300 hover:text-white hover:border-purple-500 transition-colors">
                    <Linkedin className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Hero Avatar Image (Proportional Square Portrait) */}
          <div className="md:col-span-5 flex justify-center md:justify-end">
            <div className="relative w-48 sm:w-60 aspect-square rounded-3xl overflow-hidden border-2 border-purple-500/40 bg-purple-950/30 p-2 shadow-2xl shadow-purple-950/50">
              {personal.avatarUrl ? (
                <img 
                  src={personal.avatarUrl} 
                  alt={personal.fullName}
                  className="w-full h-full object-cover rounded-2xl"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-purple-950/40 text-purple-400 rounded-2xl">
                  <User className="w-16 h-16" />
                </div>
              )}
            </div>
          </div>

        </section>

        {/* STATS BAR */}
        <section className="bg-purple-950/20 border border-purple-900/30 p-5 sm:p-6 rounded-3xl grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl sm:text-3xl font-black text-purple-400">{projects.length}</div>
            <p className="text-[11px] text-slate-400 mt-0.5 font-medium">Projects Built</p>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-purple-400">{personal.yearsExperience || '3+'}</div>
            <p className="text-[11px] text-slate-400 mt-0.5 font-medium">Years Coding</p>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-purple-400">{education[0]?.gpa || '3.9'}</div>
            <p className="text-[11px] text-slate-400 mt-0.5 font-medium">Academic GPA</p>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-purple-400">100%</div>
            <p className="text-[11px] text-slate-400 mt-0.5 font-medium">Recruiter Ready</p>
          </div>
        </section>

        {/* SECTION 2: EDUCATION */}
        <section id="education" className="bg-[#0f0d1f] border border-purple-900/40 p-8 sm:p-10 rounded-3xl space-y-6">
          <div className="flex items-center gap-3 border-b border-purple-900/40 pb-4">
            <div className="w-10 h-10 rounded-xl bg-purple-950 text-purple-400 flex items-center justify-center font-bold">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-white">Education</h2>
              <p className="text-xs text-slate-400">Institution, degree, coursework, and dates</p>
            </div>
          </div>

          <div className="space-y-6">
            {education.map((edu) => (
              <div key={edu.id} className="p-6 rounded-2xl bg-purple-950/20 border border-purple-900/40 space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <h3 className="text-lg font-black text-white">{edu.institution}</h3>
                  <span className="text-xs font-mono font-bold text-purple-300 bg-purple-900/40 px-3 py-1 rounded-full border border-purple-800/40 self-start sm:self-auto">
                    {edu.startYear} - {edu.endYear}
                  </span>
                </div>
                <p className="text-sm font-bold text-purple-400">{edu.degree} in {edu.fieldOfStudy} {edu.gpa && `• GPA: ${edu.gpa}`}</p>
                {edu.coursework && <p className="text-xs text-slate-300 pt-1"><strong className="text-white">Coursework:</strong> {edu.coursework}</p>}
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 3: EXPERIENCE */}
        <section id="experience" className="bg-[#0f0d1f] border border-purple-900/40 p-8 sm:p-10 rounded-3xl space-y-6">
          <div className="flex items-center gap-3 border-b border-purple-900/40 pb-4">
            <div className="w-10 h-10 rounded-xl bg-purple-950 text-purple-400 flex items-center justify-center font-bold">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-white">Work & Leadership Experience</h2>
              <p className="text-xs text-slate-400">Position, company, and achievement highlights</p>
            </div>
          </div>

          <div className="space-y-6">
            {experience.map((exp) => (
              <div key={exp.id} className="p-6 rounded-2xl bg-purple-950/20 border border-purple-900/40 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <h3 className="text-lg font-black text-white">{exp.role}</h3>
                  <span className="text-xs font-mono font-bold text-purple-300 bg-purple-900/40 px-3 py-1 rounded-full border border-purple-800/40 self-start sm:self-auto">
                    {exp.startDate} - {exp.endDate}
                  </span>
                </div>
                <p className="text-xs font-bold text-purple-400">{exp.company} {exp.location && `• ${exp.location}`}</p>
                <ul className="space-y-1.5 pt-1 text-xs text-slate-300">
                  {exp.description.map((bullet, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-purple-400 font-bold">•</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 4: PROJECTS */}
        <section id="projects" className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl sm:text-4xl font-black text-white">Technical Projects</h2>
            
            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-bold">
              {['All', 'Web', 'Infrastructure', 'UI/UX'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2 rounded-full transition-all ${
                    activeCategory === cat
                      ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                      : 'bg-[#0f0d1f] text-slate-400 hover:text-white border border-purple-900/30'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredProjects.map((proj) => (
              <div key={proj.id} className="bg-[#0f0d1f] rounded-3xl border border-purple-900/40 p-6 space-y-4 flex flex-col justify-between hover:border-purple-500 transition-all">
                <div className="space-y-3">
                  <div className="w-full h-44 rounded-2xl bg-purple-950/40 overflow-hidden border border-purple-900/30">
                    {proj.image ? (
                      <img src={proj.image} alt={proj.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-purple-400 font-bold">
                        {proj.title}
                      </div>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-white">{proj.title}</h3>
                  <p className="text-slate-400 text-xs leading-relaxed">{proj.description}</p>
                  
                  <div className="flex flex-wrap gap-1 pt-1">
                    {proj.technologies.map((tech, i) => (
                      <span key={i} className="text-[10px] bg-purple-950 text-purple-300 border border-purple-800/40 px-2.5 py-0.5 rounded-md font-mono">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-purple-900/40 flex items-center justify-between text-xs font-bold">
                  {proj.githubUrl && (
                    <a href={proj.githubUrl} target="_blank" rel="noreferrer" className="text-purple-400 hover:underline">
                      GitHub Repo
                    </a>
                  )}
                  {proj.liveUrl && (
                    <a href={proj.liveUrl} target="_blank" rel="noreferrer" className="text-white hover:text-purple-300 flex items-center gap-1 ml-auto">
                      Live Preview <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 5: SKILLS */}
        <section id="skills" className="bg-[#0f0d1f] border border-purple-900/40 p-8 sm:p-10 rounded-3xl space-y-6">
          <div className="flex items-center gap-3 border-b border-purple-900/40 pb-4">
            <div className="w-10 h-10 rounded-xl bg-purple-950 text-purple-400 flex items-center justify-center font-bold">
              <Wand2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-black text-white">Skills Matrix</h2>
              <p className="text-xs text-slate-400">Technical languages, frameworks, developer tools, and soft skills</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs">
            <div className="space-y-2">
              <strong className="text-purple-400 font-extrabold block uppercase tracking-wider text-[11px]">Languages</strong>
              <div className="flex flex-wrap gap-1.5">
                {skills.languages.map((s, i) => (
                  <span key={i} className="bg-purple-950/40 text-slate-200 px-2.5 py-1 rounded-lg border border-purple-800/40">{s}</span>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <strong className="text-purple-400 font-extrabold block uppercase tracking-wider text-[11px]">Frameworks</strong>
              <div className="flex flex-wrap gap-1.5">
                {skills.frameworks.map((s, i) => (
                  <span key={i} className="bg-purple-950/40 text-slate-200 px-2.5 py-1 rounded-lg border border-purple-800/40">{s}</span>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <strong className="text-purple-400 font-extrabold block uppercase tracking-wider text-[11px]">Tools</strong>
              <div className="flex flex-wrap gap-1.5">
                {skills.tools.map((s, i) => (
                  <span key={i} className="bg-purple-950/40 text-slate-200 px-2.5 py-1 rounded-lg border border-purple-800/40">{s}</span>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <strong className="text-purple-400 font-extrabold block uppercase tracking-wider text-[11px]">Soft Skills</strong>
              <div className="flex flex-wrap gap-1.5">
                {skills.softSkills.map((s, i) => (
                  <span key={i} className="bg-purple-950/40 text-slate-200 px-2.5 py-1 rounded-lg border border-purple-800/40">{s}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};
