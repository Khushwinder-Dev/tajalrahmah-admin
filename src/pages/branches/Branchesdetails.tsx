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

const MOCK_BRANCHES = [
  {
    id: "1",
    code: "BR-001",
    branchName: "Main Branch",
    taxNumber: "TAX-123456789",
    phone: "+1-555-0123",
    fax: "+1-555-0124",
    mobile: "+1-555-0125",
    email: "info@mainbranch.com",
    website: "www.mainbranch.com",
    address: "123 Main Street, Downtown",
    country: "United States",
    state: "California",
    city: "San Francisco",
    postCode: "94105",
    bankDetails: "Bank of America, Account: 1234567890",
    status: "Active",
  },
  {
    id: "2",
    code: "BR-002",
    branchName: "North Branch",
    taxNumber: "TAX-987654321",
    phone: "+1-555-0124",
    fax: "+1-555-0125",
    mobile: "+1-555-0126",
    email: "contact@northbranch.com",
    website: "www.northbranch.com",
    address: "456 North Avenue, Uptown",
    country: "United States",
    state: "New York",
    city: "New York City",
    postCode: "10001",
    bankDetails: "Chase Bank, Account: 9876543210",
    status: "Active",
  },
  {
    id: "3",
    code: "BR-003",
    branchName: "South Branch",
    taxNumber: "TAX-456789123",
    phone: "+1-555-0125",
    fax: "+1-555-0126",
    mobile: "+1-555-0127",
    email: "hello@southbranch.com",
    website: "www.southbranch.com",
    address: "789 South Boulevard, Midtown",
    country: "United States",
    state: "Texas",
    city: "Austin",
    postCode: "73301",
    bankDetails: "Wells Fargo, Account: 4567891230",
    status: "Draft",
  },
  {
    id: "4",
    code: "BR-004",
    branchName: "West Branch",
    taxNumber: "TAX-789123456",
    phone: "+1-555-0126",
    fax: "+1-555-0127",
    mobile: "+1-555-0128",
    email: "info@westbranch.com",
    website: "www.westbranch.com",
    address: "321 West Street, Downtown",
    country: "United States",
    state: "Washington",
    city: "Seattle",
    postCode: "98101",
    bankDetails: "US Bank, Account: 7891234560",
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

export default function BranchDetailsPage() {
  // const { t } = useTranslation();
  const navigate = useNavigate();

  const [keepChanges, setKeepChanges] = useState(false);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState("1");
  const location = useLocation();
  const isViewPage = location.pathname.includes("/view");
  const [pdfChecked, setPdfChecked] = useState(false);
  const [printEnabled, setPrintEnabled] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  // Permission checks
  // const { canCreate, canView, canEdit, canDelete } = useUserMasterPermissions();

  // Field-level permissions
  const canPdf: boolean = usePermission("branches", "pdf");
  const canPrint: boolean = usePermission("branches", "print");
  const canSeeHistory: boolean = usePermission("branches", "history");

  let reportData = {
    id: selectedBranch,
    code: MOCK_BRANCHES.find((r) => r.id === selectedBranch)?.code || "BR-001",
    branchName:
      MOCK_BRANCHES.find((r) => r.id === selectedBranch)?.branchName ||
      "Main Branch",
    taxNumber:
      MOCK_BRANCHES.find((r) => r.id === selectedBranch)?.taxNumber ||
      "TAX-123456789",
    phone:
      MOCK_BRANCHES.find((r) => r.id === selectedBranch)?.phone ||
      "+1-555-0123",
    fax:
      MOCK_BRANCHES.find((r) => r.id === selectedBranch)?.fax || "+1-555-0124",
    mobile:
      MOCK_BRANCHES.find((r) => r.id === selectedBranch)?.mobile ||
      "+1-555-0125",
    email:
      MOCK_BRANCHES.find((r) => r.id === selectedBranch)?.email ||
      "info@mainbranch.com",
    website:
      MOCK_BRANCHES.find((r) => r.id === selectedBranch)?.website ||
      "www.mainbranch.com",
    address:
      MOCK_BRANCHES.find((r) => r.id === selectedBranch)?.address ||
      "123 Main Street, Downtown",
    country:
      MOCK_BRANCHES.find((r) => r.id === selectedBranch)?.country ||
      "United States",
    state:
      MOCK_BRANCHES.find((r) => r.id === selectedBranch)?.state || "California",
    city:
      MOCK_BRANCHES.find((r) => r.id === selectedBranch)?.city ||
      "San Francisco",
    postCode:
      MOCK_BRANCHES.find((r) => r.id === selectedBranch)?.postCode || "94105",
    bankDetails:
      MOCK_BRANCHES.find((r) => r.id === selectedBranch)?.bankDetails ||
      "Bank of America, Account: 1234567890",
    isDefault: true,
    isActive: true,
    isDraft: false,
    isDeleted: false,
    status:
      MOCK_BRANCHES.find((r) => r.id === selectedBranch)?.status || "Active",
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
        id: selectedBranch,
        code: "",
        branchName: "",
        taxNumber: "",
        phone: "",
        fax: "",
        mobile: "",
        email: "",
        website: "",
        address: "",
        country: "",
        state: "",
        city: "",
        postCode: "",
        bankDetails: "",
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
        title: "Branch Details",
        data: [report],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          code: "Code",
          branchName: "Branch Name",
          taxNumber: "Tax Number",
          phone: "Phone",
          fax: "Fax",
          mobile: "Mobile",
          email: "Email",
          website: "Website",
          address: "Address",
          country: "Country",
          state: "State",
          city: "City",
          postCode: "Post Code",
          bankDetails: "Bank Details",
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
          title="Branch Details"
          subtitle="Branch Information"
        />
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "branch-details.pdf";
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
        moduleId="branches-details-module"
        moduleName="Branch Details"
        moduleRoute="/branches/view"
        title="Viewing Branch"
        videoSrc={video}
        videoHeader="Tutorial video"
        listPath="branches"
        activePage="view"
        module="branches"
        popoverOptions={[
          {
            label: "Create",
            icon: <Plus className="w-5 h-5 text-green-600" />,
            onClick: () => navigate("/branches/create"),
          },
          {
            label: "Edit",
            icon: <Edit className="w-5 h-5 text-blue-600" />,
            onClick: () => navigate("/branches/edit/1"),
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
        {/* Row 1: Branch Selection, Code, Branch Name, Tax Number */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="mt-1">
            <Autocomplete
              options={MOCK_BRANCHES}
              value={selectedBranch}
              onValueChange={setSelectedBranch}
              placeholder=" "
              displayKey="branchName"
              valueKey="id"
              searchKey="branchName"
              disabled={false}
              className="w-[96%] bg-gray-100 rounded-xl"
              labelClassName="bg-gray-50 rounded-2xl"
              labelText="Branch"
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
              <h3 className="font-normal text-gray-600">Branch Name</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(reportData.branchName)}
            </div>
          </div>

          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">Tax Number</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(reportData.taxNumber)}
            </div>
          </div>
        </div>

        {/* Row 2: Phone, Fax, Mobile, Email */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">Phone</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(reportData.phone)}
            </div>
          </div>

          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">Fax</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(reportData.fax)}
            </div>
          </div>

          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">Mobile</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(reportData.mobile)}
            </div>
          </div>

          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">Email</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(reportData.email)}
            </div>
          </div>
        </div>

        {/* Row 3: Website, Address, Country, State */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">Website</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(reportData.website)}
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
              <h3 className="font-normal text-gray-600">Country</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(reportData.country)}
            </div>
          </div>

          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">State</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(reportData.state)}
            </div>
          </div>
        </div>

        {/* Row 4: City, Post Code, Bank Details, Status */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">City</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(reportData.city)}
            </div>
          </div>

          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">Post Code</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(reportData.postCode)}
            </div>
          </div>

          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">Bank Details</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(reportData.bankDetails)}
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
        </div>

        {/* Row 5: Default */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
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
