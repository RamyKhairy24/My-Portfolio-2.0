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

export const PortalTransition = ({
  isActivating,
  onComplete,
}: {
  isActivating: boolean;
  onComplete: () => void;
}) => {
  const [active, setActive] = useState(false);
  const [suckDots, setSuckDots]     = useState<Dot[]>([]);
  const [streaks, setStreaks]        = useState<Streak[]>([]);
  const [emergeDots, setEmergeDots] = useState<Dot[]>([]);

  useEffect(() => {
    if (isActivating) {
      // Phase 1 – scattered dots fly TO center (sucked in)
      setSuckDots(
        Array.from({ length: 60 }).map((_, i) => ({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 3 + 1,
          delay: Math.random() * 0.45,
          dur: Math.random() * 0.3 + 0.35,
        }))
      );

      // Phase 2 – warp streaks shoot outward from center (the trip)
      setStreaks(
        Array.from({ length: 56 }).map((_, i) => ({
          id: i,
          angle: (360 / 56) * i + (Math.random() - 0.5) * 4,
          len: Math.random() * 110 + 60,
          delay: 0.55 + Math.random() * 0.25,
        }))
      );

      // Phase 3 – dots burst FROM center outward (reverse / emerge)
      setEmergeDots(
        Array.from({ length: 60 }).map((_, i) => ({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 3 + 1,
          delay: 1.65 + Math.random() * 0.3,
          dur: Math.random() * 0.35 + 0.3,
        }))
      );

      setActive(true);

      // Navigate after full animation (2.5s)
      const timer = setTimeout(() => onComplete(), 2500);
      return () => clearTimeout(timer);
    } else {
      setActive(false);
    }
  }, [isActivating, onComplete]);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          className="starfield"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
        >
          {/* ── Phase 1: Suck-in — dots from all over → center ──────── */}
          {suckDots.map((d) => (
            <motion.div
              key={`s${d.id}`}
              className="star"
              style={{ width: d.size, height: d.size }}
              initial={{ left: `${d.x}%`, top: `${d.y}%`, opacity: 1, scale: 1 }}
              animate={{ left: '50%', top: '50%', opacity: 0, scale: 0 }}
              transition={{ duration: d.dur, delay: d.delay, ease: [0.3, 0, 1, 1] }}
            />
          ))}

          {/* ── Phase 2: Warp trip — streaks from center outward ─────── */}
          {streaks.map((s) => (
            <motion.div
              key={`w${s.id}`}
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                width: s.len,
                height: 1.5,
                marginTop: -0.75,
                background:
                  'linear-gradient(to right, rgba(255,255,255,0.04), rgba(255,255,255,0.92))',
                transformOrigin: 'left center',
              }}
              initial={{ rotate: s.angle, scaleX: 0, opacity: 0 }}
              animate={{ scaleX: [0, 1, 0], opacity: [0, 1, 0] }}
              transition={{
                duration: 0.85,
                delay: s.delay,
                ease: 'easeIn',
                times: [0, 0.45, 1],
              }}
            />
          ))}

          {/* Portal ring glowing at the vanishing point */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 2, 1.3, 0], opacity: [0, 1, 0.8, 0] }}
            transition={{ duration: 1.7, delay: 0.45, times: [0, 0.18, 0.75, 1] }}
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

          {/* ── Phase 3: Emerge — dots burst from center outward ─────── */}
          {emergeDots.map((d) => (
            <motion.div
              key={`e${d.id}`}
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

          {/* Final full-screen dark cover — persists as loading screen */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35, delay: 2.1 }}
            style={{ position: 'absolute', inset: 0, background: '#0a0a0a' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
