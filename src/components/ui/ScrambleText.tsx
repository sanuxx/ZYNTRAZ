"use client";

import { useEffect, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%";

interface ScrambleTextProps {
  text: string;
  delay?: number;
  speed?: number;
}

export default function ScrambleText({ text, delay = 0, speed = 40 }: ScrambleTextProps) {
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    let frame = 0;
    let interval: ReturnType<typeof setInterval>;
    const totalFrames = text.length * 2 + 10;

    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        frame++;
        const scrambled = text
          .split("")
          .map((char, i) => {
            if (char === " ") return " ";
            if (frame > i * 2) return char;
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("");
        setDisplay(scrambled);
        if (frame >= totalFrames) {
          clearInterval(interval);
          setDisplay(text);
        }
      }, speed);
    }, delay);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [text, delay, speed]);

  return (
    <span style={{ fontVariantNumeric: "tabular-nums" }}>{display}</span>
  );
}
