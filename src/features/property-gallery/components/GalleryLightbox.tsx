"use client";

import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Counter from "yet-another-react-lightbox/plugins/counter";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/plugins/counter.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/styles.css";

import NextImage from "next/image";
import { GalleryLightboxProps } from "../types";

// ─── Next.js Image Adapter ────────────────────────────────────────────────────
// YARL renders its own <img> by default; this swaps it for Next.js <Image>
// so we keep automatic optimization and responsive sizing.

function NextJsImageAdapter({
  slide,
  rect,
}: {
  slide: { src: string; alt?: string; width?: number; height?: number };
  rect: { width: number; height: number };
}) {
  const width = Math.round(
    Math.min(rect.width, (rect.height / (slide.height ?? 1)) * (slide.width ?? 1))
  );
  const height = Math.round(
    Math.min(rect.height, (rect.width / (slide.width ?? 1)) * (slide.height ?? 1))
  );

  return (
    <div style={{ position: "relative", width, height }}>
      <NextImage
        src={slide.src}
        alt={slide.alt ?? "Property image"}
        fill
        sizes={`${Math.ceil((width / window.innerWidth) * 100)}vw`}
        style={{ objectFit: "contain" }}
      />
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function GalleryLightbox({
  images,
  currentIndex,
  isOpen,
  onClose,
  onIndexChange,
}: GalleryLightboxProps) {
  const slides = images.map((image) => ({
    src: image.src,
    alt: image.alt,
    width: image.width,
    height: image.height,
    description: image.caption,
  }));

  return (
    <Lightbox
      open={isOpen}
      close={onClose}
      slides={slides}
      index={currentIndex}
      on={{ view: ({ index }) => onIndexChange(index) }}
      plugins={[Captions, Counter, Thumbnails, Zoom]}
      render={{ slide: NextJsImageAdapter }}
      captions={{ showToggle: true, descriptionMaxLines: 3 }}
      counter={{ container: { style: { top: 0, bottom: "unset" } } }}
      thumbnails={{
        position: "bottom",
        width: 80,
        height: 60,
        border: 2,
        borderRadius: 4,
        padding: 4,
        gap: 8,
      }}
      zoom={{ maxZoomPixelRatio: 3, zoomInMultiplier: 1.5 }}
      styles={{
        container: { backgroundColor: "rgba(0, 0, 0, 0.95)" },
        slide: { padding: "0 40px" },
      }}
      controller={{ closeOnBackdropClick: true }}
    />
  );
}