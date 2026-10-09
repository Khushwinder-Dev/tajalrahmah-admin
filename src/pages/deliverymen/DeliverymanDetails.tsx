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
import { Edit, Plus } from "lucide-react";
import { ResetFormModal } from "@/components/common/ResetFormModal";
import { usePermission } from "@/hooks/usePermissions";
import MinimizablePageLayout from "@/components/MinimizablePageLayout";

// Mock deliverymen
const MOCK_DELIVERYMEN = [
  {
    id: "1",
    code: "DM-001",
    name: "John Doe",
    phone: "+1 202-555-0147",
    email: "john.doe@example.com",
    address: "123 Main St, New York, USA",
    nationalId: "A123456789",
    vehicleType: "Bike",
    assignedArea: "Manhattan",
    customerLogo: "",
    status: "Active",
  },
  {
    id: "2",
    code: "DM-002",
    name: "Sarah Lee",
    phone: "+1 202-555-0175",
    email: "sarah.lee@example.com",
    address: "456 Elm St, Los Angeles, USA",
    nationalId: "B987654321",
    vehicleType: "Car",
    assignedArea: "Downtown",
    customerLogo: "",
    status: "InActive",
  },
  {
    id: "3",
    code: "DM-003",
    name: "Mike Ross",
    phone: "+1 202-555-0199",
    email: "mike.ross@example.com",
    address: "789 Pine St, Chicago, USA",
    nationalId: "C123987456",
    vehicleType: "Van",
    assignedArea: "Westside",
    customerLogo: "",
    status: "Draft",
  },
  {
    id: "4",
    code: "DM-004",
    name: "Nina Patel",
    phone: "+1 202-555-0110",
    email: "nina.patel@example.com",
    address: "321 Oak St, Houston, USA",
    nationalId: "D456789123",
    vehicleType: "Scooter",
    assignedArea: "Uptown",
    customerLogo: "",
    status: "Active",
  },
];

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

export default function DeliverymanDetailsPage() {
  const navigate = useNavigate();

  const [keepChanges, setKeepChanges] = useState(false);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState("1");
  const location = useLocation();
  const isViewPage = location.pathname.includes("/view");
  const [pdfChecked, setPdfChecked] = useState(false);
  const [printEnabled, setPrintEnabled] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  // Permissions
  const canPdf: boolean = usePermission("deliverymen", "pdf");
  const canPrint: boolean = usePermission("deliverymen", "print");
  const canSeeHistory: boolean = usePermission("deliverymen", "history");

  let deliverymanData = {
    id: selectedId,
    code: MOCK_DELIVERYMEN.find((r) => r.id === selectedId)?.code || "DM-001",
    name: MOCK_DELIVERYMEN.find((r) => r.id === selectedId)?.name || "John Doe",
    phone:
      MOCK_DELIVERYMEN.find((r) => r.id === selectedId)?.phone ||
      "+1 202-555-0147",
    email:
      MOCK_DELIVERYMEN.find((r) => r.id === selectedId)?.email ||
      "john.doe@example.com",
    address:
      MOCK_DELIVERYMEN.find((r) => r.id === selectedId)?.address ||
      "123 Main St, New York, USA",
    nationalId:
      MOCK_DELIVERYMEN.find((r) => r.id === selectedId)?.nationalId ||
      "A123456789",
    vehicleType:
      MOCK_DELIVERYMEN.find((r) => r.id === selectedId)?.vehicleType || "Bike",
    assignedArea:
      MOCK_DELIVERYMEN.find((r) => r.id === selectedId)?.assignedArea ||
      "Manhattan",
    customerLogo:
      MOCK_DELIVERYMEN.find((r) => r.id === selectedId)?.customerLogo || "",
    status:
      MOCK_DELIVERYMEN.find((r) => r.id === selectedId)?.status || "Active",
    isDefault: false,
    isActive: true,
    isDraft: false,
    isDeleted: false,
    createdAt: "2024-05-15T10:30:00Z",
    updatedAt: "2025-01-15T14:30:00Z",
    draftedAt: "2025-05-20T14:45:00Z",
    deletedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(),
  } as any;

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    if (isViewPage) {
      deliverymanData = {
        id: selectedId,
        code: "",
        name: "",
        phone: "",
        email: "",
        address: "",
        nationalId: "",
        vehicleType: "",
        assignedArea: "",
        customerLogo: "",
        status: "Active",
        isDefault: false,
        isActive: true,
        isDraft: false,
        isDeleted: false,
        createdAt: "",
        updatedAt: "",
        draftedAt: "",
        deletedAt: "",
      } as any;
    }
  }, []);

  const handlePrint = (data: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Deliveryman Details",
        data: [data],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          code: "Code",
          name: "Name",
          phone: "Phone",
          email: "Email",
          address: "Address",
          nationalId: "National ID",
          vehicleType: "Vehicle Type",
          assignedArea: "Assigned Area",
          customerLogo: "Customer Logo",
          status: "Status",
          isDefault: "Default",
          isActive: "Active",
          isDraft: "Draft",
          isDeleted: "Deleted",
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

  const handleSwitchChange = (checked: boolean) => setPrintEnabled(checked);
  const handlePDFSwitchChange = (checked: boolean) => setPdfChecked(checked);

  const handleExportPDF = async () => {
    try {
      const blob = await pdf(
        <GenericPDF
          data={[deliverymanData]}
          title="Deliveryman Details"
          subtitle="Deliveryman Information"
        />
      ).toBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "deliveryman-details.pdf";
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
    if (years > 0) return `${years}y ago`;
    if (months > 0) return `${months}mo ago`;
    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return "Just now";
  };

  const displayValue = (value: any) =>
    value === undefined || value === null || value === "" ? "–" : value;

  return (
    <>
      <MinimizablePageLayout
        moduleId="deliveryman-details-module"
        moduleName="Deliveryman Details"
        moduleRoute="/deliverymen/view"
        title="Viewing Deliveryman"
        videoSrc={video}
        videoHeader="Tutorial video"
        listPath="deliverymen"
        activePage="view"
        module="deliverymen"
        popoverOptions={[
          {
            label: "Create",
            icon: <Plus className="w-5 h-5 text-green-600" />,
            onClick: () => navigate("/deliverymen/create"),
          },
          {
            label: "Edit",
            icon: <Edit className="w-5 h-5 text-blue-600" />,
            onClick: () => navigate("/deliverymen/edit/1"),
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
                if (pdfChecked) handleExportPDF();
                if (printEnabled) handlePrint(deliverymanData);
              }
            : undefined
        }
      >
        {/* Row 1: Picker, Code, Name, Phone */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="mt-1">
            <Autocomplete
              options={MOCK_DELIVERYMEN}
              value={selectedId}
              onValueChange={setSelectedId}
              placeholder=" "
              displayKey="name"
              valueKey="id"
              searchKey="name"
              disabled={false}
              className="w-[96%] bg-gray-100 rounded-xl"
              labelClassName="bg-gray-50 rounded-2xl"
              labelText="Deliveryman"
              isShowTemplateIcon={false}
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">Code</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(deliverymanData.code)}
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">Name</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(deliverymanData.name)}
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">Phone</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(deliverymanData.phone)}
            </div>
          </div>
        </div>

        {/* Row 2: Email, Address, National ID, Vehicle Type */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div>
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">Email</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(deliverymanData.email)}
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">Address</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(deliverymanData.address)}
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">National ID</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(deliverymanData.nationalId)}
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">Vehicle Type</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(deliverymanData.vehicleType)}
            </div>
          </div>
        </div>

        {/* Row 3: Assigned Area, Customer Logo, Status, Default, Action */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div>
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">Assigned Area</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(deliverymanData.assignedArea)}
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">Customer Logo</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {deliverymanData.customerLogo ? (
                <img
                  src={deliverymanData.customerLogo}
                  alt="logo"
                  className="h-10 w-10 object-contain rounded"
                />
              ) : (
                <span>–</span>
              )}
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">Status</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(deliverymanData.status)}
            </div>
          </div>

          <div>
            <div className="flex flex-col">
              <div>
                <span className="text-[15px] text-gray-600">Default</span>
              </div>
              <div>
                {deliverymanData.isDefault ? (
                  <span className="text-black text-[15px]">Yes</span>
                ) : (
                  <span className="text-black text-[15px]">No</span>
                )}
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-normal mb-1 text-gray-600">Action</h3>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              Updated
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
          created: getRelativeTime(deliverymanData.createdAt),
          updated: getRelativeTime(deliverymanData.updatedAt),
          drafted: getRelativeTime(deliverymanData.draftedAt),
          deleted: getRelativeTime(deliverymanData.deletedAt),
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
