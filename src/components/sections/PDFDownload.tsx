import { useState } from "react";
import { motion } from "framer-motion";
import { Download, FileText, Loader } from "lucide-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import {
  personalInfo,
  familyInfo,
  educationData,
  careerData,
  achievementsData,
  horoscopeData,
  relativeInfoData,
  media,
} from "../../data/siteContent";
import { useLanguage } from "../../context/LanguageContext";

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

export default function PDFDownload() {
  const { t, isMarathi } = useLanguage();
  const [generating, setGenerating] = useState(false);
  const [done, setDone] = useState(false);

  const generatePDF = async () => {
    setGenerating(true);

    try {
      const s = t.pdf.sections;
      const roles = t.familyTree.roles;
      const fontFamily = isMarathi
        ? "'Noto Sans Devanagari', 'Noto Sans', Arial, sans-serif"
        : "'Helvetica Neue', Helvetica, Arial, sans-serif";

      const mkRow = (label: string, value: string) =>
        `<tr>
          <td style="padding:8px 14px;color:#9CA3AF;font-size:12px;white-space:nowrap;width:160px;border-bottom:1px solid rgba(255,255,255,0.05);vertical-align:top;">${escapeHtml(label)}</td>
          <td style="padding:8px 14px;color:#E2E8F0;font-size:12px;border-bottom:1px solid rgba(255,255,255,0.05);">${escapeHtml(value)}</td>
        </tr>`;

      const mkSection = (title: string, rows: string) =>
        `<div style="margin:0 28px 22px;">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px;">
            <div style="width:3px;height:16px;background:#F59E0B;border-radius:2px;flex-shrink:0;"></div>
            <span style="color:#F59E0B;font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;">${escapeHtml(title)}</span>
          </div>
          <table style="width:100%;border-collapse:collapse;background:rgba(255,255,255,0.03);border-radius:8px;overflow:hidden;">${rows}</table>
        </div>`;

      const familyRows = [
        mkRow(roles.father, `${familyInfo.father.name} · ${familyInfo.father.occupation}`),
        mkRow(roles.mother, `${familyInfo.mother.name} · ${familyInfo.mother.occupation}`),
        ...familyInfo.siblings.map((sibling) =>
          mkRow(roles.sister, `${sibling.name} · ${sibling.occupation}`)
        ),
        mkRow(roles.paternalGrandfather, familyInfo.paternal.grandfather),
        mkRow(roles.paternalGrandmother, familyInfo.paternal.grandmother),
        mkRow(roles.maternalGrandfather, familyInfo.maternal.grandfather),
        mkRow(roles.maternalGrandmother, familyInfo.maternal.grandmother),
      ].join("");

      const relativeRows = relativeInfoData
        .map(({ name, relation, occupation }) =>
          mkRow(
            relation,
            `${name}${occupation ? ` · ${occupation}` : ""}`
          )
        )
        .join("");

      const educationRows = educationData
        .map((item) =>
          mkRow(
            item.year,
            `${item.institution} · ${item.degree} · ${item.location}`
          )
        )
        .join("");

      const careerRows = careerData
        .map((item) =>
          mkRow(
            item.year,
            `${item.company} · ${item.role} · ${item.location}`
          )
        )
        .join("");

      const achievementRows = achievementsData
        .map((item) =>
          mkRow(item.year, `${item.title} · ${item.fullTitle} · ${item.issuer}`)
        )
        .join("");

      const html = `<div style="background:#0B1120;font-family:${fontFamily};color:white;width:794px;">
          <div style="background:linear-gradient(135deg,#1E3A8A 0%,#2563EB 100%);padding:36px 28px 28px;text-align:center;">
            <div style="font-size:28px;font-weight:800;color:#fff;margin-bottom:8px;letter-spacing:-0.5px;">${escapeHtml(personalInfo.fullName)}</div>
            <div style="font-size:13px;color:#FDE68A;margin-bottom:8px;">${escapeHtml(personalInfo.tagline)}</div>
            <div style="display:inline-block;background:rgba(255,255,255,0.15);padding:4px 16px;border-radius:20px;font-size:10px;color:#BFDBFE;letter-spacing:2px;text-transform:uppercase;">${escapeHtml(s.marriageBiodata)}</div>
          </div>
          <div style="padding:28px 0 8px;">
            ${mkSection(
              s.personalInfo,
              [
                mkRow(s.fullName, personalInfo.fullName),
                mkRow(s.dateOfBirth, personalInfo.dateOfBirth),
                mkRow(s.age, String(personalInfo.age)),
                mkRow(s.height, personalInfo.height),
                mkRow(s.bloodGroup, personalInfo.bloodGroup),
                mkRow(s.nativePlace, personalInfo.nativePlace),
                mkRow(s.currentCity, personalInfo.currentCity),
                mkRow(s.religion, `${personalInfo.religion} · ${personalInfo.caste}`),
                mkRow(s.rashi, personalInfo.rashi),
              ].join("")
            )}
            ${mkSection(s.familyDetails, familyRows)}
            ${mkSection(s.education, educationRows)}
            ${mkSection(s.career, careerRows)}
            ${mkSection(s.contact, [
              mkRow(s.phone, personalInfo.phone),
              mkRow(s.email, personalInfo.email),
              mkRow(s.linkedin, personalInfo.linkedin),
              mkRow(s.address, personalInfo.address),
            ].join(""))}
            ${mkSection(
              s.relativeDetails,
              relativeRows
            )}
            ${mkSection(s.achievements, achievementRows)}
            ${mkSection(
              s.horoscope,
              [
                mkRow(s.rashi, horoscopeData.rashi),
                mkRow(s.timeOfBirth, horoscopeData.tob),
                mkRow(s.placeOfBirth, horoscopeData.pob),
              ].join("")
            )}

            <div style="margin:0 28px 24px;">
              <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px;">
                <div style="width:3px;height:16px;background:#F59E0B;border-radius:2px;flex-shrink:0;"></div>
                <span style="color:#F59E0B;font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;">${escapeHtml(s.photos)}</span>
              </div>
              <div style="display:flex;gap:16px;align-items:stretch;">
                <div style="flex:1;background:rgba(255,255,255,0.03);border-radius:10px;padding:10px;text-align:center;">
                  <img crossorigin="anonymous" src="${escapeHtml(media.pdfImages.groom)}" alt="${escapeHtml(s.groomPhoto)}" style="display:block;width:100%;height:240px;object-fit:cover;border-radius:8px;" />
                  <div style="color:#E2E8F0;font-size:11px;font-weight:600;margin-top:8px;">${escapeHtml(s.groomPhoto)}</div>
                </div>
                <div style="flex:1;background:rgba(255,255,255,0.03);border-radius:10px;padding:10px;text-align:center;">
                  <img crossorigin="anonymous" src="${escapeHtml(media.pdfImages.kundli)}" alt="${escapeHtml(s.kundli)}" style="display:block;width:100%;height:240px;object-fit:contain;border-radius:8px;background:rgba(255,255,255,0.04);" />
                  <div style="color:#E2E8F0;font-size:11px;font-weight:600;margin-top:8px;">${escapeHtml(s.kundli)}</div>
                </div>
              </div>
            </div>
          </div>
          <div style="text-align:center;padding:16px 28px 28px;color:#6B7280;font-size:10px;border-top:1px solid rgba(255,255,255,0.08);margin:0 28px;">${escapeHtml(s.footer)}</div>
        </div>`;

      const container = document.createElement("div");
      container.style.cssText =
        "position:fixed;left:-9999px;top:0;z-index:-1;pointer-events:none;";
      container.innerHTML = html;
      document.body.appendChild(container);

      await document.fonts.ready;
      await Promise.all(
        Array.from(container.querySelectorAll("img")).map(
          (image) =>
            image.complete
              ? Promise.resolve()
              : new Promise<void>((resolve) => {
                  image.addEventListener("load", () => resolve(), { once: true });
                  image.addEventListener("error", () => resolve(), { once: true });
                })
        )
      );

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

      doc.save(`${personalInfo.shortName}_Biodata.pdf`);
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
