/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
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

type Employee = {
  name: string;
  iqamaNo: string;
  designation: string;
  image: string;
  branch: string;
};

const employeeData: Employee[] = [
  {
    name: "Sabbir Shuvo",
    iqamaNo: "9876543210",
    designation: "Software Engineer",
    image: "https://www.gravatar.com/avatar/1?d=identicon&s=250",
    branch: "Dubai Head Office",
  },
  {
    name: "Nusrat Jahan",
    iqamaNo: "1234509876",
    designation: "HR Manager",
    image: "https://www.gravatar.com/avatar/2?d=identicon&s=250",
    branch: "Chittagong Regional Office",
  },
  {
    name: "Tanvir Alam",
    iqamaNo: "1122334455",
    designation: "Finance Officer",
    image: "https://www.gravatar.com/avatar/3?d=identicon&s=250",
    branch: "Khulna Branch",
  },
  {
    name: "Sadia Afreen",
    iqamaNo: "9988776655",
    designation: "Marketing Executive",
    image: "https://www.gravatar.com/avatar/4?d=identicon&s=250",
    branch: "Sylhet Branch",
  },
  {
    name: "Farhan Kabir",
    iqamaNo: "5566778899",
    designation: "IT Support Specialist",
    image: "https://www.gravatar.com/avatar/5?d=identicon&s=250",
    branch: "Barisal Branch",
  },
  {
    name: "Ayesha Siddiqua",
    iqamaNo: "1029384756",
    designation: "Operations Coordinator",
    image: "https://www.gravatar.com/avatar/6?d=identicon&s=250",
    branch: "Rajshahi Branch",
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

export default function RetirementDetailsPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [keepChanges, setKeepChanges] = useState(false);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<any>(
    employeeData[0]
  );
  const location = useLocation();
  const isViewPage = location.pathname.includes("/view");
  const [pdfChecked, setPdfChecked] = useState(false);
  const [printEnabled, setPrintEnabled] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  // get permission
  const canPdf: boolean = usePermission("retirement", "pdf");
  const canEdit: boolean = usePermission("retirement", "edit");
  const canDelete: boolean = usePermission("retirement", "delete");
  const canCreate: boolean = usePermission("retirement", "create");
  const canView: boolean = usePermission("retirement", "view");
  const canPrint: boolean = usePermission("retirement", "print");
  const canSeeHistory: boolean = usePermission("retirement", "history");

  console.log("canCreate", canCreate);
  console.log("canView", canView);
  console.log("canEdit", canEdit);
  console.log("canDelete", canDelete);

  let retirementData = {
    name: "Basic Retirement",
    date: "05/01/2023",
    status: false,
    description: "Regular Increment",
    iqamaNo: employeeData[0].iqamaNo,
    employeeName: employeeData[0].name,
    employeeDesignation: employeeData[0].designation,
    employeeBranch: employeeData[0].branch,
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
      retirementData = {
        name: "Basic Retirement",
        date: "05/01/2023",
        status: false,
        description: "Regular Increment",
        iqamaNo: employeeData[0].iqamaNo,
        employeeName: employeeData[0].name,
        employeeDesignation: "",
        employeeBranch: employeeData[0].branch,
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

  const handlePrintCountry = (retirementData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Retirement Details",
        data: [retirementData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          isDefault: "Default Country",
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
    //   setTimeout(() => handlePrintCountry(retirementData), 100);
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
      console.log("retirementData on pdf click", retirementData);
      const blob = await pdf(
        <GenericPDF
          data={[retirementData]}
          title="Increments Details"
          subtitle="Increments Information"
        />
      ).toBlob();

      console.log("blob", blob);

      const url = URL.createObjectURL(blob);
      console.log("url", url);
      const a = document.createElement("a");
      a.href = url;
      a.download = "increments-details.pdf";
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
        title={t("button.viewingRetirement")}
        videoSrc={video}
        videoHeader="Tutorial video"
        onListClick={() => navigate("/increments")}
        listText="List"
        listPath="retirement"
        activePage="view"
        popoverOptions={[
          {
            label: "Create",
            icon: <Plus className="w-5 h-5 text-green-600" />,
            onClick: () => navigate("/retirement/create"),
          },
          {
            label: "Edit",
            icon: <Edit className="w-5 h-5 text-blue-600" />,
            onClick: () => navigate("/retirement/edit/1"),
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
                  handlePrintCountry(retirementData);
                }
              }
            : undefined
        }
      >
        {/* Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="mt-1">
            <Autocomplete
              options={employeeData.map((emp) => emp.name)}
              value={retirementData.employeeName}
              onValueChange={(value: string) => {
                setSelectedEmployee(
                  employeeData.find((emp) => emp.name === value)
                );
              }}
              placeholder="Select an employee..."
              displayKey="Name"
              valueKey="Name"
              searchKey="name"
              disabled={false}
              className="w-[96%] bg-gray-100 rounded-xl"
              labelClassName="bg-gray-50 rounded-2xl"
              labelText="Employee Name"
              inputClassName="border-none bg-stone-50 focus-visible:ring-offset-0 focus-visible:ring-0 focus-visible:border-2! focus-visible:border-blue-500"
            />
          </div>

          <div className="">
            <h3 className="font-normal mb-1 text-gray-600">Iqama Number</h3>
            <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
              {displayValue(retirementData.iqamaNo)}
            </div>
          </div>

          <div className="">
            <h3 className="font-normal mb-1 text-gray-600">Increments Name</h3>
            <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
              {displayValue(retirementData.name)}
            </div>
          </div>

          <div className="">
            <h3 className="font-normal mb-1 text-gray-600">Date</h3>
            <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
              {displayValue(retirementData.date)}
            </div>
          </div>
          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">Status</h3>
            </div>
            <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
              <div className="">
                {retirementData.status ? (
                  <span className="text-black font-bold text-[15px]">Yes</span>
                ) : (
                  <span className="text-black font-bold text-[15px]">No</span>
                )}
              </div>
            </div>
          </div>
          <div className="">
            <h3 className="font-normal mb-1 text-gray-600">Description</h3>
            <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
              {displayValue(retirementData.description)}
            </div>
          </div>

          {/* Default Label */}
          <div className="">
            <div className="flex flex-col">
              <div className="">
                <span className="text-[15px] text-gray-600">Default</span>
              </div>
              <div className="">
                {retirementData.isDefault ? (
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
              {!retirementData.isActive ? (
                <span className="text-black font-bold text-[15px]">Yes</span>
              ) : (
                <span className="text-black font-bold text-[15px]">No</span>
              )}
            </div>
          </div>
        </div>

        {/* Row 2 - Status Labels */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Draft Label */}
          <div className="flex flex-col">
            <div className="">
              <span className="text-[15px] text-gray-600">Draft</span>
            </div>
            <div className="">
              {retirementData.isDraft ? (
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
              {retirementData.isDeleted ? (
                <span className="text-black font-bold text-[15px]">Yes</span>
              ) : (
                <span className="text-black font-bold text-[15px]">No</span>
              )}
            </div>
          </div>
        </div>

        {/* Employee Preview  */}
        {selectedEmployee && (
          <div className="max-w-2xl w-full bg-gray-50 border border-gray-200 rounded-xl shadow-sm overflow-hidden flex">
            {/* Left section (image) */}
            <div className="bg-gradient-to-b from-blue-100 to-blue-200 p-6 flex items-center justify-center">
              <img
                src={selectedEmployee.image}
                alt={selectedEmployee.name}
                className="w-28 h-28 rounded-full border-4 border-white shadow-md object-cover"
              />
            </div>

            {/* Right section (info) */}
            <div className="flex-1 p-5 space-y-3">
              <h3 className="text-xl font-semibold text-gray-800">
                {selectedEmployee.name}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-700">
                <p>
                  <span className="font-medium text-gray-900">Iqama No:</span>{" "}
                  {selectedEmployee.iqamaNo}
                </p>
                <p>
                  <span className="font-medium text-gray-900">
                    Designation:
                  </span>{" "}
                  {selectedEmployee.designation}
                </p>
                <p>
                  <span className="font-medium text-gray-900">Branch:</span>{" "}
                  {selectedEmployee.branch}
                </p>
                <p>
                  <span className="font-medium text-gray-900">Email:</span>{" "}
                  example@example.com
                </p>
              </div>
            </div>
          </div>
        )}
      </PageLayout>

      {/* History Modal */}
      <HistoryDataTable
        isOptionModalOpen={isOptionModalOpen}
        setIsOptionModalOpen={setIsOptionModalOpen}
        columnData={mockHistoryData}
        title="History"
        statusInfo={{
          created: getRelativeTime(retirementData.createdAt),
          updated: getRelativeTime(retirementData.updatedAt),
          drafted: getRelativeTime(retirementData.draftedAt),
          deleted: getRelativeTime(retirementData.deletedAt),
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
