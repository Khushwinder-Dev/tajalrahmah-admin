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

const MOCK_ASSET_MAINTENANCES = [
  {
    id: "1",
    asset: "Server Room AC Unit",
    maintenanceType: "Preventive",
    title: "Quarterly AC Maintenance",
    startDate: "2024-01-15",
    completionDate: "2024-01-16",
    warrantyImprovement: "Extended warranty by 6 months",
    cost: 1500,
    notes:
      "Cleaned filters, checked refrigerant levels, tested cooling efficiency.",
    status: "Active",
  },
  {
    id: "2",
    asset: "Production Line Conveyor",
    maintenanceType: "Corrective",
    title: "Belt Replacement",
    startDate: "2024-01-16",
    completionDate: "2024-01-17",
    warrantyImprovement: "None",
    cost: 3200,
    notes:
      "Replaced worn conveyor belt and adjusted tension. System running smoothly.",
    status: "Active",
  },
  {
    id: "3",
    asset: "Backup Generator",
    maintenanceType: "Preventive",
    title: "Annual Generator Service",
    startDate: "2024-01-17",
    completionDate: "2024-01-18",
    warrantyImprovement: "Warranty extended to 2026",
    cost: 2800,
    notes:
      "Oil change, filter replacement, battery check, load testing completed.",
    status: "Draft",
  },
  {
    id: "4",
    asset: "Office Elevator",
    maintenanceType: "Inspection",
    title: "Safety Inspection",
    startDate: "2024-01-18",
    completionDate: "2024-01-18",
    warrantyImprovement: "None",
    cost: 500,
    notes: "Annual safety inspection passed. All systems operational.",
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

export default function AssetMaintenanceDetailsPage() {
  // const { t } = useTranslation();
  const navigate = useNavigate();

  const [keepChanges, setKeepChanges] = useState(false);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [selectedAssetMaintenance, setSelectedAssetMaintenance] = useState("1");
  const location = useLocation();
  const isViewPage = location.pathname.includes("/view");
  const [pdfChecked, setPdfChecked] = useState(false);
  const [printEnabled, setPrintEnabled] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  // Permission checks
  // const { canCreate, canView, canEdit, canDelete } = useUserMasterPermissions();

  // Field-level permissions
  const canPdf: boolean = usePermission("asset-maintenances", "pdf");
  const canPrint: boolean = usePermission("asset-maintenances", "print");
  const canSeeHistory: boolean = usePermission("asset-maintenances", "history");

  let reportData = {
    id: selectedAssetMaintenance,
    asset:
      MOCK_ASSET_MAINTENANCES.find((r) => r.id === selectedAssetMaintenance)
        ?.asset || "Server Room AC Unit",
    maintenanceType:
      MOCK_ASSET_MAINTENANCES.find((r) => r.id === selectedAssetMaintenance)
        ?.maintenanceType || "Preventive",
    title:
      MOCK_ASSET_MAINTENANCES.find((r) => r.id === selectedAssetMaintenance)
        ?.title || "Quarterly AC Maintenance",
    startDate:
      MOCK_ASSET_MAINTENANCES.find((r) => r.id === selectedAssetMaintenance)
        ?.startDate || "2024-01-15",
    completionDate:
      MOCK_ASSET_MAINTENANCES.find((r) => r.id === selectedAssetMaintenance)
        ?.completionDate || "2024-01-16",
    warrantyImprovement:
      MOCK_ASSET_MAINTENANCES.find((r) => r.id === selectedAssetMaintenance)
        ?.warrantyImprovement || "Extended warranty by 6 months",
    cost:
      MOCK_ASSET_MAINTENANCES.find((r) => r.id === selectedAssetMaintenance)
        ?.cost || 1500,
    notes:
      MOCK_ASSET_MAINTENANCES.find((r) => r.id === selectedAssetMaintenance)
        ?.notes ||
      "Cleaned filters, checked refrigerant levels, tested cooling efficiency.",
    isDefault: true,
    isActive: true,
    isDraft: false,
    isDeleted: false,
    status:
      MOCK_ASSET_MAINTENANCES.find((r) => r.id === selectedAssetMaintenance)
        ?.status || "Active",
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
        id: selectedAssetMaintenance,
        asset: "",
        maintenanceType: "Preventive",
        title: "",
        startDate: "",
        completionDate: "",
        warrantyImprovement: "",
        cost: 0,
        notes: "",
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
        title: "Asset Maintenance Details",
        data: [report],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          asset: "Asset",
          maintenanceType: "Maintenance Type",
          title: "Title",
          startDate: "Start Date",
          completionDate: "Completion Date",
          warrantyImprovement: "Warranty Improvement",
          cost: "Cost",
          notes: "Notes",
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
          title="Asset Maintenance Details"
          subtitle="Asset Maintenance Information"
        />
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "asset-maintenance-details.pdf";
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
        moduleId="asset-maintenance-details-module"
        moduleName="Asset Maintenance Details"
        moduleRoute="/asset-maintenances/view"
        title="Viewing Asset Maintenance"
        videoSrc={video}
        videoHeader="Tutorial video"
        listPath="asset-maintenances"
        activePage="view"
        module="asset-maintenances"
        popoverOptions={[
          {
            label: "Create",
            icon: <Plus className="w-5 h-5 text-green-600" />,
            onClick: () => navigate("/asset-maintenances/create"),
          },
          {
            label: "Edit",
            icon: <Edit className="w-5 h-5 text-blue-600" />,
            onClick: () => navigate("/asset-maintenances/edit/1"),
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
        {/* Row 1: Asset Maintenance Selection, Asset, Maintenance Type, Title */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="mt-1">
            <Autocomplete
              options={MOCK_ASSET_MAINTENANCES}
              value={selectedAssetMaintenance}
              onValueChange={setSelectedAssetMaintenance}
              placeholder=" "
              displayKey="title"
              valueKey="id"
              searchKey="title"
              disabled={false}
              className="w-[96%] bg-gray-100 rounded-xl"
              labelClassName="bg-gray-50 rounded-2xl"
              labelText="Asset Maintenance"
              isShowTemplateIcon={false}
            />
          </div>

          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">Asset</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(reportData.asset)}
            </div>
          </div>

          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">Maintenance Type</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(reportData.maintenanceType)}
            </div>
          </div>

          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">Title</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(reportData.title)}
            </div>
          </div>
        </div>

        {/* Row 2: Start Date, Completion Date, Warranty Improvement, Cost */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">Start Date</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(reportData.startDate)}
            </div>
          </div>

          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">Completion Date</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(reportData.completionDate)}
            </div>
          </div>

          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">
                Warranty Improvement
              </h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(reportData.warrantyImprovement)}
            </div>
          </div>

          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">Cost</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              ${displayValue(reportData.cost)}
            </div>
          </div>
        </div>

        {/* Row 3: Notes, Status, Default */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">Notes</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(reportData.notes)}
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
