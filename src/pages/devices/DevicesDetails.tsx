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

type DeviceData = {
  deviceCode: string;
  name: string;
  serialNo: string;
  customer: string;
  model: string;
  productionDate: string;
  purchaseDate: string;
  warrantyStartingDate: string;
  warrantyPeriodMonths: number;
  warrantyExpiryDate: string;
  warrantyExpiringAlert: boolean;
  description: string;
  image: File | null;
  isActive: boolean;
  isDraft: boolean;
  createdAt: Date | null;
  draftedAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;
  isDeleted: boolean;
};

const initialData: DeviceData = {
  deviceCode: "DEV001",
  name: "HP LaserJet Pro",
  serialNo: "HP123456789",
  customer: "ABC Corporation",
  model: "M404dn",
  productionDate: "2023-01-15",
  purchaseDate: "2023-02-01",
  warrantyStartingDate: "2023-02-01",
  warrantyPeriodMonths: 24,
  warrantyExpiryDate: "2025-02-01",
  warrantyExpiringAlert: true,
  description: "High-performance laser printer for office use",
  image: null,
  isActive: true,
  isDraft: false,
  createdAt: new Date(),
  draftedAt: null,
  updatedAt: new Date(),
  deletedAt: null,
  isDeleted: false,
};

// Customer options for autocomplete
const customerOptions = [
  "ABC Corporation",
  "XYZ Solutions",
  "Tech Innovations Ltd",
  "Creative Agency",
  "Consulting Group",
  "Marketing Solutions",
  "Design Studio",
  "Consulting Firm",
  "Training Center",
  "IT Services Co",
];

// Model options for autocomplete
const modelOptions = [
  "M404dn",
  "7090 MT",
  "ISR 4331",
  "27CF391",
  "X1 Carbon",
  "imageRUNNER 2630i",
  "24-inch M1",
  "Surface Pro 9",
  "PowerLite 2247U",
  "GS724T",
];

// Device Code options for autocomplete
const deviceCodeOptions = [
  "DEV001",
  "DEV002",
  "DEV003",
  "DEV004",
  "DEV005",
  "DEV006",
  "DEV007",
  "DEV008",
  "DEV009",
  "DEV010",
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

export default function DevicesDetailsPage() {
  const navigate = useNavigate();
  const { isRTL } = useSelector((state: RootState) => state.language);

  const [keepChanges, setKeepChanges] = useState(false);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState("ABC Corporation");
  const [selectedModel, setSelectedModel] = useState("M404dn");
  const [selectedDeviceCode, setSelectedDeviceCode] = useState("DEV001");
  const location = useLocation();
  const isViewPage = location.pathname.includes("/view");
  const [pdfChecked, setPdfChecked] = useState(false);
  const [printEnabled, setPrintEnabled] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  // get permission
  const canCreate: boolean = usePermission("devices", "create");
  const canView: boolean = usePermission("devices", "view");
  const canEdit: boolean = usePermission("devices", "edit");
  const canDelete: boolean = usePermission("devices", "delete");
  const canExport: boolean = usePermission("devices", "export");
  const canPdf: boolean = usePermission("devices", "pdf");
  const canPrint: boolean = usePermission("devices", "print");
  const canSeeHistory: boolean = usePermission("devices", "history");

  // Field-level permissions
  const canViewDeviceCode: boolean = usePermission(
    "devices",
    "view",
    "deviceCode"
  );
  const canViewName: boolean = usePermission("devices", "view", "name");
  const canViewSerialNo: boolean = usePermission("devices", "view", "serialNo");
  const canViewCustomer: boolean = usePermission("devices", "view", "customer");
  const canViewModel: boolean = usePermission("devices", "view", "model");
  const canViewProductionDate: boolean = usePermission(
    "devices",
    "view",
    "productionDate"
  );
  const canViewPurchaseDate: boolean = usePermission(
    "devices",
    "view",
    "purchaseDate"
  );
  const canViewWarrantyStartingDate: boolean = usePermission(
    "devices",
    "view",
    "warrantyStartingDate"
  );
  const canViewWarrantyPeriodMonths: boolean = usePermission(
    "devices",
    "view",
    "warrantyPeriodMonths"
  );
  const canViewWarrantyExpiryDate: boolean = usePermission(
    "devices",
    "view",
    "warrantyExpiryDate"
  );
  const canViewWarrantyExpiringAlert: boolean = usePermission(
    "devices",
    "view",
    "warrantyExpiringAlert"
  );
  const canViewDescription: boolean = usePermission(
    "devices",
    "view",
    "description"
  );
  const canViewImage: boolean = usePermission("devices", "view", "image");
  const canViewIsActive: boolean = usePermission("devices", "view", "isActive");
  const canViewIsDraft: boolean = usePermission("devices", "view", "isDraft");
  const canViewIsDeleted: boolean = usePermission(
    "devices",
    "view",
    "isDeleted"
  );

  console.log("canCreate", canCreate);
  console.log("canView", canView);
  console.log("canEdit", canEdit);
  console.log("canDelete", canDelete);
  console.log("canExport", canExport);

  // Get device data based on selected device code
  const getDeviceData = (deviceCode: string): DeviceData => {
    const deviceMap: Record<string, DeviceData> = {
      DEV001: {
        deviceCode: "DEV001",
        name: "HP LaserJet Pro",
        serialNo: "HP123456789",
        customer: "ABC Corporation",
        model: "M404dn",
        productionDate: "2023-01-15",
        purchaseDate: "2023-02-01",
        warrantyStartingDate: "2023-02-01",
        warrantyPeriodMonths: 24,
        warrantyExpiryDate: "2025-02-01",
        warrantyExpiringAlert: true,
        description: "High-performance laser printer for office use",
        image: null,
        isActive: true,
        isDraft: false,
        createdAt: new Date("2024-01-15T10:30:00Z"),
        draftedAt: null,
        updatedAt: new Date("2024-01-20T14:45:00Z"),
        deletedAt: null,
        isDeleted: false,
      },
      DEV002: {
        deviceCode: "DEV002",
        name: "Dell OptiPlex",
        serialNo: "DELL987654321",
        customer: "XYZ Solutions",
        model: "7090 MT",
        productionDate: "2023-03-10",
        purchaseDate: "2023-04-01",
        warrantyStartingDate: "2023-04-01",
        warrantyPeriodMonths: 36,
        warrantyExpiryDate: "2026-04-01",
        warrantyExpiringAlert: false,
        description: "Desktop computer for general office work",
        image: null,
        isActive: true,
        isDraft: false,
        createdAt: new Date("2024-01-16T09:15:00Z"),
        draftedAt: null,
        updatedAt: new Date("2024-01-21T11:30:00Z"),
        deletedAt: null,
        isDeleted: false,
      },
      DEV003: {
        deviceCode: "DEV003",
        name: "Cisco Router",
        serialNo: "CISCO555666777",
        customer: "Tech Innovations Ltd",
        model: "ISR 4331",
        productionDate: "2023-05-20",
        purchaseDate: "2023-06-15",
        warrantyStartingDate: "2023-06-15",
        warrantyPeriodMonths: 12,
        warrantyExpiryDate: "2024-06-15",
        warrantyExpiringAlert: true,
        description: "Network router for enterprise connectivity",
        image: null,
        isActive: false,
        isDraft: false,
        createdAt: new Date("2024-01-17T16:20:00Z"),
        draftedAt: null,
        updatedAt: new Date("2024-01-22T13:45:00Z"),
        deletedAt: null,
        isDeleted: false,
      },
    };

    return deviceMap[deviceCode] || initialData;
  };

  const [deviceData, setDeviceData] = useState<DeviceData>(
    getDeviceData(selectedDeviceCode)
  );

  const inputRef = useRef<HTMLInputElement>(null);

  // Update device data when selection changes
  useEffect(() => {
    const newDeviceData = getDeviceData(selectedDeviceCode);
    setDeviceData(newDeviceData);
    setSelectedCustomer(newDeviceData.customer);
    setSelectedModel(newDeviceData.model);
  }, [selectedDeviceCode]);

  // Handle device code change
  const handleDeviceCodeChange = (value: string) => {
    setSelectedDeviceCode(value);
  };

  // Focus input when dropdown opens
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    console.log("isViewPage", isViewPage);
  }, []);

  const handlePrintDevice = (deviceData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Device Details",
        data: [deviceData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          deviceCode: "Device Code",
          name: "Device Name",
          serialNo: "Serial Number",
          customer: "Customer",
          model: "Model",
          productionDate: "Production Date",
          purchaseDate: "Purchase Date",
          warrantyStartingDate: "Warranty Start Date",
          warrantyPeriodMonths: "Warranty Period (Months)",
          warrantyExpiryDate: "Warranty Expiry Date",
          warrantyExpiringAlert: "Warranty Alert",
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
      console.log("deviceData on pdf click", deviceData);
      const blob = await pdf(
        <GenericPDF
          data={[deviceData]}
          title="Device Details"
          subtitle="Device Information"
        />
      ).toBlob();

      console.log("blob", blob);

      const url = URL.createObjectURL(blob);
      console.log("url", url);
      const a = document.createElement("a");
      a.href = url;
      a.download = "device-details.pdf";
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
        title="Viewing Device"
        videoSrc={video}
        videoHeader="Tutorial video"
        onListClick={() => navigate("/devices")}
        listText="List"
        listPath="devices"
        activePage="view"
        popoverOptions={[
          ...(canCreate
            ? [
                {
                  label: "Create",
                  icon: <Plus className="w-5 h-5 text-green-600" />,
                  onClick: () => navigate("/devices/create"),
                },
              ]
            : []),
          ...(canEdit
            ? [
                {
                  label: "Edit",
                  icon: <Edit className="w-5 h-5 text-blue-600" />,
                  onClick: () => navigate("/devices/edit/1"),
                },
              ]
            : []),
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
                  handlePrintDevice(deviceData);
                }
              }
            : undefined
        }
      >
        <div dir={isRTL ? "rtl" : "ltr"}>
          {/* Row 1: Device Code, Customer, Model */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            {canViewDeviceCode && (
              <div className="mt-1">
                <Autocomplete
                  options={deviceCodeOptions}
                  value={selectedDeviceCode}
                  onValueChange={handleDeviceCodeChange}
                  placeholder="Select device code..."
                  displayKey="deviceCode"
                  valueKey="deviceCode"
                  searchKey="deviceCode"
                  disabled={false}
                  className="w-[96%] bg-gray-100 rounded-xl"
                  labelClassName="bg-gray-50 rounded-2xl"
                  labelText="Device Code"
                  inputClassName="border-none bg-stone-50 focus-visible:ring-offset-0 focus-visible:ring-0 focus-visible:border-2! focus-visible:border-blue-500"
                />
              </div>
            )}

            {canViewCustomer && (
              <div className="mt-1">
                <Autocomplete
                  options={customerOptions}
                  value={selectedCustomer}
                  onValueChange={setSelectedCustomer}
                  placeholder="Select customer..."
                  displayKey="customer"
                  valueKey="customer"
                  searchKey="customer"
                  disabled={false}
                  className="w-[96%] bg-gray-100 rounded-xl"
                  labelClassName="bg-gray-50 rounded-2xl"
                  labelText="Customer"
                  inputClassName="border-none bg-stone-50 focus-visible:ring-offset-0 focus-visible:ring-0 focus-visible:border-2! focus-visible:border-blue-500"
                />
              </div>
            )}

            {canViewModel && (
              <div className="mt-1">
                <Autocomplete
                  options={modelOptions}
                  value={selectedModel}
                  onValueChange={setSelectedModel}
                  placeholder="Select model..."
                  displayKey="model"
                  valueKey="model"
                  searchKey="model"
                  disabled={false}
                  className="w-[96%] bg-gray-100 rounded-xl"
                  labelClassName="bg-gray-50 rounded-2xl"
                  labelText="Model"
                  inputClassName="border-none bg-stone-50 focus-visible:ring-offset-0 focus-visible:ring-0 focus-visible:border-2! focus-visible:border-blue-500"
                />
              </div>
            )}

            {canViewName && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Device Name</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(deviceData.name)}
                </div>
              </div>
            )}
          </div>

          {/* Row 2: Serial No, Production Date, Purchase Date, Warranty Start Date */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
            {canViewSerialNo && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">
                  Serial Number
                </h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(deviceData.serialNo)}
                </div>
              </div>
            )}

            {canViewProductionDate && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">
                  Production Date
                </h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(deviceData.productionDate)}
                </div>
              </div>
            )}

            {canViewPurchaseDate && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">
                  Purchase Date
                </h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(deviceData.purchaseDate)}
                </div>
              </div>
            )}

            {canViewWarrantyStartingDate && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">
                  Warranty Start Date
                </h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(deviceData.warrantyStartingDate)}
                </div>
              </div>
            )}
          </div>

          {/* Row 3: Warranty Period, Warranty Expiry, Description, Warranty Alert */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
            {canViewWarrantyPeriodMonths && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">
                  Warranty Period (Months)
                </h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(deviceData.warrantyPeriodMonths)}
                </div>
              </div>
            )}

            {canViewWarrantyExpiryDate && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">
                  Warranty Expiry Date
                </h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(deviceData.warrantyExpiryDate)}
                </div>
              </div>
            )}

            {canViewDescription && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Description</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(deviceData.description)}
                </div>
              </div>
            )}

            {canViewWarrantyExpiringAlert && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">
                  Warranty Alert
                </h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {deviceData.warrantyExpiringAlert ? (
                    <span className="font-bold">Enabled</span>
                  ) : (
                    <span className="text-gray-500">Disabled</span>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Row 4: Image and Status fields */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
            {canViewImage && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Device Image</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {deviceData.image ? (
                    <span className="text-blue-600 hover:text-blue-800 cursor-pointer">
                      View Image
                    </span>
                  ) : (
                    <span className="text-gray-500">No image uploaded</span>
                  )}
                </div>
              </div>
            )}

            {canViewIsActive && (
              <div className="flex flex-col">
                <div className="">
                  <span className="text-[15px] text-gray-600">Active</span>
                </div>
                <div className="">
                  {deviceData.isActive ? (
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
                  {deviceData.isDraft ? (
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
                  {deviceData.isDeleted ? (
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
          created: getRelativeTime(deviceData.createdAt),
          updated: getRelativeTime(deviceData.updatedAt),
          drafted: getRelativeTime(deviceData.draftedAt),
          deleted: getRelativeTime(deviceData.deletedAt),
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
