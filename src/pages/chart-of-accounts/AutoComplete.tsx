/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef, useEffect } from "react";
import { Check, Search, X, Mic } from "lucide-react";
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
  ...props
}: any &
  React.InputHTMLAttributes<HTMLInputElement> & {
    isSelectableOnly?: boolean;
    allowCustomInput?: boolean;
    onEnterPress?: () => void;
    hideCheckMark?: boolean;
  }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [manualValue, setManualValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const inputRef = useRef<any>(null);
  const listRef = useRef<any>(null);
  const containerRef = useRef<any>(null);
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
        !containerRef.current.contains(event.target)
      ) {
        closeDropdown();
      }
    };

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
        top: rect.bottom + window.scrollY,
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
    closeDropdown();
  };

  const handleInputChange = (e: any) => {
    if (isSelectableOnly) return;
    const inputVal = e.target.value;
    setSearchTerm(inputVal);
    setManualValue(inputVal);
    setHighlightedIndex(-1);
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

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full", className)}
      style={{ position: "relative" }}
    >
      <div className="relative">
        <div className="relative rounded-full">
          {/* Search icon on the left */}
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-4 w-4 text-muted-foreground cursor-pointer" />
          </div>

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
              "flex h-10 w-full rounded-full! border border-input bg-[#f8fafc] px-3 py-2 pl-10 pr-12 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
              isOpen && "ring-2 ring-ring ring-offset-2",
              "block px-2.5 pb-2.5 pt-2 w-full text-sm text-gray-900 bg-[#f8fafc] rounded-[12px] border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-primary focus:outline-none focus:ring-0 focus:border-primary peer h-[50px] focus:border-2 pl-10 pr-12",
              inputClassName
            )}
            autoComplete="off"
            {...props}
          />
          <label
            htmlFor={id}
            className={cn(
              "absolute text-base text-gray-800 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-1 z-10 origin-[0] bg-[#f8fafc] dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-primary peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-10 transition-all rounded-lg",
              labelClassName
            )}
          >
            {labelText}
          </label>
        </div>

        {/* Right side icons */}
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 gap-1">
          {/* Clear button */}
          {isOpen && searchTerm && (
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
                className="p-1 hover:bg-gray-200 rounded-full transition-colors cursor-pointer"
                title="Clear search"
              >
                <X className="h-4 w-4 text-muted-foreground hover:text-gray-600" />
              </button>
            </Tooltip>
          )}

          {/* Check mark */}
          {!hideCheckMark &&
            !isFocused &&
            value &&
            (allowCustomInput
              ? manualValue || selectedOption
              : selectedOption) && (
              <button type="button" onClick={handleNext} className="text-black">
                <Check className="h-4 w-4" />
              </button>
            )}

          {/* Mic icon on the right */}
          <button
            type="button"
            className="p-1 hover:bg-gray-200 rounded-full transition-colors cursor-pointer"
            onClick={() => {
              // Add voice recognition functionality here if needed
              console.log("Mic clicked");
            }}
          >
            <Mic className="h-4 w-4 text-muted-foreground hover:text-gray-600 cursor-pointer" />
          </button>
        </div>
      </div>

      {isOpen &&
        createPortal(
          <div
            className="fixed bg-popover border border-border rounded-md shadow-lg max-h-60 overflow-auto"
            style={{
              top: dropdownPosition.top,
              left: dropdownPosition.left,
              width: dropdownPosition.width,
              zIndex: 99999,
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
                        "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none",
                        isHighlighted && "bg-accent text-accent-foreground",
                        isSelected &&
                          "bg-accent text-accent-foreground font-medium",
                        "hover:bg-accent hover:text-accent-foreground cursor-pointer"
                      )}
                    >
                      <span className="flex-1">{optionDisplay}</span>
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

// Demo Usage Component (keeping the same)
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
          <p>
            <strong>Mic icon</strong> for voice input (functionality can be
            added)
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
