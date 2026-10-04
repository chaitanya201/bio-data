import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Download, Eye, FileText, Loader, X } from "lucide-react";
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
} from "../../data/siteContent";
import { marathiContent } from "../../data/marathiContent";
import { useLanguage } from "../../context/LanguageContext";

const PAGE_WIDTH = 794;
const PAGE_HEIGHT = 1123;
const CONFETTI_DURATION_MS = 3800;

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

function ConfettiCelebration() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const colors = ["#F59E0B", "#FF6B35", "#34D399", "#60A5FA", "#F472B6"];
    const particles = Array.from({ length: 100 }, () => ({
      x: window.innerWidth / 2,
      y: window.innerHeight * 0.35,
      vx: (Math.random() - 0.5) * 12,
      vy: -Math.random() * 12 - 4,
      rotation: Math.random() * Math.PI,
      spin: (Math.random() - 0.5) * 0.25,
      size: Math.random() * 6 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
    const startedAt = performance.now();
    let frameId = 0;

    const resize = () => {
      const scale = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * scale;
      canvas.height = window.innerHeight * scale;
      context.setTransform(scale, 0, 0, scale, 0, 0);
    };

    const draw = (now: number) => {
      const elapsed = now - startedAt;
      if (elapsed >= CONFETTI_DURATION_MS) return;

      context.clearRect(0, 0, window.innerWidth, window.innerHeight);
      context.globalAlpha = Math.min(1, (CONFETTI_DURATION_MS - elapsed) / 500);

      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vy += 0.22;
        particle.vx *= 0.99;
        particle.rotation += particle.spin;

        context.save();
        context.translate(particle.x, particle.y);
        context.rotate(particle.rotation);
        context.fillStyle = particle.color;
        context.fillRect(
          -particle.size / 2,
          -particle.size / 4,
          particle.size,
          particle.size / 2,
        );
        context.restore();
      });

      frameId = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    frameId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[100] h-full w-full"
    />
  );
}

function DownloadActionButton({
  generating,
  done,
  label,
  downloadedLabel,
  onClick,
  floating = false,
}: {
  generating: boolean;
  done: boolean;
  label: string;
  downloadedLabel: string;
  onClick: () => void;
  floating?: boolean;
}) {
  return (
    <motion.button
      type="button"
      onClick={() => onClick()}
      disabled={generating}
      aria-busy={generating}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      animate={floating ? { y: [0, -4, 0] } : undefined}
      transition={
        floating
          ? { duration: 2.4, repeat: Infinity, ease: "easeInOut" }
          : undefined
      }
      className={`flex items-center justify-center gap-2 rounded-full py-3 text-sm font-medium shadow-lg shadow-amber-900/10 transition-all disabled:cursor-wait disabled:opacity-70 ${
        floating ? "px-4 sm:px-6" : "px-8"
      }`}
      style={{
        background: "linear-gradient(135deg, #8B1E2D, #A52A3A)",
        color: "#FFFDF7",
      }}
    >
      {generating ? (
        <Loader size={16} className="animate-spin" />
      ) : done ? (
        downloadedLabel
      ) : (
        <>
          <Download size={16} />
          {label}
        </>
      )}
    </motion.button>
  );
}

export default function PDFDownload() {
  const { t, isMarathi } = useLanguage();
  const [generating, setGenerating] = useState(false);
  const [done, setDone] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const canPreview = window.location.hostname.includes("localhost");
  const closePreview = useCallback(() => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
  }, [previewUrl]);

  useEffect(() => {
    if (!previewUrl) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closePreview();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [closePreview, previewUrl]);

  const generatePDF = async (preview = false) => {
    setGenerating(true);

    let container: HTMLDivElement | null = null;

    try {
      const s = t.pdf.sections;
      const roles = t.familyTree.roles;
      const fontFamily = isMarathi
        ? "'Noto Sans Devanagari', 'Noto Sans', Arial, sans-serif"
        : "'Helvetica Neue', Helvetica, Arial, sans-serif";

      const occupationLabel = (occupation: string | null) => {
        if (!occupation) return "";
        if (!isMarathi) return occupation;
        return (
          {
            Farmer: "शेतकरी",
            Homemaker: "गृहिणी",
            "Software Engineer": "सॉफ्टवेअर Engineer",
          }[occupation] ?? occupation
        );
      };

      const relativeLabel = (relation: string) => {
        if (!isMarathi) return relation;
        const relationMap: Record<string, string> = {
          Father: roles.father,
          Mother: roles.mother,
          Sister: roles.sister,
          "Paternal Grandfather": roles.paternalGrandfather,
          "Paternal Grandmother": roles.paternalGrandmother,
          "Maternal Grandfather": roles.maternalGrandfather,
          "Maternal Grandmother": roles.maternalGrandmother,
        };
        return relationMap[relation] ?? relation;
      };

      const localizedEducation = isMarathi
        ? marathiContent.education
        : educationData;
      const localizedCareer = isMarathi
        ? marathiContent.career.jobs
        : careerData;
      const localizedAchievements = isMarathi
        ? marathiContent.achievements
        : achievementsData;
      const profile = isMarathi ? marathiContent.profile : personalInfo;
      const localizedHoroscope = isMarathi
        ? {
            ...horoscopeData,
            ...marathiContent.horoscope,
            rashi: marathiContent.profile.rashi,
          }
        : horoscopeData;

      const mkRow = (label: string, value: string) =>
        `<tr>
          <td style="padding:10px 14px;color:#7A1F2B;font-size:11px;white-space:nowrap;width:168px;border-bottom:1px solid #E8DCC8;vertical-align:top;font-weight:700;letter-spacing:0.02em;background:#FBF7EF;">${escapeHtml(label)}</td>
          <td style="padding:10px 14px;color:#3F3A35;font-size:12px;border-bottom:1px solid #E8DCC8;line-height:1.45;background:#FFFDF8;">${escapeHtml(value)}</td>
        </tr>`;

      const mkSection = (title: string, rows: string) =>
        `<section style="margin:0 28px 20px;break-inside:avoid;page-break-inside:avoid;">
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:9px;">
            <div style="width:28px;height:28px;border-radius:50%;background:#F4E2B9;border:1px solid #C9A45C;display:flex;align-items:center;justify-content:center;color:#8B1E2D;font-size:12px;font-weight:800; padding-bottom:10px;">✦</div>
            <span style="color:#7A1F2B;font-size:12px;font-weight:800;letter-spacing:1.1px;text-transform:uppercase;">${escapeHtml(title)}</span>
          </div>
          <div style="background:#FFFDF8;border:1px solid #D8C7A8;border-radius:10px;overflow:hidden;box-shadow:0 3px 12px rgba(86,56,24,0.07);">
            <table style="width:100%;border-collapse:collapse;">${rows}</table>
          </div>
        </section>`;

      const familyRows = isMarathi
        ? [
            mkRow(
              roles.father,
              `${marathiContent.family.father.name} · ${marathiContent.family.father.occupation}`,
            ),
            mkRow(
              roles.mother,
              `${marathiContent.family.mother.name} · ${marathiContent.family.mother.occupation}`,
            ),
            mkRow(
              roles.paternalUncle,
              `${marathiContent.family.paternalUncle.name} · ${marathiContent.family.paternalUncle.occupation}`,
            ),
            mkRow(
              roles.paternalAunt,
              `${marathiContent.family.paternalAunt.name} · ${marathiContent.family.paternalAunt.occupation}`,
            ),
            mkRow(
              roles.sister,
              `${marathiContent.family.sister.name} · ${marathiContent.family.sister.occupation}`,
            ),
            mkRow(
              roles.paternalGrandfather,
              marathiContent.family.paternal.grandfather,
            ),
            mkRow(
              roles.paternalGrandmother,
              marathiContent.family.paternal.grandmother,
            ),
            mkRow(
              roles.maternalGrandfather,
              marathiContent.family.maternal.grandfather,
            ),
            mkRow(
              roles.maternalGrandmother,
              marathiContent.family.maternal.grandmother,
            ),
          ].join("")
        : [
            mkRow(
              roles.father,
              `${familyInfo.father.name} · ${occupationLabel(familyInfo.father.occupation)}`,
            ),
            mkRow(
              roles.mother,
              `${familyInfo.mother.name} · ${occupationLabel(familyInfo.mother.occupation)}`,
            ),
            mkRow(
              roles.paternalUncle,
              `${familyInfo.paternalUncle.name} · ${occupationLabel(familyInfo.paternalUncle.occupation)}`,
            ),
            mkRow(
              roles.paternalAunt,
              `${familyInfo.paternalAunt.name} · ${occupationLabel(familyInfo.paternalAunt.occupation)}`,
            ),
            ...familyInfo.siblings.map((sibling) =>
              mkRow(
                roles.sister,
                `${sibling.name} · ${occupationLabel(sibling.occupation)}`,
              ),
            ),
            mkRow(roles.paternalGrandfather, familyInfo.paternal.grandfather),
            mkRow(roles.paternalGrandmother, familyInfo.paternal.grandmother),
            mkRow(roles.maternalGrandfather, familyInfo.maternal.grandfather),
            mkRow(roles.maternalGrandmother, familyInfo.maternal.grandmother),
          ].join("");

      const relativeRows = isMarathi
        ? marathiContent.family.relativeItems
            .map((item) => {
              const [name, details = ""] = item.split(/\s*—\s*/, 2);
              const [relation, occupation] = details.split(" · ", 2);
              return mkRow(
                relation,
                `${name}${occupation ? ` · ${occupation}` : ""}`,
              );
            })
            .join("")
        : relativeInfoData
            .map(({ name, relation, occupation }) =>
              mkRow(
                relativeLabel(relation),
                `${name}${occupation ? ` · ${occupationLabel(occupation)}` : ""}`,
              ),
            )
            .join("");

      const educationRows = localizedEducation
        .map((item) =>
          mkRow(
            item.year,
            `${item.institution} · ${item.degree} · ${item.location}`,
          ),
        )
        .join("");

      const careerRows = localizedCareer
        .map((job) =>
          mkRow(
            job.year,
            `${job.company} · ${job.role} · ${job.location}${job.description ? ` · ${job.description}` : ""}`,
          ),
        )
        .join("");

      const achievementRows = localizedAchievements
        .map((item) =>
          mkRow(
            item.year,
            `${item.title} · ${item.fullTitle} · ${item.issuer}`,
          ),
        )
        .join("");

      const headerHtml = `<header style="position:relative;background:#FFFDF8;padding:30px 28px 24px;text-align:center;margin:0 18px 18px;border-radius:12px;box-shadow:0 5px 18px rgba(86,56,24,0.08);border:1px solid #D8C7A8;">
            <div style="height:5px;background:linear-gradient(90deg,#8B1E2D,#C9A45C,#8B1E2D);margin:-30px -28px 22px;"></div>
            <div style="font-size:29px;font-weight:800;color:#6F1D2A;margin-bottom:7px;letter-spacing:-0.4px;line-height:1.2;">${escapeHtml(profile.fullName)}</div>
            <div style="font-size:13px;color:#66594B;margin-bottom:12px;font-weight:600;">${escapeHtml(profile.tagline)}</div>
            <div style="display:inline-block;background:#F7EEDC;padding:14px 12px;border-radius:999px;font-size:10px;color:#7A1F2B;letter-spacing:1.5px;text-transform:uppercase;border:1px solid #D8C7A8;font-weight:700;">${escapeHtml(s.marriageBiodata)}</div>
            <div style="margin-top:16px;padding-top:12px;border-top:1px solid #E8DCC8;font-size:10px;color:#8A7A69;font-weight:600;">${escapeHtml(personalInfo.websiteUrl)}</div>
            <div style="height:2px;background:linear-gradient(90deg,#8B1E2D,#C9A45C,#8B1E2D);margin:18px 38px 0;"></div>
          </header>`;

      const sectionsHtml = [
        mkSection(
          s.personalInfo,
          [
            mkRow(s.fullName, profile.fullName),
            mkRow(s.dateOfBirth, profile.dateOfBirth),
            mkRow(s.age, String(profile.age)),
            mkRow(s.height, profile.height),
            mkRow(s.bloodGroup, profile.bloodGroup),
            mkRow(s.nativePlace, profile.nativePlace),
            mkRow(s.currentCity, profile.currentCity),
            mkRow(s.religion, `${profile.religion} · ${profile.caste}`),
            mkRow(s.rashi, profile.rashi),
          ].join(""),
        ),
        mkSection(s.familyDetails, familyRows),
        mkSection(s.relativeDetails, relativeRows),
        mkSection(s.education, educationRows),
        mkSection(s.career, careerRows),
        mkSection(s.achievements, achievementRows),
        (() => {
          const horoscopeTable = [
            mkRow(
              s.rashi,
              isMarathi ? t.horoscope.rashiChip : localizedHoroscope.rashi,
            ),
            mkRow(s.familyDeity, localizedHoroscope.familyDeity || "-"),
            mkRow(s.daivak, localizedHoroscope.daivak || "-"),
            mkRow(s.gotra, localizedHoroscope.gotra || "-"),
            mkRow(s.timeOfBirth, localizedHoroscope.tob),
            mkRow(s.placeOfBirth, localizedHoroscope.pob),
          ].join("");

          return `
            <section style="margin:0 28px 20px;break-inside:avoid;page-break-inside:avoid;">
              <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px;">
                <div style="width:28px;height:28px;border-radius:8px;background:#F4E2B9;border:1px solid #C9A45C;display:flex;align-items:center;justify-content:center;color:#8B1E2D;font-size:12px;font-weight:800;">✦</div>
                <span style="color:#7A1F2B;font-size:12px;font-weight:800;letter-spacing:1.5px;text-transform:uppercase;">${escapeHtml(s.horoscope)}</span>
              </div>
              <div style="background:#FFFDF8;border:1px solid #D8C7A8;border-radius:10px;overflow:hidden;box-shadow:0 3px 12px rgba(86,56,24,0.07);">
                <table style="width:100%;border-collapse:collapse;">${horoscopeTable}</table>
                <div style="padding:12px 14px 14px;border-top:1px solid #E8DCC8;background:#FBF7EF;color:#4B433B;font-size:12px;line-height:1.6;">${escapeHtml(localizedHoroscope.summary || "")}</div>
              </div>
            </section>
          `;
        })(),
        mkSection(
          s.contact,
          [
            mkRow(s.phone, personalInfo.phone),
            mkRow(s.email, personalInfo.email),
            mkRow(s.website, personalInfo.websiteUrl),
            mkRow(s.linkedin, personalInfo.linkedin),
            mkRow(s.address, profile.address),
          ].join(""),
        ),
        // `<section style="margin:0 28px 24px;break-inside:avoid;page-break-inside:avoid;">
        //   <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px;">
        //     <div style="width:28px;height:28px;border-radius:8px;background:#F4E2B9;border:1px solid #C9A45C;display:flex;align-items:center;justify-content:center;color:#8B1E2D;font-size:12px;font-weight:800;">✦</div>
        //     <span style="color:#7A1F2B;font-size:12px;font-weight:800;letter-spacing:1.5px;text-transform:uppercase;">${escapeHtml(s.photos)}</span>
        //   </div>
        //   <div style="display:flex;gap:16px;align-items:flex-start;">
        //     <div style="flex:1;min-width:0;background:#FFFDF8;border-radius:10px;padding:12px;text-align:center;border:1px solid #D8C7A8;box-shadow:0 3px 12px rgba(86,56,24,0.07);">
        //       <img crossorigin="anonymous" src="${escapeHtml(media.groomPhotos[0].src)}" alt="${escapeHtml(s.groomPhoto)}" style="display:block;width:100%;height:420px;object-fit:cover;border-radius:12px;margin:0 auto;" />
        //       <div style="color:#7A1F2B;font-size:11px;font-weight:700;margin-top:10px;letter-spacing:0.08em;text-transform:uppercase;">${escapeHtml(s.groomPhoto)}</div>
        //     </div>
        //   </div>
        // </section>`,
        `<footer style="text-align:center;padding:14px 28px 24px;color:#8A7A69;font-size:10px;letter-spacing:0.06em;border-top:1px solid #E8DCC8;margin:0 28px;">${escapeHtml(s.footer)}</footer>`,
      ];

      container = document.createElement("div");
      container.style.cssText =
        "position:fixed;left:-10000px;top:0;z-index:-1;pointer-events:none;";
      document.body.appendChild(container);

      const staging = document.createElement("div");
      staging.style.cssText = `position:absolute;left:0;top:0;width:${PAGE_WIDTH}px;font-family:${fontFamily};`;
      staging.innerHTML = sectionsHtml.join("");
      container.appendChild(staging);

      await document.fonts.ready;
      await Promise.all(
        Array.from(staging.querySelectorAll("img")).map((image) =>
          image.complete
            ? Promise.resolve()
            : new Promise<void>((resolve) => {
                image.addEventListener("load", () => resolve(), { once: true });
                image.addEventListener("error", () => resolve(), {
                  once: true,
                });
              }),
        ),
      );

      const createPage = (withHeader: boolean) => {
        const page = document.createElement("div");
        page.className = "pdf-page";
        page.style.cssText = `box-sizing:border-box;width:${PAGE_WIDTH}px;height:${PAGE_HEIGHT}px;padding:28px 0;background:#F7F1E6;color:#3F3A35;font-family:${fontFamily};overflow:hidden;`;
        if (withHeader) page.insertAdjacentHTML("beforeend", headerHtml);
        container?.appendChild(page);
        return page;
      };

      let page = createPage(true);
      const addBlock = (block: Element) => {
        page.appendChild(block);
        const bottomLimit = page.getBoundingClientRect().bottom - 28;
        const marginBottom =
          Number.parseFloat(getComputedStyle(block).marginBottom) || 0;

        if (block.getBoundingClientRect().bottom + marginBottom <= bottomLimit)
          return;

        block.remove();
        page = createPage(false);
        page.appendChild(block);

        const pageBottomLimit = page.getBoundingClientRect().bottom - 28;
        if (
          block.getBoundingClientRect().bottom + marginBottom >
          pageBottomLimit
        ) {
          throw new Error(
            "A biodata section is too large to fit on one PDF page.",
          );
        }
      };

      Array.from(staging.children).forEach(addBlock);
      staging.remove();

      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
        compress: true,
      });
      const pw = doc.internal.pageSize.getWidth();
      const ph = doc.internal.pageSize.getHeight();

      for (const [index, pdfPage] of Array.from(
        container.querySelectorAll<HTMLElement>(".pdf-page"),
      ).entries()) {
        const canvas = await html2canvas(pdfPage, {
          scale: 2,
          useCORS: true,
          backgroundColor: "#F7F1E6",
          logging: false,
        });
        const imgData = canvas.toDataURL("image/jpeg", 0.94);
        if (index > 0) doc.addPage();
        doc.addImage(imgData, "JPEG", 0, 0, pw, ph);
        canvas.width = 0;
        canvas.height = 0;
      }

      if (preview) {
        setPreviewUrl(URL.createObjectURL(doc.output("blob")));
      } else {
        doc.save(`${profile.shortName}_Biodata.pdf`);
        setDone(true);
        setTimeout(() => setDone(false), CONFETTI_DURATION_MS);
      }
    } finally {
      container?.remove();
      setGenerating(false);
    }
  };

  return (
    <section id="pdf" className="section-padding relative overflow-hidden">
      {done && <ConfettiCelebration />}
      <AnimatePresence>
        {previewUrl && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-3 backdrop-blur-sm sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label={t.pdf.btnPreview}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) closePreview();
            }}
          >
            <motion.div
              className="flex h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-[#D8C7A8] bg-[#FFFDF8] shadow-2xl"
              initial={{ y: 16, scale: 0.98 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 16, scale: 0.98 }}
            >
              <div className="flex items-center justify-between gap-4 border-b border-[#D8C7A8] px-4 py-3">
                <h2 className="font-semibold text-[#5F1722]">
                  {t.pdf.cardTitle}
                </h2>
                <button
                  type="button"
                  onClick={closePreview}
                  className="flex h-10 w-10 items-center justify-center rounded-full text-[#5F1722] transition-colors hover:bg-[#F4E2B9]"
                  aria-label={t.gallery.close}
                >
                  <X size={20} />
                </button>
              </div>
              <iframe
                title={t.pdf.cardTitle}
                src={previewUrl}
                className="min-h-0 w-full flex-1 bg-white"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="fixed bottom-6 right-3 z-50 flex items-center gap-2 sm:right-6 sm:gap-3">
        <DownloadActionButton
          floating
          generating={generating}
          done={done}
          label={t.pdf.btnDownload}
          downloadedLabel={t.pdf.btnDownloaded}
          onClick={generatePDF}
        />
        {canPreview && (
          <button
            type="button"
            onClick={() => generatePDF(true)}
            disabled={generating}
            aria-busy={generating}
            className="flex items-center justify-center gap-2 rounded-full border border-[#8B1E2D] px-4 py-3 text-sm font-medium text-[#8B1E2D] shadow-lg shadow-amber-900/10 transition-colors hover:bg-[#F7EEDC] disabled:cursor-wait disabled:opacity-70 sm:px-6"
          >
            <Eye size={16} />
            {t.pdf.btnPreview}
          </button>
        )}
      </div>
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-8 md:mb-12"
        >
          <span className="text-[#8B1E2D] text-sm tracking-widest uppercase font-medium">
            {t.pdf.badge}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#5F1722] mt-2">
            {t.pdf.title}{" "}
            <span className="text-gradient-gold">{t.pdf.titleAccent}</span>
          </h2>
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-[#C9A45C] to-transparent mx-auto mt-4" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl p-5 sm:p-8 text-center bg-[#FFFDF8] border border-[#D8C7A8] shadow-[0_10px_30px_rgba(86,56,24,0.08)]"
        >
          <FileText className="w-16 h-16 text-[#8B1E2D] mx-auto mb-4" />
          <h3
            className="text-[#5F1722] text-xl font-bold mb-2"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            {t.pdf.cardTitle}
          </h3>
          <p className="text-[#66594B] mb-6">{t.pdf.cardDesc}</p>

          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <DownloadActionButton
              onClick={generatePDF}
              generating={generating}
              done={done}
              label={t.pdf.btnDownload}
              downloadedLabel={t.pdf.btnDownloaded}
            />
          </div>

          <p className="text-[#8A7A69] text-xs mt-4">{t.pdf.privacy}</p>
        </motion.div>
      </div>
    </section>
  );
}
