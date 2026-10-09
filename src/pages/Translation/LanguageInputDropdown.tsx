// components/common/LanguageInputDropdown.tsx
import { useLanguageLabels } from "@/hooks/useLanguageLabels";
import type { RootState } from "@/store";
import { ActionIcon, Menu, TextInput, ScrollArea } from "@mantine/core";
import clsx from "clsx";
import { ChevronDown, ChevronUp, Languages } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface LanguageInputDropdownProps {
  onSubmit: (values: Record<string, string>) => void;
  title: string;
  initialValues?: Record<string, string>;
  className?: string;
}

const LANGUAGE_CONFIGS = [
  { code: "ar", name: "Arabic", nativeName: "العربية" },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी" },
  { code: "ur", name: "Urdu", nativeName: "اردو" },
  { code: "bn", name: "Bangla", nativeName: "বাংলা" },
  { code: "en", name: "English", nativeName: "English" },
  { code: "ar", name: "Arabic", nativeName: "العربية" },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी" },
  { code: "ur", name: "Urdu", nativeName: "اردو" },
  { code: "bn", name: "Bangla", nativeName: "বাংলা" },
  { code: "en", name: "English", nativeName: "English" },
];

export const LanguageInputDropdown = ({
  onSubmit,
  title,
  initialValues = {},
  className,
}: LanguageInputDropdownProps) => {
  const labels = useLanguageLabels();
  const { isRTL, currentLanguage } = useSelector(
    (state: RootState) => state.language
  );
  const [isOpen, setIsOpen] = useState(false);
  const [values, setValues] = useState<Record<string, string>>(initialValues);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);

  const [focusedInputs, setFocusedInputs] = useState<Record<string, boolean>>(
    {}
  );

  // Filter out the currently selected language
  const availableLanguages = LANGUAGE_CONFIGS.filter(
    (lang) => lang.code !== currentLanguage.code
  );

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

  const handleInputChange = (langCode: string, value: string) => {
    setValues((prev) => ({ ...prev, [langCode]: value }));
  };

  const handleKeyPress = (e: React.KeyboardEvent, currentIndex: number) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (currentIndex < availableLanguages.length - 1) {
        // Focus next input
        const nextInput = document.getElementById(
          `lang-input-${availableLanguages[currentIndex + 1].code}`
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

  return (
    <Menu
      shadow="md"
      radius={"lg"}
      width={300}
      opened={isOpen}
      onOpen={() => setIsOpen(true)}
      onClose={() => setIsOpen(false)}
    >
      <Menu.Target>
        {/* Language Icon Button */}
        <ActionIcon
          size="sm"
          variant="subtle"
          className={cn(
            "opacity-0 group-hover:opacity-100",
            isOpen && "opacity-100",
            className
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <Languages size={16} />
        </ActionIcon>
      </Menu.Target>

      {/* Dropdown */}
      <Menu.Dropdown className="!p-0">
        <div dir={isRTL ? "rtl" : "ltr"} className="h-[400px] flex flex-col">
          {/* Fixed Header */}
          <div className="flex-shrink-0 p-3 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {title}
              </h3>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-1 rounded"
              >
                {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </button>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 flex flex-col min-h-0">
            <ScrollArea className="flex-1" type="auto">
              <div className="p-3 space-y-3">
                {availableLanguages.map((lang, index) => (
                  <div key={lang.code} className="space-y-1 relative">
                    <TextInput
                      ref={index === 0 ? firstInputRef : undefined}
                      id={`lang-input-${lang.code}`}
                      placeholder={" "}
                      value={values[lang.code] || ""}
                      onChange={(e) =>
                        handleInputChange(lang.code, e.target.value)
                      }
                      onFocus={() =>
                        setFocusedInputs((prev) => ({
                          ...prev,
                          [lang.code]: true,
                        }))
                      }
                      onBlur={() =>
                        setFocusedInputs((prev) => ({
                          ...prev,
                          [lang.code]: false,
                        }))
                      }
                      onKeyPress={(e) => handleKeyPress(e, index)}
                      size="xs"
                      classNames={{
                        input: clsx(
                          "peer pt-6 pb-1 !min-h-[50px] !h-full !rounded-[12px] !flex !items-center !bg-[#f8fafc]",
                          {
                            "!border-primary !border-2":
                              focusedInputs[lang.code],
                          },
                          { disabled: "!border-gray-600 !cursor-not-allowed" }
                        ),
                      }}
                    />
                    <label
                      className={clsx(
                        "absolute left-1 px-2 text-base text-gray-800 dark:text-gray-400 bg-[#f8fafc] dark:bg-gray-900 transition-all duration-200 pointer-events-none",
                        {
                          "top-0 text-sm -translate-y-1/2 scale-75":
                            focusedInputs[lang.code] || values[lang.code],
                          "top-1/2 -translate-y-1/2":
                            !focusedInputs[lang.code] && !values[lang.code],
                          "text-primary": focusedInputs[lang.code],
                        }
                      )}
                    >
                      {`${lang.name} (${lang.nativeName})`}
                    </label>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Fixed Footer */}
            <div className="flex-shrink-0 p-3 border-t border-gray-200">
              <form onSubmit={handleSubmit}>
                <div className="flex gap-2 justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    onMouseDown={handleCancel}
                    size="sm"
                    className={`gap-2 text-primary rounded-full border-primary w-32 bg-sky-200 hover:bg-primary font-semibold!`}
                  >
                    {labels.cancel}
                  </Button>
                  <Button
                    type="submit"
                    size="sm"
                    variant="outline"
                    className={`gap-2 text-primary rounded-full border-primary w-32 bg-sky-200 hover:bg-primary font-semibold!`}
                  >
                    {labels.submit}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Menu.Dropdown>
    </Menu>
  );
};
