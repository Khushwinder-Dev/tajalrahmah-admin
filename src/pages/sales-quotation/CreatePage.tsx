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
import { useNavigate } from "react-router-dom";
import { usePermission } from "@/hooks/usePermissions";
import { useLanguageLabels } from "@/hooks/useLanguageLabels";
import { useAppSelector } from "@/store/hooks";
import MinimizablePageLayout from "@/components/MinimizablePageLayout";
import { useInvoiceFormData } from "@/hooks/useModuleFormData";
import { SwitchSelect } from "@/components/common/SwitchAutoComplete";
import { TemplateContent } from "@/components/common/TemplateContent";
import { cn } from "@/lib/utils";
import LanguageTranslatorModal from "@/components/common/LanguageTranslatorModel";
import DynamicInputTableList from "@/components/common/dynamic-input-table/DynamicInputTableList";
import EnglishDate from "@/components/EnglishDateInput";

// Define Sales Quotation interface
interface SalesQuotation {
  id: string;
  documentNumber: string;
  quotationNumber: string;
  quotationDate: string;
  customer: string;
  vatNumber: string;
  paymentMode: string;
  dueDays: number;
  paymentDate: string;
  country: string;
  state: string;
  city: string;
  remarks: string;
  salesman: string;
  isDefault: boolean;
  isActive: boolean;
  isDraft: boolean;
  createdAt: Date | null;
  draftedAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;
  isDeleted: boolean;
}

// Mock customer data for auto-fill functionality
interface CustomerData {
  name: string;
  vatNumber: string;
  country: string;
  state: string;
  city: string;
}

const MOCK_CUSTOMERS: CustomerData[] = [
  {
    name: "ABC Trading LLC",
    vatNumber: "VAT-1234567890",
    country: "UAE",
    state: "Dubai",
    city: "Deira",
  },
  {
    name: "Global Exports",
    vatNumber: "VAT-2345678901",
    country: "UAE",
    state: "Dubai",
    city: "Business Bay",
  },
  {
    name: "Sunrise Mart",
    vatNumber: "VAT-3456789012",
    country: "UAE",
    state: "Abu Dhabi",
    city: "Mussafah",
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

// Salesman options
const SALESMAN_OPTIONS = [
  "John Smith",
  "Sarah Johnson",
  "Michael Brown",
  "Emily Davis",
];

type Props = {
  isEdit?: boolean;
};

// Generate incremental document number
const generateDocumentNumber = () => {
  const lastNumber = localStorage.getItem("lastSalesQuotationDocNumber") || "0";
  const nextNumber = (parseInt(lastNumber) + 1).toString().padStart(3, "0");
  localStorage.setItem("lastSalesQuotationDocNumber", nextNumber);
  return `SQ${nextNumber}`;
};

// Generate incremental quotation number
const generateQuotationNumber = () => {
  const lastNumber = localStorage.getItem("lastQuotationNumber") || "0";
  const nextNumber = (parseInt(lastNumber) + 1).toString().padStart(3, "0");
  localStorage.setItem("lastQuotationNumber", nextNumber);
  return `QUO-${new Date().getFullYear()}-${nextNumber}`;
};

// Initial data factory function
const createInitialData = (): SalesQuotation => ({
  id: "1",
  documentNumber: generateDocumentNumber(),
  quotationNumber: generateQuotationNumber(),
  quotationDate: "",
  customer: "",
  vatNumber: "",
  paymentMode: "",
  dueDays: 0,
  paymentDate: "",
  country: "",
  state: "",
  city: "",
  remarks: "",
  salesman: "",
  isDefault: true,
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
  const labels = useLanguageLabels();
  const { isRTL } = useAppSelector((state) => state.language);

  const detectedModule = "sales-quotation";

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
  const [isCustomerAutoFilled, setIsCustomerAutoFilled] = useState(false);
  const [isDefaultState, setIsDefaultState] = useState<"Yes" | "No" | string>(
    "No"
  );

  // Translation state
  const [translations, setTranslations] = useState([
    { id: 1, english: "", arabic: "", bangla: "" },
  ]);

  // Permission checks
  const canCreate = usePermission(detectedModule, "create");
  const canView = usePermission(detectedModule, "view");
  const canPdf: boolean = usePermission(detectedModule, "pdf");
  const canPrint: boolean = usePermission(detectedModule, "print");
  const isDefaultPerm: boolean = usePermission(
    detectedModule,
    "edit",
    "isDefault"
  );

  // Form state
  const [formData, setFormData] = useState<SalesQuotation>(() =>
    createInitialData()
  );

  // Memoize customer data to prevent unnecessary re-renders
  const memoizedCustomers = useMemo(() => [...MOCK_CUSTOMERS], []);
  const memoizedPaymentModes = useMemo(() => [...PAYMENT_MODES], []);
  const memoizedSalesmanOptions = useMemo(() => [...SALESMAN_OPTIONS], []);

  // Update translation data when customer changes
  const updateTranslations = useCallback((customer: string) => {
    setTranslations([
      { id: 1, english: customer || "", arabic: "", bangla: "" },
    ]);
  }, []);

  useEffect(() => {
    updateTranslations(formData.customer);
  }, [formData.customer, updateTranslations]);

  // Helper function to check if customer fields should be disabled
  const isCustomerFieldsDisabled = () => {
    return !formData.customer || formData.customer.trim() === "";
  };

  // Function to search for customer by name
  const findCustomerByName = useCallback(
    (name: string): CustomerData | null => {
      if (!name.trim()) return null;

      // Find exact match first
      let customer = memoizedCustomers.find(
        (s) => s.name.toLowerCase() === name.toLowerCase()
      );

      // If no exact match, find partial match
      if (!customer) {
        customer = memoizedCustomers.find(
          (s) =>
            s.name.toLowerCase().includes(name.toLowerCase()) ||
            name.toLowerCase().includes(s.name.toLowerCase())
        );
      }

      return customer || null;
    },
    [memoizedCustomers]
  );

  // Simplified restore logic using the custom hook
  useEffect(() => {
    const shouldAutoRestore =
      hasMinimizedData &&
      moduleData &&
      !isRestoredFromMinimized &&
      !formData.customer &&
      !formData.documentNumber;

    if (shouldAutoRestore) {
      setFormData({
        ...(moduleData as any),
        isDraft: (moduleData as any)?.isDraft || false,
      });

      setStatusState(moduleData.isDraft ? "Draft" : "Active");
      setIsDefaultState((moduleData as any)?.isDefault ? "Yes" : "No");
      setIsRestoredFromMinimized(true);

      const scrollPosition = getModuleScrollPosition(
        "sales-invoice-form-module"
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
    formData.customer,
    formData.documentNumber,
    getModuleScrollPosition,
  ]);

  // Initialize with edit data if available
  useEffect(() => {
    if (isEdit && !hasMinimizedData && !isRestoredFromMinimized) {
      const initialData = createInitialData();
      setFormData(initialData);
      setStatusState(initialData.isDraft ? "Draft" : "Active");
      setIsDefaultState(initialData.isDefault ? "Yes" : "No");
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

  // Handle customer changes and auto-fill related fields
  const handleCustomerChange = useCallback(
    (value: string | null) => {
      const newCustomer = value || "";

      setFormData((prev) => ({
        ...prev,
        customer: newCustomer,
      }));

      // Search for matching customer
      const matchedCustomer = findCustomerByName(newCustomer);

      if (matchedCustomer) {
        // Auto-fill related fields
        setFormData((prev) => ({
          ...prev,
          customer: newCustomer,
          vatNumber: matchedCustomer.vatNumber,
          country: matchedCustomer.country,
          state: matchedCustomer.state,
          city: matchedCustomer.city,
        }));
        setIsCustomerAutoFilled(true);
      } else {
        // Clear auto-filled fields when customer is empty or no match
        setIsCustomerAutoFilled(false);
        setFormData((prev) => ({
          ...prev,
          customer: newCustomer,
          vatNumber: "",
          country: "",
          state: "",
          city: "",
        }));
      }
    },
    [findCustomerByName]
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
    setIsDefaultState("No");
    setIsRestoredFromMinimized(false);
    setIsCustomerAutoFilled(false);

    if (formRef.current) {
      formRef.current.reset();
    }

    setFormKey((prev) => prev + 1);

    if (hasMinimizedData) {
      try {
        await resetModuleData("sales-invoice-form-module");
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
            invoiceNumber: "Invoice Number",
            invoiceDate: "Invoice Date",
            customer: "Customer",
            trnNumber: "TRN Number",
            paymentMode: "Payment Mode",
            dueDays: "Due Days",
            paymentDate: "Payment Date",
            remarks: "Remarks",
            country: "Country",
            state: "State",
            city: "City",
            salesman: "Salesman",
            isDefault: "Default",
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
  const handleMinimize = useCallback((): any => {
    return {
      ...formData,
      hasChanges: true,
      scrollPosition: window.scrollY,
    };
  }, [formData]);

  return (
    <>
      <MinimizablePageLayout
        moduleId="sales-invoice-form-module"
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
            {/* First Row: Document Number, Quotation Number, Quotation Date, Customer */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {/* Document Number */}
              <div className="space-y-2">
                <EditableInput
                  setRef={setRef("documentNumber")}
                  id="documentNumber"
                  name="documentNumber"
                  value={formData.documentNumber}
                  onChange={handleChange}
                  onNext={() => focusNextInput("quotationNumber")}
                  onCancel={() => {}}
                  labelText="Document Number"
                  tooltipText="Auto-generated document number"
                  required
                  readOnly
                  className="bg-gray-100"
                />
              </div>

              {/* Quotation Number */}
              <div className="space-y-2">
                <EditableInput
                  setRef={setRef("quotationNumber")}
                  id="quotationNumber"
                  name="quotationNumber"
                  value={formData.quotationNumber}
                  onChange={handleChange}
                  onNext={() => focusNextInput("quotationDate")}
                  onCancel={() =>
                    setFormData({
                      ...formData,
                      quotationNumber: generateQuotationNumber(),
                    })
                  }
                  labelText="Quotation Number"
                  tooltipText="Unique quotation reference number"
                />
              </div>

              {/* Customer */}
              <div className="space-y-2">
                <Autocomplete
                  ref={(el: any) => setRef("customer")(el)}
                  id="customer"
                  name="customer"
                  labelText="Customer"
                  allowCustomInput={true}
                  options={memoizedCustomers.map((s) => s.name)}
                  value={formData.customer}
                  onValueChange={handleCustomerChange}
                  onEnterPress={() => focusNextInput("vatNumber")}
                  placeholder=""
                  className="relative"
                  tooltipText="Select or type customer"
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

              {/* Quotation Date */}
              <div className="space-y-2">
                <EnglishDate
                  isDate={true}
                  isShowCalender={true}
                  calendarType="gregorian"
                  userLang="en"
                  rtl={false}
                  onChange={(date: string) =>
                    setFormData({ ...formData, quotationDate: date })
                  }
                  value={formData.quotationDate}
                  disabled={false}
                  labelText="Quotation Date"
                  className={cn(
                    "transition-all",
                    "ring-1 ring-primary w-full!"
                  )}
                  setStartNextFocus={() => focusNextInput("customer")}
                />
              </div>
            </div>

            {/* Second Row: Customer, VAT Number, Payment Mode, Due Days */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {/* Customer */}
              <div className="space-y-2">
                <Autocomplete
                  ref={(el: any) => setRef("customer")(el)}
                  id="customer"
                  name="customer"
                  labelText="Customer"
                  allowCustomInput={true}
                  options={memoizedCustomers.map((s) => s.name)}
                  value={formData.customer}
                  onValueChange={handleCustomerChange}
                  onEnterPress={() => focusNextInput("vatNumber")}
                  placeholder=""
                  className="relative"
                  tooltipText="Select or type customer"
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

              {/* VAT Number */}
              <div className="space-y-2">
                <EditableInput
                  setRef={setRef("vatNumber")}
                  id="vatNumber"
                  name="vatNumber"
                  value={formData.vatNumber}
                  onChange={handleChange}
                  onNext={() => focusNextInput("paymentMode")}
                  onCancel={() => setFormData({ ...formData, vatNumber: "" })}
                  labelText="VAT Number"
                  tooltipText={
                    isCustomerFieldsDisabled()
                      ? "Select customer first"
                      : "VAT Registration Number"
                  }
                  readOnly={isCustomerFieldsDisabled() || isCustomerAutoFilled}
                  disabled={isCustomerFieldsDisabled()}
                  className={
                    isCustomerFieldsDisabled()
                      ? "bg-gray-200 cursor-not-allowed"
                      : isCustomerAutoFilled
                      ? "bg-gray-100"
                      : ""
                  }
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
                  disabled={false}
                  labelText="Payment Date"
                  className={cn("transition-all", "ring-1 ring-primary")}
                  setStartNextFocus={() => focusNextInput("trnNumber")}
                />
              </div>
            </div>

            {/* Third Row: Country, State, City, Remarks */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
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
                  tooltipText="Country"
                  readOnly={isCustomerFieldsDisabled() || isCustomerAutoFilled}
                  disabled={isCustomerFieldsDisabled()}
                  className={
                    isCustomerFieldsDisabled()
                      ? "bg-gray-200 cursor-not-allowed"
                      : isCustomerAutoFilled
                      ? "bg-gray-100"
                      : ""
                  }
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
                  tooltipText="State"
                  readOnly={isCustomerFieldsDisabled() || isCustomerAutoFilled}
                  disabled={isCustomerFieldsDisabled()}
                  className={
                    isCustomerFieldsDisabled()
                      ? "bg-gray-200 cursor-not-allowed"
                      : isCustomerAutoFilled
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
                  onNext={() => focusNextInput("remarks")}
                  onCancel={() => setFormData({ ...formData, city: "" })}
                  labelText="City"
                  tooltipText="City"
                  readOnly={isCustomerFieldsDisabled() || isCustomerAutoFilled}
                  disabled={isCustomerFieldsDisabled()}
                  className={
                    isCustomerFieldsDisabled()
                      ? "bg-gray-200 cursor-not-allowed"
                      : isCustomerAutoFilled
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
                  onNext={() => focusNextInput("salesman")}
                  onCancel={() => setFormData({ ...formData, remarks: "" })}
                  labelText="Remarks"
                  tooltipText="Additional remarks or notes"
                />
              </div>

              {/* Salesman */}
              <div className="space-y-2">
                <Autocomplete
                  ref={(el: any) => setRef("salesman")(el)}
                  id="salesman"
                  name="salesman"
                  allowCustomInput={true}
                  options={memoizedSalesmanOptions}
                  value={formData.salesman}
                  onValueChange={(value: string | null) =>
                    setFormData({ ...formData, salesman: value || "" })
                  }
                  onEnterPress={() => focusNextInput("isDefault")}
                  placeholder=""
                  labelText="Salesman"
                  className="relative"
                  tooltipText="Select salesman"
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
                        focusNextInput("status");
                      }
                    }}
                    placeholder=" "
                    labelText="Default"
                    className="relative"
                    tooltipText="Mark as default sales quotation"
                  />
                </div>
              )}

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
                  tooltipText="Sales Invoice status"
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
        title="Sales Invoice Language Translator"
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
            { key: "customer", label: "Customer" },
            { key: "paymentMode", label: "Payment Mode" },
            { key: "dueDays", label: "Due Days" },
          ]}
          data={[
            {
              documentNumber: "DOC001",
              customer: "ABC Trading LLC",
              paymentMode: "Bank Transfer",
              dueDays: "30 days",
            },
            {
              documentNumber: "DOC002",
              customer: "Global Exports",
              paymentMode: "Credit Card",
              dueDays: "15 days",
            },
            {
              documentNumber: "DOC003",
              customer: "Sunrise Mart",
              paymentMode: "Cash",
              dueDays: "7 days",
            },
            {
              documentNumber: "DOC004",
              customer: "Blue Ocean Foods",
              paymentMode: "Wire Transfer",
              dueDays: "45 days",
            },
            {
              documentNumber: "DOC005",
              customer: "Prime Retailers",
              paymentMode: "Check",
              dueDays: "21 days",
            },
          ]}
          onSelect={(selectedData: any) => {
            console.log("Selected:", selectedData);
            setShowTemplates(false);
            setFormData((prev) => ({
              ...prev,
              customer: selectedData.customer,
              paymentMode: selectedData.paymentMode,
              dueDays: parseInt(selectedData.dueDays.replace(" days", "")),
            }));
            // Trigger auto-fill for customer
            handleCustomerChange(selectedData.customer);
          }}
          onClose={() => setShowTemplates(false)}
        />
      </Modal>
    </>
  );
}
