import React from 'react';
import { PortfolioProfile } from '@/lib/types';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin, 
  GraduationCap, 
  Briefcase, 
  Code2, 
  Wand2, 
  Download, 
  ExternalLink,
  Star
} from 'lucide-react';

interface TemplateProps {
  profile: PortfolioProfile;
  isPublicView?: boolean;
}

export const JessicaCrimsonTemplate: React.FC<TemplateProps> = ({ profile, isPublicView }) => {
  const { personal, education, experience, projects, skills } = profile;

  return (
    <div className="bg-[#0a0a0a] text-slate-100 min-h-screen font-sans selection:bg-rose-600 selection:text-white pb-24">
      
      {/* HEADER */}
      <header className="border-b border-rose-950/40 px-6 py-5 bg-[#0f0f0f]/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-rose-600 flex items-center justify-center text-white font-black text-xs">
              ✦
            </div>
            <span className="font-extrabold text-lg text-white tracking-widest uppercase">{personal.fullName}</span>
          </div>

          <div className="flex items-center gap-4 text-xs font-bold">
            {isPublicView && (
              <a
                href="/resume"
                target="_blank"
                className="px-5 py-2 rounded-lg bg-rose-600 hover:bg-rose-700 text-white uppercase tracking-wider font-extrabold shadow-lg shadow-rose-600/30 transition-all"
              >
                Download Resume PDF
              </a>
            )}
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-20">
        
        {/* SECTION 1: PERSONAL BIO / HERO SECTION */}
        <section id="bio" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#121212] p-8 sm:p-14 rounded-3xl border border-rose-950/30 shadow-2xl">
          
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm rounded-2xl overflow-hidden border-2 border-rose-900/40 bg-slate-900 shadow-2xl">
              <img 
                src={personal.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600'} 
                alt={personal.fullName}
                className="w-full h-[380px] object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-rose-500">
              HELLO, I'M {personal.fullName.toUpperCase()}
            </span>

            <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
              {personal.targetRole || 'Software Engineering Candidate'}
            </h1>

            <p className="text-rose-400 font-bold text-base">
              {personal.headline}
            </p>

            <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-xl">
              {personal.bio}
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              {personal.githubUrl && (
                <a
                  href={personal.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-8 py-3.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-rose-600/30 transition-all flex items-center gap-2"
                >
                  <Github className="w-4 h-4" /> GitHub Repos
                </a>
              )}
              {personal.linkedinUrl && (
                <a
                  href={personal.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-8 py-3.5 rounded-lg bg-[#1a1a1a] hover:bg-slate-800 text-slate-200 border border-slate-800 font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2"
                >
                  <Linkedin className="w-4 h-4 text-rose-500" /> LinkedIn
                </a>
              )}
            </div>
          </div>

        </section>

        {/* HIGHLIGHT SPOTLIGHT CARDS FOR SECTIONS */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="bg-[#141414] p-8 rounded-2xl border border-rose-950/20 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-rose-950/40 text-rose-500 flex items-center justify-center font-bold">
              <GraduationCap className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-black text-white">Education</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              {education[0]?.institution} • {education[0]?.degree} ({education[0]?.startYear}-{education[0]?.endYear})
            </p>
          </div>

          <div className="bg-rose-600 p-8 rounded-2xl text-white space-y-3 shadow-xl shadow-rose-600/20 scale-105">
            <div className="w-10 h-10 rounded-lg bg-white/20 text-white flex items-center justify-center font-bold">
              <Briefcase className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-black text-white">Experience Spotlight</h3>
            <p className="text-rose-100 text-xs leading-relaxed">
              {experience[0]?.role} at {experience[0]?.company} ({experience[0]?.startDate} - {experience[0]?.endDate})
            </p>
          </div>

          <div className="bg-[#141414] p-8 rounded-2xl border border-rose-950/20 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-rose-950/40 text-rose-500 flex items-center justify-center font-bold">
              <Code2 className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-black text-white">Featured Projects</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              {projects.length} verified technical applications built with modern frameworks.
            </p>
          </div>

        </section>

        {/* SECTION 2: EDUCATION */}
        <section id="education" className="bg-[#141414] p-8 sm:p-10 rounded-3xl border border-rose-950/30 space-y-6">
          <div className="flex items-center gap-3 border-b border-rose-950/40 pb-4">
            <div className="w-10 h-10 rounded-lg bg-rose-950/40 text-rose-500 flex items-center justify-center font-bold">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-white uppercase tracking-wider">Education</h2>
              <p className="text-xs text-slate-400">Academic background and coursework</p>
            </div>
          </div>

          <div className="space-y-6">
            {education.map((edu) => (
              <div key={edu.id} className="p-6 rounded-2xl bg-[#1a1a1a] border border-rose-950/30 space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <h3 className="text-lg font-black text-white">{edu.institution}</h3>
                  <span className="text-xs font-mono font-bold text-rose-400 bg-rose-950/40 px-3 py-1 rounded-md border border-rose-900/40 self-start sm:self-auto">
                    {edu.startYear} - {edu.endYear}
                  </span>
                </div>
                <p className="text-sm font-extrabold text-rose-500">{edu.degree} in {edu.fieldOfStudy} {edu.gpa && `• GPA: ${edu.gpa}`}</p>
                {edu.coursework && <p className="text-xs text-slate-400 pt-1"><strong className="text-white">Coursework:</strong> {edu.coursework}</p>}
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 3: EXPERIENCE */}
        <section id="experience" className="bg-[#141414] p-8 sm:p-10 rounded-3xl border border-rose-950/30 space-y-6">
          <div className="flex items-center gap-3 border-b border-rose-950/40 pb-4">
            <div className="w-10 h-10 rounded-lg bg-rose-950/40 text-rose-500 flex items-center justify-center font-bold">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-white uppercase tracking-wider">Experience</h2>
              <p className="text-xs text-slate-400">Work & leadership experience</p>
            </div>
          </div>

          <div className="space-y-6">
            {experience.map((exp) => (
              <div key={exp.id} className="p-6 rounded-2xl bg-[#1a1a1a] border border-rose-950/30 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <h3 className="text-lg font-black text-white">{exp.role}</h3>
                  <span className="text-xs font-mono font-bold text-rose-400 bg-rose-950/40 px-3 py-1 rounded-md border border-rose-900/40 self-start sm:self-auto">
                    {exp.startDate} - {exp.endDate}
                  </span>
                </div>
                <p className="text-xs font-bold text-rose-500">{exp.company} {exp.location && `• ${exp.location}`}</p>
                <ul className="space-y-1.5 pt-1 text-xs text-slate-300">
                  {exp.description.map((bullet, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-rose-500 font-bold">•</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 4: PROJECTS */}
        <section id="projects" className="space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-black text-white uppercase tracking-wider">FEATURED PROJECTS</h2>
              <p className="text-slate-400 text-xs">Technical repositories & web applications</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects.map((proj) => (
              <div key={proj.id} className="bg-[#141414] rounded-2xl border border-rose-950/30 p-6 space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="w-full h-44 rounded-xl bg-slate-900 overflow-hidden border border-slate-800">
                    {proj.image ? (
                      <img src={proj.image} alt={proj.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-rose-500 font-bold">
                        {proj.title}
                      </div>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-white">{proj.title}</h3>
                  <p className="text-slate-400 text-xs leading-relaxed">{proj.description}</p>

                  <div className="flex flex-wrap gap-1 pt-1">
                    {proj.technologies.map((t, i) => (
                      <span key={i} className="text-[10px] bg-rose-950/60 text-rose-400 border border-rose-900/40 px-2 py-0.5 rounded font-mono">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-rose-950/40 flex items-center justify-between text-xs font-bold">
                  {proj.githubUrl && (
                    <a href={proj.githubUrl} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white">
                      GitHub
                    </a>
                  )}
                  {proj.liveUrl && (
                    <a href={proj.liveUrl} target="_blank" rel="noreferrer" className="text-rose-500 hover:underline flex items-center gap-1 ml-auto">
                      Demo <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 5: SKILLS */}
        <section id="skills" className="bg-[#141414] p-8 sm:p-10 rounded-3xl border border-rose-950/30 space-y-6">
          <div className="flex items-center gap-3 border-b border-rose-950/40 pb-4">
            <div className="w-10 h-10 rounded-lg bg-rose-950/40 text-rose-500 flex items-center justify-center font-bold">
              <Wand2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-black text-white uppercase tracking-wider">Skills Matrix</h2>
              <p className="text-xs text-slate-400">Languages, frameworks, tools, and soft skills</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs">
            <div className="space-y-2">
              <strong className="text-rose-500 font-bold block uppercase tracking-wider text-[11px]">Languages</strong>
              <div className="flex flex-wrap gap-1.5">
                {skills.languages.map((s, i) => (
                  <span key={i} className="bg-[#1a1a1a] text-slate-200 px-2.5 py-1 rounded border border-rose-950/40">{s}</span>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <strong className="text-rose-500 font-bold block uppercase tracking-wider text-[11px]">Frameworks</strong>
              <div className="flex flex-wrap gap-1.5">
                {skills.frameworks.map((s, i) => (
                  <span key={i} className="bg-[#1a1a1a] text-slate-200 px-2.5 py-1 rounded border border-rose-950/40">{s}</span>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <strong className="text-rose-500 font-bold block uppercase tracking-wider text-[11px]">Tools</strong>
              <div className="flex flex-wrap gap-1.5">
                {skills.tools.map((s, i) => (
                  <span key={i} className="bg-[#1a1a1a] text-slate-200 px-2.5 py-1 rounded border border-rose-950/40">{s}</span>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <strong className="text-rose-500 font-bold block uppercase tracking-wider text-[11px]">Soft Skills</strong>
              <div className="flex flex-wrap gap-1.5">
                {skills.softSkills.map((s, i) => (
                  <span key={i} className="bg-[#1a1a1a] text-slate-200 px-2.5 py-1 rounded border border-rose-950/40">{s}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};
