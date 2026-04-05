// features/testimonials/useTestimonials.ts

"use client";

import { useState, useCallback, useEffect, useRef, useMemo } from "react";
import type { Testimonial, TestimonialSliderState } from "./types";
import { mockTestimonials } from "./mocks";

const AUTOPLAY_INTERVAL = 6000;

export const useTestimonials = () => {
    /*  const {
       data: response,
       isLoading,
       isError,
       error,
     } = useFeaturedTestimonialsQuery(); */

    /*  const testimonials = useMemo(
       () => response?.data ?? [],
       [response?.data]
     ); */
    const testimonials = mockTestimonials
    const [sliderState, setSliderState] = useState<TestimonialSliderState>({
        activeIndex: 0,
        direction: "right",
        isAutoPlaying: true,
    });

    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const totalSlides = testimonials.length;

    // ─── Navigation ──────────────────────────────────────────────
    const goToSlide = useCallback(
        (index: number) => {
            setSliderState((prev) => ({
                ...prev,
                activeIndex: index % totalSlides,
                direction: index > prev.activeIndex ? "right" : "left",
            }));
        },
        [totalSlides]
    );

    const goNext = useCallback(() => {
        setSliderState((prev) => ({
            ...prev,
            activeIndex: (prev.activeIndex + 1) % totalSlides,
            direction: "right",
        }));
    }, [totalSlides]);

    const goPrev = useCallback(() => {
        setSliderState((prev) => ({
            ...prev,
            activeIndex: (prev.activeIndex - 1 + totalSlides) % totalSlides,
            direction: "left",
        }));
    }, [totalSlides]);

    const toggleAutoPlay = useCallback(() => {
        setSliderState((prev) => ({
            ...prev,
            isAutoPlaying: !prev.isAutoPlaying,
        }));
    }, []);

    // ─── Autoplay Effect ────────────────────────────────────────
    useEffect(() => {
        if (sliderState.isAutoPlaying && totalSlides > 1) {
            intervalRef.current = setInterval(goNext, AUTOPLAY_INTERVAL);
        }
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [sliderState.isAutoPlaying, totalSlides, goNext]);

    // Pause autoplay on user interaction, resume after delay
    const pauseAutoPlay = useCallback(() => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = null;
    }, []);

    const resumeAutoPlay = useCallback(() => {
        if (sliderState.isAutoPlaying && totalSlides > 1) {
            intervalRef.current = setInterval(goNext, AUTOPLAY_INTERVAL);
        }
    }, [sliderState.isAutoPlaying, totalSlides, goNext]);

    // ─── Derived State ──────────────────────────────────────────
    const activeTestimonial: Testimonial | undefined =
        testimonials[sliderState.activeIndex];

    const averageRating = useMemo(() => {
        if (!testimonials.length) return 0;
        const sum = testimonials.reduce((acc, t) => acc + t.rating, 0);
        return Math.round((sum / testimonials.length) * 10) / 10;
    }, [testimonials]);

    return {
        testimonials,
        activeTestimonial,
        averageRating,
        totalSlides,

        activeIndex: sliderState.activeIndex,
        direction: sliderState.direction,
        isAutoPlaying: sliderState.isAutoPlaying,

        goToSlide,
        goNext,
        goPrev,
        toggleAutoPlay,
        pauseAutoPlay,
        resumeAutoPlay,
/* 
        isLoading,
        isError,
        error, */
    };
};