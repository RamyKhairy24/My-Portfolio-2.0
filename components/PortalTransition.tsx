'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

// Brand cream — warmer and less harsh than pure white
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

export const PortalTransition = ({
  isActivating,
  onComplete,
}: {
  isActivating: boolean;
  onComplete: () => void;
}) => {
  const [active, setActive]       = useState(false);
  const [streaks, setStreaks]     = useState<Streak[]>([]);
  const [rings, setRings]         = useState<Ring[]>([]);

  useEffect(() => {
    if (isActivating) {
      // 64 radial speed streaks — evenly distributed + slight jitter
      setStreaks(
        Array.from({ length: 64 }).map((_, i) => ({
          id: i,
          angle: (360 / 64) * i + (Math.random() - 0.5) * 4,
          len:   Math.random() * 180 + 60,    // 60–240 px
          width: Math.random() * 1.5  + 0.5,  // 0.5–2 px
          delay: 0.25 + Math.random() * 0.45, // stagger: 0.25–0.7 s
          dur:   0.5  + Math.random() * 0.4,  // each: 0.5–0.9 s
        }))
      );

      // 4 concentric portal rings — cascade outward
      setRings([
        { id: 0, size: 60,  delay: 0.12 },
        { id: 1, size: 130, delay: 0.20 },
        { id: 2, size: 220, delay: 0.28 },
        { id: 3, size: 340, delay: 0.36 },
      ]);

      setActive(true);
      const timer = setTimeout(() => onComplete(), 2500);
      return () => clearTimeout(timer);
    } else {
      setActive(false);
    }
  }, [isActivating, onComplete]);

  return (
    <AnimatePresence>
      {active && (
        // Transparent background — we build darkness via the vignette div
        // so the portal feels like it forms inside the scene, not hard-cutting to black
        <motion.div
          className="starfield"
          style={{ background: 'transparent' }}
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
        >
          {/* Vignette — darkness draws inward from the screen edges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            style={{
              position: 'absolute', inset: 0,
              background:
                'radial-gradient(ellipse 62% 62% at 50% 50%, transparent 15%, rgba(0,0,0,0.97) 100%)',
            }}
          />

          {/* Central glow — the portal forming at the vanishing point */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1.7, 1.1], opacity: [0, 0.7, 0.22] }}
            transition={{ duration: 0.8, delay: 0.05, ease: [0.2, 0, 0.6, 1] }}
            style={{
              position: 'absolute',
              left: '50%', top: '50%',
              width: 200, height: 200,
              marginLeft: -100, marginTop: -100,
              borderRadius: '50%',
              background: `radial-gradient(circle, ${C}0.5) 0%, ${C}0.08) 55%, transparent 72%)`,
              filter: 'blur(14px)',
            }}
          />

          {/* Speed streaks — the hyperspace jump */}
          {streaks.map((s) => (
            <motion.div
              key={s.id}
              style={{
                position: 'absolute',
                left: '50%', top: '50%',
                width: s.len, height: s.width,
                marginTop: -s.width / 2,
                // Motion-blur taper: transparent at both ends, bright in the middle
                background: `linear-gradient(to right, transparent, ${C}0.7) 18%, ${C}0.95) 50%, ${C}0.7) 82%, transparent)`,
                transformOrigin: 'left center',
              }}
              initial={{ rotate: s.angle, scaleX: 0, opacity: 0 }}
              animate={{ scaleX: [0, 1, 0.04], opacity: [0, 1, 0] }}
              transition={{
                duration: s.dur,
                delay: s.delay,
                // Aggressive punch-out easing — the stars streak away fast then vanish
                ease: [0.16, 0, 0.84, 1],
                times: [0, 0.52, 1],
              }}
            />
          ))}

          {/* Concentric portal rings — emanate outward and fade */}
          {rings.map((r) => (
            <motion.div
              key={r.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1.4, 2.9], opacity: [0, 0.88, 0] }}
              transition={{
                duration: 1.1,
                delay: r.delay,
                ease: [0.2, 0, 0.9, 1],
                times: [0, 0.28, 1],
              }}
              style={{
                position: 'absolute',
                left: '50%', top: '50%',
                width: r.size, height: r.size,
                marginLeft: -r.size / 2, marginTop: -r.size / 2,
                borderRadius: '50%',
                border: `${r.id < 2 ? 2 : 1}px solid ${C}${(0.88 - r.id * 0.13).toFixed(2)})`,
                boxShadow:
                  r.id === 0
                    ? `0 0 28px ${C}0.5), inset 0 0 20px ${C}0.18)`
                    : `0 0 ${10 - r.id * 2}px ${C}0.18)`,
              }}
            />
          ))}

          {/* Peak flash — the cinematic "jump" moment */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0, 0.88, 0] }}
            transition={{
              duration: 0.52,
              delay: 0.95,
              ease: [0.4, 0, 0.6, 1],
              times: [0, 0.12, 0.46, 1],
            }}
            style={{ position: 'absolute', inset: 0, background: '#f5f2ed' }}
          />

          {/* Loading screen — persists until the new page is ready */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.45, delay: 1.45 }}
            style={{ position: 'absolute', inset: 0, background: '#0a0a0a' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
