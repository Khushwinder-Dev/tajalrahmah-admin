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

const MOCK_SHORTCUTS = [
  {
    id: "1",
    indexName: "Dashboard",
    title: "Dashboard",
    titleValue: "Main Dashboard",
    fontAwesomeIcon: "fas fa-tachometer-alt",
    status: "Active",
  },
  {
    id: "2",
    indexName: "Users",
    title: "User Management",
    titleValue: "Manage Users",
    fontAwesomeIcon: "fas fa-users",
    status: "Active",
  },
  {
    id: "3",
    indexName: "Settings",
    title: "Settings",
    titleValue: "System Settings",
    fontAwesomeIcon: "fas fa-cog",
    status: "Draft",
  },
  {
    id: "4",
    indexName: "Reports",
    title: "Reports",
    titleValue: "View Reports",
    fontAwesomeIcon: "fas fa-chart-bar",
    status: "InActive",
  },
  {
    id: "5",
    indexName: "Profile",
    title: "User Profile",
    titleValue: "Manage Profile",
    fontAwesomeIcon: "fas fa-user",
    status: "Active",
  },
  {
    id: "6",
    indexName: "Help",
    title: "Help Center",
    titleValue: "Get Help",
    fontAwesomeIcon: "fas fa-question-circle",
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

export default function ShortcutDetailsPage() {
  // const { t } = useTranslation();
  const navigate = useNavigate();

  const [keepChanges, setKeepChanges] = useState(false);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [selectedShortcut, setSelectedShortcut] = useState("1");
  const location = useLocation();
  const isViewPage = location.pathname.includes("/view");
  const [pdfChecked, setPdfChecked] = useState(false);
  const [printEnabled, setPrintEnabled] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  // Permission checks
  // const { canCreate, canView, canEdit, canDelete } = useUserMasterPermissions();

  // Field-level permissions
  const canPdf: boolean = usePermission("shortcut", "pdf");
  const canPrint: boolean = usePermission("shortcut", "print");
  const canSeeHistory: boolean = usePermission("shortcut", "history");

  let shortcutData = {
    id: selectedShortcut,
    indexName:
      MOCK_SHORTCUTS.find((s) => s.id === selectedShortcut)?.indexName ||
      "Dashboard",
    title:
      MOCK_SHORTCUTS.find((s) => s.id === selectedShortcut)?.title ||
      "Dashboard",
    titleValue:
      MOCK_SHORTCUTS.find((s) => s.id === selectedShortcut)?.titleValue ||
      "Main Dashboard",
    fontAwesomeIcon:
      MOCK_SHORTCUTS.find((s) => s.id === selectedShortcut)?.fontAwesomeIcon ||
      "fas fa-tachometer-alt",
    isDefault: true,
    isActive: true,
    isDraft: false,
    isDeleted: false,
    status:
      MOCK_SHORTCUTS.find((s) => s.id === selectedShortcut)?.status || "Active",
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
      shortcutData = {
        id: selectedShortcut,
        indexName: "",
        title: "",
        titleValue: "",
        fontAwesomeIcon: "",
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

  const handlePrintShortcut = (shortcut: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Shortcut Master Details",
        data: [shortcut],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          indexName: "Index Name",
          title: "Title",
          titleValue: "Title Value",
          fontAwesomeIcon: "Font Awesome Icon",
          isDefault: "Default Shortcut",
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
      console.log("shortcutData on pdf click", shortcutData);
      const blob = await pdf(
        <GenericPDF
          data={[shortcutData]}
          title="Shortcut Master Details"
          subtitle="Shortcut Information"
        />
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "shortcut-details.pdf";
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
        moduleId="shortcut-details-module"
        moduleName="Shortcut Details"
        moduleRoute="/shortcut/view"
        title="Viewing Shortcut"
        videoSrc={video}
        videoHeader="Tutorial video"
        listPath="shortcut"
        activePage="view"
        module="shortcut"
        popoverOptions={[
          {
            label: "Create",
            icon: <Plus className="w-5 h-5 text-green-600" />,
            onClick: () => navigate("/shortcut/create"),
          },
          {
            label: "Edit",
            icon: <Edit className="w-5 h-5 text-blue-600" />,
            onClick: () => navigate("/shortcut/edit/1"),
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
                  handlePrintShortcut(shortcutData);
                }
              }
            : undefined
        }
      >
        {/* Row 1: Shortcut Selection, Index Name, Title, Title Value */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="mt-1">
            <Autocomplete
              options={MOCK_SHORTCUTS}
              value={selectedShortcut}
              onValueChange={setSelectedShortcut}
              placeholder=" "
              displayKey="title"
              valueKey="id"
              searchKey="title"
              disabled={false}
              className="w-[96%] bg-gray-100 rounded-xl"
              labelClassName="bg-gray-50 rounded-2xl"
              labelText="Shortcut Title"
              isShowTemplateIcon={false}
            />
          </div>

          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">Index Name</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(shortcutData.indexName)}
            </div>
          </div>

          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">Title</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(shortcutData.title)}
            </div>
          </div>

          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">Title Value</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(shortcutData.titleValue)}
            </div>
          </div>
        </div>

        {/* Row 2: Font Awesome Icon, Status, Default, Action */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">Font Awesome Icon</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              <i
                className={`${displayValue(
                  shortcutData.fontAwesomeIcon
                )} text-blue-500 text-lg`}
              ></i>
              <span className="ml-2">
                {displayValue(shortcutData.fontAwesomeIcon)}
              </span>
            </div>
          </div>

          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">Status</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(shortcutData.status)}
            </div>
          </div>

          <div className="">
            <div className="flex flex-col">
              <div className="">
                <span className="text-[15px] text-gray-600">Default</span>
              </div>
              <div className="">
                {shortcutData.isDefault ? (
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
          created: getRelativeTime(shortcutData.createdAt),
          updated: getRelativeTime(shortcutData.updatedAt),
          drafted: getRelativeTime(shortcutData.draftedAt),
          deleted: getRelativeTime(shortcutData.deletedAt),
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
