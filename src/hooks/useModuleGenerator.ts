/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState } from "react";
import { userPermission } from "@/mockData/user-permission";
import { usePermission } from "@/hooks/usePermissions";

interface FieldConfig {
  type: "autocomplete" | "input" | "date" | "textarea" | "select";
  options?: string[];
  placeholder?: string;
  required?: boolean;
  maxLength?: number;
  tooltipText?: string;
}

interface SectionConfig {
  title: string;
  fields: string[];
  gridCols?: number;
}

interface UseFormGeneratorProps {
  moduleName: string;
  initialFormData?: any;
}

export const useFormGenerator = ({
  moduleName,
  initialFormData = {},
}: UseFormGeneratorProps) => {
  const inputRefs = useRef<Record<string, HTMLElement | null>>({});
  const [isModuleCollapsed, setIsModuleCollapsed] = useState(true);
  const [formData, setFormData] = useState<any>(initialFormData);

  // Get module configuration from user permissions
  const moduleConfig =
    userPermission.modules[moduleName as keyof typeof userPermission.modules];

  // Get all fields from the module's field permissions
  const allFields = moduleConfig
    ? Object.keys((moduleConfig as any).fieldPermissions || {})
    : [];

  // Get field-level permissions for the module
  const permissionsFields = usePermission<any>(moduleName, "create", allFields);

  // Check if module exists
  const isModuleValid = !!moduleConfig;

  // Toggle module collapse
  const toggleModule = () => {
    setIsModuleCollapsed(!isModuleCollapsed);
  };

  // Set ref for input field
  const setRef = (name: string) => (el: HTMLElement | null) => {
    inputRefs.current[name] = el;
  };

  // Focus next input field
  const focusNextInput = (
    currentField: string,
    onNextField?: (currentField: string) => string | null
  ) => {
    if (onNextField) {
      const nextField = onNextField(currentField);
      if (nextField && inputRefs.current[nextField]) {
        inputRefs.current[nextField]?.focus();
      }
    }
  };

  // Handle field value change
  const handleFieldChange = (
    fieldName: string,
    value: any,
    onFieldChange?: (fieldName: string, value: any) => void
  ) => {
    setFormData((prev: any) => ({
      ...prev,
      [fieldName]: value,
    }));
    if (onFieldChange) {
      onFieldChange(fieldName, value);
    }
  };

  // Get field options based on field name
  const getFieldOptions = (fieldName: string): string[] => {
    // Default options for common fields
    switch (fieldName.toLowerCase()) {
      case "country":
        return [
          "Saudi Arabia",
          "UAE",
          "Kuwait",
          "Bahrain",
          "Qatar",
          "Oman",
          "Jordan",
          "Lebanon",
          "Egypt",
          "Iraq",
          "Turkey",
          "Greece",
          "India",
          "Pakistan",
          "Bangladesh",
          "Sri Lanka",
          "Malaysia",
          "Singapore",
          "Indonesia",
          "Thailand",
          "Vietnam",
          "Philippines",
          "China",
          "Japan",
          "South Korea",
          "Australia",
          "New Zealand",
          "United States",
          "Canada",
          "United Kingdom",
          "Germany",
          "France",
          "Italy",
          "Spain",
          "Netherlands",
          "Belgium",
          "Switzerland",
          "Austria",
          "Sweden",
          "Norway",
          "Denmark",
          "Finland",
        ];
      case "status":
        return ["Active", "Inactive", "Pending", "Approved", "Rejected"];
      case "type":
        return ["Type A", "Type B", "Type C"];
      case "agentcode":
        return ["AG001", "AG002", "AG003", "AG004", "AG005"];
      case "agentname":
        return ["Agent Alpha", "Agent Beta", "Agent Gamma", "Agent Delta"];
      case "porttype":
        return ["Air", "Sea", "Land", "Rail"];
      case "portname":
        return ["Port A", "Port B", "Port C", "Port D"];
      case "company":
        return [
          "Al-Rashid Trading Company",
          "Saudi Business Solutions",
          "Gulf Commercial Group",
          "Arabian Enterprise Ltd",
          "Modern Trade Corp",
        ];
      case "notification":
        return ["Email", "SMS", "Push", "None"];
      case "currency":
        return ["SAR", "USD", "EUR", "GBP", "AED"];
      case "paymentterms":
        return ["Net 30", "Net 60", "Cash on Delivery", "Advance Payment"];
      default:
        return [];
    }
  };

  // Get field configuration
  const getFieldConfig = (fieldName: string): FieldConfig => {
    // Determine field type based on field name
    const fieldNameLower = fieldName.toLowerCase();

    if (fieldNameLower.includes("date") || fieldNameLower.includes("time")) {
      return { type: "date", required: false };
    }

    if (
      fieldNameLower.includes("description") ||
      fieldNameLower.includes("notes") ||
      fieldNameLower.includes("address") ||
      fieldNameLower.includes("details")
    ) {
      return { type: "textarea", required: false };
    }

    if (
      [
        "country",
        "status",
        "type",
        "agentcode",
        "agentname",
        "porttype",
        "portname",
        "company",
        "notification",
        "currency",
        "paymentterms",
      ].includes(fieldNameLower)
    ) {
      return { type: "autocomplete", required: false };
    }

    return { type: "input", required: false };
  };

  // Generate sections based on module configuration (4 sections by default)
  const generateSections = (): SectionConfig[] => {
    const fieldsPerSection = Math.ceil(allFields.length / 4); // 4 sections by default

    const sections: SectionConfig[] = [];
    for (let i = 0; i < 4; i++) {
      const startIndex = i * fieldsPerSection;
      const endIndex = startIndex + fieldsPerSection;
      const sectionFields = allFields.slice(startIndex, endIndex);

      if (sectionFields.length > 0) {
        sections.push({
          title: `Section ${i + 1}`,
          fields: sectionFields,
          gridCols: Math.ceil(sectionFields.length / 2),
        });
      }
    }
    return sections;
  };

  // Get display label for field
  const getFieldDisplayLabel = (fieldName: string): string => {
    return (
      fieldName.charAt(0).toUpperCase() +
      fieldName.slice(1).replace(/([A-Z])/g, " $1")
    );
  };

  // Get formatted module name
  const getModuleDisplayName = (): string => {
    return moduleName.replace(/([A-Z])/g, " $1").trim();
  };

  // Check if field has permission
  const hasFieldPermission = (fieldName: string): boolean => {
    return !!(permissionsFields as any)[fieldName];
  };

  // Reset form data
  const resetForm = () => {
    setFormData({});
  };

  // Get form validation errors
  const getValidationErrors = (): Record<string, string> => {
    const errors: Record<string, string> = {};

    allFields.forEach((fieldName) => {
      const fieldConfig = getFieldConfig(fieldName);
      const value = formData[fieldName];

      if (fieldConfig.required && (!value || value.trim() === "")) {
        errors[fieldName] = `${getFieldDisplayLabel(fieldName)} is required`;
      }
    });

    return errors;
  };

  // Check if form is valid
  const isFormValid = (): boolean => {
    const errors = getValidationErrors();
    return Object.keys(errors).length === 0;
  };

  const sections = generateSections();

  return {
    // State
    formData,
    setFormData,
    isModuleCollapsed,
    isModuleValid,

    // Module info
    moduleName,
    moduleDisplayName: getModuleDisplayName(),
    allFields,
    sections,

    // Actions
    toggleModule,
    handleFieldChange,
    focusNextInput,
    resetForm,

    // Field helpers
    setRef,
    getFieldOptions,
    getFieldConfig,
    getFieldDisplayLabel,
    hasFieldPermission,

    // Validation
    getValidationErrors,
    isFormValid,

    // Permissions
    permissionsFields,
  };
};
