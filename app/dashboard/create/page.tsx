"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function CreateAutomation() {
  const [reelUrl, setReelUrl] = useState("");
  const [keywords, setKeywords] = useState(["link", "roadmap"]);
  const [commentMsg, setCommentMsg] = useState(
    "Hey! I just sent you the link in DMs — check your inbox!"
  );
  const [dmMsg, setDmMsg] = useState(
    "Hey! Here's the resource you asked for: https://yourlink.com"
  );
  const [saved, setSaved] = useState(false);

  const extractMediaId = (url: string) => {
    const match = url.match(/reel\/([A-Za-z0-9_-]+)/);
    return match ? match[1] : "";
  };
  
  const mediaId = extractMediaId(reelUrl);

  const handleSave = async () => {
    if (!mediaId) return alert("Invalid reel URL");

    const res = await fetch("/api/rules", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        mediaId, 
        keyword: keywords.join(","), 
        commentMsg, 
        dmMsg 
      }),
    });

    if (res.ok) {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
  };

  const addKeyword = () => setKeywords([...keywords, ""]);
  
  const updateKeyword = (index: number, val: string) => {
    const newKw = [...keywords];
    newKw[index] = val;
    setKeywords(newKw);
  };
  
  const removeKeyword = (index: number) => {
    if (keywords.length > 1) {
       setKeywords(keywords.filter((_, i) => i !== index));
    } else {
       setKeywords([""]);
    }
  };

  return (
    <div className="relative pb-24 px-4 sm:px-8 w-full text-white font-sans max-w-5xl mx-auto pt-12">
      <Link href="/dashboard" className="inline-flex items-center gap-2 text-white/40 hover:text-white transition-colors mb-8 group">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="m15 18-6-6 6-6" />
        </svg>
        <span className="text-sm font-bold">Back to automations</span>
      </Link>
      <div className="flex flex-col mb-12">
        <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-[#3dfc9d]/10 border border-[#3dfc9d]/20 text-[10px] font-black uppercase tracking-widest text-[#3dfc9d]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#3dfc9d] animate-pulse" />
          Automation Builder
        </div>
        <h1 className="text-4xl font-black tracking-tight text-white mb-2">
          Create new <span className="text-[#3dfc9d]">automation</span>
        </h1>
        <p className="text-white/40 text-sm font-medium">Configure your Instagram reel to auto-reply to comments.</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-7 space-y-12">
          <section>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-xs font-black text-white/40">1</div>
              <h2 className="text-xl font-black text-white">Reel Details</h2>
            </div>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-white/30 px-1">Reel URL</label>
                <input 
                  className="w-full bg-[#1a1a1a] border border-white/5 rounded-2xl px-5 py-4 text-sm font-medium text-white placeholder:text-white/20 focus:outline-none focus:border-[#3dfc9d]/40 transition-all shadow-xl"
                  value={reelUrl}
                  onChange={(e) => setReelUrl(e.target.value)}
                  placeholder="https://www.instagram.com/reel/..."
                />
                <p className="text-[10px] text-white/20 font-medium px-1">Link your Instagram reel to start tracking comments.</p>
              </div>
              <div className="opacity-50">
                <label className="text-xs font-black uppercase tracking-widest text-white/30 px-1">Media ID</label>
                <div className="w-full bg-white/5 border border-white/5 rounded-2xl px-5 py-4 text-sm font-bold text-white/40 cursor-not-allowed">
                  {mediaId || "Auto-detected"}
                </div>
              </div>
            </div>
          </section>
          <section>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-xs font-black text-white/40">2</div>
              <h2 className="text-xl font-black text-white">Trigger Keywords</h2>
            </div>
            <div className="space-y-3 mb-6">
              {keywords.map((kw, idx) => (
                <div key={idx} className="flex items-center gap-3 group">
                  <input 
                    className="flex-1 bg-[#1a1a1a] border border-white/5 rounded-2xl px-5 py-4 text-sm font-bold text-white focus:outline-none focus:border-[#3dfc9d]/40 transition-all shadow-xl"
                    value={kw}
                    onChange={(e) => updateKeyword(idx, e.target.value)}
                    placeholder="Keyword (e.g. roadmap)"
                  />
                  <button 
                    onClick={() => removeKeyword(idx)} 
                    className="w-12 h-12 flex-shrink-0 rounded-2xl bg-white/5 text-white/20 flex items-center justify-center hover:bg-red-500/20 hover:text-red-500 transition-all"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
            <button onClick={addKeyword} className="w-full py-4 rounded-2xl border border-dashed border-white/10 text-white/40 text-sm font-bold hover:border-[#3dfc9d]/40 hover:text-white transition-all flex items-center justify-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Add more keywords
            </button>
          </section>
          <section>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-xs font-black text-white/40">3</div>
              <h2 className="text-xl font-black text-white">Message Content</h2>
            </div>
            <div className="space-y-8">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-white/30 px-1">Comment Reply</label>
                <textarea className="w-full bg-[#1a1a1a] border border-white/5 rounded-2xl px-5 py-4 text-sm font-bold text-white focus:outline-none focus:border-[#3dfc9d]/40 transition-all shadow-xl resize-none" rows={3} value={commentMsg} onChange={(e) => setCommentMsg(e.target.value)} />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-white/30 px-1">DM Payload</label>
                <textarea className="w-full bg-[#1a1a1a] border border-white/5 rounded-2xl px-5 py-4 text-sm font-bold text-white focus:outline-none focus:border-[#3dfc9d]/40 transition-all shadow-xl resize-none" rows={3} value={dmMsg} onChange={(e) => setDmMsg(e.target.value)} />
              </div>
            </div>
          </section>
        </div>
        <div className="lg:col-span-5">
           <div className="sticky top-12 space-y-8">
             <div className="bg-[#161616] border border-white/5 rounded-3xl p-8 shadow-2xl">
                <h3 className="text-xs font-black text-white/30 uppercase tracking-widest mb-6 flex items-center gap-2">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                  Real-time Preview
                </h3>
                <div className="space-y-4">
                   <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                      <p className="text-[10px] font-bold text-white/40 mb-2">When someone comments:</p>
                      <div className="flex flex-wrap gap-2">
                        {keywords.map((kw, i) => kw && (
                          <span key={i} className="px-2 py-1 bg-[#3dfc9d]/10 text-[#3dfc9d] text-[10px] font-black rounded-md border border-[#3dfc9d]/20">"{kw}"</span>
                        ))}
                      </div>
                   </div>
                   <div className="p-4 bg-[#1a1a1a] rounded-2xl border border-white/5 relative overflow-hidden">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#3dfc9d] to-cyan-400 flex items-center justify-center text-[10px] font-black text-[#111] shadow-lg shadow-[#3dfc9d]/20 flex-shrink-0">TF</div>
                        <div className="flex-1">
                          <p className="text-[10px] font-bold text-white/60 mb-1 leading-none">Triggerflow <span className="text-[8px] opacity-40 font-medium ml-1">now</span></p>
                          <p className="text-xs font-bold text-white leading-relaxed">{commentMsg}</p>
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t border-white/5">
                         <div className="flex items-center gap-2 text-[9px] font-bold text-white/30">
                           <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                             <circle cx="12" cy="12" r="10" />
                             <polyline points="12 6 12 12 16 14" />
                           </svg>
                           DM sequence will follow automatically
                         </div>
                      </div>
                   </div>
                </div>
             </div>
             <button onClick={handleSave} className="w-full py-5 rounded-2xl bg-white text-[#111] font-black text-lg shadow-2xl shadow-white/5 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 group disabled:opacity-50" disabled={saved}>
              {saved ? (
                <>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Automation Saved!
                </>
              ) : (
                <>
                  Save Automation
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </>
              )}
            </button>
           </div>
        </div>
      </div>
    </div>
  );
}
