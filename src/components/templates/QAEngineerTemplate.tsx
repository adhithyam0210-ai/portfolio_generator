import React from 'react';
import { PortfolioProfile } from '@/lib/types';
import { 
  Github, 
  Linkedin, 
  Mail, 
  MapPin, 
  ExternalLink, 
  CheckCircle2, 
  AlertCircle, 
  Bug, 
  ShieldCheck, 
  PlayCircle, 
  Briefcase, 
  GraduationCap, 
  Download,
  Terminal
} from 'lucide-react';

interface TemplateProps {
  profile: PortfolioProfile;
  isPublicView?: boolean;
}

export const QAEngineerTemplate: React.FC<TemplateProps> = ({ profile, isPublicView }) => {
  const { personal, education, experience, projects, skills } = profile;

  return (
    <div className="bg-[#F8FAFC] text-slate-800 min-h-screen font-sans selection:bg-[#2A9D8F] selection:text-white pb-24 scroll-smooth">
      
      {/* Diagnostic Header Bar */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 px-4 sm:px-8 py-3">
        <div className="w-full max-w-[1500px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 border border-emerald-200 text-xs font-mono font-bold text-[#2A9D8F]">
              <CheckCircle2 className="w-3.5 h-3.5" /> SUITE_PASS
            </span>
            <span className="font-extrabold text-sm text-slate-900 font-mono">
              {personal.fullName} <span className="font-normal text-slate-500">/ QA Engineering</span>
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-6 text-xs font-semibold text-slate-600">
            <a href="#bio" className="hover:text-[#2A9D8F] transition-colors">Test Report</a>
            <a href="#skills" className="hover:text-[#2A9D8F] transition-colors">QA Stack</a>
            <a href="#projects" className="hover:text-[#2A9D8F] transition-colors">Automated Suites</a>
            <a href="#experience" className="hover:text-[#2A9D8F] transition-colors">QA History</a>
            <a href="#contact" className="hover:text-[#2A9D8F] transition-colors">Contact</a>
          </div>

            <a 
              href={personal.resumeUrl || "/resume"} 
              download={personal.resumeUrl ? (personal.resumeFileName || `${personal.fullName.replace(/\s+/g, '_')}_Resume.pdf`) : undefined}
              target={personal.resumeUrl ? undefined : "_blank"} 
              className="text-xs font-bold px-3.5 py-1.5 rounded-lg bg-slate-900 text-white hover:bg-[#2A9D8F] transition-colors inline-flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Resume PDF</span>
            </a>
        </div>
      </nav>

      <div className="w-full max-w-[1500px] mx-auto px-4 sm:px-8 lg:px-12 pt-10 space-y-20">
        
        {/* SECTION 1: HERO / DIAGNOSTIC OVERVIEW */}
        <section id="bio" className="pt-4">
          <div className="bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-14 shadow-sm relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Left Column: Bio & Intro */}
              <div className="lg:col-span-8 space-y-6 text-left">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 font-mono text-xs font-bold text-slate-700">
                  <Bug className="w-3.5 h-3.5 text-[#E63946]" />
                  <span>ROLE // {personal.targetRole || 'Software Test & QA Automation Engineer'}</span>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight">
                  Ensuring zero regressions, bulletproof <span className="text-[#2A9D8F]">reliability</span> & test coverage.
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

                <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-mono font-medium text-slate-600">
                  {personal.location && (
                    <span className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-lg">
                      <MapPin className="w-3.5 h-3.5 text-[#E63946]" />
                      {personal.location}
                    </span>
                  )}
                  {personal.email && (
                    <a href={`mailto:${personal.email}`} className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition-colors text-slate-800">
                      <Mail className="w-3.5 h-3.5 text-[#2A9D8F]" />
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
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-[#2A9D8F] text-white text-xs font-bold font-mono transition-colors shadow-sm"
                    >
                      <Github className="w-4 h-4" />
                      Test Suites & Frameworks
                    </a>
                  )}
                  {personal.linkedinUrl && (
                    <a
                      href={personal.linkedinUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 text-xs font-bold font-mono transition-colors"
                    >
                      <Linkedin className="w-4 h-4 text-[#2A9D8F]" />
                      LinkedIn Network
                    </a>
                  )}
                </div>
              </div>

              {/* Right Column: Avatar Portrait Card */}
              <div className="lg:col-span-4 flex flex-col items-center lg:items-end justify-center">
                <div className="relative group w-52 sm:w-64">
                  <div className="relative rounded-3xl overflow-hidden border-4 border-white shadow-2xl ring-4 ring-emerald-100/90 aspect-square bg-gradient-to-br from-emerald-50 to-teal-100 flex items-center justify-center">
                    {personal.avatarUrl ? (
                      <img 
                        src={personal.avatarUrl} 
                        alt={personal.fullName}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center gap-3 p-6 text-center">
                        <div className="w-20 h-20 rounded-2xl bg-white border border-emerald-200 flex items-center justify-center shadow-md">
                          <CheckCircle2 className="w-10 h-10 text-[#2A9D8F]" />
                        </div>
                        <span className="font-mono text-sm font-bold text-slate-800 uppercase tracking-wider">
                          {personal.fullName.slice(0, 2)}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Status Indicator Pill */}
                  <div className="mt-3 bg-white/95 backdrop-blur-sm border border-emerald-200/80 rounded-xl px-3.5 py-2 text-center shadow-sm">
                    <span className="text-[11px] font-mono font-bold text-[#2A9D8F] flex items-center justify-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      SUITE_PASS // Zero Flaky Tests
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* SECTION 2: CATEGORIZED QA STACK */}
        <section id="skills" className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <div>
              <span className="text-xs font-mono text-[#E63946] font-bold uppercase tracking-wider">// TEST_AUTOMATION_SPECS</span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">QA Tooling & Test Frameworks</h2>
            </div>
            <span className="text-xs text-slate-500 font-mono hidden sm:inline-block">Regression Testing Ready</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-[#2A9D8F] font-mono font-bold text-sm">
                <PlayCircle className="w-4 h-4" />
                <span>Test Frameworks & Drivers</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.frameworks.map((fw, i) => (
                  <span key={i} className="text-xs font-mono bg-emerald-50/70 border border-emerald-200 text-emerald-800 px-3 py-1 rounded-lg">
                    {fw}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-[#E63946] font-mono font-bold text-sm">
                <Bug className="w-4 h-4" />
                <span>Testing & CI Tools</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.tools.map((tl, i) => (
                  <span key={i} className="text-xs font-mono bg-rose-50/70 border border-rose-200 text-rose-800 px-3 py-1 rounded-lg">
                    {tl}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-slate-800 font-mono font-bold text-sm">
                <Terminal className="w-4 h-4" />
                <span>Scripting Languages</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.languages.map((lang, i) => (
                  <span key={i} className="text-xs font-mono bg-slate-100 border border-slate-200 text-slate-800 px-3 py-1 rounded-lg">
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: TEST SUITE PROJECTS */}
        <section id="projects" className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <div>
              <span className="text-xs font-mono text-[#E63946] font-bold uppercase tracking-wider">// AUTOMATION_PROJECTS</span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">Test Suites & Framework Builds</h2>
            </div>
            <span className="text-xs text-slate-500 font-mono">{projects.length} Test Suites</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((proj, idx) => (
              <div 
                key={proj.id}
                className="bg-white rounded-2xl border border-slate-200/90 hover:border-[#2A9D8F] p-6 space-y-4 flex flex-col justify-between transition-all duration-200 shadow-sm hover:shadow-md group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between font-mono text-xs">
                    <span className="text-slate-500">TEST_SUITE_0{idx + 1}</span>
                    <span className="flex items-center gap-1 text-[11px] font-bold text-[#2A9D8F] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3" /> PASSING
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#2A9D8F] transition-colors">{proj.title}</h3>
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
                      Test Scripts
                    </a>
                  )}
                  {proj.liveUrl && (
                    <a
                      href={proj.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 text-center py-2 rounded-lg bg-[#2A9D8F] hover:bg-[#238477] text-white text-xs font-bold transition-colors"
                    >
                      Run Report ↗
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 4: QA EXPERIENCE & EDUCATION */}
        <section id="experience" className="space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <span className="text-xs font-mono text-[#E63946] font-bold uppercase tracking-wider">// EXECUTION_HISTORY</span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">QA Experience & Academic Qualifications</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/90 shadow-sm space-y-6">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 font-mono">
                <Briefcase className="w-5 h-5 text-[#2A9D8F]" />
                Quality Assurance Roles
              </h3>

              <div className="space-y-6">
                {experience.map((exp) => (
                  <div key={exp.id} className="border-l-2 border-[#2A9D8F] pl-4 space-y-1.5">
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="font-bold text-sm text-slate-900">{exp.role}</span>
                      <span className="text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                        {exp.startDate} – {exp.endDate}
                      </span>
                    </div>
                    <p className="text-xs font-bold text-[#E63946]">{exp.company} {exp.location ? `• ${exp.location}` : ''}</p>
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
                <GraduationCap className="w-5 h-5 text-[#E63946]" />
                Academic Background
              </h3>

              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="font-bold text-sm text-slate-900">{edu.institution}</span>
                      <span className="text-slate-500">{edu.startYear} – {edu.endYear}</span>
                    </div>
                    <p className="text-xs text-[#2A9D8F] font-semibold">{edu.degree} in {edu.fieldOfStudy} {edu.gpa ? `(GPA: ${edu.gpa})` : ''}</p>
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
            <span className="text-xs text-[#2A9D8F] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 font-bold">
              Automated Pipeline Available
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
              Need Reliable QA Automation?
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm font-sans max-w-xl mx-auto font-normal">
              Looking for a QA engineer to build automated Cypress/Selenium test suites, API test harness, and performance benchmarks? Get in touch.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
              {personal.email && (
                <a
                  href={`mailto:${personal.email}`}
                  className="px-6 py-3 rounded-xl bg-[#2A9D8F] hover:bg-[#238477] text-white text-xs font-bold transition-all shadow-md"
                >
                  Send Inquiry ({personal.email})
                </a>
              )}
              {personal.linkedinUrl && (
                <a
                  href={personal.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 text-xs font-bold transition-colors"
                >
                  QA LinkedIn Network
                </a>
              )}
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};
