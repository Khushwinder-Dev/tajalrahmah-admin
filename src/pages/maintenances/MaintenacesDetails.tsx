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

type MaintenanceData = {
  vehicle: string;
  garage: string;
  maintenanceType: string;
  serviceName: string;
  startDate: string;
  completionDate: string;
  parts: string;
  cost: number;
  description: string;
  isActive: boolean;
  isDraft: boolean;
  createdAt: Date | null;
  draftedAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;
  isDeleted: boolean;
};

const initialData: MaintenanceData = {
  vehicle: "Toyota Camry 2023",
  garage: "Al-Rashid Auto Service",
  maintenanceType: "Preventive",
  serviceName: "Oil Change & Filter",
  startDate: "2024-02-15",
  completionDate: "2024-02-15",
  parts: "Oil Filter, Engine Oil",
  cost: 150.0,
  description: "Regular oil change and filter replacement",
  isActive: true,
  isDraft: false,
  createdAt: new Date(),
  draftedAt: null,
  updatedAt: new Date(),
  deletedAt: null,
  isDeleted: false,
};

// Maintenance Type options for autocomplete
const maintenanceTypeOptions = ["Preventive", "Repair", "Inspection"];

// Vehicle options for autocomplete
const vehicleOptions = [
  "Toyota Camry 2023",
  "Ford Transit Van",
  "Honda Civic 2022",
  "Mercedes Sprinter",
  "Nissan Patrol",
  "Toyota Hilux",
  "Ford Ranger",
  "Chevrolet Silverado",
  "Volkswagen Golf",
  "Hyundai Tucson",
  "BMW X5",
  "Audi A6",
  "Toyota Corolla 2024",
  "Ford F-150",
  "Honda CR-V",
  "Mercedes C-Class",
  "Nissan Altima",
  "Ford Escape",
  "Chevrolet Malibu",
  "Volkswagen Passat",
];

// Garage options for autocomplete
const garageOptions = [
  "Al-Rashid Auto Service",
  "Quick Fix Garage",
  "Premium Auto Care",
  "Luxury Auto Service",
  "Desert Auto Works",
  "Off-Road Specialists",
  "City Auto Service",
  "American Auto Care",
  "European Auto Service",
  "Korean Auto Care",
  "Premium German Auto",
  "Luxury European Auto",
  "Truck Specialists",
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

export default function MaintenanceDetailsPage() {
  const navigate = useNavigate();
  const { isRTL } = useSelector((state: RootState) => state.language);

  const [keepChanges, setKeepChanges] = useState(false);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [selectedMaintenanceType, setSelectedMaintenanceType] =
    useState("Preventive");
  const [selectedVehicle, setSelectedVehicle] = useState("Toyota Camry 2023");
  const [selectedGarage, setSelectedGarage] = useState(
    "Al-Rashid Auto Service"
  );
  const location = useLocation();
  const isViewPage = location.pathname.includes("/view");
  const [pdfChecked, setPdfChecked] = useState(false);
  const [printEnabled, setPrintEnabled] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  // get permission
  const canCreate: boolean = usePermission("maintenance", "create");
  const canView: boolean = usePermission("maintenance", "view");
  const canEdit: boolean = usePermission("maintenance", "edit");
  const canDelete: boolean = usePermission("maintenance", "delete");
  const canExport: boolean = usePermission("maintenance", "export");
  const canPdf: boolean = usePermission("maintenance", "pdf");
  const canPrint: boolean = usePermission("maintenance", "print");
  const canSeeHistory: boolean = usePermission("maintenance", "history");

  // Field-level permissions
  const canViewVehicle: boolean = usePermission(
    "maintenance",
    "view",
    "vehicle"
  );
  const canViewGarage: boolean = usePermission("maintenance", "view", "garage");
  const canViewMaintenanceType: boolean = usePermission(
    "maintenance",
    "view",
    "maintenanceType"
  );
  const canViewServiceName: boolean = usePermission(
    "maintenance",
    "view",
    "serviceName"
  );
  const canViewStartDate: boolean = usePermission(
    "maintenance",
    "view",
    "startDate"
  );
  const canViewCompletionDate: boolean = usePermission(
    "maintenance",
    "view",
    "completionDate"
  );
  const canViewParts: boolean = usePermission("maintenance", "view", "parts");
  const canViewCost: boolean = usePermission("maintenance", "view", "cost");
  const canViewDescription: boolean = usePermission(
    "maintenance",
    "view",
    "description"
  );
  const canViewIsActive: boolean = usePermission(
    "maintenance",
    "view",
    "isActive"
  );
  const canViewIsDraft: boolean = usePermission(
    "maintenance",
    "view",
    "isDraft"
  );
  const canViewIsDeleted: boolean = usePermission(
    "maintenance",
    "view",
    "isDeleted"
  );

  console.log("canCreate", canCreate);
  console.log("canView", canView);
  console.log("canEdit", canEdit);
  console.log("canDelete", canDelete);
  console.log("canExport", canExport);

  // Get maintenance data based on selected maintenance type
  const getMaintenanceData = (maintenanceType: string): MaintenanceData => {
    const maintenanceMap: Record<string, MaintenanceData> = {
      Preventive: {
        vehicle: "Toyota Camry 2023",
        garage: "Al-Rashid Auto Service",
        maintenanceType: "Preventive",
        serviceName: "Oil Change & Filter",
        startDate: "2024-02-15",
        completionDate: "2024-02-15",
        parts: "Oil Filter, Engine Oil",
        cost: 150.0,
        description: "Regular oil change and filter replacement",
        isActive: true,
        isDraft: false,
        createdAt: new Date("2024-01-15T10:30:00Z"),
        draftedAt: null,
        updatedAt: new Date("2024-01-20T14:45:00Z"),
        deletedAt: null,
        isDeleted: false,
      },
      Repair: {
        vehicle: "Ford Transit Van",
        garage: "Quick Fix Garage",
        maintenanceType: "Repair",
        serviceName: "Brake System Repair",
        startDate: "2024-02-10",
        completionDate: "2024-02-12",
        parts: "Brake Pads, Brake Fluid",
        cost: 450.0,
        description: "Complete brake system overhaul",
        isActive: true,
        isDraft: false,
        createdAt: new Date("2024-01-16T09:15:00Z"),
        draftedAt: null,
        updatedAt: new Date("2024-01-21T11:30:00Z"),
        deletedAt: null,
        isDeleted: false,
      },
    };

    return maintenanceMap[maintenanceType] || initialData;
  };

  const [maintenanceData, setMaintenanceData] = useState<MaintenanceData>(
    getMaintenanceData(selectedMaintenanceType)
  );

  const inputRef = useRef<HTMLInputElement>(null);

  // Update maintenance data when selection changes
  useEffect(() => {
    const newMaintenanceData = getMaintenanceData(selectedMaintenanceType);
    setMaintenanceData(newMaintenanceData);
    setSelectedVehicle(newMaintenanceData.vehicle);
    setSelectedGarage(newMaintenanceData.garage);
  }, [selectedMaintenanceType]);

  // Handle Garage change
  const handleGarageChange = (value: string) => {
    setSelectedGarage(value);
  };

  // Focus input when dropdown opens
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    console.log("isViewPage", isViewPage);
  }, []);

  const handlePrintMaintenance = (maintenanceData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Maintenance Details",
        data: [maintenanceData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          vehicle: "Vehicle",
          garage: "Garage",
          maintenanceType: "Maintenance Type",
          serviceName: "Service Name",
          startDate: "Start Date",
          completionDate: "Completion Date",
          parts: "Parts",
          cost: "Cost",
          description: "Description",
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
      console.log("maintenanceData on pdf click", maintenanceData);
      const blob = await pdf(
        <GenericPDF
          data={[maintenanceData]}
          title="Maintenance Details"
          subtitle="Maintenance Information"
        />
      ).toBlob();

      console.log("blob", blob);

      const url = URL.createObjectURL(blob);
      console.log("url", url);
      const a = document.createElement("a");
      a.href = url;
      a.download = "maintenance-details.pdf";
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
        title="Viewing Maintenance"
        videoSrc={video}
        videoHeader="Tutorial video"
        onListClick={() => navigate("/maintenances")}
        listText="List"
        listPath="maintenances"
        activePage="view"
        popoverOptions={[
          {
            label: "Create",
            icon: <Plus className="w-5 h-5 text-green-600" />,
            onClick: () => navigate("/maintenances/create"),
          },
          {
            label: "Edit",
            icon: <Edit className="w-5 h-5 text-blue-600" />,
            onClick: () => navigate("/maintenances/edit/1"),
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
                  handlePrintMaintenance(maintenanceData);
                }
              }
            : undefined
        }
      >
        <div dir={isRTL ? "rtl" : "ltr"}>
          {/* Row 1: Vehicle, Garage, Maintenance Type, Service Name */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            {canViewVehicle && (
              <div className="mt-1">
                <Autocomplete
                  options={vehicleOptions}
                  value={selectedVehicle}
                  onValueChange={setSelectedVehicle}
                  placeholder="Select Vehicle..."
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

            {canViewGarage && (
              <div className="mt-1">
                <Autocomplete
                  options={garageOptions}
                  value={selectedGarage}
                  onValueChange={handleGarageChange}
                  placeholder="Select Garage..."
                  displayKey="garage"
                  valueKey="garage"
                  searchKey="garage"
                  disabled={false}
                  className="w-[96%] bg-gray-100 rounded-xl"
                  labelClassName="bg-gray-50 rounded-2xl"
                  labelText="Garage"
                  inputClassName="border-none bg-stone-50 focus-visible:ring-offset-0 focus-visible:ring-0 focus-visible:border-2! focus-visible:border-blue-500"
                />
              </div>
            )}

            {canViewMaintenanceType && (
              <div className="mt-1">
                <Autocomplete
                  options={maintenanceTypeOptions}
                  value={selectedMaintenanceType}
                  onValueChange={setSelectedMaintenanceType}
                  placeholder="Select Maintenance Type..."
                  displayKey="maintenanceType"
                  valueKey="maintenanceType"
                  searchKey="maintenanceType"
                  disabled={false}
                  className="w-[96%] bg-gray-100 rounded-xl"
                  labelClassName="bg-gray-50 rounded-2xl"
                  labelText="Maintenance Type"
                  inputClassName="border-none bg-stone-50 focus-visible:ring-offset-0 focus-visible:ring-0 focus-visible:border-2! focus-visible:border-blue-500"
                />
              </div>
            )}

            {canViewServiceName && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Service Name</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(maintenanceData.serviceName)}
                </div>
              </div>
            )}
          </div>

          {/* Row 2: Start Date, Completion Date, Parts, Cost */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
            {canViewStartDate && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Start Date</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(maintenanceData.startDate)}
                </div>
              </div>
            )}

            {canViewCompletionDate && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">
                  Completion Date
                </h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(maintenanceData.completionDate)}
                </div>
              </div>
            )}

            {canViewParts && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Parts</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(maintenanceData.parts)}
                </div>
              </div>
            )}

            {canViewCost && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Cost</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(maintenanceData.cost)}
                </div>
              </div>
            )}
          </div>

          {/* Row 3: Description and Status fields */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
            {canViewDescription && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Description</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(maintenanceData.description)}
                </div>
              </div>
            )}

            {canViewIsActive && (
              <div className="flex flex-col">
                <div className="">
                  <span className="text-[15px] text-gray-600">Active</span>
                </div>
                <div className="">
                  {maintenanceData.isActive ? (
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
                  {maintenanceData.isDraft ? (
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
                  {maintenanceData.isDeleted ? (
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
          created: getRelativeTime(maintenanceData.createdAt),
          updated: getRelativeTime(maintenanceData.updatedAt),
          drafted: getRelativeTime(maintenanceData.draftedAt),
          deleted: getRelativeTime(maintenanceData.deletedAt),
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
