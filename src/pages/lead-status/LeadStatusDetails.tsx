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

const MOCK_LEAD_STATUSES = [
  {
    id: "1",
    name: "New",
    order: 1,
    color: "#3B82F6",
    status: "Active",
  },
  {
    id: "2",
    name: "Contacted",
    order: 2,
    color: "#06B6D4",
    status: "Active",
  },
  {
    id: "3",
    name: "Qualified",
    order: 3,
    color: "#10B981",
    status: "Draft",
  },
  {
    id: "4",
    name: "Proposal Sent",
    order: 4,
    color: "#8B5CF6",
    status: "InActive",
  },
  {
    id: "5",
    name: "Negotiation",
    order: 5,
    color: "#F59E0B",
    status: "Active",
  },
  {
    id: "6",
    name: "Won",
    order: 6,
    color: "#22C55E",
    status: "Active",
  },
  {
    id: "7",
    name: "Lost",
    order: 7,
    color: "#EF4444",
    status: "Active",
  },
  {
    id: "8",
    name: "On Hold",
    order: 8,
    color: "#64748B",
    status: "Active",
  },
  {
    id: "9",
    name: "Re-engage",
    order: 9,
    color: "#A78BFA",
    status: "Active",
  },
  {
    id: "10",
    name: "No Response",
    order: 10,
    color: "#94A3B8",
    status: "Active",
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

export default function LeadStatusDetailsPage() {
  // const { t } = useTranslation();
  const navigate = useNavigate();

  const [keepChanges, setKeepChanges] = useState(false);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [selectedLeadStatus, setSelectedLeadStatus] = useState("1");
  const location = useLocation();
  const isViewPage = location.pathname.includes("/view");
  const [pdfChecked, setPdfChecked] = useState(false);
  const [printEnabled, setPrintEnabled] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  // Permission checks
  // const { canCreate, canView, canEdit, canDelete } = useUserMasterPermissions();

  // Field-level permissions
  const canPdf: boolean = usePermission("lead-status", "pdf");
  const canPrint: boolean = usePermission("lead-status", "print");
  const canSeeHistory: boolean = usePermission("lead-status", "history");

  let leadStatusData = {
    id: selectedLeadStatus,
    name:
      MOCK_LEAD_STATUSES.find((ls) => ls.id === selectedLeadStatus)?.name ||
      "New",
    order:
      MOCK_LEAD_STATUSES.find((ls) => ls.id === selectedLeadStatus)?.order || 1,
    color:
      MOCK_LEAD_STATUSES.find((ls) => ls.id === selectedLeadStatus)?.color ||
      "#3B82F6",
    isDefault: true,
    isActive: true,
    isDraft: false,
    isDeleted: false,
    status:
      MOCK_LEAD_STATUSES.find((ls) => ls.id === selectedLeadStatus)?.status ||
      "Active",
    createdAt: "2023-05-15T10:30:00Z",
    updatedAt: "2025-01-15T14:30:00Z",
    draftedAt: "2025-05-20T14:45:00Z",
    deletedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(),
  };

  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when dropdown opens
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    console.log("isViewPage", isViewPage);
    if (isViewPage) {
      leadStatusData = {
        id: selectedLeadStatus,
        name: "",
        order: 1,
        color: "#3B82F6",
        isDefault: true,
        isActive: true,
        isDraft: false,
        isDeleted: false,
        status: "Active",
        createdAt: "",
        updatedAt: "",
        draftedAt: "",
        deletedAt: "",
      };
    }
  }, []);

  const handlePrintLeadStatus = (leadStatusData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Lead Status Master Details",
        data: [leadStatusData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          name: "Name",
          order: "Order",
          color: "Color",
          isDefault: "Default Lead Status",
          isActive: "Active Status",
          isDraft: "Draft Status",
          isDeleted: "Deleted Status",
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
      console.log("leadStatusData on pdf click", leadStatusData);
      const blob = await pdf(
        <GenericPDF
          data={[leadStatusData]}
          title="Lead Status Master Details"
          subtitle="Lead Status Information"
        />
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "lead-status-details.pdf";
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
        moduleId="lead-status-details-module"
        moduleName="Lead Status Details"
        moduleRoute="/lead-status/view"
        title="Viewing Lead Status"
        videoSrc={video}
        videoHeader="Tutorial video"
        listPath="lead-status"
        activePage="view"
        module="lead-status"
        popoverOptions={[
          {
            label: "Create",
            icon: <Plus className="w-5 h-5 text-green-600" />,
            onClick: () => navigate("/lead-status/create"),
          },
          {
            label: "Edit",
            icon: <Edit className="w-5 h-5 text-blue-600" />,
            onClick: () => navigate("/lead-status/edit/1"),
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
                  handlePrintLeadStatus(leadStatusData);
                }
              }
            : undefined
        }
      >
        {/* Row 1: Lead Status Selection, Name, Order, Color */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="mt-1">
            <Autocomplete
              options={MOCK_LEAD_STATUSES}
              value={selectedLeadStatus}
              onValueChange={setSelectedLeadStatus}
              placeholder=" "
              displayKey="name"
              valueKey="id"
              searchKey="name"
              disabled={false}
              className="w-[96%] bg-gray-100 rounded-xl"
              labelClassName="bg-gray-50 rounded-2xl"
              labelText="Lead Status Name"
              isShowTemplateIcon={false}
            />
          </div>
          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">Order</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(leadStatusData.order)}
            </div>
          </div>
          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">Color</h3>
            </div>
            <div className="flex items-center gap-2">
              <div
                className="w-6 h-6 rounded-full border border-gray-300"
                style={{ backgroundColor: leadStatusData.color }}
              />
              <span className="text-gray-900 text-md dark:text-white">
                {displayValue(leadStatusData.color)}
              </span>
            </div>
          </div>
          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">Status</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(leadStatusData.status)}
            </div>
          </div>

          <div className="">
            <div className="flex flex-col">
              <div className="">
                <span className="text-[15px] text-gray-600">Default</span>
              </div>
              <div className="">
                {leadStatusData.isDefault ? (
                  <span className="text-black text-[15px]">Yes</span>
                ) : (
                  <span className="text-black text-[15px]">No</span>
                )}
              </div>
            </div>
          </div>

          <div className="">
            <h3 className="font-normal mb-1 text-gray-600">Action</h3>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              Updated
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
          created: getRelativeTime(leadStatusData.createdAt),
          updated: getRelativeTime(leadStatusData.updatedAt),
          drafted: getRelativeTime(leadStatusData.draftedAt),
          deleted: getRelativeTime(leadStatusData.deletedAt),
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
