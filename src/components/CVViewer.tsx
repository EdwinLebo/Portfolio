/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef } from 'react';
import { PERSONAL_INFO, EDUCATION_HISTORY, SKILLS } from '../data';
import { Mail, Github, Linkedin, ExternalLink, Printer, Download, X } from 'lucide-react';

interface CVViewerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CVViewer({ isOpen, onClose }: CVViewerProps) {
  const resumeRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const handlePrint = () => {
    const printContent = resumeRef.current?.innerHTML;
    if (!printContent) return;

    const originalContent = document.body.innerHTML;
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Edwin_Mantsho_CV</title>
            <link href="https://cdn.jsdelivr.net/npm/tailwindcss@3.4.1/dist/tailwind.min.css" rel="stylesheet">
            <style>
              @media print {
                body { padding: 2cm; background: white; color: black; }
                .no-print { display: none !important; }
              }
            </style>
          </head>
          <body class="bg-white text-gray-900 font-sans p-8">
            ${printContent}
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.focus();
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 500);
    }
  };

  return (
    <div id="cv-modal" className="fixed inset-0 bg-neutral-900/80 backdrop-blur-sm z-100 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden border border-neutral-200">
        
        {/* Header toolbar */}
        <div className="bg-black text-white px-6 py-4 flex items-center justify-between border-b border-black/10 no-print">
          <div className="flex items-center gap-2">
            <Printer className="w-5 h-5 text-blue-500" />
            <span className="font-extrabold text-xs uppercase tracking-widest text-[#fdfdfd]">Interactive Resume Hub</span>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="bg-blue-600 hover:bg-blue-700 active:scale-95 text-white px-4 py-1.5 rounded text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition cursor-pointer"
              id="cv-print-btn"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save PDF</span>
            </button>
            
            <button
              onClick={onClose}
              className="text-neutral-400 hover:text-white p-1 rounded-full hover:bg-neutral-800 transition cursor-pointer"
              aria-label="Close CV Viewer"
              id="cv-close-btn"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* CV sheet container */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10 bg-neutral-100">
          <div
            ref={resumeRef}
            className="bg-white p-8 md:p-12 shadow-none rounded-lg max-w-3xl mx-auto border border-black/10 text-gray-850"
            id="cv-document-sheet"
          >
            {/* CV Header */}
            <div className="border-b-2 border-neutral-900 pb-6 mb-6">
              <h1 className="text-3xl md:text-4xl font-black text-neutral-900 tracking-tighter uppercase">{PERSONAL_INFO.name}</h1>
              <p className="text-sm font-bold text-blue-600 mt-1 uppercase tracking-widest">{PERSONAL_INFO.title}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4 text-xs md:text-sm text-neutral-600">
                <div className="flex items-center gap-1.5">
                  <Mail className="w-4 h-4 text-neutral-400 shrink-0" />
                  <a href={`mailto:${PERSONAL_INFO.email}`} className="hover:underline">{PERSONAL_INFO.email}</a>
                </div>
                <div className="flex items-center gap-1.5">
                  <Github className="w-4 h-4 text-neutral-400 shrink-0" />
                  <a href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer" className="hover:underline text-neutral-800">github.com/EdwinLebo</a>
                </div>
                <div className="flex items-center gap-1.5">
                  <Linkedin className="w-4 h-4 text-neutral-400 shrink-0" />
                  <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline text-neutral-800">linkedin.com/in/edwin-mantsho</a>
                </div>
                <div className="flex items-center gap-1.5">
                  <ExternalLink className="w-4 h-4 text-neutral-400 shrink-0" />
                  <a href={PERSONAL_INFO.marketplace} target="_blank" rel="noopener noreferrer" className="hover:underline text-neutral-800">student-marketplace-2abdb.web.app</a>
                </div>
              </div>
            </div>

            {/* Profile statement */}
            <div className="mb-8">
              <h2 className="text-xs font-black text-neutral-900 border-b border-black/5 pb-1.5 uppercase tracking-widest mb-3">Professional Summary</h2>
              <p className="text-sm text-neutral-700 leading-relaxed font-medium">
                {PERSONAL_INFO.aboutMeLong}
              </p>
            </div>

            {/* Academic & Experience Details */}
            <div className="mb-8">
              <h2 className="text-xs font-black text-neutral-900 border-b border-black/5 pb-1.5 uppercase tracking-widest mb-4">Education & Project Roles</h2>
              <div className="space-y-6">
                {EDUCATION_HISTORY.map((item) => (
                  <div key={item.id} className="relative">
                    <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-1.5">
                      <h3 className="text-base font-bold text-neutral-900">{item.title}</h3>
                      <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded md:bg-transparent md:p-0">{item.period}</span>
                    </div>
                    <p className="text-xs font-semibold text-neutral-500 mb-2">{item.institution}</p>
                    <p className="text-sm text-neutral-600 mb-3 leading-relaxed font-medium">{item.description}</p>
                    <ul className="list-disc list-inside space-y-1 text-xs text-neutral-700">
                      {item.bullets.map((b, idx) => (
                        <li key={idx} className="leading-relaxed font-sans font-medium">{b}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills & Tools grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <h2 className="text-xs font-black text-neutral-900 border-b border-black/5 pb-1.5 uppercase tracking-widest mb-3">Technical Capabilities</h2>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {SKILLS.filter(s => s.category === 'Technical').map((skill, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2.5 bg-neutral-50 rounded border border-black/5">
                      <span className="font-bold text-neutral-800">{skill.name.split(' & ')[0]}</span>
                      <span className="text-[#121212]/75 font-mono font-bold">{skill.level}%</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h2 className="text-xs font-black text-neutral-900 border-b border-black/5 pb-1.5 uppercase tracking-widest mb-3">Design & Interaction</h2>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {SKILLS.filter(s => s.category !== 'Technical').map((skill, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2.5 bg-neutral-50 rounded border border-black/5">
                      <span className="font-bold text-neutral-800">{skill.name.split(' & ')[0]}</span>
                      <span className="text-[#121212]/75 font-mono font-bold">{skill.level}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer lines */}
            <div className="border-t border-black/5 pt-4 text-center">
              <p className="text-xs text-neutral-400 font-medium font-sans">
                References available upon request • Certified ICT Software Student at TUT
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
