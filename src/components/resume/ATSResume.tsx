'use client';

import React, { useRef, useState, useMemo } from 'react';
import { PortfolioProfile } from '@/lib/types';
import { Printer, Download, ArrowLeft, CheckCircle2, FileText, Sparkles, Sun, Moon, Minimize2, Maximize2 } from 'lucide-react';
import Link from 'next/link';

interface ATSResumeProps {
  profile: PortfolioProfile;
  onDownloadIncrement?: () => void;
}

export const ATSResume: React.FC<ATSResumeProps> = ({ profile, onDownloadIncrement }) => {
  const { personal, education, experience, projects, skills } = profile;
  const resumeRef = useRef<HTMLDivElement>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [forceOnePage, setForceOnePage] = useState(true);

  const handlePrint = () => {
    if (onDownloadIncrement) {
      onDownloadIncrement();
    }
    window.print();
  };

  // Content volume estimation:
  // Roughly: 1 page = ~32 content units. 1.5 pages = ~48 content units.
  const contentScore = useMemo(() => {
    let score = 0;
    if (personal.bio) score += Math.ceil(personal.bio.length / 100);
    score += education.length * 3;
    experience.forEach((exp) => {
      score += 2 + (exp.description.length * 1.5);
    });
    projects.forEach((proj) => {
      score += 2 + Math.ceil(proj.description.length / 120);
    });
    score += (skills.languages.length > 0 ? 1.5 : 0) + (skills.frameworks.length > 0 ? 1.5 : 0) + (skills.tools.length > 0 ? 1.5 : 0);
    return score;
  }, [personal, education, experience, projects, skills]);

  const exceedsOneAndHalfPage = contentScore > 48;
  const shouldCompactToOnePage = forceOnePage && !exceedsOneAndHalfPage;

  // Curate content if compacting to 1 page:
  const displayExperiences = useMemo(() => {
    if (!shouldCompactToOnePage) return experience;
    // Take top 3 most recent experiences, limit to top 2 impactful bullets each
    return experience.slice(0, 3).map((exp) => ({
      ...exp,
      description: exp.description.slice(0, 2),
    }));
  }, [experience, shouldCompactToOnePage]);

  const displayProjects = useMemo(() => {
    if (!shouldCompactToOnePage) return projects;
    // Take top 3 projects
    return projects.slice(0, 3);
  }, [projects, shouldCompactToOnePage]);

  const displayEducation = useMemo(() => {
    if (!shouldCompactToOnePage) return education;
    return education.slice(0, 2);
  }, [education, shouldCompactToOnePage]);

  return (
    <div className={`min-h-screen py-10 px-4 sm:px-6 font-sans transition-colors duration-300 ${
      isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-[#F8FAFC] text-slate-800'
    }`}>
      
      {/* Top Action Bar (hidden when printing) */}
      <div className={`max-w-4xl mx-auto mb-8 no-print p-5 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl transition-colors ${
        isDarkMode
          ? 'bg-slate-900/90 border-slate-800 text-white'
          : 'bg-white border-slate-200 text-slate-900'
      }`}>
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className={`p-2 rounded-lg transition-colors ${
              isDarkMode
                ? 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
            title="Back to Dashboard"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-lg font-bold flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" />
              ATS Resume Generator
            </h1>
            <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              Auto-compiled ATS-compliant resume with high parsing compatibility.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          {/* 1-Page Compaction Toggle Button */}
          <button
            type="button"
            onClick={() => setForceOnePage(!forceOnePage)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border transition-all ${
              forceOnePage
                ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                : isDarkMode
                ? 'bg-slate-800 border-slate-700 text-slate-300'
                : 'bg-slate-100 border-slate-200 text-slate-600'
            }`}
            title={shouldCompactToOnePage ? "Strict 1-Page Optimization Active" : "Multi-Page Flow"}
          >
            {forceOnePage ? <Minimize2 className="w-3.5 h-3.5 text-emerald-600" /> : <Maximize2 className="w-3.5 h-3.5" />}
            <span>{shouldCompactToOnePage ? '1-Page Fit (Active)' : 'Full Multi-Page'}</span>
          </button>

          {/* Light / Dark Mode Toggle Button */}
          <button
            type="button"
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-2.5 rounded-xl border transition-colors ${
              isDarkMode
                ? 'bg-slate-800 hover:bg-slate-700 text-amber-400 border-slate-700'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
            }`}
            title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Print / Download Button */}
          <button
            onClick={handlePrint}
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-lg shadow-blue-500/25 transition-all hover:scale-[1.02]"
          >
            <Printer className="w-4 h-4" />
            Download PDF / Print
          </button>
        </div>
      </div>

      {/* ATS SCORE & FEATURES BANNER (no-print) */}
      <div className="max-w-4xl mx-auto mb-8 no-print grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-medium">
        <div className={`p-3.5 rounded-xl border flex items-center gap-3 ${
          isDarkMode
            ? 'bg-slate-900/60 border-emerald-500/30 text-emerald-300'
            : 'bg-white border-emerald-200 text-emerald-800 shadow-sm'
        }`}>
          <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
          <span>
            {shouldCompactToOnePage
              ? 'Strict 1-Page Layout (Standard ATS Spec)'
              : 'Multi-Page Career Flow (>1.5 pages)'}
          </span>
        </div>
        <div className={`p-3.5 rounded-xl border flex items-center gap-3 ${
          isDarkMode
            ? 'bg-slate-900/60 border-blue-500/30 text-blue-300'
            : 'bg-white border-blue-200 text-blue-800 shadow-sm'
        }`}>
          <Sparkles className="w-5 h-5 text-blue-500 shrink-0" />
          <span>Standard Font Specs & Zero Graphics Interference</span>
        </div>
        <div className={`p-3.5 rounded-xl border flex items-center gap-3 ${
          isDarkMode
            ? 'bg-slate-900/60 border-purple-500/30 text-purple-300'
            : 'bg-white border-purple-200 text-purple-800 shadow-sm'
        }`}>
          <Download className="w-5 h-5 text-purple-500 shrink-0" />
          <span>Auto-Synced with Portfolio Builder Data</span>
        </div>
      </div>

      {/* RESUME PAPER CONTAINER (Printable Target) */}
      <div 
        className={`max-w-[800px] mx-auto bg-white text-slate-900 shadow-2xl rounded-sm leading-relaxed border border-slate-300 ${
          shouldCompactToOnePage ? 'p-6 sm:p-9 text-[11.5px]' : 'p-8 sm:p-12 text-sm'
        }`}
        ref={resumeRef} 
        id="ats-resume-document"
      >
        
        {/* HEADER SECTION */}
        <header className={`text-center border-b-2 border-slate-900 ${shouldCompactToOnePage ? 'pb-2.5 mb-4' : 'pb-4 mb-6'}`}>
          <h1 className={`${shouldCompactToOnePage ? 'text-2xl sm:text-3xl' : 'text-2xl sm:text-4xl'} font-extrabold uppercase tracking-wide text-slate-900 font-sans`}>
            {personal.fullName}
          </h1>
          <p className="text-xs font-semibold text-slate-700 mt-1 uppercase tracking-wider">
            {personal.targetRole || personal.headline}
          </p>

          {/* Contact Row */}
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[11px] text-slate-700 mt-1.5 font-mono">
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
          <section className={shouldCompactToOnePage ? 'mb-3.5' : 'mb-5'}>
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-400 pb-0.5 mb-1.5">
              Professional Summary
            </h2>
            <p className={`text-slate-800 ${shouldCompactToOnePage ? 'text-[11px] leading-snug line-clamp-3' : 'text-xs leading-normal'}`}>
              {personal.bio}
            </p>
          </section>
        )}

        {/* EDUCATION */}
        {displayEducation.length > 0 && (
          <section className={shouldCompactToOnePage ? 'mb-3.5' : 'mb-5'}>
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-400 pb-0.5 mb-1.5">
              Education
            </h2>

            <div className={shouldCompactToOnePage ? 'space-y-1.5' : 'space-y-3'}>
              {displayEducation.map((edu) => (
                <div key={edu.id} className={shouldCompactToOnePage ? 'text-[11px]' : 'text-xs'}>
                  <div className="flex justify-between font-bold text-slate-900">
                    <span>{edu.institution}</span>
                    <span className="font-normal font-mono">{edu.startYear} – {edu.endYear}</span>
                  </div>
                  <div className="flex justify-between text-slate-800 italic">
                    <span>{edu.degree} in {edu.fieldOfStudy}</span>
                    {edu.gpa && <span className="not-italic font-semibold">Cumulative GPA: {edu.gpa}</span>}
                  </div>
                  {edu.coursework && (
                    <p className="text-[10.5px] text-slate-700 mt-0.5">
                      <strong className="font-semibold">Relevant Coursework:</strong> {edu.coursework}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* WORK & LEADERSHIP EXPERIENCE */}
        {displayExperiences.length > 0 && (
          <section className={shouldCompactToOnePage ? 'mb-3.5' : 'mb-5'}>
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-400 pb-0.5 mb-1.5">
              Work & Leadership Experience
            </h2>

            <div className={shouldCompactToOnePage ? 'space-y-2.5' : 'space-y-4'}>
              {displayExperiences.map((exp) => (
                <div key={exp.id} className={shouldCompactToOnePage ? 'text-[11px]' : 'text-xs'}>
                  <div className="flex justify-between font-bold text-slate-900">
                    <span>{exp.role} — <span className="font-semibold italic text-slate-800">{exp.company}</span></span>
                    <span className="font-normal font-mono text-slate-700">{exp.startDate} – {exp.endDate}</span>
                  </div>
                  {exp.location && <p className="text-[10px] text-slate-600 italic mb-0.5">{exp.location}</p>}

                  <ul className={`list-disc list-inside text-slate-800 pl-1 ${shouldCompactToOnePage ? 'space-y-0.5 text-[10.5px]' : 'space-y-1 text-xs'}`}>
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
        )}

        {/* TECHNICAL PROJECTS */}
        {displayProjects.length > 0 && (
          <section className={shouldCompactToOnePage ? 'mb-3.5' : 'mb-5'}>
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-400 pb-0.5 mb-1.5">
              Projects
            </h2>

            <div className={shouldCompactToOnePage ? 'space-y-2' : 'space-y-3'}>
              {displayProjects.map((proj) => (
                <div key={proj.id} className={shouldCompactToOnePage ? 'text-[11px]' : 'text-xs'}>
                  <div className="flex justify-between font-bold text-slate-900">
                    <span>{proj.title} <span className="font-mono font-normal text-[10px] text-slate-600">[{proj.technologies.join(', ')}]</span></span>
                    {proj.liveUrl && <span className="font-mono font-normal text-[10.5px] text-slate-700">{proj.liveUrl.replace('https://', '')}</span>}
                  </div>
                  <p className={`text-slate-800 mt-0.5 ${shouldCompactToOnePage ? 'text-[10.5px] leading-snug line-clamp-2' : 'text-xs'}`}>{proj.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* TECHNICAL SKILLS */}
        <section className={shouldCompactToOnePage ? 'mb-2' : 'mb-4'}>
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-400 pb-0.5 mb-1.5">
            Technical Skills & Interests
          </h2>

          <div className={`space-y-1 text-slate-800 ${shouldCompactToOnePage ? 'text-[10.5px]' : 'text-xs'}`}>
            {skills.languages.length > 0 && (
              <p>
                <strong className="font-semibold text-slate-900">Programming Languages:</strong> {skills.languages.join(', ')}
              </p>
            )}
            {(skills.frameworks.length > 0 || skills.tools.length > 0) && (
              <p>
                <strong className="font-semibold text-slate-900">Frameworks & Developer Tools:</strong> {[...skills.frameworks, ...skills.tools].join(', ')}
              </p>
            )}
            {skills.softSkills && skills.softSkills.length > 0 && (
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
