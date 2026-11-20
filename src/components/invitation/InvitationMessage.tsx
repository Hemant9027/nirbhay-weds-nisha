import { motion } from "framer-motion";
import { useLanguage } from "../../context/LanguageContext";
import { Corner, Divider, Diya } from "./Ornaments";

const fade = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function InvitationMessage() {
  const { t, lang } = useLanguage();
  return (
    <section className="royal-dark grain relative overflow-hidden px-6 py-24 sm:py-32">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-90px" }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.16 } } }}
        className="relative mx-auto max-w-3xl"
      >
        <div className="gold-frame relative rounded-[2rem] bg-maroon-850/70 px-6 py-14 text-center shadow-[0_36px_90px_-30px_rgba(0,0,0,0.7)] sm:px-14 sm:py-16">
          <Corner className="pointer-events-none absolute left-3 top-3 h-16 w-16 opacity-60 sm:h-20 sm:w-20" />
          <Corner className="pointer-events-none absolute right-3 top-3 h-16 w-16 opacity-60 sm:h-20 sm:w-20" flip />
          <Corner className="pointer-events-none absolute bottom-3 left-3 h-16 w-16 rotate-[270deg] opacity-60 sm:h-20 sm:w-20" />
          <Corner className="pointer-events-none absolute bottom-3 right-3 h-16 w-16 rotate-180 opacity-60 sm:h-20 sm:w-20" />

          <motion.div variants={fade} className="flex justify-center" aria-hidden="true">
            <Diya className="h-16 w-16 sm:h-20 sm:w-20" />
          </motion.div>

          <motion.h2 variants={fade} className="mt-6 font-display text-4xl font-semibold text-ivory-100 sm:text-5xl">
            {t.inviteTitle}
          </motion.h2>

          <motion.div variants={fade} className="mt-5 flex justify-center">
            <Divider className="w-56 sm:w-72" />
          </motion.div>

          <motion.p
            variants={fade}
            className={`mx-auto mt-7 max-w-xl leading-relaxed text-ivory-200/90 ${
              lang === "hi" ? "font-hindi text-xl sm:text-2xl" : "font-display text-xl italic sm:text-2xl"
            }`}
          >
            {t.inviteP1}
          </motion.p>

          <motion.p variants={fade} className="mt-8 font-hindi text-lg text-gold-300/90 sm:text-xl">
            {lang === "hi" ? `॥ ${t.shubhVivah} ॥` : "Wedding Blessings"}
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
}
