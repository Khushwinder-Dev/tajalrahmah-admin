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

// Define OpeningStock interface
interface OpeningStock {
  id: string;
  documentNumber: string;
  branch: string;
  poNumber: string;
  documentDate: Date | string;
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
    documentDate: new Date("2024-01-15"),
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
  {
    id: "2",
    documentNumber: "OS002",
    branch: "North Branch",
    poNumber: "PO-2024-002",
    documentDate: new Date("2024-01-16"),
    remarks: "Quarterly stock adjustment for north branch",
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
    documentNumber: "OS003",
    branch: "South Branch",
    poNumber: "PO-2024-003",
    documentDate: new Date("2024-01-17"),
    remarks: "New location inventory setup",
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
    documentNumber: "OS004",
    branch: "East Branch",
    poNumber: "PO-2024-004",
    documentDate: new Date("2024-01-18"),
    remarks: "Stock reconciliation after audit",
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
    documentNumber: "OS005",
    branch: "West Branch",
    poNumber: "PO-2024-005",
    documentDate: new Date("2024-01-19"),
    remarks: "Monthly inventory update",
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
    documentNumber: "OS006",
    branch: "Central Branch",
    poNumber: "PO-2024-006",
    documentDate: new Date("2024-01-20"),
    remarks: "Year-end stock count verification",
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
    documentNumber: "OS007",
    branch: "Downtown Branch",
    poNumber: "PO-2024-007",
    documentDate: new Date("2024-01-21"),
    remarks: "Seasonal inventory adjustment",
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
    documentNumber: "OS008",
    branch: "Suburban Branch",
    poNumber: "PO-2024-008",
    documentDate: new Date("2024-01-22"),
    remarks: "New product line addition",
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

export default function StockTransferEditPage({ isEdit = false }: Props) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [keepChanges, setKeepChanges] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);

  const poNumberInputRef = useRef<EditableInputRef>(null);
  const remarksInputRef = useRef<EditableInputRef>(null);
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
  const [formData, setFormData] = useState<OpeningStock>({
    id: "",
    documentNumber: "",
    branch: "",
    poNumber: "",
    documentDate: new Date(),
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

  // Loading state
  const [isLoading, setIsLoading] = useState(true);

  // Document number options for autocomplete
  const documentNumberOptions = MOCK_OPENING_STOCKS.map((stock) => ({
    value: stock.documentNumber,
    label: `${stock.documentNumber} - ${stock.branch}`,
  }));

  // Function to find and load opening stock data
  const loadOpeningStockData = (documentNumber: string) => {
    const stockData = MOCK_OPENING_STOCKS.find(
      (stock) => stock.documentNumber === documentNumber
    );

    if (stockData) {
      setFormData({
        ...stockData,
        updatedAt: new Date(), // Update the timestamp
      });
      toastSuccess(`Loaded data for ${documentNumber}`);
    } else {
      toastError(`Opening stock ${documentNumber} not found`);
    }
  };

  // Handle document number selection
  const handleDocumentNumberChange = (value: string | null) => {
    if (value) {
      const documentNumber = value.split(" - ")[0]; // Extract document number from "OS001 - Main Branch"
      setFormData((prev) => ({ ...prev, documentNumber }));
      loadOpeningStockData(documentNumber);
    }
  };

  // Initialize data on component mount
  useEffect(() => {
    setIsLoading(true);

    // If ID is provided in URL, load that specific record
    if (id && id !== "undefined") {
      const stockData = MOCK_OPENING_STOCKS.find((stock) => stock.id === id);
      if (stockData) {
        setFormData(stockData);
      } else {
        // If ID not found, load the first record as default
        setFormData(MOCK_OPENING_STOCKS[0]);
      }
    } else {
      // Load the first record as default for editing
      setFormData(MOCK_OPENING_STOCKS[0]);
    }

    setIsLoading(false);
  }, [id]);

  // Update translation data when remarks change
  useEffect(() => {
    setTranslations([
      { id: 1, english: formData.remarks || "", arabic: "", bangla: "" },
    ]);
  }, [formData.remarks]);

  // Update the focusNextInput function
  const focusNextInput = (currentField: string) => {
    console.log("Current field:", currentField);
    switch (currentField) {
      case "documentNumber": {
        // Focus on branch dropdown
        const branchInput = document.querySelector(
          'input[placeholder="Select branch..."]'
        ) as HTMLInputElement;
        branchInput?.focus();
        break;
      }
      case "branch":
        poNumberInputRef.current?.focus();
        break;
      case "poNumber": {
        // Focus on the document date picker trigger
        const datePickerTrigger = document.querySelector(
          '[data-testid="date-picker-trigger"]'
        ) as HTMLButtonElement;
        datePickerTrigger?.focus();
        break;
      }
      case "documentDate":
        remarksInputRef.current?.focus();
        break;
      case "remarks":
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
    console.log("Opening Stock Edit Form submitted:", formData);
    toastSuccess("Opening stock updated successfully!");
  };

  // Handle form reset
  const handleReset = () => {
    if (window.confirm(t("form.resetConfirm"))) {
      // Reset to original loaded data
      const originalData = MOCK_OPENING_STOCKS.find(
        (stock) => stock.documentNumber === formData.documentNumber
      );
      if (originalData) {
        setFormData(originalData);
        toastSuccess("Form reset to original values");
      }
    }
  };

  const handlePrintOpeningStock = (stockData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Opening Stock Details",
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
    console.log("Export PDF clicked");
    try {
      const blob = await pdf(
        <GenericPDF
          data={[formData]}
          title="Opening Stock Details"
          subtitle="Opening Stock Information"
        />
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `opening-stock-${formData.documentNumber}.pdf`;
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
        <div className="text-lg">Loading opening stock data...</div>
      </div>
    );
  }

  return (
    <>
      <PageLayout
        title={t("form.editingStockTransfer")}
        videoSrc={video}
        videoHeader="Rapid ERP Video"
        listPath="/stock-transfer"
        popoverOptions={[
          {
            label: "Create",
            onClick: () => navigate("/stock-transfer/create"),
          },
          {
            label: "View",
            onClick: () => navigate(`/stock-transfer/${formData.id}`),
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
          {/* First Row: Document Number, Branch, P.O Number, Document Date, Remarks */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="space-y-2">
              <h3 className="font-medium mb-1">
                {t("stockTransfer.documentNumber")}{" "}
                <span className="text-red-500">*</span>
              </h3>
              <Autocomplete
                data={documentNumberOptions}
                value={
                  formData.documentNumber
                    ? `${formData.documentNumber} - ${formData.branch}`
                    : ""
                }
                onChange={handleDocumentNumberChange}
                placeholder="Select document number..."
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
                    focusNextInput("documentNumber");
                  }
                }}
                limit={10}
                maxDropdownHeight={200}
                required
              />
            </div>

            <div className="space-y-2">
              <h3 className="font-medium mb-1">
                {t("form.sourceBranch")} <span className="text-red-500">*</span>
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
                {t("form.destinationBranch")}{" "}
                <span className="text-red-500">*</span>
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
                Document Date <span className="text-red-500">*</span>
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
                      !formData.documentDate && "text-muted-foreground"
                    )}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        focusNextInput("documentDate");
                      }
                    }}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.documentDate ? (
                      format(new Date(formData.documentDate), "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={
                      formData.documentDate
                        ? new Date(formData.documentDate)
                        : undefined
                    }
                    onSelect={(date) => {
                      setFormData({
                        ...formData,
                        documentDate: date || new Date(),
                        updatedAt: new Date(),
                      });
                      setIsDatePickerOpen(false);
                      focusNextInput("documentDate");
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-medium">Remarks</h3>
                <MoreVertical
                  className="h-4 w-4 cursor-pointer"
                  onClick={() => setIsOptionModalOpen(true)}
                />
              </div>
              <EditableInput
                ref={remarksInputRef}
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
          </div>

          {/* Second Row: Status Switches */}
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
              <h3 className="font-medium mb-1">Is Default</h3>
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

          {/* Third Row: Timestamps */}
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
        title="Opening Stock Language Translator"
        initialData={translations}
        onSave={(data) => {
          setTranslations(data);
          console.log("Opening Stock translations saved:", data);
        }}
      />
    </>
  );
}
