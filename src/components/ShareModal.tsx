'use client';

import React, { useState } from 'react';
import { 
  X, 
  Copy, 
  Check, 
  Download, 
  MessageCircle, 
  Linkedin, 
  Twitter, 
  Mail 
} from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
  title?: string;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  url,
  title = 'My Technical Portfolio'
}) => {
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  if (!isOpen) return null;

  const fullUrl = typeof window !== 'undefined' && !url.startsWith('http') 
    ? `${window.location.origin}${url}` 
    : url;

  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(fullUrl)}&margin=10`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (e) {
      console.error('Failed to copy', e);
    }
  };

  const handleDownloadQr = async () => {
    try {
      setDownloading(true);
      const response = await fetch(qrImageUrl);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = 'portfolio-qr-code.png';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error('Error downloading QR code', err);
      // Fallback
      window.open(qrImageUrl, '_blank');
    } finally {
      setDownloading(false);
    }
  };

  const shareText = encodeURIComponent(`Check out my technical portfolio: ${fullUrl}`);

  const shareLinks = {
    whatsapp: `https://api.whatsapp.com/send?text=${shareText}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(fullUrl)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent('Check out my professional portfolio!')}&url=${encodeURIComponent(fullUrl)}`,
    gmail: `mailto:?subject=${encodeURIComponent(`Portfolio: ${title}`)}&body=${shareText}`,
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 p-6 sm:p-7 space-y-6 text-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="text-lg font-bold text-slate-900">Share Your Portfolio</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* QR Code Container */}
        <div className="flex flex-col items-center justify-center p-5 bg-slate-50/80 rounded-2xl border border-slate-200/80">
          <div className="w-48 h-48 sm:w-52 sm:h-52 bg-white rounded-2xl p-3 shadow-md border border-slate-100 flex items-center justify-center overflow-hidden">
            <img 
              src={qrImageUrl} 
              alt="Portfolio QR Code"
              className="w-full h-full object-contain"
            />
          </div>

          <button
            onClick={handleDownloadQr}
            disabled={downloading}
            className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 shadow-sm transition-all"
          >
            <Download className="w-3.5 h-3.5 text-emerald-600" />
            {downloading ? 'Downloading...' : 'Download High-Res QR (PNG)'}
          </button>
        </div>

        {/* URL Box */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700">Public Portfolio URL</label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={fullUrl}
              className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-100 border border-slate-200 text-xs font-mono text-slate-700 focus:outline-none select-all"
            />
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#0EA5E9] hover:bg-sky-600 text-white text-xs font-bold transition-all shadow-sm shrink-0"
              style={{ backgroundColor: copied ? '#059669' : '#059669' }}
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  Copy
                </>
              )}
            </button>
          </div>
        </div>

        {/* Share directly via */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-700">Share directly via</label>
          <div className="grid grid-cols-4 gap-2.5">
            <a
              href={shareLinks.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="flex flex-col items-center justify-center p-3 rounded-2xl bg-emerald-50/60 hover:bg-emerald-100/70 border border-emerald-100 text-slate-700 transition-all group"
            >
              <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                <MessageCircle className="w-4 h-4" />
              </div>
              <span className="text-[11px] font-semibold text-slate-700 mt-1.5">WhatsApp</span>
            </a>

            <a
              href={shareLinks.linkedin}
              target="_blank"
              rel="noreferrer"
              className="flex flex-col items-center justify-center p-3 rounded-2xl bg-blue-50/60 hover:bg-blue-100/70 border border-blue-100 text-slate-700 transition-all group"
            >
              <div className="w-8 h-8 rounded-full bg-[#0A66C2] text-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                <Linkedin className="w-4 h-4" />
              </div>
              <span className="text-[11px] font-semibold text-slate-700 mt-1.5">LinkedIn</span>
            </a>

            <a
              href={shareLinks.twitter}
              target="_blank"
              rel="noreferrer"
              className="flex flex-col items-center justify-center p-3 rounded-2xl bg-sky-50/60 hover:bg-sky-100/70 border border-sky-100 text-slate-700 transition-all group"
            >
              <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                <Twitter className="w-4 h-4" />
              </div>
              <span className="text-[11px] font-semibold text-slate-700 mt-1.5">X (Twitter)</span>
            </a>

            <a
              href={shareLinks.gmail}
              className="flex flex-col items-center justify-center p-3 rounded-2xl bg-rose-50/60 hover:bg-rose-100/70 border border-rose-100 text-slate-700 transition-all group"
            >
              <div className="w-8 h-8 rounded-full bg-[#EA4335] text-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                <Mail className="w-4 h-4" />
              </div>
              <span className="text-[11px] font-semibold text-slate-700 mt-1.5">Gmail</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
