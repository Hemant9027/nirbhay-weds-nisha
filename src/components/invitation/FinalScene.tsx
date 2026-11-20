import { motion } from "framer-motion";
import { Phone } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { Divider, Diya, Sparkle } from "./Ornaments";

const fade = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function FinalScene() {
  const { t, lang } = useLanguage();
  return (
    <section id="finale" className="royal-dark grain relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-4 py-16 pb-16 text-center sm:px-6 sm:py-24">
      {/* golden dust */}
      {Array.from({ length: 20 }).map((_, i) => (
        <span
          key={i}
          className="absolute block rounded-full bg-gold-300 animate-twinkle"
          style={{
            width: `${2 + (i % 3)}px`,
            height: `${2 + (i % 3)}px`,
            left: `${(i * 53 + 7) % 100}%`,
            top: `${(i * 29 + 5) % 100}%`,
            animationDelay: `${(i % 6) * 0.5}s`,
          }}
          aria-hidden="true"
        />
      ))}

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-120px" }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.18 } } }}
        className="relative z-10 flex flex-col items-center"
      >
        <motion.div variants={fade} className="mb-2 flex flex-col items-center">
          <img
            src="/images/ganesh-ji-transparent.png"
            alt="Lord Ganesha"
            width={556}
            height={612}
            className="h-20 w-[72px] object-contain drop-shadow-[0_8px_18px_rgba(201,162,39,0.32)] sm:h-24 sm:w-20"
          />
          <p className="font-hindi text-sm text-gold-300">॥ श्री गणेशाय नमः ॥</p>
        </motion.div>

        <motion.p variants={fade} className="mt-4 font-hindi text-[0.85rem] tracking-[0.18em] gold-text sm:text-lg">
          {lang === "hi" ? "॥ शुभ विवाह ॥" : "Wedding Invitation"}
        </motion.p>
        <motion.p variants={fade} className="mt-3 font-hindi text-xl text-gold-300 sm:text-2xl">
          {lang === "hi" ? "11 दिसंबर 2026" : "11 December 2026"}
        </motion.p>
        <motion.p variants={fade} className="mt-2 font-cinzel text-sm tracking-[0.12em] text-ivory-200/75 sm:text-base">
          {lang === "hi" ? "किसान फार्म हाउस, मेरठ" : "Kisan Farm House, Meerut"}
        </motion.p>

        <motion.div variants={fade} className="mt-7">
          <Divider className="w-64 sm:w-80" />
        </motion.div>

        <motion.p variants={fade} className="mt-5 font-hindi text-base text-gold-300 sm:text-lg">
          {lang === "hi" ? "॥ सादर आमंत्रण ॥" : "Cordially Invited"}
        </motion.p>
        <motion.p variants={fade} className="mt-3 max-w-md font-hindi text-[0.82rem] leading-relaxed text-ivory-200/85 sm:text-base">
          {lang === "hi"
            ? "पर शहनाइयों की गूँज के साथ सांस्कृतिक परम्परा एवं पूर्वजों का हो आशीर्वाद, होंगे एक दूसरे को वचन सात, होगी अग्नि साक्षी, लेंगे फेरे सात।"
            : "With the sacred traditions and blessings of our elders, may the seven vows be witnessed by the holy fire."}
        </motion.p>
        <motion.p variants={fade} className="mt-5 max-w-md font-hindi text-base leading-relaxed text-ivory-200/85 sm:text-lg">
          {lang === "hi"
            ? "बस इतनी विनती है आपसे, देने आयें नव-युगल को आशीर्वाद व प्यार।"
            : "We warmly invite you to join us and bless the new couple with love."}
        </motion.p>
        <motion.p variants={fade} className="mt-3 font-hindi text-base text-gold-200 sm:text-lg">
          {lang === "hi" ? "॥ शुभ परिणयोत्सव ॥" : "Auspicious Wedding Celebration"}
        </motion.p>
        <motion.p variants={fade} className="mt-2 font-hindi text-sm text-ivory-100 sm:text-base">
          {lang === "hi" ? "चि० निर्भय पुण्डीर एवं आयु० निशा" : "Nirbhay Pundir & Nisha"}
        </motion.p>
        <motion.p variants={fade} className="mt-3 font-hindi text-xs text-gold-300/90 sm:text-sm">
          {lang === "hi" ? "दर्शनाभिलाषी — समस्त परिवारजन" : "With warm regards — the families"}
        </motion.p>

        <motion.div variants={fade} className="mt-8 w-full max-w-md rounded-2xl border border-gold-500/30 bg-maroon-850/55 px-4 py-5 backdrop-blur-sm sm:px-6">
          <p className="eyebrow text-[0.56rem] text-gold-400 sm:text-[0.64rem]">{t.rsvpTitle}</p>
          <p className="mt-1.5 font-display text-sm italic text-ivory-200/70">{t.rsvpLabel}</p>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <a
              href="tel:+919058900566"
              className="flex min-w-0 flex-col items-center rounded-xl border border-gold-500/20 px-2 py-3 text-ivory-100 transition-colors hover:border-gold-400/50 hover:bg-gold-500/10"
              aria-label="Call Mr. Ompal Singh"
            >
              <span className="text-[0.68rem] font-semibold leading-tight sm:text-sm">Mr. Ompal Singh</span>
              <span className="mt-1.5 flex items-center gap-1 text-[0.58rem] text-gold-300 sm:text-xs">
                <Phone className="h-3 w-3" aria-hidden="true" />
                +91-9058900566
              </span>
            </a>
            <a
              href="tel:+919027152962"
              className="flex min-w-0 flex-col items-center rounded-xl border border-gold-500/20 px-2 py-3 text-ivory-100 transition-colors hover:border-gold-400/50 hover:bg-gold-500/10"
              aria-label="Call Hemant Pundir"
            >
              <span className="text-[0.68rem] font-semibold leading-tight sm:text-sm">Hemant Pundir</span>
              <span className="mt-1.5 flex items-center gap-1 text-[0.58rem] text-gold-300 sm:text-xs">
                <Phone className="h-3 w-3" aria-hidden="true" />
                +91-9027152962
              </span>
            </a>
          </div>
        </motion.div>

        <motion.div variants={fade} className="mt-7 flex items-center gap-5" aria-hidden="true">
          <Diya className="h-9 w-9 opacity-90 sm:h-11 sm:w-11" />
          <Sparkle className="h-3.5 w-3.5 text-gold-400 animate-twinkle" />
          <Diya className="h-9 w-9 opacity-90 sm:h-11 sm:w-11" />
        </motion.div>
      </motion.div>

      {/* footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.4 }}
        className="relative inset-x-auto bottom-auto mt-10 w-full px-4 pb-2"
      >
        <div className="mx-auto flex max-w-xl flex-col items-center gap-2 border-t border-gold-500/20 pt-5">
          <p className="font-hindi text-[0.68rem] text-gold-300/70 sm:text-sm">
            ॥ सर्वे भवन्तु सुखिनः ॥
          </p>
          <p className="mt-2 font-hindi text-[0.64rem] leading-relaxed text-ivory-200/60 sm:text-xs">
            {lang === "hi" && "ना ड्यूटी ना दफ्तर ना ही कोई बहाना, हमारे चाचू की शादी में जरूर-जरूर आना।"}
          </p>
          <p className="mt-3 text-[0.62rem] text-ivory-200/55 sm:text-xs">
            Made with <span aria-label="love">❤️</span> by{" "}
            <a
              href="https://www.infycrestsolutions.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-gold-300 underline decoration-gold-500/40 underline-offset-4 transition-colors hover:text-gold-200"
            >
              Infycrest Solutions
            </a>
          </p>
        </div>
      </motion.footer>
    </section>
  );
}
