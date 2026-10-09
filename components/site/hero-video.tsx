"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import styles from "./hero-video.module.css";

export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [source, setSource] = useState<string>();
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  const [pausedByUser, setPausedByUser] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobile = window.matchMedia("(max-width: 767px)");
    const connection = (navigator as Navigator & {
      connection?: EventTarget & { saveData?: boolean };
    }).connection;
    let inView = false;
    let disposed = false;

    function syncPlayback() {
      if (!video) return;
      if (motion.matches || connection?.saveData || failed) {
        video.pause();
        setSource(undefined);
        return;
      }

      if (inView && document.visibilityState === "visible") {
        setSource(`/videos/burger-hero-${mobile.matches ? "mobile" : "desktop"}.webm`);
        if (!pausedByUser && video.readyState >= 2) {
          void video.play().catch(() => {
            if (!disposed) setPlaying(false);
          });
        } else if (pausedByUser) {
          video.pause();
        }
      } else {
        video.pause();
      }
    }

    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      syncPlayback();
    }, { threshold: 0.05 });
    observer.observe(video);
    video.addEventListener("loadeddata", syncPlayback);
    document.addEventListener("visibilitychange", syncPlayback);
    motion.addEventListener("change", syncPlayback);
    mobile.addEventListener("change", syncPlayback);
    connection?.addEventListener("change", syncPlayback);

    return () => {
      disposed = true;
      observer.disconnect();
      video.pause();
      video.removeEventListener("loadeddata", syncPlayback);
      document.removeEventListener("visibilitychange", syncPlayback);
      motion.removeEventListener("change", syncPlayback);
      mobile.removeEventListener("change", syncPlayback);
      connection?.removeEventListener("change", syncPlayback);
    };
  }, [pausedByUser, failed]);

  return (
    <>
      <picture className="absolute inset-0 block" aria-hidden="true">
        <source media="(max-width: 767px)" srcSet="/videos/burger-hero-mobile-poster.webp" />
        <img
          src="/videos/burger-hero-desktop-poster.webp"
          alt=""
          width={1280}
          height={720}
          fetchPriority="high"
          className="h-full w-full object-cover"
        />
      </picture>
      <video
        ref={videoRef}
        src={source}
        muted
        loop
        playsInline
        preload={source ? "auto" : "none"}
        aria-hidden="true"
        tabIndex={-1}
        onPlaying={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onError={() => { setFailed(true); setPlaying(false); }}
        className={`absolute inset-0 h-full w-full object-cover ${source && !failed ? "" : "invisible"}`}
      />
      <div className={`${styles.scrim} pointer-events-none absolute inset-0`} aria-hidden="true" />
      {source && !failed && (
        <button
          type="button"
          onClick={() => {
            if (playing) {
              setPausedByUser(true);
              videoRef.current?.pause();
            } else {
              setPausedByUser(false);
              void videoRef.current?.play().catch(() => setPlaying(false));
            }
          }}
          aria-label={playing ? "Pause background video" : "Play background video"}
          className="mono absolute right-5 top-5 z-20 inline-flex min-h-11 items-center gap-2 border border-white/40 bg-black/70 px-3 text-sm text-white hover:border-white hover:bg-black sm:right-8 sm:top-8"
        >
          {playing ? <Pause size={16} aria-hidden="true" /> : <Play size={16} aria-hidden="true" />}
          {playing ? "Pause" : "Play"}
        </button>
      )}
    </>
  );
}
