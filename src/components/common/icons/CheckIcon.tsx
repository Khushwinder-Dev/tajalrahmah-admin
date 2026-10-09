/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";

interface CheckIconProps {
  className?: string;
}

const CheckIcon: React.FC<CheckIconProps> = ({ className }) => {
  const [pathData, setPathData] = React.useState<string | null>(null);

  useEffect(() => {
    try {
      const savedIconsString = localStorage.getItem("uploadedIcons");
      if (!savedIconsString) return;

      const savedIcons: any[] = JSON.parse(savedIconsString);
      const savedIcon = savedIcons?.find((icon: any) => icon.name === "check");

      if (savedIcon && savedIcon.svgContent) {
        // Extract the path data from the SVG
        const pathMatch = savedIcon.svgContent.match(/d="([^"]+)"/);
        if (pathMatch) {
          setPathData(pathMatch[1]);
        }
      }
    } catch (error) {
      console.error("Error in CheckIcon useEffect:", error);
    }
  }, []);

  // If no path data, use fallback
  if (!pathData) {
    return (
      <>
        <svg
          className={`${className} text-green-500`}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20 6L9 17l-5-5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </>
    );
  }

  return (
    <svg
      className={`${className} text-green-500`}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d={pathData}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default CheckIcon;
