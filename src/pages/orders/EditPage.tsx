/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Trash2, Undo2, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import EditableInput, {
  type EditableInputRef,
} from "@/components/common/EditableInput";
import { Autocomplete } from "@mantine/core";
import video from "@/assets/videos/test.mp4";
import GenericPDF from "@/components/common/pdf";
import { printHtmlContent } from "@/lib/printHtmlContent";
import { toastError } from "@/lib/toast";
import { pdf } from "@react-pdf/renderer";
import PageLayout from "@/components/common/PageLayout";
import LanguageTranslatorModal from "@/components/common/LanguageTranslatorModel";
import { useNavigate } from "react-router-dom";
import { PrintCommonLayout } from "@/lib/printContents/PrintCommonLayout";
import DynamicInputTableList from "@/components/common/dynamic-input-table/DynamicInputTableList";

// Define Order interface to ensure type consistency
interface Order {
  id: string;
  documentNumber: string;
  poNumber: string;
  poDate: Date | string;
  supplierName: string;
  paymentMode: string;
  dueDays: number;
  paymentDate: Date | string;
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
    name: "AL AHAD CURTAINS TEX &amp; FURNITURE TR.LLC",
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
  {
    name: "BROWN HUT AUTO ACCESSORISE TR L.L.C",
    number: "23",
    status: "Active",
    group: "Auto Accessories",
    country: "UAE",
    state: "Sharjah",
    city: "Industrial Area",
    paymentDate: "2024-08-10",
  },
  {
    name: "PIDILITE MEA CHEMICALS L.L.C",
    number: "34",
    status: "Active",
    group: "Chemicals",
    country: "UAE",
    state: "Dubai",
    city: "Jebel Ali",
    paymentDate: "2024-08-08",
  },
  {
    name: "TOP LEATHER Vehicles Upholstery Service L.L.C",
    number: "45",
    status: "Active",
    group: "Auto Services",
    country: "UAE",
    state: "Abu Dhabi",
    city: "Mussafah",
    paymentDate: "2024-08-05",
  },
  {
    name: "AL WESAL AUTO ACCESSORIES LLC",
    number: "56",
    status: "Pending",
    group: "Auto Accessories",
    country: "UAE",
    state: "Dubai",
    city: "Al Qusais",
    paymentDate: "2024-08-03",
  },
  {
    name: "Nader Alamiri Auto Accessories Trading L.L.C",
    number: "67",
    status: "Active",
    group: "Auto Trading",
    country: "UAE",
    state: "Sharjah",
    city: "Al Majaz",
    paymentDate: "2024-08-01",
  },
  {
    name: "GOLDEN FALCON UPHOLSTERY &amp; FURNITURE",
    number: "78",
    status: "Suspended",
    group: "Furniture",
    country: "UAE",
    state: "Dubai",
    city: "Al Karama",
    paymentDate: "2024-07-30",
  },
  {
    name: "TAJUDDIN READYMADE GARMENTS",
    number: "89",
    status: "Active",
    group: "Garments",
    country: "Bangladesh",
    state: "Dhaka",
    city: "Gulshan",
    paymentDate: "2024-07-28",
  },
  {
    name: "HUSSAIN MOHD.FURNITURE",
    number: "90",
    status: "Active",
    group: "Furniture",
    country: "UAE",
    state: "Dubai",
    city: "Bur Dubai",
    paymentDate: "2024-07-25",
  },
  {
    name: "AJMAL ZEENA AUTO UPHOLESTRY &amp; ACCESSORIES FIX",
    number: "101",
    status: "Active",
    group: "Auto Services",
    country: "UAE",
    state: "Abu Dhabi",
    city: "Al Ain",
    paymentDate: "2024-07-22",
  },
  {
    name: "TAJ AL ROLA AUTO .ACCESSORIES TRADING",
    number: "112",
    status: "Pending",
    group: "Auto Trading",
    country: "UAE",
    state: "Sharjah",
    city: "Al Nahda",
    paymentDate: "2024-07-20",
  },
  {
    name: "AL RAHMANIAH AUTO ACCESSORIES",
    number: "123",
    status: "Active",
    group: "Auto Accessories",
    country: "UAE",
    state: "Dubai",
    city: "Jumeirah",
    paymentDate: "2024-07-18",
  },
  {
    name: "LIANDEN EXPERT AUTO ACCESSORIES TRANDING L.L.C",
    number: "134",
    status: "Active",
    group: "Auto Trading",
    country: "UAE",
    state: "Dubai",
    city: "Downtown",
    paymentDate: "2024-07-15",
  },
  {
    name: "AL BAHAR AL THAHBI AUTO UPHOLESTRY",
    number: "145",
    status: "Suspended",
    group: "Auto Services",
    country: "UAE",
    state: "Abu Dhabi",
    city: "Khalifa City",
    paymentDate: "2024-07-12",
  },
];

type Props = {
  isEdit?: boolean;
};

const initialData: Order = {
  id: "1",
  documentNumber: "7",
  poNumber: "",
  poDate: "24-07-2025",
  supplierName: "AL AHAD CURTAINS TEX &amp; FURNITURE TR.LLC",
  paymentMode: "Split",
  dueDays: 45,
  paymentDate: "",
  supplierNumber: "36",
  supplierStatus: "Active",
  supplierGroup: "",
  remarks: "44",
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
};

export default function EditPage({ isEdit = false }: Props) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [keepCreating, setKeepCreating] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);

  const documentNumberInputRef = useRef<EditableInputRef>(null);
  const poNumberInputRef = useRef<EditableInputRef>(null);
  const supplierNameInputRef = useRef<EditableInputRef>(null);
  const activeSwitchRef = useRef<HTMLButtonElement>(null);
  const draftSwitchRef = useRef<HTMLButtonElement>(null);
  const deleteButtonRef = useRef<HTMLButtonElement>(null);
  const [printEnabled, setPrintEnabled] = useState(false);
  const [pdfChecked, setPdfChecked] = useState(false);

  // State to track if supplier fields are auto-filled (and should be read-only)
  const [isSupplierAutoFilled, setIsSupplierAutoFilled] = useState(false);

  // Helper function to check if supplier fields should be disabled
  const isSupplierFieldsDisabled = () => {
    return !formData.supplierName || formData.supplierName.trim() === "";
  };

  // Translation state
  const [translations, setTranslations] = useState([
    { id: 1, english: "", arabic: "", bangla: "" },
  ]);

  // Form state
  const [formData, setFormData] = useState<Order>({
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
    createdAt: null,
    draftedAt: null,
    updatedAt: null,
    deletedAt: null,
    isDeleted: false,
  });

  // Function to search for supplier by name
  const findSupplierByName = (name: string): SupplierData | null => {
    if (!name.trim()) return null;

    // Find exact match first
    let supplier = MOCK_SUPPLIERS.find(
      (s) => s.name.toLowerCase() === name.toLowerCase()
    );

    // If no exact match, find partial match
    if (!supplier) {
      supplier = MOCK_SUPPLIERS.find(
        (s) =>
          s.name.toLowerCase().includes(name.toLowerCase()) ||
          name.toLowerCase().includes(s.name.toLowerCase())
      );
    }

    return supplier || null;
  };

  // Handle supplier name changes and auto-fill related fields
  const handleSupplierNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSupplierName = e.target.value;

    // Update supplier name first
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
      // Clear auto-filled fields and disable editing when supplier name is empty
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
  };

  // Update translation data when supplier name changes
  useEffect(() => {
    setTranslations([
      { id: 1, english: formData.supplierName || "", arabic: "", bangla: "" },
    ]);
  }, [formData.supplierName]);

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

  // Update the focusNextInput function to include all form elements
  const focusNextInput = (currentField: string) => {
    console.log("Current field:", currentField);
    switch (currentField) {
      case "documentNumber":
        poNumberInputRef.current?.focus();
        break;
      case "poNumber": {
        // Focus on the PO Date input
        const poDateInput = document.querySelector(
          'input[name="poDate"]'
        ) as HTMLInputElement;
        poDateInput?.focus();
        break;
      }
      case "poDate":
        supplierNameInputRef.current?.focus();
        break;
      case "supplierName": {
        // Focus on payment mode autocomplete
        const paymentModeInput = document.querySelector(
          'input[placeholder="Select payment mode..."]'
        ) as HTMLInputElement;
        paymentModeInput?.focus();
        break;
      }
      case "paymentMode": {
        // Focus on due days field
        const dueDaysInput = document.querySelector(
          'input[name="dueDays"]'
        ) as HTMLInputElement;
        dueDaysInput?.focus();
        break;
      }
      case "dueDays": {
        // Focus on payment date field
        const paymentDateInput = document.querySelector(
          'input[name="paymentDate"]'
        ) as HTMLInputElement;
        paymentDateInput?.focus();
        break;
      }
      case "paymentDate": {
        // Focus on supplier number field
        const supplierNumberInput = document.querySelector(
          'input[name="supplierNumber"]'
        ) as HTMLInputElement;
        supplierNumberInput?.focus();
        break;
      }
      case "supplierNumber": {
        // Focus on supplier status autocomplete
        const supplierStatusInput = document.querySelector(
          'input[placeholder="Select supplier status..."]'
        ) as HTMLInputElement;
        supplierStatusInput?.focus();
        break;
      }
      case "supplierStatus": {
        // Focus on supplier group field
        const supplierGroupInput = document.querySelector(
          'input[name="supplierGroup"]'
        ) as HTMLInputElement;
        supplierGroupInput?.focus();
        break;
      }
      case "supplierGroup": {
        // Focus on remarks field
        const remarksInput = document.querySelector(
          'input[name="remarks"]'
        ) as HTMLInputElement;
        remarksInput?.focus();
        break;
      }
      case "remarks": {
        // Focus on country field
        const countryInput = document.querySelector(
          'input[name="country"]'
        ) as HTMLInputElement;
        countryInput?.focus();
        break;
      }
      case "country": {
        // Focus on state field
        const stateInput = document.querySelector(
          'input[name="state"]'
        ) as HTMLInputElement;
        stateInput?.focus();
        break;
      }
      case "state": {
        // Focus on city field
        const cityInput = document.querySelector(
          'input[name="city"]'
        ) as HTMLInputElement;
        cityInput?.focus();
        break;
      }
      case "city":
        activeSwitchRef.current?.focus();
        break;
      case "active":
        draftSwitchRef.current?.focus();
        break;
      case "draft":
        deleteButtonRef.current?.focus();
        break;
      default:
        break;
    }
  };

  const getRelativeTime = (dateString: string | null | Date) => {
    if (!dateString) return "--/--/----";

    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();

    const minutes = Math.floor(diffInMs / (1000 * 60));
    const hours = Math.floor(diffInMs / (1000 * 60 * 60));
    const days = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    const months = Math.floor(diffInMs / (1000 * 60 * 60 * 24 * 30));
    const years = Math.floor(diffInMs / (1000 * 60 * 60 * 24 * 365));

    if (years > 0) {
      return `${years}y ago`;
    } else if (months > 0) {
      return `${months}mo ago`;
    } else if (days > 0) {
      return `${days}d ago`;
    } else if (hours > 0) {
      return `${hours}h ago`;
    } else if (minutes > 0) {
      return `${minutes}m ago`;
    } else {
      return "Just now";
    }
  };

  // Add this function to handle key navigation for switches and buttons
  const handleSwitchKeyDown = (
    e: React.KeyboardEvent,
    currentField: string
  ) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      // Trigger the switch/button action first
      switch (currentField) {
        case "active":
          setFormData({ ...formData, isActive: !formData.isActive });
          break;
        case "draft":
          setFormData({ ...formData, isDraft: !formData.isDraft });
          break;
        case "delete":
          setFormData({ ...formData, isDeleted: !formData.isDeleted });
          break;
      }
      // Then move to next field
      setTimeout(() => focusNextInput(currentField), 50);
    }
  };

  // Initialize with edit data if available
  useEffect(() => {
    if (isEdit && initialData) {
      setFormData({
        ...initialData,
      });
    }
  }, [isEdit, initialData]);

  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  // Handle form reset
  const handleReset = () => {
    if (window.confirm(t("form.resetConfirm"))) {
      setFormData({
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
      if (formRef.current) {
        formRef.current.reset();
      }
    }
  };

  const handlePrintOrder = (orderData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Order Details",
        data: [orderData],
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
    if (checked && formData) {
      // Small delay to allow switch animation to complete
      setTimeout(() => handlePrintOrder(formData), 100);
    }
  };

  const handlePDFSwitchChange = (pdfChecked: boolean) => {
    setPdfChecked(pdfChecked);
    if (pdfChecked) {
      // Small delay to allow switch animation to complete
      setTimeout(() => handleExportPDF(), 100);
    }
  };

  const handleExportPDF = async () => {
    console.log("Export PDF clicked");
    try {
      console.log("orderData on pdf click", formData);
      const blob = await pdf(
        <GenericPDF
          data={[formData]}
          title="Order Details"
          subtitle="Order Information"
        />
      ).toBlob();

      console.log("blob", blob);

      const url = URL.createObjectURL(blob);
      console.log("url", url);
      const a = document.createElement("a");
      a.href = url;
      a.download = "order-details.pdf";
      a.click();
      console.log("a", a);
      console.log("url", url);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error);
      toastError("Something went wrong when generating PDF");
    }
  };

  return (
    <>
      <PageLayout
        title={isEdit ? t("form.editingOrder") : t("form.creatingOrder")}
        videoSrc={video}
        videoHeader="Rapid ERP Video"
        listPath="/orders"
        popoverOptions={[
          {
            label: isEdit ? "Create" : "Edit",
            onClick: () => {
              // Handle navigation based on current state
              if (isEdit) {
                // Navigate to create page
                navigate("/orders/create");
              } else {
                // Navigate to edit page
                navigate("/orders/edit/undefined");
              }
            },
          },
          {
            label: "View",
            onClick: () => {
              navigate("/orders/view");
            },
          },
        ]}
        keepChanges={keepCreating}
        onKeepChangesChange={setKeepCreating}
        pdfChecked={pdfChecked}
        onPdfToggle={handlePDFSwitchChange}
        printEnabled={printEnabled}
        onPrintToggle={handleSwitchChange}
        additionalFooterButtons={
          <div className="flex gap-4">
            <Button
              variant="outline"
              className="gap-2 text-primary rounded-full border-primary"
              onClick={handleReset}
            >
              {t("button.reset")}
            </Button>
            <Button
              variant="outline"
              className="gap-2 text-primary rounded-full border-primary"
              onClick={() => formRef.current?.requestSubmit()}
            >
              {t("button.submit")}
            </Button>
          </div>
        }
        className="w-full"
      >
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
          {/* First Row: Document Number, P.O Number, P.O Date, Supplier Name */}
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            <div className="space-y-2">
              <h3 className="font-medium mb-1">
                Document Number <span className="text-red-500">*</span>
              </h3>
              <EditableInput
                ref={documentNumberInputRef}
                id="documentNumber"
                name="documentNumber"
                className="w-full h-10 bg-gray-100"
                value={formData.documentNumber}
                onChange={handleChange}
                onNext={() => focusNextInput("documentNumber")}
                onCancel={() => {}}
                tooltipText="Auto-generated document number"
                readOnly
              />
            </div>

            <div className="space-y-2">
              <h3 className="font-medium mb-1">P.O Number</h3>
              <EditableInput
                ref={poNumberInputRef}
                id="poNumber"
                name="poNumber"
                className="w-full h-10"
                value={formData.poNumber}
                onChange={handleChange}
                onNext={() => focusNextInput("poNumber")}
                onCancel={() => {}}
                tooltipText="Please enter purchase order number"
              />
            </div>

            <div className="space-y-2">
              <h3 className="font-medium mb-1">
                P.O Date <span className="text-red-500">*</span>
              </h3>
              <EditableInput
                id="poDate"
                name="poDate"
                type="date"
                className="w-full h-10"
                value={formData.poDate.toString()}
                onChange={handleChange}
                onNext={() => focusNextInput("poDate")}
                onCancel={() => {}}
                tooltipText="Please select purchase order date"
                required
              />
            </div>

            <div className="space-y-2 col-span-3">
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-medium">
                  Supplier Name <span className="text-red-500">*</span>
                </h3>
                <MoreVertical
                  className="h-4 w-4 cursor-pointer"
                  onClick={() => setIsOptionModalOpen(true)}
                />
              </div>
              <Autocomplete
                data={MOCK_SUPPLIERS.map((s) => s.name)}
                value={formData.supplierName}
                onChange={(value) => {
                  // Create a fake event to pass to our handler
                  const fakeEvent = {
                    target: {
                      value: value || "",
                      name: "supplierName",
                    },
                  } as React.ChangeEvent<HTMLInputElement>;
                  handleSupplierNameChange(fakeEvent);
                }}
                placeholder="Type supplier name..."
                className="w-full"
                styles={{
                  input: {
                    "&:focus": {
                      borderColor: "var(--primary)",
                    },
                    height: "40px",
                  },
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    focusNextInput("supplierName");
                  }
                }}
                limit={10}
                maxDropdownHeight={200}
              />
            </div>
          </div>

          {/* Second Row: Payment Mode, Due Days, Payment Date, Supplier Number, Supplier Status, Supplier Group */}
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            <div className="space-y-2">
              <h3 className="font-medium mb-1">Payment Mode</h3>
              <Autocomplete
                data={PAYMENT_MODES}
                value={formData.paymentMode}
                onChange={(value) => {
                  setFormData({ ...formData, paymentMode: value });
                }}
                placeholder="Select payment mode..."
                className="w-full"
                styles={{
                  input: {
                    "&:focus": {
                      borderColor: "var(--primary)",
                    },
                  },
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    focusNextInput("paymentMode");
                  }
                }}
              />
            </div>

            <div className="space-y-2">
              <h3 className="font-medium mb-1">Due Days</h3>
              <EditableInput
                id="dueDays"
                name="dueDays"
                type="number"
                className="w-full h-10"
                value={formData.dueDays.toString()}
                onChange={handleChange}
                onNext={() => focusNextInput("dueDays")}
                onCancel={() => {}}
                tooltipText="Number of days until payment is due"
              />
            </div>

            <div className="space-y-2">
              <h3 className="font-medium mb-1">Payment Date</h3>
              <EditableInput
                id="paymentDate"
                name="paymentDate"
                type="date"
                className={`w-full h-10 ${
                  isSupplierFieldsDisabled()
                    ? "bg-gray-200 cursor-not-allowed"
                    : isSupplierAutoFilled
                    ? "bg-gray-100"
                    : ""
                }`}
                value={formData.paymentDate.toString()}
                onChange={handleChange}
                onNext={() => focusNextInput("paymentDate")}
                onCancel={() => {}}
                tooltipText={
                  isSupplierFieldsDisabled()
                    ? "Select supplier first"
                    : "Payment date"
                }
                readOnly={isSupplierFieldsDisabled() || isSupplierAutoFilled}
                disabled={isSupplierFieldsDisabled()}
              />
            </div>

            <div className="space-y-2">
              <h3 className="font-medium mb-1">Supplier Number</h3>
              <EditableInput
                id="supplierNumber"
                name="supplierNumber"
                className={`w-full h-10 ${
                  isSupplierFieldsDisabled()
                    ? "bg-gray-200 cursor-not-allowed"
                    : "bg-gray-100"
                }`}
                value={formData.supplierNumber}
                onChange={handleChange}
                onNext={() => focusNextInput("supplierNumber")}
                onCancel={() => {}}
                tooltipText={
                  isSupplierFieldsDisabled()
                    ? "Select supplier first"
                    : "Supplier number"
                }
                readOnly={isSupplierFieldsDisabled() || isSupplierAutoFilled}
                disabled={isSupplierFieldsDisabled()}
              />
            </div>

            <div className="space-y-2">
              <h3 className="font-medium mb-1">Supplier Status</h3>
              {isSupplierAutoFilled || isSupplierFieldsDisabled() ? (
                <EditableInput
                  id="supplierStatus"
                  name="supplierStatus"
                  className={`w-full h-10 ${
                    isSupplierFieldsDisabled()
                      ? "bg-gray-200 cursor-not-allowed"
                      : "bg-gray-100"
                  }`}
                  value={formData.supplierStatus}
                  onChange={handleChange}
                  onNext={() => focusNextInput("supplierStatus")}
                  onCancel={() => {}}
                  tooltipText={
                    isSupplierFieldsDisabled()
                      ? "Select supplier first"
                      : "Supplier status"
                  }
                  readOnly
                  disabled={isSupplierFieldsDisabled()}
                />
              ) : (
                <Autocomplete
                  data={SUPPLIER_STATUS_OPTIONS}
                  value={formData.supplierStatus}
                  onChange={(value) => {
                    setFormData({ ...formData, supplierStatus: value || "" });
                  }}
                  placeholder="Select supplier status..."
                  className="w-full"
                  styles={{
                    input: {
                      "&:focus": {
                        borderColor: "var(--primary)",
                      },
                      height: "40px",
                    },
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      focusNextInput("supplierStatus");
                    }
                  }}
                  disabled={isSupplierFieldsDisabled()}
                />
              )}
            </div>

            <div className="space-y-2">
              <h3 className="font-medium mb-1">Supplier Group</h3>
              <EditableInput
                id="supplierGroup"
                name="supplierGroup"
                className={`w-full h-10 ${
                  isSupplierFieldsDisabled()
                    ? "bg-gray-200 cursor-not-allowed"
                    : isSupplierAutoFilled
                    ? "bg-gray-100"
                    : ""
                }`}
                value={formData.supplierGroup}
                onChange={handleChange}
                onNext={() => focusNextInput("supplierGroup")}
                onCancel={() => {}}
                tooltipText={
                  isSupplierFieldsDisabled()
                    ? "Select supplier first"
                    : "Supplier group"
                }
                readOnly={isSupplierFieldsDisabled() || isSupplierAutoFilled}
                disabled={isSupplierFieldsDisabled()}
              />
            </div>
          </div>

          {/* Third Row: Remarks */}
          <div className="grid grid-cols-6 gap-4">
            <div className="space-y-2 col-span-3">
              <h3 className="font-medium mb-1">Remarks</h3>
              <EditableInput
                id="remarks"
                name="remarks"
                className="w-full h-10"
                value={formData.remarks}
                onChange={handleChange}
                onNext={() => focusNextInput("remarks")}
                onCancel={() => {}}
                tooltipText="Additional remarks or notes"
              />
            </div>

            <div className="space-y-2">
              <h3 className="font-medium mb-1">Country</h3>
              <EditableInput
                id="country"
                name="country"
                className={`w-full h-10 ${
                  isSupplierFieldsDisabled()
                    ? "bg-gray-200 cursor-not-allowed"
                    : isSupplierAutoFilled
                    ? "bg-gray-100"
                    : ""
                }`}
                value={formData.country}
                onChange={handleChange}
                onNext={() => focusNextInput("country")}
                onCancel={() => {}}
                tooltipText={
                  isSupplierFieldsDisabled()
                    ? "Select supplier first"
                    : "Country"
                }
                readOnly={isSupplierFieldsDisabled() || isSupplierAutoFilled}
                disabled={isSupplierFieldsDisabled()}
              />
            </div>

            <div className="space-y-2">
              <h3 className="font-medium mb-1">State</h3>
              <EditableInput
                id="state"
                name="state"
                className={`w-full h-10 ${
                  isSupplierFieldsDisabled()
                    ? "bg-gray-200 cursor-not-allowed"
                    : isSupplierAutoFilled
                    ? "bg-gray-100"
                    : ""
                }`}
                value={formData.state}
                onChange={handleChange}
                onNext={() => focusNextInput("state")}
                onCancel={() => {}}
                tooltipText={
                  isSupplierFieldsDisabled() ? "Select supplier first" : "State"
                }
                readOnly={isSupplierFieldsDisabled() || isSupplierAutoFilled}
                disabled={isSupplierFieldsDisabled()}
              />
            </div>

            <div className="space-y-2">
              <h3 className="font-medium mb-1">City</h3>
              <EditableInput
                id="city"
                name="city"
                className={`w-full h-10 ${
                  isSupplierFieldsDisabled()
                    ? "bg-gray-200 cursor-not-allowed"
                    : isSupplierAutoFilled
                    ? "bg-gray-100"
                    : ""
                }`}
                value={formData.city}
                onChange={handleChange}
                onNext={() => focusNextInput("city")}
                onCancel={() => {}}
                tooltipText={
                  isSupplierFieldsDisabled() ? "Select supplier first" : "City"
                }
                readOnly={isSupplierFieldsDisabled() || isSupplierAutoFilled}
                disabled={isSupplierFieldsDisabled()}
              />
            </div>
          </div>

          {/* Fourth Row: Active, Draft, Delete */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
            <div className="space-y-2">
              <h3 className="font-medium mb-1">{t("common.active")}</h3>
              <div className="h-10 flex items-center">
                <Switch
                  ref={activeSwitchRef}
                  id="isActive"
                  name="isActive"
                  className=""
                  checked={formData.isActive}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, isActive: checked })
                  }
                  onKeyDown={(e) => handleSwitchKeyDown(e, "active")}
                />
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium mb-1">{t("common.draft")}</h3>
              <div className="h-10 flex items-center">
                <Switch
                  ref={draftSwitchRef}
                  id="isDraft"
                  name="isDraft"
                  className=""
                  checked={formData.isDraft}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, isDraft: checked })
                  }
                  onKeyDown={(e) => handleSwitchKeyDown(e, "draft")}
                />
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium mb-1">
                {formData.isDeleted ? t("button.restore") : t("button.delete")}
              </h3>
              <div className="h-10 flex items-center">
                <Button
                  ref={deleteButtonRef}
                  variant="ghost"
                  size="icon"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      isDeleted: !formData.isDeleted,
                    })
                  }
                  onKeyDown={(e) => handleSwitchKeyDown(e, "delete")}
                >
                  {formData.isDeleted ? (
                    <Undo2 className="text-green-500" />
                  ) : (
                    <Trash2 className="text-red-500" />
                  )}
                </Button>
              </div>
            </div>
          </div>

          {/* Sixth Row: Dates */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <h3 className="font-medium mb-1">Created</h3>
              <p>{getRelativeTime(formData.createdAt)}</p>
            </div>
            <div>
              <h3 className="font-medium mb-1">Updated</h3>
              <p>{getRelativeTime(formData.updatedAt)}</p>
            </div>
            <div>
              <h3 className="font-medium mb-1">Drafted</h3>
              <p>{getRelativeTime(formData.draftedAt)}</p>
            </div>
            <div>
              <h3 className="font-medium mb-1">Deleted</h3>
              <p>{getRelativeTime(formData.deletedAt)}</p>
            </div>
          </div>

          {/* Edit Dynamic Input Table */}
          <DynamicInputTableList isEdit={isEdit} />
        </form>
      </PageLayout>

      {/* Language Translator Modal */}
      <LanguageTranslatorModal
        isOpen={isOptionModalOpen}
        onClose={() => setIsOptionModalOpen(false)}
        title="Order Language Translator"
        initialData={translations}
        onSave={(data) => {
          setTranslations(data);
          console.log("Order translations saved:", data);
        }}
      />
    </>
  );
}
