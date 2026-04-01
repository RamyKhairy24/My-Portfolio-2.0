'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function IntroAnimation() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!sessionStorage.getItem('rk-intro')) {
      setShow(true);
      document.body.style.overflow = 'hidden';
      const t = setTimeout(() => {
        setShow(false);
        document.body.style.overflow = '';
        sessionStorage.setItem('rk-intro', '1');
      }, 2900);
      return () => clearTimeout(t);
    }
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="intro"
          exit={{ opacity: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.1 } }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-[#0a0a0a] pointer-events-none select-none"
        >
          <div className="flex flex-col items-center">
            {/* R & K stagger in from opposite sides */}
            <div className="flex leading-none mb-7">
              <motion.span
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="font-serif italic text-[#f5f2ed] tracking-tighter"
                style={{ fontSize: 'clamp(80px, 18vw, 140px)' }}
              >
                R
              </motion.span>
              <motion.span
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
                className="font-serif italic text-[#f5f2ed] tracking-tighter"
                style={{ fontSize: 'clamp(80px, 18vw, 140px)' }}
              >
                K
              </motion.span>
            </div>

            {/* Separator */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.55, delay: 0.75, ease: 'easeOut' }}
              className="w-14 h-px bg-[#f5f2ed]/20 mb-5 origin-left"
            />

            {/* Name */}
            <motion.p
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.0 }}
              className="text-[10px] uppercase tracking-[0.5em] text-[#f5f2ed]/35 font-sans"
            >
              Ramy&nbsp;Khairy
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
