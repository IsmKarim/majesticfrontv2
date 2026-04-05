"use client";

import { useCallback, useMemo, useState } from "react";
import { create } from "zustand";
import { GalleryImage, GalleryTag } from "./types";

// ─── Zustand Store ────────────────────────────────────────────────────────────
// Persists lightbox state across re-renders without prop drilling.

interface GalleryStore {
    activeIndex: number;
    isLightboxOpen: boolean;
    setActiveIndex: (index: number) => void;
    openLightbox: (index: number) => void;
    closeLightbox: () => void;
}

export const useGalleryStore = create<GalleryStore>((set) => ({
    activeIndex: 0,
    isLightboxOpen: false,
    setActiveIndex: (index) => set({ activeIndex: index }),
    openLightbox: (index) => set({ isLightboxOpen: true, activeIndex: index }),
    closeLightbox: () => set({ isLightboxOpen: false }),
}));

// ─── Main Logic Hook ──────────────────────────────────────────────────────────

export function usePropertyGallery(propertyId: string) {
    const { activeIndex, isLightboxOpen, openLightbox, closeLightbox, setActiveIndex } =
        useGalleryStore();

    const [activeTag, setActiveTag] = useState<GalleryTag | "all">("all");

    const images = [
        {
            id: "4",
            src: "/assets/villa.jpg",
            alt: "lol",
            width: 1080,
            height: 720,
            caption: "LLOL"
        }, {
            id: "4",
            src: "/assets/riad.jpg",
            alt: "lol",
            width: 1080,
            height: 720,
            caption: "LLOL"
        },{
            id: "4",
            src: "/assets/villa2.jpg",
            alt: "lol",
            width: 1080,
            height: 720,
            caption: "LLOL"
        }  ,{
            id: "4",
            src: "/assets/villa3.jpg",
            alt: "lol",
            width: 1080,
            height: 720,
            caption: "LLOL"
        }
    ]


    const availableTags = useMemo<Array<GalleryTag | "all">>(() => {
        const tags = new Set<GalleryTag>();
        images.forEach((img) => {
            if (img.tag) tags.add(img.tag);
        });
        return ["all", ...Array.from(tags)];
    }, [images]);

    const filteredImages = useMemo<GalleryImage[]>(() => {
        if (activeTag === "all") return images;
        return images.filter((img) => img.tag === activeTag);
    }, [images, activeTag]);

    const heroImage = filteredImages[0] ?? null;
    const gridImages = filteredImages.slice(1, 5);
    const remainingCount = Math.max(0, filteredImages.length - 5);

    // ── Handlers ─────────────────────────────────────────────────────────────

    const handleImageClick = useCallback(
        (index: number) => {
            openLightbox(index);
        },
        [openLightbox]
    );

    const handleLightboxClose = useCallback(() => {
        closeLightbox();
    }, [closeLightbox]);

    const handleIndexChange = useCallback(
        (index: number) => {
            setActiveIndex(index);
        },
        [setActiveIndex]
    );

    const handleTagChange = useCallback((tag: GalleryTag | "all") => {
        setActiveTag(tag);
    }, []);

    return {
        // Data
        images: filteredImages,
        heroImage,
        gridImages,
        remainingCount,

        // Filter
        activeTag,
        availableTags,

        // Lightbox
        activeIndex,
        isLightboxOpen,

        // Handlers
        handleImageClick,
        handleLightboxClose,
        handleIndexChange,
        handleTagChange,
    };
}