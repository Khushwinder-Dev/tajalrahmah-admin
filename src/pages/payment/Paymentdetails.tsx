/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
// import { useTranslation } from "react-i18next";
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

const MOCK_PAYMENTS = [
  {
    id: "1",
    code: "PAY-001",
    invoiceType: "Commercial Invoice",
    currency: "USD",
    paymentTerms: "Net 30",
    dueDays: 30,
    totalAmount: 50000,
    containerAmount: 45000,
    typeOfDeposit: "Bank Transfer",
    depositAmount: 10000,
    depositDate: "2024-01-15",
    exchangeRate: 1.0,
    localAmount: 50000,
    status: "Active",
  },
  {
    id: "2",
    code: "PAY-002",
    invoiceType: "Proforma Invoice",
    currency: "EUR",
    paymentTerms: "Net 15",
    dueDays: 15,
    totalAmount: 35000,
    containerAmount: 30000,
    typeOfDeposit: "Wire Transfer",
    depositAmount: 5000,
    depositDate: "2024-01-20",
    exchangeRate: 0.85,
    localAmount: 29750,
    status: "Active",
  },
  {
    id: "3",
    code: "PAY-003",
    invoiceType: "Credit Note",
    currency: "GBP",
    paymentTerms: "Net 45",
    dueDays: 45,
    totalAmount: 25000,
    containerAmount: 20000,
    typeOfDeposit: "Check",
    depositAmount: 5000,
    depositDate: "2024-01-25",
    exchangeRate: 0.75,
    localAmount: 18750,
    status: "Draft",
  },
  {
    id: "4",
    code: "PAY-004",
    invoiceType: "Debit Note",
    currency: "JPY",
    paymentTerms: "Net 60",
    dueDays: 60,
    totalAmount: 75000,
    containerAmount: 70000,
    typeOfDeposit: "Cash",
    depositAmount: 5000,
    depositDate: "2024-01-30",
    exchangeRate: 110.0,
    localAmount: 8250000,
    status: "Inactive",
  },
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

export default function PaymentDetailsPage() {
  // const { t } = useTranslation();
  const navigate = useNavigate();

  const [keepChanges, setKeepChanges] = useState(false);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState("1");
  const location = useLocation();
  const isViewPage = location.pathname.includes("/view");
  const [pdfChecked, setPdfChecked] = useState(false);
  const [printEnabled, setPrintEnabled] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  // Permission checks
  // const { canCreate, canView, canEdit, canDelete } = useUserMasterPermissions();

  // Field-level permissions
  const canPdf: boolean = usePermission("payment", "pdf");
  const canPrint: boolean = usePermission("payment", "print");
  const canSeeHistory: boolean = usePermission("payment", "history");

  let reportData = {
    id: selectedPayment,
    code:
      MOCK_PAYMENTS.find((r) => r.id === selectedPayment)?.code || "PAY-001",
    invoiceType:
      MOCK_PAYMENTS.find((r) => r.id === selectedPayment)?.invoiceType ||
      "Commercial Invoice",
    currency:
      MOCK_PAYMENTS.find((r) => r.id === selectedPayment)?.currency || "USD",
    paymentTerms:
      MOCK_PAYMENTS.find((r) => r.id === selectedPayment)?.paymentTerms ||
      "Net 30",
    dueDays: MOCK_PAYMENTS.find((r) => r.id === selectedPayment)?.dueDays || 30,
    totalAmount:
      MOCK_PAYMENTS.find((r) => r.id === selectedPayment)?.totalAmount || 50000,
    containerAmount:
      MOCK_PAYMENTS.find((r) => r.id === selectedPayment)?.containerAmount ||
      45000,
    typeOfDeposit:
      MOCK_PAYMENTS.find((r) => r.id === selectedPayment)?.typeOfDeposit ||
      "Bank Transfer",
    depositAmount:
      MOCK_PAYMENTS.find((r) => r.id === selectedPayment)?.depositAmount ||
      10000,
    depositDate:
      MOCK_PAYMENTS.find((r) => r.id === selectedPayment)?.depositDate ||
      "2024-01-15",
    exchangeRate:
      MOCK_PAYMENTS.find((r) => r.id === selectedPayment)?.exchangeRate || 1.0,
    localAmount:
      MOCK_PAYMENTS.find((r) => r.id === selectedPayment)?.localAmount || 50000,
    isDefault: true,
    isActive: true,
    isDraft: false,
    isDeleted: false,
    status:
      MOCK_PAYMENTS.find((r) => r.id === selectedPayment)?.status || "Active",
    createdAt: "2023-05-15T10:30:00Z",
    updatedAt: "2025-01-15T14:30:00Z",
    draftedAt: "2025-05-20T14:45:00Z",
    deletedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(),
  } as any;

  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when dropdown opens
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    console.log("isViewPage", isViewPage);
    if (isViewPage) {
      reportData = {
        id: selectedPayment,
        code: "",
        invoiceType: "",
        currency: "",
        paymentTerms: "",
        dueDays: 0,
        totalAmount: 0,
        containerAmount: 0,
        typeOfDeposit: "",
        depositAmount: 0,
        depositDate: "",
        exchangeRate: 0,
        localAmount: 0,
        isDefault: true,
        isActive: true,
        isDraft: false,
        isDeleted: false,
        status: "Active",
        createdAt: "",
        updatedAt: "",
        draftedAt: "",
        deletedAt: "",
      } as any;
    }
  }, []);

  const handlePrintReport = (report: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Payment Details",
        data: [report],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          code: "Code",
          invoiceType: "Invoice Type",
          currency: "Currency",
          paymentTerms: "Payment Terms",
          dueDays: "Due Days",
          totalAmount: "Total Amount",
          containerAmount: "Container Amount",
          typeOfDeposit: "Type of Deposit",
          depositAmount: "Deposit Amount",
          depositDate: "Deposit Date",
          exchangeRate: "Exchange Rate",
          localAmount: "Local Amount",
          isDefault: "Default",
          isActive: "Active",
          isDraft: "Draft",
          isDeleted: "Deleted",
          status: "Status",
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
      console.log("reportData on pdf click", reportData);
      const blob = await pdf(
        <GenericPDF
          data={[reportData]}
          title="Payment Details"
          subtitle="Payment Information"
        />
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "payment-details.pdf";
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
        moduleId="payment-details-module"
        moduleName="Payment Details"
        moduleRoute="/payment/view"
        title="Viewing Payment"
        videoSrc={video}
        videoHeader="Tutorial video"
        listPath="payment"
        activePage="view"
        module="payment"
        popoverOptions={[
          {
            label: "Create",
            icon: <Plus className="w-5 h-5 text-green-600" />,
            onClick: () => navigate("/payment/create"),
          },
          {
            label: "Edit",
            icon: <Edit className="w-5 h-5 text-blue-600" />,
            onClick: () => navigate("/payment/edit/1"),
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
                  handlePrintReport(reportData);
                }
              }
            : undefined
        }
      >
        {/* Row 1: Payment Selection, Code, Invoice Type, Currency */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="mt-1">
            <Autocomplete
              options={MOCK_PAYMENTS}
              value={selectedPayment}
              onValueChange={setSelectedPayment}
              placeholder=" "
              displayKey="invoiceType"
              valueKey="id"
              searchKey="invoiceType"
              disabled={false}
              className="w-[96%] bg-gray-100 rounded-xl"
              labelClassName="bg-gray-50 rounded-2xl"
              labelText="Payment"
              isShowTemplateIcon={false}
            />
          </div>

          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">Code</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(reportData.code)}
            </div>
          </div>

          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">Invoice Type</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(reportData.invoiceType)}
            </div>
          </div>

          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">Currency</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(reportData.currency)}
            </div>
          </div>
        </div>

        {/* Row 2: Payment Terms, Due Days, Total Amount, Container Amount */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">Payment Terms</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(reportData.paymentTerms)}
            </div>
          </div>

          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">Due Days</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(reportData.dueDays)}
            </div>
          </div>

          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">Total Amount</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(reportData.totalAmount)}
            </div>
          </div>

          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">Container Amount</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(reportData.containerAmount)}
            </div>
          </div>
        </div>

        {/* Row 3: Type of Deposit, Deposit Amount, Deposit Date, Exchange Rate */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">Type of Deposit</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(reportData.typeOfDeposit)}
            </div>
          </div>

          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">Deposit Amount</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(reportData.depositAmount)}
            </div>
          </div>

          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">Deposit Date</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(reportData.depositDate)}
            </div>
          </div>

          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">Exchange Rate</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(reportData.exchangeRate)}
            </div>
          </div>
        </div>

        {/* Row 4: Local Amount, Status, Default */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">Local Amount</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(reportData.localAmount)}
            </div>
          </div>

          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">Status</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(reportData.status)}
            </div>
          </div>

          <div className="">
            <div className="flex flex-col">
              <div className="">
                <span className="text-[15px] text-gray-600">Default</span>
              </div>
              <div className="">
                {reportData.isDefault ? (
                  <span className="text-black text-[15px]">Yes</span>
                ) : (
                  <span className="text-black text-[15px]">No</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </MinimizablePageLayout>

      {/* History Modal */}
      <HistoryDataTable
        isOptionModalOpen={isOptionModalOpen}
        setIsOptionModalOpen={setIsOptionModalOpen}
        columnData={mockHistoryData}
        title="History"
        statusInfo={{
          created: getRelativeTime(reportData.createdAt),
          updated: getRelativeTime(reportData.updatedAt),
          drafted: getRelativeTime(reportData.draftedAt),
          deleted: getRelativeTime(reportData.deletedAt),
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
