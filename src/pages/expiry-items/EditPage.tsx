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

type ExpiryItemData = {
  itemName: string;
  batchNumber: string;
  expiryDate: Date | null;
  quantity: number;
  unit: string;
  location: string;
  category: string;
  supplier: string;
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

type ExpiryItemModuleData = {
  formData: ExpiryItemData;
  hasChanges: boolean;
  scrollPosition: number;
};

type Props = {
  isEdit?: boolean;
};

const initialData: ExpiryItemData = {
  itemName: "Aspirin Tablets",
  batchNumber: "BATCH-001",
  expiryDate: new Date("2025-12-31"),
  quantity: 100,
  unit: "Tablets",
  location: "Warehouse A",
  category: "Pharmaceuticals",
  supplier: "MedSupply Co",
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

export default function ExpiryItemEditPage({ isEdit = true }: Props) {
  const navigate = useNavigate();
  const { id } = useParams();
  // const labels = useLanguageLabels();
  const { isRTL } = useAppSelector((state) => state.language);

  // Get module ID for this edit page
  const moduleId = `expiry-item-edit-module-${id || "new"}`;

  // Use the custom hook for minimized module data
  const {
    moduleData,
    hasMinimizedData,
    resetModuleData,
    getModuleScrollPosition,
  } = useMinimizedModuleData<ExpiryItemModuleData>(moduleId);

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
  const itemNamePerm: boolean = usePermission(
    "expiry-items",
    "edit",
    "itemName"
  );
  const batchNumberPerm: boolean = usePermission(
    "expiry-items",
    "edit",
    "batchNumber"
  );
  const expiryDatePerm: boolean = usePermission(
    "expiry-items",
    "edit",
    "expiryDate"
  );
  const quantityPerm: boolean = usePermission(
    "expiry-items",
    "edit",
    "quantity"
  );
  const unitPerm: boolean = usePermission("expiry-items", "edit", "unit");
  const locationPerm: boolean = usePermission(
    "expiry-items",
    "edit",
    "location"
  );
  const categoryPerm: boolean = usePermission(
    "expiry-items",
    "edit",
    "category"
  );
  const supplierPerm: boolean = usePermission(
    "expiry-items",
    "edit",
    "supplier"
  );
  const statusPerm: boolean = usePermission("expiry-items", "edit", "status");
  const isDefaultPerm: boolean = usePermission(
    "expiry-items",
    "edit",
    "isDefault"
  );
  const canPdf: boolean = usePermission("expiry-items", "pdf");
  const canPrint: boolean = usePermission("expiry-items", "print");

  // Form state
  const [formData, setFormData] = useState<ExpiryItemData>({
    itemName: "",
    batchNumber: "",
    expiryDate: new Date(),
    quantity: 0,
    unit: "",
    location: "",
    category: "",
    supplier: "",
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
        !formData.itemName);

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
    formData.itemName,
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
      handlePrintExpiryItem(formData);
    }

    // keep switch functionality
    if (keepCreating) {
      toastSuccess("Expiry item updated successfully!");
      handleReset();
    } else {
      toastSuccess("Expiry item updated successfully!");
      navigate("/expiry-items");
    }
  };

  // Update handleReset function to use the custom hook
  const handleReset = async () => {
    setFormData({
      itemName: "",
      batchNumber: "",
      expiryDate: new Date(),
      quantity: 0,
      unit: "",
      location: "",
      category: "",
      supplier: "",
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
      inputRefs.current["itemName"]?.focus();
    }, 100);
  };

  const handleResetClick = () => {
    setIsResetModalOpen(true);
  };

  const handlePrintExpiryItem = (expiryData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Expiry Item Details",
        data: [expiryData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          itemName: "Item Name",
          batchNumber: "Batch Number",
          expiryDate: "Expiry Date",
          quantity: "Quantity",
          unit: "Unit",
          location: "Location",
          category: "Category",
          supplier: "Supplier",
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
          title="Expiry Item Details"
          subtitle="Expiry Item Information"
        />
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "expiry-item-details.pdf";
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
        navigate("/expiry-items/create");
      },
      show: canCreate,
    },
    {
      label: "View",
      icon: <Eye className="w-5 h-5 text-green-600" />,
      onClick: () => {
        navigate("/expiry-items/view");
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
              toastRestore("Expiry item saved as draft successfully");
            },
            show: canCreate,
          },
        ];
      }
      return filteredOptions;
    });
  }, [formData.isDraft, canCreate]);

  // Create minimize handler using the custom hook
  const handleMinimize = useCallback((): ExpiryItemModuleData => {
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
        moduleName={`Edit Expiry Item`}
        moduleRoute={`/expiry-items/edit/${id || "new"}`}
        onMinimize={handleMinimize}
        title="Edit Expiry Item"
        listPath="expiry-items"
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
        module="expiry-items"
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
            {/* First Row: Item Name, Batch Number, Expiry Date, Quantity */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {/* Item Name */}
              {itemNamePerm && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("itemName")}
                    id="itemName"
                    name="itemName"
                    value={formData.itemName}
                    onChange={handleChange}
                    onNext={() => focusNextInput("batchNumber")}
                    onCancel={() => setFormData({ ...formData, itemName: "" })}
                    labelText="Item Name"
                    tooltipText="Enter the item name"
                    required
                  />
                </div>
              )}

              {/* Batch Number */}
              {batchNumberPerm && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("batchNumber")}
                    id="batchNumber"
                    name="batchNumber"
                    value={formData.batchNumber}
                    onChange={handleChange}
                    onNext={() => focusNextInput("expiryDate")}
                    onCancel={() =>
                      setFormData({ ...formData, batchNumber: "" })
                    }
                    labelText="Batch Number"
                    tooltipText="Enter the batch number"
                    required
                  />
                </div>
              )}

              {/* Expiry Date (native) */}
              {expiryDatePerm && (
                <div className="space-y-2">
                  <div className="relative">
                    <input
                      ref={(el) => setRef("expiryDate")(el as any)}
                      type="date"
                      id="expiryDate"
                      name="expiryDate"
                      value={
                        formData.expiryDate
                          ? formData.expiryDate.toISOString().split("T")[0]
                          : ""
                      }
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const val = e.target.value;
                        setFormData((prev) => ({
                          ...prev,
                          expiryDate: val ? new Date(val) : null,
                        }));
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          focusNextInput("quantity");
                        }
                      }}
                      required
                      className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 rounded-[12px] border border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#70D3FC80] focus:outline-none focus:ring-0 focus:border-[#70D3FC80] peer h-[50px] focus:border"
                      placeholder=" "
                    />
                    <label
                      htmlFor="expiryDate"
                      className="absolute text-base text-gray-800 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-1 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-primary peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 transition-all rounded-lg"
                    >
                      Expiry Date
                    </label>
                  </div>
                </div>
              )}

              {/* Quantity */}
              {quantityPerm && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("quantity")}
                    id="quantity"
                    name="quantity"
                    type="number"
                    value={String(formData.quantity)}
                    onChange={handleChange}
                    onNext={() => focusNextInput("unit")}
                    onCancel={() => setFormData({ ...formData, quantity: 0 })}
                    labelText="Quantity"
                    tooltipText="Enter the quantity"
                    required
                  />
                </div>
              )}
            </div>

            {/* Second Row: Unit, Location, Category, Supplier */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {/* Unit */}
              {unitPerm && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("unit")}
                    id="unit"
                    name="unit"
                    value={formData.unit}
                    onChange={handleChange}
                    onNext={() => focusNextInput("location")}
                    onCancel={() => setFormData({ ...formData, unit: "" })}
                    labelText="Unit"
                    tooltipText="Enter the unit of measurement"
                    required
                  />
                </div>
              )}

              {/* Location */}
              {locationPerm && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("location")}
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    onNext={() => focusNextInput("category")}
                    onCancel={() => setFormData({ ...formData, location: "" })}
                    labelText="Location"
                    tooltipText="Enter the location"
                    required
                  />
                </div>
              )}

              {/* Category */}
              {categoryPerm && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("category")}
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    onNext={() => focusNextInput("supplier")}
                    onCancel={() => setFormData({ ...formData, category: "" })}
                    labelText="Category"
                    tooltipText="Enter the category"
                    required
                  />
                </div>
              )}

              {/* Supplier */}
              {supplierPerm && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("supplier")}
                    id="supplier"
                    name="supplier"
                    value={formData.supplier}
                    onChange={handleChange}
                    onNext={() => focusNextInput("isDefault")}
                    onCancel={() => setFormData({ ...formData, supplier: "" })}
                    labelText="Supplier"
                    tooltipText="Enter the supplier name"
                    required
                  />
                </div>
              )}
            </div>

            {/* Third Row: Default, Status, Actions */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
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
                  tooltipText="Expiry Item Action History"
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
