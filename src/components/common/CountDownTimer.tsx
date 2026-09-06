"use client";
import { useEffect, useState } from "react";

type CountdownTimerProps = {
  endDate: Date | string;
};

const toPersianDigits = (num: number) =>
  num.toString().padStart(2, "0").replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[+d]);

const CountdownTimer = ({ endDate }: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const target = new Date(endDate).getTime();

    const updateTimer = () => {
      const now = Date.now();
      const diff = target - now;

      if (diff <= 0) {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        hours: Math.floor(diff / (1000 * 60 * 60)),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [endDate]);

  return (
    <div className="flex items-center justify-center gap-1 text-sm font-bold" dir="ltr">
      <span className="bg-primary text-white rounded-md size-8 flex items-center justify-center">
        {toPersianDigits(timeLeft.hours)}
      </span>
      <span className="text-primary">:</span>
      <span className="bg-primary text-white rounded-md size-8 flex items-center justify-center">
        {toPersianDigits(timeLeft.minutes)}
      </span>
      <span className="text-primary">:</span>
      <span className="bg-primary text-white rounded-md size-8 flex items-center justify-center">
        {toPersianDigits(timeLeft.seconds)}
      </span>
    </div>
  );
};

export default CountdownTimer;