import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../../context/LanguageContext";

const sectionIds = [
  "hero",
  "gallery",
  "personal",
  "familytree",
  "relative-info",
  "education",
  "career",
  "contact",
] as const;

export default function Navigation() {
  const { t } = useLanguage();
  const sections = [
    { id: "hero", label: t.nav.home },
    { id: "gallery", label: t.nav.gallery },
    { id: "personal", label: t.nav.about },
    { id: "familytree", label: t.nav.family },
    { id: "relative-info", label: t.nav.relative },
    { id: "education", label: t.nav.education },
    { id: "career", label: t.nav.career },
    { id: "contact", label: t.nav.contact },
  ];
  const [active, setActive] = useState("hero");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { threshold: 0.3 },
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "py-3" : "py-5"
        }`}
      >
        <div
          className={`mx-auto max-w-7xl px-6 rounded-2xl transition-all duration-500 ${
            scrolled ? "glass shadow-2xl shadow-black/30" : ""
          }`}
        >
          <div className="flex items-center justify-between py-2">
            <button
              onClick={() => scrollTo("hero")}
              className="font-['Playfair_Display'] text-xl font-semibold text-white hover:text-amber-400 transition-colors"
            >
              <span className="text-gradient-gold">CS</span>
            </button>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-1">
              {sections.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                    active === id
                      ? "text-amber-400"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {active === id && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-lg bg-white/5"
                    />
                  )}
                  <span className="relative z-10">{label}</span>
                </button>
              ))}
            </div>

            {/* Mobile hamburger */}
            <button
              className="md:hidden flex flex-col gap-1.5 p-2"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span
                className={`block w-6 h-0.5 bg-white transition-transform ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
              />
              <span
                className={`block w-6 h-0.5 bg-white transition-opacity ${menuOpen ? "opacity-0" : ""}`}
              />
              <span
                className={`block w-6 h-0.5 bg-white transition-transform ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
              />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-16 z-40 glass mx-4 rounded-2xl p-4 shadow-2xl md:hidden"
          >
            {sections.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className={`block w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  active === id
                    ? "text-amber-400 bg-white/5"
                    : "text-gray-300 hover:text-white hover:bg-white/5"
                }`}
              >
                {label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Section dots (right side) */}
      <div className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col gap-3">
        {sections.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            title={label}
            className="group flex items-center gap-2"
          >
            <span className="opacity-0 group-hover:opacity-100 text-xs text-white glass px-2 py-1 rounded transition-opacity whitespace-nowrap">
              {label}
            </span>
            <span
              className={`block rounded-full transition-all duration-300 ${
                active === id
                  ? "w-3 h-3 bg-amber-400"
                  : "w-2 h-2 bg-white/30 hover:bg-white/60"
              }`}
            />
          </button>
        ))}
      </div>
    </>
  );
}
