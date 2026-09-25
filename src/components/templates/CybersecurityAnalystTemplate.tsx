import React from 'react';
import { PortfolioProfile } from '@/lib/types';
import { 
  Github, 
  Linkedin, 
  Mail, 
  MapPin, 
  ExternalLink, 
  ShieldCheck, 
  ShieldAlert, 
  Lock, 
  Key, 
  Terminal, 
  Cpu, 
  Download,
  AlertTriangle,
  Briefcase,
  GraduationCap,
  Shield
} from 'lucide-react';

interface TemplateProps {
  profile: PortfolioProfile;
  isPublicView?: boolean;
}

export const CybersecurityAnalystTemplate: React.FC<TemplateProps> = ({ profile, isPublicView }) => {
  const { personal, education, experience, projects, skills } = profile;

  return (
    <div className="bg-[#0A0A0A] text-slate-200 min-h-screen font-sans selection:bg-[#00FF66] selection:text-black pb-24 scroll-smooth">
      
      {/* Tactical Matrix Status Bar */}
      <nav className="sticky top-0 z-50 bg-[#0A0A0A]/95 backdrop-blur-md border-b border-[#00FF66]/30 px-4 sm:px-8 py-3 shadow-sm">
        <div className="w-full max-w-[1500px] mx-auto flex items-center justify-between font-mono">
          <a href="#bio" className="flex items-center gap-3 group">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00FF66] animate-ping"></span>
            <span className="font-bold text-xs tracking-wider text-[#00FF66] group-hover:text-emerald-300 transition-colors">
              SEC_OPS // {personal.fullName}
            </span>
          </a>

          <div className="hidden md:flex items-center gap-5 text-xs text-slate-400">
            <a href="#bio" className="hover:text-[#00FF66] transition-colors">[DEF_PROFILE]</a>
            <a href="#skills" className="hover:text-[#00FF66] transition-colors">[ARSENAL]</a>
            <a href="#projects" className="hover:text-[#00FF66] transition-colors">[HARDENING_LABS]</a>
            <a href="#experience" className="hover:text-[#00FF66] transition-colors">[AUDIT_LOGS]</a>
            <a href="#contact" className="hover:text-[#00FF66] transition-colors">[COMMS]</a>
          </div>

            <a 
              href={personal.resumeUrl || "/resume"} 
              download={personal.resumeUrl ? (personal.resumeFileName || `${personal.fullName.replace(/\s+/g, '_')}_Resume.pdf`) : undefined}
              target={personal.resumeUrl ? undefined : "_blank"} 
              className="text-xs font-bold px-3.5 py-1.5 bg-[#00FF66] text-black rounded hover:bg-[#00cc52] transition-colors shadow-sm inline-flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>CLEARANCE_RESUME</span>
            </a>
        </div>
      </nav>

      <div className="w-full max-w-[1500px] mx-auto px-4 sm:px-8 lg:px-12 pt-8 sm:pt-12 space-y-20 sm:space-y-24">
        
        {/* SECTION 1: HERO / TACTICAL HUD (Aligned 12-Column Responsive Grid) */}
        <section id="bio">
          <div className="bg-[#141414] rounded-3xl border border-[#00FF66]/40 p-6 sm:p-10 lg:p-12 shadow-[0_0_40px_rgba(0,255,102,0.06)] relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Left Column: Security Bio (8 cols) */}
              <div className="lg:col-span-8 space-y-6 text-left">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded bg-[#0A0A0A] border border-[#00FF66]/50 text-[#00FF66] font-mono text-xs">
                  <ShieldCheck className="w-4 h-4 text-[#00FF66]" />
                  <span>CLASSIFICATION: {personal.targetRole || 'Cybersecurity & SOC Analyst'}</span>
                </div>

                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.12]">
                  Defending <span className="text-[#00FF66]">infrastructure</span>, mitigating threat vectors.
                </h1>

                <p className="text-[#00FF66] font-mono text-sm sm:text-base font-semibold">
                  &gt; {personal.headline}
                </p>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-normal max-w-3xl">
                  {personal.bio}
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-1 font-mono text-xs text-slate-300">
                  {personal.location && (
                    <span className="flex items-center gap-1.5 bg-[#0A0A0A] px-3.5 py-1.5 rounded border border-slate-800">
                      <MapPin className="w-3.5 h-3.5 text-[#00FF66]" />
                      BASE: {personal.location}
                    </span>
                  )}
                  {personal.email && (
                    <a href={`mailto:${personal.email}`} className="flex items-center gap-1.5 bg-[#0A0A0A] hover:bg-neutral-900 px-3.5 py-1.5 rounded border border-slate-800 text-[#00FF66] transition-colors">
                      <Mail className="w-3.5 h-3.5 text-[#00FF66]" />
                      {personal.email}
                    </a>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-2 font-mono">
                  {personal.githubUrl && (
                    <a
                      href={personal.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 px-5 py-2.5 rounded bg-[#00FF66] text-black text-xs font-black hover:bg-[#00cc52] transition-colors shadow-lg shadow-[#00FF66]/20"
                    >
                      <Github className="w-4 h-4" />
                      GITHUB_AUDITS
                    </a>
                  )}
                  {personal.linkedinUrl && (
                    <a
                      href={personal.linkedinUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 px-5 py-2.5 rounded bg-[#0A0A0A] text-slate-200 border border-[#00FF66]/40 text-xs font-bold hover:bg-neutral-900 transition-colors"
                    >
                      <Linkedin className="w-4 h-4 text-[#00FF66]" />
                      SECURITY_NETWORK
                    </a>
                  )}
                </div>
              </div>

              {/* Right Column: Profile Picture Card (4 cols) */}
              <div className="lg:col-span-4 flex flex-col items-center justify-center">
                <div className="relative group">
                  <div className="w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 rounded-2xl overflow-hidden border-2 border-[#00FF66] bg-[#0A0A0A] p-1.5 shadow-[0_0_30px_rgba(0,255,102,0.2)] flex items-center justify-center">
                    {personal.avatarUrl ? (
                      <img 
                        src={personal.avatarUrl} 
                        alt={personal.fullName}
                        className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center rounded-xl bg-[#141414] text-[#00FF66] font-mono">
                        <Shield className="w-16 h-16 mb-1 opacity-80" />
                        <span className="text-xs font-bold">ANALYST_ID</span>
                      </div>
                    )}
                  </div>

                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-[#0A0A0A] border border-[#00FF66]/60 px-3.5 py-1 rounded-full shadow-lg text-[11px] font-mono text-[#00FF66] whitespace-nowrap flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#00FF66] animate-pulse"></span>
                    SECURITY_CLEARANCE: PASS
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* SECTION 2: TACTICAL TOOLSET */}
        <section id="skills" className="space-y-6">
          <div className="flex items-end justify-between border-b border-[#00FF66]/20 pb-4 font-mono">
            <div className="space-y-1">
              <span className="text-xs text-[#00FF66] tracking-wider">&gt; DEFENSIVE_OFFENSIVE_TOOLKIT</span>
              <h2 className="text-2xl sm:text-3xl font-black text-white font-sans">Tactical Security Arsenal</h2>
            </div>
            <span className="text-xs text-slate-500 hidden sm:inline-block">AUDIT_VERIFIED</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono">
            <div className="bg-[#141414] p-6 rounded-2xl border border-neutral-800 space-y-4">
              <div className="flex items-center gap-2 text-[#00FF66] font-bold text-sm">
                <Lock className="w-4 h-4" />
                <span>Security Tools & Scanners</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.tools.map((tl, i) => (
                  <span key={i} className="text-xs bg-[#0A0A0A] border border-[#00FF66]/30 text-slate-300 px-3 py-1.5 rounded-lg">
                    {tl}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-[#141414] p-6 rounded-2xl border border-neutral-800 space-y-4">
              <div className="flex items-center gap-2 text-[#00FF66] font-bold text-sm">
                <Terminal className="w-4 h-4" />
                <span>Scripting & Exploitation</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.languages.map((lang, i) => (
                  <span key={i} className="text-xs bg-[#0A0A0A] border border-[#00FF66]/30 text-slate-300 px-3 py-1.5 rounded-lg">
                    {lang}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-[#141414] p-6 rounded-2xl border border-neutral-800 space-y-4">
              <div className="flex items-center gap-2 text-[#00FF66] font-bold text-sm">
                <ShieldCheck className="w-4 h-4" />
                <span>Protocols & Environments</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.frameworks.map((fw, i) => (
                  <span key={i} className="text-xs bg-[#0A0A0A] border border-[#00FF66]/30 text-slate-300 px-3 py-1.5 rounded-lg">
                    {fw}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: SECURITY LABS & HARDENING */}
        <section id="projects" className="space-y-6">
          <div className="flex items-end justify-between border-b border-[#00FF66]/20 pb-4 font-mono">
            <div className="space-y-1">
              <span className="text-xs text-[#00FF66] tracking-wider">&gt; SECURITY_CASES // LOGS</span>
              <h2 className="text-2xl sm:text-3xl font-black text-white font-sans">Vulnerability Analysis & Labs</h2>
            </div>
            <span className="text-xs text-slate-400">{projects.length} Cases Audited</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((proj, idx) => (
              <div 
                key={proj.id}
                className="bg-[#141414] rounded-2xl border border-neutral-800 hover:border-[#00FF66]/60 p-6 space-y-4 flex flex-col justify-between transition-all group shadow-lg"
              >
                <div className="space-y-3 font-mono">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#00FF66]">CASE_ID: #{idx + 101}</span>
                    {proj.featured && (
                      <span className="text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800 text-[10px]">
                        HIGH_PRIORITY
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-[#00FF66] transition-colors font-sans">{proj.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans font-normal">{proj.description}</p>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {proj.technologies.map((tech, i) => (
                      <span key={i} className="text-[10px] bg-[#0A0A0A] text-slate-400 border border-neutral-800 px-2 py-0.5 rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-neutral-800 font-mono">
                  {proj.githubUrl && (
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 text-center py-2.5 rounded bg-[#0A0A0A] hover:bg-neutral-900 text-slate-300 border border-neutral-700 text-xs transition-colors"
                    >
                      Audit Proof
                    </a>
                  )}
                  {proj.liveUrl && (
                    <a
                      href={proj.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 text-center py-2.5 rounded bg-[#00FF66] text-black text-xs font-bold hover:bg-[#00cc52] transition-colors"
                    >
                      Live Report ↗
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 4: INCIDENT RESPONSE EXPERIENCE & EDUCATION */}
        <section id="experience" className="space-y-6">
          <div className="border-b border-[#00FF66]/20 pb-4 font-mono">
            <span className="text-xs text-[#00FF66] tracking-wider">&gt; AUDIT_TRAIL // EXPERIENCE</span>
            <h2 className="text-2xl sm:text-3xl font-black text-white font-sans mt-1">Operational History & Credentials</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-[#141414] p-6 sm:p-8 rounded-2xl border border-neutral-800 space-y-6">
              <h3 className="text-lg font-bold text-white flex items-center gap-2 font-mono">
                <Briefcase className="w-5 h-5 text-[#00FF66]" />
                Security Engagements
              </h3>

              <div className="space-y-6 font-mono">
                {experience.map((exp) => (
                  <div key={exp.id} className="border-l-2 border-[#00FF66] pl-4 space-y-1.5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                      <span className="font-bold text-sm text-white font-sans">{exp.role}</span>
                      <span className="text-slate-400 bg-[#0A0A0A] px-2 py-0.5 rounded border border-neutral-800 w-fit">
                        {exp.startDate} – {exp.endDate}
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-[#00FF66] font-sans">{exp.company} {exp.location ? `• ${exp.location}` : ''}</p>
                    <ul className="list-disc list-inside text-xs text-slate-300 space-y-1 pt-1 font-sans font-normal">
                      {exp.description.map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#141414] p-6 sm:p-8 rounded-2xl border border-neutral-800 space-y-6">
              <h3 className="text-lg font-bold text-white flex items-center gap-2 font-mono">
                <GraduationCap className="w-5 h-5 text-[#00FF66]" />
                Academic Clearances
              </h3>

              <div className="space-y-4 font-mono">
                {education.map((edu) => (
                  <div key={edu.id} className="p-4 rounded-xl bg-[#0A0A0A] border border-neutral-800 space-y-1">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-sm text-white font-sans">{edu.institution}</span>
                      <span className="text-slate-400">{edu.startYear} – {edu.endYear}</span>
                    </div>
                    <p className="text-xs text-[#00FF66] font-semibold font-sans">{edu.degree} in {edu.fieldOfStudy} {edu.gpa ? `(GPA: ${edu.gpa})` : ''}</p>
                    {edu.coursework && <p className="text-xs text-slate-400 font-sans font-normal">Coursework: {edu.coursework}</p>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: SECURE COMMS */}
        <section id="contact" className="pt-4 font-mono">
          <div className="bg-[#141414] rounded-3xl border border-[#00FF66]/50 p-8 sm:p-14 text-center space-y-5">
            <span className="text-xs text-[#00FF66] bg-[#00FF66]/10 px-3 py-1 rounded-full border border-[#00FF66]/40">
              PGP_CHANNEL // READY
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white font-sans">
              Open Incident or Recruitment Comms
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm font-sans max-w-xl mx-auto font-normal leading-relaxed">
              Seeking a cybersecurity specialist for penetration testing, vulnerability remediation, or SOC engineering? Initiate contact.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
              {personal.email && (
                <a
                  href={`mailto:${personal.email}`}
                  className="px-6 py-3 rounded-xl bg-[#00FF66] text-black text-xs font-black hover:bg-[#00cc52] transition-colors shadow-lg shadow-[#00FF66]/20"
                >
                  TRANSMIT_EMAIL ({personal.email})
                </a>
              )}
              {personal.linkedinUrl && (
                <a
                  href={personal.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-3 rounded-xl bg-[#0A0A0A] text-slate-200 border border-neutral-700 text-xs font-bold hover:bg-neutral-900 transition-colors"
                >
                  SEC_LINKEDIN
                </a>
              )}
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};
