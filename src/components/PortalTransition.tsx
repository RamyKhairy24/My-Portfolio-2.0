import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
}

export const PortalTransition = ({ isActivating, onComplete }: { isActivating: boolean, onComplete: () => void }) => {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    if (isActivating) {
      const newStars = Array.from({ length: 100 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 1,
        duration: Math.random() * 0.5 + 0.5,
      }));
      setStars(newStars);

      const timer = setTimeout(() => {
        onComplete();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isActivating, onComplete]);

  return (
    <AnimatePresence>
      {isActivating && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="starfield"
        >
          {stars.map((star) => (
            <motion.div
              key={star.id}
              className="star"
              initial={{ 
                left: `${star.x}%`, 
                top: `${star.y}%`, 
                scale: 0,
                boxShadow: "0 0 0px white"
              }}
              animate={{ 
                left: `${(star.x - 50) * 10 + 50}%`, 
                top: `${(star.y - 50) * 10 + 50}%`, 
                scale: 5,
                boxShadow: "0 0 20px white"
              }}
              transition={{ 
                duration: star.duration, 
                ease: "easeIn",
                repeat: Infinity
              }}
              style={{
                width: star.size,
                height: star.size,
              }}
            />
          ))}
          <motion.div 
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 20, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeIn" }}
            className="absolute inset-0 bg-brand-cream rounded-full m-auto w-10 h-10"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
