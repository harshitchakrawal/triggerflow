"use client";
import { useState } from "react";

export default function Dashboard() {
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
    <div className="w-full min-h-screen bg-white text-black font-serif pb-20 pt-8 px-6">
      <div className="max-w-5xl mx-auto">
        
        {/* Top stats */}
        <div className="flex justify-between items-start mb-24 pb-8">
          <div>
            <div className="text-2xl mb-1">3</div>
            <div className="text-xs text-gray-700">Active reels</div>
          </div>
          <div>
            <div className="text-2xl mb-1">47</div>
            <div className="text-xs text-gray-700">Triggers fired</div>
          </div>
          <div>
            <div className="text-2xl mb-1">41</div>
            <div className="text-xs text-gray-700">DMs sent</div>
          </div>
        </div>

        {/* Main Form Container aligned to inner width to match image constraints */}
        <div className="max-w-4xl px-2">
          
          {/* Reel Details */}
          <div className="mb-14">
            <h2 className="mb-4 text-[15px]">Reel details</h2>
            <div className="mb-6">
              <label className="block mb-2 text-[13px]">Reel URL</label>
              <input 
                className="w-full border border-gray-400 p-[6px] text-[14px] focus:outline-none focus:border-black"
                value={reelUrl}
                onChange={(e) => setReelUrl(e.target.value)}
                placeholder="https://www.instagram.com/reel/ABC123..."
              />
              <p className="text-[12px] mt-2 text-gray-700">Paste your Instagram reel link — we'll extract the media ID automatically</p>
            </div>
            <div>
              <label className="block mb-2 text-[13px]">Media ID</label>
              <input 
                className="w-full border border-gray-400 p-[6px] text-[14px] focus:outline-none bg-transparent"
                value={mediaId || "Extracted automatically from URL"}
                readOnly
              />
            </div>
          </div>

          {/* Trigger Keywords */}
          <div className="mb-14">
            <h2 className="mb-6 text-[15px]">Trigger keywords</h2>
            <div className="space-y-3 mb-6">
              {keywords.map((kw, idx) => (
                <div key={idx} className="flex items-center">
                  <input 
                    className="flex-1 border border-gray-400 p-[6px] text-[14px] focus:outline-none focus:border-black"
                    value={kw}
                    onChange={(e) => updateKeyword(idx, e.target.value)}
                  />
                  <button onClick={() => removeKeyword(idx)} className="ml-6 text-[14px] text-black">X</button>
                </div>
              ))}
            </div>
            <div className="text-center mb-8">
              <button onClick={addKeyword} className="text-[13px] hover:underline">+ Add keyword</button>
            </div>
            <p className="text-[13px] text-gray-900">Anyone commenting these words will receive your automated reply</p>
          </div>

          {/* Messages */}
          <div className="mb-16">
            <h2 className="mb-6 text-[15px]">Automated reply message</h2>
            <div className="mb-6">
              <div className="flex items-end mb-2 space-x-4">
                <label className="text-[13px]">Comment reply</label>
                <span className="text-[11px] text-gray-600 mb-[1px]">always sent</span>
              </div>
              <textarea 
                className="w-full border border-gray-400 p-2 text-[14px] focus:outline-none focus:border-black"
                rows={3}
                value={commentMsg}
                onChange={(e) => setCommentMsg(e.target.value)}
              />
            </div>
            <div className="mb-2">
              <div className="flex items-end mb-2 space-x-4">
                <label className="text-[13px]">DM message</label>
                <span className="text-[11px] text-gray-600 mb-[1px]">requires approval</span>
              </div>
              <textarea 
                className="w-full border border-gray-400 p-2 text-[14px] focus:outline-none focus:border-black"
                rows={3}
                value={dmMsg}
                onChange={(e) => setDmMsg(e.target.value)}
              />
            </div>
            <p className="text-[11px] text-gray-800">DM sending requires Meta App Review approval. Comment reply works immediately.</p>
          </div>

          {/* Preview */}
          <div className="mb-20">
            <h2 className="mb-6 text-[15px]">Preview</h2>
            <p className="text-[13px] mb-4 text-gray-900">
              When someone comments "{keywords[0] || 'link'}" on your reel:
            </p>
            <div className="ml-8 text-[14px] text-black mt-4">
              {commentMsg}
            </div>
          </div>
          
          <div className="text-center mb-10">
            <button onClick={handleSave} className="text-[14px] hover:underline">
              {saved ? "Saved!" : "Save automation rule >"}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}