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

type PortData = {
  portCode: string;
  portName: string;
  portType: string;
  country: string;
  address: string;
  landmark: string;
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

const initialData: PortData = {
  portCode: "JED",
  portName: "Jeddah Islamic Port",
  portType: "Commercial",
  country: "Saudi Arabia",
  address: "Jeddah, Makkah Province",
  landmark: "Near King Abdulaziz International Airport",
  contactPerson: "Ahmed Al-Rashid",
  mobileNo: "+966-50-123-4567",
  phoneNo: "+966-12-123-4567",
  faxNo: "+966-12-123-4568",
  email: "info@jeddahport.sa",
  website: "www.jeddahport.sa",
  isDefault: false,
  isActive: true,
  isDraft: false,
  createdAt: new Date(),
  draftedAt: null,
  updatedAt: new Date(),
  deletedAt: null,
  isDeleted: false,
};

// Port options for autocomplete
const portOptions = [
  "JED - Jeddah Islamic Port",
  "DAM - King Fahd International Port",
  "JUB - Jubail Commercial Port",
  "YAN - Yanbu Industrial Port",
  "DHA - Dhahran Port",
  "RAB - Rabigh Port",
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

export default function PortMasterDetailsPage() {
  const navigate = useNavigate();
  const { isRTL } = useSelector((state: RootState) => state.language);

  const [keepChanges, setKeepChanges] = useState(false);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [selectedPort, setSelectedPort] = useState("JED - Jeddah Islamic Port");
  const location = useLocation();
  const isViewPage = location.pathname.includes("/view");
  const [pdfChecked, setPdfChecked] = useState(false);
  const [printEnabled, setPrintEnabled] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  // get permission
  const canCreate: boolean = usePermission("portMaster", "create");
  const canView: boolean = usePermission("portMaster", "view");
  const canEdit: boolean = usePermission("portMaster", "edit");
  const canDelete: boolean = usePermission("portMaster", "delete");
  const canExport: boolean = usePermission("portMaster", "export");
  const canPdf: boolean = usePermission("portMaster", "pdf");
  const canPrint: boolean = usePermission("portMaster", "print");
  const canSeeHistory: boolean = usePermission("portMaster", "history");

  // Field-level permissions
  const canViewPortCode: boolean = usePermission(
    "portMaster",
    "view",
    "portCode"
  );
  const canViewPortName: boolean = usePermission(
    "portMaster",
    "view",
    "portName"
  );
  const canViewPortType: boolean = usePermission(
    "portMaster",
    "view",
    "portType"
  );
  const canViewCountry: boolean = usePermission(
    "portMaster",
    "view",
    "country"
  );
  const canViewAddress: boolean = usePermission(
    "portMaster",
    "view",
    "address"
  );
  const canViewLandmark: boolean = usePermission(
    "portMaster",
    "view",
    "landmark"
  );
  const canViewContactPerson: boolean = usePermission(
    "portMaster",
    "view",
    "contactPerson"
  );
  const canViewMobileNo: boolean = usePermission(
    "portMaster",
    "view",
    "mobileNo"
  );
  const canViewPhoneNo: boolean = usePermission(
    "portMaster",
    "view",
    "phoneNo"
  );
  const canViewFaxNo: boolean = usePermission("portMaster", "view", "faxNo");
  const canViewEmail: boolean = usePermission("portMaster", "view", "email");
  const canViewWebsite: boolean = usePermission(
    "portMaster",
    "view",
    "website"
  );
  const canViewIsDefault: boolean = usePermission(
    "portMaster",
    "view",
    "isDefault"
  );
  const canViewIsActive: boolean = usePermission(
    "portMaster",
    "view",
    "isActive"
  );
  const canViewIsDraft: boolean = usePermission(
    "portMaster",
    "view",
    "isDraft"
  );
  const canViewIsDeleted: boolean = usePermission(
    "portMaster",
    "view",
    "isDeleted"
  );

  console.log("canCreate", canCreate);
  console.log("canView", canView);
  console.log("canEdit", canEdit);
  console.log("canDelete", canDelete);
  console.log("canExport", canExport);

  // Get port data based on selected port
  const getPortData = (portName: string): PortData => {
    const portMap: Record<string, PortData> = {
      "JED - Jeddah Islamic Port": {
        portCode: "JED",
        portName: "Jeddah Islamic Port",
        portType: "Commercial",
        country: "Saudi Arabia",
        address: "Jeddah, Makkah Province",
        landmark: "Near King Abdulaziz International Airport",
        contactPerson: "Ahmed Al-Rashid",
        mobileNo: "+966-50-123-4567",
        phoneNo: "+966-12-123-4567",
        faxNo: "+966-12-123-4568",
        email: "info@jeddahport.sa",
        website: "www.jeddahport.sa",
        isDefault: false,
        isActive: true,
        isDraft: false,
        createdAt: new Date("2024-01-15T10:30:00Z"),
        draftedAt: null,
        updatedAt: new Date("2024-01-20T14:45:00Z"),
        deletedAt: null,
        isDeleted: false,
      },
      "DAM - King Fahd International Port": {
        portCode: "DAM",
        portName: "King Fahd International Port",
        portType: "Commercial",
        country: "Saudi Arabia",
        address: "Dammam, Eastern Province",
        landmark: "Near King Fahd International Airport",
        contactPerson: "Mohammed Al-Zahrani",
        mobileNo: "+966-50-234-5678",
        phoneNo: "+966-13-234-5678",
        faxNo: "+966-13-234-5679",
        email: "info@dammamport.sa",
        website: "www.dammamport.sa",
        isDefault: true,
        isActive: true,
        isDraft: false,
        createdAt: new Date("2024-01-16T09:15:00Z"),
        draftedAt: null,
        updatedAt: new Date("2024-01-21T11:30:00Z"),
        deletedAt: null,
        isDeleted: false,
      },
      "JUB - Jubail Commercial Port": {
        portCode: "JUB",
        portName: "Jubail Commercial Port",
        portType: "Industrial",
        country: "Saudi Arabia",
        address: "Jubail, Eastern Province",
        landmark: "Near Jubail Industrial City",
        contactPerson: "Fatima Al-Sayed",
        mobileNo: "+966-50-345-6789",
        phoneNo: "+966-13-345-6789",
        faxNo: "+966-13-345-6790",
        email: "info@jubailport.sa",
        website: "www.jubailport.sa",
        isDefault: false,
        isActive: true,
        isDraft: false,
        createdAt: new Date("2024-01-17T16:20:00Z"),
        draftedAt: null,
        updatedAt: new Date("2024-01-22T13:45:00Z"),
        deletedAt: null,
        isDeleted: false,
      },
      "YAN - Yanbu Industrial Port": {
        portCode: "YAN",
        portName: "Yanbu Industrial Port",
        portType: "Industrial",
        country: "Saudi Arabia",
        address: "Yanbu, Al Madinah Province",
        landmark: "Near Yanbu Industrial City",
        contactPerson: "Omar Al-Mansouri",
        mobileNo: "+966-50-456-7890",
        phoneNo: "+966-14-456-7890",
        faxNo: "+966-14-456-7891",
        email: "info@yanbuport.sa",
        website: "www.yanbuport.sa",
        isDefault: false,
        isActive: false,
        isDraft: false,
        createdAt: new Date("2024-01-18T12:00:00Z"),
        draftedAt: null,
        updatedAt: new Date("2024-01-25T10:00:00Z"),
        deletedAt: null,
        isDeleted: false,
      },
      "DHA - Dhahran Port": {
        portCode: "DHA",
        portName: "Dhahran Port",
        portType: "Oil Terminal",
        country: "Saudi Arabia",
        address: "Dhahran, Eastern Province",
        landmark: "Near Dhahran Airport",
        contactPerson: "Aisha Al-Qahtani",
        mobileNo: "+966-50-567-8901",
        phoneNo: "+966-13-567-8901",
        faxNo: "+966-13-567-8902",
        email: "info@dhahranport.sa",
        website: "www.dhahranport.sa",
        isDefault: false,
        isActive: true,
        isDraft: true,
        createdAt: new Date("2024-01-19T08:30:00Z"),
        draftedAt: new Date("2024-01-25T10:00:00Z"),
        updatedAt: new Date("2024-01-25T10:00:00Z"),
        deletedAt: null,
        isDeleted: false,
      },
      "RAB - Rabigh Port": {
        portCode: "RAB",
        portName: "Rabigh Port",
        portType: "Commercial",
        country: "Saudi Arabia",
        address: "Rabigh, Makkah Province",
        landmark: "Near Rabigh Industrial City",
        contactPerson: "Khalid Al-Otaibi",
        mobileNo: "+966-50-678-9012",
        phoneNo: "+966-12-678-9012",
        faxNo: "+966-12-678-9013",
        email: "info@rabighport.sa",
        website: "www.rabighport.sa",
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

    return portMap[portName] || initialData;
  };

  const [portData, setPortData] = useState<PortData>(getPortData(selectedPort));

  const inputRef = useRef<HTMLInputElement>(null);

  // Update port data when selection changes
  useEffect(() => {
    setPortData(getPortData(selectedPort));
  }, [selectedPort]);

  // Focus input when dropdown opens
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    console.log("isViewPage", isViewPage);
  }, []);

  const handlePrintPort = (portData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Port Details",
        data: [portData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          portCode: "Port Code",
          portName: "Port Name",
          portType: "Port Type",
          country: "Country",
          address: "Address",
          landmark: "Landmark",
          contactPerson: "Contact Person",
          mobileNo: "Mobile No.",
          phoneNo: "Phone No.",
          faxNo: "Fax No.",
          email: "Email",
          website: "Website",
          isDefault: "Default Port",
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
      console.log("portData on pdf click", portData);
      const blob = await pdf(
        <GenericPDF
          data={[portData]}
          title="Port Details"
          subtitle="Port Information"
        />
      ).toBlob();

      console.log("blob", blob);

      const url = URL.createObjectURL(blob);
      console.log("url", url);
      const a = document.createElement("a");
      a.href = url;
      a.download = "port-details.pdf";
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
        title="Viewing Port"
        videoSrc={video}
        videoHeader="Tutorial video"
        onListClick={() => navigate("/port-master")}
        listText="List"
        listPath="port-master"
        activePage="view"
        popoverOptions={[
          {
            label: "Create",
            icon: <Plus className="w-5 h-5 text-green-600" />,
            onClick: () => navigate("/port-master/create"),
          },
          {
            label: "Edit",
            icon: <Edit className="w-5 h-5 text-blue-600" />,
            onClick: () => navigate("/port-master/edit/1"),
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
                  handlePrintPort(portData);
                }
              }
            : undefined
        }
      >
        <div dir={isRTL ? "rtl" : "ltr"}>
          {/* Row 1: Port Code, Port Name, Port Type, Country */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            {canViewPortCode && (
              <div className="mt-1">
                <Autocomplete
                  options={portOptions}
                  value={selectedPort}
                  onValueChange={setSelectedPort}
                  placeholder=" "
                  displayKey="port"
                  valueKey="port"
                  searchKey="port"
                  disabled={false}
                  className="w-[96%] bg-gray-100 rounded-xl"
                  labelClassName="bg-gray-50 rounded-2xl"
                  labelText="Select Port"
                  inputClassName="border-none bg-stone-50 focus-visible:ring-offset-0 focus-visible:ring-0 focus-visible:border-2! focus-visible:border-blue-500"
                />
              </div>
            )}

            {canViewPortName && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Port Name</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(portData.portName)}
                </div>
              </div>
            )}

            {canViewPortType && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Port Type</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(portData.portType)}
                </div>
              </div>
            )}

            {canViewCountry && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Country</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(portData.country)}
                </div>
              </div>
            )}
          </div>

          {/* Row 2: Address, Landmark, Contact Person, Mobile No */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
            {canViewAddress && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Address</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(portData.address)}
                </div>
              </div>
            )}

            {canViewLandmark && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Landmark</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(portData.landmark)}
                </div>
              </div>
            )}

            {canViewContactPerson && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">
                  Contact Person
                </h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(portData.contactPerson)}
                </div>
              </div>
            )}

            {canViewMobileNo && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Mobile No.</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(portData.mobileNo)}
                </div>
              </div>
            )}
          </div>

          {/* Row 3: Phone No, Fax No, Email, Website */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
            {canViewPhoneNo && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Phone No.</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(portData.phoneNo)}
                </div>
              </div>
            )}

            {canViewFaxNo && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Fax No.</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(portData.faxNo)}
                </div>
              </div>
            )}

            {canViewEmail && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Email</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(portData.email)}
                </div>
              </div>
            )}

            {canViewWebsite && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Website</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(portData.website)}
                </div>
              </div>
            )}
          </div>

          {/* Row 4: Default, Draft, Active, Deleted */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
            {canViewIsDefault && (
              <div className="flex flex-col">
                <div className="">
                  <span className="text-[15px] text-gray-600">Default</span>
                </div>
                <div className="">
                  {portData.isDefault ? (
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
                  {portData.isDraft ? (
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
                  {portData.isActive ? (
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
                  {portData.isDeleted ? (
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
          created: getRelativeTime(portData.createdAt),
          updated: getRelativeTime(portData.updatedAt),
          drafted: getRelativeTime(portData.draftedAt),
          deleted: getRelativeTime(portData.deletedAt),
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
