"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { CalendarDays, Sparkles, Crown, BookOpen } from "lucide-react";

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
      whileHover={{ y: -4, scale: 1.015 }}
      transition={{ duration: 0.25 }}
      className="relative overflow-hidden rounded-[24px] border border-[#ead49a]/20 bg-gradient-to-b from-[#fff8ea]/[0.09] to-[#fff8ea]/[0.035] p-4 text-center shadow-[0_20px_70px_rgba(0,0,0,0.34)] backdrop-blur-2xl sm:p-5 lg:p-6"
    >
      <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-[#f3d98b] to-transparent" />
      <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-[#d9b76f]/10 blur-2xl" />

      <motion.div
        key={value}
        initial={{ opacity: 0, y: 10, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.22 }}
        className="text-[2.65rem] font-black leading-none tracking-[-0.065em] text-[#fff2c7] drop-shadow-[0_0_22px_rgba(217,183,111,0.28)] sm:text-[3.8rem] lg:text-[5.25rem]"
      >
        {value}
      </motion.div>

      <p className="mt-2 text-[0.62rem] font-bold uppercase tracking-[0.26em] text-[#d9c17d]/90 sm:text-xs">
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

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#07110d] text-white">
      <div className="pointer-events-none fixed inset-0">
        <motion.div
          animate={{ x: [0, 35, 0], y: [0, 20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-1/2 top-[-260px] h-[620px] w-[620px] -translate-x-1/2 rounded-full bg-[#d9b76f]/20 blur-[140px]"
        />
        <motion.div
          animate={{ x: [0, -30, 0], y: [0, -20, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-260px] left-[-180px] h-[520px] w-[520px] rounded-full bg-[#0f6b4c]/35 blur-[140px]"
        />
        <div className="absolute right-[-220px] top-[28%] h-[520px] w-[520px] rounded-full bg-[#f4dfad]/10 blur-[140px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#07110d_82%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:58px_58px]" />
      </div>

      <section className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1450px] flex-col justify-center px-4 py-5 sm:px-8 lg:px-12">
        <div className="grid gap-7 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-12 xl:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center lg:text-left"
          >
            <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-[#ead49a]/20 bg-[#fff8ea]/[0.08] px-4 py-2 text-[0.7rem] font-semibold text-[#f3dfb1]/85 shadow-[0_0_40px_rgba(217,183,111,0.12)] backdrop-blur-xl sm:text-sm lg:mx-0">
              <Crown size={14} className="text-[#e6c576]" />
              Class of 2026
            </div>

            <p className="mb-3 text-[0.66rem] font-bold uppercase tracking-[0.35em] text-[#d9b76f]/90 sm:text-xs">
              The Final Chapter
            </p>

            <h1 className="mx-auto max-w-[760px] bg-gradient-to-br from-[#fff9e8] via-[#e1bf72] to-[#fffef7] bg-clip-text pb-3 text-[2.45rem] font-black leading-[1.05] tracking-[-0.055em] text-transparent sm:text-[4.35rem] lg:mx-0 lg:text-[5.55rem] xl:text-[6.25rem]">
              The End of a Sacred Journey
            </h1>

            <p className="mx-auto mt-3 max-w-[640px] text-[1rem] leading-7 text-[#f8edd2]/76 sm:text-[1.16rem] sm:leading-8 lg:mx-0">
              Years of discipline, sacrifice and Qur’ān — all leading to one unforgettable Jalsah.
            </p>

            <div className="mx-auto mt-5 flex max-w-[620px] flex-col gap-3 sm:flex-row lg:mx-0">
              <div className="flex items-center justify-center gap-2 rounded-2xl border border-[#ead49a]/12 bg-[#fff8ea]/[0.055] px-4 py-3 text-sm text-[#f8edd2]/75 backdrop-blur-xl">
                <BookOpen size={16} className="text-[#e6c576]" />
                Qur’ān • Brotherhood • Legacy
              </div>

              <div className="flex items-center justify-center gap-2 rounded-2xl border border-[#ead49a]/12 bg-[#fff8ea]/[0.055] px-4 py-3 text-sm text-[#f8edd2]/75 backdrop-blur-xl">
                <Sparkles size={16} className="text-[#e6c576]" />
                A moment we’ll never forget
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.7 }}
            className="w-full"
          >
            <div className="relative rounded-[34px] border border-[#ead49a]/16 bg-[#fff8ea]/[0.045] p-3 shadow-[0_35px_100px_rgba(0,0,0,0.42)] backdrop-blur-2xl sm:p-5 lg:p-6">
              <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-[#f3d98b]/90 to-transparent" />

              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <TimeBlock value={timeLeft.days} label="Days" />
                <TimeBlock value={pad(timeLeft.hours)} label="Hours" />
                <TimeBlock value={pad(timeLeft.minutes)} label="Minutes" />
                <TimeBlock value={pad(timeLeft.seconds)} label="Seconds" />
              </div>

              <div className="mt-7 rounded-[26px] border border-[#ead49a]/12 bg-black/10 p-5 text-center shadow-inner sm:p-6">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#d9b76f]/15 text-[#e6c576] shadow-[0_0_35px_rgba(217,183,111,0.16)]">
                  <CalendarDays size={22} />
                </div>

                <p className="text-[0.65rem] font-bold uppercase tracking-[0.24em] text-[#d8c18a]/65">
                  Jalsah Date
                </p>

                <p className="mt-2 text-lg font-semibold text-[#fff3d6] sm:text-2xl">
                  {formattedDate}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}