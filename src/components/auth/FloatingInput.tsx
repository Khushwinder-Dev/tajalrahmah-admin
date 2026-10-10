import React, { forwardRef, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface FloatingInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  required?: boolean;
  error?: string;
  isPassword?: boolean;
  rightIcon?: React.ReactNode;
}

export const FloatingInput = forwardRef<HTMLInputElement, FloatingInputProps>(
  (
    {
      id,
      label,
      type = "text",
      required = false,
      error,
      isPassword = false,
      rightIcon,
      className = "",
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const inputId = id || props.name || Math.random().toString(36).substring(7);

    const inputType = isPassword
      ? showPassword
        ? "text"
        : "password"
      : type;

    return (
      <div className="w-full">
        <div className="relative group">
          {/* Input field with rounded-full pill shape and peer support */}
          <input
            id={inputId}
            ref={ref}
            type={inputType}
            placeholder=" "
            className={`peer w-full rounded-full bg-white px-5 py-3 text-sm text-slate-800 border outline-none transition-all duration-200 font-normal ${
              error
                ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                : "border-slate-300 focus:border-[#0070ba] focus:ring-2 focus:ring-[#0070ba]/20"
            } ${isPassword || rightIcon ? "pr-12" : "pr-5"} ${className}`}
            {...props}
          />

          {/* Floating Label (interrupts top border with white bg) */}
          <label
            htmlFor={inputId}
            className={`pointer-events-none absolute left-4 bg-white px-1.5 transition-all duration-200 select-none ${
              error
                ? "text-red-500"
                : "text-slate-400 peer-focus:text-[#0070ba] peer-[:not(:placeholder-shown)]:text-slate-600"
            } top-1/2 -translate-y-1/2 text-sm font-normal peer-focus:-top-2.5 peer-focus:translate-y-0 peer-focus:text-xs peer-focus:font-semibold peer-[:not(:placeholder-shown)]:-top-2.5 peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:font-medium`}
          >
            {label}
            {required && <span className="text-red-500 ml-1 font-semibold">*</span>}
          </label>

          {/* Right side icon or password toggle */}
          {isPassword ? (
            <button
              type="button"
              tabIndex={-1}
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors p-1"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          ) : rightIcon ? (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
              {rightIcon}
            </div>
          ) : null}
        </div>

        {error && (
          <p className="text-xs text-red-500 mt-1 pl-4 font-normal">
            {error}
          </p>
        )}
      </div>
    );
  }
);

FloatingInput.displayName = "FloatingInput";

export default FloatingInput;
