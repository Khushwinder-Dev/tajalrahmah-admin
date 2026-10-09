import { Check, TriangleAlert, X } from "lucide-react";
import { useRef, useState, useImperativeHandle, forwardRef } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Tooltip } from "@mantine/core"; // Import Tooltip from Mantine
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

export interface EditableInputRef {
  focus: () => void;
  validate: () => boolean;
}

export interface EditableInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onNext?: () => void;
  onCancel?: () => void;
  setRef?: (el: HTMLElement | null) => void;
  tooltipText?: string;
  labelText?: string;
  isDate?: boolean;
  isPhone?: boolean;
  onPhoneChange?: (value: string | undefined) => void;
}

const EditableInput = forwardRef<EditableInputRef, EditableInputProps>(
  (
    {
      id,
      name,
      type,
      value,
      onChange,
      onNext,
      onCancel,
      onKeyDown,
      setRef,
      className,
      labelText,
      maxLength,
      isDate,
      isPhone = false,
      onPhoneChange,
      disabled = false,
      tooltipText,
      required = false,
      ...rest
    },
    ref
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const phoneInputRef = useRef<HTMLInputElement>(null);
    const [isTouched, setIsTouched] = useState(false);
    const [isValid, setIsValid] = useState(true);
    const [isFocused, setIsFocused] = useState(false);

    const validate = (val: string) => {
      if (required) {
        const valid = val.trim().length > 0;
        setIsValid(valid);
        return valid;
      }
      return true;
    };

    // Expose methods to parent component
    useImperativeHandle(ref, () => ({
      focus: () => {
        if (isPhone && phoneInputRef.current) {
          phoneInputRef.current.focus();
        } else if (inputRef.current) {
          inputRef.current.focus();
        }
      },
      validate: () => {
        setIsTouched(true);
        return validate(value);
      },
    }));

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();
        setIsTouched(true);
        if (validate(value)) {
          onNext?.();
        }
      }
      if (e.key === "Escape") {
        onCancel?.();
      }
    };

    const handleFocus = () => {
      setIsFocused(true);
    };

    const handleBlur = () => {
      setIsFocused(false);
      setIsTouched(true);
      validate(value);
    };

    const handleCancel = () => {
      onCancel?.();
      setIsTouched(false);
      setIsValid(true);
      console.log("onCancel");
    };

    const handleNext = () => {
      setIsTouched(true);
      if (validate(value)) {
        onNext?.();
      }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e);
      // Revalidate on change if already touched
      if (isTouched) {
        validate(e.target.value);
      }
    };

    const handlePhoneChange = (phoneValue: string | undefined) => {
      onPhoneChange?.(phoneValue);
      // Revalidate on change if already touched
      if (isTouched) {
        validate(phoneValue || "");
      }
      // Maintain focus after value change
      setTimeout(() => {
        if (phoneInputRef.current && isFocused) {
          phoneInputRef.current.focus();
        }
      }, 0);
    };

    // Generate tooltip text based on field name or use custom tooltipText
    const getTooltipText = () => {
      if (tooltipText) return tooltipText;

      switch (name?.toLowerCase()) {
        case "code":
          return "Please enter country code (e.g., US, UK)";
        case "callingcode":
          return "Please enter calling code (e.g., +1, +44)";
        case "title":
          return "Please enter full country name";
        case "phone":
        case "mobile":
        case "telephone":
          return "Please enter a valid phone number";
        default:
          return `Please enter your ${name?.toLowerCase()}`;
      }
    };

    return (
      <div className="relative w-full z-0">
        <div className="relative">
          <Tooltip
            label={getTooltipText()}
            position="top"
            arrowSize={8}
            withArrow
            opened={isFocused}
            styles={{
              tooltip: {
                fontSize: "14px",
                padding: "8px 12px",
                backgroundColor: "white",
                color: "var(--primary)",
                border: "1px solid var(--primary)",
                borderRadius: "6px",
                fontWeight: "600",
                boxShadow:
                  "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
              },
              arrow: {
                backgroundColor: "white",
                border: "1px solid var(--primary)",
              },
            }}
          >
            {isPhone ? (
              <div
                className="relative phone-input-wrapper"
                style={
                  {
                    "--phone-input-height": "50px",
                    "--phone-input-bg": "#f8fafc",
                    "--phone-input-border": "#d1d5db",
                    "--phone-input-border-radius": "12px",
                    "--phone-input-focus-border": "var(--primary, #3b82f6)",
                    "--phone-input-text": "#111827",
                    "--phone-input-padding": "12px 16px 12px 50px",
                  } as React.CSSProperties
                }
              >
                <PhoneInput
                  value={value}
                  onChange={handlePhoneChange}
                  onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                    handleKeyDown(e);
                    onKeyDown?.(e);
                  }}
                  onFocus={(e: React.FocusEvent<HTMLInputElement>) => {
                    handleFocus();
                    // Prevent any blur events during focus
                    e.preventDefault();
                  }}
                  onBlur={() => {
                    // Small delay to prevent immediate blur during typing
                    setTimeout(() => {
                      handleBlur();
                    }, 100);
                  }}
                  disabled={disabled}
                  placeholder=" "
                  international
                  defaultCountry="US"
                  className={cn(
                    "phone-input-integrated",
                    !isValid && isTouched && "phone-input-error"
                  )}
                  inputComponent={(
                    props: React.InputHTMLAttributes<HTMLInputElement> & {
                      ref?: React.Ref<HTMLInputElement>;
                    }
                  ) => (
                    <input
                      {...props}
                      ref={(el) => {
                        phoneInputRef.current = el;
                        inputRef.current = el;
                        setRef?.(el);
                        if (props.ref) {
                          if (typeof props.ref === "function") {
                            props.ref(el);
                          } else {
                            props.ref.current = el;
                          }
                        }
                      }}
                      className={cn(
                        "pr-10 read-only:bg-gray-100 read-only:text-gray-500 read-only:cursor-not-allowed focus-visible:ring-0",
                        "block px-2.5 pb-2.5 pt-3 w-full text-sm text-gray-900 rounded-[12px] border-gray-300 appearance-none dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 peer h-[50px] focus:border-primary border-1 focus:border-2",
                        "!pl-12", // Reduced padding for country selector
                        !isValid && isTouched
                          ? "border-red-400 focus:border-red-400"
                          : "",
                        className
                      )}
                    />
                  )}
                />
              </div>
            ) : (
              <Input
                type={type}
                // ref={inputRef}
                ref={(el) => {
                  inputRef.current = el;
                  setRef?.(el); // assign to parent-level dynamic refs
                }}
                id={id}
                name={name}
                value={value}
                maxLength={maxLength}
                onChange={handleChange}
                onKeyDown={(e) => {
                  handleKeyDown(e);
                  onKeyDown?.(e);
                }}
                onFocus={handleFocus}
                onBlur={handleBlur}
                disabled={disabled}
                placeholder={" "}
                required={required}
                className={cn(
                  "pr-10 read-only:bg-gray-100 read-only:text-gray-500 read-only:cursor-not-allowed focus-visible:ring-0",
                  // floating label css
                  "block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 rounded-[12px] border-gray-300 appearance-none dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 peer h-[50px] focus:border-primary border-1 focus:border-2",
                  !isValid && isTouched
                    ? "border-red-400 focus:border-red-400"
                    : "",
                  isDate && "pt-2",
                  className
                )}
                {...rest}
              />
            )}
          </Tooltip>

          <label
            htmlFor={id}
            className={cn(
              "absolute text-base text-gray-800 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-1 z-10 origin-[0] bg-[#f8fafc] dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-primary peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 transition-all rounded-lg",
              !isValid && isTouched && "text-red-500 peer-focus:text-red-500"
            )}
          >
            {labelText}
          </label>
        </div>

        <div className="absolute right-2 rtl:left-2 rtl:right-auto top-1/3 transform -translate-y-1/3 flex gap-1">
          {value && isValid && !isFocused && (
            <Check
              className={cn(`h-4 w-4 ${type === "date" ? "mr-8 mt-0.5" : ""}`)}
            />
          )}
          {!isValid && !isFocused && (
            <button type="button" onClick={handleNext} className="text-red-500">
              <TriangleAlert
                className={cn(
                  `h-4 w-4 ${type === "date" ? "mr-8 mt-0.5" : ""}`
                )}
              />
            </button>
          )}

          {value && isFocused && (
            <div className="relative group flex items-center">
              <Tooltip
                label="Clear"
                position="top"
                arrowSize={8}
                withArrow
                styles={{
                  tooltip: {
                    fontSize: "14px",
                    padding: "8px 12px",
                    backgroundColor: "white",
                    color: "var(--primary)",
                    border: "1px solid var(--primary)",
                    borderRadius: "6px",
                    fontWeight: "600",
                    boxShadow:
                      "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                  },
                  arrow: {
                    backgroundColor: "white",
                    border: "1px solid var(--primary)",
                  },
                }}
              >
                <button
                  type="button"
                  onClick={() => {
                    console.log("handleCancel");
                    handleCancel();
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault(); // Prevent blur before click registers
                    handleCancel();
                  }}
                  className="text-black"
                  aria-label="Cancel"
                >
                  <X
                    className={cn(
                      `h-4 w-4 cursor-pointer ${
                        type === "date" ? "mr-8 mt-0.5" : ""
                      }`
                    )}
                  />
                </button>
              </Tooltip>
            </div>
          )}
        </div>

        {/* Reserve space for error message */}
        <div className="mt-1 min-h-[1rem]">
          {!isValid && isTouched && (
            <p className="text-xs text-red-500">This field is required</p>
          )}
        </div>
      </div>
    );
  }
);

EditableInput.displayName = "EditableInput";

export default EditableInput;
