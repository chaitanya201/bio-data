import { motion } from "framer-motion";
import { educationData } from "../../data/siteContent";
import { useLanguage } from "../../context/LanguageContext";
import { marathiContent } from "../../data/marathiContent";

export default function EducationJourney() {
  const { t, isMarathi } = useLanguage();
  const items = isMarathi ? marathiContent.education : educationData;
  return (
    <section
      id="education"
      className="section-padding relative overflow-hidden"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-10 md:mb-16"
        >
          <span className="text-amber-400 text-sm tracking-widest uppercase font-medium">
            {t.education.badge}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-2">
            {t.education.title}{" "}
            <span className="text-gradient-gold">
              {t.education.titleAccent}
            </span>
          </h2>
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mt-4" />
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-blue-600 to-transparent" />

          <div className="flex flex-col gap-y-6 md:gap-y-10">
            {items.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className={`relative flex items-start gap-6 ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } flex-row`}
              >
                {/* Node */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 top-6 z-10">
                  <motion.div
                    whileInView={{ scale: [0, 1.3, 1] }}
                    // viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="w-5 h-5 rounded-full bg-amber-400 border-4 border-[#0B1120] shadow-lg shadow-amber-400/40"
                  />
                </div>

                {/* Card */}
                <div
                  className={`ml-16 md:ml-0 md:w-[46%] glass rounded-2xl p-6 hover:border-amber-400/30 transition-all duration-300 group ${
                    i % 2 === 0 ? "md:mr-auto" : "md:ml-auto"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-3xl">{item.icon}</span>
                    <div>
                      <span className="text-amber-400 text-lg font-medium tracking-wider uppercase">
                        {item.year}
                      </span>
                      <h3
                        className="text-white font-bold text-lg mt-1"
                        style={{
                          fontFamily: "'Playfair Display', Georgia, serif",
                        }}
                      >
                        {item.institution}
                      </h3>
                      <p className="text-gray-300 mt-2 text-[15px] leading-7">
                        {item.degree}
                      </p>
                      <p className="text-gray-500 text-xs mt-1">
                        {item.location}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
