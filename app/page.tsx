'use client';

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import {
  Github,
  Linkedin,
  ChevronRight,
  Menu,
  X,
  Sun,
  Moon,
} from 'lucide-react';
import { ProjectCard, CertificationCard } from '@/components/ProjectCard';
import { Logo } from '@/components/Logo';
import { useTheme } from '@/components/ThemeProvider';
import { IntroAnimation } from '@/components/IntroAnimation';
import { ContactForm } from '@/components/ContactForm';

const SKILLS = {
  languages: ["C#", "C", "Java", "JavaScript", "Kotlin", "C++", "SQL", "Python"],
  frameworks: ["ASP.NET Core", ".NET 8", "NestJS", "Entity Framework Core", "Prisma ORM", "Bootstrap"],
  databases: ["Microsoft SQL Server", "PostgreSQL", "Redis"],
  tools: ["Git", "GitHub", "Docker", "Postman", "Visual Studio", "VS Code", "Serilog"],
  concepts: ["REST APIs", "Clean Architecture", "SOLID", "OOP", "Design Patterns", "Async/Await", "Multithreading"]
};

const PROJECTS = [
  {
    title: "GamesHub",
    description: "A comprehensive digital gaming marketplace offering game accounts, boosting, and in-game currencies. Engineered with a robust NestJS backend and high-performance caching.",
    tags: ["NestJS", "TypeScript", "Prisma", "PostgreSQL", "Redis", "Docker"],
    link: "https://gameshubeg.vercel.app",
    github: "#",
    previewImage: "https://picsum.photos/seed/gameshub/1200/800",
    previewVideo: "/videos/gameshub-preview.mp4"
  },
  {
    title: "IdentityFlow Validator",
    description: "High-performance C# automation engine designed to analyze authentication recovery workflows across external identity providers with heuristic state-detection.",
    tags: ["C#", ".NET", "HtmlAgilityPack", "Automation", "Resilient Networking"],
    link: "https://github.com/RamyKhairy24/IdentityFlow-Validator",
    github: "https://github.com/RamyKhairy24/IdentityFlow-Validator",
    previewImage: "/pictures/Project%20Cards/github-preview.svg"
  },
  {
    title: "Excel Automation Engine",
    description: "Multithreaded C# engine capable of processing 2 million user records in ~50 seconds using parallel concurrency and thread-safe data structures.",
    tags: ["C#", "Multithreading", "EPPlus", "ClosedXML", "Performance"],
    link: "https://github.com/RamyKhairy24/Multithreading-excel-sheet-program",
    github: "https://github.com/RamyKhairy24/Multithreading-excel-sheet-program",
    previewImage: "/pictures/Project%20Cards/github-preview.svg"
  },
  {
    title: "Octopus System",
    description: "Customer service quality-assurance platform for agencies. Users screenshot emails or any document — Octopus OCR-scans the content, exports it as Excel, persists records to a SQL database, and provides a unified data hub with live preview and bulk export.",
    tags: ["C#", ".NET", "OCR", "Excel Export", "SQL Server", "WinForms"],
    link: "https://octopus-self.vercel.app",
    github: "#",
    previewImage: "/pictures/Project%20Cards/Octopus.png",
  },
  {
    title: "My Portfolio 1.0",
    description: "First iteration of my personal portfolio — a clean, modern single-page website built to showcase my projects, skills, and experience as a backend developer.",
    tags: ["React", "TypeScript", "Tailwind CSS", "Vite"],
    link: "#",
    github: "#",
    previewImage: "/pictures/Project%20Cards/My%20Portfolio%201.0.png"
  }
];

const CERTIFICATIONS = [
  {
    title: "Generative AI: Prompt Engineering",
    issuer: "IBM via Coursera",
    date: "2024",
    link: "https://coursera.org/verify/U0JQEFH6NNTX",
    image: "/pictures/Certificates/Introduction%20To%20Prompt%20Engineering.png"
  },
  {
    title: "Back-End Development",
    issuer: "Meta via Coursera",
    date: "2024",
    link: "https://coursera.org/verify/69QQUFZCBPPZ",
    image: "/pictures/Certificates/Introduction%20To%20Backend%20Development.png"
  },
  {
    title: "IELTS Academic (6.5)",
    issuer: "British Council",
    date: "2023",
    link: "#",
    image: "/pictures/Certificates/IELTS%20Report.png"
  },
  {
    title: "CIB Internship Certificate",
    issuer: "Commercial International Bank",
    date: "2025",
    link: "#",
    image: "/pictures/Certificates/CIB%20Internship.png"
  },
  {
    title: "Google AI Professional Certificate",
    issuer: "Google",
    date: "2024",
    link: "https://coursera.org/verify/professional-cert/KXOQHK3IQZ73",
    image: "/pictures/Certificates/Google%20Ai%20Professional%20Certificate.png"
  },
  {
    title: "AI Fundamentals",
    issuer: "Google via Coursera",
    date: "2024",
    link: "https://coursera.org/verify/3GOF13FX96AM",
    image: "/pictures/Certificates/Ai%20Fundemntals.png"
  },
  {
    title: "AI for Brainstorming & Planning",
    issuer: "Google via Coursera",
    date: "2024",
    link: "https://coursera.org/verify/NYYOYW7CQCIS",
    image: "/pictures/Certificates/Ai%20For%20BrainStorming%20And%20Planning.png"
  },
  {
    title: "AI for Content Creation",
    issuer: "Google via Coursera",
    date: "2024",
    link: "https://coursera.org/verify/3PCBBA4G4X3E",
    image: "/pictures/Certificates/Ai%20For%20Content%20Creation.png"
  },
  {
    title: "AI for Data Analysis",
    issuer: "Google via Coursera",
    date: "2024",
    link: "https://coursera.org/verify/PREDOYDTG6PN",
    image: "/pictures/Certificates/Ai%20For%20Data%20Analysis.png"
  },
  {
    title: "AI for In-App Building",
    issuer: "Google via Coursera",
    date: "2024",
    link: "https://coursera.org/verify/H2W8UECNX8CO",
    image: "/pictures/Certificates/Ai%20For%20In%20App%20Building.png"
  },
  {
    title: "AI for Research & Insights",
    issuer: "Google via Coursera",
    date: "2024",
    link: "https://coursera.org/verify/G8NJ25EQ5478",
    image: "/pictures/Certificates/Ai%20For%20Research%20And%20Insights.png"
  },
  {
    title: "AI for Writing & Communication",
    issuer: "Google via Coursera",
    date: "2024",
    link: "https://coursera.org/verify/DY1E6OSE8UZX",
    image: "/pictures/Certificates/Ai%20For%20Writing%20And%20Communication.png"
  },
  {
    title: "Programming in Python",
    issuer: "IBM via Coursera",
    date: "2024",
    link: "https://coursera.org/verify/LWT0B0SEP33P",
    image: "/pictures/Certificates/Programming%20In%20Python.png"
  }
];

const EXPERIENCE = [
  {
    role: "Software Developer Intern",
    company: "Commercial International Bank (CIB Egypt)",
    period: "June 2025 – July 2025",
    description: [
      "Developed enterprise-grade RESTful API system using C# and .NET 8.",
      "Implemented layered architecture separating Controller, Service, and Repository concerns.",
      "Managed SQL Server database including relational mapping and EF Core migrations.",
      "Built multithreaded automation tool for MSISDN validation."
    ]
  }
];

const NAV_LINKS = [
  { href: '#about',          label: 'About' },
  { href: '#projects',       label: 'Projects' },
  { href: '#certifications', label: 'Certs' },
  { href: '#skills',         label: 'Skills' },
  { href: '#contact',        label: 'Contact' },
];

function ScrollReveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay }}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  const { theme, toggle } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);
  const scale  = useTransform(scrollYProgress, [0, 0.05], [1, 0.95]);

  useEffect(() => {
    const ids = NAV_LINKS.map(l => l.href.slice(1));
    const observers = ids.map(id => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { rootMargin: '-35% 0px -55% 0px', threshold: 0 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach(o => o?.disconnect());
  }, []);

  return (
    <div className="min-h-dvh selection:bg-brand-cream selection:text-brand-ink">
      <IntroAnimation />

      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-brand-cream/50 z-[70] origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      {/* ── Desktop Navigation Rail (lg+) ─────────────────────────── */}
      <nav className="fixed left-0 top-0 h-full w-20 border-r border-brand-cream/5 hidden lg:flex flex-col items-center py-10 z-50 bg-brand-ink/90 backdrop-blur-sm">
        <Logo className="w-9 h-9 mb-10 text-brand-cream" />
        <div className="flex-grow flex flex-col justify-center relative">
          {/* Vertical spine connecting dots */}
          <div className="absolute inset-y-4 left-1/2 -translate-x-1/2 w-px bg-gradient-to-b from-transparent via-brand-cream/12 to-transparent pointer-events-none" />
          {NAV_LINKS.map(({ href, label }, i) => {
            const isActive = activeSection === href.slice(1);
            return (
              <a key={href} href={href} className="relative flex flex-col items-center py-[18px] group">
                {/* Section index */}
                <span className={`font-mono text-[8px] mb-2 transition-all duration-500 select-none ${
                  isActive ? 'text-brand-cream/70' : 'text-brand-cream/14 group-hover:text-brand-cream/40'
                }`}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                {/* Knot on the spine */}
                <div className={`relative z-10 rounded-full border transition-all duration-500 mb-2 ${
                  isActive
                    ? 'w-3 h-3 bg-brand-cream border-brand-cream shadow-[0_0_10px_rgba(245,242,237,0.55)]'
                    : 'w-[7px] h-[7px] bg-transparent border-brand-cream/20 group-hover:border-brand-cream/50 group-hover:bg-brand-cream/10'
                }`} />
                {/* Vertical label */}
                <span className={`vertical-text text-[8px] uppercase tracking-[0.3em] font-bold transition-all duration-500 ${
                  isActive ? 'text-brand-cream' : 'text-brand-cream/22 group-hover:text-brand-cream/60'
                }`}>
                  {label}
                </span>
              </a>
            );
          })}
        </div>
        {/* Theme toggle */}
        <button
          onClick={toggle}
          aria-label="Toggle color theme"
          className="mt-auto mb-1 p-2 text-brand-cream/25 hover:text-brand-cream transition-colors duration-300"
        >
          {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
        </button>
      </nav>

      {/* ── Mobile / Tablet Top Bar (< lg) ────────────────────────── */}
      <header className="fixed top-0 left-0 right-0 h-14 flex items-center justify-between px-5 z-50 bg-brand-ink/95 backdrop-blur-sm border-b border-brand-cream/5 lg:hidden">
        <Logo className="w-8 h-8 text-brand-cream" />

        {/* Tablet: inline horizontal links */}
        <nav className="hidden sm:flex items-center gap-5 md:gap-7">
          {NAV_LINKS.map(({ href, label }) => {
            const isActive = activeSection === href.slice(1);
            return (
              <a key={href} href={href} className={`relative text-[10px] uppercase tracking-[0.3em] font-bold transition-all duration-300 pb-0.5 ${
                isActive ? 'text-brand-cream' : 'text-brand-cream/40 hover:text-brand-cream/70'
              }`}>
                {label}
                {isActive && (
                  <span className="absolute -bottom-0.5 left-0 right-0 h-px bg-brand-cream/60" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Mobile: hamburger + theme toggle */}
        <div className="flex items-center gap-1">
          <button
            onClick={toggle}
            aria-label="Toggle color theme"
            className="text-brand-cream/50 hover:text-brand-cream transition-colors p-1.5"
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="sm:hidden text-brand-cream p-1"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* ── Mobile Full-Screen Menu ────────────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-brand-ink flex flex-col items-center justify-center gap-8 sm:hidden"
          >
            {NAV_LINKS.map(({ href, label }, i) => {
              const isActive = activeSection === href.slice(1);
              return (
                <motion.a
                  key={href}
                  href={href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                  onClick={() => setMenuOpen(false)}
                  className={`text-5xl font-serif italic transition-colors ${
                    isActive ? 'text-brand-cream' : 'text-brand-cream/45 hover:text-brand-cream'
                  }`}
                >
                  {label}
                </motion.a>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Main Content ──────────────────────────────────────────── */}
      {/* pt-14 offsets the fixed top bar on mobile/tablet; lg removes it */}
      <main className="lg:pl-20 pt-14 lg:pt-0">

        {/* Hero */}
        <section id="about" className="min-h-dvh flex flex-col justify-center px-5 sm:px-8 md:px-12 lg:px-32 relative overflow-hidden bg-brand-cream text-brand-ink">
          <motion.div
            style={{ opacity, scale }}
            className="max-w-6xl relative z-10 py-16 md:py-20 lg:py-0"
          >
            <div className="mb-8 md:mb-12 lg:mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="flex items-center gap-4 mb-5 md:mb-8"
              >
                <div className="h-px w-10 md:w-12 bg-brand-ink/20" />
                <span className="text-[9px] md:text-xs uppercase tracking-[0.5em] font-bold text-brand-ink/40">Backend Architect</span>
              </motion.div>

              <h1 className="text-[18vw] sm:text-[15vw] md:text-[13vw] lg:text-[10vw] font-serif leading-[0.8] tracking-tighter mb-8 md:mb-12">
                <motion.span
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="block"
                >
                  Ramy
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1, delay: 0.4 }}
                  className="block italic ml-[0.5em]"
                >
                  Khairy
                </motion.span>
              </h1>
            </div>

            <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-start">
              <div className="md:col-span-7">
                <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif italic leading-tight text-brand-ink/90 mb-8 md:mb-12">
                  Specializing in ASP.NET Core and Clean Architecture to build scalable, high-performance backend systems.
                </p>
                <div className="flex flex-wrap gap-4 md:gap-6">
                  <a
                    href="mailto:ramykhairybuisness@gmail.com"
                    className="group relative px-7 py-4 md:px-10 md:py-5 bg-brand-ink text-brand-cream text-[10px] md:text-xs uppercase tracking-[0.3em] font-bold overflow-hidden"
                  >
                    <span className="relative z-10">Get in touch</span>
                    <motion.div className="absolute inset-0 bg-white/10 -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                  </a>
                  <a
                    href="/Ramy-Khairy-CV.pdf"
                    download="Ramy-Khairy-CV.pdf"
                    className="group relative px-7 py-4 md:px-10 md:py-5 border border-brand-ink/25 text-brand-ink text-[10px] md:text-xs uppercase tracking-[0.3em] font-bold overflow-hidden flex items-center gap-2"
                  >
                    <span className="relative z-10">Download CV</span>
                    <motion.div className="absolute inset-0 bg-brand-ink/8 -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                  </a>
                  <div className="flex gap-5 md:gap-6 items-center">
                    <a href="https://github.com/RamyKhairy24" target="_blank" rel="noreferrer" className="text-brand-ink/40 hover:text-brand-ink transition-colors">
                      <Github size={22} />
                    </a>
                    <a href="https://linkedin.com/in/ramykhairy" target="_blank" rel="noreferrer" className="text-brand-ink/40 hover:text-brand-ink transition-colors">
                      <Linkedin size={22} />
                    </a>
                  </div>
                </div>
              </div>

              <div className="md:col-span-5 hidden md:block">
                <div className="p-8 lg:p-10 border border-brand-ink/5 glass-card-dark">
                  <h5 className="text-[10px] uppercase tracking-[0.3em] font-bold mb-6 text-brand-ink/40">Current Focus</h5>
                  <ul className="space-y-4">
                    {["Microservices Architecture", "High-Concurrency Systems", "Cloud Native Development"].map(item => (
                      <li key={item} className="text-sm font-serif italic flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-ink/20" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="absolute -right-20 top-1/2 -translate-y-1/2 text-[25vw] font-serif italic opacity-[0.02] pointer-events-none select-none whitespace-nowrap">
            Software Engineer
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="py-16 sm:py-20 md:py-24 lg:py-32 px-5 sm:px-8 md:px-12 lg:px-24 bg-brand-ink">
          <div className="max-w-5xl mx-auto">
            <ScrollReveal>
              <div className="mb-12 md:mb-16 lg:mb-24">
                <span className="text-[10px] md:text-xs uppercase tracking-[0.4em] font-bold text-brand-cream/30 mb-3 md:mb-4 block">Portfolio</span>
                <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif italic mb-4 md:mb-8">
                  Selected <br /> Projects
                </h2>
              </div>
            </ScrollReveal>

            <div className="space-y-16 sm:space-y-20 md:space-y-28 lg:space-y-32">
              {PROJECTS.map((project, idx) => (
                <ScrollReveal key={idx} delay={idx * 0.1}>
                  <ProjectCard {...project} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Certifications */}
        <section id="certifications" className="py-16 sm:py-20 md:py-24 lg:py-32 px-5 sm:px-8 md:px-12 lg:px-24 border-t border-brand-cream/5 bg-brand-ink">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal>
              <div className="flex flex-col md:flex-row justify-between items-end mb-10 md:mb-14 lg:mb-20 gap-6 md:gap-8">
                <div>
                  <span className="text-[10px] md:text-xs uppercase tracking-[0.4em] font-bold text-brand-cream/30 mb-3 md:mb-4 block">Recognition</span>
                  <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif italic">Certifications</h2>
                </div>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-10 lg:gap-12">
              {CERTIFICATIONS.map((cert, idx) => (
                <ScrollReveal key={idx} delay={idx * 0.1}>
                  <CertificationCard {...cert} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Skills */}
        <section id="skills" className="py-16 sm:py-20 md:py-24 lg:py-32 px-5 sm:px-8 md:px-12 lg:px-32 bg-brand-ink text-brand-cream">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal>
              <div className="flex flex-col md:flex-row justify-between items-end mb-12 md:mb-16 lg:mb-24 gap-6 md:gap-8">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-brand-cream/40 mb-3 md:mb-4 block">Expertise</span>
                  <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif italic">Technical Stack</h2>
                </div>
                <div className="text-right hidden md:block">
                  <span className="font-mono text-[10px] text-brand-cream/30 uppercase tracking-widest">System Architecture & Design</span>
                </div>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-brand-cream/10 border border-brand-cream/10">
              {Object.entries(SKILLS).map(([category, items], idx) => (
                <ScrollReveal key={category} delay={idx * 0.1}>
                  <div className="p-6 sm:p-8 lg:p-12 bg-brand-ink group hover:bg-brand-cream/5 transition-colors duration-500 h-full">
                    <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold mb-6 lg:mb-10 text-brand-cream/40 flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-cream/20" />
                      {category}
                    </h3>
                    <ul className="space-y-3 md:space-y-4">
                      {items.map((skill) => (
                        <li key={skill} className="font-serif text-lg md:text-xl italic flex justify-between items-center group/item">
                          <span className="group-hover/item:translate-x-2 transition-transform duration-300">{skill}</span>
                          <div className="h-px flex-grow mx-4 bg-brand-cream/5 scale-x-0 group-hover/item:scale-x-100 transition-transform origin-left duration-500" />
                        </li>
                      ))}
                    </ul>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Experience & Education */}
        <section className="py-16 sm:py-20 md:py-24 lg:py-32 px-5 sm:px-8 md:px-12 lg:px-32 border-t border-brand-cream/5 bg-brand-ink">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 md:gap-20 lg:gap-32">

            {/* Experience */}
            <div>
              <ScrollReveal>
                <div className="mb-10 md:mb-14 lg:mb-16">
                  <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-brand-cream/30 mb-3 md:mb-4 block">Journey</span>
                  <h3 className="text-3xl sm:text-4xl md:text-5xl font-serif italic">Experience</h3>
                </div>
              </ScrollReveal>
              <div className="space-y-12 md:space-y-14 lg:space-y-16">
                {EXPERIENCE.map((exp, idx) => (
                  <ScrollReveal key={idx} delay={idx * 0.1}>
                    <div className="relative pl-10 md:pl-12 border-l border-brand-cream/10">
                      <div className="absolute -left-[5px] top-0 w-2 h-2 rounded-full bg-brand-cream" />
                      <span className="text-[10px] uppercase tracking-widest text-brand-cream/40 mb-3 md:mb-4 block">{exp.period}</span>
                      <h4 className="text-2xl md:text-3xl font-serif mb-2">{exp.role}</h4>
                      <p className="text-xs md:text-sm font-bold uppercase tracking-widest mb-6 md:mb-8 text-brand-cream/60">{exp.company}</p>
                      <ul className="space-y-3 md:space-y-4">
                        {exp.description.map((item, i) => (
                          <li key={i} className="text-sm md:text-base text-brand-cream/70 flex gap-3 md:gap-4 leading-relaxed">
                            <ChevronRight size={15} className="mt-1.5 flex-shrink-0 text-brand-cream/30" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>

            {/* Education */}
            <div>
              <ScrollReveal>
                <div className="mb-10 md:mb-14 lg:mb-16">
                  <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-brand-cream/30 mb-3 md:mb-4 block">Foundation</span>
                  <h3 className="text-3xl sm:text-4xl md:text-5xl font-serif italic">Education</h3>
                </div>
              </ScrollReveal>
              <div className="space-y-6 md:space-y-8 lg:space-y-12">
                <ScrollReveal delay={0.1}>
                  <div className="p-6 sm:p-8 lg:p-12 border border-brand-cream/5 bg-brand-cream/5 backdrop-blur-sm group hover:bg-brand-cream/10 transition-colors duration-500">
                    <span className="text-[10px] uppercase tracking-widest text-brand-cream/40 mb-3 md:mb-4 block">2023 – Expected 2027</span>
                    <h4 className="text-2xl md:text-3xl font-serif mb-2">Bachelor of Computer Science</h4>
                    <p className="text-xs md:text-sm font-bold uppercase tracking-widest text-brand-cream/60">Arab Academy for Science & Technology</p>
                  </div>
                </ScrollReveal>
                <ScrollReveal delay={0.2}>
                  <div className="p-6 sm:p-8 lg:p-12 border border-brand-cream/5 bg-brand-cream/5 group hover:bg-brand-cream/10 transition-colors duration-500">
                    <span className="text-[10px] uppercase tracking-widest text-brand-cream/40 mb-3 md:mb-4 block">GPA: 3.8</span>
                    <h4 className="text-2xl md:text-3xl font-serif mb-2">American Diploma</h4>
                    <p className="text-xs md:text-sm font-bold uppercase tracking-widest text-brand-cream/60">Taymour English School</p>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </section>

        {/* Footer / Contact */}
        <footer id="contact" className="py-14 sm:py-16 md:py-20 lg:py-24 px-5 sm:px-8 md:px-12 lg:px-24 bg-brand-ink text-brand-cream">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 md:gap-16 lg:gap-24 items-center">
              <div>
                <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-serif italic mb-6 md:mb-8 leading-none">
                  Let&apos;s build <br /> something <br /> scalable.
                </h2>
                <a
                  href="mailto:ramykhairybuisness@gmail.com"
                  className="text-base sm:text-lg font-mono text-brand-cream hover:text-brand-cream/70 transition-colors block mb-6 underline underline-offset-4 break-all"
                >
                  ramykhairybuisness@gmail.com
                </a>
                <div className="flex flex-wrap gap-3 mb-10 md:mb-12">
                  <a
                    href="https://github.com/RamyKhairy24"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    className="w-11 h-11 rounded-full border border-brand-cream/30 flex items-center justify-center hover:bg-white hover:border-white hover:text-black transition-colors"
                  >
                    <Github size={18} />
                  </a>
                  <a
                    href="https://linkedin.com/in/ramykhairy"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="w-11 h-11 rounded-full border border-brand-cream/30 flex items-center justify-center hover:bg-[#0A66C2] hover:border-[#0A66C2] hover:text-white transition-colors"
                  >
                    <Linkedin size={18} />
                  </a>
                  <a
                    href="https://wa.me/201515817530"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="WhatsApp"
                    className="w-11 h-11 rounded-full border border-brand-cream/30 flex items-center justify-center hover:bg-[#25D366] hover:border-[#25D366] hover:text-white transition-colors"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                  </a>
                </div>
                <ContactForm />
              </div>

              <div className="flex flex-col gap-8 md:gap-12">
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <h5 className="text-[10px] uppercase tracking-widest text-brand-cream/40 mb-4">Social</h5>
                    <div className="flex flex-col gap-2">
                      <a href="https://linkedin.com/in/ramykhairy" className="hover:underline underline-offset-4">LinkedIn</a>
                      <a href="https://github.com/RamyKhairy24" className="hover:underline underline-offset-4">GitHub</a>
                    </div>
                  </div>
                  <div>
                    <h5 className="text-[10px] uppercase tracking-widest text-brand-cream/40 mb-4">Location</h5>
                    <p>Alexandria,<br />Egypt</p>
                  </div>
                </div>

                <div className="pt-8 md:pt-12 border-t border-brand-cream/10 flex justify-between items-end">
                  <div className="serif text-3xl md:text-4xl font-bold">RK</div>
                  <p className="text-[10px] uppercase tracking-widest text-brand-cream/30 text-right">
                    © 2026 Ramy Khairy.<br className="sm:hidden" /> All rights reserved.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </footer>

        {/* Floating WhatsApp Button */}
        <motion.a
          href="https://wa.me/201515817530"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-brand-ink border border-brand-cream/20 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:bg-brand-cream group"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.5, type: 'spring', stiffness: 260, damping: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-brand-cream group-hover:text-brand-ink transition-colors">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
        </motion.a>

      </main>
    </div>
  );
}
