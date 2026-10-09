// hooks/useMinimizeAnimation.ts
import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

interface MinimizeAnimationOptions {
  duration?: number;
  onComplete?: () => void;
}

export const useMinimizeAnimation = (
  options: MinimizeAnimationOptions = {}
) => {
  const { duration = 600, onComplete } = options;
  const [isMinimizing, setIsMinimizing] = useState(false);
  const navigate = useNavigate();

  const startMinimizeAnimation = useCallback(
    (sourceElement?: HTMLElement) => {
      setIsMinimizing(true);

      // Get the source element (the page content) and taskbar position
      const pageContent =
        sourceElement ||
        (document.querySelector(".module-container") as HTMLElement);
      const taskbar = document.querySelector(".taskbar") as HTMLElement;

      if (pageContent && taskbar) {
        // Get positions
        const pageRect = pageContent.getBoundingClientRect();
        const taskbarRect = taskbar.getBoundingClientRect();

        // Create a clone of the page for animation
        const clone = pageContent.cloneNode(true) as HTMLElement;
        clone.style.position = "fixed";
        clone.style.top = `${pageRect.top}px`;
        clone.style.left = `${pageRect.left}px`;
        clone.style.width = `${pageRect.width}px`;
        clone.style.height = `${pageRect.height}px`;
        clone.style.zIndex = "9999";
        clone.style.pointerEvents = "none";
        clone.style.transition = `all ${duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`;
        clone.style.transformOrigin = "center bottom";

        // Add the clone to body
        document.body.appendChild(clone);

        // Hide the original content
        pageContent.style.opacity = "0.3";
        pageContent.style.transform = "scale(0.95)";
        pageContent.style.transition = `all ${duration / 2}ms ease-out`;

        // Start the animation after a brief delay
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            // Calculate target position (bottom-left of taskbar)
            const targetX = taskbarRect.left + 50; // Offset from taskbar left
            const targetY = taskbarRect.top - 20; // Slightly above taskbar
            const targetWidth = 60;
            const targetHeight = 40;

            // Apply the minimize animation
            clone.style.transform = `translate(${targetX - pageRect.left}px, ${
              targetY - pageRect.top
            }px) scale(${targetWidth / pageRect.width}, ${
              targetHeight / pageRect.height
            })`;
            clone.style.opacity = "0";
            clone.style.borderRadius = "8px";
          });
        });

        // Clean up after animation
        setTimeout(() => {
          document.body.removeChild(clone);
          pageContent.style.opacity = "";
          pageContent.style.transform = "";
          pageContent.style.transition = "";
          setIsMinimizing(false);
          onComplete?.();
        }, duration);
      } else {
        // Fallback if elements not found
        setTimeout(() => {
          setIsMinimizing(false);
          onComplete?.();
        }, duration);
      }
      console.log("Minimize animation completed");
      navigate("/dashboard");
    },
    [duration, onComplete]
  );

  return {
    isMinimizing,
    startMinimizeAnimation,
  };
};
