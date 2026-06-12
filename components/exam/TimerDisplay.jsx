// components/exam/TimerDisplay.jsx
// ⏱️ Real-time Countdown Timer
// Color changes based on time remaining

"use client";

import { useState, useEffect, useRef } from "react";
import { FaClock } from "react-icons/fa";

// English number → Bangla number converter
const toBanglaNumber = (num) => {
  const banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return String(num)
    .split("")
    .map((d) => banglaDigits[d] ?? d)
    .join("");
};

// Format seconds → MM:SS or HH:MM:SS
const formatTime = (totalSeconds) => {
  if (!totalSeconds || isNaN(totalSeconds) || totalSeconds < 0) {
    return toBanglaNumber("00:00");
  }

  const safeSeconds = Math.max(0, Math.floor(totalSeconds));
  const hours = Math.floor(safeSeconds / 3600);
  const minutes = Math.floor((safeSeconds % 3600) / 60);
  const seconds = safeSeconds % 60;

  const pad = (n) => String(n).padStart(2, "0");

  if (hours > 0) {
    return `${toBanglaNumber(pad(hours))}:${toBanglaNumber(pad(minutes))}:${toBanglaNumber(pad(seconds))}`;
  }
  return `${toBanglaNumber(pad(minutes))}:${toBanglaNumber(pad(seconds))}`;
};

// Helper: Calculate remaining seconds
const calculateRemaining = (durationMinutes, startedAt) => {
  const durationSeconds = (Number(durationMinutes) || 60) * 60;

  if (!startedAt) return durationSeconds;

  try {
    const startTime = new Date(startedAt).getTime();
    if (isNaN(startTime)) return durationSeconds;

    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    return Math.max(0, durationSeconds - elapsed);
  } catch {
    return durationSeconds;
  }
};

export default function TimerDisplay({ durationMinutes, onTimeEnd, startedAt }) {
  const durationSeconds = (Number(durationMinutes) || 60) * 60;

  const [remainingSeconds, setRemainingSeconds] = useState(() =>
    calculateRemaining(durationMinutes, startedAt)
  );

  const hasFiredEndRef = useRef(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const newRemaining = calculateRemaining(durationMinutes, startedAt);

      setRemainingSeconds(newRemaining);

      if (newRemaining <= 0 && !hasFiredEndRef.current) {
        hasFiredEndRef.current = true;
        if (onTimeEnd) onTimeEnd();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [durationMinutes, startedAt, onTimeEnd]);

  // Color based on time left
  const percentLeft = durationSeconds > 0 ? (remainingSeconds / durationSeconds) * 100 : 0;

  // 🟢 Safe — 50%+ বাকি
  let colorClasses = "bg-green-50 border-green-200 text-green-700";
  let iconColor = "text-green-600";

  // 🔴 Danger — 25% বা কম বাকি
  if (percentLeft <= 25) {
    colorClasses = "bg-red-50 border-red-200 text-red-700 animate-pulse";
    iconColor = "text-red-600";
  }
  // 🟡 Warning — 25–50% বাকি
  else if (percentLeft <= 50) {
    colorClasses = "bg-amber-50 border-amber-200 text-amber-700";
    iconColor = "text-amber-600";
  }

  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-all duration-300 ${colorClasses}`}
    >
      <FaClock size={16} className={`${iconColor} shrink-0`} />
      <div className="flex flex-col">
        <span className="text-[10px] opacity-60 leading-none mb-0.5 font-medium">বাকি সময়</span>
        <span className="text-base font-bold tabular-nums leading-none">
          {formatTime(remainingSeconds)}
        </span>
      </div>
    </div>
  );
}
