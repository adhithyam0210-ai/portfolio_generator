import React from 'react';
import { PortfolioProfile } from '@/lib/types';
import { 
  Github, 
  Linkedin, 
  Mail, 
  MapPin, 
  ExternalLink, 
  Terminal, 
  Code2, 
  Database, 
  Server, 
  GitBranch, 
  Cpu, 
  Download,
  Briefcase,
  GraduationCap,
  User,
  ArrowUpRight
} from 'lucide-react';

interface TemplateProps {
  profile: PortfolioProfile;
  isPublicView?: boolean;
}

export const FullStackDeveloperTemplate: React.FC<TemplateProps> = ({ profile, isPublicView }) => {
  const { personal, education, experience, projects, skills } = profile;

  return (
    <div className="bg-[#0B132B] text-slate-100 min-h-screen font-sans selection:bg-[#3A86EF] selection:text-white pb-24 scroll-smooth">
      
      {/* Terminal Top Status Bar */}
      <nav className="bg-[#070D1E] border-b border-[#1C2541] px-4 sm:px-8 py-3 sticky top-0 z-50 shadow-sm backdrop-blur-md">
        <div className="w-full max-w-[1500px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-rose-500 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-amber-400 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span>
            </div>
            <a href="#bio" className="text-slate-300 font-mono text-xs sm:text-sm font-bold hover:text-[#3A86EF] transition-colors">
              {personal.fullName} <span className="text-slate-500 font-normal hidden sm:inline-block">~/fullstack.config.ts</span>
            </a>
          </div>

          <div className="hidden md:flex items-center gap-6 text-xs font-mono font-medium text-slate-400">
            <a href="#bio" className="hover:text-[#3A86EF] transition-colors">01.hero()</a>
            <a href="#skills" className="hover:text-[#3A86EF] transition-colors">02.stack()</a>
            <a href="#projects" className="hover:text-[#3A86EF] transition-colors">03.projects()</a>
            <a href="#experience" className="hover:text-[#3A86EF] transition-colors">04.experience()</a>
            <a href="#contact" className="hover:text-[#3A86EF] transition-colors">05.contact()</a>
          </div>

            <a 
              href={personal.resumeUrl || "/resume"} 
              download={personal.resumeUrl ? (personal.resumeFileName || `${personal.fullName.replace(/\s+/g, '_')}_Resume.pdf`) : undefined}
              target={personal.resumeUrl ? undefined : "_blank"} 
              className="px-3.5 py-1.5 rounded-lg bg-[#3A86EF] text-white font-mono text-xs font-bold hover:bg-blue-600 transition-colors shadow-sm inline-flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Resume.pdf</span>
            </a>
        </div>
      </nav>

      <div className="w-full max-w-[1500px] mx-auto px-4 sm:px-8 lg:px-12 pt-8 sm:pt-12 space-y-20 sm:space-y-24">
        
        {/* SECTION 1: HERO / BIO (Aligned 12-Column Responsive Grid) */}
        <section id="bio">
          <div className="bg-[#1C2541]/75 backdrop-blur-md rounded-3xl border border-[#3A86EF]/30 p-6 sm:p-10 lg:p-12 shadow-2xl relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Left Column: Bio & Commands (8 cols) */}
              <div className="lg:col-span-8 space-y-6 text-left">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#0B132B] border border-[#3A86EF]/40 font-mono text-xs text-[#3A86EF]">
                  <Terminal className="w-3.5 h-3.5 text-amber-400" />
                  <span>role --target="{personal.targetRole || 'Full Stack Engineer'}"</span>
                </div>

                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.12]">
                  Hi, I'm <span className="text-[#3A86EF]">{personal.fullName}</span>
                </h1>

                <p className="text-amber-400 font-mono text-sm sm:text-base font-semibold">
                  &gt; {personal.headline}
                </p>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-normal max-w-3xl">
                  {personal.bio}
                </p>

                {/* Location & Email */}
                <div className="flex flex-wrap items-center gap-3 pt-1 font-mono text-xs text-slate-300">
                  {personal.location && (
                    <span className="flex items-center gap-1.5 bg-[#0B132B] px-3.5 py-1.5 rounded-lg border border-[#1C2541]">
                      <MapPin className="w-3.5 h-3.5 text-[#3A86EF]" />
                      {personal.location}
                    </span>
                  )}
                  {personal.email && (
                    <a href={`mailto:${personal.email}`} className="flex items-center gap-1.5 bg-[#0B132B] hover:bg-[#070D1E] px-3.5 py-1.5 rounded-lg border border-[#1C2541] text-amber-400 transition-colors">
                      <Mail className="w-3.5 h-3.5" />
                      {personal.email}
                    </a>
                  )}
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  {personal.githubUrl && (
                    <a
                      href={personal.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#3A86EF] hover:bg-blue-600 text-white text-xs font-bold font-mono transition-all shadow-lg shadow-blue-500/20"
                    >
                      <Github className="w-4 h-4" />
                      git clone profile
                    </a>
                  )}
                  {personal.linkedinUrl && (
                    <a
                      href={personal.linkedinUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0B132B] hover:bg-[#070D1E] text-slate-200 border border-[#3A86EF]/40 text-xs font-bold font-mono transition-colors"
                    >
                      <Linkedin className="w-4 h-4 text-[#3A86EF]" />
                      LinkedIn Network
                    </a>
                  )}
                </div>
              </div>

              {/* Right Column: Profile Picture Card (4 cols) */}
              <div className="lg:col-span-4 flex flex-col items-center justify-center">
                <div className="relative group">
                  <div className="w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 rounded-3xl overflow-hidden border-2 border-[#3A86EF]/70 shadow-[0_0_35px_rgba(58,134,239,0.25)] bg-[#070D1E] p-1.5 flex items-center justify-center">
                    {personal.avatarUrl ? (
                      <img 
                        src={personal.avatarUrl} 
                        alt={personal.fullName}
                        className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center rounded-2xl bg-[#0B132B] text-slate-400 font-mono">
                        <Code2 className="w-16 h-16 text-[#3A86EF] mb-1" />
                        <span className="text-xs font-bold">DEV_PORTRAIT</span>
                      </div>
                    )}
                  </div>

                  {/* Terminal Status Pill */}
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-[#070D1E] border border-[#3A86EF]/50 px-3.5 py-1 rounded-full shadow-lg text-[11px] font-mono text-emerald-400 whitespace-nowrap flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    status: ready_to_deploy
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* SECTION 2: SKILLS / TECH STACK */}
        <section id="skills" className="space-y-6">
          <div className="flex items-end justify-between border-b border-[#1C2541] pb-4">
            <div className="space-y-1">
              <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider">&gt; stack.config.json</span>
              <h2 className="text-2xl sm:text-3xl font-black text-white">Full Stack Technology Matrix</h2>
            </div>
            <span className="text-xs font-mono text-[#3A86EF] bg-[#070D1E] px-3 py-1 rounded border border-[#1C2541] hidden sm:inline-block">
              status: active
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#1C2541]/60 p-6 rounded-2xl border border-[#1C2541] space-y-4">
              <div className="flex items-center gap-2 text-[#3A86EF] font-mono text-sm font-bold">
                <Code2 className="w-4 h-4" />
                <span>Languages</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.languages.map((lang, i) => (
                  <span key={i} className="text-xs font-mono bg-[#0B132B] border border-[#3A86EF]/40 text-slate-200 px-3 py-1.5 rounded-lg">
                    {lang}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-[#1C2541]/60 p-6 rounded-2xl border border-[#1C2541] space-y-4">
              <div className="flex items-center gap-2 text-amber-400 font-mono text-sm font-bold">
                <Server className="w-4 h-4" />
                <span>Frameworks & Runtimes</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.frameworks.map((fw, i) => (
                  <span key={i} className="text-xs font-mono bg-[#0B132B] border border-amber-400/40 text-slate-200 px-3 py-1.5 rounded-lg">
                    {fw}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-[#1C2541]/60 p-6 rounded-2xl border border-[#1C2541] space-y-4">
              <div className="flex items-center gap-2 text-emerald-400 font-mono text-sm font-bold">
                <Database className="w-4 h-4" />
                <span>Tools & Infrastructure</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.tools.map((tl, i) => (
                  <span key={i} className="text-xs font-mono bg-[#0B132B] border border-emerald-400/40 text-slate-200 px-3 py-1.5 rounded-lg">
                    {tl}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: FEATURED PROJECTS */}
        <section id="projects" className="space-y-6">
          <div className="flex items-end justify-between border-b border-[#1C2541] pb-4">
            <div className="space-y-1">
              <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider">&gt; repositories.git</span>
              <h2 className="text-2xl sm:text-3xl font-black text-white">Full Stack Applications</h2>
            </div>
            <span className="text-xs font-mono text-slate-400">{projects.length} Repositories</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((proj, idx) => (
              <div 
                key={proj.id}
                className="bg-[#1C2541]/60 rounded-2xl border border-[#1C2541] hover:border-[#3A86EF]/70 p-6 space-y-4 flex flex-col justify-between transition-all duration-200 group shadow-lg"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between font-mono text-xs">
                    <span className="text-amber-400">repo_0{idx + 1}.ts</span>
                    {proj.featured && (
                      <span className="text-[#3A86EF] bg-[#3A86EF]/10 px-2 py-0.5 rounded border border-[#3A86EF]/30 text-[10px]">
                        ★ featured
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-[#3A86EF] transition-colors">{proj.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans font-normal">{proj.description}</p>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {proj.technologies.map((tech, i) => (
                      <span key={i} className="text-[10px] font-mono bg-[#0B132B] text-slate-300 border border-slate-700 px-2 py-0.5 rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-[#1C2541] font-mono">
                  {proj.githubUrl && (
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 text-center py-2.5 rounded-lg bg-[#0B132B] hover:bg-[#070D1E] text-slate-200 border border-slate-700 text-xs font-semibold transition-colors"
                    >
                      Source Code
                    </a>
                  )}
                  {proj.liveUrl && (
                    <a
                      href={proj.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 text-center py-2.5 rounded-lg bg-[#3A86EF] hover:bg-blue-600 text-white text-xs font-bold transition-colors"
                    >
                      Live Demo ↗
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 4: EXPERIENCE & EDUCATION */}
        <section id="experience" className="space-y-6">
          <div className="border-b border-[#1C2541] pb-4">
            <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider">&gt; career_trace.log</span>
            <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">Experience & Academic Background</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-[#1C2541]/60 p-6 sm:p-8 rounded-2xl border border-[#1C2541] space-y-6">
              <h3 className="text-lg font-bold text-white flex items-center gap-2 font-mono">
                <Briefcase className="w-5 h-5 text-[#3A86EF]" />
                Work Log
              </h3>

              <div className="space-y-6">
                {experience.map((exp) => (
                  <div key={exp.id} className="border-l-2 border-[#3A86EF] pl-4 space-y-1.5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 font-mono">
                      <span className="font-bold text-sm text-white">{exp.role}</span>
                      <span className="text-xs text-amber-400 bg-[#0B132B] px-2 py-0.5 rounded border border-[#1C2541] w-fit">
                        {exp.startDate} – {exp.endDate}
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-[#3A86EF]">{exp.company} {exp.location ? `• ${exp.location}` : ''}</p>
                    <ul className="list-disc list-inside text-xs text-slate-300 space-y-1 pt-1 font-sans font-normal">
                      {exp.description.map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#1C2541]/60 p-6 sm:p-8 rounded-2xl border border-[#1C2541] space-y-6">
              <h3 className="text-lg font-bold text-white flex items-center gap-2 font-mono">
                <GraduationCap className="w-5 h-5 text-amber-400" />
                Academic Degrees
              </h3>

              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id} className="p-4 rounded-xl bg-[#0B132B] border border-[#1C2541] space-y-1">
                    <div className="flex justify-between items-center font-mono text-xs">
                      <span className="font-bold text-sm text-white">{edu.institution}</span>
                      <span className="text-slate-400">{edu.startYear} – {edu.endYear}</span>
                    </div>
                    <p className="text-xs text-[#3A86EF] font-semibold">{edu.degree} in {edu.fieldOfStudy} {edu.gpa ? `(GPA: ${edu.gpa})` : ''}</p>
                    {edu.coursework && <p className="text-xs text-slate-400 font-sans font-normal">Coursework: {edu.coursework}</p>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: CONTACT */}
        <section id="contact" className="pt-4 font-mono">
          <div className="bg-[#070D1E] rounded-3xl border border-[#3A86EF]/40 p-8 sm:p-14 text-center space-y-5">
            <span className="text-xs text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-800">
              connection: established
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white font-sans">
              Initialize New Engineering Inquiry
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm font-sans max-w-xl mx-auto font-normal leading-relaxed">
              Looking for a full stack engineer proficient in modern frameworks, APIs, and scalable architectures? Reach out directly.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
              {personal.email && (
                <a
                  href={`mailto:${personal.email}`}
                  className="px-6 py-3 rounded-xl bg-[#3A86EF] hover:bg-blue-600 text-white text-xs font-bold transition-all shadow-lg shadow-blue-500/25"
                >
                  mail -s "Project Discussion" {personal.email}
                </a>
              )}
              {personal.linkedinUrl && (
                <a
                  href={personal.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-3 rounded-xl bg-[#1C2541] hover:bg-[#151c30] text-slate-200 border border-[#3A86EF]/40 text-xs font-bold transition-colors"
                >
                  open linkedin profile
                </a>
              )}
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};
