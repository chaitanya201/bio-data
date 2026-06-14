import { motion } from "framer-motion";
import { familyInfo } from "../../data/biodata";
import { useLanguage } from "../../context/LanguageContext";

const memberColors = ["#3B82F6", "#EC4899", "#10B981"];
const memberPhotos = [
  familyInfo.father.photo,
  familyInfo.mother.photo,
  ...familyInfo.siblings.map((s) => s.photo),
];

export default function FamilyBackground() {
  const { t } = useLanguage();
  const allMembers = t.family.members.map((m, i) => ({
    ...m,
    photo: memberPhotos[i] ?? memberPhotos[memberPhotos.length - 1],
    color: memberColors[i] ?? "#10B981",
  }));
  return (
    <section id="family" className="section-padding relative overflow-hidden">
      {/* Background decoration */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 50% 50%, #2563EB 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10 flex flex-col gap-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          // viewport={{ margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center"
          style={{ paddingBottom: "20px" }}
        >
          <span className="text-amber-400 text-sm tracking-widest uppercase font-medium">
            {t.family.badge}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-2">
            {t.family.title}{" "}
            <span className="text-gradient-gold">{t.family.titleAccent}</span>
          </h2>
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mt-4" />
        </motion.div>

        {/* Family members */}
        <div className="flex flex-col gap-y-6">
          {allMembers.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, x: i % 2 === 0 ? -60 : 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className={`flex items-center gap-6 glass rounded-3xl p-6 hover:border-white/20 transition-all duration-300 ${
                i % 2 === 0 ? "flex-row" : "flex-row-reverse"
              }`}
            >
              {/* Photo */}
              <div className="flex-shrink-0">
                <div
                  className="w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden border-2"
                  style={{ borderColor: member.color + "40" }}
                >
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Info */}
              <div className={`flex-1 ${i % 2 !== 0 ? "text-right" : ""}`}>
                <div
                  className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-2"
                  style={{
                    backgroundColor: member.color + "20",
                    color: member.color,
                  }}
                >
                  {member.relation}
                </div>
                <h3
                  className="text-xl font-bold text-white"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  {member.name}
                </h3>
                <p className="text-gray-400 mt-1">{member.occupation}</p>
              </div>

              {/* Connector line for desktop */}
              <div className="hidden md:flex flex-shrink-0 w-px h-16 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
            </motion.div>
          ))}
        </div>

        {/* Grandparents */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          // viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-6 md:mt-10 grid grid-cols-1 md:grid-cols-2 gap-4 "
        >
          <div className="glass rounded-2xl p-6">
            <p className="text-amber-400 text-lg uppercase tracking-wider mb-3">
              {t.family.paternal}
            </p>
            <p className="text-white font-medium">
              {t.family.paternalGrandfather}
            </p>
            <p className="text-gray-400 text-sm">
              {t.family.paternalGrandmother}
            </p>
          </div>
          <div className="glass rounded-2xl p-6">
            <p className="text-amber-400 text-lg uppercase tracking-wider mb-3">
              {t.family.maternal}
            </p>
            <p className="text-white font-medium">
              {t.family.maternalGrandfather}
            </p>
            <p className="text-gray-400 text-sm">
              {t.family.maternalGrandmother}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
