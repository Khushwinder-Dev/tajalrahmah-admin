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
import { useLanguageLabels } from "@/hooks/useLanguageLabels";
import MinimizablePageLayout from "@/components/MinimizablePageLayout";

const MOCK_ITEMS = [
  {
    id: "1",
    itemName: "Laptop Pro 15",
    itemCode: "ITM001",
    arabicName: "لابتوب برو 15",
    costPrice: 1200,
    regularPrice: 1500,
    offerPrice: 1350,
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    openingStock: 50,
    category: "Electronics",
    subCategory: "Laptops",
    unit: "Piece",
    description: "High-performance laptop for professionals",
    status: "Active",
  },
  {
    id: "2",
    itemName: "Wireless Mouse",
    itemCode: "ITM002",
    arabicName: "ماوس لاسلكي",
    costPrice: 25,
    regularPrice: 35,
    offerPrice: 30,
    startDate: "2024-02-01",
    endDate: "2024-12-31",
    openingStock: 200,
    category: "Electronics",
    subCategory: "Accessories",
    unit: "Piece",
    description: "Ergonomic wireless mouse with precision tracking",
    status: "Active",
  },
  {
    id: "3",
    itemName: "Office Chair",
    itemCode: "ITM003",
    arabicName: "كرسي مكتب",
    costPrice: 150,
    regularPrice: 200,
    offerPrice: 180,
    startDate: "2024-03-01",
    endDate: "2024-12-31",
    openingStock: 30,
    category: "Furniture",
    subCategory: "Office",
    unit: "Piece",
    description: "Comfortable ergonomic office chair",
    status: "Draft",
  },
  {
    id: "4",
    itemName: "Coffee Machine",
    itemCode: "ITM004",
    arabicName: "آلة قهوة",
    costPrice: 300,
    regularPrice: 400,
    offerPrice: 350,
    startDate: "2024-04-01",
    endDate: "2024-12-31",
    openingStock: 15,
    category: "Appliances",
    subCategory: "Kitchen",
    unit: "Piece",
    description: "Professional coffee machine for office use",
    status: "InActive",
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

export default function ItemDetailsPage() {
  // const { t } = useTranslation();
  const navigate = useNavigate();
  const labels = useLanguageLabels();

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
  const canPdf: boolean = usePermission("items", "pdf");
  const canPrint: boolean = usePermission("items", "print");
  const canSeeHistory: boolean = usePermission("items", "history");

  let itemData = {
    id: selectedItem,
    itemName:
      MOCK_ITEMS.find((i) => i.id === selectedItem)?.itemName ||
      "Laptop Pro 15",
    itemCode:
      MOCK_ITEMS.find((i) => i.id === selectedItem)?.itemCode || "ITM001",
    arabicName:
      MOCK_ITEMS.find((i) => i.id === selectedItem)?.arabicName ||
      "لابتوب برو 15",
    costPrice: MOCK_ITEMS.find((i) => i.id === selectedItem)?.costPrice || 1200,
    regularPrice:
      MOCK_ITEMS.find((i) => i.id === selectedItem)?.regularPrice || 1500,
    offerPrice:
      MOCK_ITEMS.find((i) => i.id === selectedItem)?.offerPrice || 1350,
    startDate:
      MOCK_ITEMS.find((i) => i.id === selectedItem)?.startDate || "2024-01-01",
    endDate:
      MOCK_ITEMS.find((i) => i.id === selectedItem)?.endDate || "2024-12-31",
    openingStock:
      MOCK_ITEMS.find((i) => i.id === selectedItem)?.openingStock || 50,
    category:
      MOCK_ITEMS.find((i) => i.id === selectedItem)?.category || "Electronics",
    subCategory:
      MOCK_ITEMS.find((i) => i.id === selectedItem)?.subCategory || "Laptops",
    unit: MOCK_ITEMS.find((i) => i.id === selectedItem)?.unit || "Piece",
    description:
      MOCK_ITEMS.find((i) => i.id === selectedItem)?.description ||
      "High-performance laptop for professionals",
    isDefault: true,
    isActive: true,
    isDraft: false,
    isDeleted: false,
    status: MOCK_ITEMS.find((i) => i.id === selectedItem)?.status || "Active",
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
      itemData = {
        id: selectedItem,
        itemName: "",
        itemCode: "",
        arabicName: "",
        costPrice: 0,
        regularPrice: 0,
        offerPrice: 0,
        startDate: "",
        endDate: "",
        openingStock: 0,
        category: "",
        subCategory: "",
        unit: "",
        description: "",
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

  const handlePrintItem = (item: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Item Master Details",
        data: [item],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          itemCode: "Item Code",
          itemName: "Item Name",
          arabicName: "Arabic Name",
          costPrice: "Cost Price",
          regularPrice: "Regular Price",
          offerPrice: "Offer Price",
          startDate: "Start Date",
          endDate: "End Date",
          openingStock: "Opening Stock",
          category: "Category",
          subCategory: "Sub Category",
          unit: "Unit",
          description: "Description",
          isDefault: "Default Item",
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
      console.log("itemData on pdf click", itemData);
      const blob = await pdf(
        <GenericPDF
          data={[itemData]}
          title="Item Master Details"
          subtitle="Item Information"
        />
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "item-details.pdf";
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
        moduleId="item-details-module"
        moduleName="Viewing Item"
        moduleRoute="/items/view"
        title="Viewing Item"
        videoSrc={video}
        videoHeader="Tutorial video"
        listPath="items"
        activePage="view"
        module="items"
        popoverOptions={[
          {
            label: "Create",
            icon: <Plus className="w-5 h-5 text-green-600" />,
            onClick: () => navigate("/items/create"),
          },
          {
            label: "Edit",
            icon: <Edit className="w-5 h-5 text-blue-600" />,
            onClick: () => navigate("/items/edit/1"),
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
                  handlePrintItem(itemData);
                }
              }
            : undefined
        }
      >
        {/* Row 1: Item Selection, Item Name, Item Code, Arabic Name */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="mt-1">
            <Autocomplete
              options={MOCK_ITEMS}
              value={selectedItem}
              onValueChange={setSelectedItem}
              placeholder=" "
              displayKey="itemName"
              valueKey="id"
              searchKey="itemName"
              disabled={false}
              className="w-[96%] bg-gray-100 rounded-xl"
              labelClassName="bg-gray-50 rounded-2xl"
              labelText={labels.itemName}
              isShowTemplateIcon={false}
            />
          </div>

          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">{labels.itemName}</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(itemData.itemName)}
            </div>
          </div>

          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">{labels.itemCode}</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(itemData.itemCode)}
            </div>
          </div>

          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">{labels.arabicName}</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(itemData.arabicName)}
            </div>
          </div>
        </div>

        {/* Row 2: Cost Price, Regular Price, Offer Price, Opening Stock */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">{labels.costPrice}</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(itemData.costPrice ? `$${itemData.costPrice}` : "")}
            </div>
          </div>

          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">
                {labels.regularPrice}
              </h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(
                itemData.regularPrice ? `$${itemData.regularPrice}` : ""
              )}
            </div>
          </div>

          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">{labels.offerPrice}</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(
                itemData.offerPrice ? `$${itemData.offerPrice}` : ""
              )}
            </div>
          </div>

          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">
                {labels.openingStock}
              </h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(itemData.openingStock)}
            </div>
          </div>
        </div>

        {/* Row 3: Category, Sub Category, Unit, Description */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">{labels.category}</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(itemData.category)}
            </div>
          </div>

          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">
                {labels.subCategory}
              </h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(itemData.subCategory)}
            </div>
          </div>

          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">{labels.unit}</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(itemData.unit)}
            </div>
          </div>

          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">
                {labels.description}
              </h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(itemData.description)}
            </div>
          </div>
        </div>

        {/* Row 4: Start Date, End Date, Status, Default */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">{labels.startDate}</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(itemData.startDate)}
            </div>
          </div>

          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">{labels.endDate}</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(itemData.endDate)}
            </div>
          </div>

          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">{labels.status}</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(itemData.status)}
            </div>
          </div>

          <div className="">
            <div className="flex flex-col">
              <div className="">
                <span className="text-[15px] text-gray-600">
                  {labels.default}
                </span>
              </div>
              <div className="">
                {itemData.isDefault ? (
                  <span className="text-black text-[15px]">{labels.yes}</span>
                ) : (
                  <span className="text-black text-[15px]">{labels.no}</span>
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
          created: getRelativeTime(itemData.createdAt),
          updated: getRelativeTime(itemData.updatedAt),
          drafted: getRelativeTime(itemData.draftedAt),
          deleted: getRelativeTime(itemData.deletedAt),
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
