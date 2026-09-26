import React from 'react';
import { PortfolioProfile } from '@/lib/types';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Phone, 
  GraduationCap, 
  Briefcase, 
  Code2, 
  Wand2, 
  ExternalLink, 
  Download,
  User 
} from 'lucide-react';

interface TemplateProps {
  profile: PortfolioProfile;
  isPublicView?: boolean;
}

export const JoneLeeModernTemplate: React.FC<TemplateProps> = ({ profile, isPublicView }) => {
  const { personal, education, experience, projects, skills } = profile;

  return (
    <div className="bg-[#fcfcfd] text-slate-900 min-h-screen font-sans selection:bg-rose-500 selection:text-white pb-24">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-20">
        
        {/* SECTION 1: PERSONAL BIO / HERO SECTION */}
        <section id="bio" className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-white p-8 sm:p-14 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50">
          
          <div className="lg:col-span-7 space-y-6">
            <span className="text-sm font-extrabold uppercase tracking-widest text-rose-500 bg-rose-50 px-4 py-1.5 rounded-full border border-rose-100 inline-block">
              WELCOME TO MY PORTFOLIO
            </span>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-slate-900 tracking-tight leading-[1.1]">
              Hi, I'm <span className="text-rose-500">{personal.fullName}</span>
            </h1>

            <p className="text-xl sm:text-2xl font-extrabold text-slate-800">
              {personal.headline}
            </p>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              {personal.bio}
            </p>

            {/* Contacts & Socials */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2 text-sm font-bold">
              <div>
                <span className="text-xs text-slate-400 uppercase tracking-wider block mb-2 font-extrabold">CONNECT WITH ME</span>
                <div className="flex gap-3">
                  {personal.githubUrl && (
                    <a href={personal.githubUrl} target="_blank" rel="noreferrer" className="w-11 h-11 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-700 hover:text-rose-500 hover:border-rose-300 transition-colors shadow-sm">
                      <Github className="w-5 h-5" />
                    </a>
                  )}
                  {personal.linkedinUrl && (
                    <a href={personal.linkedinUrl} target="_blank" rel="noreferrer" className="w-11 h-11 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-700 hover:text-rose-500 hover:border-rose-300 transition-colors shadow-sm">
                      <Linkedin className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>

              <div>
                <span className="text-xs text-slate-400 uppercase tracking-wider block mb-2 font-extrabold">GET IN TOUCH</span>
                <div className="flex gap-3">
                  {personal.email && (
                    <a href={`mailto:${personal.email}`} className="w-11 h-11 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-700 hover:text-rose-500 hover:border-rose-300 transition-colors shadow-sm">
                      <Mail className="w-5 h-5" />
                    </a>
                  )}
                  {personal.phone && (
                    <a href={`tel:${personal.phone}`} className="w-11 h-11 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-700 hover:text-rose-500 hover:border-rose-300 transition-colors shadow-sm">
                      <Phone className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>
            </div>

            {isPublicView && (
              <div className="pt-4">
                <a
                  href="/resume"
                  target="_blank"
                  className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-rose-500 hover:bg-rose-600 text-white font-extrabold text-sm shadow-xl shadow-rose-500/25 transition-all hover:scale-[1.02]"
                >
                  <Download className="w-5 h-5" /> Download Resume PDF
                </a>
              </div>
            )}
          </div>

          {/* Hero Avatar Image */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-md rounded-3xl overflow-hidden bg-slate-100 border-4 border-white shadow-2xl">
              {personal.avatarUrl ? (
                <img 
                  src={personal.avatarUrl} 
                  alt={personal.fullName}
                  className="w-full h-[440px] sm:h-[480px] object-cover"
                />
              ) : (
                <div className="w-full h-[440px] sm:h-[480px] flex items-center justify-center bg-slate-100 text-slate-300">
                  <User className="w-24 h-24" />
                </div>
              )}
              <div className="absolute bottom-4 left-4 right-4 bg-gradient-to-r from-rose-500 to-pink-600 text-white p-4 rounded-2xl shadow-xl flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase font-bold text-rose-100">Target Role</p>
                  <p className="text-sm font-extrabold">{personal.targetRole || 'Software Engineering'}</p>
                </div>
                <span className="text-xs font-extrabold bg-white text-rose-600 px-4 py-1.5 rounded-full shadow">
                  Candidate
                </span>
              </div>
            </div>
          </div>

        </section>

        {/* SECTION 2: EDUCATION */}
        <section id="education" className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-100 shadow-xl space-y-8">
          <div className="flex items-center gap-4 border-b border-slate-100 pb-5">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center font-bold">
              <GraduationCap className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Education</h2>
              <p className="text-sm text-slate-500 font-medium">Degrees, major, institution, and academic standing</p>
            </div>
          </div>

          <div className="space-y-6">
            {education.map((edu) => (
              <div key={edu.id} className="p-7 rounded-2xl bg-rose-50/40 border border-rose-100 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <h3 className="text-xl font-black text-slate-900">{edu.institution}</h3>
                  <span className="text-sm font-bold text-rose-600 bg-white px-4 py-1.5 rounded-full border border-rose-200 self-start sm:self-auto shadow-sm">
                    {edu.startYear} - {edu.endYear}
                  </span>
                </div>
                <p className="text-base font-extrabold text-rose-500">{edu.degree} in {edu.fieldOfStudy} {edu.gpa && `• GPA: ${edu.gpa}`}</p>
                {edu.coursework && (
                  <p className="text-sm text-slate-700 pt-1 leading-relaxed"><strong className="text-slate-900">Coursework:</strong> {edu.coursework}</p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 3: EXPERIENCE */}
        <section id="experience" className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-100 shadow-xl space-y-8">
          <div className="flex items-center gap-4 border-b border-slate-100 pb-5">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center font-bold">
              <Briefcase className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Work & Leadership Experience</h2>
              <p className="text-sm text-slate-500 font-medium">Employment, internships, and project leadership</p>
            </div>
          </div>

          <div className="space-y-6">
            {experience.map((exp) => (
              <div key={exp.id} className="p-7 rounded-2xl bg-rose-50/40 border border-rose-100 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <h3 className="text-xl font-black text-slate-900">{exp.role}</h3>
                  <span className="text-sm font-bold text-rose-600 bg-white px-4 py-1.5 rounded-full border border-rose-200 self-start sm:self-auto shadow-sm">
                    {exp.startDate} - {exp.endDate}
                  </span>
                </div>
                <p className="text-sm font-extrabold text-rose-500">{exp.company} {exp.location && `• ${exp.location}`}</p>
                <ul className="space-y-2 pt-1 text-sm text-slate-700">
                  {exp.description.map((bullet, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="text-rose-500 font-bold text-base">•</span>
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
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-rose-500 bg-rose-50 px-4 py-1 rounded-full border border-rose-100">FEATURED WORK</span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900">Technical Projects</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((proj) => (
              <div key={proj.id} className="bg-white rounded-3xl border border-slate-100 p-7 shadow-lg hover:shadow-2xl transition-all duration-300 space-y-5 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="w-full h-48 rounded-2xl bg-slate-100 overflow-hidden relative border border-slate-100">
                    {proj.image ? (
                      <img src={proj.image} alt={proj.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-slate-900 flex items-center justify-center text-white font-bold text-base">
                        {proj.title}
                      </div>
                    )}
                  </div>

                  <span className="text-xs font-extrabold uppercase text-rose-500">{proj.category || 'Web Development'}</span>
                  <h3 className="text-xl font-black text-slate-900">{proj.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{proj.description}</p>
                  
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {proj.technologies.map((tech, i) => (
                      <span key={i} className="text-xs font-bold bg-rose-50 text-rose-600 px-3 py-1 rounded-lg border border-rose-100">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-sm font-bold">
                  {proj.githubUrl && (
                    <a href={proj.githubUrl} target="_blank" rel="noreferrer" className="text-slate-700 hover:text-rose-500">
                      GitHub Repo
                    </a>
                  )}
                  {proj.liveUrl && (
                    <a href={proj.liveUrl} target="_blank" rel="noreferrer" className="text-rose-500 hover:underline flex items-center gap-1.5 ml-auto font-extrabold">
                      Visit Site <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 5: SKILLS */}
        <section id="skills" className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-100 shadow-xl space-y-8">
          <div className="flex items-center gap-4 border-b border-slate-100 pb-5">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center font-bold">
              <Wand2 className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Skills & Developer Capabilities</h2>
              <p className="text-sm text-slate-500 font-medium">Languages, frameworks, developer tools, and soft skills</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-sm">
            <div className="space-y-3">
              <strong className="text-rose-500 font-black block uppercase tracking-wider text-xs">Languages</strong>
              <div className="flex flex-wrap gap-2">
                {skills.languages.map((s, i) => (
                  <span key={i} className="bg-slate-50 text-slate-800 font-bold px-3 py-1.5 rounded-xl border border-slate-200">{s}</span>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <strong className="text-rose-500 font-black block uppercase tracking-wider text-xs">Frameworks</strong>
              <div className="flex flex-wrap gap-2">
                {skills.frameworks.map((s, i) => (
                  <span key={i} className="bg-slate-50 text-slate-800 font-bold px-3 py-1.5 rounded-xl border border-slate-200">{s}</span>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <strong className="text-rose-500 font-black block uppercase tracking-wider text-xs">Tools</strong>
              <div className="flex flex-wrap gap-2">
                {skills.tools.map((s, i) => (
                  <span key={i} className="bg-slate-50 text-slate-800 font-bold px-3 py-1.5 rounded-xl border border-slate-200">{s}</span>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <strong className="text-rose-500 font-black block uppercase tracking-wider text-xs">Soft Skills</strong>
              <div className="flex flex-wrap gap-2">
                {skills.softSkills.map((s, i) => (
                  <span key={i} className="bg-slate-50 text-slate-800 font-bold px-3 py-1.5 rounded-xl border border-slate-200">{s}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};
