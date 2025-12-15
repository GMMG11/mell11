'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';

interface IntroVideoOverlayProps {
  onComplete: () => void;
  onSkip: () => void;
  isFirstVisit: boolean;
}

export default function IntroVideoOverlay({ onComplete, onSkip, isFirstVisit }: IntroVideoOverlayProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(false); // Sound ON by default
  const [isVisible, setIsVisible] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [progress, setProgress] = useState(0);

  // Update progress bar
  const updateProgress = useCallback(() => {
    if (videoRef.current) {
      const currentProgress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(currentProgress);
    }
  }, []);

  useEffect(() => {
    // Small delay before showing the overlay for first-time visitors
    if (isFirstVisit) {
      const timer = setTimeout(() => {
        setIsVisible(true);
        if (videoRef.current) {
          videoRef.current.play();
        }
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isFirstVisit]);

  // Set up progress tracking
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.addEventListener('timeupdate', updateProgress);
      return () => video.removeEventListener('timeupdate', updateProgress);
    }
  }, [updateProgress]);

  const handleVideoEnd = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      setIsVisible(false);
      onComplete();
    }, 1000); // Match fade-out duration
  };

  const handleSkip = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      setIsVisible(false);
      onSkip();
    }, 500);
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  // Don't render for returning visitors (they get background video instead)
  if (!isFirstVisit) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity duration-1000 ${
        isVisible ? (isFadingOut ? 'opacity-0' : 'opacity-100') : 'opacity-0 pointer-events-none'
      }`}
    >
      {/* Dark backdrop */}
      <div className="absolute inset-0 bg-nearBlack" />

      {/* Video - uses smaller file for mobile */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        muted={isMuted}
        playsInline
        preload="auto"
        onEnded={handleVideoEnd}
        poster="/images/intro-poster.jpg"
      >
        {/* Mobile gets smaller video for faster loading */}
        <source src="/assets/websiteintro_mobile.mp4" type="video/mp4" media="(max-width: 768px)" />
        <source src="/assets/websiteintro_web.mp4" type="video/mp4" />
      </video>

      {/* Gradient overlay at bottom for controls visibility */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-nearBlack/80 to-transparent" />

      {/* Controls */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center items-center gap-6 z-10">
        {/* Mute/Unmute Button */}
        <button
          onClick={toggleMute}
          className="flex items-center gap-2 px-5 py-3 bg-white/10 backdrop-blur-sm rounded-full
                     text-white hover:bg-white/20 transition-all duration-300 border border-white/20"
          aria-label={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
              </svg>
              <span className="text-sm font-medium">Unmute</span>
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              </svg>
              <span className="text-sm font-medium">Mute</span>
            </>
          )}
        </button>

        {/* Skip Button */}
        <button
          onClick={handleSkip}
          className="flex items-center gap-2 px-5 py-3 bg-accent/80 backdrop-blur-sm rounded-full
                     text-white hover:bg-accent transition-all duration-300"
          aria-label="Skip intro"
        >
          <span className="text-sm font-medium">Skip Intro</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M13 5l7 7-7 7M5 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
        <div
          className="h-full bg-accent transition-all duration-100"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
