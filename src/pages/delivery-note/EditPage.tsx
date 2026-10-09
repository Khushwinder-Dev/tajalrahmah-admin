/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Trash2, Undo2, MoreVertical, CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import EditableInput, {
  type EditableInputRef,
} from "@/components/common/EditableInput";
import { Autocomplete } from "@mantine/core";
import video from "@/assets/videos/test.mp4";
import GenericPDF from "@/components/common/pdf";
import { printHtmlContent } from "@/lib/printHtmlContent";
import { toastError, toastSuccess } from "@/lib/toast";
import { pdf } from "@react-pdf/renderer";
import PageLayout from "@/components/common/PageLayout";
import LanguageTranslatorModal from "@/components/common/LanguageTranslatorModel";
import { useNavigate, useParams } from "react-router-dom";
import { PrintCommonLayout } from "@/lib/printContents/PrintCommonLayout";
import DynamicInputTableList from "./dynamic-input-table/DynamicInputTableList";

// Define DeliveryNote interface
interface DeliveryNote {
  id: string;
  deliveryNo: string;
  branch: string;
  deliveryDate: Date | string;
  customerName: string;
  salesmen: string;
  customerReference: string;
  quotationNumber: string;
  email: string;
  address: string;
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

// Mock customer data
const MOCK_CUSTOMERS = [
  "ABC Corporation",
  "XYZ Ltd",
  "Global Industries",
  "Tech Solutions Inc",
  "Metro Supplies",
  "Prime Logistics",
  "Urban Enterprises",
  "Retail Partners Co",
  "Express Trading",
  "Coastal Imports",
  "Mountain View Corp",
  "Lakefront Industries",
  "Green Valley Co",
  "Plaza Retailers",
  "Metropolitan Goods",
  "Corporate Solutions",
  "Sky Logistics",
  "Shopping Center Inc",
  "Port Authority",
  "Manufacturing Corp",
];

// Mock salesmen data
const MOCK_SALESMEN = [
  "John Smith",
  "Sarah Johnson",
  "Mike Davis",
  "Emily Wilson",
  "David Brown",
  "Lisa Garcia",
  "Robert Lee",
  "Amanda Taylor",
  "Kevin White",
  "Jennifer Chen",
  "Thomas Anderson",
  "Michelle Rodriguez",
  "James Wilson",
  "Maria Gonzalez",
  "Christopher Lee",
  "Patricia Martinez",
  "Daniel Kim",
  "Rachel Thompson",
  "Brian Clark",
  "Nicole Johnson",
];

// Mock delivery note data for selection
const MOCK_DELIVERY_NOTES: DeliveryNote[] = [
  {
    id: "1",
    deliveryNo: "DN001",
    branch: "Main Branch",
    deliveryDate: new Date("2024-01-15"),
    customerName: "ABC Corporation",
    salesmen: "John Smith",
    customerReference: "PO-2024-001",
    quotationNumber: "QT001",
    email: "contact@abccorp.com",
    address: "123 Business Ave, Downtown, NY 10001",
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
  {
    id: "2",
    deliveryNo: "DN002",
    branch: "North Branch",
    deliveryDate: new Date("2024-01-16"),
    customerName: "XYZ Ltd",
    salesmen: "Sarah Johnson",
    customerReference: "REF-XYZ-456",
    quotationNumber: "QT002",
    email: "orders@xyzltd.com",
    address: "456 Industrial Blvd, North City, CA 90210",
    amount: 8750.25,
    isActive: true,
    isDefault: true,
    isDraft: false,
    createdAt: new Date("2024-01-16T09:15:00Z"),
    draftedAt: null,
    updatedAt: new Date("2024-01-21T16:30:00Z"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "3",
    deliveryNo: "DN003",
    branch: "South Branch",
    deliveryDate: new Date("2024-01-17"),
    customerName: "Global Industries",
    salesmen: "Mike Davis",
    customerReference: "ORD-2024-789",
    quotationNumber: "QT003",
    email: "procurement@globalind.com",
    address: "789 Corporate Plaza, South District, TX 75001",
    amount: 12300.75,
    isActive: true,
    isDefault: false,
    isDraft: true,
    createdAt: new Date("2024-01-17T11:45:00Z"),
    draftedAt: new Date("2024-01-17T11:45:00Z"),
    updatedAt: new Date("2024-01-22T13:20:00Z"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "4",
    deliveryNo: "DN004",
    branch: "East Branch",
    deliveryDate: new Date("2024-01-18"),
    customerName: "Tech Solutions Inc",
    salesmen: "Emily Wilson",
    customerReference: "PUR-2024-012",
    quotationNumber: "QT004",
    email: "orders@techsolutions.com",
    address: "321 Innovation Drive, East Valley, FL 33101",
    amount: 9850.0,
    isActive: false,
    isDefault: false,
    isDraft: false,
    createdAt: new Date("2024-01-18T14:20:00Z"),
    draftedAt: null,
    updatedAt: new Date("2024-01-23T10:15:00Z"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "5",
    deliveryNo: "DN005",
    branch: "West Branch",
    deliveryDate: new Date("2024-01-19"),
    customerName: "Metro Supplies",
    salesmen: "David Brown",
    customerReference: "MS-2024-345",
    quotationNumber: "QT005",
    email: "purchasing@metrosupplies.com",
    address: "555 Commerce Street, West Town, WA 98001",
    amount: 16750.3,
    isActive: true,
    isDefault: false,
    isDraft: false,
    createdAt: new Date("2024-01-19T08:30:00Z"),
    draftedAt: null,
    updatedAt: new Date("2024-01-24T15:45:00Z"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "6",
    deliveryNo: "DN006",
    branch: "Central Branch",
    deliveryDate: new Date("2024-01-20"),
    customerName: "Prime Logistics",
    salesmen: "Lisa Garcia",
    customerReference: "PL-REF-678",
    quotationNumber: "QT006",
    email: "logistics@primelogistics.com",
    address: "888 Distribution Center, Central City, IL 60601",
    amount: 22100.45,
    isActive: true,
    isDefault: false,
    isDraft: false,
    createdAt: new Date("2024-01-20T12:00:00Z"),
    draftedAt: null,
    updatedAt: new Date("2024-01-25T09:30:00Z"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "7",
    deliveryNo: "DN007",
    branch: "Downtown Branch",
    deliveryDate: new Date("2024-01-21"),
    customerName: "Urban Enterprises",
    salesmen: "Robert Lee",
    customerReference: "UE-ORDER-901",
    quotationNumber: "QT007",
    email: "orders@urbanenterprises.com",
    address: "999 Urban Plaza, Downtown District, NY 10002",
    amount: 7890.6,
    isActive: true,
    isDefault: false,
    isDraft: true,
    createdAt: new Date("2024-01-21T16:15:00Z"),
    draftedAt: new Date("2024-01-21T16:15:00Z"),
    updatedAt: new Date("2024-01-26T11:40:00Z"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "8",
    deliveryNo: "DN008",
    branch: "Suburban Branch",
    deliveryDate: new Date("2024-01-22"),
    customerName: "Retail Partners Co",
    salesmen: "Amanda Taylor",
    customerReference: "RP-2024-234",
    quotationNumber: "QT008",
    email: "retail@retailpartners.com",
    address: "111 Suburban Mall, Suburban Area, NJ 07001",
    amount: 13450.8,
    isActive: true,
    isDefault: false,
    isDraft: false,
    createdAt: new Date("2024-01-22T13:45:00Z"),
    draftedAt: null,
    updatedAt: new Date("2024-01-27T14:20:00Z"),
    deletedAt: null,
    isDeleted: false,
  },
];

type Props = {
  isEdit?: boolean;
};

export default function DeliveryNoteEditPage({ isEdit = false }: Props) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [keepChanges, setKeepChanges] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);

  const customerReferenceInputRef = useRef<EditableInputRef>(null);
  const quotationInputRef = useRef<EditableInputRef>(null);
  const emailInputRef = useRef<EditableInputRef>(null);
  const addressInputRef = useRef<EditableInputRef>(null);
  const activeSwitchRef = useRef<HTMLButtonElement>(null);
  const defaultSwitchRef = useRef<HTMLButtonElement>(null);
  const draftSwitchRef = useRef<HTMLButtonElement>(null);
  const deleteButtonRef = useRef<HTMLButtonElement>(null);
  const [printEnabled, setPrintEnabled] = useState(false);
  const [pdfChecked, setPdfChecked] = useState(false);

  // Date picker state
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  // Translation state
  const [translations, setTranslations] = useState([
    { id: 1, english: "", arabic: "", bangla: "" },
  ]);

  // Form state - Initialize with default values
  const [formData, setFormData] = useState<DeliveryNote>({
    id: "",
    deliveryNo: "",
    branch: "",
    deliveryDate: new Date(),
    customerName: "",
    salesmen: "",
    customerReference: "",
    quotationNumber: "",
    email: "",
    address: "",
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

  // Loading state
  const [isLoading, setIsLoading] = useState(true);

  // Delivery number options for autocomplete
  const deliveryNumberOptions = MOCK_DELIVERY_NOTES.map((delivery) => ({
    value: delivery.deliveryNo,
    label: `${delivery.deliveryNo} - ${delivery.customerName}`,
  }));

  // Function to find and load delivery note data
  const loadDeliveryNoteData = (deliveryNo: string) => {
    const deliveryData = MOCK_DELIVERY_NOTES.find(
      (delivery) => delivery.deliveryNo === deliveryNo
    );

    if (deliveryData) {
      setFormData({
        ...deliveryData,
        updatedAt: new Date(), // Update the timestamp
      });
      toastSuccess(`Loaded data for ${deliveryNo}`);
    } else {
      toastError(`Delivery note ${deliveryNo} not found`);
    }
  };

  // Handle delivery number selection
  const handleDeliveryNumberChange = (value: string | null) => {
    if (value) {
      const deliveryNo = value.split(" - ")[0]; // Extract delivery number from "DN001 - ABC Corporation"
      setFormData((prev) => ({ ...prev, deliveryNo }));
      loadDeliveryNoteData(deliveryNo);
    }
  };

  // Initialize data on component mount
  useEffect(() => {
    setIsLoading(true);

    // If ID is provided in URL, load that specific record
    if (id && id !== "undefined") {
      const deliveryData = MOCK_DELIVERY_NOTES.find(
        (delivery) => delivery.id === id
      );
      if (deliveryData) {
        setFormData(deliveryData);
      } else {
        // If ID not found, load the first record as default
        setFormData(MOCK_DELIVERY_NOTES[0]);
      }
    } else {
      // Load the first record as default for editing
      setFormData(MOCK_DELIVERY_NOTES[0]);
    }

    setIsLoading(false);
  }, [id]);

  // Update translation data when address changes
  useEffect(() => {
    setTranslations([
      { id: 1, english: formData.address || "", arabic: "", bangla: "" },
    ]);
  }, [formData.address]);

  // Update the focusNextInput function
  const focusNextInput = (currentField: string) => {
    console.log("Current field:", currentField);
    switch (currentField) {
      case "deliveryNo": {
        // Focus on branch dropdown
        const branchInput = document.querySelector(
          'input[placeholder="Select branch..."]'
        ) as HTMLInputElement;
        branchInput?.focus();
        break;
      }
      case "branch": {
        // Focus on delivery date picker trigger
        const datePickerTrigger = document.querySelector(
          '[data-testid="date-picker-trigger"]'
        ) as HTMLButtonElement;
        datePickerTrigger?.focus();
        break;
      }
      case "deliveryDate": {
        // Focus on customer name dropdown
        const customerInput = document.querySelector(
          'input[placeholder="Select customer..."]'
        ) as HTMLInputElement;
        customerInput?.focus();
        break;
      }
      case "customerName": {
        // Focus on salesmen dropdown
        const salesmenInput = document.querySelector(
          'input[placeholder="Select salesmen..."]'
        ) as HTMLInputElement;
        salesmenInput?.focus();
        break;
      }
      case "salesmen":
        customerReferenceInputRef.current?.focus();
        break;
      case "customerReference":
        quotationInputRef.current?.focus();
        break;
      case "quotation":
        emailInputRef.current?.focus();
        break;
      case "email":
        addressInputRef.current?.focus();
        break;
      case "address":
        activeSwitchRef.current?.focus();
        break;
      case "active":
        defaultSwitchRef.current?.focus();
        break;
      case "default":
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

  // Handle key navigation for switches and buttons
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
        case "default":
          setFormData({ ...formData, isDefault: !formData.isDefault });
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

  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
      updatedAt: new Date(), // Update timestamp on any change
    });
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Delivery Note Edit Form submitted:", formData);
    toastSuccess("Delivery note updated successfully!");
  };

  // Handle form reset
  const handleReset = () => {
    if (window.confirm(t("form.resetConfirm"))) {
      // Reset to original loaded data
      const originalData = MOCK_DELIVERY_NOTES.find(
        (delivery) => delivery.deliveryNo === formData.deliveryNo
      );
      if (originalData) {
        setFormData(originalData);
        toastSuccess("Form reset to original values");
      }
    }
  };

  const handlePrintDeliveryNote = (deliveryData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Delivery Note Details",
        data: [deliveryData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          deliveryNo: "Delivery Number",
          branch: "Branch",
          deliveryDate: "Delivery Date",
          customerName: "Customer Name",
          salesmen: "Salesmen",
          customerReference: "Customer Reference",
          quotationNumber: "Quotation Number",
          email: "Email",
          address: "Address",
          amount: "Amount",
          isActive: "Active Status",
          isDefault: "Default Status",
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
      setTimeout(() => handlePrintDeliveryNote(formData), 100);
    }
  };

  const handlePDFSwitchChange = (pdfChecked: boolean) => {
    setPdfChecked(pdfChecked);
    if (pdfChecked) {
      setTimeout(() => handleExportPDF(), 100);
    }
  };

  const handleExportPDF = async () => {
    console.log("Export PDF clicked");
    try {
      const blob = await pdf(
        <GenericPDF
          data={[formData]}
          title="Delivery Note Details"
          subtitle="Delivery Note Information"
        />
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `delivery-note-${formData.deliveryNo}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error);
      toastError("Something went wrong when generating PDF");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading delivery note data...</div>
      </div>
    );
  }

  return (
    <>
      <PageLayout
        title={t("form.editingDeliveryNote")}
        videoSrc={video}
        videoHeader="Rapid ERP Video"
        listPath="/delivery-notes"
        popoverOptions={[
          {
            label: "Create",
            onClick: () => navigate("/delivery-notes/create"),
          },
          {
            label: "View",
            onClick: () => navigate(`/delivery-notes/${formData.id}`),
          },
        ]}
        keepChanges={keepChanges}
        onKeepChangesChange={setKeepChanges}
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
              {t("button.update")}
            </Button>
          </div>
        }
        className="w-full"
      >
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
          {/* First Row: Delivery No, Branch, Delivery Date, Customer Name, Salesmen */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="space-y-2">
              <h3 className="font-medium mb-1">
                {t("common.deliveryNo")} <span className="text-red-500">*</span>
              </h3>
              <Autocomplete
                data={deliveryNumberOptions}
                value={
                  formData.deliveryNo
                    ? `${formData.deliveryNo} - ${formData.customerName}`
                    : ""
                }
                onChange={handleDeliveryNumberChange}
                placeholder="Select delivery number..."
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
                    focusNextInput("deliveryNo");
                  }
                }}
                limit={10}
                maxDropdownHeight={200}
                required
              />
            </div>

            <div className="space-y-2">
              <h3 className="font-medium mb-1">
                {t("common.branch")} <span className="text-red-500">*</span>
              </h3>
              <Autocomplete
                data={MOCK_BRANCHES}
                value={formData.branch}
                onChange={(value) => {
                  setFormData({
                    ...formData,
                    branch: value || "",
                    updatedAt: new Date(),
                  });
                }}
                placeholder="Select branch..."
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
                    focusNextInput("branch");
                  }
                }}
                limit={10}
                maxDropdownHeight={200}
                required
              />
            </div>

            <div className="space-y-2">
              <h3 className="font-medium mb-1">
                {t("common.deliveryDate")}{" "}
                <span className="text-red-500">*</span>
              </h3>
              <Popover
                open={isDatePickerOpen}
                onOpenChange={setIsDatePickerOpen}
              >
                <PopoverTrigger asChild>
                  <Button
                    data-testid="date-picker-trigger"
                    variant="outline"
                    className={cn(
                      "w-full h-10 justify-start text-left font-normal",
                      !formData.deliveryDate && "text-muted-foreground"
                    )}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        focusNextInput("deliveryDate");
                      }
                    }}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.deliveryDate ? (
                      format(new Date(formData.deliveryDate), "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={
                      formData.deliveryDate
                        ? new Date(formData.deliveryDate)
                        : undefined
                    }
                    onSelect={(date) => {
                      setFormData({
                        ...formData,
                        deliveryDate: date || new Date(),
                        updatedAt: new Date(),
                      });
                      setIsDatePickerOpen(false);
                      focusNextInput("deliveryDate");
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium mb-1">
                {t("common.customerName")}{" "}
                <span className="text-red-500">*</span>
              </h3>
              <Autocomplete
                data={MOCK_CUSTOMERS}
                value={formData.customerName}
                onChange={(value) => {
                  setFormData({
                    ...formData,
                    customerName: value || "",
                    updatedAt: new Date(),
                  });
                }}
                placeholder="Select customer..."
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
                    focusNextInput("customerName");
                  }
                }}
                limit={10}
                maxDropdownHeight={200}
                required
              />
            </div>

            <div className="space-y-2">
              <h3 className="font-medium mb-1">
                {t("form.salesmen")} <span className="text-red-500">*</span>
              </h3>
              <Autocomplete
                data={MOCK_SALESMEN}
                value={formData.salesmen}
                onChange={(value) => {
                  setFormData({
                    ...formData,
                    salesmen: value || "",
                    updatedAt: new Date(),
                  });
                }}
                placeholder="Select salesmen..."
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
                    focusNextInput("salesmen");
                  }
                }}
                limit={10}
                maxDropdownHeight={200}
                required
              />
            </div>
          </div>

          {/* Second Row: Customer Reference, Quotation Number, Email, Address */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <h3 className="font-medium mb-1">
                {t("form.customerReference")}
              </h3>
              <EditableInput
                ref={customerReferenceInputRef}
                id="customerReference"
                name="customerReference"
                className="w-full h-10"
                value={formData.customerReference}
                onChange={handleChange}
                onNext={() => focusNextInput("customerReference")}
                onCancel={() => {}}
                tooltipText="Customer reference number"
              />
            </div>

            <div className="space-y-2">
              <h3 className="font-medium mb-1">
                {t("common.quotationNumber")}{" "}
                <span className="text-red-500">*</span>
              </h3>
              <EditableInput
                ref={quotationInputRef}
                id="quotationNumber"
                name="quotationNumber"
                className="w-full h-10"
                value={formData.quotationNumber}
                onChange={handleChange}
                onNext={() => focusNextInput("quotation")}
                onCancel={() => {}}
                tooltipText="Quotation number"
                required
              />
            </div>

            <div className="space-y-2">
              <h3 className="font-medium mb-1">{t("common.email")}</h3>
              <EditableInput
                ref={emailInputRef}
                id="email"
                name="email"
                type="email"
                className="w-full h-10"
                value={formData.email}
                onChange={handleChange}
                onNext={() => focusNextInput("email")}
                onCancel={() => {}}
                tooltipText="Customer email address"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-medium">{t("common.address")}</h3>
                <MoreVertical
                  className="h-4 w-4 cursor-pointer"
                  onClick={() => setIsOptionModalOpen(true)}
                />
              </div>
              <EditableInput
                ref={addressInputRef}
                id="address"
                name="address"
                className="w-full h-10"
                value={formData.address}
                onChange={handleChange}
                onNext={() => focusNextInput("address")}
                onCancel={() => {}}
                tooltipText="Customer address"
              />
            </div>
          </div>

          {/* Third Row: Status Switches */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
            <div className="space-y-2">
              <h3 className="font-medium mb-1">{t("common.active")}</h3>
              <div className="h-10 flex items-center">
                <Switch
                  ref={activeSwitchRef}
                  id="isActive"
                  name="isActive"
                  checked={formData.isActive}
                  onCheckedChange={(checked) =>
                    setFormData({
                      ...formData,
                      isActive: checked,
                      updatedAt: new Date(),
                    })
                  }
                  onKeyDown={(e) => handleSwitchKeyDown(e, "active")}
                />
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium mb-1">{t("common.default")}</h3>
              <div className="h-10 flex items-center">
                <Switch
                  ref={defaultSwitchRef}
                  id="isDefault"
                  name="isDefault"
                  checked={formData.isDefault}
                  onCheckedChange={(checked) =>
                    setFormData({
                      ...formData,
                      isDefault: checked,
                      updatedAt: new Date(),
                    })
                  }
                  onKeyDown={(e) => handleSwitchKeyDown(e, "default")}
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
                  checked={formData.isDraft}
                  onCheckedChange={(checked) =>
                    setFormData({
                      ...formData,
                      isDraft: checked,
                      updatedAt: new Date(),
                    })
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
                      updatedAt: new Date(),
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

          {/* Fourth Row: Timestamps */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <h3 className="font-medium mb-1">{t("common.created")}</h3>
              <p className="text-gray-500 text-sm">
                {getRelativeTime(formData.createdAt)}
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-1">{t("common.updated")}</h3>
              <p className="text-gray-500 text-sm font-semibold">
                {getRelativeTime(formData.updatedAt)}
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-1">{t("common.drafted")}</h3>
              <p className="text-gray-500 text-sm">
                {getRelativeTime(formData.draftedAt)}
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-1">{t("common.deleted")}</h3>
              <p className="text-gray-500 text-sm">
                {getRelativeTime(formData.deletedAt)}
              </p>
            </div>
          </div>

          {/* Dynamic Input Table */}
          <DynamicInputTableList isEdit={isEdit} />
        </form>
      </PageLayout>

      {/* Language Translator Modal */}
      <LanguageTranslatorModal
        isOpen={isOptionModalOpen}
        onClose={() => setIsOptionModalOpen(false)}
        title="Delivery Note Language Translator"
        initialData={translations}
        onSave={(data) => {
          setTranslations(data);
          console.log("Delivery Note translations saved:", data);
        }}
      />
    </>
  );
}
