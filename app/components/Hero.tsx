"use client";

import React, { useEffect, useRef, useState } from "react";

type Comment = { name: string; avatar: string; text: string; color: string };

const COMMENTS: Comment[] = [
  { name: "sarah_creative", avatar: "SC", text: "LINK 🔥", color: "#f05a28" },
  { name: "devmark99", avatar: "DM", text: "Send me the roadmap!", color: "#4f8ef7" },
  { name: "alex.builds", avatar: "AB", text: "LINK", color: "#22c55e" },
  { name: "priya_design", avatar: "PD", text: "Roadmap pls 👀", color: "#a855f7" },
];

export default function Hero() {
  const [visibleCount, setVisibleCount] = useState(0);
  const [showDm, setShowDm] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // const startCycle = () => {
  //   let count = 0;
  //   const tick = () => {
  //     count++;
  //     setVisibleCount(count);
  //     if (count < COMMENTS.length) {
  //       timerRef.current = setTimeout(tick, 800);
  //     } else {
  //       timerRef.current = setTimeout(() => {
  //         setShowDm(true);
  //         timerRef.current = setTimeout(() => {
  //           setVisibleCount(0);
  //           setShowDm(false);
  //           timerRef.current = setTimeout(startCycle, 600);
  //         }, 3000);
  //       }, 400);
  //     }
  //   };
  //   timerRef.current = setTimeout(tick, 800);
  // };

  useEffect(() => {
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, []);

  return (
    <section className="dot-grid relative w-full h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Soft radial center glow */}
      <div className="pointer-events-none absolute inset-0" style={{
        background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(255,255,255,0.55) 0%, transparent 100%)"
      }} />

      {/* ── NAVBAR SPACER ── already absolute so no spacer needed ── */}

      {/* ═══════════════════ CENTER COPY ═══════════════════ */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-3xl">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-white/70 border border-black/[0.07] text-xs font-semibold text-[#3d3d3d] shadow-sm backdrop-blur-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-[#f05a28] animate-pulse" />
          For Creators &amp; Builders
        </div>

        {/* Headline */}
        <h1 className="text-5xl sm:text-6xl lg:text-[5rem] font-black leading-[1.05] tracking-tight text-[#1a1a1a]">
          Comment{" "}
          <span
            className="relative inline-block px-2 rounded-lg text-white"
            style={{ background: "#f05a28" }}
          >
            "LINK"
          </span>
          <br />
          → Get it in your{" "}
          <span className="relative">
            DMs
            <svg
              className="absolute -bottom-1 left-0 w-full"
              viewBox="0 0 200 8"
              fill="none"
              preserveAspectRatio="none"
              aria-hidden
            >
              <path d="M0 6 Q50 1 100 5 Q150 9 200 3" stroke="#f05a28" strokeWidth="3.5" strokeLinecap="round" />
            </svg>
          </span>
          .
        </h1>

        {/* Sub */}
        <p className="mt-5 text-base sm:text-lg text-[#5c5c5c] leading-relaxed max-w-xl">
          Creators post a reel, story, or tweet. Fans comment a keyword.
          TriggerFlow fires a personalized DM with the link, roadmap, or
          resource — instantly.
        </p>

        {/* CTAs */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href="/dashboard"
            className="flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold text-white shadow-md transition-all hover:-translate-y-0.5 active:translate-y-0"
            style={{ background: "#f05a28", boxShadow: "0 4px 20px rgba(240,90,40,0.35)" }}
          >
            Try free for 14 days
          </a>
          <div className="flex items-center gap-3">
            {/* Apple icon */}
            <button className="w-11 h-11 rounded-full bg-white/80 border border-black/[0.07] flex items-center justify-center hover:bg-white transition-colors shadow-sm backdrop-blur-sm">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#1a1a1a]">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
            </button>
            {/* G icon */}
            <button className="w-11 h-11 rounded-full bg-white/80 border border-black/[0.07] flex items-center justify-center hover:bg-white transition-colors shadow-sm backdrop-blur-sm">
              <svg viewBox="0 0 24 24" className="w-5 h-5">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Platform tags */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          {["Instagram", "YouTube", "Twitter / X", "LinkedIn"].map((p) => (
            <span
              key={p}
              className="px-3 py-1 rounded-full text-xs font-medium text-[#5c5c5c] bg-white/60 border border-black/[0.06] backdrop-blur-sm"
            >
              {p}
            </span>
          ))}
        </div>
      </div>

      {/* ═══════════════════ FLOATING CARDS ═══════════════════ */}

      {/* Left card — comment feed */}
      {/* <div className="absolute left-[2%] xl:left-[5%] top-1/2 -translate-y-1/2 w-[220px] hidden lg:block">
        <div className="bg-white/90 backdrop-blur-md border border-black/[0.07] rounded-2xl shadow-xl p-4">
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#707070] mb-3">Live Comments</p>
          <div className="flex flex-col gap-2.5 min-h-[120px]">
            {COMMENTS.slice(0, visibleCount).map((c, i) => (
              <div
                key={i}
                className="flex items-center gap-2"
                style={{ animation: "slideUp 0.35s ease-out both" }}
              >
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center text-[8px] font-bold text-white flex-shrink-0"
                  style={{ background: c.color }}
                >
                  {c.avatar}
                </div>
                <div>
                  <p className="text-[10px] text-[#707070] leading-none mb-0.5">@{c.name}</p>
                  <p className="text-xs font-bold text-[#1a1a1a]">{c.text}</p>
                </div>
              </div>
            ))}
          </div>
          {showDm && (
            <div
              className="mt-3 pt-3 border-t border-black/[0.05]"
              style={{ animation: "slideUp 0.4s ease-out both" }}
            >
              <div className="flex items-center gap-1.5 mb-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-[#f05a28] animate-ping" />
                <span className="text-[9px] font-bold uppercase tracking-widest text-[#f05a28]">
                  TriggerFlow fired ⚡
                </span>
              </div>
              <p className="text-[10px] text-[#555] italic leading-snug">
                "Hey! Here's your exclusive link 🔗"
              </p>
            </div>
          )}
        </div>
      </div> */}

      {/* Top-right floating pill — "Send roadmap" */}
      <div
        className="absolute right-[6%] top-[22%] hidden lg:flex items-center gap-2 bg-[#f05a28] text-white text-sm font-bold px-5 py-3 rounded-full shadow-lg"
        style={{ transform: "rotate(2deg)" }}
      >
        Send roadmap
        {/* Little cursor arrow */}
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="-rotate-45">
          <path d="M5 19L19 5M19 5H8M19 5V16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* Bottom-left pill — "LINK 🔥" */}
      <div
        className="absolute left-[6%] bottom-[22%] hidden lg:flex items-center gap-2 bg-[#d4f5be] text-[#2d6a0a] text-sm font-bold px-5 py-3 rounded-full shadow-md"
        style={{ transform: "rotate(-2deg)" }}
      >
        LINK 🔥
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="rotate-45">
          <path d="M5 19L19 5M19 5H8M19 5V16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* Right card — stats */}
      {/* <div className="absolute right-[2%] xl:right-[5%] top-1/2 -translate-y-1/2 w-[200px] hidden lg:block">
        <div className="bg-white/90 backdrop-blur-md border border-black/[0.07] rounded-2xl shadow-xl p-4 flex flex-col gap-3">
          {[
            { icon: "⚡", label: "DMs Sent", value: "10M+", sub: "Auto-triggered" },
            { icon: "🧑‍🎨", label: "Creators", value: "50K+", sub: "Using TriggerFlow" },
            { icon: "⏱", label: "Response", value: "< 0.4s", sub: "Average time" },
          ].map((s) => (
            <div key={s.label} className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#f05a28]/10 flex items-center justify-center text-base flex-shrink-0">
                {s.icon}
              </div>
              <div>
                <p className="text-xs font-black text-[#1a1a1a]">{s.value}</p>
                <p className="text-[10px] text-[#707070] leading-none">{s.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div> */}

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
