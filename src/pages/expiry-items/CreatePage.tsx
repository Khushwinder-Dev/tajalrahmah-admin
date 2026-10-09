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
import { Check, Edit, Eye, Plus } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePermission } from "@/hooks/usePermissions";
import { useLanguageLabels } from "@/hooks/useLanguageLabels";
import { useAppSelector } from "@/store/hooks";
import MinimizablePageLayout from "@/components/MinimizablePageLayout";
import { SwitchSelect } from "@/components/common/SwitchAutoComplete";
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
  status: "Active" | "Inactive" | "Draft";
  isDefault: boolean;
  isActive: boolean;
  isDraft: boolean;
  isDeleted: boolean;
  createdAt: Date | null;
  draftedAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;
};

type Props = {
  isEdit?: boolean;
};

const initialData: ExpiryItemData = {
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
};

export default function ExpiryItemFormPage({ isEdit = false }: Props) {
  const navigate = useNavigate();
  const labels = useLanguageLabels();
  const { isRTL } = useAppSelector((state) => state.language);

  const [keepCreating, setKeepCreating] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [printEnabled, setPrintEnabled] = useState(false);
  const [pdfChecked, setPdfChecked] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [formKey, setFormKey] = useState(0);
  // No default field for damage items

  // Permission checks
  const canCreate = usePermission("expiry-items", "create");
  const canView = usePermission("expiry-items", "view");

  // Field-level permissions
  const itemNamePerm: boolean = usePermission(
    "expiry-items",
    "create",
    "itemName"
  );
  const batchNumberPerm: boolean = usePermission(
    "expiry-items",
    "create",
    "batchNumber"
  );
  const expiryDatePerm: boolean = usePermission(
    "expiry-items",
    "create",
    "expiryDate"
  );
  const quantityPerm: boolean = usePermission(
    "expiry-items",
    "create",
    "quantity"
  );
  const unitPerm: boolean = usePermission("expiry-items", "create", "unit");
  const locationPerm: boolean = usePermission(
    "expiry-items",
    "create",
    "location"
  );
  const categoryPerm: boolean = usePermission(
    "expiry-items",
    "create",
    "category"
  );
  const supplierPerm: boolean = usePermission(
    "expiry-items",
    "create",
    "supplier"
  );
  const statusPerm: boolean = usePermission("expiry-items", "create", "status");
  const isDefaultPerm: boolean = usePermission(
    "expiry-items",
    "create",
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

  // Initialize with edit data if available
  useEffect(() => {
    if (isEdit && initialData) {
      setFormData(initialData);
      // no default handling
    }
  }, [isEdit]);

  const [popoverOptions, setPopoverOptions] = useState([
    {
      label: isEdit ? "Create" : "Edit",
      icon: isEdit ? (
        <Plus className="w-5 h-5 text-green-500" />
      ) : (
        <Edit className="w-5 h-5 text-blue-500" />
      ),
      onClick: () => {
        if (isEdit) {
          navigate("/expiry-items/create");
        } else {
          navigate("/expiry-items/edit/undefined");
        }
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

  // focus next input field
  const inputRefs = useRef<Record<string, HTMLElement | null>>({});
  const setRef = (name: string) => (el: HTMLElement | null) => {
    inputRefs.current[name] = el;
  };
  const focusNextInput = (nextField: string) => {
    inputRefs.current[nextField]?.focus();
  };

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
      toastSuccess("Expiry item created successfully!");
      handleReset();
    } else {
      toastSuccess("Expiry item created successfully!");
      navigate("/expiry-items");
    }
  };

  const handleResetClick = () => {
    setIsResetModalOpen(true);
  };

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

    if (formRef.current) {
      formRef.current.reset();
    }

    // Force re-render of all inputs by changing key
    setFormKey((prev) => prev + 1);

    // Focus the first input field after reset
    setTimeout(() => {
      inputRefs.current["itemName"]?.focus();
    }, 100);
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
          isDefault: "Default",
          status: "Status",
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

  useEffect(() => {
    setPopoverOptions((prevOptions) => {
      // Filter out any existing draft option first
      const filteredOptions = prevOptions.filter(
        (opt) => opt.label !== "Draft"
      );

      // Add draft option only if not already a draft
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

  // Create minimize handler
  const handleMinimize = useCallback(() => {
    return {
      formData,
      hasChanges: true,
      scrollPosition: window.scrollY,
    };
  }, [formData]);

  return (
    <>
      <MinimizablePageLayout
        moduleId="expiry-item-form-module"
        moduleName={isEdit ? "Edit Expiry Item" : "Adding Expiry Item"}
        moduleRoute={
          isEdit
            ? `/expiry-items/edit/${formData.itemName || "new"}`
            : "/expiry-items/create"
        }
        onMinimize={handleMinimize}
        title={isEdit ? "Edit Expiry Item" : "Add Expiry Item"}
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
        activePage="create"
        module="expiry-items"
        additionalFooterButtons={
          canCreate ? (
            <div className="flex gap-4 max-[435px]:gap-2">
              <Button
                variant="outline"
                className="gap-2 hover:bg-primary/90! bg-white dark:bg-gray-900 rounded-full border-primary w-28 max-[435px]:w-20 font-semibold! text-primary!"
                onClick={handleResetClick}
              >
                {labels.reset}
              </Button>
              <Button
                variant="outline"
                className="gap-2 hover:bg-primary/90 bg-white dark:bg-gray-900 rounded-full border-primary w-28 max-[435px]:w-20 font-semibold! text-primary!"
                onClick={handleSubmit}
              >
                {labels.submit}
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
            className="space-y-6 relative"
          >
            {/* First Row: Item Name, Batch Number, Expiry Date, Quantity */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
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

              {expiryDatePerm && (
                <div className="space-y-2 relative">
                  <div className="relative">
                    <input
                      ref={(el) => setRef("expiryDate")(el)}
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
                    tooltipText="Enter the unit (e.g., Tablets, Bottles)"
                    required
                  />
                </div>
              )}

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
                    tooltipText="Enter the category (e.g., Medicine, Supplements)"
                    required
                  />
                </div>
              )}

              {supplierPerm && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("supplier")}
                    id="supplier"
                    name="supplier"
                    value={formData.supplier}
                    onChange={handleChange}
                    onNext={() => focusNextInput("statusSwitch")}
                    onCancel={() => setFormData({ ...formData, supplier: "" })}
                    labelText="Supplier"
                    tooltipText="Enter the supplier name"
                    required
                  />
                </div>
              )}
            </div>

            {/* Third Row: Default, Status */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {isDefaultPerm && (
                <div className="space-y-2 relative">
                  <SwitchSelect
                    ref={(el: any) => setRef("isDefault")(el)}
                    id="isDefault"
                    name="isDefault"
                    multiSelect={false}
                    options={[
                      {
                        label: labels.yes,
                        value: labels.yes,
                        date: "Set default",
                      },
                      {
                        label: labels.no,
                        value: labels.no,
                        date: "Unset default",
                      },
                    ]}
                    value={formData.isDefault ? labels.yes : labels.no}
                    labelClassName="rounded-lg"
                    onValueChange={(value: string | string[]) => {
                      const isYes = Array.isArray(value)
                        ? value[0] === labels.yes
                        : value === labels.yes;
                      setFormData((prev) => ({ ...prev, isDefault: isYes }));
                    }}
                    placeholder=" "
                    labelText="Default"
                    className="relative"
                    tooltipText="Mark as default expiry item"
                  />
                </div>
              )}

              {statusPerm && (
                <div className="space-y-2">
                  <SwitchSelect
                    ref={(el: any) => setRef("statusSwitch")(el)}
                    id="statusSwitch"
                    name="statusSwitch"
                    labelText="Status"
                    multiSelect={false}
                    options={[
                      { label: "Active", value: "Active", date: "Set active" },
                      {
                        label: "Inactive",
                        value: "Inactive",
                        date: "Set inactive",
                      },
                      { label: "Draft", value: "Draft", date: "Set draft" },
                    ]}
                    value={formData.status}
                    onValueChange={(value: string | string[]) => {
                      const stringValue = Array.isArray(value)
                        ? value[0] || ""
                        : value;
                      setFormData((prev) => ({
                        ...prev,
                        status: stringValue as "Active" | "Inactive" | "Draft",
                        isDraft: stringValue === "Draft",
                        isActive: stringValue === "Active",
                      }));
                    }}
                    placeholder=""
                    styles={{
                      input: {
                        borderColor: "var(--primary)",
                        "&:focus": { borderColor: "var(--primary)" },
                      },
                    }}
                    tooltipText="Set the expiry item status"
                  />
                </div>
              )}
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
        title={labels.resetForm}
        message={labels.resetFormMessage}
        confirmText={labels.resetFormConfirm}
        cancelText={labels.cancel}
      />
    </>
  );
}
