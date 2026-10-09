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

type AgentData = {
  agentCode: string;
  agentName: string;
  country: string;
  notification: string;
  portType: string;
  portName: string;
  address: string;
  landmark: string;
  contact: string;
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

const initialData: AgentData = {
  agentCode: "AG001",
  agentName: "Al-Rashid Shipping Agency",
  country: "Saudi Arabia",
  notification: "Email & SMS",
  portType: "Commercial",
  portName: "Jeddah Islamic Port",
  address: "Jeddah, Makkah Province",
  landmark: "Near King Abdulaziz International Airport",
  contact: "Ahmed Al-Rashid",
  mobileNo: "+966-50-123-4567",
  phoneNo: "+966-12-123-4567",
  faxNo: "+966-12-123-4568",
  email: "info@alrashid-shipping.sa",
  website: "www.alrashid-shipping.sa",
  isDefault: false,
  isActive: true,
  isDraft: false,
  createdAt: new Date(),
  draftedAt: null,
  updatedAt: new Date(),
  deletedAt: null,
  isDeleted: false,
};

// Agent options for autocomplete
const agentOptions = [
  "AG001 - Al-Rashid Shipping Agency",
  "AG002 - Al-Zahrani Maritime Services",
  "AG003 - Al-Sayed Shipping Co.",
  "AG004 - Al-Mansouri Port Agency",
  "AG005 - Al-Qahtani Maritime",
  "AG006 - Al-Otaibi Shipping",
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

export default function AgentMasterDetailsPage() {
  const navigate = useNavigate();
  const { isRTL } = useSelector((state: RootState) => state.language);

  const [keepChanges, setKeepChanges] = useState(false);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState(
    "AG001 - Al-Rashid Shipping Agency"
  );
  const location = useLocation();
  const isViewPage = location.pathname.includes("/view");
  const [pdfChecked, setPdfChecked] = useState(false);
  const [printEnabled, setPrintEnabled] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  // get permission
  const canCreate: boolean = usePermission("agentMaster", "create");
  const canView: boolean = usePermission("agentMaster", "view");
  const canEdit: boolean = usePermission("agentMaster", "edit");
  const canDelete: boolean = usePermission("agentMaster", "delete");
  const canExport: boolean = usePermission("agentMaster", "export");
  const canPdf: boolean = usePermission("agentMaster", "pdf");
  const canPrint: boolean = usePermission("agentMaster", "print");
  const canSeeHistory: boolean = usePermission("agentMaster", "history");

  // Field-level permissions
  const canViewAgentCode: boolean = usePermission(
    "agentMaster",
    "view",
    "agentCode"
  );
  const canViewAgentName: boolean = usePermission(
    "agentMaster",
    "view",
    "agentName"
  );
  const canViewCountry: boolean = usePermission(
    "agentMaster",
    "view",
    "country"
  );
  const canViewNotification: boolean = usePermission(
    "agentMaster",
    "view",
    "notification"
  );
  const canViewPortType: boolean = usePermission(
    "agentMaster",
    "view",
    "portType"
  );
  const canViewPortName: boolean = usePermission(
    "agentMaster",
    "view",
    "portName"
  );
  const canViewAddress: boolean = usePermission(
    "agentMaster",
    "view",
    "address"
  );
  const canViewLandmark: boolean = usePermission(
    "agentMaster",
    "view",
    "landmark"
  );
  const canViewContact: boolean = usePermission(
    "agentMaster",
    "view",
    "contact"
  );
  const canViewMobileNo: boolean = usePermission(
    "agentMaster",
    "view",
    "mobileNo"
  );
  const canViewPhoneNo: boolean = usePermission(
    "agentMaster",
    "view",
    "phoneNo"
  );
  const canViewFaxNo: boolean = usePermission("agentMaster", "view", "faxNo");
  const canViewEmail: boolean = usePermission("agentMaster", "view", "email");
  const canViewWebsite: boolean = usePermission(
    "agentMaster",
    "view",
    "website"
  );
  const canViewIsDefault: boolean = usePermission(
    "agentMaster",
    "view",
    "isDefault"
  );
  const canViewIsActive: boolean = usePermission(
    "agentMaster",
    "view",
    "isActive"
  );
  const canViewIsDraft: boolean = usePermission(
    "agentMaster",
    "view",
    "isDraft"
  );
  const canViewIsDeleted: boolean = usePermission(
    "agentMaster",
    "view",
    "isDeleted"
  );

  console.log("canCreate", canCreate);
  console.log("canView", canView);
  console.log("canEdit", canEdit);
  console.log("canDelete", canDelete);
  console.log("canExport", canExport);

  // Get agent data based on selected agent
  const getAgentData = (agentName: string): AgentData => {
    const agentMap: Record<string, AgentData> = {
      "AG001 - Al-Rashid Shipping Agency": {
        agentCode: "AG001",
        agentName: "Al-Rashid Shipping Agency",
        country: "Saudi Arabia",
        notification: "Email & SMS",
        portType: "Commercial",
        portName: "Jeddah Islamic Port",
        address: "Jeddah, Makkah Province",
        landmark: "Near King Abdulaziz International Airport",
        contact: "Ahmed Al-Rashid",
        mobileNo: "+966-50-123-4567",
        phoneNo: "+966-12-123-4567",
        faxNo: "+966-12-123-4568",
        email: "info@alrashid-shipping.sa",
        website: "www.alrashid-shipping.sa",
        isDefault: false,
        isActive: true,
        isDraft: false,
        createdAt: new Date("2024-01-15T10:30:00Z"),
        draftedAt: null,
        updatedAt: new Date("2024-01-20T14:45:00Z"),
        deletedAt: null,
        isDeleted: false,
      },
      "AG002 - Al-Zahrani Maritime Services": {
        agentCode: "AG002",
        agentName: "Al-Zahrani Maritime Services",
        country: "Saudi Arabia",
        notification: "Email & WhatsApp",
        portType: "Commercial",
        portName: "King Fahd International Port",
        address: "Dammam, Eastern Province",
        landmark: "Near King Fahd International Airport",
        contact: "Mohammed Al-Zahrani",
        mobileNo: "+966-50-234-5678",
        phoneNo: "+966-13-234-5678",
        faxNo: "+966-13-234-5679",
        email: "info@alzahrani-maritime.sa",
        website: "www.alzahrani-maritime.sa",
        isDefault: true,
        isActive: true,
        isDraft: false,
        createdAt: new Date("2024-01-16T09:15:00Z"),
        draftedAt: null,
        updatedAt: new Date("2024-01-21T11:30:00Z"),
        deletedAt: null,
        isDeleted: false,
      },
      "AG003 - Al-Sayed Shipping Co.": {
        agentCode: "AG003",
        agentName: "Al-Sayed Shipping Co.",
        country: "Saudi Arabia",
        notification: "SMS & WhatsApp",
        portType: "Industrial",
        portName: "Jubail Commercial Port",
        address: "Jubail, Eastern Province",
        landmark: "Near Jubail Industrial City",
        contact: "Fatima Al-Sayed",
        mobileNo: "+966-50-345-6789",
        phoneNo: "+966-13-345-6789",
        faxNo: "+966-13-345-6790",
        email: "info@alsayed-shipping.sa",
        website: "www.alsayed-shipping.sa",
        isDefault: false,
        isActive: true,
        isDraft: false,
        createdAt: new Date("2024-01-17T16:20:00Z"),
        draftedAt: null,
        updatedAt: new Date("2024-01-22T13:45:00Z"),
        deletedAt: null,
        isDeleted: false,
      },
      "AG004 - Al-Mansouri Port Agency": {
        agentCode: "AG004",
        agentName: "Al-Mansouri Port Agency",
        country: "Saudi Arabia",
        notification: "Email",
        portType: "Industrial",
        portName: "Yanbu Industrial Port",
        address: "Yanbu, Al Madinah Province",
        landmark: "Near Yanbu Industrial City",
        contact: "Omar Al-Mansouri",
        mobileNo: "+966-50-456-7890",
        phoneNo: "+966-14-456-7890",
        faxNo: "+966-14-456-7891",
        email: "info@almansouri-agency.sa",
        website: "www.almansouri-agency.sa",
        isDefault: false,
        isActive: false,
        isDraft: false,
        createdAt: new Date("2024-01-18T12:00:00Z"),
        draftedAt: null,
        updatedAt: new Date("2024-01-25T10:00:00Z"),
        deletedAt: null,
        isDeleted: false,
      },
      "AG005 - Al-Qahtani Maritime": {
        agentCode: "AG005",
        agentName: "Al-Qahtani Maritime",
        country: "Saudi Arabia",
        notification: "SMS",
        portType: "Oil Terminal",
        portName: "Dhahran Port",
        address: "Dhahran, Eastern Province",
        landmark: "Near Dhahran Airport",
        contact: "Aisha Al-Qahtani",
        mobileNo: "+966-50-567-8901",
        phoneNo: "+966-13-567-8901",
        faxNo: "+966-13-567-8902",
        email: "info@alqahtani-maritime.sa",
        website: "www.alqahtani-maritime.sa",
        isDefault: false,
        isActive: true,
        isDraft: true,
        createdAt: new Date("2024-01-19T08:30:00Z"),
        draftedAt: new Date("2024-01-25T10:00:00Z"),
        updatedAt: new Date("2024-01-25T10:00:00Z"),
        deletedAt: null,
        isDeleted: false,
      },
      "AG006 - Al-Otaibi Shipping": {
        agentCode: "AG006",
        agentName: "Al-Otaibi Shipping",
        country: "Saudi Arabia",
        notification: "Email & SMS",
        portType: "Commercial",
        portName: "Rabigh Port",
        address: "Rabigh, Makkah Province",
        landmark: "Near Rabigh Industrial City",
        contact: "Khalid Al-Otaibi",
        mobileNo: "+966-50-678-9012",
        phoneNo: "+966-12-678-9012",
        faxNo: "+966-12-678-9013",
        email: "info@alotaibi-shipping.sa",
        website: "www.alotaibi-shipping.sa",
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

    return agentMap[agentName] || initialData;
  };

  const [agentData, setAgentData] = useState<AgentData>(
    getAgentData(selectedAgent)
  );

  const inputRef = useRef<HTMLInputElement>(null);

  // Update agent data when selection changes
  useEffect(() => {
    setAgentData(getAgentData(selectedAgent));
  }, [selectedAgent]);

  // Focus input when dropdown opens
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    console.log("isViewPage", isViewPage);
  }, []);

  const handlePrintAgent = (agentData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Agent Details",
        data: [agentData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          agentCode: "Agent Code",
          agentName: "Agent Name",
          country: "Country",
          notification: "Notification",
          portType: "Port Type",
          portName: "Port Name",
          address: "Address",
          landmark: "Landmark",
          contact: "Contact",
          mobileNo: "Mobile No.",
          phoneNo: "Phone No.",
          faxNo: "Fax No.",
          email: "Email",
          website: "Website",
          isDefault: "Default Agent",
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
      console.log("agentData on pdf click", agentData);
      const blob = await pdf(
        <GenericPDF
          data={[agentData]}
          title="Agent Details"
          subtitle="Agent Information"
        />
      ).toBlob();

      console.log("blob", blob);

      const url = URL.createObjectURL(blob);
      console.log("url", url);
      const a = document.createElement("a");
      a.href = url;
      a.download = "agent-details.pdf";
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
        title="Viewing Agent"
        videoSrc={video}
        videoHeader="Tutorial video"
        onListClick={() => navigate("/agent-master")}
        listText="List"
        listPath="agent-master"
        activePage="view"
        popoverOptions={[
          {
            label: "Create",
            icon: <Plus className="w-5 h-5 text-green-600" />,
            onClick: () => navigate("/agent-master/create"),
          },
          {
            label: "Edit",
            icon: <Edit className="w-5 h-5 text-blue-600" />,
            onClick: () => navigate("/agent-master/edit/1"),
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
                  handlePrintAgent(agentData);
                }
              }
            : undefined
        }
      >
        <div dir={isRTL ? "rtl" : "ltr"}>
          {/* Row 1: Agent Code, Agent Name, Country, Notification */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            {canViewAgentCode && (
              <div className="mt-1">
                <Autocomplete
                  options={agentOptions}
                  value={selectedAgent}
                  onValueChange={setSelectedAgent}
                  placeholder=" "
                  displayKey="agent"
                  valueKey="agent"
                  searchKey="agent"
                  disabled={false}
                  className="w-[96%] bg-gray-100 rounded-xl"
                  labelClassName="bg-gray-50 rounded-2xl"
                  labelText="Select Agent"
                  inputClassName="border-none bg-stone-50 focus-visible:ring-offset-0 focus-visible:ring-0 focus-visible:border-2! focus-visible:border-blue-500"
                />
              </div>
            )}

            {canViewAgentName && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Agent Name</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(agentData.agentName)}
                </div>
              </div>
            )}

            {canViewCountry && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Country</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(agentData.country)}
                </div>
              </div>
            )}

            {canViewNotification && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Notification</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(agentData.notification)}
                </div>
              </div>
            )}
          </div>

          {/* Row 2: Port Type, Port Name, Address, Landmark */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
            {canViewPortType && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Port Type</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(agentData.portType)}
                </div>
              </div>
            )}

            {canViewPortName && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Port Name</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(agentData.portName)}
                </div>
              </div>
            )}

            {canViewAddress && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Address</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(agentData.address)}
                </div>
              </div>
            )}

            {canViewLandmark && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Landmark</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(agentData.landmark)}
                </div>
              </div>
            )}
          </div>

          {/* Row 3: Contact, Mobile No, Phone No, Fax No */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
            {canViewContact && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Contact</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(agentData.contact)}
                </div>
              </div>
            )}

            {canViewMobileNo && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Mobile No.</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(agentData.mobileNo)}
                </div>
              </div>
            )}

            {canViewPhoneNo && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Phone No.</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(agentData.phoneNo)}
                </div>
              </div>
            )}

            {canViewFaxNo && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Fax No.</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(agentData.faxNo)}
                </div>
              </div>
            )}
          </div>

          {/* Row 4: Email, Website, Default, Draft */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
            {canViewEmail && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Email</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(agentData.email)}
                </div>
              </div>
            )}

            {canViewWebsite && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Website</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(agentData.website)}
                </div>
              </div>
            )}

            {canViewIsDefault && (
              <div className="flex flex-col">
                <div className="">
                  <span className="text-[15px] text-gray-600">Default</span>
                </div>
                <div className="">
                  {agentData.isDefault ? (
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
                  {agentData.isDraft ? (
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
                  {agentData.isActive ? (
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
                  {agentData.isDeleted ? (
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
          created: getRelativeTime(agentData.createdAt),
          updated: getRelativeTime(agentData.updatedAt),
          drafted: getRelativeTime(agentData.draftedAt),
          deleted: getRelativeTime(agentData.deletedAt),
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
