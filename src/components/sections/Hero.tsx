import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { personalInfo } from '../../data/siteContent';
import { useLanguage } from '../../context/LanguageContext';
import { marathiContent } from '../../data/marathiContent';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
};
const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};

export default function Hero() {
  const { t, isMarathi } = useLanguage();
  const profile = isMarathi ? marathiContent.profile : personalInfo;
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Gradient blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10 blur-[100px]"
          style={{ background: 'radial-gradient(circle, #2563EB, transparent)' }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full opacity-8 blur-[120px]"
          style={{ background: 'radial-gradient(circle, #F59E0B, transparent)' }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-16 pt-24 pb-12">
          {/* Text content */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="flex-1 text-center lg:text-left max-w-2xl"
          >
            <motion.div variants={item} className="mb-4">
              <span className="glass px-4 py-2 rounded-full text-amber-400 text-sm font-medium tracking-widest uppercase">
                {t.hero.badge}
              </span>
            </motion.div>

            <motion.h1
              variants={item}
              className="text-5xl md:text-6xl xl:text-7xl font-bold leading-tight mb-4"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              <span className="text-white">{t.hero.greeting} </span>
              <br />
              <span className="text-gradient-hero">{profile.shortName}</span>
            </motion.h1>

            <motion.div variants={item} className="h-px w-24 bg-gradient-to-r from-amber-400 to-transparent mb-6 mx-auto lg:mx-0" />

            <motion.p variants={item} className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
              {t.hero.tagline}
            </motion.p>

            <motion.div variants={item} className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <button
                onClick={() => scrollTo('personal')}
                className="px-8 py-3 rounded-full font-medium text-sm bg-amber-400 text-navy hover:bg-amber-300 transition-all duration-300 shadow-lg shadow-amber-400/25 hover:shadow-amber-400/40 hover:scale-105"
                style={{ color: '#0B1120' }}
              >
                {t.hero.cta1}
              </button>
              <button
                onClick={() => scrollTo('contact')}
                className="px-8 py-3 rounded-full font-medium text-sm glass text-white hover:bg-white/10 transition-all duration-300 hover:scale-105"
              >
                {t.hero.cta2}
              </button>
            </motion.div>

            {/* Quick stats */}
            <motion.div
              variants={item}
              className="flex flex-wrap gap-6 sm:gap-8 mt-8 sm:mt-12 justify-center lg:justify-start"
            >
              {[
                { label: t.hero.labelAge, value: t.hero.statAge },
                { label: t.hero.labelCity, value: t.hero.statCity },
                { label: t.hero.labelCareer, value: t.hero.statCareer },
              ].map(stat => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl font-bold text-amber-400" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                    {stat.value}
                  </div>
                  <div className="text-xs text-gray-400 uppercase tracking-wider mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex-shrink-0"
          >
            <div className="relative animate-float p-14">
              {/* Rotating rings — contained within the padded wrapper */}
              <div
                className="absolute inset-[-24px] rounded-full border border-amber-400/20 animate-spin-slow"
                style={{ animationDuration: '25s' }}
              />
              <div
                className="absolute inset-[-48px] rounded-full border border-blue-600/15 animate-spin-slow"
                style={{ animationDuration: '35s', animationDirection: 'reverse' }}
              />

              {/* Photo frame */}
              <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
                <div className="absolute inset-0 rounded-full glass-gold overflow-hidden border-2 border-amber-400/30 shadow-2xl shadow-amber-400/20">
                  <img
                    src={personalInfo.photo}
                    alt={profile.fullName}
                    className="w-full h-full object-cover"
                  />
                  {/* Glass overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/40 to-transparent" />
                </div>

                {/* Floating badge */}
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                  className="absolute -bottom-4 -right-4 glass-gold rounded-2xl px-4 py-2"
                >
                  <p className="text-xs text-amber-400 font-semibold">
                    {profile.nativePlace.split(",")[0]} → {profile.currentCity.split(",")[0]}
                  </p>
                  <p className="text-[10px] text-gray-300">{profile.currentCity.split(",")[1]?.trim()}</p>
                </motion.div>

                <motion.div
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                  className="absolute -top-4 -left-4 glass rounded-2xl px-4 py-2"
                >
                  <p className="text-xs text-blue-400 font-semibold">{profile.currentRole}</p>
                  <p className="text-[10px] text-gray-300">{profile.currentEmployer}</p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        onClick={() => scrollTo('personal')}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-400 hover:text-white transition-colors animate-float"
      >
        <ChevronDown size={28} />
      </motion.button>
    </section>
  );
}
