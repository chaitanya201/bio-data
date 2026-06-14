import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../../context/LanguageContext";

export default function WelcomeSplash({ onDone }: { onDone: () => void }) {
  const { setLang, t } = useLanguage();
  const isFirstVisit = !localStorage.getItem("biodata-lang");

  // phase 0 = lang picker (first visit only), phase 1 = text in, phase 2 = fade out
  const [phase, setPhase] = useState(isFirstVisit ? 0 : 1);

  useEffect(() => {
    if (phase === 0) return; // wait for user to pick language
    const t1 = setTimeout(() => setPhase(2), 2200);
    const t2 = setTimeout(() => onDone(), 3200);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [phase, onDone]);

  function pickLang(lang: "en" | "mr") {
    setLang(lang);
    setPhase(1);
  }

  return (
    <AnimatePresence>
      {phase < 2 && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#0B1120]"
        >
          {/* Decorative rings */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: "backOut" }}
            className="w-32 h-32 rounded-full border-2 border-amber-400/40 absolute animate-spin-slow"
          />
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "backOut" }}
            className="w-48 h-48 rounded-full border border-blue-600/20 absolute animate-spin-slow"
            style={{ animationDuration: "30s", animationDirection: "reverse" }}
          />

          {/* Language picker — only on first visit */}
          {phase === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="flex flex-col items-center gap-6 relative z-10"
            >
              <p className="text-amber-400 text-lg tracking-[0.3em] uppercase font-medium">
                {t.splash.selectLang}
              </p>
              <p className="text-gray-400 text-sm">{t.splash.selectPrompt}</p>
              <div className="flex gap-4 mt-2">
                <button
                  onClick={() => pickLang("en")}
                  className="px-8 py-3 rounded-full border border-amber-400/50 text-amber-400 font-semibold hover:bg-amber-400/10 transition-colors duration-200"
                >
                  🇬🇧 {t.splash.btnEnglish}
                </button>
                <button
                  onClick={() => pickLang("mr")}
                  className="px-8 py-3 rounded-full border border-orange-400/50 text-orange-400 font-semibold hover:bg-orange-400/10 transition-colors duration-200"
                  style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
                >
                  🇮🇳 {t.splash.btnMarathi}
                </button>
              </div>
            </motion.div>
          )}

          {/* Main splash text — shown after language picked */}
          {phase >= 1 && (
            <>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="text-amber-400 text-sm tracking-[0.3em] uppercase mb-4 font-medium"
              >
                {t.splash.welcome}
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.15 }}
                className="text-4xl md:text-6xl font-bold text-white text-center"
              >
                {t.splash.title}
              </motion.h1>

              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="mt-6 h-px w-48 bg-gradient-to-r from-transparent via-amber-400 to-transparent"
              />

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="mt-4 text-gray-400 text-sm"
              >
                {t.splash.subtitle}
              </motion.p>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
