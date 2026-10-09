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

const MOCK_EXPIRY_ITEMS = [
  {
    id: "1",
    itemName: "Aspirin Tablets",
    batchNumber: "BATCH-001",
    expiryDate: "2025-12-31T00:00:00Z",
    quantity: 100,
    unit: "Tablets",
    location: "Warehouse A",
    category: "Pharmaceuticals",
    supplier: "MedSupply Co",
    status: "Active",
  },
  {
    id: "2",
    itemName: "Vitamin C Capsules",
    batchNumber: "BATCH-002",
    expiryDate: "2025-11-15T00:00:00Z",
    quantity: 50,
    unit: "Capsules",
    location: "Warehouse B",
    category: "Supplements",
    supplier: "HealthPlus Ltd",
    status: "Inactive",
  },
  {
    id: "3",
    itemName: "Pain Relief Gel",
    batchNumber: "BATCH-003",
    expiryDate: "2025-10-20T00:00:00Z",
    quantity: 25,
    unit: "Tubes",
    location: "Store 1",
    category: "Topical",
    supplier: "PharmaCorp",
    status: "Draft",
  },
  {
    id: "4",
    itemName: "Antibiotic Syrup",
    batchNumber: "BATCH-004",
    expiryDate: "2025-09-30T00:00:00Z",
    quantity: 75,
    unit: "Bottles",
    location: "Warehouse A",
    category: "Antibiotics",
    supplier: "MedTech Inc",
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

export default function ExpiryItemsDetailsPage() {
  // const { t } = useTranslation();
  const navigate = useNavigate();

  const [keepChanges, setKeepChanges] = useState(false);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("1");
  const location = useLocation();
  const isViewPage = location.pathname.includes("/view");
  const [pdfChecked, setPdfChecked] = useState(false);
  const [printEnabled, setPrintEnabled] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  // Permission checks
  // const { canCreate, canView, canEdit, canDelete } = useUserMasterPermissions();

  // Field-level permissions
  const canPdf: boolean = usePermission("expiry-items", "pdf");
  const canPrint: boolean = usePermission("expiry-items", "print");
  const canSeeHistory: boolean = usePermission("expiry-items", "history");

  let expiryData = {
    id: selectedItem,
    itemName:
      MOCK_EXPIRY_ITEMS.find((d) => d.id === selectedItem)?.itemName ||
      "Aspirin Tablets",
    batchNumber:
      MOCK_EXPIRY_ITEMS.find((d) => d.id === selectedItem)?.batchNumber ||
      "BATCH-001",
    expiryDate:
      MOCK_EXPIRY_ITEMS.find((d) => d.id === selectedItem)?.expiryDate ||
      "2025-12-31T00:00:00Z",
    quantity:
      MOCK_EXPIRY_ITEMS.find((d) => d.id === selectedItem)?.quantity || 100,
    unit:
      MOCK_EXPIRY_ITEMS.find((d) => d.id === selectedItem)?.unit || "Tablets",
    location:
      MOCK_EXPIRY_ITEMS.find((d) => d.id === selectedItem)?.location ||
      "Warehouse A",
    category:
      MOCK_EXPIRY_ITEMS.find((d) => d.id === selectedItem)?.category ||
      "Pharmaceuticals",
    supplier:
      MOCK_EXPIRY_ITEMS.find((d) => d.id === selectedItem)?.supplier ||
      "MedSupply Co",
    isDefault: true,
    isActive: true,
    isDraft: false,
    isDeleted: false,
    status:
      MOCK_EXPIRY_ITEMS.find((d) => d.id === selectedItem)?.status || "Active",
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
      expiryData = {
        id: selectedItem,
        itemName: "",
        batchNumber: "",
        expiryDate: "",
        quantity: 0,
        unit: "",
        location: "",
        category: "",
        supplier: "",
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

  const handlePrintExpiryItem = (expiry: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Expiry Item Details",
        data: [expiry],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          itemName: "Item Name",
          batchNumber: "Batch Number",
          expiryDate: "Expiry Date",
          quantity: "Quantity",
          unit: "Unit",
          location: "Location",
          category: "Category",
          supplier: "Supplier",
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
      console.log("expiryData on pdf click", expiryData);
      const blob = await pdf(
        <GenericPDF
          data={[expiryData]}
          title="Expiry Item Details"
          subtitle="Expiry Item Information"
        />
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "expiry-item-details.pdf";
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
        moduleId="expiry-item-details-module"
        moduleName="Expiry Item Details"
        moduleRoute="/expiry-items/view"
        title="Viewing Expiry Item"
        videoSrc={video}
        videoHeader="Tutorial video"
        listPath="expiry-items"
        activePage="view"
        module="expiry-items"
        popoverOptions={[
          {
            label: "Create",
            icon: <Plus className="w-5 h-5 text-green-600" />,
            onClick: () => navigate("/expiry-items/create"),
          },
          {
            label: "Edit",
            icon: <Edit className="w-5 h-5 text-blue-600" />,
            onClick: () => navigate("/expiry-items/edit/1"),
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
                  handlePrintExpiryItem(expiryData);
                }
              }
            : undefined
        }
      >
        {/* Row 1: Expiry Item Selection, Item Name, Batch Number, Expiry Date */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="mt-1">
            <Autocomplete
              options={MOCK_EXPIRY_ITEMS}
              value={selectedItem}
              onValueChange={setSelectedItem}
              placeholder=" "
              displayKey="itemName"
              valueKey="id"
              searchKey="itemName"
              disabled={false}
              className="w-[96%] bg-gray-100 rounded-xl"
              labelClassName="bg-gray-50 rounded-2xl"
              labelText="Item Name"
              isShowTemplateIcon={false}
            />
          </div>

          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">Batch Number</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(expiryData.batchNumber)}
            </div>
          </div>

          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">Expiry Date</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(
                expiryData.expiryDate
                  ? new Date(expiryData.expiryDate).toLocaleDateString()
                  : ""
              )}
            </div>
          </div>

          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">Quantity</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(expiryData.quantity)} {expiryData.unit}
            </div>
          </div>
        </div>

        {/* Row 2: Unit, Location, Category, Supplier */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">Unit</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(expiryData.unit)}
            </div>
          </div>

          <div className="">
            <div className="flex flex-col">
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-normal text-gray-600">Location</h3>
              </div>
              <div className="w-full py-1 text-gray-900 text-md dark:text-white">
                {displayValue(expiryData.location)}
              </div>
            </div>
          </div>

          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">Category</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(expiryData.category)}
            </div>
          </div>

          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">Supplier</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(expiryData.supplier)}
            </div>
          </div>
        </div>

        {/* Row 3: Status, Default, Action */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">Status</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(expiryData.status)}
            </div>
          </div>

          <div className="">
            <div className="flex flex-col">
              <div className="">
                <span className="text-[15px] text-gray-600">Default</span>
              </div>
              <div className="">
                {expiryData.isDefault ? (
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
          created: getRelativeTime(expiryData.createdAt),
          updated: getRelativeTime(expiryData.updatedAt),
          drafted: getRelativeTime(expiryData.draftedAt),
          deleted: getRelativeTime(expiryData.deletedAt),
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
