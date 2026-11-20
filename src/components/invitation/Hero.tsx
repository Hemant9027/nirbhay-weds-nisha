import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { Corner, Divider, Marigold } from "./Ornaments";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.16, delayChildren: 0.55 } },
};
const item = {
  hidden: { opacity: 0, y: 34 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function Hero({ opened }: { opened: boolean }) {
  const { t, lang } = useLanguage();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yText = useTransform(scrollYProgress, [0, 1], [0, -45]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section
      id="home"
      ref={ref}
      className="paper grain relative flex min-h-[100svh] flex-col items-center overflow-hidden px-6 pb-20 pt-14 text-center sm:pt-16"
    >
      {/* corner flourishes */}
      <Corner className="pointer-events-none absolute left-2 top-2 h-20 w-20 opacity-70 sm:left-5 sm:top-5 sm:h-28 sm:w-28" />
      <Corner className="pointer-events-none absolute right-2 top-2 h-20 w-20 opacity-70 sm:right-5 sm:top-5 sm:h-28 sm:w-28" flip />
      <Corner className="pointer-events-none absolute bottom-2 left-2 h-20 w-20 rotate-[270deg] opacity-50 sm:bottom-5 sm:left-5 sm:h-28 sm:w-28" />
      <Corner className="pointer-events-none absolute bottom-2 right-2 h-20 w-20 rotate-180 opacity-50 sm:bottom-5 sm:right-5 sm:h-28 sm:w-28" />

      {/* hanging marigold strings */}
      <div className="pointer-events-none absolute left-[6%] top-0 hidden animate-sway flex-col items-center gap-1 opacity-80 md:flex" style={{ transformOrigin: "top center" }} aria-hidden="true">
        <span className="h-8 w-px bg-gold-600/50" />
        {[0, 1, 2].map((i) => (
          <Marigold key={i} className={`h-5 w-5 ${i === 2 ? "scale-125" : ""}`} />
        ))}
      </div>
      <div className="pointer-events-none absolute right-[6%] top-0 hidden animate-sway flex-col items-center gap-1 opacity-80 md:flex" style={{ transformOrigin: "top center", animationDelay: "1.4s" }} aria-hidden="true">
        <span className="h-12 w-px bg-gold-600/50" />
        {[0, 1, 2].map((i) => (
          <Marigold key={i} className={`h-5 w-5 ${i === 2 ? "scale-125" : ""}`} />
        ))}
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate={opened ? "show" : "hidden"}
        className="relative z-10 flex w-full max-w-4xl flex-col items-center"
        style={{ opacity }}
      >
        <motion.div variants={item} className="mb-1 flex flex-col items-center">
          <img
            src="/images/ganesh-ji-transparent.png"
            alt="Lord Ganesha"
            width={556}
            height={612}
            className="h-20 w-[72px] object-contain drop-shadow-[0_8px_18px_rgba(201,162,39,0.28)] sm:h-24 sm:w-20"
          />
          <p className="mt-1 font-hindi text-sm text-gold-700 sm:text-base">
            ॥ श्री गणेशाय नमः ॥
          </p>
        </motion.div>

        <motion.p variants={item} className="eyebrow text-lg tracking-normal text-gold-700 sm:text-2xl">
          {t.withBlessings}
        </motion.p>

        <motion.div variants={item} style={{ y: yText }}>
          <h1 className="mt-16 font-display font-semibold uppercase leading-[1.02] tracking-[0.06em] text-maroon-800 sm:mt-20">
            <span className="block font-hindi text-[clamp(1.95rem,8.8vw,5rem)]">{lang === "hi" ? "चि० निर्भय पुण्डीर" : "Nirbhay Pundir"}</span>
            <span className="my-1 block font-hindi text-[clamp(0.85rem,2.6vw,1.45rem)] tracking-normal text-gold-600 sm:my-2">{lang === "hi" ? "॥ संग ॥" : "WEDS"}</span>
            <span className="mt-6 block font-hindi text-[clamp(1.95rem,8.8vw,5rem)] sm:mt-7">{lang === "hi" ? "आयु० निशा तोमर" : "Nisha Tomar"}</span>
          </h1>
        </motion.div>

        <motion.p variants={item} className="mt-4 font-display text-lg italic text-brown-800/85 sm:text-2xl">
          {t.heroTagline}
        </motion.p>

        <motion.div variants={item} className="mt-5">
          <Divider className="w-64 sm:w-80" />
        </motion.div>

        {/* date seal */}
        <motion.div variants={item} className="mt-10 sm:mt-12">
          <div className="inline-flex flex-col items-center rounded-2xl gold-frame bg-ivory-50/80 px-8 py-5 shadow-[0_16px_50px_-18px_rgba(66,16,22,0.45)] sm:px-12">
            <span className="font-hindi text-[1.05rem] tracking-normal text-maroon-800 sm:text-lg">{t.heroDate}</span>
            <span className="mt-2 h-px w-24 bg-gradient-to-r from-transparent via-gold-500 to-transparent" aria-hidden="true" />
            <span className="mt-2 font-hindi text-xl text-gold-700 sm:text-2xl">॥ {t.shubhVivah} ॥</span>
          </div>
        </motion.div>
      </motion.div>

      {/* scroll cue */}
      <motion.a
        href="#story"
        initial={{ opacity: 0 }}
        animate={opened ? { opacity: 1 } : {}}
        transition={{ delay: 2.2, duration: 1 }}
        className="absolute bottom-4 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 rounded-full text-maroon-700/90 sm:bottom-6"
        aria-label={t.scroll}
      >
        <span className="rounded-full border border-gold-600/50 bg-ivory-50/90 px-4 py-1.5 font-hindi text-[0.72rem] font-semibold shadow-[0_8px_24px_-12px_rgba(66,16,22,0.5)] backdrop-blur-sm sm:px-5 sm:text-sm">
          {lang === "hi" ? "नीचे स्क्रॉल करें" : "Scroll Down"}
        </span>
        <span className="relative grid h-12 w-12 place-items-center rounded-full border-2 border-gold-500/70 bg-maroon-800/90 shadow-[0_0_24px_rgba(201,162,39,0.28),0_12px_30px_-10px_rgba(66,16,22,0.55)] sm:h-14 sm:w-14" aria-hidden="true">
          <span className="absolute inset-1 animate-glow-pulse rounded-full border border-gold-300/30" />
          <ChevronDown className="h-7 w-7 animate-bounce text-gold-200 sm:h-8 sm:w-8" />
        </span>
      </motion.a>
    </section>
  );
}
