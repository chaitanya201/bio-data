import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  return (
    <>
      {/* Top bar */}
      <motion.div
        className="fixed top-0 left-0 z-[100] h-[2px] bg-gradient-to-r from-blue-600 via-amber-400 to-blue-600 origin-left"
        style={{ scaleX: progress / 100, transformOrigin: '0 0' }}
      />
      {/* Percentage badge */}
      <div className="fixed bottom-6 right-4 z-40 hidden sm:block">
        <div className="glass rounded-full w-12 h-12 flex items-center justify-center text-xs font-semibold text-amber-400">
          {Math.round(progress)}%
        </div>
      </div>
    </>
  );
}
