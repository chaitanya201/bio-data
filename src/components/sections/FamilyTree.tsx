import { motion } from "framer-motion";
import { familyInfo, personalInfo } from "../../data/siteContent";
import { useLanguage } from "../../context/LanguageContext";
import { marathiContent } from "../../data/marathiContent";

const connections = [
  ["pgf", "father"],
  ["pgm", "father"],
  ["mgf", "mother"],
  ["mgm", "mother"],
  ["father", "groom"],
  ["mother", "groom"],
  ["father", "sister"],
  ["mother", "sister"],
];

export default function FamilyTree() {
  const { t, isMarathi } = useLanguage();
  const family = isMarathi ? marathiContent.family : null;
  const r = t.familyTree.roles;

  const nodes = [
    {
      id: "pgf",
      name: family?.paternal.grandfather ?? familyInfo.paternal.grandfather,
      role: r.paternalGrandfather,
      level: 0,
      col: 0,
      color: "#6366F1",
    },
    {
      id: "pgm",
      name: family?.paternal.grandmother ?? familyInfo.paternal.grandmother,
      role: r.paternalGrandmother,
      level: 0,
      col: 1,
      color: "#8B5CF6",
    },
    {
      id: "father",
      name: family?.father.name ?? familyInfo.father.name,
      role: r.father,
      level: 1,
      col: 1,
      color: "#3B82F6",
    },
    {
      id: "mother",
      name: family?.mother.name ?? familyInfo.mother.name,
      role: r.mother,
      level: 1,
      col: 3,
      color: "#EC4899",
    },
    {
      id: "paternalUncle",
      name: family?.paternalUncle.name ?? familyInfo.paternalUncle.name,
      role: r.paternalUncle,
      level: 1,
      col: 2,
      color: "#10B981",
    },
    {
      id: "paternalAunt",
      name: family?.paternalAunt.name ?? familyInfo.paternalAunt.name,
      role: r.paternalAunt,
      level: 1,
      col: 3,
      color: "#8B5CF6",
    },
    {
      id: "groom",
      name: isMarathi ? marathiContent.profile.fullName : personalInfo.fullName,
      role: r.groom,
      level: 2,
      col: 2,
      color: "#F59E0B",
    },
    {
      id: "sister",
      name: family?.sister.name ?? familyInfo.siblings[0].name,
      role: r.sister,
      level: 2,
      col: 4,
      color: "#10B981",
    },
  ];

  return (
    <section
      id="familytree"
      className="section-padding relative overflow-hidden"
    >
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-10 md:mb-16"
        >
          <span className="text-amber-400 text-sm tracking-widest uppercase font-medium">
            {t.familyTree.badge}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-2">
            {t.familyTree.title}{" "}
            <span className="text-gradient-gold">
              {t.familyTree.titleAccent}
            </span>
          </h2>
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mt-4" />
        </motion.div>

        {/* Mobile: vertical stacked */}
        <div className="md:hidden space-y-4 pt-16">
          {[
            {
              title: t.familyTree.grandparents,
              items: nodes.filter((n) => n.level === 0),
            },
            {
              title: t.familyTree.parents,
              items: nodes.filter((n) => n.level === 1),
            },
            {
              title: t.familyTree.groomSiblings,
              items: nodes.filter((n) => n.level === 2),
            },
          ].map((group, gi) => (
            <div key={gi}>
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-3 text-center">
                {group.title}
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                {group.items.map((node, ni) => (
                  <motion.div
                    key={node.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    // viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: ni * 0.08 }}
                    className="glass rounded-2xl p-4 text-center w-44 flex flex-col items-center gap-y-3"
                    style={{ borderColor: node.color + "40" }}
                  >
                    <p className="text-white text-xs font-bold leading-snug">
                      {node.name}
                    </p>
                    <p className="text-gray-400 text-[10px] mt-0.5">
                      {node.role}
                    </p>
                  </motion.div>
                ))}
              </div>
              {gi < 2 && (
                <div className="flex justify-center mt-3">
                  <div className="h-6 w-px bg-gradient-to-b from-amber-400/40 to-transparent" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Desktop: grid layout */}
        <div className="hidden md:block">
          {[0, 1, 2].map((level) => {
            const levelNodes = nodes.filter((n) => n.level === level);
            return (
              <div key={level}>
                <div className="flex justify-center gap-6 mb-2">
                  {levelNodes.map((node, ni) => (
                    <motion.div
                      key={node.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      // viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: ni * 0.1 }}
                      className="glass rounded-2xl p-5 text-center w-52 hover:border-white/20 transition-all duration-300 group"
                      style={{ borderColor: node.color + "40" }}
                    >
                      <p className="text-white text-sm font-bold leading-snug">
                        {node.name}
                      </p>
                      <p className="text-xs mt-1" style={{ color: node.color }}>
                        {node.role}
                      </p>
                    </motion.div>
                  ))}
                </div>
                {level < 2 && (
                  <div className="flex justify-center my-3">
                    <div className="h-8 w-px bg-gradient-to-b from-amber-400/40 to-transparent" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
