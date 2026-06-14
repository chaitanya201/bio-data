import { useState } from "react";
import { motion } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import { Share2, Copy, Check, MessageCircle } from "lucide-react";
import { personalInfo } from "../../data/biodata";
import { useLanguage } from "../../context/LanguageContext";

export default function QRCodeSection() {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);
  const url = personalInfo.websiteUrl;

  const copyLink = () => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const whatsappShare = () => {
    const msg = encodeURIComponent(
      `Check out Arjun Deshmukh's marriage biodata: ${url}`
    );
    window.open(`https://wa.me/?text=${msg}`, "_blank");
  };

  return (
    <section id="qr" className="section-padding relative overflow-hidden">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-8 md:mb-12"
        >
          <span className="text-amber-400 text-sm tracking-widest uppercase font-medium">
            {t.qr.badge}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-2">
            {t.qr.title}{" "}
            <span className="text-gradient-gold">{t.qr.titleAccent}</span>
          </h2>
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mt-4" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          // viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass rounded-3xl p-5 sm:p-8 text-center"
        >
          <p className="text-gray-300 mb-6">{t.qr.scanHint}</p>

          {/* QR Code */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7, rotate: -10 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            // viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, type: "spring" }}
            className="inline-block p-4 rounded-2xl bg-white mb-6"
          >
            <QRCodeSVG
              value={url}
              size={180}
              level="H"
              fgColor="#0B1120"
              bgColor="#ffffff"
            />
          </motion.div>

          <p className="text-gray-400 text-sm mb-6 font-mono break-all">
            {url}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={copyLink}
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-full glass text-white hover:bg-white/10 transition-all font-medium text-sm"
            >
              {copied ? (
                <Check size={16} className="text-green-400" />
              ) : (
                <Copy size={16} />
              )}
              {copied ? t.qr.copied : t.qr.copyLink}
            </button>
            <button
              onClick={whatsappShare}
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-full font-medium text-sm transition-all hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #25D366, #128C7E)",
                color: "white",
              }}
            >
              <MessageCircle size={16} />
              {t.qr.whatsapp}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
