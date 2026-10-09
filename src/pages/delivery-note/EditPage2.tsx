/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  Trash2,
  Undo2,
  MoreVertical,
  CalendarIcon,
  MapPin,
  ChevronUp,
} from "lucide-react";
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
import AddressModal from "./AddressModal";

// Define DeliveryNote interface
interface DeliveryNote {
  id: string;
  branch: string;
  deliveryNo: number;
  deliveryDate: Date | string;
  customerName: string;
  salesmen: string;
  customerReference: string;
  quotationNumber: string;
  email: string;
  address: string;
  isActive: boolean;
  isDraft: boolean;
  createdAt: Date | null;
  draftedAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;
  isDeleted: boolean;
  isDefault: boolean;
}

// Define Customer interface
interface Customer {
  id: string;
  name: string;
  email: string;
  address: string;
  phone: string;
  company: string;
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

// Mock existing customers data
const MOCK_CUSTOMERS: Customer[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@example.com",
    address: "123 Main Street, New York, NY 10001",
    phone: "+1 (555) 123-4567",
    company: "Smith Industries",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah.johnson@techcorp.com",
    address: "456 Tech Avenue, San Francisco, CA 94102",
    phone: "+1 (555) 987-6543",
    company: "TechCorp Solutions",
  },
  {
    id: "3",
    name: "Michael Brown",
    email: "m.brown@globalltd.com",
    address: "789 Business Boulevard, Chicago, IL 60601",
    phone: "+1 (555) 456-7890",
    company: "Global Trading Ltd",
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily.davis@innovate.io",
    address: "321 Innovation Drive, Austin, TX 73301",
    phone: "+1 (555) 321-0987",
    company: "Innovate Solutions",
  },
  {
    id: "5",
    name: "Robert Wilson",
    email: "robert.wilson@manufacturing.com",
    address: "654 Industrial Park, Detroit, MI 48201",
    phone: "+1 (555) 654-3210",
    company: "Wilson Manufacturing",
  },
];

// Mock delivery note data for selection
const MOCK_DELIVERY_NOTES: DeliveryNote[] = [
  {
    id: "1",
    branch: "Main Branch",
    deliveryNo: 1001,
    deliveryDate: new Date("2024-01-15"),
    customerName: "ABC Corporation",
    salesmen: "John Smith",
    customerReference: "PO-2024-001",
    quotationNumber: "QT001",
    email: "contact@abccorp.com",
    address: "123 Business Ave, Downtown, NY 10001",
    isActive: true,
    isDraft: false,
    createdAt: new Date("2024-01-15T10:30:00Z"),
    draftedAt: null,
    updatedAt: new Date("2024-01-20T14:45:00Z"),
    deletedAt: null,
    isDeleted: false,
    isDefault: false,
  },
  {
    id: "2",
    branch: "North Branch",
    deliveryNo: 1002,
    deliveryDate: new Date("2024-01-16"),
    customerName: "XYZ Ltd",
    salesmen: "Sarah Johnson",
    customerReference: "REF-XYZ-456",
    quotationNumber: "QT002",
    email: "orders@xyzltd.com",
    address: "456 Industrial Blvd, North City, CA 90210",
    isActive: true,
    isDraft: false,
    createdAt: new Date("2024-01-16T09:15:00Z"),
    draftedAt: null,
    updatedAt: new Date("2024-01-21T16:30:00Z"),
    deletedAt: null,
    isDeleted: false,
    isDefault: true,
  },
  {
    id: "3",
    branch: "South Branch",
    deliveryNo: 1003,
    deliveryDate: new Date("2024-01-17"),
    customerName: "Global Industries",
    salesmen: "Mike Davis",
    customerReference: "ORD-2024-789",
    quotationNumber: "QT003",
    email: "procurement@globalind.com",
    address: "789 Corporate Plaza, South District, TX 75001",
    isActive: true,
    isDraft: true,
    createdAt: new Date("2024-01-17T11:45:00Z"),
    draftedAt: new Date("2024-01-17T11:45:00Z"),
    updatedAt: new Date("2024-01-22T13:20:00Z"),
    deletedAt: null,
    isDeleted: false,
    isDefault: false,
  },
  {
    id: "4",
    branch: "East Branch",
    deliveryNo: 1004,
    deliveryDate: new Date("2024-01-18"),
    customerName: "Tech Solutions Inc",
    salesmen: "Emily Wilson",
    customerReference: "PUR-2024-012",
    quotationNumber: "QT004",
    email: "orders@techsolutions.com",
    address: "321 Innovation Drive, East Valley, FL 33101",
    isActive: false,
    isDraft: false,
    createdAt: new Date("2024-01-18T14:20:00Z"),
    draftedAt: null,
    updatedAt: new Date("2024-01-23T10:15:00Z"),
    deletedAt: null,
    isDeleted: false,
    isDefault: false,
  },
  {
    id: "5",
    branch: "West Branch",
    deliveryNo: 1005,
    deliveryDate: new Date("2024-01-19"),
    customerName: "Metro Supplies",
    salesmen: "David Brown",
    customerReference: "MS-2024-345",
    quotationNumber: "QT005",
    email: "purchasing@metrosupplies.com",
    address: "555 Commerce Street, West Town, WA 98001",
    isActive: true,
    isDraft: false,
    createdAt: new Date("2024-01-19T08:30:00Z"),
    draftedAt: null,
    updatedAt: new Date("2024-01-24T15:45:00Z"),
    deletedAt: null,
    isDeleted: false,
    isDefault: false,
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
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

  const customerNameInputRef = useRef<EditableInputRef>(null);
  const salesmenInputRef = useRef<EditableInputRef>(null);
  const customerRefInputRef = useRef<EditableInputRef>(null);
  const quotationInputRef = useRef<EditableInputRef>(null);
  const emailInputRef = useRef<EditableInputRef>(null);
  const activeSwitchRef = useRef<HTMLButtonElement>(null);
  const draftSwitchRef = useRef<HTMLButtonElement>(null);
  const deleteButtonRef = useRef<HTMLButtonElement>(null);
  const defaultSwitchRef = useRef<HTMLButtonElement>(null);
  const [printEnabled, setPrintEnabled] = useState(false);
  const [pdfChecked, setPdfChecked] = useState(false);

  // Date picker state
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  // Loading state
  const [isLoading, setIsLoading] = useState(true);

  // Translation state
  const [translations, setTranslations] = useState([
    { id: 1, english: "", arabic: "", bangla: "" },
  ]);

  // Form state
  const [formData, setFormData] = useState<DeliveryNote>({
    id: "",
    branch: "",
    deliveryNo: 0,
    deliveryDate: new Date(),
    customerName: "",
    salesmen: "",
    customerReference: "",
    quotationNumber: "",
    email: "",
    address: "",
    isActive: true,
    isDraft: false,
    createdAt: new Date(),
    draftedAt: null,
    updatedAt: new Date(),
    deletedAt: null,
    isDeleted: false,
    isDefault: false,
  });

  // Delivery number options for autocomplete
  const deliveryNumberOptions = MOCK_DELIVERY_NOTES.map((delivery) => ({
    value: delivery.deliveryNo.toString(),
    label: `${delivery.deliveryNo} - ${delivery.customerName}`,
  }));

  // Function to find and load delivery note data
  const loadDeliveryNoteData = (deliveryNo: number) => {
    const deliveryData = MOCK_DELIVERY_NOTES.find(
      (delivery) => delivery.deliveryNo === deliveryNo
    );

    if (deliveryData) {
      setFormData({
        ...deliveryData,
        updatedAt: new Date(), // Update the timestamp
      });
      toastSuccess(`Loaded data for delivery note ${deliveryNo}`);
    } else {
      toastError(`Delivery note ${deliveryNo} not found`);
    }
  };

  // Handle delivery number selection
  const handleDeliveryNumberChange = (value: string | null) => {
    if (value) {
      const deliveryNo = parseInt(value.split(" - ")[0]); // Extract delivery number from "1001 - ABC Corporation"
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

  // Update translation data when customer reference changes
  useEffect(() => {
    setTranslations([
      {
        id: 1,
        english: formData.customerReference || "",
        arabic: "",
        bangla: "",
      },
    ]);
  }, [formData.customerReference]);

  // Handle address update from modal
  const handleAddressUpdate = (newAddress: string) => {
    setFormData((prev) => ({
      ...prev,
      address: newAddress,
      updatedAt: new Date(),
    }));
    toastSuccess("Address updated successfully");
  };

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
      case "deliveryDate":
        customerNameInputRef.current?.focus();
        break;
      case "customerName":
        salesmenInputRef.current?.focus();
        break;
      case "salesmen":
        customerRefInputRef.current?.focus();
        break;
      case "customerReference":
        quotationInputRef.current?.focus();
        break;
      case "quotationNumber":
        emailInputRef.current?.focus();
        break;
      case "email":
        activeSwitchRef.current?.focus();
        break;
      case "active":
        draftSwitchRef.current?.focus();
        break;
      case "draft":
        deleteButtonRef.current?.focus();
        break;
      case "delete":
        defaultSwitchRef.current?.focus();
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
      switch (currentField) {
        case "active":
          setFormData({
            ...formData,
            isActive: !formData.isActive,
            updatedAt: new Date(),
          });
          break;
        case "draft":
          setFormData({
            ...formData,
            isDraft: !formData.isDraft,
            updatedAt: new Date(),
          });
          break;
        case "delete":
          setFormData({
            ...formData,
            isDeleted: !formData.isDeleted,
            updatedAt: new Date(),
          });
          break;
        case "default":
          setFormData({
            ...formData,
            isDefault: !formData.isDefault,
            updatedAt: new Date(),
          });
          break;
      }
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
          branch: "Branch",
          deliveryNo: "Delivery Number",
          deliveryDate: "Delivery Date",
          customerName: "Customer Name",
          salesmen: "Salesmen",
          customerReference: "Customer Reference",
          quotationNumber: "Quotation Number",
          email: "Email",
          address: "Address",
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
            <div className="relative">
              <div className="flex">
                <Button
                  variant="outline"
                  className="gap-2 text-primary rounded-l-full border-primary border-r-0 pr-3 h-10"
                  onClick={() => formRef.current?.requestSubmit()}
                >
                  {t("button.update")}
                </Button>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="text-primary border-primary rounded-r-full border-l-0 px-2 hover:bg-primary hover:text-white h-10 w-10"
                    >
                      <ChevronUp className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-32 p-0" align="end">
                    <div className="py-1">
                      <button
                        className="w-full px-3 py-2 text-sm text-left hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-2"
                        onClick={() => {
                          formRef.current?.requestSubmit();
                          console.log("Save clicked");
                        }}
                      >
                        {t("button.save")}
                      </button>
                      <button
                        className="w-full px-3 py-2 text-sm text-left hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-2"
                        onClick={() => {
                          console.log("Save As clicked");
                          // Add your save as logic here
                        }}
                      >
                        {t("button.saveAs")}
                      </button>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>
        }
        className="w-full"
      >
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
          {/* First Row: Delivery No, Branch, Delivery Date */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <h3 className="font-medium mb-1">
                {t("form.deliveryNo")} <span className="text-red-500">*</span>
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
                {t("form.deliveryDate")} <span className="text-red-500">*</span>
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
          </div>

          {/* Second Row: Customer Name and Address */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Customer Name */}
            <div className="space-y-2">
              <h3 className="font-medium mb-1">
                {t("form.customerName")} <span className="text-red-500">*</span>
              </h3>
              <div className="flex gap-2">
                <EditableInput
                  ref={customerNameInputRef}
                  id="customerName"
                  name="customerName"
                  className="flex-1 h-10"
                  value={formData.customerName}
                  onChange={handleChange}
                  onNext={() => focusNextInput("customerName")}
                  onCancel={() => {}}
                  placeholder="Enter customer name..."
                  tooltipText="Enter customer name manually"
                  required
                />
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="px-3 text-xs whitespace-nowrap"
                    >
                      Select Customer
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80 p-2">
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">Select Customer</h4>
                      <div className="max-h-48 overflow-y-auto space-y-1">
                        {MOCK_CUSTOMERS.map((customer) => (
                          <div
                            key={customer.id}
                            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded cursor-pointer text-sm"
                            onClick={() => {
                              setFormData((prev) => ({
                                ...prev,
                                customerName: customer.name,
                                email: customer.email,
                                address: customer.address,
                                updatedAt: new Date(),
                              }));
                              toastSuccess("Customer details auto-filled");
                            }}
                          >
                            <div className="font-medium">{customer.name}</div>
                            <div className="text-xs text-gray-500">
                              {customer.email}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Address */}
            <div className="space-y-2">
              <h3 className="font-medium mb-1">{t("form.address")}</h3>
              <div className="flex gap-2">
                <EditableInput
                  id="address"
                  name="address"
                  className="flex-1 h-10"
                  value={formData.address}
                  onChange={handleChange}
                  onNext={() => {}}
                  onCancel={() => {}}
                  placeholder="Enter address..."
                  tooltipText="Customer address"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setIsAddressModalOpen(true)}
                  className="px-3"
                >
                  <MapPin size={14} />
                </Button>
              </div>
            </div>
          </div>

          {/* Third Row: Salesmen, Customer Reference, Quotation Number, Email */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <h3 className="font-medium mb-1">{t("form.salesmen")}</h3>
              <EditableInput
                ref={salesmenInputRef}
                id="salesmen"
                name="salesmen"
                className="w-full h-10"
                value={formData.salesmen}
                onChange={handleChange}
                onNext={() => focusNextInput("salesmen")}
                onCancel={() => {}}
                tooltipText="Salesmen name"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-medium">{t("form.customerReference")}</h3>
                <MoreVertical
                  className="h-4 w-4 cursor-pointer"
                  onClick={() => setIsOptionModalOpen(true)}
                />
              </div>
              <EditableInput
                ref={customerRefInputRef}
                id="customerReference"
                name="customerReference"
                className="w-full h-10"
                value={formData.customerReference}
                onChange={handleChange}
                onNext={() => focusNextInput("customerReference")}
                onCancel={() => {}}
                placeholder="Enter customer reference..."
                tooltipText="Customer reference or PO number"
              />
            </div>

            <div className="space-y-2">
              <h3 className="font-medium mb-1">{t("form.quotationNumber")}</h3>
              <EditableInput
                ref={quotationInputRef}
                id="quotationNumber"
                name="quotationNumber"
                className="w-full h-10"
                value={formData.quotationNumber}
                onChange={handleChange}
                onNext={() => focusNextInput("quotationNumber")}
                onCancel={() => {}}
                placeholder="Enter quotation number..."
                tooltipText="Related quotation number"
              />
            </div>

            <div className="space-y-2">
              <h3 className="font-medium mb-1">{t("form.email")}</h3>
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
                placeholder="Enter email address..."
                tooltipText="Customer email address"
              />
            </div>
          </div>

          {/* Fourth Row: Status Switches */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
            <div className="space-y-2">
              <h3 className="font-medium mb-1">{t("form.isDefault")}</h3>
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

          {/* Fifth Row: Timestamps */}
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

      {/* Address Modal */}
      <AddressModal
        isOpen={isAddressModalOpen}
        onClose={() => setIsAddressModalOpen(false)}
        currentAddress={formData.address}
        onSave={handleAddressUpdate}
      />

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
