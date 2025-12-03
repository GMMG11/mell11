'use client';

import React, { useEffect, useRef, useState } from 'react';

interface AutoplayVideoProps {
  src: string;
  className?: string;
  style?: React.CSSProperties;
  poster?: string;
}

export default function AutoplayVideo({ 
  src, 
  className = '', 
  style = {}, 
  poster
}: AutoplayVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [debugLog, setDebugLog] = useState<string[]>([]);

  const addLog = (msg: string) => {
    const timestamp = new Date().toLocaleTimeString();
    const fullMsg = `[${timestamp}] ${msg}`;
    console.log(fullMsg);
    setDebugLog((prev) => [...prev.slice(-15), fullMsg]);
  };

  useEffect(() => {
    addLog(`🎬 Mounted: ${src}`);
    
    const video = videoRef.current;
    if (!video) {
      addLog('❌ No video ref');
      return;
    }

    addLog(`✓ Video element ready`);
    addLog(`State: paused=${video.paused}, readyState=${video.readyState}`);

    const handlePlay = () => addLog(`✅ PLAY - video playing!`);
    const handlePause = () => addLog(`⏸️ PAUSE`);
    const handleCanPlay = () => addLog(`▶️ CANPLAY`);
    const handleLoadedMetadata = () => addLog(`📊 METADATA`);
    const handleError = () => {
      const err = video.error;
      addLog(`🚨 ERROR: ${err?.code}`);
    };

    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('error', handleError);

    addLog(`Attributes: autoPlay=${video.autoplay}, muted=${video.muted}, loop=${video.loop}`);
    addLog(`Preload: ${video.preload}`);

    return () => {
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('error', handleError);
    };
  }, []);

  const videoStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    zIndex: -1,
    ...style,
  };

  return (
    <>
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster={poster}
        style={videoStyle}
        className={className}
      >
        <source src={src} type="video/mp4" />
        Your browser doesn't support video.
      </video>

      {/* Debug overlay */}
      <div className="fixed bottom-0 right-0 max-w-sm max-h-64 overflow-y-auto bg-black/95 text-green-300 text-xs p-2 m-2 rounded font-mono border border-green-500 z-[9999] pointer-events-none">
        <div className="font-bold mb-1 text-green-400 sticky top-0 bg-black/95">🐛 DEBUG</div>
        {debugLog.map((log, i) => (
          <div key={i} className="whitespace-pre-wrap break-words text-[10px] leading-tight">
            {log}
          </div>
        ))}
      </div>
    </>
  );
}
