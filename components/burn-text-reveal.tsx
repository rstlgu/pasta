"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Flame } from "lucide-react";

interface BurnTextRevealProps {
  text: string;
  onFullyRevealed: () => void;
}

export function BurnTextReveal({ text, onFullyRevealed }: BurnTextRevealProps) {
  const [revealedChars, setRevealedChars] = useState<Set<number>>(new Set());
  const [isDestroying, setIsDestroying] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const chars = text.split("");

  useEffect(() => {
    // Controlla se tutto è stato rivelato
    if (revealedChars.size === chars.length && chars.length > 0 && countdown === null) {
      setTimeout(() => {
        setCountdown(3);
      }, 500);
    }
  }, [revealedChars.size, chars.length, countdown]);

  useEffect(() => {
    if (countdown === null) return;
    
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setIsDestroying(true);
      setTimeout(() => {
        onFullyRevealed();
      }, 800);
    }
  }, [countdown, onFullyRevealed]);

  function revealCharsAtPosition(clientX: number, clientY: number) {
    if (isDestroying) return;

    const container = containerRef.current;
    if (!container) return;

    const spans = container.querySelectorAll("span");
    spans.forEach((span, index) => {
      const rect = span.getBoundingClientRect();
      const distance = Math.sqrt(
        Math.pow(clientX - (rect.left + rect.width / 2), 2) +
          Math.pow(clientY - (rect.top + rect.height / 2), 2)
      );

      if (distance < 50) {
        setRevealedChars((prev) => new Set(prev).add(index));
      }
    });
  }

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    revealCharsAtPosition(e.clientX, e.clientY);
  }

  function handleTouchMove(e: React.TouchEvent<HTMLDivElement>) {
    e.preventDefault(); // Previeni scroll durante il reveal
    const touch = e.touches[0];
    if (touch) {
      revealCharsAtPosition(touch.clientX, touch.clientY);
    }
  }

  return (
    <>
      <div className="relative">
        {/* Warning Banner */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 bg-orange-500/20 border-2 border-orange-500 rounded-lg p-4 mb-6"
        >
          <Flame className="h-5 w-5 text-orange-500 flex-shrink-0" />
          <p className="text-sm text-orange-500 font-semibold">
            <span className="hidden md:inline">Passa il mouse sul testo per rivelarlo.</span>
            <span className="md:hidden">Trascina il dito sul testo sfocato per rivelarlo.</span>
            {" "}Si autodistruggerà una volta letto.
          </p>
        </motion.div>

        {/* Text Container */}
        <motion.div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          onTouchStart={handleTouchMove}
          className="relative min-h-[400px] p-8 bg-card border-2 border-primary rounded-xl cursor-crosshair overflow-hidden touch-none"
          animate={isDestroying ? { opacity: 0, scale: 0.95 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
        {isDestroying && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 flex items-center justify-center z-10 bg-background/80 backdrop-blur-sm"
          >
            <div className="text-center">
              <Flame className="h-16 w-16 text-orange-500 mx-auto mb-4 animate-pulse" />
              <p className="text-xl font-bold text-orange-500">
                Distruzione in corso...
              </p>
            </div>
          </motion.div>
        )}

        <div className="font-mono text-base leading-relaxed whitespace-pre-wrap">
          {chars.map((char, index) => {
            const isRevealed = revealedChars.has(index);
            return (
              <motion.span
                key={index}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: isRevealed ? 1 : 0.8,
                  filter: isRevealed ? "blur(0px)" : "blur(8px)",
                }}
                transition={{ duration: 0.3 }}
                className="inline-block select-none"
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            );
          })}
        </div>

        {/* Progress Bar */}
        {countdown === null && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-muted">
            <motion.div
              className="h-full bg-primary"
              initial={{ width: 0 }}
              animate={{
                width: `${(revealedChars.size / chars.length) * 100}%`,
              }}
              transition={{ duration: 0.3 }}
            />
          </div>
        )}
      </motion.div>

        {/* Stats */}
        <div className="mt-4 text-center text-sm text-muted-foreground">
          Rivelato: {revealedChars.size} / {chars.length} caratteri (
          {Math.round((revealedChars.size / chars.length) * 100)}%)
        </div>
      </div>

      {/* Floating Countdown - Fixed at Bottom Center */}
      {countdown !== null && countdown > 0 && (
        <motion.div
          initial={{ y: 100, opacity: 0, scale: 0.8 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 100, opacity: 0, scale: 0.8 }}
          className="fixed bottom-8 left-0 right-0 z-50 flex flex-col items-center gap-2"
        >
          {/* Circle with Number */}
          <motion.div
            key={countdown}
            initial={{ scale: 1.5, opacity: 0, rotate: -180 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="w-24 h-24 md:w-32 md:h-32 bg-card/95 backdrop-blur-md border-4 border-primary rounded-full shadow-2xl flex items-center justify-center"
          >
            <span className="text-5xl md:text-6xl font-bold text-primary tabular-nums">
              {countdown}
            </span>
          </motion.div>
          
          {/* Label */}
          <div className="bg-card/90 backdrop-blur-sm border-2 border-primary rounded-full px-4 py-1">
            <p className="text-xs font-semibold text-muted-foreground whitespace-nowrap">
              Autodistruzione...
            </p>
          </div>
        </motion.div>
      )}
    </>
  );
}

