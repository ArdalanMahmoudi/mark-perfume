"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback } from "react";

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
  scrollPrevIcon?: React.ReactNode;
  scrollNextIcon?: React.ReactNode;
  navigation?: Boolean;
};

export default function Slider({
  slides,
  autoplay = false,
  loop = false,
  slidesToShow = 1,
  gap = 16,
  scrollNextIcon,
  scrollPrevIcon,
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
    <div className="relative" style={getSlideVars()}>
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
          <button
            onClick={scrollPrev}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10"
          >
            {scrollPrevIcon ? scrollPrevIcon : "→"}
          </button>
          <button
            onClick={scrollNext}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10"
          >
            {scrollNextIcon ? scrollNextIcon : "←"}
          </button>
        </>
      )}
    </div>
  );
}
