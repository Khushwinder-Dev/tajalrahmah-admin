/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
// import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { Autocomplete } from "@/components/common/Autocomplete";
import HistoryDataTable from "@/components/common/HistoryDataTableNew";
import { mockHistoryData } from "@/mockData/country-mockdata";
import video from "@/assets/videos/test.mp4";
import { printHtmlContent } from "@/lib/printHtmlContent";
import { PrintCommonLayout } from "@/lib/printContents/PrintCommonLayout";
import { toastError } from "@/lib/toast";
import GenericPDF from "@/components/common/pdf";
import { pdf } from "@react-pdf/renderer";
import { ResetFormModal } from "@/components/common/ResetFormModal";
import { usePermission } from "@/hooks/usePermissions";
import MinimizablePageLayout from "@/components/MinimizablePageLayout";

const MOCK_LEAVES = [
  {
    id: "1",
    leaveType: "Annual Leave",
    branch: "Main Branch",
    employee: "John Doe",
    fromDate: "2025-10-10",
    endDate: "2025-10-15",
    totalDays: 5,
    hardCopy: true,
    approvedBy: "Manager A",
    status: "Approved",
  },
  {
    id: "2",
    leaveType: "Sick Leave",
    branch: "Branch B",
    employee: "Jane Smith",
    fromDate: "2025-10-08",
    endDate: "2025-10-09",
    totalDays: 2,
    hardCopy: false,
    approvedBy: "Manager B",
    status: "Pending",
  },
  {
    id: "3",
    leaveType: "Maternity Leave",
    branch: "Main Branch",
    employee: "Sarah Johnson",
    fromDate: "2025-10-20",
    endDate: "2025-12-20",
    totalDays: 60,
    hardCopy: true,
    approvedBy: "Manager A",
    status: "Approved",
  },
  {
    id: "4",
    leaveType: "Paternity Leave",
    branch: "Branch C",
    employee: "Mike Wilson",
    fromDate: "2025-10-15",
    endDate: "2025-10-22",
    totalDays: 7,
    hardCopy: true,
    approvedBy: "Manager C",
    status: "Approved",
  },
  {
    id: "5",
    leaveType: "Emergency Leave",
    branch: "Branch B",
    employee: "Emily Brown",
    fromDate: "2025-10-07",
    endDate: "2025-10-08",
    totalDays: 1,
    hardCopy: false,
    approvedBy: "Manager B",
    status: "Rejected",
  },
  {
    id: "6",
    leaveType: "Study Leave",
    branch: "Main Branch",
    employee: "David Lee",
    fromDate: "2025-11-01",
    endDate: "2025-11-10",
    totalDays: 10,
    hardCopy: true,
    approvedBy: "Manager A",
    status: "Pending",
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

export default function LeaveDetailsPage() {
  // const { t } = useTranslation();
  const [keepChanges, setKeepChanges] = useState(false);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [selectedLeave, setSelectedLeave] = useState("1");
  const location = useLocation();
  const isViewPage = location.pathname.includes("/view");
  const [pdfChecked, setPdfChecked] = useState(false);
  const [printEnabled, setPrintEnabled] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  // Permission checks
  // const { canCreate, canView, canEdit, canDelete } = useUserMasterPermissions();

  // Field-level permissions
  const canPdf: boolean = usePermission("leaves", "pdf");
  const canPrint: boolean = usePermission("leaves", "print");
  const canSeeHistory: boolean = usePermission("leaves", "history");

  let reportData = {
    id: selectedLeave,
    leaveType:
      MOCK_LEAVES.find((r) => r.id === selectedLeave)?.leaveType ||
      "Annual Leave",
    branch:
      MOCK_LEAVES.find((r) => r.id === selectedLeave)?.branch || "Main Branch",
    employee:
      MOCK_LEAVES.find((r) => r.id === selectedLeave)?.employee || "John Doe",
    fromDate:
      MOCK_LEAVES.find((r) => r.id === selectedLeave)?.fromDate || "2025-10-10",
    endDate:
      MOCK_LEAVES.find((r) => r.id === selectedLeave)?.endDate || "2025-10-15",
    totalDays: MOCK_LEAVES.find((r) => r.id === selectedLeave)?.totalDays || 5,
    hardCopy: MOCK_LEAVES.find((r) => r.id === selectedLeave)?.hardCopy ?? true,
    approvedBy:
      MOCK_LEAVES.find((r) => r.id === selectedLeave)?.approvedBy ||
      "Manager A",
    status:
      MOCK_LEAVES.find((r) => r.id === selectedLeave)?.status || "Approved",
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
        id: selectedLeave,
        leaveType: "",
        branch: "",
        employee: "",
        fromDate: "",
        endDate: "",
        totalDays: 0,
        hardCopy: false,
        approvedBy: "",
        status: "",
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
        title: "Leave Approval Details",
        data: [report],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          leaveType: "Leave Type",
          branch: "Branch",
          employee: "Employee",
          fromDate: "From Date",
          endDate: "End Date",
          totalDays: "Total Days",
          hardCopy: "Hard Copy",
          approvedBy: "Approved By",
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
          title="Leave Approval Details"
          subtitle="Leave Approval Information"
        />
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "leave-approval-details.pdf";
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
        moduleId="leaves-approval-details-module"
        moduleName="Leave Approval Details"
        moduleRoute="/leaves-approval/view"
        title="Viewing Leave Approval"
        videoSrc={video}
        videoHeader="Tutorial video"
        listPath="leaves-approval"
        activePage="view"
        module="leaves-approval"
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
        {/* Row 1: Leave Selection, Leave Type, Branch, Employee */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="mt-1">
            <Autocomplete
              options={MOCK_LEAVES}
              value={selectedLeave}
              onValueChange={setSelectedLeave}
              placeholder=" "
              displayKey="leaveType"
              valueKey="id"
              searchKey="leaveType"
              disabled={false}
              className="w-[96%] bg-gray-100 rounded-xl"
              labelClassName="bg-gray-50 rounded-2xl"
              labelText="Leave"
              isShowTemplateIcon={false}
            />
          </div>

          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">Leave Type</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(reportData.leaveType)}
            </div>
          </div>

          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">Branch</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(reportData.branch)}
            </div>
          </div>

          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">Employee</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(reportData.employee)}
            </div>
          </div>
        </div>

        {/* Row 2: From Date, End Date, Total Days, Hard Copy */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">From Date</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(reportData.fromDate)}
            </div>
          </div>

          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">End Date</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(reportData.endDate)}
            </div>
          </div>

          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">Total Days</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(reportData.totalDays)}
            </div>
          </div>

          <div className="">
            <div className="flex flex-col">
              <div className="">
                <span className="text-[15px] text-gray-600">Hard Copy</span>
              </div>
              <div className="">
                {reportData.hardCopy ? (
                  <span className="text-black text-[15px]">Yes</span>
                ) : (
                  <span className="text-black text-[15px]">No</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Row 3: Approved By, Status */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">Approved By</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(reportData.approvedBy)}
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
        </div>
      </MinimizablePageLayout>

      {/* History Modal */}
      <HistoryDataTable
        isOptionModalOpen={isOptionModalOpen}
        setIsOptionModalOpen={setIsOptionModalOpen}
        columnData={mockHistoryData}
        title="Leave Approval History"
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
