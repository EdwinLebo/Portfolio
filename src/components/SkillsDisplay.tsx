/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { SKILLS } from '../data';
import { FileCode, Palette, FileJson, Cpu, Figma, Video, Layers, Lightbulb, Users, Sparkles, LucideIcon } from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  FileCode,
  Palette,
  FileJson,
  Cpu,
  Figma,
  Video,
  Layers,
  Lightbulb,
  Users,
  Sparkles,
};

export default function SkillsDisplay() {
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Technical' | 'Design & Creative' | 'Professional'>('All');

  const categories = ['All', 'Technical', 'Design & Creative', 'Professional'] as const;

  const filteredSkills = SKILLS.filter(
    (skill) => selectedCategory === 'All' || skill.category === selectedCategory
  );

  return (
    <div className="space-y-6" id="skills-section-container">
      {/* Category selector */}
      <div className="flex flex-wrap justify-center md:justify-start gap-1.5 border-b border-black/5 pb-4 no-print">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider transition cursor-pointer ${
              selectedCategory === cat
                ? 'bg-[#121212] text-white shadow-none font-bold'
                : 'text-neutral-500 hover:text-[#121212] hover:bg-neutral-100'
            }`}
            id={`skill-filter-${cat.replace(/\s+/g, '-').toLowerCase()}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid displays */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredSkills.map((skill, idx) => {
          const IconComponent = iconMap[skill.icon] || Sparkles;
          return (
            <div
              key={idx}
              className="p-4 bg-white rounded-lg border border-black/10 hover:border-black/30 transition duration-300 group"
              id={`skill-card-${skill.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
            >
              <div className="flex items-center justify-between gap-3 mb-2.5">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded bg-neutral-50 border border-black/5 text-[#121212] group-hover:bg-blue-50 group-hover:text-blue-600 transition duration-300">
                    <IconComponent className="w-4 h-4 shrink-0" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-[#121212] tracking-tight leading-tight uppercase">
                      {skill.name}
                    </h4>
                    <span className="text-[9px] uppercase font-bold tracking-wide text-neutral-400">
                      {skill.category}
                    </span>
                  </div>
                </div>
                
                <span className="text-[10px] font-mono font-bold text-[#121212] bg-neutral-50 border border-black/5 px-2 py-0.5 rounded">
                  {skill.level}%
                </span>
              </div>

              {/* Progress bar structure */}
              <div className="h-1.5 w-full bg-neutral-150 rounded-none overflow-hidden">
                <div
                  className="h-full bg-blue-600 rounded-none transition-all duration-1000 ease-out origin-left"
                  style={{ width: `${skill.level}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
