"use client";
import { useState, useEffect } from "react";

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState(7 * 24 * 60 * 60);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const days = Math.floor(timeLeft / (24 * 60 * 60));
  const hours = Math.floor((timeLeft % (24 * 60 * 60)) / (60 * 60));
  const mins = Math.floor((timeLeft % (60 * 60)) / 60);
  const secs = timeLeft % 60;

  return (
    <div className="font-[family-name:var(--font-geist-mono)] flex gap-4 text-[#D32F2F] font-bold text-2xl md:text-4xl mt-8">
      <div className="flex flex-col items-center">
        <span>{String(days).padStart(2, '0')}</span>
        <span className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-widest mt-1">Days</span>
      </div>
      <span>:</span>
      <div className="flex flex-col items-center">
        <span>{String(hours).padStart(2, '0')}</span>
        <span className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-widest mt-1">Hrs</span>
      </div>
      <span>:</span>
      <div className="flex flex-col items-center">
        <span>{String(mins).padStart(2, '0')}</span>
        <span className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-widest mt-1">Min</span>
      </div>
      <span>:</span>
      <div className="flex flex-col items-center">
        <span>{String(secs).padStart(2, '0')}</span>
        <span className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-widest mt-1">Sec</span>
      </div>
    </div>
  );
}
