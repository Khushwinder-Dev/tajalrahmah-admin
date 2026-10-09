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

type WorkOrdersData = {
  workOrder: string;
  startDate: string;
  workCenter: string;
  manufacturingOrder: string;
  productQuantity: number;
  unit: string;
  status: string;
  isDraft: boolean;
  createdAt: Date | null;
  updatedAt: Date | null;
  isDeleted: boolean;
};

const initialData: WorkOrdersData = {
  workOrder: "WO-001",
  startDate: "2024-01-15",
  workCenter: "Production Line A",
  manufacturingOrder: "MO-2024-001",
  productQuantity: 100,
  unit: "Pieces",
  status: "In Progress",
  isDraft: false,
  createdAt: new Date(),
  updatedAt: new Date(),
  isDeleted: false,
};

// Work Order options for autocomplete
const workOrderOptions = [
  "WO-001 - Production Line A - MO-2024-001",
  "WO-002 - Production Line B - MO-2024-002",
  "WO-003 - Assembly Line C - MO-2024-003",
  "WO-004 - Quality Control - MO-2024-004",
  "WO-005 - Packaging Line - MO-2024-005",
  "WO-006 - Testing Station - MO-2024-006",
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

export default function WorkOrdersDetailsPage() {
  const navigate = useNavigate();
  const { isRTL } = useSelector((state: RootState) => state.language);

  const [keepChanges, setKeepChanges] = useState(false);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [selectedWorkOrder, setSelectedWorkOrder] = useState(
    "WO-001 - Production Line A - MO-2024-001"
  );
  const location = useLocation();
  const isViewPage = location.pathname.includes("/view");
  const [pdfChecked, setPdfChecked] = useState(false);
  const [printEnabled, setPrintEnabled] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  // get permission
  const canCreate: boolean = usePermission("workOrders", "create");
  const canView: boolean = usePermission("workOrders", "view");
  const canEdit: boolean = usePermission("workOrders", "edit");
  const canDelete: boolean = usePermission("workOrders", "delete");
  const canExport: boolean = usePermission("workOrders", "export");
  const canPdf: boolean = usePermission("workOrders", "pdf");
  const canPrint: boolean = usePermission("workOrders", "pdf");
  const canSeeHistory: boolean = usePermission("workOrders", "history");

  // Field-level permissions
  const canViewWorkOrder: boolean = usePermission(
    "workOrders",
    "view",
    "workOrder"
  );
  const canViewStartDate: boolean = usePermission(
    "workOrders",
    "view",
    "startDate"
  );
  const canViewWorkCenter: boolean = usePermission(
    "workOrders",
    "view",
    "workCenter"
  );
  const canViewManufacturingOrder: boolean = usePermission(
    "workOrders",
    "view",
    "manufacturingOrder"
  );
  const canViewProductQuantity: boolean = usePermission(
    "workOrders",
    "view",
    "productQuantity"
  );
  const canViewUnit: boolean = usePermission("workOrders", "view", "unit");
  const canViewStatus: boolean = usePermission("workOrders", "view", "status");
  const canViewIsDraft: boolean = usePermission(
    "workOrders",
    "view",
    "isDraft"
  );

  console.log("canCreate", canCreate);
  console.log("canView", canView);
  console.log("canEdit", canEdit);
  console.log("canDelete", canDelete);
  console.log("canExport", canExport);

  // Get work order data based on selected work order
  const getWorkOrderData = (workOrderName: string): WorkOrdersData => {
    const workOrderMap: Record<string, WorkOrdersData> = {
      "WO-001 - Production Line A - MO-2024-001": {
        workOrder: "WO-001",
        startDate: "2024-01-15",
        workCenter: "Production Line A",
        manufacturingOrder: "MO-2024-001",
        productQuantity: 100,
        unit: "Pieces",
        status: "In Progress",
        isDraft: false,
        createdAt: new Date("2024-01-15T10:30:00Z"),
        updatedAt: new Date("2024-01-20T14:45:00Z"),
        isDeleted: false,
      },
      "WO-002 - Production Line B - MO-2024-002": {
        workOrder: "WO-002",
        startDate: "2024-01-16",
        workCenter: "Production Line B",
        manufacturingOrder: "MO-2024-002",
        productQuantity: 150,
        unit: "Units",
        status: "Completed",
        isDraft: false,
        createdAt: new Date("2024-01-16T09:15:00Z"),
        updatedAt: new Date("2024-01-22T11:30:00Z"),
        isDeleted: false,
      },
      "WO-003 - Assembly Line C - MO-2024-003": {
        workOrder: "WO-003",
        startDate: "2024-01-17",
        workCenter: "Assembly Line C",
        manufacturingOrder: "MO-2024-003",
        productQuantity: 75,
        unit: "Boxes",
        status: "Pending",
        isDraft: false,
        createdAt: new Date("2024-01-17T16:20:00Z"),
        updatedAt: new Date("2024-01-25T13:45:00Z"),
        isDeleted: false,
      },
      "WO-004 - Quality Control - MO-2024-004": {
        workOrder: "WO-004",
        startDate: "2024-01-18",
        workCenter: "Quality Control",
        manufacturingOrder: "MO-2024-004",
        productQuantity: 200,
        unit: "Pieces",
        status: "On Hold",
        isDraft: false,
        createdAt: new Date("2024-01-18T12:00:00Z"),
        updatedAt: new Date("2024-01-23T10:00:00Z"),
        isDeleted: false,
      },
      "WO-005 - Packaging Line - MO-2024-005": {
        workOrder: "WO-005",
        startDate: "2024-01-19",
        workCenter: "Packaging Line",
        manufacturingOrder: "MO-2024-005",
        productQuantity: 120,
        unit: "Units",
        status: "In Progress",
        isDraft: false,
        createdAt: new Date("2024-01-19T08:30:00Z"),
        updatedAt: new Date("2024-01-26T10:00:00Z"),
        isDeleted: false,
      },
      "WO-006 - Testing Station - MO-2024-006": {
        workOrder: "WO-006",
        startDate: "2024-01-20",
        workCenter: "Testing Station",
        manufacturingOrder: "MO-2024-006",
        productQuantity: 80,
        unit: "Pieces",
        status: "Completed",
        isDraft: false,
        createdAt: new Date("2024-01-20T14:15:00Z"),
        updatedAt: new Date("2024-01-27T16:40:00Z"),
        isDeleted: false,
      },
    };

    return workOrderMap[workOrderName] || initialData;
  };

  const [workOrderData, setWorkOrderData] = useState<WorkOrdersData>(
    getWorkOrderData(selectedWorkOrder)
  );

  const inputRef = useRef<HTMLInputElement>(null);

  // Update work order data when selection changes
  useEffect(() => {
    setWorkOrderData(getWorkOrderData(selectedWorkOrder));
  }, [selectedWorkOrder]);

  // Focus input when dropdown opens
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    console.log("isViewPage", isViewPage);
  }, []);

  const handlePrintWorkOrder = (workOrderData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Work Order Details",
        data: [workOrderData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          workOrder: "Work Order",
          startDate: "Start Date",
          workCenter: "Work Center",
          manufacturingOrder: "Manufacturing Order",
          productQuantity: "Product Quantity",
          unit: "Unit",
          status: "Status",
          isDraft: "Draft Status",
          isDeleted: "Deleted Status",
          createdAt: "Created At",
          updatedAt: "Updated At",
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
      console.log("workOrderData on pdf click", workOrderData);
      const blob = await pdf(
        <GenericPDF
          data={[workOrderData]}
          title="Work Order Details"
          subtitle="Work Order Information"
        />
      ).toBlob();

      console.log("blob", blob);

      const url = URL.createObjectURL(blob);
      console.log("url", url);
      const a = document.createElement("a");
      a.href = url;
      a.download = "work-order-details.pdf";
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "text-green-600";
      case "In Progress":
        return "text-blue-600";
      case "Pending":
        return "text-yellow-600";
      case "On Hold":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <>
      <PageLayout
        title="Viewing Work Order Details"
        videoSrc={video}
        videoHeader="Tutorial video"
        onListClick={() => navigate("/work-orders")}
        listText="List"
        listPath="work-orders"
        activePage="view"
        popoverOptions={[
          {
            label: "Create",
            icon: <Plus className="w-5 h-5 text-green-600" />,
            onClick: () => navigate("/work-orders/create"),
          },
          {
            label: "Edit",
            icon: <Edit className="w-5 h-5 text-blue-600" />,
            onClick: () => navigate("/work-orders/edit/1"),
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
                  handlePrintWorkOrder(workOrderData);
                }
              }
            : undefined
        }
      >
        <div dir={isRTL ? "rtl" : "ltr"}>
          {/* Row 1: Work Order, Start Date */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            {canViewWorkOrder && (
              <div className="mt-1">
                <Autocomplete
                  options={workOrderOptions}
                  value={selectedWorkOrder}
                  onValueChange={setSelectedWorkOrder}
                  placeholder=" "
                  displayKey="workOrder"
                  valueKey="workOrder"
                  searchKey="workOrder"
                  disabled={false}
                  className="w-[96%] bg-gray-100 rounded-xl"
                  labelClassName="bg-gray-50 rounded-2xl"
                  labelText="Select Work Order"
                  inputClassName="border-none bg-stone-50 focus-visible:ring-offset-0 focus-visible:ring-0 focus-visible:border-2! focus-visible:border-blue-500"
                />
              </div>
            )}

            {canViewStartDate && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Start Date</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(workOrderData.startDate)}
                </div>
              </div>
            )}

            {canViewWorkCenter && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Work Center</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(workOrderData.workCenter)}
                </div>
              </div>
            )}

            {canViewManufacturingOrder && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">
                  Manufacturing Order
                </h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(workOrderData.manufacturingOrder)}
                </div>
              </div>
            )}
          </div>

          {/* Row 3: Product Quantity, Unit */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
            {canViewProductQuantity && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">
                  Product Quantity
                </h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(workOrderData.productQuantity)}
                </div>
              </div>
            )}

            {canViewUnit && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Unit</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(workOrderData.unit)}
                </div>
              </div>
            )}

            {canViewStatus && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Status</h3>
                <div
                  className={`w-full py-1 font-bold text-md dark:text-white ${getStatusColor(
                    workOrderData.status
                  )}`}
                >
                  {displayValue(workOrderData.status)}
                </div>
              </div>
            )}

            {canViewIsDraft && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Draft Status</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(workOrderData.isDraft ? "Yes" : "No")}
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
          created: getRelativeTime(workOrderData.createdAt),
          updated: getRelativeTime(workOrderData.updatedAt),
          drafted: getRelativeTime(workOrderData.createdAt), // Assuming draftedAt is not used in this context
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
