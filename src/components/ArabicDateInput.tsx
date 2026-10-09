/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { TriangleAlert, Calendar } from "lucide-react";
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
  isStartDate?: boolean;
  endDateRef?: any;
  showCalendarIcon?: boolean;
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
          {userLang === "ar" ? "مسح" : "Clear"}
        </Button>
        <Button
          variant="outline"
          onClick={onSubmit}
          className="flex-1 px-4 py-2 text-sm font-medium text-white bg-primary border border-transparent rounded-md hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
        >
          {userLang === "ar" ? "إرسال" : "Submit"}
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
      isStartDate = false,
      endDateRef,
      showCalendarIcon = false,
    },
    ref
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [isTouched, setIsTouched] = useState(false);
    const [isValid, setIsValid] = useState(true);
    const [isFocused, setIsFocused] = useState(false);
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const [internalValue, setInternalValue] = useState(value);
    const [errorMessage, setErrorMessage] = useState("");
    const didInitDefaultRef = useRef(false);

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
    const shouldUseArabicNumerals = useCallback(() => {
      return calendarType === "hijri" || userLang === "ar";
    }, [calendarType, userLang]);

    // Add validation error function
    const getValidationError = (index: number) => {
      if (index === 0 || index === 1) {
        if (calendarType === "hijri") {
          return userLang === "ar"
            ? "اليوم لا يمكن أن يزيد عن 30"
            : "Day cannot exceed 30";
        } else {
          return userLang === "ar"
            ? "اليوم لا يمكن أن يزيد عن 31"
            : "Day cannot exceed 31";
        }
      }
      if (index === 2 || index === 3) {
        return userLang === "ar" ? "الشهر غير صحيح" : "Invalid month";
      }
      if (index === 4) {
        if (calendarType === "hijri") {
          return userLang === "ar"
            ? "السنة الهجرية يجب أن تبدأ بـ 1"
            : "Hijri year must start with 1";
        } else {
          return userLang === "ar" ? "السنة غير صحيحة" : "Invalid year";
        }
      }
      if (index === 5 && calendarType === "hijri") {
        return userLang === "ar"
          ? "السنة الهجرية يجب أن تبدأ بـ 14"
          : "Hijri year must start with 14";
      }

      return userLang === "ar" ? "قيمة غير صحيحة" : "Invalid value";
    };

    // Validate a single digit entry for DD-MM-YYYY inputs (validate using western numerals)
    const isValidDateDigit = (
      index: number,
      charWestern: string,
      currentDigits: string[]
    ) => {
      if (!/^\d$/.test(charWestern)) return false;

      const westernDigits = currentDigits.map((d) => convertArabicToWestern(d));

      // Day validation - different for Hijri vs Gregorian
      if (index === 0) {
        if (calendarType === "hijri") {
          return /[0-3]/.test(charWestern); // Hijri: max 30 days
        } else {
          return /[0-3]/.test(charWestern); // Gregorian: max 31 days
        }
      }
      if (index === 1) {
        const tens = westernDigits[0] || "";
        if (tens === "") return /[1-9]/.test(charWestern);
        if (tens === "0") return /[1-9]/.test(charWestern); // 01-09
        if (tens === "1" || tens === "2") return /[0-9]/.test(charWestern); // 10-29
        if (tens === "3") {
          if (calendarType === "hijri") {
            return /[0]/.test(charWestern); // Hijri: only 30, not 31
          } else {
            return /[0-1]/.test(charWestern); // Gregorian: 30-31
          }
        }
        return false;
      }

      // Month validation
      if (index === 2) {
        return /[0-1]/.test(charWestern);
      }
      if (index === 3) {
        const tens = westernDigits[2] || "";
        if (tens === "") return /[1-9]/.test(charWestern);
        if (tens === "0") return /[1-9]/.test(charWestern); // 01-09
        if (tens === "1") return /[0-2]/.test(charWestern); // 10-12
        return false;
      }

      // Year validation - first digit fixed for Hijri
      if (index === 4) {
        if (calendarType === "hijri") {
          return /[1]/.test(charWestern); // Hijri years start with 1 (14xx)
        } else {
          return /[1-2]/.test(charWestern); // Gregorian: 1xxx or 2xxx
        }
      }
      if (index === 5) {
        const firstDigit = westernDigits[4] || "";
        if (calendarType === "hijri" && firstDigit === "1") {
          return /[4]/.test(charWestern); // Hijri: 14xx (current era)
        } else {
          return /[0-9]/.test(charWestern);
        }
      }
      if (index >= 6 && index <= 7) {
        return /[0-9]/.test(charWestern);
      }

      return true;
    };

    // Parse date string to populate digit inputs
    const parseDateToDigits = useCallback(
      (dateStr: string) => {
        if (!dateStr) return ["", "", "", "", "", "", "", ""];

        // Convert to Western for pattern matching
        const westernDateStr = convertArabicToWestern(dateStr);

        // Handle DD-MM-YYYY format (changed from DD/MM/YYYY)
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
          if (shouldUseArabicNumerals()) {
            digits = digits.map((digit) => convertWesternToArabic(digit));
          }

          return digits;
        }

        return ["", "", "", "", "", "", "", ""];
      },
      [shouldUseArabicNumerals]
    );

    // Check if all date digits are filled
    const isDateComplete = (digits: string[]) => {
      return digits.every((digit) => digit !== "");
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
      // Validate per-position constraints before accepting
      const proposedWesternChar = convertArabicToWestern(processedValue);
      const currentDigitsWestern = dateDigits.map((d) =>
        convertArabicToWestern(d)
      );
      if (!isValidDateDigit(index, proposedWesternChar, currentDigitsWestern)) {
        setErrorMessage(getValidationError(index));
        return;
      }

      // Clear error if validation passes
      setErrorMessage("");

      newDigits[index] = processedValue;
      setDateDigits(newDigits);

      // Check if date is complete after this change
      const dateCompleted = isDateComplete(newDigits);

      // Auto-advance to next input if value entered and not at the end
      console.log("processedValue", processedValue);
      console.log("index", index);
      console.log("dateCompleted", dateCompleted);
      if (processedValue && index < 7 && !dateCompleted) {
        setTimeout(() => {
          getInputRefByIndex(index + 1)?.focus();
          setCurrentFocusIndex(index + 1);
        }, 0);
      }

      // Update the main value
      updateMainValue(newDigits);

      // If this is start date and all digits are complete, focus end date
      console.log("isStartDate", isStartDate);
      console.log("endDateRef", endDateRef);
      console.log("index", index);
      if (index === 7 && isStartDate && endDateRef) {
        setTimeout(() => {
          endDateRef.current?.focus();
        }, 100);
      }
    };

    // Update main value from digits
    const updateMainValue = (digits: string[]) => {
      // Always convert to Western for internal processing
      const westernDigits = digits.map((digit) =>
        convertArabicToWestern(digit)
      );

      if (westernDigits.every((digit) => digit !== "")) {
        // Changed format to DD-MM-YYYY instead of DD/MM/YYYY
        const formattedDate = `${westernDigits[0]}${westernDigits[1]}-${westernDigits[2]}${westernDigits[3]}-${westernDigits[4]}${westernDigits[5]}${westernDigits[6]}${westernDigits[7]}`;
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

          // Check if date is complete and focus end date if this is start date
          if (isStartDate && endDateRef && isDateComplete(dateDigits)) {
            endDateRef.current?.focus();
          } else if (validate(internalValue)) {
            onNext?.();
          }
          break;

        case "Escape":
          e.preventDefault();
          onCancel?.();
          setIsCalendarOpen(false);
          break;

        case "Tab":
          // Allow normal tab behavior
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

            // Validate key before accepting
            const proposedWesternChar = convertArabicToWestern(processedKey);
            const currentDigitsWestern = dateDigits.map((d) =>
              convertArabicToWestern(d)
            );
            if (
              !isValidDateDigit(
                index,
                proposedWesternChar,
                currentDigitsWestern
              )
            ) {
              setErrorMessage(getValidationError(index));
              return;
            }

            // Clear error if validation passes
            setErrorMessage("");

            const replaceDigits = [...dateDigits];
            replaceDigits[index] = processedKey;
            setDateDigits(replaceDigits);
            updateMainValue(replaceDigits);

            // Check if date is complete after this change
            // const dateCompleted = isDateComplete(replaceDigits);

            // Auto-advance to next input if not complete and not at the end
            if (index < 7) {
              setTimeout(() => {
                getInputRefByIndex(index + 1)?.focus();
                setCurrentFocusIndex(index + 1);
              }, 0);
            }

            // If this is start date and all digits are complete, focus end date
            if (index === 7 && isStartDate && endDateRef) {
              setTimeout(() => {
                endDateRef.current?.focus();
              }, 100);
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

          // Validate before accepting pasted digit
          const proposedWesternChar = convertArabicToWestern(digit);
          const currentDigitsWestern = newDigits.map((d) =>
            convertArabicToWestern(d)
          );
          if (
            !isValidDateDigit(
              currentIndex,
              proposedWesternChar,
              currentDigitsWestern
            )
          ) {
            continue;
          }

          newDigits[currentIndex] = digit;
          currentIndex++;
        }

        setDateDigits(newDigits);
        updateMainValue(newDigits);

        // Check if date is complete after paste and focus end date if needed
        const dateCompleted = isDateComplete(newDigits);
        if (dateCompleted && isStartDate && endDateRef) {
          setTimeout(() => {
            endDateRef.current?.focus();
          }, 100);
        } else {
          // Focus the next empty field or last field
          const nextIndex = Math.min(currentIndex, 7);
          setTimeout(() => {
            getInputRefByIndex(nextIndex)?.focus();
            setCurrentFocusIndex(nextIndex);
          }, 0);
        }
      }
    };

    // Clear all digits
    const clearAllDigits = () => {
      setDateDigits(["", "", "", "", "", "", "", ""]);
      setInternalValue("");
      setErrorMessage("");
      onChange("");
      setTimeout(() => {
        getInputRefByIndex(0)?.focus();
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
            displayValue = hijriDate.format("DD-MM-YYYY"); // Changed format
          } else {
            displayValue = gregorianDate.format("DD-MM-YYYY"); // Changed format
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
              displayValue = hijriDate.format("DD-MM-YYYY"); // Changed format
            } else {
              displayValue = gregorianDate.format("DD-MM-YYYY"); // Changed format
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
                format: "DD-MM-YYYY", // Changed format
                calendar: arabic,
                locale: arabic_ar,
              });
            } else {
              dateObj = new DateObject({
                date: inputValue,
                format: "DD-MM-YYYY", // Changed format
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
        const allInputRefs = getAllInputRefs();
        const isDateInputFocused = allInputRefs.some(
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
            format: "DD-MM-YYYY", // Changed format
            calendar: arabic,
            locale: arabic_ar,
          });
        } else {
          return new DateObject({
            date: internalValue,
            format: "DD-MM-YYYY", // Changed format
            calendar: gregorian,
            locale: gregorian_en,
          });
        }
      } catch (error) {
        console.log("Error creating DateObject:", error);
        return null;
      }
    };

    const getInitialDisplayValue = useCallback(
      (initialValue: string) => {
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
              return hijriDate.format("DD-MM-YYYY"); // Changed format
            } else {
              return gregorianDate.format("DD-MM-YYYY"); // Changed format
            }
          }

          return initialValue;
        } catch (error) {
          console.log("Error converting initial value:", error);
          return initialValue;
        }
      },
      [calendarType, isDate]
    );

    // Update the useEffect to handle initial value conversion
    useEffect(() => {
      // Default to today only once per mount to avoid breaking language/calendar toggles
      if (
        !didInitDefaultRef.current &&
        isDate &&
        (!value || value.trim() === "")
      ) {
        if (calendarType === "hijri") {
          // Set current Hijri date
          const todayHijri = new DateObject({
            calendar: arabic,
            locale: arabic_ar,
          });
          const displayToday = todayHijri.format("DD-MM-YYYY");
          setInternalValue(displayToday);
          setDateDigits(parseDateToDigits(displayToday));
        } else {
          // Set current Gregorian date
          const today = new Date();
          const dd = String(today.getDate()).padStart(2, "0");
          const mm = String(today.getMonth() + 1).padStart(2, "0");
          const yyyy = String(today.getFullYear());
          const displayToday = `${dd}-${mm}-${yyyy}`;
          setInternalValue(displayToday);
          setDateDigits(parseDateToDigits(displayToday));
        }
        didInitDefaultRef.current = true;
        return;
      }

      // Only sync from parent when it provides a non-empty value.
      if (value && value.trim() !== "") {
        const displayValue = getInitialDisplayValue(value);
        setInternalValue(displayValue);
        if (isDate) {
          setDateDigits(parseDateToDigits(displayValue));
        }
      }
      didInitDefaultRef.current = true;
    }, [
      value,
      calendarType,
      isDate,
      getInitialDisplayValue,
      parseDateToDigits,
    ]);

    const getPlaceholderForIndex = (index: number) => {
      const isArabic = shouldUseArabicNumerals();

      if (index < 2) return isArabic ? "D" : "D"; // Day
      if (index < 4) return isArabic ? "M" : "M"; // Month
      return isArabic ? "Y" : "Y"; // Year
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
                format="DD-MM-YYYY" // Changed format
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
                render={(_, openCalendar) => (
                  <>
                    {/* 8 Separate Date Input Fields with RTL layout */}
                    <div
                      className={cn(
                        "flex items-center justify-center border-2 gap-2 px-2.5 py-6 w-full bg-[#f8fafc] rounded-[12px] h-[60px]",
                        "flex-row-reverse", // Always RTL for Arabic
                        showCalendarIcon ? "pl-8" : "pl-4",
                        errorMessage && "border-red-400"
                      )}
                      dir="rtl"
                    >
                      {/* Calendar Icon - positioned on the left side visually */}
                      {showCalendarIcon && (
                        <div className="flex items-center justify-center ml-1">
                          <Calendar
                            className="h-4 w-4 text-gray-500 cursor-pointer hover:text-primary transition-colors"
                            onClick={openCalendar}
                          />
                        </div>
                      )}
                      {/* Year Section (YYYY) - Leftmost in visual, but first in logical order */}
                      <div
                        className={cn(
                          "flex items-center gap-1 px-2 py-1 bg-white rounded-lg border border-gray-300",
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
                            yearRefs.current[0] = el;
                          }}
                          type="text"
                          inputMode="numeric"
                          maxLength={1}
                          value={dateDigits[4]}
                          className={cn(
                            "w-4 text-center text-sm text-gray-900 bg-transparent border-none outline-none dark:text-white",
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
                        <input
                          ref={(el) => {
                            yearRefs.current[1] = el;
                          }}
                          type="text"
                          inputMode="numeric"
                          maxLength={1}
                          value={dateDigits[5]}
                          className={cn(
                            "w-4 text-center text-sm text-gray-900 bg-transparent border-none outline-none dark:text-white",
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
                            yearRefs.current[2] = el;
                          }}
                          type="text"
                          inputMode="numeric"
                          maxLength={1}
                          value={dateDigits[6]}
                          className={cn(
                            "w-4 text-center text-sm text-gray-900 bg-transparent border-none outline-none dark:text-white",
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
                            yearRefs.current[3] = el;
                          }}
                          type="text"
                          inputMode="numeric"
                          maxLength={1}
                          value={dateDigits[7]}
                          className={cn(
                            "w-4 text-center text-sm text-gray-900 bg-transparent border-none outline-none dark:text-white",
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
                      </div>

                      <span className="text-gray-900 font-bold">-</span>

                      {/* Month Section (MM) - Middle */}
                      <div
                        className={cn(
                          "flex items-center gap-1 px-2 py-1 bg-white rounded-lg border border-gray-300",
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
                            monthRefs.current[0] = el;
                          }}
                          type="text"
                          inputMode="numeric"
                          maxLength={1}
                          value={dateDigits[2]}
                          className={cn(
                            "w-4 text-center text-sm text-gray-900 bg-transparent border-none outline-none dark:text-white",
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
                        <input
                          ref={(el) => {
                            monthRefs.current[1] = el;
                          }}
                          type="text"
                          inputMode="numeric"
                          maxLength={1}
                          value={dateDigits[3]}
                          className={cn(
                            "w-4 text-center text-sm text-gray-900 bg-transparent border-none outline-none dark:text-white",
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
                      </div>

                      <span className="text-gray-900 font-bold">-</span>

                      {/* Day Section (DD) - Rightmost */}
                      <div
                        className={cn(
                          "flex items-center gap-1 px-2 py-1 bg-white rounded-lg border border-gray-300",
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
                            dayRefs.current[0] = el;
                            if (el) inputRef.current = el;
                          }}
                          type="text"
                          inputMode="numeric"
                          maxLength={1}
                          value={dateDigits[0]}
                          className={cn(
                            "w-4 text-center text-sm text-gray-900 bg-transparent border-none outline-none dark:text-white",
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
                        <input
                          ref={(el) => {
                            dayRefs.current[1] = el;
                          }}
                          type="text"
                          inputMode="numeric"
                          maxLength={1}
                          value={dateDigits[1]}
                          className={cn(
                            "w-4 text-center text-sm text-gray-900 bg-transparent border-none outline-none dark:text-white",
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
                      </div>
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
              (!isValid && isTouched) || errorMessage
                ? "text-red-500 peer-focus:text-red-500"
                : "",
              (internalValue || isFocused) && "scale-75 -translate-y-4 top-1"
            )}
          >
            {labelText}
          </label>
        </div>

        <div className="absolute right-2 rtl:left-2 rtl:right-auto top-1/3 transform -translate-y-1/3 flex gap-1">
          {(!isValid || errorMessage) && !isFocused && (
            <button type="button" onClick={handleNext} className="text-red-500">
              <TriangleAlert
                className={cn("h-4 w-4", isDate && "mr-8 mt-0.5")}
              />
            </button>
          )}
        </div>

        {/* Error message display */}
        <div className="mt-1 min-h-[1rem]">
          {errorMessage && (
            <p className="text-xs text-red-500 animate-fade-in">
              {errorMessage}
            </p>
          )}
          {!isValid && isTouched && !errorMessage && (
            <p className="text-xs text-red-500">
              {userLang === "ar" ? "هذا الحقل مطلوب" : "This field is required"}
            </p>
          )}
        </div>
      </div>
    );
  }
);

EditableInput.displayName = "EditableInput";

export default EditableInput;
