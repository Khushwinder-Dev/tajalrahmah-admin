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

type TaskCategoryData = {
  branch: string;
  employee: string;
  date: string;
  timeline: string;
  description: string;

  isDefault: boolean;
  isActive: boolean;
  isDraft: boolean;
  createdAt: Date | null;
  draftedAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;
  isDeleted: boolean;
};

const initialData: TaskCategoryData = {
  branch: "Branch One",
  employee: "Employee One",
  date: "2025-08-05",
  timeline: "3 days",
  description: "helo this is description",
  isDefault: false,
  isActive: true,
  isDraft: false,
  createdAt: new Date(),
  draftedAt: null,
  updatedAt: new Date(),
  deletedAt: null,
  isDeleted: false,
};

// Department options for autocomplete
const departments = ["Branch One", "Branch Two", "Branch Three"];

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

// Mock summary table data type
export type MockSummaryTableDataType = {
  SN: number;
  TaskCategory: string;
  Customer: string;
  Project: string;
  StartTime: string;
  EndTime: string;
  timeline: string;
  Description: string;
};
// Mock summary table data
const MOCK_SUMMARY_TABLE_DATA: MockSummaryTableDataType[] = [
  {
    SN: 1,
    TaskCategory: "Task Category One",
    Customer: "Customer One",
    Project: "Project One",
    StartTime: "2025-08-05",
    EndTime: "2025-08-05",
    timeline: "3 days",
    Description: "Description One",
  },
  {
    SN: 2,
    TaskCategory: "Task Category Two",
    Customer: "Customer Two",
    Project: "Project Two",
    StartTime: "2025-08-05",
    EndTime: "2025-08-05",
    timeline: "3 days",
    Description: "Description Two",
  },
  {
    SN: 3,
    TaskCategory: "Task Category Three",
    Customer: "Customer Three",
    Project: "Project Three",
    StartTime: "2025-08-05",
    EndTime: "2025-08-05",
    timeline: "3 days",
    Description: "Description Three",
  },
];

const TableHeaderData = [
  "SN",
  "Task Category",
  "Customer",
  "Project",
  "Start Time",
  "End Time",
  "Timeline",
  "Description",
];

export default function TaskCategoryDetailsPage() {
  const navigate = useNavigate();
  const { isRTL } = useSelector((state: RootState) => state.language);

  const [keepChanges, setKeepChanges] = useState(false);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState("Branch One");
  const location = useLocation();
  const isViewPage = location.pathname.includes("/view");
  const [pdfChecked, setPdfChecked] = useState(false);
  const [printEnabled, setPrintEnabled] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  // get permission
  const canCreate: boolean = usePermission("taskAssigns", "create");
  const canView: boolean = usePermission("taskAssigns", "view");
  const canEdit: boolean = usePermission("taskAssigns", "edit");
  const canDelete: boolean = usePermission("taskAssigns", "delete");
  const canExport: boolean = usePermission("taskAssigns", "export");
  const canPdf: boolean = usePermission("taskAssigns", "pdf");
  const canPrint: boolean = usePermission("taskAssigns", "print");
  const canSeeHistory: boolean = usePermission("taskAssigns", "history");

  // Field-level permissions
  const canViewBranch: boolean = usePermission("taskAssigns", "view", "branch");
  const canViewEmployee: boolean = usePermission(
    "taskAssigns",
    "view",
    "employee"
  );
  const canViewDate: boolean = usePermission("taskAssigns", "view", "date");
  const canViewTimeline: boolean = usePermission(
    "taskAssigns",
    "view",
    "timeline"
  );
  const canViewDescription: boolean = usePermission(
    "taskAssigns",
    "view",
    "description"
  );
  const canViewIsDefault: boolean = usePermission(
    "taskAssigns",
    "view",
    "isDefault"
  );
  const canViewIsActive: boolean = usePermission(
    "taskAssigns",
    "view",
    "isActive"
  );
  const canViewIsDraft: boolean = usePermission(
    "taskAssigns",
    "view",
    "isDraft"
  );
  const canViewIsDeleted: boolean = usePermission(
    "taskAssigns",
    "view",
    "isDeleted"
  );

  console.log("canCreate", canCreate);
  console.log("canView", canView);
  console.log("canEdit", canEdit);
  console.log("canDelete", canDelete);
  console.log("canExport", canExport);

  // Get task category data based on selected department
  const getTaskCategoryData = (department: string): TaskCategoryData => {
    const taskCategoryMap: Record<string, TaskCategoryData> = {
      "Branch One": {
        branch: "Branch One",
        employee: "Employee One",
        date: "2025-08-05",
        timeline: "3 days",
        description:
          "Prepare and cook food items according to recipes and standards",
        isDefault: false,
        isActive: true,
        isDraft: false,
        createdAt: new Date("2023-05-15T10:30:00Z"),
        draftedAt: null,
        updatedAt: new Date("2024-01-15T14:45:00Z"),
        deletedAt: null,
        isDeleted: false,
      },
      "Branch Two": {
        branch: "Service",
        employee: "Waiter",
        date: "Table Service",
        timeline:
          "Serve customers, take orders, and ensure customer satisfaction",
        description:
          "Serve customers, take orders, and ensure customer satisfaction",
        isDefault: true,
        isActive: true,
        isDraft: false,
        createdAt: new Date("2023-06-20T09:15:00Z"),
        draftedAt: null,
        updatedAt: new Date("2024-02-10T11:30:00Z"),
        deletedAt: null,
        isDeleted: false,
      },
      "Branch Three": {
        branch: "Bar",
        employee: "Bartender",
        date: "Beverage Service",
        timeline: "Prepare and serve alcoholic and non-alcoholic beverages",
        description: "Prepare and serve alcoholic and non-alcoholic beverages",
        isDefault: false,
        isActive: false,
        isDraft: false,
        createdAt: new Date("2023-07-10T16:20:00Z"),
        draftedAt: null,
        updatedAt: new Date("2024-03-05T13:45:00Z"),
        deletedAt: null,
        isDeleted: false,
      },
    };

    return taskCategoryMap[department] || initialData;
  };

  const [taskCategoryData, setTaskCategoryData] = useState<TaskCategoryData>(
    getTaskCategoryData(selectedDepartment)
  );

  const inputRef = useRef<HTMLInputElement>(null);

  // Update task category data when selection changes
  useEffect(() => {
    setTaskCategoryData(getTaskCategoryData(selectedDepartment));
  }, [selectedDepartment]);

  // Focus input when dropdown opens
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    console.log("isViewPage", isViewPage);
  }, []);

  const handlePrintTaskCategory = (taskCategoryData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Task Assign Details",
        data: [taskCategoryData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          branch: "Branch",
          employee: "Employee",
          date: "Date",
          timeline: "Timeline",
          description: "Description",
          isDefault: "Default Task Category",
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
      console.log("taskCategoryData on pdf click", taskCategoryData);
      const blob = await pdf(
        <GenericPDF
          data={[taskCategoryData]}
          title="Task Assign Details"
          subtitle="Task Assign Information"
        />
      ).toBlob();

      console.log("blob", blob);

      const url = URL.createObjectURL(blob);
      console.log("url", url);
      const a = document.createElement("a");
      a.href = url;
      a.download = "task-assings-details.pdf";
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
        title="Viewing Task Assign"
        videoSrc={video}
        videoHeader="Tutorial video"
        onListClick={() => navigate("/task-assigns")}
        listText="List"
        listPath="task-assigns"
        activePage="view"
        popoverOptions={[
          {
            label: "Create",
            icon: <Plus className="w-5 h-5 text-green-600" />,
            onClick: () => navigate("/task-assigns/create"),
          },
          {
            label: "Edit",
            icon: <Edit className="w-5 h-5 text-blue-600" />,
            onClick: () => navigate("/task-assigns/edit/1"),
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
                  handlePrintTaskCategory(taskCategoryData);
                }
              }
            : undefined
        }
      >
        <div dir={isRTL ? "rtl" : "ltr"}>
          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            {canViewBranch && (
              <div className="mt-1">
                <Autocomplete
                  options={departments}
                  value={selectedDepartment}
                  onValueChange={setSelectedDepartment}
                  placeholder="Select branch..."
                  displayKey="branch"
                  valueKey="branch"
                  searchKey="branch"
                  disabled={false}
                  className="w-[96%] bg-gray-100 rounded-xl"
                  labelClassName="bg-gray-50 rounded-2xl"
                  labelText="Branch"
                  inputClassName="border-none bg-stone-50 focus-visible:ring-offset-0 focus-visible:ring-0 focus-visible:border-2! focus-visible:border-blue-500"
                />
              </div>
            )}

            {canViewEmployee && (
              <div className="">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="font-normal text-gray-600">Employee</h3>
                </div>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(taskCategoryData.employee)}
                </div>
              </div>
            )}

            {canViewDate && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Date</h3>
                <div className="w-fit py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(taskCategoryData.date)}
                </div>
              </div>
            )}

            {canViewTimeline && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Timeline</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(taskCategoryData.timeline)}
                </div>
              </div>
            )}

            {canViewDescription && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Description</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(taskCategoryData.description)}
                </div>
              </div>
            )}
            {canViewIsDefault && (
              <div className="">
                <div className="flex flex-col">
                  <div className="">
                    <span className="text-[15px] text-gray-600">Default</span>
                  </div>
                  <div className="">
                    {taskCategoryData.isDefault ? (
                      <span className="text-black font-bold text-[15px]">
                        Yes
                      </span>
                    ) : (
                      <span className="text-black font-bold text-[15px]">
                        No
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )}

            {canViewIsDraft && (
              <div className="flex flex-col">
                <div className="">
                  <span className="text-[15px] text-gray-600">Draft</span>
                </div>
                <div className="">
                  {taskCategoryData.isDraft ? (
                    <span className="text-black font-bold text-[15px]">
                      Yes
                    </span>
                  ) : (
                    <span className="text-black font-bold text-[15px]">No</span>
                  )}
                </div>
              </div>
            )}

            {canViewIsActive && (
              <div className="flex flex-col">
                <div className="">
                  <span className="text-[15px] text-gray-600">Inactive</span>
                </div>
                <div className="">
                  {!taskCategoryData.isActive ? (
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
                  {taskCategoryData.isDeleted ? (
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

          <div className="space-y-4 mt-9">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-primary">
                Task Assign Details
              </h3>
              <span className="text-sm text-gray-500">
                Total Items: {MOCK_SUMMARY_TABLE_DATA.length}
              </span>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  {/* Table Header */}
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      {TableHeaderData.map((header) => (
                        <th
                          key={header}
                          className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>

                  {/* Table Body */}
                  <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                    {MOCK_SUMMARY_TABLE_DATA.map((item, index) => (
                      <tr
                        key={index}
                        className={`${
                          index % 2 === 0
                            ? "bg-white dark:bg-gray-900"
                            : "bg-gray-50 dark:bg-gray-800"
                        } hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors`}
                      >
                        <td className="px-4 py-3 text-sm font-medium text-center text-gray-900 dark:text-gray-100">
                          {item.SN}
                        </td>
                        <td className="px-4 py-3 text-sm text-center text-gray-900 dark:text-gray-100">
                          <div className="font-medium">{item.TaskCategory}</div>
                        </td>
                        <td className="px-4 py-3 text-sm text-center text-gray-600 dark:text-gray-300">
                          <div
                            className="max-w-xs truncate"
                            title={item.Customer}
                          >
                            {item.Customer}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-center font-semibold text-gray-900 dark:text-gray-100">
                          {item.Project}
                        </td>
                        <td className="px-4 py-3 text-sm text-center font-semibold text-gray-900 dark:text-gray-100">
                          {item.StartTime}
                        </td>
                        <td className="px-4 py-3 text-sm text-center font-semibold text-gray-900 dark:text-gray-100">
                          {item.EndTime}
                        </td>
                        <td className="px-4 py-3 text-sm text-center font-semibold text-gray-900 dark:text-gray-100">
                          {item.timeline}
                        </td>
                        <td className="px-4 py-3 text-sm text-center font-semibold text-gray-900 dark:text-gray-100">
                          {item.Description}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
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
          created: getRelativeTime(taskCategoryData.createdAt),
          updated: getRelativeTime(taskCategoryData.updatedAt),
          drafted: getRelativeTime(taskCategoryData.draftedAt),
          deleted: getRelativeTime(taskCategoryData.deletedAt),
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
