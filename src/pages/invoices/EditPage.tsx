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
import { Check, Eye, Plus } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { usePermission } from "@/hooks/usePermissions";
import { useLanguageLabels } from "@/hooks/useLanguageLabels";
import { useAppSelector } from "@/store/hooks";
import type { InvoiceModuleData } from "@/types/modules";
import MinimizablePageLayout from "@/components/MinimizablePageLayout";
import { useMinimizedModuleData } from "@/hooks/useMinimizedModuleData";
import { SwitchSelect } from "@/components/common/SwitchAutoComplete";
import { ActionsAutocomplete } from "@/components/common/ActionsAutocomplete";
import { TemplateContent } from "@/components/common/TemplateContent";
import { cn } from "@/lib/utils";
import { getModuleFromPath } from "@/lib/utils";
import LanguageTranslatorModal from "@/components/common/LanguageTranslatorModel";
import EnglishDate from "@/components/EnglishDateInput";

// Define Invoice interface to ensure type consistency
interface Invoice {
  id: string;
  documentNumber: string;
  poNumber: string;
  poDate: string;
  supplierName: string;
  paymentMode: string;
  dueDays: number;
  paymentDate: string;
  supplierNumber: string;
  supplierStatus: string;
  supplierGroup: string;
  remarks: string;
  country: string;
  state: string;
  city: string;
  isActive: boolean;
  isDraft: boolean;
  createdAt: Date | null;
  draftedAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;
  isDeleted: boolean;
}

// Mock supplier data for auto-fill functionality
interface SupplierData {
  name: string;
  number: string;
  status: string;
  group: string;
  country: string;
  state: string;
  city: string;
  paymentDate: string;
}

const MOCK_SUPPLIERS: SupplierData[] = [
  {
    name: "AL AHAD CURTAINS TEX & FURNITURE TR.LLC",
    number: "36",
    status: "Active",
    group: "Furniture Suppliers",
    country: "UAE",
    state: "Dubai",
    city: "Deira",
    paymentDate: "2024-08-15",
  },
  {
    name: "SimplyNayela",
    number: "12",
    status: "Active",
    group: "Fashion",
    country: "UAE",
    state: "Dubai",
    city: "Business Bay",
    paymentDate: "2024-08-12",
  },
  // ... other mock suppliers
];

// Payment mode options
const PAYMENT_MODES = [
  "Cash",
  "Credit Card",
  "Debit Card",
  "Bank Transfer",
  "Check",
  "Split",
  "PayPal",
  "Wire Transfer",
  "ACH",
  "Digital Wallet",
];

// Supplier status options
const SUPPLIER_STATUS_OPTIONS = [
  "Active",
  "Inactive",
  "Pending",
  "Suspended",
  "Approved",
  "Rejected",
];

// Mock invoice data for editing
const MOCK_INVOICES: Invoice[] = [
  {
    id: "1",
    documentNumber: "INV001",
    poNumber: "PO-2024-001",
    poDate: "2024-07-24",
    supplierName: "AL AHAD CURTAINS TEX & FURNITURE TR.LLC",
    paymentMode: "Split",
    dueDays: 45,
    paymentDate: "2024-09-07",
    supplierNumber: "36",
    supplierStatus: "Active",
    supplierGroup: "Furniture Suppliers",
    remarks: "Urgent delivery required",
    country: "UAE",
    state: "Dubai",
    city: "Deira",
    isActive: true,
    isDraft: false,
    createdAt: new Date("2024-07-24"),
    draftedAt: null,
    updatedAt: new Date("2024-07-30"),
    deletedAt: null,
    isDeleted: false,
  },
  // ... other mock invoices
];

type Props = {
  isEdit?: boolean;
};

export default function InvoiceEditPage({ isEdit = true }: Props) {
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
  } = useMinimizedModuleData<InvoiceModuleData>(moduleId);

  const [showTemplates, setShowTemplates] = useState(false);
  const [keepCreating, setKeepCreating] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [statusState, setStatusState] = useState<
    "Active" | "Draft" | "Delete" | string
  >("Active");
  const [selectedAction, setSelectedAction] = useState<string>("");
  const [printEnabled, setPrintEnabled] = useState(false);
  const [pdfChecked, setPdfChecked] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [formKey, setFormKey] = useState(0);
  const [isRestoredFromMinimized, setIsRestoredFromMinimized] = useState(false);
  const [shouldRestoreFromMinimized, setShouldRestoreFromMinimized] =
    useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSupplierAutoFilled, setIsSupplierAutoFilled] = useState(false);

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
  const [formData, setFormData] = useState<Invoice>({
    id: "",
    documentNumber: "",
    poNumber: "",
    poDate: "",
    supplierName: "",
    paymentMode: "",
    dueDays: 0,
    paymentDate: "",
    supplierNumber: "",
    supplierStatus: "",
    supplierGroup: "",
    remarks: "",
    country: "",
    state: "",
    city: "",
    isActive: true,
    isDraft: false,
    createdAt: new Date(),
    draftedAt: null,
    updatedAt: new Date(),
    deletedAt: null,
    isDeleted: false,
  });

  // Memoize supplier data
  const memoizedSuppliers = useMemo(() => [...MOCK_SUPPLIERS], []);
  const memoizedPaymentModes = useMemo(() => [...PAYMENT_MODES], []);
  const memoizedStatusOptions = useMemo(() => [...SUPPLIER_STATUS_OPTIONS], []);

  // Invoice options for autocomplete
  const invoiceOptions = useMemo(
    () =>
      MOCK_INVOICES.map((invoice) => ({
        value: invoice.documentNumber,
        label: `${invoice.documentNumber} - ${invoice.supplierName}`,
      })),
    []
  );

  // Helper function to check if supplier fields should be disabled
  const isSupplierFieldsDisabled = () => {
    return !formData.supplierName || formData.supplierName.trim() === "";
  };

  // Function to search for supplier by name
  const findSupplierByName = useCallback(
    (name: string): SupplierData | null => {
      if (!name.trim()) return null;

      let supplier = memoizedSuppliers.find(
        (s) => s.name.toLowerCase() === name.toLowerCase()
      );

      if (!supplier) {
        supplier = memoizedSuppliers.find(
          (s) =>
            s.name.toLowerCase().includes(name.toLowerCase()) ||
            name.toLowerCase().includes(s.name.toLowerCase())
        );
      }

      return supplier || null;
    },
    [memoizedSuppliers]
  );

  // Function to find and load invoice data
  const loadInvoiceData = useCallback((documentNumber: string) => {
    const invoiceData = MOCK_INVOICES.find(
      (invoice) => invoice.documentNumber === documentNumber
    );

    if (invoiceData) {
      setFormData({
        ...invoiceData,
        updatedAt: new Date(), // Update the timestamp
      });
      setStatusState(invoiceData.isDraft ? "Draft" : "Active");
      toastSuccess(`Loaded data for ${documentNumber}`);
    } else {
      toastError(`Invoice ${documentNumber} not found`);
    }
  }, []);

  // Handle document number selection
  const handleDocumentNumberChange = useCallback(
    (value: string | null) => {
      if (value) {
        const documentNumber = value.split(" - ")[0]; // Extract document number from "INV001 - Supplier Name"
        setFormData((prev) => ({ ...prev, documentNumber }));
        loadInvoiceData(documentNumber);
      }
    },
    [loadInvoiceData]
  );

  // Update translation data when supplier name changes
  const updateTranslations = useCallback((supplierName: string) => {
    setTranslations([
      { id: 1, english: supplierName || "", arabic: "", bangla: "" },
    ]);
  }, []);

  useEffect(() => {
    updateTranslations(formData.supplierName);
  }, [formData.supplierName, updateTranslations]);

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
      setShouldRestoreFromMinimized(true);
      localStorage.removeItem(`restore-${moduleId}`);
    }
  }, [moduleId]);

  // Restore logic using the custom hook
  useEffect(() => {
    const shouldAutoRestore =
      shouldRestoreFromMinimized ||
      (hasMinimizedData &&
        moduleData &&
        !isRestoredFromMinimized &&
        !formData.documentNumber &&
        !formData.supplierName);

    if (hasMinimizedData && moduleData && shouldAutoRestore) {
      setFormData(moduleData);
      setStatusState(moduleData.isDraft ? "Draft" : "Active");
      setIsRestoredFromMinimized(true);
      setShouldRestoreFromMinimized(false);

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
    formData.documentNumber,
    formData.supplierName,
    moduleId,
    getModuleScrollPosition,
  ]);

  // Initialize data on component mount
  useEffect(() => {
    if (!hasMinimizedData && !isRestoredFromMinimized) {
      setIsLoading(true);

      if (id && id !== "undefined") {
        const invoiceData = MOCK_INVOICES.find((invoice) => invoice.id === id);
        if (invoiceData) {
          setFormData(invoiceData);
          setStatusState(invoiceData.isDraft ? "Draft" : "Active");
        } else {
          const defaultInvoice = MOCK_INVOICES[0];
          setFormData(defaultInvoice);
          setStatusState(defaultInvoice.isDraft ? "Draft" : "Active");
        }
      } else {
        const defaultInvoice = MOCK_INVOICES[0];
        setFormData(defaultInvoice);
        setStatusState(defaultInvoice.isDraft ? "Draft" : "Active");
      }

      setIsLoading(false);
    }
  }, [id, hasMinimizedData, isRestoredFromMinimized]);

  // Handle supplier name changes and auto-fill related fields
  const handleSupplierNameChange = useCallback(
    (value: string | null) => {
      const newSupplierName = value || "";

      setFormData((prev) => ({
        ...prev,
        supplierName: newSupplierName,
        updatedAt: new Date(),
      }));

      const matchedSupplier = findSupplierByName(newSupplierName);

      if (matchedSupplier) {
        setFormData((prev) => ({
          ...prev,
          supplierName: newSupplierName,
          supplierNumber: matchedSupplier.number,
          supplierStatus: matchedSupplier.status,
          supplierGroup: matchedSupplier.group,
          country: matchedSupplier.country,
          state: matchedSupplier.state,
          city: matchedSupplier.city,
          paymentDate: matchedSupplier.paymentDate,
          updatedAt: new Date(),
        }));
        setIsSupplierAutoFilled(true);
      } else {
        setIsSupplierAutoFilled(false);
        setFormData((prev) => ({
          ...prev,
          supplierName: newSupplierName,
          supplierNumber: "",
          supplierStatus: "",
          supplierGroup: "",
          country: "",
          state: "",
          city: "",
          paymentDate: "",
          updatedAt: new Date(),
        }));
      }
    },
    [findSupplierByName]
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

    if (pdfChecked) {
      await handleExportPDF();
    }
    if (printEnabled) {
      handlePrintInvoice(formData);
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
    const originalData = MOCK_INVOICES.find(
      (invoice) => invoice.documentNumber === formData.documentNumber
    );
    if (originalData) {
      setFormData(originalData);
      setStatusState(originalData.isDraft ? "Draft" : "Active");
      setSelectedAction("");
      setIsRestoredFromMinimized(false);
      setIsSupplierAutoFilled(false);

      if (formRef.current) {
        formRef.current.reset();
      }

      setFormKey((prev) => prev + 1);

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

  const handlePrintInvoice = useCallback(
    (invoiceData: any) => {
      try {
        const html = PrintCommonLayout({
          title: `${detectedModule} Details`,
          data: [invoiceData],
          excludeFields: ["id", "__v", "_id"],
          fieldLabels: {
            documentNumber: "Document Number",
            poNumber: "P.O Number",
            poDate: "P.O Date",
            supplierName: "Supplier Name",
            paymentMode: "Payment Mode",
            dueDays: "Due Days",
            paymentDate: "Payment Date",
            supplierNumber: "Supplier Number",
            supplierStatus: "Supplier Status",
            supplierGroup: "Supplier Group",
            remarks: "Remarks",
            country: "Country",
            state: "State",
            city: "City",
            isActive: "Active Status",
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
  };

  const handlePDFSwitchChange = (pdfChecked: boolean) => {
    setPdfChecked(pdfChecked);
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

  // Translation handlers
  const handleTranslationSave = useCallback((data: any) => {
    setTranslations(data);
    console.log("Invoice translations saved:", data);
  }, []);

  // Create minimize handler
  const handleMinimize = useCallback((): InvoiceModuleData => {
    return {
      ...formData,
      hasChanges: true,
      scrollPosition: window.scrollY,
    };
  }, [formData]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading invoice data...</div>
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
        listPath={detectedModule}
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
                  options={invoiceOptions.map((opt) => opt.label)}
                  value={
                    formData.documentNumber
                      ? `${formData.documentNumber} - ${formData.supplierName}`
                      : ""
                  }
                  onValueChange={handleDocumentNumberChange}
                  isShowTemplateIcon={false}
                  onEnterPress={() => focusNextInput("poNumber")}
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

              {/* P.O Number */}
              <div className="md:col-span-3 space-y-2">
                <EditableInput
                  setRef={setRef("poNumber")}
                  id="poNumber"
                  name="poNumber"
                  value={formData.poNumber}
                  onChange={handleChange}
                  onNext={() => focusNextInput("poDate")}
                  onCancel={() => setFormData({ ...formData, poNumber: "" })}
                  labelText="P.O Number"
                  tooltipText="Purchase order number"
                />
              </div>

              {/* P.O Date */}
              <div className="md:col-span-3 space-y-2">
                <EnglishDate
                  isDate={true}
                  calendarType="gregorian"
                  userLang="en"
                  rtl={false}
                  isShowCalender={true}
                  onChange={(date: string) =>
                    setFormData({
                      ...formData,
                      poDate: date,
                      updatedAt: new Date(),
                    })
                  }
                  value={formData.poDate}
                  disabled={false}
                  labelText="P.O Date"
                  className={cn("transition-all", "ring-1 ring-primary")}
                  setStartNextFocus={() => focusNextInput("supplierName")}
                />
              </div>

              {/* Supplier Name */}
              <div className="md:col-span-3 space-y-2">
                <Autocomplete
                  ref={(el: any) => setRef("supplierName")(el)}
                  id="supplierName"
                  name="supplierName"
                  allowCustomInput={true}
                  options={memoizedSuppliers.map((s) => s.name)}
                  value={formData.supplierName}
                  onValueChange={handleSupplierNameChange}
                  onEnterPress={() => focusNextInput("paymentMode")}
                  placeholder=""
                  labelText="Supplier Name"
                  className="relative"
                  tooltipText="Select or type supplier name"
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
                />
              </div>
            </div>

            {/* Second Row: Payment details and supplier info */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 my-8">
              {/* Payment Mode */}
              <div className="md:col-span-3 space-y-2">
                <Autocomplete
                  ref={(el: any) => setRef("paymentMode")(el)}
                  id="paymentMode"
                  name="paymentMode"
                  allowCustomInput={true}
                  options={memoizedPaymentModes}
                  value={formData.paymentMode}
                  onValueChange={(value: string | null) =>
                    setFormData({
                      ...formData,
                      paymentMode: value || "",
                      updatedAt: new Date(),
                    })
                  }
                  onEnterPress={() => focusNextInput("dueDays")}
                  placeholder=""
                  labelText="Payment Mode"
                  className="relative"
                  tooltipText="Select payment mode"
                  userLang={isRTL ? "ar" : "en"}
                  styles={{
                    input: {
                      borderColor: "var(--primary)",
                      "&:focus": {
                        borderColor: "var(--primary)",
                      },
                    },
                  }}
                />
              </div>

              {/* Due Days */}
              <div className="md:col-span-3 space-y-2">
                <EditableInput
                  setRef={setRef("dueDays")}
                  id="dueDays"
                  name="dueDays"
                  type="number"
                  value={formData.dueDays.toString()}
                  onChange={handleChange}
                  onNext={() => focusNextInput("paymentDate")}
                  onCancel={() => setFormData({ ...formData, dueDays: 0 })}
                  labelText="Due Days"
                  tooltipText="Number of days until payment is due"
                />
              </div>

              {/* Payment Date */}
              <div className="md:col-span-3 space-y-2">
                <EnglishDate
                  isDate={true}
                  calendarType="gregorian"
                  userLang="en"
                  rtl={false}
                  isShowCalender={true}
                  onChange={(date: string) =>
                    setFormData({
                      ...formData,
                      paymentDate: date,
                      updatedAt: new Date(),
                    })
                  }
                  value={formData.paymentDate}
                  disabled={isSupplierFieldsDisabled()}
                  labelText="Payment Date"
                  className={cn(
                    "transition-all",
                    isSupplierFieldsDisabled()
                      ? "bg-gray-200 cursor-not-allowed"
                      : isSupplierAutoFilled
                      ? "bg-gray-100 ring-1 ring-primary"
                      : "ring-1 ring-primary"
                  )}
                  setStartNextFocus={() => focusNextInput("supplierNumber")}
                />
              </div>

              {/* Supplier Number */}
              <div className="md:col-span-3 space-y-2">
                <EditableInput
                  setRef={setRef("supplierNumber")}
                  id="supplierNumber"
                  name="supplierNumber"
                  value={formData.supplierNumber}
                  onChange={handleChange}
                  onNext={() => focusNextInput("supplierStatus")}
                  onCancel={() =>
                    setFormData({ ...formData, supplierNumber: "" })
                  }
                  labelText="Supplier Number"
                  tooltipText={
                    isSupplierFieldsDisabled()
                      ? "Select supplier first"
                      : "Supplier number"
                  }
                  readOnly={isSupplierFieldsDisabled() || isSupplierAutoFilled}
                  disabled={isSupplierFieldsDisabled()}
                  className={
                    isSupplierFieldsDisabled()
                      ? "bg-gray-200 cursor-not-allowed"
                      : isSupplierAutoFilled
                      ? "bg-gray-100"
                      : ""
                  }
                />
              </div>
            </div>

            {/* Third Row: Supplier details and location */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 my-8">
              {/* Supplier Status */}
              <div className="md:col-span-3 space-y-2">
                {isSupplierAutoFilled || isSupplierFieldsDisabled() ? (
                  <EditableInput
                    setRef={setRef("supplierStatus")}
                    id="supplierStatus"
                    name="supplierStatus"
                    value={formData.supplierStatus}
                    onChange={handleChange}
                    onNext={() => focusNextInput("supplierGroup")}
                    onCancel={() =>
                      setFormData({ ...formData, supplierStatus: "" })
                    }
                    labelText="Supplier Status"
                    tooltipText={
                      isSupplierFieldsDisabled()
                        ? "Select supplier first"
                        : "Supplier status"
                    }
                    readOnly
                    disabled={isSupplierFieldsDisabled()}
                    className={
                      isSupplierFieldsDisabled()
                        ? "bg-gray-200 cursor-not-allowed"
                        : "bg-gray-100"
                    }
                  />
                ) : (
                  <Autocomplete
                    ref={(el: any) => setRef("supplierStatus")(el)}
                    id="supplierStatus"
                    name="supplierStatus"
                    allowCustomInput={true}
                    options={memoizedStatusOptions}
                    value={formData.supplierStatus}
                    onValueChange={(value: string | null) =>
                      setFormData({
                        ...formData,
                        supplierStatus: value || "",
                        updatedAt: new Date(),
                      })
                    }
                    onEnterPress={() => focusNextInput("supplierGroup")}
                    placeholder=""
                    labelText="Supplier Status"
                    className="relative"
                    tooltipText="Select supplier status"
                    userLang={isRTL ? "ar" : "en"}
                    styles={{
                      input: {
                        borderColor: "var(--primary)",
                        "&:focus": {
                          borderColor: "var(--primary)",
                        },
                      },
                    }}
                    disabled={isSupplierFieldsDisabled()}
                  />
                )}
              </div>

              {/* Supplier Group */}
              <div className="md:col-span-3 space-y-2">
                <EditableInput
                  setRef={setRef("supplierGroup")}
                  id="supplierGroup"
                  name="supplierGroup"
                  value={formData.supplierGroup}
                  onChange={handleChange}
                  onNext={() => focusNextInput("remarks")}
                  onCancel={() =>
                    setFormData({ ...formData, supplierGroup: "" })
                  }
                  labelText="Supplier Group"
                  tooltipText={
                    isSupplierFieldsDisabled()
                      ? "Select supplier first"
                      : "Supplier group"
                  }
                  readOnly={isSupplierFieldsDisabled() || isSupplierAutoFilled}
                  disabled={isSupplierFieldsDisabled()}
                  className={
                    isSupplierFieldsDisabled()
                      ? "bg-gray-200 cursor-not-allowed"
                      : isSupplierAutoFilled
                      ? "bg-gray-100"
                      : ""
                  }
                />
              </div>

              {/* Remarks */}
              <div className="md:col-span-3 space-y-2">
                <EditableInput
                  setRef={setRef("remarks")}
                  id="remarks"
                  name="remarks"
                  value={formData.remarks}
                  onChange={handleChange}
                  onNext={() => focusNextInput("country")}
                  onCancel={() => setFormData({ ...formData, remarks: "" })}
                  labelText="Remarks"
                  tooltipText="Additional remarks or notes"
                />
              </div>

              {/* Country */}
              <div className="md:col-span-3 space-y-2">
                <EditableInput
                  setRef={setRef("country")}
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  onNext={() => focusNextInput("state")}
                  onCancel={() => setFormData({ ...formData, country: "" })}
                  labelText="Country"
                  tooltipText={
                    isSupplierFieldsDisabled()
                      ? "Select supplier first"
                      : "Country"
                  }
                  readOnly={isSupplierFieldsDisabled() || isSupplierAutoFilled}
                  disabled={isSupplierFieldsDisabled()}
                  className={
                    isSupplierFieldsDisabled()
                      ? "bg-gray-200 cursor-not-allowed"
                      : isSupplierAutoFilled
                      ? "bg-gray-100"
                      : ""
                  }
                />
              </div>
            </div>

            {/* Fourth Row: Location and actions */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 my-8">
              {/* State */}
              <div className="md:col-span-3 space-y-2">
                <EditableInput
                  setRef={setRef("state")}
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  onNext={() => focusNextInput("city")}
                  onCancel={() => setFormData({ ...formData, state: "" })}
                  labelText="State"
                  tooltipText={
                    isSupplierFieldsDisabled()
                      ? "Select supplier first"
                      : "State"
                  }
                  readOnly={isSupplierFieldsDisabled() || isSupplierAutoFilled}
                  disabled={isSupplierFieldsDisabled()}
                  className={
                    isSupplierFieldsDisabled()
                      ? "bg-gray-200 cursor-not-allowed"
                      : isSupplierAutoFilled
                      ? "bg-gray-100"
                      : ""
                  }
                />
              </div>

              {/* City */}
              <div className="md:col-span-3 space-y-2">
                <EditableInput
                  setRef={setRef("city")}
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  onNext={() => focusNextInput("status")}
                  onCancel={() => setFormData({ ...formData, city: "" })}
                  labelText="City"
                  tooltipText={
                    isSupplierFieldsDisabled()
                      ? "Select supplier first"
                      : "City"
                  }
                  readOnly={isSupplierFieldsDisabled() || isSupplierAutoFilled}
                  disabled={isSupplierFieldsDisabled()}
                  className={
                    isSupplierFieldsDisabled()
                      ? "bg-gray-200 cursor-not-allowed"
                      : isSupplierAutoFilled
                      ? "bg-gray-100"
                      : ""
                  }
                />
              </div>

              {/* Status */}
              <div className="md:col-span-3 space-y-2 relative">
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
                  tooltipText="Invoice status"
                />
              </div>

              {/* Actions */}
              <div className="md:col-span-3 space-y-2 relative">
                <ActionsAutocomplete
                  value={selectedAction}
                  onValueChange={setSelectedAction}
                  actions={[
                    {
                      action: "Created",
                      user: "Karim",
                      role: "Super User",
                      date: "06 Aug 2025",
                      value: "created",
                    },
                    {
                      action: "Updated",
                      user: "Rahim",
                      role: "Admin",
                      date: "08 Aug 2025",
                      value: "updated",
                    },
                    {
                      action: "Drafted",
                      user: "Karim",
                      role: "Super User",
                      date: "07 Aug 2025",
                      value: "drafted",
                    },
                    {
                      action: "Deleted",
                      user: "Abdullah",
                      role: "Super Admin",
                      date: "09 Aug 2025",
                      value: "deleted",
                    },
                  ]}
                  labelText="Actions"
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
        title={labels.resetForm}
        message={labels.resetFormMessage}
        confirmText={labels.resetFormConfirm}
        cancelText={labels.cancel}
      />

      {/* Language Translator Modal */}
      <LanguageTranslatorModal
        isOpen={isOptionModalOpen}
        onClose={() => setIsOptionModalOpen(false)}
        title="Invoice Language Translator"
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
            { key: "supplierName", label: "Supplier Name" },
            { key: "paymentMode", label: "Payment Mode" },
            { key: "dueDays", label: "Due Days" },
          ]}
          data={[
            {
              documentNumber: "INV001",
              supplierName: "AL AHAD CURTAINS TEX & FURNITURE TR.LLC",
              paymentMode: "Bank Transfer",
              dueDays: "30 days",
            },
            {
              documentNumber: "INV002",
              supplierName: "SimplyNayela",
              paymentMode: "Credit Card",
              dueDays: "15 days",
            },
            {
              documentNumber: "INV003",
              supplierName: "BROWN HUT AUTO ACCESSORISE TR L.L.C",
              paymentMode: "Cash",
              dueDays: "7 days",
            },
          ]}
          onSelect={(selectedData: any) => {
            console.log("Selected:", selectedData);
            setShowTemplates(false);
            setFormData((prev) => ({
              ...prev,
              supplierName: selectedData.supplierName,
              paymentMode: selectedData.paymentMode,
              dueDays: parseInt(selectedData.dueDays.replace(" days", "")),
              updatedAt: new Date(),
            }));
            handleSupplierNameChange(selectedData.supplierName);
          }}
          onClose={() => setShowTemplates(false)}
        />
      </Modal>
    </>
  );
}
