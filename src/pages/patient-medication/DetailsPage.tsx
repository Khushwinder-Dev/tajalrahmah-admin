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
  "Paracetamol",
  "Amoxicillin",
  "Ibuprofen",
  "Metformin",
  "Lisinopril",
  "Omeprazole",
  "Atorvastatin",
  "Levothyroxine",
  "Metoprolol",
  "Warfarin",
  "Furosemide",
  "Prednisone",
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

export default function DoctorDetails() {
  const navigate = useNavigate();
  const { isRTL } = useSelector((state: RootState) => state.language);

  const location = useLocation();
  const detectedModule = getModuleFromPath(location.pathname);

  const [keepChanges, setKeepChanges] = useState(false);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [selectedMedication, setSelectedMedication] = useState(
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

  // Get medication data based on selected medication
  const getMedicationData = (medicineName: string): DetailsPageTypes => {
    const medicationMap: Record<string, DetailsPageTypes> = {
      Paracetamol: {
        ...initialData,
        patientId: "P001",
        medicineName: "Paracetamol",
        dosage: "500mg",
        perDayIntake: "3 times",
        fullStomach: "Yes",
        othersInstruction: "Take with water",
        fromDate: "2025-01-01",
        toDate: "2025-01-07",
        doctorName: "Dr. Smith",
        intakeTime: "08:00, 14:00, 20:00",
      },
      Amoxicillin: {
        ...initialData,
        patientId: "P002",
        medicineName: "Amoxicillin",
        dosage: "250mg",
        perDayIntake: "2 times",
        fullStomach: "No",
        othersInstruction: "Complete full course",
        fromDate: "2025-01-02",
        toDate: "2025-01-10",
        doctorName: "Dr. Johnson",
        intakeTime: "09:00, 21:00",
      },
      Ibuprofen: {
        ...initialData,
        patientId: "P003",
        medicineName: "Ibuprofen",
        dosage: "400mg",
        perDayIntake: "3 times",
        fullStomach: "Yes",
        othersInstruction: "Take with food",
        fromDate: "2025-01-03",
        toDate: "2025-01-05",
        doctorName: "Dr. Brown",
        intakeTime: "08:00, 14:00, 20:00",
      },
      Metformin: {
        ...initialData,
        patientId: "P004",
        medicineName: "Metformin",
        dosage: "500mg",
        perDayIntake: "2 times",
        fullStomach: "Yes",
        othersInstruction: "Monitor blood sugar",
        fromDate: "2025-01-04",
        toDate: "2025-01-30",
        doctorName: "Dr. Wilson",
        intakeTime: "08:00, 18:00",
      },
      Lisinopril: {
        ...initialData,
        patientId: "P005",
        medicineName: "Lisinopril",
        dosage: "10mg",
        perDayIntake: "1 time",
        fullStomach: "No",
        othersInstruction: "Take at same time daily",
        fromDate: "2025-01-05",
        toDate: "2025-02-05",
        doctorName: "Dr. Davis",
        intakeTime: "07:00",
      },
      Omeprazole: {
        ...initialData,
        patientId: "P006",
        medicineName: "Omeprazole",
        dosage: "20mg",
        perDayIntake: "1 time",
        fullStomach: "Yes",
        othersInstruction: "Take before breakfast",
        fromDate: "2025-01-06",
        toDate: "2025-01-20",
        doctorName: "Dr. Miller",
        intakeTime: "07:30",
      },
      Atorvastatin: {
        ...initialData,
        patientId: "P007",
        medicineName: "Atorvastatin",
        dosage: "40mg",
        perDayIntake: "1 time",
        fullStomach: "No",
        othersInstruction: "Take at bedtime",
        fromDate: "2025-01-07",
        toDate: "2025-02-07",
        doctorName: "Dr. Garcia",
        intakeTime: "22:00",
      },
      Levothyroxine: {
        ...initialData,
        patientId: "P008",
        medicineName: "Levothyroxine",
        dosage: "50mcg",
        perDayIntake: "1 time",
        fullStomach: "No",
        othersInstruction: "Take on empty stomach",
        fromDate: "2025-01-08",
        toDate: "2025-02-08",
        doctorName: "Dr. Anderson",
        intakeTime: "06:00",
      },
      Metoprolol: {
        ...initialData,
        patientId: "P009",
        medicineName: "Metoprolol",
        dosage: "25mg",
        perDayIntake: "2 times",
        fullStomach: "Yes",
        othersInstruction: "Monitor blood pressure",
        fromDate: "2025-01-09",
        toDate: "2025-01-23",
        doctorName: "Dr. Taylor",
        intakeTime: "08:00, 20:00",
      },
      Warfarin: {
        ...initialData,
        patientId: "P010",
        medicineName: "Warfarin",
        dosage: "5mg",
        perDayIntake: "1 time",
        fullStomach: "No",
        othersInstruction: "Regular INR monitoring required",
        fromDate: "2025-01-10",
        toDate: "2025-02-10",
        doctorName: "Dr. Martinez",
        intakeTime: "18:00",
      },
      Furosemide: {
        ...initialData,
        patientId: "P011",
        medicineName: "Furosemide",
        dosage: "40mg",
        perDayIntake: "1 time",
        fullStomach: "No",
        othersInstruction: "Take in morning",
        fromDate: "2025-01-11",
        toDate: "2025-01-25",
        doctorName: "Dr. White",
        intakeTime: "09:00",
      },
      Prednisone: {
        ...initialData,
        patientId: "P012",
        medicineName: "Prednisone",
        dosage: "10mg",
        perDayIntake: "1 time",
        fullStomach: "Yes",
        othersInstruction: "Taper dose as directed",
        fromDate: "2025-01-12",
        toDate: "2025-01-26",
        doctorName: "Dr. Lee",
        intakeTime: "08:00",
      },
    };

    return medicationMap[medicineName] || initialData;
  };

  const [medicationData, setMedicationData] = useState<DetailsPageTypes>(
    getMedicationData(selectedMedication)
  );

  const inputRef = useRef<HTMLInputElement>(null);

  // Update medication data when selection changes
  useEffect(() => {
    setMedicationData(getMedicationData(selectedMedication));
  }, [selectedMedication]);

  // Focus input when dropdown opens
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    console.log("isViewPage", isViewPage);
  }, []);

  const handlePrintMedication = (medicationData: any) => {
    try {
      const html = PrintCommonLayout({
        title: `${location.pathname.split("/")[1]} Details`,
        data: [medicationData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          ...printConfigFieldLabels,

          isDefault: "Default Medication",
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
    slNo: "SL.NO",
    patientId: "Patient ID",
    medicineName: "Medicine Name",
    dosage: "Dosage",
    perDayIntake: "Per Day Intake",
    fullStomach: "Full Stomach",
    othersInstruction: "Others Instruction",
    fromDate: "From Date",
    toDate: "To Date",
    doctorName: "Doctor Name",
    intakeTime: "Intake Time",
  };

  const excludedKeysForLoop = new Set([
    "slNo", // update it
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
      console.log("pdf click", medicationData);
      const blob = await pdf(
        <GenericPDF
          data={[medicationData]}
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
                  handlePrintMedication(medicationData);
                }
              }
            : undefined
        }
      >
        <div dir={isRTL ? "rtl" : "ltr"}>
          {/* Row 1: Package Selection, Package Details */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            {fieldPermissions.slNo && (
              <div className="mt-1">
                <Autocomplete
                  options={autocompleteDataDetailsPage}
                  value={selectedMedication}
                  onValueChange={setSelectedMedication}
                  placeholder=" "
                  displayKey="name"
                  valueKey="name"
                  searchKey="name"
                  disabled={false}
                  className="w-[96%] bg-gray-100 rounded-xl"
                  labelClassName="bg-gray-50 rounded-2xl"
                  labelText="Medicine Name"
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
                    value={formatValue((medicationData as any)[key])}
                  />
                ) : null
              )}

            {fieldPermissions.isActive && (
              <div className="flex flex-col">
                <div className="">
                  <span className="text-[15px] text-gray-600">Active</span>
                </div>
                <div className="">
                  {medicationData.isActive ? (
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
                  {medicationData.isDraft ? (
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
                  {medicationData.isDeleted ? (
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
          created: getRelativeTime(medicationData.createdAt),
          updated: getRelativeTime(medicationData.updatedAt),
          drafted: getRelativeTime(medicationData.draftedAt),
          deleted: getRelativeTime(medicationData.deletedAt),
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
