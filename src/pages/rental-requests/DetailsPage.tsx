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
  name: string;
  partsType: string;
  brand: string;
  model: string;
  serialNumber: string;
  linkedVehicle: string;
  currentAssignee: string;
  partGroup: string;
  status: string;
  purchaseVendor: string;
  purchaseDate: string;
  warrantyDate: string;
  comments: string;
  serviceDate: string;
  serviceMonths: string;
  resaleValue: string;
  outOfDate: string;

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
  name: "Engine Oil Filter",
  partsType: "Filter",
  brand: "Bosch",
  model: "OF-2201",
  serialNumber: "SN-1001",
  linkedVehicle: "Toyota Corolla 2018",
  currentAssignee: "Workshop A",
  partGroup: "Engine",
  status: "Active",
  purchaseVendor: "AutoMart",
  purchaseDate: "2024-01-15",
  warrantyDate: "2025-01-15",
  comments: "Regular replacement",
  serviceDate: "2024-08-01",
  serviceMonths: "12",
  resaleValue: "15",
  outOfDate: "2025-02-01",

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
  "Engine Oil Filter",
  "Engine Oil",
  "Air Filter",
  "Fuel Filter",
  "Oil Filter",
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
  const [selectedLeaveType, setSelectedLeaveType] =
    useState("Engine Oil Filter");
  const location = useLocation();
  const isViewPage = location.pathname.includes("/view");
  const [pdfChecked, setPdfChecked] = useState(false);
  const [printEnabled, setPrintEnabled] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  // get permission
  const canCreate: boolean = usePermission("parts", "create");
  const canView: boolean = usePermission("parts", "view");
  const canEdit: boolean = usePermission("parts", "edit");
  const canDelete: boolean = usePermission("parts", "delete");
  const canExport: boolean = usePermission("parts", "export");
  const canPdf: boolean = usePermission("parts", "pdf");
  const canPrint: boolean = usePermission("parts", "print");
  const canSeeHistory: boolean = usePermission("parts", "history");

  // Field-level permissions

  const name: boolean = usePermission("parts", "create", "name");
  const partsType: boolean = usePermission("parts", "create", "partsType");
  const brand: boolean = usePermission("parts", "create", "brand");
  const model: boolean = usePermission("parts", "create", "model");
  const serialNumber: boolean = usePermission("parts", "view", "serialNumber");
  const linkedVehicle: boolean = usePermission(
    "parts",
    "view",
    "linkedVehicle"
  );
  const currentAssignee: boolean = usePermission(
    "parts",
    "view",
    "currentAssignee"
  );
  const partGroup: boolean = usePermission("parts", "view", "partGroup");

  const purchaseVendor: boolean = usePermission(
    "parts",
    "view",
    "purchaseVendor"
  );
  const purchaseDate: boolean = usePermission("parts", "view", "purchaseDate");
  const warrantyDate: boolean = usePermission("parts", "view", "warrantyDate");
  const comments: boolean = usePermission("parts", "view", "comments");
  const serviceDate: boolean = usePermission("parts", "view", "serviceDate");
  const serviceMonths: boolean = usePermission(
    "parts",
    "view",
    "serviceMonths"
  );
  const resaleValue: boolean = usePermission("parts", "view", "resaleValue");
  const outOfDate: boolean = usePermission("parts", "view", "outOfDate");

  const canViewIsActive: boolean = usePermission("parts", "view", "isActive");
  const canViewIsDraft: boolean = usePermission("parts", "view", "isDraft");
  const canViewIsDeleted: boolean = usePermission("parts", "view", "isDeleted");

  console.log("canCreate", canCreate);
  console.log("canView", canView);
  console.log("canEdit", canEdit);
  console.log("canDelete", canDelete);
  console.log("canExport", canExport);

  // Get leaves data based on selected leave type
  const getLeavesData = (leaveType: string): TermsData => {
    const leavesMap: Record<string, TermsData> = {
      "Engine Oil Filter": initialData,
      "Engine Oil": initialData,
      "Air Filter": initialData,
      "Fuel Filter": initialData,
      "Oil Filter": initialData,
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
        title: "Parts Details",
        data: [leavesData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          name: "Name",
          partsType: "Parts Type",
          brand: "Brand",
          model: "Model",
          serialNumber: "Serial Number",
          linkedVehicle: "Linked Vehicle",
          currentAssignee: "Current Assignee",
          partGroup: "Part Group",
          status: "Status",
          purchaseVendor: "Purchase Vendor",
          purchaseDate: "Purchase Date",
          warrantyDate: "Warranty Date",
          comments: "Comments",
          serviceDate: "Service Date",
          serviceMonths: "Service Months",
          resaleValue: "Resale Value",
          outOfDate: "Out of Date",
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
          title="Parts Details"
          subtitle="Parts Information"
        />
      ).toBlob();

      console.log("blob", blob);

      const url = URL.createObjectURL(blob);
      console.log("url", url);
      const a = document.createElement("a");
      a.href = url;
      a.download = "parts-details.pdf";
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
        title="Viewing Parts"
        videoSrc={video}
        videoHeader="Tutorial video"
        onListClick={() => navigate("/parts")}
        listText="List"
        listPath="parts"
        activePage="view"
        popoverOptions={[
          {
            label: "Create",
            icon: <Plus className="w-5 h-5 text-green-600" />,
            onClick: () => navigate("/parts/create"),
          },
          {
            label: "Edit",
            icon: <Edit className="w-5 h-5 text-blue-600" />,
            onClick: () => navigate("/parts/edit/1"),
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
            {name && (
              <div className="mt-1">
                <Autocomplete
                  options={projectTypeOptions}
                  value={selectedLeaveType}
                  onValueChange={setSelectedLeaveType}
                  placeholder=" "
                  displayKey="name"
                  valueKey="name"
                  searchKey="name"
                  disabled={false}
                  className="w-[96%] bg-gray-100 rounded-xl"
                  labelClassName="bg-gray-50 rounded-2xl"
                  labelText="Name"
                  inputClassName="border-none bg-stone-50 focus-visible:ring-offset-0 focus-visible:ring-0 focus-visible:border-2! focus-visible:border-blue-500"
                />
              </div>
            )}
            {partsType && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Parts Type</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(leavesData.partsType)}
                </div>
              </div>
            )}
            {brand && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Brand</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(leavesData.brand)}
                </div>
              </div>
            )}
            {model && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Model</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(leavesData.model)}
                </div>
              </div>
            )}
            {serialNumber && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">
                  Serial Number
                </h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(leavesData.serialNumber)}
                </div>
              </div>
            )}
            {linkedVehicle && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">
                  Linked Vehicle
                </h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(leavesData.linkedVehicle)}
                </div>
              </div>
            )}
            {currentAssignee && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">
                  Current Assignee
                </h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(leavesData.currentAssignee)}
                </div>
              </div>
            )}
            {partGroup && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Part Group</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(leavesData.partGroup)}
                </div>
              </div>
            )}
            {purchaseVendor && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">
                  Purchase Vendor
                </h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(leavesData.purchaseVendor)}
                </div>
              </div>
            )}
            {purchaseDate && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">
                  Purchase Date
                </h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(leavesData.purchaseDate)}
                </div>
              </div>
            )}
            {warrantyDate && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">
                  Warranty Date
                </h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(leavesData.warrantyDate)}
                </div>
              </div>
            )}
            {comments && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Comments</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(leavesData.comments)}
                </div>
              </div>
            )}

            {serviceDate && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Service Date</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(leavesData.serviceDate)}
                </div>
              </div>
            )}
            {serviceMonths && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">
                  Service Months
                </h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(leavesData.serviceMonths)}
                </div>
              </div>
            )}

            {resaleValue && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Resale Value</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(leavesData.resaleValue)}
                </div>
              </div>
            )}

            {outOfDate && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Out of Date</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(leavesData.outOfDate)}
                </div>
              </div>
            )}

            {canViewIsActive && (
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
            {canViewIsDraft && (
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
            {canViewIsDeleted && (
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
