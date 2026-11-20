import { useLanguage } from "../../context/LanguageContext";

export default function LanguageSwitcher() {
  const { lang, setLang, t } = useLanguage();
  return (
    <div
      role="group"
      aria-label={t.langLabel}
      className="fixed right-2.5 top-2.5 z-[85] flex items-center overflow-hidden rounded-full border border-gold-500/50 bg-maroon-900/80 shadow-[0_8px_30px_-10px_rgba(0,0,0,0.6)] backdrop-blur-md sm:right-4 sm:top-4"
    >
      {(["en", "hi"] as const).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={`px-3 py-1.5 text-[0.65rem] tracking-[0.12em] transition-all duration-300 sm:px-4 sm:py-2 sm:text-xs ${
            l === "hi" ? "font-hindi text-xs sm:text-[0.95rem]" : "font-cinzel"
          } ${
            lang === l
              ? "bg-gradient-to-b from-gold-400 to-gold-600 text-maroon-900"
              : "text-gold-300/80 hover:text-gold-200"
          }`}
        >
          {l === "en" ? "EN" : "हिंदी"}
        </button>
      ))}
    </div>
  );
}
