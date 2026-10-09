import { useEffect, useRef } from "react";

// Debounce utility
const debounce = (fn: () => void, delay: number) => {
  let timeout: NodeJS.Timeout;
  return () => {
    clearTimeout(timeout);
    timeout = setTimeout(fn, delay);
  };
};

export function useInactivityTimer(
  onInactive: () => void,
  timeout = 5 * 60 * 1000,
  debounceDelay = 200,
  isEnabled = true
) {
  const timer = useRef<NodeJS.Timeout | null>(null);

  const resetTimer = () => {
    if (!isEnabled) return;

    if (timer.current) clearTimeout(timer.current);
    localStorage.setItem("lastActivity", Date.now().toString());

    timer.current = setTimeout(() => {
      localStorage.setItem("isLocked", "true");
      onInactive();
    }, timeout);
  };

  const debouncedReset = debounce(resetTimer, debounceDelay);

  useEffect(() => {
    if (!isEnabled) {
      // Clear any existing timers when disabled
      if (timer.current) clearTimeout(timer.current);
      return;
    }

    const events = [
      "mousemove",
      "mousedown",
      "keypress",
      "scroll",
      "touchstart",
    ];
    events.forEach((event) => window.addEventListener(event, debouncedReset));

    const lastActivity = localStorage.getItem("lastActivity");
    const now = Date.now();

    if (!lastActivity || isNaN(parseInt(lastActivity))) {
      // Set a fresh timestamp if missing or invalid
      localStorage.setItem("lastActivity", now.toString());
    } else if (now - parseInt(lastActivity) > timeout) {
      // Lock immediately if timeout passed
      localStorage.setItem("isLocked", "true");
      onInactive();
    } else {
      // Resume remaining time
      const timeLeft = timeout - (now - parseInt(lastActivity));
      timer.current = setTimeout(() => {
        localStorage.setItem("isLocked", "true");
        onInactive();
      }, timeLeft);
    }

    return () => {
      events.forEach((event) =>
        window.removeEventListener(event, debouncedReset)
      );
      if (timer.current) clearTimeout(timer.current);
    };
  }, [isEnabled]);
}
