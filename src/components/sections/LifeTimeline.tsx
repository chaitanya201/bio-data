import { motion } from "framer-motion";
import { useLanguage } from "../../context/LanguageContext";
import { marathiContent } from "../../data/marathiContent";

export default function LifeTimeline() {
  const { t, isMarathi } = useLanguage();
  const events = isMarathi ? marathiContent.timeline : t.timeline.events;
  return (
    <section id="timeline" className="section-padding relative overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-amber-400 text-sm tracking-widest uppercase font-medium">
            {t.timeline.badge}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-2">
            {t.timeline.title}{" "}
            <span className="text-gradient-gold">{t.timeline.titleAccent}</span>
          </h2>
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mt-4" />
        </motion.div>

        <div className="relative">
          {/* Vertical line: left-aligned on mobile, centered on md+ */}
          <div className="absolute left-5 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-blue-600/50 to-transparent" />

          <div className="flex flex-col gap-y-5 md:gap-y-8">
            {events.map((event, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className={`relative flex items-center gap-4 flex-row ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Card — full-width on mobile with left padding, half-width on md */}
                <div className="flex-1 pl-10 md:pl-0">
                  <div
                    className={`glass rounded-2xl p-4 sm:p-5 hover:border-amber-400/30 transition-all duration-300 md:max-w-sm ${
                      i % 2 === 0 ? "md:ml-auto md:mr-8" : "md:mr-auto md:ml-8"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">{event.icon}</span>
                      <span className="text-amber-400 text-sm font-bold">
                        {event.year}
                      </span>
                    </div>
                    <h3
                      className="text-white font-bold"
                      style={{
                        fontFamily: "'Playfair Display', Georgia, serif",
                      }}
                    >
                      {event.title}
                    </h3>
                    <p className="text-gray-300 text-[15px] mt-2 leading-7">
                      {event.description}
                    </p>
                  </div>
                </div>

                {/* Node — left-aligned on mobile, centered on md */}
                <div className="absolute left-5 md:left-1/2 -translate-x-1/2 z-10">
                  <motion.div
                    whileInView={{ scale: [0, 1.4, 1] }}
                    // viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="w-4 h-4 rounded-full bg-amber-400 border-4 border-[#0B1120] shadow-lg shadow-amber-400/40"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
