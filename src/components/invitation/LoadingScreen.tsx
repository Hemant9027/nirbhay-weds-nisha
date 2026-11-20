import { motion } from "framer-motion";
import { Ganesha } from "./Ornaments";
import { useLanguage } from "../../context/LanguageContext";

export default function LoadingScreen() {
  const { t } = useLanguage();
  return (
    <motion.div
      className="fixed inset-0 z-[90] grid place-items-center royal-dark grain"
      exit={{ opacity: 0, transition: { duration: 0.55, ease: "easeInOut" } }}
      role="status"
      aria-label="Loading"
    >
      <div className="flex flex-col items-center gap-6 px-6 text-center">
        <Ganesha className="h-24 w-24" />
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.6 }}
          className="font-display text-xl tracking-[0.22em] text-ivory-200 sm:text-2xl"
        >
          {t.loadingNames}
        </motion.p>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.1, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="h-px w-40 origin-center bg-gradient-to-r from-transparent via-gold-500 to-transparent"
        />
      </div>
    </motion.div>
  );
}
