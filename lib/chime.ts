"use client";

/**
 * Web Audio chime for the "order ready" moment. Mobile browsers block audio
 * until a user gesture, so `unlockChime()` must run inside a click/tap
 * handler before `playReadyChime()` can be heard.
 */

let audioCtx: AudioContext | null = null;
let unlocked = false;

function getContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  const AudioContextCtor =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext?: typeof AudioContext })
      .webkitAudioContext;
  if (!AudioContextCtor) return null;
  if (!audioCtx) audioCtx = new AudioContextCtor();
  return audioCtx;
}

export function unlockChime() {
  const ctx = getContext();
  if (!ctx) return;
  if (ctx.state === "suspended") ctx.resume();
  unlocked = true;
}

export function isChimeUnlocked() {
  return unlocked;
}

/** Two-tone rising chime marking a ticket flipping to READY. */
export function playReadyChime() {
  const ctx = getContext();
  if (!ctx) return;
  if (ctx.state === "suspended") ctx.resume();

  const now = ctx.currentTime;
  const notes: Array<[freq: number, start: number, dur: number]> = [
    [880, 0, 0.16],
    [1318.5, 0.14, 0.24],
  ];

  for (const [freq, start, dur] of notes) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, now + start);
    gain.gain.setValueAtTime(0, now + start);
    gain.gain.linearRampToValueAtTime(0.35, now + start + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, now + start + dur);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now + start);
    osc.stop(now + start + dur + 0.02);
  }
}
