// components/MinimizeAnimation.tsx
import React from "react";

interface MinimizeAnimationProps {
  isActive: boolean;
  children: React.ReactNode;
}

const MinimizeAnimation: React.FC<MinimizeAnimationProps> = ({
  isActive,
  children,
}) => {
  return (
    <div
      className={`transition-all duration-300 ease-out h-full ${
        isActive
          ? "opacity-30 scale-95 pointer-events-none"
          : "opacity-100 scale-100"
      }`}
    >
      {children}
    </div>
  );
};

export default MinimizeAnimation;
