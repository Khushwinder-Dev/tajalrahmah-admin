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

type TransporterData = {
  transporterCountry: string;
  transporterName: string;
  contactPerson: string;
  mobileNo: string;
  phoneNo: string;
  faxNo: string;
  email: string;
  website: string;
  isDefault: boolean;
  isActive: boolean;
  isDraft: boolean;
  createdAt: Date | null;
  draftedAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;
  isDeleted: boolean;
};

const initialData: TransporterData = {
  transporterCountry: "Saudi Arabia",
  transporterName: "Al-Rashid Transport Services",
  contactPerson: "Ahmed Al-Rashid",
  mobileNo: "+966-50-123-4567",
  phoneNo: "+966-11-234-5678",
  faxNo: "+966-11-234-5679",
  email: "ahmed@alrashid-transport.com",
  website: "www.alrashid-transport.com",
  isDefault: false,
  isActive: true,
  isDraft: false,
  createdAt: new Date(),
  draftedAt: null,
  updatedAt: new Date(),
  deletedAt: null,
  isDeleted: false,
};

// Transporter options for autocomplete
const transporterOptions = [
  "001 - Al-Rashid Transport Services",
  "002 - Al-Zahrani Transport Co.",
  "003 - Al-Sayed Transport Agency",
  "004 - Al-Mansouri Transport",
  "005 - Al-Qahtani Transport",
  "006 - Al-Otaibi Transport",
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

export default function TransporterDetailsPage() {
  const navigate = useNavigate();
  const { isRTL } = useSelector((state: RootState) => state.language);

  const [keepChanges, setKeepChanges] = useState(false);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [selectedTransporter, setSelectedTransporter] = useState(
    "001 - Al-Rashid Transport Services"
  );
  const location = useLocation();
  const isViewPage = location.pathname.includes("/view");
  const [pdfChecked, setPdfChecked] = useState(false);
  const [printEnabled, setPrintEnabled] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  // get permission
  const canCreate: boolean = usePermission("transporter", "create");
  const canView: boolean = usePermission("transporter", "view");
  const canEdit: boolean = usePermission("transporter", "edit");
  const canDelete: boolean = usePermission("transporter", "delete");
  const canExport: boolean = usePermission("transporter", "export");
  const canPdf: boolean = usePermission("transporter", "pdf");
  const canPrint: boolean = usePermission("transporter", "print");
  const canSeeHistory: boolean = usePermission("transporter", "history");

  // Field-level permissions
  const canViewTransporterCountry: boolean = usePermission(
    "transporter",
    "view",
    "transporterCountry"
  );
  const canViewTransporterName: boolean = usePermission(
    "transporter",
    "view",
    "transporterName"
  );
  const canViewContactPerson: boolean = usePermission(
    "transporter",
    "view",
    "contactPerson"
  );
  const canViewMobileNo: boolean = usePermission(
    "transporter",
    "view",
    "mobileNo"
  );
  const canViewPhoneNo: boolean = usePermission(
    "transporter",
    "view",
    "phoneNo"
  );
  const canViewFaxNo: boolean = usePermission("transporter", "view", "faxNo");
  const canViewEmail: boolean = usePermission("transporter", "view", "email");
  const canViewWebsite: boolean = usePermission(
    "transporter",
    "view",
    "website"
  );
  const canViewIsDefault: boolean = usePermission(
    "transporter",
    "view",
    "isDefault"
  );
  const canViewIsActive: boolean = usePermission(
    "transporter",
    "view",
    "isActive"
  );
  const canViewIsDraft: boolean = usePermission(
    "transporter",
    "view",
    "isDraft"
  );
  const canViewIsDeleted: boolean = usePermission(
    "transporter",
    "view",
    "isDeleted"
  );

  console.log("canCreate", canCreate);
  console.log("canView", canView);
  console.log("canEdit", canEdit);
  console.log("canDelete", canDelete);
  console.log("canExport", canExport);

  // Get transporter data based on selected transporter
  const getTransporterData = (transporterName: string): TransporterData => {
    const transporterMap: Record<string, TransporterData> = {
      "001 - Al-Rashid Transport Services": {
        transporterCountry: "Saudi Arabia",
        transporterName: "Al-Rashid Transport Services",
        contactPerson: "Ahmed Al-Rashid",
        mobileNo: "+966-50-123-4567",
        phoneNo: "+966-11-234-5678",
        faxNo: "+966-11-234-5679",
        email: "ahmed@alrashid-transport.com",
        website: "www.alrashid-transport.com",
        isDefault: false,
        isActive: true,
        isDraft: false,
        createdAt: new Date("2024-01-15T10:30:00Z"),
        draftedAt: null,
        updatedAt: new Date("2024-01-20T14:45:00Z"),
        deletedAt: null,
        isDeleted: false,
      },
      "002 - Al-Zahrani Transport Co.": {
        transporterCountry: "Saudi Arabia",
        transporterName: "Al-Zahrani Transport Co.",
        contactPerson: "Mohammed Al-Zahrani",
        mobileNo: "+966-50-234-5678",
        phoneNo: "+966-11-345-6789",
        faxNo: "+966-11-345-6790",
        email: "mohammed@alzahrani-transport.com",
        website: "www.alzahrani-transport.com",
        isDefault: true,
        isActive: true,
        isDraft: false,
        createdAt: new Date("2024-01-16T09:15:00Z"),
        draftedAt: null,
        updatedAt: new Date("2024-01-21T11:30:00Z"),
        deletedAt: null,
        isDeleted: false,
      },
      "003 - Al-Sayed Transport Agency": {
        transporterCountry: "Saudi Arabia",
        transporterName: "Al-Sayed Transport Agency",
        contactPerson: "Ali Al-Sayed",
        mobileNo: "+966-50-345-6789",
        phoneNo: "+966-11-456-7890",
        faxNo: "+966-11-456-7891",
        email: "ali@alsayed-transport.com",
        website: "www.alsayed-transport.com",
        isDefault: false,
        isActive: true,
        isDraft: false,
        createdAt: new Date("2024-01-17T16:20:00Z"),
        draftedAt: null,
        updatedAt: new Date("2024-01-22T13:45:00Z"),
        deletedAt: null,
        isDeleted: false,
      },
      "004 - Al-Mansouri Transport": {
        transporterCountry: "Saudi Arabia",
        transporterName: "Al-Mansouri Transport",
        contactPerson: "Omar Al-Mansouri",
        mobileNo: "+966-50-456-7890",
        phoneNo: "+966-11-567-8901",
        faxNo: "+966-11-567-8902",
        email: "omar@almansouri-transport.com",
        website: "www.almansouri-transport.com",
        isDefault: false,
        isActive: false,
        isDraft: false,
        createdAt: new Date("2024-01-18T12:00:00Z"),
        draftedAt: null,
        updatedAt: new Date("2024-01-25T10:00:00Z"),
        deletedAt: null,
        isDeleted: false,
      },
      "005 - Al-Qahtani Transport": {
        transporterCountry: "Saudi Arabia",
        transporterName: "Al-Qahtani Transport",
        contactPerson: "Khalid Al-Qahtani",
        mobileNo: "+966-50-567-8901",
        phoneNo: "+966-11-678-9012",
        faxNo: "+966-11-678-9013",
        email: "khalid@alqahtani-transport.com",
        website: "www.alqahtani-transport.com",
        isDefault: false,
        isActive: true,
        isDraft: true,
        createdAt: new Date("2024-01-19T08:30:00Z"),
        draftedAt: new Date("2024-01-25T10:00:00Z"),
        updatedAt: new Date("2024-01-25T10:00:00Z"),
        deletedAt: null,
        isDeleted: false,
      },
      "006 - Al-Otaibi Transport": {
        transporterCountry: "Saudi Arabia",
        transporterName: "Al-Otaibi Transport",
        contactPerson: "Saleh Al-Otaibi",
        mobileNo: "+966-50-678-9012",
        phoneNo: "+966-11-789-0123",
        faxNo: "+966-11-789-0124",
        email: "saleh@alotaibi-transport.com",
        website: "www.alotaibi-transport.com",
        isDefault: false,
        isActive: true,
        isDraft: false,
        createdAt: new Date("2024-01-20T14:15:00Z"),
        draftedAt: null,
        updatedAt: new Date("2024-01-25T16:40:00Z"),
        deletedAt: null,
        isDeleted: false,
      },
    };

    return transporterMap[transporterName] || initialData;
  };

  const [transporterData, setTransporterData] = useState<TransporterData>(
    getTransporterData(selectedTransporter)
  );

  const inputRef = useRef<HTMLInputElement>(null);

  // Update transporter data when selection changes
  useEffect(() => {
    setTransporterData(getTransporterData(selectedTransporter));
  }, [selectedTransporter]);

  // Focus input when dropdown opens
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    console.log("isViewPage", isViewPage);
  }, []);

  const handlePrintTransporter = (transporterData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Transporter Details",
        data: [transporterData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          transporterCountry: "Transporter Country",
          transporterName: "Transporter Name",
          contactPerson: "Contact Person",
          mobileNo: "Mobile No.",
          phoneNo: "Phone No.",
          faxNo: "Fax No.",
          email: "Email",
          website: "Website",
          isDefault: "Default Transporter",
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
      console.log("transporterData on pdf click", transporterData);
      const blob = await pdf(
        <GenericPDF
          data={[transporterData]}
          title="Transporter Details"
          subtitle="Transporter Information"
        />
      ).toBlob();

      console.log("blob", blob);

      const url = URL.createObjectURL(blob);
      console.log("url", url);
      const a = document.createElement("a");
      a.href = url;
      a.download = "transporter-details.pdf";
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
        title="Viewing Transporter"
        videoSrc={video}
        videoHeader="Tutorial video"
        onListClick={() => navigate("/transporter")}
        listText="List"
        listPath="transporter"
        activePage="view"
        popoverOptions={[
          {
            label: "Create",
            icon: <Plus className="w-5 h-5 text-green-600" />,
            onClick: () => navigate("/transporter/create"),
          },
          {
            label: "Edit",
            icon: <Edit className="w-5 h-5 text-blue-600" />,
            onClick: () => navigate("/transporter/edit/1"),
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
                  handlePrintTransporter(transporterData);
                }
              }
            : undefined
        }
      >
        <div dir={isRTL ? "rtl" : "ltr"}>
          {/* Row 1: Select Transporter, Transporter Country, Transporter Name, Contact Person */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            <div className="mt-1">
              <Autocomplete
                options={transporterOptions}
                value={selectedTransporter}
                onValueChange={setSelectedTransporter}
                placeholder=" "
                displayKey="transporter"
                valueKey="transporter"
                searchKey="transporter"
                disabled={false}
                className="w-[96%] bg-gray-100 rounded-xl"
                labelClassName="bg-gray-50 rounded-2xl"
                labelText="Select Transporter"
                inputClassName="border-none bg-stone-50 focus-visible:ring-offset-0 focus-visible:ring-0 focus-visible:border-2! focus-visible:border-blue-500"
              />
            </div>

            {canViewTransporterCountry && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">
                  Transporter Country
                </h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(transporterData.transporterCountry)}
                </div>
              </div>
            )}

            {canViewTransporterName && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">
                  Transporter Name
                </h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(transporterData.transporterName)}
                </div>
              </div>
            )}

            {canViewContactPerson && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">
                  Contact Person
                </h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(transporterData.contactPerson)}
                </div>
              </div>
            )}
          </div>

          {/* Row 2: Mobile No, Phone No, Fax No, Email */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
            {canViewMobileNo && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Mobile No.</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(transporterData.mobileNo)}
                </div>
              </div>
            )}

            {canViewPhoneNo && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Phone No.</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(transporterData.phoneNo)}
                </div>
              </div>
            )}

            {canViewFaxNo && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Fax No.</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(transporterData.faxNo)}
                </div>
              </div>
            )}

            {canViewEmail && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Email</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(transporterData.email)}
                </div>
              </div>
            )}
          </div>

          {/* Row 3: Website, Default, Draft, Active */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
            {canViewWebsite && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Website</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(transporterData.website)}
                </div>
              </div>
            )}

            {canViewIsDefault && (
              <div className="flex flex-col">
                <div className="">
                  <span className="text-[15px] text-gray-600">Default</span>
                </div>
                <div className="">
                  {transporterData.isDefault ? (
                    <span className="text-black font-bold text-[15px]">
                      Yes
                    </span>
                  ) : (
                    <span className="text-black font-bold text-[15px]">No</span>
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
                  {transporterData.isDraft ? (
                    <span className="text-black font-bold text-[15px]">
                      Yes
                    </span>
                  ) : (
                    <span className="text-black font-bold text-[15px]">No</span>
                  )}
                </div>
              </div>
            )}

            {canViewIsActive && (
              <div className="flex flex-col">
                <div className="">
                  <span className="text-[15px] text-gray-600">Active</span>
                </div>
                <div className="">
                  {transporterData.isActive ? (
                    <span className="text-black font-bold text-[15px]">
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
                  {transporterData.isDeleted ? (
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
        </div>
      </PageLayout>

      {/* History Modal */}
      <HistoryDataTable
        isOptionModalOpen={isOptionModalOpen}
        setIsOptionModalOpen={setIsOptionModalOpen}
        columnData={mockHistoryData}
        title="History"
        statusInfo={{
          created: getRelativeTime(transporterData.createdAt),
          updated: getRelativeTime(transporterData.updatedAt),
          drafted: getRelativeTime(transporterData.draftedAt),
          deleted: getRelativeTime(transporterData.deletedAt),
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
