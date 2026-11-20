import { motion } from "framer-motion";
import { useCountdown } from "../../hooks/useCountdown";
import { useLanguage } from "../../context/LanguageContext";
import { Divider, Diya, Sparkle } from "./Ornaments";

function Unit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="gold-frame grid h-16 w-16 place-items-center rounded-xl bg-ivory-50 shadow-[0_14px_38px_-14px_rgba(66,16,22,0.4)] sm:h-24 sm:w-24">
        <span className="font-cinzel text-xl font-semibold tabular-nums text-maroon-800 sm:text-4xl">
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <span className="eyebrow text-[0.56rem] text-gold-700 sm:text-[0.66rem]">{label}</span>
    </div>
  );
}

export default function Countdown() {
  const { t, lang } = useLanguage();
  const { days, hours, minutes, seconds, over } = useCountdown();

  return (
    <section className="paper grain relative overflow-hidden px-6 py-20 sm:py-28" aria-live="polite">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-90px" }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto flex max-w-3xl flex-col items-center text-center"
      >
        <h2 className="font-display text-3xl font-semibold italic text-maroon-800 sm:text-5xl">{t.countdownTitle}</h2>
        <Divider className="mt-5 w-56 sm:w-72" />

        {over ? (
          <div className="mt-10 flex flex-col items-center gap-5">
            <Diya className="h-20 w-20" />
            <p className="gold-text font-cinzel text-2xl tracking-[0.1em] sm:text-4xl">{t.countdownOver}</p>
          </div>
        ) : (
          <>
            <p className="mt-3 font-hindi text-lg text-gold-700">{lang === "hi" ? "मंगल बेला आने को है…" : "The auspicious hour is near…"}</p>
            <div className="mt-8 flex items-start justify-center gap-1.5 sm:mt-10 sm:gap-6">
              <Unit value={days} label={t.days} />
              <Sparkle className="mt-6 h-4 w-4 shrink-0 text-gold-500 sm:mt-9" aria-hidden="true" />
              <Unit value={hours} label={t.hours} />
              <Sparkle className="mt-6 h-4 w-4 shrink-0 text-gold-500 sm:mt-9" aria-hidden="true" />
              <Unit value={minutes} label={t.minutes} />
              <Sparkle className="mt-6 h-4 w-4 shrink-0 text-gold-500 sm:mt-9" aria-hidden="true" />
              <Unit value={seconds} label={t.seconds} />
            </div>
            <p className="mt-7 font-hindi text-base text-maroon-800 sm:text-xl">{lang === "hi" ? "शुभ विवाह — 11 दिसंबर 2026" : "Wedding — 11 December 2026"}</p>
          </>
        )}
      </motion.div>
    </section>
  );
}
