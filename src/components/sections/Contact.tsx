import { useState } from "react";
import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  Link,
  MapPin,
  Copy,
  Check,
  ExternalLink,
} from "lucide-react";
import { personalInfo } from "../../data/siteContent";
import { useLanguage } from "../../context/LanguageContext";
import { marathiContent } from "../../data/marathiContent";

export default function Contact() {
  const { t, isMarathi } = useLanguage();
  const address = isMarathi
    ? marathiContent.profile.address
    : personalInfo.address;
  const [copied, setCopied] = useState<string | null>(null);
  const contacts = [
    {
      icon: Phone,
      label: t.contact.labels.phone,
      value: personalInfo.phone,
      href: `tel:${personalInfo.phone}`,
      color: "#10B981",
    },
    {
      icon: Mail,
      label: t.contact.labels.email,
      value: personalInfo.email,
      href: `mailto:${personalInfo.email}`,
      color: "#3B82F6",
    },
    {
      icon: Link,
      label: t.contact.labels.linkedin,
      value: personalInfo.linkedin,
      href: `${personalInfo.linkedin}`,
      color: "#0EA5E9",
    },
    {
      icon: MapPin,
      label: t.contact.labels.address,
      value: address,
      href: "#",
      color: "#F59E0B",
    },
  ];

  const copyToClipboard = (value: string) => {
    navigator.clipboard.writeText(value).then(() => {
      setCopied(value);
      setTimeout(() => setCopied(null), 2000);
    });
  };

  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, #2563EB, transparent 60%)",
        }}
      />
      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-10 md:mb-16"
        >
          <span className="text-amber-400 text-sm tracking-widest uppercase font-medium">
            {t.contact.badge}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-2">
            {t.contact.title}{" "}
            <span className="text-gradient-gold">{t.contact.titleAccent}</span>
          </h2>
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mt-4" />
          <p className="text-gray-400 mt-4 text-lg">{t.contact.thankYou}</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {contacts.map((c, i) => (
            <motion.div
              key={c.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              // viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="glass rounded-2xl p-5 group hover:border-white/20 transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: c.color + "20" }}
                >
                  <c.icon size={20} style={{ color: c.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-gray-400 text-xs uppercase tracking-wider mb-0.5">
                    {c.label}
                  </p>
                  <p className="text-white font-medium truncate">{c.value}</p>
                </div>
                <div className="flex gap-1">
                  {c.href !== "#" && (
                    <a
                      href={c.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg hover:bg-white/10 transition-colors text-gray-400 hover:text-white"
                    >
                      <ExternalLink size={14} />
                    </a>
                  )}
                  <button
                    onClick={() => copyToClipboard(c.value)}
                    className="p-2 rounded-lg hover:bg-white/10 transition-colors text-gray-400 hover:text-white"
                  >
                    {copied === c.value ? (
                      <Check size={14} className="text-green-400" />
                    ) : (
                      <Copy size={14} />
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Closing message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          // viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="glass-gold rounded-3xl p-5 sm:p-8 text-center"
        >
          <h3
            className="text-2xl font-bold text-white mb-3"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            {t.contact.lookingForward}
          </h3>
          <p className="text-gray-300 leading-relaxed max-w-2xl mx-auto">
            {t.contact.closingPara}
          </p>
          <div className="mt-6 flex flex-wrap gap-3 justify-center">
            <a
              href={`tel:${personalInfo.phone}`}
              className="px-6 py-3 rounded-full font-medium text-sm bg-amber-400 hover:bg-amber-300 transition-all hover:scale-105"
              style={{ color: "#0B1120" }}
            >
              {t.contact.callNow}
            </a>
            <a
              href={`mailto:${personalInfo.email}`}
              className="px-6 py-3 rounded-full font-medium text-sm glass text-white hover:bg-white/10 transition-all hover:scale-105"
            >
              {t.contact.sendEmail}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
