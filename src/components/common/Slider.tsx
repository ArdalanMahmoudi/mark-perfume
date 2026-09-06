"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

type Responsive = {
  default: number;
  sm?: number;
  md?: number;
  lg?: number;
};

type Props = {
  slides: React.ReactNode[];
  autoplay?: boolean;
  loop?: boolean;
  slidesToShow?: number | Responsive;
  gap?: number;
  navigation?: Boolean;
};

export default function Slider({
  slides,
  autoplay = false,
  loop = false,
  slidesToShow = 1,
  gap = 16,
  navigation = false,
}: Props) {
  const plugins = autoplay
    ? [
        Autoplay({
          delay: 3000,
          stopOnInteraction: false,
          stopOnMouseEnter: false,
          stopOnFocusIn: false,
        }),
      ]
    : [];

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { direction: "rtl", loop, align: "start" },
    plugins,
  );

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const getSlideVars = () => {
    if (typeof slidesToShow === "number") {
      return { "--slides-default": slidesToShow } as React.CSSProperties;
    }
    return {
      "--slides-default": slidesToShow.default,
      "--slides-sm": slidesToShow.sm ?? slidesToShow.default,
      "--slides-md": slidesToShow.md ?? slidesToShow.sm ?? slidesToShow.default,
      "--slides-lg":
        slidesToShow.lg ??
        slidesToShow.md ??
        slidesToShow.sm ??
        slidesToShow.default,
    } as React.CSSProperties;
  };

  return (
    <div className="relative group" style={getSlideVars()}>
      <div className="overflow-hidden py-1" ref={emblaRef}>
        <div className="flex" style={{ marginRight: `-${gap}px` }}>
          {slides.map((slide, i) => (
            <div
              key={i}
              className="
              block relative
                flex-[0_0_calc(100%/var(--slides-default))]
                sm:flex-[0_0_calc(100%/var(--slides-sm,var(--slides-default)))]
                md:flex-[0_0_calc(100%/var(--slides-md,var(--slides-sm,var(--slides-default))))]
                lg:flex-[0_0_calc(100%/var(--slides-lg,var(--slides-md,var(--slides-sm,var(--slides-default)))))]
                min-w-0
              "
              style={{ paddingRight: `${gap}px` }}
            >
              {slide}
            </div>
          ))}
        </div>
      </div>
      {navigation && (
        <>
          {/* Prev-Slide */}
          <button
            type="button"
            onClick={scrollPrev}
            aria-label="Next slide"
            className="
              absolute top-1/2 -translate-y-1/2 right-2 z-10
              flex size-10 items-center justify-center
              rounded-full
              border border-white/30
              bg-black/40
              text-white
              shadow-lg
              backdrop-blur-md
              opacity-0 group-hover:opacity-100
              transition-all duration-300
              hover:bg-white
              hover:text-black
              hover:scale-105
              active:scale-90
            "
          >
            <ChevronRightIcon className="size-5" strokeWidth={1.8} />
          </button>
          {/* Next-Slide */}
          <button
            onClick={scrollNext}
            type="button"
            aria-label="Previous slide"
            className="
              absolute top-1/2 -translate-y-1/2 left-2 z-10
              flex size-10 items-center justify-center
              rounded-full
              border border-white/30
              bg-black/40
              text-white
              shadow-lg
              backdrop-blur-md
              opacity-0 group-hover:opacity-100
              transition-all duration-300
              hover:bg-white
              hover:text-black
              hover:scale-105
              active:scale-90
            "
          >
            <ChevronLeftIcon className="size-5" strokeWidth={1.8} />
          </button>
        </>
      )}
    </div>
  );
}