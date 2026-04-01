'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface Dot {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  dur: number;
}

interface Streak {
  id: number;
  angle: number;
  len: number;
  delay: number;
}

/**
 * Plays a brief "emerge from portal" animation whenever the user navigates
 * back to the portfolio after having left via a portal link.
 * Reads & clears a sessionStorage flag set by PortalTransition.
 */
export function PortalReturn() {
  const [active, setActive] = useState(false);
  const [dots, setDots]     = useState<Dot[]>([]);
  const [streaks, setStreaks] = useState<Streak[]>([]);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    const play = () => {
      if (!sessionStorage.getItem('portal-return')) return;
      sessionStorage.removeItem('portal-return');

      // Warp streaks — shoot outward (you're arriving)
      setStreaks(
        Array.from({ length: 52 }).map((_, i) => ({
          id: i,
          angle: (360 / 52) * i + (Math.random() - 0.5) * 4,
          len: Math.random() * 110 + 60,
          delay: 0.05 + Math.random() * 0.2,
        }))
      );

      // Emerge dots — burst from center to edges
      setDots(
        Array.from({ length: 60 }).map((_, i) => ({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 3 + 1,
          delay: 0.3 + Math.random() * 0.35,
          dur: Math.random() * 0.35 + 0.3,
        }))
      );

      setActive(true);
      timer = setTimeout(() => setActive(false), 1400);
    };

    // Normal mount (hard-reload / first visit after portal)
    play();

    // BFCache restore — page is pulled from cache on back button press
    // useEffect does NOT re-run in this case, so we need pageshow
    const handlePageShow = (e: PageTransitionEvent) => {
      if (e.persisted) play();
    };
    window.addEventListener('pageshow', handlePageShow);

    return () => {
      window.removeEventListener('pageshow', handlePageShow);
      clearTimeout(timer);
    };
  }, []);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          className="starfield"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.45 } }}
        >
          {/* Dark cover fades out as we emerge */}
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.55 }}
            style={{ position: 'absolute', inset: 0, background: '#0a0a0a' }}
          />

          {/* Portal ring at center */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 2, 1.2, 0], opacity: [0, 1, 0.8, 0] }}
            transition={{ duration: 1.1, delay: 0.05, times: [0, 0.2, 0.7, 1] }}
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              width: 80,
              height: 80,
              marginLeft: -40,
              marginTop: -40,
              borderRadius: '50%',
              border: '2px solid rgba(255,255,255,0.85)',
              boxShadow:
                '0 0 28px rgba(255,255,255,0.45), inset 0 0 22px rgba(255,255,255,0.2)',
            }}
          />

          {/* Warp streaks from center outward */}
          {streaks.map((s) => (
            <motion.div
              key={`r${s.id}`}
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                width: s.len,
                height: 1.5,
                marginTop: -0.75,
                background:
                  'linear-gradient(to right, rgba(255,255,255,0.04), rgba(255,255,255,0.88))',
                transformOrigin: 'left center',
              }}
              initial={{ rotate: s.angle, scaleX: 0, opacity: 0 }}
              animate={{ scaleX: [0, 1, 0], opacity: [0, 1, 0] }}
              transition={{ duration: 0.7, delay: s.delay, ease: 'easeOut', times: [0, 0.4, 1] }}
            />
          ))}

          {/* Emerge dots — burst outward from center */}
          {dots.map((d) => (
            <motion.div
              key={`d${d.id}`}
              className="star"
              style={{ width: d.size, height: d.size }}
              initial={{ left: '50%', top: '50%', opacity: 0, scale: 0 }}
              animate={{
                left: `${d.x}%`,
                top: `${d.y}%`,
                opacity: [0, 1, 0],
                scale: [0, 1.8, 0],
              }}
              transition={{ duration: d.dur, delay: d.delay, ease: [0, 0.6, 1, 1] }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
