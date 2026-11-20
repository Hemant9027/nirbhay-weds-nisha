import { motion } from "framer-motion";
import { useLanguage } from "../../context/LanguageContext";
import { Divider, Diya, Sparkle } from "./Ornaments";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] as const } },
};

function NameMedallion({ name, label, delay }: { name: string; label: string; delay: number }) {
  return (
    <motion.div
      variants={fadeUp}
      transition={{ delay }}
      className="flex min-w-0 flex-1 flex-col items-center gap-2 sm:flex-none sm:gap-3"
    >
      <div className="relative grid h-16 w-16 place-items-center rounded-full border border-gold-500/60 bg-ivory-50 shadow-[0_10px_34px_-12px_rgba(66,16,22,0.4)] sm:h-28 sm:w-28">
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full animate-spin-slow" aria-hidden="true">
          <circle cx="50" cy="50" r="46" fill="none" stroke="#c9a227" strokeWidth="1" strokeDasharray="2 7" opacity="0.8" />
        </svg>
        <span className="font-cinzel text-2xl gold-text sm:text-5xl">N</span>
      </div>
      <div className="text-center">
        <p className="font-hindi text-sm font-semibold leading-tight tracking-normal text-maroon-800 sm:text-2xl">{name}</p>
        <p className="eyebrow mt-0.5 text-[0.52rem] text-gold-700 sm:mt-1 sm:text-[0.69rem]">{label}</p>
      </div>
    </motion.div>
  );
}

export default function CoupleStory() {
  const { t, lang } = useLanguage();
  return (
    <section id="story" className="paper pattern-lattice-light relative overflow-hidden px-4 py-12 sm:px-6 sm:py-32">
      {/* faint mandala watermark */}
      <svg
        viewBox="0 0 400 400"
        className="pointer-events-none absolute -right-32 -top-32 h-[420px] w-[420px] animate-spin-slow opacity-[0.05]"
        aria-hidden="true"
      >
        {Array.from({ length: 4 }).map((_, i) => (
          <circle key={i} cx="200" cy="200" r={60 + i * 42} fill="none" stroke="#8a6a1f" strokeWidth="1.5" strokeDasharray={i % 2 ? "4 10" : undefined} />
        ))}
        {Array.from({ length: 16 }).map((_, i) => {
          const a = (i * Math.PI) / 8;
          return <circle key={`d${i}`} cx={200 + 186 * Math.cos(a)} cy={200 + 186 * Math.sin(a)} r="5" fill="#8a6a1f" />;
        })}
      </svg>
      <svg
        viewBox="0 0 400 400"
        className="pointer-events-none absolute -bottom-40 -left-32 h-[420px] w-[420px] animate-spin-slow opacity-[0.05]"
        aria-hidden="true"
      >
        <circle cx="200" cy="200" r="150" fill="none" stroke="#8a6a1f" strokeWidth="1.5" strokeDasharray="4 10" />
        <circle cx="200" cy="200" r="100" fill="none" stroke="#8a6a1f" strokeWidth="1.5" />
      </svg>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.14 } } }}
        className="relative mx-auto flex max-w-3xl flex-col items-center text-center"
      >
        <motion.p variants={fadeUp} className="eyebrow text-[0.64rem] text-gold-700 sm:text-[0.81rem]">
          {t.storyEyebrow}
        </motion.p>
        <motion.h2 variants={fadeUp} className="mt-2 font-display text-3xl font-semibold text-maroon-800 sm:mt-4 sm:text-6xl">
          {t.storyTitle}
        </motion.h2>
        <motion.div variants={fadeUp} className="mt-4 sm:mt-6">
          <Divider className="w-52 sm:w-80" />
        </motion.div>

        <motion.p variants={fadeUp} className="mt-5 font-display text-lg italic leading-relaxed text-brown-800 sm:mt-8 sm:text-2xl">
          {t.storyP1}
        </motion.p>
        <motion.p variants={fadeUp} className="mt-3 max-w-2xl whitespace-pre-line text-[0.82rem] leading-[1.65] text-brown-800/80 sm:mt-5 sm:text-lg">
          {t.storyP2}
        </motion.p>

        <motion.div variants={fadeUp} className="mt-7 flex w-full max-w-sm flex-row items-start justify-center gap-2 sm:mt-14 sm:max-w-none sm:gap-16">
          <NameMedallion name={lang === "hi" ? "चि० निर्भय पुण्डीर" : "Nirbhay Pundir"} label={t.groomLabel} delay={0} />
          <motion.div variants={fadeUp} className="mt-5 flex w-8 shrink-0 flex-col items-center gap-1 sm:mt-0" aria-hidden="true">
            <Sparkle className="h-3.5 w-3.5 text-gold-500" />
            <span className="font-hindi text-xs text-gold-600 sm:text-base">{lang === "hi" ? "॥ संग ॥" : "&"}</span>
            <Sparkle className="h-3.5 w-3.5 text-gold-500" />
          </motion.div>
          <NameMedallion name={lang === "hi" ? "आयु० निशा" : "Nisha"} label={t.brideLabel} delay={0.1} />
        </motion.div>

        <motion.div variants={fadeUp} className="mt-8 flex items-center gap-3 sm:mt-16 sm:gap-6" aria-hidden="true">
          <Diya className="h-9 w-9 opacity-90 sm:h-12 sm:w-12" glow={false} />
          <span className="h-px w-10 bg-gradient-to-r from-transparent to-gold-500/70 sm:w-16" />
          <Sparkle className="h-3.5 w-3.5 text-gold-500 animate-twinkle sm:h-4 sm:w-4" />
          <span className="h-px w-10 bg-gradient-to-l from-transparent to-gold-500/70 sm:w-16" />
          <Diya className="h-9 w-9 opacity-90 sm:h-12 sm:w-12" glow={false} />
        </motion.div>
      </motion.div>
    </section>
  );
}
