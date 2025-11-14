import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(
  request: NextRequest,
  { params }: { params: { shortId: string } }
) {
  try {
    const { shortId } = params;

    const paste = await prisma.paste.findUnique({
      where: { shortId },
      select: { id: true },
    });

    if (!paste) {
      return NextResponse.json(
        { error: "Paste non trovato" },
        { status: 404 }
      );
    }

    return NextResponse.json({ id: paste.id });
  } catch (error) {
    console.error("Errore recupero short ID:", error);
    return NextResponse.json(
      { error: "Errore del server" },
      { status: 500 }
    );
  }
}

