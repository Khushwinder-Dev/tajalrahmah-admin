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
import { Check, Eye, Plus, MoreVertical } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCountriesPermissions, usePermission } from "@/hooks/usePermissions";
// import { useLanguageLabels } from "@/hooks/useLanguageLabels";
import { useAppSelector } from "@/store/hooks";
import MinimizablePageLayout from "@/components/MinimizablePageLayout";
import { useMinimizedModuleData } from "@/hooks/useMinimizedModuleData";
import { SwitchSelect } from "@/components/common/SwitchAutoComplete";
import { ActionsAutocomplete } from "@/components/common/ActionsAutocomplete";
import LanguageTranslatorModal from "@/components/common/LanguageTranslatorModel";

type AssetMaintenanceData = {
  asset: string;
  maintenanceType: string;
  title: string;
  startDate: string;
  completionDate: string;
  warrantyImprovement: string;
  cost: number;
  notes: string;
  status: "active" | "inactive" | "draft" | "deleted";
  isDefault: boolean;
  isActive: boolean;
  isDraft: boolean;
  isDeleted: boolean;
  createdAt: Date | null;
  draftedAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;
};

type AssetMaintenanceModuleData = {
  formData: AssetMaintenanceData;
  hasChanges: boolean;
  scrollPosition: number;
};

type Props = {
  isEdit?: boolean;
};

const initialData: AssetMaintenanceData = {
  asset: "Server Room AC Unit",
  maintenanceType: "Preventive",
  title: "Quarterly AC Maintenance",
  startDate: "2024-01-15",
  completionDate: "2024-01-16",
  warrantyImprovement: "Extended warranty by 6 months",
  cost: 1500,
  notes:
    "Cleaned filters, checked refrigerant levels, tested cooling efficiency.",
  status: "active",
  isDefault: false,
  isActive: true,
  isDraft: false,
  isDeleted: false,
  createdAt: new Date(),
  draftedAt: null,
  updatedAt: new Date(),
  deletedAt: null,
};

export default function AssetMaintenanceEditPage({ isEdit = true }: Props) {
  const navigate = useNavigate();
  const { id } = useParams();
  // const labels = useLanguageLabels();
  const { isRTL } = useAppSelector((state) => state.language);

  // Get module ID for this edit page
  const moduleId = `asset-maintenance-edit-module-${id || "new"}`;

  // Use the custom hook for minimized module data
  const {
    moduleData,
    hasMinimizedData,
    resetModuleData,
    getModuleScrollPosition,
  } = useMinimizedModuleData<AssetMaintenanceModuleData>(moduleId);

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
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);

  // Translation state
  const [translations, setTranslations] = useState([
    { id: 1, english: "", arabic: "", bangla: "" },
  ]);

  // Permission checks
  const { canCreate, canView } = useCountriesPermissions();

  // Field-level permissions
  const assetPerm: boolean = usePermission(
    "asset-maintenances",
    "edit",
    "asset"
  );
  const maintenanceTypePerm: boolean = usePermission(
    "asset-maintenances",
    "edit",
    "maintenanceType"
  );
  const titlePerm: boolean = usePermission(
    "asset-maintenances",
    "edit",
    "title"
  );
  const startDatePerm: boolean = usePermission(
    "asset-maintenances",
    "edit",
    "startDate"
  );
  const completionDatePerm: boolean = usePermission(
    "asset-maintenances",
    "edit",
    "completionDate"
  );
  const warrantyImprovementPerm: boolean = usePermission(
    "asset-maintenances",
    "edit",
    "warrantyImprovement"
  );
  const costPerm: boolean = usePermission("asset-maintenances", "edit", "cost");
  const notesPerm: boolean = usePermission(
    "asset-maintenances",
    "edit",
    "notes"
  );
  const statusPerm: boolean = usePermission(
    "asset-maintenances",
    "edit",
    "status"
  );
  const isDefaultPerm: boolean = usePermission(
    "asset-maintenances",
    "edit",
    "isDefault"
  );
  const canPdf: boolean = usePermission("asset-maintenances", "pdf");
  const canPrint: boolean = usePermission("asset-maintenances", "print");

  // Form state
  const [formData, setFormData] = useState<AssetMaintenanceData>({
    asset: "",
    maintenanceType: "Preventive",
    title: "",
    startDate: "",
    completionDate: "",
    warrantyImprovement: "None",
    cost: 0,
    notes: "",
    status: "active",
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

  // Update translation data when title changes
  useEffect(() => {
    setTranslations([
      { id: 1, english: formData.title || "", arabic: "", bangla: "" },
    ]);
  }, [formData.title]);

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
        !formData.title);

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
    formData.title,
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
      setIsDefaultState(initialData.isDefault ? "Yes" : "No");
    }
  }, [isEdit, hasMinimizedData, isRestoredFromMinimized, moduleId]);

  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const newFormData = {
      ...formData,
      [name]: type === "checkbox" ? checked : value,
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
      handlePrintReport(formData);
    }

    // keep switch functionality
    if (keepCreating) {
      toastSuccess("Asset Maintenance updated successfully!");
      handleReset();
    } else {
      toastSuccess("Asset Maintenance updated successfully!");
      navigate("/asset-maintenances");
    }
  };

  // Update handleReset function to use the custom hook
  const handleReset = async () => {
    setFormData({
      asset: "",
      maintenanceType: "Preventive",
      title: "",
      startDate: "",
      completionDate: "",
      warrantyImprovement: "None",
      cost: 0,
      notes: "",
      status: "active",
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
      inputRefs.current["asset"]?.focus();
    }, 100);
  };

  const handleResetClick = () => {
    setIsResetModalOpen(true);
  };

  const handlePrintReport = (reportData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Asset Maintenance Details",
        data: [reportData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          asset: "Asset",
          maintenanceType: "Maintenance Type",
          title: "Title",
          startDate: "Start Date",
          completionDate: "Completion Date",
          warrantyImprovement: "Warranty Improvement",
          cost: "Cost",
          notes: "Notes",
          status: "Status",
          isDefault: "Default",
          isActive: "Active",
          isDraft: "Draft",
          isDeleted: "Deleted",
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
          title="Asset Maintenance Details"
          subtitle="Asset Maintenance Information"
        />
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "asset-maintenance-details.pdf";
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
        navigate("/asset-maintenances/create");
      },
      show: canCreate,
    },
    {
      label: "View",
      icon: <Eye className="w-5 h-5 text-green-600" />,
      onClick: () => {
        navigate("/asset-maintenances/view");
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
              toastRestore("Asset Maintenance saved as draft successfully");
            },
            show: canCreate,
          },
        ];
      }
      return filteredOptions;
    });
  }, [formData.isDraft, canCreate]);

  // Create minimize handler using the custom hook
  const handleMinimize = useCallback((): AssetMaintenanceModuleData => {
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
        moduleName={`Edit Asset Maintenance`}
        moduleRoute={`/asset-maintenances/edit/${id || "new"}`}
        onMinimize={handleMinimize}
        title="Edit Asset Maintenance"
        listPath="asset-maintenances"
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
        module="asset-maintenances"
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
            {/* Fields: Asset, Maintenance Type, Title, Start Date */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {assetPerm && (
                <div className="space-y-2">
                  <div className="relative">
                    <EditableInput
                      setRef={setRef("asset")}
                      id="asset"
                      name="asset"
                      value={formData.asset}
                      onChange={handleChange}
                      onNext={() => focusNextInput("maintenanceType")}
                      onCancel={() => setFormData({ ...formData, asset: "" })}
                      labelText="Asset"
                      tooltipText="Enter the asset name"
                      required
                    />
                    <MoreVertical
                      className="h-4 w-4 cursor-pointer absolute right-8 top-6 transform -translate-y-1/2"
                      onClick={() => setIsOptionModalOpen(true)}
                    />
                  </div>
                </div>
              )}

              {maintenanceTypePerm && (
                <div className="space-y-2">
                  <SwitchSelect
                    ref={(el: any) => setRef("maintenanceType")(el)}
                    id="maintenanceType"
                    name="maintenanceType"
                    labelText="Maintenance Type"
                    multiSelect={false}
                    options={[
                      {
                        label: "Preventive",
                        value: "Preventive",
                        date: "Set preventive maintenance",
                      },
                      {
                        label: "Corrective",
                        value: "Corrective",
                        date: "Set corrective maintenance",
                      },
                      {
                        label: "Inspection",
                        value: "Inspection",
                        date: "Set inspection maintenance",
                      },
                      {
                        label: "Upgrade",
                        value: "Upgrade",
                        date: "Set upgrade maintenance",
                      },
                      {
                        label: "Emergency",
                        value: "Emergency",
                        date: "Set emergency maintenance",
                      },
                    ]}
                    value={formData.maintenanceType}
                    onValueChange={(value: string | string[]) => {
                      const stringValue = Array.isArray(value)
                        ? value[0]
                        : value;
                      setFormData((prev) => ({
                        ...prev,
                        maintenanceType: stringValue,
                      }));
                    }}
                    placeholder=""
                    tooltipText="Set the maintenance type"
                  />
                </div>
              )}

              {titlePerm && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("title")}
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    onNext={() => focusNextInput("startDate")}
                    onCancel={() => setFormData({ ...formData, title: "" })}
                    labelText="Title"
                    tooltipText="Enter the maintenance title"
                    required
                  />
                </div>
              )}

              {startDatePerm && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("startDate")}
                    id="startDate"
                    name="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={handleChange}
                    onNext={() => focusNextInput("completionDate")}
                    onCancel={() => setFormData({ ...formData, startDate: "" })}
                    labelText="Start Date"
                    tooltipText="Enter the start date"
                    required
                  />
                </div>
              )}
            </div>

            {/* Fields: Completion Date, Warranty Improvement, Cost, Notes */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {completionDatePerm && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("completionDate")}
                    id="completionDate"
                    name="completionDate"
                    type="date"
                    value={formData.completionDate}
                    onChange={handleChange}
                    onNext={() => focusNextInput("warrantyImprovement")}
                    onCancel={() =>
                      setFormData({ ...formData, completionDate: "" })
                    }
                    labelText="Completion Date"
                    tooltipText="Enter the completion date"
                    required
                  />
                </div>
              )}

              {warrantyImprovementPerm && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("warrantyImprovement")}
                    id="warrantyImprovement"
                    name="warrantyImprovement"
                    value={formData.warrantyImprovement}
                    onChange={handleChange}
                    onNext={() => focusNextInput("cost")}
                    onCancel={() =>
                      setFormData({ ...formData, warrantyImprovement: "None" })
                    }
                    labelText="Warranty Improvement"
                    tooltipText="Enter warranty improvement details"
                    required
                  />
                </div>
              )}

              {costPerm && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("cost")}
                    id="cost"
                    name="cost"
                    type="number"
                    value={formData.cost.toString()}
                    onChange={handleChange}
                    onNext={() => focusNextInput("notes")}
                    onCancel={() => setFormData({ ...formData, cost: 0 })}
                    labelText="Cost"
                    tooltipText="Enter the maintenance cost"
                    required
                  />
                </div>
              )}

              {notesPerm && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("notes")}
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    onNext={() => focusNextInput("status")}
                    onCancel={() => setFormData({ ...formData, notes: "" })}
                    labelText="Notes"
                    tooltipText="Enter maintenance notes"
                  />
                </div>
              )}
            </div>

            {/* Fields: Status, Default */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
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
                        value: "active",
                        date: "Set active asset maintenance",
                      },
                      {
                        label: "Inactive",
                        value: "InActive",
                        date: "Set inactive asset maintenance",
                      },
                      {
                        label: "Draft",
                        value: "Draft",
                        date: "Set draft asset maintenance",
                      },
                      {
                        label: "Delete",
                        value: "Delete",
                        date: "Set delete asset maintenance",
                      },
                    ]}
                    value={formData.status}
                    onValueChange={(value: string | string[]) => {
                      const stringValue = Array.isArray(value)
                        ? value[0] || ""
                        : value;
                      console.log("switch value", stringValue);
                      setFormData((prev) => ({
                        ...prev,
                        status: stringValue as
                          | "active"
                          | "inactive"
                          | "draft"
                          | "deleted",
                        isDeleted: stringValue === "deleted",
                        isDraft: stringValue === "Draft",
                        isActive: stringValue === "Active",
                      }));

                      // Update your form data
                      setFormData((prev) => ({
                        ...prev,
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
                    tooltipText="Set the asset maintenance status"
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
                        date: "Set default asset maintenance",
                      },
                      {
                        label: "No",
                        value: "No",
                        date: "Remove default asset maintenance",
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
                    tooltipText="Set as default asset maintenance"
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
                  tooltipText="Asset Maintenance Action History"
                />
              </div>
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

      {/* Language Translator Modal */}
      <LanguageTranslatorModal
        isOpen={isOptionModalOpen}
        onClose={() => setIsOptionModalOpen(false)}
        title="Asset Maintenance Language Translator"
        initialData={translations}
        onSave={(data) => {
          setTranslations(data);
          console.log("Asset Maintenance translations saved:", data);
        }}
      />
    </>
  );
}
