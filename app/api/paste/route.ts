import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

const MAX_CONTENT_SIZE = 100 * 1024; // 100KB

function generateShortId(): string {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 7; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { encryptedContent, iv, passwordIv, salt, hasPassword, burnAfterReading, expiresIn } =
      body;

    // Validazione
    if (!encryptedContent || !iv) {
      return NextResponse.json(
        { error: "Contenuto cifrato e IV sono obbligatori" },
        { status: 400 }
      );
    }

    if (encryptedContent.length > MAX_CONTENT_SIZE) {
      return NextResponse.json(
        { error: "Contenuto troppo grande (max 100KB)" },
        { status: 400 }
      );
    }

    // Calcola data di scadenza
    let expiresAt: Date | null = null;
    if (expiresIn) {
      const now = new Date();
      switch (expiresIn) {
        case "1h":
          expiresAt = new Date(now.getTime() + 60 * 60 * 1000);
          break;
        case "4h":
          expiresAt = new Date(now.getTime() + 4 * 60 * 60 * 1000);
          break;
        case "1d":
          expiresAt = new Date(now.getTime() + 24 * 60 * 60 * 1000);
          break;
        case "7d":
          expiresAt = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
          break;
      }
    }

    // Genera short ID unico
    let shortId = generateShortId();
    let attempts = 0;
    while (attempts < 10) {
      const existing = await prisma.paste.findUnique({ where: { shortId } });
      if (!existing) break;
      shortId = generateShortId();
      attempts++;
    }

    // Crea paste
    const paste = await prisma.paste.create({
      data: {
        shortId,
        encryptedContent,
        iv,
        passwordIv: passwordIv || null,
        salt: salt || null,
        hasPassword: hasPassword || false,
        burnAfterReading: burnAfterReading || false,
        expiresAt,
      },
    });

    return NextResponse.json({ id: paste.id, shortId: paste.shortId }, { status: 201 });
  } catch (error) {
    console.error("Errore creazione paste:", error);
    return NextResponse.json(
      { error: "Errore del server" },
      { status: 500 }
    );
  }
}

