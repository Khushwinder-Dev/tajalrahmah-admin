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
  code: string;
  ownerName: string;
  vatNumber: string;
  email: string;
  phoneNumber: string;
  website: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  profileImage: string;

  facebookUrl?: string;
  instagramUrl?: string;
  whatsappUrl?: string;

  billingStreet: string;
  billingCity: string;
  billingState: string;
  billingZipCode: string;
  billingCountry: string;

  shippingStreet: string;
  shippingCity: string;
  shippingState: string;
  shippingZipCode: string;
  shippingCountry: string;

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
  code: "PRJ-001",
  ownerName: "Ant Man",
  vatNumber: "VAT123456",
  email: "antman@example.com",
  phoneNumber: "+8801700000000",
  website: "https://example.com",
  address: "123 Green Road",
  city: "Dhaka",
  state: "Dhaka Division",
  zipCode: "1205",
  country: "Bangladesh",
  profileImage: "/customer-dummy-image.jpg",

  facebookUrl: "https://facebook.com",
  instagramUrl: "https://instagram.com",
  whatsappUrl: "https://whatsapp.com",

  billingStreet: "123 Billing Road",
  billingCity: "Dhaka",
  billingState: "Dhaka Division",
  billingZipCode: "1206",
  billingCountry: "Bangladesh",

  shippingStreet: "456 Shipping Lane",
  shippingCity: "Chittagong",
  shippingState: "Chittagong Division",
  shippingZipCode: "4000",
  shippingCountry: "Bangladesh",

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
const projectTypeOptions = ["Ant Man", "Siraj Uddulah", "Someone"];

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

export default function PropertyOwnerDetails() {
  const navigate = useNavigate();
  const { isRTL } = useSelector((state: RootState) => state.language);

  const [keepChanges, setKeepChanges] = useState(false);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [selectedLeaveType, setSelectedLeaveType] = useState("Ant Man");
  const location = useLocation();
  const isViewPage = location.pathname.includes("/view");
  const [pdfChecked, setPdfChecked] = useState(false);
  const [printEnabled, setPrintEnabled] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  // get permission
  const canCreate: boolean = usePermission("propertyOwner", "create");
  const canView: boolean = usePermission("propertyOwner", "view");
  const canEdit: boolean = usePermission("propertyOwner", "edit");
  const canDelete: boolean = usePermission("propertyOwner", "delete");
  const canExport: boolean = usePermission("propertyOwner", "export");
  const canPdf: boolean = usePermission("propertyOwner", "pdf");
  const canPrint: boolean = usePermission("propertyOwner", "print");
  const canSeeHistory: boolean = usePermission("propertyOwner", "history");

  // Field-level permissions

  // Field-level permissions
  const permissionsFields = usePermission<keyof TermsData>(
    "propertyOwner",
    "view",
    [
      "code",
      "ownerName",
      "vatNumber",
      "email",
      "phoneNumber",
      "website",
      "address",
      "city",
      "state",
      "zipCode",
      "country",
      "profileImage",
      "facebookUrl",
      "instagramUrl",
      "whatsappUrl",
      "billingStreet",
      "billingCity",
      "billingState",
      "billingZipCode",
      "billingCountry",
      "shippingStreet",
      "shippingCity",
      "shippingState",
      "shippingZipCode",
      "shippingCountry",

      "isDefault",
      "createdAt",
      "draftedAt",
      "updatedAt",
      "deletedAt",
      "isDeleted",
      "isActive",
      "isDraft",
    ]
  );

  console.log("canCreate", canCreate);
  console.log("canView", canView);
  console.log("canEdit", canEdit);
  console.log("canDelete", canDelete);
  console.log("canExport", canExport);

  // Get leaves data based on selected leave type
  const getLeavesData = (leaveType: string): TermsData => {
    const leavesMap: Record<string, TermsData> = {
      "Ant Man": initialData,
      "Siraj Uddulah": initialData,
      Someone: initialData,
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
        title: "Property Owner Details",
        data: [leavesData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          ownerName: "Owner Name",
          vatNumber: "VAT Number",
          email: "Email",
          phoneNumber: "Phone Number",
          website: "Website",
          address: "Address",
          city: "City",
          state: "State",
          zipCode: "Zip Code",
          country: "Country",
          profileImage: "Profile Image",
          facebookUrl: "Facebook URL",
          instagramUrl: "Instagram URL",
          whatsappUrl: "WhatsApp URL",
          billingStreet: "Billing Street",
          billingCity: "Billing City",
          billingState: "Billing State",
          billingZipCode: "Billing Zip Code",
          billingCountry: "Billing Country",
          shippingStreet: "Shipping Street",
          shippingCity: "Shipping City",
          shippingState: "Shipping State",
          shippingZipCode: "Shipping Zip Code",
          shippingCountry: "Shipping Country",
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
          title="Property Owner Details"
          subtitle="Property Owner Information"
        />
      ).toBlob();

      console.log("blob", blob);

      const url = URL.createObjectURL(blob);
      console.log("url", url);
      const a = document.createElement("a");
      a.href = url;
      a.download = "property-owner-details.pdf";
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
        title="Viewing Property Owner"
        videoSrc={video}
        videoHeader="Tutorial video"
        onListClick={() => navigate("/property-owner")}
        listText="List"
        listPath="property-owner"
        activePage="view"
        popoverOptions={[
          {
            label: "Create",
            icon: <Plus className="w-5 h-5 text-green-600" />,
            onClick: () => navigate("/property-owner/create"),
          },
          {
            label: "Edit",
            icon: <Edit className="w-5 h-5 text-blue-600" />,
            onClick: () => navigate("/property-owner/edit/1"),
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
            {permissionsFields.ownerName && (
              <div className="mt-1">
                <Autocomplete
                  options={projectTypeOptions}
                  value={selectedLeaveType}
                  onValueChange={setSelectedLeaveType}
                  placeholder=" "
                  displayKey="ownerName"
                  valueKey="ownerName"
                  searchKey="ownerName"
                  disabled={false}
                  className="w-[96%] bg-gray-100 rounded-xl"
                  labelClassName="bg-gray-50 rounded-2xl"
                  labelText="Owner Name"
                  inputClassName="border-none bg-stone-50 focus-visible:ring-offset-0 focus-visible:ring-0 focus-visible:border-2! focus-visible:border-blue-500"
                />
              </div>
            )}
            {permissionsFields.code && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Code</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(leavesData.code)}
                </div>
              </div>
            )}
            {permissionsFields.vatNumber && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">VAT Number</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(leavesData.vatNumber)}
                </div>
              </div>
            )}

            {permissionsFields.email && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Email</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(leavesData.email)}
                </div>
              </div>
            )}
            {permissionsFields.phoneNumber && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Phone Number</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(leavesData.phoneNumber)}
                </div>
              </div>
            )}
            {permissionsFields.website && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Website</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(leavesData.website)}
                </div>
              </div>
            )}
            {permissionsFields.address && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Address</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(leavesData.address)}
                </div>
              </div>
            )}
            {permissionsFields.city && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">City</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(leavesData.city)}
                </div>
              </div>
            )}
            {permissionsFields.state && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">State</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(leavesData.state)}
                </div>
              </div>
            )}
            {permissionsFields.zipCode && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Zip Code</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(leavesData.zipCode)}
                </div>
              </div>
            )}
            {permissionsFields.country && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Country</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(leavesData.country)}
                </div>
              </div>
            )}
            {permissionsFields.facebookUrl && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Facebook URL</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(leavesData.facebookUrl)}
                </div>
              </div>
            )}

            {permissionsFields.instagramUrl && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">
                  Instagram URL
                </h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(leavesData.instagramUrl)}
                </div>
              </div>
            )}
            {permissionsFields.whatsappUrl && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">WhatsApp URL</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(leavesData.whatsappUrl)}
                </div>
              </div>
            )}

            {permissionsFields.billingStreet && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">
                  Billing Street
                </h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(leavesData.billingStreet)}
                </div>
              </div>
            )}

            {permissionsFields.billingCity && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Billing City</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(leavesData.billingCity)}
                </div>
              </div>
            )}

            {permissionsFields.billingState && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">
                  Billing State
                </h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(leavesData.billingState)}
                </div>
              </div>
            )}

            {permissionsFields.billingZipCode && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">
                  Billing Zip Code
                </h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(leavesData.billingZipCode)}
                </div>
              </div>
            )}

            {permissionsFields.billingCountry && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">
                  Billing Country
                </h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(leavesData.billingCountry)}
                </div>
              </div>
            )}

            {permissionsFields.shippingStreet && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">
                  Shipping Street
                </h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(leavesData.shippingStreet)}
                </div>
              </div>
            )}

            {permissionsFields.shippingCity && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">
                  Shipping City
                </h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(leavesData.shippingCity)}
                </div>
              </div>
            )}

            {permissionsFields.shippingState && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">
                  Shipping State
                </h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(leavesData.shippingState)}
                </div>
              </div>
            )}

            {permissionsFields.shippingZipCode && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">
                  Shipping Zip Code
                </h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(leavesData.shippingZipCode)}
                </div>
              </div>
            )}

            {permissionsFields.shippingCountry && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">
                  Shipping Country
                </h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(leavesData.shippingCountry)}
                </div>
              </div>
            )}

            {permissionsFields.isActive && (
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
            {permissionsFields.isDraft && (
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
            {permissionsFields.isDeleted && (
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
