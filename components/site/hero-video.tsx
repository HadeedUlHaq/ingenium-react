"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./hero-video.module.css";

export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [source, setSource] = useState<string>();
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobile = window.matchMedia("(max-width: 767px)");
    const connection = (navigator as Navigator & {
      connection?: EventTarget & { saveData?: boolean };
    }).connection;
    let inView = false;

    function syncPlayback() {
      if (!video) return;
      if (motion.matches || connection?.saveData || failed) {
        video.pause();
        setSource(undefined);
        return;
      }

      if (inView && document.visibilityState === "visible") {
        setSource(`/videos/burger-hero-${mobile.matches ? "mobile" : "desktop"}.webm`);
        if (video.readyState >= 2) {
          // Autoplay may be blocked; keep the poster as the safe fallback.
          void video.play().catch(() => {});
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
      observer.disconnect();
      video.pause();
      video.removeEventListener("loadeddata", syncPlayback);
      document.removeEventListener("visibilitychange", syncPlayback);
      motion.removeEventListener("change", syncPlayback);
      mobile.removeEventListener("change", syncPlayback);
      connection?.removeEventListener("change", syncPlayback);
    };
  }, [failed]);

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
        onError={() => setFailed(true)}
        className={`absolute inset-0 h-full w-full object-cover ${source && !failed ? "" : "invisible"}`}
      />
      <div className={`${styles.scrim} pointer-events-none absolute inset-0`} aria-hidden="true" />
    </>
  );
}
