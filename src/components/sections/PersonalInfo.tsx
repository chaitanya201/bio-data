import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Calendar,
  Ruler,
  Droplets,
} from "lucide-react";
import { personalInfo } from "../../data/siteContent";
import { useLanguage } from "../../context/LanguageContext";
import { marathiContent } from "../../data/marathiContent";

const storyAccents = ["#3B82F6", "#F59E0B", "#EC4899", "#10B981"];

// ─── Sub-components ────────────────────────────────────────────────────────────

function FactChip({
  label,
  value,
  sub,
  delay,
}: {
  label: string;
  value: string;
  sub: string;
  delay: number;
}) {
  const [tapped, setTapped] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.93 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ margin: "-30px" }}
      transition={{ duration: 0.4, delay }}
      whileTap={{ scale: 0.96 }}
      onTap={() => {
        setTapped(true);
        setTimeout(() => setTapped(false), 600);
      }}
      className="rounded-2x cursor-pointer select-none transition-all duration-300"
      style={{
        background: "rgba(255,255,255,0.04)",
        border: tapped
          ? "1px solid rgba(245,158,11,0.7)"
          : "1px solid rgba(255,255,255,0.08)",
        boxShadow: tapped ? "0 0 18px rgba(245,158,11,0.25)" : "none",
        padding: "15px",
      }}
    >
      <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">
        {label}
      </p>
      <p
        className="text-white font-bold text-lg leading-tight"
        style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
      >
        {value}
      </p>
      <p className="text-gray-400 text-xs mt-0.5">{sub}</p>
    </motion.div>
  );
}

function StoryCardSlider() {
  const { t } = useLanguage();
  const storyCards = t.personal.story.map((s, i) => ({
    ...s,
    accent: storyAccents[i],
  }));
  const [active, setActive] = useState(0);
  const startX = useRef(0);

  const prev = () => setActive((a) => Math.max(0, a - 1));
  const next = () => setActive((a) => Math.min(storyCards.length - 1, a + 1));

  const onTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const dx = startX.current - e.changedTouches[0].clientX;
    if (dx > 40) next();
    else if (dx < -40) prev();
  };

  return (
    <div className="relative">
      {/* Mobile: swipeable single card */}
      <div
        className="md:hidden overflow-hidden"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.35 }}
            className="rounded-2xl p-6"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: `1px solid ${storyCards[active].accent}30`,
              borderTop: `3px solid ${storyCards[active].accent}`,
              padding: "10px",
            }}
          >
            <div className="text-4xl mb-3">{storyCards[active].emoji}</div>
            <h4
              className="text-white font-bold text-xl mb-2"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              {storyCards[active].title}
            </h4>
            <p className="text-gray-300 leading-relaxed text-sm">
              {storyCards[active].body}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Swipe dots + arrows */}
        <div className="flex items-center justify-between mt-4 px-1">
          <button
            onClick={prev}
            disabled={active === 0}
            className="w-8 h-8 rounded-full glass flex items-center justify-center text-gray-400 disabled:opacity-30 hover:text-white transition-colors"
          >
            ‹
          </button>
          <div className="flex gap-2">
            {storyCards.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === active ? 20 : 8,
                  height: 8,
                  background:
                    i === active
                      ? storyCards[i].accent
                      : "rgba(255,255,255,0.2)",
                }}
              />
            ))}
          </div>
          <button
            onClick={next}
            disabled={active === storyCards.length - 1}
            className="w-8 h-8 rounded-full glass flex items-center justify-center text-gray-400 disabled:opacity-30 hover:text-white transition-colors"
          >
            ›
          </button>
        </div>
      </div>

      {/* Desktop: 2×2 grid */}
      <div className="hidden md:grid grid-cols-1 lg:grid-cols-2 gap-5 max-w-5xl mx-auto">
        {storyCards.map((card, i) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ margin: "-40px" }}
            transition={{ duration: 0.45, delay: i * 0.1 }}
            whileHover={{ y: -3 }}
            className="rounded-2xl p-6 cursor-default"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: `1px solid ${card.accent}25`,
              borderTop: `3px solid ${card.accent}`,
            }}
          >
            <div className="text-3xl mb-3">{card.emoji}</div>
            <h4
              className="text-white font-bold text-lg mb-2"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              {card.title}
            </h4>
            <p className="text-gray-300 text-[15px] leading-7">{card.body}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default function PersonalInfo() {
  const { t, isMarathi } = useLanguage();
  const profile = isMarathi ? marathiContent.profile : personalInfo;
  const quickFacts = [
    {
      label: t.personal.facts.height,
      value: profile.height,
      sub: isMarathi ? "१८५.४ सेमी" : "185.4 cm",
    },
    {
      label: t.personal.facts.blood,
      value: personalInfo.bloodGroup,
      sub: t.personal.facts.bloodSub,
    },
    {
      label: t.personal.facts.religion,
      value: `${profile.religion} / ${profile.caste}`,
      sub: "",
    },
    {
      label: t.personal.facts.native,
      value: profile.nativePlace.split(",")[0],
      sub: t.personal.facts.nativeSub,
    },
    {
      label: t.personal.facts.current,
      value: profile.currentCity.split(",")[0],
      sub: t.personal.facts.currentSub,
    },
    {
      label: t.personal.facts.rashi,
      value: profile.rashi,
      // sub: t.personal.facts.rashiSub,
    },
  ];
  return (
    <section id="personal" className="section-padding relative overflow-hidden">
      <div className="space-y-10">
        {/* ── Part 1: Hero Profile Card ───────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative rounded-3xl overflow-hidden animate-float"
          style={{
            background:
              "linear-gradient(135deg, rgba(245,158,11,0.1) 0%, rgba(37,99,235,0.08) 100%)",
            border: "1px solid rgba(245,158,11,0.25)",
            boxShadow:
              "0 0 40px rgba(245,158,11,0.1), 0 20px 60px rgba(0,0,0,0.4)",
            padding: "20px",
          }}
        >
          {/* Glow orb */}
          <div
            className="absolute -top-16 -right-16 w-48 h-48 rounded-full opacity-20 blur-3xl pointer-events-none"
            style={{
              background: "radial-gradient(circle, #F59E0B, transparent)",
            }}
          />

          <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-6">
            {/* Photo */}
            <div className="">
              <div
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-amber-400/40"
                style={{ boxShadow: "0 0 20px rgba(245,158,11,0.3)" }}
              >
                <img
                  src={personalInfo.photo}
                  alt={profile.fullName}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Identity */}
            <div className="flex-1 text-center sm:text-left">
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                // viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="text-2xl sm:text-3xl font-bold text-white"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                {profile.fullName}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                // viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="text-amber-400 font-medium mt-1 text-sm"
              >
                {t.personal.profession}
              </motion.p>

              {/* Quick identity row */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                // viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.35 }}
                className="flex flex-wrap gap-x-4 gap-y-1 mt-3 justify-center sm:justify-start"
              >
                {[
                  { icon: MapPin, text: profile.currentCity },
                  {
                    icon: Calendar,
                    text: `${profile.dateOfBirth} · ${isMarathi ? `${new Intl.NumberFormat("mr-IN").format(personalInfo.age)} वर्षे` : `${personalInfo.age} yrs`}`,
                  },
                  { icon: Ruler, text: profile.height },
                  { icon: Droplets, text: profile.bloodGroup },
                ].map(({ icon: Icon, text }) => (
                  <span
                    key={text}
                    className="flex items-center gap-1 text-gray-300 text-xs"
                  >
                    <Icon size={11} className="text-amber-400 flex-shrink-0" />
                    {text}
                  </span>
                ))}
              </motion.div>

              {/* Caste / Religion chips */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                // viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.45 }}
                className="flex flex-wrap gap-2 mt-3 justify-center sm:justify-start"
              >
                {[
                  profile.religion,
                  profile.caste,
                ].map((v) => (
                  <span
                    key={v}
                    className="px-3 py-1 rounded-full text-xs font-medium"
                    style={{
                      background: "rgba(245,158,11,0.12)",
                      color: "#FCD34D",
                      border: "1px solid rgba(245,158,11,0.2)",
                    }}
                  >
                    {v}
                  </span>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* ── Part 2: Quick Facts Grid ────────────────────────────────── */}
        <div className="grid grid-cols-1 gap-6">
          <motion.p
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            // viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-amber-400 text-lg uppercase tracking-widest font-semibold"
          >
            {t.personal.quickFacts}
          </motion.p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {quickFacts.map((f, i) => (
              <FactChip
                key={f.label}
                label={f.label}
                value={f.value}
                sub={f.sub}
                delay={i * 0.06}
              />
            ))}
          </div>
        </div>

        {/* ── Part 3: About Me Story Cards ───────────────────────────── */}
        <div>
          <motion.p
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            // viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-amber-400 text-lg uppercase tracking-widest font-semibold"
            style={{ padding: "20px" }}
          >
            {t.personal.aboutMe}
          </motion.p>
          <StoryCardSlider />
        </div>

        {/* ── Part 4: Interest Pills ──────────────────────────────────── */}
        <div className="flex flex-col gap-6 md: flex-none">
          <motion.p
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            // viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-amber-400 text-lg uppercase tracking-widest font-semibold mb-4"
            style={{ marginTop: "20px" }}
          >
            {t.personal.interests}
          </motion.p>
          <div className="flex flex-wrap gap-2">
            {t.personal.interestPills.map((interest, i) => (
              <motion.span
                key={interest}
                initial={{ opacity: 0, scale: 0.7 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ margin: "-20px" }}
                transition={{ duration: 0.3, delay: i * 0.06 }}
                whileHover={{
                  scale: 1.08,
                  boxShadow: "0 0 14px rgba(245,158,11,0.35)",
                }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 rounded-full text-sm font-medium cursor-default select-none"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "#e5e7eb",
                  padding: "10px",
                }}
              >
                {interest}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
