/* eslint-disable @typescript-eslint/no-explicit-any */
import { Autocomplete } from "@/components/common/Autocomplete";
import EditableInput from "@/components/common/EditableInput";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useFormGenerator } from "@/hooks/useModuleGenerator";

interface ReusableFormGeneratorProps {
  moduleName: string;
  formData?: any;
  setFormData?: (data: any) => void;
  onFieldChange?: (fieldName: string, value: any) => void;
  onNextField?: (currentField: string) => string | null;
  className?: string;
}

export const ReusableFormGenerator = ({
  moduleName,
  formData: externalFormData,
  setFormData: externalSetFormData,
  onFieldChange,
  onNextField,
  className = "",
}: ReusableFormGeneratorProps) => {
  const {
    formData,
    isModuleCollapsed,
    isModuleValid,
    moduleDisplayName,
    allFields,
    toggleModule,
    handleFieldChange,
    focusNextInput,
    setRef,
    getFieldOptions,
    getFieldConfig,
    getFieldDisplayLabel,
    hasFieldPermission,
  } = useFormGenerator({
    moduleName,
    initialFormData: externalFormData || {},
  });

  // Use external formData if provided, otherwise use internal state
  const currentFormData = externalFormData || formData;

  // Handle field value change
  const handleFieldChangeInternal = (fieldName: string, value: any) => {
    handleFieldChange(fieldName, value, onFieldChange);

    // Also update external state if provided
    if (externalSetFormData) {
      externalSetFormData((prev: any) => ({
        ...prev,
        [fieldName]: value,
      }));
    }
  };

  // Render individual field based on type
  const renderField = (fieldName: string) => {
    const fieldConfig = getFieldConfig(fieldName);
    const value = currentFormData[fieldName] || "";
    const options = getFieldOptions(fieldName);
    const isRequired = fieldConfig.required || false;
    const displayLabel = getFieldDisplayLabel(fieldName);

    switch (fieldConfig.type) {
      case "autocomplete":
        return (
          <Autocomplete
            ref={(el: any) => setRef(fieldName)(el)}
            id={fieldName}
            name={fieldName}
            options={options}
            value={value}
            labelClassName="rounded-lg"
            onValueChange={(value: string) => {
              handleFieldChangeInternal(fieldName, value);
              focusNextInput(fieldName, onNextField);
            }}
            onEnterPress={() => {
              if (value) {
                focusNextInput(fieldName, onNextField);
              }
            }}
            placeholder=" "
            labelText={displayLabel}
            className="relative"
            styles={{
              input: {
                borderColor: "var(--primary)",
                "&:focus": {
                  borderColor: "var(--primary)",
                },
              },
            }}
          />
        );

      case "date":
        return (
          <EditableInput
            setRef={setRef(fieldName)}
            id={fieldName}
            name={fieldName}
            value={value}
            onChange={(e: any) =>
              handleFieldChangeInternal(fieldName, e.target.value)
            }
            onNext={() => focusNextInput(fieldName, onNextField)}
            onCancel={() => handleFieldChangeInternal(fieldName, "")}
            labelText={displayLabel}
            tooltipText={fieldConfig.tooltipText || `Enter ${fieldName}`}
            required={isRequired}
            type="date"
            maxLength={fieldConfig.maxLength}
          />
        );

      case "textarea":
        return (
          <EditableInput
            setRef={setRef(fieldName)}
            id={fieldName}
            name={fieldName}
            value={value}
            onChange={(e: any) =>
              handleFieldChangeInternal(fieldName, e.target.value)
            }
            onNext={() => focusNextInput(fieldName, onNextField)}
            onCancel={() => handleFieldChangeInternal(fieldName, "")}
            labelText={displayLabel}
            tooltipText={fieldConfig.tooltipText || `Enter ${fieldName}`}
            required={isRequired}
            maxLength={fieldConfig.maxLength}
          />
        );

      case "select":
        return (
          <Autocomplete
            ref={(el: any) => setRef(fieldName)(el)}
            id={fieldName}
            name={fieldName}
            options={options}
            value={value}
            labelClassName="rounded-lg"
            onValueChange={(value: string) => {
              handleFieldChangeInternal(fieldName, value);
              focusNextInput(fieldName, onNextField);
            }}
            onEnterPress={() => {
              if (value) {
                focusNextInput(fieldName, onNextField);
              }
            }}
            placeholder=" "
            labelText={displayLabel}
            className="relative"
            styles={{
              input: {
                borderColor: "var(--primary)",
                "&:focus": {
                  borderColor: "var(--primary)",
                },
              },
            }}
          />
        );

      default: // input
        return (
          <EditableInput
            setRef={setRef(fieldName)}
            id={fieldName}
            name={fieldName}
            value={value}
            onChange={(e: any) =>
              handleFieldChangeInternal(fieldName, e.target.value)
            }
            onNext={() => focusNextInput(fieldName, onNextField)}
            onCancel={() => handleFieldChangeInternal(fieldName, "")}
            labelText={displayLabel}
            tooltipText={fieldConfig.tooltipText || `Enter ${fieldName}`}
            required={isRequired}
            maxLength={fieldConfig.maxLength}
          />
        );
    }
  };

  // Show error if module is not valid
  if (!isModuleValid) {
    return (
      <div className="p-8 text-center">
        <div className="text-red-500 text-lg font-semibold">
          Module "{moduleName}" not found in user permissions
        </div>
        <p className="text-gray-600 mt-2">
          Please check if the module name is correct and exists in
          user-permission.ts
        </p>
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className} mb-6`}>
      {/* Module Container */}
      <div className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
        {/* Module Header - Clickable for collapse */}
        <button
          onClick={toggleModule}
          className="w-full px-6 py-4 bg-sky-50 hover:bg-sky-100 transition-colors flex items-center justify-between text-left cursor-pointer"
        >
          <div className="flex items-center space-x-3">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 capitalize">
                {moduleDisplayName}
              </h2>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">
              {isModuleCollapsed
                ? `Show ${moduleDisplayName}`
                : `Hide ${moduleDisplayName}`}
            </span>
            {isModuleCollapsed ? (
              <ChevronRight className="h-5 w-5 text-gray-500" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-500" />
            )}
          </div>
        </button>

        {/* Module Content - Collapsible */}
        {!isModuleCollapsed && (
          <div className="p-6 bg-white">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {allFields.map((fieldName: string) => {
                const hasPermission = hasFieldPermission(fieldName);

                if (!hasPermission) return null;

                return (
                  <div key={fieldName} className="space-y-2">
                    {renderField(fieldName)}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReusableFormGenerator;
