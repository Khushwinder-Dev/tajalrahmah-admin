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

export interface ActionItem {
  action: string;
  user: string;
  role: string;
  date: string;
  value: string;
}

export const ActionsAutocomplete = forwardRef<
  HTMLInputElement,
  {
    actions: ActionItem[];
    value?: string;
    onValueChange?: (value: string) => void;
    placeholder?: string;
    disabled?: boolean;
    className?: string;
    labelText?: string;
    id?: string;
    name?: string;
    labelClassName?: string;
    inputClassName?: string;
    onEnterPress?: () => void;
    styles?: any;
    tooltipText?: string;
    userLang?: string;
  }
>(
  (
    {
      actions = [],
      value = "",
      onValueChange,
      placeholder = "Actions",
      disabled = false,
      className = "",
      labelText,
      id,
      name,
      labelClassName,
      inputClassName,
      tooltipText,
      userLang = "en",
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);

    // Get the most recent action (last created - highest date)
    const getMostRecentAction = () => {
      if (actions.length === 0) return null;

      // Sort by date (most recent first) and return the first one
      const sortedActions = [...actions].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      return sortedActions[0];
    };

    // Auto-set the most recent action as default value if no value is provided
    const mostRecentAction = getMostRecentAction();
    const currentValue =
      value || (mostRecentAction ? mostRecentAction.value : "");

    // Auto-select the most recent action on mount
    useEffect(() => {
      if (!value && mostRecentAction && onValueChange) {
        onValueChange(mostRecentAction.value);
      }
    }, [value, mostRecentAction, onValueChange]);

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

    const handleActionClick = () => {
      // Don't allow changing the selection - only show for viewing
      // Users cannot select different actions
      closeDropdown();
      return;
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

    // Get tooltip text
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
        actions: {
          ar: `عرض الإجراءات المتاحة`,
          en: `View available actions`,
        },
        action: {
          ar: `عرض الإجراءات المتاحة`,
          en: `View available actions`,
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

    // Find the selected action to display in the input (use current value which includes auto-selected most recent)
    const selectedAction = actions.find(
      (action) => action.value === currentValue
    );
    const displayValue = selectedAction ? selectedAction.action : "";

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
                  "flex h-10 w-full rounded-md border border-input px-3 py-2 pr-16 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                  isOpen && "ring-2 ring-ring ring-offset-2",
                  "block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 rounded-[12px] border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-primary focus:outline-none focus:ring-0 focus:border-[#70D3FC80] peer h-[50px] focus:border cursor-pointer",
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

          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            {/* Chevron icon */}
            <div className="pointer-events-none">
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
            <div
              className="fixed bg-white border border-gray-300 rounded-md shadow-lg max-h-80 overflow-x-auto overflow-y-scroll grid-scroll z-40"
              style={{
                top: dropdownPosition.top,
                left: dropdownPosition.left,
                width: dropdownPosition.width,
              }}
            >
              {actions.length > 0 ? (
                <div ref={listRef}>
                  {actions.map((action, index) => {
                    const getActionColor = (actionType: string) => {
                      switch (actionType.toLowerCase()) {
                        case "created":
                          return "text-gray-700";
                        case "updated":
                          return "text-gray-700";
                        case "inactive":
                          return "text-gray-700";
                        case "drafted":
                          return "text-gray-700";
                        case "deleted":
                          return "text-gray-700";
                        default:
                          return "text-gray-700";
                      }
                    };

                    const isSelected = currentValue === action.value;

                    return (
                      <div key={index} className="">
                        <div
                          className={cn(
                            "w-full px-4 py-3 bg-white border-b border-gray-200 flex justify-between items-center transition-colors",
                            index === 0 && "rounded-tl rounded-tr",
                            index === actions.length - 1 &&
                              "border-b-0 rounded-bl rounded-br",
                            highlightedIndex === index && "bg-gray-50",
                            isSelected && "bg-blue-50 border-blue-200"
                          )}
                          onMouseDown={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleActionClick();
                          }}
                          onMouseEnter={() => setHighlightedIndex(index)}
                        >
                          {/* Left side - Action */}
                          <div className="flex flex-col justify-start items-start gap-1">
                            <div
                              className={cn(
                                "text-base font-medium font-['Inter'] leading-tight",
                                getActionColor(action.action)
                              )}
                            >
                              {action.action}
                            </div>
                            <div className="text-black/50 text-xs font-normal font-['Inter'] leading-tight">
                              {action.date}
                            </div>
                          </div>

                          {/* Right side - User info */}
                          <div className="flex flex-col justify-end items-end gap-1">
                            <div className="text-black/80 text-base font-medium font-['Inter'] leading-tight">
                              {action.user}
                            </div>
                            <div className="text-black/50 text-xs font-normal font-['Inter'] leading-tight">
                              {action.role}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="px-4 py-3 text-sm text-muted-foreground">
                  No actions available
                </div>
              )}
            </div>,
            document.body
          )}
      </div>
    );
  }
);

ActionsAutocomplete.displayName = "ActionsAutocomplete";
