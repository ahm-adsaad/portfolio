'use client';

import { useEffect, useRef, useState } from 'react';
import { preload } from 'react-dom';

type Props = {
  /** Full-size MP4 (H.264), used from 768px up. */
  src: string;
  /** Smaller MP4 for phones. Falls back to `src` when omitted. */
  srcMobile?: string;
  /** Poster frame (JPEG); also the only thing painted before hydration. */
  poster: string;
  /** WebP twin of the poster, preferred when the browser supports it. */
  posterWebp?: string;
  width: number;
  height: number;
  /**
   * `muted`: desaturated and darkened under a heavy ink wash (About).
   * `vivid`: near-natural colour, lighter wash kept to the text side (home).
   */
  tone?: 'muted' | 'vivid';
  /** Preload the poster: set on the hero that is the page's LCP. */
  priority?: boolean;
};

/**
 * Ambient background loop behind a page hero (DESIGN.md section 7). The
 * poster is server-rendered so the hero paints on the first frame with no
 * layout shift; the <video> mounts only on the client, and only when the
 * visitor has not asked for reduced motion or data saving. It pauses while
 * off screen or in a background tab so it never burns battery for nothing.
 * Decorative: both layers are hidden from assistive tech.
 */
export function HeroVideo({
  src,
  srcMobile,
  poster,
  posterWebp,
  width,
  height,
  tone = 'muted',
  priority = false,
}: Props) {
  const [enabled, setEnabled] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  if (priority) {
    preload(posterWebp ?? poster, { as: 'image', fetchPriority: 'high' });
  }

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const connection = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection;
    if (reduce.matches || connection?.saveData) return;
    setEnabled(true);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const sync = (visible: boolean) => {
      if (visible && document.visibilityState === 'visible') {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => sync(entry?.isIntersecting ?? false),
      { threshold: 0.05 }
    );
    observer.observe(video);

    const onVisibility = () => sync(true);
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [enabled]);

  return (
    <div className={`hero-media hero-media--${tone}`} aria-hidden="true">
      <picture>
        {posterWebp && <source srcSet={posterWebp} type="image/webp" />}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={poster}
          alt=""
          width={width}
          height={height}
          decoding="async"
          fetchPriority={priority ? 'high' : undefined}
        />
      </picture>
      {enabled && (
        <video
          ref={videoRef}
          className="hero-media-video"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={posterWebp ?? poster}
          width={width}
          height={height}
          disablePictureInPicture
        >
          {srcMobile && (
            <source src={srcMobile} type="video/mp4" media="(max-width: 767px)" />
          )}
          <source src={src} type="video/mp4" />
        </video>
      )}
    </div>
  );
}
