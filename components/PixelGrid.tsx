"use client";

import { useEffect, useRef, useState } from "react";

interface Pixel {
    x: number;
    y: number;
    color: string;
}

interface PixelGridProps {
    pixels: Pixel[];
    selectedColor: string;
    onPixelClick: (x: number, y: number) => void;
    size?: number; // Total size in pixels
}

export default function PixelGrid({
    pixels,
    selectedColor,
    onPixelClick,
    size = 50,
}: PixelGridProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [hoverPos, setHoverPos] = useState<{ x: number; y: number } | null>(null);

    const cellSize = 10; // each logical pixel is 10x10 on screen

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw background grid (faint)
        ctx.strokeStyle = "#f3f4f6";
        ctx.lineWidth = 0.5;
        for (let i = 0; i <= size; i++) {
            ctx.beginPath();
            ctx.moveTo(i * cellSize, 0);
            ctx.lineTo(i * cellSize, size * cellSize);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(0, i * cellSize);
            ctx.lineTo(size * cellSize, i * cellSize);
            ctx.stroke();
        }

        // Draw pixels
        pixels.forEach((pixel) => {
            ctx.fillStyle = pixel.color;
            ctx.fillRect(pixel.x * cellSize, pixel.y * cellSize, cellSize, cellSize);
        });

        // Draw hover preview
        if (hoverPos) {
            ctx.fillStyle = selectedColor;
            ctx.globalAlpha = 0.5;
            ctx.fillRect(hoverPos.x * cellSize, hoverPos.y * cellSize, cellSize, cellSize);
            ctx.globalAlpha = 1.0;
        }
    }, [pixels, size, hoverPos, selectedColor]);

    const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();
        const x = Math.floor((e.clientX - rect.left) / cellSize);
        const y = Math.floor((e.clientY - rect.top) / cellSize);

        if (x >= 0 && x < size && y >= 0 && y < size) {
            setHoverPos({ x, y });
        } else {
            setHoverPos(null);
        }
    };

    const handleClick = () => {
        if (hoverPos) {
            onPixelClick(hoverPos.x, hoverPos.y);
        }
    };

    return (
        <div className="relative border-4 border-gray-800 rounded-lg overflow-hidden shadow-2xl bg-white shadow-blue-100/50">
            <canvas
                ref={canvasRef}
                width={size * cellSize}
                height={size * cellSize}
                onMouseMove={handleMouseMove}
                onMouseLeave={() => setHoverPos(null)}
                onClick={handleClick}
                className="cursor-crosshair bg-white"
                style={{ width: size * cellSize, height: size * cellSize }}
            />
        </div>
    );
}
