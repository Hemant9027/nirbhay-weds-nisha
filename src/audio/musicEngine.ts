/**
 * Generative royal Indian wedding theme — tanpura drone, shehnai-like melody,
 * tabla accents and temple bells, synthesized live with the Web Audio API.
 * No audio files, starts only on a user gesture.
 */

const SA = 146.83; // D3
const SCALE = [
  293.66, // D4
  311.13, // Eb4
  349.23, // F4
  392.0, // G4
  440.0, // A4
  466.16, // Bb4
  523.25, // C5
  587.33, // D5
  698.46, // F5
  783.99, // G5
]; // Kafi/Bhairavi-flavoured wedding phrasing

type Timer = ReturnType<typeof setTimeout>;

class WeddingMusicEngine {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private droneOscs: OscillatorNode[] = [];
  private droneGains: GainNode[] = [];
  private timers: Timer[] = [];
  private playing = false;

  get isPlaying() {
    return this.playing;
  }

  async start(): Promise<void> {
    if (this.playing) return;
    if (typeof window === "undefined") return;

    if (!this.ctx) {
      const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AC();
      this.master = this.ctx.createGain();
      this.master.gain.value = 0;
      const comp = this.ctx.createDynamicsCompressor();
      comp.threshold.value = -28;
      comp.ratio.value = 6;
      this.master.connect(comp);
      comp.connect(this.ctx.destination);
    }

    try {
      await this.ctx.resume();
    } catch {
      return;
    }

    this.playing = true;
    const t = this.ctx.currentTime;
    this.master!.gain.cancelScheduledValues(t);
    this.master!.gain.setValueAtTime(Math.max(this.master!.gain.value, 0.0001), t);
    this.master!.gain.exponentialRampToValueAtTime(0.5, t + 3.2);

    this.startDrone();
    this.loopPlucks();
    this.loopBells();
    this.loopTabla();
  }

  stop(): void {
    if (!this.playing || !this.ctx || !this.master) return;
    this.playing = false;
    const t = this.ctx.currentTime;
    this.master.gain.cancelScheduledValues(t);
    this.master.gain.setValueAtTime(this.master.gain.value, t);
    this.master.gain.exponentialRampToValueAtTime(0.0001, t + 1.4);
    this.timers.forEach(clearTimeout);
    this.timers = [];
    window.setTimeout(() => {
      if (this.playing) return;
      this.stopDrone();
      this.ctx?.suspend().catch(() => undefined);
    }, 1600);
  }

  private startDrone() {
    if (!this.ctx || !this.master || this.droneOscs.length > 0) return;
    const notes = [
      { f: SA / 2, g: 0.05 },
      { f: SA, g: 0.075 },
      { f: SA * 1.5, g: 0.035 }, // Pa
      { f: SA * 2, g: 0.028 },
    ];
    notes.forEach(({ f, g }, idx) => {
      const osc = this.ctx!.createOscillator();
      osc.type = idx % 2 === 0 ? "sawtooth" : "triangle";
      osc.frequency.value = f;
      const gain = this.ctx!.createGain();
      gain.gain.value = 0;
      const lp = this.ctx!.createBiquadFilter();
      lp.type = "lowpass";
      lp.frequency.value = 420;
      osc.connect(lp);
      lp.connect(gain);
      gain.connect(this.master!);
      // slow breathing LFO
      const lfo = this.ctx!.createOscillator();
      lfo.frequency.value = 0.08 + idx * 0.03;
      const lfoGain = this.ctx!.createGain();
      lfoGain.gain.value = g * 0.35;
      lfo.connect(lfoGain);
      lfoGain.connect(gain.gain);
      const t = this.ctx!.currentTime;
      gain.gain.setTargetAtTime(g, t + idx * 0.4, 2.5);
      osc.start(t);
      lfo.start(t);
      this.droneOscs.push(osc, lfo);
      this.droneGains.push(gain);
    });
  }

  private stopDrone() {
    this.droneOscs.forEach((o) => {
      try {
        o.stop();
      } catch {
        /* already stopped */
      }
    });
    this.droneOscs = [];
    this.droneGains = [];
  }

  private pluck(freq: number, when: number, vel = 0.16) {
    const ctx = this.ctx!;
    const out = this.master!;
    const g = ctx.createGain();
    const lp = ctx.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.setValueAtTime(2400, when);
    lp.frequency.exponentialRampToValueAtTime(720, when + 1.8);
    g.gain.setValueAtTime(0.0001, when);
    g.gain.exponentialRampToValueAtTime(vel, when + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, when + 2.6);
    const partials = [
      { ratio: 1, amp: 1, type: "triangle" as OscillatorType },
      { ratio: 2.01, amp: 0.42, type: "sine" as OscillatorType },
      { ratio: 3.03, amp: 0.16, type: "sine" as OscillatorType },
      { ratio: 4.1, amp: 0.08, type: "sine" as OscillatorType },
    ];
    partials.forEach(({ ratio, amp, type }) => {
      const oscillator = ctx.createOscillator();
      const partialGain = ctx.createGain();
      oscillator.type = type;
      oscillator.frequency.setValueAtTime(freq * ratio, when);
      oscillator.frequency.linearRampToValueAtTime(freq * ratio * (1 + (Math.random() - 0.5) * 0.006), when + 0.38);
      partialGain.gain.value = amp;
      oscillator.connect(partialGain);
      partialGain.connect(g);
      oscillator.start(when);
      oscillator.stop(when + 2.8);
    });
    g.connect(lp);
    lp.connect(out);
  }

  private bell(freq: number, when: number) {
    const ctx = this.ctx!;
    const out = this.master!;
    const partials: Array<[number, number]> = [
      [1, 0.05],
      [2.76, 0.018],
      [5.4, 0.007],
    ];
    partials.forEach(([ratio, amp]) => {
      const osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.value = freq * ratio;
      const g = ctx.createGain();
      g.gain.setValueAtTime(0.0001, when);
      g.gain.exponentialRampToValueAtTime(amp, when + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, when + 4.5);
      osc.connect(g);
      g.connect(out);
      osc.start(when);
      osc.stop(when + 4.8);
    });
  }

  private loopPlucks() {
    if (!this.playing || !this.ctx) return;
    const schedule = () => {
      if (!this.playing || !this.ctx) return;
      const t = this.ctx.currentTime + 0.08;
      const base = SCALE[Math.floor(Math.random() * SCALE.length)];
      this.pluck(base, t, 0.1 + Math.random() * 0.08);
      // occasional graceful run of two neighbouring notes
      if (Math.random() < 0.42) {
        const step = SCALE[Math.max(0, SCALE.indexOf(base) + (Math.random() > 0.5 ? 1 : -1))];
        this.pluck(step ?? base, t + 0.24 + Math.random() * 0.1, 0.08);
        if (Math.random() < 0.4) this.pluck(base / 2, t + 0.52, 0.09);
      }
      const next = 1600 + Math.random() * 2100;
      this.timers.push(setTimeout(schedule, next));
    };
    this.timers.push(setTimeout(schedule, 1400));
  }

  private tabla(hitType: "dha" | "na", when: number) {
    if (!this.ctx || !this.master) return;
    const ctx = this.ctx;
    const out = this.master;

    if (hitType === "dha") {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(132, when);
      osc.frequency.exponentialRampToValueAtTime(82, when + 0.16);
      gain.gain.setValueAtTime(0.18, when);
      gain.gain.exponentialRampToValueAtTime(0.0001, when + 0.32);
      osc.connect(gain);
      gain.connect(out);
      osc.start(when);
      osc.stop(when + 0.35);
    } else {
      const bufferSize = ctx.sampleRate * 0.12;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
      const noise = ctx.createBufferSource();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.value = 2800;
      filter.Q.value = 1.2;
      noise.buffer = buffer;
      gain.gain.setValueAtTime(0.09, when);
      gain.gain.exponentialRampToValueAtTime(0.0001, when + 0.12);
      noise.connect(filter);
      filter.connect(gain);
      gain.connect(out);
      noise.start(when);
    }
  }

  private loopTabla() {
    if (!this.playing || !this.ctx) return;
    const pattern: Array<"dha" | "na"> = ["dha", "na", "dha", "dha", "na", "dha", "na", "dha"];
    let step = 0;
    const schedule = () => {
      if (!this.playing || !this.ctx) return;
      const when = this.ctx.currentTime + 0.08;
      this.tabla(pattern[step % pattern.length], when);
      step += 1;
      this.timers.push(setTimeout(schedule, 520));
    };
    this.timers.push(setTimeout(schedule, 2600));
  }

  private loopBells() {
    if (!this.playing || !this.ctx) return;
    const schedule = () => {
      if (!this.playing || !this.ctx) return;
      const t = this.ctx.currentTime + 0.1;
      const note = [587.33, 440.0, 739.99][Math.floor(Math.random() * 3)];
      this.bell(note, t);
      this.timers.push(setTimeout(schedule, 9500 + Math.random() * 8000));
    };
    this.timers.push(setTimeout(schedule, 5200));
  }
}

export const weddingMusic = new WeddingMusicEngine();

const PREF_KEY = "nn-music";

export function getMusicPref(): boolean {
  try {
    return window.sessionStorage.getItem(PREF_KEY) !== "off";
  } catch {
    return true;
  }
}

export function setMusicPref(on: boolean) {
  try {
    window.sessionStorage.setItem(PREF_KEY, on ? "on" : "off");
  } catch {
    /* ignore */
  }
}
