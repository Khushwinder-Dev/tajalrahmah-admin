/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  forwardRef,
  useState,
  useRef,
  useEffect,
  useCallback,
} from "react";
import { createPortal } from "react-dom";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tooltip } from "@mantine/core";

export const SwitchSelect = forwardRef<
  HTMLInputElement,
  {
    options: Array<{
      [key: string]: any;
      label: string;
      value: string;
      date?: string;
    }>;
    value: string | string[];
    onValueChange: (value: string | string[]) => void;
    placeholder?: string;
    displayKey?: string;
    valueKey?: string;
    dateKey?: string;
    disabled?: boolean;
    className?: string;
    labelText?: string;
    id?: string;
    name?: string;
    labelClassName?: string;
    inputClassName?: string;
    isSelectableOnly?: boolean;
    onEnterPress?: () => void;
    styles?: any;
    multiSelect?: boolean;
    tooltipText?: string;
    userLang?: string;
  }
>(
  (
    {
      options = [],
      value,
      onValueChange,
      placeholder = "Select an option...",
      displayKey = "label",
      valueKey = "value",
      dateKey = "date",
      disabled = false,
      className = "",
      labelText,
      id,
      name,
      labelClassName,
      inputClassName,
      multiSelect = false,
      tooltipText,
      userLang = "en",
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);

    const inputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLDivElement>(null);
    const isOpeningRef = useRef(false);

    const [dropdownPosition, setDropdownPosition] = useState({
      top: 0,
      left: 0,
      width: 0,
    });

    // Combine refs
    const combinedRef = useCallback(
      (element: HTMLInputElement) => {
        inputRef.current = element;
        if (typeof ref === "function") {
          ref(element);
        } else if (ref) {
          ref.current = element;
        }
      },
      [ref]
    );

    // Handle multiple or single selection
    const selectedValues = Array.isArray(value) ? value : value ? [value] : [];

    // For single select, ensure "Active" is selected by default if no value is set
    let selectedOption = null;
    if (!multiSelect) {
      if (value) {
        selectedOption = options.find((option) => option[valueKey] === value);
      } else {
        // If no value is set, default to "Active"
        const activeOption = options.find((opt) => opt.label === "Active");
        if (activeOption && !value) {
          onValueChange(activeOption[valueKey]);
          selectedOption = activeOption;
        }
      }
    }

    // Handle click outside to close dropdown
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (isOpeningRef.current) {
          return;
        }

        if (
          containerRef.current &&
          !containerRef.current.contains(event.target as Node) &&
          isOpen
        ) {
          setIsOpen(false);
          setHighlightedIndex(-1);
        }
      };

      if (isOpen) {
        const timeoutId = setTimeout(() => {
          document.addEventListener("mousedown", handleClickOutside);
        }, 50);

        return () => {
          clearTimeout(timeoutId);
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }
    }, [isOpen]);

    // Handle window resize and scroll
    useEffect(() => {
      const handleResize = () => {
        if (isOpen && containerRef.current) {
          const rect = containerRef.current.getBoundingClientRect();
          setDropdownPosition({
            top: rect.bottom + window.scrollY,
            left: rect.left + window.scrollX,
            width: rect.width,
          });
        }
      };

      if (isOpen) {
        window.addEventListener("resize", handleResize);
        window.addEventListener("scroll", handleResize);

        return () => {
          window.removeEventListener("resize", handleResize);
          window.removeEventListener("scroll", handleResize);
        };
      }
    }, [isOpen]);

    // Scroll highlighted item into view
    useEffect(() => {
      if (highlightedIndex >= 0 && listRef.current) {
        const highlightedElement = listRef.current.children[highlightedIndex];
        if (highlightedElement) {
          highlightedElement.scrollIntoView({
            block: "nearest",
            behavior: "smooth",
          });
        }
      }
    }, [highlightedIndex]);

    const openDropdown = () => {
      if (disabled) return;

      isOpeningRef.current = true;
      setIsOpen(true);
      setHighlightedIndex(-1);

      // Calculate dropdown position
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setDropdownPosition({
          top: rect.bottom + window.scrollY,
          left: rect.left + window.scrollX,
          width: rect.width,
        });
      }

      // Reset the opening flag after a short delay
      setTimeout(() => {
        isOpeningRef.current = false;
      }, 100);
    };

    const closeDropdown = () => {
      setIsOpen(false);
      setHighlightedIndex(-1);
      inputRef.current?.blur();
    };

    const handleSwitchToggle = (optionValue: string) => {
      if (multiSelect) {
        // Multi-select mode: toggle individual switches
        const currentValues = Array.isArray(value)
          ? value
          : value
          ? [value]
          : [];
        const newValues = currentValues.includes(optionValue)
          ? currentValues.filter((v) => v !== optionValue) // Remove if already selected
          : [...currentValues, optionValue]; // Add if not selected
        onValueChange(newValues);
      } else {
        // Single select mode: ensure at least one option is always selected
        if (value === optionValue) {
          // If trying to deselect current option, select "Active" instead
          const activeOption = options.find((opt) => opt.label === "Active");
          if (activeOption) {
            onValueChange(activeOption[valueKey]);
          }
        } else {
          // Select the new option
          onValueChange(optionValue);
        }
      }
    };

    const handleInputClick = (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      if (!isOpen) {
        openDropdown();
      } else {
        closeDropdown();
      }
    };

    const handleFocus = () => {
      setIsFocused(true);
    };

    const handleBlur = () => {
      setIsFocused(false);
    };

    const getTooltipText = () => {
      if (tooltipText) return tooltipText;

      const fieldName = name || id || "field";
      const fieldType = "text";

      // Generic tooltip messages for common field types
      const tooltipMessages: Record<string, Record<string, string>> = {
        text: {
          ar: `الرجاء إدخال ${fieldName}`,
          en: `Please enter ${fieldName}`,
        },
        email: {
          ar: `الرجاء إدخال بريد إلكتروني صحيح`,
          en: `Please enter a valid email address`,
        },
        password: {
          ar: `الرجاء إدخال كلمة مرور`,
          en: `Please enter a password`,
        },
        number: {
          ar: `الرجاء إدخال رقم صحيح`,
          en: `Please enter a valid number`,
        },
        tel: {
          ar: `الرجاء إدخال رقم هاتف صحيح`,
          en: `Please enter a valid phone number`,
        },
        url: {
          ar: `الرجاء إدخال رابط صحيح`,
          en: `Please enter a valid URL`,
        },
        search: {
          ar: `البحث في ${fieldName}`,
          en: `Search in ${fieldName}`,
        },
      };

      // Special field-specific messages
      const specialFields: Record<string, Record<string, string>> = {
        code: {
          ar: `الرجاء إدخال رمز (مثل US, UK)`,
          en: `Please enter a code (e.g., US, UK)`,
        },
        callingcode: {
          ar: `الرجاء إدخال رمز الاتصال (مثل +1, +44)`,
          en: `Please enter calling code (e.g., +1, +44)`,
        },
        title: {
          ar: `الرجاء إدخال ${fieldName} الكامل`,
          en: `Please enter full ${fieldName}`,
        },
        name: {
          ar: `الرجاء إدخال الاسم الكامل`,
          en: `Please enter full name`,
        },
        username: {
          ar: `الرجاء إدخال اسم المستخدم`,
          en: `Please enter username`,
        },
        address: {
          ar: `الرجاء إدخال العنوان الكامل`,
          en: `Please enter complete address`,
        },
        city: {
          ar: `الرجاء إدخال اسم المدينة`,
          en: `Please enter city name`,
        },
        country: {
          ar: `الرجاء إدخال اسم البلد`,
          en: `Please enter country name`,
        },
        zip: {
          ar: `الرجاء إدخال الرمز البريدي`,
          en: `Please enter zip code`,
        },
        phone: {
          ar: `الرجاء إدخال رقم الهاتف`,
          en: `Please enter phone number`,
        },
      };

      // Check for special field first, then fall back to generic type-based message
      if (specialFields[fieldName.toLowerCase()]) {
        return (
          specialFields[fieldName.toLowerCase()][userLang] ||
          specialFields[fieldName.toLowerCase()].en
        );
      }

      // Fall back to generic type-based message
      const genericMessage = tooltipMessages[fieldType] || tooltipMessages.text;
      return genericMessage[userLang] || genericMessage.en;
    };

    // Display value logic
    const displayValue = multiSelect
      ? selectedValues.length > 0
        ? `${selectedValues.length} selected`
        : ""
      : selectedOption
      ? selectedOption[displayKey]
      : "";

    return (
      <div ref={containerRef} className={cn("relative w-full", className)}>
        <div className="relative">
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
              <input
                ref={combinedRef}
                type="text"
                id={id}
                name={name}
                value={displayValue}
                onClick={handleInputClick}
                onFocus={handleFocus}
                onBlur={handleBlur}
                placeholder={placeholder}
                disabled={disabled}
                readOnly
                className={cn(
                  "flex h-10 w-full rounded-md border border-input  px-3 py-2 pr-16 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                  isOpen && "ring-2 ring-ring ring-offset-2",
                  "block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 rounded-[12px] border border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#70D3FC80] focus:outline-none focus:ring-0 focus:border-[#70D3FC80] peer h-[50px] focus:border cursor-pointer",
                  inputClassName
                )}
                autoComplete="off"
                {...props}
              />
            </Tooltip>
            {labelText && (
              <label
                htmlFor={id}
                className={cn(
                  "absolute text-base text-gray-800 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-1 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-primary peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 transition-all rounded-lg",
                  labelClassName
                )}
              >
                {labelText}
              </label>
            )}
          </div>

          <div className="absolute inset-y-0 right-0 flex items-center pr-3 gap-2">
            {/* Switch on the right side of input */}
            {/* {!multiSelect && (
              <div
                className={cn(
                  "w-8 h-4 p-0.5 rounded-[190px] flex items-center transition-all duration-200 cursor-pointer",
                  selectedOption
                    ? "bg-primary justify-end"
                    : "bg-gray-300 justify-start"
                )}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();

                  // Allow deselection or select first if none selected
                  if (selectedOption) {
                    onValueChange(""); // Deselect current option
                  } else if (options.length > 0) {
                    onValueChange(options[0][valueKey]); // Select first option
                  }
                }}
              >
                <div className="w-3 h-3 bg-white rounded-full shadow-sm transition-all duration-200" />
              </div>
            )} */}

            {/* Chevron icon */}
            <div
              className="cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (!isOpen) {
                  openDropdown();
                } else {
                  closeDropdown();
                }
              }}
            >
              {isOpen ? (
                <ChevronUp className="h-4 w-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              )}
            </div>
          </div>
        </div>

        {isOpen &&
          createPortal(
            <div className="px-20">
              <div
                className="fixed bg-white dark:bg-gray-900 border border-gray-300 rounded-md shadow-lg max-h-80 overflow-auto z-[99999]"
                style={{
                  top: dropdownPosition.top,
                  left: dropdownPosition.left,
                  width: dropdownPosition.width,
                }}
              >
                {options.length > 0 ? (
                  <div ref={listRef}>
                    {options.map((option, index) => {
                      const optionValue = option[valueKey];
                      const optionLabel = option[displayKey];
                      const optionDate = option[dateKey];
                      const isSelected = multiSelect
                        ? selectedValues.includes(optionValue)
                        : value === optionValue;

                      const isDraft = option.label === "Draft";
                      const isDelete = option.label === "Delete";
                      const isNo = option.label === "No";
                      const isInactive = option.label === "InActive";

                      return (
                        <div className="" key={optionValue}>
                          <div
                            className={cn(
                              "w-full px-4 py-3 bg-white dark:bg-gray-900 border-b border-gray-200 inline-flex justify-between items-center transition-colors cursor-pointer hover:bg-gray-50",
                              index === 0 && "rounded-tl rounded-tr",
                              index === options.length - 1 &&
                                "border-b-0 rounded-bl rounded-br"
                            )}
                            onMouseDown={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleSwitchToggle(optionValue);
                              setHighlightedIndex(index);
                            }}
                            onMouseEnter={() => setHighlightedIndex(index)}
                          >
                            <div className="flex-1 inline-flex flex-col justify-start items-start gap-1">
                              <div className="self-stretch flex items-center text-black/80 dark:text-white text-base font-medium leading-tight">
                                {optionLabel}
                              </div>
                              {optionDate && (
                                <div className="self-stretch flex items-center text-black/50 dark:text-white text-xs font-normal leading-tight">
                                  {optionDate}
                                </div>
                              )}
                            </div>

                            <div className="w-6 h-6 relative" />

                            <div
                              className={cn(
                                "w-10 h-5 p-0.5 rounded-[190px] flex items-center gap-2.5 transition-all duration-200 pointer-events-none",
                                isSelected
                                  ? isDraft
                                    ? "bg-[#F8D56B] justify-end" // Draft color
                                    : isDelete
                                    ? "bg-red-500 justify-end" // Delete color
                                    : isNo
                                    ? "bg-red-400 justify-end" // No color
                                    : isInactive
                                    ? "bg-teal-400 justify-end" // Inactive color
                                    : "bg-green-500 justify-end" // Active color
                                  : "bg-gray-300 justify-start"
                              )}
                            >
                              <div className="w-4 h-4 bg-white rounded-full shadow-[-1px_14px_18px_0px_rgba(0,0,0,0.35)] transition-all duration-200" />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="px-4 py-3 text-sm text-muted-foreground">
                    No options available
                  </div>
                )}
              </div>
            </div>,
            document.body
          )}
      </div>
    );
  }
);

SwitchSelect.displayName = "SwitchSelect";
