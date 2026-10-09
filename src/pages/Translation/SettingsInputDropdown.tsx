/* eslint-disable @typescript-eslint/no-explicit-any */
// components/common/SettingsInputDropdown.tsx
import { useLanguageLabels } from "@/hooks/useLanguageLabels";
import type { RootState } from "@/store";
import { TextInput, Textarea } from "@mantine/core";
import clsx from "clsx";
import { ChevronUp, Settings } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";

interface FieldSettings {
  tooltip: string;
  placeholder: string;
  validationMessage: string;
}

interface SettingsInputDropdownProps {
  onSubmit: (values: FieldSettings) => void;
  title: string;
  languageName: string;
  languageNativeName: string;
  initialValues?: FieldSettings;
}

export const SettingsInputDropdown = ({
  onSubmit,
  title,
  languageName,
  languageNativeName,
  initialValues = {
    tooltip: "",
    placeholder: "",
    validationMessage: "",
  },
}: SettingsInputDropdownProps) => {
  const labels = useLanguageLabels();
  const { isRTL } = useSelector((state: RootState) => state.language);
  const [isOpen, setIsOpen] = useState(false);
  const [values, setValues] = useState<FieldSettings>(initialValues);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);

  const [focusedInputs, setFocusedInputs] = useState<Record<string, boolean>>({
    tooltip: false,
    placeholder: false,
    validationMessage: false,
  });

  const fieldConfigs = [
    {
      key: "tooltip" as keyof FieldSettings,
      label: "Tooltip Text",
      type: "textarea",
      placeholder: "Enter tooltip text...",
    },
    {
      key: "placeholder" as keyof FieldSettings,
      label: "Placeholder Text",
      type: "input",
      placeholder: "Enter placeholder text...",
    },
    {
      key: "validationMessage" as keyof FieldSettings,
      label: "Validation Message",
      type: "textarea",
      placeholder: "Enter validation message...",
    },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Focus first input when dropdown opens
  useEffect(() => {
    if (isOpen && firstInputRef.current) {
      setTimeout(() => {
        firstInputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(values);
    setIsOpen(false);
  };

  const handleInputChange = (fieldKey: keyof FieldSettings, value: string) => {
    setValues((prev) => ({ ...prev, [fieldKey]: value }));
  };

  const handleKeyPress = (e: React.KeyboardEvent, currentIndex: number) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (currentIndex < fieldConfigs.length - 1) {
        // Focus next input
        const nextInput = document.getElementById(
          `settings-input-${fieldConfigs[currentIndex + 1].key}`
        );
        nextInput?.focus();
      } else {
        // Submit if on last input
        handleSubmit(e);
      }
    }
    if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  const handleCancel = () => {
    setValues(initialValues);
    setIsOpen(false);
  };

  const renderField = (config: (typeof fieldConfigs)[0], index: number) => {
    const { key, label, type } = config;
    const isTextarea = type === "textarea";

    const commonProps = {
      id: `settings-input-${key}`,
      placeholder: " ",
      value: values[key] || "",
      onChange: (e: any) => handleInputChange(key, e.target.value),
      onFocus: () =>
        setFocusedInputs((prev) => ({
          ...prev,
          [key]: true,
        })),
      onBlur: () =>
        setFocusedInputs((prev) => ({
          ...prev,
          [key]: false,
        })),
      onKeyPress: (e: React.KeyboardEvent) => handleKeyPress(e, index),
      size: "xs" as const,
      classNames: {
        input: clsx(
          "peer pt-6 pb-2 !min-h-[50px] !rounded-[12px] !flex !items-start !bg-[#f8fafc]",
          {
            "!border-primary !border-2": focusedInputs[key],
            "!min-h-[20px]": isTextarea, // Extra height for textarea
          }
        ),
      },
    };

    return (
      <div key={key} className="space-y-1 relative">
        {isTextarea ? (
          <Textarea {...commonProps} autosize minRows={2} maxRows={4} />
        ) : (
          <TextInput
            ref={index === 0 ? firstInputRef : undefined}
            {...commonProps}
          />
        )}
        <label
          className={clsx(
            "absolute left-1 px-2 text-base text-gray-800 dark:text-gray-400 bg-[#f8fafc] dark:bg-gray-900 transition-all duration-200 pointer-events-none",
            {
              "top-0 text-sm -translate-y-1/2 scale-75":
                focusedInputs[key] || values[key],
              "top-1/2 -translate-y-1/2": !focusedInputs[key] && !values[key],
              "text-primary": focusedInputs[key],
              "!top-4": isTextarea && !focusedInputs[key] && !values[key], // Adjust for textarea
            }
          )}
        >
          {label}
        </label>
      </div>
    );
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Settings Icon Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="p-1 text-gray-50 hover:text-gray-700 transition-colors rounded-full hover:bg-gray-100 cursor-pointer"
        title="Field settings"
      >
        <Settings size={12} />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div
          className={`absolute top-full mt-1 w-96 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg z-99990 ${
            isRTL ? "right-0" : "left-0"
          }`}
        >
          {/* Header */}
          <div className="px-4 py-3 border-b border-gray-200 bg-gray-50 rounded-t-lg z-[99990]">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-300">
                {title} - {languageName} ({languageNativeName})
              </h3>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-1 rounded"
              >
                <ChevronUp size={14} />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              {fieldConfigs.map((config, index) => renderField(config, index))}

              {/* Footer Actions */}
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                  size="sm"
                  className="flex-1 gap-2 text-gray-700 rounded-md border-gray-300 bg-white hover:bg-gray-50 font-medium"
                >
                  {labels.cancel || "Cancel"}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 gap-2 text-white rounded-md font-medium"
                >
                  {labels.submit || "Save Changes"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
