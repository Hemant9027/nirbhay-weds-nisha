import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useInView } from "framer-motion";
import { MapPin, Sparkles } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { Divider } from "./Ornaments";

const ROUTE_D = "M 60 168 C 200 210, 300 96, 420 118 C 540 140, 620 40, 742 58";

export default function BaraatScene() {
  const { t, lang } = useLanguage();
  const reduced = useReducedMotion();
  const routeRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const markerRef = useRef<SVGGElement>(null);
  const inView = useInView(routeRef, { once: true, margin: "-120px" });
  const [greets, setGreets] = useState(false);

  // ride the golden marker along the illustrated route
  useEffect(() => {
    if (reduced || !inView) return;
    const path = pathRef.current;
    const marker = markerRef.current;
    if (!path || !marker) return;
    const total = path.getTotalLength();
    const DURATION = 4200;
    let raf = 0;
    const start = performance.now();
    const step = (now: number) => {
      const p = Math.min(1, (now - start) / DURATION);
      const eased = 1 - Math.pow(1 - p, 3);
      const pt = path.getPointAtLength(total * eased);
      marker.setAttribute("transform", `translate(${pt.x} ${pt.y})`);
      if (p < 1) raf = requestAnimationFrame(step);
      else setGreets(true);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduced]);

  return (
    <section id="baraat" className="royal-dark grain relative overflow-hidden pt-24 sm:pt-32">
      {/* header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-90px" }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 mx-auto flex max-w-2xl flex-col items-center px-6 text-center"
      >
        <span className="grid h-10 w-10 place-items-center rounded-full border border-gold-500/70 bg-maroon-850 font-cinzel text-[0.68rem] text-gold-300 shadow-[0_0_24px_rgba(201,162,39,0.35)]" aria-hidden="true">
          05
        </span>
        <p className="mt-3 font-hindi text-2xl font-semibold leading-tight text-gold-300 sm:text-4xl">
          {lang === "hi" ? "11 दिसंबर 2026" : "11 December 2026"}
        </p>
        <p className="gold-text gold-text-animated mt-5 rounded-full border border-gold-500/35 bg-maroon-950/55 px-5 py-2 font-hindi text-3xl font-semibold leading-none tracking-normal sm:mt-6 sm:px-7 sm:text-5xl">
          {t.baraatTime}
        </p>
        <h2 className="mt-5 font-hindi text-3xl font-semibold leading-tight text-ivory-100 sm:mt-6 sm:text-5xl">{t.baraatTitle}</h2>
        <Divider className="mt-4 w-60 sm:w-72" />
        <p className="mt-3 max-w-xl font-hindi text-base leading-relaxed text-ivory-200/85 sm:text-xl">{t.baraatSub}</p>
      </motion.div>

      {/* procession — cinematic pan */}
      <motion.div
        initial={{ opacity: 0, scale: 0.985 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 1.4, ease: "easeOut" }}
        className="relative mt-12 h-[46vw] max-h-[520px] min-h-[230px] w-full overflow-hidden sm:mt-16"
      >
        <img
          src="/images/baraat.jpg"
          alt="The royal baraat — Nirbhay on a decorated horse with dancing baraatis and dhol"
          width={1792}
          height={1008}
          loading="lazy"
          decoding="async"
          className="h-full w-full animate-pan-slow object-cover will-change-transform"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-maroon-900 via-transparent to-maroon-900" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-maroon-900/60 via-transparent to-maroon-900/60" aria-hidden="true" />
        {/* drifting warm glow like procession lights */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-1/3 animate-glow-pulse bg-gradient-to-r from-gold-500/12 to-transparent"
          aria-hidden="true"
        />
      </motion.div>

      {/* illustrated route 72 KH → Kisan Farm House */}
      <div ref={routeRef} className="relative z-10 mx-auto mt-2 max-w-3xl px-4 pb-24 sm:mt-6 sm:pb-32">
        <svg viewBox="0 0 800 220" className="w-full" role="img" aria-label={`${t.departure}: 72 KH, Kacholi — ${t.destination}: Kisan Farm House`}>
          <defs>
            <linearGradient id="routeGold" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#8a6a1f" />
              <stop offset="55%" stopColor="#d4af5f" />
              <stop offset="100%" stopColor="#f5e9c8" />
            </linearGradient>
          </defs>

          {/* marching guide dashes */}
          <path d={ROUTE_D} fill="none" stroke="#c9a227" strokeOpacity="0.3" strokeWidth="1.6" strokeDasharray="5 9" className="animate-dash-march" />

          {/* drawn progress */}
          <motion.path
            ref={pathRef}
            d={ROUTE_D}
            fill="none"
            stroke="url(#routeGold)"
            strokeWidth="2.6"
            strokeLinecap="round"
            initial={{ pathLength: reduced ? 1 : 0 }}
            animate={inView ? { pathLength: 1 } : {}}
            transition={{ duration: reduced ? 0 : 4.2, ease: [0.65, 0, 0.35, 1] }}
          />

          {/* moving marker */}
          <g ref={markerRef} transform={reduced ? "translate(742 58)" : "translate(60 168)"} aria-hidden="true">
            <circle r="14" fill="#e8963c" opacity="0.25" className="animate-glow-pulse" />
            <circle r="6" fill="#f5e9c8" />
            <circle r="3" fill="#e8963c" />
          </g>

          {/* start node */}
          <g transform="translate(60 168)">
            <circle r="10" fill="#2a090d" stroke="#c9a227" strokeWidth="1.6" />
            <circle r="3.4" fill="#c9a227" />
          </g>
          {/* destination node */}
          <g transform="translate(742 58)">
            <circle r="13" fill="none" stroke="#d4af5f" strokeWidth="1.6" className={greets ? "animate-glow-pulse" : ""} />
            <motion.circle
              r="16"
              fill="none"
              stroke="#d4af5f"
              strokeWidth="1"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={greets ? { scale: [0.8, 1.8], opacity: [0.8, 0] } : {}}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
              style={{ transformBox: "fill-box", transformOrigin: "center" }}
            />
            <circle r="9" fill="#2a090d" stroke="#f5e9c8" strokeWidth="2" />
            <circle r="3.4" fill="#f5e9c8" />
          </g>
        </svg>

        <div className="mt-1 flex items-start justify-between gap-4 text-left">
          <div className="max-w-[42%]">
            <p className="flex items-center gap-1.5 eyebrow text-[0.59rem] text-gold-400 sm:text-[0.66rem]">
              <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden="true" /> {t.departure}
            </p>
            <p className="mt-1.5 font-display text-base font-semibold text-ivory-100 sm:text-xl">72 KH, {lang === "hi" ? "कचौली" : "Kacholi"}</p>
          </div>
          <div className="max-w-[42%] text-right">
            <p className="flex items-center justify-end gap-1.5 eyebrow text-[0.59rem] text-gold-400 sm:text-[0.66rem]">
              {t.destination} <Sparkles className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            </p>
            <p className="mt-1.5 font-display text-base font-semibold text-ivory-100 sm:text-xl">Kisan Farm House</p>
          </div>
        </div>
      </div>
    </section>
  );
}
