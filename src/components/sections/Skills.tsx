import { motion } from "framer-motion";
import { skillsData } from "../../data/biodata";
import { useLanguage } from "../../context/LanguageContext";

function SkillBar({
  name,
  level,
  color,
  delay,
}: {
  name: string;
  level: number;
  color: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ margin: "-40px" }}
      transition={{ duration: 0.5, delay }}
      className="mb-4"
    >
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm text-gray-300 font-medium">{name}</span>
        <span className="text-xs text-gray-400">{level}%</span>
      </div>
      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${color}, ${color}88)` }}
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ margin: "-40px" }}
          transition={{ duration: 1, delay: delay + 0.2, ease: "easeOut" }}
        />
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const { t } = useLanguage();
  return (
    <section id="skills" className="section-padding relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-10 md:mb-16"
        >
          <span className="text-amber-400 text-sm tracking-widest uppercase font-medium">
            {t.skills.badge}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-2">
            {t.skills.title}{" "}
            <span className="text-gradient-gold">{t.skills.titleAccent}</span>
          </h2>
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mt-4" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillsData.map((category, ci) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ margin: "-60px" }}
              transition={{ duration: 0.5, delay: ci * 0.1 }}
              className="glass rounded-3xl p-5 sm:p-8"
            >
              <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: category.color }}
                />
                <h3
                  className="text-lg font-bold text-white"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  {t.skills.categories[
                    category.category as keyof typeof t.skills.categories
                  ] ?? category.category}
                </h3>
              </div>
              {category.skills.map((skill, si) => (
                <SkillBar
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                  color={category.color}
                  delay={ci * 0.1 + si * 0.08}
                />
              ))}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
