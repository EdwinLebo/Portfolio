/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { Play, Volume2, ShieldAlert, MonitorPlay, Sparkles } from 'lucide-react';

export default function VideoPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isError, setIsError] = useState(false);

  // Check if video exists or fails
  const handleError = () => {
    setIsError(true);
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(() => {
          setIsError(true);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="bg-neutral-950 rounded-lg overflow-hidden border border-black/20 shadow-none" id="video-player-component">
      {/* Aspect Ratio container */}
      <div className="relative aspect-[16/9] w-full bg-neutral-950 flex items-center justify-center group overflow-hidden">
        
        {/* If Error / File missing, show a beautiful, interactive simulation showing creative skill */}
        {isError ? (
          <div className="absolute inset-0 bg-[#0f0f15] flex flex-col justify-between p-6 md:p-8">
            <div className="flex justify-between items-start">
              <span className="bg-blue-600/10 text-blue-400 border border-blue-600/20 px-3 py-1 rounded text-[10px] font-bold tracking-wider flex items-center gap-1.5 uppercase">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>Media Fallback Active</span>
              </span>
              <span className="text-neutral-500 font-mono text-[10px]">add.mp4 loader failed</span>
            </div>

            <div className="text-center max-w-md mx-auto my-auto space-y-4">
              <div className="w-16 h-16 bg-blue-600/10 border border-blue-600/30 text-blue-500 rounded-full flex items-center justify-center mx-auto animate-pulse">
                <MonitorPlay className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-white font-black text-md md:text-lg tracking-tight uppercase">Multimedia Production Hub</h3>
                <p className="text-neutral-400 text-xs mt-1.5 leading-relaxed font-sans font-medium">
                  Once Edwin uploads <code className="text-blue-400 bg-neutral-900/40 px-1 py-0.5 rounded font-mono text-xs">add.mp4</code> to the root directory, your web browser will play the cinematic gaming edits automatically!
                </p>
              </div>
              
              {/* Animated visualizer simulator */}
              <div className="flex justify-center items-end gap-1.5 h-8 mt-4 pt-2">
                <div className="w-1 bg-blue-500 animate-[bounce_1.5s_infinite_100ms]" style={{ height: '50%' }}></div>
                <div className="w-1 bg-blue-600 animate-[bounce_1.5s_infinite_300ms]" style={{ height: '80%' }}></div>
                <div className="w-1 bg-indigo-500 animate-[bounce_1.5s_infinite_500ms]" style={{ height: '40%' }}></div>
                <div className="w-1 bg-blue-400 animate-[bounce_1.5s_infinite_200ms]" style={{ height: '90%' }}></div>
                <div className="w-1 bg-blue-300 animate-[bounce_1.5s_infinite_400ms]" style={{ height: '60%' }}></div>
              </div>
            </div>

            <div className="flex items-center justify-between text-neutral-500 text-[10px] md:text-xs">
              <span className="flex items-center gap-1 font-sans font-medium">
                <Sparkles className="w-3.5 h-3.5 text-yellow-500 animate-spin" style={{ animationDuration: '6s' }} />
                TUT Creative Media Division
              </span>
              <span>1080p 60fps preset</span>
            </div>
          </div>
        ) : (
          <>
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              onError={handleError}
              onClick={togglePlay}
              preload="metadata"
              id="portfolio-core-video"
            >
              <source src="add.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Dark Gradient Overlay shown on hover or when paused */}
            <div className={`absolute inset-0 bg-neutral-950/40 transition-opacity duration-300 ${isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}`}>
              
              {/* Playbutton Overlay */}
              <button
                onClick={togglePlay}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:scale-110 active:scale-95 hover:bg-blue-500 transition cursor-pointer"
                id="video-play-toggle-overlay"
              >
                <Play className={`w-6 h-6 fill-current ${isPlaying ? 'hidden' : ''}`} />
                <span className={isPlaying ? 'text-[11px] font-bold uppercase tracking-wide px-1' : 'hidden'}>Pause</span>
              </button>

              {/* Status footer inside video controls */}
              <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-neutral-950/80 to-transparent flex items-center justify-between">
                <span className="text-white text-xs font-semibold font-sans max-w-[70%] truncate">
                  add.mp4 - Cinematic Showcase
                </span>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={toggleMute}
                    className="text-white hover:text-blue-400 p-1.5 rounded transition cursor-pointer"
                    id="video-mute-toggle"
                  >
                    <Volume2 className={`w-4 h-4 ${isMuted ? 'text-gray-400 stroke-[1.5]' : ''}`} />
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
