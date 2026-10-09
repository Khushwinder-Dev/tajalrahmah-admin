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
import {
  initialDataWithValue,
  printConfigFieldLabels,
  type ModuleFieldsType,
} from "./config/ModuleLevelConfig";
import { getModuleFromPath } from "@/lib/utils";
import FieldSection from "@/components/common/FieldSection";

type DetailsPageTypes = ModuleFieldsType & {
  isDefault: boolean;
  isActive: boolean;
  isDraft: boolean;
  createdAt: Date | null;
  draftedAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;
  isDeleted: boolean;
};

const initialData: DetailsPageTypes = {
  ...initialDataWithValue,

  isDefault: false,
  isActive: true,
  isDraft: false,
  createdAt: new Date(),
  draftedAt: null,
  updatedAt: new Date(),
  deletedAt: null,
  isDeleted: false,
};

// update this with your module related value
const autocompleteDataDetailsPage = [
  "Room Charges",
  "Consultation Fee",
  "Medicine Charges",
  "Laboratory Tests",
  "Operation Charges",
  "Emergency Services",
  "Ambulance Service",
  "Nursing Care",
  "Physiotherapy",
  "X-Ray Services",
  "CT Scan",
  "MRI Scan",
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

export default function BillDetails() {
  const navigate = useNavigate();
  const { isRTL } = useSelector((state: RootState) => state.language);

  const location = useLocation();
  const detectedModule = getModuleFromPath(location.pathname);

  const [keepChanges, setKeepChanges] = useState(false);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [selectedVisit, setSelectedVisit] = useState(
    autocompleteDataDetailsPage[0]
  );
  const isViewPage = location.pathname.includes("/view");
  const [pdfChecked, setPdfChecked] = useState(false);
  const [printEnabled, setPrintEnabled] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  const canPdf: boolean = usePermission(detectedModule, "pdf");
  const canPrint: boolean = usePermission(detectedModule, "print");
  const canSeeHistory: boolean = usePermission(detectedModule, "history");

  // Field-level permissions
  const fieldKeys = Object.keys(initialData) as (keyof ModuleFieldsType)[];
  const fieldPermissions = usePermission<keyof DetailsPageTypes>(
    detectedModule,
    "view",
    [
      ...fieldKeys,
      "isDefault",
      "isActive",
      "createdAt",
      "draftedAt",
      "updatedAt",
      "deletedAt",
      "isDeleted",
    ]
  );

  // Get bill data based on selected service
  const getBillData = (serviceType: string): DetailsPageTypes => {
    const billMap: Record<string, DetailsPageTypes> = {
      "Room Charges": {
        ...initialData,
        slNo: "1",
        admissionId: "ADM001",
        patientId: "P001",
        billDate: "2025-01-15",
        patientName: "John Smith",
        dateOfBirth: "1985-03-20",
        address: "123 Main St, City",
        sex: "Male",
        doctorName: "Dr. Wilson",
        image: "patient1.jpg",
        admissionDate: "2025-01-10",
        packageName: "Basic Care Package",
        totalDays: "5",
        dischargeDate: "2025-01-15",
        insuranceName: "Health Plus Insurance",
        policyNo: "HP12345",
        serviceName: "Room Charges",
        quantity: "5",
        rate: "200.00",
        subTotal: "1000.00",
        paymentMethod: "Credit Card",
        cardChequeNo: "****1234",
        receiptNo: "RCP001",
        assignDate: "2025-01-10",
        bedNumber: "B101",
        amount: "1500.00",
        notes: "Regular monitoring required",
      },
      "Consultation Fee": {
        ...initialData,
        slNo: "2",
        admissionId: "ADM002",
        patientId: "P002",
        billDate: "2025-01-16",
        patientName: "Jane Doe",
        dateOfBirth: "1990-07-15",
        address: "456 Oak Ave, Town",
        sex: "Female",
        doctorName: "Dr. Johnson",
        image: "patient2.jpg",
        admissionDate: "2025-01-15",
        packageName: "Premium Care Package",
        totalDays: "3",
        dischargeDate: "2025-01-18",
        insuranceName: "MediCare Insurance",
        policyNo: "MC67890",
        serviceName: "Consultation Fee",
        quantity: "1",
        rate: "500.00",
        subTotal: "500.00",
        paymentMethod: "Cash",
        cardChequeNo: "N/A",
        receiptNo: "RCP002",
        assignDate: "2025-01-15",
        bedNumber: "B102",
        amount: "750.00",
        notes: "Specialist consultation completed",
      },
      "Medicine Charges": {
        ...initialData,
        slNo: "3",
        admissionId: "ADM003",
        patientId: "P003",
        billDate: "2025-01-17",
        patientName: "Mike Wilson",
        dateOfBirth: "1978-12-08",
        address: "789 Pine St, Village",
        sex: "Male",
        doctorName: "Dr. Brown",
        image: "patient3.jpg",
        admissionDate: "2025-01-16",
        packageName: "Standard Care Package",
        totalDays: "2",
        dischargeDate: "2025-01-18",
        insuranceName: "United Health",
        policyNo: "UH11122",
        serviceName: "Medicine Charges",
        quantity: "10",
        rate: "25.00",
        subTotal: "250.00",
        paymentMethod: "Insurance",
        cardChequeNo: "INS789",
        receiptNo: "RCP003",
        assignDate: "2025-01-16",
        bedNumber: "B103",
        amount: "325.00",
        notes: "Prescribed medication dispensed",
      },
      "Laboratory Tests": {
        ...initialData,
        slNo: "4",
        admissionId: "ADM004",
        patientId: "P004",
        billDate: "2025-01-18",
        patientName: "Sarah Davis",
        dateOfBirth: "1985-04-22",
        address: "321 Elm St, City",
        sex: "Female",
        doctorName: "Dr. Wilson",
        image: "patient4.jpg",
        admissionDate: "2025-01-17",
        packageName: "Diagnostic Package",
        totalDays: "1",
        dischargeDate: "2025-01-18",
        insuranceName: "Health Plus Insurance",
        policyNo: "HP33344",
        serviceName: "Laboratory Tests",
        quantity: "5",
        rate: "150.00",
        subTotal: "750.00",
        paymentMethod: "Debit Card",
        cardChequeNo: "****5678",
        receiptNo: "RCP004",
        assignDate: "2025-01-17",
        bedNumber: "B104",
        amount: "850.00",
        notes: "Complete blood work and analysis",
      },
      "Operation Charges": {
        ...initialData,
        slNo: "5",
        admissionId: "ADM005",
        patientId: "P005",
        billDate: "2025-01-19",
        patientName: "Robert Miller",
        dateOfBirth: "1972-11-30",
        address: "654 Maple Dr, Suburb",
        sex: "Male",
        doctorName: "Dr. Garcia",
        image: "patient5.jpg",
        admissionDate: "2025-01-18",
        packageName: "Surgical Package",
        totalDays: "7",
        dischargeDate: "2025-01-25",
        insuranceName: "Premier Health",
        policyNo: "PH55566",
        serviceName: "Operation Charges",
        quantity: "1",
        rate: "5000.00",
        subTotal: "5000.00",
        paymentMethod: "Insurance + Cash",
        cardChequeNo: "INS123",
        receiptNo: "RCP005",
        assignDate: "2025-01-18",
        bedNumber: "B105",
        amount: "6500.00",
        notes: "Successful surgery, post-op care required",
      },
      "Emergency Services": {
        ...initialData,
        slNo: "6",
        admissionId: "ADM006",
        patientId: "P006",
        billDate: "2025-01-20",
        patientName: "Lisa Anderson",
        dateOfBirth: "1988-09-12",
        address: "987 Cedar Ln, Downtown",
        sex: "Female",
        doctorName: "Dr. Taylor",
        image: "patient6.jpg",
        admissionDate: "2025-01-20",
        packageName: "Emergency Package",
        totalDays: "1",
        dischargeDate: "2025-01-20",
        insuranceName: "Quick Care Insurance",
        policyNo: "QC77788",
        serviceName: "Emergency Services",
        quantity: "1",
        rate: "1200.00",
        subTotal: "1200.00",
        paymentMethod: "Credit Card",
        cardChequeNo: "****9012",
        receiptNo: "RCP006",
        assignDate: "2025-01-20",
        bedNumber: "ER01",
        amount: "1350.00",
        notes: "Emergency treatment completed",
      },
      "Ambulance Service": {
        ...initialData,
        slNo: "7",
        admissionId: "ADM007",
        patientId: "P007",
        billDate: "2025-01-21",
        patientName: "David White",
        dateOfBirth: "1965-06-18",
        address: "147 Birch Ave, Uptown",
        sex: "Male",
        doctorName: "Dr. Martinez",
        image: "patient7.jpg",
        admissionDate: "2025-01-21",
        packageName: "Transport Package",
        totalDays: "1",
        dischargeDate: "2025-01-21",
        insuranceName: "Care Plus Insurance",
        policyNo: "CP99900",
        serviceName: "Ambulance Service",
        quantity: "1",
        rate: "300.00",
        subTotal: "300.00",
        paymentMethod: "Cash",
        cardChequeNo: "N/A",
        receiptNo: "RCP007",
        assignDate: "2025-01-21",
        bedNumber: "N/A",
        amount: "300.00",
        notes: "Emergency transport provided",
      },
      "Nursing Care": {
        ...initialData,
        slNo: "8",
        admissionId: "ADM008",
        patientId: "P008",
        billDate: "2025-01-22",
        patientName: "Emma Lee",
        dateOfBirth: "1992-02-28",
        address: "258 Spruce St, Midtown",
        sex: "Female",
        doctorName: "Dr. Clark",
        image: "patient8.jpg",
        admissionDate: "2025-01-20",
        packageName: "Nursing Care Package",
        totalDays: "3",
        dischargeDate: "2025-01-23",
        insuranceName: "Family Health Insurance",
        policyNo: "FH11223",
        serviceName: "Nursing Care",
        quantity: "3",
        rate: "150.00",
        subTotal: "450.00",
        paymentMethod: "Insurance",
        cardChequeNo: "INS456",
        receiptNo: "RCP008",
        assignDate: "2025-01-20",
        bedNumber: "B106",
        amount: "550.00",
        notes: "24/7 nursing care provided",
      },
      Physiotherapy: {
        ...initialData,
        slNo: "9",
        admissionId: "ADM009",
        patientId: "P009",
        billDate: "2025-01-23",
        patientName: "Alex Thompson",
        dateOfBirth: "1980-10-05",
        address: "369 Walnut Rd, Eastside",
        sex: "Male",
        doctorName: "Dr. Lewis",
        image: "patient9.jpg",
        admissionDate: "2025-01-22",
        packageName: "Rehabilitation Package",
        totalDays: "5",
        dischargeDate: "2025-01-27",
        insuranceName: "Wellness Insurance",
        policyNo: "WI44455",
        serviceName: "Physiotherapy",
        quantity: "10",
        rate: "80.00",
        subTotal: "800.00",
        paymentMethod: "Debit Card",
        cardChequeNo: "****3456",
        receiptNo: "RCP009",
        assignDate: "2025-01-22",
        bedNumber: "B107",
        amount: "950.00",
        notes: "Physical therapy sessions ongoing",
      },
      "X-Ray Services": {
        ...initialData,
        slNo: "10",
        admissionId: "ADM010",
        patientId: "P010",
        billDate: "2025-01-24",
        patientName: "Rachel Green",
        dateOfBirth: "1987-08-14",
        address: "741 Cherry St, Westside",
        sex: "Female",
        doctorName: "Dr. Hall",
        image: "patient10.jpg",
        admissionDate: "2025-01-24",
        packageName: "Diagnostic Package",
        totalDays: "1",
        dischargeDate: "2025-01-24",
        insuranceName: "Rapid Health Insurance",
        policyNo: "RH66677",
        serviceName: "X-Ray Services",
        quantity: "3",
        rate: "100.00",
        subTotal: "300.00",
        paymentMethod: "Credit Card",
        cardChequeNo: "****7890",
        receiptNo: "RCP010",
        assignDate: "2025-01-24",
        bedNumber: "N/A",
        amount: "350.00",
        notes: "X-ray imaging completed",
      },
      "CT Scan": {
        ...initialData,
        slNo: "11",
        admissionId: "ADM011",
        patientId: "P011",
        billDate: "2025-01-25",
        patientName: "James Parker",
        dateOfBirth: "1975-12-03",
        address: "852 Ash Ave, Northside",
        sex: "Male",
        doctorName: "Dr. Young",
        image: "patient11.jpg",
        admissionDate: "2025-01-25",
        packageName: "Advanced Diagnostic",
        totalDays: "1",
        dischargeDate: "2025-01-25",
        insuranceName: "Top Care Insurance",
        policyNo: "TC88899",
        serviceName: "CT Scan",
        quantity: "1",
        rate: "800.00",
        subTotal: "800.00",
        paymentMethod: "Insurance",
        cardChequeNo: "INS789",
        receiptNo: "RCP011",
        assignDate: "2025-01-25",
        bedNumber: "N/A",
        amount: "900.00",
        notes: "CT scan with contrast completed",
      },
      "MRI Scan": {
        ...initialData,
        slNo: "12",
        admissionId: "ADM012",
        patientId: "P012",
        billDate: "2025-01-26",
        patientName: "Sophia Carter",
        dateOfBirth: "1983-05-27",
        address: "963 Oak Hill Dr, Southside",
        sex: "Female",
        doctorName: "Dr. King",
        image: "patient12.jpg",
        admissionDate: "2025-01-26",
        packageName: "Premium Diagnostic",
        totalDays: "1",
        dischargeDate: "2025-01-26",
        insuranceName: "Elite Health Insurance",
        policyNo: "EH00011",
        serviceName: "MRI Scan",
        quantity: "1",
        rate: "1500.00",
        subTotal: "1500.00",
        paymentMethod: "Credit Card",
        cardChequeNo: "****2345",
        receiptNo: "RCP012",
        assignDate: "2025-01-26",
        bedNumber: "N/A",
        amount: "1650.00",
        notes: "MRI scan with detailed imaging",
      },
    };

    return billMap[serviceType] || initialData;
  };

  const [billData, setBillData] = useState<DetailsPageTypes>(
    getBillData(selectedVisit)
  );

  const inputRef = useRef<HTMLInputElement>(null);

  // Update bill data when selection changes
  useEffect(() => {
    setBillData(getBillData(selectedVisit));
  }, [selectedVisit]);

  // Focus input when dropdown opens
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    console.log("isViewPage", isViewPage);
  }, []);

  const handlePrintBill = (billData: any) => {
    try {
      const html = PrintCommonLayout({
        title: `${location.pathname.split("/")[1]} Details`,
        data: [billData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          ...printConfigFieldLabels,

          isDefault: "Default Bill",
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

  // Labels for fields to render in the view grid (excluding booleans handled separately)
  const viewFieldLabels: Record<keyof ModuleFieldsType, string> = {
    slNo: "SL.NO",
    admissionId: "Admission ID",
    patientId: "Patient ID",
    billDate: "Bill Date",
    patientName: "Patient Name",
    dateOfBirth: "Date of Birth",
    address: "Address",
    sex: "Sex",
    doctorName: "Doctor Name",
    image: "Patient Image",
    admissionDate: "Admission Date",
    packageName: "Package Name",
    totalDays: "Total Days",
    dischargeDate: "Discharge Date",
    insuranceName: "Insurance Name",
    policyNo: "Policy No.",
    serviceName: "Service Name",
    quantity: "Quantity",
    rate: "Rate",
    subTotal: "Sub Total",
    paymentMethod: "Payment Method",
    cardChequeNo: "Card/Cheque No.",
    receiptNo: "Receipt No.",
    assignDate: "Assign Date",
    bedNumber: "Bed Number",
    amount: "Amount",
    notes: "Notes",
  };

  const excludedKeysForLoop = new Set([
    "slNo", // update it
    "isDefault",
    "isActive",
    "isDraft",
    "isDeleted",
  ]);

  const formatValue = (value: any) => {
    if (value instanceof Date) return value.toLocaleString();
    if (Array.isArray(value)) return value.join(", ");
    if (typeof value === "boolean") return value ? "Yes" : "No";
    return value;
  };

  const handleExportPDF = async () => {
    console.log("Export PDF clicked");
    try {
      console.log("pdf click", billData);
      const blob = await pdf(
        <GenericPDF
          data={[billData]}
          title={`${location.pathname.split("/")[1]} Details`}
          subtitle={`${location.pathname.split("/")[1]} Information`}
        />
      ).toBlob();

      console.log("blob", blob);

      const url = URL.createObjectURL(blob);
      console.log("url", url);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${location.pathname.split("/")[1]}-details.pdf`;
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
    if (!date) return "-";

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

  return (
    <>
      <PageLayout
        title={`Viewing ${location.pathname.split("/")[1]}`}
        videoSrc={video}
        videoHeader="Tutorial video"
        onListClick={() => navigate(`/${location.pathname.split("/")[1]}`)}
        listText="List"
        listPath={location.pathname.split("/")[1]}
        activePage="view"
        popoverOptions={[
          {
            label: "Create",
            icon: <Plus className="w-5 h-5 text-green-600" />,
            onClick: () =>
              navigate(`/${location.pathname.split("/")[1]}/create`),
          },
          {
            label: "Edit",
            icon: <Edit className="w-5 h-5 text-blue-600" />,
            onClick: () =>
              navigate(`/${location.pathname.split("/")[1]}/edit/1`),
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
                  handlePrintBill(billData);
                }
              }
            : undefined
        }
      >
        <div dir={isRTL ? "rtl" : "ltr"}>
          {/* Row 1: Visit Selection, Visit Details */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            {fieldPermissions.slNo && (
              <div className="mt-1">
                <Autocomplete
                  options={autocompleteDataDetailsPage}
                  value={selectedVisit}
                  onValueChange={setSelectedVisit}
                  placeholder=" "
                  displayKey="name"
                  valueKey="name"
                  searchKey="name"
                  disabled={false}
                  className="w-[96%] bg-gray-100 rounded-xl"
                  labelClassName="bg-gray-50 rounded-2xl"
                  labelText="Select Service"
                  inputClassName="border-none bg-stone-50 focus-visible:ring-offset-0 focus-visible:ring-0 focus-visible:border-2! focus-visible:border-blue-500"
                />
              </div>
            )}

            {Object.entries(viewFieldLabels)
              .filter(([key]) => !excludedKeysForLoop.has(key))
              .map(([key, label]) =>
                fieldPermissions[key as keyof DetailsPageTypes] ? (
                  <FieldSection
                    key={key}
                    label={label}
                    value={formatValue((billData as any)[key])}
                  />
                ) : null
              )}

            {fieldPermissions.isActive && (
              <div className="flex flex-col">
                <div className="">
                  <span className="text-[15px] text-gray-600">Active</span>
                </div>
                <div className="">
                  {billData.isActive ? (
                    <span className="font-bold text-[15px]">Yes</span>
                  ) : (
                    <span className="font-bold text-[15px]">No</span>
                  )}
                </div>
              </div>
            )}
            {fieldPermissions.isDraft && (
              <div className="flex flex-col">
                <div className="">
                  <span className="text-[15px] text-gray-600">Draft</span>
                </div>
                <div className="">
                  {billData.isDraft ? (
                    <span className="text-orange-600 font-bold text-[15px]">
                      Yes
                    </span>
                  ) : (
                    <span className="text-black font-bold text-[15px]">No</span>
                  )}
                </div>
              </div>
            )}
            {fieldPermissions.isDeleted && (
              <div className="flex flex-col">
                <div className="">
                  <span className="text-[15px] text-gray-600">Deleted</span>
                </div>
                <div className="">
                  {billData.isDeleted ? (
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
          created: getRelativeTime(billData.createdAt),
          updated: getRelativeTime(billData.updatedAt),
          drafted: getRelativeTime(billData.draftedAt),
          deleted: getRelativeTime(billData.deletedAt),
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
