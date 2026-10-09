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
  customer: string;
  customerNo: string;
  vendorCode: string;
  status: string;
  projectName: string;
  projectCode: string;
  projectType: string;
  startDate: string;
  projectLocation: string;
  poNumber: string;
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
  branch: "Dhaka",
  customer: "ABC Corporation",
  customerNo: "CUST001",
  vendorCode: "VND001",
  status: "In Progress",
  projectName: "ERP Implementation",
  projectCode: "ERP-DHK-001",
  projectType: "Software",
  startDate: "2025-07-01",
  projectLocation: "Dhaka HQ",
  poNumber: "PO12345",
  description: "Implementing ERP system across departments",

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
  itemRefNo: string;
  category: string;
  services: string;
  unitPrice: string;
};
// Mock summary table data
const MOCK_SUMMARY_TABLE_DATA: MockSummaryTableDataType[] = [
  {
    SN: 1,
    itemRefNo: "Item Ref No One",
    category: "Category One",
    services: "Services One",
    unitPrice: "Unit Price One",
  },
  {
    SN: 2,
    itemRefNo: "Item Ref No Two",
    category: "Category Two",
    services: "Services Two",
    unitPrice: "Unit Price Two",
  },
  {
    SN: 3,
    itemRefNo: "Item Ref No Three",
    category: "Category Three",
    services: "Services Three",
    unitPrice: "Unit Price Three",
  },
];

const TableHeaderData = [
  "SN",
  "Item Ref No",
  "Category",
  "Services",
  "Unit Price",
];

export default function ProjectsDetailsPage() {
  const navigate = useNavigate();
  const { isRTL } = useSelector((state: RootState) => state.language);

  const [keepChanges, setKeepChanges] = useState(false);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState("Dhaka");
  const location = useLocation();
  const isViewPage = location.pathname.includes("/view");
  const [pdfChecked, setPdfChecked] = useState(false);
  const [printEnabled, setPrintEnabled] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  // get permission
  const canCreate: boolean = usePermission("projects", "create");
  const canView: boolean = usePermission("projects", "view");
  const canEdit: boolean = usePermission("projects", "edit");
  const canDelete: boolean = usePermission("projects", "delete");
  const canExport: boolean = usePermission("projects", "export");
  const canPdf: boolean = usePermission("projects", "pdf");
  const canPrint: boolean = usePermission("projects", "print");
  const canSeeHistory: boolean = usePermission("projects", "history");

  // Field-level permissions
  const canViewBranch: boolean = usePermission("projects", "view", "branch");
  const canViewCustomer: boolean = usePermission(
    "projects",
    "view",
    "customer"
  );
  const canViewCustomerNo: boolean = usePermission(
    "projects",
    "view",
    "customerNo"
  );
  const canViewVendorCode: boolean = usePermission(
    "projects",
    "view",
    "vendorCode"
  );
  const canViewStatus: boolean = usePermission("projects", "view", "status");
  const canViewProjectName: boolean = usePermission(
    "projects",
    "view",
    "projectName"
  );
  const canViewProjectCode: boolean = usePermission(
    "projects",
    "view",
    "projectCode"
  );
  const canViewProjectType: boolean = usePermission(
    "projects",
    "view",
    "projectType"
  );
  const canViewStartDate: boolean = usePermission(
    "projects",
    "view",
    "startDate"
  );
  const canViewProjectLocation: boolean = usePermission(
    "projects",
    "view",
    "projectLocation"
  );
  const canViewPoNumber: boolean = usePermission(
    "projects",
    "view",
    "poNumber"
  );
  const canViewDescription: boolean = usePermission(
    "projects",
    "view",
    "description"
  );
  const canViewIsDefault: boolean = usePermission(
    "projects",
    "view",
    "isDefault"
  );
  const canViewIsActive: boolean = usePermission(
    "projects",
    "view",
    "isActive"
  );
  const canViewIsDraft: boolean = usePermission("projects", "view", "isDraft");
  const canViewIsDeleted: boolean = usePermission(
    "projects",
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
      Dhaka: {
        branch: "Dhaka",
        customer: "Employee One",
        customerNo: "Employee One",
        vendorCode: "Employee One",
        status: "Employee One",
        projectName: "Employee One",
        projectCode: "Employee One",
        projectType: "Employee One",
        startDate: "Employee One",
        projectLocation: "Employee One",
        poNumber: "Employee One",
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
        branch: "Branch Two",
        customer: "Customer 2",
        customerNo: "CUST002",
        vendorCode:
          "Serve customers, take orders, and ensure customer satisfaction",
        status:
          "Serve customers, take orders, and ensure customer satisfaction",
        projectName: "Project 2",
        projectCode: "Project 2",
        projectType: "Software",
        startDate: "2025-07-01",
        projectLocation: "Dhaka HQ",
        poNumber: "PO12345",
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
        branch: "Branch Three",
        customer: "Customer 3",
        customerNo: "CUST003",
        vendorCode: "VND003",
        status: "In Progress",
        projectName: "Project 3",
        projectCode: "Project 3",
        projectType: "Software",
        startDate: "2025-07-01",
        projectLocation: "Dhaka HQ",
        poNumber: "PO12345",
        description:
          "Serve customers, take orders, and ensure customer satisfaction",
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
          customer: "Customer",
          customerNo: "Customer No",
          vendorCode: "Vendor Code",
          status: "Status",
          projectName: "Project Name",
          projectCode: "Project Code",
          projectType: "Project Type",
          startDate: "Start Date",
          projectLocation: "Project Location",
          poNumber: "PO Number",
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
      console.log("ProjectsDetails on pdf click", taskCategoryData);
      const blob = await pdf(
        <GenericPDF
          data={[taskCategoryData]}
          title="Projects Details"
          subtitle="Projects Information"
        />
      ).toBlob();

      console.log("blob", blob);

      const url = URL.createObjectURL(blob);
      console.log("url", url);
      const a = document.createElement("a");
      a.href = url;
      a.download = "projects-details.pdf";
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
        title="Viewing Projects"
        videoSrc={video}
        videoHeader="Tutorial video"
        onListClick={() => navigate("/projects")}
        listText="List"
        listPath="projects"
        activePage="view"
        popoverOptions={[
          {
            label: "Create",
            icon: <Plus className="w-5 h-5 text-green-600" />,
            onClick: () => navigate("/projects/create"),
          },
          {
            label: "Edit",
            icon: <Edit className="w-5 h-5 text-blue-600" />,
            onClick: () => navigate("/projects/edit/1"),
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
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mt-6">
            {canViewBranch && (
              <div className="mt-1 col-span-3">
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

            {canViewCustomer && (
              <div className="col-span-3">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="font-normal text-gray-600">Customer</h3>
                </div>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(taskCategoryData.customer)}
                </div>
              </div>
            )}

            {canViewCustomerNo && (
              <div className="col-span-3">
                <h3 className="font-normal mb-1 text-gray-600">Customer No</h3>
                <div className="w-fit py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(taskCategoryData.customerNo)}
                </div>
              </div>
            )}

            {canViewVendorCode && (
              <div className="col-span-3">
                <h3 className="font-normal mb-1 text-gray-600">Vendor Code</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(taskCategoryData.vendorCode)}
                </div>
              </div>
            )}

            {canViewStatus && (
              <div className="col-span-3">
                <h3 className="font-normal mb-1 text-gray-600">Status</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(taskCategoryData.status)}
                </div>
              </div>
            )}

            {canViewProjectName && (
              <div className="col-span-3">
                <h3 className="font-normal mb-1 text-gray-600">Project Name</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(taskCategoryData.projectName)}
                </div>
              </div>
            )}

            {canViewProjectCode && (
              <div className="col-span-3">
                <h3 className="font-normal mb-1 text-gray-600">Project Code</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(taskCategoryData.projectCode)}
                </div>
              </div>
            )}
            {canViewProjectType && (
              <div className="col-span-3">
                <h3 className="font-normal mb-1 text-gray-600">Project Type</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(taskCategoryData.projectType)}
                </div>
              </div>
            )}
            {canViewStartDate && (
              <div className="col-span-3">
                <h3 className="font-normal mb-1 text-gray-600">Start Date</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(taskCategoryData.startDate)}
                </div>
              </div>
            )}
            {canViewProjectLocation && (
              <div className="col-span-3">
                <h3 className="font-normal mb-1 text-gray-600">
                  Project Location
                </h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(taskCategoryData.projectLocation)}
                </div>
              </div>
            )}
            {canViewPoNumber && (
              <div className="col-span-3">
                <h3 className="font-normal mb-1 text-gray-600">PO Number</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(taskCategoryData.poNumber)}
                </div>
              </div>
            )}

            {canViewDescription && (
              <div className="col-span-5">
                <h3 className="font-normal mb-1 text-gray-600">Description</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(taskCategoryData.description)}
                </div>
              </div>
            )}
            {canViewIsDefault && (
              <div className="col-span-5">
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
              <div className="flex flex-col col-span-2">
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
              <div className="flex flex-col col-span-2">
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
              <div className="flex flex-col col-span-2">
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
                Project Details
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
                          <div className="font-medium">{item.itemRefNo}</div>
                        </td>
                        <td className="px-4 py-3 text-sm text-center text-gray-600 dark:text-gray-300">
                          <div
                            className="max-w-xs truncate"
                            title={item.category}
                          >
                            {item.category}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-center font-semibold text-gray-900 dark:text-gray-100">
                          {item.services}
                        </td>
                        <td className="px-4 py-3 text-sm text-center font-semibold text-gray-900 dark:text-gray-100">
                          {item.unitPrice}
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
