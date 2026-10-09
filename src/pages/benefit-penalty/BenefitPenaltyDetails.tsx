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
import { Modal } from "@mantine/core";
import { Button } from "@/components/ui/button";

type BenefitPenaltyData = {
  type: string;
  subject: string;
  criteria: string;
  date: string;
  driver: string;
  formality: string;
  description: string;
  isActive: boolean;
  isDraft: boolean;
  createdAt: Date | null;
  draftedAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;
  isDeleted: boolean;
};

const initialData: BenefitPenaltyData = {
  type: "Benefit",
  subject: "Performance Bonus",
  criteria: "Exceeds targets by 20%",
  date: "2024-02-15",
  driver: "Ahmed Al-Rashid",
  formality: "Monthly Review",
  description: "Outstanding performance in Q1 2024",
  isActive: true,
  isDraft: false,
  createdAt: new Date(),
  draftedAt: null,
  updatedAt: new Date(),
  deletedAt: null,
  isDeleted: false,
};

// Type options for autocomplete
const typeOptions = ["Benefit", "Penalty"];

// Subject options for autocomplete
const subjectOptions = [
  "Performance Bonus",
  "Late Arrival",
  "Safety Award",
  "Vehicle Damage",
  "Customer Service",
  "Route Deviation",
  "Fuel Efficiency",
  "Documentation",
  "Team Player",
  "Vehicle Maintenance",
  "Innovation",
  "Communication",
  "Attendance",
  "Equipment Misuse",
  "Cost Savings",
  "Policy Violation",
  "Training Completion",
  "Quality Issues",
  "Leadership",
  "Time Management",
];

// Driver options for autocomplete
const driverOptions = [
  "Ahmed Al-Rashid",
  "Mohammed Al-Zahrani",
  "Omar Al-Saadi",
  "Khalid Al-Mansouri",
  "Abdullah Al-Qahtani",
  "Hassan Al-Otaibi",
  "Saleh Al-Harbi",
  "Fahad Al-Dossary",
  "Yousef Al-Shammari",
  "Ibrahim Al-Rashid",
  "Nasser Al-Mutairi",
  "Majed Al-Zahrani",
  "Sami Al-Ghamdi",
  "Rashid Al-Sulaiman",
  "Tariq Al-Nasser",
  "Waleed Al-Qahtani",
  "Hamad Al-Mansouri",
  "Saud Al-Zahrani",
  "Khalil Al-Rashid",
  "Adel Al-Saadi",
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

export default function BenefitPenaltyDetailsPage() {
  const navigate = useNavigate();
  const { isRTL } = useSelector((state: RootState) => state.language);

  const [keepChanges, setKeepChanges] = useState(false);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [selectedType, setSelectedType] = useState("Benefit");
  const [selectedSubject, setSelectedSubject] = useState("Performance Bonus");
  const [selectedDriver, setSelectedDriver] = useState("Ahmed Al-Rashid");
  const location = useLocation();
  const isViewPage = location.pathname.includes("/view");
  const [pdfChecked, setPdfChecked] = useState(false);
  const [printEnabled, setPrintEnabled] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  // Driver modal states
  const [isDriverModalOpen, setIsDriverModalOpen] = useState(false);
  const [selectedDriverData, setSelectedDriverData] = useState<{
    name: string;
    designation: string;
    photo: string;
    iqamaImage: string;
  } | null>(null);

  // get permission
  const canCreate: boolean = usePermission("benefitPenalty", "create");
  const canView: boolean = usePermission("benefitPenalty", "view");
  const canEdit: boolean = usePermission("benefitPenalty", "edit");
  const canDelete: boolean = usePermission("benefitPenalty", "delete");
  const canExport: boolean = usePermission("benefitPenalty", "export");
  const canPdf: boolean = usePermission("benefitPenalty", "pdf");
  const canPrint: boolean = usePermission("benefitPenalty", "print");
  const canSeeHistory: boolean = usePermission("benefitPenalty", "history");

  // Field-level permissions
  const canViewType: boolean = usePermission("benefitPenalty", "view", "type");
  const canViewSubject: boolean = usePermission(
    "benefitPenalty",
    "view",
    "subject"
  );
  const canViewCriteria: boolean = usePermission(
    "benefitPenalty",
    "view",
    "criteria"
  );
  const canViewDate: boolean = usePermission("benefitPenalty", "view", "date");
  const canViewDriver: boolean = usePermission(
    "benefitPenalty",
    "view",
    "driver"
  );
  const canViewFormality: boolean = usePermission(
    "benefitPenalty",
    "view",
    "formality"
  );
  const canViewDescription: boolean = usePermission(
    "benefitPenalty",
    "view",
    "description"
  );
  const canViewIsActive: boolean = usePermission(
    "benefitPenalty",
    "view",
    "isActive"
  );
  const canViewIsDraft: boolean = usePermission(
    "benefitPenalty",
    "view",
    "isDraft"
  );
  const canViewIsDeleted: boolean = usePermission(
    "benefitPenalty",
    "view",
    "isDeleted"
  );

  console.log("canCreate", canCreate);
  console.log("canView", canView);
  console.log("canEdit", canEdit);
  console.log("canDelete", canDelete);
  console.log("canExport", canExport);

  // Get benefit penalty data based on selected type
  const getBenefitPenaltyData = (type: string): BenefitPenaltyData => {
    const benefitPenaltyMap: Record<string, BenefitPenaltyData> = {
      Benefit: {
        type: "Benefit",
        subject: "Performance Bonus",
        criteria: "Exceeds targets by 20%",
        date: "2024-02-15",
        driver: "Ahmed Al-Rashid",
        formality: "Monthly Review",
        description: "Outstanding performance in Q1 2024",
        isActive: true,
        isDraft: false,
        createdAt: new Date("2024-01-15T10:30:00Z"),
        draftedAt: null,
        updatedAt: new Date("2024-01-20T14:45:00Z"),
        deletedAt: null,
        isDeleted: false,
      },
      Penalty: {
        type: "Penalty",
        subject: "Late Arrival",
        criteria: "3+ late arrivals in month",
        date: "2024-02-10",
        driver: "Mohammed Al-Zahrani",
        formality: "HR Warning",
        description: "Multiple late arrivals without notice",
        isActive: true,
        isDraft: false,
        createdAt: new Date("2024-01-16T09:15:00Z"),
        draftedAt: null,
        updatedAt: new Date("2024-01-21T11:30:00Z"),
        deletedAt: null,
        isDeleted: false,
      },
    };

    return benefitPenaltyMap[type] || initialData;
  };

  const [benefitPenaltyData, setBenefitPenaltyData] =
    useState<BenefitPenaltyData>(getBenefitPenaltyData(selectedType));

  const inputRef = useRef<HTMLInputElement>(null);

  // Driver data mapping
  const driverData: Record<
    string,
    {
      name: string;
      designation: string;
      photo: string;
      iqamaImage: string;
    }
  > = {
    "Ahmed Al-Rashid": {
      name: "Ahmed Al-Rashid",
      designation: "Senior Driver",
      photo:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face&auto=format",
      iqamaImage:
        "https://agtsipk.com/wp-content/uploads/2023/09/What-is-Iqama-in-Saudi-Arabia-4-1.png",
    },
    "Mohammed Al-Zahrani": {
      name: "Mohammed Al-Zahrani",
      designation: "Delivery Driver",
      photo:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face&auto=format",
      iqamaImage:
        "https://agtsipk.com/wp-content/uploads/2023/09/What-is-Iqama-in-Saudi-Arabia-4-1.png",
    },
    "Omar Al-Saadi": {
      name: "Omar Al-Saadi",
      designation: "Fleet Driver",
      photo:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face&auto=format",
      iqamaImage:
        "https://agtsipk.com/wp-content/uploads/2023/09/What-is-Iqama-in-Saudi-Arabia-4-1.png",
    },
    "Khalid Al-Mansouri": {
      name: "Khalid Al-Mansouri",
      designation: "Transport Driver",
      photo:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face&auto=format",
      iqamaImage:
        "https://agtsipk.com/wp-content/uploads/2023/09/What-is-Iqama-in-Saudi-Arabia-4-1.png",
    },
    "Abdullah Al-Qahtani": {
      name: "Abdullah Al-Qahtani",
      designation: "Logistics Driver",
      photo:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face&auto=format",
      iqamaImage:
        "https://agtsipk.com/wp-content/uploads/2023/09/What-is-Iqama-in-Saudi-Arabia-4-1.png",
    },
  };

  // Update benefit penalty data when selection changes
  useEffect(() => {
    const newBenefitPenaltyData = getBenefitPenaltyData(selectedType);
    setBenefitPenaltyData(newBenefitPenaltyData);
    setSelectedSubject(newBenefitPenaltyData.subject);
    setSelectedDriver(newBenefitPenaltyData.driver);
  }, [selectedType]);

  // Handle Driver change to show driver details
  const handleDriverChange = (value: string) => {
    setSelectedDriver(value);

    // Show driver details if valid driver is selected
    if (value && driverData[value]) {
      setSelectedDriverData(driverData[value]);
      setIsDriverModalOpen(true);
    }
  };

  // Focus input when dropdown opens
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    console.log("isViewPage", isViewPage);
  }, []);

  const handlePrintBenefitPenalty = (benefitPenaltyData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Benefit/Penalty Details",
        data: [benefitPenaltyData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          type: "Type",
          subject: "Subject",
          criteria: "Criteria",
          date: "Date",
          driver: "Driver",
          formality: "Formality",
          description: "Description",
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
      console.log("benefitPenaltyData on pdf click", benefitPenaltyData);
      const blob = await pdf(
        <GenericPDF
          data={[benefitPenaltyData]}
          title="Benefit/Penalty Details"
          subtitle="Benefit/Penalty Information"
        />
      ).toBlob();

      console.log("blob", blob);

      const url = URL.createObjectURL(blob);
      console.log("url", url);
      const a = document.createElement("a");
      a.href = url;
      a.download = "benefit-penalty-details.pdf";
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
        title="Viewing Benefit/Penalty"
        videoSrc={video}
        videoHeader="Tutorial video"
        onListClick={() => navigate("/benefit-penalty")}
        listText="List"
        listPath="benefit-penalty"
        activePage="view"
        popoverOptions={[
          {
            label: "Create",
            icon: <Plus className="w-5 h-5 text-green-600" />,
            onClick: () => navigate("/benefit-penalty/create"),
          },
          {
            label: "Edit",
            icon: <Edit className="w-5 h-5 text-blue-600" />,
            onClick: () => navigate("/benefit-penalty/edit/1"),
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
                  handlePrintBenefitPenalty(benefitPenaltyData);
                }
              }
            : undefined
        }
      >
        <div dir={isRTL ? "rtl" : "ltr"}>
          {/* Row 1: Type, Subject, Driver, Date */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            {canViewType && (
              <div className="mt-1">
                <Autocomplete
                  options={typeOptions}
                  value={selectedType}
                  onValueChange={setSelectedType}
                  placeholder="Select Type..."
                  displayKey="type"
                  valueKey="type"
                  searchKey="type"
                  disabled={false}
                  className="w-[96%] bg-gray-100 rounded-xl"
                  labelClassName="bg-gray-50 rounded-2xl"
                  labelText="Type"
                  inputClassName="border-none bg-stone-50 focus-visible:ring-offset-0 focus-visible:ring-0 focus-visible:border-2! focus-visible:border-blue-500"
                />
              </div>
            )}

            {canViewSubject && (
              <div className="mt-1">
                <Autocomplete
                  options={subjectOptions}
                  value={selectedSubject}
                  onValueChange={setSelectedSubject}
                  placeholder="Select Subject..."
                  displayKey="subject"
                  valueKey="subject"
                  searchKey="subject"
                  disabled={false}
                  className="w-[96%] bg-gray-100 rounded-xl"
                  labelClassName="bg-gray-50 rounded-2xl"
                  labelText="Subject"
                  inputClassName="border-none bg-stone-50 focus-visible:ring-offset-0 focus-visible:ring-0 focus-visible:border-2! focus-visible:border-blue-500"
                />
              </div>
            )}

            {canViewDriver && (
              <div className="mt-1">
                <Autocomplete
                  options={driverOptions}
                  value={selectedDriver}
                  onValueChange={handleDriverChange}
                  placeholder="Select Driver..."
                  displayKey="driver"
                  valueKey="driver"
                  searchKey="driver"
                  disabled={false}
                  className="w-[96%] bg-gray-100 rounded-xl"
                  labelClassName="bg-gray-50 rounded-2xl"
                  labelText="Driver"
                  inputClassName="border-none bg-stone-50 focus-visible:ring-offset-0 focus-visible:ring-0 focus-visible:border-2! focus-visible:border-blue-500"
                />
              </div>
            )}

            {canViewDate && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Date</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(benefitPenaltyData.date)}
                </div>
              </div>
            )}
          </div>

          {/* Row 2: Criteria, Formality, Description */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
            {canViewCriteria && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Criteria</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(benefitPenaltyData.criteria)}
                </div>
              </div>
            )}

            {canViewFormality && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Formality</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(benefitPenaltyData.formality)}
                </div>
              </div>
            )}

            {canViewDescription && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Description</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(benefitPenaltyData.description)}
                </div>
              </div>
            )}

            {canViewIsActive && (
              <div className="flex flex-col">
                <div className="">
                  <span className="text-[15px] text-gray-600">Active</span>
                </div>
                <div className="">
                  {benefitPenaltyData.isActive ? (
                    <span className="font-bold text-[15px]">Yes</span>
                  ) : (
                    <span className="font-bold text-[15px]">No</span>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Row 3: Status fields */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
            {canViewIsDraft && (
              <div className="flex flex-col">
                <div className="">
                  <span className="text-[15px] text-gray-600">Draft</span>
                </div>
                <div className="">
                  {benefitPenaltyData.isDraft ? (
                    <span className="text-orange-600 font-bold text-[15px]">
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
                  {benefitPenaltyData.isDeleted ? (
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
          created: getRelativeTime(benefitPenaltyData.createdAt),
          updated: getRelativeTime(benefitPenaltyData.updatedAt),
          drafted: getRelativeTime(benefitPenaltyData.draftedAt),
          deleted: getRelativeTime(benefitPenaltyData.deletedAt),
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

      {/* Driver Details Modal */}
      <Modal
        opened={isDriverModalOpen}
        onClose={() => setIsDriverModalOpen(false)}
        title="Driver Details"
        size="lg"
        overlayProps={{ backgroundOpacity: 0.55, blur: 3 }}
        centered
      >
        {selectedDriverData && (
          <div className="p-6">
            {/* Driver Header with Photo and Basic Info */}
            <div className="flex items-center gap-6 mb-6">
              <div className="flex-shrink-0">
                <img
                  src={selectedDriverData.photo}
                  alt={selectedDriverData.name}
                  className="w-20 h-20 rounded-full object-cover border-4 border-blue-100 shadow-lg"
                />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 mb-1">
                  {selectedDriverData.name}
                </h2>
                <p className="text-lg text-gray-600 font-medium">
                  {selectedDriverData.designation}
                </p>
                <div className="mt-2 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                  Active Driver
                </div>
              </div>
            </div>

            {/* Iqama Card Section */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border-2 border-green-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  Iqama Card
                </h3>
                <span className="text-sm font-medium text-green-700 bg-green-100 px-3 py-1 rounded-full">
                  Verified ✓
                </span>
              </div>

              {/* Iqama Card Display */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden border-2 border-green-300">
                <div className="bg-green-600 text-white px-4 py-2 text-center font-bold">
                  Kingdom of Saudi Arabia - Iqama Card
                </div>
                <div className="p-4">
                  <img
                    src={selectedDriverData.iqamaImage}
                    alt="Iqama Card"
                    className="w-full h-48 object-cover rounded-lg shadow-md"
                  />
                  <div className="mt-4 text-center">
                    <p className="text-sm text-gray-600">Driver Name</p>
                    <p className="text-lg font-bold text-gray-900">
                      {selectedDriver}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-6">
              <Button
                onClick={() => setIsDriverModalOpen(false)}
                className="flex-1 bg-sky-500 hover:bg-sky-600 text-white font-medium py-3 rounded-full transition-colors"
              >
                Continue with Application
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
