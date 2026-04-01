'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
}

export const PortalTransition = ({
  isActivating,
  onComplete,
}: {
  isActivating: boolean;
  onComplete: () => void;
}) => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (isActivating) {
      const newParticles = Array.from({ length: 130 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        delay: Math.random() * 0.5,
        duration: Math.random() * 0.4 + 0.5,
      }));
      setParticles(newParticles);

      // Total animation: ~1.9s
      const timer = setTimeout(() => {
        onComplete();
      }, 1900);
      return () => clearTimeout(timer);
    }
  }, [isActivating, onComplete]);

  return (
    <AnimatePresence>
      {isActivating && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.1 }}
          className="starfield"
        >
          {/* ── Phase 1: Particles across the screen get sucked into the center ── */}
          {particles.map((p) => (
            <motion.div
              key={p.id}
              className="star"
              initial={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                opacity: 1,
                scale: 1,
              }}
              animate={{
                left: '50%',
                top: '50%',
                opacity: 0,
                scale: 0,
              }}
              transition={{
                duration: p.duration,
                delay: p.delay,
                ease: [0.4, 0, 1, 1], // hard easeIn — they accelerate as they're pulled in
              }}
              style={{ width: p.size, height: p.size }}
            />
          ))}

          {/* ── Phase 2: Portal ring pulses at the vanishing point ── */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [0, 2.2, 1.4, 0],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 1.5,
              delay: 0.15,
              times: [0, 0.2, 0.7, 1],
              ease: 'easeInOut',
            }}
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              width: 90,
              height: 90,
              marginLeft: -45,
              marginTop: -45,
              borderRadius: '50%',
              border: '1.5px solid rgba(255,255,255,0.85)',
              boxShadow:
                '0 0 25px rgba(255,255,255,0.5), inset 0 0 25px rgba(255,255,255,0.25)',
            }}
          />

          {/* Inner white glow — the portal eye */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [0, 1.2, 0.7],
              opacity: [0, 1, 0.6],
            }}
            transition={{
              duration: 1.3,
              delay: 0.25,
              times: [0, 0.25, 1],
            }}
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              width: 36,
              height: 36,
              marginLeft: -18,
              marginTop: -18,
              borderRadius: '50%',
              background:
                'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 70%)',
            }}
          />

          {/* ── Phase 3: Dark void explodes outward — you came out the other side ── */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 40 }}
            transition={{ duration: 0.55, delay: 1.35, ease: [0.6, 0, 1, 1] }}
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              width: 80,
              height: 80,
              marginLeft: -40,
              marginTop: -40,
              borderRadius: '50%',
              background: '#0a0a0a',
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
