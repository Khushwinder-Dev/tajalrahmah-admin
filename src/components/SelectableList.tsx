// components/ui/SelectableList.tsx
import { Check } from "lucide-react";

export interface SelectableListItem {
  value: string;
  label: string;
  shortLabel?: string;
  description?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

interface SelectableListProps {
  items: SelectableListItem[];
  selectedValue?: string;
  onItemSelect: (value: string) => void;
  className?: string;
  showIcons?: boolean;
  showDescriptions?: boolean;
}

const SelectableList = ({
  items,
  selectedValue,
  onItemSelect,
  className = "",
  showIcons = false,
  showDescriptions = true,
}: SelectableListProps) => {
  return (
    <div className={className}>
      {items.map((item) => (
        <button
          key={item.value}
          onClick={() => !item.disabled && onItemSelect(item.value)}
          disabled={item.disabled}
          className={`w-full text-left px-4 py-3 text-base hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer flex items-center justify-between border-b border-gray-100 dark:border-gray-700 last:border-b-0 disabled:opacity-50 disabled:cursor-not-allowed ${
            item.value === selectedValue
              ? "text-blue-600 dark:text-blue-400 font-medium bg-blue-50 dark:bg-blue-900/20"
              : "text-gray-700 dark:text-gray-300"
          }`}
        >
          <div className="flex items-center flex-1">
            {showIcons && item.icon && (
              <div className="mr-3 flex-shrink-0">{item.icon}</div>
            )}
            <div className="flex flex-col">
              <span className="font-medium">
                {item.shortLabel || item.label}
              </span>
              {showDescriptions && item.description && (
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {item.description}
                </span>
              )}
            </div>
          </div>
          {item.value === selectedValue && (
            <Check
              size={20}
              className="text-blue-600 dark:text-blue-400 ml-2 flex-shrink-0"
            />
          )}
        </button>
      ))}
    </div>
  );
};

export default SelectableList;
