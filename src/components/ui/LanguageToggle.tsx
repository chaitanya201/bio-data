import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

export default function LanguageToggle() {
  const { lang, toggleLang } = useLanguage();
  const isMarathi = lang === 'mr';

  return (
    <motion.button
      onClick={toggleLang}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      title={isMarathi ? 'Switch to English' : 'मराठीत बदला'}
      className="fixed bottom-6 left-6 z-50 flex items-center gap-1.5 rounded-full border border-amber-400/40 bg-[#0B1120]/80 px-4 py-2 text-sm font-semibold shadow-lg backdrop-blur-md transition-colors duration-300 hover:border-amber-400/70"
      style={{ color: isMarathi ? '#FF6B35' : '#FBBF24' }}
    >
      <span
        className="transition-all duration-300"
        style={{ opacity: isMarathi ? 0.5 : 1, fontFamily: 'inherit' }}
      >
        EN
      </span>
      <span className="opacity-40">|</span>
      <span
        className="transition-all duration-300"
        style={{
          opacity: isMarathi ? 1 : 0.5,
          fontFamily: isMarathi ? "'Noto Sans Devanagari', sans-serif" : 'inherit',
        }}
      >
        मराठी
      </span>
    </motion.button>
  );
}
