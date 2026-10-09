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
import { pdf } from "@react-pdf/renderer";
import { Check, Eye, Plus } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { usePermission } from "@/hooks/usePermissions";
import { useLanguageLabels } from "@/hooks/useLanguageLabels";
import { useAppSelector } from "@/store/hooks";
import type { OpeningStockModuleData } from "@/types/modules";
import MinimizablePageLayout from "@/components/MinimizablePageLayout";
import { useMinimizedModuleData } from "@/hooks/useMinimizedModuleData";
import { SwitchSelect } from "@/components/common/SwitchAutoComplete";
import { ActionsAutocomplete } from "@/components/common/ActionsAutocomplete";
import { cn } from "@/lib/utils";
import { getModuleFromPath } from "@/lib/utils";
import LanguageTranslatorModal from "@/components/common/LanguageTranslatorModel";
import DynamicInputTableList from "./dynamic-input-table/DynamicInputTableList";
import EnglishDate from "@/components/EnglishDateInput";

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

// Mock branch data
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

// Mock opening stock data for selection
const MOCK_OPENING_STOCKS: OpeningStock[] = [
  {
    id: "1",
    documentNumber: "OS001",
    branch: "Main Branch",
    poNumber: "PO-2024-001",
    documentDate: "",
    remarks: "Initial inventory setup for main branch",
    amount: 15000.5,
    isActive: true,
    isDefault: false,
    isDraft: false,
    createdAt: new Date("2024-01-15T10:30:00Z"),
    draftedAt: null,
    updatedAt: new Date("2024-01-20T14:45:00Z"),
    deletedAt: null,
    isDeleted: false,
  },
  // ... other mock data
];

type Props = {
  isEdit?: boolean;
};

export default function OpeningStockInventoryEditPage({
  isEdit = true,
}: Props) {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const labels = useLanguageLabels();
  const { isRTL } = useAppSelector((state) => state.language);

  const detectedModule = getModuleFromPath(location.pathname);

  // Get module ID for this edit page
  const moduleId = `${detectedModule}-edit-module-${id || "new"}`;

  // Use the custom hook for minimized module data
  const {
    moduleData,
    hasMinimizedData,
    resetModuleData,
    getModuleScrollPosition,
  } = useMinimizedModuleData<OpeningStockModuleData>(moduleId);

  const [keepCreating, setKeepCreating] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [isDefaultState, setIsDefaultState] = useState<"Yes" | "No" | string>(
    "No"
  );
  const [statusState, setStatusState] = useState<
    "Active" | "Draft" | "Delete" | string
  >("Active");
  const [selectedAction, setSelectedAction] = useState<string>("");
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [printEnabled, setPrintEnabled] = useState(false);
  const [pdfChecked, setPdfChecked] = useState(false);
  const [formKey, setFormKey] = useState(0);
  const [isRestoredFromMinimized, setIsRestoredFromMinimized] = useState(false);
  const [shouldRestoreFromMinimized, setShouldRestoreFromMinimized] =
    useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Translation state
  const [translations, setTranslations] = useState([
    { id: 1, english: "", arabic: "", bangla: "" },
  ]);

  // Form state
  const [formData, setFormData] = useState<OpeningStock>({
    id: "",
    documentNumber: "",
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

  // Permission checks
  const canCreate = usePermission(detectedModule, "create");
  const canView = usePermission(detectedModule, "view");
  const canPdf: boolean = usePermission(detectedModule, "pdf");
  const canPrint: boolean = usePermission(detectedModule, "print");

  // Memoize branch data to prevent unnecessary re-renders
  const memoizedBranches = useMemo(() => [...MOCK_BRANCHES], []);

  // Document number options for autocomplete
  const documentNumberOptions = useMemo(
    () =>
      MOCK_OPENING_STOCKS.map((stock) => ({
        value: stock.documentNumber,
        label: `${stock.documentNumber} - ${stock.branch}`,
      })),
    []
  );

  // Update translation data when remarks change
  const updateTranslations = useCallback((remarks: string) => {
    setTranslations([
      { id: 1, english: remarks || "", arabic: "", bangla: "" },
    ]);
  }, []);

  useEffect(() => {
    updateTranslations(formData.remarks);
  }, [formData.remarks, updateTranslations]);

  // Refs for form elements
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
      console.log(
        "Setting shouldRestoreFromMinimized to true from localStorage"
      );
      setShouldRestoreFromMinimized(true);
      localStorage.removeItem(`restore-${moduleId}`);
    }
  }, [moduleId]);

  // Restore logic using the custom hook
  useEffect(() => {
    console.log("Checking for restored module...");
    console.log("Has minimized data:", hasMinimizedData);
    console.log("shouldRestoreFromMinimized flag:", shouldRestoreFromMinimized);

    const shouldAutoRestore =
      shouldRestoreFromMinimized ||
      (hasMinimizedData &&
        moduleData &&
        !isRestoredFromMinimized &&
        !formData.documentNumber &&
        !formData.branch);

    if (hasMinimizedData && moduleData && shouldAutoRestore) {
      console.log("Found restored module and should restore:", moduleData);

      // Restore form data
      setFormData(moduleData.formData);

      // Restore UI states based on form data
      setIsDefaultState(moduleData.isDefault ? "Yes" : "No");
      if (moduleData.isDraft) {
        setStatusState("Draft");
      } else {
        setStatusState("Active");
      }

      // Set flag to prevent re-restoration
      setIsRestoredFromMinimized(true);
      setShouldRestoreFromMinimized(false);

      // Restore scroll position
      const scrollPosition = getModuleScrollPosition(moduleId);
      if (scrollPosition) {
        setTimeout(() => {
          window.scrollTo(0, scrollPosition);
        }, 200);
      }
    } else if (hasMinimizedData && !shouldAutoRestore) {
      console.log("Found minimized module but not restoring automatically");
    }
  }, [
    hasMinimizedData,
    moduleData,
    isRestoredFromMinimized,
    shouldRestoreFromMinimized,
    formData.documentNumber,
    formData.branch,
    moduleId,
    getModuleScrollPosition,
  ]);

  // Initialize data on component mount
  useEffect(() => {
    if (!hasMinimizedData && !isRestoredFromMinimized) {
      setIsLoading(true);

      // If ID is provided in URL, load that specific record
      if (id && id !== "undefined") {
        const stockData = MOCK_OPENING_STOCKS.find((stock) => stock.id === id);
        if (stockData) {
          setFormData(stockData);
          setIsDefaultState(stockData.isDefault ? labels.yes : labels.no);
          if (stockData.isDraft) {
            setStatusState("Draft");
          } else {
            setStatusState("Active");
          }
        } else {
          // If ID not found, load the first record as default
          const defaultStock = MOCK_OPENING_STOCKS[0];
          setFormData(defaultStock);
          setIsDefaultState(defaultStock.isDefault ? labels.yes : labels.no);
          setStatusState(defaultStock.isDraft ? "Draft" : "Active");
        }
      } else {
        // Load the first record as default for editing
        const defaultStock = MOCK_OPENING_STOCKS[0];
        setFormData(defaultStock);
        setIsDefaultState(defaultStock.isDefault ? labels.yes : labels.no);
        setStatusState(defaultStock.isDraft ? "Draft" : "Active");
      }

      setIsLoading(false);
    }
  }, [id, labels, hasMinimizedData, isRestoredFromMinimized]);

  // Function to find and load opening stock data
  const loadOpeningStockData = useCallback(
    (documentNumber: string) => {
      const stockData = MOCK_OPENING_STOCKS.find(
        (stock) => stock.documentNumber === documentNumber
      );

      if (stockData) {
        setFormData({
          ...stockData,
          updatedAt: new Date(), // Update the timestamp
        });
        setIsDefaultState(stockData.isDefault ? labels.yes : labels.no);
        setStatusState(stockData.isDraft ? "Draft" : "Active");
        toastSuccess(`Loaded data for ${documentNumber}`);
      } else {
        toastError(`Opening stock ${documentNumber} not found`);
      }
    },
    [labels]
  );

  // Handle document number selection
  const handleDocumentNumberChange = useCallback(
    (value: string | null) => {
      if (value) {
        const documentNumber = value.split(" - ")[0]; // Extract document number from "OS001 - Main Branch"
        setFormData((prev) => ({ ...prev, documentNumber }));
        loadOpeningStockData(documentNumber);
      }
    },
    [loadOpeningStockData]
  );

  // Handle form field changes
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value, type, checked } = e.target;
      const newFormData = {
        ...formData,
        [name]: type === "checkbox" ? checked : value,
        updatedAt: new Date(), // Update timestamp on any change
      };
      setFormData(newFormData);
    },
    [formData]
  );

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Opening Stock Edit Form submitted:", formData);

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

  // Update handleReset function to use the custom hook
  const handleReset = async () => {
    // Reset to original loaded data
    const originalData = MOCK_OPENING_STOCKS.find(
      (stock) => stock.documentNumber === formData.documentNumber
    );
    if (originalData) {
      setFormData(originalData);
      setIsDefaultState(originalData.isDefault ? labels.yes : labels.no);
      setStatusState(originalData.isDraft ? "Draft" : "Active");
      setSelectedAction("");
      setIsRestoredFromMinimized(false);

      if (formRef.current) {
        formRef.current.reset();
      }

      setFormKey((prev) => prev + 1);

      // Reset form data using the custom hook
      if (hasMinimizedData) {
        try {
          await resetModuleData(moduleId);
          console.log("Form data reset in Redux");
        } catch (error) {
          console.error("Error resetting form data:", error);
        }
      }

      toastSuccess("Form reset to original values");

      setTimeout(() => {
        inputRefs.current["documentNumber"]?.focus();
      }, 100);
    }
  };

  const handleResetClick = () => {
    setIsResetModalOpen(true);
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
      a.download = `${detectedModule}-${formData.documentNumber}.pdf`;
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
        navigate(`/${detectedModule}/create`);
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
  }, [formData.isDraft, labels, canCreate, detectedModule]);

  // Branch change handler
  const handleBranchChange = useCallback((value: string | null) => {
    setFormData((prev) => ({
      ...prev,
      branch: value || "",
      updatedAt: new Date(),
    }));
  }, []);

  // Translation handlers
  const handleTranslationSave = useCallback((data: any) => {
    setTranslations(data);
    console.log("Opening Stock translations saved:", data);
  }, []);

  // Create minimize handler using the custom hook
  const handleMinimize = useCallback((): OpeningStockModuleData => {
    return {
      formData,
      hasChanges: true,
      scrollPosition: window.scrollY,
      isDraft: formData.isDraft,
      isDefault: formData.isDefault,
    };
  }, [formData]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading opening stock data...</div>
      </div>
    );
  }

  return (
    <>
      <MinimizablePageLayout
        moduleId={moduleId}
        moduleName={`Edit ${detectedModule}`}
        moduleRoute={`/${detectedModule}/edit/${id || "new"}`}
        onMinimize={handleMinimize}
        title={`Editing ${detectedModule}`}
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
        activePage="edit"
        module={detectedModule}
        additionalFooterButtons={
          <div className="flex gap-4 max-[435px]:gap-2">
            <Button
              variant="outline"
              className="gap-2 hover:bg-primary/90 bg-white rounded-full border-primary w-28 max-[435px]:w-20 font-semibold! text-primary!"
              onClick={handleResetClick}
            >
              {labels.reset}
            </Button>
            <Button
              variant="outline"
              className="gap-2 hover:bg-primary/90 bg-white rounded-full border-primary w-28 max-[435px]:w-20 font-semibold! text-primary!"
              onClick={handleSubmit}
            >
              {labels.submit}
            </Button>
          </div>
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
            {/* Dynamic form fields in responsive grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 my-8">
              {/* Document Number */}
              <div className="md:col-span-3 space-y-2">
                <Autocomplete
                  ref={(el: any) => setRef("documentNumber")(el)}
                  id="documentNumber"
                  name="documentNumber"
                  allowCustomInput={false}
                  options={documentNumberOptions.map((opt) => opt.label)}
                  value={
                    formData.documentNumber
                      ? `${formData.documentNumber} - ${formData.branch}`
                      : ""
                  }
                  onValueChange={handleDocumentNumberChange}
                  isShowTemplateIcon={false}
                  onEnterPress={() => focusNextInput("branch")}
                  placeholder=""
                  labelText="Document Number"
                  className="relative"
                  styles={{
                    input: {
                      borderColor: "var(--primary)",
                      "&:focus": {
                        borderColor: "var(--primary)",
                      },
                    },
                  }}
                  tooltipText="Select document number to edit"
                />
              </div>

              {/* Branch */}
              <div className="md:col-span-3 space-y-2">
                <Autocomplete
                  ref={(el: any) => setRef("branch")(el)}
                  id="branch"
                  name="branch"
                  allowCustomInput={true}
                  options={memoizedBranches}
                  value={formData.branch}
                  onValueChange={handleBranchChange}
                  isShowTemplateIcon={false}
                  onEnterPress={() => focusNextInput("poNumber")}
                  placeholder=""
                  labelText="Branch"
                  className="relative"
                  styles={{
                    input: {
                      borderColor: "var(--primary)",
                      "&:focus": {
                        borderColor: "var(--primary)",
                      },
                    },
                  }}
                  tooltipText="Select the branch"
                />
              </div>

              {/* P.O Number */}
              <div className="md:col-span-3 space-y-2">
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
              <div className="md:col-span-3 space-y-2">
                <EnglishDate
                  isDate={true}
                  calendarType="gregorian"
                  isShowCalender={true}
                  userLang="en"
                  rtl={false}
                  onChange={(date: string) =>
                    setFormData({
                      ...formData,
                      documentDate: date,
                      updatedAt: new Date(),
                    })
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
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 my-8">
              {/* Remarks */}
              <div className="md:col-span-3 space-y-2">
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

              {/* Default field - Updated to use SwitchSelect */}
              {canCreate && (
                <div className="md:col-span-3 space-y-2">
                  <SwitchSelect
                    ref={(el: any) => setRef("isDefault")(el)}
                    id="isDefault"
                    name="isDefault"
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
                        updatedAt: new Date(),
                      }));
                      focusNextInput("status");
                    }}
                    onEnterPress={() => focusNextInput("status")}
                    placeholder=" "
                    labelText={labels.default}
                    tooltipText="Set as default opening stock"
                    className="relative"
                  />
                </div>
              )}

              {/* Status field - Updated to use SwitchSelect */}
              <div className="md:col-span-3 space-y-2">
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
                    {
                      label: "Draft",
                      value: "Draft",
                      date: "Set draft",
                    },
                    {
                      label: "Delete",
                      value: "Delete",
                      date: "Set delete",
                    },
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
                      isDeleted: stringValue === "Delete",
                      updatedAt: new Date(),
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

              {/* Actions */}
              <div className="md:col-span-3 space-y-2">
                <ActionsAutocomplete
                  ref={(el: any) => setRef("actions")(el)}
                  id="actions"
                  name="actions"
                  labelText="Action"
                  value={selectedAction}
                  actions={[
                    {
                      action: "Created",
                      user: "Karim",
                      role: "Super User",
                      date: "15 Jan 2024",
                      value: "created",
                    },
                    {
                      action: "Updated",
                      user: "Rahim",
                      role: "Admin",
                      date: "20 Jan 2024",
                      value: "updated",
                    },
                    {
                      action: "Drafted",
                      user: "Karim",
                      role: "Super User",
                      date: "17 Jan 2024",
                      value: "drafted",
                    },
                    {
                      action: "Deleted",
                      user: "Abdullah",
                      role: "Super Admin",
                      date: "25 Jan 2024",
                      value: "deleted",
                    },
                  ]}
                  placeholder=""
                  onValueChange={(value: string) => {
                    setSelectedAction(value);
                    console.log("Selected action:", value);
                  }}
                  styles={{
                    input: {
                      borderColor: "var(--primary)",
                      "&:focus": {
                        borderColor: "var(--primary)",
                      },
                    },
                  }}
                  tooltipText={`${detectedModule} Action`}
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
    </>
  );
}
