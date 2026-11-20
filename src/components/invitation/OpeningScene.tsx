import { motion } from "framer-motion";
import { useLanguage } from "../../context/LanguageContext";
import { Diya, Divider, Sparkle } from "./Ornaments";

const EASE_ROYAL = [0.76, 0, 0.24, 1] as const;

export default function OpeningScene({ onOpen }: { onOpen: () => void }) {
  const { t, lang } = useLanguage();

  return (
    <motion.div
      className="fixed inset-0 z-[70] overflow-hidden royal-dark grain"
      role="dialog"
      aria-modal="true"
      aria-label="Wedding invitation — open"
      exit={{ opacity: 0, scale: 1.035, transition: { duration: 0.9, ease: "easeInOut" } }}
    >
      {/* golden dust */}
      {Array.from({ length: 16 }).map((_, i) => (
        <span
          key={i}
          className="absolute z-30 block rounded-full bg-gold-300 animate-twinkle"
          style={{
            width: `${2 + (i % 3)}px`,
            height: `${2 + (i % 3)}px`,
            left: `${(i * 61) % 100}%`,
            top: `${(i * 37 + 11) % 100}%`,
            animationDelay: `${(i % 7) * 0.45}s`,
          }}
          aria-hidden="true"
        />
      ))}

      {/* ===== BACKGROUND (revealed world) — sits behind the curtains ===== */}
      <div className="absolute inset-0 z-0 flex h-full flex-col items-center justify-center gap-2 overflow-y-auto px-4 pb-24 pt-16 text-center sm:gap-4 sm:pb-32 sm:pt-20">
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="flex shrink-0 flex-col items-center"
        >
          <img
            src="/images/ganesh-ji-transparent.png"
            alt="Lord Ganesha"
            width={556}
            height={612}
            className="h-36 w-32 object-contain drop-shadow-[0_8px_20px_rgba(201,162,39,0.32)] sm:h-48 sm:w-40"
          />
          <p className="mt-1 font-hindi text-lg leading-tight text-gold-300 sm:text-2xl">
            ॥ श्री गणेशाय नमः ॥
          </p>
          <p className="mt-0.5 max-w-[20rem] font-hindi text-base leading-tight text-gold-200/90 sm:max-w-[28rem] sm:text-lg">
            {lang === "hi"
              ? "विघ्न हरण मंगल करण, श्री गणपति जी महाराज।"
              : "Remover of obstacles and granter of auspicious beginnings."}
          </p>
        </motion.div>

        <div>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.75, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-[clamp(1.75rem,7.2vw,3.75rem)] font-semibold uppercase leading-[1.08] tracking-[0.04em] text-ivory-100"
          >
            <span className={`block ${lang === "hi" ? "font-hindi" : "font-display"}`}>
              {lang === "hi" ? "चि० निर्भय पुण्डीर" : "Nirbhay Pundir"}
            </span>
            <span className="my-1 block font-hindi text-[0.48em] text-gold-400">
              {lang === "hi" ? "॥ संग ॥" : "WEDS"}
            </span>
            <span className={`block ${lang === "hi" ? "font-hindi" : "font-display"}`}>
              {lang === "hi" ? "आयु० निशा तोमर" : "Nisha Tomar"}
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.25, duration: 0.9 }}
            className="mt-2 flex flex-col items-center gap-1"
          >
            <p className="font-hindi text-3xl text-gold-300 sm:text-5xl">{lang === "hi" ? "॥ शुभ विवाह ॥" : "Wedding Invitation"}</p>
            <Divider className="w-44 sm:w-72" />
            <p className="mt-1 font-hindi text-xl text-gold-300 sm:text-3xl">{lang === "hi" ? "शुक्रवार, 11 दिसंबर 2026" : "Friday, 11 December 2026"}</p>
            <p className="font-hindi text-xl text-ivory-200/90 sm:text-3xl">{lang === "hi" ? "किसान फार्म हाउस" : "Kisan Farm House"}</p>
          </motion.div>
        </div>
      </div>

      {/* ===== THE ROYAL CURTAINS ===== */}
      <motion.div
        className="absolute inset-y-0 left-0 right-1/2 z-20 pattern-lattice border-r-2 border-gold-500/80 bg-maroon-850"
        initial={{ x: 0 }}
        animate={{ x: "-102%" }}
        transition={{ delay: 1.15, duration: 1.9, ease: EASE_ROYAL }}
        aria-hidden="true"
      >
        <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-gold-500/15 to-transparent" />
      </motion.div>
      <motion.div
        className="absolute inset-y-0 left-1/2 right-0 z-20 pattern-lattice border-l-2 border-gold-500/80 bg-maroon-850"
        initial={{ x: 0 }}
        animate={{ x: "102%" }}
        transition={{ delay: 1.15, duration: 1.9, ease: EASE_ROYAL }}
        aria-hidden="true"
      >
        <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-gold-500/15 to-transparent" />
      </motion.div>

      {/* ===== FOREGROUND: blessing line, diya, CTA ===== */}
      <div className="absolute inset-x-0 bottom-0 z-30 flex justify-center px-4 pb-5 sm:px-6 sm:pb-9">
        <div className="grid place-items-center">
          {/* the diya glows first, then bows out for the CTA */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: [0, 1, 1, 0], y: [18, 0, 0, -12] }}
            transition={{ duration: 3.9, times: [0, 0.14, 0.82, 1], delay: 0.35 }}
            className="col-start-1 row-start-1"
            aria-hidden="true"
          >
            <Diya className="h-14 w-14 sm:h-20 sm:w-20" />
          </motion.div>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.75, duration: 0.85 }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={onOpen}
            className="btn-gold pointer-events-auto col-start-1 row-start-1 px-6 py-3 text-[0.68rem] sm:px-9 sm:py-4 sm:text-sm"
            autoFocus
          >
            <span className="relative block">
              {t.openCta}
              <span className="mt-0.5 block font-hindi text-[0.7rem] normal-case tracking-[0.2em] opacity-80">
                {lang === "hi" ? "View Wedding Programs" : "मांगलिक कार्यक्रम देखें"}
              </span>
            </span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
