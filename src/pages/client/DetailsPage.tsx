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
  "Tech Solutions Inc",
  "Marketing Pro",
  "Digital Agency",
  "Creative Studio",
  "Business Corp",
  "Innovation Labs",
  "Future Tech",
  "Global Services",
  "Smart Solutions",
  "Elite Corp",
  "Prime Industries",
  "NextGen Corp",
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

export default function ClientDetails() {
  const navigate = useNavigate();
  const { isRTL } = useSelector((state: RootState) => state.language);

  const location = useLocation();
  const detectedModule = getModuleFromPath(location.pathname);

  const [keepChanges, setKeepChanges] = useState(false);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(
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

  // Get client data based on selected company
  const getClientData = (company: string): DetailsPageTypes => {
    const clientMap: Record<string, DetailsPageTypes> = {
      "Tech Solutions Inc": {
        ...initialData,
        firstName: "John",
        lastName: "Doe",
        companyName: "Tech Solutions Inc",
        email: "john.doe@techsolutions.com",
        mobile: "+1234567890",
        password: "password123",
        confirmPassword: "password123",
      },
      "Marketing Pro": {
        ...initialData,
        firstName: "Jane",
        lastName: "Smith",
        companyName: "Marketing Pro",
        email: "jane.smith@marketingpro.com",
        mobile: "+1234567891",
        password: "password456",
        confirmPassword: "password456",
      },
      "Digital Agency": {
        ...initialData,
        firstName: "Mike",
        lastName: "Johnson",
        companyName: "Digital Agency",
        email: "mike.johnson@digitalagency.com",
        mobile: "+1234567892",
        password: "password789",
        confirmPassword: "password789",
      },
      "Creative Studio": {
        ...initialData,
        firstName: "Sarah",
        lastName: "Wilson",
        companyName: "Creative Studio",
        email: "sarah.wilson@creativestudio.com",
        mobile: "+1234567893",
        password: "password101",
        confirmPassword: "password101",
      },
      "Business Corp": {
        ...initialData,
        firstName: "David",
        lastName: "Brown",
        companyName: "Business Corp",
        email: "david.brown@businesscorp.com",
        mobile: "+1234567894",
        password: "password202",
        confirmPassword: "password202",
      },
      "Innovation Labs": {
        ...initialData,
        firstName: "Emma",
        lastName: "Davis",
        companyName: "Innovation Labs",
        email: "emma.davis@innovationlabs.com",
        mobile: "+1234567895",
        password: "password303",
        confirmPassword: "password303",
      },
      "Future Tech": {
        ...initialData,
        firstName: "Alex",
        lastName: "Miller",
        companyName: "Future Tech",
        email: "alex.miller@futuretech.com",
        mobile: "+1234567896",
        password: "password404",
        confirmPassword: "password404",
      },
      "Global Services": {
        ...initialData,
        firstName: "Lisa",
        lastName: "Garcia",
        companyName: "Global Services",
        email: "lisa.garcia@globalservices.com",
        mobile: "+1234567897",
        password: "password505",
        confirmPassword: "password505",
      },
      "Smart Solutions": {
        ...initialData,
        firstName: "Tom",
        lastName: "Anderson",
        companyName: "Smart Solutions",
        email: "tom.anderson@smartsolutions.com",
        mobile: "+1234567898",
        password: "password606",
        confirmPassword: "password606",
      },
      "Elite Corp": {
        ...initialData,
        firstName: "Maria",
        lastName: "Rodriguez",
        companyName: "Elite Corp",
        email: "maria.rodriguez@elitecorp.com",
        mobile: "+1234567899",
        password: "password707",
        confirmPassword: "password707",
      },
      "Prime Industries": {
        ...initialData,
        firstName: "Chris",
        lastName: "Martinez",
        companyName: "Prime Industries",
        email: "chris.martinez@primeindustries.com",
        mobile: "+1234567800",
        password: "password808",
        confirmPassword: "password808",
      },
      "NextGen Corp": {
        ...initialData,
        firstName: "Anna",
        lastName: "Taylor",
        companyName: "NextGen Corp",
        email: "anna.taylor@nextgencorp.com",
        mobile: "+1234567801",
        password: "password909",
        confirmPassword: "password909",
      },
    };

    return clientMap[company] || initialData;
  };

  const [clientData, setClientData] = useState<DetailsPageTypes>(
    getClientData(selectedCompany)
  );

  const inputRef = useRef<HTMLInputElement>(null);

  // Update client data when selection changes
  useEffect(() => {
    setClientData(getClientData(selectedCompany));
  }, [selectedCompany]);

  // Focus input when dropdown opens
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    console.log("isViewPage", isViewPage);
  }, []);

  const handlePrintClient = (clientData: any) => {
    try {
      const html = PrintCommonLayout({
        title: `${location.pathname.split("/")[1]} Details`,
        data: [clientData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          ...printConfigFieldLabels,

          isDefault: "Default Client",
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
    firstName: "First Name",
    lastName: "Last Name",
    companyName: "Company Name",
    email: "Email",
    mobile: "Mobile",
    password: "Password",
    confirmPassword: "Confirm Password",
  };

  const excludedKeysForLoop = new Set([
    "companyName", // handled separately in autocomplete
    "password", // sensitive data
    "confirmPassword", // sensitive data
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
      console.log("pdf click", clientData);
      const blob = await pdf(
        <GenericPDF
          data={[clientData]}
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
                  handlePrintClient(clientData);
                }
              }
            : undefined
        }
      >
        <div dir={isRTL ? "rtl" : "ltr"}>
          {/* Row 1: Company Selection, Client Details */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            {fieldPermissions.companyName && (
              <div className="mt-1">
                <Autocomplete
                  options={autocompleteDataDetailsPage}
                  value={selectedCompany}
                  onValueChange={setSelectedCompany}
                  placeholder=" "
                  displayKey="name"
                  valueKey="name"
                  searchKey="name"
                  disabled={false}
                  className="w-[96%] bg-gray-100 rounded-xl"
                  labelClassName="bg-gray-50 rounded-2xl"
                  labelText="Company"
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
                    value={formatValue((clientData as any)[key])}
                  />
                ) : null
              )}

            {fieldPermissions.isActive && (
              <div className="flex flex-col">
                <div className="">
                  <span className="text-[15px] text-gray-600">Active</span>
                </div>
                <div className="">
                  {clientData.isActive ? (
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
                  {clientData.isDraft ? (
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
                  {clientData.isDeleted ? (
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
          created: getRelativeTime(clientData.createdAt),
          updated: getRelativeTime(clientData.updatedAt),
          drafted: getRelativeTime(clientData.draftedAt),
          deleted: getRelativeTime(clientData.deletedAt),
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
