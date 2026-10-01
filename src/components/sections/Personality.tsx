import { motion } from "framer-motion";
import { personalityData } from "../../data/siteContent";
import { useTilt } from "../../hooks/useMousePosition";
import { useLanguage } from "../../context/LanguageContext";

function HobbyCard({
  icon,
  title,
  description,
  delay,
}: {
  icon: string;
  title: string;
  description: string;
  delay: number;
}) {
  const ref = useTilt(10);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ margin: "-40px" }}
      transition={{ duration: 0.5, delay }}
      className="glass rounded-2xl p-4 sm:p-6 cursor-default transition-all duration-300 hover:border-amber-400/30 hover:shadow-lg hover:shadow-amber-400/10"
      style={{
        transformStyle: "preserve-3d",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
      }}
    >
      <div className="text-4xl mb-3">{icon}</div>
      <h4
        className="text-white font-bold text-lg mb-1"
        style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
      >
        {title}
      </h4>
      <p className="text-gray-400 text-sm">{description}</p>
    </motion.div>
  );
}

export default function Personality() {
  const { t } = useLanguage();
  return (
    <section
      id="personality"
      className="section-padding relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-10 md:mb-16"
          style={{ marginBottom: "40px" }}
        >
          <span className="text-amber-400 text-sm tracking-widest uppercase font-medium">
            {t.personality.badge}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-2">
            {t.personality.title}{" "}
            <span className="text-gradient-gold">
              {t.personality.titleAccent}
            </span>
          </h2>
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mt-4" />
        </motion.div>

        {/* Lifestyle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          // viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass rounded-3xl p-5 sm:p-8 mb-6 md:mb-10 text-center max-w-3xl mx-auto"
          style={{ marginBottom: "20px" }}
        >
          <p className="text-gray-300 text-lg leading-relaxed">
            {t.personality.lifestyle}
          </p>
        </motion.div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          // viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap gap-3 justify-center mb-6 md:mb-10"
          style={{ marginBottom: "20px" }}
        >
          {t.personality.values.map((v, i) => (
            <motion.span
              key={v}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              // viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.07 }}
              className="px-5 py-2 rounded-full glass-gold text-amber-300 text-sm font-medium border border-amber-400/20"
            >
              {v}
            </motion.span>
          ))}
        </motion.div>

        {/* Hobbies grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {t.personality.hobbies.map((h, i) => (
            <HobbyCard key={h.title} {...h} delay={i * 0.07} />
          ))}
        </div>
      </div>
    </section>
  );
}
