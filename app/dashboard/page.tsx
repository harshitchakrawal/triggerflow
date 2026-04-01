"use client";

import React from "react";
import Link from "next/link";

const StatCard = ({
  label,
  value,
  subValue,
  subColor = "text-[#f05a28]"
}: {
  label: string;
  value: string;
  subValue: string;
  subColor?: string;
}) => (
  <div className="bg-white/80 border border-black/[0.07] rounded-2xl p-6 flex flex-col justify-between h-32 hover:border-black/10 hover:bg-white transition-all group backdrop-blur-sm shadow-sm">
    <div className="flex flex-col">
      <span className="text-3xl font-black text-[#1a1a1a] mb-1 group-hover:scale-105 transition-transform origin-left">{value}</span>
      <span className="text-xs text-[#5c5c5c] font-medium">{label}</span>
    </div>
    <div className={`text-[10px] font-bold flex items-center gap-1 ${subColor}`}>
      {subValue}
    </div>
  </div>
);

const ReelCard = ({
  title,
  keyword,
  triggers,
  status = "Active"
}: {
  title: string;
  keyword: string;
  triggers: number;
  status?: "Active" | "Paused";
}) => (
  <div className="bg-white/80 border border-black/[0.07] rounded-2xl p-4 flex items-center gap-4 hover:bg-white hover:border-black/10 transition-all group backdrop-blur-sm shadow-sm">
    <div className="w-16 h-16 rounded-xl bg-[#f05a28]/10 border border-black/[0.06] flex items-center justify-center relative overflow-hidden flex-shrink-0">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="rgba(240,90,40,0.4)" stroke="#f05a28" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="5 3 19 12 5 21 5 3" />
      </svg>
    </div>
    <div className="flex-1 min-w-0">
      <h4 className="text-sm font-bold text-[#1a1a1a] truncate mb-1">{title}</h4>
      <p className="text-[11px] text-[#707070] font-medium leading-tight">
        Keyword: <span className="text-[#5c5c5c]">"{keyword}"</span> | {triggers} triggers
      </p>
    </div>
    <span className={`px-2 py-1 rounded-full text-[9px] font-black uppercase tracking-wider ${status === "Active" ? "bg-[#f05a28]/10 text-[#f05a28]" : "bg-black/[0.05] text-[#707070]"}`}>
      {status}
    </span>
  </div>
);

const ActivityItem = ({
  user,
  action,
  status,
  time,
  color = "bg-[#f05a28]"
}: {
  user: string;
  action: string;
  status: string;
  time: string;
  color?: string;
}) => (
  <div className="flex items-start gap-3 py-3 border-b border-black/[0.05] last:border-0 group">
    <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${color}`} />
    <div className="flex-1 min-w-0">
      <p className="text-xs text-[#5c5c5c] leading-snug">
        <span className="font-bold text-[#1a1a1a]">@{user}</span> {action} | <span className="text-[#707070] italic">{status}</span>
      </p>
    </div>
    <span className="text-[10px] text-[#707070] font-medium whitespace-nowrap">{time}</span>
  </div>
);

export default function Dashboard() {
  return (
    <section className="relative min-h-screen overflow-hidden px-4 py-10 sm:px-6 lg:px-8">
      {/* 1. Base Gradient */}
      <div className="pointer-events-none absolute inset-0 bg-[#f8f9fb]" style={{
        background: "linear-gradient(135deg, #f8f9fb 0%, #ffffff 100%)"
      }} />
      
      {/* 2. Dotted Grid Overlay */}
      <div className="dot-grid pointer-events-none absolute inset-0" />

      {/* 3. Soft radial center glow */}
      <div className="pointer-events-none absolute inset-0" style={{
        background: "radial-gradient(ellipse 70% 60% at 50% 20%, rgba(255,255,255,0.8) 0%, transparent 100%)"
      }} />
      
      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <h1 className="text-2xl font-black text-[#1a1a1a] tracking-tight">My automations</h1>
          <div className="flex items-center gap-4">
            <div className="bg-white/80 border border-black/[0.07] rounded-xl px-4 py-2 flex items-center gap-3 backdrop-blur-sm shadow-sm">
              <div className="text-right">
                <p className="text-[10px] text-[#707070] font-bold uppercase tracking-widest leading-none mb-1">Connected:</p>
                <p className="text-sm font-black text-[#1a1a1a] leading-none">triggerflow123</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-[#f05a28]/10 flex items-center justify-center text-[10px] font-black text-[#f05a28]">
                HC
              </div>
            </div>
            <Link
              href="/dashboard/create"
              className="text-white font-black text-sm px-6 py-3 rounded-xl hover:-translate-y-0.5 transition-all active:translate-y-0 shadow-md"
              style={{ background: "#f05a28", boxShadow: "0 4px 20px rgba(240,90,40,0.35)" }}
            >
              + New automation
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          <StatCard label="Active automations" value="3" subValue="+ 1 this week" />
          <StatCard label="Triggers today" value="47" subValue="+ 12 vs yesterday" />
          <StatCard label="Replies sent" value="41" subValue="87% success rate" />
          <StatCard label="Total all time" value="234" subValue="Since Mar 1" subColor="text-[#707070]" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-black text-[#1a1a1a] uppercase tracking-widest opacity-70">Active reels</h3>
              <button className="text-[10px] font-bold text-[#707070] hover:text-[#f05a28] transition-colors">See all {"->"}</button>
            </div>
            <div className="space-y-3">
              <ReelCard title="Free roadmap reel" keyword="roadmap" triggers={23} />
              <ReelCard title="Link in bio reel" keyword="link" triggers={18} />
              <ReelCard title="Course promo reel" keyword="join" triggers={12} status="Paused" />
            </div>
          </div>

          <div className="lg:col-span-7 bg-white/80 border border-black/[0.07] rounded-3xl p-6 backdrop-blur-sm shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-black text-[#1a1a1a] uppercase tracking-widest opacity-70">Recent activity</h3>
              <button className="text-[10px] font-bold text-[#707070] hover:text-[#f05a28] transition-colors">See all {"->"}</button>
            </div>
            <div className="flex flex-col">
              <ActivityItem user="user123" action="commented 'roadmap'" status="reply sent" time="2m ago" />
              <ActivityItem user="harshit_" action="commented 'link'" status="reply sent" time="8m ago" />
              <ActivityItem user="testuser786" action="commented 'link'" status="reply sent" time="14m ago" />
              <ActivityItem user="creator99" action="commented 'roadmap'" status="reply sent" time="31m ago" />
              <ActivityItem user="devguy" action="commented 'join'" status="paused rule, skipped" time="1h ago" color="bg-black/20" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
