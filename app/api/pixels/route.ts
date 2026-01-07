import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET /api/pixels - Fetch all pixels
export async function GET() {
    try {
        const pixels = await prisma.pixel.findMany({
            include: {
                user: {
                    select: {
                        name: true,
                    },
                },
            },
        });
        return NextResponse.json(pixels);
    } catch (error) {
        console.error("Failed to fetch pixels:", error);
        return NextResponse.json({ error: "Failed to fetch pixels" }, { status: 500 });
    }
}

// POST /api/pixels - Save or update a pixel
export async function POST(request: Request) {
    try {
        const { x, y, color, userId, userName } = await request.json();

        if (x === undefined || y === undefined || !color || !userId || !userName) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // Ensure user exists (Mock Auth simulation)
        const user = await prisma.user.upsert({
            where: { id: userId },
            update: { name: userName },
            create: { id: userId, name: userName },
        });

        // Save or update pixel at coordinates (x, y)
        const pixel = await prisma.pixel.upsert({
            where: {
                x_y: { x, y },
            },
            update: {
                color,
                userId: user.id,
            },
            create: {
                x,
                y,
                color,
                userId: user.id,
            },
        });

        return NextResponse.json(pixel);
    } catch (error) {
        console.error("Failed to save pixel:", error);
        return NextResponse.json({ error: "Failed to save pixel" }, { status: 500 });
    }
}
