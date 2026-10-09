/* eslint-disable @typescript-eslint/no-explicit-any */
// components/translation/TranslationTable.tsx
import { useState, useEffect, useRef } from "react";
import {
  Table,
  TextInput,
  Textarea, // Added Textarea import
  ScrollArea,
  Text,
  ActionIcon,
  Loader,
} from "@mantine/core";
import { Button as ShadcnButton } from "@/components/ui/button";
import { X, Search, Mic } from "lucide-react";
import { SettingsInputDropdown } from "./SettingsInputDropdown";
// import { translateToMultipleLanguages } from "@/services/translationService";
import { useDebouncedValue } from "@mantine/hooks";
// import { translateToMultipleLanguages } from "@/services/awsTranslationService";
import { translateToMultipleLanguages } from "@/services/freeTranslationService";

interface Language {
  code: string;
  name: string;
  nativeName: string;
}

interface FieldSettings {
  tooltip: string;
  placeholder: string;
  validationMessage: string;
}

interface TranslationField {
  id: string;
  label: string;
  translations: Record<string, string>; // language code -> translation (including 'en' for English)
  settings?: Record<string, FieldSettings>; // language code -> field settings
}

interface TranslationTableProps {
  moduleId?: string;
  subModuleId?: string;
  moduleName?: string;
  subModuleName?: string;
  onTranslationChange?: (
    fieldId: string,
    languageCode: string,
    value: string
  ) => void;
  onSettingsChange?: (
    fieldId: string,
    languageCode: string,
    settings: FieldSettings
  ) => void;
  onAddField?: (label: string) => void;
  onRemoveField?: (fieldId: string) => void;
  className?: string;
}

const TranslationTable = ({
  moduleId,
  subModuleId,
  moduleName,
  subModuleName,
  onTranslationChange,
  onSettingsChange,
  onAddField,
  onRemoveField,
  className = "",
}: TranslationTableProps) => {
  // Available languages in the specified order: English, Arabic, Bangla, Urdu, Hindi
  const [languages] = useState<Language[]>([
    { code: "en", name: "English", nativeName: "English" },
    { code: "ar", name: "Arabic", nativeName: "العربية" },
    { code: "bn", name: "Bangla", nativeName: "বাংলা" },
    { code: "ur", name: "Urdu", nativeName: "اردو" },
    { code: "hi", name: "Hindi", nativeName: "हিংদী" },
  ]);

  // Translation loading state
  const [isTranslating, setIsTranslating] = useState(false);

  // Default field sets for different modules/sub-modules
  const getDefaultFields = (
    moduleId: string,
    subModuleId?: string
  ): TranslationField[] => {
    // Customer fields
    const customerFields = [
      { id: "customer_no", label: "Customer No" },
      { id: "customer_name", label: "Customer Name" },
      { id: "short_name", label: "Short Name" },
      { id: "vat_number", label: "VAT Number" },
      { id: "vendor_code", label: "Vendor Code" },
      { id: "currency", label: "Currency" },
      { id: "phone", label: "Phone" },
      { id: "fax", label: "Fax" },
      { id: "mobile", label: "Mobile" },
      { id: "whatsapp", label: "Whatsapp" },
      { id: "country", label: "Country" },
      { id: "state", label: "State" },
      { id: "city", label: "City" },
      { id: "post_code", label: "Post Code" },
      { id: "address", label: "Address" },
      { id: "email", label: "Email" },
      { id: "website", label: "Website" },
      { id: "language", label: "Language" },
      { id: "location_url", label: "Location URL" },
      { id: "payment_mode", label: "Payment Mode" },
    ];

    // Quotation fields
    const quotationFields = [
      { id: "document_number", label: "Document Number" },
      { id: "quotation_number", label: "Quotation Number" },
      { id: "quotation_date", label: "Quotation Date" },
      { id: "customer", label: "Customer" },
      { id: "vat_number", label: "VAT Number" },
      { id: "payment_mode", label: "Payment Mode" },
      { id: "due_days", label: "Due Days" },
      { id: "payment_date", label: "Payment Date" },
      { id: "country", label: "Country" },
      { id: "state", label: "State" },
      { id: "city", label: "City" },
      { id: "remarks", label: "Remarks" },
      { id: "sales_man", label: "Sales Man" },
    ];

    // Default fields for other modules
    const defaultFields = [
      { id: "code", label: "Code" },
      { id: "name", label: "Name" },
      { id: "status", label: "Status" },
      { id: "created_date", label: "Created Date" },
      { id: "last_updated", label: "Last Updated" },
    ];

    let fieldsToUse = defaultFields;

    if (moduleId === "sales") {
      if (subModuleId === "sales-customer") {
        fieldsToUse = customerFields;
      } else if (subModuleId === "sales-order") {
        fieldsToUse = quotationFields;
      } else if (!subModuleId) {
        const combinedFields = [...customerFields, ...quotationFields];
        const uniqueFields = combinedFields.filter(
          (field, index, self) =>
            index === self.findIndex((f) => f.id === field.id)
        );
        fieldsToUse = uniqueFields;
      }
    }

    return fieldsToUse.map((field) => ({
      ...field,
      translations: languages.reduce(
        (acc, lang) => ({
          ...acc,
          [lang.code]: lang.code === "en" ? field.label : "",
        }),
        {}
      ),
      settings: languages.reduce(
        (acc, lang) => ({
          ...acc,
          [lang.code]: {
            tooltip: "",
            placeholder: getDefaultPlaceholder(lang.code),
            validationMessage: "",
          },
        }),
        {}
      ),
    }));
  };

  const [fields, setFields] = useState<TranslationField[]>([]);
  const [filteredFields, setFilteredFields] = useState<TranslationField[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  // New row state
  const [newRowTranslations, setNewRowTranslations] = useState<
    Record<string, string>
  >({});

  // New row settings state
  const [newRowSettings, setNewRowSettings] = useState<
    Record<string, FieldSettings>
  >({});

  // Error state for English label validation
  const [englishLabelError, setEnglishLabelError] = useState<string>("");

  // Navigation state
  const [focusPosition, setFocusPosition] = useState<{
    fieldIndex: number;
    languageIndex: number;
    isNewRow?: boolean;
  } | null>(null);

  // Search focus state
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Hover state for action buttons (only for action cells)
  const [hoveredActionCell, setHoveredActionCell] = useState<string | null>(
    null
  );

  // Focus state and change tracking for showing cross icons
  const [inputStates, setInputStates] = useState<
    Record<
      string,
      { isFocused: boolean; hasChanged: boolean; originalValue: string }
    >
  >({});

  // Refs for input elements and container
  const inputRefs = useRef<{
    [key: string]: HTMLInputElement | HTMLTextAreaElement | null;
  }>({});
  const containerRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  // Debounced value for English input to trigger translation
  const [debouncedEnglishText] = useDebouncedValue(
    newRowTranslations.en || "",
    1000
  );

  // Helper function to get language locale for keyboard input
  const getLanguageLocale = (languageCode: string) => {
    const localeMap: Record<string, string> = {
      en: "en-US",
      ar: "ar-SA", // Arabic (Saudi Arabia)
      bn: "bn-BD", // Bangla (Bangladesh)
      ur: "ur-PK", // Urdu (Pakistan)
      hi: "hi-IN", // Hindi (India)
    };
    return localeMap[languageCode] || "en-US";
  };

  // Helper function to get input method for different languages
  const getInputMode = (languageCode: string) => {
    const inputModeMap: Record<string, string> = {
      en: "text",
      ar: "text",
      bn: "text",
      ur: "text",
      hi: "text",
    };
    return inputModeMap[languageCode] || "text";
  };

  // Helper function to set keyboard language
  const setKeyboardLanguage = (
    languageCode: string,
    inputElement: HTMLInputElement | HTMLTextAreaElement
  ) => {
    try {
      // Set the lang attribute for better language detection
      inputElement.setAttribute("lang", getLanguageLocale(languageCode));

      // Set inputmode for mobile keyboards
      inputElement.setAttribute("inputmode", getInputMode(languageCode));

      // For supported browsers, try to set the input method
      if ("inputMode" in inputElement) {
        (inputElement as any).inputMode = getInputMode(languageCode);
      }

      // Experimental: Try to suggest input method (limited browser support)
      if (
        "webkitInputMethodContext" in inputElement ||
        "mozInputMethod" in inputElement
      ) {
        const locale = getLanguageLocale(languageCode);
        try {
          // This is experimental and may not work in all browsers
          inputElement.setAttribute("data-preferred-ime", locale);
        } catch (error) {
          console.log("IME setting not supported:", error);
        }
      }

      // For mobile devices, set additional attributes
      if (/Mobi|Android/i.test(navigator.userAgent)) {
        inputElement.setAttribute(
          "autocapitalize",
          languageCode === "en" ? "sentences" : "none"
        );
        inputElement.setAttribute("autocomplete", "off");
        inputElement.setAttribute(
          "spellcheck",
          languageCode === "en" ? "true" : "false"
        );
      }
    } catch (error) {
      console.log("Error setting keyboard language:", error);
    }
  };

  // Helper function to get default placeholder
  const getDefaultPlaceholder = (languageCode: string) => {
    if (moduleName === "Messages") {
      const messagePlaceholders: Record<string, string> = {
        en: "Enter message content...",
        bn: "বার্তার বিষয়বস্তু লিখুন...",
        ar: "أدخل محتوى الرسالة...",
        ur: "پیغام کا مواد داخل کریں...",
        hi: "संदेश सामग्री दर्ज करें...",
      };
      return messagePlaceholders[languageCode] || "Enter message content...";
    }

    const placeholders: Record<string, string> = {
      en: "Enter English label...",
      bn: "বাংলা অনুবাদ...",
      ar: "الترجمة العربية...",
      ur: "اردو ترجمہ...",
      hi: "हिংदী अनुवाद...",
    };
    return placeholders[languageCode] || "Enter translation...";
  };

  // Auto-translate when English text changes in new row
  useEffect(() => {
    const translateEnglishText = async () => {
      if (debouncedEnglishText && debouncedEnglishText.trim().length > 2) {
        setIsTranslating(true);

        try {
          const result = await translateToMultipleLanguages(
            debouncedEnglishText.trim()
          );

          console.log("result translateToMultipleLanguages", result);

          if (result.success) {
            setNewRowTranslations((prev) => ({
              ...prev,
              ar: result.translations.arabic,
              hi: result.translations.hindi,
              bn: result.translations.bangla,
              ur: result.translations.urdu,
            }));
          } else {
            console.error("Translation failed:", result.error);
          }
        } catch (error) {
          console.error("Translation error:", error);
        } finally {
          setIsTranslating(false);
        }
      }
    };

    translateEnglishText();
  }, [debouncedEnglishText]);

  // Update fields based on selected module/submodule
  useEffect(() => {
    if (moduleId) {
      const defaultFields = getDefaultFields(moduleId, subModuleId);
      setFields(defaultFields);
      console.log(`Loading fields for ${moduleId}/${subModuleId || "all"}`);
    }
  }, [moduleId, subModuleId]);

  // Filter fields based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredFields(fields);
    } else {
      const filtered = fields.filter((field) =>
        field.translations.en?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredFields(filtered);
    }
  }, [fields, searchQuery]);

  // Focus input when position changes
  useEffect(() => {
    if (focusPosition && !isSearchFocused) {
      const { fieldIndex, languageIndex, isNewRow } = focusPosition;

      if (isNewRow) {
        const language = languages[languageIndex];
        if (language) {
          const inputKey = `new-row-${language.code}`;
          const inputElement = inputRefs.current[inputKey];
          if (inputElement) {
            // Set keyboard language before focusing
            setKeyboardLanguage(language.code, inputElement);
            inputElement.focus();
          }
        }
      } else {
        const field = filteredFields[fieldIndex];
        const language = languages[languageIndex];

        if (field && language) {
          const inputKey = `${field.id}-${language.code}`;
          const inputElement = inputRefs.current[inputKey];
          if (inputElement) {
            // Set keyboard language before focusing
            setKeyboardLanguage(language.code, inputElement);
            inputElement.focus();
          }
        }
      }
    }
  }, [focusPosition, filteredFields, languages, isSearchFocused]);

  // Handle clicks outside of inputs to remove focus
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      if (containerRef.current && containerRef.current.contains(target)) {
        const isInputClick =
          target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.closest("input") ||
          target.closest("textarea") ||
          target.closest("[data-input]");

        const isSearchClick = searchRef.current?.contains(target);

        if (!isInputClick && !isSearchClick) {
          setFocusPosition(null);
          setIsSearchFocused(false);
        }
      } else {
        setFocusPosition(null);
        setIsSearchFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Helper function to get input state key
  const getInputStateKey = (
    fieldId: string | null,
    languageCode: string,
    isNewRow: boolean = false
  ) => {
    return isNewRow ? `new-row-${languageCode}` : `${fieldId}-${languageCode}`;
  };

  // Helper function to check if cross icon should be shown
  const shouldShowCrossIcon = (
    fieldId: string | null,
    languageCode: string,
    isNewRow: boolean = false
  ) => {
    const key = getInputStateKey(fieldId, languageCode, isNewRow);
    const state = inputStates[key];
    return state?.isFocused && state?.hasChanged;
  };

  // Helper function to check if loader should be shown
  const shouldShowLoader = (
    languageCode: string,
    isNewRow: boolean = false
  ) => {
    return (
      isNewRow &&
      isTranslating &&
      languageCode !== "en" &&
      debouncedEnglishText.trim().length > 2
    );
  };

  // Update input state
  const updateInputState = (
    key: string,
    updates: Partial<(typeof inputStates)[string]>
  ) => {
    setInputStates((prev: any) => ({
      ...prev,
      [key]: { ...prev[key], ...updates },
    }));
  };

  // Handle settings change from SettingsInputDropdown
  const handleSettingsSubmit = (
    fieldId: string | null,
    languageCode: string,
    isNewRow: boolean,
    settings: FieldSettings
  ) => {
    if (isNewRow) {
      setNewRowSettings((prev: any) => ({
        ...prev,
        [languageCode]: settings,
      }));
    } else if (fieldId) {
      setFields((prev: any) =>
        prev.map((field: any) =>
          field.id === fieldId
            ? {
                ...field,
                settings: {
                  ...field.settings,
                  [languageCode]: settings,
                },
              }
            : field
        )
      );
      onSettingsChange?.(fieldId, languageCode, settings);
    }
  };

  // Get current placeholder (from settings or default)
  const getCurrentPlaceholder = (
    fieldId: string | null,
    languageCode: string,
    isNewRow: boolean = false
  ) => {
    if (isNewRow) {
      return (
        newRowSettings[languageCode]?.placeholder ||
        getDefaultPlaceholder(languageCode)
      );
    }

    const field = fields.find((f) => f.id === fieldId);
    return (
      field?.settings?.[languageCode]?.placeholder ||
      getDefaultPlaceholder(languageCode)
    );
  };

  // Get current settings for a field/language
  const getCurrentSettings = (
    fieldId: string | null,
    languageCode: string,
    isNewRow: boolean = false
  ): FieldSettings => {
    if (isNewRow) {
      return (
        newRowSettings[languageCode] || {
          tooltip: "",
          placeholder: getDefaultPlaceholder(languageCode),
          validationMessage: "",
        }
      );
    }

    const field = fields.find((f) => f.id === fieldId);
    return (
      field?.settings?.[languageCode] || {
        tooltip: "",
        placeholder: getDefaultPlaceholder(languageCode),
        validationMessage: "",
      }
    );
  };

  // Validate English label
  const validateEnglishLabel = () => {
    const englishValue = newRowTranslations.en?.trim();
    if (!englishValue) {
      setEnglishLabelError("English label is required");
      return false;
    }
    setEnglishLabelError("");
    return true;
  };

  const handleTranslationChange = (
    fieldId: string,
    languageCode: string,
    value: string
  ) => {
    setFields((prev) =>
      prev.map((field) =>
        field.id === fieldId
          ? {
              ...field,
              translations: {
                ...field.translations,
                [languageCode]: value,
              },
            }
          : field
      )
    );

    // Update input state to track changes
    const key = getInputStateKey(fieldId, languageCode);
    const currentState = inputStates[key];
    const hasChanged = currentState
      ? value !== currentState.originalValue
      : value !== "";
    updateInputState(key, { hasChanged });

    onTranslationChange?.(fieldId, languageCode, value);
  };

  // Handle new row translation changes
  const handleNewRowTranslationChange = (
    languageCode: string,
    value: string
  ) => {
    setNewRowTranslations((prev: any) => ({
      ...prev,
      [languageCode]: value,
    }));

    // Clear error when user starts typing in English field
    if (languageCode === "en" && englishLabelError) {
      setEnglishLabelError("");
    }

    // Update input state for new row
    const key = getInputStateKey(null, languageCode, true);
    const hasChanged = value !== "";
    updateInputState(key, { hasChanged });
  };

  // Handle adding new field from the inserting row
  const handleAddNewField = () => {
    if (!validateEnglishLabel()) {
      // Focus back to English input
      setFocusPosition({
        fieldIndex: 0,
        languageIndex: 0,
        isNewRow: true,
      });
      return;
    }

    const englishLabel = newRowTranslations.en!.trim();
    const newField: TranslationField = {
      id: `field_${Date.now()}`,
      label: englishLabel,
      translations: { ...newRowTranslations },
      settings: { ...newRowSettings },
    };

    // Add the new field to the beginning of the list
    setFields((prev) => [newField, ...prev]);
    onAddField?.(englishLabel);

    // Clear the new row
    setNewRowTranslations({});
    setNewRowSettings({});

    // Clear input states for new row
    languages.forEach((lang) => {
      const key = getInputStateKey(null, lang.code, true);
      updateInputState(key, { hasChanged: false, originalValue: "" });
    });

    // Focus back to English input for continuous adding
    setFocusPosition({
      fieldIndex: 0,
      languageIndex: 0,
      isNewRow: true,
    });
  };

  const handleRemoveField = (fieldId: string) => {
    setFields((prev) => prev.filter((field) => field.id !== fieldId));
    onRemoveField?.(fieldId);
  };

  // Handle clearing the inserting row
  const handleClearInsertingRow = () => {
    setNewRowTranslations({});
    setNewRowSettings({});
    setEnglishLabelError("");

    // Clear input states for new row
    languages.forEach((lang) => {
      const key = getInputStateKey(null, lang.code, true);
      updateInputState(key, { hasChanged: false, originalValue: "" });
    });

    setFocusPosition(null);
  };

  const getLanguageDirection = (languageCode: string) => {
    return ["ar", "ur"].includes(languageCode) ? "rtl" : "ltr";
  };

  const getPlaceholder = (
    fieldId: string | null,
    languageCode: string,
    isNewRow: boolean = false
  ) => {
    return getCurrentPlaceholder(fieldId, languageCode, isNewRow);
  };

  // Handle search focus
  const handleSearchFocus = () => {
    setIsSearchFocused(true);
    setFocusPosition(null);
  };

  const handleSearchBlur = () => {
    setIsSearchFocused(false);
  };

  // Handle clearing search
  const handleClearSearch = () => {
    setSearchQuery("");
  };

  // Handle clearing input
  const handleClearInput = (fieldId: string, languageCode: string) => {
    handleTranslationChange(fieldId, languageCode, "");
  };

  // Handle clearing new row input
  const handleClearNewRowInput = (languageCode: string) => {
    handleNewRowTranslationChange(languageCode, "");
  };

  // Handle voice search (placeholder function)
  const handleVoiceSearch = () => {
    console.log("Voice search initiated");
  };

  // Handle keyboard navigation
  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
    fieldIndex: number,
    languageIndex: number,
    isNewRow: boolean = false
  ) => {
    const { key } = event;

    // Handle Enter key
    if (key === "Enter") {
      event.preventDefault();

      // For new row, validate English input before moving
      if (isNewRow && languageIndex === 0) {
        // English column
        if (!validateEnglishLabel()) {
          return; // Don't move to next input
        }
      }

      // If it's the last language column, create new row (for new row) or move to next row (for existing rows)
      if (languageIndex === languages.length - 1) {
        if (isNewRow && newRowTranslations.en?.trim()) {
          handleAddNewField();
          return;
        } else if (!isNewRow) {
          // Move to next row, first column
          if (fieldIndex < filteredFields.length - 1) {
            setFocusPosition({
              fieldIndex: fieldIndex + 1,
              languageIndex: 0,
              isNewRow: false,
            });
          }
          return;
        }
      } else {
        // Move to next column in the same row
        setFocusPosition({
          fieldIndex,
          languageIndex: languageIndex + 1,
          isNewRow,
        });
        return;
      }
    }

    // Handle Tab for next input focus
    if (key === "Tab") {
      event.preventDefault();

      // For new row English field, validate before moving
      if (isNewRow && languageIndex === 0) {
        if (!validateEnglishLabel()) {
          return;
        }
      }

      let newFieldIndex = fieldIndex;
      let newLanguageIndex = languageIndex + 1;
      let newIsNewRow = isNewRow;

      // Move to next row if at end of current row
      if (newLanguageIndex >= languages.length) {
        newLanguageIndex = 0;
        if (isNewRow) {
          newFieldIndex = 0;
          newIsNewRow = false;
        } else {
          newFieldIndex = fieldIndex + 1;
        }
      }

      // Don't go beyond last field (if not in new row)
      if (!newIsNewRow && newFieldIndex >= filteredFields.length) {
        return;
      }

      setFocusPosition({
        fieldIndex: newFieldIndex,
        languageIndex: newLanguageIndex,
        isNewRow: newIsNewRow,
      });
      return;
    }

    // Handle Escape to remove focus or clear inserting row
    if (key === "Escape") {
      if (isNewRow) {
        handleClearInsertingRow();
      } else {
        setFocusPosition(null);
      }
      return;
    }

    // Handle arrow keys
    if (!["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(key)) {
      return;
    }

    event.preventDefault();

    let newFieldIndex = fieldIndex;
    let newLanguageIndex = languageIndex;
    let newIsNewRow = isNewRow;

    switch (key) {
      case "ArrowUp":
        if (isNewRow) {
          return;
        }
        newFieldIndex = Math.max(0, fieldIndex - 1);
        break;
      case "ArrowDown":
        if (isNewRow) {
          if (filteredFields.length > 0) {
            newFieldIndex = 0;
            newIsNewRow = false;
          }
        } else {
          newFieldIndex = Math.min(filteredFields.length - 1, fieldIndex + 1);
        }
        break;
      case "ArrowLeft":
        newLanguageIndex = Math.max(0, languageIndex - 1);
        break;
      case "ArrowRight":
        newLanguageIndex = Math.min(languages.length - 1, languageIndex + 1);
        break;
    }

    setFocusPosition({
      fieldIndex: newFieldIndex,
      languageIndex: newLanguageIndex,
      isNewRow: newIsNewRow,
    });
  };

  // Handle input focus
  const handleInputFocus = (
    fieldId: string | null,
    languageCode: string,
    fieldIndex: number,
    languageIndex: number,
    isNewRow: boolean = false
  ) => {
    if (!isSearchFocused) {
      setFocusPosition({ fieldIndex, languageIndex, isNewRow });
    }

    // Update input state
    const key = getInputStateKey(fieldId, languageCode, isNewRow);
    const currentValue = isNewRow
      ? newRowTranslations[languageCode] || ""
      : fieldId
      ? fields.find((f) => f.id === fieldId)?.translations[languageCode] || ""
      : "";

    updateInputState(key, {
      isFocused: true,
      originalValue: inputStates[key]?.originalValue ?? currentValue,
    });

    // Set keyboard language when focus is gained
    const inputElement = inputRefs.current[key];
    if (inputElement) {
      setKeyboardLanguage(languageCode, inputElement);
    }
  };

  // Handle input blur
  const handleInputBlur = (
    fieldId: string | null,
    languageCode: string,
    isNewRow: boolean = false
  ) => {
    setTimeout(() => {
      const activeElement = document.activeElement;
      const isInputActive =
        activeElement?.tagName === "INPUT" ||
        activeElement?.tagName === "TEXTAREA";

      if (!isInputActive || isSearchFocused) {
        setFocusPosition(null);
      }

      // Update input state
      const key = getInputStateKey(fieldId, languageCode, isNewRow);
      updateInputState(key, { isFocused: false });
    }, 100);
  };

  // Set input ref
  const setInputRef = (
    key: string,
    element: HTMLInputElement | HTMLTextAreaElement | null
  ) => {
    inputRefs.current[key] = element;

    // Set keyboard language attributes when ref is set
    if (element) {
      const languageCode = key.split("-").pop();
      if (
        languageCode &&
        languages.find((lang) => lang.code === languageCode)
      ) {
        setKeyboardLanguage(languageCode, element);
      }
    }
  };

  if (!moduleId) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        <div className="text-center">
          <Text size="lg" className="mb-2">
            No module selected
          </Text>
          <Text size="sm">
            Select a module from the left sidebar to start adding translations.
          </Text>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col h-full ${className}`} ref={containerRef}>
      {/* Header - Fixed */}
      <div className="flex-shrink-0 mb-4">
        <div className="flex items-center justify-between gap-4">
          {/* Left: Title */}
          <div className="flex-shrink-0">
            <Text size="lg" fw={600} className="mb-1">
              {subModuleName ? `${moduleName} - ${subModuleName}` : moduleName}
            </Text>
            <Text size="sm" className="text-gray-600">
              Manage translations for this{" "}
              {subModuleName ? "sub-module" : "module"}
            </Text>
          </div>

          {/* Center: Search Bar */}
          <div className="flex-shrink-0 w-80">
            <div className="relative w-full" ref={searchRef}>
              <TextInput
                placeholder="Search English labels..."
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.currentTarget.value)}
                onFocus={handleSearchFocus}
                onBlur={handleSearchBlur}
                className="w-full"
                leftSection={<Search size={18} className="text-gray-400" />}
                rightSection={
                  <div className="flex items-center gap-1 pr-2">
                    {searchQuery && (
                      <ActionIcon
                        size="xs"
                        variant="subtle"
                        onClick={handleClearSearch}
                        className="text-black! hover:text-gray-600"
                      >
                        <X size={14} />
                      </ActionIcon>
                    )}
                    <ActionIcon
                      size="xs"
                      variant="subtle"
                      onClick={handleVoiceSearch}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <Mic size={14} />
                    </ActionIcon>
                  </div>
                }
                styles={{
                  input: {
                    borderRadius: "20px",
                    border: isSearchFocused
                      ? "1px solid var(--primary)"
                      : "1px solid #d1d5db",
                    boxShadow: isSearchFocused
                      ? "0 0 0 1px var(--primary)"
                      : "none",
                    paddingLeft: "2.5rem",
                    paddingRight: "3rem",
                  },
                }}
              />
            </div>
          </div>

          {/* Right: Add Button */}
          <div className="flex-shrink-0">
            <ShadcnButton
              size="sm"
              variant="outline"
              className="rounded-full w-32 h-10 gap-2"
              onClick={handleAddNewField}
            >
              <Text size="md" fw={500}>
                Add
              </Text>
            </ShadcnButton>
          </div>
        </div>
      </div>

      {/* Error message for English label */}
      {englishLabelError && (
        <div className="flex-shrink-0 mb-2">
          <Text size="sm" className="text-red-600">
            {englishLabelError}
          </Text>
        </div>
      )}

      {/* Table Container - Scrollable */}
      <div className="flex-1 flex flex-col min-h-0">
        <ScrollArea className="flex-1" type="auto" scrollbars="xy">
          <Table
            striped
            highlightOnHover
            withTableBorder
            withColumnBorders
            className="min-w-max relative"
          >
            <Table.Thead className="sticky top-0 z-10 bg-white">
              <Table.Tr>
                {languages.map((language) => (
                  <Table.Th
                    key={language.code}
                    className={`${
                      moduleName === "Messages"
                        ? "min-w-[500px]"
                        : "min-w-[250px]"
                    } bg-gray-50`}
                    style={{ zIndex: 1 }}
                  >
                    <div className="text-center">
                      <Text fw={600} size="sm">
                        {language.name}
                      </Text>
                    </div>
                  </Table.Th>
                ))}
                <Table.Th className="min-w-[80px] bg-gray-50 sticky right-0 z-20 border-l-2 border-gray-300">
                  <div className="flex justify-center">
                    <Text fw={600} size="sm">
                      Actions
                    </Text>
                  </div>
                </Table.Th>
              </Table.Tr>
            </Table.Thead>

            <Table.Tbody>
              {/* Inserting Row - Always show */}
              <Table.Tr className="bg-blue-50">
                {languages.map((language, languageIndex) => (
                  <Table.Td key={language.code}>
                    <div className="relative">
                      {moduleName === "Messages" ? (
                        <Textarea
                          ref={(element) =>
                            setInputRef(`new-row-${language.code}`, element)
                          }
                          value={newRowTranslations[language.code] || ""}
                          onChange={(event) =>
                            handleNewRowTranslationChange(
                              language.code,
                              event.currentTarget.value
                            )
                          }
                          onKeyDown={(event) =>
                            handleKeyDown(event, 0, languageIndex, true)
                          }
                          onFocus={() =>
                            handleInputFocus(
                              null,
                              language.code,
                              0,
                              languageIndex,
                              true
                            )
                          }
                          onBlur={() =>
                            handleInputBlur(null, language.code, true)
                          }
                          placeholder={getPlaceholder(
                            null,
                            language.code,
                            true
                          )}
                          dir={getLanguageDirection(language.code)}
                          lang={getLanguageLocale(language.code)}
                          inputMode={getInputMode(language.code) as any}
                          className="w-full"
                          data-input="true"
                          disabled={language.code !== "en" && isTranslating}
                          error={
                            language.code === "en" && englishLabelError
                              ? true
                              : false
                          }
                          rows={3}
                          maxRows={3}
                          minRows={3}
                          autosize
                          rightSection={
                            getLanguageDirection(language.code) === "ltr" ? (
                              <div className="flex items-center gap-1">
                                {/* Loader - Show when translating for non-English fields */}
                                {shouldShowLoader(language.code, true) && (
                                  <Loader size="xs" />
                                )}

                                {/* Settings Dropdown - Always visible */}
                                <SettingsInputDropdown
                                  title={`Field Settings`}
                                  languageName={language.name}
                                  languageNativeName={language.nativeName}
                                  initialValues={getCurrentSettings(
                                    null,
                                    language.code,
                                    true
                                  )}
                                  onSubmit={(settings) =>
                                    handleSettingsSubmit(
                                      null,
                                      language.code,
                                      true,
                                      settings
                                    )
                                  }
                                />

                                {/* Clear Icon - Show when focused and has changes */}
                                {shouldShowCrossIcon(
                                  null,
                                  language.code,
                                  true
                                ) &&
                                  !shouldShowLoader(language.code, true) && (
                                    <ActionIcon
                                      size="xs"
                                      variant="subtle"
                                      onClick={() =>
                                        handleClearNewRowInput(language.code)
                                      }
                                      className="text-black! hover:text-gray-600 hover:bg-gray-100 rounded-full"
                                    >
                                      <X size={12} />
                                    </ActionIcon>
                                  )}
                              </div>
                            ) : null
                          }
                          leftSection={
                            getLanguageDirection(language.code) === "rtl" ? (
                              <div className="flex items-center gap-1">
                                {/* Clear Icon - Show when focused and has changes */}
                                {shouldShowCrossIcon(
                                  null,
                                  language.code,
                                  true
                                ) &&
                                  !shouldShowLoader(language.code, true) && (
                                    <ActionIcon
                                      size="xs"
                                      variant="subtle"
                                      onClick={() =>
                                        handleClearNewRowInput(language.code)
                                      }
                                      className="text-black! hover:text-gray-600 hover:bg-gray-100 rounded-full"
                                    >
                                      <X size={12} />
                                    </ActionIcon>
                                  )}

                                {/* Settings Dropdown - Always visible */}
                                <SettingsInputDropdown
                                  title={`Field Settings`}
                                  languageName={language.name}
                                  languageNativeName={language.nativeName}
                                  initialValues={getCurrentSettings(
                                    null,
                                    language.code,
                                    true
                                  )}
                                  onSubmit={(settings) =>
                                    handleSettingsSubmit(
                                      null,
                                      language.code,
                                      true,
                                      settings
                                    )
                                  }
                                />

                                {/* Loader - Show when translating for non-English fields */}
                                {shouldShowLoader(language.code, true) && (
                                  <Loader size="xs" />
                                )}
                              </div>
                            ) : null
                          }
                          styles={{
                            input: {
                              textAlign:
                                getLanguageDirection(language.code) === "rtl"
                                  ? "right"
                                  : "left",
                              fontSize: "14px",
                              paddingTop: "12px",
                              paddingBottom: "12px",
                              paddingRight:
                                getLanguageDirection(language.code) === "ltr"
                                  ? shouldShowLoader(language.code, true)
                                    ? "4.5rem"
                                    : "3.5rem"
                                  : "0.75rem",
                              paddingLeft:
                                getLanguageDirection(language.code) === "rtl"
                                  ? shouldShowLoader(language.code, true)
                                    ? "4.5rem"
                                    : "3.5rem"
                                  : "0.75rem",
                              resize: "none",
                              lineHeight: "1.4",
                            },
                          }}
                        />
                      ) : (
                        <TextInput
                          ref={(element) =>
                            setInputRef(`new-row-${language.code}`, element)
                          }
                          value={newRowTranslations[language.code] || ""}
                          onChange={(event) =>
                            handleNewRowTranslationChange(
                              language.code,
                              event.currentTarget.value
                            )
                          }
                          onKeyDown={(event) =>
                            handleKeyDown(event, 0, languageIndex, true)
                          }
                          onFocus={() =>
                            handleInputFocus(
                              null,
                              language.code,
                              0,
                              languageIndex,
                              true
                            )
                          }
                          onBlur={() =>
                            handleInputBlur(null, language.code, true)
                          }
                          placeholder={getPlaceholder(
                            null,
                            language.code,
                            true
                          )}
                          dir={getLanguageDirection(language.code)}
                          lang={getLanguageLocale(language.code)}
                          inputMode={getInputMode(language.code) as any}
                          className="w-full"
                          data-input="true"
                          disabled={language.code !== "en" && isTranslating}
                          error={
                            language.code === "en" && englishLabelError
                              ? true
                              : false
                          }
                          rightSection={
                            getLanguageDirection(language.code) === "ltr" ? (
                              <div className="flex items-center gap-1">
                                {/* Loader - Show when translating for non-English fields */}
                                {shouldShowLoader(language.code, true) && (
                                  <Loader size="xs" />
                                )}

                                {/* Settings Dropdown - Always visible */}
                                <SettingsInputDropdown
                                  title={`Field Settings`}
                                  languageName={language.name}
                                  languageNativeName={language.nativeName}
                                  initialValues={getCurrentSettings(
                                    null,
                                    language.code,
                                    true
                                  )}
                                  onSubmit={(settings) =>
                                    handleSettingsSubmit(
                                      null,
                                      language.code,
                                      true,
                                      settings
                                    )
                                  }
                                />

                                {/* Clear Icon - Show when focused and has changes */}
                                {shouldShowCrossIcon(
                                  null,
                                  language.code,
                                  true
                                ) &&
                                  !shouldShowLoader(language.code, true) && (
                                    <ActionIcon
                                      size="xs"
                                      variant="subtle"
                                      onClick={() =>
                                        handleClearNewRowInput(language.code)
                                      }
                                      className="text-black! hover:text-gray-600 hover:bg-gray-100 rounded-full"
                                    >
                                      <X size={12} />
                                    </ActionIcon>
                                  )}
                              </div>
                            ) : null
                          }
                          leftSection={
                            getLanguageDirection(language.code) === "rtl" ? (
                              <div className="flex items-center gap-1">
                                {/* Clear Icon - Show when focused and has changes */}
                                {shouldShowCrossIcon(
                                  null,
                                  language.code,
                                  true
                                ) &&
                                  !shouldShowLoader(language.code, true) && (
                                    <ActionIcon
                                      size="xs"
                                      variant="subtle"
                                      onClick={() =>
                                        handleClearNewRowInput(language.code)
                                      }
                                      className="text-black! hover:text-gray-600 hover:bg-gray-100 rounded-full"
                                    >
                                      <X size={12} />
                                    </ActionIcon>
                                  )}

                                {/* Settings Dropdown - Always visible */}
                                <SettingsInputDropdown
                                  title={`Field Settings`}
                                  languageName={language.name}
                                  languageNativeName={language.nativeName}
                                  initialValues={getCurrentSettings(
                                    null,
                                    language.code,
                                    true
                                  )}
                                  onSubmit={(settings) =>
                                    handleSettingsSubmit(
                                      null,
                                      language.code,
                                      true,
                                      settings
                                    )
                                  }
                                />

                                {/* Loader - Show when translating for non-English fields */}
                                {shouldShowLoader(language.code, true) && (
                                  <Loader size="xs" />
                                )}
                              </div>
                            ) : null
                          }
                          styles={{
                            input: {
                              textAlign:
                                getLanguageDirection(language.code) === "rtl"
                                  ? "right"
                                  : "left",
                              fontSize: "14px",
                              height: "36px",
                              paddingTop: "8px",
                              paddingBottom: "8px",
                              paddingRight:
                                getLanguageDirection(language.code) === "ltr"
                                  ? shouldShowLoader(language.code, true)
                                    ? "4.5rem"
                                    : "3.5rem"
                                  : "0.75rem",
                              paddingLeft:
                                getLanguageDirection(language.code) === "rtl"
                                  ? shouldShowLoader(language.code, true)
                                    ? "4.5rem"
                                    : "3.5rem"
                                  : "0.75rem",
                            },
                          }}
                        />
                      )}
                    </div>
                  </Table.Td>
                ))}
                <Table.Td className="sticky right-0 z-10 bg-blue-50 border-l-2 border-gray-300">
                  <div
                    className="flex justify-center"
                    onMouseEnter={() => setHoveredActionCell("new-row")}
                    onMouseLeave={() => setHoveredActionCell(null)}
                  >
                    <ActionIcon
                      variant="subtle"
                      color={hoveredActionCell === "new-row" ? "red" : "dark"}
                      size="sm"
                      onClick={handleClearInsertingRow}
                      disabled={isTranslating}
                      className={
                        hoveredActionCell === "new-row"
                          ? "hover:bg-red-50 text-red-600 rounded-full"
                          : "text-black hover:bg-gray-50 rounded-full"
                      }
                    >
                      <X size={16} />
                    </ActionIcon>
                  </div>
                </Table.Td>
              </Table.Tr>

              {/* Existing Fields */}
              {filteredFields.map((field, fieldIndex) => (
                <Table.Tr key={field.id}>
                  {languages.map((language, languageIndex) => (
                    <Table.Td key={language.code}>
                      <div className="relative">
                        {moduleName === "Messages" ? (
                          <Textarea
                            ref={(element) =>
                              setInputRef(
                                `${field.id}-${language.code}`,
                                element
                              )
                            }
                            value={field.translations[language.code] || ""}
                            onChange={(event) =>
                              handleTranslationChange(
                                field.id,
                                language.code,
                                event.currentTarget.value
                              )
                            }
                            onKeyDown={(event) =>
                              handleKeyDown(
                                event,
                                fieldIndex,
                                languageIndex,
                                false
                              )
                            }
                            onFocus={() =>
                              handleInputFocus(
                                field.id,
                                language.code,
                                fieldIndex,
                                languageIndex,
                                false
                              )
                            }
                            onBlur={() =>
                              handleInputBlur(field.id, language.code, false)
                            }
                            placeholder={getPlaceholder(
                              field.id,
                              language.code,
                              false
                            )}
                            dir={getLanguageDirection(language.code)}
                            lang={getLanguageLocale(language.code)}
                            inputMode={getInputMode(language.code) as any}
                            className="w-full"
                            data-input="true"
                            rows={3}
                            maxRows={3}
                            minRows={3}
                            autosize
                            rightSection={
                              getLanguageDirection(language.code) === "ltr" ? (
                                <div className="flex items-center gap-1">
                                  {/* Settings Dropdown - Always visible */}
                                  <SettingsInputDropdown
                                    title={`${field.label} Settings`}
                                    languageName={language.name}
                                    languageNativeName={language.nativeName}
                                    initialValues={getCurrentSettings(
                                      field.id,
                                      language.code,
                                      false
                                    )}
                                    onSubmit={(settings) =>
                                      handleSettingsSubmit(
                                        field.id,
                                        language.code,
                                        false,
                                        settings
                                      )
                                    }
                                  />

                                  {/* Clear Icon - Show when focused and has changes */}
                                  {shouldShowCrossIcon(
                                    field.id,
                                    language.code,
                                    false
                                  ) && (
                                    <ActionIcon
                                      size="xs"
                                      variant="subtle"
                                      onClick={() =>
                                        handleClearInput(
                                          field.id,
                                          language.code
                                        )
                                      }
                                      className="text-black! hover:text-gray-600 hover:bg-gray-100 rounded-full"
                                    >
                                      <X size={12} />
                                    </ActionIcon>
                                  )}
                                </div>
                              ) : null
                            }
                            leftSection={
                              getLanguageDirection(language.code) === "rtl" ? (
                                <div className="flex items-center gap-1">
                                  {/* Clear Icon - Show when focused and has changes */}
                                  {shouldShowCrossIcon(
                                    field.id,
                                    language.code,
                                    false
                                  ) && (
                                    <ActionIcon
                                      size="xs"
                                      variant="subtle"
                                      onClick={() =>
                                        handleClearInput(
                                          field.id,
                                          language.code
                                        )
                                      }
                                      className="text-black! hover:text-gray-600 hover:bg-gray-100 rounded-full"
                                    >
                                      <X size={12} />
                                    </ActionIcon>
                                  )}

                                  {/* Settings Dropdown - Always visible */}
                                  <SettingsInputDropdown
                                    title={`${field.label} Settings`}
                                    languageName={language.name}
                                    languageNativeName={language.nativeName}
                                    initialValues={getCurrentSettings(
                                      field.id,
                                      language.code,
                                      false
                                    )}
                                    onSubmit={(settings) =>
                                      handleSettingsSubmit(
                                        field.id,
                                        language.code,
                                        false,
                                        settings
                                      )
                                    }
                                  />
                                </div>
                              ) : null
                            }
                            styles={{
                              input: {
                                textAlign:
                                  getLanguageDirection(language.code) === "rtl"
                                    ? "right"
                                    : "left",
                                fontSize: "14px",
                                paddingTop: "12px",
                                paddingBottom: "12px",
                                paddingRight:
                                  getLanguageDirection(language.code) === "ltr"
                                    ? "3.5rem"
                                    : "0.75rem",
                                paddingLeft:
                                  getLanguageDirection(language.code) === "rtl"
                                    ? "3.5rem"
                                    : "0.75rem",
                                resize: "none",
                                lineHeight: "1.4",
                              },
                            }}
                          />
                        ) : (
                          <TextInput
                            ref={(element) =>
                              setInputRef(
                                `${field.id}-${language.code}`,
                                element
                              )
                            }
                            value={field.translations[language.code] || ""}
                            onChange={(event) =>
                              handleTranslationChange(
                                field.id,
                                language.code,
                                event.currentTarget.value
                              )
                            }
                            onKeyDown={(event) =>
                              handleKeyDown(
                                event,
                                fieldIndex,
                                languageIndex,
                                false
                              )
                            }
                            onFocus={() =>
                              handleInputFocus(
                                field.id,
                                language.code,
                                fieldIndex,
                                languageIndex,
                                false
                              )
                            }
                            onBlur={() =>
                              handleInputBlur(field.id, language.code, false)
                            }
                            placeholder={getPlaceholder(
                              field.id,
                              language.code,
                              false
                            )}
                            dir={getLanguageDirection(language.code)}
                            lang={getLanguageLocale(language.code)}
                            inputMode={getInputMode(language.code) as any}
                            className="w-full"
                            data-input="true"
                            rightSection={
                              getLanguageDirection(language.code) === "ltr" ? (
                                <div className="flex items-center gap-1">
                                  {/* Settings Dropdown - Always visible */}
                                  <SettingsInputDropdown
                                    title={`${field.label} Settings`}
                                    languageName={language.name}
                                    languageNativeName={language.nativeName}
                                    initialValues={getCurrentSettings(
                                      field.id,
                                      language.code,
                                      false
                                    )}
                                    onSubmit={(settings) =>
                                      handleSettingsSubmit(
                                        field.id,
                                        language.code,
                                        false,
                                        settings
                                      )
                                    }
                                  />

                                  {/* Clear Icon - Show when focused and has changes */}
                                  {shouldShowCrossIcon(
                                    field.id,
                                    language.code,
                                    false
                                  ) && (
                                    <ActionIcon
                                      size="xs"
                                      variant="subtle"
                                      onClick={() =>
                                        handleClearInput(
                                          field.id,
                                          language.code
                                        )
                                      }
                                      className="text-black! hover:text-gray-600 hover:bg-gray-100 rounded-full"
                                    >
                                      <X size={12} />
                                    </ActionIcon>
                                  )}
                                </div>
                              ) : null
                            }
                            leftSection={
                              getLanguageDirection(language.code) === "rtl" ? (
                                <div className="flex items-center gap-1">
                                  {/* Clear Icon - Show when focused and has changes */}
                                  {shouldShowCrossIcon(
                                    field.id,
                                    language.code,
                                    false
                                  ) && (
                                    <ActionIcon
                                      size="xs"
                                      variant="subtle"
                                      onClick={() =>
                                        handleClearInput(
                                          field.id,
                                          language.code
                                        )
                                      }
                                      className="text-black! hover:text-gray-600 hover:bg-gray-100 rounded-full"
                                    >
                                      <X size={12} />
                                    </ActionIcon>
                                  )}

                                  {/* Settings Dropdown - Always visible */}
                                  <SettingsInputDropdown
                                    title={`${field.label} Settings`}
                                    languageName={language.name}
                                    languageNativeName={language.nativeName}
                                    initialValues={getCurrentSettings(
                                      field.id,
                                      language.code,
                                      false
                                    )}
                                    onSubmit={(settings) =>
                                      handleSettingsSubmit(
                                        field.id,
                                        language.code,
                                        false,
                                        settings
                                      )
                                    }
                                  />
                                </div>
                              ) : null
                            }
                            styles={{
                              input: {
                                textAlign:
                                  getLanguageDirection(language.code) === "rtl"
                                    ? "right"
                                    : "left",
                                fontSize: "14px",
                                height: "36px",
                                paddingTop: "8px",
                                paddingBottom: "8px",
                                paddingRight:
                                  getLanguageDirection(language.code) === "ltr"
                                    ? "3.5rem"
                                    : "0.75rem",
                                paddingLeft:
                                  getLanguageDirection(language.code) === "rtl"
                                    ? "3.5rem"
                                    : "0.75rem",
                              },
                            }}
                          />
                        )}
                      </div>
                    </Table.Td>
                  ))}
                  <Table.Td className="sticky right-0 z-10 bg-white border-l-2 border-gray-300">
                    <div
                      className="flex justify-center"
                      onMouseEnter={() => setHoveredActionCell(field.id)}
                      onMouseLeave={() => setHoveredActionCell(null)}
                    >
                      <ActionIcon
                        variant="subtle"
                        color={hoveredActionCell === field.id ? "red" : "dark"}
                        size="sm"
                        onClick={() => handleRemoveField(field.id)}
                        className={
                          hoveredActionCell === field.id
                            ? "hover:bg-red-50 text-red-600 rounded-full"
                            : "text-black hover:bg-gray-50 rounded-full"
                        }
                      >
                        <X size={16} />
                      </ActionIcon>
                    </div>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </ScrollArea>
      </div>
    </div>
  );
};

export default TranslationTable;
