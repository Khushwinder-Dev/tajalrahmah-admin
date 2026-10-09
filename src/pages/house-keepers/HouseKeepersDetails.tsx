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
// Removed unused Modal and Button imports for house keeper details

type HouseKeeperData = {
  name: string;
  description: string;
  isDraft: boolean;
  createdAt: Date | null;
  draftedAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;
  isDeleted: boolean;
};

const initialData: HouseKeeperData = {
  name: "John Smith",
  description: "Main house keeper for VIP rooms and suites",
  isDraft: false,
  createdAt: new Date(),
  draftedAt: null,
  updatedAt: new Date(),
  deletedAt: null,
  isDeleted: false,
};

// House keeper options for autocomplete
const houseKeeperOptions = [
  "John Smith",
  "Maria Garcia",
  "Ahmed Hassan",
  "Sarah Johnson",
  "Carlos Rodriguez",
  "Lisa Chen",
  "David Wilson",
  "Fatima Al-Zahra",
  "Michael Brown",
  "Elena Petrov",
  "James Lee",
  "Aisha Patel",
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

export default function HouseKeeperDetailsPage() {
  const navigate = useNavigate();
  const { isRTL } = useSelector((state: RootState) => state.language);

  const [keepChanges, setKeepChanges] = useState(false);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [selectedHouseKeeper, setSelectedHouseKeeper] = useState("John Smith");
  const location = useLocation();
  const isViewPage = location.pathname.includes("/view");
  const [pdfChecked, setPdfChecked] = useState(false);
  const [printEnabled, setPrintEnabled] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  // No employee modal in house keeper details

  // get permission
  const canCreate: boolean = usePermission("houseKeeper", "create");
  const canView: boolean = usePermission("houseKeeper", "view");
  const canEdit: boolean = usePermission("houseKeeper", "edit");
  const canDelete: boolean = usePermission("houseKeeper", "delete");
  const canExport: boolean = usePermission("houseKeeper", "export");
  const canPdf: boolean = usePermission("houseKeeper", "pdf");
  const canPrint: boolean = usePermission("houseKeeper", "print");
  const canSeeHistory: boolean = usePermission("houseKeeper", "history");

  // Field-level permissions
  const canViewName: boolean = usePermission("houseKeeper", "view", "name");
  const canViewDescription: boolean = usePermission(
    "houseKeeper",
    "view",
    "description"
  );
  const canViewIsDraft: boolean = usePermission(
    "houseKeeper",
    "view",
    "isDraft"
  );
  const canViewIsDeleted: boolean = usePermission(
    "houseKeeper",
    "view",
    "isDeleted"
  );

  console.log("canCreate", canCreate);
  console.log("canView", canView);
  console.log("canEdit", canEdit);
  console.log("canDelete", canDelete);
  console.log("canExport", canExport);

  // Get house keeper data based on selected type
  const getHouseKeeperData = (houseKeeperName: string): HouseKeeperData => {
    const houseKeeperMap: Record<string, HouseKeeperData> = {
      "John Smith": initialData,
      "Maria Garcia": {
        name: "Maria Garcia",
        description: "House keeper for standard rooms and common areas",
        isDraft: false,
        createdAt: new Date("2024-01-16T09:15:00Z"),
        draftedAt: null,
        updatedAt: new Date("2024-01-21T11:30:00Z"),
        deletedAt: null,
        isDeleted: false,
      },
    };
    return houseKeeperMap[houseKeeperName] || initialData;
  };

  const [houseKeeperData, setHouseKeeperData] = useState<HouseKeeperData>(
    getHouseKeeperData(selectedHouseKeeper)
  );

  const inputRef = useRef<HTMLInputElement>(null);

  // No employee IQAMA map for house keeper details

  // Update house keeper data when selection changes
  useEffect(() => {
    const newData = getHouseKeeperData(selectedHouseKeeper);
    setHouseKeeperData(newData);
  }, [selectedHouseKeeper]);

  // Focus input when dropdown opens
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    console.log("isViewPage", isViewPage);
  }, []);

  const handlePrintHouseKeeper = (tData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "House Keeper Details",
        data: [tData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          name: "House Keeper",
          description: "Description",
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
      console.log("houseKeeperData on pdf click", houseKeeperData);
      const blob = await pdf(
        <GenericPDF
          data={[houseKeeperData]}
          title="House Keeper Details"
          subtitle="House Keeper Information"
        />
      ).toBlob();

      console.log("blob", blob);

      const url = URL.createObjectURL(blob);
      console.log("url", url);
      const a = document.createElement("a");
      a.href = url;
      a.download = "house-keeper-details.pdf";
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
        title="Viewing House Keeper"
        videoSrc={video}
        videoHeader="Tutorial video"
        onListClick={() => navigate("/house-keepers")}
        listText="List"
        listPath="house-keepers"
        activePage="view"
        popoverOptions={[
          ...(canCreate
            ? [
                {
                  label: "Create",
                  icon: <Plus className="w-5 h-5 text-green-600" />,
                  onClick: () => navigate("/house-keepers/create"),
                },
              ]
            : []),
          ...(canEdit
            ? [
                {
                  label: "Edit",
                  icon: <Edit className="w-5 h-5 text-blue-600" />,
                  onClick: () => navigate("/house-keepers/edit/1"),
                },
              ]
            : []),
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

                if (pdfChecked) handleExportPDF();
                if (printEnabled) handlePrintHouseKeeper(houseKeeperData);
              }
            : undefined
        }
      >
        <div dir={isRTL ? "rtl" : "ltr"}>
          {/* Row 1: House Keeper Name and Description */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            {canViewName && (
              <div className="mt-1">
                <Autocomplete
                  options={houseKeeperOptions}
                  value={selectedHouseKeeper}
                  onValueChange={setSelectedHouseKeeper}
                  placeholder="Select house keeper..."
                  displayKey="name"
                  valueKey="name"
                  searchKey="name"
                  disabled={false}
                  className="w-[96%] bg-gray-100 rounded-xl"
                  labelClassName="bg-gray-50 rounded-2xl"
                  labelText="House Keeper"
                  inputClassName="border-none bg-stone-50 focus-visible:ring-offset-0 focus-visible:ring-0 focus-visible:border-2! focus-visible:border-blue-500"
                />
              </div>
            )}

            {canViewDescription && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Description</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(houseKeeperData.description)}
                </div>
              </div>
            )}

            {canViewIsDraft && (
              <div className="flex flex-col">
                <div className="">
                  <span className="text-[15px] text-gray-600">Draft</span>
                </div>
                <div className="">
                  {houseKeeperData.isDraft ? (
                    <span className="text-orange-600 font-bold text-[15px]">
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
                  {houseKeeperData.isDeleted ? (
                    <span className="text-red-600 font-bold text-[15px]">
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
          created: getRelativeTime(houseKeeperData.createdAt),
          updated: getRelativeTime(houseKeeperData.updatedAt),
          drafted: getRelativeTime(houseKeeperData.draftedAt),
          deleted: getRelativeTime(houseKeeperData.deletedAt),
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

      {/* Removed employee modal for house keeper details */}
    </>
  );
}
