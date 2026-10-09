/* eslint-disable @typescript-eslint/no-explicit-any */
import { TriangleAlert } from "lucide-react";
import {
  useRef,
  useState,
  useImperativeHandle,
  forwardRef,
  useEffect,
} from "react";
import { cn } from "@/lib/utils";
import { Tooltip } from "@mantine/core";
import DatePicker from "react-multi-date-picker";
import { DateObject } from "react-multi-date-picker";
import arabic from "react-date-object/calendars/arabic";
import arabic_ar from "react-date-object/locales/arabic_ar";
import gregorian from "react-date-object/calendars/gregorian";
import gregorian_en from "react-date-object/locales/gregorian_en";
import { Button } from "@/components/ui/button";

export interface EditableInputRef {
  focus: () => void;
  validate: () => boolean;
}

export interface EditableInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  value: string;
  onChange: (value: string) => void;
  onNext?: () => void;
  onCancel?: () => void;
  setRef?: (el: HTMLElement | null) => void;
  tooltipText?: string;
  labelText?: string;
  isDate?: boolean;
  userLang?: string;
  calendarType?: "gregorian" | "hijri";
  rtl?: boolean;
}

// Custom Actions Plugin Component
interface CustomActionsPluginProps {
  userLang?: string;
  onSubmit?: () => void;
  onClear?: () => void;
  position?: "top" | "bottom" | "left" | "right";
}

const CustomActionsPlugin: React.FC<CustomActionsPluginProps> = ({
  userLang = "en",
  onSubmit,
  onClear,
  position = "bottom",
}) => {
  return (
    <div className={`rmdp-plugin rmdp-${position}`}>
      <div className="flex gap-2 p-3 border-t border-gray-200 bg-gray-50 rounded-b-lg">
        <Button
          variant="outline"
          onClick={onClear}
          className="flex-1 px-4 py-2 text-sm font-medium rounded-full text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
        >
          {userLang === "ar" ? "Clear" : "Clear"}
        </Button>
        <Button
          variant="outline"
          onClick={onSubmit}
          className="flex-1 px-4 py-2 text-sm font-medium text-white bg-primary border border-transparent rounded-md hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
        >
          {userLang === "ar" ? "Submit" : "Submit"}
        </Button>
      </div>
    </div>
  );
};

const EditableInput = forwardRef<EditableInputRef, EditableInputProps>(
  (
    {
      id,
      name,
      value,
      onChange,
      onNext,
      onCancel,
      labelText,
      isDate,
      disabled = false,
      tooltipText,
      required = false,
      userLang = "en",
      calendarType = "hijri",
    },
    ref
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [isTouched, setIsTouched] = useState(false);
    const [isValid, setIsValid] = useState(true);
    const [isFocused, setIsFocused] = useState(false);
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const [internalValue, setInternalValue] = useState(value);

    // State for 8 separate date inputs (DD/MM/YYYY)
    const [dateDigits, setDateDigits] = useState([
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
    ]);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const [currentFocusIndex, setCurrentFocusIndex] = useState<number>(-1);

    // Initialize refs array
    useEffect(() => {
      inputRefs.current = inputRefs.current.slice(0, 8);
    }, []);

    // Get calendar and locale based on selected type
    const { calendar, locale } =
      calendarType === "hijri"
        ? {
            calendar: arabic,
            locale: arabic_ar,
          }
        : {
            calendar: gregorian,
            locale: gregorian_en,
          };

    // Helper function to check if object is DateObject
    const isDateObject = (obj: any): obj is DateObject => {
      return (
        obj &&
        typeof obj === "object" &&
        (obj instanceof DateObject ||
          obj.constructor.name === "DateObject" ||
          obj.constructor.name === "i2" ||
          (obj.format &&
            typeof obj.format === "function" &&
            obj.convert &&
            typeof obj.convert === "function"))
      );
    };

    // Helper functions for numeral conversion
    const convertArabicToWestern = (str: string) => {
      const arabicNumerals = "٠١٢٣٤٥٦٧٨٩";
      const westernNumerals = "0123456789";
      return str.replace(/[٠-٩]/g, (match) => {
        const index = arabicNumerals.indexOf(match);
        return westernNumerals[index];
      });
    };

    const convertWesternToArabic = (str: string) => {
      const arabicNumerals = "٠١٢٣٤٥٦٧٨٩";
      const westernNumerals = "0123456789";
      return str.replace(/[0-9]/g, (match) => {
        const index = westernNumerals.indexOf(match);
        return arabicNumerals[index];
      });
    };

    // Determine if we should use Arabic numerals
    const shouldUseArabicNumerals = () => {
      return calendarType === "hijri" || userLang === "ar";
    };

    // Parse date string to populate digit inputs
    const parseDateToDigits = (dateStr: string) => {
      if (!dateStr) return ["", "", "", "", "", "", "", ""];

      // Convert to Western for pattern matching
      const westernDateStr = convertArabicToWestern(dateStr);

      // Handle DD/MM/YYYY format
      const match = westernDateStr.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
      if (match) {
        const [, day, month, year] = match;
        const paddedDay = day.padStart(2, "0");
        const paddedMonth = month.padStart(2, "0");

        let digits = [
          paddedDay[0],
          paddedDay[1],
          paddedMonth[0],
          paddedMonth[1],
          year[0],
          year[1],
          year[2],
          year[3],
        ];

        // Convert to Arabic numerals if needed
        if (shouldUseArabicNumerals()) {
          digits = digits.map((digit) => convertWesternToArabic(digit));
        }

        return digits;
      }

      return ["", "", "", "", "", "", "", ""];
    };

    // Handler for individual digit inputs
    const handleDigitChange = (
      e: React.ChangeEvent<HTMLInputElement>,
      index: number
    ) => {
      const inputValue = e.target.value;

      // Only allow numbers (both Western and Arabic numerals)
      if (!/^[\d٠-٩]*$/.test(inputValue)) return;

      let processedValue = inputValue;

      // Convert input to match the current numeral system
      if (shouldUseArabicNumerals()) {
        // Convert any Western numerals to Arabic
        processedValue = convertWesternToArabic(inputValue);
      } else {
        // Convert any Arabic numerals to Western
        processedValue = convertArabicToWestern(inputValue);
      }

      const newDigits = [...dateDigits];
      newDigits[index] = processedValue;
      setDateDigits(newDigits);

      // Auto-advance to next input if value entered
      if (processedValue && index < 7) {
        setTimeout(() => {
          inputRefs.current[index + 1]?.focus();
          setCurrentFocusIndex(index + 1);
        }, 0);
      }

      // Update the main value when all digits are filled
      updateMainValue(newDigits);
    };

    // Update main value from digits
    const updateMainValue = (digits: string[]) => {
      // Always convert to Western for internal processing
      const westernDigits = digits.map((digit) =>
        convertArabicToWestern(digit)
      );

      if (westernDigits.every((digit) => digit !== "")) {
        const formattedDate = `${westernDigits[0]}${westernDigits[1]}/${westernDigits[2]}${westernDigits[3]}/${westernDigits[4]}${westernDigits[5]}${westernDigits[6]}${westernDigits[7]}`;
        handleInternalDateChange(formattedDate);
      } else {
        // Clear the main value if not all digits are filled
        setInternalValue("");
      }
    };

    // Enhanced key down handler
    const handleDigitKeyDown = (e: React.KeyboardEvent, index: number) => {
      const newDigits = [...dateDigits];
      const deleteDigits = [...dateDigits];
      switch (e.key) {
        case "Backspace":
          e.preventDefault();

          if (newDigits[index]) {
            // Clear current digit
            newDigits[index] = "";
            setDateDigits(newDigits);
            updateMainValue(newDigits);
          } else if (index > 0) {
            // Move to previous input and clear it
            newDigits[index - 1] = "";
            setDateDigits(newDigits);
            updateMainValue(newDigits);
            setTimeout(() => {
              inputRefs.current[index - 1]?.focus();
              setCurrentFocusIndex(index - 1);
            }, 0);
          }
          break;

        case "Delete":
          e.preventDefault();
          deleteDigits[index] = "";
          setDateDigits(deleteDigits);
          updateMainValue(deleteDigits);
          break;

        case "ArrowLeft":
          e.preventDefault();
          if (index > 0) {
            inputRefs.current[index - 1]?.focus();
            setCurrentFocusIndex(index - 1);
          }
          break;

        case "ArrowRight":
          e.preventDefault();
          if (index < 7) {
            inputRefs.current[index + 1]?.focus();
            setCurrentFocusIndex(index + 1);
          }
          break;

        case "Home":
          e.preventDefault();
          inputRefs.current[0]?.focus();
          setCurrentFocusIndex(0);
          break;

        case "End":
          e.preventDefault();
          inputRefs.current[7]?.focus();
          setCurrentFocusIndex(7);
          break;

        case "Tab":
          // Allow normal tab behavior
          break;

        case "Enter":
          e.preventDefault();
          setIsTouched(true);
          if (validate(internalValue)) {
            onNext?.();
          }
          break;

        case "Escape":
          e.preventDefault();
          onCancel?.();
          setIsCalendarOpen(false);
          break;

        case "c":
        case "C":
          if (e.ctrlKey || e.metaKey) {
            // Allow copy
            break;
          }
          // Fall through to default for regular 'c' input
          break;

        case "v":
        case "V":
          if (e.ctrlKey || e.metaKey) {
            // Allow paste - handle in paste event
            break;
          }
          // Fall through to default for regular 'v' input
          break;

        case "a":
        case "A":
          if (e.ctrlKey || e.metaKey) {
            // Select all - focus first input and select all text conceptually
            e.preventDefault();
            inputRefs.current[0]?.focus();
            setCurrentFocusIndex(0);
            break;
          }
          // Fall through to default for regular 'a' input
          break;

        default:
          // For numeric input, replace current digit
          if (/^[\d٠-٩]$/.test(e.key)) {
            e.preventDefault();
            let processedKey = e.key;

            if (shouldUseArabicNumerals()) {
              processedKey = convertWesternToArabic(e.key);
            } else {
              processedKey = convertArabicToWestern(e.key);
            }

            const replaceDigits = [...dateDigits];
            replaceDigits[index] = processedKey;
            setDateDigits(replaceDigits);
            updateMainValue(replaceDigits);

            // Auto-advance to next input
            if (index < 7) {
              setTimeout(() => {
                inputRefs.current[index + 1]?.focus();
                setCurrentFocusIndex(index + 1);
              }, 0);
            }
          }
          break;
      }
    };

    // Handle paste events
    const handlePaste = (e: React.ClipboardEvent, index: number) => {
      e.preventDefault();
      const pastedText = e.clipboardData.getData("text");
      const cleanText = pastedText.replace(/[^\d٠-٩]/g, ""); // Remove non-numeric characters

      if (cleanText.length > 0) {
        const newDigits = [...dateDigits];
        let currentIndex = index;

        for (let i = 0; i < cleanText.length && currentIndex < 8; i++) {
          let digit = cleanText[i];

          // Convert to appropriate numeral system
          if (shouldUseArabicNumerals()) {
            digit = convertWesternToArabic(digit);
          } else {
            digit = convertArabicToWestern(digit);
          }

          newDigits[currentIndex] = digit;
          currentIndex++;
        }

        setDateDigits(newDigits);
        updateMainValue(newDigits);

        // Focus the next empty field or last field
        const nextIndex = Math.min(currentIndex, 7);
        setTimeout(() => {
          inputRefs.current[nextIndex]?.focus();
          setCurrentFocusIndex(nextIndex);
        }, 0);
      }
    };

    // Clear all digits
    const clearAllDigits = () => {
      setDateDigits(["", "", "", "", "", "", "", ""]);
      setInternalValue("");
      onChange("");
      setTimeout(() => {
        inputRefs.current[0]?.focus();
        setCurrentFocusIndex(0);
      }, 0);
    };

    // Internal date change handler - handles both picker and manual input
    const handleInternalDateChange = (
      inputValue: DateObject | DateObject[] | string | null
    ) => {
      try {
        if (!inputValue) {
          setInternalValue("");
          setDateDigits(["", "", "", "", "", "", "", ""]);
          onChange("");
          return;
        }

        // Handle DateObject input (from the DatePicker)
        if (isDateObject(inputValue)) {
          const dateObj = inputValue as DateObject;
          const gregorianDate = dateObj.convert(gregorian, gregorian_en);
          const finalValue = gregorianDate.format("YYYY-MM-DD");

          let displayValue: string;
          if (calendarType === "hijri") {
            const hijriDate = dateObj.convert(arabic, arabic_ar);
            displayValue = hijriDate.format("DD/MM/YYYY");
          } else {
            displayValue = gregorianDate.format("DD/MM/YYYY");
          }

          setInternalValue(displayValue);
          setDateDigits(parseDateToDigits(displayValue));
          onChange(finalValue);
          return;
        }

        // Handle array of DateObjects
        if (Array.isArray(inputValue)) {
          const firstDate = inputValue[0];
          if (firstDate && isDateObject(firstDate)) {
            const gregorianDate = firstDate.convert(gregorian, gregorian_en);
            const finalValue = gregorianDate.format("YYYY-MM-DD");

            let displayValue: string;
            if (calendarType === "hijri") {
              const hijriDate = firstDate.convert(arabic, arabic_ar);
              displayValue = hijriDate.format("DD/MM/YYYY");
            } else {
              displayValue = gregorianDate.format("DD/MM/YYYY");
            }

            setInternalValue(displayValue);
            setDateDigits(parseDateToDigits(displayValue));
            onChange(finalValue);
            return;
          }
        }

        // Handle string input (manual typing)
        if (typeof inputValue === "string") {
          setInternalValue(inputValue);

          try {
            let dateObj: DateObject;

            if (calendarType === "hijri") {
              dateObj = new DateObject({
                date: inputValue,
                format: "DD/MM/YYYY",
                calendar: arabic,
                locale: arabic_ar,
              });
            } else {
              dateObj = new DateObject({
                date: inputValue,
                format: "DD/MM/YYYY",
                calendar: gregorian,
                locale: gregorian_en,
              });
            }

            if (dateObj.isValid) {
              const gregorianDate = dateObj.convert(gregorian, gregorian_en);
              const finalValue = gregorianDate.format("YYYY-MM-DD");
              onChange(finalValue);
            } else {
              onChange(inputValue);
            }
            return;
          } catch (parseError) {
            console.log("Failed to parse date string:", parseError);
            onChange(inputValue);
            return;
          }
        }
      } catch (error) {
        console.error("Date conversion error:", error);
        const fallbackValue = inputValue?.toString() || "";
        setInternalValue(fallbackValue);
        setDateDigits(parseDateToDigits(fallbackValue));
        onChange(fallbackValue);
      }
    };

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
        if (isDate) {
          inputRefs.current[0]?.focus();
          setCurrentFocusIndex(0);
        } else {
          inputRef.current?.focus();
        }
      },
      validate: () => {
        setIsTouched(true);
        return validate(internalValue);
      },
    }));

    const handleFocus = (index: number) => {
      setIsFocused(true);
      setCurrentFocusIndex(index);
    };

    const handleClear = () => {
      clearAllDigits();
      setIsTouched(true);
      validate("");
    };

    const handleBlur = () => {
      setTimeout(() => {
        // Check if focus moved to another date input
        const activeElement = document.activeElement;
        const isDateInputFocused = inputRefs.current.some(
          (ref) => ref === activeElement
        );

        if (!isCalendarOpen && !isDateInputFocused) {
          setIsFocused(false);
          setCurrentFocusIndex(-1);
          setIsTouched(true);
          validate(internalValue);
        }
      }, 150);
    };

    const handleNext = () => {
      setIsTouched(true);
      if (validate(internalValue)) {
        onNext?.();
      }
    };

    const openCalendar = () => {
      setIsCalendarOpen(true);
      setIsFocused(true);
    };

    const closeCalendar = () => {
      setIsCalendarOpen(false);
      setTimeout(() => {
        setIsFocused(false);
        setIsTouched(true);
        validate(internalValue);
      }, 100);
    };

    const getTooltipText = () => {
      if (tooltipText) return tooltipText;

      switch (name?.toLowerCase()) {
        case "date":
        case "birthday":
        case "dob":
        case "createdat":
          return userLang === "ar"
            ? `اختر التاريخ ${calendarType === "hijri" ? "(هجري)" : "(ميلادي)"}`
            : `Select date ${
                calendarType === "hijri" ? "(Hijri)" : "(Gregorian)"
              }`;
        default:
          return userLang === "ar"
            ? `الرجاء إدخال ${labelText || name?.toLowerCase()}`
            : `Please enter ${labelText || name?.toLowerCase()}`;
      }
    };

    const getCurrentDateValue = () => {
      if (!internalValue) return null;

      try {
        if (calendarType === "hijri") {
          return new DateObject({
            date: internalValue,
            format: "DD/MM/YYYY",
            calendar: arabic,
            locale: arabic_ar,
          });
        } else {
          return new DateObject({
            date: internalValue,
            format: "DD/MM/YYYY",
            calendar: gregorian,
            locale: gregorian_en,
          });
        }
      } catch (error) {
        console.log("Error creating DateObject:", error);
        return null;
      }
    };

    const getInitialDisplayValue = (initialValue: string) => {
      if (!initialValue || !isDate) return initialValue;

      try {
        if (initialValue.match(/^\d{4}-\d{2}-\d{2}$/)) {
          const gregorianDate = new DateObject({
            date: initialValue,
            format: "YYYY-MM-DD",
            calendar: gregorian,
            locale: gregorian_en,
          });

          if (calendarType === "hijri") {
            const hijriDate = gregorianDate.convert(arabic, arabic_ar);
            return hijriDate.format("DD/MM/YYYY");
          } else {
            return gregorianDate.format("DD/MM/YYYY");
          }
        }

        return initialValue;
      } catch (error) {
        console.log("Error converting initial value:", error);
        return initialValue;
      }
    };

    // Update the useEffect to handle initial value conversion
    useEffect(() => {
      const displayValue = getInitialDisplayValue(value);
      setInternalValue(displayValue);
      if (isDate) {
        setDateDigits(parseDateToDigits(displayValue));
      }
    }, [value, calendarType, isDate]);

    const getPlaceholderForIndex = (index: number) => {
      const isArabic = shouldUseArabicNumerals();

      if (index < 2) return isArabic ? "٠" : "D"; // Day
      if (index < 4) return isArabic ? "٠" : "M"; // Month
      return isArabic ? "٠" : "Y"; // Year
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
            <div className="relative">
              <DatePicker
                value={getCurrentDateValue()}
                onChange={handleInternalDateChange}
                onOpen={openCalendar}
                onClose={closeCalendar}
                disabled={disabled}
                required={required}
                calendar={calendar}
                locale={locale}
                format="DD/MM/YYYY"
                calendarPosition={
                  userLang === "ar" ? "bottom-right" : "bottom-left"
                }
                containerClassName={`${userLang === "ar" ? "rtl" : "ltr"}`}
                plugins={[
                  <CustomActionsPlugin
                    key="actions"
                    position="bottom"
                    userLang={userLang}
                    onSubmit={handleNext}
                    onClear={handleClear}
                  />,
                ]}
                render={() => (
                  <>
                    {/* 8 Separate Date Input Fields */}
                    <div
                      className={cn(
                        "flex items-center justify-center gap-1 px-2.5 py-2 w-full bg-[#f8fafc] rounded-[12px] border-gray-300 border-1 h-[50px]",
                        !isValid && isTouched
                          ? "border-red-400 focus-within:border-red-400"
                          : "focus-within:border-primary focus-within:border-2",
                        userLang === "ar" ? "flex-row-reverse" : "flex-row",
                        "pl-10"
                      )}
                      dir={shouldUseArabicNumerals() ? "rtl" : "ltr"}
                    >
                      {/* Year inputs */}
                      <>
                        <input
                          ref={(el) => {
                            inputRefs.current[4] = el;
                          }}
                          type="text"
                          inputMode="numeric"
                          maxLength={1}
                          value={dateDigits[4]}
                          className={cn(
                            "w-4 text-center text-sm text-gray-900 bg-transparent border-none outline-none dark:text-white",
                            currentFocusIndex === 4 &&
                              "ring-1 ring-primary ring-inset"
                          )}
                          onChange={(e) => handleDigitChange(e, 4)}
                          onKeyDown={(e) => handleDigitKeyDown(e, 4)}
                          onFocus={() => handleFocus(4)}
                          onBlur={handleBlur}
                          onPaste={(e) => handlePaste(e, 4)}
                          disabled={disabled}
                          placeholder={getPlaceholderForIndex(4)}
                        />
                        <input
                          ref={(el) => {
                            inputRefs.current[5] = el;
                          }}
                          type="text"
                          inputMode="numeric"
                          maxLength={1}
                          value={dateDigits[5]}
                          className={cn(
                            "w-4 text-center text-sm text-gray-900 bg-transparent border-none outline-none dark:text-white",
                            currentFocusIndex === 5 &&
                              "ring-1 ring-primary ring-inset"
                          )}
                          onChange={(e) => handleDigitChange(e, 5)}
                          onKeyDown={(e) => handleDigitKeyDown(e, 5)}
                          onFocus={() => handleFocus(5)}
                          onBlur={handleBlur}
                          onPaste={(e) => handlePaste(e, 5)}
                          disabled={disabled}
                          placeholder={getPlaceholderForIndex(5)}
                        />
                        <input
                          ref={(el) => {
                            inputRefs.current[6] = el;
                          }}
                          type="text"
                          inputMode="numeric"
                          maxLength={1}
                          value={dateDigits[6]}
                          className={cn(
                            "w-4 text-center text-sm text-gray-900 bg-transparent border-none outline-none dark:text-white",
                            currentFocusIndex === 6 &&
                              "ring-1 ring-primary ring-inset"
                          )}
                          onChange={(e) => handleDigitChange(e, 6)}
                          onKeyDown={(e) => handleDigitKeyDown(e, 6)}
                          onFocus={() => handleFocus(6)}
                          onBlur={handleBlur}
                          onPaste={(e) => handlePaste(e, 6)}
                          disabled={disabled}
                          placeholder={getPlaceholderForIndex(6)}
                        />
                        <input
                          ref={(el) => {
                            inputRefs.current[7] = el;
                          }}
                          type="text"
                          inputMode="numeric"
                          maxLength={1}
                          value={dateDigits[7]}
                          className={cn(
                            "w-4 text-center text-sm text-gray-900 bg-transparent border-none outline-none dark:text-white",
                            currentFocusIndex === 7 &&
                              "ring-1 ring-primary ring-inset"
                          )}
                          onChange={(e) => handleDigitChange(e, 7)}
                          onKeyDown={(e) => handleDigitKeyDown(e, 7)}
                          onFocus={() => handleFocus(7)}
                          onBlur={handleBlur}
                          onPaste={(e) => handlePaste(e, 7)}
                          disabled={disabled}
                          placeholder={getPlaceholderForIndex(7)}
                        />
                        <span className="text-gray-900 font-bold mx-1">-</span>

                        {/* Month inputs */}
                        <input
                          ref={(el) => {
                            inputRefs.current[2] = el;
                          }}
                          type="text"
                          inputMode="numeric"
                          maxLength={1}
                          value={dateDigits[2]}
                          className={cn(
                            "w-4 text-center text-sm text-gray-900 bg-transparent border-none outline-none dark:text-white",
                            currentFocusIndex === 2 &&
                              "ring-1 ring-primary ring-inset"
                          )}
                          onChange={(e) => handleDigitChange(e, 2)}
                          onKeyDown={(e) => handleDigitKeyDown(e, 2)}
                          onFocus={() => handleFocus(2)}
                          onBlur={handleBlur}
                          onPaste={(e) => handlePaste(e, 2)}
                          disabled={disabled}
                          placeholder={getPlaceholderForIndex(2)}
                        />
                        <input
                          ref={(el) => {
                            inputRefs.current[3] = el;
                          }}
                          type="text"
                          inputMode="numeric"
                          maxLength={1}
                          value={dateDigits[3]}
                          className={cn(
                            "w-4 text-center text-sm text-gray-900 bg-transparent border-none outline-none dark:text-white",
                            currentFocusIndex === 3 &&
                              "ring-1 ring-primary ring-inset"
                          )}
                          onChange={(e) => handleDigitChange(e, 3)}
                          onKeyDown={(e) => handleDigitKeyDown(e, 3)}
                          onFocus={() => handleFocus(3)}
                          onBlur={handleBlur}
                          onPaste={(e) => handlePaste(e, 3)}
                          disabled={disabled}
                          placeholder={getPlaceholderForIndex(3)}
                        />
                        <span className="text-gray-900 font-bold mx-1">-</span>

                        {/* Day inputs (left side in RTL) */}
                        <input
                          ref={(el) => {
                            inputRefs.current[0] = el;
                            if (el) inputRef.current = el;
                          }}
                          type="text"
                          inputMode="numeric"
                          maxLength={1}
                          value={dateDigits[0]}
                          className={cn(
                            "w-4 text-center text-sm text-gray-900 bg-transparent border-none outline-none dark:text-white",
                            currentFocusIndex === 0 &&
                              "ring-1 ring-primary ring-inset"
                          )}
                          onChange={(e) => handleDigitChange(e, 0)}
                          onKeyDown={(e) => handleDigitKeyDown(e, 0)}
                          onFocus={() => handleFocus(0)}
                          onBlur={handleBlur}
                          onPaste={(e) => handlePaste(e, 0)}
                          disabled={disabled}
                          placeholder={getPlaceholderForIndex(0)}
                        />
                        <input
                          ref={(el) => {
                            inputRefs.current[1] = el;
                          }}
                          type="text"
                          inputMode="numeric"
                          maxLength={1}
                          value={dateDigits[1]}
                          className={cn(
                            "w-4 text-center text-sm text-gray-900 bg-transparent border-none outline-none dark:text-white",
                            currentFocusIndex === 1 &&
                              "ring-1 ring-primary ring-inset"
                          )}
                          onChange={(e) => handleDigitChange(e, 1)}
                          onKeyDown={(e) => handleDigitKeyDown(e, 1)}
                          onFocus={() => handleFocus(1)}
                          onBlur={handleBlur}
                          onPaste={(e) => handlePaste(e, 1)}
                          disabled={disabled}
                          placeholder={getPlaceholderForIndex(1)}
                        />
                      </>
                    </div>
                  </>
                )}
              />
            </div>
          </Tooltip>

          <label
            htmlFor={id}
            className={cn(
              "absolute text-base text-gray-800 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-1 z-10 origin-[0] bg-[#f8fafc] dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-primary peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 transition-all rounded-lg",
              !isValid && isTouched && "text-red-500 peer-focus:text-red-500",
              (internalValue || isFocused) && "scale-75 -translate-y-4 top-1"
            )}
          >
            {labelText}
          </label>
        </div>

        <div className="absolute right-2 rtl:left-2 rtl:right-auto top-1/3 transform -translate-y-1/3 flex gap-1">
          {!isValid && !isFocused && (
            <button type="button" onClick={handleNext} className="text-red-500">
              <TriangleAlert
                className={cn("h-4 w-4", isDate && "mr-8 mt-0.5")}
              />
            </button>
          )}
        </div>

        {/* <div className="mt-1 min-h-[1rem]">
          {!isValid && isTouched && (
            <p className="text-xs text-red-500">
              {userLang === "ar" ? "هذا الحقل مطلوب" : "This field is required"}
            </p>
          )}
        </div> */}
      </div>
    );
  }
);

EditableInput.displayName = "EditableInput";

export default EditableInput;
