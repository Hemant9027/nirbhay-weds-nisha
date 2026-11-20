import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "../../context/LanguageContext";
import { Divider, Diya } from "./Ornaments";

export default function WeddingMandap() {
  const { t, lang } = useLanguage();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.18, 1.06, 1]);
  const yContent = useTransform(scrollYProgress, [0.15, 0.55], [70, 0]);
  const opacity = useTransform(scrollYProgress, [0.12, 0.42], [0, 1]);

  return (
    <section id="wedding" ref={ref} className="vignette relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-maroon-950">
      {/* mandap backdrop with slow cinematic zoom */}
      <motion.div style={{ scale }} className="absolute inset-0" aria-hidden="true">
        <img
          src="/images/mandap.jpg"
          alt=""
          width={1600}
          height={1200}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-maroon-950/85 via-maroon-950/30 to-maroon-950/90" aria-hidden="true" />
      {/* agni glow */}
      <div
        className="pointer-events-none absolute bottom-[-10%] left-1/2 h-[45vh] w-[85vw] -translate-x-1/2 animate-glow-pulse rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(232,150,60,0.28),transparent_65%)] blur-2xl"
        aria-hidden="true"
      />

      <motion.div
        style={{ y: yContent, opacity }}
        className="relative z-10 mx-auto flex max-w-3xl flex-col items-center px-4 py-20 text-center sm:px-6 sm:py-28"
      >
        <span className="grid h-11 w-11 place-items-center rounded-full border border-gold-500/70 bg-maroon-900/80 font-cinzel text-[0.72rem] text-gold-200 shadow-[0_0_28px_rgba(201,162,39,0.45)]" aria-hidden="true">
          06
        </span>
        <p className="eyebrow mt-4 text-[0.64rem] text-gold-300 sm:mt-6 sm:text-[0.81rem]">{t.weddingEyebrow}</p>
        <h2 className="mt-3 font-display text-4xl font-semibold uppercase leading-tight tracking-[0.05em] text-ivory-100 sm:mt-4 sm:text-7xl">
          {t.weddingTitle}
        </h2>
        <Divider className="mt-4 w-56 sm:mt-6 sm:w-96" />
        <p className="mt-4 font-hindi text-base leading-relaxed text-gold-200 sm:mt-5 sm:text-2xl">
          {lang === "hi" ? "चि० निर्भय पुण्डीर ॥ संग ॥ आयु० निशा तोमर" : "Nirbhay Pundir & Nisha Tomar"}
        </p>
        <p className="gold-text gold-text-animated mt-5 rounded-full border border-gold-500/30 bg-maroon-950/45 px-5 py-2 font-hindi text-2xl font-semibold tracking-normal sm:mt-7 sm:px-7 sm:text-5xl">
          {t.weddingDate}
        </p>
        <p className="mt-6 max-w-xl font-display text-xl italic leading-relaxed text-ivory-200/90 sm:text-2xl">
          {t.weddingQuote}
        </p>
        <div className="mt-10 flex items-center gap-8" aria-hidden="true">
          <Diya className="h-14 w-14 sm:h-16 sm:w-16" />
          <Diya className="h-20 w-20 sm:h-24 sm:w-24" />
          <Diya className="h-14 w-14 sm:h-16 sm:w-16" />
        </div>
      </motion.div>
    </section>
  );
}
