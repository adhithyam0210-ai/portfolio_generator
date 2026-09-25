import React from 'react';
import { PortfolioProfile } from '@/lib/types';
import { Github, Linkedin, Mail, MapPin, ExternalLink, Download } from 'lucide-react';

interface TemplateProps {
  profile: PortfolioProfile;
  isPublicView?: boolean;
}

export const MinimalistSlateTemplate: React.FC<TemplateProps> = ({ profile, isPublicView }) => {
  const { personal, education, experience, projects, skills } = profile;

  return (
    <div className="bg-slate-900 text-slate-100 min-h-screen font-sans selection:bg-slate-700 selection:text-white pb-24">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 pt-16 space-y-16">
        
        {/* SECTION 1: PERSONAL BIO */}
        <header id="bio" className="border-b border-slate-700/60 pb-10 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
                {personal.fullName}
              </h1>
              <p className="text-lg font-medium text-slate-300">
                {personal.headline}
              </p>
              <p className="text-slate-400 text-sm leading-relaxed">
                {personal.bio}
              </p>
            </div>

            {personal.avatarUrl && (
              <img 
                src={personal.avatarUrl} 
                alt={personal.fullName}
                className="w-32 h-32 rounded-xl object-cover border border-slate-700 shadow-lg shrink-0"
              />
            )}
          </div>

          <div className="flex flex-wrap items-center gap-6 pt-2 text-xs text-slate-300 font-medium">
            {personal.location && (
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-slate-400" />
                {personal.location}
              </span>
            )}
            {personal.email && (
              <a href={`mailto:${personal.email}`} className="flex items-center gap-1.5 hover:text-white transition-colors">
                <Mail className="w-4 h-4 text-slate-400" />
                {personal.email}
              </a>
            )}
            {personal.githubUrl && (
              <a href={personal.githubUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-white transition-colors">
                <Github className="w-4 h-4 text-slate-400" />
                GitHub
              </a>
            )}
            {personal.linkedinUrl && (
              <a href={personal.linkedinUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-white transition-colors">
                <Linkedin className="w-4 h-4 text-slate-400" />
                LinkedIn
              </a>
            )}
            {isPublicView && (
              <a 
                href="/resume"
                target="_blank"
                className="flex items-center gap-1.5 ml-auto text-slate-200 bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg border border-slate-700 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                PDF Resume
              </a>
            )}
          </div>
        </header>

        {/* SECTION 2: EDUCATION */}
        <section id="education" className="space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 border-b border-slate-700/60 pb-2">
            Education
          </h2>
          {education.map((edu) => (
            <div key={edu.id} className="space-y-1 text-xs">
              <div className="flex items-baseline justify-between font-bold text-slate-200">
                <span>{edu.institution}</span>
                <span className="font-mono font-normal text-slate-400">{edu.startYear} – {edu.endYear}</span>
              </div>
              <p className="text-slate-300">{edu.degree} in {edu.fieldOfStudy} {edu.gpa && `(GPA: ${edu.gpa})`}</p>
              {edu.coursework && <p className="text-slate-400 leading-relaxed"><strong className="text-slate-300">Coursework:</strong> {edu.coursework}</p>}
            </div>
          ))}
        </section>

        {/* SECTION 3: EXPERIENCE */}
        <section id="experience" className="space-y-6">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 border-b border-slate-700/60 pb-2">
            Professional Experience
          </h2>

          <div className="space-y-8">
            {experience.map((exp) => (
              <div key={exp.id} className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <div>
                    <h3 className="text-base font-bold text-white">{exp.role}</h3>
                    <p className="text-xs font-medium text-slate-400">{exp.company} {exp.location && `— ${exp.location}`}</p>
                  </div>
                  <span className="text-xs text-slate-400 font-mono">{exp.startDate} – {exp.endDate}</span>
                </div>

                <ul className="space-y-1.5 text-xs sm:text-sm text-slate-300">
                  {exp.description.map((bullet, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-slate-500 font-bold">—</span>
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
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 border-b border-slate-700/60 pb-2">
            Featured Projects
          </h2>

          <div className="space-y-8">
            {projects.map((proj) => (
              <div key={proj.id} className="group space-y-3">
                <div className="flex items-baseline justify-between">
                  <h3 className="text-lg font-bold text-white group-hover:text-slate-300 transition-colors">
                    {proj.title}
                  </h3>
                  <div className="flex items-center gap-3 text-xs">
                    {proj.githubUrl && (
                      <a href={proj.githubUrl} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white">
                        Repo
                      </a>
                    )}
                    {proj.liveUrl && (
                      <a href={proj.liveUrl} target="_blank" rel="noreferrer" className="text-slate-200 font-semibold hover:underline flex items-center gap-1">
                        Visit Site <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>

                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  {proj.description}
                </p>

                <div className="flex flex-wrap gap-2 text-xs font-mono text-slate-400">
                  {proj.technologies.map((tech, i) => (
                    <span key={i} className="bg-slate-800/80 px-2.5 py-0.5 rounded border border-slate-700/50">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 5: SKILLS */}
        <section id="skills" className="space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 border-b border-slate-700/60 pb-2">
            Skills Matrix
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-slate-300">
            <div>
              <strong className="text-slate-200 block mb-1">Languages:</strong>
              <p className="text-slate-400">{skills.languages.join(', ')}</p>
            </div>
            <div>
              <strong className="text-slate-200 block mb-1">Frameworks:</strong>
              <p className="text-slate-400">{skills.frameworks.join(', ')}</p>
            </div>
            <div>
              <strong className="text-slate-200 block mb-1">Tools & Platforms:</strong>
              <p className="text-slate-400">{skills.tools.join(', ')}</p>
            </div>
            <div>
              <strong className="text-slate-200 block mb-1">Soft Skills:</strong>
              <p className="text-slate-400">{skills.softSkills.join(', ')}</p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};
