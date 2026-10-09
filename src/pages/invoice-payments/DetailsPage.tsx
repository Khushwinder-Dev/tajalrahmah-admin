/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Autocomplete } from "@/components/common/Autocomplete";
import HistoryDataTable from "@/components/common/HistoryDataTableNew";
import { mockHistoryData } from "@/mockData/country-mockdata";
import video from "@/assets/videos/test.mp4";
import { printHtmlContent } from "@/lib/printHtmlContent";
import { PrintCommonLayout } from "@/lib/printContents/PrintCommonLayout";
import { toastError } from "@/lib/toast";
import GenericPDF from "@/components/common/pdf";
import { pdf } from "@react-pdf/renderer";
import PageLayout from "@/components/common/PageLayout";
import { Edit, Plus } from "lucide-react";
import { ResetFormModal } from "@/components/common/ResetFormModal";
import { usePermission } from "@/hooks/usePermissions";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import {
  initialDataWithValue,
  printConfigFieldLabels,
  type ModuleFieldsType,
} from "./config/ModuleLevelConfig";
import { getModuleFromPath } from "@/lib/utils";
import FieldSection from "@/components/common/FieldSection";

type DetailsPageTypes = ModuleFieldsType & {
  isDefault: boolean;
  isActive: boolean;
  isDraft: boolean;
  createdAt: Date | null;
  draftedAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;
  isDeleted: boolean;
};

const initialData: DetailsPageTypes = {
  ...initialDataWithValue,

  isDefault: false,
  isActive: true,
  isDraft: false,
  createdAt: new Date(),
  draftedAt: null,
  updatedAt: new Date(),
  deletedAt: null,
  isDeleted: false,
};

// update this with your module related value
const autocompleteDataDetailsPage = [
  "INV-2025-001",
  "INV-2025-002",
  "INV-2025-003",
  "INV-2025-004",
  "INV-2025-005",
  "INV-2025-006",
  "INV-2025-007",
  "INV-2025-008",
  "INV-2025-009",
  "INV-2025-010",
  "INV-2025-011",
  "INV-2025-012",
];

// Type definition for TypeScript
export type HistoryEntry = {
  id: string;
  date: string;
  user: string;
  status: "Active" | "InActive" | "Delete" | "Draft";
  export: "Single" | "Bulk";
  pdf: boolean;
  csv: boolean;
  xls: boolean;
  doc: boolean;
  print: boolean;
};

export default function InvoicePaymentsDetails() {
  const navigate = useNavigate();
  const { isRTL } = useSelector((state: RootState) => state.language);

  const location = useLocation();
  const detectedModule = getModuleFromPath(location.pathname);

  const [keepChanges, setKeepChanges] = useState(false);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(
    autocompleteDataDetailsPage[0]
  );
  const isViewPage = location.pathname.includes("/view");
  const [pdfChecked, setPdfChecked] = useState(false);
  const [printEnabled, setPrintEnabled] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  const canPdf: boolean = usePermission(detectedModule, "pdf");
  const canPrint: boolean = usePermission(detectedModule, "print");
  const canSeeHistory: boolean = usePermission(detectedModule, "history");

  // Field-level permissions
  const fieldKeys = Object.keys(initialData) as (keyof ModuleFieldsType)[];
  const fieldPermissions = usePermission<keyof DetailsPageTypes>(
    detectedModule,
    "view",
    [
      ...fieldKeys,
      "isDefault",
      "isActive",
      "createdAt",
      "draftedAt",
      "updatedAt",
      "deletedAt",
      "isDeleted",
    ]
  );

  // Get payment data based on selected invoice
  const getPaymentData = (invoiceNumber: string): DetailsPageTypes => {
    const paymentMap: Record<string, DetailsPageTypes> = {
      "INV-2025-001": {
        ...initialData,
        invoiceNumber: "INV-2025-001",
        remainingAmount: "500.00",
        amountReceived: "1500.00",
        paymentDate: "2025-01-15",
        paymentMode: "Credit Card",
        transactionId: "TXN-CC-001",
        note: "Payment received for medical consultation",
      },
      "INV-2025-002": {
        ...initialData,
        invoiceNumber: "INV-2025-002",
        remainingAmount: "750.00",
        amountReceived: "250.00",
        paymentDate: "2025-01-16",
        paymentMode: "Cash",
        transactionId: "TXN-CASH-002",
        note: "Partial payment for surgery",
      },
      "INV-2025-003": {
        ...initialData,
        invoiceNumber: "INV-2025-003",
        remainingAmount: "0.00",
        amountReceived: "2000.00",
        paymentDate: "2025-01-17",
        paymentMode: "Bank Transfer",
        transactionId: "TXN-BT-003",
        note: "Full payment for diagnostic tests",
      },
      "INV-2025-004": {
        ...initialData,
        invoiceNumber: "INV-2025-004",
        remainingAmount: "300.00",
        amountReceived: "200.00",
        paymentDate: "2025-01-18",
        paymentMode: "UPI",
        transactionId: "TXN-UPI-004",
        note: "Insurance co-payment",
      },
      "INV-2025-005": {
        ...initialData,
        invoiceNumber: "INV-2025-005",
        remainingAmount: "1200.00",
        amountReceived: "800.00",
        paymentDate: "2025-01-19",
        paymentMode: "Debit Card",
        transactionId: "TXN-DC-005",
        note: "Emergency treatment payment",
      },
      "INV-2025-006": {
        ...initialData,
        invoiceNumber: "INV-2025-006",
        remainingAmount: "0.00",
        amountReceived: "1800.00",
        paymentDate: "2025-01-20",
        paymentMode: "Net Banking",
        transactionId: "TXN-NB-006",
        note: "Full payment for lab tests",
      },
      "INV-2025-007": {
        ...initialData,
        invoiceNumber: "INV-2025-007",
        remainingAmount: "450.00",
        amountReceived: "550.00",
        paymentDate: "2025-01-21",
        paymentMode: "Wallet",
        transactionId: "TXN-WAL-007",
        note: "Payment for ENT consultation",
      },
      "INV-2025-008": {
        ...initialData,
        invoiceNumber: "INV-2025-008",
        remainingAmount: "0.00",
        amountReceived: "3000.00",
        paymentDate: "2025-01-22",
        paymentMode: "Cheque",
        transactionId: "CHQ-008-2025",
        note: "Full payment for eye surgery",
      },
      "INV-2025-009": {
        ...initialData,
        invoiceNumber: "INV-2025-009",
        remainingAmount: "200.00",
        amountReceived: "300.00",
        paymentDate: "2025-01-23",
        paymentMode: "UPI",
        transactionId: "TXN-UPI-009",
        note: "Partial payment for therapy sessions",
      },
      "INV-2025-010": {
        ...initialData,
        invoiceNumber: "INV-2025-010",
        remainingAmount: "0.00",
        amountReceived: "1200.00",
        paymentDate: "2025-01-24",
        paymentMode: "Credit Card",
        transactionId: "TXN-CC-010",
        note: "Full payment for routine checkup",
      },
      "INV-2025-011": {
        ...initialData,
        invoiceNumber: "INV-2025-011",
        remainingAmount: "900.00",
        amountReceived: "600.00",
        paymentDate: "2025-01-25",
        paymentMode: "Bank Transfer",
        transactionId: "TXN-BT-011",
        note: "Partial payment for cardiac treatment",
      },
      "INV-2025-012": {
        ...initialData,
        invoiceNumber: "INV-2025-012",
        remainingAmount: "0.00",
        amountReceived: "2500.00",
        paymentDate: "2025-01-26",
        paymentMode: "Cash",
        transactionId: "TXN-CASH-012",
        note: "Full payment for physiotherapy",
      },
    };

    return paymentMap[invoiceNumber] || initialData;
  };

  const [paymentData, setPaymentData] = useState<DetailsPageTypes>(
    getPaymentData(selectedInvoice)
  );

  const inputRef = useRef<HTMLInputElement>(null);

  // Update payment data when selection changes
  useEffect(() => {
    setPaymentData(getPaymentData(selectedInvoice));
  }, [selectedInvoice]);

  // Focus input when dropdown opens
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    console.log("isViewPage", isViewPage);
  }, []);

  const handlePrintPayment = (paymentData: any) => {
    try {
      const html = PrintCommonLayout({
        title: `${location.pathname.split("/")[1]} Details`,
        data: [paymentData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          ...printConfigFieldLabels,

          isDefault: "Default Payment",
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
  };

  const handlePDFSwitchChange = (pdfChecked: boolean) => {
    setPdfChecked(pdfChecked);
  };

  // Labels for fields to render in the view grid (excluding booleans handled separately)
  const viewFieldLabels: Record<keyof ModuleFieldsType, string> = {
    invoiceNumber: "Invoice Number",
    remainingAmount: "Remaining Amount",
    amountReceived: "Amount Received",
    paymentDate: "Payment Date",
    paymentMode: "Payment Mode",
    transactionId: "Transaction ID",
    note: "Note",
  };

  const excludedKeysForLoop = new Set([
    "invoiceNumber", // handled separately in autocomplete
    "isDefault",
    "isActive",
    "isDraft",
    "isDeleted",
  ]);

  const formatValue = (value: any) => {
    if (value instanceof Date) return value.toLocaleString();
    if (Array.isArray(value)) return value.join(", ");
    if (typeof value === "boolean") return value ? "Yes" : "No";
    return value;
  };

  const handleExportPDF = async () => {
    console.log("Export PDF clicked");
    try {
      console.log("pdf click", paymentData);
      const blob = await pdf(
        <GenericPDF
          data={[paymentData]}
          title={`${location.pathname.split("/")[1]} Details`}
          subtitle={`${location.pathname.split("/")[1]} Information`}
        />
      ).toBlob();

      console.log("blob", blob);

      const url = URL.createObjectURL(blob);
      console.log("url", url);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${location.pathname.split("/")[1]}-details.pdf`;
      a.click();
      console.log("a", a);
      console.log("url", url);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error);
      toastError("Something went wrong when generating PDF");
    }
  };

  const getRelativeTime = (date: Date | null) => {
    if (!date) return "-";

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

  return (
    <>
      <PageLayout
        title={`Viewing ${location.pathname.split("/")[1]}`}
        videoSrc={video}
        videoHeader="Tutorial video"
        onListClick={() => navigate(`/${location.pathname.split("/")[1]}`)}
        listText="List"
        listPath={location.pathname.split("/")[1]}
        activePage="view"
        popoverOptions={[
          {
            label: "Create",
            icon: <Plus className="w-5 h-5 text-green-600" />,
            onClick: () =>
              navigate(`/${location.pathname.split("/")[1]}/create`),
          },
          {
            label: "Edit",
            icon: <Edit className="w-5 h-5 text-blue-600" />,
            onClick: () =>
              navigate(`/${location.pathname.split("/")[1]}/edit/1`),
          },
        ]}
        keepChanges={keepChanges}
        onKeepChangesChange={setKeepChanges}
        pdfChecked={pdfChecked}
        onPdfToggle={canPdf ? handlePDFSwitchChange : undefined}
        printEnabled={printEnabled}
        onPrintToggle={canPrint ? handleSwitchChange : undefined}
        onHistoryClick={
          canSeeHistory ? () => setIsOptionModalOpen(true) : undefined
        }
        onExport={
          canPdf && canPrint
            ? () => {
                if (!pdfChecked && !printEnabled) {
                  setShowExportModal(true);
                  return;
                }

                if (pdfChecked) {
                  handleExportPDF();
                }
                if (printEnabled) {
                  handlePrintPayment(paymentData);
                }
              }
            : undefined
        }
      >
        <div dir={isRTL ? "rtl" : "ltr"}>
          {/* Row 1: Patient Selection, Appointment Details */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            {fieldPermissions.invoiceNumber && (
              <div className="mt-1">
                <Autocomplete
                  options={autocompleteDataDetailsPage}
                  value={selectedInvoice}
                  onValueChange={setSelectedInvoice}
                  placeholder=" "
                  displayKey="name"
                  valueKey="name"
                  searchKey="name"
                  disabled={false}
                  className="w-[96%] bg-gray-100 rounded-xl"
                  labelClassName="bg-gray-50 rounded-2xl"
                  labelText="Invoice Number"
                  inputClassName="border-none bg-stone-50 focus-visible:ring-offset-0 focus-visible:ring-0 focus-visible:border-2! focus-visible:border-blue-500"
                />
              </div>
            )}

            {Object.entries(viewFieldLabels)
              .filter(([key]) => !excludedKeysForLoop.has(key))
              .map(([key, label]) =>
                fieldPermissions[key as keyof DetailsPageTypes] ? (
                  <FieldSection
                    key={key}
                    label={label}
                    value={formatValue((paymentData as any)[key])}
                  />
                ) : null
              )}

            {fieldPermissions.isActive && (
              <div className="flex flex-col">
                <div className="">
                  <span className="text-[15px] text-gray-600">Active</span>
                </div>
                <div className="">
                  {paymentData.isActive ? (
                    <span className="font-bold text-[15px]">Yes</span>
                  ) : (
                    <span className="font-bold text-[15px]">No</span>
                  )}
                </div>
              </div>
            )}
            {fieldPermissions.isDraft && (
              <div className="flex flex-col">
                <div className="">
                  <span className="text-[15px] text-gray-600">Draft</span>
                </div>
                <div className="">
                  {paymentData.isDraft ? (
                    <span className="text-orange-600 font-bold text-[15px]">
                      Yes
                    </span>
                  ) : (
                    <span className="text-black font-bold text-[15px]">No</span>
                  )}
                </div>
              </div>
            )}
            {fieldPermissions.isDeleted && (
              <div className="flex flex-col">
                <div className="">
                  <span className="text-[15px] text-gray-600">Deleted</span>
                </div>
                <div className="">
                  {paymentData.isDeleted ? (
                    <span className="text-red-600 font-bold text-[15px]">
                      Yes
                    </span>
                  ) : (
                    <span className="text-black font-bold text-[15px]">No</span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </PageLayout>

      {/* History Modal */}
      <HistoryDataTable
        isOptionModalOpen={isOptionModalOpen}
        setIsOptionModalOpen={setIsOptionModalOpen}
        columnData={mockHistoryData}
        title="History"
        statusInfo={{
          created: getRelativeTime(paymentData.createdAt),
          updated: getRelativeTime(paymentData.updatedAt),
          drafted: getRelativeTime(paymentData.draftedAt),
          deleted: getRelativeTime(paymentData.deletedAt),
        }}
      />

      {/* Export Warning Modal */}
      <ResetFormModal
        opened={showExportModal}
        onClose={() => setShowExportModal(false)}
        onConfirm={() => setShowExportModal(false)}
        title="Export Options Required"
        message="Please select PDF/Print options before exporting. You need to enable at least one to export the data."
        confirmText="OK"
        cancelText="Cancel"
      />
    </>
  );
}
