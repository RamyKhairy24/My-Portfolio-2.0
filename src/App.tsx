import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Phone, 
  ChevronRight, 
  Code2, 
  Database, 
  Terminal, 
  Cpu, 
  Globe,
  Award,
  BookOpen
} from 'lucide-react';
import { ProjectCard, CertificationCard } from './components/ProjectCard';
import { Logo } from './components/Logo';

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
    previewVideo: "https://cdn.discordapp.com/attachments/1113524675435905104/1345738870120874055/GamesHub_-_Google_Chrome_2025-03-01_14-41-47.mp4?ex=67c59f0b&is=67c44d8b&hm=80295133604f85e33d368686121f0088863618686121f0088863618686121f0088863618686121f008"
  },
  {
    title: "IdentityFlow Validator",
    description: "High-performance C# automation engine designed to analyze authentication recovery workflows across external identity providers with heuristic state-detection.",
    tags: ["C#", ".NET", "HtmlAgilityPack", "Automation", "Resilient Networking"],
    link: "https://github.com/RamyKhairy24/IdentityFlow-Validator",
    github: "https://github.com/RamyKhairy24/IdentityFlow-Validator",
    previewImage: "https://picsum.photos/seed/identityflow/1200/800"
  },
  {
    title: "Excel Automation Engine",
    description: "Multithreaded C# engine capable of processing 2 million user records in ~50 seconds using parallel concurrency and thread-safe data structures.",
    tags: ["C#", "Multithreading", "EPPlus", "ClosedXML", "Performance"],
    link: "https://github.com/RamyKhairy24/Multithreading-excel-sheet-program",
    github: "https://github.com/RamyKhairy24/Multithreading-excel-sheet-program",
    previewImage: "https://picsum.photos/seed/excelauto/1200/800"
  }
];

const CERTIFICATIONS = [
  {
    title: "Generative AI: Prompt Engineering",
    issuer: "IBM via Coursera",
    date: "2024",
    link: "https://coursera.org/verify/..."
  },
  {
    title: "Back-End Development",
    issuer: "Meta via Coursera",
    date: "2024",
    link: "https://coursera.org/verify/..."
  },
  {
    title: "IELTS Academic (6.5)",
    issuer: "British Council",
    date: "2023",
    link: "#"
  },
  {
    title: "CIB Internship Certificate",
    issuer: "Commercial International Bank",
    date: "2025",
    link: "#"
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

function ScrollReveal({ children, delay = 0 }: { children: React.ReactNode, delay?: number, key?: React.Key }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay }}
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.05], [1, 0.95]);

  return (
    <div className="min-h-screen selection:bg-brand-cream selection:text-brand-ink">
      {/* Navigation Rail */}
      <nav className="fixed left-0 top-0 h-full w-20 border-r border-brand-cream/5 hidden lg:flex flex-col items-center py-12 z-50 bg-brand-ink/80 backdrop-blur-sm">
        <Logo className="w-10 h-10 mb-16 text-brand-cream" />
        <div className="flex-grow flex flex-col gap-10 justify-center">
          <a href="#about" className="vertical-text text-[10px] uppercase tracking-[0.4em] font-bold hover:text-brand-cream/40 transition-colors">About</a>
          <a href="#projects" className="vertical-text text-[10px] uppercase tracking-[0.4em] font-bold hover:text-brand-cream/40 transition-colors">Projects</a>
          <a href="#certifications" className="vertical-text text-[10px] uppercase tracking-[0.4em] font-bold hover:text-brand-cream/40 transition-colors">Certs</a>
          <a href="#skills" className="vertical-text text-[10px] uppercase tracking-[0.4em] font-bold hover:text-brand-cream/40 transition-colors">Skills</a>
          <a href="#contact" className="vertical-text text-[10px] uppercase tracking-[0.4em] font-bold hover:text-brand-cream/40 transition-colors">Contact</a>
        </div>
      </nav>

      <main className="lg:pl-20">
        {/* Hero Section */}
        <section id="about" className="min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-32 relative overflow-hidden bg-brand-cream text-brand-ink">
          <motion.div 
            style={{ opacity, scale }}
            className="max-w-6xl relative z-10"
          >
            <div className="mb-16">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="flex items-center gap-4 mb-8"
              >
                <div className="h-px w-12 bg-brand-ink/20" />
                <span className="text-xs uppercase tracking-[0.5em] font-bold text-brand-ink/40">Backend Architect</span>
              </motion.div>
              
              <h1 className="text-[12vw] lg:text-[10vw] font-serif leading-[0.8] tracking-tighter mb-12">
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
            
            <div className="grid md:grid-cols-12 gap-12 items-start">
              <div className="md:col-span-7">
                <p className="text-2xl md:text-4xl font-serif italic leading-tight text-brand-ink/90 mb-12">
                  Specializing in ASP.NET Core and Clean Architecture to build scalable, high-performance backend systems.
                </p>
                <div className="flex flex-wrap gap-6">
                  <a href="mailto:ramykhairybuisness@gmail.com" className="group relative px-10 py-5 bg-brand-ink text-brand-cream text-xs uppercase tracking-[0.3em] font-bold overflow-hidden">
                    <span className="relative z-10">Get in touch</span>
                    <motion.div 
                      className="absolute inset-0 bg-white/10 -translate-x-full group-hover:translate-x-0 transition-transform duration-500"
                    />
                  </a>
                  <div className="flex gap-6 items-center">
                    <a href="https://github.com/RamyKhairy24" target="_blank" rel="noreferrer" className="text-brand-ink/40 hover:text-brand-ink transition-colors">
                      <Github size={24} />
                    </a>
                    <a href="https://linkedin.com/in/ramykhairy" target="_blank" rel="noreferrer" className="text-brand-ink/40 hover:text-brand-ink transition-colors">
                      <Linkedin size={24} />
                    </a>
                  </div>
                </div>
              </div>
              <div className="md:col-span-5 hidden md:block">
                <div className="p-10 border border-brand-ink/5 glass-card-dark">
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

          {/* Background Text */}
          <div className="absolute -right-20 top-1/2 -translate-y-1/2 text-[25vw] font-serif italic opacity-[0.02] pointer-events-none select-none whitespace-nowrap">
            Software Engineer
          </div>
        </section>

        {/* Projects Grid */}
        <section id="projects" className="py-32 px-6 md:px-12 lg:px-24 bg-brand-ink">
          <div className="max-w-5xl mx-auto">
            <ScrollReveal>
              <div className="mb-24">
                <span className="text-xs uppercase tracking-[0.4em] font-bold text-brand-cream/30 mb-4 block">Portfolio</span>
                <h2 className="text-6xl md:text-8xl font-serif italic mb-8">Selected <br /> Projects</h2>
              </div>
            </ScrollReveal>

            <div className="space-y-32">
              {PROJECTS.map((project, idx) => (
                <ScrollReveal key={idx} delay={idx * 0.1}>
                  <ProjectCard {...project} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Certifications Section */}
        <section id="certifications" className="py-32 px-6 md:px-12 lg:px-24 border-t border-brand-cream/5 bg-brand-ink">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal>
              <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                <div>
                  <span className="text-xs uppercase tracking-[0.4em] font-bold text-brand-cream/30 mb-4 block">Recognition</span>
                  <h2 className="text-5xl md:text-7xl font-serif italic">Certifications</h2>
                </div>
              </div>
            </ScrollReveal>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
              {CERTIFICATIONS.map((cert, idx) => (
                <ScrollReveal key={idx} delay={idx * 0.1}>
                  <CertificationCard {...cert} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-32 px-6 md:px-12 lg:px-32 bg-brand-ink text-brand-cream">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal>
              <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-brand-cream/40 mb-4 block">Expertise</span>
                  <h2 className="text-6xl md:text-8xl font-serif italic">Technical Stack</h2>
                </div>
                <div className="text-right hidden md:block">
                  <span className="font-mono text-[10px] text-brand-cream/30 uppercase tracking-widest">System Architecture & Design</span>
                </div>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-brand-cream/10 border border-brand-cream/10">
              {Object.entries(SKILLS).map(([category, items], idx) => (
                <ScrollReveal key={category} delay={idx * 0.1}>
                  <div className="p-12 bg-brand-ink group hover:bg-brand-cream/5 transition-colors duration-500 h-full">
                    <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold mb-10 text-brand-cream/40 flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-cream/20" />
                      {category}
                    </h3>
                    <ul className="space-y-4">
                      {items.map((skill) => (
                        <li key={skill} className="font-serif text-xl italic flex justify-between items-center group/item">
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

        {/* Experience & Education Split */}
        <section className="py-32 px-6 md:px-12 lg:px-32 border-t border-brand-cream/5 bg-brand-ink">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-32">
            {/* Experience */}
            <div>
              <ScrollReveal>
                <div className="mb-16">
                  <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-brand-cream/30 mb-4 block">Journey</span>
                  <h3 className="text-4xl md:text-5xl font-serif italic">Experience</h3>
                </div>
              </ScrollReveal>
              <div className="space-y-16">
                {EXPERIENCE.map((exp, idx) => (
                  <ScrollReveal key={idx} delay={idx * 0.1}>
                    <div className="relative pl-12 border-l border-brand-cream/10">
                      <div className="absolute -left-[5px] top-0 w-2 h-2 rounded-full bg-brand-cream" />
                      <span className="text-[10px] uppercase tracking-widest text-brand-cream/40 mb-4 block">{exp.period}</span>
                      <h4 className="text-3xl font-serif mb-2">{exp.role}</h4>
                      <p className="text-sm font-bold uppercase tracking-widest mb-8 text-brand-cream/60">{exp.company}</p>
                      <ul className="space-y-4">
                        {exp.description.map((item, i) => (
                          <li key={i} className="text-base text-brand-cream/70 flex gap-4 leading-relaxed">
                            <ChevronRight size={16} className="mt-1.5 flex-shrink-0 text-brand-cream/30" />
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
                <div className="mb-16">
                  <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-brand-cream/30 mb-4 block">Foundation</span>
                  <h3 className="text-4xl md:text-5xl font-serif italic">Education</h3>
                </div>
              </ScrollReveal>
              <div className="space-y-12">
                <ScrollReveal delay={0.1}>
                  <div className="p-12 border border-brand-cream/5 bg-brand-cream/5 backdrop-blur-sm group hover:bg-brand-cream/10 transition-colors duration-500">
                    <span className="text-[10px] uppercase tracking-widest text-brand-cream/40 mb-4 block">2023 – Expected 2027</span>
                    <h4 className="text-3xl font-serif mb-2">Bachelor of Computer Science</h4>
                    <p className="text-sm font-bold uppercase tracking-widest text-brand-cream/60">Arab Academy for Science & Technology</p>
                  </div>
                </ScrollReveal>
                <ScrollReveal delay={0.2}>
                  <div className="p-12 border border-brand-cream/5 bg-brand-cream/5 group hover:bg-brand-cream/10 transition-colors duration-500">
                    <span className="text-[10px] uppercase tracking-widest text-brand-cream/40 mb-4 block">GPA: 3.8</span>
                    <h4 className="text-3xl font-serif mb-2">American Diploma</h4>
                    <p className="text-sm font-bold uppercase tracking-widest text-brand-cream/60">Taymour English School</p>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </section>

        {/* Footer / Contact */}
        <footer id="contact" className="py-24 px-6 md:px-12 lg:px-24 bg-brand-ink text-brand-cream">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-24 items-center">
              <div>
                <h2 className="text-6xl md:text-8xl font-serif italic mb-12 leading-none">Let's build <br /> something <br /> scalable.</h2>
                <div className="flex flex-col gap-6">
                  <a href="mailto:ramykhairybuisness@gmail.com" className="text-2xl md:text-4xl font-serif hover:italic transition-all">
                    ramykhairybuisness@gmail.com
                  </a>
                  <a href="tel:+201515817530" className="text-xl md:text-2xl font-serif text-brand-cream/60">
                    +20 1515817530
                  </a>
                </div>
              </div>
              
              <div className="flex flex-col gap-12">
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
                
                <div className="pt-12 border-t border-brand-cream/10 flex justify-between items-end">
                  <div className="serif text-4xl font-bold">RK</div>
                  <p className="text-[10px] uppercase tracking-widest text-brand-cream/30">
                    © 2026 Ramy Khairy. All rights reserved.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

function SkillGroup({ title, items, icon }: { title: string, items: string[], icon: React.ReactNode }) {
  return (
    <div className="group">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-brand-cream/40 group-hover:text-brand-cream transition-colors">{icon}</span>
        <h5 className="text-xs uppercase tracking-[0.2em] font-bold">{title}</h5>
      </div>
      <div className="flex flex-wrap gap-2">
        {items.map(item => (
          <span key={item} className="px-3 py-1.5 bg-brand-ink border border-brand-cream/5 text-xs text-brand-cream/80 hover:border-brand-cream/20 transition-colors">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
