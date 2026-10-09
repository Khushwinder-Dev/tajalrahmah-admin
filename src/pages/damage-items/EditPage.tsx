/* eslint-disable @typescript-eslint/no-explicit-any */
import video from "@/assets/videos/test.mp4";
import EditableInput from "@/components/common/EditableInput";
import GenericPDF from "@/components/common/pdf";
import { ResetFormModal } from "@/components/common/ResetFormModal";
import { Button } from "@/components/ui/button";
import { PrintCommonLayout } from "@/lib/printContents/PrintCommonLayout";
import { printHtmlContent } from "@/lib/printHtmlContent";
import { toastError, toastRestore, toastSuccess } from "@/lib/toast";
import { pdf } from "@react-pdf/renderer";
import { Check, Eye, Plus } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useColorsPermissions, usePermission } from "@/hooks/usePermissions";
// import { useLanguageLabels } from "@/hooks/useLanguageLabels";
import { useAppSelector } from "@/store/hooks";
import MinimizablePageLayout from "@/components/MinimizablePageLayout";
import { useMinimizedModuleData } from "@/hooks/useMinimizedModuleData";
import { SwitchSelect } from "@/components/common/SwitchAutoComplete";
import { ActionsAutocomplete } from "@/components/common/ActionsAutocomplete";
import DynamicInputTableList from "./dynamic-input-table/DynamicInputTableList";

type DamageItemData = {
  itemId: string;
  quantityDamaged: number;
  documentDate: Date | null;
  reportedBy: string;
  location: string;
  damageType: string;
  status: "Active" | "Inactive" | "Draft" | "Deleted";
  isDefault: boolean;
  isActive: boolean;
  isDraft: boolean;
  isDeleted: boolean;
  createdAt: Date | null;
  draftedAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;
};

type DamageItemModuleData = {
  formData: DamageItemData;
  hasChanges: boolean;
  scrollPosition: number;
};

type Props = {
  isEdit?: boolean;
};

const initialData: DamageItemData = {
  itemId: "ITM-0001",
  quantityDamaged: 2,
  documentDate: new Date(),
  reportedBy: "John Doe",
  location: "Warehouse A",
  damageType: "Broken",
  status: "Active",
  isDefault: false,
  isActive: true,
  isDraft: false,
  isDeleted: false,
  createdAt: new Date(),
  draftedAt: null,
  updatedAt: new Date(),
  deletedAt: null,
};

export default function DamageItemEditPage({ isEdit = true }: Props) {
  const navigate = useNavigate();
  const { id } = useParams();
  // const labels = useLanguageLabels();
  const { isRTL } = useAppSelector((state) => state.language);

  // Get module ID for this edit page
  const moduleId = `damage-item-edit-module-${id || "new"}`;

  // Use the custom hook for minimized module data
  const {
    moduleData,
    hasMinimizedData,
    resetModuleData,
    getModuleScrollPosition,
  } = useMinimizedModuleData<DamageItemModuleData>(moduleId);

  const [keepCreating, setKeepCreating] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [isDefaultState, setIsDefaultState] = useState<"Yes" | "No" | string>(
    "No"
  );

  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [printEnabled, setPrintEnabled] = useState(false);
  const [pdfChecked, setPdfChecked] = useState(false);
  const [formKey, setFormKey] = useState(0);
  const [isRestoredFromMinimized, setIsRestoredFromMinimized] = useState(false);
  const [shouldRestoreFromMinimized, setShouldRestoreFromMinimized] =
    useState(false);
  const [selectedAction, setSelectedAction] = useState<string>("");

  // Permission checks
  const { canCreate, canView } = useColorsPermissions();

  // Field-level permissions
  const itemIdPerm: boolean = usePermission("damage-items", "edit", "itemId");
  const quantityDamagedPerm: boolean = usePermission(
    "damage-items",
    "edit",
    "quantityDamaged"
  );
  const documentDatePerm: boolean = usePermission(
    "damage-items",
    "edit",
    "documentDate"
  );
  const reportedByPerm: boolean = usePermission(
    "damage-items",
    "edit",
    "reportedBy"
  );
  const locationPerm: boolean = usePermission(
    "damage-items",
    "edit",
    "location"
  );
  const damageTypePerm: boolean = usePermission(
    "damage-items",
    "edit",
    "damageType"
  );
  const statusPerm: boolean = usePermission("damage-items", "edit", "status");
  const isDefaultPerm: boolean = usePermission(
    "damage-items",
    "edit",
    "isDefault"
  );
  const canPdf: boolean = usePermission("damage-items", "pdf");
  const canPrint: boolean = usePermission("damage-items", "print");

  // Form state
  const [formData, setFormData] = useState<DamageItemData>({
    itemId: "",
    quantityDamaged: 0,
    documentDate: new Date(),
    reportedBy: "",
    location: "",
    damageType: "",
    status: "Active",
    isDefault: false,
    isActive: true,
    isDraft: false,
    isDeleted: false,
    createdAt: null,
    draftedAt: null,
    updatedAt: null,
    deletedAt: null,
  });

  // focus next input field
  const inputRefs = useRef<Record<string, HTMLElement | null>>({});
  const setRef = (name: string) => (el: HTMLElement | null) => {
    inputRefs.current[name] = el;
  };
  const focusNextInput = (nextField: string) => {
    inputRefs.current[nextField]?.focus();
  };

  // Check for restore flag from taskbar
  useEffect(() => {
    const shouldRestore = localStorage.getItem(`restore-${moduleId}`);
    if (shouldRestore === "true") {
      setShouldRestoreFromMinimized(true);
      localStorage.removeItem(`restore-${moduleId}`);
    }
  }, [moduleId]);

  // Restore logic using the custom hook
  useEffect(() => {
    const shouldAutoRestore =
      shouldRestoreFromMinimized ||
      (hasMinimizedData &&
        moduleData?.formData &&
        !isRestoredFromMinimized &&
        !formData.itemId);

    if (hasMinimizedData && moduleData?.formData && shouldAutoRestore) {
      setFormData(moduleData.formData);

      // Restore UI states based on form data
      setIsDefaultState(moduleData.formData.isDefault ? "Yes" : "No");

      setIsRestoredFromMinimized(true);
      setShouldRestoreFromMinimized(false);

      // Restore scroll position
      const scrollPosition = getModuleScrollPosition(moduleId);
      if (scrollPosition) {
        setTimeout(() => {
          window.scrollTo(0, scrollPosition);
        }, 200);
      }
    }
  }, [
    hasMinimizedData,
    moduleData,
    isRestoredFromMinimized,
    shouldRestoreFromMinimized,
    formData.itemId,
    moduleId,
    getModuleScrollPosition,
  ]);

  // Initialize with edit data if available
  useEffect(() => {
    if (
      isEdit &&
      initialData &&
      !hasMinimizedData &&
      !isRestoredFromMinimized
    ) {
      setFormData(initialData);
      setIsDefaultState(initialData.isDefault ? "Yes" : "No");
    }
  }, [isEdit, hasMinimizedData, isRestoredFromMinimized, moduleId]);

  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const newFormData = {
      ...formData,
      [name]:
        type === "checkbox"
          ? checked
          : type === "number"
          ? Number(value)
          : value,
    };
    setFormData(newFormData);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (pdfChecked) {
      await handleExportPDF();
    }
    if (printEnabled) {
      handlePrintDamageItem(formData);
    }

    // keep switch functionality
    if (keepCreating) {
      toastSuccess("Damage item updated successfully!");
      handleReset();
    } else {
      toastSuccess("Damage item updated successfully!");
      navigate("/damage-items");
    }
  };

  // Update handleReset function to use the custom hook
  const handleReset = async () => {
    setFormData({
      itemId: "",
      quantityDamaged: 0,
      documentDate: new Date(),
      reportedBy: "",
      location: "",
      damageType: "",
      status: "Active",
      isDefault: false,
      isActive: true,
      isDraft: false,
      isDeleted: false,
      createdAt: new Date(),
      draftedAt: null,
      updatedAt: new Date(),
      deletedAt: null,
    });
    setIsDefaultState("No");

    setIsRestoredFromMinimized(false);

    if (formRef.current) {
      formRef.current.reset();
    }

    // Force re-render of all inputs by changing key
    setFormKey((prev) => prev + 1);

    // Reset form data using the custom hook
    if (hasMinimizedData) {
      try {
        await resetModuleData(moduleId);
      } catch (error) {
        console.error("Error resetting form data:", error);
      }
    }

    // Focus the first input field after reset
    setTimeout(() => {
      inputRefs.current["itemId"]?.focus();
    }, 100);
  };

  const handleResetClick = () => {
    setIsResetModalOpen(true);
  };

  const handlePrintDamageItem = (damageData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Damage Item Details",
        data: [damageData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          itemId: "Item ID",
          quantityDamaged: "Quantity Damaged",
          documentDate: "Document Date",
          reportedBy: "Reported By",
          location: "Location",
          damageType: "Damage Type",
          status: "Status",
          isDefault: "Default",
          isActive: "Active Status",
          isDraft: "Draft Status",
          isDeleted: "Deleted Status",
          createdAt: "Created At",
          updatedAt: "Updated At",
          draftedAt: "Drafted At",
          deletedAt: "Deleted At",
        },
      });
      printHtmlContent(html);
    } catch (error) {
      console.log(error);
      toastError("Something went wrong when printing");
    }
  };

  const handleSwitchChange = (checked: boolean) => {
    setPrintEnabled(checked);
  };

  const handlePDFSwitchChange = (pdfChecked: boolean) => {
    setPdfChecked(pdfChecked);
  };

  const handleExportPDF = async () => {
    try {
      const blob = await pdf(
        <GenericPDF
          data={[formData]}
          title="Damage Item Details"
          subtitle="Damage Item Information"
        />
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "damage-item-details.pdf";
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error);
      toastError("Something went wrong when generating PDF");
    }
  };

  const [popoverOptions, setPopoverOptions] = useState([
    {
      label: "Create",
      icon: <Plus className="w-5 h-5 text-green-500" />,
      onClick: () => {
        navigate("/brands/create");
      },
      show: canCreate,
    },
    {
      label: "View",
      icon: <Eye className="w-5 h-5 text-green-600" />,
      onClick: () => {
        navigate("/brands/view");
      },
      show: canView,
    },
  ]);

  useEffect(() => {
    setPopoverOptions((prevOptions) => {
      const filteredOptions = prevOptions.filter(
        (opt) => opt.label !== "Draft"
      );

      if (!formData.isDraft) {
        return [
          ...filteredOptions,
          {
            label: "Draft",
            icon: <Check className="text-green-500" />,
            onClick: () => {
              setFormData((prev) => ({
                ...prev,
                isDraft: true,
              }));
              toastRestore("Color saved as draft successfully");
            },
            show: canCreate,
          },
        ];
      }
      return filteredOptions;
    });
  }, [formData.isDraft, canCreate]);

  // Create minimize handler using the custom hook
  const handleMinimize = useCallback((): DamageItemModuleData => {
    return {
      formData,
      hasChanges: true,
      scrollPosition: window.scrollY,
    };
  }, [formData]);

  return (
    <>
      <MinimizablePageLayout
        moduleId={moduleId}
        moduleName={`Edit Damage Item`}
        moduleRoute={`/damage-items/edit/${id || "new"}`}
        onMinimize={handleMinimize}
        title="Edit Damage Item"
        listPath="damage-items"
        popoverOptions={popoverOptions}
        videoSrc={video}
        videoHeader="Tutorial video"
        keepChanges={keepCreating}
        onKeepChangesChange={setKeepCreating}
        pdfChecked={pdfChecked}
        onPdfToggle={canPdf ? handlePDFSwitchChange : undefined}
        printEnabled={printEnabled}
        onPrintToggle={canPrint ? handleSwitchChange : undefined}
        activePage="edit"
        module="damage-items"
        additionalFooterButtons={
          canCreate ? (
            <div className="flex gap-4 max-[435px]:gap-2">
              <Button
                variant="outline"
                className="gap-2 hover:bg-primary/90 bg-white rounded-full border-primary w-28 max-[435px]:w-20 font-semibold! text-primary!"
                onClick={handleResetClick}
              >
                Reset
              </Button>
              <Button
                variant="outline"
                className="gap-2 hover:bg-primary/90 bg-white rounded-full border-primary w-28 max-[435px]:w-20 font-semibold! text-primary!"
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </div>
          ) : null
        }
        className="w-full"
      >
        <div dir={isRTL ? "rtl" : "ltr"}>
          <form
            ref={formRef}
            key={formKey}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            {/* First Row: Item ID, Quantity Damaged, Document Date, Reported By */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {/* Item ID */}
              {itemIdPerm && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("itemId")}
                    id="itemId"
                    name="itemId"
                    value={formData.itemId}
                    onChange={handleChange}
                    onNext={() => focusNextInput("quantityDamaged")}
                    onCancel={() => setFormData({ ...formData, itemId: "" })}
                    labelText="Item ID"
                    tooltipText="Enter the Item ID"
                    required
                  />
                </div>
              )}

              {/* Quantity Damaged */}
              {quantityDamagedPerm && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("quantityDamaged")}
                    id="quantityDamaged"
                    name="quantityDamaged"
                    type="number"
                    value={String(formData.quantityDamaged)}
                    onChange={handleChange}
                    onNext={() => focusNextInput("documentDate")}
                    onCancel={() =>
                      setFormData({ ...formData, quantityDamaged: 0 })
                    }
                    labelText="Quantity Damaged"
                    tooltipText="Enter the damaged quantity"
                    required
                  />
                </div>
              )}

              {/* Document Date (native) */}
              {documentDatePerm && (
                <div className="space-y-2">
                  <div className="relative">
                    <input
                      ref={(el) => setRef("documentDate")(el as any)}
                      type="date"
                      id="documentDate"
                      name="documentDate"
                      value={
                        formData.documentDate
                          ? formData.documentDate.toISOString().split("T")[0]
                          : ""
                      }
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const val = e.target.value;
                        setFormData((prev) => ({
                          ...prev,
                          documentDate: val ? new Date(val) : null,
                        }));
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          focusNextInput("reportedBy");
                        }
                      }}
                      required
                      className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 rounded-[12px] border border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#70D3FC80] focus:outline-none focus:ring-0 focus:border-[#70D3FC80] peer h-[50px] focus:border"
                      placeholder=" "
                    />
                    <label
                      htmlFor="documentDate"
                      className="absolute text-base text-gray-800 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-1 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-primary peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 transition-all rounded-lg"
                    >
                      Document Date
                    </label>
                  </div>
                </div>
              )}

              {/* Reported By */}
              {reportedByPerm && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("reportedBy")}
                    id="reportedBy"
                    name="reportedBy"
                    value={formData.reportedBy}
                    onChange={handleChange}
                    onNext={() => focusNextInput("location")}
                    onCancel={() =>
                      setFormData({ ...formData, reportedBy: "" })
                    }
                    labelText="Reported By"
                    tooltipText="Enter reporter name"
                    required
                  />
                </div>
              )}
            </div>

            {/* Second Row: Location, Damage Type, Default, Actions */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {/* Location */}
              {locationPerm && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("location")}
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    onNext={() => focusNextInput("damageType")}
                    onCancel={() => setFormData({ ...formData, location: "" })}
                    labelText="Location"
                    tooltipText="Enter the location"
                    required
                  />
                </div>
              )}

              {/* Damage Type */}
              {damageTypePerm && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("damageType")}
                    id="damageType"
                    name="damageType"
                    value={formData.damageType}
                    onChange={handleChange}
                    onNext={() => focusNextInput("isDefault")}
                    onCancel={() =>
                      setFormData({ ...formData, damageType: "" })
                    }
                    labelText="Damage Type"
                    tooltipText="Enter the type of damage"
                    required
                  />
                </div>
              )}

              {/* Default field - only show if user can edit */}
              {isDefaultPerm && (
                <div className="space-y-2 relative">
                  <SwitchSelect
                    ref={(el: any) => setRef("isDefault")(el)}
                    id="isDefault"
                    name="isDefault"
                    multiSelect={false}
                    options={[
                      {
                        label: "Yes",
                        value: "Yes",
                        date: "Set default",
                      },
                      {
                        label: "No",
                        value: "No",
                        date: "Unset default",
                      },
                    ]}
                    value={isDefaultState === "Yes" ? "Yes" : "No"}
                    labelClassName="rounded-lg"
                    onValueChange={(value: string | string[]) => {
                      const isYes = Array.isArray(value)
                        ? value[0] === "Yes"
                        : value === "Yes";
                      setIsDefaultState(isYes ? "Yes" : "No");
                      const newValue = isYes;
                      setFormData((prev) => ({
                        ...prev,
                        isDefault: newValue,
                      }));
                    }}
                    onEnterPress={() => {
                      if (
                        formData.isDefault === true ||
                        formData.isDefault === false
                      ) {
                        focusNextInput("actions");
                      }
                    }}
                    placeholder=" "
                    labelText="Default"
                    className="relative"
                    tooltipText="Mark as default damage item"
                  />
                </div>
              )}
              {/* Status field - only show if user can edit */}
              {statusPerm && (
                <div className="space-y-2">
                  <SwitchSelect
                    ref={(el: any) => setRef("status")(el)}
                    id="status"
                    name="status"
                    labelText="Status"
                    multiSelect={false} // Single select mode
                    options={[
                      {
                        label: "Active",
                        value: "Active",
                        date: "Set active",
                      },
                      {
                        label: "Inactive",
                        value: "InActive",
                        date: "Set inactive",
                      },
                      {
                        label: "Draft",
                        value: "Draft",
                        date: "Set draft",
                      },
                      {
                        label: "Delete",
                        value: "Delete",
                        date: "Set deleted",
                      },
                    ]}
                    value={formData.status}
                    onValueChange={(value: string | string[]) => {
                      const stringValue = Array.isArray(value)
                        ? value[0] || ""
                        : value;
                      setFormData((prev) => ({
                        ...prev,
                        status: stringValue as
                          | "Active"
                          | "Inactive"
                          | "Draft"
                          | "Deleted",
                        isDeleted: stringValue === "Delete",
                        isDraft: stringValue === "Draft",
                        isActive: stringValue === "Active",
                      }));
                    }}
                    placeholder=""
                    styles={{
                      input: {
                        borderColor: "var(--primary)",
                        "&:focus": {
                          borderColor: "var(--primary)",
                        },
                      },
                    }}
                    tooltipText="Set the damage item status"
                  />
                </div>
              )}

              {/* Actions */}
              <div className="space-y-2">
                <ActionsAutocomplete
                  ref={(el: any) => setRef("actions")(el)}
                  id="actions"
                  name="actions"
                  labelText="Action"
                  value={selectedAction}
                  actions={[
                    {
                      action: "Created",
                      user: "John",
                      role: "Super User",
                      date: "06 Aug 2025",
                      value: "created",
                    },
                    {
                      action: "Updated",
                      user: "Sarah",
                      role: "Admin",
                      date: "08 Aug 2025",
                      value: "updated",
                    },
                    {
                      action: "Inactive",
                      user: "Mike",
                      role: "Admin",
                      date: "08 Aug 2025",
                      value: "inactive",
                    },
                    {
                      action: "Drafted",
                      user: "John",
                      role: "Super User",
                      date: "07 Aug 2025",
                      value: "drafted",
                    },
                  ]}
                  placeholder=""
                  onValueChange={(value: string) => {
                    setSelectedAction(value);
                  }}
                  styles={{
                    input: {
                      borderColor: "var(--primary)",
                      "&:focus": {
                        borderColor: "var(--primary)",
                      },
                    },
                  }}
                  tooltipText="Damage Item Action History"
                />
              </div>
            </div>

            {/* Dynamic Input Table List */}
            <div className="mt-8">
              <DynamicInputTableList isEdit={isEdit} />
            </div>
          </form>
        </div>
      </MinimizablePageLayout>

      <ResetFormModal
        opened={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        onConfirm={handleReset}
        title="Reset Form"
        message="Are you sure you want to reset the form?"
        confirmText="Reset"
        cancelText="Cancel"
      />
    </>
  );
}
