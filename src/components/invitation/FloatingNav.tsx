import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CalendarDays, Flame, Heart, Home, MapPin } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

const SECTIONS = [
  { id: "home", icon: Home, key: "home" as const },
  { id: "story", icon: Heart, key: "story" as const },
  { id: "events", icon: CalendarDays, key: "events" as const },
  { id: "wedding", icon: Flame, key: "wedding" as const },
  { id: "venue", icon: MapPin, key: "venue" as const },
];

export default function FloatingNav() {
  const { t } = useLanguage();
  const [active, setActive] = useState("home");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-42% 0px -52% 0px" }
    );
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      {/* desktop dot rail */}
      <nav aria-label="Invitation sections" className="fixed right-5 top-1/2 z-[55] hidden -translate-y-1/2 lg:block">
        <ul className="flex flex-col items-center gap-4">
          {SECTIONS.map(({ id, key }) => (
            <li key={id} className="group relative flex items-center">
              <span className="pointer-events-none absolute right-7 whitespace-nowrap rounded-full border border-gold-500/30 bg-maroon-900/90 px-3 py-1.5 text-[0.6rem] tracking-[0.22em] text-gold-200 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100">
                {t.nav[key].toUpperCase()}
              </span>
              <button
                onClick={() => go(id)}
                aria-label={t.nav[key]}
                aria-current={active === id ? "true" : undefined}
                className={`grid h-8 w-8 place-items-center rounded-full transition-all duration-300`}
              >
                <span
                  className={`block rounded-full border transition-all duration-300 ${
                    active === id
                      ? "h-3 w-3 border-gold-400 bg-gold-500 shadow-[0_0_12px_rgba(201,162,39,0.8)]"
                      : "h-2 w-2 border-gold-500/50 bg-transparent group-hover:border-gold-400"
                  }`}
                  aria-hidden="true"
                />
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* mobile icon dock */}
      <motion.nav
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        aria-label="Invitation sections"
        className="fixed inset-x-0 bottom-2 z-[55] mx-auto w-fit max-w-[calc(100vw-1rem)] rounded-full border border-gold-500/40 bg-maroon-900/85 px-1.5 py-1 shadow-[0_14px_40px_-10px_rgba(0,0,0,0.75)] backdrop-blur-md sm:bottom-3 sm:px-2 sm:py-1.5 lg:hidden"
      >
        <ul className="flex items-center gap-0.25 sm:gap-0.5">
          {SECTIONS.map(({ id, icon: Icon, key }) => (
            <li key={id}>
              <button
                onClick={() => go(id)}
                aria-label={t.nav[key]}
                aria-current={active === id ? "true" : undefined}
                className={`grid h-9 w-9 place-items-center rounded-full transition-all duration-300 sm:h-11 sm:w-11 ${
                  active === id
                    ? "bg-gradient-to-b from-gold-400 to-gold-600 text-maroon-900 shadow-[0_0_16px_rgba(201,162,39,0.5)]"
                    : "text-gold-300/75 hover:text-gold-200"
                }`}
              >
                <Icon className="h-4 w-4 sm:h-[18px] sm:w-[18px]" aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>
      </motion.nav>
    </>
  );
}
