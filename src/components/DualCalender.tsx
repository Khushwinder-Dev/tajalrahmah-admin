/* eslint-disable @typescript-eslint/no-explicit-any */
import { TriangleAlert, Calendar, X } from "lucide-react";
import { useRef, useState, useImperativeHandle, forwardRef } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Tooltip } from "@mantine/core";
import { Button } from "@/components/ui/button";
import DatePicker from "react-multi-date-picker";
import { DateObject } from "react-multi-date-picker";
import arabic from "react-date-object/calendars/arabic";
import arabic_ar from "react-date-object/locales/arabic_ar";
import gregorian from "react-date-object/calendars/gregorian";
import gregorian_en from "react-date-object/locales/gregorian_en";

// Import plugins
import Settings from "react-multi-date-picker/plugins/settings";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import Toolbar from "react-multi-date-picker/plugins/toolbar";
import Footer from "react-multi-date-picker/plugins/range_picker_footer";
// import EditableInput from "./EditableDateInput";
import EditableInput from "./ArabicDateInput";
import EnglishDate from "./EnglishDateInput";

// Custom Calendar Tabs Plugin with Radio Buttons and Input Fields
// Custom Calendar Tabs Plugin with Radio Buttons and Input Fields
interface CalendarTabsPluginProps {
  activeCalendarType: "english" | "arabic";
  onCalendarChange: (calendarType: "english" | "arabic") => void;

  // English date values
  englishStartValue: string;
  englishEndValue: string;

  // Arabic date values
  arabicStartValue: string;
  arabicEndValue: string;

  // English date change handlers
  onEnglishStartChange: (value: string) => void;
  onEnglishEndChange: (value: string) => void;

  // Arabic date change handlers
  onArabicStartChange: (value: string) => void;
  onArabicEndChange: (value: string) => void;

  // Calendar click handlers
  onEnglishStartCalendarClick: () => void;
  onEnglishEndCalendarClick: () => void;
  onArabicStartCalendarClick: () => void;
  onArabicEndCalendarClick: () => void;

  onClear: () => void;
  disabled?: boolean;
  position?: "top" | "bottom" | "left" | "right";
}

const CalendarTabsPlugin: React.FC<CalendarTabsPluginProps> = ({
  activeCalendarType,
  onCalendarChange,
  englishStartValue,
  englishEndValue,
  arabicStartValue,
  arabicEndValue,
  onEnglishStartChange,
  onEnglishEndChange,
  onArabicStartChange,
  onArabicEndChange,
  onClear,
  disabled = false,
  position = "top",
}) => {
  // Handle calendar type change with reset
  const handleCalendarTypeChange = (calendarType: "english" | "arabic") => {
    // Clear dates when switching calendar types
    onClear();
    // Then change the calendar type
    onCalendarChange(calendarType);
  };

  const [startNextFocus, setStartNextFocus] = useState(false);

  // Handle English start date input change and auto-switch calendar type
  const handleEnglishStartInputChange = (value: string) => {
    console.log("English Start Input", value);
    if (activeCalendarType !== "english") {
      // Auto-switch to English calendar when user types in English field
      onCalendarChange("english");
    }
    onEnglishStartChange(value);
  };

  // Handle English end date input change and auto-switch calendar type
  const handleEnglishEndInputChange = (value: string) => {
    console.log("English End Input", value);
    if (activeCalendarType !== "english") {
      // Auto-switch to English calendar when user types in English field
      onCalendarChange("english");
    }
    onEnglishEndChange(value);
  };

  // Handle Arabic start date input change and auto-switch calendar type
  const handleArabicStartInputChange = (value: string) => {
    console.log("Arabic Start Input", value);
    if (activeCalendarType !== "arabic") {
      // Auto-switch to Arabic calendar when user types in Arabic field
      onCalendarChange("arabic");
    }
    onArabicStartChange(value);
  };

  // Handle Arabic end date input change and auto-switch calendar type
  const handleArabicEndInputChange = (value: string) => {
    console.log("Arabic End Input", value);
    if (activeCalendarType !== "arabic") {
      // Auto-switch to Arabic calendar when user types in Arabic field
      onCalendarChange("arabic");
    }
    onArabicEndChange(value);
  };

  const endDateRef = useRef(null);
  const arabicEndDateFocus = useRef(null);

  return (
    <div className={`rmdp-plugin rmdp-${position} `}>
      <div className="border-b border-gray-200 bg-white rounded-t-lg p-4">
        {/* Radio Buttons Section - English Labels Only */}
        <div className="mb-4">
          <div className="flex items-center gap-60">
            {/* English Radio Button */}
            <div className="flex items-center gap-3">
              <input
                type="radio"
                id="english-radio-plugin"
                name="calendar-type-plugin"
                value="english"
                checked={activeCalendarType === "english"}
                onChange={() => handleCalendarTypeChange("english")}
                disabled={disabled}
                className="w-4 h-4 text-primary bg-gray-100 border-gray-300 focus:ring-primary focus:ring-2"
              />
              <label
                htmlFor="english-radio-plugin"
                className="text-sm font-medium text-gray-700 cursor-pointer flex items-center gap-2"
              >
                <Calendar size={16} />
                English
              </label>
            </div>
            {/* Arabic Radio Button */}
            <div className="flex items-center gap-3">
              <input
                type="radio"
                id="arabic-radio-plugin"
                name="calendar-type-plugin"
                value="arabic"
                checked={activeCalendarType === "arabic"}
                onChange={() => handleCalendarTypeChange("arabic")}
                disabled={disabled}
                className="w-4 h-4 text-primary bg-gray-100 border-gray-300 focus:ring-primary focus:ring-2"
              />
              <label
                htmlFor="arabic-radio-plugin"
                className="text-sm font-medium text-gray-700 cursor-pointer flex items-center gap-2"
              >
                <Calendar size={16} />
                Arabic
              </label>
            </div>
          </div>
        </div>

        {/* Date Input Fields Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* English Date Range Fields */}
          <div className="space-y-2">
            <div className="text-xs font-medium text-gray-600 mb-2">
              English Calendar
            </div>

            {/* English Start Date */}
            <div className="relative">
              <EnglishDate
                isDate={true}
                calendarType="gregorian"
                userLang="en"
                rtl={false}
                value={englishStartValue}
                onChange={handleEnglishStartInputChange}
                disabled={activeCalendarType !== "english"}
                labelText="Start Date"
                className={cn(
                  "transition-all",
                  activeCalendarType !== "english" && "opacity-70", // Lighter styling for inactive
                  activeCalendarType === "english" && "ring-1 ring-primary"
                )}
                isStartFocus={startNextFocus}
                setStartNextFocus={() => setStartNextFocus(true)}
                endDateRef={endDateRef}
              />
            </div>

            {/* "To" Label */}
            <div className="flex justify-center">
              <span className="text-sm font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                To
              </span>
            </div>

            {/* English End Date */}
            <div className="relative mt-4">
              <EnglishDate
                ref={endDateRef}
                isDate={true}
                calendarType="gregorian"
                userLang="en"
                rtl={false}
                value={englishEndValue}
                onChange={handleEnglishEndInputChange}
                disabled={activeCalendarType !== "english"}
                labelText="End Date"
                className={cn(
                  "transition-all",
                  activeCalendarType !== "english" && "opacity-70", // Lighter styling for inactive
                  activeCalendarType === "english" && "ring-1 ring-primary"
                )}
                isStartFocus={startNextFocus}
                setStartNextFocus={() => setStartNextFocus(true)}
              />

              {/* Calendar Icon for English End */}
              {/* <button
                type="button"
                className={cn(
                  "absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center justify-center w-6 h-6 rounded-full transition-colors z-20",
                  activeCalendarType === "english"
                    ? "bg-blue-100 hover:bg-blue-200"
                    : "hover:bg-gray-100 opacity-70"
                )}
                onClick={onEnglishEndCalendarClick}
                onMouseDown={(e) => e.preventDefault()}
                disabled={disabled}
              >
                <Calendar
                  className={cn(
                    "h-4 w-4 transition-colors",
                    activeCalendarType === "english"
                      ? "text-primary"
                      : "text-gray-400"
                  )}
                />
              </button> */}
            </div>
          </div>

          {/* Arabic Date Range Fields */}
          <div className="space-y-3">
            <div
              className="text-xs font-medium text-gray-600 mb-2 text-right"
              dir="rtl"
            >
              التقويم العربي
            </div>

            {/* Arabic Start Date */}
            <div className="relative">
              <EditableInput
                isDate={true}
                calendarType="hijri"
                userLang="ar"
                rtl={true}
                value={arabicStartValue}
                onChange={handleArabicStartInputChange}
                disabled={activeCalendarType !== "arabic"}
                labelText="تاريخ البداية"
                className={cn(
                  "transition-all",
                  activeCalendarType !== "arabic" && "opacity-70", // Lighter styling for inactive
                  activeCalendarType === "arabic" && "ring-1 ring-primary"
                )}
                isStartDate={true}
                endDateRef={arabicEndDateFocus}
              />

              {/* Calendar Icon for Arabic Start */}
              {/* <button
                type="button"
                className={cn(
                  "absolute left-2 top-1/2 transform -translate-y-1/2 flex items-center justify-center w-6 h-6 rounded-full transition-colors z-20",
                  activeCalendarType === "arabic"
                    ? "bg-blue-100 hover:bg-blue-200"
                    : "hover:bg-gray-100 opacity-70"
                )}
                onClick={onArabicStartCalendarClick}
                onMouseDown={(e) => e.preventDefault()}
                disabled={disabled}
              >
                <Calendar
                  className={cn(
                    "h-4 w-4 transition-colors",
                    activeCalendarType === "arabic"
                      ? "text-primary"
                      : "text-gray-400"
                  )}
                />
              </button> */}
            </div>

            {/* "إلى" Label */}
            <div className="flex justify-center">
              <span
                className="text-sm font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-full"
                dir="rtl"
              >
                إلى
              </span>
            </div>

            {/* Arabic End Date */}
            <div className="relative">
              <EditableInput
                ref={arabicEndDateFocus}
                isDate={true}
                calendarType="hijri"
                userLang="ar"
                rtl={true}
                value={arabicEndValue}
                onChange={handleArabicEndInputChange}
                disabled={activeCalendarType !== "arabic"}
                labelText="تاريخ النهاية"
                className={cn(
                  "transition-all",
                  activeCalendarType !== "arabic" && "opacity-70", // Lighter styling for inactive
                  activeCalendarType === "arabic" && "ring-1 ring-primary"
                )}
              />

              {/* Calendar Icon for Arabic End */}
              {/* <button
                type="button"
                className={cn(
                  "absolute left-2 top-1/2 transform -translate-y-1/2 flex items-center justify-center w-6 h-6 rounded-full transition-colors z-20",
                  activeCalendarType === "arabic"
                    ? "bg-blue-100 hover:bg-blue-200"
                    : "hover:bg-gray-100 opacity-70"
                )}
                onClick={onArabicEndCalendarClick}
                onMouseDown={(e) => e.preventDefault()}
                disabled={disabled}
              >
                <Calendar
                  className={cn(
                    "h-4 w-4 transition-colors",
                    activeCalendarType === "arabic"
                      ? "text-primary"
                      : "text-gray-400"
                  )}
                />
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

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

export interface DualCalendarInputRef {
  focus: () => void;
  validate: () => boolean;
}

export interface DualCalendarInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "onChange" | "value"
  > {
  value: {
    start: string | null;
    end: string | null;
  };
  onChange: (dateRange: {
    start: string | null;
    end: string | null;
    calendarType: "english" | "arabic";
    rawDates?: DateObject[];
  }) => void;
  onNext?: () => void;
  onCancel?: () => void;
  onSubmit?: () => void;
  setRef?: (el: HTMLElement | null) => void;
  tooltipText?: string;
  labelText?: string;
  userLang?: string;
  defaultCalendarType?: "english" | "arabic";
  showMonths?: number;
  isClearable?: boolean;
  // New props for default values
  defaultStartDate?: string;
  defaultEndDate?: string;
  // New props for plugin configuration
  enableSettings?: boolean;
  enableDatePanel?: boolean;
  enableToolbar?: boolean;
  enableFooter?: boolean;
  enableCustomActions?: boolean;
  enableCalendarTabs?: boolean;
}

const DualCalendarInput = forwardRef<
  DualCalendarInputRef,
  DualCalendarInputProps
>(
  (
    {
      id,
      name,
      value,
      onChange,
      onNext,
      onCancel,
      onSubmit,
      className,
      labelText,
      disabled = false,
      tooltipText,
      required = false,
      userLang = "en",
      defaultCalendarType = "arabic",
      showMonths = 2,
      defaultStartDate,
      defaultEndDate,
      enableSettings = false,
      enableDatePanel = true,
      enableToolbar = false,
      enableFooter = false,
      enableCustomActions = true,
      enableCalendarTabs = true,
      ...rest
    },
    ref
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [isTouched, setIsTouched] = useState(false);
    const [isValid, setIsValid] = useState(true);
    const [isFocused, setIsFocused] = useState(false);
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const [activeCalendarType, setActiveCalendarType] = useState<
      "english" | "arabic"
    >(defaultCalendarType);

    // State for manual input
    const [inputValue, setInputValue] = useState("");

    // State for DatePicker props (needed for Settings plugin)
    const [datePickerProps, setDatePickerProps] = useState<Record<string, any>>(
      {}
    );

    // State for separate start and end dates for both calendars
    const [englishStartDate, setEnglishStartDate] = useState("");
    const [englishEndDate, setEnglishEndDate] = useState("");
    const [arabicStartDate, setArabicStartDate] = useState("");
    const [arabicEndDate, setArabicEndDate] = useState("");

    // Initialize with default values
    useState(() => {
      if (defaultStartDate && defaultEndDate && !value.start && !value.end) {
        onChange({
          start: defaultStartDate,
          end: defaultEndDate,
          calendarType: defaultCalendarType,
        });
      }
    });

    // Get calendar and locale based on active type
    const getCalendarConfig = () => {
      if (activeCalendarType === "arabic") {
        return {
          calendar: arabic,
          locale: arabic_ar,
        };
      }
      return {
        calendar: gregorian,
        locale: gregorian_en,
      };
    };

    const { calendar, locale } = getCalendarConfig();

    // Helper function to parse manual date input
    const parseDateRange = (input: string) => {
      if (!input.trim()) return null;

      // Remove extra spaces and split by common separators
      const cleanInput = input.trim().replace(/\s+/g, " ");

      // Try different separators: " - ", " to ", " until ", etc.
      const separators = [
        " - ",
        " – ",
        " to ",
        " until ",
        " till ",
        " إلى ",
        " الى ",
      ];
      let parts: string[] = [];

      for (const sep of separators) {
        if (cleanInput.includes(sep)) {
          parts = cleanInput.split(sep).map((part) => part.trim());
          break;
        }
      }

      if (parts.length !== 2) {
        // Try space separation as last resort
        const spaceParts = cleanInput
          .split(" ")
          .filter((part) => part.length > 0);
        if (spaceParts.length >= 2) {
          parts = [spaceParts[0], spaceParts[spaceParts.length - 1]];
        } else {
          return null;
        }
      }

      const [startStr, endStr] = parts;

      try {
        // Parse dates based on active calendar type
        const startDate = parseManualDate(startStr);
        const endDate = parseManualDate(endStr);

        if (startDate && endDate) {
          const dateFormat = "DD-MM-YYYY";
          return {
            start: startDate.format(dateFormat),
            end: endDate.format(dateFormat),
          };
        }
      } catch (error) {
        console.error("Error parsing date range:", error);
      }

      return null;
    };

    // Helper function to parse individual date
    const parseManualDate = (dateStr: string) => {
      if (!dateStr) return null;

      try {
        // Remove any non-numeric characters except separators
        const cleanDate = dateStr.replace(/[^\d-]/g, "");
        const parts = cleanDate.split(/[-]/);

        if (parts.length === 3) {
          // Parse based on DD-MM-YYYY format for both calendars
          const [day, month, year] = parts;

          const dateObj = new DateObject({
            calendar,
            locale,
            day: parseInt(day),
            month: parseInt(month),
            year: parseInt(year),
          });

          return dateObj.isValid ? dateObj : null;
        }
      } catch (error) {
        console.error("Error parsing manual date:", error);
      }

      return null;
    };

    const validate = (val: { start: string | null; end: string | null }) => {
      if (required) {
        const valid =
          val.start &&
          val.end &&
          val.start.trim().length > 0 &&
          val.end.trim().length > 0;
        setIsValid(!!valid);
        return !!valid;
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

        // Try to parse the manual input
        const parsedRange = parseDateRange(inputValue);
        if (parsedRange) {
          onChange({
            ...parsedRange,
            calendarType: activeCalendarType,
          });
        }

        if (validate(value)) {
          onNext?.();
        }
      }
      if (e.key === "Escape") {
        onCancel?.();
        setIsCalendarOpen(false);
      }
    };

    const handleFocus = () => {
      setIsFocused(true);
    };

    const handleBlur = () => {
      // Delay to allow calendar interaction
      setTimeout(() => {
        if (!isCalendarOpen) {
          setIsFocused(false);
          setIsTouched(true);

          // Try to parse manual input on blur
          const parsedRange = parseDateRange(inputValue);
          if (parsedRange) {
            onChange({
              ...parsedRange,
              calendarType: activeCalendarType,
            });
          }

          validate(value);
        }
      }, 150);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
    };

    const handleCancel = () => {
      // Clear the value
      onChange({
        start: null,
        end: null,
        calendarType: activeCalendarType,
      });
      setInputValue("");
      setEnglishStartDate("");
      setEnglishEndDate("");
      setArabicStartDate("");
      setArabicEndDate("");
      onCancel?.();
      setIsTouched(false);
      setIsValid(true);
      setIsCalendarOpen(false);
    };

    const handleNext = () => {
      setIsTouched(true);
      if (validate(value)) {
        onNext?.();
      }
    };

    // Handle submit action from custom plugin
    const handleSubmit = () => {
      setIsTouched(true);
      if (validate(value)) {
        setIsCalendarOpen(false);
        onSubmit?.();
        onNext?.(); // Also call onNext if provided
      }
    };

    // Handle calendar type change from tabs plugin
    const handleCalendarChange = (calendarType: "english" | "arabic") => {
      setActiveCalendarType(calendarType);
      setInputValue("");
    };

    // **NEW HANDLERS FOR SEPARATE START/END DATES**

    // English date change handlers
    const handleEnglishStartInputChange = (value: string) => {
      console.log("English Start Date Changed:", value);
      setEnglishStartDate(value);

      // Auto-switch to English calendar when user types in English field
      if (activeCalendarType !== "english") {
        setActiveCalendarType("english");
      }

      // Update main component value if both start and end dates exist
      if (value && englishEndDate) {
        onChange({
          start: value,
          end: englishEndDate,
          calendarType: "english",
        });
      } else if (value) {
        onChange({
          start: value,
          end: null,
          calendarType: "english",
        });
      }

      // Auto-convert to Arabic calendar
      if (value) {
        const convertedDate = convertDate(value, "english", "arabic");
        setArabicStartDate(convertedDate);
      }
    };

    const handleEnglishEndInputChange = (value: string) => {
      console.log("English End Date Changed:", value);
      setEnglishEndDate(value);

      // Auto-switch to English calendar when user types in English field
      if (activeCalendarType !== "english") {
        setActiveCalendarType("english");
      }

      // Update main component value if both start and end dates exist
      if (englishStartDate && value) {
        onChange({
          start: englishStartDate,
          end: value,
          calendarType: "english",
        });
      }

      // Auto-convert to Arabic calendar
      if (value) {
        const convertedDate = convertDate(value, "english", "arabic");
        setArabicEndDate(convertedDate);
      }
    };

    // Arabic date change handlers
    const handleArabicStartInputChange = (value: string) => {
      console.log("Arabic Start Date Changed:", value);
      setArabicStartDate(value);

      // Auto-switch to Arabic calendar when user types in Arabic field
      if (activeCalendarType !== "arabic") {
        setActiveCalendarType("arabic");
      }

      // Update main component value if both start and end dates exist
      if (value && arabicEndDate) {
        onChange({
          start: value,
          end: arabicEndDate,
          calendarType: "arabic",
        });
      } else if (value) {
        onChange({
          start: value,
          end: null,
          calendarType: "arabic",
        });
      }

      // Auto-convert to English calendar
      if (value) {
        const convertedDate = convertDate(value, "arabic", "english");
        setEnglishStartDate(convertedDate);
      }
    };

    const handleArabicEndInputChange = (value: string) => {
      console.log("Arabic End Date Changed:", value);
      setArabicEndDate(value);

      // Auto-switch to Arabic calendar when user types in Arabic field
      if (activeCalendarType !== "arabic") {
        setActiveCalendarType("arabic");
      }

      // Update main component value if both start and end dates exist
      if (arabicStartDate && value) {
        onChange({
          start: arabicStartDate,
          end: value,
          calendarType: "arabic",
        });
      }

      // Auto-convert to English calendar
      if (value) {
        const convertedDate = convertDate(value, "arabic", "english");
        setEnglishEndDate(convertedDate);
      }
    };

    // Calendar click handlers
    const handleEnglishStartCalendarClick = () => {
      console.log("English Start Calendar Clicked");
      setActiveCalendarType("english");
      setIsCalendarOpen(true);
    };

    const handleEnglishEndCalendarClick = () => {
      console.log("English End Calendar Clicked");
      setActiveCalendarType("english");
      setIsCalendarOpen(true);
    };

    const handleArabicStartCalendarClick = () => {
      console.log("Arabic Start Calendar Clicked");
      setActiveCalendarType("arabic");
      setIsCalendarOpen(true);
    };

    const handleArabicEndCalendarClick = () => {
      console.log("Arabic End Calendar Clicked");
      setActiveCalendarType("arabic");
      setIsCalendarOpen(true);
    };

    const handleDateChange = (date: DateObject[]) => {
      if (!date) {
        onChange({
          start: null,
          end: null,
          calendarType: activeCalendarType,
        });
        setInputValue("");
        return;
      }

      // Handle array of dates (range)
      if (Array.isArray(date)) {
        const startDate = date[0];
        const endDate = date[1];

        if (startDate && endDate) {
          const dateFormat = "DD-MM-YYYY";

          // Ensure we get the format exactly as specified
          let startFormatted, endFormatted;

          if (activeCalendarType === "arabic") {
            // For Arabic, manually construct DD-MM-YYYY with Arabic numerals
            const convertToArabicNumerals = (num: number) => {
              const arabicNumerals = [
                "٠",
                "١",
                "٢",
                "٣",
                "٤",
                "٥",
                "٦",
                "٧",
                "٨",
                "٩",
              ];
              return num
                .toString()
                .split("")
                .map((digit) => arabicNumerals[parseInt(digit)])
                .join("");
            };

            const startYear = convertToArabicNumerals(startDate.year);
            const startMonth = convertToArabicNumerals(
              startDate.month.number
            ).padStart(2, "٠");
            const startDay = convertToArabicNumerals(startDate.day).padStart(
              2,
              "٠"
            );

            const endYear = convertToArabicNumerals(endDate.year);
            const endMonth = convertToArabicNumerals(
              endDate.month.number
            ).padStart(2, "٠");
            const endDay = convertToArabicNumerals(endDate.day).padStart(
              2,
              "٠"
            );

            startFormatted = `${startDay}-${startMonth}-${startYear}`;
            endFormatted = `${endDay}-${endMonth}-${endYear}`;
          } else {
            // For English, use DD-MM-YYYY format
            startFormatted = startDate.format(dateFormat);
            endFormatted = endDate.format(dateFormat);
          }

          // Update the separate date states
          if (activeCalendarType === "english") {
            setEnglishStartDate(startFormatted);
            setEnglishEndDate(endFormatted);
            // Convert to Arabic
            setArabicStartDate(
              convertDate(startFormatted, "english", "arabic")
            );
            setArabicEndDate(convertDate(endFormatted, "english", "arabic"));
          } else {
            setArabicStartDate(startFormatted);
            setArabicEndDate(endFormatted);
            // Convert to English
            setEnglishStartDate(
              convertDate(startFormatted, "arabic", "english")
            );
            setEnglishEndDate(convertDate(endFormatted, "arabic", "english"));
          }

          onChange({
            start: startFormatted,
            end: endFormatted,
            calendarType: activeCalendarType,
            rawDates: date,
          });

          // Update input value to reflect the selection
          setInputValue(
            `${startFormatted}${getRangeSeparator()}${endFormatted}`
          );

          if (isTouched) {
            validate({
              start: startFormatted,
              end: endFormatted,
            });
          }
        } else if (startDate) {
          // Only start date selected
          const dateFormat = "DD-MM-YYYY";

          let startFormatted;

          if (activeCalendarType === "arabic") {
            // For Arabic, manually construct DD-MM-YYYY with Arabic numerals
            const convertToArabicNumerals = (num: number) => {
              const arabicNumerals = [
                "٠",
                "١",
                "٢",
                "٣",
                "٤",
                "٥",
                "٦",
                "٧",
                "٨",
                "٩",
              ];
              return num
                .toString()
                .split("")
                .map((digit) => arabicNumerals[parseInt(digit)])
                .join("");
            };

            const startYear = convertToArabicNumerals(startDate.year);
            const startMonth = convertToArabicNumerals(
              startDate.month.number
            ).padStart(2, "٠");
            const startDay = convertToArabicNumerals(startDate.day).padStart(
              2,
              "٠"
            );

            startFormatted = `${startDay}-${startMonth}-${startYear}`;
          } else {
            // For English, use DD-MM-YYYY format
            startFormatted = startDate.format(dateFormat);
          }

          // Update the separate date states
          if (activeCalendarType === "english") {
            setEnglishStartDate(startFormatted);
            setEnglishEndDate("");
            // Convert to Arabic
            setArabicStartDate(
              convertDate(startFormatted, "english", "arabic")
            );
            setArabicEndDate("");
          } else {
            setArabicStartDate(startFormatted);
            setArabicEndDate("");
            // Convert to English
            setEnglishStartDate(
              convertDate(startFormatted, "arabic", "english")
            );
            setEnglishEndDate("");
          }

          onChange({
            start: startFormatted,
            end: null,
            calendarType: activeCalendarType,
            rawDates: [startDate],
          });

          setInputValue(startFormatted);
        }
      }
    };

    const handleCalendarOpen = () => {
      setIsCalendarOpen(true);
      setIsFocused(true);
    };

    const handleCalendarClose = () => {
      setIsCalendarOpen(false);
      setTimeout(() => {
        setIsFocused(false);
        setIsTouched(true);
        validate(value);
      }, 100);
    };

    const getTooltipText = () => {
      if (tooltipText) return tooltipText;

      const calendarTypeText =
        activeCalendarType === "arabic"
          ? userLang === "ar"
            ? "هجري"
            : "Hijri"
          : userLang === "ar"
          ? "ميلادي"
          : "Gregorian";

      const formatText =
        activeCalendarType === "arabic" ? "YYYY-MM-DD" : "DD-MM-YYYY";

      const sepText = userLang === "ar" ? "إلى" : "to";

      return userLang === "ar"
        ? `اختر فترة تاريخ (${calendarTypeText}) أو اكتب مباشرة بصيغة: ${formatText} ${sepText} ${formatText}`
        : `Select date range (${calendarTypeText}) or type directly: ${formatText} ${sepText} ${formatText}`;
    };

    const getRangeSeparator = () => (userLang === "ar" ? " إلى " : " to ");

    // Format display value
    const getDisplayValue = () => {
      // If user is typing, show input value
      if (isFocused && inputValue) {
        return inputValue;
      }

      // Otherwise show selected dates - ensure hyphens are used
      if (value.start && value.end) {
        const normalizedStart = value.start.replace(/\//g, "-");
        const normalizedEnd = value.end.replace(/\//g, "-");
        return `${normalizedStart}${getRangeSeparator()}${normalizedEnd}`;
      } else if (value.start) {
        return value.start.replace(/\//g, "-");
      }

      return inputValue;
    };

    const getPlaceholder = () => {
      if (activeCalendarType === "arabic") {
        return userLang === "ar"
          ? "سنة-شهر-يوم إلى سنة-شهر-يوم"
          : "YYYY-MM-DD to YYYY-MM-DD";
      } else {
        return userLang === "ar"
          ? "يوم-شهر-سنة إلى يوم-شهر-سنة"
          : "DD-MM-YYYY to DD-MM-YYYY";
      }
    };

    // Convert current value to DateObjects for the picker
    const getCurrentDateObjects = (): DateObject[] | undefined => {
      if (!value.start) return undefined;

      try {
        // Normalize dates to use hyphens and determine format
        const normalizedStart = value.start.replace(/\//g, "-");
        const dateFormat = "DD-MM-YYYY";

        const startDate = new DateObject({
          date: normalizedStart,
          format: dateFormat,
          calendar,
          locale,
        });

        if (value.end) {
          const normalizedEnd = value.end.replace(/\//g, "-");
          const endDate = new DateObject({
            date: normalizedEnd,
            format: dateFormat,
            calendar,
            locale,
          });
          return [startDate, endDate];
        }

        return [startDate];
      } catch (error) {
        console.error("Error converting dates:", error);
        return undefined;
      }
    };

    // Helper function to convert dates between calendars
    const convertDate = (
      dateStr: string,
      fromCalendar: "english" | "arabic",
      toCalendar: "english" | "arabic"
    ): string => {
      if (!dateStr || fromCalendar === toCalendar) return dateStr;

      try {
        // Normalize input to use hyphens
        const normalizedInput = dateStr.replace(/\//g, "-");

        // Get the correct config for each calendar type
        const fromConfig =
          fromCalendar === "arabic"
            ? { calendar: arabic, locale: arabic_ar }
            : { calendar: gregorian, locale: gregorian_en };

        const toConfig =
          toCalendar === "arabic"
            ? { calendar: arabic, locale: arabic_ar }
            : { calendar: gregorian, locale: gregorian_en };

        // Determine the correct format based on calendar type
        const fromFormat = "DD-MM-YYYY";
        const toFormat = "DD-MM-YYYY";

        const dateObj = new DateObject({
          date: normalizedInput,
          format: fromFormat,
          calendar: fromConfig.calendar,
          locale: fromConfig.locale,
        });

        const convertedDate = dateObj.convert(
          toConfig.calendar,
          toConfig.locale
        );
        return convertedDate.format(toFormat);
      } catch (error) {
        console.error("Error converting date:", error);
        return dateStr;
      }
    };

    // Helper function to get display values for both calendars
    const getDisplayValues = () => {
      return {
        englishStart: englishStartDate,
        englishEnd: englishEndDate,
        arabicStart: arabicStartDate,
        arabicEnd: arabicEndDate,
      };
    };

    const displayValues = getDisplayValues();

    // Build plugins array
    const getPlugins = () => {
      const plugins = [];

      // Add calendar tabs plugin at the top
      if (enableCalendarTabs) {
        plugins.push(
          <CalendarTabsPlugin
            key="calendar-tabs"
            activeCalendarType={activeCalendarType}
            onCalendarChange={handleCalendarChange}
            // Fixed: Proper separate values
            englishStartValue={displayValues.englishStart}
            englishEndValue={displayValues.englishEnd}
            arabicStartValue={displayValues.arabicStart}
            arabicEndValue={displayValues.arabicEnd}
            // Change handlers
            onEnglishStartChange={handleEnglishStartInputChange}
            onEnglishEndChange={handleEnglishEndInputChange}
            onArabicStartChange={handleArabicStartInputChange}
            onArabicEndChange={handleArabicEndInputChange}
            // Calendar click handlers
            onEnglishStartCalendarClick={handleEnglishStartCalendarClick}
            onEnglishEndCalendarClick={handleEnglishEndCalendarClick}
            onArabicStartCalendarClick={handleArabicStartCalendarClick}
            onArabicEndCalendarClick={handleArabicEndCalendarClick}
            onClear={handleCancel}
            disabled={disabled}
            position="top"
          />
        );
      }

      if (enableSettings) {
        plugins.push(
          <Settings
            key="settings"
            position="bottom"
            calendars={["gregorian", "arabic"]}
            locales={["en", "ar"]}
            disabledList={["calendar", "mode", "others"]}
          />
        );
      }

      if (enableDatePanel) {
        plugins.push(
          <DatePanel
            key="date-panel"
            disabled={!datePickerProps.multiple && !datePickerProps.range}
            position={
              ["fa", "ar"].includes(locale?.name?.split?.("_")?.[1]) ||
              userLang === "ar"
                ? "left"
                : "right"
            }
          />
        );
      }

      if (enableToolbar) {
        plugins.push(<Toolbar key="toolbar" position="bottom" />);
      }

      if (enableFooter) {
        plugins.push(<Footer key="footer" position="bottom" />);
      }

      // Add custom actions plugin at the bottom
      if (enableCustomActions) {
        plugins.push(
          <CustomActionsPlugin
            key="custom-actions"
            userLang={userLang}
            onSubmit={handleSubmit}
            onClear={handleCancel}
            position="bottom"
          />
        );
      }

      return plugins;
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
                {...datePickerProps}
                value={getCurrentDateObjects()}
                onChange={handleDateChange}
                onOpen={handleCalendarOpen}
                onClose={handleCalendarClose}
                onPropsChange={setDatePickerProps}
                disabled={disabled}
                required={required}
                calendar={calendar}
                locale={locale}
                format="DD-MM-YYYY"
                currentDate={new DateObject({ calendar, locale })}
                range
                numberOfMonths={showMonths}
                calendarPosition={
                  userLang === "ar" ? "bottom-right" : "bottom-left"
                }
                containerClassName={`${userLang === "ar" ? "rtl" : "ltr"}`}
                plugins={getPlugins()}
                render={(_, openCalendar) => (
                  <div className="relative w-full">
                    <Input
                      type="text"
                      ref={inputRef}
                      id={id}
                      name={name}
                      value={getDisplayValue()}
                      onChange={handleInputChange}
                      onKeyDown={handleKeyDown}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                      disabled={disabled}
                      placeholder={getPlaceholder()}
                      required={required}
                      dir={userLang === "ar" ? "rtl" : "ltr"}
                      className={cn(
                        userLang === "ar" ? "pr-10 pl-10" : "pl-10 pr-10", // Padding for both icons
                        "block pb-2.5 pt-4 w-full text-sm text-gray-900 bg-[#f8fafc] rounded-[12px] border-gray-300 appearance-none dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 peer h-[50px] focus:border-primary border-1 focus:border-2",
                        !isValid && isTouched
                          ? "border-red-400 focus:border-red-400"
                          : "",
                        "pt-2",
                        userLang === "ar" ? "text-right" : "text-left",
                        className
                      )}
                      {...rest}
                    />

                    {/* Calendar Icon - Inside the input box */}
                    <button
                      type="button"
                      className={cn(
                        "absolute top-1/2 transform -translate-y-1/2 flex items-center justify-center w-6 h-6 rounded-full hover:bg-gray-100 transition-colors",
                        userLang === "ar" ? "right-2" : "left-2"
                      )}
                      onClick={openCalendar}
                      onMouseDown={(e) => e.preventDefault()} // Prevent input blur
                    >
                      <Calendar className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                    </button>

                    {/* Clear Icon - Inside the input box */}
                    {(value.start || value.end || inputValue) && (
                      <button
                        type="button"
                        className={cn(
                          "absolute top-1/2 transform -translate-y-1/2 flex items-center justify-center w-6 h-6 rounded-full hover:bg-gray-100 transition-colors",
                          userLang === "ar" ? "left-2" : "right-2"
                        )}
                        onClick={handleCancel}
                        onMouseDown={(e) => e.preventDefault()} // Prevent input blur
                      >
                        <X className="h-4 w-4 text-gray-400 hover:text-red-500" />
                      </button>
                    )}
                  </div>
                )}
              />
            </div>
          </Tooltip>

          {/* Floating Label */}
          {labelText && (
            <label
              htmlFor={id}
              className={cn(
                "absolute text-base text-gray-800 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-1 z-10 origin-[0] bg-[#f8fafc] dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-primary peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 transition-all rounded-lg",
                !isValid && isTouched && "text-red-500 peer-focus:text-red-500",
                (value.start || value.end || inputValue || isFocused) &&
                  "scale-75 -translate-y-4 top-1"
              )}
            >
              {labelText}
            </label>
          )}
        </div>

        {/* Error icon - positioned outside the input, below it */}
        {!isValid && !isFocused && (
          <div className="absolute -bottom-6 right-2 rtl:left-2 rtl:right-auto">
            <button type="button" onClick={handleNext} className="text-red-500">
              <TriangleAlert className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Error message */}
        {/* <div className="mt-1 min-h-[1rem]">
          {!isValid && isTouched && (
            <p
              className={cn(
                "text-xs text-red-500",
                userLang === "ar" ? "text-right" : "text-left"
              )}
            >
              {userLang === "ar"
                ? "الرجاء اختيار فترة تاريخ كاملة"
                : "Please select a complete date range"}
            </p>
          )}
        </div> */}
      </div>
    );
  }
);

DualCalendarInput.displayName = "DualCalendarInput";

export default DualCalendarInput;
