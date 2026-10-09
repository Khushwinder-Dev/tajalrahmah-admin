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
  "john.doe@email.com",
  "sarah.smith@email.com",
  "mike.johnson@email.com",
  "emily.davis@email.com",
  "robert.wilson@email.com",
  "lisa.brown@email.com",
  "david.miller@email.com",
  "jessica.garcia@email.com",
  "andrew.taylor@email.com",
  "maria.anderson@email.com",
  "kevin.thomas@email.com",
  "jennifer.white@email.com",
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

export default function EnquiryDetails() {
  const navigate = useNavigate();
  const { isRTL } = useSelector((state: RootState) => state.language);

  const location = useLocation();
  const detectedModule = getModuleFromPath(location.pathname);

  const [keepChanges, setKeepChanges] = useState(false);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [selectedEnquiry, setSelectedEnquiry] = useState(
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

  // Get enquiry data based on selected email
  const getEnquiryData = (emailAddress: string): DetailsPageTypes => {
    const enquiryMap: Record<string, DetailsPageTypes> = {
      "john.doe@email.com": {
        ...initialData,
        emailAddress: "john.doe@email.com",
        fullName: "John Doe",
        phoneNo: "+1-555-0123",
        enquiry: "Interested in cardiac consultation services",
        readStatus: "Read",
      },
      "sarah.smith@email.com": {
        ...initialData,
        emailAddress: "sarah.smith@email.com",
        fullName: "Sarah Smith",
        phoneNo: "+1-555-0456",
        enquiry: "Asking about orthopedic surgery options",
        readStatus: "Unread",
      },
      "mike.johnson@email.com": {
        ...initialData,
        emailAddress: "mike.johnson@email.com",
        fullName: "Mike Johnson",
        phoneNo: "+1-555-0789",
        enquiry: "Need information about neurological treatments",
        readStatus: "Read",
      },
      "emily.davis@email.com": {
        ...initialData,
        emailAddress: "emily.davis@email.com",
        fullName: "Emily Davis",
        phoneNo: "+1-555-0321",
        enquiry: "Dermatology appointment availability",
        readStatus: "Unread",
      },
      "robert.wilson@email.com": {
        ...initialData,
        emailAddress: "robert.wilson@email.com",
        fullName: "Robert Wilson",
        phoneNo: "+1-555-0654",
        enquiry: "Pediatric checkup and vaccination schedule",
        readStatus: "Read",
      },
      "lisa.brown@email.com": {
        ...initialData,
        emailAddress: "lisa.brown@email.com",
        fullName: "Lisa Brown",
        phoneNo: "+1-555-0987",
        enquiry: "General medicine consultation inquiry",
        readStatus: "Read",
      },
      "david.miller@email.com": {
        ...initialData,
        emailAddress: "david.miller@email.com",
        fullName: "David Miller",
        phoneNo: "+1-555-0111",
        enquiry: "ENT specialist appointment request",
        readStatus: "Unread",
      },
      "jessica.garcia@email.com": {
        ...initialData,
        emailAddress: "jessica.garcia@email.com",
        fullName: "Jessica Garcia",
        phoneNo: "+1-555-0222",
        enquiry: "Eye examination and vision test",
        readStatus: "Read",
      },
      "andrew.taylor@email.com": {
        ...initialData,
        emailAddress: "andrew.taylor@email.com",
        fullName: "Andrew Taylor",
        phoneNo: "+1-555-0333",
        enquiry: "Mental health consultation needed",
        readStatus: "Unread",
      },
      "maria.anderson@email.com": {
        ...initialData,
        emailAddress: "maria.anderson@email.com",
        fullName: "Maria Anderson",
        phoneNo: "+1-555-0444",
        enquiry: "Women's health checkup appointment",
        readStatus: "Read",
      },
      "kevin.thomas@email.com": {
        ...initialData,
        emailAddress: "kevin.thomas@email.com",
        fullName: "Kevin Thomas",
        phoneNo: "+1-555-0555",
        enquiry: "Cardiac health screening inquiry",
        readStatus: "Read",
      },
      "jennifer.white@email.com": {
        ...initialData,
        emailAddress: "jennifer.white@email.com",
        fullName: "Jennifer White",
        phoneNo: "+1-555-0666",
        enquiry: "Physical therapy consultation request",
        readStatus: "Unread",
      },
    };

    return enquiryMap[emailAddress] || initialData;
  };

  const [enquiryData, setEnquiryData] = useState<DetailsPageTypes>(
    getEnquiryData(selectedEnquiry)
  );

  const inputRef = useRef<HTMLInputElement>(null);

  // Update enquiry data when selection changes
  useEffect(() => {
    setEnquiryData(getEnquiryData(selectedEnquiry));
  }, [selectedEnquiry]);

  // Focus input when dropdown opens
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    console.log("isViewPage", isViewPage);
  }, []);

  const handlePrintEnquiry = (enquiryData: any) => {
    try {
      const html = PrintCommonLayout({
        title: `${location.pathname.split("/")[1]} Details`,
        data: [enquiryData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          ...printConfigFieldLabels,

          isDefault: "Default Enquiry",
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
    emailAddress: "Email Address",
    fullName: "Full Name",
    phoneNo: "Phone No",
    enquiry: "Enquiry",
    readStatus: "Read/Unread",
  };

  const excludedKeysForLoop = new Set([
    "emailAddress", // handled separately in autocomplete
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
      console.log("pdf click", enquiryData);
      const blob = await pdf(
        <GenericPDF
          data={[enquiryData]}
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
                  handlePrintEnquiry(enquiryData);
                }
              }
            : undefined
        }
      >
        <div dir={isRTL ? "rtl" : "ltr"}>
          {/* Row 1: Email Selection, Enquiry Details */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            {fieldPermissions.emailAddress && (
              <div className="mt-1">
                <Autocomplete
                  options={autocompleteDataDetailsPage}
                  value={selectedEnquiry}
                  onValueChange={setSelectedEnquiry}
                  placeholder=" "
                  displayKey="name"
                  valueKey="name"
                  searchKey="name"
                  disabled={false}
                  className="w-[96%] bg-gray-100 rounded-xl"
                  labelClassName="bg-gray-50 rounded-2xl"
                  labelText="Email Address"
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
                    value={formatValue((enquiryData as any)[key])}
                  />
                ) : null
              )}

            {fieldPermissions.isActive && (
              <div className="flex flex-col">
                <div className="">
                  <span className="text-[15px] text-gray-600">Active</span>
                </div>
                <div className="">
                  {enquiryData.isActive ? (
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
                  {enquiryData.isDraft ? (
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
                  {enquiryData.isDeleted ? (
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
          created: getRelativeTime(enquiryData.createdAt),
          updated: getRelativeTime(enquiryData.updatedAt),
          drafted: getRelativeTime(enquiryData.draftedAt),
          deleted: getRelativeTime(enquiryData.deletedAt),
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
