'use client';

import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { ATSResume } from '@/components/resume/ATSResume';

export default function ResumePage() {
  const { profile, incrementResumeDownloads } = useAuth();

  if (!profile) return null;

  return <ATSResume profile={profile} onDownloadIncrement={incrementResumeDownloads} />;
}
