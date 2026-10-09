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

const MOCK_ONBOARDING_DATA = [
  {
    id: "1",
    dataId: "ONB001",
    selectStaff: "John Doe",
    generalInformation: "New employee onboarding",
    staffFullName: "John Doe Smith",
    address: "123 Main Street, City",
    assetAllocation: "Laptop, Phone, ID Card",
    typeOfTraining: "Technical Training",
    trainingProgram: "Software Development Basics",
    status: "Active",
  },
  {
    id: "2",
    dataId: "ONB002",
    selectStaff: "Jane Smith",
    generalInformation: "Manager onboarding process",
    staffFullName: "Jane Smith Wilson",
    address: "456 Oak Avenue, Town",
    assetAllocation: "Laptop, Phone, Access Card, Company Car",
    typeOfTraining: "Leadership Training",
    trainingProgram: "Management Excellence Program",
    status: "Active",
  },
  {
    id: "3",
    dataId: "ONB003",
    selectStaff: "Mike Johnson",
    generalInformation: "Intern onboarding",
    staffFullName: "Mike Johnson Brown",
    address: "789 Pine Street, Village",
    assetAllocation: "Laptop, Temporary ID",
    typeOfTraining: "Basic Training",
    trainingProgram: "Internship Orientation",
    status: "Draft",
  },
  {
    id: "4",
    dataId: "ONB004",
    selectStaff: "Sarah Davis",
    generalInformation: "Remote employee setup",
    staffFullName: "Sarah Davis Miller",
    address: "321 Elm Road, City",
    assetAllocation: "Laptop, VPN Access, Home Office Setup",
    typeOfTraining: "Remote Work Training",
    trainingProgram: "Digital Collaboration Tools",
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

export default function OnboardingDetailsPage() {
  // const { t } = useTranslation();
  const navigate = useNavigate();

  const [keepChanges, setKeepChanges] = useState(false);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [selectedOnboarding, setSelectedOnboarding] = useState("1");
  const location = useLocation();
  const isViewPage = location.pathname.includes("/view");
  const [pdfChecked, setPdfChecked] = useState(false);
  const [printEnabled, setPrintEnabled] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  // Permission checks
  // const { canCreate, canView, canEdit, canDelete } = useUserMasterPermissions();

  // Field-level permissions
  const canPdf: boolean = usePermission("onboarding", "pdf");
  const canPrint: boolean = usePermission("onboarding", "print");
  const canSeeHistory: boolean = usePermission("onboarding", "history");

  let reportData = {
    id: selectedOnboarding,
    dataId:
      MOCK_ONBOARDING_DATA.find((r) => r.id === selectedOnboarding)?.dataId ||
      "ONB001",
    selectStaff:
      MOCK_ONBOARDING_DATA.find((r) => r.id === selectedOnboarding)
        ?.selectStaff || "John Doe",
    generalInformation:
      MOCK_ONBOARDING_DATA.find((r) => r.id === selectedOnboarding)
        ?.generalInformation || "New employee onboarding",
    staffFullName:
      MOCK_ONBOARDING_DATA.find((r) => r.id === selectedOnboarding)
        ?.staffFullName || "John Doe Smith",
    address:
      MOCK_ONBOARDING_DATA.find((r) => r.id === selectedOnboarding)?.address ||
      "123 Main Street, City",
    assetAllocation:
      MOCK_ONBOARDING_DATA.find((r) => r.id === selectedOnboarding)
        ?.assetAllocation || "Laptop, Phone, ID Card",
    typeOfTraining:
      MOCK_ONBOARDING_DATA.find((r) => r.id === selectedOnboarding)
        ?.typeOfTraining || "Technical Training",
    trainingProgram:
      MOCK_ONBOARDING_DATA.find((r) => r.id === selectedOnboarding)
        ?.trainingProgram || "Software Development Basics",
    isDefault: true,
    isActive: true,
    isDraft: false,
    isDeleted: false,
    status:
      MOCK_ONBOARDING_DATA.find((r) => r.id === selectedOnboarding)?.status ||
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
        id: selectedOnboarding,
        dataId: "",
        selectStaff: "",
        generalInformation: "",
        staffFullName: "",
        address: "",
        assetAllocation: "",
        typeOfTraining: "",
        trainingProgram: "",
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
        title: "Onboarding Details",
        data: [report],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          dataId: "Data ID",
          selectStaff: "Select Staff",
          generalInformation: "General Information",
          staffFullName: "Staff Full Name",
          address: "Address",
          assetAllocation: "Asset Allocation",
          typeOfTraining: "Type of Training",
          trainingProgram: "Training Program",
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
          title="Onboarding Details"
          subtitle="Onboarding Information"
        />
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "onboarding-details.pdf";
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
        moduleId="onboarding-details-module"
        moduleName="Onboarding Details"
        moduleRoute="/onboarding/view"
        title="Viewing Onboarding"
        videoSrc={video}
        videoHeader="Tutorial video"
        listPath="onboarding"
        activePage="view"
        module="onboarding"
        popoverOptions={[
          {
            label: "Create",
            icon: <Plus className="w-5 h-5 text-green-600" />,
            onClick: () => navigate("/onboarding/create"),
          },
          {
            label: "Edit",
            icon: <Edit className="w-5 h-5 text-blue-600" />,
            onClick: () => navigate("/onboarding/edit/1"),
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
        {/* Row 1: Onboarding Selection, Data ID, Select Staff, General Information */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="mt-1">
            <Autocomplete
              options={MOCK_ONBOARDING_DATA}
              value={selectedOnboarding}
              onValueChange={setSelectedOnboarding}
              placeholder=" "
              displayKey="staffFullName"
              valueKey="id"
              searchKey="staffFullName"
              disabled={false}
              className="w-[96%] bg-gray-100 rounded-xl"
              labelClassName="bg-gray-50 rounded-2xl"
              labelText="Onboarding"
              isShowTemplateIcon={false}
            />
          </div>

          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">Data ID</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(reportData.dataId)}
            </div>
          </div>

          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">Select Staff</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(reportData.selectStaff)}
            </div>
          </div>

          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">General Information</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(reportData.generalInformation)}
            </div>
          </div>
        </div>

        {/* Row 2: Staff Full Name, Address, Asset Allocation, Type of Training */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">Staff Full Name</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(reportData.staffFullName)}
            </div>
          </div>

          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">Address</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(reportData.address)}
            </div>
          </div>

          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">Asset Allocation</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(reportData.assetAllocation)}
            </div>
          </div>

          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">Type of Training</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(reportData.typeOfTraining)}
            </div>
          </div>
        </div>

        {/* Row 3: Training Program, Status, Default */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">Training Program</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(reportData.trainingProgram)}
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

          <div className="">{/* Empty column for spacing */}</div>
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
