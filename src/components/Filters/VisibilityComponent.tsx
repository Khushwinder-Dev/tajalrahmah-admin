/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface VisibilityComponentProps {
  data: any[];
  onReset: () => void;
  onApply: () => void;
}

// Custom Switch Component
const Switch = ({
  checked,
  onCheckedChange,
  disabled = false,
}: {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
}) => {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => onCheckedChange(!checked)}
      className={`
        relative inline-flex h-6 w-11 items-center rounded-full transition-colors
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        ${checked ? "bg-[#20B7FA]" : "bg-gray-300 dark:bg-gray-600"}
        ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
      `}
    >
      <span
        className={`
          inline-block h-4 w-4 transform rounded-full transition-transform
          ${checked ? "translate-x-6 bg-[#BCE5F6]" : "translate-x-1 bg-white"}
        `}
      />
    </button>
  );
};

export default function VisibilityComponent({
  data,
}: //   onReset,
//   onApply,
VisibilityComponentProps) {
  const [search, setSearch] = useState("");
  const [visibleFields, setVisibleFields] = useState<Set<string>>(new Set());

  const filterableFields = useMemo(() => {
    if (data.length === 0) return [];
    return Object.keys(data[0]).filter((key) => key !== "id");
  }, [data]);

  // Initialize with all fields visible
  useState(() => {
    setVisibleFields(new Set(filterableFields));
  });

  const handleFieldToggle = (field: string, visible: boolean) => {
    setVisibleFields((prev) => {
      const updated = new Set(prev);
      if (visible) {
        updated.add(field);
      } else {
        updated.delete(field);
      }
      return updated;
    });
  };

  const handleToggleAll = (visible: boolean) => {
    setVisibleFields(visible ? new Set(filterableFields) : new Set());
  };

  return (
    <div className="h-full flex flex-col">
      {/* Search */}
      <div className="p-3 border-b flex-shrink-0">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search fields..."
            className="pl-10 h-9 rounded-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3">
        {/* Toggle All */}
        <div className="flex items-center justify-between font-medium pb-2 border-b">
          <span className="text-gray-900 dark:text-gray-100">Show All</span>
          <Switch
            checked={visibleFields.size === filterableFields.length}
            onCheckedChange={handleToggleAll}
          />
        </div>

        {/* Fields */}
        {filterableFields
          .filter((field) => field.toLowerCase().includes(search.toLowerCase()))
          .map((field) => (
            <div
              key={field}
              className="flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-800 rounded px-2 py-2"
            >
              <span className="text-sm text-gray-700 dark:text-gray-300 capitalize flex-1">
                {field}
              </span>
              <Switch
                checked={visibleFields.has(field)}
                onCheckedChange={(checked) => handleFieldToggle(field, checked)}
              />
            </div>
          ))}
      </div>
    </div>
  );
}
