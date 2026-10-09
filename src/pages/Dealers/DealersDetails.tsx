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

const MOCK_DEALERS = [
  {
    id: "1",
    customerName: "Tech Solutions Ltd",
    customerNo: "CUST001",
    shortName: "TechSol",
    vatNumber: "VAT123456789",
    vendorCode: "VEND001",
    currency: "USD",
    phone: "+1-555-0123",
    mobile: "+1-555-0125",
    email: "info@techsolutions.com",
    country: "United States",
    city: "San Francisco",
    address: "123 Market Street, Suite 100",
    paymentMode: "Credit Card",
    status: "Active",
  },
  {
    id: "2",
    customerName: "Global Electronics Inc",
    customerNo: "CUST002",
    shortName: "GlobalElec",
    vatNumber: "VAT987654321",
    vendorCode: "VEND002",
    currency: "EUR",
    phone: "+44-20-7946-0958",
    mobile: "+44-20-7946-0959",
    email: "contact@globalelectronics.com",
    country: "United Kingdom",
    city: "London",
    address: "456 Oxford Street, London",
    paymentMode: "Bank Transfer",
    status: "Active",
  },
  {
    id: "3",
    customerName: "Digital Innovations Corp",
    customerNo: "CUST003",
    shortName: "DigitalCorp",
    vatNumber: "VAT456789123",
    vendorCode: "VEND003",
    currency: "USD",
    phone: "+1-555-0456",
    mobile: "+1-555-0457",
    email: "hello@digitalinnovations.com",
    country: "Canada",
    city: "Toronto",
    address: "789 Bay Street, Toronto",
    paymentMode: "PayPal",
    status: "Draft",
  },
  {
    id: "4",
    customerName: "Future Systems AG",
    customerNo: "CUST004",
    shortName: "FutureSys",
    vatNumber: "VAT789123456",
    vendorCode: "VEND004",
    currency: "EUR",
    phone: "+49-30-12345678",
    mobile: "+49-30-12345679",
    email: "info@futuresystems.de",
    country: "Germany",
    city: "Berlin",
    address: "321 Unter den Linden, Berlin",
    paymentMode: "Wire Transfer",
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

export default function DealerDetailsPage() {
  // const { t } = useTranslation();
  const navigate = useNavigate();

  const [keepChanges, setKeepChanges] = useState(false);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [selectedDealer, setSelectedDealer] = useState("1");
  const location = useLocation();
  const isViewPage = location.pathname.includes("/view");
  const [pdfChecked, setPdfChecked] = useState(false);
  const [printEnabled, setPrintEnabled] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  // Permission checks
  // const { canCreate, canView, canEdit, canDelete } = useUserMasterPermissions();

  // Field-level permissions
  const canPdf: boolean = usePermission("dealers", "pdf");
  const canPrint: boolean = usePermission("dealers", "print");
  const canSeeHistory: boolean = usePermission("dealers", "history");

  let dealerData = {
    id: selectedDealer,
    customerName:
      MOCK_DEALERS.find((d) => d.id === selectedDealer)?.customerName ||
      "Tech Solutions Ltd",
    customerNo:
      MOCK_DEALERS.find((d) => d.id === selectedDealer)?.customerNo ||
      "CUST001",
    shortName:
      MOCK_DEALERS.find((d) => d.id === selectedDealer)?.shortName || "TechSol",
    vatNumber:
      MOCK_DEALERS.find((d) => d.id === selectedDealer)?.vatNumber ||
      "VAT123456789",
    vendorCode:
      MOCK_DEALERS.find((d) => d.id === selectedDealer)?.vendorCode ||
      "VEND001",
    currency:
      MOCK_DEALERS.find((d) => d.id === selectedDealer)?.currency || "USD",
    phone:
      MOCK_DEALERS.find((d) => d.id === selectedDealer)?.phone || "+1-555-0123",
    mobile:
      MOCK_DEALERS.find((d) => d.id === selectedDealer)?.mobile ||
      "+1-555-0125",
    email:
      MOCK_DEALERS.find((d) => d.id === selectedDealer)?.email ||
      "info@techsolutions.com",
    country:
      MOCK_DEALERS.find((d) => d.id === selectedDealer)?.country ||
      "United States",
    city:
      MOCK_DEALERS.find((d) => d.id === selectedDealer)?.city ||
      "San Francisco",
    address:
      MOCK_DEALERS.find((d) => d.id === selectedDealer)?.address ||
      "123 Market Street, Suite 100",
    paymentMode:
      MOCK_DEALERS.find((d) => d.id === selectedDealer)?.paymentMode ||
      "Credit Card",
    isDefault: true,
    isActive: true,
    isDraft: false,
    isDeleted: false,
    status:
      MOCK_DEALERS.find((d) => d.id === selectedDealer)?.status || "Active",
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
      dealerData = {
        id: selectedDealer,
        customerName: "",
        customerNo: "",
        shortName: "",
        vatNumber: "",
        vendorCode: "",
        currency: "",
        phone: "",
        mobile: "",
        email: "",
        country: "",
        city: "",
        address: "",
        paymentMode: "",
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

  const handlePrintDealer = (dealer: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Dealer Master Details",
        data: [dealer],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          customerName: "Customer Name",
          customerNo: "Customer No",
          shortName: "Short Name",
          vatNumber: "VAT Number",
          vendorCode: "Vendor Code",
          currency: "Currency",
          phone: "Phone",
          mobile: "Mobile",
          email: "Email",
          country: "Country",
          city: "City",
          address: "Address",
          paymentMode: "Payment Mode",
          isDefault: "Default Dealer",
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
      console.log("dealerData on pdf click", dealerData);
      const blob = await pdf(
        <GenericPDF
          data={[dealerData]}
          title="Dealer Master Details"
          subtitle="Dealer Information"
        />
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "dealer-details.pdf";
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
        moduleId="dealer-details-module"
        moduleName="Dealer Details"
        moduleRoute="/dealers/view"
        title="Viewing Dealer"
        videoSrc={video}
        videoHeader="Tutorial video"
        listPath="dealers"
        activePage="view"
        module="dealers"
        popoverOptions={[
          {
            label: "Create",
            icon: <Plus className="w-5 h-5 text-green-600" />,
            onClick: () => navigate("/dealers/create"),
          },
          {
            label: "Edit",
            icon: <Edit className="w-5 h-5 text-blue-600" />,
            onClick: () => navigate("/dealers/edit/1"),
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
                  handlePrintDealer(dealerData);
                }
              }
            : undefined
        }
      >
        {/* Row 1: Dealer Selection, Customer Name, Customer No, Short Name */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="mt-1">
            <Autocomplete
              options={MOCK_DEALERS}
              value={selectedDealer}
              onValueChange={setSelectedDealer}
              placeholder=" "
              displayKey="customerName"
              valueKey="id"
              searchKey="customerName"
              disabled={false}
              className="w-[96%] bg-gray-100 rounded-xl"
              labelClassName="bg-gray-50 rounded-2xl"
              labelText="Dealer Name"
              isShowTemplateIcon={false}
            />
          </div>

          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">Customer Name</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(dealerData.customerName)}
            </div>
          </div>

          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">Customer No</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(dealerData.customerNo)}
            </div>
          </div>

          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">Short Name</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(dealerData.shortName)}
            </div>
          </div>
        </div>

        {/* Row 2: VAT Number, Vendor Code, Currency, Phone */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">VAT Number</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(dealerData.vatNumber)}
            </div>
          </div>

          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">Vendor Code</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(dealerData.vendorCode)}
            </div>
          </div>

          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">Currency</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(dealerData.currency)}
            </div>
          </div>

          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">Phone</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(dealerData.phone)}
            </div>
          </div>
        </div>

        {/* Row 3: Mobile, Email, Country, City */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">Mobile</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(dealerData.mobile)}
            </div>
          </div>

          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">Email</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(dealerData.email)}
            </div>
          </div>

          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">Country</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(dealerData.country)}
            </div>
          </div>

          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">City</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(dealerData.city)}
            </div>
          </div>
        </div>

        {/* Row 4: Address, Payment Mode, Status, Default */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">Address</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(dealerData.address)}
            </div>
          </div>

          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">Payment Mode</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(dealerData.paymentMode)}
            </div>
          </div>

          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">Status</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(dealerData.status)}
            </div>
          </div>

          <div className="">
            <div className="flex flex-col">
              <div className="">
                <span className="text-[15px] text-gray-600">Default</span>
              </div>
              <div className="">
                {dealerData.isDefault ? (
                  <span className="text-black text-[15px]">Yes</span>
                ) : (
                  <span className="text-black text-[15px]">No</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Row 5: Action */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
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
          created: getRelativeTime(dealerData.createdAt),
          updated: getRelativeTime(dealerData.updatedAt),
          drafted: getRelativeTime(dealerData.draftedAt),
          deleted: getRelativeTime(dealerData.deletedAt),
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
