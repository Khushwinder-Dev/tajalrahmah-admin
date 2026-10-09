/* eslint-disable @typescript-eslint/no-explicit-any */
import { X } from "lucide-react";
import { useRef, useState, useImperativeHandle, forwardRef } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Tooltip } from "@mantine/core";
import DatePicker from "react-multi-date-picker";
import type { DateObject, Value } from "react-multi-date-picker";
import arabic from "react-date-object/calendars/arabic";
import arabic_ar from "react-date-object/locales/arabic_ar";
import gregorian from "react-date-object/calendars/gregorian";
import gregorian_en from "react-date-object/locales/gregorian_en";
import CheckIcon from "@/components/common/icons/CheckIcon";
import ErrorIcon from "@/components/common/icons/ErrorIcon";

export interface EditableInputRef {
  focus: () => void;
  validate: () => boolean;
}

export interface EditableInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
  onChange: (e: any) => void;
  onNext?: () => void;
  onCancel?: () => void;
  setRef?: (el: HTMLElement | null) => void;
  tooltipText?: string;
  labelText?: string;
  isDate?: boolean;
  userLang?: string;
  showTemplate?: boolean;
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
      disabled = false,
      tooltipText,
      required = false,
      userLang = "en",
      ...rest
    },
    ref
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [isTouched, setIsTouched] = useState(false);
    const [isValid, setIsValid] = useState(true);
    const [isFocused, setIsFocused] = useState(false);
    const [hasChanged, setHasChanged] = useState(false);

    const validate = (val: string) => {
      if (required) {
        const valid = val.trim().length > 0;
        setIsValid(valid);
        return valid;
      }
      return true;
    };

    useImperativeHandle(ref, () => ({
      focus: () => {
        inputRef.current?.focus();
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
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | Value) => {
      setHasChanged(true); // Mark field as changed when user types
      if (isDate && !(e instanceof Event)) {
        const dateValue = e as DateObject | DateObject[] | null;
        const dateString = dateValue?.toString() || "";
        onChange(dateString);
        if (isTouched) {
          validate(dateString);
        }
      } else if (!isDate) {
        const event = e as React.ChangeEvent<HTMLInputElement>;
        onChange(event);
        if (isTouched) {
          validate(event.target.value);
        }
      }
    };

    const getTooltipText = () => {
      if (tooltipText) return tooltipText;

      switch (name?.toLowerCase()) {
        case "code":
          return userLang === "ar"
            ? "الرجاء إدخال رمز البلد (مثل US, UK)"
            : "Please enter country code (e.g., US, UK)";
        case "callingcode":
          return userLang === "ar"
            ? "الرجاء إدخال رمز الاتصال (مثل +1, +44)"
            : "Please enter calling code (e.g., +1, +44)";
        case "title":
          return userLang === "ar"
            ? "الرجاء إدخال اسم البلد الكامل"
            : "Please enter full country name";
        default:
          return userLang === "ar"
            ? `الرجاء إدخال ${name?.toLowerCase()}`
            : `Please enter your ${name?.toLowerCase()}`;
      }
    };

    if (isDate) {
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
              <div>
                <DatePicker
                  value={value}
                  onChange={handleChange}
                  onOpen={handleFocus}
                  onClose={handleBlur}
                  disabled={disabled}
                  required={required}
                  calendar={userLang === "ar" ? arabic : gregorian}
                  locale={userLang === "ar" ? arabic_ar : gregorian_en}
                  calendarPosition={
                    userLang === "ar" ? "bottom-right" : "bottom-left"
                  }
                  containerClassName={`${userLang === "ar" ? "rtl" : "ltr"}`}
                  render={(value, openCalendar) => (
                    <Input
                      type="text"
                      ref={inputRef}
                      id={id}
                      name={name}
                      value={value}
                      readOnly
                      onClick={openCalendar}
                      onKeyDown={handleKeyDown}
                      disabled={disabled}
                      placeholder={" "}
                      required={required}
                      className={cn(
                        "pr-10 read-only:bg-gray-100 read-only:text-gray-500 read-only:cursor-not-allowed focus-visible:ring-0",
                        "block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 rounded-[12px] border-gray-300 appearance-none dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 peer h-[50px] focus:border-[#70D3FC80] border focus:border",
                        !isValid && isTouched
                          ? "border-red-400 focus:border-red-400"
                          : "",
                        "pt-2",
                        className
                      )}
                      {...rest}
                    />
                  )}
                />
              </div>
            </Tooltip>

            <label
              htmlFor={id}
              className={cn(
                "absolute text-base text-gray-800 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-1 z-10 origin-[0] px-2 peer-focus:px-2 peer-focus:text-primary peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 transition-all rounded-lg bg-white peer-focus:bg-white peer-placeholder-shown:bg-transparent",
                !isValid &&
                  isTouched &&
                  "text-gray-600 peer-focus:text-gray-600"
              )}
            >
              {labelText}
            </label>
          </div>

          <div className="absolute right-2 rtl:left-2 rtl:right-auto top-1/3 transform -translate-y-1/3 flex gap-1">
            {value && isValid && !isFocused && hasChanged && (
              <CheckIcon
                className={cn(
                  "h-4 w-4 cursor-pointer text-green-500",
                  type === "date" || type === "time" ? "mr-8 mt-0.5" : ""
                )}
              />
            )}

            {value && isFocused && (
              <div className="relative group flex items-center">
                <Tooltip
                  label={userLang === "ar" ? "مسح" : "Clear"}
                  position="top"
                  arrowSize={8}
                  withArrow
                  styles={{
                    tooltip: {
                      fontSize: "14px",
                      padding: "8px 12px",
                      backgroundColor: "#374151",
                      color: "white",
                      borderRadius: "6px",
                      fontWeight: "500",
                      boxShadow:
                        "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                    },
                    arrow: {
                      backgroundColor: "#374151",
                    },
                  }}
                >
                  <button
                    type="button"
                    onClick={handleCancel}
                    onMouseDown={(e) => e.preventDefault()}
                    className="text-black"
                    aria-label={userLang === "ar" ? "إلغاء" : "Cancel"}
                  >
                    <X
                      className={cn(
                        "h-4 w-4 cursor-pointer",
                        type === "date" || type === "time" ? "mr-8 mt-0.5" : ""
                      )}
                    />
                  </button>
                </Tooltip>
              </div>
            )}
          </div>

          <div className="mt-1 min-h-[1rem]">
            {!isValid && isTouched && (
              <div className="flex items-center gap-1">
                <ErrorIcon className="h-4 w-4" />
                <p className="text-xs text-gray-500">
                  {userLang === "ar"
                    ? `قيمة لـ ${name || "هذا الحقل"} مطلوبة`
                    : `A value for ${name || "this field"} is required`}
                </p>
              </div>
            )}
          </div>
        </div>
      );
    }

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
            <Input
              type={type}
              ref={(el) => {
                inputRef.current = el;
                setRef?.(el);
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
              placeholder={""}
              required={required}
              className={cn(
                "pr-10 read-only:bg-gray-100 read-only:text-gray-500 read-only:cursor-not-allowed focus-visible:ring-0",
                "block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 rounded-[12px] border-gray-300 appearance-none dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 peer h-[50px] focus:border-[#70D3FC80] border focus:border",
                !isValid && isTouched
                  ? "border-red-300 focus:border-red-300"
                  : "",
                className
              )}
              {...rest}
            />
          </Tooltip>

          <label
            htmlFor={id}
            className={cn(
              "absolute text-base text-gray-800 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-1 z-10 origin-[0] px-2 peer-focus:px-2 peer-focus:text-primary peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 transition-all rounded-lg bg-white peer-focus:bg-white peer-placeholder-shown:bg-transparent",
              !isValid && isTouched && "text-gray-600 peer-focus:text-gray-600"
            )}
          >
            {labelText}
          </label>
        </div>

        <div className="absolute right-2 rtl:left-2 rtl:right-auto top-1/3 transform -translate-y-1/3 flex gap-1">
          {value && isValid && !isFocused && hasChanged && (
            <CheckIcon
              className={cn(
                "h-4 w-4 cursor-pointer",
                type === "date" || type === "time" ? "mr-8 mt-0.5" : ""
              )}
            />
          )}

          {value && isFocused && (
            <div className="relative group flex items-center">
              <Tooltip
                label={userLang === "ar" ? "مسح" : "Clear"}
                position="top"
                arrowSize={8}
                withArrow
                styles={{
                  tooltip: {
                    fontSize: "14px",
                    padding: "8px 12px",
                    backgroundColor: "#374151",
                    color: "white",
                    borderRadius: "6px",
                    fontWeight: "500",
                    boxShadow:
                      "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                  },
                  arrow: {
                    backgroundColor: "#374151",
                  },
                }}
              >
                <button
                  type="button"
                  onClick={handleCancel}
                  onMouseDown={(e) => e.preventDefault()}
                  className="text-black"
                  aria-label={userLang === "ar" ? "إلغاء" : "Cancel"}
                >
                  <X
                    className={cn(
                      `h-4 w-4 cursor-pointer ${
                        type === "date" || type === "time" ? "mr-8 mt-0.5" : ""
                      }`
                    )}
                  />
                </button>
              </Tooltip>
            </div>
          )}
        </div>

        <div className="mt-1 min-h-[1rem]">
          {!isValid && isTouched && (
            <div className="flex items-center gap-1">
              <ErrorIcon className="h-4 w-4" />
              <p className="text-xs text-gray-500">
                {userLang === "ar"
                  ? `قيمة لـ ${name || "هذا الحقل"} مطلوبة`
                  : `A value for ${name || "this field"} is required`}
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }
);

EditableInput.displayName = "EditableInput";

export default EditableInput;
