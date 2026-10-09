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

type EmployeeContractData = {
  staffName: string;
  contactType: string;
  status: string;
  salaryAllowance: string;
  effectiveDate: string;
  expirationDate: string;
  isActive: boolean;
  isDraft: boolean;
  createdAt: Date | null;
  draftedAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;
  isDeleted: boolean;
};

const initialData: EmployeeContractData = {
  staffName: "Ahmed Al-Rashid",
  contactType: "Full Time",
  status: "Active",
  salaryAllowance: "8000 SAR",
  effectiveDate: "2024-01-15",
  expirationDate: "2025-01-15",
  isActive: true,
  isDraft: false,
  createdAt: new Date(),
  draftedAt: null,
  updatedAt: new Date(),
  deletedAt: null,
  isDeleted: false,
};

// Staff Name options for autocomplete
const staffNameOptions = [
  "Ahmed Al-Rashid",
  "Fatima Al-Zahra",
  "Omar Al-Sayed",
  "Layla Al-Mahmoud",
  "Khalid Al-Nasser",
  "Aisha Al-Hassan",
  "Yusuf Al-Qahtani",
  "Noor Al-Sabah",
  "Hassan Al-Mansouri",
  "Mariam Al-Rashid",
];

// Contact Type options for autocomplete
const contactTypeOptions = ["Full Time", "Part Time", "Contract", "Temporary"];

// Status options for autocomplete
const statusOptions = ["Active", "Pending", "Expired", "Draft"];

// Salary options for autocomplete
const salaryOptions = [
  "3000 SAR",
  "3500 SAR",
  "4000 SAR",
  "4500 SAR",
  "5000 SAR",
  "5500 SAR",
  "6000 SAR",
  "7000 SAR",
  "7500 SAR",
  "8000 SAR",
  "8500 SAR",
  "9000 SAR",
  "11000 SAR",
  "12000 SAR",
  "13000 SAR",
  "15000 SAR",
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

export default function EmployeeContractDetailsPage() {
  const navigate = useNavigate();
  const { isRTL } = useSelector((state: RootState) => state.language);

  const [keepChanges, setKeepChanges] = useState(false);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [selectedStaffName, setSelectedStaffName] = useState("Ahmed Al-Rashid");
  const [selectedContactType, setSelectedContactType] = useState("Full Time");
  const [selectedStatus, setSelectedStatus] = useState("Active");
  const [selectedSalary, setSelectedSalary] = useState("8000 SAR");
  const location = useLocation();
  const isViewPage = location.pathname.includes("/view");
  const [pdfChecked, setPdfChecked] = useState(false);
  const [printEnabled, setPrintEnabled] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  // Employee modal states
  const [isEmployeeModalOpen, setIsEmployeeModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<{
    name: string;
    designation: string;
    photo: string;
    iqamaImage: string;
  } | null>(null);

  // get permission
  const canCreate: boolean = usePermission("employeeContract", "create");
  const canView: boolean = usePermission("employeeContract", "view");
  const canEdit: boolean = usePermission("employeeContract", "edit");
  const canDelete: boolean = usePermission("employeeContract", "delete");
  const canExport: boolean = usePermission("employeeContract", "export");
  const canPdf: boolean = usePermission("employeeContract", "pdf");
  const canPrint: boolean = usePermission("employeeContract", "pdf");
  const canSeeHistory: boolean = usePermission("employeeContract", "history");

  // Field-level permissions
  const canViewStaffName: boolean = usePermission(
    "employeeContract",
    "view",
    "staffName"
  );
  const canViewContactType: boolean = usePermission(
    "employeeContract",
    "view",
    "contactType"
  );
  const canViewStatus: boolean = usePermission(
    "employeeContract",
    "view",
    "status"
  );
  const canViewSalaryAllowance: boolean = usePermission(
    "employeeContract",
    "view",
    "salaryAllowance"
  );
  const canViewEffectiveDate: boolean = usePermission(
    "employeeContract",
    "view",
    "effectiveDate"
  );
  const canViewExpirationDate: boolean = usePermission(
    "employeeContract",
    "view",
    "expirationDate"
  );
  const canViewIsActive: boolean = usePermission(
    "employeeContract",
    "view",
    "isActive"
  );
  const canViewIsDraft: boolean = usePermission(
    "employeeContract",
    "view",
    "isDraft"
  );
  const canViewIsDeleted: boolean = usePermission(
    "employeeContract",
    "view",
    "isDeleted"
  );

  console.log("canCreate", canCreate);
  console.log("canView", canView);
  console.log("canEdit", canEdit);
  console.log("canDelete", canDelete);
  console.log("canExport", canExport);

  // Get employee contract data based on selected staff name
  const getEmployeeContractData = (staffName: string): EmployeeContractData => {
    const contractMap: Record<string, EmployeeContractData> = {
      "Ahmed Al-Rashid": {
        staffName: "Ahmed Al-Rashid",
        contactType: "Full Time",
        status: "Active",
        salaryAllowance: "8000 SAR",
        effectiveDate: "2024-01-15",
        expirationDate: "2025-01-15",
        isActive: true,
        isDraft: false,
        createdAt: new Date("2024-01-15T10:30:00Z"),
        draftedAt: null,
        updatedAt: new Date("2024-01-20T14:45:00Z"),
        deletedAt: null,
        isDeleted: false,
      },
      "Fatima Al-Zahra": {
        staffName: "Fatima Al-Zahra",
        contactType: "Part Time",
        status: "Active",
        salaryAllowance: "5000 SAR",
        effectiveDate: "2024-02-01",
        expirationDate: "2025-02-01",
        isActive: true,
        isDraft: false,
        createdAt: new Date("2024-02-01T09:15:00Z"),
        draftedAt: null,
        updatedAt: new Date("2024-02-05T11:30:00Z"),
        deletedAt: null,
        isDeleted: false,
      },
      "Omar Al-Sayed": {
        staffName: "Omar Al-Sayed",
        contactType: "Contract",
        status: "Pending",
        salaryAllowance: "12000 SAR",
        effectiveDate: "2024-03-01",
        expirationDate: "2025-03-01",
        isActive: true,
        isDraft: false,
        createdAt: new Date("2024-03-01T16:20:00Z"),
        draftedAt: null,
        updatedAt: new Date("2024-03-05T13:45:00Z"),
        deletedAt: null,
        isDeleted: false,
      },
      "Layla Al-Mahmoud": {
        staffName: "Layla Al-Mahmoud",
        contactType: "Full Time",
        status: "Draft",
        salaryAllowance: "9000 SAR",
        effectiveDate: "2024-04-01",
        expirationDate: "2025-04-01",
        isActive: true,
        isDraft: true,
        createdAt: new Date("2024-04-01T12:00:00Z"),
        draftedAt: new Date("2024-04-10T10:00:00Z"),
        updatedAt: new Date("2024-04-10T10:00:00Z"),
        deletedAt: null,
        isDeleted: false,
      },
      "Khalid Al-Nasser": {
        staffName: "Khalid Al-Nasser",
        contactType: "Temporary",
        status: "Expired",
        salaryAllowance: "6000 SAR",
        effectiveDate: "2023-06-01",
        expirationDate: "2024-06-01",
        isActive: false,
        isDraft: false,
        createdAt: new Date("2023-06-01T08:30:00Z"),
        draftedAt: null,
        updatedAt: new Date("2024-06-01T15:20:00Z"),
        deletedAt: null,
        isDeleted: false,
      },
    };

    return contractMap[staffName] || initialData;
  };

  const [employeeContractData, setEmployeeContractData] =
    useState<EmployeeContractData>(getEmployeeContractData(selectedStaffName));

  const inputRef = useRef<HTMLInputElement>(null);

  // Employee data mapping for staff names
  const employeeData: Record<
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
      designation: "Software Engineer",
      photo:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face&auto=format",
      iqamaImage:
        "https://agtsipk.com/wp-content/uploads/2023/09/What-is-Iqama-in-Saudi-Arabia-4-1.png",
    },
    "Fatima Al-Zahra": {
      name: "Fatima Al-Zahra",
      designation: "HR Specialist",
      photo:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face&auto=format",
      iqamaImage:
        "https://agtsipk.com/wp-content/uploads/2023/09/What-is-Iqama-in-Saudi-Arabia-4-1.png",
    },
    "Omar Al-Sayed": {
      name: "Omar Al-Sayed",
      designation: "Project Manager",
      photo:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face&auto=format",
      iqamaImage:
        "https://agtsipk.com/wp-content/uploads/2023/09/What-is-Iqama-in-Saudi-Arabia-4-1.png",
    },
    "Layla Al-Mahmoud": {
      name: "Layla Al-Mahmoud",
      designation: "Business Analyst",
      photo:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face&auto=format",
      iqamaImage:
        "https://agtsipk.com/wp-content/uploads/2023/09/What-is-Iqama-in-Saudi-Arabia-4-1.png",
    },
    "Khalid Al-Nasser": {
      name: "Khalid Al-Nasser",
      designation: "Finance Manager",
      photo:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face&auto=format",
      iqamaImage:
        "https://agtsipk.com/wp-content/uploads/2023/09/What-is-Iqama-in-Saudi-Arabia-4-1.png",
    },
    "Aisha Al-Hassan": {
      name: "Aisha Al-Hassan",
      designation: "Marketing Coordinator",
      photo:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face&auto=format",
      iqamaImage:
        "https://agtsipk.com/wp-content/uploads/2023/09/What-is-Iqama-in-Saudi-Arabia-4-1.png",
    },
  };

  // Update employee contract data when selection changes
  useEffect(() => {
    const newContractData = getEmployeeContractData(selectedStaffName);
    setEmployeeContractData(newContractData);
    setSelectedContactType(newContractData.contactType);
    setSelectedStatus(newContractData.status);
    setSelectedSalary(newContractData.salaryAllowance);
  }, [selectedStaffName]);

  // Handle staff name change to show employee details
  const handleStaffNameChange = (value: string) => {
    setSelectedStaffName(value);

    // Show employee details if valid staff name is selected
    if (value && employeeData[value]) {
      setSelectedEmployee(employeeData[value]);
      setIsEmployeeModalOpen(true);
    }
  };

  // Focus input when dropdown opens
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    console.log("isViewPage", isViewPage);
  }, []);

  const handlePrintContract = (contractData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Employee Contract Details",
        data: [contractData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          staffName: "Staff Name",
          contactType: "Contact Type",
          status: "Status",
          salaryAllowance: "Salary Allowance",
          effectiveDate: "Effective Date",
          expirationDate: "Expiration Date",
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
      console.log("contractData on pdf click", employeeContractData);
      const blob = await pdf(
        <GenericPDF
          data={[employeeContractData]}
          title="Employee Contract Details"
          subtitle="Contract Information"
        />
      ).toBlob();

      console.log("blob", blob);

      const url = URL.createObjectURL(blob);
      console.log("url", url);
      const a = document.createElement("a");
      a.href = url;
      a.download = "employee-contract-details.pdf";
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
        title="Viewing Employee Contract"
        videoSrc={video}
        videoHeader="Tutorial video"
        onListClick={() => navigate("/employee-contract")}
        listText="List"
        listPath="employee-contract"
        activePage="view"
        popoverOptions={[
          {
            label: "Create",
            icon: <Plus className="w-5 h-5 text-green-600" />,
            onClick: () => navigate("/employee-contract/create"),
          },
          {
            label: "Edit",
            icon: <Edit className="w-5 h-5 text-blue-600" />,
            onClick: () => navigate("/employee-contract/edit/1"),
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
                  handlePrintContract(employeeContractData);
                }
              }
            : undefined
        }
      >
        <div dir={isRTL ? "rtl" : "ltr"}>
          {/* Row 1: Staff Name, Contact Type, Status, Salary Allowance */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            {canViewStaffName && (
              <div className="mt-1">
                <Autocomplete
                  options={staffNameOptions}
                  value={selectedStaffName}
                  onValueChange={handleStaffNameChange}
                  placeholder="Select Staff Name..."
                  displayKey="staffName"
                  valueKey="staffName"
                  searchKey="staffName"
                  disabled={false}
                  className="w-[96%] bg-gray-100 rounded-xl"
                  labelClassName="bg-gray-50 rounded-2xl"
                  labelText="Staff Name"
                  inputClassName="border-none bg-stone-50 focus-visible:ring-offset-0 focus-visible:ring-0 focus-visible:border-2! focus-visible:border-blue-500"
                />
              </div>
            )}

            {canViewContactType && (
              <div className="mt-1">
                <Autocomplete
                  options={contactTypeOptions}
                  value={selectedContactType}
                  onValueChange={setSelectedContactType}
                  placeholder="Select contact type..."
                  displayKey="contactType"
                  valueKey="contactType"
                  searchKey="contactType"
                  disabled={false}
                  className="w-[96%] bg-gray-100 rounded-xl"
                  labelClassName="bg-gray-50 rounded-2xl"
                  labelText="Contact Type"
                  inputClassName="border-none bg-stone-50 focus-visible:ring-offset-0 focus-visible:ring-0 focus-visible:border-2! focus-visible:border-blue-500"
                />
              </div>
            )}

            {canViewStatus && (
              <div className="mt-1">
                <Autocomplete
                  options={statusOptions}
                  value={selectedStatus}
                  onValueChange={setSelectedStatus}
                  placeholder="Select status..."
                  displayKey="status"
                  valueKey="status"
                  searchKey="status"
                  disabled={false}
                  className="w-[96%] bg-gray-100 rounded-xl"
                  labelClassName="bg-gray-50 rounded-2xl"
                  labelText="Status"
                  inputClassName="border-none bg-stone-50 focus-visible:ring-offset-0 focus-visible:ring-0 focus-visible:border-2! focus-visible:border-blue-500"
                />
              </div>
            )}

            {canViewSalaryAllowance && (
              <div className="mt-1">
                <Autocomplete
                  options={salaryOptions}
                  value={selectedSalary}
                  onValueChange={setSelectedSalary}
                  placeholder="Select salary..."
                  displayKey="salaryAllowance"
                  valueKey="salaryAllowance"
                  searchKey="salaryAllowance"
                  disabled={false}
                  className="w-[96%] bg-gray-100 rounded-xl"
                  labelClassName="bg-gray-50 rounded-2xl"
                  labelText="Salary Allowance"
                  inputClassName="border-none bg-stone-50 focus-visible:ring-offset-0 focus-visible:ring-0 focus-visible:border-2! focus-visible:border-blue-500"
                />
              </div>
            )}
          </div>

          {/* Row 2: Effective Date, Expiration Date */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
            {canViewEffectiveDate && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">
                  Effective Date
                </h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(employeeContractData.effectiveDate)}
                </div>
              </div>
            )}

            {canViewExpirationDate && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">
                  Expiration Date
                </h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(employeeContractData.expirationDate)}
                </div>
              </div>
            )}

            {canViewIsActive && (
              <div className="flex flex-col">
                <div className="">
                  <span className="text-[15px] text-gray-600">Active</span>
                </div>
                <div className="">
                  {employeeContractData.isActive ? (
                    <span className="font-bold text-[15px]">Yes</span>
                  ) : (
                    <span className="font-bold text-[15px]">No</span>
                  )}
                </div>
              </div>
            )}

            {canViewIsDraft && (
              <div className="flex flex-col">
                <div className="">
                  <span className="text-[15px] text-gray-600">Draft</span>
                </div>
                <div className="">
                  {employeeContractData.isDraft ? (
                    <span className="text-orange-600 font-bold text-[15px]">
                      Yes
                    </span>
                  ) : (
                    <span className="text-black font-bold text-[15px]">No</span>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Row 3: Status fields */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
            {canViewIsDeleted && (
              <div className="flex flex-col">
                <div className="">
                  <span className="text-[15px] text-gray-600">Deleted</span>
                </div>
                <div className="">
                  {employeeContractData.isDeleted ? (
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
          created: getRelativeTime(employeeContractData.createdAt),
          updated: getRelativeTime(employeeContractData.updatedAt),
          drafted: getRelativeTime(employeeContractData.draftedAt),
          deleted: getRelativeTime(employeeContractData.deletedAt),
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

      {/* Employee Details Modal */}
      <Modal
        opened={isEmployeeModalOpen}
        onClose={() => setIsEmployeeModalOpen(false)}
        title="Employee Details"
        size="lg"
        overlayProps={{ backgroundOpacity: 0.55, blur: 3 }}
        centered
      >
        {selectedEmployee && (
          <div className="p-6">
            {/* Employee Header with Photo and Basic Info */}
            <div className="flex items-center gap-6 mb-6">
              <div className="flex-shrink-0">
                <img
                  src={selectedEmployee.photo}
                  alt={selectedEmployee.name}
                  className="w-20 h-20 rounded-full object-cover border-4 border-blue-100 shadow-lg"
                />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 mb-1">
                  {selectedEmployee.name}
                </h2>
                <p className="text-lg text-gray-600 font-medium">
                  {selectedEmployee.designation}
                </p>
                <div className="mt-2 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                  Active Employee
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
                    src={selectedEmployee.iqamaImage}
                    alt="Iqama Card"
                    className="w-full h-48 object-cover rounded-lg shadow-md"
                  />
                  <div className="mt-4 text-center">
                    <p className="text-sm text-gray-600">Employee Name</p>
                    <p className="text-lg font-bold text-gray-900">
                      {employeeContractData.staffName}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-6">
              <Button
                onClick={() => setIsEmployeeModalOpen(false)}
                className="flex-1 bg-sky-500 hover:bg-sky-600 text-white font-medium py-3 rounded-full transition-colors"
              >
                Continue with Contract
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
