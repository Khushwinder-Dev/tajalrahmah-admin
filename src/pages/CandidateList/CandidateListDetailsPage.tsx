/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
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

export default function CandidateListDetailsPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [keepChanges, setKeepChanges] = useState(false);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const location = useLocation();
  const isViewPage = location.pathname.includes("/view");
  const [pdfChecked, setPdfChecked] = useState(false);
  const [printEnabled, setPrintEnabled] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  // get permission
  const canPdf: boolean = usePermission("taxRates", "pdf");
  const canEdit: boolean = usePermission("taxRates", "edit");
  const canDelete: boolean = usePermission("taxRates", "delete");
  const canCreate: boolean = usePermission("taxRates", "create");
  const canView: boolean = usePermission("taxRates", "view");
  const canPrint: boolean = usePermission("taxRates", "print");
  const canSeeHistory: boolean = usePermission("taxRates", "history");

  console.log("canCreate", canCreate);
  console.log("canView", canView);
  console.log("canEdit", canEdit);
  console.log("canDelete", canDelete);

  let CandidateListData = {
    firstName: "Aarif",
    lastName: "Hossain",
    email: "aarif.hossain@example.com",
    phone: "+8801712345678",
    alternatePhone: "+8801912345678",
    ssn: "845-62-1934",
    presentAddress: "House 24, Road 5, Dhanmondi, Dhaka",
    permanentAddress: "Village: Charghat, Post: Charghat, District: Rajshahi",
    country: "Bangladesh",
    zipCode: "1209",
    obtainedDegree: "Bachelor of Science in Computer Science",
    university: "University of Dhaka",
    cgpa: "3.72",
    comments:
      "Hardworking and detail-oriented with strong problem-solving skills.",
    experienceLevel: "Mid-level",
    skill: "JavaScript, React, Node.js, MySQL, REST API Development",
    companyName: "TechWave Solutions Ltd.",
    workingPeriod: "Jan 2021 - Present",
    duties:
      "Developing and maintaining web applications, collaborating with UI/UX team, and optimizing backend APIs.",
    supervisor: "Mr. Kamal Ahmed",
    picture: "https://randomuser.me/api/portraits/men/32.jpg",
    isDefault: true,
    isActive: true,
    isDraft: false,
    isDeleted: true,
    createdAt: "2023-05-15T10:30:00Z",
    updatedAt: "",
    draftedAt: "2025-05-20T14:45:00Z",
    deletedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(),
  };

  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when dropdown opens
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    console.log("isViewPage", isViewPage);
    if (isViewPage) {
      CandidateListData = {
        firstName: "Aarif",
        lastName: "Hossain",
        email: "aarif.hossain@example.com",
        phone: "+8801712345678",
        alternatePhone: "+8801912345678",
        ssn: "845-62-1934",
        presentAddress: "House 24, Road 5, Dhanmondi, Dhaka",
        permanentAddress:
          "Village: Charghat, Post: Charghat, District: Rajshahi",
        country: "Bangladesh",
        zipCode: "1209",
        obtainedDegree: "Bachelor of Science in Computer Science",
        university: "University of Dhaka",
        cgpa: "3.72",
        comments:
          "Hardworking and detail-oriented with strong problem-solving skills.",
        experienceLevel: "Mid-level",
        skill: "JavaScript, React, Node.js, MySQL, REST API Development",
        companyName: "TechWave Solutions Ltd.",
        workingPeriod: "Jan 2021 - Present",
        duties:
          "Developing and maintaining web applications, collaborating with UI/UX team, and optimizing backend APIs.",
        supervisor: "Mr. Kamal Ahmed",
        picture: "https://randomuser.me/api/portraits/men/32.jpg",
        isDefault: true,
        isActive: true,
        isDraft: false,
        isDeleted: false,
        createdAt: "",
        updatedAt: "",
        draftedAt: "",
        deletedAt: "",
      };
    }
  }, []);

  const handlePrintTaxRates = (CandidateListData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Tax Rates Details",
        data: [CandidateListData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          isDefault: "Default",
          isActive: "Active Status",
          isDraft: "Draft Status",
          isDeleted: "Deleted Status",
          flag: "Flag",
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
    // Remove auto-print on toggle
    // if (checked) {
    //   setTimeout(() => handlePrintTaxRates(CandidateListData), 100);
    // }
  };

  const handlePDFSwitchChange = (pdfChecked: boolean) => {
    setPdfChecked(pdfChecked);
    // Remove auto-download on toggle
    // if (pdfChecked) {
    //   setTimeout(() => handleExportPDF(), 100);
    // }
  };

  const handleExportPDF = async () => {
    console.log("Export PDF clicked");
    try {
      console.log("CandidateListData on pdf click", CandidateListData);
      const blob = await pdf(
        <GenericPDF
          data={[CandidateListData]}
          title="Tax Rates Details"
          subtitle="Tax Rates Information"
        />
      ).toBlob();

      console.log("blob", blob);

      const url = URL.createObjectURL(blob);
      console.log("url", url);
      const a = document.createElement("a");
      a.href = url;
      a.download = "TaxRates-details.pdf";
      a.click();
      console.log("a", a);
      console.log("url", url);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error);
      toastError("Something went wrong when generating PDF");
    }
  };

  const getRelativeTime = (dateString: string | null) => {
    if (!dateString) return "–";

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

  const displayValue = (value: any) => {
    return value === undefined || value === null || value === "" ? "–" : value;
  };

  return (
    <>
      <PageLayout
        title={t("button.viewingCandidateList")}
        videoSrc={video}
        videoHeader="Tutorial video"
        onListClick={() => navigate("/candidate-list")}
        listText="List"
        listPath="candidate-list"
        activePage="view"
        popoverOptions={[
          {
            label: "Create",
            icon: <Plus className="w-5 h-5 text-green-600" />,
            onClick: () => navigate("/candidate-list/create"),
          },
          {
            label: "Edit",
            icon: <Edit className="w-5 h-5 text-blue-600" />,
            onClick: () => navigate("/candidate-list/edit/1"),
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
                  handlePrintTaxRates(CandidateListData);
                }
              }
            : undefined
        }
      >
        {/* Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="">
            <h3 className="font-normal mb-1 text-gray-600">First Name</h3>
            <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
              {displayValue(CandidateListData.firstName)}
            </div>
          </div>

          <div className="">
            <h3 className="font-normal mb-1 text-gray-600">Last Name</h3>
            <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
              {displayValue(CandidateListData.lastName)}
            </div>
          </div>

          <div className="">
            <h3 className="font-normal mb-1 text-gray-600">Email</h3>
            <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
              {displayValue(CandidateListData.email)}
            </div>
          </div>

          <div className="">
            <h3 className="font-normal mb-1 text-gray-600">Phone</h3>
            <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
              {displayValue(CandidateListData.phone)}
            </div>
          </div>

          <div className="">
            <h3 className="font-normal mb-1 text-gray-600">
              Alternative Phone
            </h3>
            <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
              {displayValue(CandidateListData.alternatePhone)}
            </div>
          </div>

          <div className="">
            <h3 className="font-normal mb-1 text-gray-600">SSN</h3>
            <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
              {displayValue(CandidateListData.ssn)}
            </div>
          </div>

          <div className="">
            <h3 className="font-normal mb-1 text-gray-600">Present Address</h3>
            <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
              {displayValue(CandidateListData.presentAddress)}
            </div>
          </div>

          <div className="">
            <h3 className="font-normal mb-1 text-gray-600">
              Permanent Address
            </h3>
            <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
              {displayValue(CandidateListData.permanentAddress)}
            </div>
          </div>

          <div className="">
            <h3 className="font-normal mb-1 text-gray-600">Country</h3>
            <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
              {displayValue(CandidateListData.country)}
            </div>
          </div>

          <div className="">
            <h3 className="font-normal mb-1 text-gray-600">Zip Code</h3>
            <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
              {displayValue(CandidateListData.zipCode)}
            </div>
          </div>

          <div className="">
            <h3 className="font-normal mb-1 text-gray-600">Obtained Degree</h3>
            <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
              {displayValue(CandidateListData.obtainedDegree)}
            </div>
          </div>

          <div className="">
            <h3 className="font-normal mb-1 text-gray-600">University</h3>
            <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
              {displayValue(CandidateListData.university)}
            </div>
          </div>

          <div className="">
            <h3 className="font-normal mb-1 text-gray-600">CGPA</h3>
            <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
              {displayValue(CandidateListData.cgpa)}
            </div>
          </div>

          <div className="">
            <h3 className="font-normal mb-1 text-gray-600">Experience</h3>
            <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
              {displayValue(CandidateListData.experienceLevel)}
            </div>
          </div>

          <div className="">
            <h3 className="font-normal mb-1 text-gray-600">Skill</h3>
            <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
              {displayValue(CandidateListData.skill)}
            </div>
          </div>

          <div className="">
            <h3 className="font-normal mb-1 text-gray-600">Company Name</h3>
            <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
              {displayValue(CandidateListData.companyName)}
            </div>
          </div>

          <div className="">
            <h3 className="font-normal mb-1 text-gray-600">Working Period</h3>
            <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
              {displayValue(CandidateListData.workingPeriod)}
            </div>
          </div>

          <div className="">
            <h3 className="font-normal mb-1 text-gray-600">Duties</h3>
            <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
              {displayValue(CandidateListData.duties)}
            </div>
          </div>

          <div className="">
            <h3 className="font-normal mb-1 text-gray-600">Supervisor</h3>
            <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
              {displayValue(CandidateListData.supervisor)}
            </div>
          </div>

          {/* Default Label */}
          <div className="">
            <div className="flex flex-col">
              <div className="">
                <span className="text-[15px] text-gray-600">Default</span>
              </div>
              <div className="">
                {CandidateListData.isDefault ? (
                  <span className="text-black font-bold text-[15px]">Yes</span>
                ) : (
                  <span className="text-black font-bold text-[15px]">No</span>
                )}
              </div>
            </div>
          </div>
          {/* InActive Label */}
          <div className="flex flex-col">
            <div className="">
              <span className="text-[15px] text-gray-600">Inactive</span>
            </div>
            <div className="">
              {!CandidateListData.isActive ? (
                <span className="text-black font-bold text-[15px]">Yes</span>
              ) : (
                <span className="text-black font-bold text-[15px]">No</span>
              )}
            </div>
          </div>
          {/* Draft Label */}
          <div className="flex flex-col">
            <div className="">
              <span className="text-[15px] text-gray-600">Draft</span>
            </div>
            <div className="">
              {CandidateListData.isDraft ? (
                <span className="text-black font-bold text-[15px]">Yes</span>
              ) : (
                <span className="text-black font-bold text-[15px]">No</span>
              )}
            </div>
          </div>

          {/* Deleted Label */}
          <div className="flex flex-col">
            <div className="">
              <span className="text-[15px] text-gray-600">Deleted</span>
            </div>
            <div className="">
              {CandidateListData.isDeleted ? (
                <span className="text-black font-bold text-[15px]">Yes</span>
              ) : (
                <span className="text-black font-bold text-[15px]">No</span>
              )}
            </div>
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
          created: getRelativeTime(CandidateListData.createdAt),
          updated: getRelativeTime(CandidateListData.updatedAt),
          drafted: getRelativeTime(CandidateListData.draftedAt),
          deleted: getRelativeTime(CandidateListData.deletedAt),
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
