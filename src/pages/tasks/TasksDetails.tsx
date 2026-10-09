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

const MOCK_TASKS = [
  {
    id: "1",
    subject: "Implement User Authentication",
    hourlyRate: 75,
    startDate: "2024-01-15",
    dueDate: "2024-01-22",
    priority: "High",
    repeatEvery: "None",
    relatedTo: "Project Alpha",
    assignees: "John Smith, Sarah Johnson",
    followers: "Mike Wilson, Emily Davis",
    checklist:
      "Setup authentication provider, Create login page, Implement JWT tokens",
    tags: "Authentication, Security, Backend",
    description: "Set up complete user authentication system with JWT tokens.",
    status: "Active",
  },
  {
    id: "2",
    subject: "Database Schema Design",
    hourlyRate: 85,
    startDate: "2024-01-16",
    dueDate: "2024-01-20",
    priority: "Urgent",
    repeatEvery: "None",
    relatedTo: "Project Alpha",
    assignees: "David Brown",
    followers: "Lisa Anderson, Robert Taylor",
    checklist: "Design user tables, Create relationships, Add indexes",
    tags: "Database, Architecture, Planning",
    description: "Design and implement the complete database schema.",
    status: "Active",
  },
  {
    id: "3",
    subject: "API Documentation",
    hourlyRate: 60,
    startDate: "2024-01-17",
    dueDate: "2024-01-25",
    priority: "Medium",
    repeatEvery: "Weekly",
    relatedTo: "Project Beta",
    assignees: "James Miller, Amanda Garcia",
    followers: "Christopher Lee",
    checklist: "Document endpoints, Add examples, Review with team",
    tags: "Documentation, API, Technical Writing",
    description: "Create comprehensive API documentation for all endpoints.",
    status: "Draft",
  },
  {
    id: "4",
    subject: "UI/UX Redesign",
    hourlyRate: 90,
    startDate: "2024-01-18",
    dueDate: "2024-02-01",
    priority: "Medium",
    repeatEvery: "None",
    relatedTo: "Project Gamma",
    assignees: "Michelle Rodriguez, Rachel Thompson",
    followers: "Kevin Martinez, Stephanie Lewis",
    checklist: "Create wireframes, Design mockups, Get stakeholder approval",
    tags: "Design, UI, UX, Frontend",
    description: "Complete redesign of the application interface.",
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

export default function TaskDetailsPage() {
  // const { t } = useTranslation();
  const navigate = useNavigate();

  const [keepChanges, setKeepChanges] = useState(false);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState("1");
  const location = useLocation();
  const isViewPage = location.pathname.includes("/view");
  const [pdfChecked, setPdfChecked] = useState(false);
  const [printEnabled, setPrintEnabled] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  // Permission checks
  // const { canCreate, canView, canEdit, canDelete } = useUserMasterPermissions();

  // Field-level permissions
  const canPdf: boolean = usePermission("tasks", "pdf");
  const canPrint: boolean = usePermission("tasks", "print");
  const canSeeHistory: boolean = usePermission("tasks", "history");

  let reportData = {
    id: selectedTask,
    subject:
      MOCK_TASKS.find((r) => r.id === selectedTask)?.subject ||
      "Implement User Authentication",
    hourlyRate: MOCK_TASKS.find((r) => r.id === selectedTask)?.hourlyRate || 75,
    startDate:
      MOCK_TASKS.find((r) => r.id === selectedTask)?.startDate || "2024-01-15",
    dueDate:
      MOCK_TASKS.find((r) => r.id === selectedTask)?.dueDate || "2024-01-22",
    priority: MOCK_TASKS.find((r) => r.id === selectedTask)?.priority || "High",
    repeatEvery:
      MOCK_TASKS.find((r) => r.id === selectedTask)?.repeatEvery || "None",
    relatedTo:
      MOCK_TASKS.find((r) => r.id === selectedTask)?.relatedTo ||
      "Project Alpha",
    assignees:
      MOCK_TASKS.find((r) => r.id === selectedTask)?.assignees ||
      "John Smith, Sarah Johnson",
    followers:
      MOCK_TASKS.find((r) => r.id === selectedTask)?.followers ||
      "Mike Wilson, Emily Davis",
    checklist:
      MOCK_TASKS.find((r) => r.id === selectedTask)?.checklist ||
      "Setup authentication provider",
    tags:
      MOCK_TASKS.find((r) => r.id === selectedTask)?.tags ||
      "Authentication, Security, Backend",
    description:
      MOCK_TASKS.find((r) => r.id === selectedTask)?.description ||
      "Set up complete user authentication system.",
    isDefault: true,
    isActive: true,
    isDraft: false,
    isDeleted: false,
    status: MOCK_TASKS.find((r) => r.id === selectedTask)?.status || "Active",
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
        id: selectedTask,
        subject: "",
        hourlyRate: 0,
        startDate: "",
        dueDate: "",
        priority: "Medium",
        repeatEvery: "",
        relatedTo: "",
        assignees: "",
        followers: "",
        checklist: "",
        tags: "",
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
        title: "Task Details",
        data: [report],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          subject: "Subject",
          hourlyRate: "Hourly Rate",
          startDate: "Start Date",
          dueDate: "Due Date",
          priority: "Priority",
          repeatEvery: "Repeat Every",
          relatedTo: "Related To",
          assignees: "Assignees",
          followers: "Followers",
          checklist: "Checklist",
          tags: "Tags",
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
          title="Task Details"
          subtitle="Task Information"
        />
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "task-details.pdf";
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
        moduleId="task-details-module"
        moduleName="Task Details"
        moduleRoute="/tasks/view"
        title="Viewing Task"
        videoSrc={video}
        videoHeader="Tutorial video"
        listPath="tasks"
        activePage="view"
        module="tasks"
        popoverOptions={[
          {
            label: "Create",
            icon: <Plus className="w-5 h-5 text-green-600" />,
            onClick: () => navigate("/tasks/create"),
          },
          {
            label: "Edit",
            icon: <Edit className="w-5 h-5 text-blue-600" />,
            onClick: () => navigate("/tasks/edit/1"),
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
        {/* Row 1: Task Selection, Subject, Hourly Rate, Start Date */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="mt-1">
            <Autocomplete
              options={MOCK_TASKS}
              value={selectedTask}
              onValueChange={setSelectedTask}
              placeholder=" "
              displayKey="subject"
              valueKey="id"
              searchKey="subject"
              disabled={false}
              className="w-[96%] bg-gray-100 rounded-xl"
              labelClassName="bg-gray-50 rounded-2xl"
              labelText="Task"
              isShowTemplateIcon={false}
            />
          </div>

          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">Subject</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(reportData.subject)}
            </div>
          </div>

          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">Hourly Rate</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              ${displayValue(reportData.hourlyRate)}
            </div>
          </div>

          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">Start Date</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(reportData.startDate)}
            </div>
          </div>
        </div>

        {/* Row 2: Due Date, Priority, Repeat Every, Related To */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">Due Date</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(reportData.dueDate)}
            </div>
          </div>

          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">Priority</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(reportData.priority)}
            </div>
          </div>

          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">Repeat Every</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(reportData.repeatEvery)}
            </div>
          </div>

          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">Related To</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(reportData.relatedTo)}
            </div>
          </div>
        </div>

        {/* Row 3: Assignees, Followers, Tags, Description */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">Assignees</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(reportData.assignees)}
            </div>
          </div>

          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">Followers</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(reportData.followers)}
            </div>
          </div>

          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">Tags</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(reportData.tags)}
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
        </div>

        {/* Row 4: Checklist, Status, Default */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">Checklist</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(reportData.checklist)}
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
