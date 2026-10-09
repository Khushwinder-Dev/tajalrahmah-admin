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
import { useColorsPermissions, usePermission } from "@/hooks/usePermissions";
import { useLanguageLabels } from "@/hooks/useLanguageLabels";
import { useAppSelector } from "@/store/hooks";
import MinimizablePageLayout from "@/components/MinimizablePageLayout";
import { SwitchSelect } from "@/components/common/SwitchAutoComplete";
import DynamicInputTableList from "./dynamic-input-table/DynamicInputTableList";

type DamageItemData = {
  itemId: string;
  quantityDamaged: number;
  documentDate: Date | null;
  reportedBy: string;
  location: string;
  damageType: string;
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

const initialData: DamageItemData = {
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
};

export default function DamageItemFormPage({ isEdit = false }: Props) {
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
  const { canCreate, canView } = useColorsPermissions();

  // Field-level permissions
  const itemIdPerm: boolean = usePermission("damage-items", "create", "itemId");
  const quantityDamagedPerm: boolean = usePermission(
    "damage-items",
    "create",
    "quantityDamaged"
  );
  const documentDatePerm: boolean = usePermission(
    "damage-items",
    "create",
    "documentDate"
  );
  const reportedByPerm: boolean = usePermission(
    "damage-items",
    "create",
    "reportedBy"
  );
  const locationPerm: boolean = usePermission(
    "damage-items",
    "create",
    "location"
  );
  const damageTypePerm: boolean = usePermission(
    "damage-items",
    "create",
    "damageType"
  );
  const statusPerm: boolean = usePermission("damage-items", "create", "status");
  const isDefaultPerm: boolean = usePermission(
    "damage-items",
    "create",
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
          navigate("/damage-items/create");
        } else {
          navigate("/damage-items/edit/undefined");
        }
      },
      show: canCreate,
    },
    {
      label: "View",
      icon: <Eye className="w-5 h-5 text-green-600" />,
      onClick: () => {
        navigate("/damage-items/view");
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
      handlePrintDamageItem(formData);
    }

    // keep switch functionality
    if (keepCreating) {
      toastSuccess("Damage item created successfully!");
      handleReset();
    } else {
      toastSuccess("Damage item created successfully!");
      navigate("/damage-items");
    }
  };

  const handleResetClick = () => {
    setIsResetModalOpen(true);
  };

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

    if (formRef.current) {
      formRef.current.reset();
    }

    // Force re-render of all inputs by changing key
    setFormKey((prev) => prev + 1);

    // Focus the first input field after reset
    setTimeout(() => {
      inputRefs.current["name"]?.focus();
    }, 100);
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
              toastRestore("Damage item saved as draft successfully");
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
        moduleId="damage-item-form-module"
        moduleName={isEdit ? "Edit Damage Item" : "Adding Damage Item"}
        moduleRoute={
          isEdit
            ? `/damage-items/edit/${formData.itemId || "new"}`
            : "/damage-items/create"
        }
        onMinimize={handleMinimize}
        title={isEdit ? "Edit Damage Item" : "Add Damage Item"}
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
        activePage="create"
        module="damage-items"
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
            {/* First Row: Item ID, Quantity Damaged, Document Date, Reported By */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
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

              {documentDatePerm && (
                <div className="space-y-2 relative">
                  <div className="relative">
                    <input
                      ref={(el) => setRef("documentDate")(el)}
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

            {/* Second Row: Location, Damage Type, Default, Status */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
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

              {damageTypePerm && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("damageType")}
                    id="damageType"
                    name="damageType"
                    value={formData.damageType}
                    onChange={handleChange}
                    onNext={() => focusNextInput("statusSwitch")}
                    onCancel={() =>
                      setFormData({ ...formData, damageType: "" })
                    }
                    labelText="Damage Type"
                    tooltipText="Enter the type of damage"
                    required
                  />
                </div>
              )}

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
                    tooltipText="Mark as default damage item"
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
                    tooltipText="Set the damage item status"
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
