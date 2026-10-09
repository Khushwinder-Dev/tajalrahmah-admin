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

type PackingData = {
  sn: string;
  documentName: string;
  selectFile: string;
  status: string;
  date: string;
  loginId: string;
  isActive: boolean;
  isDraft: boolean;
  createdAt: Date | null;
  updatedAt: Date | null;
  isDeleted: boolean;
};

const initialData: PackingData = {
  sn: "001",
  documentName: "Packing List - Electronics",
  selectFile: "electronics_packing.pdf",
  status: "Active",
  date: "2024-01-15",
  loginId: "user001",
  isActive: true,
  isDraft: false,
  createdAt: new Date(),
  updatedAt: new Date(),
  isDeleted: false,
};

// Packing options for autocomplete
const packingOptions = [
  "001 - Packing List - Electronics",
  "002 - Packing List - Clothing",
  "003 - Packing List - Furniture",
  "004 - Packing List - Books",
  "005 - Packing List - Toys",
  "006 - Packing List - Kitchen",
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

export default function PackingDetailsPage() {
  const navigate = useNavigate();
  const { isRTL } = useSelector((state: RootState) => state.language);

  const [keepChanges, setKeepChanges] = useState(false);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [selectedPacking, setSelectedPacking] = useState(
    "001 - Packing List - Electronics"
  );
  const location = useLocation();
  const isViewPage = location.pathname.includes("/view");
  const [pdfChecked, setPdfChecked] = useState(false);
  const [printEnabled, setPrintEnabled] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  // get permission
  const canCreate: boolean = usePermission("packing", "create");
  const canView: boolean = usePermission("packing", "view");
  const canEdit: boolean = usePermission("packing", "edit");
  const canDelete: boolean = usePermission("packing", "delete");
  const canExport: boolean = usePermission("packing", "export");
  const canPdf: boolean = usePermission("packing", "pdf");
  const canPrint: boolean = usePermission("packing", "print");
  const canSeeHistory: boolean = usePermission("packing", "history");

  // Field-level permissions
  const canViewSn: boolean = usePermission("packing", "view", "sn");
  const canViewDocumentName: boolean = usePermission(
    "packing",
    "view",
    "documentName"
  );
  const canViewSelectFile: boolean = usePermission(
    "packing",
    "view",
    "selectFile"
  );
  const canViewStatus: boolean = usePermission("packing", "view", "status");
  const canViewDate: boolean = usePermission("packing", "view", "date");
  const canViewLoginId: boolean = usePermission("packing", "view", "loginId");

  console.log("canCreate", canCreate);
  console.log("canView", canView);
  console.log("canEdit", canEdit);
  console.log("canDelete", canDelete);
  console.log("canExport", canExport);

  // Get packing data based on selected packing
  const getPackingData = (packingName: string): PackingData => {
    const packingMap: Record<string, PackingData> = {
      "001 - Packing List - Electronics": {
        sn: "001",
        documentName: "Packing List - Electronics",
        selectFile: "electronics_packing.pdf",
        status: "Active",
        date: "2024-01-15",
        loginId: "user001",
        isActive: true,
        isDraft: false,
        createdAt: new Date("2024-01-15T10:30:00Z"),
        updatedAt: new Date("2024-01-20T14:45:00Z"),
        isDeleted: false,
      },
      "002 - Packing List - Clothing": {
        sn: "002",
        documentName: "Packing List - Clothing",
        selectFile: "clothing_packing.pdf",
        status: "Approved",
        date: "2024-01-16",
        loginId: "user002",
        isActive: true,
        isDraft: false,
        createdAt: new Date("2024-01-16T09:15:00Z"),
        updatedAt: new Date("2024-01-21T11:30:00Z"),
        isDeleted: false,
      },
      "003 - Packing List - Furniture": {
        sn: "003",
        documentName: "Packing List - Furniture",
        selectFile: "furniture_packing.pdf",
        status: "In Transit",
        date: "2024-01-17",
        loginId: "user003",
        isActive: true,
        isDraft: false,
        createdAt: new Date("2024-01-17T16:20:00Z"),
        updatedAt: new Date("2024-01-22T13:45:00Z"),
        isDeleted: false,
      },
      "004 - Packing List - Books": {
        sn: "004",
        documentName: "Packing List - Books",
        selectFile: "books_packing.pdf",
        status: "Delivered",
        date: "2024-01-18",
        loginId: "user004",
        isActive: false,
        isDraft: false,
        createdAt: new Date("2024-01-18T12:00:00Z"),
        updatedAt: new Date("2024-01-25T10:00:00Z"),
        isDeleted: false,
      },
      "005 - Packing List - Toys": {
        sn: "005",
        documentName: "Packing List - Toys",
        selectFile: "toys_packing.pdf",
        status: "Cancelled",
        date: "2024-01-19",
        loginId: "user005",
        isActive: true,
        isDraft: true,
        createdAt: new Date("2024-01-19T08:30:00Z"),
        updatedAt: new Date("2024-01-25T10:00:00Z"),
        isDeleted: false,
      },
      "006 - Packing List - Kitchen": {
        sn: "006",
        documentName: "Packing List - Kitchen",
        selectFile: "kitchen_packing.pdf",
        status: "On Hold",
        date: "2024-01-20",
        loginId: "user006",
        isActive: true,
        isDraft: false,
        createdAt: new Date("2024-01-20T14:15:00Z"),
        updatedAt: new Date("2024-01-25T16:40:00Z"),
        isDeleted: false,
      },
    };

    return packingMap[packingName] || initialData;
  };

  const [packingData, setPackingData] = useState<PackingData>(
    getPackingData(selectedPacking)
  );

  const inputRef = useRef<HTMLInputElement>(null);

  // Update packing data when selection changes
  useEffect(() => {
    setPackingData(getPackingData(selectedPacking));
  }, [selectedPacking]);

  // Focus input when dropdown opens
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    console.log("isViewPage", isViewPage);
  }, []);

  const handlePrintPacking = (packingData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Packing Details",
        data: [packingData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          sn: "SN",
          documentName: "Document Name",
          selectFile: "Select File",
          status: "Status",
          date: "Date",
          loginId: "Login ID",
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
      console.log("packingData on pdf click", packingData);
      const blob = await pdf(
        <GenericPDF
          data={[packingData]}
          title="Packing Details"
          subtitle="Packing Information"
        />
      ).toBlob();

      console.log("blob", blob);

      const url = URL.createObjectURL(blob);
      console.log("url", url);
      const a = document.createElement("a");
      a.href = url;
      a.download = "packing-details.pdf";
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
        title="Viewing Packing Details"
        videoSrc={video}
        videoHeader="Tutorial video"
        onListClick={() => navigate("/packing")}
        listText="List"
        listPath="packing"
        activePage="view"
        popoverOptions={[
          {
            label: "Create",
            icon: <Plus className="w-5 h-5 text-green-600" />,
            onClick: () => navigate("/packing/create"),
          },
          {
            label: "Edit",
            icon: <Edit className="w-5 h-5 text-blue-600" />,
            onClick: () => navigate("/packing/edit/1"),
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
                  handlePrintPacking(packingData);
                }
              }
            : undefined
        }
      >
        <div dir={isRTL ? "rtl" : "ltr"}>
          {/* Row 1: SN, Document Name, Select File */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            {canViewSn && (
              <div className="mt-1">
                <Autocomplete
                  options={packingOptions}
                  value={selectedPacking}
                  onValueChange={setSelectedPacking}
                  placeholder=" "
                  displayKey="packing"
                  valueKey="packing"
                  searchKey="packing"
                  disabled={false}
                  className="w-[96%] bg-gray-100 rounded-xl"
                  labelClassName="bg-gray-50 rounded-2xl"
                  labelText="Select Packing"
                  inputClassName="border-none bg-stone-50 focus-visible:ring-offset-0 focus-visible:ring-0 focus-visible:border-2! focus-visible:border-blue-500"
                />
              </div>
            )}

            {canViewDocumentName && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">
                  Document Name
                </h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(packingData.documentName)}
                </div>
              </div>
            )}

            {canViewSelectFile && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Select File</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(packingData.selectFile)}
                </div>
              </div>
            )}

            {canViewStatus && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Status</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(packingData.status)}
                </div>
              </div>
            )}
          </div>

          {/* Row 2: Date, Login ID */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
            {canViewDate && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Date</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(packingData.date)}
                </div>
              </div>
            )}

            {canViewLoginId && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Login ID</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(packingData.loginId)}
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
          created: getRelativeTime(packingData.createdAt),
          updated: getRelativeTime(packingData.updatedAt),
          drafted: getRelativeTime(packingData.createdAt), // Assuming draftedAt is not used in this context
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
