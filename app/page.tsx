"use client";

import { useState, useEffect, useCallback } from "react";
import PixelGrid from "@/components/PixelGrid";
import ColorPicker from "@/components/ColorPicker";
import MockAuth from "@/components/MockAuth";

interface Pixel {
  x: number;
  y: number;
  color: string;
}

interface User {
  id: string;
  name: string;
}

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [pixels, setPixels] = useState<Pixel[]>([]);
  const [selectedColor, setSelectedColor] = useState("#222222");
  const [loading, setLoading] = useState(true);

  // Fetch all pixels from the API
  const fetchPixels = useCallback(async () => {
    try {
      const response = await fetch("/api/pixels");
      if (response.ok) {
        const data = await response.json();
        setPixels(data);
      }
    } catch (error) {
      console.error("Failed to fetch pixels:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial fetch and polling setup
  useEffect(() => {
    fetchPixels();
    const interval = setInterval(fetchPixels, 3000); // Polling every 3 seconds
    return () => clearInterval(interval);
  }, [fetchPixels]);

  // Handle placing a pixel
  const handlePixelClick = async (x: number, y: number) => {
    if (!user) return;

    // Optimistic update
    const newPixel = { x, y, color: selectedColor };
    setPixels((prev) => {
      const filtered = prev.filter((p) => !(p.x === x && p.y === y));
      return [...filtered, newPixel];
    });

    try {
      const response = await fetch("/api/pixels", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          x,
          y,
          color: selectedColor,
          userId: user.id,
          userName: user.name,
        }),
      });

      if (!response.ok) {
        // Rollback on error (simplified)
        fetchPixels();
      }
    } catch (error) {
      console.error("Failed to place pixel:", error);
      fetchPixels();
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 py-12 px-4 flex flex-col items-center">
      <MockAuth onUserSet={setUser} />

      <div className="max-w-4xl w-full flex flex-col items-center gap-8">
        <header className="text-center space-y-2">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
            Pixel War
          </h1>
          <p className="text-slate-500 font-medium italic">
            Collaborative Canvas: Place your mark in the history!
          </p>
          {user && (
            <div className="flex items-center justify-center gap-2 mt-4 bg-white px-4 py-1.5 rounded-full shadow-sm border border-slate-100">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-sm font-semibold text-slate-700">Playing as <span className="text-blue-600">{user.name}</span></span>
            </div>
          )}
        </header>

        {loading ? (
          <div className="flex flex-col items-center gap-4 py-20">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-slate-500 font-medium">Loading canvas...</p>
          </div>
        ) : (
          <>
            <div className="w-full flex justify-center">
              <PixelGrid
                pixels={pixels}
                selectedColor={selectedColor}
                onPixelClick={handlePixelClick}
                size={50}
              />
            </div>

            <div className="sticky bottom-8 w-full flex justify-center mt-4">
              <ColorPicker
                selectedColor={selectedColor}
                onColorSelect={setSelectedColor}
              />
            </div>
          </>
        )}
      </div>

      <footer className="mt-auto pt-12 text-slate-400 text-sm font-medium">
        Built for CDA Students &bull; 2026
      </footer>
    </main>
  );
}
