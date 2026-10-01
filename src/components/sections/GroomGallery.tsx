import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import { media } from "../../data/siteContent";
import { useLanguage } from "../../context/LanguageContext";

export default function GroomGallery() {
  const { t } = useLanguage();
  const photos = media.groomPhotos;
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const close = () => {
    setOpen(false);
    requestAnimationFrame(() => triggerRef.current?.focus());
  };

  const previous = () =>
    setActive((current) => (current - 1 + photos.length) % photos.length);
  const next = () => setActive((current) => (current + 1) % photos.length);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowLeft") previous();
      if (event.key === "ArrowRight") next();
    };

    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  const photo = photos[active];

  return (
    <section id="gallery" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute left-1/2 top-1/2 w-[32rem] h-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-400/10 blur-[120px]" />
      </div>

      <div className="relative max-w-6xl mx-auto">
        <motion.header
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-10 md:mb-14"
        >
          <span className="text-amber-400 text-sm tracking-widest uppercase font-medium">
            {t.gallery.badge}
          </span>
          <h2 className="text-4xl md:text-6xl font-bold text-white mt-2">
            {t.gallery.title}{" "}
            <span className="text-gradient-gold">{t.gallery.titleAccent}</span>
          </h2>
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mt-4" />
          <p className="text-gray-400 leading-7 text-base md:text-lg mt-5">
            {t.gallery.description}
          </p>
        </motion.header>

        <div className="relative max-w-5xl mx-auto">
          <div className="gallery-spotlight-shell">
            <div className="gallery-spotlight-backdrop" aria-hidden="true" />
            <button
              ref={triggerRef}
              type="button"
              onClick={() => setOpen(true)}
              className="gallery-spotlight group"
              aria-label={`${t.gallery.open}: ${t.gallery.photoAlt}`}
            >
              <img
                src={photo.src}
                alt={t.gallery.photoAlt}
                className="gallery-spotlight-image"
                loading="eager"
              />
              <span className="gallery-spotlight-overlay" />
              <span className="gallery-spotlight-content">
                <span className="inline-flex items-center gap-2 rounded-full bg-black/45 border border-white/15 px-4 py-2 text-sm text-white backdrop-blur-md">
                  <Maximize2 size={15} />
                  {t.gallery.open}
                </span>
                <span className="block mt-3 text-white font-medium">
                  {t.gallery.title}
                </span>
                <span className="block mt-1 text-gray-300 text-xs">
                  {active + 1} / {photos.length} {t.gallery.photoCount}
                </span>
              </span>
            </button>
          </div>

          {photos.length > 1 && (
            <div className="flex gap-3 mt-4 overflow-x-auto pb-2 justify-center">
              {photos.map((item, index) => (
                <button
                  key={item.src}
                  type="button"
                  onClick={() => setActive(index)}
                  className={`gallery-thumbnail ${
                    active === index ? "gallery-thumbnail-active" : ""
                  }`}
                  aria-label={`${t.gallery.open}: ${t.gallery.photoAlt}`}
                  aria-current={active === index}
                >
                  <img src={item.src} alt="" loading="lazy" />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[100] bg-[#050814]/95 backdrop-blur-xl p-4 sm:p-8 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label={t.gallery.photoAlt}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) close();
            }}
          >
            <button
              type="button"
              onClick={close}
              className="absolute right-4 top-4 sm:right-8 sm:top-8 w-11 h-11 rounded-full glass flex items-center justify-center text-white hover:text-amber-400 transition-colors"
              aria-label={t.gallery.close}
            >
              <X size={20} />
            </button>

            {photos.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={previous}
                  className="absolute left-3 sm:left-8 w-11 h-11 rounded-full glass flex items-center justify-center text-white hover:text-amber-400"
                  aria-label={t.gallery.previous}
                >
                  <ChevronLeft size={22} />
                </button>
                <button
                  type="button"
                  onClick={next}
                  className="absolute right-3 sm:right-8 w-11 h-11 rounded-full glass flex items-center justify-center text-white hover:text-amber-400"
                  aria-label={t.gallery.next}
                >
                  <ChevronRight size={22} />
                </button>
              </>
            )}

            <motion.figure
              key={photo.src}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-6xl max-h-[88vh] text-center"
            >
              <img
                src={photo.src}
                alt={t.gallery.photoAlt}
                className="max-h-[78vh] max-w-[92vw] object-contain rounded-2xl shadow-2xl mx-auto"
              />
              <figcaption className="mt-4 text-gray-300 text-sm">
                {t.gallery.title} · {active + 1} / {photos.length}
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
