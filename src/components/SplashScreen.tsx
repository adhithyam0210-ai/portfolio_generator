'use client';

import React, { useEffect, useState } from 'react';
import { Sparkles, Layers, ShieldCheck, Zap } from 'lucide-react';

export const SplashScreen: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [fading, setFading] = useState(false);
  const [progress, setProgress] = useState(25);
  const [statusText, setStatusText] = useState('Launching Studio...');

  useEffect(() => {
    const t1 = setTimeout(() => {
      setProgress(60);
      setStatusText('Launching Studio...');
    }, 400);

    const t2 = setTimeout(() => {
      setProgress(90);
      setStatusText('Launching Studio...');
    }, 900);

    const t3 = setTimeout(() => {
      setProgress(100);
      setStatusText('Launching Studio...');
      setFading(true);
    }, 1400);

    const t4 = setTimeout(() => {
      setLoading(false);
    }, 1900);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  if (!loading) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#090D16] text-white transition-all duration-500 ease-out select-none ${
        fading ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Background glow meshes */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none animate-pulse delay-700"></div>

      {/* Brand & Logo Mark */}
      <div className="relative z-10 flex flex-col items-center max-w-sm px-6 text-center">
        {/* Animated Icon */}
        <div className="relative mb-6">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-cyan-400 p-[2px] shadow-[0_0_40px_rgba(37,99,235,0.4)] animate-bounce duration-1000">
            <div className="w-full h-full bg-[#0B1120] rounded-[22px] flex items-center justify-center">
              <Sparkles className="w-10 h-10 text-cyan-400 animate-spin duration-3000" />
            </div>
          </div>
          <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-blue-500 to-cyan-400 opacity-40 blur-lg -z-10 animate-pulse"></div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-black tracking-tight text-white mb-6">
          Portfolify
        </h1>

        {/* Modern Progress Bar */}
        <div className="w-64 sm:w-72 bg-slate-800/80 rounded-full h-2 overflow-hidden border border-slate-700/60 p-[1px] mb-3">
          <div
            className="bg-gradient-to-r from-blue-500 via-indigo-400 to-cyan-400 h-full rounded-full transition-all duration-300 ease-out shadow-[0_0_12px_rgba(56,189,248,0.5)]"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Status text */}
        <p className="text-xs text-slate-400 font-mono tracking-tight animate-pulse min-h-[18px]">
          {statusText}
        </p>
      </div>
    </div>
  );
};
