"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { CalendarDays, Clock, Sparkles } from "lucide-react";

const TARGET_DATE = new Date("2026-12-12T09:00:00+02:00");
const START_DATE = new Date("2026-04-27T00:00:00+02:00");

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
    <div className="flex min-h-[92px] flex-col items-center justify-center rounded-[22px] border border-[#ead49a]/15 bg-[#fff8ea]/[0.06] px-3 py-3 text-center shadow-[0_16px_45px_rgba(0,0,0,0.26)] backdrop-blur-2xl sm:min-h-[130px] lg:min-h-[165px]">
      <motion.div
        key={value}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="text-[2rem] font-bold leading-none tracking-[-0.04em] text-[#fff2c7] sm:text-[3.3rem] lg:text-[5rem]"
      >
        {value}
      </motion.div>

      <div className="mt-2 text-[0.6rem] font-bold uppercase tracking-[0.22em] text-[#d9c17d]/85 sm:text-xs">
        {label}
      </div>
    </div>
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

  const progress = useMemo(() => {
    const total = TARGET_DATE.getTime() - START_DATE.getTime();
    const passed = Date.now() - START_DATE.getTime();
    return Math.min(100, Math.max(0, (passed / total) * 100));
  }, [timeLeft]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#07110d] text-white">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute left-1/2 top-[-220px] h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[#d9b76f]/22 blur-[130px]" />
        <div className="absolute bottom-[-220px] left-[-180px] h-[460px] w-[460px] rounded-full bg-[#0f6b4c]/35 blur-[130px]" />
        <div className="absolute right-[-200px] top-[25%] h-[460px] w-[460px] rounded-full bg-[#f4dfad]/10 blur-[130px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#07110d_82%)]" />
      </div>

      <section className="relative z-10 mx-auto grid min-h-screen w-full max-w-[1450px] grid-rows-[auto_1fr_auto] px-4 py-4 sm:px-8 sm:py-6 lg:px-12">
        {/* TOP */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col items-center text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-[#ead49a]/15 bg-[#fff8ea]/[0.075] px-4 py-2 text-[0.68rem] font-semibold text-[#f3dfb1]/80 backdrop-blur-xl sm:text-sm">
            <Sparkles size={14} className="text-[#e6c576]" />
            Final Year Madrassah Jalsah
          </div>

          <p className="mt-4 text-[0.62rem] font-bold uppercase tracking-[0.35em] text-[#d9b76f]/90 sm:text-xs">
            The Final Pages
          </p>
        </motion.div>

        {/* MIDDLE */}
        <div className="grid min-h-0 items-center gap-5 py-4 lg:grid-cols-[0.95fr_1.05fr] lg:gap-10 xl:gap-14">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08, duration: 0.7 }}
            className="text-center lg:text-left"
          >
            <h1 className="mx-auto max-w-[720px] bg-gradient-to-br from-[#fff9e8] via-[#e1bf72] to-[#fffef7] bg-clip-text pb-2 text-[2.15rem] font-bold leading-[1.08] tracking-[-0.045em] text-transparent sm:text-[4.2rem] lg:mx-0 lg:text-[5.5rem] xl:text-[6.3rem]">
              Our Madrassah Journey Is Reaching Its Final Page
            </h1>

            <p className="mx-auto mt-3 max-w-[650px] text-[0.98rem] leading-7 text-[#f8edd2]/75 sm:text-[1.2rem] sm:leading-8 lg:mx-0">
              Years of effort, brotherhood, lessons and Qur’ān — now counting down to our Jalsah.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16, duration: 0.7 }}
            className="w-full"
          >
            <div className="mx-auto w-full max-w-[760px] rounded-[30px] border border-[#ead49a]/12 bg-[#fff8ea]/[0.04] p-3 shadow-[0_30px_90px_rgba(0,0,0,0.34)] backdrop-blur-2xl sm:p-5 lg:max-w-none">
              <div className="grid grid-cols-2 gap-2.5 sm:gap-4">
                <TimeBlock value={timeLeft.days} label="Days" />
                <TimeBlock value={pad(timeLeft.hours)} label="Hours" />
                <TimeBlock value={pad(timeLeft.minutes)} label="Minutes" />
                <TimeBlock value={pad(timeLeft.seconds)} label="Seconds" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* BOTTOM */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.24, duration: 0.7 }}
          className="grid gap-3 sm:grid-cols-[0.8fr_1.2fr] sm:items-center"
        >
          <div className="rounded-[22px] border border-[#ead49a]/12 bg-[#fff8ea]/[0.05] p-4 backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#d9b76f]/15 text-[#e6c576]">
                <CalendarDays size={19} />
              </div>

              <div>
                <p className="text-[0.6rem] font-bold uppercase tracking-[0.2em] text-[#d8c18a]/65">
                  Jalsah Date
                </p>
                <p className="mt-0.5 text-sm font-semibold text-[#fff3d6] sm:text-base">
                  {formattedDate}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-[22px] border border-[#ead49a]/12 bg-[#fff8ea]/[0.05] p-4 backdrop-blur-xl">
            <div className="mb-2.5 flex items-center justify-between text-[0.62rem] font-bold uppercase tracking-[0.18em] text-[#d8c18a]/70 sm:text-xs">
              <span>Journey Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>

            <div className="h-2.5 overflow-hidden rounded-full bg-[#fff8ea]/10">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1.1, ease: "easeOut" }}
                className="h-full rounded-full bg-gradient-to-r from-[#8f7133] via-[#d9b76f] to-[#fff2bd]"
              />
            </div>

            <div className="mt-3 flex items-center justify-center gap-2 text-center text-[0.72rem] text-[#f8edd2]/50 sm:text-sm">
              <Clock size={14} />
              <span>Every second is becoming part of the memory.</span>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}