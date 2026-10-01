import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "../../context/LanguageContext";
import { media } from "../../data/siteContent";
import { marathiContent } from "../../data/marathiContent";

export default function DayInLife() {
  const { t, isMarathi } = useLanguage();
  const items = isMarathi ? marathiContent.dayInLife : t.dayInLife.items;

  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const horizontalViewportRef = useRef<HTMLDivElement>(null);

  const [trackWidth, setTrackWidth] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);

  // Track resizing dynamically to get exact pixel widths for the translation
  useEffect(() => {
    const handleResize = () => {
      setViewportHeight(window.innerHeight);
      setViewportWidth(horizontalViewportRef.current?.clientWidth ?? 0);
      if (trackRef.current) {
        setTrackWidth(trackRef.current.scrollWidth);
      }
    };

    // Initial calculation
    handleResize();

    // Fallback timeout to ensure DOM has completely rendered elements
    const timer = setTimeout(handleResize, 500);

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timer);
    };
  }, [items]);

  // Hook into scroll container
  const { scrollYProgress } = useScroll({
    target: sectionRef,
  });

  // Calculate the exact translation limit: Total width of cards minus visible screen space + padding
  const horizontalDistance = Math.max(0, trackWidth - viewportWidth);
  // The sticky interval is exactly the amount of vertical scroll needed to
  // move the track through all cards, then release back to normal scrolling.
  const sectionHeight = viewportHeight + horizontalDistance;

  // Map vertical scroll progress (0 to 1) directly to horizontal pixel shift
  const x = useTransform(scrollYProgress, [0, 1], [0, -horizontalDistance]);

  return (
    <section
      ref={sectionRef}
      id="dayinlife"
      className="relative block" // Ensures it behaves as a block anchor for sticky positioning
      style={{ height: `${sectionHeight || window.innerHeight}px` }} // One viewport + horizontal travel distance
    >
      {/* Sticky box: This catches the screen viewport and locks it */}
      <div className="sticky top-0 left-0 h-screen w-full overflow-hidden flex flex-col justify-center bg-transparent">
        {/* Header */}
        <div className="text-center mb-8 px-4 sm:px-6 z-10">
          <span className="text-amber-400 text-sm tracking-widest uppercase font-medium block">
            {t.dayInLife.badge}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-2">
            {t.dayInLife.title}{" "}
            <span className="text-gradient-gold">
              {t.dayInLife.titleAccent}
            </span>
          </h2>
        </div>

        {/* Horizontal Scroll Window */}
        <div ref={horizontalViewportRef} className="w-full overflow-hidden px-4 sm:px-8 lg:px-16">
          <motion.div
            ref={trackRef}
            style={{ x }} // Framer motion optimizes this translation via hardware acceleration
            className="flex gap-6 w-max"
          >
            {items.map((item, i) => (
              <div
                key={i}
                className="glass rounded-3xl p-4 sm:p-5 flex-shrink-0 w-72 sm:w-80 md:w-96"
                style={{ borderTop: `3px solid ${item.color}` }}
              >
                <div className="relative h-36 sm:h-40 rounded-2xl overflow-hidden mb-5">
                  <img
                    src={media.dayInLifePhotos[i % media.dayInLifePhotos.length]}
                    alt=""
                    className="w-full h-full object-cover object-center"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120]/80 via-transparent to-transparent" />
                  <div className="absolute left-4 bottom-3 text-3xl">{item.icon}</div>
                </div>
                <div
                  className="text-xs font-bold mb-1 uppercase tracking-wider"
                  style={{ color: item.color }}
                >
                  {item.time}
                </div>
                <h4
                  className="text-white font-bold text-lg mb-2"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  {item.title}
                </h4>
                <p className="text-gray-300 text-sm leading-7">
                  {item.description}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Progress bar */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-48 h-1 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-600 to-amber-400 rounded-full"
            style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
          />
        </div>
      </div>
    </section>
  );
}
