import React from 'react';
import { PortfolioProfile } from '@/lib/types';
import { Mail, Phone, MapPin, Globe, Linkedin, Github, Download } from 'lucide-react';

interface TemplateProps {
  profile: PortfolioProfile;
  isPublicView?: boolean;
}

export const ExecutiveClassicTemplate: React.FC<TemplateProps> = ({ profile, isPublicView }) => {
  const { personal, education, experience, projects, skills } = profile;

  return (
    <div className="bg-slate-900 text-slate-100 min-h-screen font-serif selection:bg-blue-900 selection:text-white pb-24">
      <div className="max-w-5xl mx-auto px-6 sm:px-8 pt-12">
        
        {/* HEADER */}
        <header className="bg-slate-950 p-8 rounded-xl border border-slate-800 shadow-xl mb-10 space-y-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
            <div className="space-y-2 text-center sm:text-left">
              <h1 className="text-3xl sm:text-4xl font-bold tracking-wide text-white uppercase font-sans">
                {personal.fullName}
              </h1>
              <p className="text-base text-blue-400 font-sans font-medium tracking-wide">
                {personal.headline}
              </p>
              <p className="text-xs text-slate-300 max-w-2xl leading-relaxed font-sans font-normal pt-1">
                {personal.bio}
              </p>
            </div>

            {personal.avatarUrl && (
              <img 
                src={personal.avatarUrl} 
                alt={personal.fullName}
                className="w-32 h-32 rounded-lg object-cover border-2 border-slate-800 shadow-lg shrink-0"
              />
            )}
          </div>

          <div className="border-t border-slate-800 pt-4 flex flex-wrap items-center justify-between text-xs font-sans text-slate-300 gap-4">
            <div className="flex flex-wrap items-center gap-6">
              {personal.location && (
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-blue-400" />
                  {personal.location}
                </span>
              )}
              {personal.email && (
                <a href={`mailto:${personal.email}`} className="flex items-center gap-1.5 hover:text-white">
                  <Mail className="w-3.5 h-3.5 text-blue-400" />
                  {personal.email}
                </a>
              )}
              {personal.phone && (
                <span className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-blue-400" />
                  {personal.phone}
                </span>
              )}
            </div>

            <div className="flex items-center gap-4">
              {personal.githubUrl && (
                <a href={personal.githubUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-slate-300 hover:text-white">
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
              )}
              {personal.linkedinUrl && (
                <a href={personal.linkedinUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-slate-300 hover:text-white">
                  <Linkedin className="w-3.5 h-3.5" />
                  <span>LinkedIn</span>
                </a>
              )}
              {isPublicView && (
                <a 
                  href="/resume"
                  target="_blank"
                  className="flex items-center gap-1.5 bg-blue-700 hover:bg-blue-600 text-white px-3 py-1.5 rounded text-xs font-sans font-bold"
                >
                  <Download className="w-3.5 h-3.5" />
                  Resume PDF
                </a>
              )}
            </div>
          </div>
        </header>

        {/* TWO COLUMN LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* MAIN COLUMN (Experience & Projects) */}
          <div className="lg:col-span-2 space-y-10 font-sans">
            
            {/* WORK EXPERIENCE */}
            <section className="space-y-6">
              <h2 className="text-base font-bold text-white uppercase tracking-wider border-b-2 border-blue-500 pb-1.5">
                Professional Experience
              </h2>

              <div className="space-y-6">
                {experience.map((exp) => (
                  <div key={exp.id} className="bg-slate-950 p-6 rounded-lg border border-slate-800 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                      <h3 className="text-sm font-bold text-white uppercase">{exp.role}</h3>
                      <span className="text-xs font-semibold text-slate-400 font-mono">{exp.startDate} – {exp.endDate}</span>
                    </div>
                    <p className="text-xs font-semibold text-blue-400">{exp.company} {exp.location && `| ${exp.location}`}</p>
                    <ul className="space-y-1.5 text-xs text-slate-300 pt-1">
                      {exp.description.map((bullet, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-blue-500 font-bold">•</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* PROJECTS */}
            <section className="space-y-6">
              <h2 className="text-base font-bold text-white uppercase tracking-wider border-b-2 border-blue-500 pb-1.5">
                Key Technical Projects
              </h2>

              <div className="space-y-6">
                {projects.map((proj) => (
                  <div key={proj.id} className="bg-slate-950 p-6 rounded-lg border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold text-white">{proj.title}</h3>
                      <div className="flex items-center gap-3 text-xs">
                        {proj.githubUrl && <a href={proj.githubUrl} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white">GitHub</a>}
                        {proj.liveUrl && <a href={proj.liveUrl} target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">Demo</a>}
                      </div>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">{proj.description}</p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {proj.technologies.map((tech, i) => (
                        <span key={i} className="text-[10px] bg-slate-900 border border-slate-800 text-slate-400 px-2 py-0.5 rounded">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

          </div>

          {/* SIDE COLUMN (Education & Skills) */}
          <div className="space-y-10 font-sans">
            
            {/* EDUCATION */}
            <section className="space-y-4">
              <h2 className="text-base font-bold text-white uppercase tracking-wider border-b-2 border-blue-500 pb-1.5">
                Education
              </h2>
              {education.map((edu) => (
                <div key={edu.id} className="bg-slate-950 p-5 rounded-lg border border-slate-800 space-y-2 text-xs">
                  <h3 className="font-bold text-white text-sm">{edu.institution}</h3>
                  <p className="text-blue-400 font-semibold">{edu.degree}</p>
                  <p className="text-slate-300">{edu.fieldOfStudy}</p>
                  <p className="text-slate-400 font-mono">{edu.startYear} – {edu.endYear}</p>
                  {edu.gpa && <p className="text-slate-300 font-semibold">Cumulative GPA: {edu.gpa}</p>}
                </div>
              ))}
            </section>

            {/* SKILLS */}
            <section className="space-y-4">
              <h2 className="text-base font-bold text-white uppercase tracking-wider border-b-2 border-blue-500 pb-1.5">
                Core Competencies
              </h2>
              
              <div className="bg-slate-950 p-5 rounded-lg border border-slate-800 space-y-4 text-xs">
                <div>
                  <strong className="text-white block mb-1 text-xs uppercase tracking-wide">Technical Languages</strong>
                  <div className="flex flex-wrap gap-1">
                    {skills.languages.map((s, i) => (
                      <span key={i} className="bg-slate-900 px-2 py-1 rounded text-slate-300 border border-slate-800">{s}</span>
                    ))}
                  </div>
                </div>

                <div>
                  <strong className="text-white block mb-1 text-xs uppercase tracking-wide">Frameworks & Libs</strong>
                  <div className="flex flex-wrap gap-1">
                    {skills.frameworks.map((s, i) => (
                      <span key={i} className="bg-slate-900 px-2 py-1 rounded text-slate-300 border border-slate-800">{s}</span>
                    ))}
                  </div>
                </div>

                <div>
                  <strong className="text-white block mb-1 text-xs uppercase tracking-wide">Tools & Platforms</strong>
                  <div className="flex flex-wrap gap-1">
                    {skills.tools.map((s, i) => (
                      <span key={i} className="bg-slate-900 px-2 py-1 rounded text-slate-300 border border-slate-800">{s}</span>
                    ))}
                  </div>
                </div>
              </div>
            </section>

          </div>

        </div>

      </div>
    </div>
  );
};
