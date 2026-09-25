'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { TemplateRenderer } from '@/components/templates/TemplateRenderer';
import { TemplateId } from '@/lib/types';
import { 
  User, 
  GraduationCap, 
  Briefcase, 
  Code2, 
  Wand2, 
  Palette, 
  Plus, 
  Trash2, 
  Check, 
  ArrowRight, 
  ArrowLeft, 
  Eye, 
  Save,
  Sparkles,
  ExternalLink,
  ChevronRight,
  FileUp,
  FileText,
  Download,
  Monitor,
  Tablet,
  Smartphone,
  Camera
} from 'lucide-react';
import Link from 'next/link';
import { TemplateSelectorStep } from './TemplateSelectorStep';

export const PortfolioBuilderWizard = () => {
  const { profile, updatePersonal, updateEducation, updateExperience, updateProjects, updateSkills, setTemplateId } = useAuth();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [showLivePreview, setShowLivePreview] = useState(true);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [previewViewport, setPreviewViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  if (!profile) return null;

  // Local state forms
  const [personalForm, setPersonalForm] = useState(profile.personal);
  const [educationList, setEducationList] = useState(profile.education);
  const [experienceList, setExperienceList] = useState(profile.experience);
  const [projectsList, setProjectsList] = useState(profile.projects);
  const [skillsForm, setSkillsForm] = useState(profile.skills);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateId>(profile.settings?.templateId || 'modern-glass');

  const handleResumeFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setPersonalForm((prev) => ({
        ...prev,
        resumeUrl: reader.result as string,
        resumeFileName: file.name,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleAvatarFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setPersonalForm((prev) => ({
        ...prev,
        avatarUrl: reader.result as string,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveAvatar = () => {
    setPersonalForm((prev) => ({
      ...prev,
      avatarUrl: '',
    }));
  };

  // Input helper tag states
  const [langInput, setLangInput] = useState('');
  const [frameworkInput, setFrameworkInput] = useState('');
  const [toolInput, setToolInput] = useState('');

  const handleSaveStep = () => {
    updatePersonal(personalForm);
    updateEducation(educationList);
    updateExperience(experienceList);
    updateProjects(projectsList);
    updateSkills(skillsForm);
    setTemplateId(selectedTemplate);

    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  const steps = [
    { num: 1, title: 'Choose Template', icon: Palette },
    { num: 2, title: 'Personal Bio', icon: User },
    { num: 3, title: 'Education', icon: GraduationCap },
    { num: 4, title: 'Experience', icon: Briefcase },
    { num: 5, title: 'Projects', icon: Code2 },
    { num: 6, title: 'Skills & Stack', icon: Wand2 },
  ];

  // Helper functions for Education
  const addEducation = () => {
    setEducationList([
      ...educationList,
      {
        id: 'edu_' + Date.now(),
        institution: 'University Name',
        degree: 'B.S.',
        fieldOfStudy: 'Computer Science',
        startYear: '2021',
        endYear: '2025',
        gpa: '3.8',
        coursework: 'Data Structures, Web Development, Algorithms',
      },
    ]);
  };

  const removeEducation = (id: string) => {
    setEducationList(educationList.filter((item) => item.id !== id));
  };

  // Helper functions for Experience
  const addExperience = () => {
    setExperienceList([
      ...experienceList,
      {
        id: 'exp_' + Date.now(),
        role: 'Software Developer Intern',
        company: 'Tech Company',
        location: 'City, State',
        startDate: 'Jun 2024',
        endDate: 'Aug 2024',
        description: ['Built scalable frontend features using React and Node.js.'],
      },
    ]);
  };

  const removeExperience = (id: string) => {
    setExperienceList(experienceList.filter((item) => item.id !== id));
  };

  // Helper functions for Projects
  const addProject = () => {
    setProjectsList([
      ...projectsList,
      {
        id: 'proj_' + Date.now(),
        title: 'New Web App Project',
        description: 'Full-stack application built for solving real-world student challenges.',
        technologies: ['React', 'Node.js', 'Tailwind CSS'],
        githubUrl: 'https://github.com',
        liveUrl: 'https://example.com',
        featured: true,
        category: 'Web Development',
      },
    ]);
  };

  const removeProject = (id: string) => {
    setProjectsList(projectsList.filter((item) => item.id !== id));
  };

  // Helper functions for Skills tags
  const addSkillTag = (category: keyof typeof skillsForm, tag: string, setInputFn: (val: string) => void) => {
    if (!tag.trim()) return;
    setSkillsForm({
      ...skillsForm,
      [category]: [...skillsForm[category], tag.trim()],
    });
    setInputFn('');
  };

  const removeSkillTag = (category: keyof typeof skillsForm, tagToRemove: string) => {
    setSkillsForm({
      ...skillsForm,
      [category]: skillsForm[category].filter((t) => t !== tagToRemove),
    });
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 py-8 px-4 sm:px-8 lg:px-12 font-sans">
      <div className="w-full max-w-[1700px] mx-auto space-y-6">
        
        {/* Wizard Header Bar */}
        <div className="bg-white p-6 rounded-3xl border border-blue-100 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-0.5 rounded-full border border-blue-200">
                Step {currentStep} of 6
              </span>
              {saveSuccess && (
                <span className="text-xs font-bold text-emerald-600 flex items-center gap-1 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  <Check className="w-3.5 h-3.5" /> Saved!
                </span>
              )}
            </div>
            <h1 className="text-2xl font-black text-slate-900 mt-1">Portfolio Builder Wizard</h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowLivePreview(!showLivePreview)}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white hover:bg-blue-50 text-slate-700 border border-slate-300 text-xs font-bold transition-all shadow-sm"
            >
              <Eye className="w-4 h-4 text-blue-600" />
              {showLivePreview ? 'Hide Live Preview' : 'Show Live Preview'}
            </button>

            <button
              onClick={handleSaveStep}
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-slate-900 hover:bg-blue-600 text-white text-xs font-extrabold shadow-md transition-all"
            >
              <Save className="w-4 h-4" />
              Save Progress
            </button>

            <Link
              href={`/u/${profile.username}`}
              target="_blank"
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-xs font-bold transition-all"
            >
              <ExternalLink className="w-4 h-4" />
              Public Link
            </Link>
          </div>
        </div>

        {/* Step Navigation Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {steps.map((step) => {
            const Icon = step.icon;
            const isCurrent = currentStep === step.num;
            return (
              <button
                key={step.num}
                onClick={() => setCurrentStep(step.num)}
                className={`flex items-center gap-2.5 p-3 rounded-2xl border text-xs font-bold transition-all ${
                  isCurrent
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-blue-50 hover:text-slate-900'
                }`}
              >
                <div className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 ${isCurrent ? 'bg-white text-blue-600' : 'bg-slate-100 text-slate-500'}`}>
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <span className="truncate">{step.title}</span>
              </button>
            );
          })}
        </div>

        {/* MAIN SPLIT VIEW (Form vs Preview) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* FORM EDITOR COLUMN */}
          <div className={`${showLivePreview ? 'lg:col-span-6' : 'lg:col-span-12'} bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6`}>
            
            {/* STEP 1: CHOOSE TEMPLATE FIRST */}
            {currentStep === 1 && (
              <TemplateSelectorStep
                selectedTemplate={selectedTemplate}
                onSelectTemplate={(tmpl) => {
                  setSelectedTemplate(tmpl);
                  setTemplateId(tmpl);
                }}
                onContinue={() => setCurrentStep(2)}
              />
            )}

            {/* STEP 2: PERSONAL BIO */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                  <User className="w-5 h-5 text-blue-600" />
                  Personal Information & Contacts
                </h2>

                {/* Profile Picture Upload from Device */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center gap-5">
                  <div className="relative group shrink-0">
                    <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-blue-500 shadow-md bg-slate-200 flex items-center justify-center">
                      {personalForm.avatarUrl ? (
                        <img
                          src={personalForm.avatarUrl}
                          alt="Avatar preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-2xl font-black text-slate-400">
                          {personalForm.fullName ? personalForm.fullName[0].toUpperCase() : 'P'}
                        </span>
                      )}
                    </div>
                    <label
                      htmlFor="avatar-upload-input"
                      className="absolute bottom-0 right-0 p-1.5 rounded-full bg-blue-600 text-white shadow-md hover:bg-blue-700 cursor-pointer transition-colors"
                      title="Upload from device"
                    >
                      <Camera className="w-3.5 h-3.5" />
                    </label>
                  </div>

                  <div className="flex-1 text-center sm:text-left space-y-1.5">
                    <h3 className="font-extrabold text-sm text-slate-900">Profile Picture</h3>
                    <p className="text-xs text-slate-500">
                      Upload a photo directly from your device. It will automatically display on all 21 portfolio templates.
                    </p>
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1">
                      <input
                        id="avatar-upload-input"
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarFileUpload}
                        className="hidden"
                      />
                      <label
                        htmlFor="avatar-upload-input"
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-sm cursor-pointer transition-colors"
                      >
                        <FileUp className="w-3.5 h-3.5" />
                        <span>{personalForm.avatarUrl ? 'Change Photo' : 'Upload from Device'}</span>
                      </label>
                      {personalForm.avatarUrl && (
                        <button
                          type="button"
                          onClick={handleRemoveAvatar}
                          className="inline-flex items-center gap-1 px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 rounded-xl text-xs font-bold transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Remove</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-medium">
                  <div>
                    <label className="block text-slate-700 mb-1 font-bold">Full Name</label>
                    <input
                      type="text"
                      value={personalForm.fullName}
                      onChange={(e) => setPersonalForm({ ...personalForm, fullName: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-blue-600"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 mb-1 font-bold">Target Role / Specialization</label>
                    <input
                      type="text"
                      value={personalForm.targetRole}
                      onChange={(e) => setPersonalForm({ ...personalForm, targetRole: e.target.value })}
                      placeholder="e.g. Software Engineer / UI UX Designer"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-blue-600"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-slate-700 mb-1 font-bold">Headline</label>
                    <input
                      type="text"
                      value={personalForm.headline}
                      onChange={(e) => setPersonalForm({ ...personalForm, headline: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-blue-600"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-slate-700 mb-1 font-bold">Short Bio / About Me</label>
                    <textarea
                      rows={4}
                      value={personalForm.bio}
                      onChange={(e) => setPersonalForm({ ...personalForm, bio: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-blue-600"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 mb-1 font-bold">Email Address</label>
                    <input
                      type="email"
                      value={personalForm.email}
                      onChange={(e) => setPersonalForm({ ...personalForm, email: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-blue-600"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 mb-1 font-bold">Location (City, State)</label>
                    <input
                      type="text"
                      value={personalForm.location}
                      onChange={(e) => setPersonalForm({ ...personalForm, location: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-blue-600"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 mb-1 font-bold">GitHub Profile URL</label>
                    <input
                      type="text"
                      value={personalForm.githubUrl}
                      onChange={(e) => setPersonalForm({ ...personalForm, githubUrl: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-blue-600"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 mb-1 font-bold">LinkedIn Profile URL</label>
                    <input
                      type="text"
                      value={personalForm.linkedinUrl}
                      onChange={(e) => setPersonalForm({ ...personalForm, linkedinUrl: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-blue-600"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-slate-700 mb-1 font-bold">Avatar Image URL (Headshot Photo)</label>
                    <input
                      type="text"
                      value={personalForm.avatarUrl}
                      onChange={(e) => setPersonalForm({ ...personalForm, avatarUrl: e.target.value })}
                      placeholder="https://example.com/avatar.jpg"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-blue-600"
                    />
                  </div>

                  {/* RESUME / CV DOCUMENT UPLOAD */}
                  <div className="sm:col-span-2 p-4 bg-emerald-50/50 border border-emerald-200/80 rounded-2xl space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-slate-800 font-bold flex items-center gap-2">
                        <FileUp className="w-4 h-4 text-emerald-600" />
                        <span>Upload Resume / CV Document (PDF)</span>
                      </label>
                      <span className="text-[11px] text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full font-bold">
                        Downloadable on Live Portfolio
                      </span>
                    </div>

                    {personalForm.resumeUrl ? (
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 bg-white rounded-xl border border-emerald-200 shadow-sm">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700 shrink-0">
                            <FileText className="w-5 h-5" />
                          </div>
                          <div className="min-w-0">
                            <p className="font-bold text-slate-900 text-xs truncate max-w-[220px] sm:max-w-xs">
                              {personalForm.resumeFileName || 'Uploaded_Resume.pdf'}
                            </p>
                            <p className="text-[10px] text-emerald-600 font-semibold">Ready for recruiter download</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <a
                            href={personalForm.resumeUrl}
                            download={personalForm.resumeFileName || 'Resume.pdf'}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
                          >
                            <Download className="w-3.5 h-3.5" /> Download
                          </a>
                          <button
                            type="button"
                            onClick={() => setPersonalForm({ ...personalForm, resumeUrl: '', resumeFileName: '' })}
                            className="px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold transition-colors"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-emerald-300 rounded-xl bg-white hover:bg-emerald-50/50 cursor-pointer transition-all">
                          <FileUp className="w-8 h-8 text-emerald-500 mb-2" />
                          <span className="text-xs font-bold text-slate-800">
                            Click or drag PDF resume here to upload
                          </span>
                          <span className="text-[11px] text-slate-400 mt-0.5">
                            Supports .PDF files (will be stored and downloadable by recruiters)
                          </span>
                          <input
                            type="file"
                            accept=".pdf,application/pdf"
                            onChange={handleResumeFileUpload}
                            className="hidden"
                          />
                        </label>

                        <div className="flex items-center gap-2">
                          <span className="text-xs text-slate-500">Or host link:</span>
                          <input
                            type="url"
                            placeholder="https://example.com/my-resume.pdf"
                            value={personalForm.resumeUrl?.startsWith('data:') ? '' : personalForm.resumeUrl || ''}
                            onChange={(e) => setPersonalForm({ ...personalForm, resumeUrl: e.target.value, resumeFileName: 'Resume.pdf' })}
                            className="flex-1 bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: EDUCATION */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-blue-600" />
                    Education & Credentials
                  </h2>
                  <button
                    onClick={addEducation}
                    className="flex items-center gap-1 text-xs font-bold text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1.5 rounded-full hover:bg-blue-100"
                  >
                    <Plus className="w-4 h-4" /> Add School
                  </button>
                </div>

                <div className="space-y-4">
                  {educationList.map((edu, idx) => (
                    <div key={edu.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3 relative text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-extrabold text-blue-700">School #{idx + 1}</span>
                        {educationList.length > 1 && (
                          <button onClick={() => removeEducation(edu.id)} className="text-rose-600 hover:text-rose-700">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="sm:col-span-2">
                          <label className="block text-slate-700 mb-1 font-bold">University / Institution</label>
                          <input
                            type="text"
                            value={edu.institution}
                            onChange={(e) => {
                              const updated = [...educationList];
                              updated[idx].institution = e.target.value;
                              setEducationList(updated);
                            }}
                            className="w-full bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-slate-900"
                          />
                        </div>

                        <div>
                          <label className="block text-slate-700 mb-1 font-bold">Degree Type</label>
                          <input
                            type="text"
                            value={edu.degree}
                            onChange={(e) => {
                              const updated = [...educationList];
                              updated[idx].degree = e.target.value;
                              setEducationList(updated);
                            }}
                            placeholder="e.g. B.S., B.A."
                            className="w-full bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-slate-900"
                          />
                        </div>

                        <div>
                          <label className="block text-slate-700 mb-1 font-bold">Major / Field of Study</label>
                          <input
                            type="text"
                            value={edu.fieldOfStudy}
                            onChange={(e) => {
                              const updated = [...educationList];
                              updated[idx].fieldOfStudy = e.target.value;
                              setEducationList(updated);
                            }}
                            className="w-full bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-slate-900"
                          />
                        </div>

                        <div>
                          <label className="block text-slate-700 mb-1 font-bold">Start Year</label>
                          <input
                            type="text"
                            value={edu.startYear}
                            onChange={(e) => {
                              const updated = [...educationList];
                              updated[idx].startYear = e.target.value;
                              setEducationList(updated);
                            }}
                            className="w-full bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-slate-900"
                          />
                        </div>

                        <div>
                          <label className="block text-slate-700 mb-1 font-bold">Graduation Year</label>
                          <input
                            type="text"
                            value={edu.endYear}
                            onChange={(e) => {
                              const updated = [...educationList];
                              updated[idx].endYear = e.target.value;
                              setEducationList(updated);
                            }}
                            className="w-full bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-slate-900"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-slate-700 mb-1 font-bold">Relevant Coursework</label>
                          <input
                            type="text"
                            value={edu.coursework || ''}
                            onChange={(e) => {
                              const updated = [...educationList];
                              updated[idx].coursework = e.target.value;
                              setEducationList(updated);
                            }}
                            className="w-full bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-slate-900"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 4: EXPERIENCE */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-blue-600" />
                    Work & Leadership Experience
                  </h2>
                  <button
                    onClick={addExperience}
                    className="flex items-center gap-1 text-xs font-bold text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1.5 rounded-full hover:bg-blue-100"
                  >
                    <Plus className="w-4 h-4" /> Add Position
                  </button>
                </div>

                <div className="space-y-4">
                  {experienceList.map((exp, idx) => (
                    <div key={exp.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-extrabold text-blue-700">Position #{idx + 1}</span>
                        {experienceList.length > 1 && (
                          <button onClick={() => removeExperience(exp.id)} className="text-rose-600 hover:text-rose-700">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-slate-700 mb-1 font-bold">Job Title / Role</label>
                          <input
                            type="text"
                            value={exp.role}
                            onChange={(e) => {
                              const updated = [...experienceList];
                              updated[idx].role = e.target.value;
                              setExperienceList(updated);
                            }}
                            className="w-full bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-slate-900"
                          />
                        </div>

                        <div>
                          <label className="block text-slate-700 mb-1 font-bold">Company / Organization</label>
                          <input
                            type="text"
                            value={exp.company}
                            onChange={(e) => {
                              const updated = [...experienceList];
                              updated[idx].company = e.target.value;
                              setExperienceList(updated);
                            }}
                            className="w-full bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-slate-900"
                          />
                        </div>

                        <div>
                          <label className="block text-slate-700 mb-1 font-bold">Start Date</label>
                          <input
                            type="text"
                            value={exp.startDate}
                            onChange={(e) => {
                              const updated = [...experienceList];
                              updated[idx].startDate = e.target.value;
                              setExperienceList(updated);
                            }}
                            className="w-full bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-slate-900"
                          />
                        </div>

                        <div>
                          <label className="block text-slate-700 mb-1 font-bold">End Date</label>
                          <input
                            type="text"
                            value={exp.endDate}
                            onChange={(e) => {
                              const updated = [...experienceList];
                              updated[idx].endDate = e.target.value;
                              setExperienceList(updated);
                            }}
                            className="w-full bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-slate-900"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-slate-700 mb-1 font-bold">Bullet Accomplishments (One per line)</label>
                          <textarea
                            rows={3}
                            value={exp.description.join('\n')}
                            onChange={(e) => {
                              const updated = [...experienceList];
                              updated[idx].description = e.target.value.split('\n').filter((line) => line.trim() !== '');
                              setExperienceList(updated);
                            }}
                            className="w-full bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-slate-900"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 5: PROJECTS */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                    <Code2 className="w-5 h-5 text-blue-600" />
                    Projects & Code Repositories
                  </h2>
                  <button
                    onClick={addProject}
                    className="flex items-center gap-1 text-xs font-bold text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1.5 rounded-full hover:bg-blue-100"
                  >
                    <Plus className="w-4 h-4" /> Add Project
                  </button>
                </div>

                <div className="space-y-4">
                  {projectsList.map((proj, idx) => (
                    <div key={proj.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-extrabold text-blue-700">Project #{idx + 1}</span>
                        {projectsList.length > 1 && (
                          <button onClick={() => removeProject(proj.id)} className="text-rose-600 hover:text-rose-700">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="sm:col-span-2">
                          <label className="block text-slate-700 mb-1 font-bold">Project Title</label>
                          <input
                            type="text"
                            value={proj.title}
                            onChange={(e) => {
                              const updated = [...projectsList];
                              updated[idx].title = e.target.value;
                              setProjectsList(updated);
                            }}
                            className="w-full bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-slate-900"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-slate-700 mb-1 font-bold">Description</label>
                          <textarea
                            rows={2}
                            value={proj.description}
                            onChange={(e) => {
                              const updated = [...projectsList];
                              updated[idx].description = e.target.value;
                              setProjectsList(updated);
                            }}
                            className="w-full bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-slate-900"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-slate-700 mb-1 font-bold">Technologies (Comma-separated)</label>
                          <input
                            type="text"
                            value={proj.technologies.join(', ')}
                            onChange={(e) => {
                              const updated = [...projectsList];
                              updated[idx].technologies = e.target.value.split(',').map((s) => s.trim()).filter(Boolean);
                              setProjectsList(updated);
                            }}
                            className="w-full bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-slate-900"
                          />
                        </div>

                        <div>
                          <label className="block text-slate-700 mb-1 font-bold">GitHub Repo Link</label>
                          <input
                            type="text"
                            value={proj.githubUrl || ''}
                            onChange={(e) => {
                              const updated = [...projectsList];
                              updated[idx].githubUrl = e.target.value;
                              setProjectsList(updated);
                            }}
                            className="w-full bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-slate-900"
                          />
                        </div>

                        <div>
                          <label className="block text-slate-700 mb-1 font-bold">Live Demo Link</label>
                          <input
                            type="text"
                            value={proj.liveUrl || ''}
                            onChange={(e) => {
                              const updated = [...projectsList];
                              updated[idx].liveUrl = e.target.value;
                              setProjectsList(updated);
                            }}
                            className="w-full bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-slate-900"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 6: SKILLS */}
            {currentStep === 6 && (
              <div className="space-y-6">
                <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                  <Wand2 className="w-5 h-5 text-blue-600" />
                  Categorized Skills & Tools
                </h2>

                <div className="space-y-4 text-xs font-medium">
                  
                  {/* Languages */}
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                    <label className="block text-blue-700 font-bold">Programming Languages</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={langInput}
                        onChange={(e) => setLangInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && addSkillTag('languages', langInput, setLangInput)}
                        placeholder="Add language e.g. Python, C++"
                        className="flex-1 bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-slate-900"
                      />
                      <button
                        onClick={() => addSkillTag('languages', langInput, setLangInput)}
                        className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl"
                      >
                        Add
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {skillsForm.languages.map((skill, i) => (
                        <span key={i} className="flex items-center gap-1 bg-white text-slate-800 border border-slate-200 px-2.5 py-1 rounded-md font-bold">
                          {skill}
                          <button onClick={() => removeSkillTag('languages', skill)} className="text-rose-600 font-bold">×</button>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Frameworks */}
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                    <label className="block text-blue-700 font-bold">Frameworks & Libraries</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={frameworkInput}
                        onChange={(e) => setFrameworkInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && addSkillTag('frameworks', frameworkInput, setFrameworkInput)}
                        placeholder="Add framework e.g. Next.js, React"
                        className="flex-1 bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-slate-900"
                      />
                      <button
                        onClick={() => addSkillTag('frameworks', frameworkInput, setFrameworkInput)}
                        className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl"
                      >
                        Add
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {skillsForm.frameworks.map((skill, i) => (
                        <span key={i} className="flex items-center gap-1 bg-white text-slate-800 border border-slate-200 px-2.5 py-1 rounded-md font-bold">
                          {skill}
                          <button onClick={() => removeSkillTag('frameworks', skill)} className="text-rose-600 font-bold">×</button>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Tools */}
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                    <label className="block text-blue-700 font-bold">Tools & Infrastructure</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={toolInput}
                        onChange={(e) => setToolInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && addSkillTag('tools', toolInput, setToolInput)}
                        placeholder="Add tool e.g. Docker, Git, AWS"
                        className="flex-1 bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-slate-900"
                      />
                      <button
                        onClick={() => addSkillTag('tools', toolInput, setToolInput)}
                        className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl"
                      >
                        Add
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {skillsForm.tools.map((skill, i) => (
                        <span key={i} className="flex items-center gap-1 bg-white text-slate-800 border border-slate-200 px-2.5 py-1 rounded-md font-bold">
                          {skill}
                          <button onClick={() => removeSkillTag('tools', skill)} className="text-rose-600 font-bold">×</button>
                        </span>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            )}

            {/* Bottom Wizard Step Controls */}
            <div className="flex items-center justify-between pt-6 border-t border-slate-200 text-xs">
              <button
                disabled={currentStep === 1}
                onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 disabled:opacity-40 disabled:cursor-not-allowed font-bold"
              >
                <ArrowLeft className="w-4 h-4" /> Previous
              </button>

              {currentStep < 6 ? (
                <button
                  onClick={() => {
                    handleSaveStep();
                    setCurrentStep((prev) => Math.min(6, prev + 1));
                  }}
                  className="flex items-center gap-1.5 px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold shadow-md"
                >
                  Save & Continue <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <Link
                  href="/dashboard"
                  onClick={handleSaveStep}
                  className="flex items-center gap-1.5 px-6 py-2.5 rounded-full bg-slate-900 hover:bg-blue-600 text-white font-extrabold shadow-lg"
                >
                  Finish & Go to Dashboard <ChevronRight className="w-4 h-4" />
                </Link>
              )}
            </div>

          </div>

          {/* LIVE PREVIEW COLUMN WITH VIEWPORT SWITCHER */}
          {showLivePreview && (
            <div className="lg:col-span-6 bg-white rounded-3xl border border-slate-200 p-2 overflow-hidden flex flex-col h-[800px] sticky top-20 shadow-2xl">
              <div className="bg-slate-50 px-4 py-2.5 text-xs text-slate-600 flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 shrink-0">
                <span className="font-extrabold text-slate-900 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                  Real-time Preview ({selectedTemplate})
                </span>

                {/* Viewport Switcher */}
                <div className="flex items-center gap-1 bg-white p-0.5 rounded-lg border border-slate-200">
                  <button
                    type="button"
                    onClick={() => setPreviewViewport('desktop')}
                    className={`p-1 rounded flex items-center gap-1 text-[10px] font-bold ${
                      previewViewport === 'desktop' ? 'bg-slate-900 text-white' : 'text-slate-500 hover:text-slate-800'
                    }`}
                    title="Desktop View"
                  >
                    <Monitor className="w-3 h-3" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewViewport('tablet')}
                    className={`p-1 rounded flex items-center gap-1 text-[10px] font-bold ${
                      previewViewport === 'tablet' ? 'bg-slate-900 text-white' : 'text-slate-500 hover:text-slate-800'
                    }`}
                    title="Tablet View"
                  >
                    <Tablet className="w-3 h-3" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewViewport('mobile')}
                    className={`p-1 rounded flex items-center gap-1 text-[10px] font-bold ${
                      previewViewport === 'mobile' ? 'bg-slate-900 text-white' : 'text-slate-500 hover:text-slate-800'
                    }`}
                    title="Mobile View"
                  >
                    <Smartphone className="w-3 h-3" />
                  </button>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-bold">
                    ↕ Scrollable Full Page
                  </span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-bold">
                    Live Sync
                  </span>
                </div>
              </div>

              {/* Scrollable Preview Area */}
              <div 
                id="live-preview-scroll-area"
                className="overflow-y-scroll flex-1 min-h-0 p-3 bg-slate-100/70 scroll-smooth preview-scroll-container"
              >
                <div
                  className={`mx-auto transition-all duration-300 bg-white rounded-2xl shadow-sm ${
                    previewViewport === 'desktop'
                      ? 'w-full'
                      : previewViewport === 'tablet'
                      ? 'max-w-[768px] border-2 border-slate-600'
                      : 'max-w-[390px] border-4 border-slate-700 rounded-3xl'
                  }`}
                >
                  <TemplateRenderer
                    profile={{
                      ...profile,
                      personal: personalForm,
                      education: educationList,
                      experience: experienceList,
                      projects: projectsList,
                      skills: skillsForm,
                      settings: { ...profile.settings, templateId: selectedTemplate },
                    }}
                  />
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
