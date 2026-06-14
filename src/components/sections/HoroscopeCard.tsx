import { useState } from "react";
import { motion } from "framer-motion";
import { horoscopeData } from "../../data/biodata";
import { Star, Moon, Sun, Shield } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

export default function HoroscopeCard() {
  const { t } = useLanguage();
  const [flipped, setFlipped] = useState(false);
  const frontItems = [
    { icon: Star, label: t.horoscope.rashiLabel, value: horoscopeData.rashi },
    {
      icon: Moon,
      label: t.horoscope.nakshatraLabel,
      value: horoscopeData.nakshatra,
    },
    { icon: Sun, label: t.horoscope.gotraLabel, value: horoscopeData.gotra },
    {
      icon: Shield,
      label: t.horoscope.manglikLabel,
      value: horoscopeData.manglik,
    },
  ];

  return (
    <section
      id="horoscope"
      className="section-padding relative overflow-hidden"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-10 md:mb-16"
        >
          <span className="text-amber-400 text-sm tracking-widest uppercase font-medium">
            {t.horoscope.badge}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-2">
            {t.horoscope.title}{" "}
            <span className="text-gradient-gold">
              {t.horoscope.titleAccent}
            </span>
          </h2>
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mt-4" />
          <p className="text-gray-400 mt-3 text-sm">{t.horoscope.clickHint}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          // viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto cursor-pointer"
          style={{ perspective: "1200px", maxWidth: "560px", height: "340px" }}
          onClick={() => setFlipped(!flipped)}
        >
          <motion.div
            animate={{ rotateY: flipped ? 180 : 0 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            className="relative w-full h-full"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Front */}
            <div
              className="absolute inset-0 rounded-3xl p-4 sm:p-8 flex flex-col justify-between overflow-hidden"
              style={{
                backfaceVisibility: "hidden",
                background:
                  "linear-gradient(135deg, rgba(245,158,11,0.15) 0%, rgba(37,99,235,0.1) 100%)",
                border: "1px solid rgba(245,158,11,0.3)",
                backdropFilter: "blur(12px)",
              }}
            >
              {/* Decorative rings */}
              <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full border border-amber-400/20 animate-spin-slow" />
              <div
                className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full border border-blue-600/20 animate-spin-slow"
                style={{
                  animationDirection: "reverse",
                  animationDuration: "30s",
                }}
              />

              <div>
                <p className="text-amber-400 text-lg tracking-widest uppercase mb-1">
                  {t.horoscope.birthDetails}
                </p>
                <h3
                  className="text-white text-2xl font-bold"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  {horoscopeData.dob}
                </h3>
                <p className="text-gray-400 text-sm">
                  {horoscopeData.tob} · {horoscopeData.pob}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {frontItems.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-center gap-2">
                    <Icon size={14} className="text-amber-400 flex-shrink-0" />
                    <div>
                      <p className="text-gray-500 text-xs">{label}</p>
                      <p className="text-white text-sm font-medium">{value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-center text-gray-500 text-xs">
                {t.horoscope.tapReveal}
              </p>
            </div>

            {/* Back */}
            <div
              className="absolute inset-0 rounded-3xl p-4 sm:p-8 flex flex-col justify-center items-center text-center overflow-hidden"
              style={{
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
                background:
                  "linear-gradient(135deg, rgba(37,99,235,0.15) 0%, rgba(245,158,11,0.1) 100%)",
                border: "1px solid rgba(37,99,235,0.3)",
                backdropFilter: "blur(12px)",
              }}
            >
              <Star className="text-amber-400 mb-4" size={32} />
              <h3
                className="text-white text-xl font-bold mb-3"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                {t.horoscope.backTitle}
              </h3>
              <p className="text-gray-300 leading-relaxed max-w-sm">
                {t.horoscope.summary}
              </p>
              <div className="mt-4 flex gap-2">
                <span className="px-3 py-1 rounded-full text-xs bg-amber-400/20 text-amber-400 border border-amber-400/30">
                  {t.horoscope.rashiChip}
                </span>
                <span className="px-3 py-1 rounded-full text-xs bg-blue-600/20 text-blue-400 border border-blue-600/30">
                  {t.horoscope.manglikChip}
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
