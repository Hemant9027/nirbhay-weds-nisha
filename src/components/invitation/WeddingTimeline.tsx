import { useRef, type ReactNode } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { CalendarDays, Clock3, MapPin } from "lucide-react";
import { EVENTS, type WeddingEvent } from "../../data/wedding";
import { useLanguage } from "../../context/LanguageContext";
import { Divider } from "./Ornaments";

function InfoRow({ icon: Icon, children }: { icon: typeof Clock3; children: ReactNode }) {
  return (
    <p className="flex items-start gap-2 text-[0.82rem] leading-snug text-brown-800/85 sm:text-sm">
      <Icon className="mt-[1px] h-4 w-4 shrink-0 text-gold-600" aria-hidden="true" />
      <span>{children}</span>
    </p>
  );
}

function EventCard({ event, index }: { event: WeddingEvent; index: number }) {
  const { t, lang } = useLanguage();
  const fromLeft = index % 2 === 0;
  const isWide = !!event.wide;

  return (
    <motion.article
      initial={{ opacity: 0, y: 44 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className={`relative flex w-full pl-14 md:w-1/2 md:pl-0 ${
        isWide
          ? "md:!w-full md:justify-center md:px-8"
          : fromLeft
            ? "md:justify-start md:pr-14"
            : "md:justify-end md:self-end md:pl-14"
      }`}
      id={`event-${event.id}`}
    >
      {/* number medallion on the line */}
      <motion.span
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "-70px" }}
        transition={{ duration: 0.6, delay: 0.2, type: "spring", stiffness: 200, damping: 14 }}
        className={`absolute top-8 grid h-9 w-9 place-items-center rounded-full border border-gold-500/70 bg-maroon-850 font-cinzel text-[0.68rem] text-gold-300 shadow-[0_0_24px_rgba(201,162,39,0.35)] sm:h-11 sm:w-11 ${
          isWide
            ? "left-0 md:left-1/2 md:-translate-x-1/2"
            : fromLeft
              ? "left-0 md:left-auto md:right-[-22px]"
              : "left-0 md:left-[-22px]"
        }`}
        aria-hidden="true"
      >
        {event.num}
      </motion.span>

      <div
        className={`gold-frame relative mx-auto w-full overflow-hidden rounded-2xl bg-ivory-100 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.6)] ${
          isWide ? "md:max-w-2xl" : "md:max-w-[19rem]"
        }`}
      >
        {/* image — revealed as if painted */}
        <motion.div
          initial={{ clipPath: fromLeft ? "inset(0 100% 0 0)" : "inset(0 0 0 100%)" }}
          whileInView={{ clipPath: "inset(0 0% 0 0%)" }}
          viewport={{ once: true, margin: "-70px" }}
          transition={{ duration: 1.3, delay: 0.25, ease: [0.65, 0, 0.35, 1] }}
          className={`relative mx-auto overflow-hidden ${isWide ? "arch-img aspect-[16/8.5] max-h-[250px] md:w-full" : "arch-img mx-3 mt-3 aspect-[4/3.2] max-h-[230px] sm:mx-4 sm:mt-4"}`}
        >
          <img
            src={event.image}
            alt={`${event.titleEn} — ${event.titleHi}`}
            width={parseInt(event.ratio.split("/")[0], 10)}
            height={parseInt(event.ratio.split("/")[1], 10)}
            loading="lazy"
            decoding="async"
            className={`h-full w-full object-cover ${isWide ? "" : "object-[50%_28%]"}`}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-maroon-900/30 via-transparent to-transparent" aria-hidden="true" />
          {isWide && (
            <span className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full border border-gold-400/60 bg-maroon-900/70 px-4 py-1.5 font-cinzel text-[0.6rem] tracking-[0.3em] text-gold-200 backdrop-blur-sm">
              {t.departure} → {t.destination}
            </span>
          )}
        </motion.div>

        <div className="relative px-5 pb-5 pt-4 text-center sm:px-6">
          <div aria-hidden="true" className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-gold-500/50 to-transparent" />
          <h3 className={`${lang === "hi" ? "font-hindi" : "font-display"} text-xl font-semibold leading-tight text-maroon-800 sm:text-2xl`}>
            {lang === "hi" ? event.titleHi : event.titleEn}
          </h3>
          <div className="mx-auto mt-3 flex max-w-xs flex-col items-start gap-1.5 text-left">
            <InfoRow icon={CalendarDays}>{lang === "hi" ? event.dateHi : event.dateEn}</InfoRow>
            <InfoRow icon={Clock3}>{lang === "hi" ? event.timeHi : event.timeEn}</InfoRow>
            {(lang === "hi" ? event.venueHi : event.venueEn).map((v) => (
              <InfoRow key={v} icon={MapPin}>
                {v}
              </InfoRow>
            ))}
          </div>

          <p className={`mt-3 whitespace-pre-line text-[0.82rem] leading-relaxed text-brown-800/75 sm:text-[0.9rem] ${lang === "hi" ? "font-hindi" : "font-display"}`}>
            {lang === "hi" ? event.noteHi : event.noteEn}
          </p>
        </div>
      </div>
    </motion.article>
  );
}

export default function WeddingTimeline() {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 72%", "end 72%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });

  return (
    <section id="events" className="royal-dark grain relative overflow-hidden px-6 py-24 sm:py-32">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-90px" }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto mb-16 flex max-w-2xl flex-col items-center text-center sm:mb-20"
      >
        <p className="eyebrow text-[0.64rem] text-gold-400 sm:text-[0.81rem]">{t.eventsEyebrow}</p>
        <h2 className="mt-4 font-display text-4xl font-semibold uppercase tracking-[0.06em] text-ivory-100 sm:text-6xl">
          {t.eventsTitle}
        </h2>
        <Divider className="mt-6 w-64 sm:w-80" />
        <p className="mt-4 font-display text-lg italic text-ivory-200/75 sm:text-xl">{t.eventsSub}</p>
      </motion.div>

      <div ref={ref} className="relative mx-auto max-w-5xl">
        {/* progress line */}
        <div className="absolute left-[21px] top-0 h-full w-px bg-gold-500/15 md:left-1/2" aria-hidden="true" />
        <motion.div
          style={{ scaleY }}
          className="gold-line absolute left-[21px] top-0 h-full w-px origin-top md:left-1/2"
          aria-hidden="true"
        />

        <div className="flex flex-col gap-8 md:gap-10">
          {EVENTS.filter((e) => e.id !== "wedding").map((e, i) => (
            <EventCard key={e.id} event={e} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
