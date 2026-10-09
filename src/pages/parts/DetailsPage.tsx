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

type TermsData = {
  propertyName: string;
  customer: string;
  requestNumber: string;
  inspectionDate: string;
  leaseStartDate: string;
  term: string;
  endDate: string;
  dateCreated: string;
  propertyPrice: string;
  contractAmount: string;
  clientNote: string;
  adminNote: string;

  isDefault: boolean;
  isActive: boolean;
  isDraft: boolean;
  createdAt: Date | null;
  draftedAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;
  isDeleted: boolean;
};

const initialData: TermsData = {
  propertyName: "Greenwood Apartments",
  customer: "John Doe",
  requestNumber: "REQ-1001",
  inspectionDate: "2025-01-15",
  leaseStartDate: "2025-01-15",
  term: "12 months",
  endDate: "2026-01-14",
  dateCreated: "2025-01-01",
  propertyPrice: "150000",
  contractAmount: "12000",
  clientNote: "Wants early move-in.",
  adminNote: "Check documents before finalizing.",

  isDefault: false,
  isActive: true,
  isDraft: false,
  createdAt: new Date(),
  draftedAt: null,
  updatedAt: new Date(),
  deletedAt: null,
  isDeleted: false,
};

// Leave Types options for autocomplete
const projectTypeOptions = [
  "Greenwood Apartments",
  "Lakeside Villa",
  "Downtown Office Space",
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

export default function PartsDetails() {
  const navigate = useNavigate();
  const { isRTL } = useSelector((state: RootState) => state.language);

  const [keepChanges, setKeepChanges] = useState(false);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [selectedLeaveType, setSelectedLeaveType] = useState(
    "Greenwood Apartments"
  );
  const location = useLocation();
  const isViewPage = location.pathname.includes("/view");
  const [pdfChecked, setPdfChecked] = useState(false);
  const [printEnabled, setPrintEnabled] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  // get permission
  const canCreate: boolean = usePermission("rentalRequests", "create");
  const canView: boolean = usePermission("rentalRequests", "view");
  const canEdit: boolean = usePermission("rentalRequests", "edit");
  const canDelete: boolean = usePermission("rentalRequests", "delete");
  const canExport: boolean = usePermission("rentalRequests", "export");
  const canPdf: boolean = usePermission("rentalRequests", "pdf");
  const canPrint: boolean = usePermission("rentalRequests", "print");
  const canSeeHistory: boolean = usePermission("rentalRequests", "history");

  // Field-level permissions
  const permissionsFieldLevel = usePermission<keyof TermsData>(
    "rentalRequests",
    "view",
    [
      "propertyName",
      "customer",
      "requestNumber",
      "inspectionDate",
      "leaseStartDate",
      "term",
      "endDate",
      "dateCreated",
      "propertyPrice",
      "contractAmount",
      "clientNote",
      "adminNote",
      "isDefault",
      "isActive",
      "isDeleted",
      "isDraft",
    ]
  );

  console.log("canCreate", canCreate);
  console.log("canView", canView);
  console.log("canEdit", canEdit);
  console.log("canDelete", canDelete);
  console.log("canExport", canExport);

  // Get leaves data based on selected leave type
  const getLeavesData = (leaveType: string): TermsData => {
    const leavesMap: Record<string, TermsData> = {
      "Greenwood Apartments": initialData,
      "Lakeside Villa": initialData,
      "Downtown Office Space": initialData,
    };

    return leavesMap[leaveType] || initialData;
  };

  const [leavesData, setLeavesData] = useState<TermsData>(
    getLeavesData(selectedLeaveType)
  );

  const inputRef = useRef<HTMLInputElement>(null);

  // Update leaves data when selection changes
  useEffect(() => {
    setLeavesData(getLeavesData(selectedLeaveType));
  }, [selectedLeaveType]);

  // Focus input when dropdown opens
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    console.log("isViewPage", isViewPage);
  }, []);

  const handlePrintLeaves = (leavesData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Rental Request Details",
        data: [leavesData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          propertyName: "Property Name",
          customer: "Customer",
          requestNumber: "Request Number",
          inspectionDate: "Inspection Date",
          leaseStartDate: "Lease Start Date",
          term: "Term",
          endDate: "End Date",
          dateCreated: "Date Created",
          propertyPrice: "Property Price",
          contractAmount: "Contract Amount",
          clientNote: "Client Note",
          adminNote: "Admin Note",

          isDefault: "Default Leave",
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
      console.log("pdf click", leavesData);
      const blob = await pdf(
        <GenericPDF
          data={[leavesData]}
          title="Rental Request Details"
          subtitle="Rental Request Information"
        />
      ).toBlob();

      console.log("blob", blob);

      const url = URL.createObjectURL(blob);
      console.log("url", url);
      const a = document.createElement("a");
      a.href = url;
      a.download = "rental-request-details.pdf";
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
        title="Viewing Rental Request"
        videoSrc={video}
        videoHeader="Tutorial video"
        onListClick={() => navigate("/rental-requests")}
        listText="List"
        listPath="rental-requests"
        activePage="view"
        popoverOptions={[
          {
            label: "Create",
            icon: <Plus className="w-5 h-5 text-green-600" />,
            onClick: () => navigate("/rental-requests/create"),
          },
          {
            label: "Edit",
            icon: <Edit className="w-5 h-5 text-blue-600" />,
            onClick: () => navigate("/rental-requests/edit/1"),
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
                  handlePrintLeaves(leavesData);
                }
              }
            : undefined
        }
      >
        <div dir={isRTL ? "rtl" : "ltr"}>
          {/* Row 1: Leave Types, Notes */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            {permissionsFieldLevel.propertyName && (
              <div className="mt-1">
                <Autocomplete
                  options={projectTypeOptions}
                  value={selectedLeaveType}
                  onValueChange={setSelectedLeaveType}
                  placeholder=" "
                  displayKey="propertyName"
                  valueKey="propertyName"
                  searchKey="propertyName"
                  disabled={false}
                  className="w-[96%] bg-gray-100 rounded-xl"
                  labelClassName="bg-gray-50 rounded-2xl"
                  labelText="Property Name"
                  inputClassName="border-none bg-stone-50 focus-visible:ring-offset-0 focus-visible:ring-0 focus-visible:border-2! focus-visible:border-blue-500"
                />
              </div>
            )}
            {permissionsFieldLevel.customer && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Customer</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(leavesData.customer)}
                </div>
              </div>
            )}
            {permissionsFieldLevel.requestNumber && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">
                  Request Number
                </h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(leavesData.requestNumber)}
                </div>
              </div>
            )}
            {permissionsFieldLevel.leaseStartDate && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">
                  Lease Start Date
                </h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(leavesData.leaseStartDate)}
                </div>
              </div>
            )}
            {permissionsFieldLevel.endDate && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">End Date</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(leavesData.endDate)}
                </div>
              </div>
            )}
            {permissionsFieldLevel.term && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Term</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(leavesData.term)}
                </div>
              </div>
            )}
            {permissionsFieldLevel.propertyPrice && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">
                  Property Price
                </h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(leavesData.propertyPrice)}
                </div>
              </div>
            )}
            {permissionsFieldLevel.contractAmount && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">
                  Contract Amount
                </h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(leavesData.contractAmount)}
                </div>
              </div>
            )}
            {permissionsFieldLevel.clientNote && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Client Note</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(leavesData.clientNote)}
                </div>
              </div>
            )}
            {permissionsFieldLevel.adminNote && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Admin Note</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(leavesData.adminNote)}
                </div>
              </div>
            )}

            {permissionsFieldLevel.isActive && (
              <div className="flex flex-col">
                <div className="">
                  <span className="text-[15px] text-gray-600">Active</span>
                </div>
                <div className="">
                  {leavesData.isActive ? (
                    <span className="font-bold text-[15px]">Yes</span>
                  ) : (
                    <span className="font-bold text-[15px]">No</span>
                  )}
                </div>
              </div>
            )}
            {permissionsFieldLevel.isDraft && (
              <div className="flex flex-col">
                <div className="">
                  <span className="text-[15px] text-gray-600">Draft</span>
                </div>
                <div className="">
                  {leavesData.isDraft ? (
                    <span className="text-orange-600 font-bold text-[15px]">
                      Yes
                    </span>
                  ) : (
                    <span className="text-black font-bold text-[15px]">No</span>
                  )}
                </div>
              </div>
            )}
            {permissionsFieldLevel.isDeleted && (
              <div className="flex flex-col">
                <div className="">
                  <span className="text-[15px] text-gray-600">Deleted</span>
                </div>
                <div className="">
                  {leavesData.isDeleted ? (
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
          created: getRelativeTime(leavesData.createdAt),
          updated: getRelativeTime(leavesData.updatedAt),
          drafted: getRelativeTime(leavesData.draftedAt),
          deleted: getRelativeTime(leavesData.deletedAt),
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
