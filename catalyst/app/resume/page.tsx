'use client'

import React, { useState, useRef } from 'react'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

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

const ResumePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'form' | 'preview'>('form')
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
        logging: false
      })

      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      })

      const imgWidth = 210
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      let heightLeft = imgHeight
      let position = 0

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
      heightLeft -= 297

      while (heightLeft > 0) {
        position = heightLeft - imgHeight
        pdf.addPage()
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
        heightLeft -= 297
      }

      pdf.save(`${resume.fullName.replace(/\s+/g, '_')}_Resume.pdf`)
    } catch (error) {
      console.error('Error generating PDF:', error)
      alert('Failed to generate PDF')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 text-slate-900 p-4 md:p-8">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:wght@400;600;700&family=Poppins:wght@400;500;600;700&display=swap');
        
        * {
          font-family: 'Poppins', sans-serif;
        }
        
        .heading {
          font-family: 'Lora', serif;
          letter-spacing: -0.5px;
        }
        
        input, textarea, select {
          transition: all 0.3s ease;
          font-family: 'Poppins', sans-serif;
        }
        
        input:focus, textarea:focus, select:focus {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);
        }
        
        .tab-btn {
          position: relative;
          overflow: hidden;
        }
        
        .tab-btn.active::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, #2563eb, #7c3aed);
          animation: slideIn 0.3s ease;
        }
        
        @keyframes slideIn {
          from { left: -100%; }
          to { left: 0; }
        }
        
        .btn-delete {
          opacity: 0.7;
          transition: all 0.2s;
        }
        
        .btn-delete:hover {
          opacity: 1;
          transform: scale(1.05);
        }
        
        .back-button {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.25rem;
          font-size: 0.95rem;
          font-weight: 500;
          color: #64748b;
          border: 1px solid #e2e8f0;
          border-radius: 0.5rem;
          background: white;
          transition: all 0.2s ease;
          cursor: pointer;
          margin-bottom: 1.5rem;
        }
        
        .back-button:hover {
          background: #f8fafc;
          color: #1e293b;
          border-color: #cbd5e1;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }
        
        .resume-preview {
          background: white;
          color: #1f2937;
          padding: 48px;
          border-radius: 8px;
          font-size: 14px;
          line-height: 1.6;
          max-width: 850px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
          border: 1px solid #f0f1f3;
        }
        
        .resume-header {
          border-bottom: 2px solid #1f2937;
          margin-bottom: 24px;
          padding-bottom: 16px;
        }
        
        .resume-name {
          font-size: 28px;
          font-weight: 700;
          font-family: 'Lora', serif;
          margin-bottom: 8px;
          color: #1f2937;
        }
        
        .resume-contact {
          font-size: 12px;
          color: #6b7280;
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
        }
        
        .resume-section {
          margin-bottom: 20px;
        }
        
        .resume-section-title {
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          color: #1f2937;
          border-bottom: 2px solid #e5e7eb;
          padding-bottom: 8px;
          margin-bottom: 12px;
        }
        
        .resume-item {
          margin-bottom: 12px;
        }
        
        .resume-item-title {
          font-weight: 700;
          color: #1f2937;
        }
        
        .resume-item-subtitle {
          font-style: italic;
          color: #6b7280;
          font-size: 13px;
        }
      `}</style>

      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => window.history.back()}
          className="back-button"
          title="Go back to previous page"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Back
        </button>

        {/* Header */}
        <div className="mb-8">
          <h1 className="heading text-5xl font-bold mb-2 text-slate-900">
            Resume Builder
          </h1>
          <p className="text-slate-600 text-lg">Create a polished, professional resume in minutes</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-slate-200">
          <button
            onClick={() => setActiveTab('form')}
            className={`tab-btn px-6 py-3 font-semibold transition-colors ${
              activeTab === 'form' ? 'text-blue-600 active' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            ✏️ Edit
          </button>
          <button
            onClick={() => setActiveTab('preview')}
            className={`tab-btn px-6 py-3 font-semibold transition-colors ${
              activeTab === 'preview' ? 'text-blue-600 active' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            👁️ Preview
          </button>
        </div>

        {/* Form Tab */}
        {activeTab === 'form' && (
          <div className="space-y-8">
            {/* Basic Information */}
            <section className="bg-white border border-slate-200 p-8 rounded-lg shadow-sm">
              <h2 className="heading text-2xl font-bold mb-6 text-slate-900">Personal Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={resume.fullName}
                  onChange={(e) => updateBasicInfo('fullName', e.target.value)}
                  className="bg-white border border-slate-300 rounded px-4 py-2.5 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-200"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={resume.email}
                  onChange={(e) => updateBasicInfo('email', e.target.value)}
                  className="bg-white border border-slate-300 rounded px-4 py-2.5 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-200"
                />
                <input
                  type="tel"
                  placeholder="Phone"
                  value={resume.phone}
                  onChange={(e) => updateBasicInfo('phone', e.target.value)}
                  className="bg-white border border-slate-300 rounded px-4 py-2.5 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-200"
                />
                <input
                  type="text"
                  placeholder="Location"
                  value={resume.location}
                  onChange={(e) => updateBasicInfo('location', e.target.value)}
                  className="bg-white border border-slate-300 rounded px-4 py-2.5 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-200"
                />
              </div>
              <textarea
                placeholder="Professional Summary"
                value={resume.summary}
                onChange={(e) => updateBasicInfo('summary', e.target.value)}
                className="w-full bg-white border border-slate-300 rounded px-4 py-2.5 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-200 mt-6 h-24"
              />
              <textarea
                placeholder="Skills (comma-separated)"
                value={resume.skills}
                onChange={(e) => updateBasicInfo('skills', e.target.value)}
                className="w-full bg-white border border-slate-300 rounded px-4 py-2.5 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-200 mt-6 h-20"
              />
            </section>

            {/* Experience */}
            <section className="bg-white border border-slate-200 p-8 rounded-lg shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h2 className="heading text-2xl font-bold text-slate-900">Work Experience</h2>
                <button
                  onClick={addExperience}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-semibold transition-all transform hover:scale-105 shadow-sm"
                >
                  + Add
                </button>
              </div>
              <div className="space-y-6">
                {resume.experiences.map((exp) => (
                  <div key={exp.id} className="bg-slate-50 p-5 rounded border border-slate-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Company"
                        value={exp.company}
                        onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                        className="bg-white border border-slate-300 rounded px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-200"
                      />
                      <input
                        type="text"
                        placeholder="Position"
                        value={exp.position}
                        onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                        className="bg-white border border-slate-300 rounded px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-200"
                      />
                      <input
                        type="month"
                        placeholder="Start Date"
                        value={exp.startDate}
                        onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                        className="bg-white border border-slate-300 rounded px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-200"
                      />
                      <input
                        type="month"
                        placeholder="End Date"
                        value={exp.endDate}
                        onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                        className="bg-white border border-slate-300 rounded px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-200"
                      />
                    </div>
                    <textarea
                      placeholder="Description"
                      value={exp.description}
                      onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-200 mt-4 h-20"
                    />
                    <button
                      onClick={() => deleteExperience(exp.id)}
                      className="btn-delete mt-3 text-red-600 hover:text-red-700 font-semibold"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                ))}
              </div>
            </section>

            {/* Education */}
            <section className="bg-white border border-slate-200 p-8 rounded-lg shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h2 className="heading text-2xl font-bold text-slate-900">Education</h2>
                <button
                  onClick={addEducation}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-semibold transition-all transform hover:scale-105 shadow-sm"
                >
                  + Add
                </button>
              </div>
              <div className="space-y-6">
                {resume.education.map((edu) => (
                  <div key={edu.id} className="bg-slate-50 p-5 rounded border border-slate-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Institution"
                        value={edu.institution}
                        onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                        className="bg-white border border-slate-300 rounded px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-200"
                      />
                      <input
                        type="text"
                        placeholder="Degree"
                        value={edu.degree}
                        onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                        className="bg-white border border-slate-300 rounded px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-200"
                      />
                      <input
                        type="text"
                        placeholder="Field of Study"
                        value={edu.field}
                        onChange={(e) => updateEducation(edu.id, 'field', e.target.value)}
                        className="bg-white border border-slate-300 rounded px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-200"
                      />
                      <input
                        type="text"
                        placeholder="Graduation Year"
                        value={edu.year}
                        onChange={(e) => updateEducation(edu.id, 'year', e.target.value)}
                        className="bg-white border border-slate-300 rounded px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-200"
                      />
                    </div>
                    <button
                      onClick={() => deleteEducation(edu.id)}
                      className="btn-delete mt-3 text-red-600 hover:text-red-700 font-semibold"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                ))}
              </div>
            </section>

            {/* Projects */}
            <section className="bg-white border border-slate-200 p-8 rounded-lg shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h2 className="heading text-2xl font-bold text-slate-900">Projects</h2>
                <button
                  onClick={addProject}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-semibold transition-all transform hover:scale-105 shadow-sm"
                >
                  + Add
                </button>
              </div>
              <div className="space-y-6">
                {resume.projects.map((proj) => (
                  <div key={proj.id} className="bg-slate-50 p-5 rounded border border-slate-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Project Name"
                        value={proj.name}
                        onChange={(e) => updateProject(proj.id, 'name', e.target.value)}
                        className="bg-white border border-slate-300 rounded px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-200"
                      />
                      <input
                        type="text"
                        placeholder="Technologies"
                        value={proj.technologies}
                        onChange={(e) => updateProject(proj.id, 'technologies', e.target.value)}
                        className="bg-white border border-slate-300 rounded px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-200"
                      />
                    </div>
                    <textarea
                      placeholder="Description"
                      value={proj.description}
                      onChange={(e) => updateProject(proj.id, 'description', e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-200 mt-4 h-20"
                    />
                    <input
                      type="text"
                      placeholder="Project Link (GitHub/Portfolio)"
                      value={proj.link}
                      onChange={(e) => updateProject(proj.id, 'link', e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-200 mt-4"
                    />
                    <button
                      onClick={() => deleteProject(proj.id)}
                      className="btn-delete mt-3 text-red-600 hover:text-red-700 font-semibold"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* Preview Tab */}
        {activeTab === 'preview' && (
          <div className="space-y-6">
            <div className="flex justify-end">
              <button
                onClick={downloadPDF}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded font-bold transition-all transform hover:scale-105 shadow-md flex items-center gap-2"
              >
                📥 Download as PDF
              </button>
            </div>

            <div ref={resumeRef} className="resume-preview mx-auto">
              {/* Resume Header */}
              <div className="resume-header">
                <div className="resume-name">{resume.fullName}</div>
                <div className="resume-contact">
                  <span>{resume.email}</span>
                  <span>•</span>
                  <span>{resume.phone}</span>
                  <span>•</span>
                  <span>{resume.location}</span>
                </div>
              </div>

              {/* Professional Summary */}
              {resume.summary && (
                <div className="resume-section">
                  <div className="resume-section-title">Professional Summary</div>
                  <p>{resume.summary}</p>
                </div>
              )}

              {/* Skills */}
              {resume.skills && (
                <div className="resume-section">
                  <div className="resume-section-title">Skills</div>
                  <p>{resume.skills}</p>
                </div>
              )}

              {/* Experience */}
              {resume.experiences.length > 0 && (
                <div className="resume-section">
                  <div className="resume-section-title">Work Experience</div>
                  {resume.experiences.map((exp) => (
                    <div key={exp.id} className="resume-item">
                      <div className="resume-item-title">{exp.position}</div>
                      <div className="resume-item-subtitle">
                        {exp.company} • {exp.startDate} - {exp.endDate}
                      </div>
                      {exp.description && <p className="text-slate-700 mt-1">{exp.description}</p>}
                    </div>
                  ))}
                </div>
              )}

              {/* Education */}
              {resume.education.length > 0 && (
                <div className="resume-section">
                  <div className="resume-section-title">Education</div>
                  {resume.education.map((edu) => (
                    <div key={edu.id} className="resume-item">
                      <div className="resume-item-title">
                        {edu.degree} in {edu.field}
                      </div>
                      <div className="resume-item-subtitle">
                        {edu.institution} • {edu.year}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Projects */}
              {resume.projects.length > 0 && (
                <div className="resume-section">
                  <div className="resume-section-title">Projects</div>
                  {resume.projects.map((proj) => (
                    <div key={proj.id} className="resume-item">
                      <div className="resume-item-title">{proj.name}</div>
                      <div className="resume-item-subtitle">{proj.technologies}</div>
                      {proj.description && <p className="text-slate-700 mt-1">{proj.description}</p>}
                      {proj.link && <p className="text-blue-600 text-xs mt-1">{proj.link}</p>}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ResumePage