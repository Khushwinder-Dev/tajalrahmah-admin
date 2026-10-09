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
  vehicle: string;
  vin: string;
  licensePlate: string;
  vehicleType: string;
  year: string;
  make: string;
  model: string;
  trim: string;
  registration: string;
  vehicleGroup: string;
  ownership: string;
  color: string;
  bodyType: string;
  subBodyType: string;
  msrp: string;

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
  vehicle: "Toyota Corolla",
  vin: "1HGCM82633A123456",
  licensePlate: "DHA-1234",
  vehicleType: "Sedan",
  year: "2022",
  make: "Toyota",
  model: "Corolla",
  trim: "XLE",
  registration: "REG123456",
  vehicleGroup: "Passenger",
  ownership: "Owned",
  color: "White",
  bodyType: "Compact",
  subBodyType: "SUV",
  msrp: "25000",

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
  "Toyota Corolla",
  "Honda",
  "Ford",
  "Chevrolet",
  "Dodge",
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

export default function VehiclesDetails() {
  const navigate = useNavigate();
  const { isRTL } = useSelector((state: RootState) => state.language);

  const [keepChanges, setKeepChanges] = useState(false);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [selectedLeaveType, setSelectedLeaveType] = useState("Toyota Corolla");
  const location = useLocation();
  const isViewPage = location.pathname.includes("/view");
  const [pdfChecked, setPdfChecked] = useState(false);
  const [printEnabled, setPrintEnabled] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  // get permission
  const canCreate: boolean = usePermission("vehicles", "create");
  const canView: boolean = usePermission("vehicles", "view");
  const canEdit: boolean = usePermission("vehicles", "edit");
  const canDelete: boolean = usePermission("vehicles", "delete");
  const canExport: boolean = usePermission("vehicles", "export");
  const canPdf: boolean = usePermission("vehicles", "pdf");
  const canPrint: boolean = usePermission("vehicles", "print");
  const canSeeHistory: boolean = usePermission("vehicles", "history");

  // Field-level permissions

  const vehicle: boolean = usePermission("vehicles", "view", "vehicle");
  const vin: boolean = usePermission("vehicles", "view", "vin");
  const licensePlate: boolean = usePermission(
    "vehicles",
    "view",
    "licensePlate"
  );
  const vehicleType: boolean = usePermission("vehicles", "view", "vehicleType");
  const year: boolean = usePermission("vehicles", "view", "year");
  const make: boolean = usePermission("vehicles", "view", "make");
  const model: boolean = usePermission("vehicles", "view", "model");
  const trim: boolean = usePermission("vehicles", "view", "trim");
  const registration: boolean = usePermission(
    "vehicles",
    "view",
    "registration"
  );
  const vehicleGroup: boolean = usePermission(
    "vehicles",
    "view",
    "vehicleGroup"
  );
  const ownership: boolean = usePermission("vehicles", "view", "ownership");
  const color: boolean = usePermission("vehicles", "view", "color");
  const bodyType: boolean = usePermission("vehicles", "view", "bodyType");
  const subBodyType: boolean = usePermission("vehicles", "view", "subBodyType");
  const msrp: boolean = usePermission("vehicles", "view", "msrp");

  const canViewIsActive: boolean = usePermission(
    "vehicles",
    "view",
    "isActive"
  );
  const canViewIsDraft: boolean = usePermission("vehicles", "view", "isDraft");
  const canViewIsDeleted: boolean = usePermission(
    "vehicles",
    "view",
    "isDeleted"
  );

  console.log("canCreate", canCreate);
  console.log("canView", canView);
  console.log("canEdit", canEdit);
  console.log("canDelete", canDelete);
  console.log("canExport", canExport);

  // Get leaves data based on selected leave type
  const getLeavesData = (leaveType: string): TermsData => {
    const leavesMap: Record<string, TermsData> = {
      "Toyota Corolla": initialData,
      Honda: initialData,
      Ford: initialData,
      Chevrolet: initialData,
      Dodge: initialData,
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
        title: "Vehicle Details",
        data: [leavesData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          vehicle: "Vehicle",
          vin: "VIN",
          licensePlate: "License Plate",
          vehicleType: "Vehicle Type",
          year: "Year",
          make: "Make",
          model: "Model",
          trim: "Trim",
          registration: "Registration",
          vehicleGroup: "Vehicle Group",
          ownership: "Ownership",
          color: "Color",
          bodyType: "Body Type",
          msrp: "MSRP",
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
          title="Vehicle Details"
          subtitle="Vehicle Information"
        />
      ).toBlob();

      console.log("blob", blob);

      const url = URL.createObjectURL(blob);
      console.log("url", url);
      const a = document.createElement("a");
      a.href = url;
      a.download = "vehicle-details.pdf";
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
        title="Viewing Vehicle"
        videoSrc={video}
        videoHeader="Tutorial video"
        onListClick={() => navigate("/vehicles")}
        listText="List"
        listPath="vehicles"
        activePage="view"
        popoverOptions={[
          {
            label: "Create",
            icon: <Plus className="w-5 h-5 text-green-600" />,
            onClick: () => navigate("/vehicles/create"),
          },
          {
            label: "Edit",
            icon: <Edit className="w-5 h-5 text-blue-600" />,
            onClick: () => navigate("/vehicles/edit/1"),
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
            {vehicle && (
              <div className="mt-1">
                <Autocomplete
                  options={projectTypeOptions}
                  value={selectedLeaveType}
                  onValueChange={setSelectedLeaveType}
                  placeholder=" "
                  displayKey="vehicle"
                  valueKey="vehicle"
                  searchKey="vehicle"
                  disabled={false}
                  className="w-[96%] bg-gray-100 rounded-xl"
                  labelClassName="bg-gray-50 rounded-2xl"
                  labelText="Vehicle"
                  inputClassName="border-none bg-stone-50 focus-visible:ring-offset-0 focus-visible:ring-0 focus-visible:border-2! focus-visible:border-blue-500"
                />
              </div>
            )}
            {vin && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">VIN</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(leavesData.vin)}
                </div>
              </div>
            )}
            {licensePlate && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">
                  License Plate
                </h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(leavesData.licensePlate)}
                </div>
              </div>
            )}
            {vehicleType && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Vehicle Type</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(leavesData.vehicleType)}
                </div>
              </div>
            )}
            {year && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Year</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(leavesData.year)}
                </div>
              </div>
            )}
            {make && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Make</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(leavesData.make)}
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
            {trim && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Trim</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(leavesData.trim)}
                </div>
              </div>
            )}
            {registration && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Registration</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(leavesData.registration)}
                </div>
              </div>
            )}
            {vehicleGroup && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">
                  Vehicle Group
                </h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(leavesData.vehicleGroup)}
                </div>
              </div>
            )}
            {ownership && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Ownership</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(leavesData.ownership)}
                </div>
              </div>
            )}
            {color && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Color</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(leavesData.color)}
                </div>
              </div>
            )}
            {bodyType && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Body Type</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(leavesData.bodyType)}
                </div>
              </div>
            )}
            {subBodyType && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">
                  Sub Body Type
                </h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(leavesData.subBodyType)}
                </div>
              </div>
            )}
            {msrp && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">MSRP</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(leavesData.msrp)}
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
