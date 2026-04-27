"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { CalendarDays, Crown } from "lucide-react";

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
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ duration: 0.25 }}
      className="relative overflow-hidden rounded-[26px] border border-[#ead49a]/20 bg-gradient-to-b from-[#fff8ea]/[0.09] to-[#fff8ea]/[0.035] p-6 text-center shadow-[0_20px_70px_rgba(0,0,0,0.34)] backdrop-blur-2xl sm:p-7 lg:p-8"
    >
      <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-[#f3d98b] to-transparent" />

      <motion.div
        key={value}
        initial={{ opacity: 0, y: 10, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.22 }}
        className="text-[3rem] font-black leading-none tracking-[-0.06em] text-[#fff2c7] drop-shadow-[0_0_22px_rgba(217,183,111,0.28)] sm:text-[4.2rem] lg:text-[5.5rem]"
      >
        {value}
      </motion.div>

      <p className="mt-3 text-[0.7rem] font-bold uppercase tracking-[0.28em] text-[#d9c17d]/90 sm:text-xs">
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
      {/* BACKGROUND */}
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
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#07110d_82%)]" />
      </div>

      {/* CONTENT */}
      <section className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1450px] flex-col justify-center px-4 py-6 sm:px-8 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-14 xl:gap-20">

          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center lg:text-left"
          >
            <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-[#ead49a]/20 bg-[#fff8ea]/[0.08] px-4 py-2 text-[0.7rem] font-semibold text-[#f3dfb1]/85 backdrop-blur-xl sm:text-sm lg:mx-0">
              <Crown size={14} className="text-[#e6c576]" />
              Class of 2026
            </div>

            <p className="mb-4 text-[0.7rem] font-bold uppercase tracking-[0.35em] text-[#d9b76f]/90 sm:text-xs">
              The Final Chapter
            </p>

            <h1 className="mx-auto max-w-[760px] bg-gradient-to-br from-[#fff9e8] via-[#e1bf72] to-[#fffef7] bg-clip-text pb-3 text-[2.6rem] font-black leading-[1.05] tracking-[-0.05em] text-transparent sm:text-[4.6rem] lg:mx-0 lg:text-[5.8rem] xl:text-[6.5rem]">
              The Completion of Our Madrassah Journey
            </h1>

            <p className="mx-auto mt-4 max-w-[640px] text-[1.05rem] leading-8 text-[#f8edd2]/76 sm:text-[1.2rem] lg:mx-0">
              Years of sacrifice, kitaabs, discipline and effort — now culminating in our final Jalsah.
            </p>
          </motion.div>

          {/* RIGHT */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.7 }}
            className="w-full"
          >
            <div className="rounded-[36px] bg-[#fff8ea]/[0.045] p-5 shadow-[0_40px_120px_rgba(0,0,0,0.45)] backdrop-blur-2xl sm:p-6 lg:p-8">

              {/* FIXED SPACING HERE */}
              <div className="grid grid-cols-2 gap-5 sm:gap-6 lg:gap-8">
                <TimeBlock value={timeLeft.days} label="Days" />
                <TimeBlock value={pad(timeLeft.hours)} label="Hours" />
                <TimeBlock value={pad(timeLeft.minutes)} label="Minutes" />
                <TimeBlock value={pad(timeLeft.seconds)} label="Seconds" />
              </div>

              <div className="mt-12 rounded-[28px] border border-[#ead49a]/12 bg-black/10 p-6 text-center sm:p-7">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#d9b76f]/15 text-[#e6c576]">
                  <CalendarDays size={24} />
                </div>

                <p className="text-[0.7rem] font-bold uppercase tracking-[0.26em] text-[#d8c18a]/65">
                  Jalsah Date
                </p>

                <p className="mt-3 text-xl font-semibold text-[#fff3d6] sm:text-2xl">
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