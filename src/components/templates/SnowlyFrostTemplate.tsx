import React from 'react';
import { PortfolioProfile } from '@/lib/types';
import { 
  Star, 
  ArrowRight, 
  CheckCircle2, 
  Phone, 
  Mail, 
  MapPin, 
  Github, 
  Linkedin, 
  Download,
  ExternalLink,
  Code2,
  GraduationCap,
  Briefcase,
  Wand2
} from 'lucide-react';

interface TemplateProps {
  profile: PortfolioProfile;
  isPublicView?: boolean;
}

export const SnowlyFrostTemplate: React.FC<TemplateProps> = ({ profile, isPublicView }) => {
  const { personal, education, experience, projects, skills } = profile;

  return (
    <div className="bg-[#f0f7ff] text-slate-900 min-h-screen font-sans selection:bg-blue-600 selection:text-white pb-24">
      
      {/* HEADER BAR */}
      <header className="bg-white/95 backdrop-blur-md border-b border-blue-100 sticky top-0 z-40 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-black text-base shadow-md">
              ❄
            </div>
            <span className="font-black text-xl text-slate-900 tracking-tight">{personal.fullName}</span>
          </div>

          <div className="flex items-center gap-4 text-sm font-bold text-slate-700">
            {personal.phone && (
              <span className="hidden sm:flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-full font-bold">
                <Phone className="w-4 h-4 text-blue-400" />
                {personal.phone}
              </span>
            )}
            {isPublicView && (
              <a 
                href="/resume"
                target="_blank"
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-full font-extrabold shadow-lg shadow-blue-500/25 transition-all hover:scale-[1.02]"
              >
                <Download className="w-4 h-4" />
                Download Resume PDF
              </a>
            )}
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-16">
        
        {/* SECTION 1: PERSONAL BIO / HERO SECTION */}
        <section id="bio" className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-white p-8 sm:p-14 rounded-3xl border border-blue-100/90 shadow-xl shadow-blue-900/5">
          
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-sm font-bold text-amber-600 bg-amber-50 border border-amber-200 px-4 py-1.5 rounded-full">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-slate-800 font-extrabold">5.0 Ranked Student Candidate</span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-slate-900 tracking-tight leading-[1.1]">
              {personal.fullName}
            </h1>

            <p className="text-blue-600 font-extrabold text-xl sm:text-2xl leading-snug">
              {personal.headline}
            </p>

            <p className="text-slate-700 text-base sm:text-lg leading-relaxed font-normal">
              {personal.bio}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-sm font-bold text-slate-700 pt-1">
              {personal.location && (
                <span className="flex items-center gap-2 bg-blue-50/80 px-4 py-2 rounded-full border border-blue-200">
                  <MapPin className="w-4 h-4 text-blue-600" />
                  {personal.location}
                </span>
              )}
              {personal.email && (
                <a href={`mailto:${personal.email}`} className="flex items-center gap-2 bg-blue-50/80 px-4 py-2 rounded-full border border-blue-200 hover:text-blue-600 transition-colors">
                  <Mail className="w-4 h-4 text-blue-600" />
                  {personal.email}
                </a>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-3">
              {personal.githubUrl && (
                <a
                  href={personal.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-7 py-4 rounded-full bg-slate-900 hover:bg-blue-600 text-white text-sm font-extrabold flex items-center gap-2.5 transition-all shadow-xl hover:scale-[1.02]"
                >
                  <Github className="w-5 h-5" /> GitHub Repositories
                </a>
              )}
              {personal.linkedinUrl && (
                <a
                  href={personal.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-7 py-4 rounded-full bg-blue-50 text-blue-700 text-sm font-extrabold border border-blue-200 flex items-center gap-2.5 hover:bg-blue-100 transition-all shadow-sm"
                >
                  <Linkedin className="w-5 h-5" /> LinkedIn Profile
                </a>
              )}
            </div>
          </div>

          {/* Hero Avatar Image */}
          <div className="lg:col-span-5 relative flex justify-center">
            {personal.avatarUrl ? (
              <div className="relative w-full max-w-md rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <img 
                  src={personal.avatarUrl} 
                  alt={personal.fullName}
                  className="w-full h-[420px] sm:h-[460px] object-cover"
                />
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-5 rounded-2xl border border-blue-100 shadow-xl">
                  <p className="text-base font-black text-slate-900">{personal.fullName}</p>
                  <p className="text-xs sm:text-sm text-blue-600 font-extrabold">{personal.targetRole || 'Software Engineering Candidate'}</p>
                </div>
              </div>
            ) : (
              <div className="w-full h-[420px] bg-blue-600 rounded-3xl flex items-center justify-center text-white text-5xl font-black shadow-2xl">
                {personal.fullName.charAt(0)}
              </div>
            )}
          </div>

        </section>

        {/* STATS SUMMARY BAR */}
        <section className="bg-white p-8 sm:p-10 rounded-3xl border border-blue-100 shadow-lg grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">Projects Built</span>
            <span className="text-4xl sm:text-5xl font-black text-slate-900">{projects.length}</span>
            <p className="text-xs text-blue-600 font-bold mt-1">Verified Repositories</p>
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">Experience</span>
            <span className="text-4xl sm:text-5xl font-black text-blue-600">{personal.yearsExperience || '3+ Yrs'}</span>
            <p className="text-xs text-slate-600 font-bold mt-1">Practical Development</p>
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">Academic GPA</span>
            <span className="text-4xl sm:text-5xl font-black text-slate-900">{education[0]?.gpa || '3.9'}</span>
            <p className="text-xs text-emerald-600 font-bold mt-1">Academic Honors</p>
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">Recruiter Status</span>
            <span className="text-4xl sm:text-5xl font-black text-indigo-600">Open</span>
            <p className="text-xs text-slate-600 font-bold mt-1">Ready for Hiring</p>
          </div>
        </section>

        {/* SECTION 2: EDUCATION */}
        <section id="education" className="bg-white p-8 sm:p-12 rounded-3xl border border-blue-100 shadow-xl space-y-8">
          <div className="flex items-center gap-4 border-b border-blue-100 pb-5">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold shadow-sm">
              <GraduationCap className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Education & Academic Background</h2>
              <p className="text-sm text-slate-500 font-medium">Degrees, institutions, GPA, and coursework</p>
            </div>
          </div>

          <div className="space-y-6">
            {education.map((edu) => (
              <div key={edu.id} className="p-7 rounded-2xl bg-blue-50/50 border border-blue-100 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <h3 className="text-xl font-extrabold text-slate-900">{edu.institution}</h3>
                  <span className="text-sm font-bold text-blue-700 bg-white px-4 py-1.5 rounded-full border border-blue-200 self-start sm:self-auto shadow-sm">
                    {edu.startYear} - {edu.endYear}
                  </span>
                </div>
                <p className="text-base font-extrabold text-blue-600">
                  {edu.degree} in {edu.fieldOfStudy} {edu.gpa && `• Cumulative GPA: ${edu.gpa}`}
                </p>
                {edu.coursework && (
                  <p className="text-sm text-slate-700 pt-1 leading-relaxed">
                    <strong className="text-slate-900">Relevant Coursework:</strong> {edu.coursework}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 3: EXPERIENCE */}
        <section id="experience" className="bg-white p-8 sm:p-12 rounded-3xl border border-blue-100 shadow-xl space-y-8">
          <div className="flex items-center gap-4 border-b border-blue-100 pb-5">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold shadow-sm">
              <Briefcase className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Work & Leadership Experience</h2>
              <p className="text-sm text-slate-500 font-medium">Positions, internships, and achievement bullets</p>
            </div>
          </div>

          <div className="space-y-6">
            {experience.map((exp) => (
              <div key={exp.id} className="p-7 rounded-2xl bg-blue-50/50 border border-blue-100 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <h3 className="text-xl font-extrabold text-slate-900">{exp.role}</h3>
                  <span className="text-sm font-bold text-blue-700 bg-white px-4 py-1.5 rounded-full border border-blue-200 self-start sm:self-auto shadow-sm">
                    {exp.startDate} - {exp.endDate}
                  </span>
                </div>
                <p className="text-sm font-extrabold text-blue-600">{exp.company} {exp.location && `• ${exp.location}`}</p>
                <ul className="space-y-2 pt-2 text-sm text-slate-700">
                  {exp.description.map((bullet, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="text-blue-600 font-bold text-base">•</span>
                      <span className="leading-relaxed">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 4: PROJECTS */}
        <section id="projects" className="space-y-8">
          <div className="flex items-center gap-4 border-b border-blue-200/60 pb-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-bold shadow-md">
              <Code2 className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Technical Projects</h2>
              <p className="text-sm text-slate-500 font-medium">Web apps, algorithms, and software implementations</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((proj) => (
              <div key={proj.id} className="bg-white p-7 rounded-3xl border border-blue-100 shadow-lg hover:shadow-2xl transition-all duration-300 space-y-5 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="w-full h-48 rounded-2xl bg-blue-50 overflow-hidden border border-blue-100">
                    {proj.image ? (
                      <img src={proj.image} alt={proj.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-blue-600 font-extrabold text-base">
                        {proj.title}
                      </div>
                    )}
                  </div>
                  <h3 className="text-xl font-black text-slate-900">{proj.title}</h3>
                  <p className="text-slate-700 text-sm leading-relaxed">{proj.description}</p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {proj.technologies.map((tech, i) => (
                      <span key={i} className="text-xs font-bold bg-blue-50 text-blue-700 px-3 py-1 rounded-lg border border-blue-200">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-sm font-bold">
                  {proj.githubUrl && (
                    <a href={proj.githubUrl} target="_blank" rel="noreferrer" className="text-slate-700 hover:text-blue-600 flex items-center gap-1.5">
                      <Github className="w-4 h-4" /> Repository
                    </a>
                  )}
                  {proj.liveUrl && (
                    <a href={proj.liveUrl} target="_blank" rel="noreferrer" className="text-blue-600 hover:text-blue-700 flex items-center gap-1.5 ml-auto font-extrabold">
                      Live Demo <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 5: SKILLS */}
        <section id="skills" className="bg-white p-8 sm:p-12 rounded-3xl border border-blue-100 shadow-xl space-y-8">
          <div className="flex items-center gap-4 border-b border-blue-100 pb-5">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold shadow-sm">
              <Wand2 className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Categorized Skills Matrix</h2>
              <p className="text-sm text-slate-500 font-medium">Programming languages, frameworks, developer tools, and soft skills</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-sm">
            <div className="space-y-3">
              <strong className="text-blue-700 font-black block uppercase tracking-wider text-xs">Languages</strong>
              <div className="flex flex-wrap gap-2">
                {skills.languages.map((s, i) => (
                  <span key={i} className="bg-slate-100 text-slate-800 font-bold px-3 py-1.5 rounded-xl border border-slate-200">{s}</span>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <strong className="text-blue-700 font-black block uppercase tracking-wider text-xs">Frameworks</strong>
              <div className="flex flex-wrap gap-2">
                {skills.frameworks.map((s, i) => (
                  <span key={i} className="bg-slate-100 text-slate-800 font-bold px-3 py-1.5 rounded-xl border border-slate-200">{s}</span>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <strong className="text-blue-700 font-black block uppercase tracking-wider text-xs">Tools & Infra</strong>
              <div className="flex flex-wrap gap-2">
                {skills.tools.map((s, i) => (
                  <span key={i} className="bg-slate-100 text-slate-800 font-bold px-3 py-1.5 rounded-xl border border-slate-200">{s}</span>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <strong className="text-blue-700 font-black block uppercase tracking-wider text-xs">Soft Skills</strong>
              <div className="flex flex-wrap gap-2">
                {skills.softSkills.map((s, i) => (
                  <span key={i} className="bg-slate-100 text-slate-800 font-bold px-3 py-1.5 rounded-xl border border-slate-200">{s}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};
