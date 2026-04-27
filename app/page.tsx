"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarDays, Crown, Share2 } from "lucide-react";

const TARGET_DATE = new Date("2026-12-12T09:00:00+02:00");

function getTimeLeft() {
  const diff = TARGET_DATE.getTime() - Date.now();

  if (diff <= 0) {
    return { finished: true, days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    finished: false,
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function pad(num: number) {
  return num.toString().padStart(2, "0");
}

function TimeBlock({ value, label }: { value: number | string; label: string }) {
  return (
    <motion.div
      animate={{
        boxShadow: [
          "0 0 0px rgba(217,183,111,0)",
          "0 0 30px rgba(217,183,111,0.25)",
          "0 0 0px rgba(217,183,111,0)",
        ],
      }}
      transition={{ duration: 1.2, repeat: Infinity }}
      className="relative overflow-hidden rounded-[24px] border border-[#ead49a]/20 bg-gradient-to-b from-[#fff8ea]/[0.09] to-[#fff8ea]/[0.035] p-4 text-center backdrop-blur-2xl"
    >
      <motion.div
        key={value}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="text-[2.6rem] font-black text-[#fff2c7] sm:text-[4rem] lg:text-[5.5rem]"
      >
        {value}
      </motion.div>

      <p className="mt-2 text-xs uppercase tracking-widest text-[#d9c17d]">
        {label}
      </p>
    </motion.div>
  );
}

export default function Home() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedDate = useMemo(() => {
    return TARGET_DATE.toLocaleDateString("en-ZA", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }, []);

  const share = () => {
    const text = `Our Madrassah Jalsah Countdown 🔥\n\n${window.location.href}`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#07110d] text-white">
      
      {/* BACKGROUND */}
      <div className="pointer-events-none fixed inset-0">
        <motion.div
          animate={{ x: [0, 40, 0], y: [0, 20, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute left-1/2 top-[-260px] h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-[#d9b76f]/20 blur-[140px]"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#07110d_85%)]" />
      </div>

      <section className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 text-center">

        <AnimatePresence>
          {timeLeft.finished ? (
            /* 🎉 EVENT MODE */
            <motion.div
              key="done"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6"
            >
              <h1 className="text-4xl font-black text-[#fff2c7] sm:text-6xl">
                🎉 Jalsah Day Has Arrived
              </h1>

              <p className="text-lg text-[#f8edd2]/80">
                This is the moment we worked for.
              </p>
            </motion.div>
          ) : (
            /* COUNTDOWN MODE */
            <motion.div
              key="countdown"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full max-w-[1100px]"
            >
              {/* HEADER */}
              <div className="mb-8 space-y-3">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#ead49a]/20 bg-[#fff8ea]/[0.08] px-4 py-2 text-xs">
                  <Crown size={14} />
                  Class of 2026
                </div>

                <h1 className="text-3xl font-black sm:text-5xl lg:text-6xl">
                  The Completion of Our Hifdh Journey
                </h1>

                <p className="text-[#f8edd2]/70">
                  The final countdown to our Jalsah.
                </p>
              </div>

              {/* TIMER */}
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                <TimeBlock value={timeLeft.days} label="Days" />
                <TimeBlock value={pad(timeLeft.hours)} label="Hours" />
                <TimeBlock value={pad(timeLeft.minutes)} label="Minutes" />
                <TimeBlock value={pad(timeLeft.seconds)} label="Seconds" />
              </div>

              {/* DATE */}
              <div className="mt-8 rounded-xl border border-[#ead49a]/10 bg-black/20 p-6">
                <CalendarDays className="mx-auto mb-3" />
                <p className="text-xs uppercase tracking-widest text-[#d8c18a]">
                  Jalsah Date
                </p>
                <p className="mt-2 text-lg">{formattedDate}</p>
              </div>

              {/* SHARE */}
              <button
                onClick={share}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#d9b76f] px-6 py-3 text-black font-semibold hover:scale-105 transition"
              >
                <Share2 size={16} />
                Share Countdown
              </button>
            </motion.div>
          )}
        </AnimatePresence>

      </section>
    </main>
  );
}