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

type AppointmentData = {
  name: string;
  mobile: string;
  email: string;
  appointmentDate: string;
  appointmentTime: string;
  appointmentBy: string;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;
};

const initialData: AppointmentData = {
  name: "John Smith",
  mobile: "+1 555-0123",
  email: "john.smith@email.com",
  appointmentDate: "2024-01-15",
  appointmentTime: "09:00 AM",
  appointmentBy: "Dr. Sarah Johnson",
  isActive: true,
  isDeleted: false,
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: null,
};

// Name options for autocomplete
const nameOptions = [
  "John Smith",
  "Emily Davis",
  "Robert Wilson",
  "Maria Garcia",
  "James Brown",
  "Jennifer Lee",
  "Christopher Taylor",
  "Amanda Martinez",
  "Daniel Anderson",
  "Jessica White",
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

export default function AppointmentDetailsPage() {
  const navigate = useNavigate();
  const { isRTL } = useSelector((state: RootState) => state.language);

  const [keepChanges, setKeepChanges] = useState(false);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [selectedName, setSelectedName] = useState("John Smith");
  const location = useLocation();
  const isViewPage = location.pathname.includes("/view");
  const [pdfChecked, setPdfChecked] = useState(false);
  const [printEnabled, setPrintEnabled] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  // get permission
  const canCreate: boolean = usePermission("appointments", "create");
  const canView: boolean = usePermission("appointments", "view");
  const canEdit: boolean = usePermission("appointments", "edit");
  const canDelete: boolean = usePermission("appointments", "delete");
  const canExport: boolean = usePermission("appointments", "export");
  const canPdf: boolean = usePermission("appointments", "pdf");
  const canPrint: boolean = usePermission("appointments", "print");
  const canSeeHistory: boolean = usePermission("appointments", "history");

  // Field-level permissions
  const canViewName: boolean = usePermission("appointments", "view", "name");
  const canViewMobile: boolean = usePermission(
    "appointments",
    "view",
    "mobile"
  );
  const canViewEmail: boolean = usePermission("appointments", "view", "email");
  const canViewAppointmentDate: boolean = usePermission(
    "appointments",
    "view",
    "appointmentDate"
  );
  const canViewAppointmentTime: boolean = usePermission(
    "appointments",
    "view",
    "appointmentTime"
  );
  const canViewAppointmentBy: boolean = usePermission(
    "appointments",
    "view",
    "appointmentBy"
  );
  const canViewIsActive: boolean = usePermission(
    "appointments",
    "view",
    "isActive"
  );
  const canViewIsDeleted: boolean = usePermission(
    "appointments",
    "view",
    "isDeleted"
  );

  console.log("canCreate", canCreate);
  console.log("canView", canView);
  console.log("canEdit", canEdit);
  console.log("canDelete", canDelete);
  console.log("canExport", canExport);

  // Get appointment data based on selected name
  const getAppointmentData = (name: string): AppointmentData => {
    const appointmentMap: Record<string, AppointmentData> = {
      "John Smith": {
        name: "John Smith",
        mobile: "+1 555-0123",
        email: "john.smith@email.com",
        appointmentDate: "2024-01-15",
        appointmentTime: "09:00 AM",
        appointmentBy: "Dr. Sarah Johnson",
        isActive: true,
        isDeleted: false,
        createdAt: new Date("2024-01-15T10:30:00Z"),
        updatedAt: new Date("2024-01-20T14:45:00Z"),
        deletedAt: null,
      },
      "Emily Davis": {
        name: "Emily Davis",
        mobile: "+1 555-0124",
        email: "emily.davis@email.com",
        appointmentDate: "2024-01-16",
        appointmentTime: "10:30 AM",
        appointmentBy: "Dr. Michael Chen",
        isActive: true,
        isDeleted: false,
        createdAt: new Date("2024-01-16T09:15:00Z"),
        updatedAt: new Date("2024-01-21T11:30:00Z"),
        deletedAt: null,
      },
      "Robert Wilson": {
        name: "Robert Wilson",
        mobile: "+1 555-0125",
        email: "robert.wilson@email.com",
        appointmentDate: "2024-01-17",
        appointmentTime: "02:00 PM",
        appointmentBy: "Dr. Lisa Rodriguez",
        isActive: false,
        isDeleted: false,
        createdAt: new Date("2024-01-17T16:20:00Z"),
        updatedAt: new Date("2024-01-22T13:45:00Z"),
        deletedAt: null,
      },
      "Maria Garcia": {
        name: "Maria Garcia",
        mobile: "+1 555-0126",
        email: "maria.garcia@email.com",
        appointmentDate: "2024-01-18",
        appointmentTime: "11:00 AM",
        appointmentBy: "Dr. David Thompson",
        isActive: true,
        isDeleted: false,
        createdAt: new Date("2024-01-18T12:00:00Z"),
        updatedAt: new Date("2024-01-25T10:00:00Z"),
        deletedAt: null,
      },
      "James Brown": {
        name: "James Brown",
        mobile: "+1 555-0127",
        email: "james.brown@email.com",
        appointmentDate: "2024-01-19",
        appointmentTime: "03:30 PM",
        appointmentBy: "Dr. Emily Wilson",
        isActive: true,
        isDeleted: true,
        createdAt: new Date("2024-01-19T08:30:00Z"),
        updatedAt: new Date("2024-01-24T15:20:00Z"),
        deletedAt: new Date("2024-02-01T09:00:00Z"),
      },
      "Jennifer Lee": {
        name: "Jennifer Lee",
        mobile: "+1 555-0128",
        email: "jennifer.lee@email.com",
        appointmentDate: "2024-01-20",
        appointmentTime: "01:00 PM",
        appointmentBy: "Dr. Robert Davis",
        isActive: true,
        isDeleted: false,
        createdAt: new Date("2024-01-20T14:15:00Z"),
        updatedAt: new Date("2024-01-25T16:40:00Z"),
        deletedAt: null,
      },
    };

    return appointmentMap[name] || initialData;
  };

  const [appointmentData, setAppointmentData] = useState<AppointmentData>(
    getAppointmentData(selectedName)
  );

  const inputRef = useRef<HTMLInputElement>(null);

  // Update appointment data when selection changes
  useEffect(() => {
    setAppointmentData(getAppointmentData(selectedName));
  }, [selectedName]);

  // Focus input when dropdown opens
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    console.log("isViewPage", isViewPage);
  }, []);

  const handlePrintAppointments = (appointmentData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Appointment Details",
        data: [appointmentData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          name: "Name",
          mobile: "Mobile",
          email: "Email",
          appointmentDate: "Appointment Date",
          appointmentTime: "Appointment Time",
          appointmentBy: "Appointment By",
          isActive: "Active Status",
          isDeleted: "Deleted Status",
          createdAt: "Created At",
          updatedAt: "Updated At",
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
      console.log("appointmentData on pdf click", appointmentData);
      const blob = await pdf(
        <GenericPDF
          data={[appointmentData]}
          title="Appointment Details"
          subtitle="Appointment Information"
        />
      ).toBlob();

      console.log("blob", blob);

      const url = URL.createObjectURL(blob);
      console.log("url", url);
      const a = document.createElement("a");
      a.href = url;
      a.download = "appointment-details.pdf";
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
        title="Viewing Appointment"
        videoSrc={video}
        videoHeader="Tutorial video"
        onListClick={() => navigate("/appointments")}
        listText="List"
        listPath="appointments"
        activePage="view"
        popoverOptions={[
          {
            label: "Create",
            icon: <Plus className="w-5 h-5 text-green-600" />,
            onClick: () => navigate("/appointments/create"),
          },
          {
            label: "Edit",
            icon: <Edit className="w-5 h-5 text-blue-600" />,
            onClick: () => navigate("/appointments/edit/1"),
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
                  handlePrintAppointments(appointmentData);
                }
              }
            : undefined
        }
      >
        <div dir={isRTL ? "rtl" : "ltr"}>
          {/* Row 1: Name, Mobile, Email */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            {canViewName && (
              <div className="mt-1">
                <Autocomplete
                  options={nameOptions}
                  value={selectedName}
                  onValueChange={setSelectedName}
                  placeholder="Select appointment..."
                  displayKey="name"
                  valueKey="name"
                  searchKey="name"
                  disabled={false}
                  className="w-[96%] bg-gray-100 rounded-xl"
                  labelClassName="bg-gray-50 rounded-2xl"
                  labelText="Name"
                  inputClassName="border-none bg-stone-50 focus-visible:ring-offset-0 focus-visible:ring-0 focus-visible:border-2! focus-visible:border-blue-500"
                />
              </div>
            )}

            {canViewMobile && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Mobile</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(appointmentData.mobile)}
                </div>
              </div>
            )}

            {canViewEmail && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Email</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(appointmentData.email)}
                </div>
              </div>
            )}

            {canViewAppointmentDate && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">
                  Appointment Date
                </h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(appointmentData.appointmentDate)}
                </div>
              </div>
            )}
          </div>

          {/* Row 2: Appointment Time, Appointment By, Active, Deleted */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
            {canViewAppointmentTime && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">
                  Appointment Time
                </h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(appointmentData.appointmentTime)}
                </div>
              </div>
            )}

            {canViewAppointmentBy && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">
                  Appointment By
                </h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(appointmentData.appointmentBy)}
                </div>
              </div>
            )}

            {canViewIsActive && (
              <div className="flex flex-col">
                <div className="">
                  <span className="text-[15px] text-gray-600">Inactive</span>
                </div>
                <div className="">
                  {!appointmentData.isActive ? (
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
                  {appointmentData.isDeleted ? (
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
          created: getRelativeTime(appointmentData.createdAt),
          updated: getRelativeTime(appointmentData.updatedAt),
          deleted: getRelativeTime(appointmentData.deletedAt),
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
