/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PROJECTS } from '../data';
import { Project } from '../types';
import { ExternalLink, Github, ChevronDown, ChevronUp, Layers, Cpu, PlayCircle, MonitorPlay, Figma } from 'lucide-react';

export default function ProjectsShowcase() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'web' | 'ui-ux' | 'multimedia' | 'java'>('all');
  const [expandedProjectId, setExpandedProjectId] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All Artifacts' },
    { id: 'web', label: 'Web Apps' },
    { id: 'ui-ux', label: 'UI / UX Crafts' },
    { id: 'java', label: 'Java Systems' },
    { id: 'multimedia', label: 'Multimedia Reel' }
  ] as const;

  const filteredProjects = PROJECTS.filter(p => activeCategory === 'all' || p.category === activeCategory);

  const toggleExpand = (id: string) => {
    if (expandedProjectId === id) {
      setExpandedProjectId(null);
    } else {
      setExpandedProjectId(id);
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'web':
        return <Layers className="w-4 h-4 text-blue-600 scale-95 shrink-0" />;
      case 'ui-ux':
        return <Figma className="w-4 h-4 text-purple-600 scale-95 shrink-0" />;
      case 'java':
        return <Cpu className="w-4 h-4 text-neutral-700 scale-95 shrink-0" />;
      case 'multimedia':
        return <MonitorPlay className="w-4 h-4 text-indigo-600 scale-95 shrink-0" />;
      default:
        return null;
    }
  };

  const getCategoryTheme = (category: string) => {
    switch (category) {
      case 'web':
        return 'from-blue-600/5 to-blue-600/10 border-blue-600/10 text-blue-700';
      case 'ui-ux':
        return 'from-purple-600/5 to-purple-600/10 border-purple-600/10 text-purple-700';
      case 'java':
        return 'from-neutral-100 to-neutral-200/50 border-black/10 text-neutral-800';
      case 'multimedia':
        return 'from-indigo-600/5 to-indigo-600/10 border-indigo-600/10 text-indigo-700';
      default:
        return 'from-neutral-100 to-neutral-200 border-black/10 text-neutral-700';
    }
  };

  return (
    <div className="space-y-8" id="projects-showcase-component">
      {/* Categories Toolbar */}
      <div className="flex flex-wrap justify-center gap-1.5 p-1.5 bg-neutral-100 rounded-full max-w-2xl mx-auto border border-black/5">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              setActiveCategory(cat.id);
              setExpandedProjectId(null);
            }}
            className={`px-4 py-2 rounded-full text-xs md:text-sm font-bold tracking-tight transition select-none cursor-pointer ${
              activeCategory === cat.id
                ? 'bg-black text-white shadow-none'
                : 'text-neutral-600 hover:text-[#121212] hover:bg-neutral-200'
            }`}
            id={`filter-btn-${cat.id}`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProjects.map((project) => {
          const isExpanded = expandedProjectId === project.id;
          return (
            <div
              key={project.id}
              className={`bg-white rounded-lg border transition-all duration-300 overflow-hidden flex flex-col justify-between ${
                isExpanded 
                  ? 'border-blue-600 ring-2 ring-blue-600/10 md:col-span-2' 
                  : 'border-black/10 hover:border-black/30'
              }`}
              id={`project-card-${project.id}`}
            >
              {/* Card visual banner / dynamic representation */}
              <div className={`p-6 bg-gradient-to-br ${getCategoryTheme(project.category)} border-b border-inherit relative overflow-hidden shrink-0`}>
                <div className="flex justify-between items-start gap-4">
                  <span className="bg-[#fdfdfd] font-bold px-3 py-1 rounded text-[10px] flex items-center gap-1.5 border border-black/5 shadow-none uppercase tracking-wider">
                    {getCategoryIcon(project.category)}
                    <span>{project.category === 'ui-ux' ? 'UI / UX Craft' : project.category}</span>
                  </span>
                  
                  <div className="flex items-center gap-1.5 no-print">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white/80 text-[#121212] hover:text-blue-600 border border-black/10 rounded p-1.5 hover:scale-105 active:scale-95 transition"
                        title="GitHub Codebase"
                        aria-label="GitHub Portal"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-blue-600 text-white rounded p-1.5 hover:scale-105 active:scale-95 transition hover:bg-blue-700 font-semibold"
                        title="Live Demo"
                        aria-label="Demo Deployment"
                      >
                        <ExternalLink className="w-4 h-4 text-white" />
                      </a>
                    )}
                  </div>
                </div>

                <div className="mt-8">
                  <h4 className="text-xl font-black text-[#121212] tracking-tighter uppercase">
                    {project.title}
                  </h4>
                  <div className="flex flex-wrap gap-1 mt-3">
                    {project.tags.map((tag, idx) => (
                      <span key={idx} className="bg-black/5 text-[#121212] font-mono font-bold px-2 py-0.5 rounded text-[10px]">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Description Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-neutral-600 text-xs md:text-sm leading-relaxed font-sans font-medium">
                    {project.description}
                  </p>

                  {/* Expand drawer details */}
                  {isExpanded && (
                    <div className="mt-6 pt-6 border-t border-black/5 space-y-5 animate-fadeIn">
                      <div className="space-y-1">
                        <h5 className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Concept overview</h5>
                        <p className="text-neutral-700 text-xs md:text-sm leading-relaxed font-sans font-medium">
                          {project.longDescription}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <h5 className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Major achievements</h5>
                          <ul className="space-y-1.5">
                            {project.features.map((feat, idx) => (
                              <li key={idx} className="text-xs text-neutral-600 flex items-start gap-1.5 font-sans font-medium">
                                <span className="text-blue-600 font-bold shrink-0">✓</span>
                                <span>{feat}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="space-y-1.5 flex flex-col">
                          <h5 className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Tools utilized</h5>
                          <div className="flex flex-wrap gap-1.5">
                            {project.toolsUsed.map((tool, idx) => (
                              <span key={idx} className="bg-blue-50 text-blue-700 border border-blue-600/10 px-2 py-0.5 rounded text-xs font-semibold">
                                {tool}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Card CTA actions */}
                <div className="mt-6 pt-4 border-t border-black/5 flex items-center justify-between no-print">
                  <button
                    onClick={() => toggleExpand(project.id)}
                    className="text-neutral-600 hover:text-blue-600 text-xs font-bold flex items-center gap-1 transition cursor-pointer"
                    id={`toggle-expand-${project.id}`}
                  >
                    {isExpanded ? (
                      <>
                        <ChevronUp className="w-4 h-4 text-blue-600" />
                        <span>Collapse Details</span>
                      </>
                    ) : (
                      <>
                        <ChevronDown className="w-4 h-4 text-blue-600" />
                        <span>Explore Architecture</span>
                      </>
                    )}
                  </button>

                  {project.demoUrl === '#video-section' ? (
                    <a
                      href="#featured-video"
                      className="bg-black hover:bg-neutral-800 text-white text-[10px] font-bold px-4 py-2 rounded-full flex items-center gap-1.5 transition select-none uppercase tracking-wider"
                    >
                      <PlayCircle className="w-4 h-4 text-blue-400" />
                      <span>Play Reel</span>
                    </a>
                  ) : project.demoUrl ? (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700 text-xs font-bold flex items-center gap-1.5 transition shrink-0"
                    >
                      <span>Launch Prototype</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  ) : null}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
