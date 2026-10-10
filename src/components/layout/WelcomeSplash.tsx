import { useLanguage } from "../../context/LanguageContext";

export default function WelcomeSplash({ onDone }: { onDone: () => void }) {
  const { setLang, t } = useLanguage();
  const isFirstVisit = !localStorage.getItem("biodata-lang");

  if (!isFirstVisit) return null;

  function pickLang(lang: "en" | "mr") {
    setLang(lang);
    onDone();
  }

  return (
    <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#0B1120]">
      <div className="flex flex-col items-center gap-6 px-6 text-center">
        <p className="text-amber-400 text-lg tracking-[0.3em] uppercase font-medium">
          {t.splash.selectLang}
        </p>
        <p className="text-gray-400 text-sm">{t.splash.selectPrompt}</p>
        <div className="flex gap-4 mt-2">
          <button
            onClick={() => pickLang("en")}
            className="px-8 py-3 rounded-full border border-amber-400/50 text-amber-400 font-semibold hover:bg-amber-400/10 transition-colors duration-200"
          >
            🇬🇧 {t.splash.btnEnglish}
          </button>
          <button
            onClick={() => pickLang("mr")}
            className="px-8 py-3 rounded-full border border-orange-400/50 text-orange-400 font-semibold hover:bg-orange-400/10 transition-colors duration-200"
            style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
          >
            🇮🇳 {t.splash.btnMarathi}
          </button>
        </div>
      </div>
    </div>
  );
}
