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

type TermsData = {
  branch: string;
  transferFrom: string;
  transferTo: string;
  transferAmount: string;

  isDefault: boolean;
  isActive: boolean;
  isDraft: boolean;
  createdAt: Date | null;
  draftedAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;
  isDeleted: boolean;
};

const initialData: TermsData = {
  branch: "Dhaka Main",
  transferFrom: "UCB Bank",
  transferTo: "Cash Register",
  transferAmount: "8089",

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
const projectTypeOptions = ["Dhaka Main", "UCB Bank", "Cash Register"];

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

export default function CashDetails() {
  const navigate = useNavigate();
  const { isRTL } = useSelector((state: RootState) => state.language);

  const [keepChanges, setKeepChanges] = useState(false);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [selectedLeaveType, setSelectedLeaveType] = useState("Dhaka Main");
  const location = useLocation();
  const isViewPage = location.pathname.includes("/view");
  const [pdfChecked, setPdfChecked] = useState(false);
  const [printEnabled, setPrintEnabled] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  // get permission
  const canCreate: boolean = usePermission("transferCash", "create");
  const canView: boolean = usePermission("transferCash", "view");
  const canEdit: boolean = usePermission("transferCash", "edit");
  const canDelete: boolean = usePermission("transferCash", "delete");
  const canExport: boolean = usePermission("transferCash", "export");
  const canPdf: boolean = usePermission("transferCash", "pdf");
  const canPrint: boolean = usePermission("transferCash", "print");
  const canSeeHistory: boolean = usePermission("transferCash", "history");

  // Field-level permissions
  const canViewBranch: boolean = usePermission(
    "transferCash",
    "view",
    "branch"
  );
  const canViewTransferFrom: boolean = usePermission(
    "transferCash",
    "view",
    "transferFrom"
  );
  const canViewTransferTo: boolean = usePermission(
    "transferCash",
    "view",
    "transferTo"
  );
  const canViewTransferAmount: boolean = usePermission(
    "transferCash",
    "view",
    "transferAmount"
  );

  console.log("canCreate", canCreate);
  console.log("canView", canView);
  console.log("canEdit", canEdit);
  console.log("canDelete", canDelete);
  console.log("canExport", canExport);

  // Get leaves data based on selected leave type
  const getLeavesData = (leaveType: string): TermsData => {
    const leavesMap: Record<string, TermsData> = {
      "Dhaka Main": {
        branch: "Dhaka Main",
        transferFrom: "UCB Bank",
        transferTo: "Cash Register",
        transferAmount: "8089",

        isDefault: false,
        isActive: true,
        isDraft: false,
        createdAt: new Date("2024-01-15T10:30:00Z"),
        draftedAt: null,
        updatedAt: new Date("2024-01-20T14:45:00Z"),
        deletedAt: null,
        isDeleted: false,
      },
      "UCB Bank": {
        branch: "UCB Bank",
        transferFrom: "Cash Register",
        transferTo: "Cash Register",
        transferAmount: "8089",

        isDefault: true,
        isActive: true,
        isDraft: false,
        createdAt: new Date("2024-01-16T09:15:00Z"),
        draftedAt: null,
        updatedAt: new Date("2024-01-21T11:30:00Z"),
        deletedAt: null,
        isDeleted: false,
      },
      "Cash Register": {
        branch: "Cash Register",
        transferFrom: "Cash Register",
        transferTo: "Cash Register",
        transferAmount: "8089",

        isDefault: false,
        isActive: false,
        isDraft: false,
        createdAt: new Date("2024-01-17T16:20:00Z"),
        draftedAt: null,
        updatedAt: new Date("2024-01-22T13:45:00Z"),
        deletedAt: null,
        isDeleted: false,
      },
    };

    return leavesMap[leaveType] || initialData;
  };

  const [leavesData, setLeavesData] = useState<TermsData>(
    getLeavesData(selectedLeaveType)
  );

  const inputRef = useRef<HTMLInputElement>(null);

  // Update leaves data when selection changes
  useEffect(() => {
    setLeavesData(getLeavesData(selectedLeaveType));
  }, [selectedLeaveType]);

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
        title: "Transfer Cash Details",
        data: [leavesData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          branch: "Branch",
          transferFrom: "Transfer From",
          transferTo: "Transfer To",
          transferAmount: "Transfer Amount",
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
      console.log("pdf click", leavesData);
      const blob = await pdf(
        <GenericPDF
          data={[leavesData]}
          title="Transfer Cash Details"
          subtitle="Transfer Cash Information"
        />
      ).toBlob();

      console.log("blob", blob);

      const url = URL.createObjectURL(blob);
      console.log("url", url);
      const a = document.createElement("a");
      a.href = url;
      a.download = "transfer-cash-details.pdf";
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
        title="Viewing Transfer Cash"
        videoSrc={video}
        videoHeader="Tutorial video"
        onListClick={() => navigate("/transfer-cash")}
        listText="List"
        listPath="transfer-cash"
        activePage="view"
        popoverOptions={[
          {
            label: "Create",
            icon: <Plus className="w-5 h-5 text-green-600" />,
            onClick: () => navigate("/transfer-cash/create"),
          },
          {
            label: "Edit",
            icon: <Edit className="w-5 h-5 text-blue-600" />,
            onClick: () => navigate("/transfer-cash/edit/1"),
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
            {canViewBranch && (
              <div className="mt-1">
                <Autocomplete
                  options={projectTypeOptions}
                  value={selectedLeaveType}
                  onValueChange={setSelectedLeaveType}
                  placeholder=" "
                  displayKey="branch"
                  valueKey="branch"
                  searchKey="branch"
                  disabled={false}
                  className="w-[96%] bg-gray-100 rounded-xl"
                  labelClassName="bg-gray-50 rounded-2xl"
                  labelText="Branch"
                  inputClassName="border-none bg-stone-50 focus-visible:ring-offset-0 focus-visible:ring-0 focus-visible:border-2! focus-visible:border-blue-500"
                />
              </div>
            )}

            {canViewTransferFrom && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">
                  Transfer From
                </h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(leavesData.transferFrom)}
                </div>
              </div>
            )}

            {canViewTransferTo && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Transfer To</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(leavesData.transferTo)}
                </div>
              </div>
            )}

            {canViewTransferAmount && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">
                  Transfer Amount
                </h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(leavesData.transferAmount)}
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
