import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Link2, MessageCircle, Share2, Send } from "lucide-react";
import { SHARE_TEXT } from "../../data/wedding";
import { useLanguage } from "../../context/LanguageContext";

export default function ShareButton() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const canNativeShare = typeof navigator !== "undefined" && !!navigator.share;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  const url = () => window.location.href;

  const shareWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(`${SHARE_TEXT}\n\n${url()}`)}`, "_blank", "noopener");
    setOpen(false);
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url());
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable */
    }
  };

  const nativeShare = async () => {
    try {
      await navigator.share({ title: "Nirbhay Weds Nisha", text: SHARE_TEXT, url: url() });
    } catch {
      /* user cancelled */
    }
    setOpen(false);
  };

  const btn =
    "flex w-full items-center gap-3 rounded-full px-5 py-3 text-left text-[0.8rem] tracking-[0.06em] text-ivory-100 transition-colors hover:bg-gold-500/15";

  return (
    <div ref={ref} className="fixed bottom-[4.25rem] right-2.5 z-[60] sm:right-4 md:bottom-6 md:right-6">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.92 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            role="menu"
            aria-label={t.shareTitle}
            className="absolute bottom-16 right-0 w-60 origin-bottom-right rounded-2xl border border-gold-500/40 bg-maroon-850/95 p-2 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] backdrop-blur-md"
          >
            <p className="px-4 pb-1.5 pt-2 eyebrow text-[0.59rem] text-gold-400">{t.shareTitle}</p>
            <button role="menuitem" onClick={shareWhatsApp} className={btn}>
              <span className="grid h-8 w-8 place-items-center rounded-full bg-[#25D366]/15 text-[#4be389]">
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
              </span>
              {t.whatsapp}
            </button>
            <button role="menuitem" onClick={copyLink} className={btn}>
              <span className="grid h-8 w-8 place-items-center rounded-full bg-gold-500/15 text-gold-300">
                {copied ? <Check className="h-4 w-4 text-green-400" aria-hidden="true" /> : <Link2 className="h-4 w-4" aria-hidden="true" />}
              </span>
              {copied ? t.copied : t.copyLink}
            </button>
            {canNativeShare && (
              <button role="menuitem" onClick={nativeShare} className={btn}>
                <span className="grid h-8 w-8 place-items-center rounded-full bg-gold-500/15 text-gold-300">
                  <Send className="h-4 w-4" aria-hidden="true" />
                </span>
                {t.shareVia}
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label={t.share}
        title={t.share}
        className="grid h-10 w-10 place-items-center rounded-full border border-gold-400/70 bg-maroon-900/85 text-gold-300 shadow-[0_10px_30px_-8px_rgba(0,0,0,0.6)] backdrop-blur-md transition-all duration-300 hover:border-gold-300 hover:text-gold-200 sm:h-12 sm:w-12"
      >
        <Share2 className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
      </motion.button>
    </div>
  );
}
