'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const C = 'rgba(245,242,237,';

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
  width: number;
  delay: number;
}

/**
 * Plays a brief "emerge from portal" animation whenever the user navigates
 * back to the portfolio after having left via a portal link.
 */
export function PortalReturn() {
  const [active, setActive]   = useState(false);
  const [dots, setDots]       = useState<Dot[]>([]);
  const [streaks, setStreaks] = useState<Streak[]>([]);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    const play = () => {
      if (!sessionStorage.getItem('portal-return')) return;
      sessionStorage.removeItem('portal-return');

      // Stars burst outward from center — you're being ejected from the portal
      setDots(
        Array.from({ length: 55 }).map((_, i) => ({
          id: i,
          x:     Math.random() * 100,
          y:     Math.random() * 100,
          size:  Math.random() * 3 + 1,
          delay: 0.28 + Math.random() * 0.3,
          dur:   0.28 + Math.random() * 0.2,
        }))
      );

      // Residual warp streaks — fading as you decelerate
      setStreaks(
        Array.from({ length: 48 }).map((_, i) => ({
          id: i,
          angle: (360 / 48) * i + (Math.random() - 0.5) * 3,
          len:   Math.random() * 120 + 40,
          width: Math.random() * 1.5 + 0.5,
          delay: 0.04 + Math.random() * 0.2,
        }))
      );

      setActive(true);
      timer = setTimeout(() => setActive(false), 1300);
    };

    play();

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
          style={{ background: 'transparent' }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.4, ease: 'easeInOut' } }}
        >
          {/* Black base fades out, revealing the portfolio */}
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.55, delay: 0.5, ease: 'easeInOut' }}
            style={{ position: 'absolute', inset: 0, background: '#0a0a0a' }}
          />

          {/* Arrival flash — you burst through */}
          <motion.div
            initial={{ opacity: 0.78 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 1, 1] }}
            style={{ position: 'absolute', inset: 0, background: '#f5f2ed' }}
          />

          {/* Portal ring — collapses as the portal closes behind you */}
          <motion.div
            initial={{ scale: 1.6, opacity: 0.85 }}
            animate={{ scale: 0.1, opacity: 0 }}
            transition={{ duration: 0.65, delay: 0.04, ease: [0.5, 0, 0.9, 1] }}
            style={{
              position: 'absolute',
              left: '50%', top: '50%',
              width: 90, height: 90,
              marginLeft: -45, marginTop: -45,
              borderRadius: '50%',
              border: `2px solid ${C}0.9)`,
              boxShadow: `0 0 30px ${C}0.45), inset 0 0 22px ${C}0.2)`,
            }}
          />

          {/* Residual streaks dispersing outward */}
          {streaks.map((s) => (
            <motion.div
              key={s.id}
              style={{
                position: 'absolute',
                left: '50%', top: '50%',
                width: s.len, height: s.width,
                marginTop: -s.width / 2,
                background: `linear-gradient(to right, transparent, ${C}0.65) 20%, ${C}0.9) 50%, ${C}0.65) 80%, transparent)`,
                transformOrigin: 'left center',
              }}
              initial={{ rotate: s.angle, scaleX: 0, opacity: 0 }}
              animate={{ scaleX: [0, 1, 0], opacity: [0, 0.85, 0] }}
              transition={{
                duration: 0.55,
                delay: s.delay,
                ease: [0.1, 0, 0.9, 1],
                times: [0, 0.4, 1],
              }}
            />
          ))}

          {/* Stars scatter outward from center */}
          {dots.map((d) => (
            <motion.div
              key={d.id}
              className="star"
              style={{ width: d.size, height: d.size }}
              initial={{ left: '50%', top: '50%', opacity: 0, scale: 0 }}
              animate={{
                left:    `${d.x}%`,
                top:     `${d.y}%`,
                opacity: [0, 0.9, 0],
                scale:   [0, 1.6, 0],
              }}
              transition={{ duration: d.dur, delay: d.delay, ease: [0, 0.55, 1, 1] }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

