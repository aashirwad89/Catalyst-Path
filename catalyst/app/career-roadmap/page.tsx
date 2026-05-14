/* eslint-disable @next/next/no-img-element */
"use client"

import React, { useMemo, useState } from 'react';
import {
  FaBars,
  FaBrain,
  FaBriefcase,
  FaChartLine,
  FaClock,
  FaCode,
  FaFileAlt,
  FaGraduationCap,
  FaHome,
  FaRocket,
  FaRoute,
  FaSearch,
  FaSignOutAlt,
  FaTimes
} from 'react-icons/fa';

interface CareerRoadmap {
  title: string;
  stream: 'BTech' | 'Biotech' | 'MBA' | 'BBA';
  category: string;
  skills: string[];
  payScale: string;
  timeToReady: string;
  path: string;
}

const roadmaps: CareerRoadmap[] = [
  { title: 'Software Development Engineer', stream: 'BTech', category: 'Engineering', skills: ['DSA', 'Java or C++', 'System design basics', 'Git', 'APIs'], payScale: 'INR 4-18 LPA entry; 18-40 LPA mid', timeToReady: '6-12 months', path: 'Build projects, practice DSA daily, learn backend or frontend deeply, then apply to internships and SDE roles.' },
  { title: 'Frontend Developer', stream: 'BTech', category: 'Engineering', skills: ['HTML/CSS', 'JavaScript', 'React', 'TypeScript', 'UI performance'], payScale: 'INR 3.5-12 LPA entry', timeToReady: '4-8 months', path: 'Master React, clone real products, learn accessibility, deploy a portfolio, and practice interviews.' },
  { title: 'Backend Developer', stream: 'BTech', category: 'Engineering', skills: ['Node.js or Java', 'Databases', 'REST APIs', 'Auth', 'Cloud basics'], payScale: 'INR 4-16 LPA entry', timeToReady: '6-10 months', path: 'Build APIs, learn SQL and NoSQL, add auth and queues, deploy on cloud, then prepare system design basics.' },
  { title: 'Full Stack Developer', stream: 'BTech', category: 'Engineering', skills: ['React', 'Node.js', 'Databases', 'Deployment', 'Testing'], payScale: 'INR 4-18 LPA entry', timeToReady: '8-12 months', path: 'Combine frontend and backend projects, ship two full apps, document architecture, and practice DSA.' },
  { title: 'Data Analyst', stream: 'BTech', category: 'Data', skills: ['Excel', 'SQL', 'Python', 'Power BI', 'Statistics'], payScale: 'INR 3.5-9 LPA entry', timeToReady: '4-7 months', path: 'Learn SQL, clean datasets in Python, build dashboards, and publish case studies with business insights.' },
  { title: 'Data Scientist', stream: 'BTech', category: 'Data', skills: ['Python', 'Statistics', 'Machine learning', 'SQL', 'Model evaluation'], payScale: 'INR 5-16 LPA entry', timeToReady: '8-14 months', path: 'Strengthen math, build ML projects, learn deployment basics, and explain tradeoffs clearly.' },
  { title: 'Machine Learning Engineer', stream: 'BTech', category: 'AI', skills: ['Python', 'ML algorithms', 'Deep learning', 'MLOps', 'Cloud'], payScale: 'INR 6-20 LPA entry', timeToReady: '10-16 months', path: 'Move from notebooks to production pipelines, learn model serving, monitoring, and scalable training.' },
  { title: 'DevOps Engineer', stream: 'BTech', category: 'Cloud', skills: ['Linux', 'Docker', 'Kubernetes', 'CI/CD', 'AWS or Azure'], payScale: 'INR 5-15 LPA entry', timeToReady: '6-10 months', path: 'Learn Linux, containerize apps, automate deployments, and build cloud infrastructure projects.' },
  { title: 'Cybersecurity Analyst', stream: 'BTech', category: 'Security', skills: ['Networking', 'Linux', 'SIEM', 'OWASP', 'Incident response'], payScale: 'INR 4-12 LPA entry', timeToReady: '6-12 months', path: 'Study networks, practice labs, learn web security, document findings, and target SOC/security roles.' },
  { title: 'Cloud Engineer', stream: 'BTech', category: 'Cloud', skills: ['AWS', 'Networking', 'Terraform', 'Containers', 'Monitoring'], payScale: 'INR 5-16 LPA entry', timeToReady: '6-10 months', path: 'Earn cloud fundamentals, build deployable apps, learn IaC, and practice troubleshooting.' },
  { title: 'UI/UX Designer', stream: 'BTech', category: 'Product', skills: ['Figma', 'User research', 'Wireframes', 'Design systems', 'Prototyping'], payScale: 'INR 3.5-10 LPA entry', timeToReady: '4-8 months', path: 'Build case studies, redesign known flows, learn research basics, and create a polished portfolio.' },
  { title: 'QA Automation Engineer', stream: 'BTech', category: 'Engineering', skills: ['Manual testing', 'Selenium or Playwright', 'API testing', 'JavaScript', 'CI'], payScale: 'INR 3.5-10 LPA entry', timeToReady: '4-8 months', path: 'Learn testing fundamentals, automate web flows, write API tests, and integrate tests in CI.' },
  { title: 'Product Engineer', stream: 'BTech', category: 'Product', skills: ['Frontend', 'Backend basics', 'Analytics', 'Product thinking', 'Rapid prototyping'], payScale: 'INR 5-18 LPA entry', timeToReady: '8-12 months', path: 'Ship user-facing features, understand metrics, talk to users, and build product-led portfolio projects.' },

  { title: 'Biotech Research Associate', stream: 'Biotech', category: 'Research', skills: ['Molecular biology', 'PCR', 'ELISA', 'Lab documentation', 'Data analysis'], payScale: 'INR 2.5-6 LPA entry', timeToReady: '3-6 months', path: 'Build lab technique confidence, document protocols, learn analysis tools, and target research labs.' },
  { title: 'Clinical Research Associate', stream: 'Biotech', category: 'Clinical', skills: ['GCP', 'Clinical trials', 'Documentation', 'Regulatory basics', 'Communication'], payScale: 'INR 3-8 LPA entry', timeToReady: '4-8 months', path: 'Learn clinical trial phases, GCP, documentation standards, and apply to CROs and pharma firms.' },
  { title: 'Bioinformatics Analyst', stream: 'Biotech', category: 'Data', skills: ['Python', 'R', 'Genomics', 'Linux', 'Statistics'], payScale: 'INR 4-12 LPA entry', timeToReady: '8-12 months', path: 'Learn programming, analyze public genomics datasets, and build reproducible notebooks.' },
  { title: 'Regulatory Affairs Associate', stream: 'Biotech', category: 'Compliance', skills: ['FDA/EMA basics', 'Dossier writing', 'Pharma regulations', 'Quality systems', 'MS Office'], payScale: 'INR 3-8 LPA entry', timeToReady: '4-7 months', path: 'Study regulatory guidelines, practice documentation, and learn approval workflows.' },
  { title: 'Quality Control Analyst', stream: 'Biotech', category: 'Quality', skills: ['HPLC', 'GLP', 'GMP', 'Microbiology tests', 'Reporting'], payScale: 'INR 2.5-6.5 LPA entry', timeToReady: '3-6 months', path: 'Strengthen analytical instruments, learn GMP/GLP, and prepare for pharma QC interviews.' },
  { title: 'Quality Assurance Associate', stream: 'Biotech', category: 'Quality', skills: ['GMP', 'Audits', 'CAPA', 'SOPs', 'Documentation'], payScale: 'INR 3-7 LPA entry', timeToReady: '4-7 months', path: 'Learn quality systems, deviation handling, SOP writing, and audit readiness.' },
  { title: 'Pharmacovigilance Associate', stream: 'Biotech', category: 'Clinical', skills: ['Drug safety', 'Case processing', 'MedDRA', 'Narrative writing', 'Compliance'], payScale: 'INR 3-7 LPA entry', timeToReady: '3-6 months', path: 'Learn adverse event workflows, case narratives, and safety database basics.' },
  { title: 'Medical Writer', stream: 'Biotech', category: 'Communication', skills: ['Scientific writing', 'Literature review', 'Clinical documents', 'Referencing', 'Editing'], payScale: 'INR 3.5-9 LPA entry', timeToReady: '4-8 months', path: 'Create writing samples, learn clinical document formats, and practice concise scientific communication.' },
  { title: 'Bioprocess Engineer', stream: 'Biotech', category: 'Manufacturing', skills: ['Fermentation', 'Downstream processing', 'GMP', 'Scale-up', 'Process monitoring'], payScale: 'INR 3.5-9 LPA entry', timeToReady: '6-10 months', path: 'Learn upstream and downstream workflows, process parameters, and manufacturing documentation.' },
  { title: 'Food Technologist', stream: 'Biotech', category: 'Food', skills: ['Food safety', 'Microbiology', 'FSSAI basics', 'Quality testing', 'Product development'], payScale: 'INR 3-7 LPA entry', timeToReady: '4-8 months', path: 'Study food safety standards, lab testing, and build product/process improvement projects.' },
  { title: 'Genetic Counselor Assistant', stream: 'Biotech', category: 'Healthcare', skills: ['Genetics', 'Patient communication', 'Pedigree analysis', 'Ethics', 'Documentation'], payScale: 'INR 3-8 LPA entry', timeToReady: '6-12 months', path: 'Build genetics foundation, communication skills, and assist certified counselors or diagnostics teams.' },
  { title: 'Environmental Biotechnologist', stream: 'Biotech', category: 'Environment', skills: ['Waste treatment', 'Microbial analysis', 'Environmental regulations', 'Sampling', 'Reports'], payScale: 'INR 3-8 LPA entry', timeToReady: '5-9 months', path: 'Learn bioremediation, sampling, water testing, and environmental compliance basics.' },
  { title: 'Diagnostics Lab Specialist', stream: 'Biotech', category: 'Healthcare', skills: ['PCR', 'Sample handling', 'Lab safety', 'Quality checks', 'Reporting'], payScale: 'INR 2.5-7 LPA entry', timeToReady: '3-6 months', path: 'Practice diagnostic workflows, biosafety, equipment handling, and accurate reporting.' },

  { title: 'Product Manager', stream: 'MBA', category: 'Product', skills: ['User research', 'Roadmapping', 'Analytics', 'Prioritization', 'Stakeholder management'], payScale: 'INR 8-25 LPA entry; higher for tier-1 MBA', timeToReady: '6-12 months', path: 'Build product case studies, learn analytics, write PRDs, and practice product interviews.' },
  { title: 'Marketing Manager', stream: 'MBA', category: 'Marketing', skills: ['Brand strategy', 'Digital marketing', 'Analytics', 'Campaign planning', 'Consumer insights'], payScale: 'INR 3.5-16 LPA early career', timeToReady: '4-8 months', path: 'Run campaigns, learn performance metrics, build brand cases, and practice GTM plans.' },
  { title: 'Business Analyst', stream: 'MBA', category: 'Analytics', skills: ['Excel', 'SQL', 'Power BI', 'Problem solving', 'Stakeholder communication'], payScale: 'INR 4-12 LPA entry', timeToReady: '4-7 months', path: 'Learn data tools, solve business cases, create dashboards, and write insight-led recommendations.' },
  { title: 'Management Consultant', stream: 'MBA', category: 'Consulting', skills: ['Case solving', 'Market sizing', 'Storytelling', 'Excel modeling', 'Presentation'], payScale: 'INR 8-30 LPA entry; tier-1 can be higher', timeToReady: '6-12 months', path: 'Practice cases, structure problems, build decks, and strengthen market research.' },
  { title: 'Investment Banking Analyst', stream: 'MBA', category: 'Finance', skills: ['Financial modeling', 'Valuation', 'Excel', 'Accounting', 'Pitch decks'], payScale: 'INR 8-25 LPA entry', timeToReady: '6-12 months', path: 'Learn valuation, build models, study deals, and prepare technical finance interviews.' },
  { title: 'Corporate Finance Analyst', stream: 'MBA', category: 'Finance', skills: ['Budgeting', 'Forecasting', 'FP&A', 'Excel', 'Accounting'], payScale: 'INR 5-14 LPA entry', timeToReady: '4-8 months', path: 'Build FP&A models, learn accounting, and practice variance analysis.' },
  { title: 'HR Business Partner', stream: 'MBA', category: 'HR', skills: ['HR analytics', 'Employee relations', 'Talent management', 'Policy', 'Communication'], payScale: 'INR 4-12 LPA entry', timeToReady: '4-8 months', path: 'Learn HR operations, analytics, labor basics, and stakeholder handling.' },
  { title: 'Operations Manager', stream: 'MBA', category: 'Operations', skills: ['Process improvement', 'Lean', 'Supply chain', 'Excel', 'Vendor management'], payScale: 'INR 5-15 LPA entry', timeToReady: '5-9 months', path: 'Study process mapping, optimize workflows, and learn supply chain metrics.' },
  { title: 'Supply Chain Manager', stream: 'MBA', category: 'Operations', skills: ['Logistics', 'Inventory planning', 'Procurement', 'ERP', 'Analytics'], payScale: 'INR 5-16 LPA entry', timeToReady: '5-9 months', path: 'Learn procurement, demand planning, inventory models, and ERP workflows.' },
  { title: 'Strategy Analyst', stream: 'MBA', category: 'Strategy', skills: ['Market research', 'Competitive analysis', 'Financial analysis', 'Decks', 'Business cases'], payScale: 'INR 6-18 LPA entry', timeToReady: '5-10 months', path: 'Create strategy memos, analyze industries, and practice executive storytelling.' },
  { title: 'Growth Manager', stream: 'MBA', category: 'Growth', skills: ['Funnels', 'A/B testing', 'Lifecycle marketing', 'SQL basics', 'Experiment design'], payScale: 'INR 6-18 LPA entry', timeToReady: '5-9 months', path: 'Learn acquisition and retention, run experiments, and build growth case studies.' },
  { title: 'Sales Manager', stream: 'MBA', category: 'Sales', skills: ['B2B sales', 'CRM', 'Negotiation', 'Pipeline management', 'Presentation'], payScale: 'INR 4-14 LPA entry plus incentives', timeToReady: '3-6 months', path: 'Practice discovery calls, CRM hygiene, objection handling, and account planning.' },
  { title: 'Entrepreneurship Track', stream: 'MBA', category: 'Startup', skills: ['Problem validation', 'MVP', 'Fundraising basics', 'Sales', 'Unit economics'], payScale: 'Variable; founder income depends on traction', timeToReady: '6-18 months', path: 'Validate a problem, build MVP, sell manually, track unit economics, and iterate fast.' },

  { title: 'Digital Marketing Executive', stream: 'BBA', category: 'Marketing', skills: ['SEO', 'Meta Ads', 'Google Ads', 'Content', 'Analytics'], payScale: 'INR 3-6 LPA entry', timeToReady: '3-6 months', path: 'Run small campaigns, learn analytics, create content calendars, and build campaign reports.' },
  { title: 'Sales Development Representative', stream: 'BBA', category: 'Sales', skills: ['Prospecting', 'CRM', 'Cold outreach', 'Discovery calls', 'Objection handling'], payScale: 'INR 3-7 LPA entry plus incentives', timeToReady: '2-4 months', path: 'Learn sales scripts, prospecting, CRM updates, and practice live pitches.' },
  { title: 'Business Development Executive', stream: 'BBA', category: 'Sales', skills: ['Lead generation', 'Partnerships', 'Negotiation', 'Market research', 'Presentation'], payScale: 'INR 3-8 LPA entry plus incentives', timeToReady: '3-6 months', path: 'Build target lists, practice proposals, track pipeline, and learn negotiation basics.' },
  { title: 'HR Recruiter', stream: 'BBA', category: 'HR', skills: ['Sourcing', 'Screening', 'Interview coordination', 'ATS', 'Communication'], payScale: 'INR 2.5-6 LPA entry', timeToReady: '2-5 months', path: 'Learn sourcing platforms, screening calls, candidate management, and hiring metrics.' },
  { title: 'Operations Executive', stream: 'BBA', category: 'Operations', skills: ['Excel', 'Process tracking', 'Vendor coordination', 'Reporting', 'Problem solving'], payScale: 'INR 3-7 LPA entry', timeToReady: '3-6 months', path: 'Track operations metrics, document SOPs, and improve one workflow end-to-end.' },
  { title: 'Customer Success Associate', stream: 'BBA', category: 'SaaS', skills: ['Client communication', 'CRM', 'Product demos', 'Retention', 'Reporting'], payScale: 'INR 3.5-8 LPA entry', timeToReady: '3-6 months', path: 'Learn onboarding, product walkthroughs, customer health scores, and escalation handling.' },
  { title: 'Finance Associate', stream: 'BBA', category: 'Finance', skills: ['Excel', 'Accounting basics', 'Reconciliation', 'MIS reporting', 'Tally or ERP'], payScale: 'INR 3-7 LPA entry', timeToReady: '3-6 months', path: 'Learn accounting entries, reporting, reconciliations, and basic financial analysis.' },
  { title: 'Market Research Analyst', stream: 'BBA', category: 'Research', skills: ['Survey design', 'Desk research', 'Excel', 'Presentation', 'Consumer insights'], payScale: 'INR 3-7 LPA entry', timeToReady: '3-6 months', path: 'Practice industry research, competitor mapping, survey analysis, and insight decks.' },
  { title: 'Event Manager', stream: 'BBA', category: 'Events', skills: ['Vendor management', 'Budgeting', 'Planning', 'Negotiation', 'On-ground execution'], payScale: 'INR 3-8 LPA entry', timeToReady: '3-8 months', path: 'Volunteer for events, manage vendors, build budgets, and document execution plans.' },
  { title: 'Retail Store Manager', stream: 'BBA', category: 'Retail', skills: ['Inventory', 'Team management', 'Sales metrics', 'Customer service', 'Merchandising'], payScale: 'INR 3-9 LPA entry', timeToReady: '3-6 months', path: 'Learn retail KPIs, inventory handling, staff scheduling, and customer experience basics.' },
  { title: 'E-commerce Executive', stream: 'BBA', category: 'E-commerce', skills: ['Marketplace ops', 'Cataloging', 'Pricing', 'Analytics', 'Order management'], payScale: 'INR 3-7 LPA entry', timeToReady: '3-6 months', path: 'Learn seller panels, catalog optimization, pricing, and marketplace performance reports.' },
  { title: 'Social Media Manager', stream: 'BBA', category: 'Marketing', skills: ['Content planning', 'Copywriting', 'Analytics', 'Community', 'Canva'], payScale: 'INR 3-7 LPA entry', timeToReady: '2-5 months', path: 'Build content calendars, analyze engagement, write posts, and create a portfolio page.' },
  { title: 'Banking Relationship Executive', stream: 'BBA', category: 'Banking', skills: ['Financial products', 'Customer handling', 'Compliance basics', 'Sales', 'CRM'], payScale: 'INR 3-8 LPA entry plus incentives', timeToReady: '3-6 months', path: 'Learn banking products, customer profiling, compliance basics, and relationship management.' }
];

function CareerRoadmapPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedStream, setSelectedStream] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const menuItems = [
    { icon: <FaHome className="h-5 w-5" />, label: 'Home', path: '/home' },
    { icon: <FaRoute className="h-5 w-5" />, label: 'Career Roadmap', path: '/career-roadmap' },
    { icon: <FaCode className="h-5 w-5" />, label: 'DSA Interview', path: '/dsa' },
    { icon: <FaFileAlt className="h-5 w-5" />, label: 'Resume Builder', path: '/resume' },
    { icon: <FaBrain className="h-5 w-5" />, label: 'AI Resume Analyser', path: '/ai-analyser' },
    { icon: <FaSignOutAlt className="h-5 w-5" />, label: 'Log Out', path: '/login' }
  ];

  const streams = ['All', 'BTech', 'Biotech', 'MBA', 'BBA'];

  const filteredRoadmaps = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return roadmaps.filter((roadmap) => {
      const streamMatch = selectedStream === 'All' || roadmap.stream === selectedStream;
      const text = `${roadmap.title} ${roadmap.stream} ${roadmap.category} ${roadmap.skills.join(' ')}`.toLowerCase();
      return streamMatch && text.includes(query);
    });
  }, [searchQuery, selectedStream]);

  const streamCounts = streams.slice(1).map((stream) => ({
    stream,
    count: roadmaps.filter((roadmap) => roadmap.stream === stream).length
  }));

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
                      item.label === 'Career Roadmap'
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
                <p className="text-sm font-black">Roadmaps</p>
                <p className="text-xs text-slate-400">{roadmaps.length}+ career paths</p>
              </div>
            </div>
            <div className="mt-4 h-2 rounded-full bg-white/10">
              <div className="h-full w-4/5 rounded-full bg-gradient-to-r from-sky-400 to-violet-500" />
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
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">Career Roadmap</p>
                <h1 className="truncate text-xl font-black text-slate-950 sm:text-2xl">Explore Career Paths</h1>
              </div>
            </div>
            <span className="hidden rounded-2xl border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-black text-blue-700 sm:inline-flex">
              {filteredRoadmaps.length} matching
            </span>
          </div>
        </header>

        <main className="px-4 py-5 sm:px-6 lg:px-8 lg:py-8">
          <div className="mx-auto max-w-7xl space-y-6">
            <section className="relative overflow-hidden rounded-[2rem] bg-slate-950 px-5 py-7 text-white shadow-2xl shadow-blue-900/20 sm:px-8 sm:py-10">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.35),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(168,85,247,0.28),transparent_35%)]" />
              <div className="relative grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
                <div>
                  <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-2 text-xs font-bold text-sky-100">
                    <FaRoute className="h-3.5 w-3.5" />
                    Biotech, BTech, MBA and BBA
                  </div>
                  <h2 className="max-w-3xl text-3xl font-black leading-tight sm:text-4xl lg:text-5xl">
                    Pick a career direction with skills, timeline and pay-scale clarity.
                  </h2>
                  <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
                    Explore 50+ practical roadmaps. Salary bands are approximate India CTC ranges and can vary by city, college, company and portfolio strength.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2">
                  {streamCounts.map((item) => (
                    <div key={item.stream} className="rounded-3xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                      <p className="text-2xl font-black">{item.count}</p>
                      <p className="mt-1 text-sm font-bold text-slate-300">{item.stream} paths</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
              <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
                <label className="block">
                  <span className="mb-2 block text-sm font-bold text-slate-700">Search roadmap</span>
                  <span className="relative block">
                    <FaSearch className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                      value={searchQuery}
                      onChange={(event) => setSearchQuery(event.target.value)}
                      placeholder="Search role, skill, stream or category"
                      className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm font-semibold text-slate-800 outline-none transition focus:border-blue-300 focus:bg-white focus:ring-4 focus:ring-blue-100"
                    />
                  </span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {streams.map((stream) => (
                    <button
                      key={stream}
                      onClick={() => setSelectedStream(stream)}
                      className={`rounded-2xl px-4 py-3 text-sm font-black transition ${
                        selectedStream === stream
                          ? 'bg-slate-950 text-white'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {stream}
                    </button>
                  ))}
                </div>
              </div>
            </section>

            <section className="grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
              {filteredRoadmaps.map((roadmap) => (
                <article key={`${roadmap.stream}-${roadmap.title}`} className="flex min-h-full flex-col rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-blue-200 hover:shadow-xl hover:shadow-blue-900/10">
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <div>
                      <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-black text-blue-700">{roadmap.stream}</span>
                      <h3 className="mt-3 text-xl font-black leading-snug text-slate-950">{roadmap.title}</h3>
                      <p className="mt-1 text-sm font-semibold text-slate-500">{roadmap.category}</p>
                    </div>
                    <div className="grid h-12 w-12 flex-shrink-0 place-items-center rounded-2xl bg-slate-950 text-white">
                      <FaBriefcase className="h-5 w-5" />
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl bg-slate-50 p-3">
                      <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wide text-slate-500">
                        <FaChartLine className="h-3.5 w-3.5 text-green-600" />
                        Pay scale
                      </div>
                      <p className="mt-2 text-sm font-bold text-slate-900">{roadmap.payScale}</p>
                    </div>
                    <div className="rounded-2xl bg-slate-50 p-3">
                      <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wide text-slate-500">
                        <FaClock className="h-3.5 w-3.5 text-blue-600" />
                        Time
                      </div>
                      <p className="mt-2 text-sm font-bold text-slate-900">{roadmap.timeToReady}</p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <p className="text-xs font-black uppercase tracking-wide text-slate-500">Skills to learn</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {roadmap.skills.map((skill) => (
                        <span key={skill} className="rounded-xl bg-blue-50 px-2.5 py-1 text-xs font-bold text-blue-700">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 border-t border-slate-100 pt-4">
                    <p className="text-xs font-black uppercase tracking-wide text-slate-500">How to start</p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{roadmap.path}</p>
                  </div>
                </article>
              ))}
            </section>

            {filteredRoadmaps.length === 0 && (
              <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center">
                <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-slate-100 text-slate-500">
                  <FaGraduationCap className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-black text-slate-950">No roadmaps found</h3>
                <p className="mt-2 text-sm text-slate-500">Try another stream, role or skill.</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default CareerRoadmapPage;
