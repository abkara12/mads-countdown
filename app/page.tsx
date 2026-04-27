"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  CalendarDays,
  Clock,
  Sparkles,
  BookOpen,
  Users,
  Award,
} from "lucide-react";

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
    <div className="relative overflow-hidden rounded-[22px] border border-[#ead49a]/15 bg-[#fff8ea]/[0.06] p-4 text-center shadow-[0_18px_55px_rgba(0,0,0,0.28)] backdrop-blur-2xl sm:p-5 lg:p-6">
      <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#f3d98b]/80 to-transparent" />

      <motion.div
        key={value}
        initial={{ opacity: 0, y: 8, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.22 }}
        className="text-[2.45rem] font-bold leading-none tracking-[-0.055em] text-[#fff2c7] sm:text-[3.6rem] lg:text-[5rem]"
      >
        {value}
      </motion.div>

      <p className="mt-2 text-[0.62rem] font-bold uppercase tracking-[0.24em] text-[#d9c17d]/85 sm:text-xs">
        {label}
      </p>
    </div>
  );
}

function DetailCard({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-[22px] border border-[#ead49a]/12 bg-[#fff8ea]/[0.05] p-4 text-left shadow-[0_14px_45px_rgba(0,0,0,0.22)] backdrop-blur-xl">
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-[#d9b76f]/15 text-[#e6c576]">
        {icon}
      </div>

      <p className="text-[0.65rem] font-bold uppercase tracking-[0.22em] text-[#d8c18a]/65">
        {title}
      </p>

      <p className="mt-1.5 text-sm leading-6 text-[#fff3d6]/85">{text}</p>
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
        <div className="absolute left-1/2 top-[-260px] h-[620px] w-[620px] -translate-x-1/2 rounded-full bg-[#d9b76f]/20 blur-[140px]" />
        <div className="absolute bottom-[-260px] left-[-180px] h-[520px] w-[520px] rounded-full bg-[#0f6b4c]/35 blur-[140px]" />
        <div className="absolute right-[-220px] top-[28%] h-[520px] w-[520px] rounded-full bg-[#f4dfad]/10 blur-[140px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#07110d_82%)]" />
      </div>

      <section className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1450px] flex-col justify-center px-4 py-5 sm:px-8 lg:px-12">
        <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-10 xl:gap-14">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center lg:text-left"
          >
            <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-[#ead49a]/15 bg-[#fff8ea]/[0.075] px-4 py-2 text-[0.7rem] font-semibold text-[#f3dfb1]/80 backdrop-blur-xl sm:text-sm lg:mx-0">
              <Sparkles size={14} className="text-[#e6c576]" />
              Final Year Madrassah Jalsah
            </div>

            <p className="mb-3 text-[0.66rem] font-bold uppercase tracking-[0.35em] text-[#d9b76f]/90 sm:text-xs">
              The Final Pages
            </p>

            <h1 className="mx-auto max-w-[720px] bg-gradient-to-br from-[#fff9e8] via-[#e1bf72] to-[#fffef7] bg-clip-text pb-2 text-[2.25rem] font-bold leading-[1.08] tracking-[-0.045em] text-transparent sm:text-[4.1rem] lg:mx-0 lg:text-[5.35rem] xl:text-[6.15rem]">
              Our Madrassah Journey Is Reaching Its Final Page
            </h1>

            <p className="mx-auto mt-3 max-w-[620px] text-[0.98rem] leading-7 text-[#f8edd2]/75 sm:text-[1.15rem] sm:leading-8 lg:mx-0">
              Years of effort, brotherhood, lessons and Qur’ān — now counting down to our Jalsah.
            </p>

            <div className="mx-auto mt-5 max-w-[620px] rounded-[24px] border border-[#ead49a]/12 bg-[#fff8ea]/[0.05] p-4 text-center shadow-[0_16px_50px_rgba(0,0,0,0.22)] backdrop-blur-xl lg:mx-0 lg:text-left">
              <p className="text-[0.7rem] font-bold uppercase tracking-[0.25em] text-[#d8c18a]/65">
                A chapter written with effort
              </p>
              <p className="mt-2 text-sm leading-7 text-[#fff3d6]/80 sm:text-base">
                From daily lessons to final memories — this countdown is for every
                page, every sabaq, every correction, and every moment that made the
                journey special.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.7 }}
            className="w-full"
          >
            <div className="rounded-[30px] border border-[#ead49a]/12 bg-[#fff8ea]/[0.04] p-3 shadow-[0_30px_90px_rgba(0,0,0,0.34)] backdrop-blur-2xl sm:p-5 lg:p-6">
              <div className="grid grid-cols-2 gap-2.5 sm:gap-4">
                <TimeBlock value={timeLeft.days} label="Days" />
                <TimeBlock value={pad(timeLeft.hours)} label="Hours" />
                <TimeBlock value={pad(timeLeft.minutes)} label="Minutes" />
                <TimeBlock value={pad(timeLeft.seconds)} label="Seconds" />
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-[0.9fr_1.5fr]">
                <div className="rounded-[22px] border border-[#ead49a]/10 bg-black/10 p-4">
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

                <div className="rounded-[22px] border border-[#ead49a]/10 bg-black/10 p-4">
                  <div className="mb-3 flex items-center justify-between text-[0.62rem] font-bold uppercase tracking-[0.18em] text-[#d8c18a]/70 sm:text-xs">
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

                  <div className="mt-3 flex items-center gap-2 text-[0.72rem] text-[#f8edd2]/50 sm:text-sm">
                    <Clock size={14} />
                    <span>Every second is becoming part of the memory.</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}