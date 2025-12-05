'use client';

import { useEffect, useState } from 'react';

export default function TestGIFs() {
  const [status, setStatus] = useState<Record<string, string>>({});

  useEffect(() => {
    const checkGif = async (url: string, name: string) => {
      try {
        const response = await fetch(url, { method: 'HEAD' });
        if (response.ok) {
          const size = response.headers.get('content-length');
          setStatus((prev) => ({
            ...prev,
            [name]: `✅ Loading (${(parseInt(size || '0') / 1024 / 1024).toFixed(1)}MB)`,
          }));
        } else {
          setStatus((prev) => ({ ...prev, [name]: `❌ HTTP ${response.status}` }));
        }
      } catch (error) {
        setStatus((prev) => ({ ...prev, [name]: `❌ Error: ${error instanceof Error ? error.message : 'Unknown'}` }));
      }
    };

    checkGif('/assets/animatedgifs/topbanner-hero-small.gif', 'Top Banner GIF');
    checkGif('/assets/animatedgifs/bottombanner-hero-small.gif', 'Bottom Banner GIF');
    checkGif('/assets/topbannerh264_faststart.mp4', 'Top Video MP4');
    checkGif('/assets/bottombannerh264_faststart.mp4', 'Bottom Video MP4');
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-4xl font-bold mb-8">🎬 Asset Test</h1>

      <div className="mb-12 bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">File Status</h2>
        <div className="space-y-2 font-mono text-sm">
          {Object.entries(status).map(([name, stat]) => (
            <div key={name}>
              {name}: {stat}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Top Banner GIF */}
        <div className="bg-gray-800 p-4 rounded-lg">
          <h2 className="text-lg font-bold mb-2">Top Banner GIF</h2>
          <img
            src="/assets/animatedgifs/topbanner-hero-small.gif"
            alt="Top Banner"
            className="w-full h-64 object-cover rounded mb-2"
            loading="eager"
          />
          <p className="text-sm text-gray-400">9.4MB • 8fps • 640px</p>
        </div>

        {/* Bottom Banner GIF */}
        <div className="bg-gray-800 p-4 rounded-lg">
          <h2 className="text-lg font-bold mb-2">Bottom Banner GIF</h2>
          <img
            src="/assets/animatedgifs/bottombanner-hero-small.gif"
            alt="Bottom Banner"
            className="w-full h-64 object-cover rounded mb-2"
            loading="eager"
          />
          <p className="text-sm text-gray-400">8.6MB • 8fps • 640px</p>
        </div>

        {/* Top Video */}
        <div className="bg-gray-800 p-4 rounded-lg">
          <h2 className="text-lg font-bold mb-2">Top Video MP4</h2>
          <video
            src="/assets/topbannerh264_faststart.mp4"
            autoPlay
            muted
            loop
            className="w-full h-64 object-cover rounded mb-2"
            controls
          />
          <p className="text-sm text-gray-400">H.264 • Faststart • MP4</p>
        </div>

        {/* Bottom Video */}
        <div className="bg-gray-800 p-4 rounded-lg">
          <h2 className="text-lg font-bold mb-2">Bottom Video MP4</h2>
          <video
            src="/assets/bottombannerh264_faststart.mp4"
            autoPlay
            muted
            loop
            className="w-full h-64 object-cover rounded mb-2"
            controls
          />
          <p className="text-sm text-gray-400">H.264 • Faststart • MP4</p>
        </div>
      </div>

      <div className="mt-12 bg-blue-900 p-6 rounded-lg">
        <h2 className="text-lg font-bold mb-2">Test Checklist</h2>
        <ul className="space-y-2 text-sm">
          <li>✓ GIFs should animate smoothly</li>
          <li>✓ Videos should autoplay (desktop) or show play button</li>
          <li>✓ All files should be accessible (no 404s)</li>
          <li>✓ Images should load quickly (eager loading on top)</li>
          <li>✓ Test on iPhone: GIFs should animate automatically</li>
        </ul>
      </div>
    </div>
  );
}
