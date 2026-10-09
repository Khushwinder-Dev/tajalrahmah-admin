/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef, useEffect } from "react";
import { Check, ChevronDown, ChevronUp, Table, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { createPortal } from "react-dom";
import { Tooltip } from "@mantine/core";

// Reusable Autocomplete Component
export const Autocomplete = ({
  options = [],
  value,
  onValueChange,
  placeholder = "Select an option...",
  displayKey = "label",
  valueKey = "value",
  searchKey = "label",
  disabled = false,
  className = "",
  emptyMessage = "No options found",
  labelText,
  id,
  labelClassName,
  inputClassName,
  isSelectableOnly = false,
  allowCustomInput = false,
  onEnterPress,
  hideCheckMark = false,
  tooltipText,
  userLang = "en",
  setShowTemplates,
  showTemplates,
  isShowTemplateIcon = false,
  ...props
}: any &
  React.InputHTMLAttributes<HTMLInputElement> & {
    isSelectableOnly?: boolean;
    allowCustomInput?: boolean;
    onEnterPress?: () => void;
    hideCheckMark?: boolean;
    tooltipText?: string;
    userLang?: string;
    setShowTemplates?: (value: boolean) => void;
    showTemplates?: boolean;
    isShowTemplateIcon?: boolean;
  }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [manualValue, setManualValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [hasChanged, setHasChanged] = useState(false);

  const inputRef = useRef<any>(null);
  const listRef = useRef<any>(null);
  const containerRef = useRef<any>(null);
  const dropdownRef = useRef<any>(null);
  const [dropdownPosition, setDropdownPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
  });

  // Find selected option
  const selectedOption = options.find((option: any) =>
    typeof option === "string" ? option === value : option[valueKey] === value
  );

  // Filter options based on search term
  const filteredOptions = isSelectableOnly
    ? options
    : options.filter((option: any) => {
        const searchValue =
          typeof option === "string"
            ? option
            : option[searchKey] || option[displayKey];
        return searchValue.toLowerCase().includes(searchTerm.toLowerCase());
      });

  // Handle click outside to close dropdown and window resize
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        closeDropdown();
      }
    };

    const handleResize = () => {
      if (isOpen && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setDropdownPosition({
          top: rect.bottom + window.scrollY - 1, // Move up by 1px to hide input border
          left: rect.left + window.scrollX,
          width: rect.width,
        });
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleResize);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleResize);
    };
  }, [isOpen]);

  // Handle keyboard navigation
  const handleKeyDown = (e: any) => {
    if (disabled) return;

    if (!isOpen) {
      if (e.key === "Enter" || e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        openDropdown();
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev < filteredOptions.length - 1 ? prev + 1 : 0
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev > 0 ? prev - 1 : filteredOptions.length - 1
        );
        break;
      case "Enter":
        e.preventDefault();

        if (highlightedIndex >= 0 && filteredOptions[highlightedIndex]) {
          selectOption(filteredOptions[highlightedIndex]);
        } else if (allowCustomInput && manualValue) {
          onValueChange(manualValue); // accept user-typed value
          closeDropdown();
        }
        if (manualValue || selectedOption) {
          onEnterPress?.();
          closeDropdown();
        }
        break;
      case "Escape":
        e.preventDefault();
        closeDropdown();
        break;
      case "Tab":
        closeDropdown();
        break;
    }
  };

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
    setIsOpen(true);
    setHighlightedIndex(-1);

    // Calculate dropdown position
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + window.scrollY - 1, // Move up by 1px to hide input border
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }
  };

  const closeDropdown = () => {
    setIsOpen(false);
    setSearchTerm("");
    setHighlightedIndex(-1);
    inputRef.current?.blur();
  };

  const selectOption = (option: any) => {
    const optionValue = typeof option === "string" ? option : option[valueKey];
    onValueChange(optionValue);
    setManualValue(""); // reset manual input
    setHasChanged(true); // Mark as changed when option is selected
    closeDropdown();
  };

  const handleInputChange = (e: any) => {
    if (isSelectableOnly) return;
    const inputVal = e.target.value;
    setSearchTerm(inputVal);
    setManualValue(inputVal);
    setHighlightedIndex(-1);
    setHasChanged(true); // Mark as changed when user types
    if (!isOpen) openDropdown();
    if (inputVal === "") {
      onValueChange(""); // Clear selection when input is cleared
      closeDropdown();
    }
  };

  const handleInputClick = () => {
    if (!isOpen) {
      openDropdown();
    }
  };

  const handleClearSearch = (e: any) => {
    e.stopPropagation();
    setSearchTerm("");
    setManualValue("");
    setHighlightedIndex(-1);

    // Clear selected value
    onValueChange(""); // or null or "" depending on your use case

    if (inputRef.current) {
      inputRef.current.focus();
    }

    closeDropdown();
  };

  // Display value in input
  const displayValue = (() => {
    if (isOpen) {
      if (isSelectableOnly) {
        return selectedOption
          ? typeof selectedOption === "string"
            ? selectedOption
            : selectedOption[displayKey]
          : "";
      }

      return (
        searchTerm ||
        (selectedOption
          ? typeof selectedOption === "string"
            ? selectedOption
            : selectedOption[displayKey]
          : allowCustomInput && manualValue
          ? manualValue
          : "")
      );
    }

    if (selectedOption) {
      return typeof selectedOption === "string"
        ? selectedOption
        : selectedOption[displayKey];
    }

    if (allowCustomInput && manualValue) {
      return manualValue;
    }

    return "";
  })();

  const getOptionDisplay = (option: any) => {
    return typeof option === "string" ? option : option[displayKey];
  };

  const getOptionValue = (option: any) => {
    return typeof option === "string" ? option : option[valueKey];
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleNext = () => {
    onEnterPress?.();
  };

  const getTooltipText = () => {
    if (tooltipText) return tooltipText;

    const fieldName = (props as any).name || id || "field";
    const fieldType = (props as any).type || "text";

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

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full", className)}
      style={{ position: "relative" }}
    >
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
              ref={inputRef}
              type="text"
              id={id}
              value={displayValue}
              onChange={handleInputChange}
              onClick={handleInputClick}
              onKeyDown={handleKeyDown}
              onFocus={handleFocus}
              onBlur={() => {
                if (allowCustomInput && manualValue && value !== manualValue) {
                  onValueChange(manualValue);
                }
                handleBlur();
              }}
              placeholder={placeholder}
              disabled={disabled}
              className={cn(
                "flex h-10 w-full border! border-input bg-white! dark:bg-gray-800! px-3 py-2 pr-10 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
                // isOpen && "ring-2 ring-primary ring-offset-0", // Removed border-primary
                `block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 border-[#70D3FC80] border-t-2 border-l-2 border-r-2 ${
                  isOpen ? "border-b-0" : "border-b-2"
                } border-gray-300 appearance-none dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-t-[#70D3FC80] focus:border-l-[#70D3FC80] focus:border-r-[#70D3FC80] focus:border-b-[#70D3FC80] peer h-[50px] rounded-t-[12px] ${
                  isOpen ? "rounded-b-none" : "rounded-b-[12px]"
                }`, // Focus only on top, left, right borders
                inputClassName
              )}
              autoComplete="off"
              {...props}
            />
          </Tooltip>
          <label
            htmlFor={id}
            className={cn(
              "absolute text-base text-gray-800 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-1 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-primary peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 transition-all rounded-lg",
              labelClassName
            )}
          >
            {labelText}
          </label>
        </div>
        <div className="absolute inset-y-0 right-0 rtl:left-0 rtl:right-auto flex items-center pr-3 rtl:pl-3 rtl:pr-0 gap-2">
          {/* Template Icon - Added here */}
          {isShowTemplateIcon && (
            <Tooltip
              label="Templates"
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
                onClick={() => setShowTemplates(!showTemplates)} // You'll need to add this handler
                className="p-1 hover:bg-gray-200 rounded-full transition-colors cursor-pointer"
                title="Show templates"
              >
                <Table className="h-4 w-4 text-muted-foreground hover:text-primary" />
              </button>
            </Tooltip>
          )}
          {isOpen && searchTerm && (
            <>
              <Tooltip
                label="Clear"
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
                  onMouseDown={handleClearSearch}
                  className="p-1 hover:bg-gray-200 rounded-full transition-colors mr-1 cursor-pointer"
                  title="Clear search"
                >
                  <X className="h-4 w-4 text-muted-foreground hover:text-gray-600 rtl:rotate-180" />
                </button>
              </Tooltip>
            </>
          )}

          {!hideCheckMark &&
            !isFocused &&
            value &&
            hasChanged &&
            (allowCustomInput
              ? manualValue || selectedOption
              : selectedOption) && (
              <button
                type="button"
                onClick={handleNext}
                className="text-green-500"
              >
                <Check className="h-4 w-4" />
              </button>
            )}

          {isOpen ? (
            <div onClick={closeDropdown} className="cursor-pointer">
              <ChevronUp
                className="h-4 w-4 text-muted-foreground pointer-events-none"
                onClick={closeDropdown}
              />
            </div>
          ) : (
            <div onClick={openDropdown} className="cursor-pointer">
              <ChevronDown
                className="h-4 w-4 text-muted-foreground pointer-events-none"
                onClick={openDropdown}
              />
            </div>
          )}
        </div>
      </div>

      {isOpen &&
        createPortal(
          <div
            ref={dropdownRef}
            className="fixed bg-popover border-[#70D3FC80] border border-t-0 shadow-lg overflow-x-auto overflow-y-scroll grid-scroll"
            style={{
              top: dropdownPosition.top,
              left: dropdownPosition.left,
              width: dropdownPosition.width,
              zIndex: 99999,
              maxHeight: "230px", // Approximately 5 items (45px each + padding)
            }}
          >
            {filteredOptions.length > 0 ? (
              <ul ref={listRef} className="py-1">
                {filteredOptions.map((option: any, index: any) => {
                  const optionValue = getOptionValue(option);
                  const optionDisplay = getOptionDisplay(option);
                  const isSelected = value === optionValue;
                  const isHighlighted = index === highlightedIndex;

                  return (
                    <li
                      key={optionValue}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        selectOption(option);
                      }}
                      onClick={() => selectOption(option)}
                      className={cn(
                        "relative flex cursor-default select-none items-center px-2 py-1.5 text-sm outline-none bg-[#FAFAFA] min-h-[40px]",
                        isHighlighted && "bg-accent text-accent-foreground",
                        isSelected &&
                          "bg-accent text-accent-foreground font-bold", // Changed to bold
                        "hover:bg-accent hover:text-accent-foreground cursor-pointer"
                      )}
                    >
                      <span className="flex-1 text-[#00000099]">
                        {optionDisplay}
                      </span>
                      {isSelected && (
                        <Check className="h-4 w-4 ml-2 text-primary" />
                      )}
                    </li>
                  );
                })}
              </ul>
            ) : (
              <div className="px-2 py-1.5 text-sm text-muted-foreground">
                {emptyMessage}
              </div>
            )}
          </div>,
          document.body
        )}
    </div>
  );
};

// Demo Usage Component
export default function AutocompleteDemo() {
  const [selectedCountry, setSelectedCountry] = useState("US");
  const [selectedUser, setSelectedUser] = useState("1");
  const [selectedFramework, setSelectedFramework] = useState("");

  // Sample data - different formats to show flexibility
  const countries = [
    { code: "US", name: "United States", flag: "🇺🇸" },
    { code: "GB", name: "United Kingdom", flag: "🇬🇧" },
    { code: "CA", name: "Canada", flag: "🇨🇦" },
    { code: "AU", name: "Australia", flag: "🇦🇺" },
    { code: "DE", name: "Germany", flag: "🇩🇪" },
    { code: "FR", name: "France", flag: "🇫🇷" },
    { code: "JP", name: "Japan", flag: "🇯🇵" },
    { code: "IN", name: "India", flag: "🇮🇳" },
  ];

  const users = [
    { id: "1", name: "John Doe", email: "john@example.com" },
    { id: "2", name: "Jane Smith", email: "jane@example.com" },
    { id: "3", name: "Bob Johnson", email: "bob@example.com" },
    { id: "4", name: "Alice Brown", email: "alice@example.com" },
    { id: "5", name: "Charlie Davis", email: "charlie@example.com" },
  ];

  // Simple string array
  const frameworks = [
    "React",
    "Vue.js",
    "Angular",
    "Svelte",
    "Next.js",
    "Nuxt.js",
    "Gatsby",
    "Remix",
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Reusable Autocomplete Component</h1>
        <p className="text-muted-foreground">
          A flexible autocomplete component that works with different data
          structures
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Country Example with Custom Display */}
        <div className="space-y-3">
          <div>
            <h3 className="text-lg font-semibold">Country Selection</h3>
            <p className="text-sm text-muted-foreground">
              Object array with custom display format
            </p>
          </div>
          <Autocomplete
            options={countries}
            value={selectedCountry}
            onValueChange={setSelectedCountry}
            placeholder="Select a country..."
            displayKey="name"
            valueKey="code"
            searchKey="name"
            className="w-full"
            styles={{
              input: {
                borderColor: "var(--primary)",
                "&:focus": {
                  borderColor: "var(--primary)",
                },
              },
            }}
          />
          <div className="text-sm text-muted-foreground">
            Selected:{" "}
            {selectedCountry
              ? countries.find((c) => c.code === selectedCountry)?.flag +
                " " +
                countries.find((c) => c.code === selectedCountry)?.name
              : "None"}
          </div>
        </div>

        {/* User Example */}
        <div className="space-y-3">
          <div>
            <h3 className="text-lg font-semibold">User Selection</h3>
            <p className="text-sm text-muted-foreground">
              Object array with email in search
            </p>
          </div>
          <Autocomplete
            options={users.map((user) => ({
              ...user,
              displayName: `${user.name} (${user.email})`,
            }))}
            value={selectedUser}
            onValueChange={setSelectedUser}
            placeholder="Select a user..."
            displayKey="displayName"
            valueKey="id"
            searchKey="displayName"
            className="w-full"
            styles={{
              input: {
                borderColor: "var(--primary)",
                "&:focus": {
                  borderColor: "var(--primary)",
                },
              },
            }}
          />
          <div className="text-sm text-muted-foreground">
            Selected:{" "}
            {selectedUser
              ? users.find((u) => u.id === selectedUser)?.name
              : "None"}
          </div>
        </div>

        {/* Framework Example - Simple Strings */}
        <div className="space-y-3">
          <div>
            <h3 className="text-lg font-semibold">Framework Selection</h3>
            <p className="text-sm text-muted-foreground">Simple string array</p>
          </div>
          <Autocomplete
            options={frameworks}
            value={selectedFramework}
            onValueChange={setSelectedFramework}
            placeholder="Select a framework..."
            className="w-full"
          />
          <div className="text-sm text-muted-foreground">
            Selected: {selectedFramework || "None"}
          </div>
        </div>

        {/* Disabled Example */}
        <div className="space-y-3">
          <div>
            <h3 className="text-lg font-semibold">Disabled State</h3>
            <p className="text-sm text-muted-foreground">
              Shows how the component looks when disabled
            </p>
          </div>
          <Autocomplete
            options={frameworks}
            value="React"
            onValueChange={() => {}}
            placeholder="Disabled autocomplete..."
            disabled
            className="w-full"
          />
        </div>
      </div>

      {/* Usage Instructions */}
      <div className="mt-8 p-6 bg-muted rounded-lg">
        <h3 className="text-lg font-semibold mb-3">How to Use</h3>
        <div className="space-y-2 text-sm">
          <p>
            <strong>Click</strong> the input field to open the dropdown
          </p>
          <p>
            <strong>Type</strong> to filter options by the specified search key
          </p>
          <p>
            <strong>Arrow keys</strong> to navigate through options
          </p>
          <p>
            <strong>Enter</strong> to select the highlighted option
          </p>
          <p>
            <strong>Escape</strong> or click outside to close
          </p>
          <p>
            <strong>Tab</strong> to close and move to next field
          </p>
        </div>

        <h4 className="font-semibold mt-4 mb-2">Props</h4>
        <div className="text-xs space-y-1 font-mono bg-background p-3 rounded">
          <div>
            <span className="text-blue-600">options</span>: Array of objects or
            strings
          </div>
          <div>
            <span className="text-blue-600">value</span>: Current selected value
          </div>
          <div>
            <span className="text-blue-600">onValueChange</span>: Callback when
            value changes
          </div>
          <div>
            <span className="text-blue-600">displayKey</span>: Key to display in
            options (default: "label")
          </div>
          <div>
            <span className="text-blue-600">valueKey</span>: Key to use as value
            (default: "value")
          </div>
          <div>
            <span className="text-blue-600">searchKey</span>: Key to search
            against (default: "label")
          </div>
          <div>
            <span className="text-blue-600">placeholder</span>: Input
            placeholder text
          </div>
          <div>
            <span className="text-blue-600">disabled</span>: Disable the
            component
          </div>
          <div>
            <span className="text-blue-600">emptyMessage</span>: Message when no
            options found
          </div>
        </div>
      </div>
    </div>
  );
}
