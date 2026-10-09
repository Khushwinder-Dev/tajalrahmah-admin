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

// Define Sales Quotation interface (aligned with Create/Edit pages)
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
  status: string;
  isActive: boolean;
  isDraft: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  draftedAt: string;
  deletedAt: string;
}

const MOCK_QUOTATIONS = [
  { documentNumber: "SQ001", customer: "ABC Trading LLC" },
  { documentNumber: "SQ002", customer: "Global Exports" },
  { documentNumber: "SQ003", customer: "Sunrise Mart" },
  { documentNumber: "SQ004", customer: "Blue Ocean Foods" },
  { documentNumber: "SQ005", customer: "Prime Retailers" },
  { documentNumber: "SQ006", customer: "Velocity Supplies" },
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

export default function SalesQuotationDetails() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [keepChanges, setKeepChanges] = useState(false);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [selectedQuotation, setSelectedQuotation] = useState("SQ001");
  const location = useLocation();
  const isViewPage = location.pathname.includes("/view");
  const [pdfChecked, setPdfChecked] = useState(false);
  const [printEnabled, setPrintEnabled] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  // Permission checks
  // const canCreate: boolean = usePermission("sales-return", "create");
  // const canEdit: boolean = usePermission("sales-return", "edit");
  // const canDelete: boolean = usePermission("sales-return", "delete");
  // const canExport: boolean = usePermission("sales-return", "export");
  const canPdf: boolean = usePermission("sales-quotation", "pdf");
  const canPrint: boolean = usePermission("sales-quotation", "print");
  const canSeeHistory: boolean = usePermission("sales-quotation", "history");

  let quotationData: SalesQuotation = {
    id: "1",
    documentNumber: selectedQuotation,
    quotationNumber: `QUO-2024-${selectedQuotation.replace("SQ", "")}`,
    quotationDate: "2024-07-20",
    customer:
      MOCK_QUOTATIONS.find((i) => i.documentNumber === selectedQuotation)
        ?.customer || "ABC Trading LLC",
    vatNumber: "VAT-1234567890",
    paymentMode: "Bank Transfer",
    dueDays: 30,
    paymentDate: "2024-08-23",
    remarks: "Product quotation for electronics",
    country: "UAE",
    state: "Dubai",
    city: "Deira",
    salesman: "John Smith",
    status: "Active",
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
      quotationData = {
        ...quotationData,
        quotationNumber: "",
        quotationDate: "",
        customer: "",
        vatNumber: "",
        paymentMode: "",
        dueDays: 0,
        paymentDate: "",
        remarks: "",
        country: "",
        state: "",
        city: "",
        salesman: "",
        status: "",
        createdAt: "",
        updatedAt: "",
        draftedAt: "",
        deletedAt: "",
      };
    }
  }, []);

  const handlePrintQuotation = (quotationData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Sales Quotation Details",
        data: [quotationData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          documentNumber: "Document Number",
          quotationNumber: "Quotation Number",
          quotationDate: "Quotation Date",
          customer: "Customer",
          vatNumber: "VAT Number",
          paymentMode: "Payment Mode",
          dueDays: "Due Days",
          paymentDate: "Payment Date",
          remarks: "Remarks",
          country: "Country",
          state: "State",
          city: "City",
          salesman: "Salesman",
          status: "Status",
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
      console.log("quotationData on pdf click", quotationData);
      const blob = await pdf(
        <GenericPDF
          data={[quotationData]}
          title="Sales Quotation Details"
          subtitle="Sales Quotation Information"
        />
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `sales-quotation-${selectedQuotation}-details.pdf`;
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

  return (
    <>
      <MinimizablePageLayout
        moduleId="sales-quotation-details-module"
        moduleName="Sales Quotation Details"
        moduleRoute="/sales-quotation/view"
        title={t("form.viewingQuotation")}
        videoSrc={video}
        videoHeader="Tutorial video"
        listPath="sales-quotation"
        activePage="view"
        popoverOptions={[
          {
            label: "Create",
            icon: <Plus className="w-5 h-5 text-green-600" />,
            onClick: () => navigate("/sales-quotation/create"),
          },
          {
            label: "Edit",
            icon: <Edit className="w-5 h-5 text-blue-600" />,
            onClick: () =>
              navigate(`/sales-quotation/edit/${quotationData.id}`),
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
                  handlePrintQuotation(quotationData);
                }
              }
            : undefined
        }
        module="sales-quotation"
      >
        {/* Row 1: Document Number, Quotation Number, Quotation Date, Customer */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="mt-1">
            <Autocomplete
              options={MOCK_QUOTATIONS}
              value={selectedQuotation}
              onValueChange={setSelectedQuotation}
              placeholder=""
              displayKey="documentNumber"
              valueKey="documentNumber"
              searchKey="customer"
              disabled={false}
              className="w-[96%] bg-gray-100 rounded-xl"
              labelClassName="bg-gray-50 rounded-2xl"
              labelText="Document Number"
              isShowTemplateIcon={false}
            />
          </div>

          <div className="">
            <h3 className="font-normal mb-1 text-gray-600">Quotation Number</h3>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(quotationData.quotationNumber)}
            </div>
          </div>

          <div className="">
            <h3 className="font-normal mb-1 text-gray-600">Quotation Date</h3>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(quotationData.quotationDate)}
            </div>
          </div>

          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">Customer</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(quotationData.customer)}
            </div>
          </div>
        </div>

        {/* Row 2: Payment Mode, Due Days, Payment Date, VAT Number */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="">
            <h3 className="font-normal mb-1 text-gray-600">Payment Mode</h3>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(quotationData.paymentMode)}
            </div>
          </div>

          <div className="">
            <h3 className="font-normal mb-1 text-gray-600">Due Days</h3>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {quotationData.dueDays ? `${quotationData.dueDays} days` : "–"}
            </div>
          </div>

          <div className="">
            <h3 className="font-normal mb-1 text-gray-600">Payment Date</h3>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(quotationData.paymentDate)}
            </div>
          </div>

          <div className="">
            <h3 className="font-normal mb-1 text-gray-600">VAT Number</h3>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(quotationData.vatNumber)}
            </div>
          </div>
        </div>

        {/* Row 3: Remarks, Country, State, City */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="">
            <h3 className="font-normal mb-1 text-gray-600">Remarks</h3>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(quotationData.remarks)}
            </div>
          </div>
          <div className="">
            <h3 className="font-normal mb-1 text-gray-600">Country</h3>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(quotationData.country)}
            </div>
          </div>

          <div className="">
            <h3 className="font-normal mb-1 text-gray-600">State</h3>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(quotationData.state)}
            </div>
          </div>
          <div className="">
            <h3 className="font-normal mb-1 text-gray-600">City</h3>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(quotationData.city)}
            </div>
          </div>
        </div>

        {/* Row 4: State, City, Status, Salesman */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="">
            <h3 className="font-normal mb-1 text-gray-600">Status</h3>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {quotationData.isDeleted
                ? "Deleted"
                : quotationData.isDraft
                ? "Draft"
                : quotationData.status || "Active"}
            </div>
          </div>

          <div className="">
            <h3 className="font-normal mb-1 text-gray-600">Salesman</h3>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(quotationData.salesman)}
            </div>
          </div>
        </div>
      </MinimizablePageLayout>

      {/* History Modal */}
      <HistoryDataTable
        isOptionModalOpen={isOptionModalOpen}
        setIsOptionModalOpen={setIsOptionModalOpen}
        columnData={mockHistoryData}
        title="Sales Quotation History"
        statusInfo={{
          created: getRelativeTime(quotationData.createdAt),
          updated: getRelativeTime(quotationData.updatedAt),
          drafted: getRelativeTime(quotationData.draftedAt),
          deleted: getRelativeTime(quotationData.deletedAt),
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
