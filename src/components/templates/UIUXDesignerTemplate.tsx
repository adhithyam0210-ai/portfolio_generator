import React from 'react';
import { PortfolioProfile } from '@/lib/types';
import { 
  Github, 
  Linkedin, 
  Mail, 
  MapPin, 
  ExternalLink, 
  Palette, 
  Layers, 
  Briefcase, 
  GraduationCap, 
  ArrowUpRight, 
  Sparkles,
  Download,
  CheckCircle2,
  User
} from 'lucide-react';

interface TemplateProps {
  profile: PortfolioProfile;
  isPublicView?: boolean;
}

export const UIUXDesignerTemplate: React.FC<TemplateProps> = ({ profile, isPublicView }) => {
  const { personal, education, experience, projects, skills } = profile;

  return (
    <div className="bg-[#FAF9F6] text-slate-800 min-h-screen font-sans selection:bg-[#FF6B6B] selection:text-white pb-24 scroll-smooth">
      
      {/* Sticky Clean Sub-nav */}
      <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200 px-4 sm:px-8 py-3.5 transition-all shadow-sm">
        <div className="w-full max-w-[1500px] mx-auto flex items-center justify-between">
          <a href="#bio" className="flex items-center gap-2.5 group">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF6B6B] animate-pulse"></span>
            <span className="font-extrabold text-sm tracking-tight text-slate-900 group-hover:text-[#FF6B6B] transition-colors">
              {personal.fullName}
            </span>
            <span className="hidden md:inline-block text-xs font-semibold text-slate-400">
              / UI•UX Case Studies
            </span>
          </a>
          <div className="hidden md:flex items-center gap-6 text-xs font-bold text-slate-600">
            <a href="#bio" className="hover:text-[#FF6B6B] transition-colors">About</a>
            <a href="#skills" className="hover:text-[#FF6B6B] transition-colors">Design Tooling</a>
            <a href="#projects" className="hover:text-[#FF6B6B] transition-colors">Case Studies</a>
            <a href="#experience" className="hover:text-[#FF6B6B] transition-colors">Experience</a>
            <a href="#contact" className="hover:text-[#FF6B6B] transition-colors">Contact</a>
          </div>
            <a 
              href={personal.resumeUrl || "/resume"} 
              download={personal.resumeUrl ? (personal.resumeFileName || `${personal.fullName.replace(/\s+/g, '_')}_Resume.pdf`) : undefined}
              target={personal.resumeUrl ? undefined : "_blank"} 
              className="text-xs font-extrabold px-4 py-2 rounded-full bg-slate-900 text-white hover:bg-[#FF6B6B] transition-all shadow-sm inline-flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download CV</span>
            </a>
        </div>
      </nav>

      <div className="w-full max-w-[1500px] mx-auto px-4 sm:px-8 lg:px-12 pt-8 sm:pt-12 space-y-20 sm:space-y-24">
        
        {/* SECTION 1: HERO / BIO (Aligned 12-Column Responsive Grid) */}
        <section id="bio">
          <div className="bg-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-slate-200/90 shadow-sm relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Left Column: Text & Content (8 cols) */}
              <div className="lg:col-span-8 space-y-6 text-left">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-50 border border-rose-200/80 text-[#FF6B6B] text-xs font-bold">
                  <Palette className="w-3.5 h-3.5 text-[#FF6B6B]" />
                  <span>{personal.targetRole || 'UI/UX Product Designer'}</span>
                </div>

                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.12]">
                  Crafting intuitive, accessible <span className="text-[#FF6B6B]">user experiences</span> & digital products.
                </h1>

                <p className="text-base sm:text-lg font-bold text-slate-700 leading-snug">
                  {personal.headline}
                </p>

                <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal max-w-3xl">
                  {personal.bio}
                </p>

                {/* Location & Email Badges */}
                <div className="flex flex-wrap items-center gap-3 pt-1 text-xs font-semibold text-slate-600">
                  {personal.location && (
                    <span className="inline-flex items-center gap-1.5 bg-slate-100 px-3.5 py-1.5 rounded-full border border-slate-200">
                      <MapPin className="w-3.5 h-3.5 text-[#FF6B6B]" />
                      {personal.location}
                    </span>
                  )}
                  {personal.email && (
                    <a href={`mailto:${personal.email}`} className="inline-flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 px-3.5 py-1.5 rounded-full border border-slate-200 transition-colors">
                      <Mail className="w-3.5 h-3.5 text-[#FF6B6B]" />
                      {personal.email}
                    </a>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  {personal.linkedinUrl && (
                    <a
                      href={personal.linkedinUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900 hover:bg-[#FF6B6B] text-white text-xs font-bold transition-all shadow-md"
                    >
                      <Linkedin className="w-4 h-4" />
                      LinkedIn Profile
                    </a>
                  )}
                  {personal.githubUrl && (
                    <a
                      href={personal.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all border border-slate-300"
                    >
                      <Github className="w-4 h-4" />
                      GitHub / Work
                    </a>
                  )}
                </div>
              </div>

              {/* Right Column: Profile Picture Card (4 cols) */}
              <div className="lg:col-span-4 flex flex-col items-center justify-center">
                <div className="relative group">
                  {/* Subtle Gradient Glow Ring */}
                  <div className="w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 rounded-3xl overflow-hidden border-4 border-white shadow-xl ring-8 ring-rose-50 bg-slate-100 flex items-center justify-center">
                    {personal.avatarUrl ? (
                      <img 
                        src={personal.avatarUrl} 
                        alt={personal.fullName}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-rose-50/60 text-[#FF6B6B]">
                        <User className="w-16 h-16 mb-1 opacity-70" />
                        <span className="text-xs font-bold uppercase tracking-wider">UI/UX Designer</span>
                      </div>
                    )}
                  </div>

                  {/* Clean Status Pill */}
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-white border border-slate-200 px-3.5 py-1 rounded-full shadow-md text-[11px] font-bold text-slate-700 whitespace-nowrap flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    Available for Projects
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* SECTION 2: SKILLS / DESIGN TOOLING */}
        <section id="skills" className="space-y-6">
          <div className="border-b border-slate-200 pb-4 flex items-end justify-between">
            <div className="space-y-1">
              <span className="text-xs font-black tracking-widest text-[#FF6B6B] uppercase">Design Stack & Tooling</span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Core Competencies & Workflows</h2>
            </div>
            <span className="text-xs font-semibold text-slate-400 hidden sm:inline-block">Validated Student Toolset</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-4">
              <div className="w-10 h-10 rounded-2xl bg-rose-50 flex items-center justify-center text-[#FF6B6B]">
                <Palette className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-base text-slate-900">UI / Visual & Systems</h3>
              <div className="flex flex-wrap gap-2">
                {skills.frameworks.map((tool, i) => (
                  <span key={i} className="text-xs font-bold bg-slate-50 text-slate-800 border border-slate-200 px-3 py-1.5 rounded-xl">
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-4">
              <div className="w-10 h-10 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-800">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-base text-slate-900">Tools & Hand-off</h3>
              <div className="flex flex-wrap gap-2">
                {skills.tools.map((tool, i) => (
                  <span key={i} className="text-xs font-bold bg-slate-50 text-slate-800 border border-slate-200 px-3 py-1.5 rounded-xl">
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-4">
              <div className="w-10 h-10 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-base text-slate-900">Technical Foundations</h3>
              <div className="flex flex-wrap gap-2">
                {skills.languages.map((lang, i) => (
                  <span key={i} className="text-xs font-bold bg-slate-50 text-slate-800 border border-slate-200 px-3 py-1.5 rounded-xl">
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: FEATURED CASE STUDIES / PROJECTS */}
        <section id="projects" className="space-y-6">
          <div className="border-b border-slate-200 pb-4 flex items-end justify-between">
            <div className="space-y-1">
              <span className="text-xs font-black tracking-widest text-[#FF6B6B] uppercase">Portfolio Grid</span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Featured Case Studies & Work</h2>
            </div>
            <span className="text-xs font-bold text-slate-500">{projects.length} Case Studies</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((proj, idx) => (
              <div 
                key={proj.id}
                className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
              >
                {/* Visual Thumbnail Block */}
                <div className="h-44 bg-gradient-to-tr from-slate-100 via-rose-50/40 to-slate-50 p-6 flex flex-col justify-between border-b border-slate-100">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black uppercase tracking-wider bg-white text-[#FF6B6B] border border-rose-200 px-2.5 py-1 rounded-full shadow-sm">
                      {proj.category || 'CASE STUDY'}
                    </span>
                    <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-[#FF6B6B] transition-colors" />
                  </div>
                  <div>
                    <span className="text-xs font-mono font-bold text-slate-400">0{idx + 1} //</span>
                    <h3 className="text-lg font-black text-slate-900 group-hover:text-[#FF6B6B] transition-colors line-clamp-1">{proj.title}</h3>
                  </div>
                </div>

                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">{proj.description}</p>

                  <div className="space-y-4 pt-2">
                    <div className="flex flex-wrap gap-1.5">
                      {proj.technologies.map((tech, i) => (
                        <span key={i} className="text-[10px] font-semibold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                      {proj.liveUrl && (
                        <a
                          href={proj.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="flex-1 text-center py-2.5 rounded-xl bg-slate-900 hover:bg-[#FF6B6B] text-white text-xs font-bold transition-colors shadow-sm"
                        >
                          View Prototype ↗
                        </a>
                      )}
                      {proj.githubUrl && (
                        <a
                          href={proj.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="flex-1 text-center py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors"
                        >
                          Design Assets
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 4: EXPERIENCE & EDUCATION */}
        <section id="experience" className="space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <span className="text-xs font-black tracking-widest text-[#FF6B6B] uppercase">Career Milestones</span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">Experience & Education</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-sm space-y-6">
              <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-[#FF6B6B]" />
                Design Experience
              </h3>

              <div className="space-y-6">
                {experience.map((exp) => (
                  <div key={exp.id} className="relative pl-6 border-l-2 border-slate-200 space-y-1.5">
                    <span className="absolute -left-[7px] top-1.5 w-3 h-3 rounded-full bg-[#FF6B6B] ring-4 ring-rose-100"></span>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <span className="font-extrabold text-sm text-slate-900">{exp.role}</span>
                      <span className="text-xs font-mono text-slate-500">{exp.startDate} – {exp.endDate}</span>
                    </div>
                    <p className="text-xs font-bold text-[#FF6B6B]">{exp.company} {exp.location ? `• ${exp.location}` : ''}</p>
                    <ul className="list-disc list-inside text-xs text-slate-600 space-y-1 font-normal pt-1">
                      {exp.description.map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-sm space-y-6">
              <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-[#FF6B6B]" />
                Academic Background
              </h3>

              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id} className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-sm text-slate-900">{edu.institution}</span>
                      <span className="text-xs font-mono text-slate-500">{edu.startYear} – {edu.endYear}</span>
                    </div>
                    <p className="text-xs font-semibold text-[#FF6B6B]">{edu.degree} in {edu.fieldOfStudy} {edu.gpa ? `(GPA: ${edu.gpa})` : ''}</p>
                    {edu.coursework && <p className="text-xs text-slate-600 font-normal">Relevant Coursework: {edu.coursework}</p>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: CONTACT */}
        <section id="contact" className="pt-4">
          <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-14 shadow-xl text-center space-y-6 border border-slate-800">
            <span className="text-xs font-extrabold text-[#FF6B6B] uppercase tracking-widest bg-rose-950/60 px-3.5 py-1 rounded-full border border-rose-800/80 inline-block">
              Let's Connect
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight">
              Interested in collaborating on a design project?
            </h2>
            <p className="text-slate-300 text-sm max-w-xl mx-auto font-normal leading-relaxed">
              Feel free to reach out directly via email or connect on LinkedIn to discuss UI/UX, product design, or frontend opportunities.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              {personal.email && (
                <a
                  href={`mailto:${personal.email}`}
                  className="px-7 py-3.5 rounded-full bg-[#FF6B6B] hover:bg-[#ff5252] text-white text-xs font-black shadow-lg transition-transform hover:scale-105"
                >
                  Send Email ({personal.email})
                </a>
              )}
              {personal.linkedinUrl && (
                <a
                  href={personal.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-7 py-3.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold transition-colors"
                >
                  Connect on LinkedIn
                </a>
              )}
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};
