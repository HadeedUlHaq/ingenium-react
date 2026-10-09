"use client";

import { useEffect, useId, useRef, type CSSProperties } from "react";
import { Beef, Sandwich } from "lucide-react";
import { Container } from "@/components/site/plate";
import styles from "./feature-video.module.css";

function GriddlePressIcon() {
  return (
    <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 8V5a3 3 0 0 1 6 0v3" />
      <path d="M5 8h14v3H5z" />
      <path d="M6 15c0-3 12-3 12 0v2H6z" />
      <path d="M2 19h20M4 19v3m16-3v3" />
    </svg>
  );
}

function CheeseIcon() {
  return (
    <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 12 17 3l4 9v8H3z" />
      <path d="M3 12h18M14 8h.01" />
      <path d="M8 16a1 1 0 1 0 0 .01M16 17a1 1 0 1 0 0 .01" />
    </svg>
  );
}

function SauceIcon() {
  return (
    <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 13h18c-1 6-4 8-9 8s-8-2-9-8Z" />
      <path d="M5 10c3-2 11-2 14 0" />
      <path d="m15 7 6-5M15 7c-2 2-5 2-6 0s1-4 3-4 5 2 3 4Z" />
    </svg>
  );
}

const STEPS = [
  { icon: Beef, title: "80/20 grass-fed beef", detail: "Fresh beef. The starting point." },
  { icon: GriddlePressIcon, title: "Pressed on hot steel", detail: "Smashed live. Cooked to order." },
  { icon: CheeseIcon, title: "Melted cheese", detail: "Straight onto the hot patty." },
  { icon: SauceIcon, title: "Signature house sauce", detail: "Our finishing touch." },
  { icon: Sandwich, title: "Served fresh, on-site", detail: "From the griddle to your guests." },
] as const;

/** Original process diagram; export name retained for page integration. */
export function FeatureVideo() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingId = useId();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (typeof IntersectionObserver === "undefined") return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let inView = false;
    const sync = () => {
      section.dataset.running = String(inView && !document.hidden && !motion.matches);
    };
    const observer = new IntersectionObserver(([entry]) => {
        inView = entry.isIntersecting;
        sync();
      }, { threshold: 0.1 });

    observer.observe(section);
    document.addEventListener("visibilitychange", sync);
    motion.addEventListener("change", sync);
    sync();

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
      motion.removeEventListener("change", sync);
      section.dataset.running = "false";
    };
  }, []);

  return (
    <section ref={sectionRef} aria-labelledby={headingId} className={styles.section}>
      <Container>
        <h2 id={headingId} className={`display ${styles.heading}`}>
          From fresh beef to first bite.
        </h2>
        <p className={`mono ${styles.intro}`}>
          Smashed live at your venue. Finished with our signature house sauce.
        </p>

        <div className={styles.process}>
          <svg className={styles.desktopPath} viewBox="0 0 1000 240" preserveAspectRatio="none" aria-hidden="true">
            <path className={styles.track} d="M100 40 C200 40 200 140 300 140 S400 40 500 40 S600 140 700 140 S800 40 900 40" />
            <path className={styles.draw} pathLength="1" d="M100 40 C200 40 200 140 300 140 S400 40 500 40 S600 140 700 140 S800 40 900 40" />
          </svg>
          <svg className={styles.mobilePath} viewBox="0 0 64 512" aria-hidden="true">
            <path className={styles.track} d="M32 32 V480" />
            <path className={styles.draw} pathLength="1" d="M32 32 V480" />
          </svg>

          <ol className={styles.steps}>
            {STEPS.map(({ icon: Icon, title, detail }, index) => (
              <li key={title} className={styles.step} style={{ "--step-delay": `${index * 0.8}s` } as CSSProperties}>
                <span className={styles.icon}>
                  <Icon aria-hidden="true" />
                </span>
                <div className={styles.copy}>
                  <h3 className={`display ${styles.title}`}>{title}</h3>
                  <p className={`mono ${styles.detail}`}>{detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
