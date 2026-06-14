import { motion } from "framer-motion";
import { careerData, counters } from "../../data/biodata";
import { useCounterAnimation } from "../../hooks/useCounterAnimation";
import { useLanguage } from "../../context/LanguageContext";

function Counter({
  target,
  suffix,
  label,
}: {
  target: number;
  suffix: string;
  label: string;
}) {
  const { count, ref } = useCounterAnimation(target);
  return (
    <div className="text-center">
      <span
        ref={ref}
        className="text-3xl sm:text-4xl font-bold text-amber-400"
        style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
      >
        {count}
        {suffix}
      </span>
      <p className="text-gray-400 text-xs uppercase tracking-wider mt-1">
        {label}
      </p>
    </div>
  );
}

const typeColors: Record<string, string> = {
  internship: "#F59E0B",
  fulltime: "#3B82F6",
};

export default function CareerJourney() {
  const { t } = useLanguage();
  return (
    <section id="career" className="section-padding relative overflow-hidden">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center"
          style={{ marginBottom: "20px" }}
        >
          <span className="text-amber-400 text-sm tracking-widest uppercase font-medium">
            {t.career.badge}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-2">
            {t.career.title}{" "}
            <span className="text-gradient-gold">{t.career.titleAccent}</span>
          </h2>
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mt-4" />
        </motion.div>

        {/* Counters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          // viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass rounded-3xl p-5 sm:p-8 mb-8 md:mb-12 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
          style={{ marginBottom: "20px" }}
        >
          {counters.map((c, idx) => (
            <Counter
              key={c.label}
              target={c.value}
              suffix={c.suffix}
              label={t.career.counters[idx] ?? c.label}
            />
          ))}
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-blue-600/50 to-transparent" />

          <div className="flex flex-col gap-y-6">
            {careerData.map((item, i) => {
              const job = t.career.jobs[i];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ margin: "-40px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="relative pl-16"
                >
                  {/* Node */}
                  <div className="absolute left-6 top-7 -translate-x-1/2 z-10">
                    <motion.div
                      whileInView={{ scale: [0, 1.2, 1] }}
                      // viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.1 }}
                      className="w-4 h-4 rounded-full border-4 border-[#0B1120]"
                      style={{ backgroundColor: typeColors[item.type] }}
                    />
                  </div>

                  {/* Card */}
                  <div className="glass rounded-2xl p-6 hover:border-white/20 transition-all duration-300 group">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                      <div>
                        <span
                          className="text-xs font-medium px-3 py-1 rounded-full"
                          style={{
                            backgroundColor: typeColors[item.type] + "20",
                            color: typeColors[item.type],
                          }}
                        >
                          {item.type === "internship"
                            ? t.career.typeInternship
                            : t.career.typeFulltime}{" "}
                          · {job?.duration ?? item.duration}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500">{item.year}</span>
                    </div>
                    <h3
                      className="text-white font-bold text-lg"
                      style={{
                        fontFamily: "'Playfair Display', Georgia, serif",
                      }}
                    >
                      {job?.role ?? item.role}
                    </h3>
                    <p className="text-amber-400 font-medium text-sm">
                      {item.company} · {item.location}
                    </p>
                    <p className="text-gray-400 mt-2 text-sm leading-relaxed">
                      {job?.description ?? item.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
