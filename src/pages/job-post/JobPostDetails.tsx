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

type JobPostData = {
  sn: string;
  company: string;
  jobTitle: string;
  jobCategory: string;
  jobType: string;
  noOfVacancies: number;
  closingDate: string;
  gender: string;
  minimumExperience: string;
  isFeatured: boolean;
  status: string;
  shortDescription: string;
  longDescription: string;
  isActive: boolean;
  isDraft: boolean;
  createdAt: Date | null;
  updatedAt: Date | null;
  isDeleted: boolean;
};

const initialData: JobPostData = {
  sn: "001",
  company: "Tech Solutions Inc",
  jobTitle: "Senior React Developer",
  jobCategory: "Software Development",
  jobType: "Full-time",
  noOfVacancies: 3,
  closingDate: "2024-02-15",
  gender: "Any",
  minimumExperience: "5 years",
  isFeatured: true,
  status: "Active",
  shortDescription:
    "Experienced React developer needed for enterprise applications",
  longDescription:
    "We are looking for a senior React developer with 5+ years of experience in building scalable web applications.",
  isActive: true,
  isDraft: false,
  createdAt: new Date(),
  updatedAt: new Date(),
  isDeleted: false,
};

// Job Post options for autocomplete
const jobPostOptions = [
  "001 - Senior React Developer - Tech Solutions Inc",
  "002 - Marketing Manager - Digital Marketing Pro",
  "003 - Financial Analyst - Finance Corp",
  "004 - Healthcare Administrator - Healthcare Plus",
  "005 - Education Coordinator - Education First",
  "006 - Logistics Manager - Logistics Express",
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

export default function JobPostDetailsPage() {
  const navigate = useNavigate();
  const { isRTL } = useSelector((state: RootState) => state.language);

  const [keepChanges, setKeepChanges] = useState(false);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [selectedJobPost, setSelectedJobPost] = useState(
    "001 - Senior React Developer - Tech Solutions Inc"
  );
  const location = useLocation();
  const isViewPage = location.pathname.includes("/view");
  const [pdfChecked, setPdfChecked] = useState(false);
  const [printEnabled, setPrintEnabled] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  // get permission
  const canCreate: boolean = usePermission("jobPost", "create");
  const canView: boolean = usePermission("jobPost", "view");
  const canEdit: boolean = usePermission("jobPost", "edit");
  const canDelete: boolean = usePermission("jobPost", "delete");
  const canExport: boolean = usePermission("jobPost", "export");
  const canPdf: boolean = usePermission("jobPost", "pdf");
  const canPrint: boolean = usePermission("jobPost", "print");
  const canSeeHistory: boolean = usePermission("jobPost", "history");

  // Field-level permissions
  const canViewSn: boolean = usePermission("jobPost", "view", "sn");
  const canViewCompany: boolean = usePermission("jobPost", "view", "company");
  const canViewJobTitle: boolean = usePermission("jobPost", "view", "jobTitle");
  const canViewJobCategory: boolean = usePermission(
    "jobPost",
    "view",
    "jobCategory"
  );
  const canViewJobType: boolean = usePermission("jobPost", "view", "jobType");
  const canViewNoOfVacancies: boolean = usePermission(
    "jobPost",
    "view",
    "noOfVacancies"
  );
  const canViewClosingDate: boolean = usePermission(
    "jobPost",
    "view",
    "closingDate"
  );
  const canViewGender: boolean = usePermission("jobPost", "view", "gender");
  const canViewMinimumExperience: boolean = usePermission(
    "jobPost",
    "view",
    "minimumExperience"
  );
  const canViewIsFeatured: boolean = usePermission(
    "jobPost",
    "view",
    "isFeatured"
  );
  const canViewStatus: boolean = usePermission("jobPost", "view", "status");
  const canViewShortDescription: boolean = usePermission(
    "jobPost",
    "view",
    "shortDescription"
  );
  const canViewLongDescription: boolean = usePermission(
    "jobPost",
    "view",
    "longDescription"
  );

  console.log("canCreate", canCreate);
  console.log("canView", canView);
  console.log("canEdit", canEdit);
  console.log("canDelete", canDelete);
  console.log("canExport", canExport);

  // Get job post data based on selected job post
  const getJobPostData = (jobPostName: string): JobPostData => {
    const jobPostMap: Record<string, JobPostData> = {
      "001 - Senior React Developer - Tech Solutions Inc": {
        sn: "001",
        company: "Tech Solutions Inc",
        jobTitle: "Senior React Developer",
        jobCategory: "Software Development",
        jobType: "Full-time",
        noOfVacancies: 3,
        closingDate: "2024-02-15",
        gender: "Any",
        minimumExperience: "5 years",
        isFeatured: true,
        status: "Active",
        shortDescription:
          "Experienced React developer needed for enterprise applications",
        longDescription:
          "We are looking for a senior React developer with 5+ years of experience in building scalable web applications.",
        isActive: true,
        isDraft: false,
        createdAt: new Date("2024-01-15T10:30:00Z"),
        updatedAt: new Date("2024-01-20T14:45:00Z"),
        isDeleted: false,
      },
      "002 - Marketing Manager - Digital Marketing Pro": {
        sn: "002",
        company: "Digital Marketing Pro",
        jobTitle: "Marketing Manager",
        jobCategory: "Marketing",
        jobType: "Full-time",
        noOfVacancies: 1,
        closingDate: "2024-02-20",
        gender: "Any",
        minimumExperience: "3 years",
        isFeatured: false,
        status: "Active",
        shortDescription: "Creative marketing manager for digital campaigns",
        longDescription:
          "We need a creative marketing manager with experience in digital marketing campaigns and team leadership.",
        isActive: true,
        isDraft: false,
        createdAt: new Date("2024-01-16T09:15:00Z"),
        updatedAt: new Date("2024-01-21T11:30:00Z"),
        isDeleted: false,
      },
      "003 - Financial Analyst - Finance Corp": {
        sn: "003",
        company: "Finance Corp",
        jobTitle: "Financial Analyst",
        jobCategory: "Finance",
        jobType: "Full-time",
        noOfVacancies: 2,
        closingDate: "2024-02-25",
        gender: "Any",
        minimumExperience: "4 years",
        isFeatured: true,
        status: "Active",
        shortDescription: "Financial analyst for corporate finance",
        longDescription:
          "Experienced financial analyst needed for corporate finance analysis and reporting.",
        isActive: true,
        isDraft: false,
        createdAt: new Date("2024-01-17T16:20:00Z"),
        updatedAt: new Date("2024-01-22T13:45:00Z"),
        isDeleted: false,
      },
      "004 - Healthcare Administrator - Healthcare Plus": {
        sn: "004",
        company: "Healthcare Plus",
        jobTitle: "Healthcare Administrator",
        jobCategory: "Healthcare",
        jobType: "Full-time",
        noOfVacancies: 1,
        closingDate: "2024-03-01",
        gender: "Any",
        minimumExperience: "6 years",
        isFeatured: false,
        status: "Active",
        shortDescription: "Healthcare administrator for medical facility",
        longDescription:
          "Experienced healthcare administrator needed for managing medical facility operations.",
        isActive: true,
        isDraft: false,
        createdAt: new Date("2024-01-18T12:00:00Z"),
        updatedAt: new Date("2024-01-25T10:00:00Z"),
        isDeleted: false,
      },
      "005 - Education Coordinator - Education First": {
        sn: "005",
        company: "Education First",
        jobTitle: "Education Coordinator",
        jobCategory: "Education",
        jobType: "Part-time",
        noOfVacancies: 1,
        closingDate: "2024-03-05",
        gender: "Any",
        minimumExperience: "2 years",
        isFeatured: false,
        status: "Active",
        shortDescription: "Education coordinator for learning programs",
        longDescription:
          "Education coordinator needed for managing learning programs and student support.",
        isActive: true,
        isDraft: true,
        createdAt: new Date("2024-01-19T08:30:00Z"),
        updatedAt: new Date("2024-01-25T10:00:00Z"),
        isDeleted: false,
      },
      "006 - Logistics Manager - Logistics Express": {
        sn: "006",
        company: "Logistics Express",
        jobTitle: "Logistics Manager",
        jobCategory: "Logistics",
        jobType: "Full-time",
        noOfVacancies: 1,
        closingDate: "2024-03-10",
        gender: "Any",
        minimumExperience: "5 years",
        isFeatured: false,
        status: "Active",
        shortDescription: "Logistics manager for supply chain operations",
        longDescription:
          "Experienced logistics manager needed for managing supply chain and warehouse operations.",
        isActive: true,
        isDraft: false,
        createdAt: new Date("2024-01-20T14:15:00Z"),
        updatedAt: new Date("2024-01-25T16:40:00Z"),
        isDeleted: false,
      },
    };

    return jobPostMap[jobPostName] || initialData;
  };

  const [jobPostData, setJobPostData] = useState<JobPostData>(
    getJobPostData(selectedJobPost)
  );

  const inputRef = useRef<HTMLInputElement>(null);

  // Update job post data when selection changes
  useEffect(() => {
    setJobPostData(getJobPostData(selectedJobPost));
  }, [selectedJobPost]);

  // Focus input when dropdown opens
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    console.log("isViewPage", isViewPage);
  }, []);

  const handlePrintJobPost = (jobPostData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Job Post Details",
        data: [jobPostData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          sn: "SN",
          company: "Company",
          jobTitle: "Job Title",
          jobCategory: "Job Category",
          jobType: "Job Type",
          noOfVacancies: "No. of Vacancies",
          closingDate: "Closing Date",
          gender: "Gender",
          minimumExperience: "Minimum Experience",
          isFeatured: "Featured",
          status: "Status",
          shortDescription: "Short Description",
          longDescription: "Long Description",
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
      console.log("jobPostData on pdf click", jobPostData);
      const blob = await pdf(
        <GenericPDF
          data={[jobPostData]}
          title="Job Post Details"
          subtitle="Job Post Information"
        />
      ).toBlob();

      console.log("blob", blob);

      const url = URL.createObjectURL(blob);
      console.log("url", url);
      const a = document.createElement("a");
      a.href = url;
      a.download = "job-post-details.pdf";
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
        title="Viewing Job Post Details"
        videoSrc={video}
        videoHeader="Tutorial video"
        onListClick={() => navigate("/job-post")}
        listText="List"
        listPath="job-post"
        activePage="view"
        popoverOptions={[
          {
            label: "Create",
            icon: <Plus className="w-5 h-5 text-green-600" />,
            onClick: () => navigate("/job-post/create"),
          },
          {
            label: "Edit",
            icon: <Edit className="w-5 h-5 text-blue-600" />,
            onClick: () => navigate("/job-post/edit/1"),
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
                  handlePrintJobPost(jobPostData);
                }
              }
            : undefined
        }
      >
        <div dir={isRTL ? "rtl" : "ltr"}>
          {/* Row 1: SN, Company, Job Title, Job Category */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            {canViewSn && (
              <div className="mt-1">
                <Autocomplete
                  options={jobPostOptions}
                  value={selectedJobPost}
                  onValueChange={setSelectedJobPost}
                  placeholder=" "
                  displayKey="jobPost"
                  valueKey="jobPost"
                  searchKey="jobPost"
                  disabled={false}
                  className="w-[96%] bg-gray-100 rounded-xl"
                  labelClassName="bg-gray-50 rounded-2xl"
                  labelText="Select Job Post"
                  inputClassName="border-none bg-stone-50 focus-visible:ring-offset-0 focus-visible:ring-0 focus-visible:border-2! focus-visible:border-blue-500"
                />
              </div>
            )}

            {canViewCompany && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Company</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(jobPostData.company)}
                </div>
              </div>
            )}

            {canViewJobTitle && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Job Title</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(jobPostData.jobTitle)}
                </div>
              </div>
            )}

            {canViewJobCategory && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Job Category</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(jobPostData.jobCategory)}
                </div>
              </div>
            )}

            {canViewJobType && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Job Type</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(jobPostData.jobType)}
                </div>
              </div>
            )}
          </div>

          {/* Row 2: Job Type, No. of Vacancies, Closing Date, Gender */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
            {canViewNoOfVacancies && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">
                  No. of Vacancies
                </h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(jobPostData.noOfVacancies)}
                </div>
              </div>
            )}

            {canViewClosingDate && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Closing Date</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(jobPostData.closingDate)}
                </div>
              </div>
            )}

            {canViewGender && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Gender</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(jobPostData.gender)}
                </div>
              </div>
            )}

            {canViewMinimumExperience && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">
                  Minimum Experience
                </h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(jobPostData.minimumExperience)}
                </div>
              </div>
            )}
          </div>

          {/* Row 3: Minimum Experience, Is Featured, Status */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
            {canViewIsFeatured && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Featured</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(jobPostData.isFeatured ? "Yes" : "No")}
                </div>
              </div>
            )}

            {canViewStatus && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Status</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(jobPostData.status)}
                </div>
              </div>
            )}

            {canViewShortDescription && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">
                  Short Description
                </h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(jobPostData.shortDescription)}
                </div>
              </div>
            )}

            {canViewLongDescription && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">
                  Long Description
                </h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(jobPostData.longDescription)}
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
          created: getRelativeTime(jobPostData.createdAt),
          updated: getRelativeTime(jobPostData.updatedAt),
          drafted: getRelativeTime(jobPostData.createdAt), // Assuming draftedAt is not used in this context
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
