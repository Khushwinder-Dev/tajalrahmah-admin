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
  propertyCode: string;
  propertyName: string;
  group: string;
  propertyType: string;
  propertyStyle: string;
  transactionType: string;

  sellingPrice: string;
  propertyNumber?: string;
  propertyCondition: string;
  newConstruction: string;
  yearBuilt?: string;
  availabilityDate?: string; // ISO date string

  lotSizeSqm?: string;
  totalFloors?: string;
  energyEfficiency?: string;
  gasEmission?: string;
  energyEfficient?: string;

  building?: string;
  streetNumber?: string;
  streetName?: string;
  streetType?: string;
  zone?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  areaNumber?: string;
  country: string;
  latitude?: string;
  longitude?: string;

  nearestHospital?: string;
  nearestSchool?: string;
  nearestLandmark?: string;
  description?: string;

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
  propertyCode: "P-001",
  propertyName: "Sunrise Villa",
  group: "Residential",
  propertyType: "Villa",
  propertyStyle: "Modern",
  transactionType: "Sale",

  sellingPrice: "250000",
  propertyNumber: "SV-101",
  propertyCondition: "Excellent",
  newConstruction: "Yes",
  yearBuilt: "2023",
  availabilityDate: "2025-09-01",

  lotSizeSqm: "450",
  totalFloors: "2",
  energyEfficiency: "A+",
  gasEmission: "Low",
  energyEfficient: "Yes",

  building: "Sunrise Complex",
  streetNumber: "12B",
  streetName: "Lakeview",
  streetType: "Road",
  zone: "Zone-5",
  city: "Dhaka",
  state: "Dhaka Division",
  zipCode: "1207",
  areaNumber: "A-21",
  country: "Bangladesh",
  latitude: "23.8103",
  longitude: "90.4125",

  nearestHospital: "City Care Hospital",
  nearestSchool: "Green Field School",
  nearestLandmark: "Central Park",
  description:
    "A beautiful modern villa with lake view, fully furnished, and ready to move in.",

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
const projectTypeOptions = ["P-001", "P-002", "P-003"];

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

export default function PropertyDetails() {
  const navigate = useNavigate();
  const { isRTL } = useSelector((state: RootState) => state.language);

  const [keepChanges, setKeepChanges] = useState(false);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [selectedLeaveType, setSelectedLeaveType] = useState("P-001");
  const location = useLocation();
  const isViewPage = location.pathname.includes("/view");
  const [pdfChecked, setPdfChecked] = useState(false);
  const [printEnabled, setPrintEnabled] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  // get permission
  const canCreate: boolean = usePermission("property", "create");
  const canView: boolean = usePermission("property", "view");
  const canEdit: boolean = usePermission("property", "edit");
  const canDelete: boolean = usePermission("property", "delete");
  const canExport: boolean = usePermission("property", "export");
  const canPdf: boolean = usePermission("property", "pdf");
  const canPrint: boolean = usePermission("property", "print");
  const canSeeHistory: boolean = usePermission("property", "history");

  // Field-level permissions

  const propertyCode: boolean = usePermission(
    "property",
    "view",
    "propertyCode"
  );
  const propertyName: boolean = usePermission(
    "property",
    "view",
    "propertyName"
  );
  const group: boolean = usePermission("property", "view", "group");
  const propertyType: boolean = usePermission(
    "property",
    "view",
    "propertyType"
  );
  const propertyStyle: boolean = usePermission(
    "property",
    "view",
    "propertyStyle"
  );
  const transactionType: boolean = usePermission(
    "property",
    "view",
    "transactionType"
  );

  const sellingPrice: boolean = usePermission(
    "property",
    "view",
    "sellingPrice"
  );
  const propertyNumber: boolean = usePermission(
    "property",
    "view",
    "propertyNumber"
  );
  const propertyCondition: boolean = usePermission(
    "property",
    "view",
    "propertyCondition"
  );
  const newConstruction: boolean = usePermission(
    "property",
    "view",
    "newConstruction"
  );
  const yearBuilt: boolean = usePermission("property", "view", "yearBuilt");
  const availabilityDate: boolean = usePermission(
    "property",
    "view",
    "availabilityDate"
  );

  const lotSizeSqm: boolean = usePermission("property", "view", "lotSizeSqm");
  const totalFloors: boolean = usePermission("property", "view", "totalFloors");
  const energyEfficiency: boolean = usePermission(
    "property",
    "view",
    "energyEfficiency"
  );
  const gasEmission: boolean = usePermission("property", "view", "gasEmission");
  const energyEfficient: boolean = usePermission(
    "property",
    "view",
    "energyEfficient"
  );

  const building: boolean = usePermission("property", "view", "building");
  const streetNumber: boolean = usePermission(
    "property",
    "view",
    "streetNumber"
  );
  const streetName: boolean = usePermission("property", "view", "streetName");
  const streetType: boolean = usePermission("property", "view", "streetType");
  const zone: boolean = usePermission("property", "view", "zone");
  const city: boolean = usePermission("property", "view", "city");
  const state: boolean = usePermission("property", "view", "state");
  const zipCode: boolean = usePermission("property", "view", "zipCode");
  const areaNumber: boolean = usePermission("property", "view", "areaNumber");
  const country: boolean = usePermission("property", "view", "country");
  const latitude: boolean = usePermission("property", "view", "latitude");
  const longitude: boolean = usePermission("property", "view", "longitude");

  const nearestHospital: boolean = usePermission(
    "property",
    "view",
    "nearestHospital"
  );
  const nearestSchool: boolean = usePermission(
    "property",
    "view",
    "nearestSchool"
  );
  const nearestLandmark: boolean = usePermission(
    "property",
    "view",
    "nearestLandmark"
  );
  const description: boolean = usePermission("property", "view", "description");

  const canViewIsActive: boolean = usePermission(
    "property",
    "view",
    "isActive"
  );
  const canViewIsDraft: boolean = usePermission("property", "view", "isDraft");
  const canViewIsDeleted: boolean = usePermission(
    "property",
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
      "P-001": initialData,
      "P-002": initialData,
      "P-003": initialData,
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
        title: "Property Details",
        data: [leavesData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          propertyCode: "Property Code",
          propertyName: "Property Name",
          group: "Group",
          propertyType: "Property Type",
          propertyStyle: "Property Style",
          transactionType: "Transaction Type",
          sellingPrice: "Selling Price",
          propertyNumber: "Property Number",
          propertyCondition: "Property Condition",
          newConstruction: "New Construction",
          yearBuilt: "Year Built",
          availabilityDate: "Availability Date",
          lotSizeSqm: "Lot Size (sqm)",
          totalFloors: "Total Floors",
          energyEfficiency: "Energy Efficiency",
          gasEmission: "Gas Emission",
          energyEfficient: "Energy Efficient",
          building: "Building",
          streetNumber: "Street Number",
          streetName: "Street Name",
          streetType: "Street Type",
          zone: "Zone",
          city: "City",
          state: "State",
          zipCode: "Zip Code",
          areaNumber: "Area Number",
          country: "Country",
          latitude: "Latitude",
          longitude: "Longitude",
          nearestHospital: "Nearest Hospital",
          nearestSchool: "Nearest School",
          nearestLandmark: "Nearest Landmark",
          description: "Description",
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
          title="Property Details"
          subtitle="Property Information"
        />
      ).toBlob();

      console.log("blob", blob);

      const url = URL.createObjectURL(blob);
      console.log("url", url);
      const a = document.createElement("a");
      a.href = url;
      a.download = "property-details.pdf";
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
        title="Viewing Property"
        videoSrc={video}
        videoHeader="Tutorial video"
        onListClick={() => navigate("/property")}
        listText="List"
        listPath="property"
        activePage="view"
        popoverOptions={[
          {
            label: "Create",
            icon: <Plus className="w-5 h-5 text-green-600" />,
            onClick: () => navigate("/property/create"),
          },
          {
            label: "Edit",
            icon: <Edit className="w-5 h-5 text-blue-600" />,
            onClick: () => navigate("/property/edit/1"),
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
            {propertyCode && (
              <div className="mt-1">
                <Autocomplete
                  options={projectTypeOptions}
                  value={selectedLeaveType}
                  onValueChange={setSelectedLeaveType}
                  placeholder=" "
                  displayKey="propertyCode"
                  valueKey="propertyCode"
                  searchKey="propertyCode"
                  disabled={false}
                  className="w-[96%] bg-gray-100 rounded-xl"
                  labelClassName="bg-gray-50 rounded-2xl"
                  labelText="Property Code"
                  inputClassName="border-none bg-stone-50 focus-visible:ring-offset-0 focus-visible:ring-0 focus-visible:border-2! focus-visible:border-blue-500"
                />
              </div>
            )}
            {propertyName && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">
                  Property Name
                </h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(leavesData.propertyName)}
                </div>
              </div>
            )}
            {group && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Group</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(leavesData.group)}
                </div>
              </div>
            )}
            {propertyType && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">
                  Property Type
                </h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(leavesData.propertyType)}
                </div>
              </div>
            )}
            {propertyStyle && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">
                  Property Style
                </h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(leavesData.propertyStyle)}
                </div>
              </div>
            )}
            {transactionType && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">
                  Transaction Type
                </h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(leavesData.transactionType)}
                </div>
              </div>
            )}
            {sellingPrice && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">
                  Selling Price
                </h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(leavesData.sellingPrice)}
                </div>
              </div>
            )}
            {propertyNumber && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">
                  Property Number
                </h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(leavesData.propertyNumber)}
                </div>
              </div>
            )}
            {propertyCondition && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">
                  Property Condition
                </h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(leavesData.propertyCondition)}
                </div>
              </div>
            )}
            {newConstruction && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">
                  New Construction
                </h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(leavesData.newConstruction)}
                </div>
              </div>
            )}
            {yearBuilt && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Year Built</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(leavesData.yearBuilt)}
                </div>
              </div>
            )}
            {availabilityDate && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">
                  Availability Date
                </h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(leavesData.availabilityDate)}
                </div>
              </div>
            )}
            {lotSizeSqm && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">
                  Lot Size (Sqm)
                </h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(leavesData.lotSizeSqm)}
                </div>
              </div>
            )}
            {totalFloors && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Total Floors</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(leavesData.totalFloors)}
                </div>
              </div>
            )}
            {energyEfficiency && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">
                  Energy Efficiency
                </h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(leavesData.energyEfficiency)}
                </div>
              </div>
            )}
            {gasEmission && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Gas Emission</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(leavesData.gasEmission)}
                </div>
              </div>
            )}
            {energyEfficient && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">
                  Energy Efficient
                </h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(leavesData.energyEfficient)}
                </div>
              </div>
            )}
            {energyEfficient && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">
                  Energy Efficient
                </h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(leavesData.energyEfficient)}
                </div>
              </div>
            )}
            {building && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Building</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(leavesData.building)}
                </div>
              </div>
            )}
            {streetNumber && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">
                  Street Number
                </h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(leavesData.streetNumber)}
                </div>
              </div>
            )}
            {streetName && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Street Name</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(leavesData.streetName)}
                </div>
              </div>
            )}
            {streetType && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Street Type</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(leavesData.streetType)}
                </div>
              </div>
            )}
            {zone && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Zone</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(leavesData.zone)}
                </div>
              </div>
            )}
            {city && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">City</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(leavesData.city)}
                </div>
              </div>
            )}
            {state && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">State</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(leavesData.state)}
                </div>
              </div>
            )}
            {zipCode && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Zip Code</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(leavesData.zipCode)}
                </div>
              </div>
            )}
            {areaNumber && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Area Number</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(leavesData.areaNumber)}
                </div>
              </div>
            )}
            {country && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Country</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(leavesData.country)}
                </div>
              </div>
            )}
            {latitude && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Latitude</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(leavesData.latitude)}
                </div>
              </div>
            )}
            {longitude && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Longitude</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(leavesData.longitude)}
                </div>
              </div>
            )}
            {nearestHospital && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">
                  Nearest Hospital
                </h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(leavesData.nearestHospital)}
                </div>
              </div>
            )}
            {nearestSchool && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">
                  Nearest School
                </h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(leavesData.nearestSchool)}
                </div>
              </div>
            )}
            {nearestLandmark && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">
                  Nearest Landmark
                </h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(leavesData.nearestLandmark)}
                </div>
              </div>
            )}
            {description && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Description</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(leavesData.description)}
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
