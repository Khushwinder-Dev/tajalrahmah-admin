import { Autocomplete } from "@/components/common/Autocomplete";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import {
  CalendarCheck,
  CalendarClock,
  CalendarMinus,
  CalendarSearch,
  SlidersHorizontal,
  // Download,
} from "lucide-react";
import { useState, useEffect } from "react";

type SearchFilterPopoverProps = {
  onSearch?: (timeLabel: string) => void;
  isFilterOpen: boolean;
  setIsFilterOpen: (isOpen: boolean) => void;
  selectedValue?: string;
  setIsExportOpen: (isExportOpen: boolean) => void;
  isPopoverOpen?: boolean;
  setIsPopoverOpen?: (isPopoverOpen: boolean) => void;
  setShowVisibility: (showVisibility: boolean) => void;
  showVisibility: boolean;
  viewMode: string;
  setTimeLabel: (timeLabel: string) => void;
};

const SearchFilterPopover = ({
  onSearch,
  isFilterOpen,
  setIsFilterOpen,
  selectedValue,
  isPopoverOpen,
  setIsPopoverOpen,
  setShowVisibility,
  showVisibility,
  viewMode,
  setTimeLabel,
  setIsExportOpen,
}: SearchFilterPopoverProps) => {
  const [internalSelectedValue, setInternalSelectedValue] =
    useState<string>("");
  const [selectedOption, setSelectedOption] = useState<string>("");

  useEffect(() => {
    if (!isFilterOpen && !showVisibility) {
      setSelectedOption("");
    }
  }, [isFilterOpen, showVisibility]);

  const currentSelectedValue = selectedValue || internalSelectedValue;

  const handleTimeSelect = (label: string) => {
    setInternalSelectedValue(label);
    setSelectedOption("");
    setIsFilterOpen(false);
    setShowVisibility(false);
    setIsExportOpen(false);
    setTimeLabel(label);
    if (onSearch) {
      onSearch(label);
    }
  };

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    if (option === "visibility") {
      setShowVisibility(true);
      setIsFilterOpen(false);
      setIsExportOpen(false);
    }
    if (option === "custom") {
      setIsFilterOpen(true);
      setShowVisibility(false);
      setIsExportOpen(false);
    }

    setInternalSelectedValue("");
  };

  const timeOptions = [
    { label: "Today", icon: CalendarCheck },
    { label: "Yesterday", icon: CalendarMinus },
    { label: "This Week", icon: CalendarClock },
    { label: "This Month", icon: CalendarSearch },
    { label: "This Year", icon: CalendarClock },
  ];

  return (
    <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={cn(
            "p-2 rounded-full text-gray-700 dark:text-gray-300 bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer hover:text-blue-500",
            isFilterOpen && "bg-gray-100 text-gray-500"
          )}
          aria-label="Filter"
        >
          <SlidersHorizontal size={16} />
        </button>
      </PopoverTrigger>

      {/* ⬇️ Wider popover content */}
      <PopoverContent className="min-w-[440px] p-3" align="end">
        <div className="grid grid-cols-2 gap-2">
          <div className="w-full flex justify-center items-center col-span-2">
            <Autocomplete
              inputClassName="h-[40px]"
              className="w-full"
              id="isDefault"
              name="isDefault"
              options={["test", "test2"]}
              onValueChange={(value: string) => {
                // Handle company selection
                console.log("Selected company:", value);
              }}
              placeholder=" "
              labelText="Company"
              styles={{
                input: {
                  borderColor: "var(--primary)",
                  "&:focus": {
                    borderColor: "var(--primary)",
                  },
                },
              }}
            />
          </div>

          {/* Time Filter Options */}
          {timeOptions.map((option) => {
            const IconComponent = option.icon;
            const isSelected = currentSelectedValue === option.label;

            return (
              <label
                key={option.label}
                className={cn(
                  "flex items-center gap-2 p-2 rounded-md text-sm font-medium transition-colors duration-200 cursor-pointer",
                  isSelected
                    ? "bg-primary text-white"
                    : "hover:bg-gray-50 dark:hover:bg-gray-700"
                )}
              >
                <input
                  type="radio"
                  name="timeFilter"
                  value={option.label}
                  checked={isSelected}
                  onChange={() => handleTimeSelect(option.label)}
                  className="w-4 h-4 text-white bg-primary border-white focus:ring-0 focus:ring-offset-0"
                />
                <IconComponent
                  className={cn(
                    "h-4 w-4",
                    isSelected
                      ? "text-white"
                      : "text-gray-600 dark:text-gray-400",
                    option.label === "This Year" && "rotate-90"
                  )}
                />
                <span
                  className={cn(
                    isSelected
                      ? "text-white"
                      : "text-gray-700 dark:text-gray-300"
                  )}
                >
                  {option.label}
                </span>
              </label>
            );
          })}

          {/* Custom Filter */}
          <label
            className={cn(
              "flex items-center gap-2 p-2 rounded-md text-sm font-medium transition-colors duration-200 cursor-pointer",
              selectedOption === "custom" && "bg-primary text-white"
            )}
          >
            <input
              type="radio"
              name="timeFilter"
              value="custom"
              checked={selectedOption === "custom" && isFilterOpen}
              onChange={() => {
                handleOptionSelect("custom");
              }}
              className="w-4 h-4 text-white bg-primary border-white focus:ring-0 focus:ring-offset-0"
            />
            <SlidersHorizontal className="h-4 w-4" />
            <span
              className={cn(
                selectedOption === "custom"
                  ? "text-white"
                  : "text-gray-700 dark:text-gray-300"
              )}
            >
              Custom
            </span>
          </label>

          {/* visibility */}
          {viewMode === "list" && (
            <label
              className={cn(
                "flex items-center gap-2 p-2 rounded-md text-sm font-medium transition-colors duration-200 cursor-pointer",
                selectedOption === "visibility" && "bg-primary text-white"
              )}
            >
              <input
                type="radio"
                name="timeFilter"
                value="visibility"
                checked={selectedOption === "visibility"}
                onChange={() => {
                  handleOptionSelect("visibility");
                }}
                className="w-4 h-4 text-white bg-primary border-white focus:ring-0 focus:ring-offset-0"
              />
              <SlidersHorizontal className="h-4 w-4" />
              <span
                className={cn(
                  selectedOption === "visibility"
                    ? "text-white"
                    : "text-gray-700 dark:text-gray-300"
                )}
              >
                Visibility
              </span>
            </label>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default SearchFilterPopover;
