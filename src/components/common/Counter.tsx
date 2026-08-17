import React, { useEffect, useRef, useState } from "react";

const Counter = ({end, suffix = "", className}:{end:number, suffix?:string, className?:string}) => {
  const ref = useRef<HTMLElement>(null);
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el)
    return () => observer.disconnect()
  }, []);

  useEffect(() => {
    if (!started) return
    const duration = 1500
    const startTime = performance.now()
    let raf:number;
    function tick(now:number) {
        const progress = Math.min((now - startTime) / duration,1)
        const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        setCount(Math.floor(eased * end))
        if (progress < 1) {
            raf = requestAnimationFrame(tick)
        }
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  },[started,end])
  return (
    <span ref={ref} className={className}>
        {count.toLocaleString("fa-IR")}
        {suffix}
    </span>
  );
};

export default Counter;
