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
import { Check, Edit, Eye, Plus, Upload, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { usePermission } from "@/hooks/usePermissions";
import { useLanguageLabels } from "@/hooks/useLanguageLabels";
import { useAppSelector } from "@/store/hooks";
import type { PurchaseReturnModuleData } from "@/types/modules";
import MinimizablePageLayout from "@/components/MinimizablePageLayout";
import { usePurchaseReturnFormData } from "@/hooks/useModuleFormData";
import { SwitchSelect } from "@/components/common/SwitchAutoComplete";
import { TemplateContent } from "@/components/common/TemplateContent";
import { cn } from "@/lib/utils";
import { getModuleFromPath } from "@/lib/utils";
import LanguageTranslatorModal from "@/components/common/LanguageTranslatorModel";
import DynamicInputTableList from "@/components/common/dynamic-input-table/DynamicInputTableList";
import EnglishDate from "@/components/EnglishDateInput";

// Define PurchaseReturn interface to ensure type consistency
interface PurchaseReturn {
  id: string;
  documentNumber: string;
  purchaseInvoiceNumber: string;
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
  documents: string;
  expiryDate: string;
  image: string | null;
  isDefault: boolean;
  isActive: boolean;
  isDraft: boolean;
  createdAt: Date | null;
  draftedAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;
  isDeleted: boolean;
}

// Mock purchase invoice data for auto-fill functionality
interface PurchaseInvoiceData {
  id: string;
  purchaseInvoiceNumber: string;
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
}

const MOCK_PURCHASE_INVOICES: PurchaseInvoiceData[] = [
  {
    id: "1",
    purchaseInvoiceNumber: "INV-2023-001",
    poNumber: "PO-2023-001",
    poDate: "2023-01-15",
    supplierName: "ABC Suppliers",
    paymentMode: "Credit",
    dueDays: 30,
    paymentDate: "2023-02-14",
    supplierNumber: "SUP-001",
    supplierStatus: "Active",
    supplierGroup: "Electronics",
    remarks: "First quarter order",
    country: "UAE",
    state: "Dubai",
    city: "Dubai",
  },
  {
    id: "2",
    purchaseInvoiceNumber: "INV-2023-002",
    poNumber: "PO-2023-002",
    poDate: "2023-02-20",
    supplierName: "XYZ Wholesale",
    paymentMode: "Cash",
    dueDays: 0,
    paymentDate: "2023-02-20",
    supplierNumber: "SUP-002",
    supplierStatus: "Active",
    supplierGroup: "Furniture",
    remarks: "Office furniture",
    country: "UAE",
    state: "Abu Dhabi",
    city: "Abu Dhabi",
  },
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

type Props = {
  isEdit?: boolean;
};

// Generate incremental document number
const generateDocumentNumber = () => {
  const lastNumber = localStorage.getItem("lastPurchaseReturnNumber") || "0";
  const nextNumber = (parseInt(lastNumber) + 1).toString().padStart(3, "0");
  localStorage.setItem("lastPurchaseReturnNumber", nextNumber);
  return `PR${nextNumber}`;
};

// Initial data factory function
const createInitialData = (): PurchaseReturn => ({
  id: "1",
  documentNumber: generateDocumentNumber(),
  purchaseInvoiceNumber: "",
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
  documents: "",
  expiryDate: "",
  image: null,
  isDefault: false,
  isActive: true,
  isDraft: false,
  createdAt: new Date(),
  draftedAt: null,
  updatedAt: new Date(),
  deletedAt: null,
  isDeleted: false,
});

export default function PurchaseReturnsCreatePage({ isEdit = false }: Props) {
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
  } = usePurchaseReturnFormData();

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
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
  const [formData, setFormData] = useState<PurchaseReturn>(() =>
    createInitialData()
  );

  // Memoize purchase invoice data to prevent unnecessary re-renders
  const memoizedPurchaseInvoices = useMemo(
    () => [...MOCK_PURCHASE_INVOICES],
    []
  );
  const memoizedPaymentModes = useMemo(() => [...PAYMENT_MODES], []);

  // Update translation data when supplier name changes
  const updateTranslations = useCallback((supplierName: string) => {
    setTranslations([
      { id: 1, english: supplierName || "", arabic: "", bangla: "" },
    ]);
  }, []);

  useEffect(() => {
    updateTranslations(formData.supplierName);
  }, [formData.supplierName, updateTranslations]);

  // Function to search for purchase invoice by number
  const findPurchaseInvoiceByNumber = useCallback(
    (invoiceNumber: string): PurchaseInvoiceData | null => {
      return (
        memoizedPurchaseInvoices.find(
          (invoice) => invoice.purchaseInvoiceNumber === invoiceNumber
        ) || null
      );
    },
    [memoizedPurchaseInvoices]
  );

  // Simplified restore logic using the custom hook
  useEffect(() => {
    const shouldAutoRestore =
      hasMinimizedData &&
      moduleData &&
      !isRestoredFromMinimized &&
      !formData.purchaseInvoiceNumber &&
      !formData.supplierName;

    if (shouldAutoRestore) {
      setFormData({
        ...(moduleData as any),
        isDraft: (moduleData as any)?.isDraft || false,
      });

      setIsDefaultState(moduleData.isDefault ? "Yes" : "No");
      setStatusState(moduleData.isDraft ? "Draft" : "Active");

      if (moduleData.image) {
        setImagePreview(moduleData.image);
      }

      setIsRestoredFromMinimized(true);

      const scrollPosition = getModuleScrollPosition(
        "purchase-return-form-module"
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
    formData.purchaseInvoiceNumber,
    formData.supplierName,
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

  // Handle purchase invoice selection and auto-fill
  const handlePurchaseInvoiceChange = useCallback(
    (value: string | null) => {
      if (value) {
        const selectedInvoice = findPurchaseInvoiceByNumber(value);

        if (selectedInvoice) {
          setFormData((prev) => ({
            ...prev,
            purchaseInvoiceNumber: selectedInvoice.purchaseInvoiceNumber,
            poNumber: selectedInvoice.poNumber,
            poDate: selectedInvoice.poDate,
            supplierName: selectedInvoice.supplierName,
            paymentMode: selectedInvoice.paymentMode,
            dueDays: selectedInvoice.dueDays,
            paymentDate: selectedInvoice.paymentDate,
            supplierNumber: selectedInvoice.supplierNumber,
            supplierStatus: selectedInvoice.supplierStatus,
            supplierGroup: selectedInvoice.supplierGroup,
            remarks: selectedInvoice.remarks,
            country: selectedInvoice.country,
            state: selectedInvoice.state,
            city: selectedInvoice.city,
          }));
        } else {
          setFormData((prev) => ({
            ...prev,
            purchaseInvoiceNumber: value,
          }));
        }
      }
    },
    [findPurchaseInvoiceByNumber]
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

  // Handle image file selection
  const handleImageFile = (file: File) => {
    if (file.type.match("image.*")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
        setFormData({ ...formData, image: e.target?.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle drag events
  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleImageFile(files[0]);
    }
  };

  // Handle image upload via file input
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageFile(file);
    }
  };

  // Trigger file input click
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (pdfChecked) {
      await handleExportPDF();
    }
    if (printEnabled) {
      handlePrintPurchaseReturn(formData);
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
    setImagePreview(null);

    if (formRef.current) {
      formRef.current.reset();
    }

    setFormKey((prev) => prev + 1);

    if (hasMinimizedData) {
      try {
        await resetModuleData("purchase-return-form-module");
        console.log("Form data reset in Redux");
      } catch (error) {
        console.error("Error resetting form data:", error);
      }
    }

    setTimeout(() => {
      inputRefs.current["documentNumber"]?.focus();
    }, 100);
  };

  const handlePrintPurchaseReturn = useCallback(
    (purchaseReturnData: any) => {
      try {
        const html = PrintCommonLayout({
          title: `${detectedModule} Details`,
          data: [purchaseReturnData],
          excludeFields: ["id", "__v", "_id", "image"],
          fieldLabels: {
            documentNumber: "Document Number",
            purchaseInvoiceNumber: "Purchase Invoice Number",
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
            documents: "Documents",
            expiryDate: "Expiry Date",
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
      setTimeout(() => handlePrintPurchaseReturn(formData), 100);
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
    console.log("Purchase Return translations saved:", data);
  }, []);

  // Create minimize handler
  const handleMinimize = useCallback((): PurchaseReturnModuleData => {
    return {
      ...formData,
      hasChanges: true,
      scrollPosition: window.scrollY,
    };
  }, [formData]);

  return (
    <>
      <MinimizablePageLayout
        moduleId="purchase-return-form-module"
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
        listPath="purchase-returns"
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
            {/* First Row: Document Number, Purchase Invoice Number, P.O Number, P.O Date */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {/* Document Number */}
              <div className="space-y-2">
                <EditableInput
                  setRef={setRef("documentNumber")}
                  id="documentNumber"
                  name="documentNumber"
                  value={formData.documentNumber}
                  onChange={handleChange}
                  onNext={() => focusNextInput("purchaseInvoiceNumber")}
                  onCancel={() => {}}
                  labelText="Document Number"
                  tooltipText="Auto-generated document number"
                  required
                  readOnly
                  className="bg-gray-100"
                />
              </div>

              {/* Purchase Invoice Number */}
              <div className="space-y-2">
                <Autocomplete
                  ref={(el: any) => setRef("purchaseInvoiceNumber")(el)}
                  id="purchaseInvoiceNumber"
                  name="purchaseInvoiceNumber"
                  allowCustomInput={true}
                  options={memoizedPurchaseInvoices.map(
                    (invoice) =>
                      `${invoice.purchaseInvoiceNumber} - ${invoice.supplierName}`
                  )}
                  value={
                    formData.purchaseInvoiceNumber && formData.supplierName
                      ? `${formData.purchaseInvoiceNumber} - ${formData.supplierName}`
                      : formData.purchaseInvoiceNumber
                  }
                  onValueChange={(value: string | null) => {
                    if (value) {
                      const invoiceNumber = value.split(" - ")[0];
                      handlePurchaseInvoiceChange(invoiceNumber);
                    }
                  }}
                  onEnterPress={() => focusNextInput("poNumber")}
                  placeholder=""
                  labelText="Purchase Invoice Number"
                  className="relative"
                  tooltipText="Select purchase invoice number"
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
                  onNext={() => focusNextInput("poDate")}
                  onCancel={() => setFormData({ ...formData, poNumber: "" })}
                  labelText="P.O Number"
                  tooltipText="Purchase order number"
                  readOnly
                  className="bg-gray-100"
                />
              </div>

              {/* P.O Date */}
              <div className="space-y-2">
                <EnglishDate
                  isDate={true}
                  calendarType="gregorian"
                  userLang="en"
                  rtl={false}
                  isShowCalender={true}
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

            {/* Second Row: Supplier Name, Payment Mode, Due Days, Payment Date */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {/* Supplier Name */}
              <div className="space-y-2">
                <EditableInput
                  setRef={setRef("supplierName")}
                  id="supplierName"
                  name="supplierName"
                  value={formData.supplierName}
                  onChange={handleChange}
                  onNext={() => focusNextInput("paymentMode")}
                  onCancel={() =>
                    setFormData({ ...formData, supplierName: "" })
                  }
                  tooltipText="Supplier name (auto-filled from invoice)"
                  readOnly
                  className="bg-gray-100"
                />
              </div>

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
                  tooltipText="Payment mode (auto-filled from invoice)"
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

              {/* Payment Date */}
              <div className="space-y-2">
                <EnglishDate
                  isDate={true}
                  calendarType="gregorian"
                  userLang="en"
                  rtl={false}
                  isShowCalender={true}
                  onChange={(date: string) =>
                    setFormData({ ...formData, paymentDate: date })
                  }
                  value={formData.paymentDate}
                  disabled={false}
                  labelText="Payment Date"
                  className={cn("transition-all", "ring-1 ring-primary")}
                  setStartNextFocus={() => focusNextInput("supplierNumber")}
                />
              </div>
            </div>

            {/* Third Row: Supplier Number, Supplier Status, Supplier Group, Remarks */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8relative">
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
                  tooltipText="Supplier number (auto-filled from invoice)"
                  readOnly
                  className="bg-gray-100"
                />
              </div>

              {/* Supplier Status */}
              <div className="space-y-2">
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
                  tooltipText="Supplier status (auto-filled from invoice)"
                  readOnly
                  className="bg-gray-100"
                />
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
                  tooltipText="Supplier group (auto-filled from invoice)"
                  readOnly
                  className="bg-gray-100"
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
            </div>

            {/* Fourth Row: Country, State, City, Documents */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
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
                  tooltipText="Country (auto-filled from invoice)"
                  readOnly
                  className="bg-gray-100"
                />
              </div>

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
                  tooltipText="State (auto-filled from invoice)"
                  readOnly
                  className="bg-gray-100"
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
                  onNext={() => focusNextInput("documents")}
                  onCancel={() => setFormData({ ...formData, city: "" })}
                  labelText="City"
                  tooltipText="City (auto-filled from invoice)"
                  readOnly
                  className="bg-gray-100"
                />
              </div>

              {/* Documents */}
              <div className="space-y-2">
                <EditableInput
                  setRef={setRef("documents")}
                  id="documents"
                  name="documents"
                  value={formData.documents}
                  onChange={handleChange}
                  onNext={() => focusNextInput("expiryDate")}
                  onCancel={() => setFormData({ ...formData, documents: "" })}
                  labelText="Documents"
                  tooltipText="Enter document name"
                />
              </div>
            </div>

            {/* Fifth Row: Expiry Date, Default Status, Status */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {/* Expiry Date */}
              <div className="space-y-2">
                <EnglishDate
                  isDate={true}
                  calendarType="gregorian"
                  userLang="en"
                  rtl={false}
                  isShowCalender={true}
                  onChange={(date: string) =>
                    setFormData({ ...formData, expiryDate: date })
                  }
                  value={formData.expiryDate}
                  disabled={false}
                  labelText="Expiry Date"
                  className={cn("transition-all", "ring-1 ring-primary")}
                  setStartNextFocus={() => focusNextInput("isDefault")}
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
                  placeholder=""
                  labelText={labels.default}
                  className="relative"
                  tooltipText="Set as default purchase return"
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
                  tooltipText="Purchase return status"
                />
              </div>
            </div>

            {/* Dynamic Input Table */}
            <DynamicInputTableList />

            {/* Document Upload Section */}
            <div className="mt-14 relative">
              <div className="absolute -top-3 left-3 bg-white px-2 text-sm font-medium text-gray-500 rounded-md">
                Customer Logo
              </div>

              <div
                className={`border-2 border-dashed rounded-lg p-6 text-center focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary py-16 ${
                  isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
                }`}
                tabIndex={0}
                ref={(el) => setRef("fileUploadElement")(el as HTMLElement)}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={triggerFileInput}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    triggerFileInput();
                  }
                }}
              >
                {imagePreview ? (
                  <div className="relative inline-block">
                    <img
                      src={imagePreview}
                      alt="Document preview"
                      className="w-48 h-28 object-contain rounded-md mx-auto"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-white shadow-sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        setImagePreview(null);
                        setFormData({ ...formData, image: null });
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Upload className="h-8 w-8 text-gray-400" />
                    <p className="text-sm text-gray-500">
                      Drag & drop image here, or click to select
                    </p>
                    <p className="text-xs text-gray-400">
                      Or click to select from files
                    </p>
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  onChange={handleImageChange}
                  accept="image/*"
                  className="hidden"
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
        title="Purchase Return Language Translator"
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
            { key: "purchaseInvoiceNumber", label: "Purchase Invoice Number" },
            { key: "supplierName", label: "Supplier Name" },
            { key: "paymentMode", label: "Payment Mode" },
          ]}
          data={[
            {
              documentNumber: "PR001",
              purchaseInvoiceNumber: "INV-2023-001",
              supplierName: "ABC Suppliers",
              paymentMode: "Credit",
            },
            {
              documentNumber: "PR002",
              purchaseInvoiceNumber: "INV-2023-002",
              supplierName: "XYZ Wholesale",
              paymentMode: "Cash",
            },
            {
              documentNumber: "PR003",
              purchaseInvoiceNumber: "INV-2023-003",
              supplierName: "Tech Solutions Ltd",
              paymentMode: "Bank Transfer",
            },
          ]}
          onSelect={(selectedData: any) => {
            console.log("Selected:", selectedData);
            setShowTemplates(false);
            // Auto-fill the invoice number which will trigger auto-fill of other fields
            handlePurchaseInvoiceChange(selectedData.purchaseInvoiceNumber);
          }}
          onClose={() => setShowTemplates(false)}
        />
      </Modal>
    </>
  );
}
