import { motion } from "framer-motion";
import { useLanguage } from "../../context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="relative py-12 px-6 border-t border-white/10 text-center">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          // viewport={{ once: true }}
          className="mb-6"
        >
          <div className="text-3xl font-bold text-gradient-gold mb-2">
            Chaitanya Sawant
          </div>
          <p className="text-gray-400 text-sm">{t.footer.tagline}</p>
        </motion.div>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          // viewport={{ once: true }}
          className="h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent mb-6"
        />

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          // viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-gray-500 text-sm"
        >
          {t.footer.credit}
        </motion.p>
      </div>
    </footer>
  );
}
