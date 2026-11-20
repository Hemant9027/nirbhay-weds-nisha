import { motion } from "framer-motion";
import { MapPin, Navigation } from "lucide-react";
import { MAPS_URL, VENUE_NAME } from "../../data/wedding";
import { useLanguage } from "../../context/LanguageContext";
import { Divider, Corner } from "./Ornaments";

const fade = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function Venue() {
  const { t } = useLanguage();

  return (
    <section id="venue" className="paper grain relative overflow-hidden px-6 py-24 sm:py-32">
      <Corner className="pointer-events-none absolute left-3 top-3 h-24 w-24 opacity-50" />
      <Corner className="pointer-events-none absolute bottom-3 right-3 h-24 w-24 rotate-180 opacity-50" />

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-90px" }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.14 } } }}
        className="mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-2 md:gap-14"
      >
        {/* image */}
        <motion.div variants={fade} className="relative order-2 md:order-1">
          <div className="gold-frame arch-frame overflow-hidden shadow-[0_30px_70px_-24px_rgba(66,16,22,0.5)]">
            <img
              src="/images/venue.jpg"
              alt="Kisan Farm House — the wedding destination at dusk"
              width={1792}
              height={1008}
              loading="lazy"
              decoding="async"
              className="aspect-[16/10] w-full object-cover transition-transform duration-[1.6s] ease-out hover:scale-[1.05]"
            />
          </div>
          <div className="pointer-events-none absolute -inset-3 arch-frame opacity-50 [border:1px_dashed_rgba(138,106,31,0.5)]" aria-hidden="true" />
        </motion.div>

        {/* copy */}
        <div className="order-1 text-center md:order-2 md:text-left">
          <motion.p variants={fade} className="eyebrow text-[0.64rem] text-gold-700 sm:text-[0.81rem]">
            {t.venueEyebrow}
          </motion.p>
          <motion.h2 variants={fade} className="mt-3 font-hindi text-3xl font-semibold leading-snug text-maroon-800 sm:text-4xl">
            {t.venueTitle}
          </motion.h2>
          <motion.div variants={fade} className="mt-5 flex justify-center md:justify-start">
            <Divider className="w-56" />
          </motion.div>

          <motion.div variants={fade} className="mt-7 flex flex-col items-center gap-1 md:items-start">
            <p className="flex items-center gap-2 text-gold-700">
              <MapPin className="h-5 w-5" aria-hidden="true" />
              <span className="eyebrow text-[0.59rem]">{t.destination}</span>
            </p>
            <p className="font-hindi text-2xl font-semibold text-maroon-800 sm:text-4xl">
              {VENUE_NAME}
            </p>
            {t.venueAddress && (
              <p className="mt-2 max-w-sm text-center font-hindi text-[0.78rem] leading-relaxed text-brown-800/80 md:text-left sm:text-sm">
                {t.venueAddress}
              </p>
            )}
            <p className="mt-3 font-hindi text-2xl font-semibold leading-tight text-brown-800/90 sm:text-4xl">{t.venueDate}</p>
          </motion.div>

          <motion.div variants={fade} className="mt-8">
            <a
              href={MAPS_URL}
              aria-label={t.viewMapsAria}
              className="btn-gold px-8 py-3.5 text-[0.72rem] sm:text-xs"
            >
              <Navigation className="h-4 w-4" aria-hidden="true" />
              {t.directions}
            </a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
