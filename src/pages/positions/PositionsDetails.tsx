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

type PositionsData = {
  positionName: string;
  positionDetails: string;
  isActive: boolean;
  isDraft: boolean;
  createdAt: Date | null;
  updatedAt: Date | null;
  isDeleted: boolean;
};

const initialData: PositionsData = {
  positionName: "Software Engineer",
  positionDetails: "Full-stack development with React and Node.js",
  isActive: true,
  isDraft: false,
  createdAt: new Date(),
  updatedAt: new Date(),
  isDeleted: false,
};

// Position options for autocomplete
const positionOptions = [
  "Software Engineer - Full-stack development with React and Node.js",
  "UI/UX Designer - Create user-centered design solutions",
  "Product Manager - Lead product strategy and development",
  "Data Analyst - Analyze business data and create reports",
  "DevOps Engineer - Manage infrastructure and deployment pipelines",
  "QA Engineer - Ensure software quality and testing",
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

export default function PositionsDetailsPage() {
  const navigate = useNavigate();
  const { isRTL } = useSelector((state: RootState) => state.language);

  const [keepChanges, setKeepChanges] = useState(false);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState(
    "Software Engineer - Full-stack development with React and Node.js"
  );
  const location = useLocation();
  const isViewPage = location.pathname.includes("/view");
  const [pdfChecked, setPdfChecked] = useState(false);
  const [printEnabled, setPrintEnabled] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  // get permission
  const canCreate: boolean = usePermission("positions", "create");
  const canView: boolean = usePermission("positions", "view");
  const canEdit: boolean = usePermission("positions", "edit");
  const canDelete: boolean = usePermission("positions", "delete");
  const canExport: boolean = usePermission("positions", "export");
  const canPdf: boolean = usePermission("positions", "pdf");
  const canPrint: boolean = usePermission("positions", "pdf");
  const canSeeHistory: boolean = usePermission("positions", "history");

  // Field-level permissions
  const canViewPositionName: boolean = usePermission(
    "positions",
    "view",
    "positionName"
  );
  const canViewPositionDetails: boolean = usePermission(
    "positions",
    "view",
    "positionDetails"
  );
  const canViewIsActive: boolean = usePermission(
    "positions",
    "view",
    "isActive"
  );
  const canViewIsDraft: boolean = usePermission("positions", "view", "isDraft");

  console.log("canCreate", canCreate);
  console.log("canView", canView);
  console.log("canEdit", canEdit);
  console.log("canDelete", canDelete);
  console.log("canExport", canExport);

  // Get position data based on selected position
  const getPositionData = (positionName: string): PositionsData => {
    const positionMap: Record<string, PositionsData> = {
      "Software Engineer - Full-stack development with React and Node.js": {
        positionName: "Software Engineer",
        positionDetails: "Full-stack development with React and Node.js",
        isActive: true,
        isDraft: false,
        createdAt: new Date("2024-01-15T10:30:00Z"),
        updatedAt: new Date("2024-01-20T14:45:00Z"),
        isDeleted: false,
      },
      "UI/UX Designer - Create user-centered design solutions": {
        positionName: "UI/UX Designer",
        positionDetails: "Create user-centered design solutions",
        isActive: true,
        isDraft: false,
        createdAt: new Date("2024-01-16T09:15:00Z"),
        updatedAt: new Date("2024-01-22T11:30:00Z"),
        isDeleted: false,
      },
      "Product Manager - Lead product strategy and development": {
        positionName: "Product Manager",
        positionDetails: "Lead product strategy and development",
        isActive: true,
        isDraft: false,
        createdAt: new Date("2024-01-17T16:20:00Z"),
        updatedAt: new Date("2024-01-25T13:45:00Z"),
        isDeleted: false,
      },
      "Data Analyst - Analyze business data and create reports": {
        positionName: "Data Analyst",
        positionDetails: "Analyze business data and create reports",
        isActive: true,
        isDraft: false,
        createdAt: new Date("2024-01-18T12:00:00Z"),
        updatedAt: new Date("2024-01-23T10:00:00Z"),
        isDeleted: false,
      },
      "DevOps Engineer - Manage infrastructure and deployment pipelines": {
        positionName: "DevOps Engineer",
        positionDetails: "Manage infrastructure and deployment pipelines",
        isActive: false,
        isDraft: false,
        createdAt: new Date("2024-01-19T08:30:00Z"),
        updatedAt: new Date("2024-01-26T10:00:00Z"),
        isDeleted: false,
      },
      "QA Engineer - Ensure software quality and testing": {
        positionName: "QA Engineer",
        positionDetails: "Ensure software quality and testing",
        isActive: true,
        isDraft: false,
        createdAt: new Date("2024-01-20T14:15:00Z"),
        updatedAt: new Date("2024-01-27T16:40:00Z"),
        isDeleted: false,
      },
    };

    return positionMap[positionName] || initialData;
  };

  const [positionData, setPositionData] = useState<PositionsData>(
    getPositionData(selectedPosition)
  );

  const inputRef = useRef<HTMLInputElement>(null);

  // Update position data when selection changes
  useEffect(() => {
    setPositionData(getPositionData(selectedPosition));
  }, [selectedPosition]);

  // Focus input when dropdown opens
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    console.log("isViewPage", isViewPage);
  }, []);

  const handlePrintPosition = (positionData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Position Details",
        data: [positionData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          positionName: "Position Name",
          positionDetails: "Position Details",
          isActive: "Active Status",
          isDraft: "Draft Status",
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
      console.log("positionData on pdf click", positionData);
      const blob = await pdf(
        <GenericPDF
          data={[positionData]}
          title="Position Details"
          subtitle="Position Information"
        />
      ).toBlob();

      console.log("blob", blob);

      const url = URL.createObjectURL(blob);
      console.log("url", url);
      const a = document.createElement("a");
      a.href = url;
      a.download = "position-details.pdf";
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
        title="Viewing Position Details"
        videoSrc={video}
        videoHeader="Tutorial video"
        onListClick={() => navigate("/positions")}
        listText="List"
        listPath="positions"
        activePage="view"
        popoverOptions={[
          {
            label: "Create",
            icon: <Plus className="w-5 h-5 text-green-600" />,
            onClick: () => navigate("/positions/create"),
          },
          {
            label: "Edit",
            icon: <Edit className="w-5 h-5 text-blue-600" />,
            onClick: () => navigate("/positions/edit/1"),
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
                  handlePrintPosition(positionData);
                }
              }
            : undefined
        }
      >
        <div dir={isRTL ? "rtl" : "ltr"}>
          {/* Row 1: Position Name, Position Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            {canViewPositionName && (
              <div className="mt-1">
                <Autocomplete
                  options={positionOptions}
                  value={selectedPosition}
                  onValueChange={setSelectedPosition}
                  placeholder=" "
                  displayKey="position"
                  valueKey="position"
                  searchKey="position"
                  disabled={false}
                  className="w-[96%] bg-gray-100 rounded-xl"
                  labelClassName="bg-gray-50 rounded-2xl"
                  labelText="Select Position"
                  inputClassName="border-none bg-stone-50 focus-visible:ring-offset-0 focus-visible:ring-0 focus-visible:border-2! focus-visible:border-blue-500"
                />
              </div>
            )}

            {canViewPositionDetails && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">
                  Position Details
                </h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(positionData.positionDetails)}
                </div>
              </div>
            )}
          </div>

          {/* Row 2: Active Status, Draft Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {canViewIsActive && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">
                  Active Status
                </h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(positionData.isActive ? "Active" : "Inactive")}
                </div>
              </div>
            )}

            {canViewIsDraft && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Draft Status</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(positionData.isDraft ? "Yes" : "No")}
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
          created: getRelativeTime(positionData.createdAt),
          updated: getRelativeTime(positionData.updatedAt),
          drafted: getRelativeTime(positionData.createdAt), // Assuming draftedAt is not used in this context
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
