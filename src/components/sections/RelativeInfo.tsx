import { motion } from "framer-motion";
import { UsersRound } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { marathiContent } from "../../data/marathiContent";

export default function RelativeInfo() {
  const { t, isMarathi } = useLanguage();
  const items = isMarathi ? marathiContent.family.relativeItems : t.relativeInfo.items;

  return (
    <section id="relative-info" className="section-padding relative overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <motion.header
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <span className="text-amber-400 text-sm tracking-widest uppercase font-medium">
            {t.relativeInfo.badge}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-2">
            {t.relativeInfo.title}{" "}
            <span className="text-gradient-gold">{t.relativeInfo.titleAccent}</span>
          </h2>
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mt-4" />
          <p className="text-gray-400 text-base md:text-lg leading-8 max-w-2xl mx-auto mt-5">
            {t.relativeInfo.description}
          </p>
        </motion.header>

        <ul className="space-y-3 md:space-y-4">
          {items.map((item, index) => (
            <motion.li
              key={item}
              initial={{ opacity: 0, x: -18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ margin: "-40px" }}
              transition={{ duration: 0.45, delay: index * 0.05 }}
              className="glass rounded-2xl px-5 py-4 md:px-6 md:py-5 flex items-start gap-4"
            >
              <span
                className="mt-0.5 w-9 h-9 shrink-0 rounded-full flex items-center justify-center"
                style={{
                  background: "rgba(245,158,11,0.1)",
                  border: "1px solid rgba(245,158,11,0.2)",
                }}
                aria-hidden="true"
              >
                <UsersRound size={16} className="text-amber-400" />
              </span>
              <span className="text-gray-200 leading-7 text-sm md:text-base">
                {item}
              </span>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
