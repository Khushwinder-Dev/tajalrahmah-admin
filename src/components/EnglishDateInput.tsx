/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useRef,
  useState,
  useImperativeHandle,
  forwardRef,
  useEffect,
  useCallback,
} from "react";
import { cn } from "@/lib/utils";
import { Tooltip } from "@mantine/core";
import { Calendar } from "lucide-react";
import DatePicker from "react-multi-date-picker";
import { DateObject } from "react-multi-date-picker";
import gregorian from "react-date-object/calendars/gregorian";
import gregorian_en from "react-date-object/locales/gregorian_en";

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
  isStartDate?: boolean;
  endDateRef?: any;
  isStartFocus?: boolean;
  setStartNextFocus: (value: boolean) => void;
  isShowCalender?: boolean;
}

const EnglishDate = forwardRef<EditableInputRef, EditableInputProps>(
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
      calendarType = "gregorian",
      isStartDate = false,
      endDateRef,
      isStartFocus,
      isShowCalender = false,
      ...props
    },
    ref
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [isTouched, setIsTouched] = useState(false);
    const [isValid, setIsValid] = useState(true);
    const [isFocused, setIsFocused] = useState(false);
    const [internalValue, setInternalValue] = useState(value);
    const [errorMessage, setErrorMessage] = useState("");
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);

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
    // Separate refs for each section for better organization
    const dayRefs = useRef<(HTMLInputElement | null)[]>([null, null]);
    const monthRefs = useRef<(HTMLInputElement | null)[]>([null, null]);
    const yearRefs = useRef<(HTMLInputElement | null)[]>([
      null,
      null,
      null,
      null,
    ]);
    const [currentFocusIndex, setCurrentFocusIndex] = useState<number>(-1);
    const didInitDefaultRef = useRef(false);

    // Helper function to get input ref by index
    const getInputRefByIndex = (index: number): HTMLInputElement | null => {
      if (index >= 0 && index <= 1) return dayRefs.current[index];
      if (index >= 2 && index <= 3) return monthRefs.current[index - 2];
      if (index >= 4 && index <= 7) return yearRefs.current[index - 4];
      return null;
    };

    // Helper function to get all input refs as array for compatibility
    const getAllInputRefs = (): (HTMLInputElement | null)[] => {
      return [...dayRefs.current, ...monthRefs.current, ...yearRefs.current];
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

    // Add a separate validation function that checks for errors without blocking input
    const getDateValidationErrors = (digits: string[]): string[] => {
      const errors: string[] = [];
      const westernDigits = digits.map((d) => convertArabicToWestern(d));

      // Check if all digits are filled for complete validation
      if (!westernDigits.every((digit) => digit !== "")) {
        return errors; // Don't validate incomplete dates
      }

      const day = parseInt(`${westernDigits[0]}${westernDigits[1]}`, 10);
      const month = parseInt(`${westernDigits[2]}${westernDigits[3]}`, 10);
      const year = parseInt(
        `${westernDigits[4]}${westernDigits[5]}${westernDigits[6]}${westernDigits[7]}`,
        10
      );

      // Day validation
      if (day < 1 || day > 31) {
        errors.push(
          userLang === "ar"
            ? "اليوم يجب أن يكون بين 1 و 31"
            : "Day must be between 1 and 31"
        );
      }

      // Month validation
      if (month < 1 || month > 12) {
        errors.push(
          userLang === "ar"
            ? "الشهر يجب أن يكون بين 1 و 12"
            : "Month must be between 1 and 12"
        );
      }

      // Year validation - Updated to allow any year above 1900
      if (year < 1900) {
        errors.push(
          userLang === "ar"
            ? "السنة يجب أن تكون 1900 أو أحدث"
            : "Year must be 1900 or later"
        );
      }

      // Days in month validation
      if (month >= 1 && month <= 12 && day >= 1 && day <= 31) {
        const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

        // Check for leap year
        const isLeapYear =
          (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
        if (month === 2 && isLeapYear) {
          daysInMonth[1] = 29;
        }

        if (day > daysInMonth[month - 1]) {
          errors.push(
            userLang === "ar"
              ? `هذا الشهر لا يحتوي على ${day} يوم`
              : `This month doesn't have ${day} days`
          );
        }
      }

      return errors;
    };

    // Parse date string to populate digit inputs
    const parseDateToDigits = useCallback(
      (dateStr: string) => {
        if (!dateStr) return ["", "", "", "", "", "", "", ""];

        // Convert to Western for pattern matching
        const westernDateStr = convertArabicToWestern(dateStr);

        // Handle DD-MM-YYYY format
        const match = westernDateStr.match(/^(\d{1,2})-(\d{1,2})-(\d{4})$/);
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
          const useArabic = calendarType === "hijri" || userLang === "ar";
          if (useArabic) {
            digits = digits.map((digit) => convertWesternToArabic(digit));
          }

          return digits;
        }

        return ["", "", "", "", "", "", "", ""];
      },
      [calendarType, userLang]
    );

    useEffect(() => {
      if (isStartFocus) {
        setTimeout(() => {
          setCurrentFocusIndex(0);
        }, 0);
      }
    }, [isStartFocus]);

    // Check if all date digits are filled
    const isDateComplete = (digits: string[]) => {
      return digits.every((digit) => digit !== "");
    };

    // Function to convert date from digit inputs to DateObject for calendar
    const getCurrentDateValue = () => {
      if (!internalValue) return null;

      try {
        const gregorianDate = new DateObject({
          date: internalValue,
          format: "DD-MM-YYYY",
          calendar: gregorian,
          locale: gregorian_en,
        });

        return gregorianDate.isValid ? gregorianDate : null;
      } catch (error) {
        console.log("Error creating DateObject:", error);
        return null;
      }
    };

    // Handle date change from calendar picker
    const handleCalendarDateChange = (
      date: DateObject | DateObject[] | null
    ) => {
      if (!date || Array.isArray(date)) return;

      try {
        const dateObj = date as DateObject;
        const formattedDate = dateObj.format("DD-MM-YYYY");

        setInternalValue(formattedDate);
        setDateDigits(parseDateToDigits(formattedDate));
        onChange(formattedDate);
        setIsCalendarOpen(false);
      } catch (error) {
        console.error("Error handling calendar date change:", error);
      }
    };

    // Calendar open/close handlers
    const openCalendar = () => {
      setIsCalendarOpen(true);
      setIsFocused(true);
    };

    const closeCalendar = () => {
      setIsCalendarOpen(false);
      setTimeout(() => {
        if (!getAllInputRefs().some((ref) => ref === document.activeElement)) {
          setIsFocused(false);
        }
      }, 100);
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
        processedValue = convertWesternToArabic(inputValue);
      } else {
        processedValue = convertArabicToWestern(inputValue);
      }

      // Allow any digit input (no restrictions)
      const proposedWesternChar = convertArabicToWestern(processedValue);
      if (!/^\d$/.test(proposedWesternChar)) {
        return; // Only reject non-digits
      }

      const newDigits = [...dateDigits];
      newDigits[index] = processedValue;
      setDateDigits(newDigits);

      // Check for validation errors after input
      const validationErrors = getDateValidationErrors(newDigits);
      if (validationErrors.length > 0) {
        setErrorMessage(validationErrors[0]); // Show first error
      } else {
        setErrorMessage(""); // Clear errors if validation passes
      }

      // Auto-advance to next input if value entered and not at the end
      if (processedValue && index < 7) {
        setTimeout(() => {
          getInputRefByIndex(index + 1)?.focus();
          setCurrentFocusIndex(index + 1);
        }, 0);
      }

      // Update the main value
      updateMainValue(newDigits);

      // If this is start date and all digits are complete, focus end date
      if (index === 7 && endDateRef) {
        setTimeout(() => {
          endDateRef.current?.focus();
        }, 100);
      }
    };

    // Update the handleDigitKeyDown function to remove validation restrictions
    const handleDigitKeyDown = (e: React.KeyboardEvent, index: number) => {
      const newDigits = [...dateDigits];
      const deleteDigits = [...dateDigits];

      // Validate the complete date
      const validationErrors = getDateValidationErrors(dateDigits);
      setErrorMessage("");

      switch (e.key) {
        case "Backspace":
          e.preventDefault();
          if (newDigits[index]) {
            newDigits[index] = "";
            setDateDigits(newDigits);
            updateMainValue(newDigits);
            // Clear errors when modifying
            setErrorMessage("");
          } else if (index > 0) {
            newDigits[index - 1] = "";
            setDateDigits(newDigits);
            updateMainValue(newDigits);
            setErrorMessage("");
            setTimeout(() => {
              getInputRefByIndex(index - 1)?.focus();
              setCurrentFocusIndex(index - 1);
            }, 0);
          }
          break;

        case "Delete":
          e.preventDefault();
          deleteDigits[index] = "";
          setDateDigits(deleteDigits);
          updateMainValue(deleteDigits);
          setErrorMessage("");
          break;

        case "ArrowLeft":
          e.preventDefault();
          if (index > 0) {
            getInputRefByIndex(index - 1)?.focus();
            setCurrentFocusIndex(index - 1);
          }
          break;

        case "ArrowRight":
          e.preventDefault();
          if (index < 7) {
            getInputRefByIndex(index + 1)?.focus();
            setCurrentFocusIndex(index + 1);
          }
          break;

        case "Home":
          e.preventDefault();
          getInputRefByIndex(0)?.focus();
          setCurrentFocusIndex(0);
          break;

        case "End":
          e.preventDefault();
          getInputRefByIndex(7)?.focus();
          setCurrentFocusIndex(7);
          break;

        case "Enter":
          e.preventDefault();
          setIsTouched(true);

          if (validationErrors.length > 0) {
            setErrorMessage(validationErrors[0]);
            return;
          }

          if (isStartDate && endDateRef && isDateComplete(dateDigits)) {
            endDateRef.current?.focus();
          } else if (validate(internalValue)) {
            onNext?.();
          }
          break;

        case "Escape":
          e.preventDefault();
          onCancel?.();
          break;

        case "Tab":
          break;

        default:
          // Allow any numeric input without restrictions
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

            // Check for validation errors
            const validationErrors = getDateValidationErrors(replaceDigits);
            if (validationErrors.length > 0) {
              setErrorMessage(validationErrors[0]);
            } else {
              setErrorMessage("");
            }

            // Auto-advance to next input if not at the end
            if (index < 7) {
              setTimeout(() => {
                getInputRefByIndex(index + 1)?.focus();
                setCurrentFocusIndex(index + 1);
              }, 0);
            }

            // If this is start date and all digits are complete, focus end date
            if (index === 7 && endDateRef) {
              setTimeout(() => {
                endDateRef.current?.focus();
              }, 100);
            }
          }
          break;
      }
    };

    // Update main value from digits
    const updateMainValue = (digits: string[]) => {
      // Always convert to Western for internal processing
      const westernDigits = digits.map((digit) =>
        convertArabicToWestern(digit)
      );

      if (westernDigits.every((digit) => digit !== "")) {
        const formattedDate = `${westernDigits[0]}${westernDigits[1]}-${westernDigits[2]}${westernDigits[3]}-${westernDigits[4]}${westernDigits[5]}${westernDigits[6]}${westernDigits[7]}`;
        setInternalValue(formattedDate);
        onChange(formattedDate);
      } else {
        // Update partial value for non-date fields
        if (!isDate) {
          const partialValue = westernDigits.join("");
          setInternalValue(partialValue);
          onChange(partialValue);
        }
      }
    };

    // Handle paste events
    const handlePaste = (e: React.ClipboardEvent, index: number) => {
      e.preventDefault();
      const pastedText = e.clipboardData.getData("text");
      const cleanText = pastedText.replace(/[^\d٠-٩]/g, "");

      if (cleanText.length > 0) {
        const newDigits = [...dateDigits];
        let currentIndex = index;

        for (let i = 0; i < cleanText.length && currentIndex < 8; i++) {
          let digit = cleanText[i];

          if (shouldUseArabicNumerals()) {
            digit = convertWesternToArabic(digit);
          } else {
            digit = convertArabicToWestern(digit);
          }

          // Accept any digit without validation restrictions
          newDigits[currentIndex] = digit;
          currentIndex++;
        }

        setDateDigits(newDigits);
        updateMainValue(newDigits);

        // Check for validation errors after paste
        const validationErrors = getDateValidationErrors(newDigits);
        if (validationErrors.length > 0) {
          setErrorMessage(validationErrors[0]);
        } else {
          setErrorMessage("");
        }

        // Check if date is complete after paste and focus end date if needed
        const dateCompleted = isDateComplete(newDigits);
        if (dateCompleted && isStartDate && endDateRef) {
          setTimeout(() => {
            endDateRef.current?.focus();
          }, 100);
        } else {
          const nextIndex = Math.min(currentIndex, 7);
          setTimeout(() => {
            getInputRefByIndex(nextIndex)?.focus();
            setCurrentFocusIndex(nextIndex);
          }, 0);
        }
      }
    };

    // Handle regular text input change
    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;
      setInternalValue(inputValue);
      onChange(inputValue);
    };

    // Handle regular text input key events
    const handleTextKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      switch (e.key) {
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
          break;
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
          getInputRefByIndex(0)?.focus();
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

    const handleFocus = (index?: number) => {
      setIsFocused(true);
      if (typeof index === "number") {
        setCurrentFocusIndex(index);
      }
    };

    const handleBlur = () => {
      if (isDate) {
        setTimeout(() => {
          // Check if focus moved to another date input or calendar
          const activeElement = document.activeElement;
          const allInputRefs = getAllInputRefs();
          const isDateInputFocused = allInputRefs.some(
            (ref) => ref === activeElement
          );

          if (!isDateInputFocused && !isCalendarOpen) {
            setIsFocused(false);
            setCurrentFocusIndex(-1);
            setIsTouched(true);
            validate(internalValue);
          }
        }, 150);
      } else {
        setIsFocused(false);
        setIsTouched(true);
        validate(internalValue);
      }
    };

    const handleNext = () => {
      setIsTouched(true);
      if (validate(internalValue)) {
        onNext?.();
      }
    };

    const getTooltipText = () => {
      if (tooltipText) return tooltipText;

      if (isDate) {
        return userLang === "ar"
          ? `أدخل التاريخ ${calendarType === "hijri" ? "(هجري)" : "(ميلادي)"}`
          : `Enter date ${
              calendarType === "hijri" ? "(Hijri)" : "(Gregorian)"
            }`;
      }

      return userLang === "ar"
        ? `الرجاء إدخال ${labelText || name?.toLowerCase()}`
        : `Please enter ${labelText || name?.toLowerCase()}`;
    };

    const getPlaceholderForIndex = (index: number) => {
      console.log(index);
      // Return blank placeholders as requested
      return "";
    };

    // Initialize internal value and date digits from props
    useEffect(() => {
      // Initialize default only once per mount to avoid fighting with parent state or calendar toggles
      if (
        !didInitDefaultRef.current &&
        isDate &&
        (!value || value.trim() === "")
      ) {
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, "0");
        const mm = String(today.getMonth() + 1).padStart(2, "0");
        const yyyy = String(today.getFullYear());
        const todayStr = `${dd}-${mm}-${yyyy}`;
        setInternalValue(todayStr);
        setDateDigits(parseDateToDigits(todayStr));
        didInitDefaultRef.current = true;
        return;
      }

      // Only sync from parent when it provides a non-empty value.
      if (value && value.trim() !== "") {
        setInternalValue(value);
        if (isDate) {
          setDateDigits(parseDateToDigits(value));
        }
      }
      didInitDefaultRef.current = true;
    }, [value, calendarType, isDate, onChange, parseDateToDigits]);

    return (
      <div className="relative w-full">
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
              {isDate ? (
                <div className="relative">
                  <DatePicker
                    value={getCurrentDateValue()}
                    onChange={handleCalendarDateChange}
                    onOpen={openCalendar}
                    onClose={closeCalendar}
                    calendar={gregorian}
                    locale={gregorian_en}
                    format="DD-MM-YYYY"
                    portal={true}
                    className="date-picker-high-z"
                    render={(_, openCalendar) => (
                      <>
                        {/* Optimized Date Input Fields with reduced spacing */}
                        <div
                          className={cn(
                            "flex items-center justify-center border-2 gap-1 px-2 py-2 w-full bg-white rounded-[8px] h-[50px]",
                            "flex-row-reverse",
                            errorMessage && "border-red-400"
                          )}
                          dir="rtl"
                        >
                          {/* Calendar Icon - compact positioning */}
                          {isShowCalender && (
                            <div className="flex items-center justify-center">
                              <Calendar
                                className="h-3.5 w-3.5 text-gray-500 cursor-pointer hover:text-primary transition-colors"
                                onClick={openCalendar}
                              />
                            </div>
                          )}

                          {/* Day Section (DD) - reduced padding */}
                          <div
                            className={cn(
                              "flex items-center gap-0.5 px-1.5 py-1 bg-white rounded-md border border-gray-300",
                              errorMessage
                                ? "border-red-400"
                                : "focus-within:border-primary focus-within:border-2"
                            )}
                            onClick={(e) => {
                              e.stopPropagation();
                              dayRefs.current[0]?.focus();
                              setCurrentFocusIndex(0);
                            }}
                          >
                            <input
                              ref={(el) => {
                                dayRefs.current[1] = el;
                              }}
                              type="text"
                              inputMode="numeric"
                              maxLength={1}
                              value={dateDigits[1]}
                              className={cn(
                                "w-3 text-center text-sm text-gray-900 bg-transparent border-none outline-none dark:text-white transition-colors duration-200",
                                currentFocusIndex === 1 &&
                                  "ring-1 ring-primary ring-inset text-white bg-blue-500"
                              )}
                              onChange={(e) => handleDigitChange(e, 1)}
                              onKeyDown={(e) => handleDigitKeyDown(e, 1)}
                              onFocus={() => handleFocus(1)}
                              onBlur={handleBlur}
                              onPaste={(e) => handlePaste(e, 1)}
                              disabled={disabled}
                              placeholder={getPlaceholderForIndex(1)}
                            />
                            <input
                              ref={(el) => {
                                dayRefs.current[0] = el;
                                if (el) inputRef.current = el;
                              }}
                              type="text"
                              inputMode="numeric"
                              maxLength={1}
                              value={dateDigits[0]}
                              className={cn(
                                "w-3 text-center text-sm text-gray-900 bg-transparent border-none outline-none dark:text-white transition-colors duration-200",
                                currentFocusIndex === 0 &&
                                  "ring-1 ring-primary ring-inset text-white bg-blue-500"
                              )}
                              onChange={(e) => handleDigitChange(e, 0)}
                              onKeyDown={(e) => handleDigitKeyDown(e, 0)}
                              onFocus={() => handleFocus(0)}
                              onBlur={handleBlur}
                              onPaste={(e) => handlePaste(e, 0)}
                              disabled={disabled}
                              placeholder={getPlaceholderForIndex(0)}
                            />
                          </div>

                          <span className="text-gray-900 font-bold text-sm">
                            -
                          </span>

                          {/* Month Section (MM) - reduced padding */}
                          <div
                            className={cn(
                              "flex items-center gap-0.5 px-1.5 py-1 bg-white rounded-md border border-gray-300",
                              errorMessage
                                ? "border-red-400"
                                : "focus-within:border-primary focus-within:border-2"
                            )}
                            onClick={(e) => {
                              e.stopPropagation();
                              monthRefs.current[0]?.focus();
                              setCurrentFocusIndex(2);
                            }}
                          >
                            <input
                              ref={(el) => {
                                monthRefs.current[1] = el;
                              }}
                              type="text"
                              inputMode="numeric"
                              maxLength={1}
                              value={dateDigits[3]}
                              className={cn(
                                "w-3 text-center text-sm text-gray-900 bg-transparent border-none outline-none dark:text-white transition-colors duration-200",
                                currentFocusIndex === 3 &&
                                  "ring-1 ring-primary ring-inset text-white bg-blue-500"
                              )}
                              onChange={(e) => handleDigitChange(e, 3)}
                              onKeyDown={(e) => handleDigitKeyDown(e, 3)}
                              onFocus={() => handleFocus(3)}
                              onBlur={handleBlur}
                              onPaste={(e) => handlePaste(e, 3)}
                              disabled={disabled}
                              placeholder={getPlaceholderForIndex(3)}
                            />
                            <input
                              ref={(el) => {
                                monthRefs.current[0] = el;
                              }}
                              type="text"
                              inputMode="numeric"
                              maxLength={1}
                              value={dateDigits[2]}
                              className={cn(
                                "w-3 text-center text-sm text-gray-900 bg-transparent border-none outline-none dark:text-white transition-colors duration-200",
                                currentFocusIndex === 2 &&
                                  "ring-1 ring-primary ring-inset text-white bg-blue-500"
                              )}
                              onChange={(e) => handleDigitChange(e, 2)}
                              onKeyDown={(e) => handleDigitKeyDown(e, 2)}
                              onFocus={() => handleFocus(2)}
                              onBlur={handleBlur}
                              onPaste={(e) => handlePaste(e, 2)}
                              disabled={disabled}
                              placeholder={getPlaceholderForIndex(2)}
                            />
                          </div>

                          <span className="text-gray-900 font-bold text-sm">
                            -
                          </span>

                          {/* Year Section (YYYY) - reduced padding */}
                          <div
                            className={cn(
                              "flex items-center gap-0.5 px-1.5 py-1 bg-white rounded-md border border-gray-300",
                              errorMessage
                                ? "border-red-400"
                                : "focus-within:border-primary focus-within:border-2"
                            )}
                            onClick={(e) => {
                              e.stopPropagation();
                              yearRefs.current[0]?.focus();
                              setCurrentFocusIndex(4);
                            }}
                          >
                            <input
                              ref={(el) => {
                                yearRefs.current[3] = el;
                              }}
                              type="text"
                              inputMode="numeric"
                              maxLength={1}
                              value={dateDigits[7]}
                              className={cn(
                                "w-3 text-center text-sm text-gray-900 bg-transparent border-none outline-none dark:text-white transition-colors duration-200",
                                currentFocusIndex === 7 &&
                                  "ring-1 ring-primary ring-inset text-white bg-blue-500"
                              )}
                              onChange={(e) => handleDigitChange(e, 7)}
                              onKeyDown={(e) => handleDigitKeyDown(e, 7)}
                              onFocus={() => handleFocus(7)}
                              onBlur={handleBlur}
                              onPaste={(e) => handlePaste(e, 7)}
                              disabled={disabled}
                              placeholder={getPlaceholderForIndex(7)}
                            />
                            <input
                              ref={(el) => {
                                yearRefs.current[2] = el;
                              }}
                              type="text"
                              inputMode="numeric"
                              maxLength={1}
                              value={dateDigits[6]}
                              className={cn(
                                "w-3 text-center text-sm text-gray-900 bg-transparent border-none outline-none dark:text-white transition-colors duration-200",
                                currentFocusIndex === 6 &&
                                  "ring-1 ring-primary ring-inset text-white bg-blue-500"
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
                                yearRefs.current[1] = el;
                              }}
                              type="text"
                              inputMode="numeric"
                              maxLength={1}
                              value={dateDigits[5]}
                              className={cn(
                                "w-3 text-center text-sm text-gray-900 bg-transparent border-none outline-none dark:text-white transition-colors duration-200",
                                currentFocusIndex === 5 &&
                                  "ring-1 ring-primary ring-inset text-white bg-blue-500"
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
                                yearRefs.current[0] = el;
                              }}
                              type="text"
                              inputMode="numeric"
                              maxLength={1}
                              value={dateDigits[4]}
                              className={cn(
                                "w-3 text-center text-sm text-gray-900 bg-transparent border-none outline-none dark:text-white transition-colors duration-200",
                                currentFocusIndex === 4 &&
                                  "ring-1 ring-primary ring-inset text-white bg-blue-500"
                              )}
                              onChange={(e) => handleDigitChange(e, 4)}
                              onKeyDown={(e) => handleDigitKeyDown(e, 4)}
                              onFocus={() => handleFocus(4)}
                              onBlur={handleBlur}
                              onPaste={(e) => handlePaste(e, 4)}
                              disabled={disabled}
                              placeholder={getPlaceholderForIndex(4)}
                            />
                          </div>
                        </div>
                      </>
                    )}
                  />
                </div>
              ) : (
                // Regular text input - also optimized
                <input
                  ref={inputRef}
                  id={id}
                  name={name}
                  type="text"
                  value={internalValue}
                  onChange={handleTextChange}
                  onKeyDown={handleTextKeyDown}
                  onFocus={() => handleFocus()}
                  onBlur={handleBlur}
                  disabled={disabled}
                  className={cn(
                    "block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-[#f8fafc] dark:bg-gray-700 border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-primary focus:outline-none focus:ring-0 peer rounded-[8px] h-[50px]",
                    (!isValid && isTouched) || errorMessage
                      ? "border-red-400 focus:border-red-400"
                      : "focus:border-primary focus:border-2"
                  )}
                  {...props}
                />
              )}
            </div>
          </Tooltip>

          <label
            htmlFor={id}
            className={cn(
              "absolute text-sm text-gray-800 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-1 z-10 origin-[0] bg-[#f8fafc] dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-primary peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 transition-all rounded-lg",
              ((!isValid && isTouched) || errorMessage) &&
                "text-red-500 peer-focus:text-red-500",
              (internalValue || isFocused) && "scale-75 -translate-y-4 top-1"
            )}
          >
            {labelText}
          </label>
        </div>

        <div className="absolute right-2 rtl:left-2 rtl:right-auto top-1/3 transform -translate-y-1/3 flex gap-1">
          {((!isValid && !isFocused) || errorMessage) && (
            <button
              type="button"
              onClick={handleNext}
              className="text-red-500"
            ></button>
          )}
        </div>

        {/* Error message display - compact */}

        <div>
          {errorMessage && (
            <div className="mt-1 min-h-[1rem]">
              <p className="text-xs text-red-500 animate-fade-in">
                {errorMessage}
              </p>
            </div>
          )}
          {!isValid && isTouched && !errorMessage && (
            <div className="mt-1 min-h-[1rem]">
              <p className="text-xs text-red-500">
                {userLang === "ar"
                  ? "هذا الحقل مطلوب"
                  : "This field is required"}
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }
);

EnglishDate.displayName = "EnglishDate";

export default EnglishDate;
