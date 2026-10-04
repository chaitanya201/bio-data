import { motion } from "framer-motion";
import { UsersRound } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { otherFamilyDetails, otherFamilyDetailsMarathi } from "../../data/siteContent";

export default function OtherFamilyDetails() {
  const { t, isMarathi } = useLanguage();
  const details = isMarathi ? otherFamilyDetailsMarathi : otherFamilyDetails;

  if (details.length === 0) return null;

  return (
    <section
      id="other-family-details"
      className="section-padding relative overflow-hidden"
    >
      <div className="max-w-4xl mx-auto">
        <motion.header
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            {t.pdf.sections.otherFamilyDetails}
          </h2>
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mt-4" />
        </motion.header>

        <ul className="flex flex-wrap justify-center gap-3">
          {details.map((detail, index) => (
            <motion.li
              key={detail}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ margin: "-40px" }}
              transition={{ duration: 0.45, delay: index * 0.05 }}
              className="glass rounded-2xl px-5 py-4 md:px-6 md:py-5 flex items-center gap-3 text-gray-200 text-sm md:text-base"
            >
              <UsersRound
                size={16}
                className="text-amber-400 shrink-0"
                aria-hidden="true"
              />
              <span>{detail}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
