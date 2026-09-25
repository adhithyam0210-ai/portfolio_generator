import React from 'react';
import { PortfolioProfile } from '@/lib/types';
import { 
  Github, 
  Linkedin, 
  Mail, 
  MapPin, 
  ExternalLink, 
  Cloud, 
  Boxes, 
  Server, 
  Cpu, 
  GitBranch, 
  Workflow, 
  CheckCircle2, 
  Briefcase, 
  GraduationCap,
  Download,
  Terminal,
  Activity
} from 'lucide-react';

interface TemplateProps {
  profile: PortfolioProfile;
  isPublicView?: boolean;
}

export const DevOpsEngineerTemplate: React.FC<TemplateProps> = ({ profile, isPublicView }) => {
  const { personal, education, experience, projects, skills } = profile;

  return (
    <div className="bg-[#0F172A] text-slate-100 min-h-screen font-sans selection:bg-[#F97316] selection:text-white pb-24 scroll-smooth">
      
      {/* Infrastructure Top Pipeline Bar */}
      <nav className="sticky top-0 z-50 bg-[#0F172A]/90 backdrop-blur-md border-b border-slate-700/60 px-4 sm:px-8 py-3 shadow-sm">
        <div className="w-full max-w-[1500px] mx-auto flex items-center justify-between">
          <a href="#bio" className="flex items-center gap-3 group">
            <div className="w-7 h-7 rounded-lg bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 group-hover:bg-sky-500/20 transition-colors">
              <Cloud className="w-4 h-4" />
            </div>
            <span className="font-extrabold text-sm tracking-tight text-white font-mono">
              {personal.fullName} <span className="text-sky-400 font-normal hidden sm:inline-block">/ infra-pipeline</span>
            </span>
          </a>

          <div className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-300">
            <a href="#bio" className="hover:text-sky-400 transition-colors">Architecture</a>
            <a href="#skills" className="hover:text-sky-400 transition-colors">Cloud Tools</a>
            <a href="#projects" className="hover:text-sky-400 transition-colors">CI/CD Deployments</a>
            <a href="#experience" className="hover:text-sky-400 transition-colors">Operations</a>
            <a href="#contact" className="hover:text-sky-400 transition-colors">Contact</a>
          </div>

            <a 
              href={personal.resumeUrl || "/resume"} 
              download={personal.resumeUrl ? (personal.resumeFileName || `${personal.fullName.replace(/\s+/g, '_')}_Resume.pdf`) : undefined}
              target={personal.resumeUrl ? undefined : "_blank"} 
              className="text-xs font-bold px-3.5 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 transition-colors shadow-sm inline-flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Resume PDF</span>
            </a>
        </div>
      </nav>

      <div className="w-full max-w-[1500px] mx-auto px-4 sm:px-8 lg:px-12 pt-8 sm:pt-12 space-y-20 sm:space-y-24">
        
        {/* SECTION 1: HERO / BIO (Aligned 12-Column Responsive Grid) */}
        <section id="bio">
          <div className="bg-[#1E293B] rounded-3xl border border-slate-700 p-6 sm:p-10 lg:p-12 shadow-2xl relative overflow-hidden">
            {/* Visual Pipeline Pipeline Indicator Line */}
            <div className="hidden lg:flex items-center gap-2 mb-6 font-mono text-[11px] text-slate-400 bg-slate-900/60 w-fit px-4 py-1.5 rounded-full border border-slate-700">
              <span className="flex items-center gap-1 text-emerald-400"><CheckCircle2 className="w-3.5 h-3.5" /> build:passed</span>
              <span>→</span>
              <span className="flex items-center gap-1 text-emerald-400"><CheckCircle2 className="w-3.5 h-3.5" /> test:passed</span>
              <span>→</span>
              <span className="flex items-center gap-1 text-sky-400"><Boxes className="w-3.5 h-3.5" /> deploy:k8s</span>
              <span>→</span>
              <span className="text-orange-400 font-bold">env:production</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Left Column: Cloud Bio (8 cols) */}
              <div className="lg:col-span-8 space-y-6 text-left">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-bold">
                  <Workflow className="w-3.5 h-3.5 text-orange-400" />
                  <span>{personal.targetRole || 'DevOps & Site Reliability Engineer'}</span>
                </div>

                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.12]">
                  Automating <span className="text-sky-400">cloud infrastructure</span> & CI/CD delivery pipelines.
                </h1>

                <p className="text-base sm:text-lg font-bold text-slate-200 leading-snug">
                  {personal.headline}
                </p>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-normal max-w-3xl">
                  {personal.bio}
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-1 text-xs font-medium text-slate-300">
                  {personal.location && (
                    <span className="flex items-center gap-1.5 bg-slate-900/80 px-3.5 py-1.5 rounded-lg border border-slate-700">
                      <MapPin className="w-3.5 h-3.5 text-sky-400" />
                      {personal.location}
                    </span>
                  )}
                  {personal.email && (
                    <a href={`mailto:${personal.email}`} className="flex items-center gap-1.5 bg-slate-900/80 hover:bg-slate-900 px-3.5 py-1.5 rounded-lg border border-slate-700 text-orange-400 transition-colors">
                      <Mail className="w-3.5 h-3.5" />
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
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold transition-all shadow-lg shadow-orange-500/20"
                    >
                      <Github className="w-4 h-4" />
                      IaC & Pipeline Repos
                    </a>
                  )}
                  {personal.linkedinUrl && (
                    <a
                      href={personal.linkedinUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-bold transition-colors"
                    >
                      <Linkedin className="w-4 h-4 text-sky-400" />
                      LinkedIn Profile
                    </a>
                  )}
                </div>
              </div>

              {/* Right Column: Profile Picture Card (4 cols) */}
              <div className="lg:col-span-4 flex flex-col items-center justify-center">
                <div className="relative group">
                  <div className="w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 rounded-3xl overflow-hidden border-2 border-sky-400 bg-slate-900 p-1.5 shadow-2xl flex items-center justify-center">
                    {personal.avatarUrl ? (
                      <img 
                        src={personal.avatarUrl} 
                        alt={personal.fullName}
                        className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center rounded-2xl bg-slate-900 text-sky-400 font-mono">
                        <Cloud className="w-16 h-16 text-sky-400 mb-1" />
                        <span className="text-xs font-bold">K8S_CONTAINER</span>
                      </div>
                    )}
                  </div>

                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-slate-900 border border-sky-500/60 px-3.5 py-1 rounded-full shadow-lg text-[11px] font-mono text-sky-300 whitespace-nowrap flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    cluster: healthy_01
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* SECTION 2: CLOUD & INFRASTRUCTURE TOOL GRID */}
        <section id="skills" className="space-y-6">
          <div className="flex items-end justify-between border-b border-slate-700 pb-4">
            <div className="space-y-1">
              <span className="text-xs font-mono text-orange-400 uppercase tracking-wider font-bold">// INFRASTRUCTURE TOOLCHAIN</span>
              <h2 className="text-2xl sm:text-3xl font-black text-white">Cloud, Containers & Automation Tools</h2>
            </div>
            <span className="text-xs text-slate-400 font-mono hidden sm:inline-block">Validated Student Stack</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#1E293B] p-6 rounded-2xl border border-slate-700 space-y-4">
              <div className="flex items-center gap-2 text-sky-400 font-bold text-sm">
                <Cloud className="w-4 h-4" />
                <span>Cloud & Orchestration</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.frameworks.map((fw, i) => (
                  <span key={i} className="text-xs font-medium bg-slate-900 border border-slate-700 text-slate-200 px-3 py-1.5 rounded-lg font-mono">
                    {fw}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-[#1E293B] p-6 rounded-2xl border border-slate-700 space-y-4">
              <div className="flex items-center gap-2 text-orange-400 font-bold text-sm">
                <Server className="w-4 h-4" />
                <span>Infrastructure & CI/CD</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.tools.map((tl, i) => (
                  <span key={i} className="text-xs font-medium bg-slate-900 border border-slate-700 text-slate-200 px-3 py-1.5 rounded-lg font-mono">
                    {tl}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-[#1E293B] p-6 rounded-2xl border border-slate-700 space-y-4">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <Cpu className="w-4 h-4" />
                <span>Automation Scripting</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.languages.map((lang, i) => (
                  <span key={i} className="text-xs font-medium bg-slate-900 border border-slate-700 text-slate-200 px-3 py-1.5 rounded-lg font-mono">
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: DEPLOYMENTS & CLOUD PROJECTS */}
        <section id="projects" className="space-y-6">
          <div className="flex items-end justify-between border-b border-slate-700 pb-4">
            <div className="space-y-1">
              <span className="text-xs font-mono text-orange-400 uppercase tracking-wider font-bold">// DEPLOYMENTS & AUTOMATION</span>
              <h2 className="text-2xl sm:text-3xl font-black text-white">Infrastructure & Pipeline Implementations</h2>
            </div>
            <span className="text-xs text-slate-400 font-mono">{projects.length} Architectures</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((proj, idx) => (
              <div 
                key={proj.id}
                className="bg-[#1E293B] rounded-2xl border border-slate-700 hover:border-sky-400 p-6 space-y-4 flex flex-col justify-between transition-all group shadow-lg"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between font-mono text-xs">
                    <span className="text-sky-400">CLUSTER_0{idx + 1}</span>
                    {proj.featured && (
                      <span className="text-orange-400 bg-orange-950/60 px-2 py-0.5 rounded border border-orange-800 text-[10px]">
                        ★ Primary Pipeline
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-sky-400 transition-colors">{proj.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-normal">{proj.description}</p>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {proj.technologies.map((tech, i) => (
                      <span key={i} className="text-[10px] font-mono bg-slate-900 text-slate-300 border border-slate-700 px-2.5 py-0.5 rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-slate-700 font-mono">
                  {proj.githubUrl && (
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 text-center py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-semibold transition-colors"
                    >
                      IaC Config
                    </a>
                  )}
                  {proj.liveUrl && (
                    <a
                      href={proj.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 text-center py-2.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 text-xs font-bold transition-colors"
                    >
                      Live Health ↗
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 4: OPERATIONS EXPERIENCE & EDUCATION */}
        <section id="experience" className="space-y-6">
          <div className="border-b border-slate-700 pb-4">
            <span className="text-xs font-mono text-orange-400 uppercase tracking-wider font-bold">// SYSTEM OPERATIONS</span>
            <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">Operational History & Credentials</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-[#1E293B] p-6 sm:p-8 rounded-2xl border border-slate-700 space-y-6">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-sky-400" />
                DevOps & Infrastructure Roles
              </h3>

              <div className="space-y-6">
                {experience.map((exp) => (
                  <div key={exp.id} className="border-l-2 border-sky-400 pl-4 space-y-1.5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                      <span className="font-bold text-sm text-white">{exp.role}</span>
                      <span className="text-orange-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-700 font-mono w-fit">
                        {exp.startDate} – {exp.endDate}
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-sky-400">{exp.company} {exp.location ? `• ${exp.location}` : ''}</p>
                    <ul className="list-disc list-inside text-xs text-slate-300 space-y-1 pt-1 font-normal">
                      {exp.description.map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#1E293B] p-6 sm:p-8 rounded-2xl border border-slate-700 space-y-6">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-orange-400" />
                Education & Degrees
              </h3>

              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id} className="p-4 rounded-xl bg-slate-900 border border-slate-700 space-y-1">
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="font-bold text-sm text-white">{edu.institution}</span>
                      <span className="text-slate-400">{edu.startYear} – {edu.endYear}</span>
                    </div>
                    <p className="text-xs text-sky-400 font-semibold">{edu.degree} in {edu.fieldOfStudy} {edu.gpa ? `(GPA: ${edu.gpa})` : ''}</p>
                    {edu.coursework && <p className="text-xs text-slate-400 font-normal">Coursework: {edu.coursework}</p>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: CONTACT */}
        <section id="contact" className="pt-4">
          <div className="bg-[#1E293B] rounded-3xl border border-slate-700 p-8 sm:p-14 text-center space-y-5 shadow-2xl">
            <span className="text-xs text-orange-400 bg-orange-950/60 px-3.5 py-1 rounded-full border border-orange-800 font-mono">
              Cloud Operations Ready
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white">
              Connect on Cloud & Platform Engineering
            </h2>
            <p className="text-slate-300 text-sm max-w-xl mx-auto font-normal leading-relaxed">
              Looking for a DevOps engineer with Kubernetes, CI/CD pipeline automation, and cloud management expertise? Let's talk.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              {personal.email && (
                <a
                  href={`mailto:${personal.email}`}
                  className="px-6 py-3.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 text-xs font-black transition-all shadow-lg"
                >
                  Direct Email ({personal.email})
                </a>
              )}
              {personal.linkedinUrl && (
                <a
                  href={personal.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-bold transition-colors"
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
