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
  "Basic Package",
  "Premium Package",
  "Deluxe Package",
  "Family Package",
  "Corporate Package",
  "Weekend Special",
  "Student Package",
  "VIP Package",
  "Group Package",
  "Romantic Package",
  "Business Lunch",
  "Celebration Package",
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

export default function DoctorDetails() {
  const navigate = useNavigate();
  const { isRTL } = useSelector((state: RootState) => state.language);

  const location = useLocation();
  const detectedModule = getModuleFromPath(location.pathname);

  const [keepChanges, setKeepChanges] = useState(false);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(
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

  // Get package data based on selected package
  const getPackageData = (packageName: string): DetailsPageTypes => {
    const packageMap: Record<string, DetailsPageTypes> = {
      "Basic Package": {
        ...initialData,
        packageName: "Basic Package",
        description: "Essential services package",
        packageIncluding: "Food, Drinks, Service",
        service: "Table Service",
        quantity: "1",
        rate: "500.00",
        discount: "10%",
        status: "Active",
      },
      "Premium Package": {
        ...initialData,
        packageName: "Premium Package",
        description: "Premium services with extra features",
        packageIncluding: "Food, Drinks, Service, Entertainment",
        service: "Full Service",
        quantity: "1",
        rate: "800.00",
        discount: "15%",
        status: "Active",
      },
      "Deluxe Package": {
        ...initialData,
        packageName: "Deluxe Package",
        description: "Luxury package with all amenities",
        packageIncluding: "Food, Drinks, Service, Entertainment, VIP",
        service: "VIP Service",
        quantity: "1",
        rate: "1200.00",
        discount: "20%",
        status: "Active",
      },
      "Family Package": {
        ...initialData,
        packageName: "Family Package",
        description: "Family-friendly package deal",
        packageIncluding: "Food, Drinks, Kids Menu",
        service: "Family Service",
        quantity: "4",
        rate: "1500.00",
        discount: "25%",
        status: "Draft",
      },
      "Corporate Package": {
        ...initialData,
        packageName: "Corporate Package",
        description: "Business meeting package",
        packageIncluding: "Food, Drinks, Meeting Room",
        service: "Corporate Service",
        quantity: "10",
        rate: "2000.00",
        discount: "30%",
        status: "Active",
      },
      "Weekend Special": {
        ...initialData,
        packageName: "Weekend Special",
        description: "Special weekend package",
        packageIncluding: "Food, Drinks, Live Music",
        service: "Premium Service",
        quantity: "2",
        rate: "900.00",
        discount: "12%",
        status: "Active",
      },
      "Student Package": {
        ...initialData,
        packageName: "Student Package",
        description: "Affordable package for students",
        packageIncluding: "Food, Drinks",
        service: "Basic Service",
        quantity: "1",
        rate: "300.00",
        discount: "20%",
        status: "Active",
      },
      "VIP Package": {
        ...initialData,
        packageName: "VIP Package",
        description: "Exclusive VIP experience",
        packageIncluding: "Food, Drinks, Private Room, Butler",
        service: "VIP Butler Service",
        quantity: "1",
        rate: "2500.00",
        discount: "15%",
        status: "Active",
      },
      "Group Package": {
        ...initialData,
        packageName: "Group Package",
        description: "Large group dining package",
        packageIncluding: "Food, Drinks, Group Activities",
        service: "Group Service",
        quantity: "15",
        rate: "3000.00",
        discount: "35%",
        status: "Active",
      },
      "Romantic Package": {
        ...initialData,
        packageName: "Romantic Package",
        description: "Couple's romantic dining experience",
        packageIncluding: "Food, Drinks, Candlelight, Music",
        service: "Romantic Service",
        quantity: "2",
        rate: "750.00",
        discount: "18%",
        status: "Active",
      },
      "Business Lunch": {
        ...initialData,
        packageName: "Business Lunch",
        description: "Professional business lunch package",
        packageIncluding: "Food, Drinks, Quiet Environment",
        service: "Professional Service",
        quantity: "4",
        rate: "600.00",
        discount: "10%",
        status: "Active",
      },
      "Celebration Package": {
        ...initialData,
        packageName: "Celebration Package",
        description: "Special celebration package",
        packageIncluding: "Food, Drinks, Decorations, Cake",
        service: "Celebration Service",
        quantity: "8",
        rate: "1800.00",
        discount: "25%",
        status: "Active",
      },
    };

    return packageMap[packageName] || initialData;
  };

  const [packageData, setPackageData] = useState<DetailsPageTypes>(
    getPackageData(selectedPackage)
  );

  const inputRef = useRef<HTMLInputElement>(null);

  // Update package data when selection changes
  useEffect(() => {
    setPackageData(getPackageData(selectedPackage));
  }, [selectedPackage]);

  // Focus input when dropdown opens
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    console.log("isViewPage", isViewPage);
  }, []);

  const handlePrintPackage = (packageData: any) => {
    try {
      const html = PrintCommonLayout({
        title: `${location.pathname.split("/")[1]} Details`,
        data: [packageData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          ...printConfigFieldLabels,

          isDefault: "Default Package",
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
    packageName: "Package Name",
    description: "Description",
    packageIncluding: "Package Including",
    service: "Service",
    quantity: "Quantity",
    rate: "Rate",
    discount: "Discount",
    status: "Status",
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
      console.log("pdf click", packageData);
      const blob = await pdf(
        <GenericPDF
          data={[packageData]}
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
                  handlePrintPackage(packageData);
                }
              }
            : undefined
        }
      >
        <div dir={isRTL ? "rtl" : "ltr"}>
          {/* Row 1: Package Selection, Package Details */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            {fieldPermissions.slNo && (
              <div className="mt-1">
                <Autocomplete
                  options={autocompleteDataDetailsPage}
                  value={selectedPackage}
                  onValueChange={setSelectedPackage}
                  placeholder=" "
                  displayKey="name"
                  valueKey="name"
                  searchKey="name"
                  disabled={false}
                  className="w-[96%] bg-gray-100 rounded-xl"
                  labelClassName="bg-gray-50 rounded-2xl"
                  labelText="Package Name"
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
                    value={formatValue((packageData as any)[key])}
                  />
                ) : null
              )}

            {fieldPermissions.isActive && (
              <div className="flex flex-col">
                <div className="">
                  <span className="text-[15px] text-gray-600">Active</span>
                </div>
                <div className="">
                  {packageData.isActive ? (
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
                  {packageData.isDraft ? (
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
                  {packageData.isDeleted ? (
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
          created: getRelativeTime(packageData.createdAt),
          updated: getRelativeTime(packageData.updatedAt),
          drafted: getRelativeTime(packageData.draftedAt),
          deleted: getRelativeTime(packageData.deletedAt),
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
