import { motion } from "framer-motion";
import { lifePartnerExpectations } from "../../data/siteContent";
import { useLanguage } from "../../context/LanguageContext";

function PartnerCard({
  item,
  delay,
}: {
  item: { icon: string; title: string; description: string };
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ margin: "-40px" }}
      transition={{ duration: 0.5, delay }}
      className="glass rounded-2xl p-7 md:p-8 hover:border-pink-400/30 transition-all duration-300"
      whileHover={{ y: -4, scale: 1.02 }}
    >
      <div className="text-4xl mb-3">{item.icon}</div>
      <h4
        className="text-white font-bold text-lg mb-2"
        style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
      >
        {item.title}
      </h4>
      <p className="text-gray-300 text-[15px] leading-7">
        {item.description}
      </p>
    </motion.div>
  );
}

export default function LifePartner() {
  const { t } = useLanguage();
  return (
    <section id="partner" className="section-padding relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, #EC4899, transparent 70%)",
        }}
      />
      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-6"
        >
          <span className="text-amber-400 text-sm tracking-widest uppercase font-medium">
            {t.partner.badge}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-2">
            {t.partner.title}{" "}
            <span className="text-gradient-gold">{t.partner.titleAccent}</span>
          </h2>
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mt-4" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          // viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="reading-copy text-center text-base md:text-lg mb-10 md:mb-14"
        >
          {t.partner.intro}
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 max-w-5xl mx-auto">
          {t.partner.expectations.map((item, i) => (
            <PartnerCard key={item.title} item={item} delay={i * 0.08} />
          ))}
        </div>
      </div>
    </section>
  );
}
