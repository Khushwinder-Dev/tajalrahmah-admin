/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
// import { useTranslation } from "react-i18next";
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
import { Edit, Plus } from "lucide-react";
import { ResetFormModal } from "@/components/common/ResetFormModal";
import { usePermission } from "@/hooks/usePermissions";
import MinimizablePageLayout from "@/components/MinimizablePageLayout";

const MOCK_PROMOTIONS = [
  {
    id: "1",
    code: "PRM-001",
    employeeName: "John Smith",
    fromPosition: "Sales Executive",
    toPosition: "Senior Sales Manager",
    fromDepartment: "Sales",
    toDepartment: "Sales Management",
    fromSalary: "$50,000",
    toSalary: "$65,000",
    promotionDate: "2024-01-15",
    effectiveDate: "2024-02-01",
    approvedBy: "Sarah Johnson",
    reason: "Outstanding performance and leadership skills",
    description:
      "Promotion based on exceptional sales performance and team leadership",
    status: "Active",
  },
  {
    id: "2",
    code: "PRM-002",
    employeeName: "Emily Davis",
    fromPosition: "Marketing Coordinator",
    toPosition: "Marketing Manager",
    fromDepartment: "Marketing",
    toDepartment: "Marketing",
    fromSalary: "$45,000",
    toSalary: "$58,000",
    promotionDate: "2024-02-20",
    effectiveDate: "2024-03-01",
    approvedBy: "Michael Brown",
    reason: "Excellent campaign management and team coordination",
    description:
      "Promoted for successful campaign execution and team leadership",
    status: "Active",
  },
  {
    id: "3",
    code: "PRM-003",
    employeeName: "Robert Wilson",
    fromPosition: "Software Developer",
    toPosition: "Senior Software Engineer",
    fromDepartment: "IT",
    toDepartment: "IT",
    fromSalary: "$70,000",
    toSalary: "$85,000",
    promotionDate: "2024-03-10",
    effectiveDate: "2024-04-01",
    approvedBy: "David Lee",
    reason: "Technical expertise and project leadership",
    description:
      "Promoted for advanced technical skills and project management",
    status: "Draft",
  },
  {
    id: "4",
    code: "PRM-004",
    employeeName: "Lisa Anderson",
    fromPosition: "HR Assistant",
    toPosition: "HR Specialist",
    fromDepartment: "Human Resources",
    toDepartment: "Human Resources",
    fromSalary: "$40,000",
    toSalary: "$52,000",
    promotionDate: "2024-04-05",
    effectiveDate: "2024-05-01",
    approvedBy: "Jennifer Taylor",
    reason: "Improved recruitment processes and employee relations",
    description:
      "Promoted for enhancing HR processes and employee satisfaction",
    status: "Inactive",
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

export default function PromotionDetailsPage() {
  // const { t } = useTranslation();
  const navigate = useNavigate();

  const [keepChanges, setKeepChanges] = useState(false);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [selectedPromotion, setSelectedPromotion] = useState("1");
  const location = useLocation();
  const isViewPage = location.pathname.includes("/view");
  const [pdfChecked, setPdfChecked] = useState(false);
  const [printEnabled, setPrintEnabled] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  // Permission checks
  // const { canCreate, canView, canEdit, canDelete } = useUserMasterPermissions();

  // Field-level permissions
  const canPdf: boolean = usePermission("promotion", "pdf");
  const canPrint: boolean = usePermission("promotion", "print");
  const canSeeHistory: boolean = usePermission("promotion", "history");

  let reportData = {
    id: selectedPromotion,
    code:
      MOCK_PROMOTIONS.find((r) => r.id === selectedPromotion)?.code ||
      "PRM-001",
    employeeName:
      MOCK_PROMOTIONS.find((r) => r.id === selectedPromotion)?.employeeName ||
      "John Smith",
    fromPosition:
      MOCK_PROMOTIONS.find((r) => r.id === selectedPromotion)?.fromPosition ||
      "Sales Executive",
    toPosition:
      MOCK_PROMOTIONS.find((r) => r.id === selectedPromotion)?.toPosition ||
      "Senior Sales Manager",
    fromDepartment:
      MOCK_PROMOTIONS.find((r) => r.id === selectedPromotion)?.fromDepartment ||
      "Sales",
    toDepartment:
      MOCK_PROMOTIONS.find((r) => r.id === selectedPromotion)?.toDepartment ||
      "Sales Management",
    fromSalary:
      MOCK_PROMOTIONS.find((r) => r.id === selectedPromotion)?.fromSalary ||
      "$50,000",
    toSalary:
      MOCK_PROMOTIONS.find((r) => r.id === selectedPromotion)?.toSalary ||
      "$65,000",
    promotionDate:
      MOCK_PROMOTIONS.find((r) => r.id === selectedPromotion)?.promotionDate ||
      "2024-01-15",
    effectiveDate:
      MOCK_PROMOTIONS.find((r) => r.id === selectedPromotion)?.effectiveDate ||
      "2024-02-01",
    approvedBy:
      MOCK_PROMOTIONS.find((r) => r.id === selectedPromotion)?.approvedBy ||
      "Sarah Johnson",
    reason:
      MOCK_PROMOTIONS.find((r) => r.id === selectedPromotion)?.reason ||
      "Outstanding performance and leadership skills",
    description:
      MOCK_PROMOTIONS.find((r) => r.id === selectedPromotion)?.description ||
      "Promotion based on exceptional sales performance and team leadership",
    isDefault: true,
    isActive: true,
    isDraft: false,
    isDeleted: false,
    status:
      MOCK_PROMOTIONS.find((r) => r.id === selectedPromotion)?.status ||
      "Active",
    createdAt: "2023-05-15T10:30:00Z",
    updatedAt: "2025-01-15T14:30:00Z",
    draftedAt: "2025-05-20T14:45:00Z",
    deletedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(),
  } as any;

  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when dropdown opens
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    console.log("isViewPage", isViewPage);
    if (isViewPage) {
      reportData = {
        id: selectedPromotion,
        code: "",
        employeeName: "",
        fromPosition: "",
        toPosition: "",
        fromDepartment: "",
        toDepartment: "",
        fromSalary: "",
        toSalary: "",
        promotionDate: "",
        effectiveDate: "",
        approvedBy: "",
        reason: "",
        description: "",
        isDefault: true,
        isActive: true,
        isDraft: false,
        isDeleted: false,
        status: "Active",
        createdAt: "",
        updatedAt: "",
        draftedAt: "",
        deletedAt: "",
      } as any;
    }
  }, []);

  const handlePrintReport = (report: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Promotion Details",
        data: [report],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          code: "Code",
          employeeName: "Employee Name",
          fromPosition: "From Position",
          toPosition: "To Position",
          fromDepartment: "From Department",
          toDepartment: "To Department",
          fromSalary: "From Salary",
          toSalary: "To Salary",
          promotionDate: "Promotion Date",
          effectiveDate: "Effective Date",
          approvedBy: "Approved By",
          reason: "Reason",
          description: "Description",
          isDefault: "Default",
          isActive: "Active",
          isDraft: "Draft",
          isDeleted: "Deleted",
          status: "Status",
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
      console.log("reportData on pdf click", reportData);
      const blob = await pdf(
        <GenericPDF
          data={[reportData]}
          title="Promotion Details"
          subtitle="Promotion Information"
        />
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "promotion-details.pdf";
      a.click();
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
      <MinimizablePageLayout
        moduleId="promotion-details-module"
        moduleName="Promotion Details"
        moduleRoute="/promotion/view"
        title="Viewing Promotion"
        videoSrc={video}
        videoHeader="Tutorial video"
        listPath="promotion"
        activePage="view"
        module="promotion"
        popoverOptions={[
          {
            label: "Create",
            icon: <Plus className="w-5 h-5 text-green-600" />,
            onClick: () => navigate("/promotion/create"),
          },
          {
            label: "Edit",
            icon: <Edit className="w-5 h-5 text-blue-600" />,
            onClick: () => navigate("/promotion/edit/1"),
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
                  handlePrintReport(reportData);
                }
              }
            : undefined
        }
      >
        {/* Row 1: Promotion Selection, Code, Employee Name, From Position */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="mt-1">
            <Autocomplete
              options={MOCK_PROMOTIONS}
              value={selectedPromotion}
              onValueChange={setSelectedPromotion}
              placeholder=" "
              displayKey="employeeName"
              valueKey="id"
              searchKey="employeeName"
              disabled={false}
              className="w-[96%] bg-gray-100 rounded-xl"
              labelClassName="bg-gray-50 rounded-2xl"
              labelText="Promotion"
              isShowTemplateIcon={false}
            />
          </div>

          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">Code</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(reportData.code)}
            </div>
          </div>

          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">Employee Name</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(reportData.employeeName)}
            </div>
          </div>

          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">From Position</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(reportData.fromPosition)}
            </div>
          </div>
        </div>

        {/* Row 2: To Position, From Department, To Department, From Salary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">To Position</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(reportData.toPosition)}
            </div>
          </div>

          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">From Department</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(reportData.fromDepartment)}
            </div>
          </div>

          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">To Department</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(reportData.toDepartment)}
            </div>
          </div>

          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">From Salary</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(reportData.fromSalary)}
            </div>
          </div>
        </div>

        {/* Row 3: To Salary, Promotion Date, Effective Date, Approved By */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">To Salary</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(reportData.toSalary)}
            </div>
          </div>

          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">Promotion Date</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(reportData.promotionDate)}
            </div>
          </div>

          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">Effective Date</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(reportData.effectiveDate)}
            </div>
          </div>

          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">Approved By</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(reportData.approvedBy)}
            </div>
          </div>
        </div>

        {/* Row 4: Reason, Description, Status, Default */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">Reason</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(reportData.reason)}
            </div>
          </div>

          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">Description</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(reportData.description)}
            </div>
          </div>

          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">Status</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(reportData.status)}
            </div>
          </div>

          <div className="">
            <div className="flex flex-col">
              <div className="">
                <span className="text-[15px] text-gray-600">Default</span>
              </div>
              <div className="">
                {reportData.isDefault ? (
                  <span className="text-black text-[15px]">Yes</span>
                ) : (
                  <span className="text-black text-[15px]">No</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </MinimizablePageLayout>

      {/* History Modal */}
      <HistoryDataTable
        isOptionModalOpen={isOptionModalOpen}
        setIsOptionModalOpen={setIsOptionModalOpen}
        columnData={mockHistoryData}
        title="History"
        statusInfo={{
          created: getRelativeTime(reportData.createdAt),
          updated: getRelativeTime(reportData.updatedAt),
          drafted: getRelativeTime(reportData.draftedAt),
          deleted: getRelativeTime(reportData.deletedAt),
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
