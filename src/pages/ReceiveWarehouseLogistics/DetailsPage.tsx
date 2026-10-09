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
import ReusableFormGenerator from "@/components/Logistic/ReusableModuleGenerator";
import { usePermission } from "@/hooks/usePermissions";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";

type PurchaseOrderLogisticData = {
  country: string;
  company: string;
  isActive: boolean;
  createdAt: Date | null;
  updatedAt: Date | null;
  isDeleted: boolean;
};

const initialData: PurchaseOrderLogisticData = {
  country: "Saudi Arabia",
  company: "Al-Rashid Trading Company",
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date(),
  isDeleted: false,
};

// Purchase Order Logistic options for autocomplete
const purchaseOrderLogisticOptions = [
  "001 - Al-Rashid Trading Company",
  "002 - Al-Zahrani Trading Services",
  "003 - Al-Sayed Trading Co.",
  "004 - Al-Mansouri Trading Agency",
  "005 - Al-Qahtani Trading",
  "006 - Al-Otaibi Trading",
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

export default function ReceiveWarehouseLogisticDetailsPage() {
  const navigate = useNavigate();
  const { isRTL } = useSelector((state: RootState) => state.language);

  const [keepChanges, setKeepChanges] = useState(false);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [selectedPurchaseOrderLogistic, setSelectedPurchaseOrderLogistic] =
    useState("001 - Al-Rashid Trading Company");
  const location = useLocation();
  const isViewPage = location.pathname.includes("/view");
  const [pdfChecked, setPdfChecked] = useState(false);
  const [printEnabled, setPrintEnabled] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  // Transit Order form data for the reusable component
  const [transitOrderData, setTransitOrderData] = useState<any>({});

  // get permission
  const canCreate: boolean = usePermission(
    "receiveWarehouseLogistics",
    "create"
  );
  const canView: boolean = usePermission("receiveWarehouseLogistics", "view");
  const canEdit: boolean = usePermission("receiveWarehouseLogistics", "edit");
  const canDelete: boolean = usePermission(
    "receiveWarehouseLogistics",
    "delete"
  );
  const canExport: boolean = usePermission(
    "receiveWarehouseLogistics",
    "export"
  );
  const canPdf: boolean = usePermission("receiveWarehouseLogistics", "pdf");
  const canPrint: boolean = usePermission("receiveWarehouseLogistics", "print");
  const canSeeHistory: boolean = usePermission(
    "receiveWarehouseLogistics",
    "history"
  );

  // Field-level permissions
  const canViewCountry: boolean = usePermission(
    "receiveWarehouseLogistics",
    "view",
    "country"
  );
  const canViewCompany: boolean = usePermission(
    "receiveWarehouseLogistics",
    "view",
    "company"
  );
  const canViewIsActive: boolean = usePermission(
    "receiveWarehouseLogistics",
    "view",
    "isActive"
  );
  const canViewIsDeleted: boolean = usePermission(
    "receiveWarehouseLogistics",
    "view",
    "isDeleted"
  );

  console.log("canCreate", canCreate);
  console.log("canView", canView);
  console.log("canEdit", canEdit);
  console.log("canDelete", canDelete);
  console.log("canExport", canExport);

  // Get purchase order logistic data based on selected option
  const getPurchaseOrderLogisticData = (
    optionName: string
  ): PurchaseOrderLogisticData => {
    const dataMap: Record<string, PurchaseOrderLogisticData> = {
      "001 - Al-Rashid Trading Company": {
        country: "Saudi Arabia",
        company: "Al-Rashid Trading Company",
        isActive: true,
        createdAt: new Date("2024-01-15T10:30:00Z"),
        updatedAt: new Date("2024-01-20T14:45:00Z"),
        isDeleted: false,
      },
      "002 - Al-Zahrani Trading Services": {
        country: "Saudi Arabia",
        company: "Al-Zahrani Trading Services",
        isActive: true,
        createdAt: new Date("2024-01-16T09:15:00Z"),
        updatedAt: new Date("2024-01-21T11:30:00Z"),
        isDeleted: false,
      },
      "003 - Al-Sayed Trading Co.": {
        country: "Saudi Arabia",
        company: "Al-Sayed Trading Co.",
        isActive: true,
        createdAt: new Date("2024-01-17T16:20:00Z"),
        updatedAt: new Date("2024-01-22T13:45:00Z"),
        isDeleted: false,
      },
      "004 - Al-Mansouri Trading Agency": {
        country: "Saudi Arabia",
        company: "Al-Mansouri Trading Agency",
        isActive: false,
        createdAt: new Date("2024-01-18T12:00:00Z"),
        updatedAt: new Date("2024-01-25T10:00:00Z"),
        isDeleted: false,
      },
      "005 - Al-Qahtani Trading": {
        country: "Saudi Arabia",
        company: "Al-Qahtani Trading",
        isActive: true,
        createdAt: new Date("2024-01-19T08:30:00Z"),
        updatedAt: new Date("2024-01-25T10:00:00Z"),
        isDeleted: false,
      },
      "006 - Al-Otaibi Trading": {
        country: "Saudi Arabia",
        company: "Al-Otaibi Trading",
        isActive: true,
        createdAt: new Date("2024-01-20T14:15:00Z"),
        updatedAt: new Date("2024-01-25T16:40:00Z"),
        isDeleted: false,
      },
    };

    return dataMap[optionName] || initialData;
  };

  const [purchaseOrderLogisticData, setPurchaseOrderLogisticData] =
    useState<PurchaseOrderLogisticData>(
      getPurchaseOrderLogisticData(selectedPurchaseOrderLogistic)
    );

  const inputRef = useRef<HTMLInputElement>(null);

  // Update purchase order logistic data when selection changes
  useEffect(() => {
    setPurchaseOrderLogisticData(
      getPurchaseOrderLogisticData(selectedPurchaseOrderLogistic)
    );
  }, [selectedPurchaseOrderLogistic]);

  // Focus input when dropdown opens
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    console.log("isViewPage", isViewPage);
  }, []);

  const handlePrintPurchaseOrderLogistic = (data: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Purchase Order Logistic Details",
        data: [data],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          country: "Country",
          company: "Company",
          isActive: "Active Status",
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
      console.log(
        "purchaseOrderLogisticData on pdf click",
        purchaseOrderLogisticData
      );
      const blob = await pdf(
        <GenericPDF
          data={[purchaseOrderLogisticData]}
          title="Purchase Order Logistic Details"
          subtitle="Purchase Order Logistic Information"
        />
      ).toBlob();

      console.log("blob", blob);

      const url = URL.createObjectURL(blob);
      console.log("url", url);
      const a = document.createElement("a");
      a.href = url;
      a.download = "purchase-order-logistic-details.pdf";
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
        title="Viewing Receive Warehouse Logistics"
        videoSrc={video}
        videoHeader="Tutorial video"
        onListClick={() => navigate("/receive-warehouse-logistics")}
        listText="List"
        listPath="receive-warehouse-logistics"
        activePage="view"
        popoverOptions={[
          {
            label: "Create",
            icon: <Plus className="w-5 h-5 text-green-600" />,
            onClick: () => navigate("/receive-warehouse-logistics/create"),
          },
          {
            label: "Edit",
            icon: <Edit className="w-5 h-5 text-blue-600" />,
            onClick: () => navigate("/receive-warehouse-logistics/edit/1"),
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
                  handlePrintPurchaseOrderLogistic(purchaseOrderLogisticData);
                }
              }
            : undefined
        }
      >
        <div dir={isRTL ? "rtl" : "ltr"}>
          {/* Row 1: Select Purchase Order Logistic, Country, Company */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            <div className="mt-1">
              <Autocomplete
                options={purchaseOrderLogisticOptions}
                value={selectedPurchaseOrderLogistic}
                onValueChange={setSelectedPurchaseOrderLogistic}
                placeholder=" "
                displayKey="purchaseOrderLogistic"
                valueKey="purchaseOrderLogistic"
                searchKey="purchaseOrderLogistic"
                disabled={false}
                className="w-[96%] bg-gray-100 rounded-xl"
                labelClassName="bg-gray-50 rounded-2xl"
                labelText="Select Receive Warehouse Logistics"
                inputClassName="border-none bg-stone-50 focus-visible:ring-offset-0 focus-visible:ring-0 focus-visible:border-2! focus-visible:border-blue-500"
              />
            </div>

            {canViewCountry && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Country</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(purchaseOrderLogisticData.country)}
                </div>
              </div>
            )}

            {canViewCompany && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Company</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(purchaseOrderLogisticData.company)}
                </div>
              </div>
            )}

            {canViewIsActive && (
              <div className="flex flex-col">
                <div className="">
                  <span className="text-[15px] text-gray-600">Active</span>
                </div>
                <div className="">
                  {purchaseOrderLogisticData.isActive ? (
                    <span className="text-black font-bold text-[15px]">
                      Yes
                    </span>
                  ) : (
                    <span className="text-black font-bold text-[15px]">No</span>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Row 2: Active, Deleted Status */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
            {canViewIsDeleted && (
              <div className="flex flex-col">
                <div className="">
                  <span className="text-[15px] text-gray-600">Deleted</span>
                </div>
                <div className="">
                  {purchaseOrderLogisticData.isDeleted ? (
                    <span className="text-black font-bold text-[15px]">
                      Yes
                    </span>
                  ) : (
                    <span className="text-black font-bold text-[15px]">No</span>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Reusable Form Generator using shipment module */}
          <div className="">
            <ReusableFormGenerator
              moduleName="documents"
              formData={transitOrderData}
              setFormData={setTransitOrderData}
              onFieldChange={(fieldName, value) => {
                console.log(
                  `Transit Order field ${fieldName} changed to:`,
                  value
                );
              }}
              onNextField={(currentField) => {
                console.log(`Moving from field: ${currentField}`);
                return null; // or return next field name
              }}
              className=""
            />
          </div>

          <div className="">
            <ReusableFormGenerator
              moduleName="goods"
              formData={transitOrderData}
              setFormData={setTransitOrderData}
              onFieldChange={(fieldName, value) => {
                console.log(
                  `Transit Order field ${fieldName} changed to:`,
                  value
                );
              }}
              onNextField={(currentField) => {
                console.log(`Moving from field: ${currentField}`);
                return null; // or return next field name
              }}
              className=""
            />
          </div>

          <div className="">
            <ReusableFormGenerator
              moduleName="transportMaster"
              formData={transitOrderData}
              setFormData={setTransitOrderData}
              onFieldChange={(fieldName, value) => {
                console.log(
                  `Transit Order field ${fieldName} changed to:`,
                  value
                );
              }}
              onNextField={(currentField) => {
                console.log(`Moving from field: ${currentField}`);
                return null; // or return next field name
              }}
              className=""
            />
          </div>

          <div className="">
            <ReusableFormGenerator
              moduleName="consigneeMaster"
              formData={transitOrderData}
              setFormData={setTransitOrderData}
              onFieldChange={(fieldName, value) => {
                console.log(
                  `Transit Order field ${fieldName} changed to:`,
                  value
                );
              }}
              onNextField={(currentField) => {
                console.log(`Moving from field: ${currentField}`);
                return null; // or return next field name
              }}
              className=""
            />
          </div>

          <div className="">
            <ReusableFormGenerator
              moduleName="logisticWareHouse"
              formData={transitOrderData}
              setFormData={setTransitOrderData}
              onFieldChange={(fieldName, value) => {
                console.log(
                  `Transit Order field ${fieldName} changed to:`,
                  value
                );
              }}
              onNextField={(currentField) => {
                console.log(`Moving from field: ${currentField}`);
                return null; // or return next field name
              }}
              className=""
            />
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
          created: getRelativeTime(purchaseOrderLogisticData.createdAt),
          updated: getRelativeTime(purchaseOrderLogisticData.updatedAt),
          drafted: "–",
          deleted: "–",
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
