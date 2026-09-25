'use client';

import React, { useRef } from 'react';
import { PortfolioProfile } from '@/lib/types';
import { Printer, Download, ArrowLeft, CheckCircle2, FileText, Sparkles } from 'lucide-react';
import Link from 'next/link';

interface ATSResumeProps {
  profile: PortfolioProfile;
  onDownloadIncrement?: () => void;
}

export const ATSResume: React.FC<ATSResumeProps> = ({ profile, onDownloadIncrement }) => {
  const { personal, education, experience, projects, skills } = profile;
  const resumeRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    if (onDownloadIncrement) {
      onDownloadIncrement();
    }
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 font-sans">
      
      {/* Top Action Bar (hidden when printing) */}
      <div className="max-w-4xl mx-auto mb-8 no-print glass-panel p-5 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 transition-colors"
            title="Back to Dashboard"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-lg font-bold text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-purple-400" />
              ATS Resume Generator
            </h1>
            <p className="text-xs text-slate-400">
              Auto-compiled ATS-compliant resume with high parsing compatibility.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={handlePrint}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-blue-500/25 transition-all hover:scale-[1.02]"
          >
            <Printer className="w-4 h-4" />
            Download PDF / Print
          </button>
        </div>
      </div>

      {/* ATS SCORE & FEATURES BANNER (no-print) */}
      <div className="max-w-4xl mx-auto mb-8 no-print grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-medium">
        <div className="glass-card p-3.5 rounded-xl border border-emerald-500/30 flex items-center gap-3 text-emerald-300">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>100% Single-Column ATS Parsing Compatible</span>
        </div>
        <div className="glass-card p-3.5 rounded-xl border border-blue-500/30 flex items-center gap-3 text-blue-300">
          <Sparkles className="w-5 h-5 text-blue-400 shrink-0" />
          <span>Standard Font Specs & Zero Graphics Interference</span>
        </div>
        <div className="glass-card p-3.5 rounded-xl border border-purple-500/30 flex items-center gap-3 text-purple-300">
          <Download className="w-5 h-5 text-purple-400 shrink-0" />
          <span>Auto-Synced with Portfolio Builder Data</span>
        </div>
      </div>

      {/* RESUME PAPER CONTAINER (Printable Target) */}
      <div className="max-w-[800px] mx-auto bg-white text-slate-900 p-8 sm:p-12 shadow-2xl rounded-sm text-sm leading-relaxed border border-slate-200" ref={resumeRef} id="ats-resume-document">
        
        {/* HEADER SECTION */}
        <header className="text-center border-b-2 border-slate-900 pb-4 mb-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-wide text-slate-900 font-sans">
            {personal.fullName}
          </h1>
          <p className="text-xs font-semibold text-slate-700 mt-1 uppercase tracking-wider">
            {personal.targetRole || personal.headline}
          </p>

          {/* Contact Row */}
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[11px] text-slate-700 mt-2 font-mono">
            {personal.location && <span>{personal.location}</span>}
            {personal.location && personal.email && <span>•</span>}
            {personal.email && <span>{personal.email}</span>}
            {personal.phone && <span>•</span>}
            {personal.phone && <span>{personal.phone}</span>}
            {personal.githubUrl && <span>•</span>}
            {personal.githubUrl && <span>GitHub: {personal.githubUrl.replace('https://', '')}</span>}
            {personal.linkedinUrl && <span>•</span>}
            {personal.linkedinUrl && <span>LinkedIn: {personal.linkedinUrl.replace('https://', '')}</span>}
          </div>
        </header>

        {/* PROFESSIONAL SUMMARY */}
        {personal.bio && (
          <section className="mb-5">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-400 pb-1 mb-2">
              Professional Summary
            </h2>
            <p className="text-xs text-slate-800 leading-normal">
              {personal.bio}
            </p>
          </section>
        )}

        {/* EDUCATION */}
        <section className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-400 pb-1 mb-2">
            Education
          </h2>

          <div className="space-y-3">
            {education.map((edu) => (
              <div key={edu.id} className="text-xs">
                <div className="flex justify-between font-bold text-slate-900">
                  <span>{edu.institution}</span>
                  <span className="font-normal font-mono">{edu.startYear} – {edu.endYear}</span>
                </div>
                <div className="flex justify-between text-slate-800 italic">
                  <span>{edu.degree} in {edu.fieldOfStudy}</span>
                  {edu.gpa && <span className="not-italic font-semibold">Cumulative GPA: {edu.gpa}</span>}
                </div>
                {edu.coursework && (
                  <p className="text-[11px] text-slate-700 mt-0.5">
                    <strong className="font-semibold">Relevant Coursework:</strong> {edu.coursework}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* WORK & LEADERSHIP EXPERIENCE */}
        <section className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-400 pb-1 mb-2">
            Work & Leadership Experience
          </h2>

          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id} className="text-xs">
                <div className="flex justify-between font-bold text-slate-900">
                  <span>{exp.role} — <span className="font-semibold italic text-slate-800">{exp.company}</span></span>
                  <span className="font-normal font-mono text-slate-700">{exp.startDate} – {exp.endDate}</span>
                </div>
                {exp.location && <p className="text-[11px] text-slate-600 italic mb-1">{exp.location}</p>}

                <ul className="list-disc list-inside space-y-1 text-xs text-slate-800 pt-1 pl-1">
                  {exp.description.map((bullet, idx) => (
                    <li key={idx} className="leading-snug">
                      <span className="relative left-[-4px]">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* TECHNICAL PROJECTS */}
        <section className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-400 pb-1 mb-2">
            Projects
          </h2>

          <div className="space-y-3">
            {projects.map((proj) => (
              <div key={proj.id} className="text-xs">
                <div className="flex justify-between font-bold text-slate-900">
                  <span>{proj.title} <span className="font-mono font-normal text-[11px] text-slate-600">[{proj.technologies.join(', ')}]</span></span>
                  {proj.liveUrl && <span className="font-mono font-normal text-[11px] text-slate-700">{proj.liveUrl.replace('https://', '')}</span>}
                </div>
                <p className="text-slate-800 text-xs mt-0.5">{proj.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* TECHNICAL SKILLS */}
        <section className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-400 pb-1 mb-2">
            Technical Skills & Interests
          </h2>

          <div className="space-y-1 text-xs text-slate-800">
            <p>
              <strong className="font-semibold text-slate-900">Programming Languages:</strong> {skills.languages.join(', ')}
            </p>
            <p>
              <strong className="font-semibold text-slate-900">Frameworks & Developer Tools:</strong> {[...skills.frameworks, ...skills.tools].join(', ')}
            </p>
            {skills.softSkills.length > 0 && (
              <p>
                <strong className="font-semibold text-slate-900">Soft Skills & Leadership:</strong> {skills.softSkills.join(', ')}
              </p>
            )}
          </div>
        </section>

      </div>
    </div>
  );
};
