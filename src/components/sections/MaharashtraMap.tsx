import { motion } from "framer-motion";
import { useLanguage } from "../../context/LanguageContext";

// Simple SVG-based Maharashtra map with markers
const NAGPUR = { x: 72, y: 36 };
const PUNE = { x: 28, y: 58 };

export default function MaharashtraMap() {
  const { t } = useLanguage();
  return (
    <section id="map" className="section-padding relative overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-10 md:mb-16"
        >
          <span className="text-amber-400 text-sm tracking-widest uppercase font-medium">
            {t.map.badge}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-2">
            {t.map.title}{" "}
            <span className="text-gradient-gold">{t.map.titleAccent}</span>
          </h2>
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mt-4" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-8 items-center">
          {/* Map visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            // viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="glass rounded-3xl p-6 aspect-square flex items-center justify-center relative"
          >
            <svg
              viewBox="0 0 100 80"
              className="w-full h-full"
              style={{ maxHeight: "400px" }}
            >
              {/* Simple Maharashtra outline approximation */}
              <path
                d="M15 20 L22 10 L35 8 L50 12 L65 8 L80 15 L88 22 L90 35 L85 45 L88 55 L80 65 L70 70 L55 72 L40 68 L25 72 L15 65 L8 52 L10 38 Z"
                fill="rgba(37,99,235,0.08)"
                stroke="rgba(37,99,235,0.4)"
                strokeWidth="0.8"
              />

              {/* Route line */}
              <motion.line
                x1={NAGPUR.x}
                y1={NAGPUR.y}
                x2={PUNE.x}
                y2={PUNE.y}
                stroke="url(#routeGrad)"
                strokeWidth="1.5"
                strokeDasharray="3 2"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                // viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 0.5 }}
              />
              <defs>
                <linearGradient
                  id="routeGrad"
                  x1={NAGPUR.x}
                  y1={NAGPUR.y}
                  x2={PUNE.x}
                  y2={PUNE.y}
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0%" stopColor="#F59E0B" />
                  <stop offset="100%" stopColor="#3B82F6" />
                </linearGradient>
              </defs>

              {/* Nagpur marker */}
              <motion.g
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                // viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 }}
                style={{ transformOrigin: `${NAGPUR.x}px ${NAGPUR.y}px` }}
              >
                <circle
                  cx={NAGPUR.x}
                  cy={NAGPUR.y}
                  r="4"
                  fill="#F59E0B"
                  opacity="0.3"
                >
                  <animate
                    attributeName="r"
                    values="4;8;4"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="0.3;0;0.3"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </circle>
                <circle cx={NAGPUR.x} cy={NAGPUR.y} r="3" fill="#F59E0B" />
                <text
                  x={NAGPUR.x + 5}
                  y={NAGPUR.y - 3}
                  fill="#FCD34D"
                  fontSize="5"
                  fontFamily="Inter,sans-serif"
                >
                  Nagpur
                </text>
                <text
                  x={NAGPUR.x + 5}
                  y={NAGPUR.y + 3}
                  fill="#9CA3AF"
                  fontSize="3.5"
                  fontFamily="Inter,sans-serif"
                >
                  Native
                </text>
              </motion.g>

              {/* Pune marker */}
              <motion.g
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                // viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.7 }}
                style={{ transformOrigin: `${PUNE.x}px ${PUNE.y}px` }}
              >
                <circle
                  cx={PUNE.x}
                  cy={PUNE.y}
                  r="4"
                  fill="#3B82F6"
                  opacity="0.3"
                >
                  <animate
                    attributeName="r"
                    values="4;8;4"
                    dur="2s"
                    repeatCount="indefinite"
                    begin="1s"
                  />
                  <animate
                    attributeName="opacity"
                    values="0.3;0;0.3"
                    dur="2s"
                    repeatCount="indefinite"
                    begin="1s"
                  />
                </circle>
                <circle cx={PUNE.x} cy={PUNE.y} r="3" fill="#3B82F6" />
                <text
                  x={PUNE.x + 5}
                  y={PUNE.y - 3}
                  fill="#93C5FD"
                  fontSize="5"
                  fontFamily="Inter,sans-serif"
                >
                  Pune
                </text>
                <text
                  x={PUNE.x + 5}
                  y={PUNE.y + 3}
                  fill="#9CA3AF"
                  fontSize="3.5"
                  fontFamily="Inter,sans-serif"
                >
                  Current
                </text>
              </motion.g>
            </svg>
          </motion.div>

          {/* Info cards */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              // viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="glass-gold rounded-2xl p-6"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-4 h-4 rounded-full bg-amber-400 animate-pulse-glow" />
                <span className="text-amber-400 font-bold uppercase text-sm tracking-wider">
                  {t.map.nativeBadge}
                </span>
              </div>
              <h3
                className="text-white text-2xl font-bold"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                {t.map.nativeCity}
              </h3>
              <p className="text-gray-300 mt-2 text-sm">{t.map.nativeDesc}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              // viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="glass rounded-2xl p-6"
              style={{ border: "1px solid rgba(59,130,246,0.3)" }}
            >
              <div className="flex items-center gap-3 mb-2">
                <div
                  className="w-4 h-4 rounded-full bg-blue-500"
                  style={{ boxShadow: "0 0 12px #3B82F6" }}
                />
                <span className="text-blue-400 font-bold uppercase text-sm tracking-wider">
                  {t.map.currentBadge}
                </span>
              </div>
              <h3
                className="text-white text-2xl font-bold"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                {t.map.currentCity}
              </h3>
              <p className="text-gray-300 mt-2 text-sm">{t.map.currentDesc}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              // viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="glass rounded-2xl p-4 text-center"
            >
              <p className="text-gray-400 text-sm">Journey of</p>
              <p
                className="text-2xl font-bold text-gradient-gold"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                {t.map.distance}
              </p>
              <p className="text-gray-400 text-sm">{t.map.distanceLabel}</p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
