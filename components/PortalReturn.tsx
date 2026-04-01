'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const C = 'rgba(245,242,237,';

interface Streak {
  id: number;
  angle: number;
  len: number;
  width: number;
  delay: number;
  dur: number;
}

interface Ring {
  id: number;
  size: number;
  delay: number;
}

/**
 * Plays a brief "emerge from portal" animation whenever the user navigates
 * back to the portfolio after having left via a portal link.
 * Reads & clears a sessionStorage flag set by PortalTransition.
 */
export function PortalReturn() {
  const [active, setActive]       = useState(false);
  const [streaks, setStreaks]     = useState<Streak[]>([]);
  const [rings, setRings]         = useState<Ring[]>([]);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    const play = () => {
      if (!sessionStorage.getItem('portal-return')) return;
      sessionStorage.removeItem('portal-return');

      // 52 radial speed streaks — shorter/faster than departure (decelerating)
      setStreaks(
        Array.from({ length: 52 }).map((_, i) => ({
          id: i,
          angle: (360 / 52) * i + (Math.random() - 0.5) * 4,
          len:   Math.random() * 130 + 50,
          width: Math.random() * 1.5  + 0.5,
          delay: 0.05 + Math.random() * 0.25,
          dur:   0.4  + Math.random() * 0.3,
        }))
      );

      // 3 portal rings dispersing on arrival
      setRings([
        { id: 0, size: 80,  delay: 0.0  },
        { id: 1, size: 180, delay: 0.08 },
        { id: 2, size: 300, delay: 0.16 },
      ]);

      setActive(true);
      timer = setTimeout(() => setActive(false), 1500);
    };

    // Normal mount (hard-load / first visit after portal)
    play();

    // BFCache restore — browser Back button pulls page from cache without
    // remounting React, so useEffect never re-runs; pageshow handles it
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
        // Transparent container so we control exactly what the user sees
        <motion.div
          className="starfield"
          style={{ background: 'transparent' }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.45, ease: 'easeInOut' } }}
        >
          {/* Black base — fades away to reveal the portfolio underneath */}
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.65, delay: 0.55, ease: 'easeInOut' }}
            style={{ position: 'absolute', inset: 0, background: '#0a0a0a' }}
          />

          {/* Arrival flash — brief burst of light as you emerge */}
          <motion.div
            initial={{ opacity: 0.72 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 1, 1] }}
            style={{ position: 'absolute', inset: 0, background: '#f5f2ed' }}
          />

          {/* Central arrival glow — collapses as the portal closes */}
          <motion.div
            initial={{ scale: 1.6, opacity: 0.55 }}
            animate={{ scale: 0.15, opacity: 0 }}
            transition={{ duration: 0.72, delay: 0.04, ease: [0.5, 0, 0.85, 1] }}
            style={{
              position: 'absolute',
              left: '50%', top: '50%',
              width: 160, height: 160,
              marginLeft: -80, marginTop: -80,
              borderRadius: '50%',
              background: `radial-gradient(circle, ${C}0.6) 0%, ${C}0.1) 55%, transparent 75%)`,
              filter: 'blur(10px)',
            }}
          />

          {/* Speed streaks — residual warp field dispersing */}
          {streaks.map((s) => (
            <motion.div
              key={s.id}
              style={{
                position: 'absolute',
                left: '50%', top: '50%',
                width: s.len, height: s.width,
                marginTop: -s.width / 2,
                background: `linear-gradient(to right, transparent, ${C}0.7) 18%, ${C}0.95) 50%, ${C}0.7) 82%, transparent)`,
                transformOrigin: 'left center',
              }}
              initial={{ rotate: s.angle, scaleX: 0, opacity: 0 }}
              animate={{ scaleX: [0, 1, 0], opacity: [0, 0.85, 0] }}
              transition={{
                duration: s.dur,
                delay: s.delay,
                ease: [0.1, 0, 0.9, 1],
                times: [0, 0.42, 1],
              }}
            />
          ))}

          {/* Portal rings — expand outward as the portal dissipates */}
          {rings.map((r) => (
            <motion.div
              key={r.id}
              initial={{ scale: 0.15, opacity: 0 }}
              animate={{ scale: [0.15, 1.5, 2.8], opacity: [0.82, 0.55, 0] }}
              transition={{
                duration: 0.9,
                delay: r.delay,
                ease: [0.2, 0, 0.9, 1],
                times: [0, 0.32, 1],
              }}
              style={{
                position: 'absolute',
                left: '50%', top: '50%',
                width: r.size, height: r.size,
                marginLeft: -r.size / 2, marginTop: -r.size / 2,
                borderRadius: '50%',
                border: `${r.id === 0 ? 2 : 1}px solid ${C}${(0.85 - r.id * 0.2).toFixed(2)})`,
                boxShadow:
                  r.id === 0
                    ? `0 0 24px ${C}0.45), inset 0 0 18px ${C}0.18)`
                    : undefined,
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
