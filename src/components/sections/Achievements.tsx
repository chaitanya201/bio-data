import { useState } from "react";
import { motion } from "framer-motion";
import { achievementsData } from "../../data/siteContent";
import { useLanguage } from "../../context/LanguageContext";

function AchievementCard({
  data,
  delay,
}: {
  data: (typeof achievementsData)[0];
  delay: number;
}) {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ margin: "-40px" }}
      transition={{ duration: 0.5, delay }}
      className="cursor-pointer h-48"
      style={{ perspective: "1000px" }}
      onClick={() => setFlipped(!flipped)}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="relative w-full h-full"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 glass rounded-2xl p-6 flex flex-col items-center justify-center"
          style={{
            backfaceVisibility: "hidden",
            borderColor: data.color + "40",
          }}
        >
          <div className="text-5xl mb-3">{data.icon}</div>
          <h3
            className="text-2xl font-bold text-white"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            {data.title}
          </h3>
          <div
            className="mt-2 px-3 py-1 rounded-full text-xs font-medium"
            style={{ backgroundColor: data.color + "20", color: data.color }}
          >
            {data.year}
          </div>
          <p className="text-gray-500 text-xs mt-2">Tap to reveal</p>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 glass rounded-2xl p-6 flex flex-col items-center justify-center text-center"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            borderColor: data.color + "60",
          }}
        >
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center mb-3 text-xl"
            style={{ backgroundColor: data.color + "20" }}
          >
            {data.icon}
          </div>
          <h4 className="text-white font-bold text-sm leading-snug mb-2">
            {data.fullTitle}
          </h4>
          <p className="text-gray-400 text-xs">{data.issuer}</p>
          <p className="text-xs mt-1" style={{ color: data.color }}>
            {data.year}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Achievements() {
  const { t } = useLanguage();
  return (
    <section
      id="achievements"
      className="section-padding relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-10 md:mb-16"
          style={{ marginBottom: "20px" }}
        >
          <span className="text-amber-400 text-sm tracking-widest uppercase font-medium">
            {t.achievements.badge}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-2">
            {t.achievements.title}{" "}
            <span className="text-gradient-gold">
              {t.achievements.titleAccent}
            </span>
          </h2>
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mt-4" />
          <p className="text-gray-400 mt-3 text-sm">{t.achievements.tapHint}</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {achievementsData.map((item, i) => (
            <AchievementCard key={item.title} data={item} delay={i * 0.08} />
          ))}
        </div>
      </div>
    </section>
  );
}
