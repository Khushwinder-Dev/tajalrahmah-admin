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

type CheckoutData = {
  roomNo: string;
  guestName: string;
  checkInDate: string;
  checkOutDate: string;
  roomType: string;
  status: string;
  isActive: boolean;
  isDraft: boolean;
  createdAt: Date | null;
  updatedAt: Date | null;
  isDeleted: boolean;
};

const initialData: CheckoutData = {
  roomNo: "101",
  guestName: "Ahmed Al-Mansouri",
  checkInDate: "2024-01-15",
  checkOutDate: "2024-01-18",
  roomType: "Deluxe",
  status: "Active",
  isActive: true,
  isDraft: false,
  createdAt: new Date(),
  updatedAt: new Date(),
  isDeleted: false,
};

// Checkout options for autocomplete
const checkoutOptions = [
  "101 - Ahmed Al-Mansouri - Deluxe",
  "205 - Sarah Johnson - Family Suite",
  "301 - Mohammed Ali - Executive",
  "401 - Fatima Hassan - Medical Suite",
  "501 - David Wilson - Budget",
  "601 - Aisha Rahman - Standard",
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

export default function CheckoutDetailsPage() {
  const navigate = useNavigate();
  const { isRTL } = useSelector((state: RootState) => state.language);

  const [keepChanges, setKeepChanges] = useState(false);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [selectedCheckout, setSelectedCheckout] = useState(
    "101 - Ahmed Al-Mansouri - Deluxe"
  );
  const location = useLocation();
  const isViewPage = location.pathname.includes("/view");
  const [pdfChecked, setPdfChecked] = useState(false);
  const [printEnabled, setPrintEnabled] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  // get permission
  const canCreate: boolean = usePermission("checkout", "create");
  const canView: boolean = usePermission("checkout", "view");
  const canEdit: boolean = usePermission("checkout", "edit");
  const canDelete: boolean = usePermission("checkout", "delete");
  const canExport: boolean = usePermission("checkout", "export");
  const canPdf: boolean = usePermission("checkout", "pdf");
  const canPrint: boolean = usePermission("checkout", "print");
  const canSeeHistory: boolean = usePermission("checkout", "history");

  // Field-level permissions
  const canViewRoomNo: boolean = usePermission("checkout", "view", "roomNo");
  const canViewGuestName: boolean = usePermission(
    "checkout",
    "view",
    "guestName"
  );
  const canViewCheckInDate: boolean = usePermission(
    "checkout",
    "view",
    "checkInDate"
  );
  const canViewCheckOutDate: boolean = usePermission(
    "checkout",
    "view",
    "checkOutDate"
  );
  const canViewRoomType: boolean = usePermission(
    "checkout",
    "view",
    "roomType"
  );
  const canViewStatus: boolean = usePermission("checkout", "view", "status");

  console.log("canCreate", canCreate);
  console.log("canView", canView);
  console.log("canEdit", canEdit);
  console.log("canDelete", canDelete);
  console.log("canExport", canExport);

  // Get checkout data based on selected checkout
  const getCheckoutData = (checkoutName: string): CheckoutData => {
    const checkoutMap: Record<string, CheckoutData> = {
      "101 - Ahmed Al-Mansouri - Deluxe": {
        roomNo: "101",
        guestName: "Ahmed Al-Mansouri",
        checkInDate: "2024-01-15",
        checkOutDate: "2024-01-18",
        roomType: "Deluxe",
        status: "Active",
        isActive: true,
        isDraft: false,
        createdAt: new Date("2024-01-15T10:30:00Z"),
        updatedAt: new Date("2024-01-20T14:45:00Z"),
        isDeleted: false,
      },
      "205 - Sarah Johnson - Family Suite": {
        roomNo: "205",
        guestName: "Sarah Johnson",
        checkInDate: "2024-01-16",
        checkOutDate: "2024-01-22",
        roomType: "Family Suite",
        status: "Approved",
        isActive: true,
        isDraft: false,
        createdAt: new Date("2024-01-16T09:15:00Z"),
        updatedAt: new Date("2024-01-21T11:30:00Z"),
        isDeleted: false,
      },
      "301 - Mohammed Ali - Executive": {
        roomNo: "301",
        guestName: "Mohammed Ali",
        checkInDate: "2024-01-17",
        checkOutDate: "2024-01-19",
        roomType: "Executive",
        status: "In Transit",
        isActive: true,
        isDraft: false,
        createdAt: new Date("2024-01-17T16:20:00Z"),
        updatedAt: new Date("2024-01-22T13:45:00Z"),
        isDeleted: false,
      },
      "401 - Fatima Hassan - Medical Suite": {
        roomNo: "401",
        guestName: "Fatima Hassan",
        checkInDate: "2024-01-18",
        checkOutDate: "2024-01-25",
        roomType: "Medical Suite",
        status: "Delivered",
        isActive: false,
        isDraft: false,
        createdAt: new Date("2024-01-18T12:00:00Z"),
        updatedAt: new Date("2024-01-25T10:00:00Z"),
        isDeleted: false,
      },
      "501 - David Wilson - Budget": {
        roomNo: "501",
        guestName: "David Wilson",
        checkInDate: "2024-01-19",
        checkOutDate: "2024-01-26",
        roomType: "Budget",
        status: "Cancelled",
        isActive: true,
        isDraft: true,
        createdAt: new Date("2024-01-19T08:30:00Z"),
        updatedAt: new Date("2024-01-25T10:00:00Z"),
        isDeleted: false,
      },
      "601 - Aisha Rahman - Standard": {
        roomNo: "601",
        guestName: "Aisha Rahman",
        checkInDate: "2024-01-20",
        checkOutDate: "2024-01-23",
        roomType: "Standard",
        status: "On Hold",
        isActive: true,
        isDraft: false,
        createdAt: new Date("2024-01-20T14:15:00Z"),
        updatedAt: new Date("2024-01-25T16:40:00Z"),
        isDeleted: false,
      },
    };

    return checkoutMap[checkoutName] || initialData;
  };

  const [checkoutData, setCheckoutData] = useState<CheckoutData>(
    getCheckoutData(selectedCheckout)
  );

  const inputRef = useRef<HTMLInputElement>(null);

  // Update checkout data when selection changes
  useEffect(() => {
    setCheckoutData(getCheckoutData(selectedCheckout));
  }, [selectedCheckout]);

  // Focus input when dropdown opens
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    console.log("isViewPage", isViewPage);
  }, []);

  const handlePrintCheckout = (checkoutData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Checkout Details",
        data: [checkoutData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          roomNo: "Room No",
          guestName: "Guest Name",
          checkInDate: "Check In Date",
          checkOutDate: "Check Out Date",
          roomType: "Room Type",
          status: "Status",
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
      console.log("checkoutData on pdf click", checkoutData);
      const blob = await pdf(
        <GenericPDF
          data={[checkoutData]}
          title="Checkout Details"
          subtitle="Checkout Information"
        />
      ).toBlob();

      console.log("blob", blob);

      const url = URL.createObjectURL(blob);
      console.log("url", url);
      const a = document.createElement("a");
      a.href = url;
      a.download = "checkout-details.pdf";
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
        title="Viewing Checkout Details"
        videoSrc={video}
        videoHeader="Tutorial video"
        onListClick={() => navigate("/checkout")}
        listText="List"
        listPath="checkout"
        activePage="view"
        popoverOptions={[
          {
            label: "Create",
            icon: <Plus className="w-5 h-5 text-green-600" />,
            onClick: () => navigate("/checkout/create"),
          },
          {
            label: "Edit",
            icon: <Edit className="w-5 h-5 text-blue-600" />,
            onClick: () => navigate("/checkout/edit/1"),
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
                  handlePrintCheckout(checkoutData);
                }
              }
            : undefined
        }
      >
        <div dir={isRTL ? "rtl" : "ltr"}>
          {/* Row 1: Room No, Guest Name, Check In Date, Check Out Date */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            {canViewRoomNo && (
              <div className="mt-1">
                <Autocomplete
                  options={checkoutOptions}
                  value={selectedCheckout}
                  onValueChange={setSelectedCheckout}
                  placeholder=" "
                  displayKey="checkout"
                  valueKey="checkout"
                  searchKey="checkout"
                  disabled={false}
                  className="w-[96%] bg-gray-100 rounded-xl"
                  labelClassName="bg-gray-50 rounded-2xl"
                  labelText="Select Checkout"
                  inputClassName="border-none bg-stone-50 focus-visible:ring-offset-0 focus-visible:ring-0 focus-visible:border-2! focus-visible:border-blue-500"
                />
              </div>
            )}

            {canViewGuestName && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Guest Name</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(checkoutData.guestName)}
                </div>
              </div>
            )}

            {canViewCheckInDate && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">
                  Check In Date
                </h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(checkoutData.checkInDate)}
                </div>
              </div>
            )}

            {canViewCheckOutDate && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">
                  Check Out Date
                </h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(checkoutData.checkOutDate)}
                </div>
              </div>
            )}
          </div>

          {/* Row 2: Room Type, Status */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
            {canViewRoomType && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Room Type</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(checkoutData.roomType)}
                </div>
              </div>
            )}

            {canViewStatus && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Status</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(checkoutData.status)}
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
          created: getRelativeTime(checkoutData.createdAt),
          updated: getRelativeTime(checkoutData.updatedAt),
          drafted: getRelativeTime(checkoutData.createdAt), // Assuming draftedAt is not used in this context
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
