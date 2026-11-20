import { useEffect, useState } from "react";
import { WEDDING_DATE_ISO } from "../data/wedding";

export type CountdownState = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  over: boolean;
};

function calc(): CountdownState {
  // Counts down to the wedding day in the visitor's local time.
  const [y, m, d] = WEDDING_DATE_ISO.split("-").map(Number);
  const target = new Date(y, m - 1, d, 0, 0, 0, 0).getTime();
  const diff = target - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, over: true };
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff % 86_400_000) / 3_600_000),
    minutes: Math.floor((diff % 3_600_000) / 60_000),
    seconds: Math.floor((diff % 60_000) / 1000),
    over: false,
  };
}

export function useCountdown(): CountdownState {
  const [state, setState] = useState<CountdownState>(calc);

  useEffect(() => {
    const id = window.setInterval(() => setState(calc()), 1000);
    return () => window.clearInterval(id);
  }, []);

  return state;
}
