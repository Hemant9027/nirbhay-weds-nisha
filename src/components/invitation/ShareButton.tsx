import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Link2, MessageCircle, Share2, Send } from "lucide-react";
import { EN_SHARE_TEXT, SHARE_TEXT } from "../../data/wedding";
import { useLanguage } from "../../context/LanguageContext";

export default function ShareButton() {
  const { t, lang } = useLanguage();
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [toast, setToast] = useState("");
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

  const invitationUrl = lang === "en"
    ? "https://nirbhay-weds-nisha.infycrestsolutions.com/en"
    : "https://nirbhay-weds-nisha.infycrestsolutions.com/";
  const shareText = lang === "en" ? EN_SHARE_TEXT : SHARE_TEXT;
  const normalizedShareText = shareText.normalize("NFC");

  const showToast = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2200);
  };

  const shareWhatsApp = () => {
    const encodedText = encodeURIComponent(normalizedShareText);
    window.open(`https://api.whatsapp.com/send?text=${encodedText}`, "_blank", "noopener,noreferrer");
    setOpen(false);
  };

  const copyInvitation = async () => {
    try {
      await navigator.clipboard.writeText(normalizedShareText);
      showToast(lang === "en" ? "Wedding invitation copied! 🌸" : "विवाह निमंत्रण कॉपी हो गया! 🌸");
    } catch {
      showToast(lang === "en" ? "Unable to copy invitation" : "निमंत्रण कॉपी नहीं हो सका");
    }
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(invitationUrl);
      setCopied(true);
      showToast(lang === "en" ? "Link copied! 🌸" : "लिंक कॉपी हो गया! 🌸");
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      showToast(lang === "en" ? "Unable to copy link" : "लिंक कॉपी नहीं हो सका");
    }
  };

  const nativeShare = async () => {
    try {
      const shareData: ShareData = {
        title: lang === "en" ? "Wedding Invitation" : "शुभ विवाह निमंत्रण",
        text: normalizedShareText,
      };
      const previewUrl = `${window.location.origin}/images/preview.png`;
      if (navigator.canShare) {
        try {
          const response = await fetch(previewUrl);
          const blob = await response.blob();
          const file = new File([blob], "wedding-preview.png", { type: "image/png" });
          if (navigator.canShare({ files: [file] })) {
            await navigator.share({ ...shareData, files: [file] });
          } else {
            await navigator.share(shareData);
          }
        } catch {
          await navigator.share(shareData);
        }
      } else {
        await navigator.share(shareData);
      }
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
              {lang === "hi" ? "WhatsApp पर भेजें" : "Share on WhatsApp"}
            </button>
            <button role="menuitem" onClick={copyInvitation} className={btn}>
              <span className="grid h-8 w-8 place-items-center rounded-full bg-gold-500/15 text-gold-300">
                <Check className="h-4 w-4" aria-hidden="true" />
              </span>
              {lang === "hi" ? "निमंत्रण कॉपी करें" : "Copy Invitation"}
            </button>
            <button role="menuitem" onClick={copyLink} className={btn}>
              <span className="grid h-8 w-8 place-items-center rounded-full bg-gold-500/15 text-gold-300">
                {copied ? <Check className="h-4 w-4 text-green-400" aria-hidden="true" /> : <Link2 className="h-4 w-4" aria-hidden="true" />}
              </span>
              {lang === "hi" ? "लिंक कॉपी करें" : "Copy Link"}
            </button>
            {canNativeShare && (
              <button role="menuitem" onClick={nativeShare} className={btn}>
                <span className="grid h-8 w-8 place-items-center rounded-full bg-gold-500/15 text-gold-300">
                  <Send className="h-4 w-4" aria-hidden="true" />
                </span>
                {lang === "hi" ? "निमंत्रण साझा करें" : "Share Invitation"}
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

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            role="status"
            className="fixed bottom-24 left-1/2 z-[90] -translate-x-1/2 whitespace-nowrap rounded-full border border-gold-500/40 bg-maroon-900/95 px-4 py-2 text-xs text-gold-200 shadow-xl backdrop-blur-md"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
