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

type DeductionsData = {
  date: string;
  iqamaNo: string;
  branch: string;

  permittedBy: string;
  approvedDate: string;
  repaymentFrom: string;

  amount: string;
  interestPercentage: string;
  installmentPeriod: string;

  repaymentAmount: string;
  installment: string;
  status: string;
  loanDetails: string;

  isDefault: boolean;
  isActive: boolean;
  isDraft: boolean;
  createdAt: Date | null;
  draftedAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;
  isDeleted: boolean;
};

const initialData: DeductionsData = {
  date: "2025-08-01",
  iqamaNo: "1234567890",
  branch: "Dhaka",
  permittedBy: "HR Manager",
  approvedDate: "2025-08-02",
  repaymentFrom: "2025-09-01",
  amount: "20000",
  interestPercentage: "5",
  installmentPeriod: "6",
  repaymentAmount: "3500",
  installment: "Monthly",
  status: "Active",
  loanDetails: "Short-term emergency loan",
  isDefault: false,
  isActive: true,
  isDraft: false,
  createdAt: new Date(),
  draftedAt: null,
  updatedAt: new Date(),
  deletedAt: null,
  isDeleted: false,
};

// Leave Types options for autocomplete
const allowanceIqamaNoOptions = [
  "1234567890",
  "2345678901",
  "3456789012",
  "4567890123",
  "5678901234",
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

export default function LoansDetails() {
  const navigate = useNavigate();
  const { isRTL } = useSelector((state: RootState) => state.language);

  const [keepChanges, setKeepChanges] = useState(false);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [selectedAllowanceIqamaNo, setSelectedAllowanceIqamaNo] =
    useState("1234567890");
  const location = useLocation();
  const isViewPage = location.pathname.includes("/view");
  const [pdfChecked, setPdfChecked] = useState(false);
  const [printEnabled, setPrintEnabled] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  // get permission
  const canCreate: boolean = usePermission("loans", "create");
  const canView: boolean = usePermission("loans", "view");
  const canEdit: boolean = usePermission("loans", "edit");
  const canDelete: boolean = usePermission("loans", "delete");
  const canExport: boolean = usePermission("loans", "export");
  const canPdf: boolean = usePermission("loans", "pdf");
  const canPrint: boolean = usePermission("loans", "print");
  const canSeeHistory: boolean = usePermission("loans", "history");

  // Field-level permissions
  const date: boolean = usePermission("loans", "create", "date");
  const iqamaNo: boolean = usePermission("loans", "create", "iqamaNo");
  const branch: boolean = usePermission("loans", "create", "branch");
  const permittedBy: boolean = usePermission("loans", "create", "permittedBy");
  const approvedDate: boolean = usePermission(
    "loans",
    "create",
    "approvedDate"
  );
  const repaymentFrom: boolean = usePermission(
    "loans",
    "create",
    "repaymentFrom"
  );
  const amount: boolean = usePermission("loans", "create", "amount");
  const interestPercentage: boolean = usePermission(
    "loans",
    "create",
    "interestPercentage"
  );
  const installmentPeriod: boolean = usePermission(
    "loans",
    "create",
    "installmentPeriod"
  );
  const repaymentAmount: boolean = usePermission(
    "loans",
    "create",
    "repaymentAmount"
  );
  const installment: boolean = usePermission("loans", "create", "installment");
  const status: boolean = usePermission("loans", "create", "status");
  const loanDetails: boolean = usePermission("loans", "create", "loanDetails");

  const canViewIsDefault: boolean = usePermission("loans", "view", "isDefault");
  const canViewIsActive: boolean = usePermission("loans", "view", "isActive");
  const canViewIsDraft: boolean = usePermission("loans", "view", "isDraft");
  const canViewIsDeleted: boolean = usePermission("loans", "view", "isDeleted");

  console.log("canCreate", canCreate);
  console.log("canView", canView);
  console.log("canEdit", canEdit);
  console.log("canDelete", canDelete);
  console.log("canExport", canExport);

  // Get leaves data based on selected leave type
  const getLeavesData = (leaveType: string): DeductionsData => {
    const leavesMap: Record<string, DeductionsData> = {
      "1234567890": {
        iqamaNo: "1234567890",
        branch: "Dhaka",
        date: "2025-08-01",
        permittedBy: "HR Manager",
        approvedDate: "2025-08-02",
        repaymentFrom: "2025-09-01",
        amount: "20000",
        interestPercentage: "5",
        installmentPeriod: "6",
        repaymentAmount: "3500",
        installment: "Monthly",
        status: "Active",
        loanDetails: "Short-term emergency loan",
        isDefault: false,
        isActive: true,
        isDraft: false,
        createdAt: new Date("2024-01-15T10:30:00Z"),
        draftedAt: null,
        updatedAt: new Date("2024-01-20T14:45:00Z"),
        deletedAt: null,
        isDeleted: false,
      },
      "2345678901": {
        iqamaNo: "2345678901",
        branch: "Dhaka",
        permittedBy: "HR Manager",
        approvedDate: "2025-08-02",
        repaymentFrom: "2025-09-01",
        amount: "20000",
        interestPercentage: "5",
        installmentPeriod: "6",
        date: "2025-08-01",
        repaymentAmount: "3500",
        installment: "Monthly",
        status: "Active",
        loanDetails: "Short-term emergency loan",
        isDefault: true,
        isActive: true,
        isDraft: false,
        createdAt: new Date("2024-01-16T09:15:00Z"),
        draftedAt: null,
        updatedAt: new Date("2024-01-21T11:30:00Z"),
        deletedAt: null,
        isDeleted: false,
      },
      "3456789012": {
        iqamaNo: "3456789012",
        branch: "Dhaka",
        permittedBy: "HR Manager",
        approvedDate: "2025-08-02",
        repaymentFrom: "2025-09-01",
        amount: "20000",
        interestPercentage: "5",
        installmentPeriod: "6",
        date: "2025-08-01",
        repaymentAmount: "3500",
        installment: "Monthly",
        status: "Active",
        loanDetails: "Short-term emergency loan",
        isDefault: false,
        isActive: false,
        isDraft: false,
        createdAt: new Date("2024-01-17T16:20:00Z"),
        draftedAt: null,
        updatedAt: new Date("2024-01-22T13:45:00Z"),
        deletedAt: null,
        isDeleted: false,
      },
      "4567890123": {
        iqamaNo: "4567890123",
        branch: "Dhaka",
        permittedBy: "HR Manager",
        approvedDate: "2025-08-02",
        repaymentFrom: "2025-09-01",
        amount: "20000",
        interestPercentage: "5",
        installmentPeriod: "6",
        date: "2025-08-01",
        repaymentAmount: "3500",
        installment: "Yearly",
        status: "Active",
        loanDetails: "Short-term Basic loan",
        isDefault: false,
        isActive: true,
        isDraft: true,
        createdAt: new Date("2024-01-18T12:00:00Z"),
        draftedAt: new Date("2024-01-25T10:00:00Z"),
        updatedAt: new Date("2024-01-25T10:00:00Z"),
        deletedAt: null,
        isDeleted: false,
      },
    };

    return leavesMap[leaveType] || initialData;
  };

  const [leavesData, setLeavesData] = useState<DeductionsData>(
    getLeavesData(selectedAllowanceIqamaNo)
  );

  const inputRef = useRef<HTMLInputElement>(null);

  // Update leaves data when selection changes
  useEffect(() => {
    setLeavesData(getLeavesData(selectedAllowanceIqamaNo));
  }, [selectedAllowanceIqamaNo]);

  // Focus input when dropdown opens
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    console.log("isViewPage", isViewPage);
  }, []);

  const handlePrintLeaves = (leavesData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Loan Details",
        data: [leavesData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          iqamaNo: "Iqama No",
          branch: "Branch",
          permittedBy: "Permitted By",
          approvedDate: "Approved Date",
          repaymentFrom: "Repayment From",
          amount: "Amount",
          interestPercentage: "Interest Percentage",
          installmentPeriod: "Installment Period",
          repaymentAmount: "Repayment Amount",
          installment: "Installment",
          status: "Status",
          loanDetails: "Loan Details",
          date: "Date",
          isDefault: "Default Leave",
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
      console.log("leavesData on pdf click", leavesData);
      const blob = await pdf(
        <GenericPDF
          data={[leavesData]}
          title="Loan Details"
          subtitle="Loan Information"
        />
      ).toBlob();

      console.log("blob", blob);

      const url = URL.createObjectURL(blob);
      console.log("url", url);
      const a = document.createElement("a");
      a.href = url;
      a.download = "loan-details.pdf";
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

  return (
    <>
      <PageLayout
        title="Viewing Loan"
        videoSrc={video}
        videoHeader="Tutorial video"
        onListClick={() => navigate("/loans")}
        listText="List"
        listPath="loans"
        activePage="view"
        popoverOptions={[
          {
            label: "Create",
            icon: <Plus className="w-5 h-5 text-green-600" />,
            onClick: () => navigate("/loans/create"),
          },
          {
            label: "Edit",
            icon: <Edit className="w-5 h-5 text-blue-600" />,
            onClick: () => navigate("/loans/edit/1"),
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
                  handlePrintLeaves(leavesData);
                }
              }
            : undefined
        }
      >
        <div dir={isRTL ? "rtl" : "ltr"}>
          {/* Row 1: Leave Types, Notes */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            {iqamaNo && (
              <div className="mt-1">
                <Autocomplete
                  options={allowanceIqamaNoOptions}
                  value={selectedAllowanceIqamaNo}
                  onValueChange={setSelectedAllowanceIqamaNo}
                  placeholder=" "
                  displayKey="iqamaNo"
                  valueKey="iqamaNo"
                  searchKey="iqamaNo"
                  disabled={false}
                  className="w-[96%] bg-gray-100 rounded-xl"
                  labelClassName="bg-gray-50 rounded-2xl"
                  labelText="Deduction Types"
                  inputClassName="border-none bg-stone-50 focus-visible:ring-offset-0 focus-visible:ring-0 focus-visible:border-2! focus-visible:border-blue-500"
                />
              </div>
            )}

            {date && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Date</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(leavesData.date)}
                </div>
              </div>
            )}

            {branch && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Branch</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(leavesData.branch)}
                </div>
              </div>
            )}
            {permittedBy && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Permitted By</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(leavesData.permittedBy)}
                </div>
              </div>
            )}

            {approvedDate && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">
                  Approved Date
                </h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(leavesData.approvedDate)}
                </div>
              </div>
            )}

            {repaymentFrom && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">
                  Repayment From
                </h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(leavesData.repaymentFrom)}
                </div>
              </div>
            )}

            {amount && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Amount</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(leavesData.amount)}
                </div>
              </div>
            )}

            {interestPercentage && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">
                  Interest Percentage
                </h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(leavesData.interestPercentage)}
                </div>
              </div>
            )}

            {installmentPeriod && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">
                  Installment Period
                </h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(leavesData.installmentPeriod)}
                </div>
              </div>
            )}

            {repaymentAmount && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">
                  Repayment Amount
                </h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(leavesData.repaymentAmount)}
                </div>
              </div>
            )}

            {installment && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Installment</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(leavesData.installment)}
                </div>
              </div>
            )}

            {loanDetails && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Loan Details</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(leavesData.loanDetails)}
                </div>
              </div>
            )}

            {status && (
              <div className="flex flex-col">
                <div className="">
                  <span className="text-[15px] text-gray-600">Loan Status</span>
                </div>
                <div className="">
                  {leavesData.status === "Active" ? (
                    <span className="text-black font-bold text-[15px]">
                      Active
                    </span>
                  ) : (
                    <span className="text-black font-bold text-[15px]">
                      Inactive
                    </span>
                  )}
                </div>
              </div>
            )}

            {canViewIsDefault && (
              <div className="flex flex-col">
                <div className="">
                  <span className="text-[15px] text-gray-600">Default</span>
                </div>
                <div className="">
                  {leavesData.isDefault ? (
                    <span className="text-black font-bold text-[15px]">
                      Yes
                    </span>
                  ) : (
                    <span className="text-black font-bold text-[15px]">No</span>
                  )}
                </div>
              </div>
            )}

            {canViewIsDraft && (
              <div className="flex flex-col">
                <div className="">
                  <span className="text-[15px] text-gray-600">Draft</span>
                </div>
                <div className="">
                  {leavesData.isDraft ? (
                    <span className="text-black font-bold text-[15px]">
                      Yes
                    </span>
                  ) : (
                    <span className="text-black font-bold text-[15px]">No</span>
                  )}
                </div>
              </div>
            )}
            {canViewIsActive && (
              <div className="flex flex-col">
                <div className="">
                  <span className="text-[15px] text-gray-600">Inactive</span>
                </div>
                <div className="">
                  {!leavesData.isActive ? (
                    <span className="text-black font-bold text-[15px]">
                      Yes
                    </span>
                  ) : (
                    <span className="text-black font-bold text-[15px]">No</span>
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
                  {leavesData.isDeleted ? (
                    <span className="text-black font-bold text-[15px]">
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
          created: getRelativeTime(leavesData.createdAt),
          updated: getRelativeTime(leavesData.updatedAt),
          drafted: getRelativeTime(leavesData.draftedAt),
          deleted: getRelativeTime(leavesData.deletedAt),
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
