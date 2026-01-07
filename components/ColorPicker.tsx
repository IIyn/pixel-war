"use client";

const PALETTE = [
    "#FFFFFF", "#E4E4E4", "#888888", "#222222",
    "#FFA7D1", "#E50000", "#E59500", "#A06A42",
    "#E5D900", "#94E044", "#02BE01", "#00D3DD",
    "#0083C7", "#0000EA", "#CF6EE4", "#820080"
];

interface ColorPickerProps {
    selectedColor: string;
    onColorSelect: (color: string) => void;
}

export default function ColorPicker({ selectedColor, onColorSelect }: ColorPickerProps) {
    return (
        <div className="flex flex-wrap gap-2 justify-center bg-white/80 p-4 rounded-xl shadow-lg border border-gray-100 backdrop-blur-md">
            {PALETTE.map((color) => (
                <button
                    key={color}
                    onClick={() => onColorSelect(color)}
                    className={`w-8 h-8 rounded-md border-2 transition-all hover:scale-110 active:scale-95 ${selectedColor === color ? "border-blue-500 scale-110 shadow-lg" : "border-gray-200"
                        }`}
                    style={{ backgroundColor: color }}
                    title={color}
                />
            ))}
        </div>
    );
}
