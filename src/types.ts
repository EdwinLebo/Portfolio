/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  category: 'web' | 'ui-ux' | 'multimedia' | 'java';
  tags: string[];
  imageUrl: string;
  demoUrl?: string;
  githubUrl?: string;
  features: string[];
  toolsUsed: string[];
}

export interface Skill {
  name: string;
  category: 'Technical' | 'Design & Creative' | 'Professional';
  level: number; // Percentage 0-100
  icon: string; // Lucide icon name
}

export interface EducationExperience {
  id: string;
  type: 'education' | 'experience';
  title: string;
  institution: string;
  period: string;
  description: string;
  bullets: string[];
}
