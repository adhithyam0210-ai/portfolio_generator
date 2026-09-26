import React from 'react';
import { PortfolioProfile } from '@/lib/types';
import { 
  Github, 
  Linkedin, 
  Mail, 
  MapPin, 
  ExternalLink, 
  BrainCircuit, 
  Binary, 
  FileText, 
  Sparkles, 
  Microscope, 
  Atom, 
  GraduationCap, 
  Briefcase,
  Download,
  User,
  ArrowUpRight
} from 'lucide-react';

interface TemplateProps {
  profile: PortfolioProfile;
  isPublicView?: boolean;
}

export const AIResearcherTemplate: React.FC<TemplateProps> = ({ profile, isPublicView }) => {
  const { personal, education, experience, projects, skills } = profile;

  return (
    <div className="bg-[#18122B] text-slate-100 min-h-screen font-sans selection:bg-[#D946EF] selection:text-white pb-24 scroll-smooth">
      
      {/* Sticky Neural Top Bar */}
      <nav className="sticky top-0 z-40 bg-[#18122B]/90 backdrop-blur-md border-b border-[#393053] px-4 sm:px-8 py-3.5 shadow-sm">
        <div className="w-full max-w-[1500px] mx-auto flex items-center justify-between">
          <a href="#bio" className="flex items-center gap-2.5 group">
            <BrainCircuit className="w-5 h-5 text-[#06B6D4] animate-pulse" />
            <span className="font-extrabold text-sm tracking-tight text-white group-hover:text-[#D946EF] transition-colors">
              {personal.fullName}
            </span>
          </a>
          <div className="hidden md:flex items-center gap-6 text-xs font-semibold text-purple-200">
            <a href="#bio" className="hover:text-[#D946EF] transition-colors">Lab Focus</a>
            <a href="#skills" className="hover:text-[#D946EF] transition-colors">Neural Stack</a>
            <a href="#research" className="hover:text-[#D946EF] transition-colors">Research Projects</a>
            <a href="#experience" className="hover:text-[#D946EF] transition-colors">Affiliations</a>
            <a href="#contact" className="hover:text-[#D946EF] transition-colors">Collaborate</a>
          </div>
            <a 
              href={personal.resumeUrl || "/resume"} 
              download={personal.resumeUrl ? (personal.resumeFileName || `${personal.fullName.replace(/\s+/g, '_')}_Resume.pdf`) : undefined}
              target={personal.resumeUrl ? undefined : "_blank"} 
              className="text-xs font-bold px-4 py-2 rounded-full bg-gradient-to-r from-[#D946EF] to-[#06B6D4] text-white hover:opacity-90 transition-opacity shadow-sm inline-flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>CV / Resume PDF</span>
            </a>
        </div>
      </nav>

      <div className="w-full max-w-[1500px] mx-auto px-4 sm:px-8 lg:px-12 pt-8 sm:pt-12 space-y-20 sm:space-y-24">
        
        {/* SECTION 1: HERO / BIO (Aligned 12-Column Responsive Grid) */}
        <section id="bio">
          <div className="bg-[#2B2349]/70 backdrop-blur-xl rounded-3xl border border-purple-500/30 p-6 sm:p-10 lg:p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-10 w-96 h-96 bg-fuchsia-600/15 rounded-full blur-3xl pointer-events-none -z-10"></div>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Left Column: Bio & Focus (8 cols) */}
              <div className="lg:col-span-8 space-y-6 text-left">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/80 border border-purple-500/40 text-[#06B6D4] text-xs font-semibold">
                  <Atom className="w-4 h-4 text-[#D946EF]" />
                  <span>{personal.targetRole || 'AI Research Scientist & Engineer'}</span>
                </div>

                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.12]">
                  Investigating <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D946EF] via-purple-300 to-[#06B6D4]">intelligence, models</span> & deep learning systems.
                </h1>

                <p className="text-base sm:text-lg font-bold text-purple-200 leading-snug">
                  {personal.headline}
                </p>

                <p className="text-purple-100/80 text-sm sm:text-base leading-relaxed font-normal max-w-3xl">
                  {personal.bio}
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-1 text-xs font-medium text-purple-200">
                  {personal.location && (
                    <span className="flex items-center gap-1.5 bg-[#18122B] px-3.5 py-1.5 rounded-full border border-purple-900">
                      <MapPin className="w-3.5 h-3.5 text-[#06B6D4]" />
                      {personal.location}
                    </span>
                  )}
                  {personal.email && (
                    <a href={`mailto:${personal.email}`} className="flex items-center gap-1.5 bg-[#18122B] hover:bg-[#393053] px-3.5 py-1.5 rounded-full border border-purple-900 transition-colors">
                      <Mail className="w-3.5 h-3.5 text-[#D946EF]" />
                      {personal.email}
                    </a>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  {personal.githubUrl && (
                    <a
                      href={personal.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D946EF] to-purple-600 hover:from-fuchsia-600 hover:to-purple-700 text-white text-xs font-bold transition-all shadow-lg shadow-purple-500/25"
                    >
                      <Github className="w-4 h-4" />
                      Code & Notebooks
                    </a>
                  )}
                  {personal.linkedinUrl && (
                    <a
                      href={personal.linkedinUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#18122B] hover:bg-[#393053] text-purple-200 border border-purple-500/30 text-xs font-bold transition-colors"
                    >
                      <Linkedin className="w-4 h-4 text-[#06B6D4]" />
                      Academic & Professional Profile
                    </a>
                  )}
                </div>
              </div>

              {/* Right Column: Profile Picture Card (4 cols) */}
              <div className="lg:col-span-4 flex flex-col items-center justify-center">
                <div className="relative group">
                  <div className="w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 rounded-3xl p-1 bg-gradient-to-tr from-[#D946EF] via-purple-600 to-[#06B6D4] shadow-2xl shadow-fuchsia-500/20 flex items-center justify-center">
                    {personal.avatarUrl ? (
                      <img 
                        src={personal.avatarUrl} 
                        alt={personal.fullName}
                        className="w-full h-full object-cover rounded-[22px] group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center rounded-[22px] bg-[#18122B] text-purple-300 font-mono">
                        <BrainCircuit className="w-16 h-16 text-[#D946EF] mb-1" />
                        <span className="text-xs font-bold">NEURAL_AI_LAB</span>
                      </div>
                    )}
                  </div>

                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-[#18122B] border border-purple-500/50 px-3.5 py-1 rounded-full shadow-lg text-[11px] font-mono text-cyan-300 whitespace-nowrap flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                    researcher: active
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* SECTION 2: SKILLS / NEURAL TECH MATRIX */}
        <section id="skills" className="space-y-6">
          <div className="border-b border-purple-900/60 pb-4 flex items-end justify-between">
            <div className="space-y-1">
              <span className="text-xs font-mono text-[#D946EF] font-bold uppercase tracking-wider">// AI COMPUTATIONAL STACK</span>
              <h2 className="text-2xl sm:text-3xl font-black text-white">Research Tooling & Frameworks</h2>
            </div>
            <span className="text-xs text-purple-300 font-mono hidden sm:inline-block">Validated Student Stack</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#2B2349]/60 p-6 rounded-2xl border border-purple-800/60 space-y-4">
              <div className="flex items-center gap-2 text-[#06B6D4] font-bold text-sm">
                <BrainCircuit className="w-4 h-4" />
                <span>Deep Learning & ML</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.frameworks.map((fw, i) => (
                  <span key={i} className="text-xs font-semibold bg-[#18122B] border border-purple-600/40 text-purple-200 px-3 py-1.5 rounded-lg">
                    {fw}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-[#2B2349]/60 p-6 rounded-2xl border border-purple-800/60 space-y-4">
              <div className="flex items-center gap-2 text-[#D946EF] font-bold text-sm">
                <Binary className="w-4 h-4" />
                <span>Languages & Compute</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.languages.map((lang, i) => (
                  <span key={i} className="text-xs font-semibold bg-[#18122B] border border-fuchsia-600/40 text-purple-200 px-3 py-1.5 rounded-lg">
                    {lang}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-[#2B2349]/60 p-6 rounded-2xl border border-purple-800/60 space-y-4">
              <div className="flex items-center gap-2 text-cyan-300 font-bold text-sm">
                <Microscope className="w-4 h-4" />
                <span>Data & Evaluation Tools</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.tools.map((tl, i) => (
                  <span key={i} className="text-xs font-semibold bg-[#18122B] border border-cyan-500/40 text-purple-200 px-3 py-1.5 rounded-lg">
                    {tl}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: RESEARCH PROJECTS */}
        <section id="research" className="space-y-6">
          <div className="border-b border-purple-900/60 pb-4 flex items-end justify-between">
            <div className="space-y-1">
              <span className="text-xs font-mono text-[#D946EF] font-bold uppercase tracking-wider">// PUBLICATIONS & MODELS</span>
              <h2 className="text-2xl sm:text-3xl font-black text-white">Research Projects & Implementations</h2>
            </div>
            <span className="text-xs text-purple-300 font-mono">{projects.length} Implementations</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((proj, idx) => (
              <div 
                key={proj.id}
                className="bg-[#2B2349]/60 rounded-2xl border border-purple-800/70 hover:border-[#D946EF] p-6 space-y-4 flex flex-col justify-between transition-all duration-300 shadow-xl group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-[#06B6D4]">arXiv.v{idx + 1}</span>
                    {proj.featured && (
                      <span className="text-[#D946EF] bg-fuchsia-950/80 px-2.5 py-0.5 rounded-full border border-fuchsia-800 text-[10px]">
                        ★ Highlighted Paper
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-[#D946EF] transition-colors">{proj.title}</h3>
                  <p className="text-xs text-purple-200/80 leading-relaxed font-normal">{proj.description}</p>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {proj.technologies.map((tech, i) => (
                      <span key={i} className="text-[10px] font-mono bg-[#18122B] text-purple-300 border border-purple-900 px-2.5 py-0.5 rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-purple-900/60">
                  {proj.githubUrl && (
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 text-center py-2.5 rounded-xl bg-[#18122B] hover:bg-[#393053] text-purple-200 border border-purple-800 text-xs font-semibold transition-colors"
                    >
                      Model / Code
                    </a>
                  )}
                  {proj.liveUrl && (
                    <a
                      href={proj.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 text-center py-2.5 rounded-xl bg-gradient-to-r from-[#D946EF] to-purple-600 hover:from-fuchsia-600 hover:to-purple-700 text-white text-xs font-bold transition-all shadow-md"
                    >
                      Demo App ↗
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 4: LAB EXPERIENCE & EDUCATION */}
        <section id="experience" className="space-y-6">
          <div className="border-b border-purple-900/60 pb-4">
            <span className="text-xs font-mono text-[#D946EF] font-bold uppercase tracking-wider">// ACADEMIC TIMELINE</span>
            <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">Research Roles & Academic Credentials</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-[#2B2349]/60 p-6 sm:p-8 rounded-2xl border border-purple-800/60 space-y-6">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-[#06B6D4]" />
                Lab & Research Experience
              </h3>

              <div className="space-y-6">
                {experience.map((exp) => (
                  <div key={exp.id} className="border-l-2 border-[#D946EF] pl-4 space-y-1.5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 font-mono">
                      <span className="font-bold text-sm text-white">{exp.role}</span>
                      <span className="text-xs text-[#06B6D4] bg-[#18122B] px-2 py-0.5 rounded border border-purple-900 w-fit">
                        {exp.startDate} – {exp.endDate}
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-purple-300">{exp.company} {exp.location ? `• ${exp.location}` : ''}</p>
                    <ul className="list-disc list-inside text-xs text-purple-200/80 space-y-1 pt-1 font-normal">
                      {exp.description.map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#2B2349]/60 p-6 sm:p-8 rounded-2xl border border-purple-800/60 space-y-6">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-[#D946EF]" />
                Education & Degrees
              </h3>

              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id} className="p-4 rounded-xl bg-[#18122B] border border-purple-900 space-y-1">
                    <div className="flex justify-between items-center font-mono text-xs">
                      <span className="font-bold text-sm text-white">{edu.institution}</span>
                      <span className="text-purple-300">{edu.startYear} – {edu.endYear}</span>
                    </div>
                    <p className="text-xs text-[#06B6D4] font-semibold">{edu.degree} in {edu.fieldOfStudy} {edu.gpa ? `(GPA: ${edu.gpa})` : ''}</p>
                    {edu.coursework && <p className="text-xs text-purple-200/70 font-normal">Coursework: {edu.coursework}</p>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: CONTACT */}
        <section id="contact" className="pt-4">
          <div className="bg-gradient-to-tr from-[#2B2349] to-[#18122B] rounded-3xl border border-purple-500/30 p-8 sm:p-14 text-center space-y-5 shadow-2xl">
            <span className="text-xs text-[#06B6D4] bg-cyan-950/60 px-3 py-1 rounded-full border border-cyan-800 font-mono">
              Open to Research & Industry Positions
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white">
              Initiate Research Collaboration
            </h2>
            <p className="text-purple-200 text-sm max-w-xl mx-auto font-normal leading-relaxed">
              Interested in discussing generative modeling, NLP, computer vision, or scientific ML? Let's connect.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              {personal.email && (
                <a
                  href={`mailto:${personal.email}`}
                  className="px-6 py-3 rounded-full bg-gradient-to-r from-[#D946EF] to-purple-600 hover:opacity-90 text-white text-xs font-bold transition-all shadow-lg"
                >
                  Send Inquiry ({personal.email})
                </a>
              )}
              {personal.linkedinUrl && (
                <a
                  href={personal.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-3 rounded-full bg-[#18122B] hover:bg-[#393053] text-purple-200 border border-purple-700 text-xs font-bold transition-colors"
                >
                  Academic Network
                </a>
              )}
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};
