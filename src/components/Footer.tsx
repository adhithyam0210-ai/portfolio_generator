import React from 'react';
import Link from 'next/link';
import { Sparkles, Github, Twitter, Linkedin, Heart } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="border-t border-slate-200/80 bg-white text-slate-600 text-sm mt-auto">
      <div className="w-full max-w-[1700px] mx-auto px-4 sm:px-8 lg:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Column 1: Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <span className="font-black text-xl text-slate-900 hover:text-blue-600 transition-colors">Portfolify</span>
            </Link>
            <p className="text-slate-500 text-xs leading-relaxed">
              Empowering college students and recent grads to launch modern, recruiter-ready portfolios and ATS resumes in minutes.
            </p>
            <div className="flex items-center gap-3 text-slate-400">
              <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-blue-600 transition-colors">
                <Github className="w-4 h-4" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-blue-600 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-blue-600 transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Product Features */}
          <div>
            <h4 className="text-slate-900 font-extrabold mb-3 text-xs uppercase tracking-wider">Product</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/builder" className="hover:text-blue-600 transition-colors">Portfolio Builder</Link>
              </li>
              <li>
                <Link href="/templates" className="hover:text-blue-600 transition-colors">Template Gallery</Link>
              </li>
              <li>
                <Link href="/resume" className="hover:text-blue-600 transition-colors">ATS Resume Generator</Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-blue-600 transition-colors">Student Dashboard</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Templates */}
          <div>
            <h4 className="text-slate-900 font-extrabold mb-3 text-xs uppercase tracking-wider">Templates</h4>
            <ul className="space-y-2 text-xs text-slate-500">
              <li><span>Snowly Frost (Light Blue)</span></li>
              <li><span>Jone Lee Modern (White/Coral)</span></li>
              <li><span>Daniel Violet (Cyber Midnight)</span></li>
              <li><span>Jessica Crimson (Studio Black)</span></li>
              <li><span>Modern Tech & Minimalist</span></li>
            </ul>
          </div>

          {/* Column 4: Student Resources */}
          <div>
            <h4 className="text-slate-900 font-extrabold mb-3 text-xs uppercase tracking-wider">For Students</h4>
            <ul className="space-y-2 text-xs text-slate-500">
              <li><span>ATS Resume Formatting</span></li>
              <li><span>Software Engineering Portfolios</span></li>
              <li><span>Recruiter Outreach Tips</span></li>
              <li><span>100% Free Access</span></li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© {new Date().getFullYear()} Portfolify Inc. All rights reserved.</p>
          <div className="flex items-center gap-1 text-slate-500">
            Made with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for college students worldwide.
          </div>
        </div>
      </div>
    </footer>
  );
};
