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
import CheckCard from "@/components/CheckCard";
import BillPaymentTable from "@/components/BillPaymentTable";

type CheckData = {
  vendorName: string;
  date: string;
  bankAccount: string;
  amount: number;
  checkNumber: string;
  status: "Pending" | "Issued" | "Cleared" | "Void";
  memo: string;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: Date | null;
  updatedAt: Date | null;
};

const initialData: CheckData = {
  vendorName: "ABC Supplies Co.",
  date: "2024-01-15",
  bankAccount: "Chase Bank - 1234",
  amount: 1250.0,
  checkNumber: "CHK-001",
  status: "Pending",
  memo: "Office Supplies Payment",
  isActive: true,
  isDeleted: false,
  createdAt: new Date(),
  updatedAt: new Date(),
};

// Check options for autocomplete
const checkOptions = [
  "ABC Supplies Co. - CHK-001",
  "XYZ Corporation - CHK-002",
  "Tech Solutions Inc. - CHK-003",
  "Global Services Ltd. - CHK-004",
  "Premium Partners - CHK-005",
  "Innovation Labs - CHK-006",
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

export default function ChecksDetailsPage() {
  const navigate = useNavigate();
  const { isRTL } = useSelector((state: RootState) => state.language);

  const [keepChanges, setKeepChanges] = useState(false);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [selectedCheck, setSelectedCheck] = useState(
    "ABC Supplies Co. - CHK-001"
  );
  const location = useLocation();
  const isViewPage = location.pathname.includes("/view");
  const [pdfChecked, setPdfChecked] = useState(false);
  const [printEnabled, setPrintEnabled] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  // get permission
  const canCreate: boolean = usePermission("checks", "create");
  const canView: boolean = usePermission("checks", "view");
  const canEdit: boolean = usePermission("checks", "edit");
  const canDelete: boolean = usePermission("checks", "delete");
  const canExport: boolean = usePermission("checks", "export");
  const canPdf: boolean = usePermission("checks", "pdf");
  const canPrint: boolean = usePermission("checks", "print");
  const canSeeHistory: boolean = usePermission("checks", "history");

  // Field-level permissions
  const canViewVendorName: boolean = usePermission(
    "checks",
    "view",
    "vendorName"
  );
  const canViewDate: boolean = usePermission("checks", "view", "date");
  const canViewBankAccount: boolean = usePermission(
    "checks",
    "view",
    "bankAccount"
  );
  const canViewAmount: boolean = usePermission("checks", "view", "amount");
  const canViewCheckNumber: boolean = usePermission(
    "checks",
    "view",
    "checkNumber"
  );
  const canViewStatus: boolean = usePermission("checks", "view", "status");
  const canViewMemo: boolean = usePermission("checks", "view", "memo");
  const canViewIsActive: boolean = usePermission("checks", "view", "isActive");
  const canViewIsDeleted: boolean = usePermission(
    "checks",
    "view",
    "isDeleted"
  );

  console.log("canCreate", canCreate);
  console.log("canView", canView);
  console.log("canEdit", canEdit);
  console.log("canDelete", canDelete);
  console.log("canExport", canExport);

  // Get check data based on selected check
  const getCheckData = (checkName: string): CheckData => {
    const checkMap: Record<string, CheckData> = {
      "ABC Supplies Co. - CHK-001": {
        vendorName: "ABC Supplies Co.",
        date: "2024-01-15",
        bankAccount: "Chase Bank - 1234",
        amount: 1250.0,
        checkNumber: "CHK-001",
        status: "Pending",
        memo: "Office Supplies Payment",
        isActive: true,
        isDeleted: false,
        createdAt: new Date("2024-01-15T10:30:00Z"),
        updatedAt: new Date("2024-01-15T10:30:00Z"),
      },
      "XYZ Corporation - CHK-002": {
        vendorName: "XYZ Corporation",
        date: "2024-01-16",
        bankAccount: "Wells Fargo - 5678",
        amount: 2500.0,
        checkNumber: "CHK-002",
        status: "Issued",
        memo: "Software License Renewal",
        isActive: true,
        isDeleted: false,
        createdAt: new Date("2024-01-16T09:15:00Z"),
        updatedAt: new Date("2024-01-16T09:15:00Z"),
      },
      "Tech Solutions Inc. - CHK-003": {
        vendorName: "Tech Solutions Inc.",
        date: "2024-01-17",
        bankAccount: "Bank of America - 9012",
        amount: 1800.0,
        checkNumber: "CHK-003",
        status: "Cleared",
        memo: "IT Consulting Services",
        isActive: true,
        isDeleted: false,
        createdAt: new Date("2024-01-17T16:20:00Z"),
        updatedAt: new Date("2024-01-17T16:20:00Z"),
      },
      "Global Services Ltd. - CHK-004": {
        vendorName: "Global Services Ltd.",
        date: "2024-01-18",
        bankAccount: "Citibank - 3456",
        amount: 3200.0,
        checkNumber: "CHK-004",
        status: "Void",
        memo: "Marketing Campaign",
        isActive: false,
        isDeleted: false,
        createdAt: new Date("2024-01-18T12:00:00Z"),
        updatedAt: new Date("2024-01-18T12:00:00Z"),
      },
      "Premium Partners - CHK-005": {
        vendorName: "Premium Partners",
        date: "2024-01-19",
        bankAccount: "PNC Bank - 7890",
        amount: 950.0,
        checkNumber: "CHK-005",
        status: "Pending",
        memo: "Legal Services",
        isActive: true,
        isDeleted: false,
        createdAt: new Date("2024-01-19T08:30:00Z"),
        updatedAt: new Date("2024-01-19T08:30:00Z"),
      },
      "Innovation Labs - CHK-006": {
        vendorName: "Innovation Labs",
        date: "2024-01-20",
        bankAccount: "US Bank - 2345",
        amount: 1500.0,
        checkNumber: "CHK-006",
        status: "Issued",
        memo: "Research & Development",
        isActive: true,
        isDeleted: false,
        createdAt: new Date("2024-01-20T14:15:00Z"),
        updatedAt: new Date("2024-01-20T14:15:00Z"),
      },
    };

    return checkMap[checkName] || initialData;
  };

  const [checkData, setCheckData] = useState<CheckData>(
    getCheckData(selectedCheck)
  );

  const inputRef = useRef<HTMLInputElement>(null);

  // Update check data when selection changes
  useEffect(() => {
    setCheckData(getCheckData(selectedCheck));
  }, [selectedCheck]);

  // Focus input when dropdown opens
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    console.log("isViewPage", isViewPage);
  }, []);

  const handlePrintChecks = (checkData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Check Details",
        data: [checkData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          vendorName: "Vendor Name",
          date: "Date",
          bankAccount: "Bank Account",
          amount: "Amount",
          checkNumber: "Check Number",
          status: "Status",
          memo: "Memo",
          isActive: "Active Status",
          isDeleted: "Deleted Status",
          createdAt: "Created At",
          updatedAt: "Updated At",
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
      console.log("checkData on pdf click", checkData);
      const blob = await pdf(
        <GenericPDF
          data={[checkData]}
          title="Check Details"
          subtitle="Check Information"
        />
      ).toBlob();

      console.log("blob", blob);

      const url = URL.createObjectURL(blob);
      console.log("url", url);
      const a = document.createElement("a");
      a.href = url;
      a.download = "check-details.pdf";
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
    if (!date) return "–";

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

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <>
      <PageLayout
        title="Viewing Check"
        videoSrc={video}
        videoHeader="Tutorial video"
        onListClick={() => navigate("/checks")}
        listText="List"
        listPath="checks"
        activePage="view"
        popoverOptions={[
          {
            label: "Create",
            icon: <Plus className="w-5 h-5 text-green-600" />,
            onClick: () => navigate("/checks/create"),
          },
          {
            label: "Edit",
            icon: <Edit className="w-5 h-5 text-blue-600" />,
            onClick: () => navigate("/checks/edit/1"),
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
                  handlePrintChecks(checkData);
                }
              }
            : undefined
        }
      >
        <div dir={isRTL ? "rtl" : "ltr"} className="space-y-8">
          {/* Main form and check preview */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Check Information Section */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-8 pl-1">
                Check Information
              </h3>
              {/* Row 1: Check Selection, Vendor Name */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {canViewVendorName && (
                  <div className="mt-1">
                    <Autocomplete
                      options={checkOptions}
                      value={selectedCheck}
                      onValueChange={setSelectedCheck}
                      placeholder=" "
                      displayKey="check"
                      valueKey="check"
                      searchKey="check"
                      disabled={false}
                      className="w-full bg-gray-100 rounded-xl"
                      labelClassName="bg-gray-50 rounded-2xl"
                      labelText="Select Check"
                      inputClassName="border-none bg-stone-50 focus-visible:ring-offset-0 focus-visible:ring-0 focus-visible:border-2! focus-visible:border-blue-500"
                    />
                  </div>
                )}

                {canViewVendorName && (
                  <div className="">
                    <h3 className="font-normal mb-1 text-gray-600">
                      Vendor Name
                    </h3>
                    <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                      {displayValue(checkData.vendorName)}
                    </div>
                  </div>
                )}
              </div>

              {/* Row 2: Date, Bank Account */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {canViewDate && (
                  <div className="">
                    <h3 className="font-normal mb-1 text-gray-600">Date</h3>
                    <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                      {displayValue(checkData.date)}
                    </div>
                  </div>
                )}

                {canViewBankAccount && (
                  <div className="">
                    <h3 className="font-normal mb-1 text-gray-600">
                      Bank Account
                    </h3>
                    <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                      {displayValue(checkData.bankAccount)}
                    </div>
                  </div>
                )}
              </div>

              {/* Row 3: Amount, Check Number */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {canViewAmount && (
                  <div className="">
                    <h3 className="font-normal mb-1 text-gray-600">Amount</h3>
                    <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                      {displayValue(formatAmount(checkData.amount))}
                    </div>
                  </div>
                )}

                {canViewCheckNumber && (
                  <div className="">
                    <h3 className="font-normal mb-1 text-gray-600">
                      Check Number
                    </h3>
                    <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                      {displayValue(checkData.checkNumber)}
                    </div>
                  </div>
                )}
              </div>

              {/* Row 4: Status, Memo */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {canViewStatus && (
                  <div className="">
                    <h3 className="font-normal mb-1 text-gray-600">Status</h3>
                    <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                      {displayValue(checkData.status)}
                    </div>
                  </div>
                )}

                {canViewMemo && (
                  <div className="">
                    <h3 className="font-normal mb-1 text-gray-600">Memo</h3>
                    <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                      {displayValue(checkData.memo)}
                    </div>
                  </div>
                )}
              </div>

              {/* Row 5: Active, Deleted */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {canViewIsActive && (
                  <div className="flex flex-col">
                    <div className="">
                      <span className="text-[15px] text-gray-600">Active</span>
                    </div>
                    <div className="">
                      {checkData.isActive ? (
                        <span className="text-black font-bold text-[15px]">
                          Yes
                        </span>
                      ) : (
                        <span className="text-black-500 font-bold text-[15px]">
                          No
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {canViewIsDeleted && (
                  <div className="flex flex-col">
                    <div className="">
                      <span className="text-[15px] text-gray-600">Deleted</span>
                    </div>
                    <div className="">
                      {checkData.isDeleted ? (
                        <span className="text-black font-bold text-[15px]">
                          Yes
                        </span>
                      ) : (
                        <span className="text-black-500 font-bold text-[15px]">
                          No
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Row 6: Created At, Updated At */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="">
                  <h3 className="font-normal mb-1 text-gray-600">Created At</h3>
                  <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                    {displayValue(
                      checkData.createdAt
                        ? checkData.createdAt.toLocaleDateString()
                        : null
                    )}
                  </div>
                </div>

                <div className="">
                  <h3 className="font-normal mb-1 text-gray-600">Updated At</h3>
                  <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                    {displayValue(
                      checkData.updatedAt
                        ? checkData.updatedAt.toLocaleDateString()
                        : null
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Check Card Preview */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Check Preview
              </h3>
              <CheckCard
                vendorName={checkData.vendorName}
                date={checkData.date}
                bankAccount={checkData.bankAccount}
                amount={checkData.amount}
                checkNumber={checkData.checkNumber}
                memo={checkData.memo}
                className="w-full"
              />
            </div>
          </div>

          {/* Bill Payment Information Table */}
          <div className="space-y-6">
            <BillPaymentTable
              onPaymentSelect={(payments) => {
                // Calculate total amount from selected payments
                const totalAmount = payments.reduce(
                  (sum, payment) => sum + payment.amount,
                  0
                );
                // Note: In view mode, we don't update the form data
                console.log("Selected payments total:", totalAmount);
              }}
              className="w-full"
            />
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
          created: getRelativeTime(checkData.createdAt),
          updated: getRelativeTime(checkData.updatedAt),
          drafted: "–",
          deleted: "–",
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
