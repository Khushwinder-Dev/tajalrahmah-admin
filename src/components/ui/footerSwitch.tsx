// import * as React from "react";
// import { useTranslation } from "react-i18next";
// import { Check, X } from "lucide-react";

// interface FooterSwitchProps
//   extends React.ButtonHTMLAttributes<HTMLButtonElement> {
//   checked: boolean;
//   onCheckedChange: (checked: boolean) => void;
//   label: string;
//   className?: string;
//   disabled?: boolean;
//   // Add this to your props interface
//   buttonRef?: (el: HTMLButtonElement | null) => void;
// }

// export const FooterSwitch: React.FC<FooterSwitchProps> = ({
//   checked,
//   onCheckedChange,
//   label,
//   className = "",
//   disabled = false,
//   buttonRef,
//   ...rest
// }) => {
//   const { i18n } = useTranslation();
//   const isRTL = i18n.language === "ar";

//   const handleKeyDown = (event: React.KeyboardEvent) => {
//     if (disabled) return;
//     if (event.key === " " || event.key === "Enter") {
//       event.preventDefault();
//       onCheckedChange(!checked);
//     }
//   };

//   const handleClick = () => {
//     if (disabled) return;
//     onCheckedChange(!checked);
//   };

//   return (
//     <button
//       ref={buttonRef}
//       type="button"
//       role="switch"
//       aria-checked={checked}
//       aria-label={`Toggle ${label}`}
//       disabled={disabled}
//       tabIndex={disabled ? -1 : 0}
//       className={`
//         relative inline-flex items-center rounded-full border transition-all duration-200 ease-in-out
//         focus:outline-none
//         w-20 h-8
//         ${checked ? "bg-primary border-sky-200" : "bg-sky-200 border-sky-200"}
//         ${
//           disabled
//             ? "opacity-50 cursor-not-allowed"
//             : "cursor-pointer hover:shadow-sm active:scale-95"
//         }
//         ${className}
//       `}
//       onClick={handleClick}
//       onKeyDown={handleKeyDown}
//       {...rest}
//     >
//       {/* Label centered in the track */}
//       <span
//         className={`
//           absolute inset-0 flex items-center justify-center font-semibold select-none pointer-events-none z-10 text-sm transition-all duration-200
//           ${isRTL ? "pr-8 pl-8" : "pl-8 pr-2"}
//           ${disabled ? "opacity-50" : ""}
//            ${checked ? "text-gray-100" : "text-gray-900"}
//         `}
//         aria-hidden="true"
//       >
//         {label}
//       </span>

//       {/* Fixed Thumb with Icon */}
//       <span
//         className={`
//           absolute rounded-full bg-white shadow-sm border border-gray-200 z-20
//           transition-all duration-200 ease-in-out
//           w-7 h-7 -left-0.5
//           flex items-center justify-center
//           ${!disabled && "hover:shadow-md"}
//         `}
//         aria-hidden="true"
//       >
//         {checked ? (
//           <Check size={14} className="text-primary" />
//         ) : (
//           <X size={14} className="text-gray-500" />
//         )}
//       </span>
//     </button>
//   );
// };

// export default FooterSwitch;

import * as React from "react";

interface FooterSwitchProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  label: string;
  imageUrl: string; // New prop for image URL
  className?: string;
  disabled?: boolean;
  buttonRef?: (el: HTMLButtonElement | null) => void;
}

export const FooterSwitch: React.FC<FooterSwitchProps> = ({
  checked,
  onCheckedChange,
  label,
  imageUrl,
  className = "",
  disabled = false,
  buttonRef,
  ...rest
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
    <div className="flex flex-col items-center gap-2">
      {/* Circular Button */}
      <button
        ref={buttonRef}
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={`Toggle ${label}`}
        disabled={disabled}
        tabIndex={disabled ? -1 : 0}
        className={`
          w-12 max-[435px]:w-9 max-[435px]:h-9 h-12 p-1 rounded-[50px] inline-flex justify-center items-center gap-2.5 transition-all duration-200 ease-in-out
          focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2
          ${checked ? "bg-sky-400" : "bg-sky-200"}
          ${
            disabled
              ? "opacity-50 cursor-not-allowed"
              : "cursor-pointer hover:shadow-lg active:scale-95"
          }
          ${className}
        `}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        {...rest}
      >
        {/* Image Container */}
        <div className="w-6 max-[435px]:w-5 max-[435px]:h-5 h-6 relative overflow-hidden flex items-center justify-center">
          <img src={imageUrl} alt={label} className="w-5 h-5 object-contain" />
        </div>
      </button>

      {/* Label below the button */}
      {/* <span
        className={`
          text-sm font-medium select-none transition-all duration-200
          ${disabled ? "opacity-50" : ""}
          ${checked ? "text-sky-600" : "text-gray-600"}
        `}
      >
        {label}
      </span> */}
    </div>
  );
};

export default FooterSwitch;
