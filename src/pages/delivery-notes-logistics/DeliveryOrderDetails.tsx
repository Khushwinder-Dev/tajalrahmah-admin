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
import EditableInput from "@/components/common/EditableInput";

type DeliveryOrderLogisticData = {
  sn: string;
  country: string;
  company: string;
  status: string;
  dateLoginId: string;
  isActive: boolean;
  createdAt: Date | null;
  updatedAt: Date | null;
  isDeleted: boolean;
  notes: string;
};

const initialData: DeliveryOrderLogisticData = {
  sn: "DOL001",
  country: "Saudi Arabia",
  company: "Al-Rashid Trading Company",
  status: "Active",
  dateLoginId: "2024-01-15",
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date(),
  isDeleted: false,
  notes: "Initial delivery order for office supplies and equipment.",
};

// Delivery Order Logistic options for autocomplete
const deliveryOrderLogisticOptions = [
  "DOL001 - Al-Rashid Trading Company - Global Supplies Ltd",
  "DOL002 - Al-Zahrani Enterprises - Emirates Trading Co",
  "DOL003 - Al-Otaibi Industries - Kuwait Supply Chain",
  "DOL004 - Al-Shehri Solutions - Qatar Logistics Hub",
  "DOL005 - Al-Ghamdi Trading - Bahrain Express",
  "DOL006 - Al-Harbi Corporation - Oman Distribution",
];

// Mock module data for display
const mockDocumentData = {
  documentType: "Bill of Lading",
  documentNumber: "BOL-2024-001",
  issueDate: "2024-01-15",
  expiryDate: "2024-03-15",
  issuingAuthority: "Port Authority of Saudi Arabia",
  documentStatus: "Valid",
  remarks: "Original document received and verified",
};

const mockSupplierData = {
  supplierCode: "SUP-001",
  contactPerson: "Ahmed Al-Rashid",
  phoneNumber: "+966-11-123-4567",
  emailAddress: "ahmed@alrashid.com",
  address: "123 Industrial Area, Riyadh, Saudi Arabia",
  taxNumber: "300123456700003",
  bankDetails: "Al Rajhi Bank - Account: 123456789",
};

const mockCertificateData = {
  certificateType: "ISO 9001:2015",
  certificateNumber: "ISO-2024-001",
  issuingBody: "Saudi Standards Organization",
  issueDate: "2024-01-01",
  expiryDate: "2027-01-01",
  status: "Active",
  attachmentUrl: "/documents/certificates/iso-9001-2024.pdf",
};

const mockGoodsData = {
  itemCode: "ITEM-001",
  itemDescription: "Office Chairs - Executive Series",
  quantity: 50,
  unitOfMeasure: "Pieces",
  unitPrice: 250.0,
  totalValue: 12500.0,
  weight: 750.5,
  dimensions: "60cm x 60cm x 110cm",
  hsCode: "9401.30.00",
};

const mockPortData = {
  portOfLoading: "King Abdulaziz Port, Dammam",
  portOfDischarge: "Jebel Ali Port, Dubai",
  eta: "2024-01-20",
  etd: "2024-01-18",
  vesselName: "MSC Mediterranean",
  voyageNumber: "VOY-2024-001",
  containerNumber: "MSCU1234567",
};

const mockConsigneeData = {
  consigneeName: "Al-Zahrani Enterprises",
  contactPerson: "Omar Al-Zahrani",
  phoneNumber: "+971-4-567-8901",
  emailAddress: "omar@alzahrani.ae",
  deliveryAddress: "456 Business District, Dubai, UAE",
  specialInstructions: "Fragile items - Handle with care",
};

const mockCourierData = {
  courierService: "Aramex Express",
  trackingNumber: "ARX-2024-001234",
  pickupDate: "2024-01-22",
  expectedDelivery: "2024-01-25",
  serviceType: "Express Delivery",
  insuranceValue: 15000.0,
  courierContact: "+966-11-800-1234",
};

const mockPaymentData = {
  paymentTerms: "Letter of Credit",
  paymentMethod: "Bank Transfer",
  creditPeriod: 30,
  currency: "USD",
  exchangeRate: 3.75,
  bankName: "Saudi National Bank",
  accountNumber: "SA1234567890123456789",
  swiftCode: "SNBNSARI",
};

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

export default function DeliveryOrderLogisticDetailsPage() {
  const navigate = useNavigate();
  const { isRTL } = useSelector((state: RootState) => state.language);

  const [keepChanges, setKeepChanges] = useState(false);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [selectedDeliveryOrderLogistic, setSelectedDeliveryOrderLogistic] =
    useState("Al-Rashid Trading Company - Global Supplies Ltd");
  const location = useLocation();
  const isViewPage = location.pathname.includes("/view");
  const [pdfChecked, setPdfChecked] = useState(false);
  const [printEnabled, setPrintEnabled] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  // Module form data states for display (read-only in view mode)
  const [documentData] = useState<any>(mockDocumentData);
  const [supplierData] = useState<any>(mockSupplierData);
  const [certificateData] = useState<any>(mockCertificateData);
  const [goodsData] = useState<any>(mockGoodsData);
  const [portData] = useState<any>(mockPortData);
  const [consigneeData] = useState<any>(mockConsigneeData);
  const [courierData] = useState<any>(mockCourierData);
  const [paymentData] = useState<any>(mockPaymentData);
  //   const [notesData] = useState<any>({});

  // get permission
  const canCreate: boolean = usePermission("deliveryOrderLogistic", "create");
  const canView: boolean = usePermission("deliveryOrderLogistic", "view");
  const canEdit: boolean = usePermission("deliveryOrderLogistic", "edit");
  const canDelete: boolean = usePermission("deliveryOrderLogistic", "delete");
  const canExport: boolean = usePermission("deliveryOrderLogistic", "export");
  const canPdf: boolean = usePermission("deliveryOrderLogistic", "pdf");
  const canPrint: boolean = usePermission("deliveryOrderLogistic", "print");
  const canSeeHistory: boolean = usePermission(
    "deliveryOrderLogistic",
    "history"
  );

  // Field-level permissions
  //   const canViewSn: boolean = usePermission(
  //     "deliveryOrderLogistic",
  //     "view",
  //     "sn"
  //   );
  const canViewCountry: boolean = usePermission(
    "deliveryOrderLogistic",
    "view",
    "country"
  );
  const canViewCompany: boolean = usePermission(
    "deliveryOrderLogistic",
    "view",
    "company"
  );
  //   const canViewPiNo: boolean = usePermission(
  //     "deliveryOrderLogistic",
  //     "view",
  //     "piNo"
  //   );
  //   const canViewInvoiceNo: boolean = usePermission(
  //     "deliveryOrderLogistic",
  //     "view",
  //     "invoiceNo"
  //   );
  //   const canViewSupplierName: boolean = usePermission(
  //     "deliveryOrderLogistic",
  //     "view",
  //     "supplierName"
  //   );
  //   const canViewStatus: boolean = usePermission(
  //     "deliveryOrderLogistic",
  //     "view",
  //     "status"
  //   );
  //   const canViewDateLoginId: boolean = usePermission(
  //     "deliveryOrderLogistic",
  //     "view",
  //     "dateLoginId"
  //   );
  const canViewIsActive: boolean = usePermission(
    "deliveryOrderLogistic",
    "view",
    "isActive"
  );
  const canViewIsDeleted: boolean = usePermission(
    "deliveryOrderLogistic",
    "view",
    "isDeleted"
  );

  console.log("canCreate", canCreate);
  console.log("canView", canView);
  console.log("canEdit", canEdit);
  console.log("canDelete", canDelete);
  console.log("canExport", canExport);

  // Get delivery order logistic data based on selected option
  const getDeliveryOrderLogisticData = (
    optionName: string
  ): DeliveryOrderLogisticData => {
    const dataMap: Record<string, DeliveryOrderLogisticData> = {
      "DOL001 - Al-Rashid Trading Company - Global Supplies Ltd": {
        sn: "DOL001",
        country: "Saudi Arabia",
        company: "Al-Rashid Trading Company",
        status: "Active",
        dateLoginId: "2024-01-15",
        isActive: true,
        createdAt: new Date("2024-01-15T10:30:00Z"),
        updatedAt: new Date("2024-01-20T14:45:00Z"),
        isDeleted: false,
        notes: "Initial delivery order for office supplies and equipment.",
      },
      "DOL002 - Al-Zahrani Enterprises - Emirates Trading Co": {
        sn: "DOL002",
        country: "UAE",
        company: "Al-Zahrani Enterprises",
        status: "Delivered",
        dateLoginId: "2024-01-16",
        isActive: true,
        createdAt: new Date("2024-01-16T09:15:00Z"),
        updatedAt: new Date("2024-01-21T11:30:00Z"),
        isDeleted: false,
        notes: "Electronics shipment completed successfully.",
      },
      "DOL003 - Al-Otaibi Industries - Kuwait Supply Chain": {
        sn: "DOL003",
        country: "Kuwait",
        company: "Al-Otaibi Industries",
        status: "In Transit",
        dateLoginId: "2024-01-17",
        isActive: true,
        createdAt: new Date("2024-01-17T16:20:00Z"),
        updatedAt: new Date("2024-01-22T13:45:00Z"),
        isDeleted: false,
        notes: "Industrial machinery in transit to destination.",
      },
      "DOL004 - Al-Shehri Solutions - Qatar Logistics Hub": {
        sn: "DOL004",
        country: "Qatar",
        company: "Al-Shehri Solutions",
        status: "Pending",
        dateLoginId: "2024-01-18",
        isActive: false,
        createdAt: new Date("2024-01-18T12:00:00Z"),
        updatedAt: new Date("2024-01-25T10:00:00Z"),
        isDeleted: false,
        notes: "Awaiting customs clearance documentation.",
      },
      "DOL005 - Al-Ghamdi Trading - Bahrain Express": {
        sn: "DOL005",
        country: "Bahrain",
        company: "Al-Ghamdi Trading",
        status: "Processing",
        dateLoginId: "2024-01-19",
        isActive: true,
        createdAt: new Date("2024-01-19T08:30:00Z"),
        updatedAt: new Date("2024-01-25T10:00:00Z"),
        isDeleted: false,
        notes: "Order being processed at warehouse facility.",
      },
      "DOL006 - Al-Harbi Corporation - Oman Distribution": {
        sn: "DOL006",
        country: "Oman",
        company: "Al-Harbi Corporation",
        status: "Delivered",
        dateLoginId: "2024-01-20",
        isActive: true,
        createdAt: new Date("2024-01-20T14:15:00Z"),
        updatedAt: new Date("2024-01-25T16:40:00Z"),
        isDeleted: false,
        notes: "Construction materials delivered and confirmed.",
      },
    };

    return dataMap[optionName] || initialData;
  };

  const [deliveryOrderLogisticData, setDeliveryOrderLogisticData] =
    useState<DeliveryOrderLogisticData>(
      getDeliveryOrderLogisticData(selectedDeliveryOrderLogistic)
    );

  const inputRef = useRef<HTMLInputElement>(null);

  // Update delivery order logistic data when selection changes
  useEffect(() => {
    setDeliveryOrderLogisticData(
      getDeliveryOrderLogisticData(selectedDeliveryOrderLogistic)
    );
  }, [selectedDeliveryOrderLogistic]);

  // Focus input when dropdown opens
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    console.log("isViewPage", isViewPage);
  }, []);

  const handlePrintDeliveryOrderLogistic = (data: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Delivery Order Logistic Details",
        data: [data],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          sn: "Serial Number",
          country: "Country",
          company: "Company",
          piNo: "P.I. Number",
          invoiceNo: "Invoice Number",
          supplierName: "Supplier Name",
          status: "Status",
          dateLoginId: "Date Login ID",
          isActive: "Active Status",
          isDeleted: "Deleted Status",
          createdAt: "Created At",
          updatedAt: "Updated At",
          notes: "Notes",
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
        "deliveryOrderLogisticData on pdf click",
        deliveryOrderLogisticData
      );
      const blob = await pdf(
        <GenericPDF
          data={[deliveryOrderLogisticData]}
          title="Delivery Order Logistic Details"
          subtitle="Delivery Order Logistic Information"
        />
      ).toBlob();

      console.log("blob", blob);

      const url = URL.createObjectURL(blob);
      console.log("url", url);
      const a = document.createElement("a");
      a.href = url;
      a.download = `delivery-order-logistic-${deliveryOrderLogisticData.sn}-details.pdf`;
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

  //   const getStatusColor = (status: string) => {
  //     switch (status.toLowerCase()) {
  //       case "active":
  //         return "text-green-600 font-bold";
  //       case "delivered":
  //         return "text-blue-600 font-bold";
  //       case "in transit":
  //         return "text-yellow-600 font-bold";
  //       case "pending":
  //         return "text-orange-600 font-bold";
  //       case "processing":
  //         return "text-purple-600 font-bold";
  //       case "cancelled":
  //         return "text-red-600 font-bold";
  //       default:
  //         return "text-gray-600 font-bold";
  //     }
  //   };

  return (
    <>
      <PageLayout
        title="Viewing Delivery Order Logistic"
        videoSrc={video}
        videoHeader="Tutorial video"
        onListClick={() => navigate("/delivery-order-logistic")}
        listText="List"
        listPath="delivery-order-logistic"
        activePage="view"
        popoverOptions={[
          {
            label: "Create",
            icon: <Plus className="w-5 h-5 text-green-600" />,
            onClick: () => navigate("/delivery-order-logistic/create"),
          },
          {
            label: "Edit",
            icon: <Edit className="w-5 h-5 text-blue-600" />,
            onClick: () =>
              navigate(
                `/delivery-order-logistic/edit/${deliveryOrderLogisticData.sn}`
              ),
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
                  handlePrintDeliveryOrderLogistic(deliveryOrderLogisticData);
                }
              }
            : undefined
        }
      >
        <div dir={isRTL ? "rtl" : "ltr"}>
          {/* Row 1: Autocomplete, Country, Company, Active */}
          <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-6">
            <div className="mt-1">
              <Autocomplete
                options={deliveryOrderLogisticOptions}
                value={selectedDeliveryOrderLogistic}
                onValueChange={setSelectedDeliveryOrderLogistic}
                placeholder=" "
                displayKey="deliveryOrderLogistic"
                valueKey="deliveryOrderLogistic"
                searchKey="deliveryOrderLogistic"
                disabled={false}
                className="w-[96%] bg-gray-100 rounded-xl"
                labelClassName="bg-gray-50 rounded-2xl"
                labelText="Select Delivery Order Logistic"
                inputClassName="border-none bg-stone-50 focus-visible:ring-offset-0 focus-visible:ring-0 focus-visible:border-2! focus-visible:border-blue-500"
              />
            </div>

            {canViewCountry && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Country</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(deliveryOrderLogisticData.country)}
                </div>
              </div>
            )}

            {canViewCompany && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Company</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(deliveryOrderLogisticData.company)}
                </div>
              </div>
            )}

            {canViewIsActive && (
              <div className="flex flex-col">
                <div className="">
                  <span className="text-[15px] text-gray-600">Active</span>
                </div>
                <div className="">
                  {deliveryOrderLogisticData.isActive ? (
                    <span className="text-green-600 font-bold text-[15px]">
                      Yes
                    </span>
                  ) : (
                    <span className="text-red-600 font-bold text-[15px]">
                      No
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Row 2: Deleted */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
            {canViewIsDeleted && (
              <div className="flex flex-col">
                <div className="">
                  <span className="text-[15px] text-gray-600">Deleted</span>
                </div>
                <div className="">
                  {deliveryOrderLogisticData.isDeleted ? (
                    <span className="text-red-600 font-bold text-[15px]">
                      Yes
                    </span>
                  ) : (
                    <span className="text-green-600 font-bold text-[15px]">
                      No
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Notes Section */}
          <div className="mt-6">
            <div className="">
              <EditableInput
                id="notes"
                name="notes"
                value={deliveryOrderLogisticData.notes}
                onChange={() => {}} // Read-only in view mode
                placeholder=" "
                labelText="Notes"
                className="relative"
                disabled={true} // Read-only in view mode
              />
            </div>
          </div>

          {/* Reusable Form Generator modules - Read-only display */}
          <div className="mt-6">
            <ReusableFormGenerator
              moduleName="documents"
              formData={documentData}
              setFormData={() => {}} // Read-only
              onFieldChange={() => {}} // Read-only
              onNextField={() => null}
              className=""
            />
          </div>

          <div className="">
            <ReusableFormGenerator
              moduleName="supplier"
              formData={supplierData}
              setFormData={() => {}} // Read-only
              onFieldChange={() => {}} // Read-only
              onNextField={() => null}
              className=""
            />
          </div>

          <div className="">
            <ReusableFormGenerator
              moduleName="certificates"
              formData={certificateData}
              setFormData={() => {}} // Read-only
              onFieldChange={() => {}} // Read-only
              onNextField={() => null}
              className=""
            />
          </div>

          <div className="">
            <ReusableFormGenerator
              moduleName="goods"
              formData={goodsData}
              setFormData={() => {}} // Read-only
              onFieldChange={() => {}} // Read-only
              onNextField={() => null}
              className=""
            />
          </div>

          <div className="">
            <ReusableFormGenerator
              moduleName="portMaster"
              formData={portData}
              setFormData={() => {}} // Read-only
              onFieldChange={() => {}} // Read-only
              onNextField={() => null}
              className=""
            />
          </div>

          <div className="">
            <ReusableFormGenerator
              moduleName="consigneeMaster"
              formData={consigneeData}
              setFormData={() => {}} // Read-only
              onFieldChange={() => {}} // Read-only
              onNextField={() => null}
              className=""
            />
          </div>

          <div className="">
            <ReusableFormGenerator
              moduleName="courier"
              formData={courierData}
              setFormData={() => {}} // Read-only
              onFieldChange={() => {}} // Read-only
              onNextField={() => null}
              className=""
            />
          </div>

          <div className="">
            <ReusableFormGenerator
              moduleName="payment"
              formData={paymentData}
              setFormData={() => {}} // Read-only
              onFieldChange={() => {}} // Read-only
              onNextField={() => null}
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
        title="Delivery Order Logistic History"
        statusInfo={{
          created: getRelativeTime(deliveryOrderLogisticData.createdAt),
          updated: getRelativeTime(deliveryOrderLogisticData.updatedAt),
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
