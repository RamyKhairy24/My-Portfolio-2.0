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

export const PortalTransition = ({
  isActivating,
  onComplete,
}: {
  isActivating: boolean;
  onComplete: () => void;
}) => {
  const [active, setActive]   = useState(false);
  const [dots, setDots]       = useState<Dot[]>([]);
  const [streaks, setStreaks] = useState<Streak[]>([]);

  useEffect(() => {
    if (isActivating) {
      // 55 stars scattered across the screen — all fly toward center
      setDots(
        Array.from({ length: 55 }).map((_, i) => ({
          id: i,
          x:     Math.random() * 100,
          y:     Math.random() * 100,
          size:  Math.random() * 3 + 1,
          delay: Math.random() * 0.35,
          dur:   0.28 + Math.random() * 0.2,
        }))
      );

      // 56 radial streaks — fire outward as the stars collapse to center
      setStreaks(
        Array.from({ length: 56 }).map((_, i) => ({
          id: i,
          angle: (360 / 56) * i + (Math.random() - 0.5) * 3,
          len:   Math.random() * 160 + 60,
          width: Math.random() * 1.5 + 0.5,
          delay: 0.32 + Math.random() * 0.22,
        }))
      );

      setActive(true);

      // Fire navigation at 950 ms — black cover is fully opaque,
      // new page loads in the background while user sees clean black
      const navTimer = setTimeout(() => onComplete(), 950);
      return () => clearTimeout(navTimer);
    } else {
      setActive(false);
    }
  }, [isActivating, onComplete]);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          className="starfield"
          style={{ background: 'transparent' }}
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
        >
          {/* Vignette — darkness closes in from the edges in sync with star suck-in */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            style={{
              position: 'absolute', inset: 0,
              background:
                'radial-gradient(ellipse 55% 55% at 50% 50%, transparent 10%, rgba(0,0,0,0.98) 100%)',
            }}
          />

          {/* Stars — suck into the portal at center */}
          {dots.map((d) => (
            <motion.div
              key={d.id}
              className="star"
              style={{ width: d.size, height: d.size }}
              initial={{ left: `${d.x}%`, top: `${d.y}%`, opacity: 0.9, scale: 1 }}
              animate={{ left: '50%', top: '50%', opacity: 0, scale: 0 }}
              transition={{ duration: d.dur, delay: d.delay, ease: [0.4, 0, 1, 1] }}
            />
          ))}

          {/* Portal ring — blooms at the vanishing point as stars arrive */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1.9, 1.2, 0], opacity: [0, 0.92, 0.78, 0] }}
            transition={{ duration: 0.88, delay: 0.26, times: [0, 0.24, 0.7, 1] }}
            style={{
              position: 'absolute',
              left: '50%', top: '50%',
              width: 90, height: 90,
              marginLeft: -45, marginTop: -45,
              borderRadius: '50%',
              border: `2px solid ${C}0.9)`,
              boxShadow: `0 0 30px ${C}0.5), inset 0 0 24px ${C}0.22)`,
            }}
          />

          {/* Speed streaks — radiate outward as you get pulled through */}
          {streaks.map((s) => (
            <motion.div
              key={s.id}
              style={{
                position: 'absolute',
                left: '50%', top: '50%',
                width: s.len, height: s.width,
                marginTop: -s.width / 2,
                background: `linear-gradient(to right, transparent, ${C}0.65) 20%, ${C}0.95) 50%, ${C}0.65) 80%, transparent)`,
                transformOrigin: 'left center',
              }}
              initial={{ rotate: s.angle, scaleX: 0, opacity: 0 }}
              animate={{ scaleX: [0, 1, 0], opacity: [0, 1, 0] }}
              transition={{
                duration: 0.62,
                delay: s.delay,
                ease: [0.2, 0, 0.88, 1],
                times: [0, 0.45, 1],
              }}
            />
          ))}

          {/* Flash — the cinematic jump moment at ~550 ms */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.9, 0] }}
            transition={{
              duration: 0.38,
              delay: 0.52,
              ease: [0.4, 0, 0.6, 1],
              times: [0, 0.35, 1],
            }}
            style={{ position: 'absolute', inset: 0, background: '#f5f2ed' }}
          />

          {/* Black loading screen — fades in at 700 ms, navigation fires at 950 ms */}
          {/* The new page loads in the background while this is visible */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2, delay: 0.7 }}
            style={{ position: 'absolute', inset: 0, background: '#0a0a0a' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

