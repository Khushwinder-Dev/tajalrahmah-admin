/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Trash2, Undo } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useLocation, useNavigate } from "react-router-dom";
import { Autocomplete, Modal } from "@mantine/core";
import HistoryDataTable from "./HistoryDataTable";
import video from "@/assets/videos/test.mp4";
import { printHtmlContent } from "@/lib/printHtmlContent";
import { PrintCommonLayout } from "@/lib/printContents/PrintCommonLayout";
import { toastError } from "@/lib/toast";
import { pdf } from "@react-pdf/renderer";
import PageLayout from "@/components/common/PageLayout";
import PDF from "@/components/common/pdf";
import { mockReservationHistoryData } from "@/mockData/reservation-history-mockdata";

const MOCK_TABLE_ASSIGN = [
  {
    reservationNo: "RSV1001",
    reservationDate: "2025-07-09",
    customerName: "Rahim Uddin",
    table: "T01",
    persons: 2,
    startTime: "18:30",
    endTime: "20:00",
    mobile: "01710000001",
    phone: "029999001",
    email: "rahim@example.com",
    description: "Near main entrance, window seat.",

    isDefault: false,
    isActive: true,
    isDraft: false,

    createdAt: new Date(),
    draftedAt: null,
    updatedAt: new Date(),
    deletedAt: null,
    isDeleted: false,
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

const MOCK_TABLE_ASSIGN_DATA = MOCK_TABLE_ASSIGN.map(
  (item) => item.reservationNo
);

export default function ReservationDetails() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [keepChanges, setKeepChanges] = useState(false);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [selectedReservationNo, setSelectedReservationNo] = useState("RSV1001");
  const location = useLocation();
  const isViewPage = location.pathname.includes("/view");
  const [pdfChecked, setPdfChecked] = useState(false);
  const [printEnabled, setPrintEnabled] = useState(false);

  let reservationData = {
    reservationNo: "RSV1001",
    reservationDate: "2025-07-09",
    customerName: "Rahim Uddin",
    table: "T01",
    persons: 2,
    startTime: "18:30",
    endTime: "20:00",
    mobile: "01710000001",
    phone: "029999001",
    email: "rahim@example.com",
    description: "Near main entrance, window seat.",

    isDefault: false,
    isActive: true,
    isDraft: false,

    createdAt: new Date(),
    draftedAt: null,
    updatedAt: new Date(),
    deletedAt: null,
    isDeleted: false,
  };

  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when dropdown opens
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    console.log("isViewPage", isViewPage);
    if (isViewPage) {
      reservationData = {
        reservationNo: "",
        reservationDate: "",
        customerName: "",
        table: "",
        persons: 0,
        startTime: "",
        endTime: "",
        mobile: "",
        phone: "",
        email: "",
        description: "",
        isDefault: true,
        isActive: true,
        isDraft: false,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        draftedAt: null,
        deletedAt: null,
      };
    }
  }, []);

  const handlePrintCountry = (reservationData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Reservation Report",
        data: reservationData,
        fieldLabels: {
          reservationNo: "Reservation No",
          reservationDate: "Reservation Date",
          customerName: "Customer Name",
          table: "Table",
          persons: "Persons",
          startTime: "Start Time",
          endTime: "End Time",
          mobile: "Mobile",
          phone: "Phone",
          email: "Email",
          description: "Description",
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
    if (checked) {
      // Small delay to allow switch animation to complete
      setTimeout(() => handlePrintCountry(reservationData), 100);
    }
  };

  const handlePDFSwitchChange = (pdfChecked: boolean) => {
    setPdfChecked(pdfChecked);
    if (pdfChecked) {
      // Small delay to allow switch animation to complete
      setTimeout(() => handleExportPDF(), 100);
    }
  };

  const handleExportPDF = async () => {
    console.log("Export PDF clicked");
    try {
      console.log("reservationData on pdf click", reservationData);
      const blob = await pdf(
        <PDF
          data={[reservationData]}
          title="Reservation Details"
          subtitle="Reservation Information Report"
        />
      ).toBlob();

      console.log("blob", blob);

      const url = URL.createObjectURL(blob);
      console.log("url", url);
      const a = document.createElement("a");
      a.href = url;
      a.download = "reservation-details.pdf";
      a.click();
      console.log("a", a);
      console.log("url", url);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error);
      toastError("Something went wrong when generating PDF");
    }
  };

  const handleDeleteRestore = () =>
    console.log(reservationData.isDeleted ? "Restoring..." : "Deleting...");

  const getRelativeTime = (dateString: string | null) => {
    if (!dateString) return "--/--/----";

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

  return (
    <>
      <PageLayout
        title={t("button.viewingReservation")}
        videoSrc={video}
        videoHeader="Rapid ERP Video"
        onListClick={() => navigate("/reservation")}
        listText="List"
        listPath="/reservation"
        popoverOptions={[
          {
            label: "Create",
            onClick: () => navigate("/reservation/create"),
          },
          {
            label: "Edit",
            onClick: () => navigate("/reservation/edit/1"),
          },
        ]}
        keepChanges={keepChanges}
        onKeepChangesChange={setKeepChanges}
        pdfChecked={pdfChecked}
        onPdfToggle={handlePDFSwitchChange}
        printEnabled={printEnabled}
        onPrintToggle={handleSwitchChange}
        onHistoryClick={() => setIsOptionModalOpen(true)}
      >
        {/* Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-3">
            <h3 className="font-medium mb-1">Reservation No</h3>
            <Autocomplete
              data={MOCK_TABLE_ASSIGN_DATA}
              value={selectedReservationNo}
              onChange={setSelectedReservationNo}
              placeholder="Select a Reservation No..."
              display="name"
              disabled={false}
              className="w-full"
              styles={{
                input: {
                  "&:focus": {
                    borderColor: "var(--primary)",
                  },
                },
              }}
            />
          </div>
          <div className="md:col-span-3">
            <h3 className="font-medium mb-1">Reservation Date</h3>
            <div className="w-full px-1 py-1 text-gray-500 font-normal text-md">
              {reservationData.reservationDate}
            </div>
          </div>
          <div className="md:col-span-3">
            <h3 className="font-medium mb-1">Customer Name</h3>
            <div className="w-full px-1 py-1 text-gray-500 font-normal text-md">
              {reservationData.customerName}
            </div>
          </div>
          <div className="md:col-span-3">
            <h3 className="font-medium mb-1">Table</h3>
            <div className="w-full px-1 py-1 text-gray-500 font-normal text-md">
              {reservationData.table}
            </div>
          </div>
          <div className="md:col-span-3">
            <h3 className="font-medium mb-1">Persons</h3>
            <div className="w-full px-1 py-1 text-gray-500 font-normal text-md">
              {reservationData.persons}
            </div>
          </div>
          <div className="md:col-span-3">
            <h3 className="font-medium mb-1">Start Time</h3>
            <div className="w-full px-1 py-1 text-gray-500 font-normal text-md">
              {reservationData.startTime}
            </div>
          </div>
          <div className="md:col-span-3">
            <h3 className="font-medium mb-1">End Time</h3>
            <div className="w-full px-1 py-1 text-gray-500 font-normal text-md">
              {reservationData.endTime}
            </div>
          </div>
          <div className="md:col-span-3">
            <h3 className="font-medium mb-1">Mobile</h3>
            <div className="w-full px-1 py-1 text-gray-500 font-normal text-md">
              {reservationData.mobile}
            </div>
          </div>
          <div className="md:col-span-3">
            <h3 className="font-medium mb-1">Phone</h3>
            <div className="w-full px-1 py-1 text-gray-500 font-normal text-md">
              {reservationData.phone}
            </div>
          </div>
          <div className="md:col-span-3">
            <h3 className="font-medium mb-1">Email</h3>
            <div className="w-full px-1 py-1 text-gray-500 font-normal text-md">
              {reservationData.email}
            </div>
          </div>
          <div className="md:col-span-3">
            <h3 className="font-medium mb-1">Description</h3>
            <div className="w-full px-1 py-1 text-gray-500 font-normal text-md">
              {reservationData.description}
            </div>
          </div>
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Default Switch */}
          <div className="md:col-span-3">
            <h3 className="font-medium mb-1">Default</h3>
            <Switch
              checked={reservationData.isDefault}
              disabled
              className={` data-[state=unchecked]:bg-gray-600`}
            />
          </div>

          {/* Active Switch */}
          <div className="md:col-span-3">
            <h3 className="font-medium mb-1">Active</h3>
            <Switch
              checked={reservationData.isActive}
              disabled
              className={`data-[state=unchecked]:bg-gray-600`}
            />
          </div>

          {/* Draft Switch */}
          <div className="md:col-span-3">
            <h3 className="font-medium mb-1">Draft</h3>
            <Switch
              checked={reservationData.isDraft}
              disabled
              className={`data-[state=unchecked]:bg-gray-600`}
            />
          </div>

          {/* Delete/Restore Button */}
          <div className="md:col-span-3">
            <h3 className="font-medium mb-1">
              {reservationData.isDeleted ? "Restore" : "Delete"}
            </h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleDeleteRestore}
              disabled={reservationData.isDeleted}
              className="disabled:cursor-not-allowed disabled:text-gray-400"
            >
              {reservationData.isDeleted ? (
                <Undo size={20} className="text-blue-500" />
              ) : (
                <Trash2 size={20} className="text-red-600" />
              )}
            </Button>
          </div>
        </div>

        {/* Row 3 */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-3">
            <h3 className="font-medium mb-1">Created</h3>
            <p className="text-gray-500 text-md font-normal">
              {getRelativeTime(reservationData.createdAt?.toString() || "")}
            </p>
          </div>
          <div className="md:col-span-3">
            <h3 className="font-medium mb-1">Updated</h3>
            <p className="text-gray-500 text-md font-normal">
              {getRelativeTime(reservationData.updatedAt?.toString() || "")}
            </p>
          </div>
          <div className="md:col-span-3">
            <h3 className="font-medium mb-1">Drafted</h3>
            <p className="text-gray-500 text-md font-normal">
              {getRelativeTime(reservationData.draftedAt || "")}
            </p>
          </div>
          <div className="md:col-span-3">
            <h3 className="font-medium mb-1">Deleted</h3>
            <p className="text-gray-500 text-md font-normal">
              {getRelativeTime(reservationData.deletedAt || "")}
            </p>
          </div>
        </div>
      </PageLayout>

      {/* History Modal */}
      <Modal
        opened={isOptionModalOpen}
        onClose={() => setIsOptionModalOpen(false)}
        size="50%"
        overlayProps={{ backgroundOpacity: 0.55, blur: 3 }}
        withCloseButton={false}
        styles={{
          body: {
            height: "720px", // Fixed height in pixels
            overflow: "hidden",
            padding: 4,
          },
          content: {
            // height: "80vh", // Fixed height - 80% of viewport height
            display: "flex",
            flexDirection: "column",
          },
          header: {
            flexShrink: 0,
          },
        }}
      >
        <Modal.Header>
          <Modal.Title>
            <span className="text-lg font-semibold text-blue-600">
              Reservation History
            </span>
          </Modal.Title>
          <Modal.CloseButton />
        </Modal.Header>
        <Modal.Body>
          <HistoryDataTable columnData={mockReservationHistoryData} />
        </Modal.Body>
      </Modal>
    </>
  );
}
