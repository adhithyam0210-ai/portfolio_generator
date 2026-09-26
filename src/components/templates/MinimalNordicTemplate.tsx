import React from 'react';
import { PortfolioProfile } from '@/lib/types';
import { Github, Linkedin, Mail, MapPin, ExternalLink, ArrowRight, Download, Compass, Layers } from 'lucide-react';

interface TemplateProps {
  profile: PortfolioProfile;
  isPublicView?: boolean;
}

export const MinimalNordicTemplate: React.FC<TemplateProps> = ({ profile, isPublicView }) => {
  const { personal, education, experience, projects, skills } = profile;

  return (
    <div className="bg-[#F6F4EF] text-[#1C1B1A] min-h-screen font-serif pb-24 selection:bg-[#D8D2C5] selection:text-black">
      
      {/* NORDIC TOP BAR */}
      <div className="border-b border-[#E2DDD3] py-5 px-6 sm:px-12 flex items-center justify-between font-sans">
        <span className="font-mono text-xs tracking-widest uppercase text-stone-700 font-bold">
          {personal.fullName}
        </span>

        <div className="flex items-center gap-4 text-xs font-semibold text-stone-700">
          {personal.githubUrl && (
            <a href={personal.githubUrl} target="_blank" rel="noreferrer" className="hover:text-black transition-colors">
              GitHub
            </a>
          )}
          {personal.linkedinUrl && (
            <a href={personal.linkedinUrl} target="_blank" rel="noreferrer" className="hover:text-black transition-colors">
              LinkedIn
            </a>
          )}
          {isPublicView && (
            <a href="/resume" target="_blank" className="border border-stone-800 px-3.5 py-1 rounded-full text-xs font-mono font-bold hover:bg-stone-900 hover:text-white transition-colors">
              PDF Resume
            </a>
          )}
        </div>
      </div>

      <div className="w-full max-w-[1500px] mx-auto px-4 sm:px-8 lg:px-12 pt-16 space-y-20">
        
        {/* HERO INTRO */}
        <div className="space-y-8 border-b border-[#E2DDD3] pb-16">

          <div className="flex flex-col-reverse md:flex-row md:items-start justify-between gap-8">
            <div className="space-y-6 max-w-4xl">
              <h1 className="text-4xl sm:text-7xl font-normal text-[#1C1B1A] tracking-tight leading-[1.08]">
                {personal.fullName}
              </h1>

              <p className="text-xl sm:text-2xl font-sans font-light text-stone-700 italic">
                {personal.headline}
              </p>

              <p className="text-stone-700 text-sm sm:text-base leading-relaxed font-sans font-normal">
                {personal.bio}
              </p>

              <div className="flex flex-wrap items-center gap-6 text-xs font-sans text-stone-600 font-semibold pt-2">
                {personal.location && (
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-stone-800" />
                    {personal.location}
                  </span>
                )}
                {personal.email && (
                  <a href={`mailto:${personal.email}`} className="flex items-center gap-1.5 hover:text-black">
                    <Mail className="w-3.5 h-3.5 text-stone-800" />
                    {personal.email}
                  </a>
                )}
              </div>
            </div>

            {/* Nordic Minimalist Profile Picture */}
            {personal.avatarUrl ? (
              <div className="shrink-0">
                <div className="w-28 h-28 sm:w-40 sm:h-40 rounded-2xl overflow-hidden border border-[#D5CEC0] shadow-sm bg-[#EFECE6] p-1">
                  <img
                    src={personal.avatarUrl}
                    alt={personal.fullName}
                    className="w-full h-full object-cover rounded-xl grayscale hover:grayscale-0 transition-all duration-500"
                  />
                </div>
              </div>
            ) : (
              <div className="shrink-0">
                <div className="w-28 h-28 sm:w-40 sm:h-40 rounded-2xl border border-[#D5CEC0] bg-[#EFECE6] flex items-center justify-center text-3xl font-serif text-stone-600">
                  {personal.fullName ? personal.fullName[0].toUpperCase() : 'P'}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* PROJECTS SHOWCASE */}
        <section className="space-y-10">
          <div className="flex items-baseline justify-between border-b border-[#E2DDD3] pb-4 font-sans">
            <h2 className="text-xs font-mono tracking-widest uppercase text-stone-500">
              SELECTED WORK ({projects.length})
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {projects.map((proj) => (
              <div
                key={proj.id}
                className="bg-[#EFECE6] p-8 rounded-none border border-[#E2DDD3] space-y-6 flex flex-col justify-between hover:border-stone-800 transition-colors font-sans"
              >
                <div className="space-y-3">
                  <h3 className="text-2xl font-serif font-normal text-[#1C1B1A]">{proj.title}</h3>
                  <p className="text-xs text-stone-700 font-light leading-relaxed">{proj.description}</p>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {proj.technologies.map((tech, i) => (
                      <span key={i} className="text-[10px] font-mono text-stone-600 border border-stone-300 px-2 py-0.5">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-4 pt-4 border-t border-[#E2DDD3] text-xs font-semibold">
                  {proj.githubUrl && (
                    <a href={proj.githubUrl} target="_blank" rel="noreferrer" className="hover:underline">
                      GitHub →
                    </a>
                  )}
                  {proj.liveUrl && (
                    <a href={proj.liveUrl} target="_blank" rel="noreferrer" className="hover:underline text-stone-900 font-bold">
                      Live Site ↗
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* DETAILS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 font-sans pt-6">
          
          {/* Skills */}
          <div className="space-y-6">
            <h3 className="text-xs font-mono tracking-widest uppercase text-stone-500 border-b border-[#E2DDD3] pb-3">
              TECHNICAL STACK
            </h3>

            <div className="space-y-4 text-xs font-medium">
              <div>
                <span className="font-mono text-stone-500 block mb-1">LANGUAGES</span>
                <p className="text-stone-900 font-semibold">{skills.languages.join(', ')}</p>
              </div>

              <div>
                <span className="font-mono text-stone-500 block mb-1">FRAMEWORKS</span>
                <p className="text-stone-900 font-semibold">{skills.frameworks.join(', ')}</p>
              </div>

              <div>
                <span className="font-mono text-stone-500 block mb-1">DEVELOPER TOOLS</span>
                <p className="text-stone-900 font-semibold">{skills.tools.join(', ')}</p>
              </div>
            </div>
          </div>

          {/* Experience & Education */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Experience */}
            <div className="space-y-6">
              <h3 className="text-xs font-mono tracking-widest uppercase text-stone-500 border-b border-[#E2DDD3] pb-3">
                EXPERIENCE HISTORY
              </h3>

              <div className="space-y-6">
                {experience.map((exp) => (
                  <div key={exp.id} className="space-y-2 border-b border-[#E2DDD3] pb-6">
                    <div className="flex justify-between items-baseline">
                      <span className="font-serif text-xl font-normal text-[#1C1B1A]">{exp.role}</span>
                      <span className="font-mono text-xs text-stone-500">{exp.startDate} – {exp.endDate}</span>
                    </div>
                    <p className="text-xs font-semibold text-stone-800">{exp.company} {exp.location ? `— ${exp.location}` : ''}</p>
                    <ul className="list-disc list-inside text-xs text-stone-700 font-light space-y-1 pt-1">
                      {exp.description.map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="space-y-6">
              <h3 className="text-xs font-mono tracking-widest uppercase text-stone-500 border-b border-[#E2DDD3] pb-3">
                EDUCATION
              </h3>

              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id} className="space-y-1">
                    <div className="flex justify-between items-baseline">
                      <span className="font-serif text-lg text-[#1C1B1A]">{edu.institution}</span>
                      <span className="font-mono text-xs text-stone-500">{edu.startYear} – {edu.endYear}</span>
                    </div>
                    <p className="text-xs font-semibold text-stone-700">{edu.degree} in {edu.fieldOfStudy} {edu.gpa ? `(GPA: ${edu.gpa})` : ''}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
