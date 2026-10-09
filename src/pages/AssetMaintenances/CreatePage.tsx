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
import { Check, Edit, Eye, Plus, MoreVertical } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCountriesPermissions, usePermission } from "@/hooks/usePermissions";
import { useLanguageLabels } from "@/hooks/useLanguageLabels";
import { useAppSelector } from "@/store/hooks";
import MinimizablePageLayout from "@/components/MinimizablePageLayout";
import { SwitchSelect } from "@/components/common/SwitchAutoComplete";
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
  status: "active" | "inactive" | "draft";
  isDefault: boolean;
  isActive: boolean;
  isDraft: boolean;
  isDeleted: boolean;
  isUpdated: boolean;
  createdAt: Date | null;
  draftedAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;
};

type Props = {
  isEdit?: boolean;
};

const initialData: AssetMaintenanceData = {
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
  isUpdated: false,
  createdAt: new Date(),
  draftedAt: null,
  updatedAt: new Date(),
  deletedAt: null,
};

export default function AssetMaintenanceFormPage({ isEdit = false }: Props) {
  const navigate = useNavigate();
  const labels = useLanguageLabels();
  const { isRTL } = useAppSelector((state) => state.language);

  const [keepCreating, setKeepCreating] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [printEnabled, setPrintEnabled] = useState(false);
  const [pdfChecked, setPdfChecked] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [formKey, setFormKey] = useState(0);
  const [isDefaultState, setIsDefaultState] = useState<"Yes" | "No">("No");
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
    "create",
    "asset"
  );
  const maintenanceTypePerm: boolean = usePermission(
    "asset-maintenances",
    "create",
    "maintenanceType"
  );
  const titlePerm: boolean = usePermission(
    "asset-maintenances",
    "create",
    "title"
  );
  const startDatePerm: boolean = usePermission(
    "asset-maintenances",
    "create",
    "startDate"
  );
  const completionDatePerm: boolean = usePermission(
    "asset-maintenances",
    "create",
    "completionDate"
  );
  const warrantyImprovementPerm: boolean = usePermission(
    "asset-maintenances",
    "create",
    "warrantyImprovement"
  );
  const costPerm: boolean = usePermission(
    "asset-maintenances",
    "create",
    "cost"
  );
  const notesPerm: boolean = usePermission(
    "asset-maintenances",
    "create",
    "notes"
  );
  const statusPerm: boolean = usePermission(
    "asset-maintenances",
    "create",
    "status"
  );
  const isDefaultPerm: boolean = usePermission(
    "asset-maintenances",
    "create",
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
    isUpdated: false,
    createdAt: null,
    draftedAt: null,
    updatedAt: null,
    deletedAt: null,
  });

  // Update translation data when title changes
  useEffect(() => {
    setTranslations([
      { id: 1, english: formData.title || "", arabic: "", bangla: "" },
    ]);
  }, [formData.title]);

  // Initialize with edit data if available
  useEffect(() => {
    if (isEdit && initialData) {
      setFormData(initialData);
      setIsDefaultState(initialData.isDefault ? "Yes" : "No");
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
          navigate("/asset-maintenances/create");
        } else {
          navigate("/asset-maintenances/edit/undefined");
        }
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
      toastSuccess("Asset Maintenance created successfully!");
      handleReset();
    } else {
      toastSuccess("Asset Maintenance created successfully!");
      navigate("/asset-maintenances");
    }
  };

  const handleResetClick = () => {
    setIsResetModalOpen(true);
  };

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
      isUpdated: false,
      createdAt: new Date(),
      draftedAt: null,
      updatedAt: new Date(),
      deletedAt: null,
    });
    setIsDefaultState("No");

    if (formRef.current) {
      formRef.current.reset();
    }

    // Force re-render of all inputs by changing key
    setFormKey((prev) => prev + 1);

    // Focus the first input field after reset
    setTimeout(() => {
      inputRefs.current["asset"]?.focus();
    }, 100);
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
          isActive: "Active",
          isDraft: "Draft",
          isDeleted: "Deleted",
          isUpdated: "Updated",
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
              toastRestore("Asset Maintenance saved as draft successfully");
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
        moduleId="asset-maintenance-form-module"
        moduleName={
          isEdit ? "Edit Asset Maintenance" : "Adding Asset Maintenance"
        }
        moduleRoute={
          isEdit
            ? `/asset-maintenances/edit/${formData.title || "new"}`
            : "/asset-maintenances/create"
        }
        onMinimize={handleMinimize}
        title={isEdit ? "Edit Asset Maintenance" : "Add Asset Maintenance"}
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
        activePage="create"
        module="asset-maintenances"
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

            {/* Status and Default sections */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {/* Status and Default sections */}

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
                        date: "Set default asset maintenance",
                      },
                      {
                        label: labels.no,
                        value: labels.no,
                        date: "Remove default asset maintenance",
                      },
                    ]}
                    value={isDefaultState === "Yes" ? labels.yes : labels.no}
                    labelClassName="rounded-lg"
                    onValueChange={(value: string | string[]) => {
                      const isYes = Array.isArray(value)
                        ? value[0] === labels.yes
                        : value === labels.yes;
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
                        // no-op
                      }
                    }}
                    placeholder=" "
                    labelText="Default"
                    className="relative"
                    tooltipText="Set as default asset maintenance"
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
                      { label: "Active", value: "active", date: "Set active" },
                      {
                        label: "Inactive",
                        value: "inactive",
                        date: "Set inactive",
                      },
                      { label: "Draft", value: "draft", date: "Set draft" },
                    ]}
                    value={formData.status}
                    onValueChange={(value: string | string[]) => {
                      const stringValue = (
                        Array.isArray(value) ? value[0] : value
                      ) as "active" | "inactive" | "draft";
                      setFormData((prev) => ({
                        ...prev,
                        status: stringValue,
                        isDraft: stringValue === "draft",
                        isActive: stringValue === "active",
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
