/* eslint-disable @next/next/no-img-element */
"use client"

import React, { useMemo, useState } from 'react';
import {
  FaBars,
  FaBrain,
  FaBriefcase,
  FaChartLine,
  FaCheckCircle,
  FaClock,
  FaCode,
  FaExclamationTriangle,
  FaFileAlt,
  FaHome,
  FaLightbulb,
  FaRoute,
  FaRocket,
  FaSignOutAlt,
  FaTimes,
  FaUpload
} from 'react-icons/fa';

interface CriticalFix {
  title: string;
  issue: string;
  suggestion: string;
}

interface SectionFeedback {
  section: string;
  score: number;
  feedback: string;
  suggestions: string[];
}

interface RoleFit {
  role: string;
  fitScore: number;
  reason: string;
}

interface ActionItem {
  priority: string;
  task: string;
  timeEstimate: string;
}

interface ResumeAnalysis {
  overallScore: number;
  atsScore: number;
  contentScore: number;
  formattingScore: number;
  keywordScore: number;
  summary: string;
  candidateProfile: string;
  strengths: string[];
  weaknesses: string[];
  missingKeywords: string[];
  criticalFixes: CriticalFix[];
  sectionFeedback: SectionFeedback[];
  rewrittenBullets: string[];
  roleFit: RoleFit[];
  actionPlan: ActionItem[];
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://catalyst-path.onrender.com/';

const scoreTone = (score: number) => {
  if (score >= 80) return 'text-green-700 bg-green-50 border-green-200';
  if (score >= 60) return 'text-yellow-700 bg-yellow-50 border-yellow-200';
  return 'text-red-700 bg-red-50 border-red-200';
};

const fileToBase64 = (file: File) => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = String(reader.result || '');
      resolve(result.split(',')[1] || '');
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

const readApiJson = async (response: Response) => {
  const rawText = await response.text();

  try {
    return rawText ? JSON.parse(rawText) : {};
  } catch {
    const preview = rawText.replace(/\s+/g, ' ').slice(0, 180);
    throw new Error(
      `Backend returned HTML/non-JSON (${response.status}). ` +
      `Check that backend is running on ${API_URL}. Preview: ${preview || 'empty response'}`
    );
  }
};

function AIResumeAnalyserPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [targetRole, setTargetRole] = useState('');
  const [analysis, setAnalysis] = useState<ResumeAnalysis | null>(null);
  const [model, setModel] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState('');

  const menuItems = [
    { icon: <FaHome className="h-5 w-5" />, label: 'Home', path: '/home' },
    { icon: <FaRoute className="h-5 w-5" />, label: 'Career Roadmap', path: '/career-roadmap' },
    { icon: <FaCode className="h-5 w-5" />, label: 'DSA Interview', path: '/dsa' },
    { icon: <FaFileAlt className="h-5 w-5" />, label: 'Resume Builder', path: '/resume' },
    { icon: <FaBrain className="h-5 w-5" />, label: 'AI Resume Analyser', path: '/ai-analyser' },
    { icon: <FaSignOutAlt className="h-5 w-5" />, label: 'Log Out', path: '/login' }
  ];

  const scoreCards = useMemo(() => {
    if (!analysis) return [];
    return [
      { label: 'ATS', score: analysis.atsScore },
      { label: 'Content', score: analysis.contentScore },
      { label: 'Formatting', score: analysis.formattingScore },
      { label: 'Keywords', score: analysis.keywordScore }
    ];
  }, [analysis]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    setError('');
    setAnalysis(null);

    if (!selectedFile) return;
    if (selectedFile.type !== 'application/pdf') {
      setError('Please upload a PDF resume only.');
      return;
    }
    if (selectedFile.size > 9 * 1024 * 1024) {
      setError('PDF is too large. Please upload a file under 9MB.');
      return;
    }

    setFile(selectedFile);
  };

  const analyzeResume = async () => {
    if (!file) {
      setError('Upload a PDF resume first.');
      return;
    }

    try {
      setIsAnalyzing(true);
      setError('');

      const fileBase64 = await fileToBase64(file);
      const response = await fetch(`${API_URL}/api/analyze-resume`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fileBase64,
          mimeType: file.type,
          fileName: file.name,
          targetRole
        })
      });

      const data = await readApiJson(response);
      if (!response.ok) {
        throw new Error(data.error || 'Failed to analyze resume.');
      }

      setAnalysis(data.analysis);
      setModel(data.model || '');
    } catch (analysisError) {
      setError(analysisError instanceof Error ? analysisError.message : 'Failed to analyze resume.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 lg:flex">
      <aside className={`fixed lg:sticky inset-y-0 left-0 top-0 z-50 h-screen w-72 flex-shrink-0 border-r border-white/10 bg-slate-950/95 backdrop-blur-xl transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="flex h-full flex-col">
          <div className="border-b border-white/10 p-5 sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <div className="flex min-w-0 items-center gap-3">
                <div className="grid h-12 w-12 place-items-center overflow-hidden rounded-2xl bg-white shadow-lg shadow-blue-500/10">
                  <img src="/images/logo.png" alt="CatalystPath" className="h-9 w-10 object-contain" />
                </div>
                <div className="min-w-0">
                  <span className="block truncate text-lg font-black text-white">CatalystPath</span>
                  <span className="block text-xs font-medium text-slate-400">Career cockpit</span>
                </div>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden rounded-xl p-2 text-slate-400 hover:bg-white/10 hover:text-white"
                aria-label="Close menu"
              >
                <FaTimes className="h-5 w-5" />
              </button>
            </div>
          </div>

          <nav className="flex-1 p-4 sm:p-5">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.path}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold transition-all ${
                      item.label === 'AI Resume Analyser'
                        ? 'bg-white text-slate-950 shadow-xl shadow-blue-500/10'
                        : 'text-slate-300 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mx-5 mb-4 rounded-3xl border border-white/10 bg-white/[0.04] p-4">
            <div className="flex items-center gap-3 text-white">
              <div className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-sky-500 to-violet-600">
                <FaRocket className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-black">AI review</p>
                <p className="text-xs text-slate-400">Score, ATS and fixes</p>
              </div>
            </div>
            <div className="mt-4 h-2 rounded-full bg-white/10">
              <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-sky-400 to-violet-500" />
            </div>
          </div>

          <div className="border-t border-white/10 p-4">
            <div className="flex items-center gap-3 rounded-2xl bg-white/[0.06] px-4 py-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 font-black text-white">
                S
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold text-white">Student</p>
                <p className="truncate text-xs text-slate-400">student1@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/70 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="min-w-0 flex-1 bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <header className="sticky top-0 z-30 border-b border-slate-200/70 bg-white/85 backdrop-blur-xl">
          <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
            <div className="flex min-w-0 items-center gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="rounded-2xl border border-slate-200 bg-white p-3 text-slate-700 shadow-sm lg:hidden"
                aria-label="Open menu"
              >
                <FaBars className="h-5 w-5" />
              </button>
              <div className="min-w-0">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">AI Resume Analyser</p>
                <h1 className="truncate text-xl font-black text-slate-950 sm:text-2xl">Resume Score and Suggestions</h1>
              </div>
            </div>
            {model && (
              <span className="hidden rounded-2xl border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-black text-blue-700 sm:inline-flex">
                {model}
              </span>
            )}
          </div>
        </header>

        <main className="px-4 py-5 sm:px-6 lg:px-8 lg:py-8">
          <div className="mx-auto max-w-7xl space-y-6">
            <section className="relative overflow-hidden rounded-[2rem] bg-slate-950 px-5 py-7 text-white shadow-2xl shadow-blue-900/20 sm:px-8 sm:py-10">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.35),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(168,85,247,0.28),transparent_35%)]" />
              <div className="relative grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
                <div>
                  <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-2 text-xs font-bold text-sky-100">
                    <FaBrain className="h-3.5 w-3.5" />
                    Gemini-powered PDF analysis
                  </div>
                  <h2 className="max-w-3xl text-3xl font-black leading-tight sm:text-4xl lg:text-5xl">
                    Upload your resume and get a deep AI review.
                  </h2>
                  <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
                    Get ATS score, content score, section feedback, missing keywords, rewritten bullets and a prioritized action plan.
                  </p>
                </div>

                <div className="rounded-3xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                  <label className="block">
                    <span className="mb-2 block text-sm font-bold text-slate-200">Target role</span>
                    <input
                      value={targetRole}
                      onChange={(event) => setTargetRole(event.target.value)}
                      placeholder="Example: Frontend Developer, Data Analyst"
                      className="h-12 w-full rounded-2xl border border-white/10 bg-white px-4 text-sm font-semibold text-slate-900 outline-none"
                    />
                  </label>
                  <label className="mt-4 flex cursor-pointer flex-col items-center justify-center rounded-3xl border border-dashed border-white/30 bg-white/10 px-4 py-7 text-center transition hover:bg-white/15">
                    <FaUpload className="mb-3 h-7 w-7 text-sky-200" />
                    <span className="text-sm font-black">{file ? file.name : 'Upload PDF resume'}</span>
                    <span className="mt-1 text-xs text-slate-300">PDF only, max 9MB</span>
                    <input type="file" accept="application/pdf" onChange={handleFileChange} className="hidden" />
                  </label>
                  <button
                    onClick={analyzeResume}
                    disabled={isAnalyzing}
                    className="mt-4 inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-white text-sm font-black text-slate-950 transition hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    <FaBrain className="h-4 w-4" />
                    {isAnalyzing ? 'Analyzing...' : 'Analyze Resume'}
                  </button>
                </div>
              </div>
            </section>

            {error && (
              <div className="rounded-3xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">
                {error}
              </div>
            )}

            {!analysis && !error && (
              <section className="grid gap-4 md:grid-cols-3">
                {[
                  { icon: <FaChartLine className="h-5 w-5" />, title: 'Scoring', text: 'Overall, ATS, content, formatting and keyword scores.' },
                  { icon: <FaLightbulb className="h-5 w-5" />, title: 'Suggestions', text: 'Specific fixes, missing keywords and better bullet examples.' },
                  { icon: <FaBriefcase className="h-5 w-5" />, title: 'Role fit', text: 'Likely job roles with fit score and reason.' }
                ].map((item) => (
                  <div key={item.title} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-50 text-blue-700">{item.icon}</div>
                    <h3 className="mt-4 text-lg font-black text-slate-950">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{item.text}</p>
                  </div>
                ))}
              </section>
            )}

            {analysis && (
              <div className="space-y-6">
                <section className="grid gap-4 lg:grid-cols-[320px_1fr]">
                  <div className={`rounded-3xl border p-6 text-center shadow-sm ${scoreTone(analysis.overallScore)}`}>
                    <p className="text-sm font-black uppercase tracking-wide">Overall Resume Score</p>
                    <p className="mt-3 text-6xl font-black">{analysis.overallScore}</p>
                    <p className="mt-3 text-sm font-semibold">Out of 100</p>
                  </div>
                  <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                    <p className="text-sm font-black uppercase tracking-wide text-slate-500">Candidate profile</p>
                    <h2 className="mt-2 text-2xl font-black text-slate-950">{analysis.candidateProfile}</h2>
                    <p className="mt-3 text-sm leading-6 text-slate-600">{analysis.summary}</p>
                    <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                      {scoreCards.map((card) => (
                        <div key={card.label} className={`rounded-2xl border p-4 ${scoreTone(card.score)}`}>
                          <p className="text-sm font-black">{card.label}</p>
                          <p className="mt-1 text-3xl font-black">{card.score}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                <section className="grid gap-4 lg:grid-cols-2">
                  <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                    <h3 className="flex items-center gap-2 text-xl font-black text-slate-950">
                      <FaCheckCircle className="h-5 w-5 text-green-600" />
                      Strengths
                    </h3>
                    <ul className="mt-4 space-y-3">
                      {analysis.strengths.map((item) => (
                        <li key={item} className="rounded-2xl bg-green-50 p-3 text-sm font-semibold leading-6 text-green-800">{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                    <h3 className="flex items-center gap-2 text-xl font-black text-slate-950">
                      <FaExclamationTriangle className="h-5 w-5 text-amber-600" />
                      Weaknesses
                    </h3>
                    <ul className="mt-4 space-y-3">
                      {analysis.weaknesses.map((item) => (
                        <li key={item} className="rounded-2xl bg-amber-50 p-3 text-sm font-semibold leading-6 text-amber-800">{item}</li>
                      ))}
                    </ul>
                  </div>
                </section>

                <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                  <h3 className="text-xl font-black text-slate-950">Critical fixes</h3>
                  <div className="mt-4 grid gap-4 lg:grid-cols-2">
                    {analysis.criticalFixes.map((fix) => (
                      <div key={fix.title} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                        <h4 className="font-black text-slate-950">{fix.title}</h4>
                        <p className="mt-2 text-sm leading-6 text-slate-600">{fix.issue}</p>
                        <p className="mt-3 rounded-2xl bg-white p-3 text-sm font-semibold leading-6 text-blue-700">{fix.suggestion}</p>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                  <h3 className="text-xl font-black text-slate-950">Section feedback</h3>
                  <div className="mt-4 space-y-3">
                    {analysis.sectionFeedback.map((section) => (
                      <div key={section.section} className="rounded-3xl border border-slate-200 p-4">
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                          <h4 className="font-black text-slate-950">{section.section}</h4>
                          <span className={`w-max rounded-full border px-3 py-1 text-xs font-black ${scoreTone(section.score)}`}>{section.score}/100</span>
                        </div>
                        <p className="mt-2 text-sm leading-6 text-slate-600">{section.feedback}</p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {section.suggestions.map((suggestion) => (
                            <span key={suggestion} className="rounded-xl bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">{suggestion}</span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="grid gap-4 lg:grid-cols-2">
                  <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                    <h3 className="text-xl font-black text-slate-950">Missing keywords</h3>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {analysis.missingKeywords.map((keyword) => (
                        <span key={keyword} className="rounded-xl bg-violet-50 px-3 py-2 text-sm font-bold text-violet-700">{keyword}</span>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                    <h3 className="text-xl font-black text-slate-950">Role fit</h3>
                    <div className="mt-4 space-y-3">
                      {analysis.roleFit.map((role) => (
                        <div key={role.role} className="rounded-2xl bg-slate-50 p-3">
                          <div className="flex items-center justify-between gap-3">
                            <p className="font-black text-slate-950">{role.role}</p>
                            <span className={`rounded-full border px-3 py-1 text-xs font-black ${scoreTone(role.fitScore)}`}>{role.fitScore}</span>
                          </div>
                          <p className="mt-2 text-sm leading-6 text-slate-600">{role.reason}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                <section className="grid gap-4 lg:grid-cols-2">
                  <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                    <h3 className="text-xl font-black text-slate-950">Rewritten bullets</h3>
                    <ul className="mt-4 space-y-3">
                      {analysis.rewrittenBullets.map((bullet) => (
                        <li key={bullet} className="rounded-2xl bg-blue-50 p-3 text-sm font-semibold leading-6 text-blue-800">{bullet}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                    <h3 className="text-xl font-black text-slate-950">Action plan</h3>
                    <div className="mt-4 space-y-3">
                      {analysis.actionPlan.map((item) => (
                        <div key={`${item.priority}-${item.task}`} className="rounded-2xl bg-slate-50 p-3">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="rounded-full bg-slate-950 px-3 py-1 text-xs font-black text-white">{item.priority}</span>
                            <span className="flex items-center gap-1 text-xs font-bold text-slate-500">
                              <FaClock className="h-3 w-3" />
                              {item.timeEstimate}
                            </span>
                          </div>
                          <p className="mt-2 text-sm font-semibold leading-6 text-slate-700">{item.task}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default AIResumeAnalyserPage;
