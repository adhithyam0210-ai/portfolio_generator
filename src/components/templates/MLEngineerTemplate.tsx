import React from 'react';
import { PortfolioProfile } from '@/lib/types';
import { 
  Github, 
  Linkedin, 
  Mail, 
  MapPin, 
  ExternalLink, 
  Cpu, 
  Binary, 
  Layers, 
  Sparkles, 
  BarChart, 
  Activity, 
  Briefcase, 
  GraduationCap,
  Download
} from 'lucide-react';

interface TemplateProps {
  profile: PortfolioProfile;
  isPublicView?: boolean;
}

export const MLEngineerTemplate: React.FC<TemplateProps> = ({ profile, isPublicView }) => {
  const { personal, education, experience, projects, skills } = profile;

  return (
    <div className="bg-[#0B0F19] text-slate-100 min-h-screen font-sans selection:bg-[#F97316] selection:text-white pb-24 scroll-smooth">
      
      {/* High-Performance Computational Top Bar */}
      <nav className="sticky top-0 z-50 bg-[#0B0F19]/90 backdrop-blur-md border-b border-indigo-950/80 px-4 sm:px-8 py-3">
        <div className="w-full max-w-[1500px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#6366F1] to-[#F97316] p-0.5 flex items-center justify-center">
              <div className="w-full h-full bg-[#0B0F19] rounded-[6px] flex items-center justify-center">
                <Cpu className="w-4 h-4 text-[#F97316]" />
              </div>
            </div>
            <span className="font-extrabold text-sm tracking-tight text-white font-mono">
              {personal.fullName} <span className="text-[#6366F1]">/ Tensor & Models</span>
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-6 text-xs font-semibold text-slate-300">
            <a href="#bio" className="hover:text-[#F97316] transition-colors">Compute Bio</a>
            <a href="#skills" className="hover:text-[#F97316] transition-colors">ML Toolchain</a>
            <a href="#projects" className="hover:text-[#F97316] transition-colors">Trained Models</a>
            <a href="#experience" className="hover:text-[#F97316] transition-colors">ML Experience</a>
            <a href="#contact" className="hover:text-[#F97316] transition-colors">Contact</a>
          </div>

            <a 
              href={personal.resumeUrl || "/resume"} 
              download={personal.resumeUrl ? (personal.resumeFileName || `${personal.fullName.replace(/\s+/g, '_')}_Resume.pdf`) : undefined}
              target={personal.resumeUrl ? undefined : "_blank"} 
              className="text-xs font-bold px-3.5 py-1.5 rounded-lg bg-[#6366F1] hover:bg-indigo-500 text-white transition-colors inline-flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>ML Resume PDF</span>
            </a>
        </div>
      </nav>

      <div className="w-full max-w-[1500px] mx-auto px-4 sm:px-8 lg:px-12 pt-10 space-y-20">
        
        {/* SECTION 1: HERO / HIGH-PERFORMANCE COMPUTATION */}
        <section id="bio" className="pt-4">
          <div className="bg-[#111827]/80 backdrop-blur-xl rounded-3xl border border-indigo-900/60 p-8 sm:p-14 shadow-2xl relative overflow-hidden">
            {/* Ambient Tensor Glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none -z-10"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-orange-600/10 rounded-full blur-3xl pointer-events-none -z-10"></div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Left Column: Bio & Intro */}
              <div className="lg:col-span-8 space-y-6 text-left">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-950/80 border border-indigo-500/40 text-[#F97316] text-xs font-mono font-bold">
                  <Activity className="w-3.5 h-3.5 text-[#6366F1]" />
                  <span>MODEL_RUNTIME: {personal.targetRole || 'Machine Learning Engineer'}</span>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
                  Deploying scalable <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366F1] to-[#F97316]">machine learning models</span> into production.
                </h1>

                {personal.headline && (
                  <p className="text-lg font-semibold text-indigo-300">
                    {personal.headline}
                  </p>
                )}

                {personal.bio && (
                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-normal">
                    {personal.bio}
                  </p>
                )}

                <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-medium text-slate-300">
                  {personal.location && (
                    <span className="flex items-center gap-1.5 bg-[#0B0F19] px-3.5 py-1.5 rounded-lg border border-slate-800">
                      <MapPin className="w-3.5 h-3.5 text-[#F97316]" />
                      {personal.location}
                    </span>
                  )}
                  {personal.email && (
                    <a href={`mailto:${personal.email}`} className="flex items-center gap-1.5 bg-[#0B0F19] hover:bg-slate-900 px-3.5 py-1.5 rounded-lg border border-slate-800 text-indigo-300 transition-colors">
                      <Mail className="w-3.5 h-3.5 text-[#6366F1]" />
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
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#6366F1] to-indigo-600 hover:opacity-90 text-white text-xs font-bold transition-all shadow-lg shadow-indigo-500/25"
                    >
                      <Github className="w-4 h-4" />
                      Model Checkpoints & Repos
                    </a>
                  )}
                  {personal.linkedinUrl && (
                    <a
                      href={personal.linkedinUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0B0F19] hover:bg-slate-900 text-slate-200 border border-indigo-900 text-xs font-bold transition-colors"
                    >
                      <Linkedin className="w-4 h-4 text-[#F97316]" />
                      LinkedIn Network
                    </a>
                  )}
                </div>
              </div>

              {/* Right Column: Avatar Portrait Card */}
              <div className="lg:col-span-4 flex flex-col items-center lg:items-end justify-center">
                <div className="relative group w-52 sm:w-64">
                  <div className="relative rounded-3xl p-1 bg-gradient-to-tr from-[#6366F1] via-indigo-900 to-[#F97316] shadow-2xl aspect-square flex items-center justify-center">
                    {personal.avatarUrl ? (
                      <img 
                        src={personal.avatarUrl} 
                        alt={personal.fullName}
                        className="w-full h-full object-cover rounded-[22px] group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full rounded-[22px] bg-[#0B0F19] flex flex-col items-center justify-center gap-3 p-6 text-center">
                        <div className="w-20 h-20 rounded-2xl bg-indigo-950/60 border border-indigo-500/40 flex items-center justify-center shadow-lg">
                          <Cpu className="w-10 h-10 text-[#F97316]" />
                        </div>
                        <span className="font-mono text-sm font-bold text-white uppercase tracking-wider">
                          {personal.fullName.slice(0, 2)}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Status Indicator Pill */}
                  <div className="mt-3 bg-[#0B0F19]/90 border border-indigo-900/80 rounded-xl px-3.5 py-2 text-center shadow-lg">
                    <span className="text-[11px] font-mono font-bold text-indigo-300 flex items-center justify-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#F97316] animate-pulse" />
                      INFERENCE // Low-Latency Ready
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* SECTION 2: COMPUTATIONAL ML TOOLKIT */}
        <section id="skills" className="space-y-6">
          <div className="flex items-center justify-between border-b border-indigo-950 pb-4">
            <div>
              <span className="text-xs font-mono text-[#F97316] uppercase tracking-wider font-bold">// MODEL COMPUTE STACK</span>
              <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">Machine Learning Frameworks & Libraries</h2>
            </div>
            <span className="text-xs text-slate-400 font-mono hidden sm:inline-block">Validated Student Stack</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#111827] p-6 rounded-2xl border border-indigo-950 space-y-4">
              <div className="flex items-center gap-2 text-[#6366F1] font-bold text-sm">
                <Layers className="w-4 h-4" />
                <span>Deep Learning & Modeling</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.frameworks.map((fw, i) => (
                  <span key={i} className="text-xs font-medium bg-[#0B0F19] border border-indigo-900/60 text-indigo-200 px-3 py-1 rounded-lg">
                    {fw}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-[#111827] p-6 rounded-2xl border border-indigo-950 space-y-4">
              <div className="flex items-center gap-2 text-[#F97316] font-bold text-sm">
                <Binary className="w-4 h-4" />
                <span>Languages & Compute</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.languages.map((lang, i) => (
                  <span key={i} className="text-xs font-medium bg-[#0B0F19] border border-orange-900/50 text-orange-200 px-3 py-1 rounded-lg">
                    {lang}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-[#111827] p-6 rounded-2xl border border-indigo-950 space-y-4">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <Cpu className="w-4 h-4" />
                <span>MLOps & Model Tracking</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.tools.map((tl, i) => (
                  <span key={i} className="text-xs font-medium bg-[#0B0F19] border border-emerald-900/50 text-emerald-200 px-3 py-1 rounded-lg">
                    {tl}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: ML PROJECTS & ARCHITECTURES */}
        <section id="projects" className="space-y-6">
          <div className="flex items-center justify-between border-b border-indigo-950 pb-4">
            <div>
              <span className="text-xs font-mono text-[#F97316] uppercase tracking-wider font-bold">// MODEL TRAINING & INFERENCE</span>
              <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">Trained Models & ML Implementations</h2>
            </div>
            <span className="text-xs text-slate-400 font-mono">{projects.length} Models</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((proj, idx) => (
              <div 
                key={proj.id}
                className="bg-[#111827] rounded-2xl border border-indigo-950 hover:border-[#6366F1] p-6 space-y-4 flex flex-col justify-between transition-all group shadow-lg"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between font-mono text-xs">
                    <span className="text-[#6366F1]">MODEL_ID: #{idx + 10}</span>
                    {proj.featured && (
                      <span className="text-[#F97316] bg-orange-950/60 px-2 py-0.5 rounded border border-orange-800 text-[10px]">
                        ★ High Accuracy
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-[#6366F1] transition-colors">{proj.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-normal">{proj.description}</p>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {proj.technologies.map((tech, i) => (
                      <span key={i} className="text-[10px] font-mono bg-[#0B0F19] text-indigo-300 border border-indigo-950 px-2 py-0.5 rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-indigo-950">
                  {proj.githubUrl && (
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 text-center py-2 rounded-lg bg-[#0B0F19] hover:bg-slate-900 text-slate-200 border border-indigo-950 text-xs font-semibold transition-colors"
                    >
                      Training Code
                    </a>
                  )}
                  {proj.liveUrl && (
                    <a
                      href={proj.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 text-center py-2 rounded-lg bg-[#6366F1] hover:bg-indigo-500 text-white text-xs font-bold transition-colors"
                    >
                      Inference Demo ↗
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 4: ML EXPERIENCE & EDUCATION */}
        <section id="experience" className="space-y-6">
          <div className="border-b border-indigo-950 pb-4">
            <span className="text-xs font-mono text-[#F97316] uppercase tracking-wider font-bold">// CAREER MILESTONES</span>
            <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">Machine Learning Roles & Education</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-[#111827] p-6 sm:p-8 rounded-2xl border border-indigo-950 space-y-6">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-[#6366F1]" />
                Industry ML Experience
              </h3>

              <div className="space-y-6">
                {experience.map((exp) => (
                  <div key={exp.id} className="border-l-2 border-[#6366F1] pl-4 space-y-1.5">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-sm text-white">{exp.role}</span>
                      <span className="text-[#F97316] bg-[#0B0F19] px-2 py-0.5 rounded border border-indigo-950 font-mono">
                        {exp.startDate} – {exp.endDate}
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-indigo-300">{exp.company} {exp.location ? `• ${exp.location}` : ''}</p>
                    <ul className="list-disc list-inside text-xs text-slate-300 space-y-1 pt-1 font-normal">
                      {exp.description.map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#111827] p-6 sm:p-8 rounded-2xl border border-indigo-950 space-y-6">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-[#F97316]" />
                Degrees & Academics
              </h3>

              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id} className="p-4 rounded-xl bg-[#0B0F19] border border-indigo-950 space-y-1">
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="font-bold text-sm text-white">{edu.institution}</span>
                      <span className="text-slate-400">{edu.startYear} – {edu.endYear}</span>
                    </div>
                    <p className="text-xs text-[#6366F1] font-semibold">{edu.degree} in {edu.fieldOfStudy} {edu.gpa ? `(GPA: ${edu.gpa})` : ''}</p>
                    {edu.coursework && <p className="text-xs text-slate-400">Coursework: {edu.coursework}</p>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: CONTACT */}
        <section id="contact" className="pt-4">
          <div className="bg-[#111827] rounded-3xl border border-indigo-950 p-8 sm:p-14 text-center space-y-5 shadow-2xl">
            <span className="text-xs text-[#F97316] bg-orange-950/60 px-3 py-1 rounded-full border border-orange-800">
              Open to ML Engineering Positions
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white">
              Ready to Discuss High-Impact ML Systems?
            </h2>
            <p className="text-slate-300 text-sm max-w-xl mx-auto">
              Looking for an ML engineer with PyTorch, model optimization, API deployment, and end-to-end pipeline experience? Let's connect.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              {personal.email && (
                <a
                  href={`mailto:${personal.email}`}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#6366F1] to-indigo-600 hover:opacity-90 text-white text-xs font-black transition-all shadow-lg"
                >
                  Send Inquiry ({personal.email})
                </a>
              )}
              {personal.linkedinUrl && (
                <a
                  href={personal.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-3 rounded-xl bg-[#0B0F19] hover:bg-slate-900 text-slate-200 border border-indigo-900 text-xs font-bold transition-colors"
                >
                  ML Professional Network
                </a>
              )}
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};
