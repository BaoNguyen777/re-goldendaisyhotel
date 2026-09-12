"use client";

import { useEffect } from "react";

export default function NativeWheel() {
  useEffect(() => {
    const stopLenisWheel = (event: WheelEvent) => {
      event.stopImmediatePropagation();
    };

    window.addEventListener("wheel", stopLenisWheel, { capture: true, passive: true });
    return () => window.removeEventListener("wheel", stopLenisWheel, { capture: true });
  }, []);

  return null;
}
