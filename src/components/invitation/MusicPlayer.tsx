import { motion } from "framer-motion";
import { Music } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

export default function MusicPlayer({ playing, onToggle }: { playing: boolean; onToggle: () => void }) {
  const { t } = useLanguage();
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      onClick={onToggle}
      aria-pressed={playing}
      aria-label={playing ? t.musicOn : t.musicOff}
      title={playing ? t.musicOn : t.musicOff}
      className={`fixed bottom-[4.25rem] left-2.5 z-[60] grid h-10 w-10 place-items-center rounded-full border shadow-[0_10px_30px_-8px_rgba(0,0,0,0.6)] backdrop-blur-md transition-all duration-300 sm:h-12 sm:w-12 md:bottom-6 md:left-6 ${
        playing
          ? "border-gold-400/80 bg-gradient-to-b from-gold-400 to-gold-600 text-maroon-900"
          : "border-gold-500/40 bg-maroon-900/80 text-gold-300 hover:border-gold-400/70"
      }`}
    >
      {playing ? (
        <span className="flex h-4 items-end gap-[3px]" aria-hidden="true">
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className="w-[3px] origin-bottom animate-eq rounded-full bg-maroon-900"
              style={{ height: "100%", animationDelay: `${i * 0.18}s` }}
            />
          ))}
        </span>
      ) : (
        <Music className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
      )}
      {playing && (
        <span className="absolute -inset-1 -z-10 animate-glow-pulse rounded-full bg-gold-500/25" aria-hidden="true" />
      )}
    </motion.button>
  );
}
