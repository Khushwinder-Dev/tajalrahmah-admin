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
  "Regular Checkup",
  "Emergency Visit",
  "Follow-up Visit",
  "Consultation",
  "Routine Checkup",
  "Specialist Visit",
  "Preventive Care",
  "Diagnostic Visit",
  "Treatment Visit",
  "Post-operative Visit",
  "Therapy Session",
  "Health Screening",
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
  const [selectedVisit, setSelectedVisit] = useState(
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

  // Get visit data based on selected visit
  const getVisitData = (visitType: string): DetailsPageTypes => {
    const visitMap: Record<string, DetailsPageTypes> = {
      "Regular Checkup": {
        ...initialData,
        patientId: "P001",
        visitBy: "Dr. Smith",
        selectOption: "Regular Checkup",
        visitDate: "2025-01-01",
        visitTime: "10:00 AM",
        finding: "Normal blood pressure, slight fever",
        instructions: "Rest for 2 days, take prescribed medication",
        fees: "150.00",
      },
      "Emergency Visit": {
        ...initialData,
        patientId: "P002",
        visitBy: "Dr. Johnson",
        selectOption: "Emergency Visit",
        visitDate: "2025-01-02",
        visitTime: "02:30 AM",
        finding: "Severe chest pain, elevated heart rate",
        instructions: "Immediate hospitalization required, monitor vitals",
        fees: "500.00",
      },
      "Follow-up Visit": {
        ...initialData,
        patientId: "P003",
        visitBy: "Dr. Brown",
        selectOption: "Follow-up Visit",
        visitDate: "2025-01-03",
        visitTime: "11:00 AM",
        finding: "Improvement in condition, healing well",
        instructions: "Continue current treatment, next visit in 2 weeks",
        fees: "100.00",
      },
      Consultation: {
        ...initialData,
        patientId: "P004",
        visitBy: "Dr. Wilson",
        selectOption: "Consultation",
        visitDate: "2025-01-04",
        visitTime: "09:30 AM",
        finding: "Complex case requiring specialist opinion",
        instructions: "Refer to cardiologist, additional tests needed",
        fees: "200.00",
      },
      "Routine Checkup": {
        ...initialData,
        patientId: "P005",
        visitBy: "Dr. Davis",
        selectOption: "Routine Checkup",
        visitDate: "2025-01-05",
        visitTime: "08:00 AM",
        finding: "All vitals normal, healthy condition",
        instructions: "Maintain current lifestyle, annual checkup recommended",
        fees: "120.00",
      },
      "Specialist Visit": {
        ...initialData,
        patientId: "P006",
        visitBy: "Dr. Miller",
        selectOption: "Specialist Visit",
        visitDate: "2025-01-06",
        visitTime: "03:00 PM",
        finding: "Specialized diagnosis confirmed, treatment plan established",
        instructions: "Follow specialist recommendations, regular monitoring",
        fees: "300.00",
      },
      "Preventive Care": {
        ...initialData,
        patientId: "P007",
        visitBy: "Dr. Garcia",
        selectOption: "Preventive Care",
        visitDate: "2025-01-07",
        visitTime: "10:30 AM",
        finding: "Preventive screening completed, no issues detected",
        instructions:
          "Continue preventive measures, next screening in 6 months",
        fees: "80.00",
      },
      "Diagnostic Visit": {
        ...initialData,
        patientId: "P008",
        visitBy: "Dr. Anderson",
        selectOption: "Diagnostic Visit",
        visitDate: "2025-01-08",
        visitTime: "01:00 PM",
        finding: "Diagnostic tests completed, results pending",
        instructions: "Await test results, follow up in 3 days",
        fees: "250.00",
      },
      "Treatment Visit": {
        ...initialData,
        patientId: "P009",
        visitBy: "Dr. Taylor",
        selectOption: "Treatment Visit",
        visitDate: "2025-01-09",
        visitTime: "11:30 AM",
        finding: "Treatment progress good, positive response",
        instructions: "Continue treatment protocol, adjust dosage if needed",
        fees: "180.00",
      },
      "Post-operative Visit": {
        ...initialData,
        patientId: "P010",
        visitBy: "Dr. Martinez",
        selectOption: "Post-operative Visit",
        visitDate: "2025-01-10",
        visitTime: "09:00 AM",
        finding: "Surgical site healing well, no complications",
        instructions: "Continue post-op care, remove stitches in 1 week",
        fees: "220.00",
      },
      "Therapy Session": {
        ...initialData,
        patientId: "P011",
        visitBy: "Dr. White",
        selectOption: "Therapy Session",
        visitDate: "2025-01-11",
        visitTime: "02:00 PM",
        finding: "Therapy progress satisfactory, improvement noted",
        instructions: "Continue therapy sessions, practice exercises at home",
        fees: "160.00",
      },
      "Health Screening": {
        ...initialData,
        patientId: "P012",
        visitBy: "Dr. Lee",
        selectOption: "Health Screening",
        visitDate: "2025-01-12",
        visitTime: "08:30 AM",
        finding: "Comprehensive health screening completed",
        instructions:
          "Maintain healthy lifestyle, regular exercise recommended",
        fees: "90.00",
      },
    };

    return visitMap[visitType] || initialData;
  };

  const [visitData, setVisitData] = useState<DetailsPageTypes>(
    getVisitData(selectedVisit)
  );

  const inputRef = useRef<HTMLInputElement>(null);

  // Update visit data when selection changes
  useEffect(() => {
    setVisitData(getVisitData(selectedVisit));
  }, [selectedVisit]);

  // Focus input when dropdown opens
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    console.log("isViewPage", isViewPage);
  }, []);

  const handlePrintVisit = (visitData: any) => {
    try {
      const html = PrintCommonLayout({
        title: `${location.pathname.split("/")[1]} Details`,
        data: [visitData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          ...printConfigFieldLabels,

          isDefault: "Default Visit",
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
    visitBy: "Visit By",
    selectOption: "Select Option",
    visitDate: "Visit Date",
    visitTime: "Visit Time",
    finding: "Finding",
    instructions: "Instructions",
    fees: "Fees",
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
      console.log("pdf click", visitData);
      const blob = await pdf(
        <GenericPDF
          data={[visitData]}
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
                  handlePrintVisit(visitData);
                }
              }
            : undefined
        }
      >
        <div dir={isRTL ? "rtl" : "ltr"}>
          {/* Row 1: Visit Selection, Visit Details */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            {fieldPermissions.slNo && (
              <div className="mt-1">
                <Autocomplete
                  options={autocompleteDataDetailsPage}
                  value={selectedVisit}
                  onValueChange={setSelectedVisit}
                  placeholder=" "
                  displayKey="name"
                  valueKey="name"
                  searchKey="name"
                  disabled={false}
                  className="w-[96%] bg-gray-100 rounded-xl"
                  labelClassName="bg-gray-50 rounded-2xl"
                  labelText="Select Option"
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
                    value={formatValue((visitData as any)[key])}
                  />
                ) : null
              )}

            {fieldPermissions.isActive && (
              <div className="flex flex-col">
                <div className="">
                  <span className="text-[15px] text-gray-600">Active</span>
                </div>
                <div className="">
                  {visitData.isActive ? (
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
                  {visitData.isDraft ? (
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
                  {visitData.isDeleted ? (
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
          created: getRelativeTime(visitData.createdAt),
          updated: getRelativeTime(visitData.updatedAt),
          drafted: getRelativeTime(visitData.draftedAt),
          deleted: getRelativeTime(visitData.deletedAt),
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
