import React from 'react';
import { PortfolioProfile } from '@/lib/types';
import { 
  Github, 
  Linkedin, 
  Mail, 
  MapPin, 
  ExternalLink, 
  Terminal, 
  Briefcase, 
  GraduationCap, 
  Code2, 
  Sparkles,
  Download,
  Wand2,
  User
} from 'lucide-react';

interface TemplateProps {
  profile: PortfolioProfile;
  isPublicView?: boolean;
}

export const ModernTechTemplate: React.FC<TemplateProps> = ({ profile, isPublicView }) => {
  const { personal, education, experience, projects, skills } = profile;

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen font-mono selection:bg-blue-600 selection:text-white pb-20">
      
      {/* Top Code Banner Decor */}
      <div className="bg-slate-900/80 border-b border-slate-800 px-4 py-2 text-xs text-slate-400 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
          </div>
          <span className="text-slate-500">~/nexus-developer/{profile.username}.config.ts</span>
        </div>
        <div className="flex items-center gap-2 text-slate-400">
          <Terminal className="w-3.5 h-3.5 text-blue-400" />
          <span>NEXUS_DEV_PORTFOLIO</span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-16 font-sans">
        
        {/* SECTION 1: PERSONAL BIO / HERO */}
        <section id="bio" className="glass-panel p-8 sm:p-12 rounded-2xl relative overflow-hidden border border-blue-500/20 shadow-2xl">
          <div className="flex flex-col md:flex-row items-center gap-8 justify-between">
            <div className="space-y-4 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{personal.targetRole || 'Software Engineering Candidate'}</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                {personal.fullName}
              </h1>

              <p className="text-blue-400 font-mono text-sm sm:text-base font-medium">
                {personal.headline}
              </p>

              <p className="text-slate-300 text-sm leading-relaxed">
                {personal.bio}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 font-sans pt-2">
                {personal.location && (
                  <span className="flex items-center gap-1.5 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-800">
                    <MapPin className="w-3.5 h-3.5 text-blue-400" />
                    {personal.location}
                  </span>
                )}
                {personal.email && (
                  <a href={`mailto:${personal.email}`} className="flex items-center gap-1.5 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-800 hover:text-white transition-colors">
                    <Mail className="w-3.5 h-3.5 text-blue-400" />
                    {personal.email}
                  </a>
                )}
              </div>

              {/* Social Links & CTA Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-4">
                {personal.githubUrl && (
                  <a 
                    href={personal.githubUrl} 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700/80 text-xs font-semibold transition-all"
                  >
                    <Github className="w-4 h-4 text-blue-400" />
                    GitHub Repos
                  </a>
                )}
                {personal.linkedinUrl && (
                  <a 
                    href={personal.linkedinUrl} 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700/80 text-xs font-semibold transition-all"
                  >
                    <Linkedin className="w-4 h-4 text-blue-400" />
                    LinkedIn Profile
                  </a>
                )}
                {isPublicView && (
                  <a 
                    href="/resume"
                    target="_blank"
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-600/30 transition-all"
                  >
                    <Download className="w-4 h-4" />
                    Resume PDF
                  </a>
                )}
              </div>
            </div>

            {/* Avatar Image */}
            {personal.avatarUrl && (
              <div className="relative group">
                <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                <img 
                  src={personal.avatarUrl} 
                  alt={personal.fullName}
                  className="relative w-40 h-40 sm:w-44 sm:h-44 rounded-full object-cover border-2 border-slate-900 shadow-2xl"
                />
              </div>
            )}
          </div>
        </section>

        {/* SECTION 2: EDUCATION */}
        <section id="education" className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-emerald-400" />
              Education
            </h2>
          </div>

          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id} className="glass-card p-6 rounded-xl border border-slate-800 space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                  <h3 className="text-base font-bold text-white">{edu.institution}</h3>
                  <span className="text-xs font-mono text-slate-400 bg-slate-900 px-2.5 py-1 rounded-md border border-slate-800 self-start sm:self-auto">
                    {edu.startYear} - {edu.endYear}
                  </span>
                </div>
                <p className="text-xs text-emerald-400 font-medium">
                  {edu.degree} in {edu.fieldOfStudy} {edu.gpa && `(GPA: ${edu.gpa})`}
                </p>
                {edu.coursework && (
                  <p className="text-xs text-slate-400 pt-1">
                    <strong className="text-slate-300">Relevant Coursework:</strong> {edu.coursework}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 3: EXPERIENCE */}
        <section id="experience" className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-indigo-400" />
              Work & Leadership Experience
            </h2>
          </div>

          <div className="space-y-6">
            {experience.map((exp) => (
              <div key={exp.id} className="glass-card rounded-xl p-6 border border-slate-800 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div>
                    <h3 className="text-base font-bold text-white">{exp.role}</h3>
                    <p className="text-indigo-400 text-xs font-semibold">{exp.company} {exp.location && `• ${exp.location}`}</p>
                  </div>
                  <span className="text-xs font-mono text-slate-400 bg-slate-900 px-2.5 py-1 rounded-md border border-slate-800 self-start sm:self-auto">
                    {exp.startDate} - {exp.endDate}
                  </span>
                </div>

                <ul className="space-y-1.5 pt-2 text-xs text-slate-300">
                  {exp.description.map((bullet, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-indigo-400 font-mono text-sm leading-none mt-0.5">›</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 4: PROJECTS */}
        <section id="projects" className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Code2 className="w-5 h-5 text-blue-400" />
              Technical Projects
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects.map((proj) => (
              <div 
                key={proj.id} 
                className="glass-card rounded-xl p-6 space-y-4 border border-slate-800 hover:border-blue-500/50 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-white">{proj.title}</h3>
                  <p className="text-slate-300 text-xs leading-relaxed">{proj.description}</p>
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {proj.technologies.map((tech, i) => (
                      <span key={i} className="text-[11px] font-mono bg-blue-950/60 text-blue-300 border border-blue-800/60 px-2 py-0.5 rounded-md">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-800/80 text-xs font-semibold">
                  {proj.githubUrl && (
                    <a href={proj.githubUrl} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white flex items-center gap-1.5">
                      <Github className="w-3.5 h-3.5 text-blue-400" /> Repo
                    </a>
                  )}
                  {proj.liveUrl && (
                    <a href={proj.liveUrl} target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300 flex items-center gap-1.5 ml-auto">
                      Demo <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 5: SKILLS */}
        <section id="skills" className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Terminal className="w-5 h-5 text-purple-400" />
              Technical Stack & Skills
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-xs">
            <div className="glass-card p-5 rounded-xl border border-slate-800 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-purple-400 font-mono">Languages</h3>
              <div className="flex flex-wrap gap-2">
                {skills.languages.map((skill, i) => (
                  <span key={i} className="bg-slate-900 border border-slate-700/80 text-slate-200 px-2.5 py-1 rounded-lg">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="glass-card p-5 rounded-xl border border-slate-800 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-blue-400 font-mono">Frameworks</h3>
              <div className="flex flex-wrap gap-2">
                {skills.frameworks.map((skill, i) => (
                  <span key={i} className="bg-slate-900 border border-slate-700/80 text-slate-200 px-2.5 py-1 rounded-lg">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="glass-card p-5 rounded-xl border border-slate-800 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400 font-mono">Tools</h3>
              <div className="flex flex-wrap gap-2">
                {skills.tools.map((skill, i) => (
                  <span key={i} className="bg-slate-900 border border-slate-700/80 text-slate-200 px-2.5 py-1 rounded-lg">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="glass-card p-5 rounded-xl border border-slate-800 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 font-mono">Soft Skills</h3>
              <div className="flex flex-wrap gap-2">
                {skills.softSkills.map((skill, i) => (
                  <span key={i} className="bg-slate-900 border border-slate-700/80 text-slate-200 px-2.5 py-1 rounded-lg">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};
