"use client";
import { Slider } from "@/src/components/ui/slider";
import { useState } from "react";

export function SliderRange() {
  const [value, setValue] = useState([2_500_000, 5_000_000]);

  return (
    <>
      <Slider
        defaultValue={[2_500_000, 5_000_000]}
        max={10_000_000}
        min={0}
        step={100_000}
        value={value}
        onValueChange={setValue}
        className="mx-auto w-full max-w-xs"
      />
      <div className="flex justify-center gap-1 mt-3 text-sm text-primary">
        <span>{value[0].toLocaleString('fa-IR')} تومان</span>
        <span>-</span>
        <span>{value[1].toLocaleString('fa-IR')}تومان</span>
      </div>
    </>
  );
}
