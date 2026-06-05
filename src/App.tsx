/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PERSONAL_INFO } from './data';
import SkillsDisplay from './components/SkillsDisplay';
import ProjectsShowcase from './components/ProjectsShowcase';
import VideoPlayer from './components/VideoPlayer';
import ContactForm from './components/ContactForm';
import CVViewer from './components/CVViewer';
import AdminPanel from './components/AdminPanel';
import { 
  FileText, 
  MapPin, 
  Sparkles, 
  Linkedin, 
  Github, 
  Briefcase, 
  GraduationCap, 
  ExternalLink,
  Phone,
  Mail,
  User,
  Layers,
  Video,
  Cpu,
  ChevronRight,
  Info,
  ShieldAlert,
  Lock
} from 'lucide-react';

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isCVOpen, setIsCVOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [imgErr, setImgErr] = useState(false);

  // Replicate their original loader splash sequence
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#fdfdfd] text-[#121212] antialiased font-sans relative">
      
      {/* 1. Loading screen matching their original sequence but elevated professionally */}
      {!isLoaded && (
        <div 
          id="loader-overlay" 
          className="fixed inset-0 bg-[#fdfdfd] text-[#121212] flex flex-col justify-center items-center z-200 transition-opacity duration-550"
        >
          <div className="text-center space-y-6">
            {/* Spinning brand blue loader ring */}
            <div className="w-14 h-14 rounded-full border-4 border-blue-600/20 border-t-blue-600 animate-spin mx-auto"></div>
            <div className="space-y-1.5">
              <h2 className="text-2xl font-black uppercase tracking-tighter text-[#121212] font-heading">
                Edwin Mantsho
              </h2>
              <p className="text-xs uppercase text-blue-600 font-mono tracking-widest font-bold">
                Multimedia Portfolio System
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 2. Interactive CV Viewer Overlay Modal */}
      <CVViewer isOpen={isCVOpen} onClose={() => setIsCVOpen(false)} />
      <AdminPanel isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />

      {/* 3. Hero section: Spacious layout with elegant typography and clean status markers */}
      <header className="relative bg-[#fdfdfd] text-[#121212] pt-24 pb-16 md:pb-24 border-b border-black/5 overflow-hidden" id="hero-banner">
        
        {/* Subtle grid accent of Swiss posters */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-50/40 via-[#fdfdfd] to-[#fdfdfd] opacity-90"></div>

        <div className="relative max-w-6xl mx-auto px-6 md:px-8 space-y-8">
          <div className="inline-flex items-center gap-2 bg-blue-600/10 border border-blue-600/20 text-blue-600 px-4 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase select-none">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>TUT ICT Multimedia Specialist</span>
          </div>

          <div className="max-w-4xl space-y-6">
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.85] text-[#121212] uppercase font-display">
              Edwin<br/>Mantsho<span className="text-blue-600">.</span>
            </h1>
            <p className="text-blue-600 text-sm md:text-base font-black tracking-widest uppercase">
              {PERSONAL_INFO.title}
            </p>
            <p className="text-neutral-600 text-base md:text-lg max-w-2xl leading-relaxed font-sans font-medium">
              {PERSONAL_INFO.aboutMeShort}
            </p>
          </div>

          {/* Prompt Actions */}
          <div className="flex flex-wrap items-center gap-3 pt-4 no-print2">
            <button
              onClick={() => setIsCVOpen(true)}
              className="bg-black hover:bg-blue-600 active:scale-95 text-white px-6 py-3 rounded-full text-xs font-bold tracking-widest uppercase transition flex items-center gap-2 select-none"
              id="header-cv-trigger"
            >
              <FileText className="w-4 h-4 stroke-[2]" />
              <span>Download CV</span>
            </button>

            <a
              href="#contact"
              className="bg-white border-2 border-[#121212] hover:bg-[#121212] hover:text-white text-[#121212] px-6 py-3 rounded-full text-xs font-bold tracking-widest uppercase transition flex items-center gap-1.5 select-none"
            >
              <span>Contact Edwin</span>
              <ChevronRight className="w-4 h-4 text-blue-600" />
            </a>
          </div>
        </div>
      </header>

      {/* 4. Sticky elegant Navigation bar */}
      <nav className="sticky top-0 bg-[#fdfdfd]/95 backdrop-blur-md border-b border-black/5 z-50 shadow-none no-print" id="sticky-navbar">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <span className="font-extrabold uppercase text-sm tracking-tighter text-[#121212] leading-none">
              Edwin <span className="text-blue-600">Mantsho</span>
            </span>
            
            <div className="flex items-center gap-4 md:gap-8">
              <a href="#about" className="text-[10px] font-bold uppercase tracking-widest text-[#121212]/80 hover:text-blue-600 transition">About</a>
              <a href="#skills" className="text-[10px] font-bold uppercase tracking-widest text-[#121212]/80 hover:text-blue-600 transition">Capabilities</a>
              <a href="#projects" className="text-[10px] font-bold uppercase tracking-widest text-[#121212]/80 hover:text-blue-600 transition">Projects</a>
              <a href="#featured-video" className="text-[10px] font-bold uppercase tracking-widest text-[#121212]/80 hover:text-blue-600 transition hidden sm:inline-block">Reel</a>
              <a href="#contact" className="text-[10px] font-bold uppercase tracking-widest text-[#121212]/80 hover:text-blue-600 transition">Contact</a>
              <button 
                onClick={() => setIsAdminOpen(true)}
                className="text-[10px] font-extrabold uppercase tracking-widest text-blue-600 hover:text-blue-700 hover:bg-blue-50 px-2 py-0.5 rounded transition cursor-pointer flex items-center gap-1 shrink-0"
                id="nav-admin-trigger"
              >
                <Lock className="w-3.5 h-3.5 shrink-0" />
                <span>Admin</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* 5. Main Content Grid */}
      <main className="max-w-6xl mx-auto px-6 md:px-8 py-10 md:py-16 space-y-16" id="main-content-flow">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-11">
          
          {/* LEFT SIDEBAR: Personal introduction and central content sections */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* Section: About Me */}
            <section id="about" className="space-y-5">
              <div className="flex items-center gap-3 border-b border-black/10 pb-3">
                <div className="px-2.5 py-1 rounded bg-blue-600 text-white font-mono text-xs font-bold shrink-0">
                  01
                </div>
                <h3 className="text-xl md:text-2xl font-black text-[#121212] tracking-tighter uppercase">
                  Personal Biography
                </h3>
              </div>
              <p className="text-neutral-600 text-sm md:text-base leading-relaxed font-sans font-medium">
                {PERSONAL_INFO.aboutMeLong}
              </p>
            </section>
 
            {/* Section: Skills showcase */}
            <section id="skills" className="scroll-mt-20 space-y-5">
              <div className="flex items-center gap-3 border-b border-black/10 pb-3">
                <div className="px-2.5 py-1 rounded bg-blue-600 text-white font-mono text-xs font-bold shrink-0">
                  02
                </div>
                <h3 className="text-xl md:text-2xl font-black text-[#121212] tracking-tighter uppercase">
                  Technical Capabilities
                </h3>
              </div>
              <p className="text-neutral-500 text-xs md:text-sm font-sans font-medium">
                Click headers to sort professional credentials below. Levels reflect performance standards developed during TUT projects.
              </p>
              <SkillsDisplay />
            </section>
 
          </div>
 
          {/* RIGHT SIDEBAR: Personal Photo card, facts, and social channels */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* Card: Portrait holder and quick contact parameters */}
            <div className="bg-white rounded-xl border border-black/15 p-5 text-center space-y-5" id="photo-details-container">
              
              <div className="relative aspect-square w-full rounded-lg bg-neutral-100 overflow-hidden shadow-inner group">
                {!imgErr ? (
                  <img
                    src="edwin.jpeg"
                    alt="Edwin Mantsho Portrait"
                    onError={() => setImgErr(true)}
                    className="w-full h-full object-cover group-hover:scale-102 transition duration-500"
                  />
                ) : (
                  // Elegant fallback avatar card
                  <div className="w-full h-full bg-gradient-to-br from-blue-900 via-neutral-900 to-black flex flex-col items-center justify-center text-white p-6 space-y-3">
                    <div className="w-16 h-16 bg-white/10 rounded-full border border-white/20 flex items-center justify-center text-xl font-black uppercase tracking-widest text-blue-500 font-heading">
                      EM
                    </div>
                    <div>
                      <p className="font-bold text-sm tracking-tight text-white">Edwin Mantsho</p>
                      <p className="text-blue-500 text-[10px] uppercase font-mono tracking-widest font-bold">Image Fallback Active</p>
                    </div>
                    <p className="text-[10px] text-neutral-400 leading-normal font-sans font-medium">
                      Place your portfolio portrait file as <code className="text-blue-500 bg-neutral-950 px-1 py-0.5 rounded font-mono">edwin.jpeg</code> inside the root directory to display your photo!
                    </p>
                  </div>
                )}
                
                <div className="absolute bottom-3 left-3 bg-[#121212]/90 backdrop-blur-xs px-2.5 py-1 rounded-sm text-[10px] text-blue-500 font-mono font-black tracking-widest uppercase flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-blue-500" />
                  Pretoria, SA
                </div>
              </div>
 
              {/* Action and social tags below picture */}
              <div className="space-y-1">
                <h4 className="text-lg font-black text-[#121212] tracking-tighter uppercase leading-tight">
                  {PERSONAL_INFO.name}
                </h4>
                <p className="text-[10px] uppercase font-black text-blue-600 tracking-wider">
                  TUT Information System Student
                </p>
              </div>
 
              <div className="flex justify-center gap-2 pt-1.5 no-print">
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-neutral-50 hover:bg-blue-600 hover:text-white border border-neutral-200 rounded-lg p-2.5 hover:scale-105 active:scale-95 transition"
                  title="LinkedIn Account"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4.5 h-4.5 text-neutral-600 hover:text-inherit" />
                </a>
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-neutral-50 hover:bg-blue-600 hover:text-white border border-neutral-200 rounded-lg p-2.5 hover:scale-105 active:scale-95 transition"
                  title="GitHub Source"
                  aria-label="GitHub"
                >
                  <Github className="w-4.5 h-4.5 text-neutral-600 hover:text-inherit" />
                </a>
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="bg-neutral-50 hover:bg-blue-600 hover:text-white border border-neutral-200 rounded-lg p-2.5 hover:scale-105 active:scale-95 transition"
                  title="Direct Coordinates"
                  aria-label="Email Address"
                >
                  <Mail className="w-4.5 h-4.5 text-neutral-600 hover:text-inherit" />
                </a>
              </div>
            </div>
 
            {/* Quick Card: Academic/TUT Facts */}
            <div className="p-6 bg-white rounded-xl border border-black/15 space-y-4" id="academic-facts-card">
              <h4 className="text-[10px] font-heading font-black text-blue-600 uppercase tracking-widest pb-2 border-b border-black/5">
                Academic Brief
              </h4>
              <ul className="space-y-3.5">
                {PERSONAL_INFO.quickFacts.map((fact, idx) => (
                  <li key={idx} className="space-y-0.5">
                    <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">
                      {fact.label}
                    </span>
                    <p className="text-xs font-bold text-[#121212] font-sans leading-relaxed">
                      {fact.value}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
 
            {/* Quick Card: Professional Focus */}
            <div className="p-6 bg-white rounded-xl border border-black/15 space-y-4" id="interests-focus-card">
              <h4 className="text-[10px] font-heading font-black text-blue-600 uppercase tracking-widest pb-2 border-b border-black/5">
                Functional Focus
              </h4>
              <ul className="space-y-4">
                {PERSONAL_INFO.interests.map((interest, idx) => (
                  <li key={idx} className="space-y-1">
                    <h5 className="text-xs font-bold text-[#121212] flex items-center gap-1.5 uppercase tracking-tight">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                      <span>{interest.name}</span>
                    </h5>
                    <p className="text-[11px] text-neutral-500 leading-normal font-sans font-medium pl-3">
                      {interest.description}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
 
          </div>
 
        </div>

        {/* Section: Showcase Projects Dashboard (Center/Grid block) */}
        <section id="projects" className="scroll-mt-20 space-y-6 pt-6">
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-8">
            <span className="text-blue-600 font-bold tracking-widest uppercase text-xs">Aesthetic Artifacts</span>
            <h3 className="text-3xl md:text-4xl font-black text-[#121212] tracking-tighter uppercase leading-none">
              Featured Work Showroom
            </h3>
            <p className="text-neutral-500 text-xs md:text-sm font-sans font-medium">
              Explore my latest software modules, mobile interface wireframes, and live student marketplaces designed with logic.
            </p>
          </div>
          <ProjectsShowcase />
        </section>

        {/* Section: Featured Video Multimedia Component (Separate high quality view) */}
        <section id="featured-video" className="scroll-mt-20 max-w-4xl mx-auto space-y-6 pt-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-blue-600 font-bold tracking-widest uppercase text-xs">Creative Timing</span>
            <h3 className="text-3xl md:text-4xl font-black text-[#121212] tracking-tighter uppercase leading-none">
              Multimedia Game Reel
            </h3>
            <p className="text-neutral-500 text-xs md:text-sm font-sans font-medium">
              A brief streaming sequence showcasing video rendering cuts, dynamic beats syncing, and professional overlays.
            </p>
          </div>
          <VideoPlayer />
        </section>

        {/* Section: Contact Form and coordinates link */}
        <section id="contact" className="scroll-mt-20 pt-8 border-t border-black/10">
          <ContactForm />
        </section>

      </main>

      {/* 6. Professional styled Footer */}
      <footer className="bg-black text-[#fdfdfd] py-16 no-print" id="page-footer">
        <div className="max-w-6xl mx-auto px-6 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <span className="font-extrabold uppercase text-sm tracking-widest text-white">
              Edwin Mantsho <span className="text-blue-600">.</span> Portfolio
            </span>
            <p className="text-neutral-400 text-xs md:text-sm font-sans max-w-sm leading-relaxed font-normal">
              Designing responsive web dashboards, database persistent configurations, and beautiful high-fidelity multimedia. Registered ICT Software Specialist at TUT.
            </p>
          </div>

          <div className="md:text-right flex flex-col md:justify-between items-start md:items-end gap-6">
            <div className="flex flex-wrap gap-4 text-xs font-bold text-neutral-400">
              <a href="#about" className="hover:text-blue-500 transition">About</a>
              <a href="#skills" className="hover:text-blue-500 transition">Capabilities</a>
              <a href="#projects" className="hover:text-blue-500 transition">Work</a>
              <a href="#contact" className="hover:text-[#fdfdfd] transition">Contact</a>
              <button onClick={() => setIsCVOpen(true)} className="hover:text-blue-500 transition cursor-pointer">CV Hub</button>
              <button onClick={() => setIsAdminOpen(true)} className="hover:text-blue-500 transition cursor-pointer flex items-center gap-1">
                <Lock className="w-3.5 h-3.5" />
                <span>Admin Portal</span>
              </button>
            </div>

            <p className="text-[10px] text-neutral-500 font-mono">
              © 2026 Edwin Mantsho • Built with professional React, Tailwind v4 and Lucide assets
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
}
