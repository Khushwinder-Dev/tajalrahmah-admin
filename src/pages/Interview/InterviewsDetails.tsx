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
// Removed unused Modal and Button imports for interview details

type InterviewData = {
  interviewDate: string;
  candidateName: string;
  interviewer: string;
  vivaMarks: number;
  writtenTotalMarks: number;
  mcqTotalMarks: number;
  totalMarks: number;
  recommendation: boolean;
  selectInterviewer: string;
  details: string;
  isDraft: boolean;
  createdAt: Date | null;
  draftedAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;
  isDeleted: boolean;
};

const initialData: InterviewData = {
  interviewDate: "2024-02-15",
  candidateName: "John Doe",
  interviewer: "Jane Smith",
  vivaMarks: 18,
  writtenTotalMarks: 75,
  mcqTotalMarks: 40,
  totalMarks: 133,
  recommendation: true,
  selectInterviewer: "Jane Smith",
  details: "Strong problem-solving skills",
  isDraft: false,
  createdAt: new Date(),
  draftedAt: null,
  updatedAt: new Date(),
  deletedAt: null,
  isDeleted: false,
};

// Candidate and Interviewer options for autocomplete
const candidateOptions = [
  "John Doe",
  "Mary Johnson",
  "Ali Hassan",
  "Noah Brown",
  "Emma Wilson",
  "Liam Martinez",
  "Olivia Taylor",
  "William Anderson",
  "Sophia Thomas",
  "James Scott",
  "Ava Robinson",
  "Mia Clark",
];
const interviewerOptions = [
  "Jane Smith",
  "Ahmed Khan",
  "Sara Lee",
  "Emily Davis",
  "Omar Faruk",
  "Priya Patel",
  "Mohammed Ali",
  "Fatima Noor",
  "David Kim",
  "Ibrahim Musa",
  "Chen Wei",
  "Yuki Tanaka",
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

export default function InterviewsDetailsPage() {
  const navigate = useNavigate();
  const { isRTL } = useSelector((state: RootState) => state.language);

  const [keepChanges, setKeepChanges] = useState(false);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState("John Doe");
  const [selectedInterviewer, setSelectedInterviewer] = useState("Jane Smith");
  const location = useLocation();
  const isViewPage = location.pathname.includes("/view");
  const [pdfChecked, setPdfChecked] = useState(false);
  const [printEnabled, setPrintEnabled] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  // No employee modal in interview details

  // get permission
  const canCreate: boolean = usePermission("interview", "create");
  const canView: boolean = usePermission("interview", "view");
  const canEdit: boolean = usePermission("interview", "edit");
  const canDelete: boolean = usePermission("interview", "delete");
  const canExport: boolean = usePermission("interview", "export");
  const canPdf: boolean = usePermission("interview", "pdf");
  const canPrint: boolean = usePermission("interview", "print");
  const canSeeHistory: boolean = usePermission("interview", "history");

  // Field-level permissions
  const canViewInterviewDate: boolean = usePermission(
    "interview",
    "view",
    "interviewDate"
  );
  const canViewCandidateName: boolean = usePermission(
    "interview",
    "view",
    "candidateName"
  );
  const canViewInterviewer: boolean = usePermission(
    "interview",
    "view",
    "interviewer"
  );
  const canViewViva: boolean = usePermission("interview", "view", "vivaMarks");
  const canViewWritten: boolean = usePermission(
    "interview",
    "view",
    "writtenTotalMarks"
  );
  const canViewMcq: boolean = usePermission(
    "interview",
    "view",
    "mcqTotalMarks"
  );
  const canViewTotal: boolean = usePermission(
    "interview",
    "view",
    "totalMarks"
  );
  const canViewRecommendation: boolean = usePermission(
    "interview",
    "view",
    "recommendation"
  );
  const canViewSelectInterviewer: boolean = usePermission(
    "interview",
    "view",
    "selectInterviewer"
  );
  const canViewDetails: boolean = usePermission("interview", "view", "details");
  const canViewIsDraft: boolean = usePermission("interview", "view", "isDraft");
  const canViewIsDeleted: boolean = usePermission(
    "interview",
    "view",
    "isDeleted"
  );

  console.log("canCreate", canCreate);
  console.log("canView", canView);
  console.log("canEdit", canEdit);
  console.log("canDelete", canDelete);
  console.log("canExport", canExport);

  // Get interview data based on selected candidate
  const getInterviewData = (candidateName: string): InterviewData => {
    const interviewMap: Record<string, InterviewData> = {
      "John Doe": initialData,
      "Mary Johnson": {
        interviewDate: "2024-02-10",
        candidateName: "Mary Johnson",
        interviewer: "Ahmed Khan",
        vivaMarks: 15,
        writtenTotalMarks: 68,
        mcqTotalMarks: 35,
        totalMarks: 118,
        recommendation: true,
        selectInterviewer: "Ahmed Khan",
        details: "Good communication",
        isDraft: false,
        createdAt: new Date("2024-01-16T09:15:00Z"),
        draftedAt: null,
        updatedAt: new Date("2024-01-21T11:30:00Z"),
        deletedAt: null,
        isDeleted: false,
      },
    };
    return interviewMap[candidateName] || initialData;
  };

  const [interviewData, setInterviewData] = useState<InterviewData>(
    getInterviewData(selectedCandidate)
  );

  const inputRef = useRef<HTMLInputElement>(null);

  // No employee IQAMA map for interview details

  // Update interview data when selection changes
  useEffect(() => {
    const newData = getInterviewData(selectedCandidate);
    setInterviewData(newData);
    setSelectedInterviewer(newData.interviewer);
  }, [selectedCandidate]);

  // Handle interviewer change
  const handleInterviewerChange = (value: string) => {
    setSelectedInterviewer(value);
    setInterviewData((prev) => ({ ...prev, interviewer: value }));
  };

  // Focus input when dropdown opens
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    console.log("isViewPage", isViewPage);
  }, []);

  const handlePrintInterview = (tData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Interview Details",
        data: [tData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          interviewDate: "Interview Date",
          candidateName: "Candidate Name",
          interviewer: "Interviewer",
          vivaMarks: "Viva Marks",
          writtenTotalMarks: "Written Total Marks",
          mcqTotalMarks: "MCQ Total Marks",
          totalMarks: "Total Marks",
          recommendation: "Recommendation",
          selectInterviewer: "Select Interviewer",
          details: "Details",
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
      console.log("interviewData on pdf click", interviewData);
      const blob = await pdf(
        <GenericPDF
          data={[interviewData]}
          title="Interview Details"
          subtitle="Interview Information"
        />
      ).toBlob();

      console.log("blob", blob);

      const url = URL.createObjectURL(blob);
      console.log("url", url);
      const a = document.createElement("a");
      a.href = url;
      a.download = "interview-details.pdf";
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
        title="Viewing Interview"
        videoSrc={video}
        videoHeader="Tutorial video"
        onListClick={() => navigate("/interview")}
        listText="List"
        listPath="interview"
        activePage="view"
        popoverOptions={[
          {
            label: "Create",
            icon: <Plus className="w-5 h-5 text-green-600" />,
            onClick: () => navigate("/interview/create"),
          },
          {
            label: "Edit",
            icon: <Edit className="w-5 h-5 text-blue-600" />,
            onClick: () => navigate("/interview/edit/1"),
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

                if (pdfChecked) handleExportPDF();
                if (printEnabled) handlePrintInterview(interviewData);
              }
            : undefined
        }
      >
        <div dir={isRTL ? "rtl" : "ltr"}>
          {/* Row 1: Candidate, Interviewer, Interview Date */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            {canViewCandidateName && (
              <div className="mt-1">
                <Autocomplete
                  options={candidateOptions}
                  value={selectedCandidate}
                  onValueChange={setSelectedCandidate}
                  placeholder="Select candidate..."
                  displayKey="candidateName"
                  valueKey="candidateName"
                  searchKey="candidateName"
                  disabled={false}
                  className="w-[96%] bg-gray-100 rounded-xl"
                  labelClassName="bg-gray-50 rounded-2xl"
                  labelText="Candidate Name"
                  inputClassName="border-none bg-stone-50 focus-visible:ring-offset-0 focus-visible:ring-0 focus-visible:border-2! focus-visible:border-blue-500"
                />
              </div>
            )}

            {canViewInterviewer && (
              <div className="mt-1">
                <Autocomplete
                  options={interviewerOptions}
                  value={selectedInterviewer}
                  onValueChange={handleInterviewerChange}
                  placeholder="Select interviewer..."
                  displayKey="interviewer"
                  valueKey="interviewer"
                  searchKey="interviewer"
                  disabled={false}
                  className="w-[96%] bg-gray-100 rounded-xl"
                  labelClassName="bg-gray-50 rounded-2xl"
                  labelText="Interviewer"
                  inputClassName="border-none bg-stone-50 focus-visible:ring-offset-0 focus-visible:ring-0 focus-visible:border-2! focus-visible:border-blue-500"
                />
              </div>
            )}

            {canViewInterviewDate && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">
                  Interview Date
                </h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(interviewData.interviewDate)}
                </div>
              </div>
            )}

            {canViewViva && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Viva Marks</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(interviewData.vivaMarks)}
                </div>
              </div>
            )}
          </div>

          {/* Row 2: Marks and Total */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
            {canViewWritten && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">
                  Written Total Marks
                </h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(interviewData.writtenTotalMarks)}
                </div>
              </div>
            )}

            {canViewMcq && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">
                  MCQ Total Marks
                </h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(interviewData.mcqTotalMarks)}
                </div>
              </div>
            )}

            {canViewTotal && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Total Marks</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(interviewData.totalMarks)}
                </div>
              </div>
            )}

            {canViewRecommendation && (
              <div className="flex flex-col">
                <div className="">
                  <span className="text-[15px] text-gray-600">
                    Recommendation
                  </span>
                </div>
                <div className="">
                  {interviewData.recommendation ? (
                    <span className="font-bold text-[15px]">Recommended</span>
                  ) : (
                    <span className="font-bold text-[15px]">
                      Not Recommended
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Row 3: Recommendation, Draft, Deleted */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
            {canViewSelectInterviewer && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">
                  Select Interviewer
                </h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(
                    interviewData.selectInterviewer || selectedInterviewer
                  )}
                </div>
              </div>
            )}
            {canViewDetails && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Details</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(interviewData.details)}
                </div>
              </div>
            )}

            {canViewIsDraft && (
              <div className="flex flex-col">
                <div className="">
                  <span className="text-[15px] text-gray-600">Draft</span>
                </div>
                <div className="">
                  {interviewData.isDraft ? (
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
                  {interviewData.isDeleted ? (
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
          created: getRelativeTime(interviewData.createdAt),
          updated: getRelativeTime(interviewData.updatedAt),
          drafted: getRelativeTime(interviewData.draftedAt),
          deleted: getRelativeTime(interviewData.deletedAt),
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

      {/* Removed employee modal for interview details */}
    </>
  );
}
