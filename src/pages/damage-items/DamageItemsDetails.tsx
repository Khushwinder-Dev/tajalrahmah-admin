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

const MOCK_DAMAGE_ITEMS = [
  {
    id: "1",
    itemId: "ITM-0001",
    quantityDamaged: 3,
    documentDate: "2025-09-10T10:00:00Z",
    reportedBy: "John Doe",
    location: "Warehouse A",
    damageType: "Broken",
    status: "Active",
  },
  {
    id: "2",
    itemId: "ITM-0002",
    quantityDamaged: 1,
    documentDate: "2025-09-11T12:30:00Z",
    reportedBy: "Jane Smith",
    location: "Warehouse B",
    damageType: "Water Damage",
    status: "Inactive",
  },
  {
    id: "3",
    itemId: "ITM-0003",
    quantityDamaged: 6,
    documentDate: "2025-09-08T08:20:00Z",
    reportedBy: "Ahmed Ali",
    location: "Store 1",
    damageType: "Cracked",
    status: "Draft",
  },
  {
    id: "4",
    itemId: "ITM-0004",
    quantityDamaged: 2,
    documentDate: "2025-09-09T09:45:00Z",
    reportedBy: "Maria Garcia",
    location: "Warehouse A",
    damageType: "Expired",
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

export default function DamageItemsDetailsPage() {
  // const { t } = useTranslation();
  const navigate = useNavigate();

  const [keepChanges, setKeepChanges] = useState(false);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState("1");
  const location = useLocation();
  const isViewPage = location.pathname.includes("/view");
  const [pdfChecked, setPdfChecked] = useState(false);
  const [printEnabled, setPrintEnabled] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  // Permission checks
  // const { canCreate, canView, canEdit, canDelete } = useUserMasterPermissions();

  // Field-level permissions
  const canPdf: boolean = usePermission("damage-items", "pdf");
  const canPrint: boolean = usePermission("damage-items", "print");
  const canSeeHistory: boolean = usePermission("damage-items", "history");

  let damageData = {
    id: selectedBrand,
    itemId:
      MOCK_DAMAGE_ITEMS.find((d) => d.id === selectedBrand)?.itemId ||
      "ITM-0001",
    quantityDamaged:
      MOCK_DAMAGE_ITEMS.find((d) => d.id === selectedBrand)?.quantityDamaged ||
      0,
    documentDate:
      MOCK_DAMAGE_ITEMS.find((d) => d.id === selectedBrand)?.documentDate ||
      "2025-09-10T10:00:00Z",
    reportedBy:
      MOCK_DAMAGE_ITEMS.find((d) => d.id === selectedBrand)?.reportedBy ||
      "John Doe",
    location:
      MOCK_DAMAGE_ITEMS.find((d) => d.id === selectedBrand)?.location ||
      "Warehouse A",
    damageType:
      MOCK_DAMAGE_ITEMS.find((d) => d.id === selectedBrand)?.damageType ||
      "Broken",
    isDefault: true,
    isActive: true,
    isDraft: false,
    isDeleted: false,
    status:
      MOCK_DAMAGE_ITEMS.find((d) => d.id === selectedBrand)?.status || "Active",
    createdAt: "2025-05-15T10:30:00Z",
    updatedAt: "2025-09-15T14:30:00Z",
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
      damageData = {
        id: selectedBrand,
        itemId: "",
        quantityDamaged: "",
        documentDate: "",
        reportedBy: "",
        location: "",
        damageType: "",
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

  const handlePrintDamageItem = (damage: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Damage Item Details",
        data: [damage],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          itemId: "Item ID",
          quantityDamaged: "Quantity Damaged",
          documentDate: "Document Date",
          reportedBy: "Reported By",
          location: "Location",
          damageType: "Damage Type",
          isDefault: "Default",
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
      console.log("damageData on pdf click", damageData);
      const blob = await pdf(
        <GenericPDF
          data={[damageData]}
          title="Damage Item Details"
          subtitle="Damage Item Information"
        />
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "damage-item-details.pdf";
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
        moduleId="damage-item-details-module"
        moduleName="Damage Item Details"
        moduleRoute="/damage-items/view"
        title="Viewing Damage Item"
        videoSrc={video}
        videoHeader="Tutorial video"
        listPath="damage-items"
        activePage="view"
        module="damage-items"
        popoverOptions={[
          {
            label: "Create",
            icon: <Plus className="w-5 h-5 text-green-600" />,
            onClick: () => navigate("/damage-items/create"),
          },
          {
            label: "Edit",
            icon: <Edit className="w-5 h-5 text-blue-600" />,
            onClick: () => navigate("/damage-items/edit/1"),
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
                  handlePrintDamageItem(damageData);
                }
              }
            : undefined
        }
      >
        {/* Row 1: Damage Item Selection, Item ID, Quantity, Document Date */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="mt-1">
            <Autocomplete
              options={MOCK_DAMAGE_ITEMS}
              value={selectedBrand}
              onValueChange={setSelectedBrand}
              placeholder=" "
              displayKey="itemId"
              valueKey="id"
              searchKey="itemId"
              disabled={false}
              className="w-[96%] bg-gray-100 rounded-xl"
              labelClassName="bg-gray-50 rounded-2xl"
              labelText="Item ID"
              isShowTemplateIcon={false}
            />
          </div>

          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">Quantity Damaged</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(damageData.quantityDamaged)}
            </div>
          </div>

          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">Document Date</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(
                damageData.documentDate
                  ? new Date(damageData.documentDate).toLocaleDateString()
                  : ""
              )}
            </div>
          </div>

          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">Reported By</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(damageData.reportedBy)}
            </div>
          </div>
        </div>

        {/* Row 2: Reported By, Location, Damage Type, Status, Default, Action */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="">
            <div className="flex flex-col">
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-normal text-gray-600">Location</h3>
              </div>
              <div className="w-full py-1 text-gray-900 text-md dark:text-white">
                {displayValue(damageData.location)}
              </div>
            </div>
          </div>

          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">Damage Type</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(damageData.damageType)}
            </div>
          </div>

          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">Status</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(damageData.status)}
            </div>
          </div>

          <div className="">
            <div className="flex flex-col">
              <div className="">
                <span className="text-[15px] text-gray-600">Default</span>
              </div>
              <div className="">
                {damageData.isDefault ? (
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
          created: getRelativeTime(damageData.createdAt),
          updated: getRelativeTime(damageData.updatedAt),
          drafted: getRelativeTime(damageData.draftedAt),
          deleted: getRelativeTime(damageData.deletedAt),
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
