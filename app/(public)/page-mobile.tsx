'use client';

import { useEffect, useState } from 'react';

export default function HomePageMobile() {
  const [debugLog, setDebugLog] = useState<string[]>([]);

  const addLog = (msg: string) => {
    const timestamp = new Date().toLocaleTimeString();
    const fullMsg = `[${timestamp}] ${msg}`;
    console.log(fullMsg);
    setDebugLog((prev) => [...prev.slice(-15), fullMsg]);
  };

  useEffect(() => {
    addLog(`📱 Mobile page mounted`);
    addLog(`Using GIF instead of video for better performance`);
  }, []);

  return (
    <div className="relative w-full bg-black">
      {/* Top Banner GIF */}
      <div className="relative w-full h-screen overflow-hidden">
        <img
          src="/assets/animatedgifs/topbanner-hero-small.gif"
          alt="MĒL11 Hero"
          className="w-full h-full object-cover"
          loading="eager"
          decoding="sync"
          style={{
            animation: 'fadein 0.5s forwards',
          }}
        />
        
        {/* Content overlay on top banner */}
        <div className="absolute inset-0 z-10 flex items-center justify-center text-center">
          <div className="px-8">
            <h1 className="text-5xl md:text-6xl font-serif text-cream mb-6">
              MĒL11
            </h1>
            <p className="text-xl text-cream/80">
              In-home luxury skin and aesthetics
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Banner GIF */}
      <div className="relative w-full h-screen overflow-hidden">
        <img
          src="/assets/animatedgifs/bottombanner-hero-small.gif"
          alt="MĒL11 Services"
          className="w-full h-full object-cover"
          loading="lazy"
          decoding="async"
          style={{
            animation: 'fadein 0.5s forwards',
          }}
        />
      </div>

      {/* Fade-in animation */}
      <style>{`
        @keyframes fadein {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>

      {/* Debug overlay */}
      <div className="fixed bottom-0 right-0 max-w-sm max-h-64 overflow-y-auto bg-black/95 text-green-300 text-xs p-2 m-2 rounded font-mono border border-green-500 z-[9999] pointer-events-none">
        <div className="font-bold mb-1 text-green-400 sticky top-0 bg-black/95">🐛 DEBUG</div>
        {debugLog.map((log, i) => (
          <div key={i} className="whitespace-pre-wrap break-words text-[10px] leading-tight">
            {log}
          </div>
        ))}
      </div>
    </div>
  );
}
