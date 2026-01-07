"use client";

import { useState, useEffect } from "react";

interface MockAuthProps {
    onUserSet: (user: { id: string; name: string }) => void;
}

export default function MockAuth({ onUserSet }: MockAuthProps) {
    const [name, setName] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const storedId = localStorage.getItem("pixel-war-user-id");
        const storedName = localStorage.getItem("pixel-war-user-name");

        if (storedId && storedName) {
            onUserSet({ id: storedId, name: storedName });
        } else {
            setIsOpen(true);
        }
    }, [onUserSet]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) return;

        const id = Math.random().toString(36).substring(2, 11);
        localStorage.setItem("pixel-war-user-id", id);
        localStorage.setItem("pixel-war-user-name", name);

        onUserSet({ id, name });
        setIsOpen(false);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
            <div className="bg-white p-8 rounded-xl shadow-2xl max-w-sm w-full mx-4">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">Welcome to Pixel War!</h2>
                <p className="text-gray-600 mb-6 font-medium">Please enter your name to start drawing.</p>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your pseudo..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        autoFocus
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 active:scale-95 transition-all shadow-md"
                    >
                        Join the War
                    </button>
                </form>
            </div>
        </div>
    );
}
