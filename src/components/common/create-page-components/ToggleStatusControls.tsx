import { Switch } from "@/components/ui/switch";
import { Trash2, Undo2 } from "lucide-react";
import { useTranslation } from "react-i18next";

// Required status fields
type RequiredStatusFields = {
  isDefault: boolean;
  isActive: boolean;
  isDraft: boolean;
  isDeleted: boolean;
};

type FormType<T = Record<string, unknown>> = T & RequiredStatusFields;

type Props<T = Record<string, unknown>> = {
  formData: FormType<T>;
  setFormData: React.Dispatch<React.SetStateAction<FormType<T>>>;
  focusNextInput: (nextField: string) => void;
  setRef: (field: string) => (el: HTMLElement | null) => void;
  lastField?: string;
  className?: string;
};

const ToggleStatusControls = <T extends Record<string, unknown>>({
  formData,
  setFormData,
  focusNextInput,
  className = "",
  setRef,
  lastField,
}: Props<T>) => {
  const { t } = useTranslation();

  // Add this function to handle key navigation for switches and buttons
  const handleSwitchKeyDown = (
    e: React.KeyboardEvent,
    currentField: string,
    nextField?: string
  ) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();

      // Map field names to their corresponding state properties and toggle functions
      const fieldHandlers: Record<string, () => void> = {
        default: () =>
          setFormData((prev) => ({ ...prev, isDefault: !prev.isDefault })),
        active: () =>
          setFormData((prev) => ({ ...prev, isActive: !prev.isActive })),
        draft: () =>
          setFormData((prev) => ({ ...prev, isDraft: !prev.isDraft })),
        delete: () =>
          setFormData((prev) => ({ ...prev, isDeleted: !prev.isDeleted })),
      };

      // Execute the handler if it exists
      const handler = fieldHandlers[currentField];
      if (handler) {
        handler();
        // Move to next field after a short delay
        setTimeout(
          () => focusNextInput(nextField ? nextField : currentField),
          50
        );
      }
    }
  };

  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-12 gap-4 items-start ${className}`}
    >
      {/* Default Toggle */}
      <div className="md:col-span-3 space-y-2">
        <h3 className="font-medium mb-1">{t("common.default")}</h3>
        <div className="h-10 flex items-center">
          <Switch
            ref={(el) => setRef("isDefault")(el as HTMLElement)}
            id="isDefault"
            name="isDefault"
            checked={formData.isDefault}
            onCheckedChange={(checked) =>
              setFormData((prev) => ({ ...prev, isDefault: checked }))
            }
            onKeyDown={(e) => handleSwitchKeyDown(e, "default", "isActive")}
          />
        </div>
      </div>

      {/* Active Toggle */}
      <div className="md:col-span-3 space-y-2">
        <h3 className="font-medium mb-1">{t("common.active")}</h3>
        <div className="h-10 flex items-center">
          <Switch
            ref={(el) => setRef("isActive")(el as HTMLElement)}
            id="isActive"
            name="isActive"
            checked={formData.isActive}
            onCheckedChange={(checked) =>
              setFormData((prev) => ({ ...prev, isActive: checked }))
            }
            onKeyDown={(e) => handleSwitchKeyDown(e, "active", "isDraft")}
          />
        </div>
      </div>

      {/* Draft Toggle */}
      <div className="md:col-span-3 space-y-2">
        <h3 className="font-medium mb-1">{t("common.draft")}</h3>
        <div className="h-10 flex items-center">
          <Switch
            ref={(el) => setRef("isDraft")(el as HTMLElement)}
            id="isDraft"
            name="isDraft"
            checked={formData.isDraft}
            onCheckedChange={(checked) =>
              setFormData((prev) => ({ ...prev, isDraft: checked }))
            }
            onKeyDown={(e) => handleSwitchKeyDown(e, "draft", "isDeleted")}
          />
        </div>
      </div>

      {/* Delete/Restore Button */}
      <div className="md:col-span-3 space-y-2">
        <h3 className="font-medium mb-1">
          {formData.isDeleted ? t("button.restore") : t("button.delete")}
        </h3>
        <div className="h-10 flex items-center">
          <button
            ref={(el) => setRef("isDeleted")(el as HTMLElement)}
            id="isDeleted"
            type="button"
            className="p-2 rounded hover:bg-gray-100"
            onClick={() =>
              setFormData((prev) => ({
                ...prev,
                isDeleted: !prev.isDeleted,
              }))
            }
            onKeyDown={(e) => handleSwitchKeyDown(e, "delete", lastField)}
          >
            {formData.isDeleted ? (
              <Undo2 className="text-green-500" />
            ) : (
              <Trash2 className="text-red-500" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ToggleStatusControls;
