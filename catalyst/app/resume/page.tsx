/* eslint-disable @next/next/no-img-element */
'use client'

import React, { useRef, useState } from 'react'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import {
  FaBars,
  FaBrain,
  FaCode,
  FaDownload,
  FaEye,
  FaFileAlt,
  FaHome,
  FaPen,
  FaPlus,
  FaRocket,
  FaRoute,
  FaSignOutAlt,
  FaTimes,
  FaTrash
} from 'react-icons/fa'

interface Experience {
  id: string
  company: string
  position: string
  startDate: string
  endDate: string
  description: string
}

interface Education {
  id: string
  institution: string
  degree: string
  field: string
  year: string
}

interface Project {
  id: string
  name: string
  description: string
  technologies: string
  link: string
}

interface ResumeData {
  fullName: string
  email: string
  phone: string
  location: string
  summary: string
  experiences: Experience[]
  education: Education[]
  projects: Project[]
  skills: string
}

const inputClass = 'w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-blue-300 focus:ring-4 focus:ring-blue-100'
const sectionClass = 'rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6'

const SectionHeader = ({
  title,
  onAdd
}: {
  title: string
  onAdd?: () => void
}) => (
  <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
    <h2 className="text-xl font-semibold text-slate-950">{title}</h2>
    {onAdd && (
      <button
        onClick={onAdd}
        className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
      >
        <FaPlus className="h-3.5 w-3.5" />
        Add
      </button>
    )}
  </div>
)

const ResumePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'form' | 'preview'>('form')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const resumeRef = useRef<HTMLDivElement>(null)

  const [resume, setResume] = useState<ResumeData>({
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    summary: 'Full-stack software engineer with 5+ years of experience in building scalable web applications.',
    experiences: [
      {
        id: '1',
        company: 'Tech Company',
        position: 'Senior Software Engineer',
        startDate: '2021-01',
        endDate: 'Present',
        description: 'Led development of microservices architecture. Improved system performance by 40%.'
      }
    ],
    education: [
      {
        id: '1',
        institution: 'University Name',
        degree: 'Bachelor of Science',
        field: 'Computer Science',
        year: '2019'
      }
    ],
    projects: [
      {
        id: '1',
        name: 'E-Commerce Platform',
        description: 'Built a full-stack e-commerce platform with real-time inventory management.',
        technologies: 'React, Node.js, PostgreSQL, Redis',
        link: 'github.com/example'
      }
    ],
    skills: 'JavaScript, TypeScript, React, Node.js, Python, PostgreSQL, AWS, Docker, Git'
  })

  const menuItems = [
    { icon: <FaHome className="h-5 w-5" />, label: 'Home', path: '/home' },
    { icon: <FaRoute className="h-5 w-5" />, label: 'Career Roadmap', path: '/career-roadmap' },
    { icon: <FaCode className="h-5 w-5" />, label: 'DSA Interview', path: '/dsa' },
    { icon: <FaFileAlt className="h-5 w-5" />, label: 'Resume Builder', path: '/resume' },
    { icon: <FaBrain className="h-5 w-5" />, label: 'AI Resume Analyser', path: '/ai-analyser' },
    { icon: <FaSignOutAlt className="h-5 w-5" />, label: 'Log Out', path: '/login' }
  ]

  const completionItems = [
    resume.fullName,
    resume.email,
    resume.phone,
    resume.location,
    resume.summary,
    resume.skills,
    resume.experiences[0]?.company,
    resume.education[0]?.institution,
    resume.projects[0]?.name
  ]
  const completion = Math.round((completionItems.filter(Boolean).length / completionItems.length) * 100)

  const updateBasicInfo = (field: keyof Omit<ResumeData, 'experiences' | 'education' | 'projects'>, value: string) => {
    setResume(prev => ({ ...prev, [field]: value }))
  }

  const addExperience = () => {
    setResume(prev => ({
      ...prev,
      experiences: [
        ...prev.experiences,
        { id: Date.now().toString(), company: '', position: '', startDate: '', endDate: '', description: '' }
      ]
    }))
  }

  const updateExperience = (id: string, field: keyof Experience, value: string) => {
    setResume(prev => ({
      ...prev,
      experiences: prev.experiences.map(exp => exp.id === id ? { ...exp, [field]: value } : exp)
    }))
  }

  const deleteExperience = (id: string) => {
    setResume(prev => ({
      ...prev,
      experiences: prev.experiences.filter(exp => exp.id !== id)
    }))
  }

  const addEducation = () => {
    setResume(prev => ({
      ...prev,
      education: [
        ...prev.education,
        { id: Date.now().toString(), institution: '', degree: '', field: '', year: '' }
      ]
    }))
  }

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    setResume(prev => ({
      ...prev,
      education: prev.education.map(edu => edu.id === id ? { ...edu, [field]: value } : edu)
    }))
  }

  const deleteEducation = (id: string) => {
    setResume(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id)
    }))
  }

  const addProject = () => {
    setResume(prev => ({
      ...prev,
      projects: [
        ...prev.projects,
        { id: Date.now().toString(), name: '', description: '', technologies: '', link: '' }
      ]
    }))
  }

  const updateProject = (id: string, field: keyof Project, value: string) => {
    setResume(prev => ({
      ...prev,
      projects: prev.projects.map(proj => proj.id === id ? { ...proj, [field]: value } : proj)
    }))
  }

  const deleteProject = (id: string) => {
    setResume(prev => ({
      ...prev,
      projects: prev.projects.filter(proj => proj.id !== id)
    }))
  }

  const downloadPDF = async () => {
    if (!resumeRef.current) return

    try {
      const canvas = await html2canvas(resumeRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      })

      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      })

      const imgWidth = 210
      const pageHeight = 297
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      let heightLeft = imgHeight
      let position = 0

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight

      while (heightLeft > 0) {
        position = heightLeft - imgHeight
        pdf.addPage()
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
        heightLeft -= pageHeight
      }

      const fileName = resume.fullName.trim() || 'Resume'
      pdf.save(`${fileName.replace(/\s+/g, '_')}_Resume.pdf`)
    } catch (error) {
      console.error('Error generating PDF:', error)
      alert('Failed to generate PDF')
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 lg:flex">
      <style>{`
        .resume-preview {
          width: 794px;
          min-height: 1123px;
          background: white;
          color: #111827;
          padding: 52px;
          font-size: 14px;
          line-height: 1.55;
          box-shadow: 0 20px 50px rgba(15, 23, 42, 0.16);
        }

        .resume-header {
          border-bottom: 2px solid #111827;
          margin-bottom: 22px;
          padding-bottom: 16px;
        }

        .resume-name {
          font-size: 30px;
          font-weight: 800;
          letter-spacing: -0.02em;
          margin-bottom: 7px;
        }

        .resume-contact {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          color: #4b5563;
          font-size: 12px;
        }

        .resume-section {
          margin-bottom: 18px;
        }

        .resume-section-title {
          border-bottom: 1px solid #d1d5db;
          color: #111827;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 0.12em;
          margin-bottom: 10px;
          padding-bottom: 6px;
          text-transform: uppercase;
        }

        .resume-item {
          margin-bottom: 11px;
        }

        .resume-item-title {
          color: #111827;
          font-weight: 700;
        }

        .resume-item-subtitle {
          color: #6b7280;
          font-size: 13px;
          font-style: italic;
        }
      `}</style>

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
                      item.label === 'Resume Builder'
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
                <p className="text-sm font-black">Resume score</p>
                <p className="text-xs text-slate-400">{completion}% profile completed</p>
              </div>
            </div>
            <div className="mt-4 h-2 rounded-full bg-white/10">
              <div className="h-full rounded-full bg-gradient-to-r from-sky-400 to-violet-500" style={{ width: `${completion}%` }} />
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
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">Resume Builder</p>
                <h1 className="truncate text-xl font-black text-slate-950 sm:text-2xl">Build and Download Resume</h1>
              </div>
            </div>
            <button
              onClick={() => setActiveTab('preview')}
              className="hidden rounded-2xl border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-black text-blue-700 transition hover:bg-blue-100 sm:inline-flex"
            >
              Preview PDF
            </button>
          </div>
        </header>

        <main className="px-4 py-5 sm:px-6 lg:px-8 lg:py-8">
          <div className="mx-auto max-w-7xl space-y-6">
            <section className="overflow-hidden rounded-[2rem] bg-slate-950 p-5 text-white shadow-2xl shadow-blue-900/20 sm:p-8">
              <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
                <div>
                  <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-2 text-xs font-bold text-sky-100">
                    <FaFileAlt className="h-3.5 w-3.5" />
                    ATS-friendly resume builder
                  </div>
                  <h2 className="max-w-3xl text-3xl font-black leading-tight sm:text-4xl">
                    Create a polished resume and export it as a PDF.
                  </h2>
                  <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
                    Fill your details, check the live preview, and download a clean A4 resume when it is ready.
                  </p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-slate-200">Completion</p>
                      <p className="mt-1 text-3xl font-black">{completion}%</p>
                    </div>
                    <div className="grid h-14 w-14 place-items-center rounded-2xl bg-white text-blue-700">
                      <FaFileAlt className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="mt-5 h-2 rounded-full bg-white/10">
                    <div className="h-full rounded-full bg-gradient-to-r from-sky-400 to-violet-500" style={{ width: `${completion}%` }} />
                  </div>
                </div>
              </div>
            </section>

            <div className="flex rounded-3xl border border-slate-200 bg-white p-2 shadow-sm sm:w-max">
              <button
                onClick={() => setActiveTab('form')}
                className={`flex flex-1 items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-bold transition sm:flex-none ${
                  activeTab === 'form' ? 'bg-slate-950 text-white' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <FaPen className="h-4 w-4" />
                Edit
              </button>
              <button
                onClick={() => setActiveTab('preview')}
                className={`flex flex-1 items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-bold transition sm:flex-none ${
                  activeTab === 'preview' ? 'bg-slate-950 text-white' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <FaEye className="h-4 w-4" />
                Preview
              </button>
            </div>

            {activeTab === 'form' && (
              <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
                <div className="space-y-6">
                  <section className={sectionClass}>
                    <SectionHeader title="Personal Information" />
                    <div className="grid gap-4 md:grid-cols-2">
                      <input type="text" placeholder="Full Name" value={resume.fullName} onChange={(event) => updateBasicInfo('fullName', event.target.value)} className={inputClass} />
                      <input type="email" placeholder="Email" value={resume.email} onChange={(event) => updateBasicInfo('email', event.target.value)} className={inputClass} />
                      <input type="tel" placeholder="Phone" value={resume.phone} onChange={(event) => updateBasicInfo('phone', event.target.value)} className={inputClass} />
                      <input type="text" placeholder="Location" value={resume.location} onChange={(event) => updateBasicInfo('location', event.target.value)} className={inputClass} />
                    </div>
                    <textarea placeholder="Professional Summary" value={resume.summary} onChange={(event) => updateBasicInfo('summary', event.target.value)} className={`${inputClass} mt-4 min-h-28 resize-y`} />
                    <textarea placeholder="Skills (comma-separated)" value={resume.skills} onChange={(event) => updateBasicInfo('skills', event.target.value)} className={`${inputClass} mt-4 min-h-24 resize-y`} />
                  </section>

                  <section className={sectionClass}>
                    <SectionHeader title="Work Experience" onAdd={addExperience} />
                    <div className="space-y-4">
                      {resume.experiences.map((exp) => (
                        <div key={exp.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                          <div className="grid gap-4 md:grid-cols-2">
                            <input type="text" placeholder="Company" value={exp.company} onChange={(event) => updateExperience(exp.id, 'company', event.target.value)} className={inputClass} />
                            <input type="text" placeholder="Position" value={exp.position} onChange={(event) => updateExperience(exp.id, 'position', event.target.value)} className={inputClass} />
                            <input type="text" placeholder="Start Date (2021-01)" value={exp.startDate} onChange={(event) => updateExperience(exp.id, 'startDate', event.target.value)} className={inputClass} />
                            <input type="text" placeholder="End Date (Present)" value={exp.endDate} onChange={(event) => updateExperience(exp.id, 'endDate', event.target.value)} className={inputClass} />
                          </div>
                          <textarea placeholder="Description" value={exp.description} onChange={(event) => updateExperience(exp.id, 'description', event.target.value)} className={`${inputClass} mt-4 min-h-24 resize-y`} />
                          <button onClick={() => deleteExperience(exp.id)} className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-red-600 hover:text-red-700">
                            <FaTrash className="h-3.5 w-3.5" />
                            Delete
                          </button>
                        </div>
                      ))}
                    </div>
                  </section>

                  <section className={sectionClass}>
                    <SectionHeader title="Education" onAdd={addEducation} />
                    <div className="space-y-4">
                      {resume.education.map((edu) => (
                        <div key={edu.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                          <div className="grid gap-4 md:grid-cols-2">
                            <input type="text" placeholder="Institution" value={edu.institution} onChange={(event) => updateEducation(edu.id, 'institution', event.target.value)} className={inputClass} />
                            <input type="text" placeholder="Degree" value={edu.degree} onChange={(event) => updateEducation(edu.id, 'degree', event.target.value)} className={inputClass} />
                            <input type="text" placeholder="Field of Study" value={edu.field} onChange={(event) => updateEducation(edu.id, 'field', event.target.value)} className={inputClass} />
                            <input type="text" placeholder="Graduation Year" value={edu.year} onChange={(event) => updateEducation(edu.id, 'year', event.target.value)} className={inputClass} />
                          </div>
                          <button onClick={() => deleteEducation(edu.id)} className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-red-600 hover:text-red-700">
                            <FaTrash className="h-3.5 w-3.5" />
                            Delete
                          </button>
                        </div>
                      ))}
                    </div>
                  </section>

                  <section className={sectionClass}>
                    <SectionHeader title="Projects" onAdd={addProject} />
                    <div className="space-y-4">
                      {resume.projects.map((proj) => (
                        <div key={proj.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                          <div className="grid gap-4 md:grid-cols-2">
                            <input type="text" placeholder="Project Name" value={proj.name} onChange={(event) => updateProject(proj.id, 'name', event.target.value)} className={inputClass} />
                            <input type="text" placeholder="Technologies" value={proj.technologies} onChange={(event) => updateProject(proj.id, 'technologies', event.target.value)} className={inputClass} />
                          </div>
                          <textarea placeholder="Description" value={proj.description} onChange={(event) => updateProject(proj.id, 'description', event.target.value)} className={`${inputClass} mt-4 min-h-24 resize-y`} />
                          <input type="text" placeholder="Project Link (GitHub/Portfolio)" value={proj.link} onChange={(event) => updateProject(proj.id, 'link', event.target.value)} className={`${inputClass} mt-4`} />
                          <button onClick={() => deleteProject(proj.id)} className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-red-600 hover:text-red-700">
                            <FaTrash className="h-3.5 w-3.5" />
                            Delete
                          </button>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>

                <aside className="hidden xl:block">
                  <div className="sticky top-28 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                    <p className="text-sm font-bold text-slate-500">Quick preview</p>
                    <h3 className="mt-2 text-2xl font-black text-slate-950">{resume.fullName || 'Your Name'}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{resume.summary || 'Your professional summary will appear here.'}</p>
                    <button
                      onClick={() => setActiveTab('preview')}
                      className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 px-4 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
                    >
                      <FaEye className="h-4 w-4" />
                      Open full preview
                    </button>
                  </div>
                </aside>
              </div>
            )}

            {activeTab === 'preview' && (
              <div className="space-y-6">
                <div className="flex flex-col gap-3 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-xl font-black text-slate-950">Resume Preview</h2>
                    <p className="mt-1 text-sm text-slate-500">Check formatting before downloading the PDF.</p>
                  </div>
                  <button
                    onClick={downloadPDF}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-green-600 px-5 py-3 text-sm font-black text-white transition hover:bg-green-700"
                  >
                    <FaDownload className="h-4 w-4" />
                    Download PDF
                  </button>
                </div>

                <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-slate-100 p-4 sm:p-8">
                  <div ref={resumeRef} className="resume-preview mx-auto">
                    <div className="resume-header">
                      <div className="resume-name">{resume.fullName}</div>
                      <div className="resume-contact">
                        <span>{resume.email}</span>
                        <span>|</span>
                        <span>{resume.phone}</span>
                        <span>|</span>
                        <span>{resume.location}</span>
                      </div>
                    </div>

                    {resume.summary && (
                      <div className="resume-section">
                        <div className="resume-section-title">Professional Summary</div>
                        <p>{resume.summary}</p>
                      </div>
                    )}

                    {resume.skills && (
                      <div className="resume-section">
                        <div className="resume-section-title">Skills</div>
                        <p>{resume.skills}</p>
                      </div>
                    )}

                    {resume.experiences.length > 0 && (
                      <div className="resume-section">
                        <div className="resume-section-title">Work Experience</div>
                        {resume.experiences.map((exp) => (
                          <div key={exp.id} className="resume-item">
                            <div className="resume-item-title">{exp.position}</div>
                            <div className="resume-item-subtitle">
                              {exp.company} | {exp.startDate} - {exp.endDate}
                            </div>
                            {exp.description && <p className="mt-1 text-slate-700">{exp.description}</p>}
                          </div>
                        ))}
                      </div>
                    )}

                    {resume.education.length > 0 && (
                      <div className="resume-section">
                        <div className="resume-section-title">Education</div>
                        {resume.education.map((edu) => (
                          <div key={edu.id} className="resume-item">
                            <div className="resume-item-title">
                              {edu.degree} in {edu.field}
                            </div>
                            <div className="resume-item-subtitle">
                              {edu.institution} | {edu.year}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {resume.projects.length > 0 && (
                      <div className="resume-section">
                        <div className="resume-section-title">Projects</div>
                        {resume.projects.map((proj) => (
                          <div key={proj.id} className="resume-item">
                            <div className="resume-item-title">{proj.name}</div>
                            <div className="resume-item-subtitle">{proj.technologies}</div>
                            {proj.description && <p className="mt-1 text-slate-700">{proj.description}</p>}
                            {proj.link && <p className="mt-1 text-xs text-blue-600">{proj.link}</p>}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

export default ResumePage
