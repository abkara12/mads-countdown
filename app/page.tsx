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
    <div className="rounded-[18px] border border-[#ead49a]/15 bg-[#fff7df]/[0.055] px-2 py-3 text-center shadow-[0_14px_35px_rgba(0,0,0,0.24)] backdrop-blur-xl sm:rounded-[24px] sm:px-5 sm:py-6">
      <motion.div
        key={value}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="text-[2rem] font-semibold leading-none tracking-[-0.04em] text-[#fff1c8] sm:text-[3.2rem] lg:text-[4.2rem]"
      >
        {value}
      </motion.div>

      <div className="mt-1.5 text-[0.58rem] font-bold uppercase tracking-[0.22em] text-[#d9c17d]/80 sm:mt-2 sm:text-xs">
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
        <div className="absolute left-1/2 top-[-230px] h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[#d9b76f]/20 blur-[130px]" />
        <div className="absolute bottom-[-230px] left-[-180px] h-[460px] w-[460px] rounded-full bg-[#0f6b4c]/35 blur-[130px]" />
        <div className="absolute right-[-220px] top-[25%] h-[460px] w-[460px] rounded-full bg-[#f4dfad]/10 blur-[130px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#07110d_82%)]" />
      </div>

      <section className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1350px] items-center px-4 py-6 sm:px-8 lg:px-12">
        <div className="mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mx-auto max-w-[1050px] text-center"
          >
            <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-[#ead49a]/15 bg-[#fff8ea]/[0.075] px-4 py-2 text-[0.68rem] font-semibold text-[#f3dfb1]/80 backdrop-blur-xl sm:text-sm">
              <Sparkles size={14} className="text-[#e6c576]" />
              Final Year Madrassah Jalsah
            </div>

            <p className="mb-3 text-[0.62rem] font-bold uppercase tracking-[0.35em] text-[#d9b76f]/90 sm:text-xs">
              The Final Pages
            </p>

            <h1 className="mx-auto max-w-[1000px] bg-gradient-to-br from-[#fff9e8] via-[#e1bf72] to-[#fffef7] bg-clip-text pb-2 text-[2.05rem] font-semibold leading-[1.12] tracking-[-0.035em] text-transparent sm:text-[4rem] lg:text-[5.8rem]">
              Our Madrassah Journey Is Reaching Its Final Page
            </h1>

            <p className="mx-auto mt-3 max-w-[760px] text-[0.95rem] leading-6 text-[#f8edd2]/72 sm:text-lg sm:leading-8">
              Years of effort, brotherhood, lessons and Qur’ān — now counting down to our Jalsah.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.7 }}
            className="mx-auto mt-6 w-full max-w-[1120px] rounded-[28px] border border-[#ead49a]/12 bg-[#fff8ea]/[0.04] p-3 shadow-[0_30px_90px_rgba(0,0,0,0.34)] backdrop-blur-2xl sm:mt-8 sm:rounded-[34px] sm:p-5 lg:p-6"
          >
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-4 lg:gap-5">
              <TimeBlock value={timeLeft.days} label="Days" />
              <TimeBlock value={pad(timeLeft.hours)} label="Hours" />
              <TimeBlock value={pad(timeLeft.minutes)} label="Minutes" />
              <TimeBlock value={pad(timeLeft.seconds)} label="Seconds" />
            </div>

            <div className="mt-3 grid gap-3 sm:mt-5 sm:grid-cols-[0.9fr_1.7fr] sm:items-stretch">
              <div className="rounded-[20px] border border-[#ead49a]/10 bg-black/10 p-4 text-left">
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

              <div className="rounded-[20px] border border-[#ead49a]/10 bg-black/10 p-4">
                <div className="mb-3 flex items-center justify-between gap-3 text-[0.6rem] font-bold uppercase tracking-[0.18em] text-[#d8c18a]/70 sm:text-xs">
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
              </div>
            </div>
          </motion.div>

          <div className="mx-auto mt-4 flex items-center justify-center gap-2 text-center text-[0.72rem] text-[#f8edd2]/50 sm:mt-5 sm:text-sm">
            <Clock size={14} />
            <span>Every second is becoming part of the memory.</span>
          </div>
        </div>
      </section>
    </main>
  );
}