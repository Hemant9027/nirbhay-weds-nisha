import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, MotionConfig } from "framer-motion";
import { LanguageProvider } from "./context/LanguageContext";
import { weddingMusic, getMusicPref, setMusicPref } from "./audio/musicEngine";

import LoadingScreen from "./components/invitation/LoadingScreen";
import OpeningScene from "./components/invitation/OpeningScene";
import Hero from "./components/invitation/Hero";
import CoupleStory from "./components/invitation/CoupleStory";
import WeddingTimeline from "./components/invitation/WeddingTimeline";
import BaraatScene from "./components/invitation/BaraatScene";
import WeddingMandap from "./components/invitation/WeddingMandap";
import Countdown from "./components/invitation/Countdown";
import Venue from "./components/invitation/Venue";
import InvitationMessage from "./components/invitation/InvitationMessage";
import FinalScene from "./components/invitation/FinalScene";
import Petals from "./components/invitation/Petals";
import LanguageSwitcher from "./components/invitation/LanguageSwitcher";
import MusicPlayer from "./components/invitation/MusicPlayer";
import ShareButton from "./components/invitation/ShareButton";
import FloatingNav from "./components/invitation/FloatingNav";

function Experience() {
  const [loading, setLoading] = useState(true);
  const [opened, setOpened] = useState(false);
  const [musicOn, setMusicOn] = useState(false);

  useEffect(() => {
    const id = window.setTimeout(() => setLoading(false), 1500);
    return () => window.clearTimeout(id);
  }, []);

  // lock scroll until the invitation is opened
  useEffect(() => {
    document.body.style.overflow = opened ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [opened]);

  const handleOpen = useCallback(() => {
    setOpened(true);
    if (getMusicPref()) {
      setMusicPref(true);
      setMusicOn(true);
      void weddingMusic.start();
    }
  }, []);

  useEffect(() => {
    if (loading || opened) return;
    const id = window.setTimeout(handleOpen, 12000);
    return () => window.clearTimeout(id);
  }, [loading, opened, handleOpen]);

  const toggleMusic = useCallback(() => {
    setMusicOn((on) => {
      const next = !on;
      setMusicPref(next);
      if (next) void weddingMusic.start();
      else weddingMusic.stop();
      return next;
    });
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <main className="relative min-h-screen bg-maroon-900">
        <AnimatePresence>{loading && <LoadingScreen key="loader" />}</AnimatePresence>

        {!loading && <LanguageSwitcher />}

        <AnimatePresence>{!loading && !opened && <OpeningScene key="opening" onOpen={handleOpen} />}</AnimatePresence>

        {/* The invitation itself */}
        <Hero opened={opened} />
        <CoupleStory />
        <WeddingTimeline />
        <BaraatScene />
        <WeddingMandap />
        <Countdown />
        <Venue />
        <InvitationMessage />
        <FinalScene />

        {opened && (
          <>
            <Petals density={0.8} />
            <FloatingNav />
            <MusicPlayer playing={musicOn} onToggle={toggleMusic} />
            <ShareButton />
          </>
        )}
      </main>
    </MotionConfig>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <Experience />
    </LanguageProvider>
  );
}
