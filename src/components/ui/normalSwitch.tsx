import * as React from "react";

interface NormalSwitchProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  label: string;
  className?: string;
  disabled?: boolean;
}

export const NormalSwitch: React.FC<NormalSwitchProps> = ({
  checked,
  onCheckedChange,
  label,
  className = "",
  disabled = false,
}) => {
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (disabled) return;
    if (event.key === " " || event.key === "Enter") {
      event.preventDefault();
      onCheckedChange(!checked);
    }
  };

  const handleClick = () => {
    if (disabled) return;
    onCheckedChange(!checked);
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={`Toggle ${label}`}
      disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      className={`
        relative inline-flex items-center rounded-full border transition-all duration-200 ease-in-out
        focus:outline-none
        w-16 h-7.5
        ${checked ? "bg-primary border-sky-200" : "bg-sky-200 border-sky-200"}
        ${
          disabled
            ? "opacity-50 cursor-not-allowed"
            : "cursor-pointer hover:shadow-sm active:scale-95"
        }
        ${className}
      `}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      {/* Label centered in the track, with padding to avoid thumb overlap */}
      <span
        className={`
          absolute inset-0 flex items-center justify-center font-semibold select-none pointer-events-none z-10 text-sm pl-8 pr-8 transition-all duration-200
          ${disabled ? "opacity-50" : ""}
           ${checked ? "text-gray-100" : "text-gray-900"}
           ${checked ? "-translate-x-3" : "translate-x-3"}
        `}
        aria-hidden="true"
      >
        {label}
      </span>

      {/* Thumb */}
      <span
        className={`
          absolute rounded-full bg-white shadow-sm border border-gray-200 z-20
          transition-all duration-200 ease-in-out
          w-7 h-7
          ${checked ? "translate-x-[35px]" : ""}
          ${!disabled && "hover:shadow-md"}
        `}
        aria-hidden="true"
      />
    </button>
  );
};

export default NormalSwitch;
