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
import { Edit, Plus } from "lucide-react";
import { ResetFormModal } from "@/components/common/ResetFormModal";
import { usePermission } from "@/hooks/usePermissions";
import MinimizablePageLayout from "@/components/MinimizablePageLayout";

// Mock currencies
const MOCK_CURRENCIES = [
  {
    id: "1",
    code: "USD",
    currency: "US Dollar",
    exchange: "1.0",
    country: "United States",
    symbol: "$",
    status: "Active",
  },
  {
    id: "2",
    code: "EUR",
    currency: "Euro",
    exchange: "0.92",
    country: "Eurozone",
    symbol: "€",
    status: "InActive",
  },
  {
    id: "3",
    code: "GBP",
    currency: "British Pound",
    exchange: "0.78",
    country: "United Kingdom",
    symbol: "£",
    status: "Draft",
  },
  {
    id: "4",
    code: "JPY",
    currency: "Japanese Yen",
    exchange: "150.1",
    country: "Japan",
    symbol: "¥",
    status: "Active",
  },
];

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

export default function CurrenciesDetailsPage() {
  const navigate = useNavigate();

  const [keepChanges, setKeepChanges] = useState(false);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState("1");
  const location = useLocation();
  const isViewPage = location.pathname.includes("/view");
  const [pdfChecked, setPdfChecked] = useState(false);
  const [printEnabled, setPrintEnabled] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  // Permissions
  const canPdf: boolean = usePermission("currencies", "pdf");
  const canPrint: boolean = usePermission("currencies", "print");
  const canSeeHistory: boolean = usePermission("currencies", "history");

  let currencyData = {
    id: selectedId,
    code: MOCK_CURRENCIES.find((r) => r.id === selectedId)?.code || "USD",
    currency:
      MOCK_CURRENCIES.find((r) => r.id === selectedId)?.currency || "US Dollar",
    exchange:
      MOCK_CURRENCIES.find((r) => r.id === selectedId)?.exchange || "1.0",
    country:
      MOCK_CURRENCIES.find((r) => r.id === selectedId)?.country ||
      "United States",
    symbol: MOCK_CURRENCIES.find((r) => r.id === selectedId)?.symbol || "$",
    status:
      MOCK_CURRENCIES.find((r) => r.id === selectedId)?.status || "Active",
    isDefault: false,
    isActive: true,
    isDraft: false,
    isDeleted: false,
    createdAt: "2024-05-15T10:30:00Z",
    updatedAt: "2025-01-15T14:30:00Z",
    draftedAt: "2025-05-20T14:45:00Z",
    deletedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(),
  } as any;

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    if (isViewPage) {
      currencyData = {
        id: selectedId,
        code: "",
        currency: "",
        exchange: "",
        country: "",
        symbol: "",
        status: "Active",
        isDefault: false,
        isActive: true,
        isDraft: false,
        isDeleted: false,
        createdAt: "",
        updatedAt: "",
        draftedAt: "",
        deletedAt: "",
      } as any;
    }
  }, []);

  const handlePrint = (data: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Currency Details",
        data: [data],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          code: "Code",
          currency: "Currency",
          exchange: "Exchange",
          country: "Country",
          symbol: "Symbol",
          status: "Status",
          isDefault: "Default",
          isActive: "Active",
          isDraft: "Draft",
          isDeleted: "Deleted",
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

  const handleSwitchChange = (checked: boolean) => setPrintEnabled(checked);
  const handlePDFSwitchChange = (checked: boolean) => setPdfChecked(checked);

  const handleExportPDF = async () => {
    try {
      const blob = await pdf(
        <GenericPDF
          data={[currencyData]}
          title="Currency Details"
          subtitle="Currency Information"
        />
      ).toBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "currency-details.pdf";
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
    if (years > 0) return `${years}y ago`;
    if (months > 0) return `${months}mo ago`;
    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return "Just now";
  };

  const displayValue = (value: any) =>
    value === undefined || value === null || value === "" ? "–" : value;

  return (
    <>
      <MinimizablePageLayout
        moduleId="currency-details-module"
        moduleName="Currency Details"
        moduleRoute="/currencies/view"
        title="Viewing Currency"
        videoSrc={video}
        videoHeader="Tutorial video"
        listPath="currencies"
        activePage="view"
        module="currencies"
        popoverOptions={[
          {
            label: "Create",
            icon: <Plus className="w-5 h-5 text-green-600" />,
            onClick: () => navigate("/currencies/create"),
          },
          {
            label: "Edit",
            icon: <Edit className="w-5 h-5 text-blue-600" />,
            onClick: () => navigate("/currencies/edit/1"),
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
                if (pdfChecked) handleExportPDF();
                if (printEnabled) handlePrint(currencyData);
              }
            : undefined
        }
      >
        {/* Row 1: Picker, Code, Currency, Exchange */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="mt-1">
            <Autocomplete
              options={MOCK_CURRENCIES}
              value={selectedId}
              onValueChange={setSelectedId}
              placeholder=" "
              displayKey="currency"
              valueKey="id"
              searchKey="currency"
              disabled={false}
              className="w-[96%] bg-gray-100 rounded-xl"
              labelClassName="bg-gray-50 rounded-2xl"
              labelText="Currency"
              isShowTemplateIcon={false}
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">Code</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(currencyData.code)}
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">Currency</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(currencyData.currency)}
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">Exchange</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(currencyData.exchange)}
            </div>
          </div>
        </div>

        {/* Row 2: Country, Symbol, Status, Default, Action */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div>
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">Country</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(currencyData.country)}
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">Symbol</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(currencyData.symbol)}
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">Status</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(currencyData.status)}
            </div>
          </div>

          <div>
            <div className="flex flex-col">
              <div>
                <span className="text-[15px] text-gray-600">Default</span>
              </div>
              <div>
                {currencyData.isDefault ? (
                  <span className="text-black text-[15px]">Yes</span>
                ) : (
                  <span className="text-black text-[15px]">No</span>
                )}
              </div>
            </div>
          </div>

          <div>
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
          created: getRelativeTime(currencyData.createdAt),
          updated: getRelativeTime(currencyData.updatedAt),
          drafted: getRelativeTime(currencyData.draftedAt),
          deleted: getRelativeTime(currencyData.deletedAt),
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
