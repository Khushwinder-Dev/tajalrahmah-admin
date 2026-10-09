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
import type { InvoiceModuleData } from "@/types/modules";
import MinimizablePageLayout from "@/components/MinimizablePageLayout";
import { useInvoiceFormData } from "@/hooks/useModuleFormData";
import { SwitchSelect } from "@/components/common/SwitchAutoComplete";
import { TemplateContent } from "@/components/common/TemplateContent";
import { cn } from "@/lib/utils";
import { getModuleFromPath } from "@/lib/utils";
import LanguageTranslatorModal from "@/components/common/LanguageTranslatorModel";
import DynamicInputTableList from "@/components/common/dynamic-input-table/DynamicInputTableList";
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
  // ... rest of the mock suppliers
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

type Props = {
  isEdit?: boolean;
};

// Generate incremental document number
const generateDocumentNumber = () => {
  const lastNumber = localStorage.getItem("lastInvoiceNumber") || "0";
  const nextNumber = (parseInt(lastNumber) + 1).toString().padStart(3, "0");
  localStorage.setItem("lastInvoiceNumber", nextNumber);
  return `INV${nextNumber}`;
};

// Initial data factory function
const createInitialData = (): Invoice => ({
  id: "1",
  documentNumber: generateDocumentNumber(),
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

export default function InvoiceCreatePage({ isEdit = false }: Props) {
  const navigate = useNavigate();
  const location = useLocation();
  const labels = useLanguageLabels();
  const { isRTL } = useAppSelector((state) => state.language);

  const detectedModule = getModuleFromPath(location.pathname);

  // Use the custom hook for minimized module data
  const {
    moduleData,
    hasMinimizedData,
    resetModuleData,
    getModuleScrollPosition,
  } = useInvoiceFormData();

  const [showTemplates, setShowTemplates] = useState(false);
  const [keepCreating, setKeepCreating] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [statusState, setStatusState] = useState<"Active" | "Draft" | string>(
    "Active"
  );
  const [printEnabled, setPrintEnabled] = useState(false);
  const [pdfChecked, setPdfChecked] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [formKey, setFormKey] = useState(0);
  const [isRestoredFromMinimized, setIsRestoredFromMinimized] = useState(false);
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
  const [formData, setFormData] = useState<Invoice>(() => createInitialData());

  // Memoize supplier data to prevent unnecessary re-renders
  const memoizedSuppliers = useMemo(() => [...MOCK_SUPPLIERS], []);
  const memoizedPaymentModes = useMemo(() => [...PAYMENT_MODES], []);
  const memoizedStatusOptions = useMemo(() => [...SUPPLIER_STATUS_OPTIONS], []);

  // Update translation data when supplier name changes
  const updateTranslations = useCallback((supplierName: string) => {
    setTranslations([
      { id: 1, english: supplierName || "", arabic: "", bangla: "" },
    ]);
  }, []);

  useEffect(() => {
    updateTranslations(formData.supplierName);
  }, [formData.supplierName, updateTranslations]);

  // Helper function to check if supplier fields should be disabled
  const isSupplierFieldsDisabled = () => {
    return !formData.supplierName || formData.supplierName.trim() === "";
  };

  // Function to search for supplier by name
  const findSupplierByName = useCallback(
    (name: string): SupplierData | null => {
      if (!name.trim()) return null;

      // Find exact match first
      let supplier = memoizedSuppliers.find(
        (s) => s.name.toLowerCase() === name.toLowerCase()
      );

      // If no exact match, find partial match
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

  // Simplified restore logic using the custom hook
  useEffect(() => {
    const shouldAutoRestore =
      hasMinimizedData &&
      moduleData &&
      !isRestoredFromMinimized &&
      !formData.supplierName &&
      !formData.documentNumber;

    if (shouldAutoRestore) {
      setFormData({
        ...(moduleData as any),
        isDraft: (moduleData as any)?.isDraft || false,
      });

      setStatusState(moduleData.isDraft ? "Draft" : "Active");
      setIsRestoredFromMinimized(true);

      const scrollPosition = getModuleScrollPosition("invoice-form-module");
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
    formData.supplierName,
    formData.documentNumber,
    getModuleScrollPosition,
  ]);

  // Initialize with edit data if available
  useEffect(() => {
    if (isEdit && !hasMinimizedData && !isRestoredFromMinimized) {
      const initialData = createInitialData();
      setFormData(initialData);
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

  // Handle supplier name changes and auto-fill related fields
  const handleSupplierNameChange = useCallback(
    (value: string | null) => {
      const newSupplierName = value || "";

      setFormData((prev) => ({
        ...prev,
        supplierName: newSupplierName,
      }));

      // Search for matching supplier
      const matchedSupplier = findSupplierByName(newSupplierName);

      if (matchedSupplier) {
        // Auto-fill related fields
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
        }));
        setIsSupplierAutoFilled(true);
      } else {
        // Clear auto-filled fields when supplier name is empty or no match
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
    const newData = createInitialData();
    setFormData(newData);
    setStatusState("Active");
    setIsRestoredFromMinimized(false);
    setIsSupplierAutoFilled(false);

    if (formRef.current) {
      formRef.current.reset();
    }

    setFormKey((prev) => prev + 1);

    if (hasMinimizedData) {
      try {
        await resetModuleData("invoice-form-module");
        console.log("Form data reset in Redux");
      } catch (error) {
        console.error("Error resetting form data:", error);
      }
    }

    setTimeout(() => {
      inputRefs.current["documentNumber"]?.focus();
    }, 100);
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
    if (checked && formData) {
      setTimeout(() => handlePrintInvoice(formData), 100);
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

  return (
    <>
      <MinimizablePageLayout
        moduleId="invoice-form-module"
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
            {/* First Row: Document Number, P.O Number, P.O Date, Supplier Name */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {/* Document Number */}
              <div className="space-y-2">
                <EditableInput
                  setRef={setRef("documentNumber")}
                  id="documentNumber"
                  name="documentNumber"
                  value={formData.documentNumber}
                  onChange={handleChange}
                  onNext={() => focusNextInput("poNumber")}
                  onCancel={() => {}}
                  labelText="Document Number"
                  tooltipText="Auto-generated document number"
                  required
                  readOnly
                  className="bg-gray-100"
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
                  onNext={() => focusNextInput("poDate")}
                  onCancel={() => setFormData({ ...formData, poNumber: "" })}
                  labelText="P.O Number"
                  tooltipText="Purchase order number"
                />
              </div>

              {/* Supplier Name */}
              <div className="space-y-2">
                <Autocomplete
                  ref={(el: any) => setRef("supplierName")(el)}
                  id="supplierName"
                  name="supplierName"
                  labelText="Supplier Name"
                  allowCustomInput={true}
                  options={memoizedSuppliers.map((s) => s.name)}
                  value={formData.supplierName}
                  onValueChange={handleSupplierNameChange}
                  onEnterPress={() => focusNextInput("paymentMode")}
                  placeholder=""
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
                  isShowTemplateIcon={true}
                />
              </div>

              {/* P.O Date */}
              <div className="space-y-2">
                <EnglishDate
                  isDate={true}
                  isShowCalender={true}
                  calendarType="gregorian"
                  userLang="en"
                  rtl={false}
                  onChange={(date: string) =>
                    setFormData({ ...formData, poDate: date })
                  }
                  value={formData.poDate}
                  disabled={false}
                  labelText="P.O Date"
                  className={cn("transition-all", "ring-1 ring-primary")}
                  setStartNextFocus={() => focusNextInput("supplierName")}
                />
              </div>
            </div>

            {/* Second Row: Payment Mode, Due Days, Payment Date, Supplier Number */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {/* Payment Mode */}
              <div className="space-y-2">
                <Autocomplete
                  ref={(el: any) => setRef("paymentMode")(el)}
                  id="paymentMode"
                  name="paymentMode"
                  allowCustomInput={true}
                  options={memoizedPaymentModes}
                  value={formData.paymentMode}
                  onValueChange={(value: string | null) =>
                    setFormData({ ...formData, paymentMode: value || "" })
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
              <div className="space-y-2">
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

              {/* Supplier Number */}
              <div className="space-y-2">
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

              {/* Payment Date */}
              <div className="space-y-2">
                <EnglishDate
                  isDate={true}
                  isShowCalender={true}
                  calendarType="gregorian"
                  userLang="en"
                  rtl={false}
                  onChange={(date: string) =>
                    setFormData({ ...formData, paymentDate: date })
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
            </div>

            {/* Third Row: Supplier Status, Supplier Group, Remarks, Country */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {/* Supplier Status */}
              <div className="space-y-2">
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
                      setFormData({ ...formData, supplierStatus: value || "" })
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
              <div className="space-y-2">
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
                  readOnly={isSupplierFieldsDisabled()}
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
              <div className="space-y-2">
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
              <div className="space-y-2">
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

            {/* Fourth Row: State, City, Status */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {/* State */}
              <div className="space-y-2">
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
              <div className="space-y-2">
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
                  tooltipText="Invoice status"
                />
              </div>
            </div>

            {/* Dynamic Input Table */}
            <DynamicInputTableList />
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
            {
              documentNumber: "INV004",
              supplierName: "PIDILITE MEA CHEMICALS L.L.C",
              paymentMode: "Wire Transfer",
              dueDays: "45 days",
            },
            {
              documentNumber: "INV005",
              supplierName: "TOP LEATHER Vehicles Upholstery Service L.L.C",
              paymentMode: "Check",
              dueDays: "21 days",
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
            }));
            // Trigger auto-fill for supplier
            handleSupplierNameChange(selectedData.supplierName);
          }}
          onClose={() => setShowTemplates(false)}
        />
      </Modal>
    </>
  );
}
