import React from "react";
import { Button } from "@/components/ui/button";
import { Trash2, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Autocomplete } from "@/components/common/Autocomplete";

// Types for field configuration
export type FieldType = "select" | "input" | "number" | "text" | "textarea";

export interface FieldConfig {
  key: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  options?: string[];
  required?: boolean;
  className?: string;
  disabled?: boolean;
}

export interface ItemData {
  [key: string]: string | number;
}

export interface FieldMoreItemsProps {
  fields: FieldConfig[];
  items: ItemData[];
  onItemsChange: (items: ItemData[]) => void;
  addButtonText?: string;
  deleteButtonText?: string;
  className?: string;
  minItems?: number;
  maxItems?: number;
  showAddButton?: boolean;
  showDeleteButton?: boolean;
  addButtonClassName?: string;
  deleteButtonClassName?: string;
  itemClassName?: string;
  fieldClassName?: string;
}

const FieldMoreItems: React.FC<FieldMoreItemsProps> = ({
  fields,
  items,
  onItemsChange,
  addButtonText = "Add More Item",
  deleteButtonText = "Delete",
  className = "",
  minItems = 1,
  maxItems = 10,
  showAddButton = true,
  showDeleteButton = true,
  addButtonClassName = "",
  deleteButtonClassName = "",
  itemClassName = "",
  fieldClassName = "",
}) => {
  // Create initial empty item based on field configuration
  const createEmptyItem = (): ItemData => {
    const emptyItem: ItemData = {};
    fields.forEach((field) => {
      emptyItem[field.key] = field.type === "number" ? 0 : "";
    });
    return emptyItem;
  };

  // Add new item
  const addItem = () => {
    if (items.length < maxItems) {
      const newItems = [...items, createEmptyItem()];
      onItemsChange(newItems);
    }
  };

  // Delete item by index
  const deleteItem = (index: number) => {
    if (items.length > minItems) {
      const newItems = items.filter((_, i) => i !== index);
      onItemsChange(newItems);
    }
  };

  // Update item field value
  const updateItem = (
    index: number,
    fieldKey: string,
    value: string | number
  ) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [fieldKey]: value };
    onItemsChange(newItems);
  };

  // Render field based on type
  const renderField = (
    field: FieldConfig,
    item: ItemData,
    itemIndex: number
  ) => {
    const value = item[field.key] || "";
    const fieldId = `${field.key}-${itemIndex}`;

    const inputStyles = cn(
      "w-full h-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-white",
      fieldClassName,
      field.className
    );

    switch (field.type) {
      case "select":
        return (
          <Autocomplete
            id={fieldId}
            name={field.key}
            options={field.options || []}
            value={value as string}
            labelClassName="rounded-md"
            isSelectableOnly={true}
            onValueChange={(newValue: string) => {
              updateItem(itemIndex, field.key, newValue);
            }}
            placeholder={field.placeholder || "Select Option"}
            labelText=""
            className={cn("w-full", fieldClassName, field.className)}
            disabled={field.disabled}
            styles={{
              input: {
                height: "40px",
                borderColor: "#d1d5db",
                "&:focus": {
                  borderColor: "#3b82f6",
                  boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.1)",
                },
              },
            }}
          />
        );

      case "number":
        return (
          <input
            id={fieldId}
            name={field.key}
            type="number"
            value={value}
            onChange={(e) => {
              const numValue = parseFloat(e.target.value) || 0;
              updateItem(itemIndex, field.key, numValue);
            }}
            placeholder={field.placeholder || "0.00"}
            disabled={field.disabled}
            className={inputStyles}
          />
        );

      default:
        return (
          <input
            id={fieldId}
            name={field.key}
            type={field.type}
            value={value as string}
            onChange={(e) => {
              updateItem(itemIndex, field.key, e.target.value);
            }}
            placeholder={field.placeholder || "Enter value"}
            disabled={field.disabled}
            className={inputStyles}
          />
        );
    }
  };

  return (
    <div className={cn("space-y-4", className)}>
      {/* Header Row */}
      <div
        className="grid gap-4 items-center"
        style={{ gridTemplateColumns: "2fr 1fr 1fr auto" }}
      >
        {fields.map((field) => (
          <div key={field.key} className="space-y-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
          </div>
        ))}
        {showDeleteButton && <div className="w-20"></div>}
      </div>

      {/* Items */}
      <div className="space-y-3">
        {items.map((item, index) => (
          <div
            key={index}
            className={cn("grid gap-4 items-center", itemClassName)}
            style={{ gridTemplateColumns: "2fr 1fr 1fr auto" }}
          >
            {fields.map((field) => (
              <div key={field.key} className="w-full">
                {renderField(field, item, index)}
              </div>
            ))}

            {showDeleteButton && (
              <div className="flex justify-end">
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className={cn(
                    "h-10 px-3 whitespace-nowrap",
                    deleteButtonClassName
                  )}
                  onClick={() => deleteItem(index)}
                  disabled={items.length <= minItems}
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  {deleteButtonText}
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add More Button */}
      {showAddButton && (
        <div className="pt-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className={cn(
              "bg-sky-500 hover:bg-sky-600 text-white! border-sky-500 hover:border-sky-600 whitespace-nowrap",
              addButtonClassName
            )}
            onClick={addItem}
            disabled={items.length >= maxItems}
          >
            <Plus className="h-4 w-4 mr-1" />
            {addButtonText}
          </Button>
        </div>
      )}
    </div>
  );
};

export default FieldMoreItems;
