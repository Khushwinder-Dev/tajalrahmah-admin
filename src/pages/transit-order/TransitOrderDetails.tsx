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

type TransitOrderData = {
  sn: string;
  country: string;
  company: string;
  piNo: string;
  invoiceNo: string;
  supplierName: string;
  status: string;
  date: string;
  loginId: string;
  isDefault: boolean;
  isActive: boolean;
  isDraft: boolean;
  createdAt: Date | null;
  draftedAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;
  isDeleted: boolean;
};

const initialData: TransitOrderData = {
  sn: "001",
  country: "Saudi Arabia",
  company: "Al-Rashid Trading Company",
  piNo: "PI-2024-001",
  invoiceNo: "INV-2024-001",
  supplierName: "Global Suppliers Ltd",
  status: "Pending",
  date: "2024-01-15",
  loginId: "user001",
  isDefault: false,
  isActive: true,
  isDraft: false,
  createdAt: new Date(),
  draftedAt: null,
  updatedAt: new Date(),
  deletedAt: null,
  isDeleted: false,
};

// Transit order options for autocomplete
const transitOrderOptions = [
  "001 - Al-Rashid Trading Company",
  "002 - Al-Zahrani Trading Services",
  "003 - Al-Sayed Trading Co.",
  "004 - Al-Mansouri Trading Agency",
  "005 - Al-Qahtani Trading",
  "006 - Al-Otaibi Trading",
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

export default function TransitOrderDetailsPage() {
  const navigate = useNavigate();
  const { isRTL } = useSelector((state: RootState) => state.language);

  const [keepChanges, setKeepChanges] = useState(false);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [selectedTransitOrder, setSelectedTransitOrder] = useState(
    "001 - Al-Rashid Trading Company"
  );
  const location = useLocation();
  const isViewPage = location.pathname.includes("/view");
  const [pdfChecked, setPdfChecked] = useState(false);
  const [printEnabled, setPrintEnabled] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  // get permission
  const canCreate: boolean = usePermission("transitOrder", "create");
  const canView: boolean = usePermission("transitOrder", "view");
  const canEdit: boolean = usePermission("transitOrder", "edit");
  const canDelete: boolean = usePermission("transitOrder", "delete");
  const canExport: boolean = usePermission("transitOrder", "export");
  const canPdf: boolean = usePermission("transitOrder", "pdf");
  const canPrint: boolean = usePermission("transitOrder", "print");
  const canSeeHistory: boolean = usePermission("transitOrder", "history");

  // Field-level permissions
  const canViewSn: boolean = usePermission("transitOrder", "view", "sn");
  const canViewCountry: boolean = usePermission(
    "transitOrder",
    "view",
    "country"
  );
  const canViewCompany: boolean = usePermission(
    "transitOrder",
    "view",
    "company"
  );
  const canViewPiNo: boolean = usePermission("transitOrder", "view", "piNo");
  const canViewInvoiceNo: boolean = usePermission(
    "transitOrder",
    "view",
    "invoiceNo"
  );
  const canViewSupplierName: boolean = usePermission(
    "transitOrder",
    "view",
    "supplierName"
  );
  const canViewStatus: boolean = usePermission(
    "transitOrder",
    "view",
    "status"
  );
  const canViewDate: boolean = usePermission("transitOrder", "view", "date");
  const canViewLoginId: boolean = usePermission(
    "transitOrder",
    "view",
    "loginId"
  );
  const canViewIsDefault: boolean = usePermission(
    "transitOrder",
    "view",
    "isDefault"
  );
  const canViewIsActive: boolean = usePermission(
    "transitOrder",
    "view",
    "isActive"
  );
  const canViewIsDraft: boolean = usePermission(
    "transitOrder",
    "view",
    "isDraft"
  );
  const canViewIsDeleted: boolean = usePermission(
    "transitOrder",
    "view",
    "isDeleted"
  );

  console.log("canCreate", canCreate);
  console.log("canView", canView);
  console.log("canEdit", canEdit);
  console.log("canDelete", canDelete);
  console.log("canExport", canExport);

  // Get transit order data based on selected transit order
  const getTransitOrderData = (transitOrderName: string): TransitOrderData => {
    const transitOrderMap: Record<string, TransitOrderData> = {
      "001 - Al-Rashid Trading Company": {
        sn: "001",
        country: "Saudi Arabia",
        company: "Al-Rashid Trading Company",
        piNo: "PI-2024-001",
        invoiceNo: "INV-2024-001",
        supplierName: "Global Suppliers Ltd",
        status: "Pending",
        date: "2024-01-15",
        loginId: "user001",
        isDefault: false,
        isActive: true,
        isDraft: false,
        createdAt: new Date("2024-01-15T10:30:00Z"),
        draftedAt: null,
        updatedAt: new Date("2024-01-20T14:45:00Z"),
        deletedAt: null,
        isDeleted: false,
      },
      "002 - Al-Zahrani Trading Services": {
        sn: "002",
        country: "Saudi Arabia",
        company: "Al-Zahrani Trading Services",
        piNo: "PI-2024-002",
        invoiceNo: "INV-2024-002",
        supplierName: "Middle East Trading Co",
        status: "Approved",
        date: "2024-01-16",
        loginId: "user002",
        isDefault: true,
        isActive: true,
        isDraft: false,
        createdAt: new Date("2024-01-16T09:15:00Z"),
        draftedAt: null,
        updatedAt: new Date("2024-01-21T11:30:00Z"),
        deletedAt: null,
        isDeleted: false,
      },
      "003 - Al-Sayed Trading Co.": {
        sn: "003",
        country: "Saudi Arabia",
        company: "Al-Sayed Trading Co.",
        piNo: "PI-2024-003",
        invoiceNo: "INV-2024-003",
        supplierName: "Gulf Suppliers International",
        status: "In Transit",
        date: "2024-01-17",
        loginId: "user003",
        isDefault: false,
        isActive: true,
        isDraft: false,
        createdAt: new Date("2024-01-17T16:20:00Z"),
        draftedAt: null,
        updatedAt: new Date("2024-01-22T13:45:00Z"),
        deletedAt: null,
        isDeleted: false,
      },
      "004 - Al-Mansouri Trading Agency": {
        sn: "004",
        country: "Saudi Arabia",
        company: "Al-Mansouri Trading Agency",
        piNo: "PI-2024-004",
        invoiceNo: "INV-2024-004",
        supplierName: "Qatar Trading Partners",
        status: "Delivered",
        date: "2024-01-18",
        loginId: "user004",
        isDefault: false,
        isActive: false,
        isDraft: false,
        createdAt: new Date("2024-01-18T12:00:00Z"),
        draftedAt: null,
        updatedAt: new Date("2024-01-25T10:00:00Z"),
        deletedAt: null,
        isDeleted: false,
      },
      "005 - Al-Qahtani Trading": {
        sn: "005",
        country: "Saudi Arabia",
        company: "Al-Qahtani Trading",
        piNo: "PI-2024-005",
        invoiceNo: "INV-2024-005",
        supplierName: "Bahrain Import Export",
        status: "Cancelled",
        date: "2024-01-19",
        loginId: "user005",
        isDefault: false,
        isActive: true,
        isDraft: true,
        createdAt: new Date("2024-01-19T08:30:00Z"),
        draftedAt: new Date("2024-01-25T10:00:00Z"),
        updatedAt: new Date("2024-01-25T10:00:00Z"),
        deletedAt: null,
        isDeleted: false,
      },
      "006 - Al-Otaibi Trading": {
        sn: "006",
        country: "Saudi Arabia",
        company: "Al-Otaibi Trading",
        piNo: "PI-2024-006",
        invoiceNo: "INV-2024-006",
        supplierName: "Oman Trading Solutions",
        status: "On Hold",
        date: "2024-01-20",
        loginId: "user006",
        isDefault: false,
        isActive: true,
        isDraft: false,
        createdAt: new Date("2024-01-20T14:15:00Z"),
        draftedAt: null,
        updatedAt: new Date("2024-01-25T16:40:00Z"),
        deletedAt: null,
        isDeleted: false,
      },
    };

    return transitOrderMap[transitOrderName] || initialData;
  };

  const [transitOrderData, setTransitOrderData] = useState<TransitOrderData>(
    getTransitOrderData(selectedTransitOrder)
  );

  const inputRef = useRef<HTMLInputElement>(null);

  // Update transit order data when selection changes
  useEffect(() => {
    setTransitOrderData(getTransitOrderData(selectedTransitOrder));
  }, [selectedTransitOrder]);

  // Focus input when dropdown opens
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    console.log("isViewPage", isViewPage);
  }, []);

  const handlePrintTransitOrder = (transitOrderData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Transit Order Details",
        data: [transitOrderData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          sn: "SN",
          country: "Country",
          company: "Company",
          piNo: "P.I.No",
          invoiceNo: "Invoice No",
          supplierName: "Supplier Name",
          status: "Status",
          date: "Date",
          loginId: "Login ID",
          isDefault: "Default Transit Order",
          isActive: "Active Status",
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
      console.log("transitOrderData on pdf click", transitOrderData);
      const blob = await pdf(
        <GenericPDF
          data={[transitOrderData]}
          title="Transit Order Details"
          subtitle="Transit Order Information"
        />
      ).toBlob();

      console.log("blob", blob);

      const url = URL.createObjectURL(blob);
      console.log("url", url);
      const a = document.createElement("a");
      a.href = url;
      a.download = "transit-order-details.pdf";
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
        title="Viewing Transit Order"
        videoSrc={video}
        videoHeader="Tutorial video"
        onListClick={() => navigate("/transit-order")}
        listText="List"
        listPath="transit-order"
        activePage="view"
        popoverOptions={[
          {
            label: "Create",
            icon: <Plus className="w-5 h-5 text-green-600" />,
            onClick: () => navigate("/transit-order/create"),
          },
          {
            label: "Edit",
            icon: <Edit className="w-5 h-5 text-blue-600" />,
            onClick: () => navigate("/transit-order/edit/1"),
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
                  handlePrintTransitOrder(transitOrderData);
                }
              }
            : undefined
        }
      >
        <div dir={isRTL ? "rtl" : "ltr"}>
          {/* Row 1: SN, Country, Company, P.I.No */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            {canViewSn && (
              <div className="mt-1">
                <Autocomplete
                  options={transitOrderOptions}
                  value={selectedTransitOrder}
                  onValueChange={setSelectedTransitOrder}
                  placeholder=" "
                  displayKey="transitOrder"
                  valueKey="transitOrder"
                  searchKey="transitOrder"
                  disabled={false}
                  className="w-[96%] bg-gray-100 rounded-xl"
                  labelClassName="bg-gray-50 rounded-2xl"
                  labelText="Select Transit Order"
                  inputClassName="border-none bg-stone-50 focus-visible:ring-offset-0 focus-visible:ring-0 focus-visible:border-2! focus-visible:border-blue-500"
                />
              </div>
            )}

            {canViewCountry && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Country</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(transitOrderData.country)}
                </div>
              </div>
            )}

            {canViewCompany && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Company</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(transitOrderData.company)}
                </div>
              </div>
            )}

            {canViewPiNo && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">P.I.No</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(transitOrderData.piNo)}
                </div>
              </div>
            )}
          </div>

          {/* Row 2: Invoice No, Supplier Name, Status, Date */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
            {canViewInvoiceNo && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Invoice No</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(transitOrderData.invoiceNo)}
                </div>
              </div>
            )}

            {canViewSupplierName && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">
                  Supplier Name
                </h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(transitOrderData.supplierName)}
                </div>
              </div>
            )}

            {canViewStatus && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Status</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(transitOrderData.status)}
                </div>
              </div>
            )}

            {canViewDate && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Date</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(transitOrderData.date)}
                </div>
              </div>
            )}
          </div>

          {/* Row 3: Login ID, Default, Draft, Active */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
            {canViewLoginId && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Login ID</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(transitOrderData.loginId)}
                </div>
              </div>
            )}

            {canViewIsDefault && (
              <div className="flex flex-col">
                <div className="">
                  <span className="text-[15px] text-gray-600">Default</span>
                </div>
                <div className="">
                  {transitOrderData.isDefault ? (
                    <span className="text-black font-bold text-[15px]">
                      Yes
                    </span>
                  ) : (
                    <span className="text-black font-bold text-[15px]">No</span>
                  )}
                </div>
              </div>
            )}

            {canViewIsDraft && (
              <div className="flex flex-col">
                <div className="">
                  <span className="text-[15px] text-gray-600">Draft</span>
                </div>
                <div className="">
                  {transitOrderData.isDraft ? (
                    <span className="text-black font-bold text-[15px]">
                      Yes
                    </span>
                  ) : (
                    <span className="text-black font-bold text-[15px]">No</span>
                  )}
                </div>
              </div>
            )}

            {canViewIsActive && (
              <div className="flex flex-col">
                <div className="">
                  <span className="text-[15px] text-gray-600">Active</span>
                </div>
                <div className="">
                  {transitOrderData.isActive ? (
                    <span className="text-black font-bold text-[15px]">
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
                  {transitOrderData.isDeleted ? (
                    <span className="text-black font-bold text-[15px]">
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
          created: getRelativeTime(transitOrderData.createdAt),
          updated: getRelativeTime(transitOrderData.updatedAt),
          drafted: getRelativeTime(transitOrderData.draftedAt),
          deleted: getRelativeTime(transitOrderData.deletedAt),
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
