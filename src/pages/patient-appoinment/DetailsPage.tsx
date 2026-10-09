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
import {
  initialDataWithValue,
  printConfigFieldLabels,
  type ModuleFieldsType,
} from "./config/ModuleLevelConfig";
import { getModuleFromPath } from "@/lib/utils";
import FieldSection from "@/components/common/FieldSection";

type DetailsPageTypes = ModuleFieldsType & {
  isDefault: boolean;
  isActive: boolean;
  isDraft: boolean;
  createdAt: Date | null;
  draftedAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;
  isDeleted: boolean;
};

const initialData: DetailsPageTypes = {
  ...initialDataWithValue,

  isDefault: false,
  isActive: true,
  isDraft: false,
  createdAt: new Date(),
  draftedAt: null,
  updatedAt: new Date(),
  deletedAt: null,
  isDeleted: false,
};

// update this with your module related value
const autocompleteDataDetailsPage = [
  "P001",
  "P002",
  "P003",
  "P004",
  "P005",
  "P006",
  "P007",
  "P008",
  "P009",
  "P010",
  "P011",
  "P012",
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

export default function PatientAppointmentDetails() {
  const navigate = useNavigate();
  const { isRTL } = useSelector((state: RootState) => state.language);

  const location = useLocation();
  const detectedModule = getModuleFromPath(location.pathname);

  const [keepChanges, setKeepChanges] = useState(false);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(
    autocompleteDataDetailsPage[0]
  );
  const isViewPage = location.pathname.includes("/view");
  const [pdfChecked, setPdfChecked] = useState(false);
  const [printEnabled, setPrintEnabled] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  const canPdf: boolean = usePermission(detectedModule, "pdf");
  const canPrint: boolean = usePermission(detectedModule, "print");
  const canSeeHistory: boolean = usePermission(detectedModule, "history");

  // Field-level permissions
  const fieldKeys = Object.keys(initialData) as (keyof ModuleFieldsType)[];
  const fieldPermissions = usePermission<keyof DetailsPageTypes>(
    detectedModule,
    "view",
    [
      ...fieldKeys,
      "isDefault",
      "isActive",
      "createdAt",
      "draftedAt",
      "updatedAt",
      "deletedAt",
      "isDeleted",
    ]
  );

  // Get appointment data based on selected patient
  const getAppointmentData = (patientId: string): DetailsPageTypes => {
    const appointmentMap: Record<string, DetailsPageTypes> = {
      P001: {
        ...initialData,
        patientId: "P001",
        departmentName: "Cardiology",
        doctorName: "Dr. Smith",
        appointmentDate: "2025-01-15",
        serialNo: "A001",
        problem: "Chest pain and irregular heartbeat",
        status: "Confirmed",
      },
      P002: {
        ...initialData,
        patientId: "P002",
        departmentName: "Orthopedics",
        doctorName: "Dr. Johnson",
        appointmentDate: "2025-01-16",
        serialNo: "A002",
        problem: "Knee pain and swelling",
        status: "Pending",
      },
      P003: {
        ...initialData,
        patientId: "P003",
        departmentName: "Neurology",
        doctorName: "Dr. Brown",
        appointmentDate: "2025-01-17",
        serialNo: "A003",
        problem: "Persistent headaches and dizziness",
        status: "Confirmed",
      },
      P004: {
        ...initialData,
        patientId: "P004",
        departmentName: "Dermatology",
        doctorName: "Dr. Wilson",
        appointmentDate: "2025-01-18",
        serialNo: "A004",
        problem: "Skin rash and allergic reactions",
        status: "Cancelled",
      },
      P005: {
        ...initialData,
        patientId: "P005",
        departmentName: "Pediatrics",
        doctorName: "Dr. Davis",
        appointmentDate: "2025-01-19",
        serialNo: "A005",
        problem: "Regular checkup and vaccination",
        status: "Confirmed",
      },
      P006: {
        ...initialData,
        patientId: "P006",
        departmentName: "General Medicine",
        doctorName: "Dr. Miller",
        appointmentDate: "2025-01-20",
        serialNo: "A006",
        problem: "High blood pressure monitoring",
        status: "Confirmed",
      },
      P007: {
        ...initialData,
        patientId: "P007",
        departmentName: "ENT",
        doctorName: "Dr. Garcia",
        appointmentDate: "2025-01-21",
        serialNo: "A007",
        problem: "Hearing problems and ear infection",
        status: "Rescheduled",
      },
      P008: {
        ...initialData,
        patientId: "P008",
        departmentName: "Ophthalmology",
        doctorName: "Dr. Anderson",
        appointmentDate: "2025-01-22",
        serialNo: "A008",
        problem: "Eye examination and vision problems",
        status: "Confirmed",
      },
      P009: {
        ...initialData,
        patientId: "P009",
        departmentName: "Psychiatry",
        doctorName: "Dr. Taylor",
        appointmentDate: "2025-01-23",
        serialNo: "A009",
        problem: "Anxiety and stress management",
        status: "Pending",
      },
      P010: {
        ...initialData,
        patientId: "P010",
        departmentName: "Gynecology",
        doctorName: "Dr. Martinez",
        appointmentDate: "2025-01-24",
        serialNo: "A010",
        problem: "Routine checkup and consultation",
        status: "Confirmed",
      },
      P011: {
        ...initialData,
        patientId: "P011",
        departmentName: "Cardiology",
        doctorName: "Dr. White",
        appointmentDate: "2025-01-25",
        serialNo: "A011",
        problem: "Heart palpitations and chest discomfort",
        status: "Completed",
      },
      P012: {
        ...initialData,
        patientId: "P012",
        departmentName: "Orthopedics",
        doctorName: "Dr. Lee",
        appointmentDate: "2025-01-26",
        serialNo: "A012",
        problem: "Back pain and muscle strain",
        status: "Confirmed",
      },
    };

    return appointmentMap[patientId] || initialData;
  };

  const [appointmentData, setAppointmentData] = useState<DetailsPageTypes>(
    getAppointmentData(selectedPatient)
  );

  const inputRef = useRef<HTMLInputElement>(null);

  // Update appointment data when selection changes
  useEffect(() => {
    setAppointmentData(getAppointmentData(selectedPatient));
  }, [selectedPatient]);

  // Focus input when dropdown opens
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    console.log("isViewPage", isViewPage);
  }, []);

  const handlePrintAppointment = (appointmentData: any) => {
    try {
      const html = PrintCommonLayout({
        title: `${location.pathname.split("/")[1]} Details`,
        data: [appointmentData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          ...printConfigFieldLabels,

          isDefault: "Default Appointment",
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

  // Labels for fields to render in the view grid (excluding booleans handled separately)
  const viewFieldLabels: Record<keyof ModuleFieldsType, string> = {
    patientId: "Patient ID",
    departmentName: "Department Name",
    doctorName: "Doctor Name",
    appointmentDate: "Appointment Date",
    serialNo: "Serial No",
    problem: "Problem",
    status: "Status",
  };

  const excludedKeysForLoop = new Set([
    "patientId", // handled separately in autocomplete
    "isDefault",
    "isActive",
    "isDraft",
    "isDeleted",
  ]);

  const formatValue = (value: any) => {
    if (value instanceof Date) return value.toLocaleString();
    if (Array.isArray(value)) return value.join(", ");
    if (typeof value === "boolean") return value ? "Yes" : "No";
    return value;
  };

  const handleExportPDF = async () => {
    console.log("Export PDF clicked");
    try {
      console.log("pdf click", appointmentData);
      const blob = await pdf(
        <GenericPDF
          data={[appointmentData]}
          title={`${location.pathname.split("/")[1]} Details`}
          subtitle={`${location.pathname.split("/")[1]} Information`}
        />
      ).toBlob();

      console.log("blob", blob);

      const url = URL.createObjectURL(blob);
      console.log("url", url);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${location.pathname.split("/")[1]}-details.pdf`;
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
    if (!date) return "-";

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
        title={`Viewing ${location.pathname.split("/")[1]}`}
        videoSrc={video}
        videoHeader="Tutorial video"
        onListClick={() => navigate(`/${location.pathname.split("/")[1]}`)}
        listText="List"
        listPath={location.pathname.split("/")[1]}
        activePage="view"
        popoverOptions={[
          {
            label: "Create",
            icon: <Plus className="w-5 h-5 text-green-600" />,
            onClick: () =>
              navigate(`/${location.pathname.split("/")[1]}/create`),
          },
          {
            label: "Edit",
            icon: <Edit className="w-5 h-5 text-blue-600" />,
            onClick: () =>
              navigate(`/${location.pathname.split("/")[1]}/edit/1`),
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
                  handlePrintAppointment(appointmentData);
                }
              }
            : undefined
        }
      >
        <div dir={isRTL ? "rtl" : "ltr"}>
          {/* Row 1: Patient Selection, Appointment Details */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            {fieldPermissions.patientId && (
              <div className="mt-1">
                <Autocomplete
                  options={autocompleteDataDetailsPage}
                  value={selectedPatient}
                  onValueChange={setSelectedPatient}
                  placeholder=" "
                  displayKey="name"
                  valueKey="name"
                  searchKey="name"
                  disabled={false}
                  className="w-[96%] bg-gray-100 rounded-xl"
                  labelClassName="bg-gray-50 rounded-2xl"
                  labelText="Patient ID"
                  inputClassName="border-none bg-stone-50 focus-visible:ring-offset-0 focus-visible:ring-0 focus-visible:border-2! focus-visible:border-blue-500"
                />
              </div>
            )}

            {Object.entries(viewFieldLabels)
              .filter(([key]) => !excludedKeysForLoop.has(key))
              .map(([key, label]) =>
                fieldPermissions[key as keyof DetailsPageTypes] ? (
                  <FieldSection
                    key={key}
                    label={label}
                    value={formatValue((appointmentData as any)[key])}
                  />
                ) : null
              )}

            {fieldPermissions.isActive && (
              <div className="flex flex-col">
                <div className="">
                  <span className="text-[15px] text-gray-600">Active</span>
                </div>
                <div className="">
                  {appointmentData.isActive ? (
                    <span className="font-bold text-[15px]">Yes</span>
                  ) : (
                    <span className="font-bold text-[15px]">No</span>
                  )}
                </div>
              </div>
            )}
            {fieldPermissions.isDraft && (
              <div className="flex flex-col">
                <div className="">
                  <span className="text-[15px] text-gray-600">Draft</span>
                </div>
                <div className="">
                  {appointmentData.isDraft ? (
                    <span className="text-orange-600 font-bold text-[15px]">
                      Yes
                    </span>
                  ) : (
                    <span className="text-black font-bold text-[15px]">No</span>
                  )}
                </div>
              </div>
            )}
            {fieldPermissions.isDeleted && (
              <div className="flex flex-col">
                <div className="">
                  <span className="text-[15px] text-gray-600">Deleted</span>
                </div>
                <div className="">
                  {appointmentData.isDeleted ? (
                    <span className="text-red-600 font-bold text-[15px]">
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
          drafted: getRelativeTime(appointmentData.draftedAt),
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
