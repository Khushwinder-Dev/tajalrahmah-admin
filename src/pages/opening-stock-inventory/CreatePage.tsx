/* eslint-disable @typescript-eslint/no-explicit-any */
import video from "@/assets/videos/test.mp4";
import { Autocomplete } from "@/components/common/Autocomplete";
import EditableInput from "@/components/common/EditableInput";
import GenericPDF from "@/components/common/pdf";
import { ResetFormModal } from "@/components/common/ResetFormModal";
import { Button } from "@/components/ui/button";
import { PrintCommonLayout } from "@/lib/printContents/PrintCommonLayout";
import { printHtmlContent } from "@/lib/printHtmlContent";
import { toastError, toastRestore, toastSuccess } from "@/lib/toast";
import { Modal } from "@mantine/core";
import { pdf } from "@react-pdf/renderer";
import { Check, Edit, Eye, Plus } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { usePermission } from "@/hooks/usePermissions";
import { useLanguageLabels } from "@/hooks/useLanguageLabels";
import { useAppSelector } from "@/store/hooks";
import type { OpeningStockModuleData } from "@/types/modules";
import MinimizablePageLayout from "@/components/MinimizablePageLayout";
import { useOpeningStockFormData } from "@/hooks/useModuleFormData";
import { SwitchSelect } from "@/components/common/SwitchAutoComplete";
import { TemplateContent } from "@/components/common/TemplateContent";
import { cn } from "@/lib/utils";
import { getModuleFromPath } from "@/lib/utils";
import LanguageTranslatorModal from "@/components/common/LanguageTranslatorModel";
import DynamicInputTableList from "./dynamic-input-table/DynamicInputTableList";
import EnglishDate from "@/components/EnglishDateInput";
import type { RootState } from "@/store";

// Define OpeningStock interface
interface OpeningStock {
  id: string;
  documentNumber: string;
  branch: string;
  poNumber: string;
  documentDate: string;
  remarks: string;
  amount: number;
  isActive: boolean;
  isDefault: boolean;
  isDraft: boolean;
  createdAt: Date | null;
  draftedAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;
  isDeleted: boolean;
}

// Mock branch data - memoized to prevent recreation
const MOCK_BRANCHES = [
  "Main Branch",
  "North Branch",
  "South Branch",
  "East Branch",
  "West Branch",
  "Central Branch",
  "Downtown Branch",
  "Suburban Branch",
  "Uptown Branch",
  "Riverside Branch",
  "Hillside Branch",
  "Lakeside Branch",
  "Garden Branch",
  "Plaza Branch",
  "Metro Branch",
  "Business District",
  "Airport Branch",
  "Mall Branch",
  "Harbor Branch",
  "Industrial Branch",
];

type Props = {
  isEdit?: boolean;
};

// Generate incremental document number
const generateDocumentNumber = () => {
  const lastNumber = localStorage.getItem("lastOpeningStockNumber") || "0";
  const nextNumber = (parseInt(lastNumber) + 1).toString().padStart(3, "0");
  localStorage.setItem("lastOpeningStockNumber", nextNumber);
  return `OS${nextNumber}`;
};

// Initial data factory function
const createInitialData = (): OpeningStock => ({
  id: "1",
  documentNumber: generateDocumentNumber(),
  branch: "",
  poNumber: "",
  documentDate: "",
  remarks: "",
  amount: 0,
  isActive: true,
  isDefault: false,
  isDraft: false,
  createdAt: new Date(),
  draftedAt: null,
  updatedAt: new Date(),
  deletedAt: null,
  isDeleted: false,
});

export default function OpeningStockInventoryCreatePage({
  isEdit = false,
}: Props) {
  const navigate = useNavigate();
  const location = useLocation();
  const labels = useLanguageLabels();
  const { isRTL } = useAppSelector((state: RootState) => state.language);

  const detectedModule = getModuleFromPath(location.pathname);

  // Use the custom hook for minimized module data
  const {
    moduleData,
    hasMinimizedData,
    resetModuleData,
    getModuleScrollPosition,
  } = useOpeningStockFormData();

  const [showTemplates, setShowTemplates] = useState(false);
  const [keepCreating, setKeepCreating] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [isDefaultState, setIsDefaultState] = useState<"Yes" | "No">("No");
  const [statusState, setStatusState] = useState<"Active" | "Draft" | string>(
    "Active"
  );
  const [printEnabled, setPrintEnabled] = useState(false);
  const [pdfChecked, setPdfChecked] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [formKey, setFormKey] = useState(0);
  const [isRestoredFromMinimized, setIsRestoredFromMinimized] = useState(false);

  // Translation state
  const [translations, setTranslations] = useState([
    { id: 1, english: "", arabic: "", bangla: "" },
  ]);

  // Permission checks
  const canCreate = usePermission(detectedModule, "create");
  const canView = usePermission(detectedModule, "view");
  const canPdf: boolean = usePermission(detectedModule, "pdf");
  const canPrint: boolean = usePermission(detectedModule, "print");

  // Form state
  const [formData, setFormData] = useState<OpeningStock>(() =>
    createInitialData()
  );

  // Memoize branch data to prevent unnecessary re-renders
  const memoizedBranches = useMemo(() => [...MOCK_BRANCHES], []);

  // Update translation data when remarks change
  const updateTranslations = useCallback((remarks: string) => {
    setTranslations([
      { id: 1, english: remarks || "", arabic: "", bangla: "" },
    ]);
  }, []);

  useEffect(() => {
    updateTranslations(formData.remarks);
  }, [formData.remarks, updateTranslations]);

  // Simplified restore logic using the custom hook
  useEffect(() => {
    const shouldAutoRestore =
      hasMinimizedData &&
      moduleData &&
      !isRestoredFromMinimized &&
      !formData.branch &&
      !formData.documentNumber;

    if (shouldAutoRestore) {
      setFormData({
        ...(moduleData as any),
        isDraft: (moduleData as any)?.isDraft || false,
      });

      setIsDefaultState(moduleData.isDefault ? "Yes" : "No");
      setStatusState(moduleData.isDraft ? "Draft" : "Active");

      setIsRestoredFromMinimized(true);

      const scrollPosition = getModuleScrollPosition(
        "opening-stock-form-module"
      );
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
    formData.branch,
    formData.documentNumber,
    getModuleScrollPosition,
  ]);

  // Initialize with edit data if available
  useEffect(() => {
    if (isEdit && !hasMinimizedData && !isRestoredFromMinimized) {
      const initialData = createInitialData();
      setFormData(initialData);
      setIsDefaultState(initialData.isDefault ? "Yes" : "No");
      setStatusState(initialData.isDraft ? "Draft" : "Active");
    }
  }, [isEdit, hasMinimizedData, isRestoredFromMinimized]);

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
          navigate(`/${detectedModule}/create`);
        } else {
          navigate(`/${detectedModule}/edit/undefined`);
        }
      },
      show: canCreate,
    },
    {
      label: "View",
      icon: <Eye className="w-5 h-5 text-green-600" />,
      onClick: () => {
        navigate(`/${detectedModule}/view`);
      },
      show: canView,
    },
  ]);

  // Refs for form elements
  const inputRefs = useRef<Record<string, HTMLElement | null>>({});
  const setRef = (name: string) => (el: HTMLElement | null) => {
    inputRefs.current[name] = el;
  };
  const focusNextInput = (nextField: string) => {
    inputRefs.current[nextField]?.focus();
  };

  // Handle form field changes
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value, type, checked } = e.target;
      const newFormData = {
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      };
      setFormData(newFormData);
    },
    [formData]
  );

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (pdfChecked) {
      await handleExportPDF();
    }
    if (printEnabled) {
      handlePrintOpeningStock(formData);
    }

    if (keepCreating) {
      toastSuccess(
        `${detectedModule} ${isEdit ? "updated" : "created"} successfully!`
      );
      handleReset();
    } else {
      toastSuccess(
        `${detectedModule} ${isEdit ? "updated" : "created"} successfully!`
      );
      navigate(`/${detectedModule}`);
    }
  };

  const handleResetClick = () => {
    setIsResetModalOpen(true);
  };

  // Update handleReset function
  const handleReset = async () => {
    const newData = createInitialData();
    setFormData(newData);
    setIsDefaultState("No");
    setStatusState("Active");
    setIsRestoredFromMinimized(false);

    if (formRef.current) {
      formRef.current.reset();
    }

    setFormKey((prev) => prev + 1);

    if (hasMinimizedData) {
      try {
        await resetModuleData("opening-stock-form-module");
        console.log("Form data reset in Redux");
      } catch (error) {
        console.error("Error resetting form data:", error);
      }
    }

    setTimeout(() => {
      inputRefs.current["documentNumber"]?.focus();
    }, 100);
  };

  const handlePrintOpeningStock = useCallback(
    (stockData: any) => {
      try {
        const html = PrintCommonLayout({
          title: `${detectedModule} Details`,
          data: [stockData],
          excludeFields: ["id", "__v", "_id"],
          fieldLabels: {
            documentNumber: "Document Number",
            branch: "Branch",
            poNumber: "P.O Number",
            documentDate: "Document Date",
            remarks: "Remarks",
            amount: "Amount",
            isActive: "Active Status",
            isDefault: labels.default,
            isDraft: labels.draft,
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
    },
    [detectedModule, labels]
  );

  const handleSwitchChange = (checked: boolean) => {
    setPrintEnabled(checked);
    if (checked && formData) {
      setTimeout(() => handlePrintOpeningStock(formData), 100);
    }
  };

  const handlePDFSwitchChange = (pdfChecked: boolean) => {
    setPdfChecked(pdfChecked);
    if (pdfChecked) {
      setTimeout(() => handleExportPDF(), 100);
    }
  };

  const handleExportPDF = async () => {
    try {
      const blob = await pdf(
        <GenericPDF
          data={[formData]}
          title={`${detectedModule} Details`}
          subtitle={`${detectedModule} Information`}
        />
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${detectedModule}-details.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error);
      toastError("Something went wrong when generating PDF");
    }
  };

  useEffect(() => {
    setPopoverOptions((prevOptions) => {
      const filteredOptions = prevOptions.filter(
        (opt) => opt.label !== "Draft"
      );

      if (!formData.isDraft) {
        return [
          ...filteredOptions,
          {
            label: labels.draft || "Draft",
            icon: <Check className="text-green-500" />,
            onClick: () => {
              setFormData((prev) => ({
                ...prev,
                isDraft: true,
              }));
              toastRestore(`${detectedModule} saved as draft successfully`);
            },
            show: canCreate,
          },
        ];
      }
      return filteredOptions;
    });
  }, [formData.isDraft, canCreate, detectedModule, labels]);

  // Branch change handler
  const handleBranchChange = useCallback((value: string | null) => {
    setFormData((prev) => ({ ...prev, branch: value || "" }));
  }, []);

  // Translation handlers
  const handleTranslationSave = useCallback((data: any) => {
    setTranslations(data);
    console.log("Opening Stock translations saved:", data);
  }, []);

  // Create minimize handler
  const handleMinimize = useCallback((): OpeningStockModuleData => {
    return {
      formData,
      hasChanges: true,
      scrollPosition: window.scrollY,
      isDraft: formData.isDraft,
      isDefault: formData.isDefault,
    };
  }, [formData]);

  return (
    <>
      <MinimizablePageLayout
        moduleId="opening-stock-form-module"
        moduleName={
          isEdit ? `Edit ${detectedModule}` : `Adding ${detectedModule}`
        }
        moduleRoute={
          isEdit
            ? `/${detectedModule}/edit/${formData.documentNumber || "new"}`
            : `/${detectedModule}/create`
        }
        onMinimize={handleMinimize}
        title={
          isEdit ? `Editing ${detectedModule}` : `Creating ${detectedModule}`
        }
        listPath="opening-stock-inventory"
        popoverOptions={popoverOptions}
        videoSrc={video}
        videoHeader="Tutorial video"
        keepChanges={keepCreating}
        onKeepChangesChange={setKeepCreating}
        pdfChecked={pdfChecked}
        onPdfToggle={canPdf ? handlePDFSwitchChange : undefined}
        printEnabled={printEnabled}
        onPrintToggle={canPrint ? handleSwitchChange : undefined}
        activePage={isEdit ? "edit" : "create"}
        module={detectedModule}
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
            {/* First Row: Main form fields */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {/* Document Number */}
              <div className="space-y-2">
                <EditableInput
                  setRef={setRef("documentNumber")}
                  id="documentNumber"
                  name="documentNumber"
                  value={formData.documentNumber}
                  onChange={handleChange}
                  onNext={() => focusNextInput("branch")}
                  onCancel={() => {}}
                  labelText="Document Number"
                  tooltipText="Auto-generated document number"
                  required
                  readOnly
                  className="bg-gray-100"
                />
              </div>

              {/* Branch */}
              <div className="space-y-2">
                <Autocomplete
                  ref={(el: any) => setRef("branch")(el)}
                  id="branch"
                  name="branch"
                  allowCustomInput={true}
                  options={memoizedBranches}
                  value={formData.branch}
                  onValueChange={handleBranchChange}
                  onEnterPress={() => focusNextInput("poNumber")}
                  placeholder=""
                  labelText="Branch"
                  className="relative"
                  tooltipText="Select the branch for opening stock"
                  userLang={isRTL ? "ar" : "en"}
                  styles={{
                    input: {
                      borderColor: "var(--primary)",
                      "&:focus": {
                        borderColor: "var(--primary)",
                      },
                    },
                  }}
                  setShowTemplates={setShowTemplates}
                  showTemplates={showTemplates}
                  isShowTemplateIcon={true}
                />
              </div>

              {/* P.O Number */}
              <div className="space-y-2">
                <EditableInput
                  setRef={setRef("poNumber")}
                  id="poNumber"
                  name="poNumber"
                  value={formData.poNumber}
                  onChange={handleChange}
                  onNext={() => focusNextInput("documentDate")}
                  onCancel={() => setFormData({ ...formData, poNumber: "" })}
                  labelText="P.O Number"
                  tooltipText="Purchase order number"
                />
              </div>

              {/* Document Date */}
              <div className="space-y-2">
                <EnglishDate
                  isDate={true}
                  calendarType="gregorian"
                  userLang="en"
                  rtl={false}
                  onChange={(date: string) =>
                    setFormData({ ...formData, documentDate: date })
                  }
                  value={formData.documentDate}
                  disabled={false}
                  labelText="Document Date"
                  className={cn("transition-all", "ring-1 ring-primary")}
                  setStartNextFocus={() => focusNextInput("remarks")}
                />
              </div>
            </div>

            {/* Second Row: Status controls */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {/* Remarks */}
              <div className="space-y-2">
                <EditableInput
                  setRef={setRef("remarks")}
                  id="remarks"
                  name="remarks"
                  labelText="Remarks"
                  value={formData.remarks}
                  onChange={handleChange}
                  onNext={() => focusNextInput("isDefault")}
                  onCancel={() => setFormData({ ...formData, remarks: "" })}
                  tooltipText="Additional remarks or notes"
                />
              </div>

              {/* Default Status */}
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
                      date: "Remove default",
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
                    focusNextInput("status");
                  }}
                  onEnterPress={() => focusNextInput("status")}
                  placeholder=" "
                  labelText={labels.default}
                  className="relative"
                  tooltipText="Set as default opening stock"
                />
              </div>

              {/* Status */}
              <div className="space-y-2 relative">
                <SwitchSelect
                  ref={(el: any) => setRef("status")(el)}
                  id="status"
                  name="status"
                  labelText="Status"
                  multiSelect={false}
                  options={[
                    {
                      label: "Active",
                      value: "Active",
                      date: "Set active",
                    },
                    { label: "Draft", value: "Draft", date: "Set draft" },
                  ]}
                  value={statusState}
                  onValueChange={(value: string | string[]) => {
                    const stringValue = Array.isArray(value)
                      ? value[0] || ""
                      : value;
                    setStatusState(stringValue);

                    setFormData((prev) => ({
                      ...prev,
                      isDraft: stringValue === "Draft",
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
                  tooltipText="Opening stock status"
                />
              </div>
            </div>

            {/* Dynamic Input Table */}
            <DynamicInputTableList isEdit={isEdit} />
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
        title="Opening Stock Language Translator"
        initialData={translations}
        onSave={handleTranslationSave}
      />

      {/* Templates Modal */}
      <Modal
        opened={showTemplates}
        onClose={() => setShowTemplates(false)}
        size="xl"
        radius={20}
        overlayProps={{ backgroundOpacity: 0.25, blur: 1 }}
        withCloseButton={false}
        centered
      >
        <TemplateContent
          headers={[
            { key: "documentNumber", label: "Document Number" },
            { key: "branch", label: "Branch" },
            { key: "poNumber", label: "P.O Number" },
            { key: "amount", label: "Amount" },
          ]}
          data={[
            {
              documentNumber: "OS001",
              branch: "Main Branch",
              poNumber: "PO-2025-001",
              amount: "$15,000.50",
            },
            {
              documentNumber: "OS002",
              branch: "North Branch",
              poNumber: "PO-2025-002",
              amount: "$8,750.25",
            },
            {
              documentNumber: "OS003",
              branch: "South Branch",
              poNumber: "PO-2025-003",
              amount: "$12,300.75",
            },
            {
              documentNumber: "OS004",
              branch: "East Branch",
              poNumber: "PO-2025-004",
              amount: "$9,850.00",
            },
            {
              documentNumber: "OS005",
              branch: "West Branch",
              poNumber: "PO-2025-005",
              amount: "$16,750.30",
            },
            {
              documentNumber: "OS006",
              branch: "Central Branch",
              poNumber: "PO-2025-006",
              amount: "$22,100.45",
            },
          ]}
          onSelect={(selectedData: any) => {
            console.log("Selected:", selectedData);
            setShowTemplates(false);
            setFormData((prev) => ({
              ...prev,
              branch: selectedData.branch,
              poNumber: selectedData.poNumber,
              amount: parseFloat(selectedData.amount.replace(/[$,]/g, "")),
            }));
          }}
          onClose={() => setShowTemplates(false)}
        />
      </Modal>
    </>
  );
}
