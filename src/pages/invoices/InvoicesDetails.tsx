/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
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
import { Edit, Plus } from "lucide-react";
import { ResetFormModal } from "@/components/common/ResetFormModal";
import { usePermission } from "@/hooks/usePermissions";
import MinimizablePageLayout from "@/components/MinimizablePageLayout";

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
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  draftedAt: string;
  deletedAt: string;
}

const MOCK_INVOICES = [
  {
    documentNumber: "INV001",
    supplierName: "AL AHAD CURTAINS TEX & FURNITURE TR.LLC",
  },
  { documentNumber: "INV002", supplierName: "SimplyNayela" },
  {
    documentNumber: "INV003",
    supplierName: "BROWN HUT AUTO ACCESSORISE TR L.L.C",
  },
  { documentNumber: "INV004", supplierName: "PIDILITE MEA CHEMICALS L.L.C" },
  {
    documentNumber: "INV005",
    supplierName: "TOP LEATHER Vehicles Upholstery Service L.L.C",
  },
  { documentNumber: "INV006", supplierName: "AL WESAL AUTO ACCESSORIES LLC" },
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

export default function InvoicesDetails() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [keepChanges, setKeepChanges] = useState(false);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState("INV001");
  const location = useLocation();
  const isViewPage = location.pathname.includes("/view");
  const [pdfChecked, setPdfChecked] = useState(false);
  const [printEnabled, setPrintEnabled] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  // Permission checks
  // const canCreate: boolean = usePermission("invoices", "create");
  // const canEdit: boolean = usePermission("invoices", "edit");
  // const canDelete: boolean = usePermission("invoices", "delete");
  // const canExport: boolean = usePermission("invoices", "export");
  const canPdf: boolean = usePermission("invoices", "pdf");
  const canPrint: boolean = usePermission("invoices", "print");
  const canSeeHistory: boolean = usePermission("invoices", "history");

  let invoiceData: Invoice = {
    id: "1",
    documentNumber: selectedInvoice,
    poNumber: "PO-2024-001",
    poDate: "2024-07-24",
    supplierName:
      MOCK_INVOICES.find((i) => i.documentNumber === selectedInvoice)
        ?.supplierName || "AL AHAD CURTAINS TEX & FURNITURE TR.LLC",
    paymentMode: "Split",
    dueDays: 45,
    paymentDate: "2024-08-15",
    supplierNumber: "36",
    supplierStatus: "Active",
    supplierGroup: "Furniture Suppliers",
    remarks: "Urgent delivery required",
    country: "UAE",
    state: "Dubai",
    city: "Deira",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    createdAt: "2023-05-15T10:30:00Z",
    updatedAt: "2023-11-20T14:45:00Z",
    draftedAt: "2025-05-20T14:45:00Z",
    deletedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(),
  };

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    console.log("isViewPage", isViewPage);
    if (isViewPage) {
      invoiceData = {
        ...invoiceData,
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
        createdAt: "",
        updatedAt: "",
        draftedAt: "",
        deletedAt: "",
      };
    }
  }, []);

  const handlePrintInvoice = (invoiceData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Invoice Details",
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

  const handleExportPDF = async () => {
    console.log("Export PDF clicked");
    try {
      console.log("invoiceData on pdf click", invoiceData);
      const blob = await pdf(
        <GenericPDF
          data={[invoiceData]}
          title="Invoice Details"
          subtitle="Invoice Information"
        />
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `invoice-${selectedInvoice}-details.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error);
      toastError("Something went wrong when generating PDF");
    }
  };

  const getRelativeTime = (dateString: string | null) => {
    if (!dateString) return "–";

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

  const displayValue = (value: any) => {
    return value === undefined || value === null || value === "" ? "–" : value;
  };

  // Generate initials for supplier
  const getSupplierInitials = (name: string) => {
    return name
      .split(" ")
      .slice(0, 2)
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  const getInitialsColor = (code: string) => {
    const colors = [
      "bg-blue-500",
      "bg-green-500",
      "bg-purple-500",
      "bg-pink-500",
      "bg-indigo-500",
      "bg-yellow-500",
    ];
    const index = parseInt(code.slice(-1)) % colors.length;
    return colors[index];
  };

  return (
    <>
      <MinimizablePageLayout
        moduleId="invoice-details-module"
        moduleName="Invoice Details"
        moduleRoute="/invoices/view"
        title={t("form.viewingInvoice")}
        videoSrc={video}
        videoHeader="Tutorial video"
        listPath="invoices"
        activePage="view"
        popoverOptions={[
          {
            label: "Create",
            icon: <Plus className="w-5 h-5 text-green-600" />,
            onClick: () => navigate("/invoices/create"),
          },
          {
            label: "Edit",
            icon: <Edit className="w-5 h-5 text-blue-600" />,
            onClick: () => navigate(`/invoices/edit/${invoiceData.id}`),
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
                  handlePrintInvoice(invoiceData);
                }
              }
            : undefined
        }
        module="invoices"
      >
        {/* Row 1: Document Number, P.O Number, P.O Date, Supplier Name */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="mt-1">
            <Autocomplete
              options={MOCK_INVOICES}
              value={selectedInvoice}
              onValueChange={setSelectedInvoice}
              placeholder=""
              displayKey="documentNumber"
              valueKey="documentNumber"
              searchKey="supplierName"
              disabled={false}
              className="w-[96%] bg-gray-100 rounded-xl"
              labelClassName="bg-gray-50 rounded-2xl"
              labelText="Document Number"
              isShowTemplateIcon={false}
            />
          </div>

          <div className="">
            <h3 className="font-normal mb-1 text-gray-600">P.O Number</h3>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(invoiceData.poNumber)}
            </div>
          </div>

          <div className="">
            <h3 className="font-normal mb-1 text-gray-600">P.O Date</h3>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(invoiceData.poDate)}
            </div>
          </div>

          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">Supplier Name</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(invoiceData.supplierName)}
            </div>
          </div>
        </div>

        {/* Row 2: Payment Mode, Due Days, Payment Date, Supplier Number */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="">
            <h3 className="font-normal mb-1 text-gray-600">Payment Mode</h3>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(invoiceData.paymentMode)}
            </div>
          </div>

          <div className="">
            <h3 className="font-normal mb-1 text-gray-600">Due Days</h3>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {invoiceData.dueDays ? `${invoiceData.dueDays} days` : "–"}
            </div>
          </div>

          <div className="">
            <h3 className="font-normal mb-1 text-gray-600">Payment Date</h3>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(invoiceData.paymentDate)}
            </div>
          </div>

          <div className="">
            <h3 className="font-normal mb-1 text-gray-600">Supplier Number</h3>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(invoiceData.supplierNumber)}
            </div>
          </div>
        </div>

        {/* Row 3: Supplier Status, Supplier Group, Remarks, Country */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="">
            <h3 className="font-normal mb-1 text-gray-600">Supplier Status</h3>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {invoiceData.supplierStatus ? (
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    invoiceData.supplierStatus === "Active"
                      ? "bg-green-100 text-green-800"
                      : invoiceData.supplierStatus === "Pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : invoiceData.supplierStatus === "Suspended"
                      ? "bg-red-100 text-red-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {invoiceData.supplierStatus}
                </span>
              ) : (
                "–"
              )}
            </div>
          </div>

          <div className="">
            <h3 className="font-normal mb-1 text-gray-600">Supplier Group</h3>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(invoiceData.supplierGroup)}
            </div>
          </div>

          <div className="">
            <h3 className="font-normal mb-1 text-gray-600">Remarks</h3>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(invoiceData.remarks)}
            </div>
          </div>

          <div className="">
            <h3 className="font-normal mb-1 text-gray-600">Country</h3>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(invoiceData.country)}
            </div>
          </div>
        </div>

        {/* Row 4: State, City, Status, Action */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="">
            <h3 className="font-normal mb-1 text-gray-600">State</h3>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(invoiceData.state)}
            </div>
          </div>

          <div className="">
            <h3 className="font-normal mb-1 text-gray-600">City</h3>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(invoiceData.city)}
            </div>
          </div>

          <div className="">
            <h3 className="font-normal mb-1 text-gray-600">Status</h3>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {invoiceData.isDeleted
                ? "Deleted"
                : invoiceData.isDraft
                ? "Draft"
                : "Active"}
            </div>
          </div>

          <div className="">
            <h3 className="font-normal mb-1 text-gray-600">Action</h3>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              Updated
            </div>
          </div>
        </div>

        {/* Supplier Visual */}
        <div className="mt-14 relative">
          {/* Floating Label */}
          <div className="absolute -top-3 left-3 bg-white px-2 text-sm font-medium text-gray-500 rounded-md">
            Supplier
          </div>

          <div className="border-2 border-dashed rounded-lg p-6 text-center focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary py-16">
            <div className="w-48 h-28 border rounded-md bg-gray-100 overflow-hidden dark:bg-gray-700 mx-auto hover:scale-110 transition duration-300 cursor-pointer">
              <div
                className={`w-full h-full flex items-center justify-center text-white font-bold text-lg ${getInitialsColor(
                  invoiceData.documentNumber
                )}`}
              >
                {invoiceData.supplierName
                  ? getSupplierInitials(invoiceData.supplierName)
                  : "–"}
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-2 text-center max-w-xs">
              {displayValue(invoiceData.supplierName)}
            </p>
          </div>
        </div>
      </MinimizablePageLayout>

      {/* History Modal */}
      <HistoryDataTable
        isOptionModalOpen={isOptionModalOpen}
        setIsOptionModalOpen={setIsOptionModalOpen}
        columnData={mockHistoryData}
        title="Invoice History"
        statusInfo={{
          created: getRelativeTime(invoiceData.createdAt),
          updated: getRelativeTime(invoiceData.updatedAt),
          drafted: getRelativeTime(invoiceData.draftedAt),
          deleted: getRelativeTime(invoiceData.deletedAt),
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
