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

type ComplementariesData = {
  roomType: string;
  complementary: string;
  rate: number;
  isDraft: boolean;
  createdAt: Date | null;
  updatedAt: Date | null;
  isDeleted: boolean;
};

const initialData: ComplementariesData = {
  roomType: "Standard Room",
  complementary: "Breakfast",
  rate: 25.0,
  isDraft: false,
  createdAt: new Date(),
  updatedAt: new Date(),
  isDeleted: false,
};

// Complementary options for autocomplete
const complementaryOptions = [
  "Standard Room - Breakfast",
  "Deluxe Room - Airport Transfer",
  "Suite - Spa Access",
  "Executive Room - Lounge Access",
  "Family Room - Kids Club",
  "Presidential Suite - Butler Service",
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

export default function ComplementariesDetailsPage() {
  const navigate = useNavigate();
  const { isRTL } = useSelector((state: RootState) => state.language);

  const [keepChanges, setKeepChanges] = useState(false);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [selectedComplementary, setSelectedComplementary] = useState(
    "Standard Room - Breakfast"
  );
  const location = useLocation();
  const isViewPage = location.pathname.includes("/view");
  const [pdfChecked, setPdfChecked] = useState(false);
  const [printEnabled, setPrintEnabled] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  // get permission
  const canCreate: boolean = usePermission("complementaries", "create");
  const canView: boolean = usePermission("complementaries", "view");
  const canEdit: boolean = usePermission("complementaries", "edit");
  const canDelete: boolean = usePermission("complementaries", "delete");
  const canExport: boolean = usePermission("complementaries", "export");
  const canPdf: boolean = usePermission("complementaries", "pdf");
  const canPrint: boolean = usePermission("complementaries", "pdf");
  const canSeeHistory: boolean = usePermission("complementaries", "history");

  // Field-level permissions
  const canViewRoomType: boolean = usePermission(
    "complementaries",
    "view",
    "roomType"
  );
  const canViewComplementary: boolean = usePermission(
    "complementaries",
    "view",
    "complementary"
  );
  const canViewRate: boolean = usePermission("complementaries", "view", "rate");
  const canViewIsDraft: boolean = usePermission(
    "complementaries",
    "view",
    "isDraft"
  );

  console.log("canCreate", canCreate);
  console.log("canView", canView);
  console.log("canEdit", canEdit);
  console.log("canDelete", canDelete);
  console.log("canExport", canExport);

  // Get complementary data based on selected complementary
  const getComplementaryData = (
    complementaryName: string
  ): ComplementariesData => {
    const complementaryMap: Record<string, ComplementariesData> = {
      "Standard Room - Breakfast": {
        roomType: "Standard Room",
        complementary: "Breakfast",
        rate: 25.0,
        isDraft: false,
        createdAt: new Date("2024-01-15T10:30:00Z"),
        updatedAt: new Date("2024-01-20T14:45:00Z"),
        isDeleted: false,
      },
      "Deluxe Room - Airport Transfer": {
        roomType: "Deluxe Room",
        complementary: "Airport Transfer",
        rate: 45.0,
        isDraft: false,
        createdAt: new Date("2024-01-16T09:15:00Z"),
        updatedAt: new Date("2024-01-22T11:30:00Z"),
        isDeleted: false,
      },
      "Suite - Spa Access": {
        roomType: "Suite",
        complementary: "Spa Access",
        rate: 75.0,
        isDraft: false,
        createdAt: new Date("2024-01-17T16:20:00Z"),
        updatedAt: new Date("2024-01-25T13:45:00Z"),
        isDeleted: false,
      },
      "Executive Room - Lounge Access": {
        roomType: "Executive Room",
        complementary: "Lounge Access",
        rate: 35.0,
        isDraft: false,
        createdAt: new Date("2024-01-18T12:00:00Z"),
        updatedAt: new Date("2024-01-23T10:00:00Z"),
        isDeleted: false,
      },
      "Family Room - Kids Club": {
        roomType: "Family Room",
        complementary: "Kids Club",
        rate: 30.0,
        isDraft: false,
        createdAt: new Date("2024-01-19T08:30:00Z"),
        updatedAt: new Date("2024-01-26T10:00:00Z"),
        isDeleted: false,
      },
      "Presidential Suite - Butler Service": {
        roomType: "Presidential Suite",
        complementary: "Butler Service",
        rate: 150.0,
        isDraft: false,
        createdAt: new Date("2024-01-20T14:15:00Z"),
        updatedAt: new Date("2024-01-27T16:40:00Z"),
        isDeleted: false,
      },
    };

    return complementaryMap[complementaryName] || initialData;
  };

  const [complementaryData, setComplementaryData] =
    useState<ComplementariesData>(getComplementaryData(selectedComplementary));

  const inputRef = useRef<HTMLInputElement>(null);

  // Update complementary data when selection changes
  useEffect(() => {
    setComplementaryData(getComplementaryData(selectedComplementary));
  }, [selectedComplementary]);

  // Focus input when dropdown opens
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    console.log("isViewPage", isViewPage);
  }, []);

  const handlePrintComplementary = (complementaryData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Complementary Details",
        data: [complementaryData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          roomType: "Room Type",
          complementary: "Complementary Service",
          rate: "Rate",
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
      console.log("complementaryData on pdf click", complementaryData);
      const blob = await pdf(
        <GenericPDF
          data={[complementaryData]}
          title="Complementary Details"
          subtitle="Complementary Service Information"
        />
      ).toBlob();

      console.log("blob", blob);

      const url = URL.createObjectURL(blob);
      console.log("url", url);
      const a = document.createElement("a");
      a.href = url;
      a.download = "complementary-details.pdf";
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
        title="Viewing Complementary Details"
        videoSrc={video}
        videoHeader="Tutorial video"
        onListClick={() => navigate("/complementaries")}
        listText="List"
        listPath="complementaries"
        activePage="view"
        popoverOptions={[
          {
            label: "Create",
            icon: <Plus className="w-5 h-5 text-green-600" />,
            onClick: () => navigate("/complementaries/create"),
          },
          {
            label: "Edit",
            icon: <Edit className="w-5 h-5 text-blue-600" />,
            onClick: () => navigate("/complementaries/edit/1"),
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
                  handlePrintComplementary(complementaryData);
                }
              }
            : undefined
        }
      >
        <div dir={isRTL ? "rtl" : "ltr"}>
          {/* Row 1: Room Type, Complementary Service */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            {canViewRoomType && (
              <div className="mt-1">
                <Autocomplete
                  options={complementaryOptions}
                  value={selectedComplementary}
                  onValueChange={setSelectedComplementary}
                  placeholder=" "
                  displayKey="complementary"
                  valueKey="complementary"
                  searchKey="complementary"
                  disabled={false}
                  className="w-[96%] bg-gray-100 rounded-xl"
                  labelClassName="bg-gray-50 rounded-2xl"
                  labelText="Select Complementary"
                  inputClassName="border-none bg-stone-50 focus-visible:ring-offset-0 focus-visible:ring-0 focus-visible:border-2! focus-visible:border-blue-500"
                />
              </div>
            )}

            {canViewComplementary && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">
                  Complementary Service
                </h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(complementaryData.complementary)}
                </div>
              </div>
            )}
          </div>

          {/* Row 2: Rate, Draft Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {canViewRate && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Rate</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(`$${complementaryData.rate.toFixed(2)}`)}
                </div>
              </div>
            )}

            {canViewIsDraft && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Draft Status</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(complementaryData.isDraft ? "Yes" : "No")}
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
          created: getRelativeTime(complementaryData.createdAt),
          updated: getRelativeTime(complementaryData.updatedAt),
          drafted: getRelativeTime(complementaryData.createdAt), // Assuming draftedAt is not used in this context
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
