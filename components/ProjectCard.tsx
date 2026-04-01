'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Github, Award } from 'lucide-react';
import { PortalTransition } from './PortalTransition';

interface ProjectProps {
  title: string;
  description: string;
  tags: string[];
  link: string;
  github?: string;
  previewImage?: string;
  previewVideo?: string;
}

export const ProjectCard = ({
  title,
  description,
  tags,
  link,
  github,
  previewImage,
  previewVideo,
}: ProjectProps) => {
  const [isActivating, setIsActivating] = useState(false);
  const [videoError, setVideoError] = useState(false);

  const handlePortalClick = () => {
    setIsActivating(true);
  };

  const handleComplete = () => {
    window.location.href = link;
    // intentionally NOT resetting isActivating — the overlay stays visible
    // as a loading screen until the browser navigates to the new page
  };

  return (
    <>
      <PortalTransition isActivating={isActivating} onComplete={handleComplete} />

      <div className="group flex flex-col mb-20 last:mb-0">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-brand-cream/20" />
            <span className="text-[10px] uppercase tracking-[0.4em] text-brand-cream/40 font-bold">Project</span>
          </div>
          <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-serif italic mb-4 md:mb-6 tracking-tight leading-none">{title}</h3>
          <p className="text-brand-cream/60 max-w-2xl text-base md:text-lg leading-relaxed mb-6 md:mb-8">{description}</p>
          <div className="flex flex-wrap gap-4">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-brand-cream/5 border border-brand-cream/10 text-[10px] uppercase tracking-[0.2em] text-brand-cream/60"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Browser Frame Presentation */}
        <motion.div
          onClick={handlePortalClick}
          whileHover={{ y: -5 }}
          className="relative w-full cursor-pointer group/portal"
        >
          {/* Browser Header */}
          <div className="bg-[#1a1a1a] border border-brand-cream/10 border-b-0 rounded-t-xl px-4 py-3 flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/20" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/20" />
            </div>
            <div className="flex-grow mx-4">
              <div className="bg-brand-ink/50 border border-brand-cream/5 rounded px-3 py-1 text-[9px] text-brand-cream/30 font-mono truncate">
                {link}
              </div>
            </div>
          </div>

          {/* Main Preview Container */}
          <div className="relative aspect-video w-full overflow-hidden border border-brand-cream/10 bg-brand-ink rounded-b-xl shadow-2xl">
            <div className="absolute inset-0 bg-brand-cream/5 group-hover/portal:bg-transparent transition-colors duration-500 z-10" />

            {previewVideo && !videoError ? (
              <video
                src={previewVideo}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover transition-all duration-700"
                onError={() => setVideoError(true)}
              />
            ) : (
              <motion.img
                src={previewImage || `https://picsum.photos/seed/${title}/1200/800`}
                alt={title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-all duration-700"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              />
            )}

            {/* Portal Overlay */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/portal:opacity-100 transition-opacity duration-500 z-20 bg-brand-ink/40 backdrop-blur-[2px]">
              <div className="px-10 py-5 bg-brand-cream text-brand-ink text-[10px] uppercase tracking-[0.4em] font-bold shadow-2xl">
                Explore Portal
              </div>
            </div>

            {/* Links Overlay */}
            <div className="absolute top-6 right-6 flex gap-3 z-30">
              {github && (
                <a
                  href={github}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="p-4 bg-brand-ink/90 backdrop-blur border border-brand-cream/10 hover:bg-brand-cream hover:text-brand-ink transition-all rounded-full"
                >
                  <Github size={20} />
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export const CertificationCard = ({
  title,
  issuer,
  date,
  link,
  image,
}: {
  title: string;
  issuer: string;
  date: string;
  link: string;
  image?: string;
}) => {
  const [isActivating, setIsActivating] = useState(false);

  const handlePortalClick = () => {
    setIsActivating(true);
  };

  const handleComplete = () => {
    window.location.href = link;
    // intentionally NOT resetting isActivating — overlay persists until navigation
  };

  return (
    <>
      <PortalTransition isActivating={isActivating} onComplete={handleComplete} />

      <div className="group flex flex-col">
        {/* Fixed-height header so all images line up regardless of title length */}
        <div className="mb-4 h-20 flex flex-col justify-end">
          <h4 className="text-xl md:text-2xl font-serif italic mb-1 line-clamp-2 leading-snug">{title}</h4>
          <p className="text-xs uppercase tracking-widest text-brand-cream/50 truncate">
            {issuer} — {date}
          </p>
        </div>

        <motion.div
          onClick={handlePortalClick}
          whileHover={{ scale: 0.97 }}
          className="relative aspect-[4/3] w-full overflow-hidden cursor-pointer border border-brand-cream/10 bg-brand-ink group/cert"
        >
          <div className="absolute inset-0 bg-brand-cream/5 group-hover/cert:bg-transparent transition-colors duration-500 z-10" />

          <img
            src={image ?? `https://picsum.photos/seed/${title}/800/600?blur=2`}
            alt={title}
            referrerPolicy={image ? undefined : 'no-referrer'}
            className="w-full h-full object-cover transition-all duration-700 animate-slow-zoom"
          />

          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/cert:opacity-100 transition-opacity duration-500 z-20">
            <Award className="text-brand-cream w-12 h-12" />
          </div>

          <div className="absolute bottom-0 left-0 w-full p-4 bg-brand-ink/90 backdrop-blur border-t border-brand-cream/10 translate-y-full group-hover/cert:translate-y-0 transition-transform duration-500 z-30">
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Verify Credential</span>
          </div>
        </motion.div>
      </div>
    </>
  );
};
