'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { 
  Sparkles, 
  LayoutDashboard, 
  Wand2, 
  Palette, 
  FileText, 
  ExternalLink, 
  LogOut, 
  Menu, 
  X
} from 'lucide-react';

export const Navbar = () => {
  const pathname = usePathname();
  const { user, profile, isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-slate-200/90 shadow-sm">
      <div className="w-full max-w-[1700px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-18 py-3">
          
          {/* Logo */}
          <Link href={isAuthenticated ? "/dashboard" : "/"} className="flex items-center group">
            <span className="font-black text-2xl sm:text-3xl tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
              Portfolify
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-1.5">
            {!isAuthenticated && (
              <Link
                href="/"
                className={`px-4 py-2.5 rounded-xl text-base font-bold transition-colors ${
                  isActive('/') 
                    ? 'text-blue-600 bg-blue-50' 
                    : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                Home
              </Link>
            )}

            {isAuthenticated && (
              <>
                <Link
                  href="/dashboard"
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-base font-bold transition-colors ${
                    isActive('/dashboard') 
                      ? 'text-blue-600 bg-blue-50' 
                      : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </Link>

                <Link
                  href="/builder"
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-base font-bold transition-colors ${
                    isActive('/builder') 
                      ? 'text-blue-600 bg-blue-50' 
                      : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Wand2 className="w-4 h-4" />
                  Builder Wizard
                </Link>

                <Link
                  href="/templates"
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-base font-bold transition-colors ${
                    isActive('/templates') 
                      ? 'text-blue-600 bg-blue-50' 
                      : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Palette className="w-4 h-4" />
                  Templates
                </Link>

                <Link
                  href="/resume"
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-base font-bold transition-colors ${
                    isActive('/resume') 
                      ? 'text-blue-600 bg-blue-50' 
                      : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  ATS Resume
                </Link>
              </>
            )}
          </nav>

          {/* User Profile / Action Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                {profile && (
                  <Link
                    href={`/u/${profile.username}`}
                    target="_blank"
                    className="flex items-center gap-2 text-xs sm:text-sm font-extrabold bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 px-4 py-2.5 rounded-full transition-all shadow-sm hover:scale-[1.02]"
                  >
                    <span>View Public Portfolio</span>
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                )}

                <div className="h-5 w-[1px] bg-slate-200" />

                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-full bg-blue-600 text-white font-extrabold text-sm flex items-center justify-center shadow-md">
                    {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <span className="text-sm font-bold text-slate-800 max-w-[130px] truncate">
                    {user?.name}
                  </span>
                </div>

                <button
                  onClick={logout}
                  title="Log out"
                  className="p-2.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href="/login"
                  className="px-5 py-2.5 rounded-full text-base font-bold text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                >
                  Log In
                </Link>

                <Link
                  href="/signup"
                  className="px-6 py-2.5 rounded-full text-base font-extrabold text-white bg-slate-900 hover:bg-blue-600 shadow-md transition-all hover:scale-[1.02]"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-3 rounded-2xl text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-5 pt-4 pb-8 space-y-3 shadow-2xl">
          {!isAuthenticated && (
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-3 rounded-2xl text-lg font-bold text-slate-900 hover:bg-slate-100"
            >
              Home
            </Link>
          )}

          {isAuthenticated ? (
            <>
              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 rounded-2xl text-lg font-bold text-slate-900 hover:bg-slate-100"
              >
                Dashboard
              </Link>
              <Link
                href="/builder"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 rounded-2xl text-lg font-bold text-slate-900 hover:bg-slate-100"
              >
                Builder Wizard
              </Link>
              <Link
                href="/templates"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 rounded-2xl text-lg font-bold text-slate-900 hover:bg-slate-100"
              >
                Templates
              </Link>
              <Link
                href="/resume"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 rounded-2xl text-lg font-bold text-slate-900 hover:bg-slate-100"
              >
                ATS Resume Export
              </Link>
              {profile && (
                <Link
                  href={`/u/${profile.username}`}
                  target="_blank"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 rounded-2xl text-base font-extrabold text-blue-700 bg-blue-50 border border-blue-200 text-center"
                >
                  View Public Portfolio ↗
                </Link>
              )}
              <button
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left px-4 py-3 rounded-2xl text-base font-bold text-rose-600 hover:bg-rose-50"
              >
                Log Out
              </button>
            </>
          ) : (
            <div className="pt-2 space-y-3">
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full text-center px-5 py-3 rounded-full text-base font-bold text-slate-900 bg-slate-100"
              >
                Log In
              </Link>
              <Link
                href="/signup"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full text-center px-5 py-3 rounded-full text-base font-extrabold text-white bg-blue-600 shadow-md"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
