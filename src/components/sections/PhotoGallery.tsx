import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

// Using Unsplash curated images for placeholder gallery
const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?w=400&q=80",
    category: "Professional Life",
    alt: "Profile",
  },
  {
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    category: "Professional Life",
    alt: "Professional",
  },
  {
    src: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&q=80",
    category: "Travel",
    alt: "Travel",
  },
  {
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
    category: "Travel",
    alt: "Mountains",
  },
  {
    src: "https://images.unsplash.com/photo-1517697471339-4aa32003c11a?w=400&q=80",
    category: "Family",
    alt: "Family gathering",
  },
  {
    src: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&q=80",
    category: "College Days",
    alt: "College",
  },
  {
    src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80",
    category: "Fitness",
    alt: "Gym",
  },
  {
    src: "https://images.unsplash.com/photo-1524293581917-878a6d017c71?w=600&q=80",
    category: "Travel",
    alt: "Landscape",
  },
  {
    src: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=400&q=80",
    category: "Professional Life",
    alt: "Tech setup",
  },
];

const uniqueCategories = Array.from(
  new Set(galleryImages.map((g) => g.category))
);

export default function PhotoGallery() {
  const { t } = useLanguage();
  const [active, setActive] = useState<string>("All");
  const [lightbox, setLightbox] = useState<string | null>(null);

  const filtered =
    active === "All"
      ? galleryImages
      : galleryImages.filter((g) => g.category === active);
  const catLabel = (key: string) =>
    key === "All"
      ? t.gallery.all
      : (t.gallery.categories as Record<string, string>)[key] ?? key;

  return (
    <section id="gallery" className="section-padding relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-8 md:mb-12"
          style={{ marginBottom: "40px" }}
        >
          <span className="text-amber-400 text-sm tracking-widest uppercase font-medium">
            {t.gallery.badge}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-2">
            {t.gallery.title}{" "}
            <span className="text-gradient-gold">{t.gallery.titleAccent}</span>
          </h2>
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mt-4" />
        </motion.div>

        {/* Category filters */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          // viewport={{ once: true }}
          className="flex flex-wrap gap-2 justify-center mb-5 md:mb-8"
          style={{ marginBottom: "15px" }}
        >
          {["All", ...uniqueCategories].map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                active === cat
                  ? "bg-amber-400 text-navy"
                  : "glass text-gray-300 hover:text-white hover:border-white/20"
              }`}
              style={{ color: active === cat ? "#0B1120" : undefined }}
            >
              {catLabel(cat)}
            </button>
          ))}
        </motion.div>

        {/* Masonry grid */}
        <div className="gallery-grid">
          {filtered.map((img, i) => (
            <motion.div
              key={img.src}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="gallery-item cursor-pointer group"
              onClick={() => setLightbox(img.src)}
            >
              <div className="relative overflow-hidden rounded-2xl">
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                  <span className="text-xs text-white font-medium">
                    {(t.gallery.categories as Record<string, string>)[
                      img.category
                    ] ?? img.category}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] bg-black/90 flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <motion.img
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              src={lightbox}
              alt="Gallery"
              className="max-h-[85vh] max-w-full rounded-2xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-4 right-4 glass rounded-full p-2 text-white hover:text-amber-400 transition-colors"
            >
              <X size={20} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
