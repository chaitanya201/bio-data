import { useState } from "react";
import { motion } from "framer-motion";
import { Download, FileText, Loader } from "lucide-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { personalInfo, educationData, careerData } from "../../data/siteContent";
import { useLanguage } from "../../context/LanguageContext";

export default function PDFDownload() {
  const { t, isMarathi } = useLanguage();
  const [generating, setGenerating] = useState(false);
  const [done, setDone] = useState(false);

  const generatePDF = async () => {
    setGenerating(true);
    try {
      const s = t.pdf.sections;
      const fm = t.family.members;
      const fontFamily = isMarathi
        ? "'Noto Sans Devanagari', 'Noto Sans', Arial, sans-serif"
        : "'Helvetica Neue', Helvetica, Arial, sans-serif";

      const mkRow = (label: string, value: string) =>
        `<tr>
          <td style="padding:7px 14px;color:#9CA3AF;font-size:12px;white-space:nowrap;width:160px;border-bottom:1px solid rgba(255,255,255,0.05);">${label}</td>
          <td style="padding:7px 14px;color:#E2E8F0;font-size:12px;border-bottom:1px solid rgba(255,255,255,0.05);">${value}</td>
        </tr>`;

      const mkSection = (title: string, rows: string) =>
        `<div style="margin:0 28px 22px;">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px;">
            <div style="width:3px;height:16px;background:#F59E0B;border-radius:2px;flex-shrink:0;"></div>
            <span style="color:#F59E0B;font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;">${title}</span>
          </div>
          <table style="width:100%;border-collapse:collapse;background:rgba(255,255,255,0.03);border-radius:8px;overflow:hidden;">${rows}</table>
        </div>`;

      const html = `<div style="background:#0B1120;font-family:${fontFamily};color:white;width:794px;">
          <div style="background:linear-gradient(135deg,#1E3A8A 0%,#2563EB 100%);padding:36px 28px 28px;text-align:center;">
            <div style="font-size:28px;font-weight:800;color:#fff;margin-bottom:8px;letter-spacing:-0.5px;">${
              personalInfo.fullName
            }</div>
            <div style="font-size:13px;color:#FDE68A;margin-bottom:8px;">${
              personalInfo.tagline
            }</div>
            <div style="display:inline-block;background:rgba(255,255,255,0.15);padding:4px 16px;border-radius:20px;font-size:10px;color:#BFDBFE;letter-spacing:2px;text-transform:uppercase;">${
              s.marriageBiodata
            }</div>
          </div>
          <div style="padding:28px 0 8px;">
            ${mkSection(
              s.personalInfo,
              [
                mkRow(s.fullName, personalInfo.fullName),
                mkRow(s.dateOfBirth, personalInfo.dateOfBirth),
                mkRow(
                  s.heightWeight,
                  `${personalInfo.height} / ${personalInfo.weight}`
                ),
                mkRow(s.bloodGroup, personalInfo.bloodGroup),
                mkRow(s.nativePlace, personalInfo.nativePlace),
                mkRow(s.currentCity, personalInfo.currentCity),
                mkRow(
                  s.religion,
                  `${personalInfo.religion} \u00b7 ${personalInfo.caste}`
                ),
                mkRow(s.gotra, personalInfo.gotra),
                mkRow(
                  s.rashiNakshatra,
                  `${personalInfo.rashi} \u00b7 ${personalInfo.nakshatra}`
                ),
                mkRow(s.manglik, personalInfo.manglik),
              ].join("")
            )}
            ${mkSection(
              s.familyDetails,
              [
                mkRow(s.father, `${fm[0].name} \u2014 ${fm[0].occupation}`),
                mkRow(s.mother, `${fm[1].name} \u2014 ${fm[1].occupation}`),
                mkRow(
                  fm[2].relation,
                  `${fm[2].name} \u2014 ${fm[2].occupation}`
                ),
              ].join("")
            )}
            ${mkSection(
              s.education,
              educationData
                .slice(0, 4)
                .map((e) =>
                  mkRow(
                    e.year,
                    `${e.institution} \u2014 ${e.degree.substring(0, 55)}`
                  )
                )
                .join("")
            )}
            ${mkSection(
              s.career,
              careerData
                .map((c) => mkRow(c.year, `${c.company} \u2014 ${c.role}`))
                .join("")
            )}
            ${mkSection(
              s.contact,
              [
                mkRow(s.phone, personalInfo.phone),
                mkRow(s.email, personalInfo.email),
                mkRow(s.linkedin, personalInfo.linkedin),
                mkRow(s.address, personalInfo.address),
              ].join("")
            )}
          </div>
          <div style="text-align:center;padding:16px 28px 28px;color:#6B7280;font-size:10px;border-top:1px solid rgba(255,255,255,0.08);margin:0 28px;">${
            s.footer
          }</div>
        </div>`;

      const container = document.createElement("div");
      container.style.cssText = "position:fixed;left:-9999px;top:0;z-index:-1;";
      container.innerHTML = html;
      document.body.appendChild(container);

      await document.fonts.ready;

      const canvas = await html2canvas(
        container.firstElementChild as HTMLElement,
        {
          scale: 2,
          useCORS: true,
          backgroundColor: "#0B1120",
          logging: false,
        }
      );

      document.body.removeChild(container);

      const imgData = canvas.toDataURL("image/png");
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });
      const pw = doc.internal.pageSize.getWidth();
      const ph = doc.internal.pageSize.getHeight();
      const imgWidth = pw;
      const imgHeight = (canvas.height * pw) / canvas.width;

      if (imgHeight <= ph) {
        doc.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      } else {
        let yOffset = 0;
        while (yOffset < imgHeight) {
          if (yOffset > 0) doc.addPage();
          doc.addImage(imgData, "PNG", 0, -yOffset, imgWidth, imgHeight);
          yOffset += ph;
        }
      }

      doc.save(`${personalInfo.shortName}_Deshmukh_Biodata.pdf`);
      setDone(true);
      setTimeout(() => setDone(false), 3000);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <section id="pdf" className="section-padding relative overflow-hidden">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-8 md:mb-12"
        >
          <span className="text-amber-400 text-sm tracking-widest uppercase font-medium">
            {t.pdf.badge}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-2">
            {t.pdf.title}{" "}
            <span className="text-gradient-gold">{t.pdf.titleAccent}</span>
          </h2>
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mt-4" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          // viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass rounded-3xl p-5 sm:p-8 text-center"
        >
          <FileText className="w-16 h-16 text-amber-400 mx-auto mb-4" />
          <h3
            className="text-white text-xl font-bold mb-2"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            {t.pdf.cardTitle}
          </h3>
          <p className="text-gray-300 mb-6">{t.pdf.cardDesc}</p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <motion.button
              onClick={generatePDF}
              disabled={generating}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center justify-center gap-2 px-8 py-3 rounded-full font-medium text-sm transition-all shadow-lg shadow-amber-400/25 disabled:opacity-70"
              style={{
                background: "linear-gradient(135deg, #F59E0B, #D97706)",
                color: "#0B1120",
              }}
            >
              {generating ? (
                <Loader size={16} className="animate-spin" />
              ) : done ? (
                t.pdf.btnDownloaded
              ) : (
                <>
                  <Download size={16} />
                  {t.pdf.btnDownload}
                </>
              )}
            </motion.button>
          </div>

          <p className="text-gray-500 text-xs mt-4">{t.pdf.privacy}</p>
        </motion.div>
      </div>
    </section>
  );
}
