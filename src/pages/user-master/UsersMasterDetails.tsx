/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
// import { useTranslation } from "react-i18next";
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
import { Edit, Plus } from "lucide-react";
import { ResetFormModal } from "@/components/common/ResetFormModal";
import { usePermission } from "@/hooks/usePermissions";
import MinimizablePageLayout from "@/components/MinimizablePageLayout";

const MOCK_USERS = [
  {
    id: "1",
    name: "John Doe",
    mobileNumber: "+1234567890",
    email: "john.doe@example.com",
    userType: "admin",
    status: "Active",
  },
  {
    id: "2",
    name: "Sarah Smith",
    mobileNumber: "+1987654321",
    email: "sarah.smith@example.com",
    userType: "super admin",
    status: "Active",
  },
  {
    id: "3",
    name: "Mike Johnson",
    mobileNumber: "+1555123456",
    email: "mike.johnson@example.com",
    userType: "user",
    status: "Draft",
  },
  {
    id: "4",
    name: "Emily Davis",
    mobileNumber: "+1444333222",
    email: "emily.davis@example.com",
    userType: "user",
    status: "InActive",
  },
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

export default function UserDetailsPage() {
  // const { t } = useTranslation();
  const navigate = useNavigate();

  const [keepChanges, setKeepChanges] = useState(false);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState("1");
  const location = useLocation();
  const isViewPage = location.pathname.includes("/view");
  const [pdfChecked, setPdfChecked] = useState(false);
  const [printEnabled, setPrintEnabled] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  // Permission checks
  // const { canCreate, canView, canEdit, canDelete } = useUserMasterPermissions();

  // Field-level permissions
  const canPdf: boolean = usePermission("user-master", "pdf");
  const canPrint: boolean = usePermission("user-master", "print");
  const canSeeHistory: boolean = usePermission("user-master", "history");

  let userData = {
    id: selectedUser,
    name: MOCK_USERS.find((u) => u.id === selectedUser)?.name || "John Doe",
    mobileNumber:
      MOCK_USERS.find((u) => u.id === selectedUser)?.mobileNumber ||
      "+1234567890",
    email:
      MOCK_USERS.find((u) => u.id === selectedUser)?.email ||
      "john.doe@example.com",
    userType:
      MOCK_USERS.find((u) => u.id === selectedUser)?.userType || "admin",
    password: "••••••••",
    confirmPassword: "••••••••",
    otp: "123456",
    facebook: "https://facebook.com/johndoe",
    linkedin: "https://linkedin.com/in/johndoe",
    instagram: "https://instagram.com/johndoe",
    isDefault: true,
    isActive: true,
    isDraft: false,
    isDeleted: false,
    status: MOCK_USERS.find((u) => u.id === selectedUser)?.status || "Active",
    createdAt: "2023-05-15T10:30:00Z",
    updatedAt: "2025-01-15T14:30:00Z",
    draftedAt: "2025-05-20T14:45:00Z",
    deletedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(),
  };

  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when dropdown opens
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    console.log("isViewPage", isViewPage);
    if (isViewPage) {
      userData = {
        id: selectedUser,
        name: "",
        mobileNumber: "",
        email: "",
        userType: "user",
        password: "",
        confirmPassword: "",
        otp: "",
        facebook: "",
        linkedin: "",
        instagram: "",
        isDefault: true,
        isActive: true,
        isDraft: false,
        isDeleted: false,
        status: "Active",
        createdAt: "",
        updatedAt: "",
        draftedAt: "",
        deletedAt: "",
      };
    }
  }, []);

  const handlePrintUser = (userData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "User Master Details",
        data: [userData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          name: "User Master Name",
          mobileNumber: "User Master Mobile Number",
          email: "User Master Email",
          userType: "User Master Type",
          password: "Password",
          confirmPassword: "Confirm Password",
          otp: "OTP",
          facebook: "Facebook",
          linkedin: "LinkedIn",
          instagram: "Instagram",
          isDefault: "Default User",
          isActive: "Active Status",
          isDraft: "Draft Status",
          isDeleted: "Deleted Status",
          status: "Status",
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
      console.log("userData on pdf click", userData);
      const blob = await pdf(
        <GenericPDF
          data={[userData]}
          title="User Master Details"
          subtitle="User Information"
        />
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "user-details.pdf";
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error);
      toastError("Something went wrong when generating PDF");
    }
  };

  const getRelativeTime = (dateString: string | null) => {
    if (!dateString) return "–";

    const date = new Date(dateString);
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
      <MinimizablePageLayout
        moduleId="user-details-module"
        moduleName="User Master Details"
        moduleRoute="/user-master/view"
        title="Viewing User Master"
        videoSrc={video}
        videoHeader="Tutorial video"
        listPath="user-master"
        activePage="view"
        module="user-master"
        popoverOptions={[
          {
            label: "Create",
            icon: <Plus className="w-5 h-5 text-green-600" />,
            onClick: () => navigate("/user-master/create"),
          },
          {
            label: "Edit",
            icon: <Edit className="w-5 h-5 text-blue-600" />,
            onClick: () => navigate("/user-master/edit/1"),
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
                  handlePrintUser(userData);
                }
              }
            : undefined
        }
      >
        {/* Row 1: User Selection, Name, Mobile Number, Email */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="mt-1">
            <Autocomplete
              options={MOCK_USERS}
              value={selectedUser}
              onValueChange={setSelectedUser}
              placeholder=" "
              displayKey="name"
              valueKey="id"
              searchKey="name"
              disabled={false}
              className="w-[96%] bg-gray-100 rounded-xl"
              labelClassName="bg-gray-50 rounded-2xl"
              labelText="User Master Name"
              isShowTemplateIcon={false}
            />
          </div>

          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">User Name</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(userData.name)}
            </div>
          </div>

          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">User Mobile Number</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(userData.mobileNumber)}
            </div>
          </div>

          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">User Email</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(userData.email)}
            </div>
          </div>
        </div>

        {/* Row 2: User Type, Password, OTP, Facebook */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">User Master Type</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(userData.userType)}
            </div>
          </div>

          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">Password</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(userData.password)}
            </div>
          </div>

          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">OTP</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(userData.otp)}
            </div>
          </div>

          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">Facebook</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(userData.facebook)}
            </div>
          </div>
        </div>

        {/* Row 3: LinkedIn, Instagram, Default, Status */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">LinkedIn</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(userData.linkedin)}
            </div>
          </div>

          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">Instagram</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(userData.instagram)}
            </div>
          </div>

          <div className="">
            <div className="flex flex-col">
              <div className="">
                <span className="text-[15px] text-gray-600">Default</span>
              </div>
              <div className="">
                {userData.isDefault ? (
                  <span className="text-black text-[15px]">Yes</span>
                ) : (
                  <span className="text-black text-[15px]">No</span>
                )}
              </div>
            </div>
          </div>

          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">Status</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(userData.status)}
            </div>
          </div>
        </div>

        {/* Row 4: Action, Created At, Updated At, Drafted At */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="">
            <h3 className="font-normal mb-1 text-gray-600">Action</h3>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              Updated
            </div>
          </div>
        </div>
      </MinimizablePageLayout>

      {/* History Modal */}
      <HistoryDataTable
        isOptionModalOpen={isOptionModalOpen}
        setIsOptionModalOpen={setIsOptionModalOpen}
        columnData={mockHistoryData}
        title="History"
        statusInfo={{
          created: getRelativeTime(userData.createdAt),
          updated: getRelativeTime(userData.updatedAt),
          drafted: getRelativeTime(userData.draftedAt),
          deleted: getRelativeTime(userData.deletedAt),
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
