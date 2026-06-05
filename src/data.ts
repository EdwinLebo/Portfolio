/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Project, Skill, EducationExperience } from './types';

export const PERSONAL_INFO = {
  name: 'Edwin Mantsho',
  title: 'ICT Student & Multimedia Specialist',
  subTitle: 'Specializing in Web Development, Java Programming, & UI/UX Design',
  email: 'godspeed200407@gmail.com',
  github: 'https://github.com/EdwinLebo',
  linkedin: 'https://www.linkedin.com/in/edwin-mantsho-194ba729a/?skipRedirect=true',
  marketplace: 'https://student-marketplace-2abdb.web.app/login.html',
  aboutMeShort: 'I am an ICT student at Tshwane University of Technology (TUT) with a passion for coding, creative video editing, and constructing seamless user journeys. My expertise balances technical software development with aesthetic digital interfaces.',
  aboutMeLong: 'Working closely at the intersection of logical backend engineering and elegant frontend graphics, I design software solutions that are clean, performant, and delightful to navigate. From building student-focused e-commerce layouts like my TUT Student Marketplace, to structuring database-backed application code, I approach every challenge with logic and visual precision. As a multimedia student, I am fueled by a drive to integrate sound, video, and intuitive components into interactive masterworks. I enjoy gaming, designing custom user workflows, and exploring state-of-the-art web frameworks.',
  quickFacts: [
    { label: 'Institution', value: 'Tshwane University of Technology (TUT)' },
    { label: 'Role Focus', value: 'Full-Stack Web & Multimedia Engine' },
    { label: 'Core Tech Stack', value: 'Java, HTML5, Tailwind CSS, JS/TS' },
    { label: 'Interests', value: 'Creative Game Capture, UI Systems, OOP' }
  ],
  interests: [
    { name: 'Web Engineering', description: 'Crafting semantic layouts with lightning-fast reactive state engines.' },
    { name: 'UI/UX Crafting', description: 'Structuring wireframes that guide users through flawless interactive cycles.' },
    { name: 'Multimedia Editing', description: 'Polishing raw audio and action-packed game reels into cinematic summaries.' },
    { name: 'Desktop Java Apps', description: 'Developing heavy-duty modular frameworks and OOP structures.' }
  ]
};

export const PROJECTS: Project[] = [
  {
    id: 'student-marketplace',
    title: 'TUT Student Marketplace',
    description: 'A responsive commerce platform and web dashboard developed for Tshwane University of Technology students to buy, sell, and list items securely.',
    longDescription: 'Addressing a core safety and logistical challenge in campus trading, the TUT Student Marketplace offers a custom-tailored user experience. It features fully secure authentication portals, modular listing grids, intuitive search configurations, and clean pricing displays. The design concentrates on micro-interactions in login forms, user forms, and high-visibility listing tiles optimized for mobile and desktop viewports.',
    category: 'web',
    tags: ['React', 'Firebase Auth', 'UIUX Design', 'Tailwind', 'Responsive Web'],
    imageUrl: 'student_marketplace_preview', // Custom identifier or can resolve to placeholder
    demoUrl: 'https://student-marketplace-2abdb.web.app/login.html',
    githubUrl: 'https://github.com/EdwinLebo',
    features: [
      'Encrypted client-side credential verification portal',
      'Dynamic search bar and smart price filter categories',
      'Responsive, uniform grid elements matching high-contrast dark bars',
      'Highly intuitive media upload drafts for student goods'
    ],
    toolsUsed: ['Figma', 'HTML5', 'Tailwind CSS v4', 'Firebase Sandbox', 'Web Storage API']
  },
  {
    id: 'whatsapp-redesign',
    title: 'WhatsApp Dev Portfolio Flow',
    description: 'An upgraded UI/UX messaging strategy and mobile chat view crafted to expose developer profiles and project catalogues natively inside WhatsApp.',
    longDescription: 'Created as an elegant answer to messaging-based portfolios, this redesign maps user journeys to automate developer status and share links effortlessly. Incorporating rapid actions, compact card grids, and high-legibility messaging blocks, it streamlines communication with clients or hiring leads searching student marketplace profiles.',
    category: 'ui-ux',
    tags: ['Mobile UI', 'Figma Prototyping', 'Interactive Flow', 'Design Systems'],
    imageUrl: 'whatsapp_portfolio_preview',
    demoUrl: 'https://student-marketplace-2abdb.web.app/login.html',
    githubUrl: 'https://github.com/EdwinLebo',
    features: [
      'Compact grid overlay showing developer credentials inside details chats',
      'One-tap contact card triggers and quick-reply portfolio buttons',
      'Smooth dark-mode layout transitions tailored for mobile views',
      'Visual catalog extensions optimized for slow-network loading'
    ],
    toolsUsed: ['Figma', 'React Components', 'Motion Layouts', 'Lucide Icons']
  },
  {
    id: 'gaming-multimedia',
    title: 'Cinematic Game Edits Reel',
    description: 'A professional multimedia showcase showing deep game editing expertise, sound syncs, and sharp video compositions.',
    longDescription: 'A custom multimedia production incorporating complex timeline editing, frame-by-frame overlays, and foley sound designs. Developed to capture gaming action while exhibiting skills in frame alignment, high-fidelity sound, and modern color-grading scales popular in consumer video entertainment.',
    category: 'multimedia',
    tags: ['Adode Premiere', 'After Effects', 'Sound Sync', 'Multimedia Editing'],
    imageUrl: 'gaming_video_reel',
    demoUrl: '#featured-video', // will slide down to video player
    features: [
      'Synchronized beats matching frame changes and speed shifts',
      'Advanced color-grading showcasing depth of environment layouts',
      'High-quality audio normalization and custom voice/sfx overlays',
      'Rendered in optimized web-ready streaming presets'
    ],
    toolsUsed: ['Adobe Premiere Pro', 'Adobe After Effects', 'Audacity', 'OBS Studio']
  },
  {
    id: 'java-registration',
    title: 'Java Academic Course Allocation',
    description: 'A desktop registration system matching students with suitable modules and seat assignments using standard Java SE libraries.',
    longDescription: 'This application addresses structural backend academic processes. Structured around robust Object-Oriented Programming (OOP) architectures, it solves data record manipulation, input sanitization workflows, seat capacity thresholds, and persistent registry states using clean, performant modules.',
    category: 'java',
    tags: ['Java SE', 'Swing Interface', 'OOP Design', 'Thread Optimization'],
    imageUrl: 'java_app_preview',
    githubUrl: 'https://github.com/EdwinLebo',
    features: [
      'Algorithmic seat allocation and capacity thresholds',
      'Complete client form auditing and syntax safety checks',
      'XML/JSON local persistence simulation tracking registry states',
      'Strict MVC code configuration for easy modular adaptation'
    ],
    toolsUsed: ['Java SE 21', 'IntelliJ IDEA', 'Java Swing UI', 'JUnit Testing']
  }
];

export const SKILLS: Skill[] = [
  // Technical
  { name: 'HTML5 & Semantic Web', category: 'Technical', level: 95, icon: 'FileCode' },
  { name: 'CSS3 & Modern Tailwind', category: 'Technical', level: 93, icon: 'Palette' },
  { name: 'JavaScript (ES6+) & React', category: 'Technical', level: 90, icon: 'FileJson' },
  { name: 'Java Programming (OOP)', category: 'Technical', level: 85, icon: 'Cpu' },
  
  // Design & Creative
  { name: 'UI / UX Design Systems', category: 'Design & Creative', level: 92, icon: 'Figma' },
  { name: 'Multimedia Compositing', category: 'Design & Creative', level: 88, icon: 'Video' },
  { name: 'Interaction Engineering', category: 'Design & Creative', level: 90, icon: 'Layers' },
  
  // Professional
  { name: 'Problem Solving', category: 'Professional', level: 94, icon: 'Lightbulb' },
  { name: 'Collaboration & Sync', category: 'Professional', level: 89, icon: 'Users' },
  { name: 'Agile Workflow Concepts', category: 'Professional', level: 85, icon: 'Sparkles' }
];

export const EDUCATION_HISTORY: EducationExperience[] = [
  {
    id: 'tut-diploma',
    type: 'education',
    title: 'Diploma in Information and Communication Technology (ICT)',
    institution: 'Tshwane University of Technology (TUT)',
    period: '2024 - Present',
    description: 'Enrolled in full-time specialized coursework in software testing, system design, object-oriented systems, database design, and interactive web scripting.',
    bullets: [
      'Specializing in Web Development and Desktop Java Architecture',
      'Gained deep competency in frontend responsiveness and semantic page logic',
      'Engaging actively in design labs, tutoring peers on CSS layouts and interface structures'
    ]
  },
  {
    id: 'marketplace-creation',
    type: 'experience',
    title: 'Lead UI/UX Creator & Web Engine',
    institution: 'TUT Student Marketplace Project',
    period: '2024 - 2025',
    description: 'Engineered a student-facing login workflow and item index designed specifically to streamline on-campus commerce safely.',
    bullets: [
      'Coded a lightweight web app focusing on high usability, secure client views, and item listings',
      'Formulated an attractive, high-contrast user interface and interactive item details cards',
      'Managed hosting deployments and performed extensive multi-device cross-browser debugging'
    ]
  }
];
