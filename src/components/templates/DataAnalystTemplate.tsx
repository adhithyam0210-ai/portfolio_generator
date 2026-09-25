import React from 'react';
import { PortfolioProfile } from '@/lib/types';
import { 
  Github, 
  Linkedin, 
  Mail, 
  MapPin, 
  ExternalLink, 
  BarChart3, 
  PieChart, 
  TrendingUp, 
  LineChart, 
  Database, 
  Briefcase, 
  GraduationCap, 
  Download,
  Table,
  CheckCircle2
} from 'lucide-react';

interface TemplateProps {
  profile: PortfolioProfile;
  isPublicView?: boolean;
}

export const DataAnalystTemplate: React.FC<TemplateProps> = ({ profile, isPublicView }) => {
  const { personal, education, experience, projects, skills } = profile;

  return (
    <div className="bg-[#F8FAFC] text-slate-800 min-h-screen font-sans selection:bg-[#0EA5E9] selection:text-white pb-24 scroll-smooth">
      
      {/* BI Analytics Top Navigation */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 px-4 sm:px-8 py-3">
        <div className="w-full max-w-[1500px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-sky-50 border border-sky-200 flex items-center justify-center text-[#0EA5E9]">
              <BarChart3 className="w-4 h-4" />
            </div>
            <span className="font-extrabold text-sm tracking-tight text-slate-900">
              {personal.fullName} <span className="text-slate-400 font-normal">/ Business Intelligence & Analytics</span>
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-6 text-xs font-semibold text-slate-600">
            <a href="#bio" className="hover:text-[#0EA5E9] transition-colors">Executive Summary</a>
            <a href="#skills" className="hover:text-[#0EA5E9] transition-colors">BI & Query Stack</a>
            <a href="#projects" className="hover:text-[#0EA5E9] transition-colors">Dashboards</a>
            <a href="#experience" className="hover:text-[#0EA5E9] transition-colors">Experience</a>
            <a href="#contact" className="hover:text-[#0EA5E9] transition-colors">Contact</a>
          </div>

            <a 
              href={personal.resumeUrl || "/resume"} 
              download={personal.resumeUrl ? (personal.resumeFileName || `${personal.fullName.replace(/\s+/g, '_')}_Resume.pdf`) : undefined}
              target={personal.resumeUrl ? undefined : "_blank"} 
              className="text-xs font-bold px-3.5 py-1.5 rounded-lg bg-[#0EA5E9] hover:bg-sky-600 text-white transition-colors inline-flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Resume PDF</span>
            </a>
        </div>
      </nav>

      <div className="w-full max-w-[1500px] mx-auto px-4 sm:px-8 lg:px-12 pt-10 space-y-20">
        
        {/* SECTION 1: HERO / BI EXECUTIVE DASHBOARD */}
        <section id="bio" className="pt-4">
          <div className="bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-14 shadow-sm relative overflow-hidden space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Left Column: Bio & Intro */}
              <div className="lg:col-span-8 space-y-6 text-left">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-[#0EA5E9] text-xs font-bold">
                  <TrendingUp className="w-3.5 h-3.5 text-[#EAB308]" />
                  <span>ROLE // {personal.targetRole || 'Data & Business Intelligence Analyst'}</span>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight">
                  Transforming raw datasets into <span className="text-[#0EA5E9]">actionable business insights</span>.
                </h1>

                {personal.headline && (
                  <p className="text-lg font-semibold text-slate-700">
                    {personal.headline}
                  </p>
                )}

                {personal.bio && (
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
                    {personal.bio}
                  </p>
                )}

                <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-medium text-slate-600">
                  {personal.location && (
                    <span className="flex items-center gap-1.5 bg-slate-100 px-3.5 py-1.5 rounded-lg">
                      <MapPin className="w-3.5 h-3.5 text-[#0EA5E9]" />
                      {personal.location}
                    </span>
                  )}
                  {personal.email && (
                    <a href={`mailto:${personal.email}`} className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 px-3.5 py-1.5 rounded-lg transition-colors text-slate-800">
                      <Mail className="w-3.5 h-3.5 text-[#EAB308]" />
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
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-[#0EA5E9] text-white text-xs font-bold transition-colors shadow-sm"
                    >
                      <Github className="w-4 h-4" />
                      SQL & Analytics Code
                    </a>
                  )}
                  {personal.linkedinUrl && (
                    <a
                      href={personal.linkedinUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 text-xs font-bold transition-colors"
                    >
                      <Linkedin className="w-4 h-4 text-[#0EA5E9]" />
                      LinkedIn Network
                    </a>
                  )}
                </div>
              </div>

              {/* Right Column: Avatar Portrait Card */}
              <div className="lg:col-span-4 flex flex-col items-center lg:items-end justify-center">
                <div className="relative group w-52 sm:w-64">
                  <div className="relative rounded-3xl overflow-hidden border-4 border-white shadow-2xl ring-4 ring-sky-100 aspect-square bg-gradient-to-br from-sky-50 to-amber-50 flex items-center justify-center">
                    {personal.avatarUrl ? (
                      <img 
                        src={personal.avatarUrl} 
                        alt={personal.fullName}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center gap-3 p-6 text-center">
                        <div className="w-20 h-20 rounded-2xl bg-white border border-sky-200 flex items-center justify-center shadow-md">
                          <BarChart3 className="w-10 h-10 text-[#0EA5E9]" />
                        </div>
                        <span className="font-bold text-sm text-slate-800 uppercase tracking-wider">
                          {personal.fullName.slice(0, 2)}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Status Indicator Pill */}
                  <div className="mt-3 bg-white/95 backdrop-blur-sm border border-sky-200/80 rounded-xl px-3.5 py-2 text-center shadow-sm">
                    <span className="text-[11px] font-bold text-[#0EA5E9] flex items-center justify-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      BI INSIGHTS // Data Pipelines Ready
                    </span>
                  </div>
                </div>
              </div>

            </div>

            {/* KPI Summary Block (Computed strictly from user input arrays) */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-slate-100">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                <span className="text-[11px] font-bold text-slate-500 uppercase block">Curated Projects</span>
                <span className="text-2xl font-black text-slate-900">{projects.length} Portfolios</span>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                <span className="text-[11px] font-bold text-slate-500 uppercase block">Query & Code Tools</span>
                <span className="text-2xl font-black text-[#0EA5E9]">{skills.languages.length + skills.tools.length} Technologies</span>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                <span className="text-[11px] font-bold text-slate-500 uppercase block">Industry Roles</span>
                <span className="text-2xl font-black text-[#EAB308]">{experience.length} Experience Records</span>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                <span className="text-[11px] font-bold text-slate-500 uppercase block">Academic History</span>
                <span className="text-2xl font-black text-slate-900">{education.length} Institution{education.length > 1 ? 's' : ''}</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: ANALYTICAL TOOLS & BI STACK */}
        <section id="skills" className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <div>
              <span className="text-xs font-mono text-[#0EA5E9] font-bold uppercase tracking-wider">// ANALYTICS_TOOLKIT</span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">Data Querying & BI Software Stack</h2>
            </div>
            <span className="text-xs text-slate-500 font-mono hidden sm:inline-block">Validated Competencies</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-[#0EA5E9] font-bold text-sm">
                <PieChart className="w-4 h-4" />
                <span>BI & Dashboards</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.frameworks.map((fw, i) => (
                  <span key={i} className="text-xs font-semibold bg-sky-50 border border-sky-200 text-sky-800 px-3 py-1 rounded-lg">
                    {fw}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-[#EAB308] font-bold text-sm">
                <Database className="w-4 h-4" />
                <span>Databases & Querying</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.languages.map((lang, i) => (
                  <span key={i} className="text-xs font-semibold bg-amber-50 border border-amber-200 text-amber-900 px-3 py-1 rounded-lg">
                    {lang}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-slate-800 font-bold text-sm">
                <Table className="w-4 h-4" />
                <span>Analytics Tools & Warehouses</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.tools.map((tl, i) => (
                  <span key={i} className="text-xs font-semibold bg-slate-100 border border-slate-200 text-slate-800 px-3 py-1 rounded-lg">
                    {tl}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: DASHBOARD CASE STUDIES */}
        <section id="projects" className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <div>
              <span className="text-xs font-mono text-[#0EA5E9] font-bold uppercase tracking-wider">// DASHBOARDS_AND_ANALYSES</span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">Data Analyses & Dashboard Implementations</h2>
            </div>
            <span className="text-xs text-slate-500 font-mono">{projects.length} Case Studies</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((proj, idx) => (
              <div 
                key={proj.id}
                className="bg-white rounded-2xl border border-slate-200/90 hover:border-[#0EA5E9] p-6 space-y-4 flex flex-col justify-between transition-all duration-200 shadow-sm hover:shadow-md group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-mono">DASHBOARD_0{idx + 1}</span>
                    {proj.featured && (
                      <span className="text-[#0EA5E9] bg-sky-50 px-2 py-0.5 rounded border border-sky-200 text-[10px] font-bold">
                        ★ Executive Pick
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#0EA5E9] transition-colors">{proj.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">{proj.description}</p>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {proj.technologies.map((tech, i) => (
                      <span key={i} className="text-[10px] font-mono bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-slate-100 font-mono">
                  {proj.githubUrl && (
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 text-center py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-colors"
                    >
                      Queries / Code
                    </a>
                  )}
                  {proj.liveUrl && (
                    <a
                      href={proj.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 text-center py-2 rounded-lg bg-[#0EA5E9] hover:bg-sky-600 text-white text-xs font-bold transition-colors"
                    >
                      View Report ↗
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 4: ANALYTICS EXPERIENCE & EDUCATION */}
        <section id="experience" className="space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <span className="text-xs font-mono text-[#0EA5E9] font-bold uppercase tracking-wider">// ANALYTICS_TIMELINE</span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">Analytics Experience & Academic Credentials</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/90 shadow-sm space-y-6">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 font-mono">
                <Briefcase className="w-5 h-5 text-[#0EA5E9]" />
                BI & Analytics Positions
              </h3>

              <div className="space-y-6">
                {experience.map((exp) => (
                  <div key={exp.id} className="border-l-2 border-[#0EA5E9] pl-4 space-y-1.5">
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="font-bold text-sm text-slate-900">{exp.role}</span>
                      <span className="text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                        {exp.startDate} – {exp.endDate}
                      </span>
                    </div>
                    <p className="text-xs font-bold text-[#0EA5E9]">{exp.company} {exp.location ? `• ${exp.location}` : ''}</p>
                    <ul className="list-disc list-inside text-xs text-slate-600 space-y-1 pt-1 font-normal">
                      {exp.description.map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/90 shadow-sm space-y-6">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 font-mono">
                <GraduationCap className="w-5 h-5 text-[#EAB308]" />
                Academic Background
              </h3>

              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="font-bold text-sm text-slate-900">{edu.institution}</span>
                      <span className="text-slate-500">{edu.startYear} – {edu.endYear}</span>
                    </div>
                    <p className="text-xs text-[#0EA5E9] font-semibold">{edu.degree} in {edu.fieldOfStudy} {edu.gpa ? `(GPA: ${edu.gpa})` : ''}</p>
                    {edu.coursework && <p className="text-xs text-slate-600 font-normal">Coursework: {edu.coursework}</p>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: CONTACT */}
        <section id="contact" className="pt-4 font-mono">
          <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-14 text-center space-y-5 shadow-sm">
            <span className="text-xs text-[#0EA5E9] bg-sky-50 px-3 py-1 rounded-full border border-sky-200 font-bold">
              Available for Full-Time & Contract Analytics
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 font-sans">
              Need Insightful BI & Data Analytics?
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm font-sans max-w-xl mx-auto font-normal">
              Looking for a data analyst skilled in SQL, Python data pipelines, PowerBI/Tableau dashboards, and executive reporting? Let's connect.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-3 font-sans">
              {personal.email && (
                <a
                  href={`mailto:${personal.email}`}
                  className="px-6 py-3 rounded-xl bg-[#0EA5E9] hover:bg-sky-600 text-white text-xs font-bold transition-all shadow-md"
                >
                  Email ({personal.email})
                </a>
              )}
              {personal.linkedinUrl && (
                <a
                  href={personal.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 text-xs font-bold transition-colors"
                >
                  Analytics LinkedIn
                </a>
              )}
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};
