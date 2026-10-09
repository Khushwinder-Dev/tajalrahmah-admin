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

type CheckinData = {
  bookingNo: string;
  checkIn: string;
  checkOut: string;
  arrivalFrom: string;
  bookingType: string;
  bookingReference: string;
  bookingRefNo: string;
  purposeOfVisit: string;
  remarks: string;
  roomType: string;
  roomNo: string;
  adults: number;
  children: number;
  status: string;
  isActive: boolean;
  isDraft: boolean;
  createdAt: Date | null;
  updatedAt: Date | null;
  isDeleted: boolean;
};

const initialData: CheckinData = {
  bookingNo: "BK001",
  checkIn: "2024-01-15",
  checkOut: "2024-01-18",
  arrivalFrom: "Dubai, UAE",
  bookingType: "Online",
  bookingReference: "REF001",
  bookingRefNo: "BRN001",
  purposeOfVisit: "Business",
  remarks: "VIP Guest",
  roomType: "Deluxe",
  roomNo: "101",
  adults: 2,
  children: 1,
  status: "Active",
  isActive: true,
  isDraft: false,
  createdAt: new Date(),
  updatedAt: new Date(),
  isDeleted: false,
};

// Checkin options for autocomplete
const checkinOptions = [
  "BK001 - Business Trip - Dubai",
  "BK002 - Family Vacation - Riyadh",
  "BK003 - Conference - Kuwait",
  "BK004 - Medical Visit - Doha",
  "BK005 - Education - Muscat",
  "BK006 - Tourism - Amman",
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

export default function CheckinDetailsPage() {
  const navigate = useNavigate();
  const { isRTL } = useSelector((state: RootState) => state.language);

  const [keepChanges, setKeepChanges] = useState(false);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [selectedCheckin, setSelectedCheckin] = useState(
    "BK001 - Business Trip - Dubai"
  );
  const location = useLocation();
  const isViewPage = location.pathname.includes("/view");
  const [pdfChecked, setPdfChecked] = useState(false);
  const [printEnabled, setPrintEnabled] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  // get permission
  const canCreate: boolean = usePermission("checkin", "create");
  const canView: boolean = usePermission("checkin", "view");
  const canEdit: boolean = usePermission("checkin", "edit");
  const canDelete: boolean = usePermission("checkin", "delete");
  const canExport: boolean = usePermission("checkin", "export");
  const canPdf: boolean = usePermission("checkin", "pdf");
  const canPrint: boolean = usePermission("checkin", "print");
  const canSeeHistory: boolean = usePermission("checkin", "history");

  // Field-level permissions
  const canViewBookingNo: boolean = usePermission(
    "checkin",
    "view",
    "bookingNo"
  );
  const canViewCheckIn: boolean = usePermission("checkin", "view", "checkIn");
  const canViewCheckOut: boolean = usePermission("checkin", "view", "checkOut");
  const canViewArrivalFrom: boolean = usePermission(
    "checkin",
    "view",
    "arrivalFrom"
  );
  const canViewBookingType: boolean = usePermission(
    "checkin",
    "view",
    "bookingType"
  );
  const canViewPurposeOfVisit: boolean = usePermission(
    "checkin",
    "view",
    "purposeOfVisit"
  );
  const canViewRoomType: boolean = usePermission("checkin", "view", "roomType");
  const canViewRoomNo: boolean = usePermission("checkin", "view", "roomNo");
  const canViewAdults: boolean = usePermission("checkin", "view", "adults");
  const canViewChildren: boolean = usePermission("checkin", "view", "children");
  const canViewStatus: boolean = usePermission("checkin", "view", "status");
  const canViewRemarks: boolean = usePermission("checkin", "view", "remarks");

  console.log("canCreate", canCreate);
  console.log("canView", canView);
  console.log("canEdit", canEdit);
  console.log("canDelete", canDelete);
  console.log("canExport", canExport);

  // Get checkin data based on selected checkin
  const getCheckinData = (checkinName: string): CheckinData => {
    const checkinMap: Record<string, CheckinData> = {
      "BK001 - Business Trip - Dubai": {
        bookingNo: "BK001",
        checkIn: "2024-01-15",
        checkOut: "2024-01-18",
        arrivalFrom: "Dubai, UAE",
        bookingType: "Online",
        bookingReference: "REF001",
        bookingRefNo: "BRN001",
        purposeOfVisit: "Business",
        remarks: "VIP Guest - Corporate Meeting",
        roomType: "Deluxe",
        roomNo: "101",
        adults: 2,
        children: 0,
        status: "Active",
        isActive: true,
        isDraft: false,
        createdAt: new Date("2024-01-15T10:30:00Z"),
        updatedAt: new Date("2024-01-20T14:45:00Z"),
        isDeleted: false,
      },
      "BK002 - Family Vacation - Riyadh": {
        bookingNo: "BK002",
        checkIn: "2024-01-16",
        checkOut: "2024-01-22",
        arrivalFrom: "Riyadh, KSA",
        bookingType: "Phone",
        bookingReference: "REF002",
        bookingRefNo: "BRN002",
        purposeOfVisit: "Family Visit",
        remarks: "Family of 5 - Weekend getaway",
        roomType: "Family Suite",
        roomNo: "205",
        adults: 3,
        children: 2,
        status: "Approved",
        isActive: true,
        isDraft: false,
        createdAt: new Date("2024-01-16T09:15:00Z"),
        updatedAt: new Date("2024-01-21T11:30:00Z"),
        isDeleted: false,
      },
      "BK003 - Conference - Kuwait": {
        bookingNo: "BK003",
        checkIn: "2024-01-17",
        checkOut: "2024-01-19",
        arrivalFrom: "Kuwait City",
        bookingType: "Travel Agent",
        bookingReference: "REF003",
        bookingRefNo: "BRN003",
        purposeOfVisit: "Conference",
        remarks: "Tech Conference Speaker",
        roomType: "Executive",
        roomNo: "301",
        adults: 1,
        children: 0,
        status: "In Transit",
        isActive: true,
        isDraft: false,
        createdAt: new Date("2024-01-17T16:20:00Z"),
        updatedAt: new Date("2024-01-22T13:45:00Z"),
        isDeleted: false,
      },
      "BK004 - Medical Visit - Doha": {
        bookingNo: "BK004",
        checkIn: "2024-01-18",
        checkOut: "2024-01-25",
        arrivalFrom: "Doha, Qatar",
        bookingType: "Walk-in",
        bookingReference: "REF004",
        bookingRefNo: "BRN004",
        purposeOfVisit: "Medical",
        remarks: "Hospital appointment - Medical Suite",
        roomType: "Medical Suite",
        roomNo: "401",
        adults: 1,
        children: 0,
        status: "Delivered",
        isActive: false,
        isDraft: false,
        createdAt: new Date("2024-01-18T12:00:00Z"),
        updatedAt: new Date("2024-01-25T10:00:00Z"),
        isDeleted: false,
      },
      "BK005 - Education - Muscat": {
        bookingNo: "BK005",
        checkIn: "2024-01-19",
        checkOut: "2024-01-26",
        arrivalFrom: "Muscat, Oman",
        bookingType: "Online",
        bookingReference: "REF005",
        bookingRefNo: "BRN005",
        purposeOfVisit: "Education",
        remarks: "University visit - Student accommodation",
        roomType: "Budget",
        roomNo: "501",
        adults: 1,
        children: 0,
        status: "Cancelled",
        isActive: true,
        isDraft: true,
        createdAt: new Date("2024-01-19T08:30:00Z"),
        updatedAt: new Date("2024-01-25T10:00:00Z"),
        isDeleted: false,
      },
      "BK006 - Tourism - Amman": {
        bookingNo: "BK006",
        checkIn: "2024-01-20",
        checkOut: "2024-01-23",
        arrivalFrom: "Amman, Jordan",
        bookingType: "Phone",
        bookingReference: "REF006",
        bookingRefNo: "BRN006",
        purposeOfVisit: "Tourism",
        remarks: "First time visitor - Historical sites",
        roomType: "Standard",
        roomNo: "601",
        adults: 2,
        children: 1,
        status: "On Hold",
        isActive: true,
        isDraft: false,
        createdAt: new Date("2024-01-20T14:15:00Z"),
        updatedAt: new Date("2024-01-25T16:40:00Z"),
        isDeleted: false,
      },
    };

    return checkinMap[checkinName] || initialData;
  };

  const [checkinData, setCheckinData] = useState<CheckinData>(
    getCheckinData(selectedCheckin)
  );

  const inputRef = useRef<HTMLInputElement>(null);

  // Update checkin data when selection changes
  useEffect(() => {
    setCheckinData(getCheckinData(selectedCheckin));
  }, [selectedCheckin]);

  // Focus input when dropdown opens
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    console.log("isViewPage", isViewPage);
  }, []);

  const handlePrintCheckin = (checkinData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Checkin Details",
        data: [checkinData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          bookingNo: "Booking No",
          checkIn: "Check In",
          checkOut: "Check Out",
          arrivalFrom: "Arrival From",
          bookingType: "Booking Type",
          bookingReference: "Booking Reference",
          bookingRefNo: "Booking Ref No",
          purposeOfVisit: "Purpose of Visit",
          remarks: "Remarks",
          roomType: "Room Type",
          roomNo: "Room No",
          adults: "Adults",
          children: "Children",
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
      console.log("checkinData on pdf click", checkinData);
      const blob = await pdf(
        <GenericPDF
          data={[checkinData]}
          title="Checkin Details"
          subtitle="Checkin Information"
        />
      ).toBlob();

      console.log("blob", blob);

      const url = URL.createObjectURL(blob);
      console.log("url", url);
      const a = document.createElement("a");
      a.href = url;
      a.download = "checkin-details.pdf";
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
        title="Viewing Checkin Details"
        videoSrc={video}
        videoHeader="Tutorial video"
        onListClick={() => navigate("/checkin")}
        listText="List"
        listPath="checkin"
        activePage="view"
        popoverOptions={[
          {
            label: "Create",
            icon: <Plus className="w-5 h-5 text-green-600" />,
            onClick: () => navigate("/checkin/create"),
          },
          {
            label: "Edit",
            icon: <Edit className="w-5 h-5 text-blue-600" />,
            onClick: () => navigate("/checkin/edit/1"),
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
                  handlePrintCheckin(checkinData);
                }
              }
            : undefined
        }
      >
        <div dir={isRTL ? "rtl" : "ltr"}>
          {/* Row 1: Booking No, Check In, Check Out, Arrival From */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            {canViewBookingNo && (
              <div className="mt-1">
                <Autocomplete
                  options={checkinOptions}
                  value={selectedCheckin}
                  onValueChange={setSelectedCheckin}
                  placeholder=" "
                  displayKey="checkin"
                  valueKey="checkin"
                  searchKey="checkin"
                  disabled={false}
                  className="w-[96%] bg-gray-100 rounded-xl"
                  labelClassName="bg-gray-50 rounded-2xl"
                  labelText="Select Checkin"
                  inputClassName="border-none bg-stone-50 focus-visible:ring-offset-0 focus-visible:ring-0 focus-visible:border-2! focus-visible:border-blue-500"
                />
              </div>
            )}

            {canViewCheckIn && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Check In</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(checkinData.checkIn)}
                </div>
              </div>
            )}

            {canViewCheckOut && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Check Out</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(checkinData.checkOut)}
                </div>
              </div>
            )}

            {canViewArrivalFrom && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Arrival From</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(checkinData.arrivalFrom)}
                </div>
              </div>
            )}
          </div>

          {/* Row 2: Booking Type, Purpose of Visit, Room Type, Room No */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
            {canViewBookingType && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Booking Type</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(checkinData.bookingType)}
                </div>
              </div>
            )}

            {canViewPurposeOfVisit && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">
                  Purpose of Visit
                </h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(checkinData.purposeOfVisit)}
                </div>
              </div>
            )}

            {canViewRoomType && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Room Type</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(checkinData.roomType)}
                </div>
              </div>
            )}

            {canViewRoomNo && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Room No</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(checkinData.roomNo)}
                </div>
              </div>
            )}
          </div>

          {/* Row 3: Adults, Children, Status, Remarks */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
            {canViewAdults && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Adults</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(checkinData.adults)}
                </div>
              </div>
            )}

            {canViewChildren && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Children</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(checkinData.children)}
                </div>
              </div>
            )}

            {canViewStatus && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Status</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(checkinData.status)}
                </div>
              </div>
            )}

            {canViewRemarks && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Remarks</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(checkinData.remarks)}
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
          created: getRelativeTime(checkinData.createdAt),
          updated: getRelativeTime(checkinData.updatedAt),
          drafted: getRelativeTime(checkinData.createdAt), // Assuming draftedAt is not used in this context
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
