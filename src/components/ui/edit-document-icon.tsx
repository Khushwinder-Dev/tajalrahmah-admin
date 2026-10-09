import React from "react";

interface EditDocumentIconProps {
  className?: string;
  size?: number;
}

export const EditDocumentIcon: React.FC<EditDocumentIconProps> = ({
  className = "",
  size = 16,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Square outline with break in top-right corner */}
      <path
        d="M4 4h16v16H4V4z"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />
      {/* Break in top-right corner */}
      <path d="M18 6l-2-2" stroke="currentColor" strokeWidth="2" fill="none" />
      {/* Diagonal pencil */}
      <path
        d="M16 8l4-4 2 2-4 4-2-2z"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />
      {/* Pencil tip */}
      <path d="M20 4l2 2" stroke="currentColor" strokeWidth="2" fill="none" />
    </svg>
  );
};

export default EditDocumentIcon;
