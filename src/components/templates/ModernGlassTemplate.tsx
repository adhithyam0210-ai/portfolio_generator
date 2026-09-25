import React from 'react';
import { PortfolioProfile } from '@/lib/types';
import { 
  Github, 
  Linkedin, 
  Mail, 
  MapPin, 
  ExternalLink, 
  Download, 
  Briefcase, 
  GraduationCap, 
  Code2, 
  Sparkles, 
  Globe, 
  Twitter, 
  CheckCircle2, 
  Layers 
} from 'lucide-react';

interface TemplateProps {
  profile: PortfolioProfile;
  isPublicView?: boolean;
}

export const ModernGlassTemplate: React.FC<TemplateProps> = ({ profile, isPublicView }) => {
  const { personal, education, experience, projects, skills } = profile;

  const resumeDownloadHref = personal.resumeUrl || '/resume';
  const isDirectFile = !!personal.resumeUrl;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-sky-50/50 to-indigo-50/40 text-slate-800 font-sans selection:bg-emerald-500 selection:text-white pb-24 scroll-smooth">
      
      {/* Frosted Glass Sticky Nav */}
      <nav className="sticky top-0 z-40 bg-white/70 backdrop-blur-xl border-b border-white/60 px-4 sm:px-8 py-3.5 shadow-sm">
        <div className="w-full max-w-[1280px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="font-extrabold text-sm sm:text-base text-slate-900 tracking-tight">
              {personal.fullName}
            </span>
          </div>

          <div className="hidden md:flex items-center gap-7 text-xs font-semibold text-slate-600">
            <a href="#about" className="hover:text-emerald-600 transition-colors">About</a>
            <a href="#skills" className="hover:text-emerald-600 transition-colors">Skills</a>
            <a href="#projects" className="hover:text-emerald-600 transition-colors">Projects</a>
            <a href="#experience" className="hover:text-emerald-600 transition-colors">Experience</a>
            <a href="#contact" className="hover:text-emerald-600 transition-colors">Contact</a>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={resumeDownloadHref}
              download={isDirectFile ? (personal.resumeFileName || `${personal.fullName.replace(/\s+/g, '_')}_Resume.pdf`) : undefined}
              target={isDirectFile ? undefined : '_blank'}
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-emerald-600 text-white text-xs font-bold transition-all shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download CV</span>
            </a>
          </div>
        </div>
      </nav>

      <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-8 pt-8 space-y-12">
        
        {/* HERO SECTION - MODERN GLASS CARD (Matching Image 2) */}
        <section id="about" className="pt-2">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-white/80 p-6 sm:p-10 shadow-xl shadow-slate-200/50 relative overflow-hidden">
            
            <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
              
              {/* Profile Avatar Frame */}
              <div className="shrink-0">
                <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl overflow-hidden border-2 border-white shadow-lg ring-4 ring-emerald-500/10 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                  {personal.avatarUrl ? (
                    <img
                      src={personal.avatarUrl}
                      alt={personal.fullName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-slate-100 text-slate-400">
                      <span className="text-3xl font-black text-emerald-600">
                        {personal.fullName.slice(0, 2).toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Bio & Details */}
              <div className="space-y-3.5 flex-1">
                
                {/* Meta Pills */}
                <div className="flex flex-wrap items-center gap-2.5 text-xs">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/70 text-emerald-700 font-semibold">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Available for Opportunities
                  </span>
                  
                  {personal.location && (
                    <>
                      <span className="text-slate-300 hidden sm:inline">|</span>
                      <span className="inline-flex items-center gap-1 text-slate-500 font-medium">
                        <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                        {personal.location}
                      </span>
                    </>
                  )}
                </div>

                {/* Name & Target Role */}
                <div>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
                    {personal.fullName}
                  </h1>
                  <p className="text-base sm:text-lg font-bold text-emerald-600 mt-1">
                    {personal.targetRole || personal.headline || 'Full-Stack Systems Engineer'}
                  </p>
                </div>

                {/* Bio paragraph */}
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl font-normal">
                  {personal.bio || personal.headline}
                </p>

                {/* Action Buttons Row */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  {personal.email && (
                    <a
                      href={`mailto:${personal.email}`}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold transition-all shadow-md shadow-emerald-600/20"
                    >
                      <Mail className="w-4 h-4" />
                      Contact Me (Gmail)
                    </a>
                  )}

                  <a
                    href={resumeDownloadHref}
                    download={isDirectFile ? (personal.resumeFileName || `${personal.fullName.replace(/\s+/g, '_')}_Resume.pdf`) : undefined}
                    target={isDirectFile ? undefined : '_blank'}
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 text-xs sm:text-sm font-bold transition-all"
                  >
                    <Download className="w-4 h-4 text-slate-600" />
                    Download CV
                  </a>

                  {/* Social Buttons */}
                  <div className="flex items-center gap-2">
                    {personal.githubUrl && (
                      <a
                        href={personal.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 flex items-center justify-center text-slate-700 transition-colors"
                        title="GitHub"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    {personal.linkedinUrl && (
                      <a
                        href={personal.linkedinUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 flex items-center justify-center text-slate-700 transition-colors"
                        title="LinkedIn"
                      >
                        <Linkedin className="w-4 h-4" />
                      </a>
                    )}
                    {personal.portfolioUrl && (
                      <a
                        href={personal.portfolioUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 flex items-center justify-center text-slate-700 transition-colors"
                        title="Website"
                      >
                        <Globe className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>

              </div>

            </div>

          </div>
        </section>

        {/* SECTION 2: SKILLS & PROFICIENCIES */}
        <section id="skills" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
              <Code2 className="w-5 h-5 text-emerald-600" />
              Skills & Technical Stack
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/80 backdrop-blur-xl p-6 rounded-3xl border border-white/80 shadow-md space-y-3">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                Languages
              </span>
              <div className="flex flex-wrap gap-2">
                {skills.languages.map((l, i) => (
                  <span key={i} className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold">
                    {l}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-xl p-6 rounded-3xl border border-white/80 shadow-md space-y-3">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                Frameworks & Libraries
              </span>
              <div className="flex flex-wrap gap-2">
                {skills.frameworks.map((f, i) => (
                  <span key={i} className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200/50 text-xs font-semibold">
                    {f}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-xl p-6 rounded-3xl border border-white/80 shadow-md space-y-3">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                Tools & Platforms
              </span>
              <div className="flex flex-wrap gap-2">
                {skills.tools.map((t, i) => (
                  <span key={i} className="px-3 py-1.5 rounded-xl bg-sky-50 text-sky-800 border border-sky-200/50 text-xs font-semibold">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: FEATURED PROJECTS */}
        <section id="projects" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
              <Layers className="w-5 h-5 text-emerald-600" />
              Featured Projects
            </h2>
            <span className="text-xs font-semibold text-slate-500">{projects.length} Works</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((proj) => (
              <div
                key={proj.id}
                className="bg-white/80 backdrop-blur-xl rounded-3xl border border-white/80 p-6 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
                      {proj.category || 'Engineering'}
                    </span>
                    {proj.featured && (
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 border border-amber-200">
                        Featured
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                    {proj.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    {proj.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {proj.technologies.map((tech, i) => (
                      <span key={i} className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-medium">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-5 mt-4 border-t border-slate-100">
                  {proj.githubUrl && (
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 text-center py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors"
                    >
                      Source Code
                    </a>
                  )}
                  {proj.liveUrl && (
                    <a
                      href={proj.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 text-center py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors"
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
        <section id="experience" className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-emerald-600" />
            Experience & Education
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Experience */}
            <div className="bg-white/80 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-white/80 shadow-md space-y-6">
              <h3 className="text-base font-bold text-slate-900">Work Experience</h3>
              <div className="space-y-5">
                {experience.map((exp) => (
                  <div key={exp.id} className="border-l-2 border-emerald-500 pl-4 space-y-1">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-sm text-slate-900">{exp.role}</span>
                      <span className="text-slate-500 font-medium">{exp.startDate} – {exp.endDate}</span>
                    </div>
                    <p className="text-xs font-semibold text-emerald-700">{exp.company} {exp.location ? `• ${exp.location}` : ''}</p>
                    <ul className="list-disc list-inside text-xs text-slate-600 space-y-1 pt-1 font-normal">
                      {exp.description.map((bullet, i) => (
                        <li key={i}>{bullet}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="bg-white/80 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-white/80 shadow-md space-y-6">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-emerald-600" />
                Academic Degrees
              </h3>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-sm text-slate-900">{edu.institution}</span>
                      <span className="text-slate-500 font-medium">{edu.startYear} – {edu.endYear}</span>
                    </div>
                    <p className="text-xs text-emerald-700 font-semibold">{edu.degree} in {edu.fieldOfStudy} {edu.gpa ? `(GPA: ${edu.gpa})` : ''}</p>
                    {edu.coursework && <p className="text-xs text-slate-600 font-normal">Coursework: {edu.coursework}</p>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: CONTACT */}
        <section id="contact" className="pt-4">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-white/80 p-8 sm:p-14 text-center space-y-5 shadow-xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              Open to Opportunities
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
              Let's Build Something Exceptional
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm max-w-xl mx-auto font-normal">
              Have an open technical role, engineering project, or want to discuss collaboration? Get in touch today.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
              {personal.email && (
                <a
                  href={`mailto:${personal.email}`}
                  className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold transition-all shadow-md shadow-emerald-600/20"
                >
                  Send Email ({personal.email})
                </a>
              )}
              {personal.linkedinUrl && (
                <a
                  href={personal.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 text-xs sm:text-sm font-bold transition-colors"
                >
                  LinkedIn Profile
                </a>
              )}
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};
