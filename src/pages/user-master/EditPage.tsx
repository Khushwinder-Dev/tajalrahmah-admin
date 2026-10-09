/* eslint-disable @typescript-eslint/no-explicit-any */
import video from "@/assets/videos/test.mp4";
import EditableInput from "@/components/common/EditableInput";
import MobileEditableInput from "@/components/common/MobileEditableInput";
import GenericPDF from "@/components/common/pdf";
import { ResetFormModal } from "@/components/common/ResetFormModal";
import { Button } from "@/components/ui/button";
import { PrintCommonLayout } from "@/lib/printContents/PrintCommonLayout";
import { printHtmlContent } from "@/lib/printHtmlContent";
import { toastError, toastRestore, toastSuccess } from "@/lib/toast";
import { pdf } from "@react-pdf/renderer";
import { Check, Eye, Plus } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useUserMasterPermissions,
  usePermission,
} from "@/hooks/usePermissions";
// import { useLanguageLabels } from "@/hooks/useLanguageLabels";
import { useAppSelector } from "@/store/hooks";
import MinimizablePageLayout from "@/components/MinimizablePageLayout";
import { useMinimizedModuleData } from "@/hooks/useMinimizedModuleData";
import { SwitchSelect } from "@/components/common/SwitchAutoComplete";
import { ActionsAutocomplete } from "@/components/common/ActionsAutocomplete";
import { Autocomplete } from "@/components/common/Autocomplete";

type UserData = {
  name: string;
  mobileNumber: string;
  email: string;
  userType: "admin" | "super admin" | "user";
  password: string;
  confirmPassword: string;
  otp?: string;
  facebook?: string;
  linkedin?: string;
  instagram?: string;
  isDefault: boolean;
  isStatusActive: boolean;
  isActive: boolean;
  isDraft: boolean;
  isDeleted: boolean;
  createdAt: Date | null;
  draftedAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;
};

type UserModuleData = {
  formData: UserData;
  hasChanges: boolean;
  scrollPosition: number;
};

type Props = {
  isEdit?: boolean;
};

const initialData: UserData = {
  name: "John Doe",
  mobileNumber: "+1234567890",
  email: "john.doe@example.com",
  userType: "user",
  password: "",
  confirmPassword: "",
  otp: "",
  facebook: "",
  linkedin: "",
  instagram: "",
  isDefault: false,
  isStatusActive: true,
  isActive: true,
  isDraft: false,
  isDeleted: false,
  createdAt: new Date(),
  draftedAt: null,
  updatedAt: new Date(),
  deletedAt: null,
};

export default function UserEditPage({ isEdit = true }: Props) {
  const navigate = useNavigate();
  const { id } = useParams();
  // const labels = useLanguageLabels();
  const { isRTL } = useAppSelector((state) => state.language);

  // Get module ID for this edit page
  const moduleId = `user-edit-module-${id || "new"}`;

  // Use the custom hook for minimized module data
  const {
    moduleData,
    hasMinimizedData,
    resetModuleData,
    getModuleScrollPosition,
  } = useMinimizedModuleData<UserModuleData>(moduleId);

  const [keepCreating, setKeepCreating] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [isDefaultState, setIsDefaultState] = useState<"Yes" | "No" | string>(
    "No"
  );
  const [statusState, setStatusState] = useState<"Active" | "Draft" | string>(
    "active"
  );
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [printEnabled, setPrintEnabled] = useState(false);
  const [pdfChecked, setPdfChecked] = useState(false);
  const [formKey, setFormKey] = useState(0);
  const [isRestoredFromMinimized, setIsRestoredFromMinimized] = useState(false);
  const [shouldRestoreFromMinimized, setShouldRestoreFromMinimized] =
    useState(false);
  const [selectedAction, setSelectedAction] = useState<string>("");

  // Permission checks
  const { canCreate, canView } = useUserMasterPermissions();

  // Field-level permissions
  const userName: boolean = usePermission("user-master", "edit", "userName");
  const mobileNumber: boolean = usePermission(
    "user-master",
    "edit",
    "mobileNumber"
  );
  const email: boolean = usePermission("user-master", "edit", "email");
  const userType: boolean = usePermission("user-master", "edit", "userType");
  const password: boolean = usePermission("user-master", "edit", "password");
  const confirmPassword: boolean = usePermission(
    "user-master",
    "edit",
    "confirmPassword"
  );
  const otp: boolean = usePermission("user-master", "edit", "otp");
  const facebook: boolean = usePermission("user-master", "edit", "facebook");
  const linkedin: boolean = usePermission("user-master", "edit", "linkedin");
  const instagram: boolean = usePermission("user-master", "edit", "instagram");
  const isDefault: boolean = usePermission("user-master", "edit", "isDefault");
  const canPdf: boolean = usePermission("user-master", "pdf");
  const canPrint: boolean = usePermission("user-master", "print");

  // Form state
  const [formData, setFormData] = useState<UserData>({
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
    isDefault: false,
    isStatusActive: true,
    isActive: true,
    isDraft: false,
    isDeleted: false,
    createdAt: null,
    draftedAt: null,
    updatedAt: null,
    deletedAt: null,
  });

  // focus next input field
  const inputRefs = useRef<Record<string, HTMLElement | null>>({});
  const setRef = (name: string) => (el: HTMLElement | null) => {
    inputRefs.current[name] = el;
  };
  const focusNextInput = (nextField: string) => {
    inputRefs.current[nextField]?.focus();
  };

  // Check for restore flag from taskbar
  useEffect(() => {
    const shouldRestore = localStorage.getItem(`restore-${moduleId}`);
    if (shouldRestore === "true") {
      setShouldRestoreFromMinimized(true);
      localStorage.removeItem(`restore-${moduleId}`);
    }
  }, [moduleId]);

  // Restore logic using the custom hook
  useEffect(() => {
    const shouldAutoRestore =
      shouldRestoreFromMinimized ||
      (hasMinimizedData &&
        moduleData?.formData &&
        !isRestoredFromMinimized &&
        !formData.name);

    if (hasMinimizedData && moduleData?.formData && shouldAutoRestore) {
      setFormData(moduleData.formData);

      // Restore UI states based on form data
      setIsDefaultState(moduleData.formData.isDefault ? "Yes" : "No");
      if (moduleData.formData.isDeleted) {
        setStatusState("Delete");
      } else if (moduleData.formData.isDraft) {
        setStatusState("Draft");
      } else {
        setStatusState("Active");
      }

      setIsRestoredFromMinimized(true);
      setShouldRestoreFromMinimized(false);

      // Restore scroll position
      const scrollPosition = getModuleScrollPosition(moduleId);
      if (scrollPosition) {
        setTimeout(() => {
          window.scrollTo(0, scrollPosition);
        }, 200);
      }
    }
  }, [
    hasMinimizedData,
    moduleData,
    isRestoredFromMinimized,
    shouldRestoreFromMinimized,
    formData.name,
    moduleId,
    getModuleScrollPosition,
  ]);

  // Initialize with edit data if available
  useEffect(() => {
    if (
      isEdit &&
      initialData &&
      !hasMinimizedData &&
      !isRestoredFromMinimized
    ) {
      setFormData(initialData);
      setIsDefaultState(initialData.isDefault ? "Yes" : "No");
      if (initialData.isDeleted) {
        setStatusState("Delete");
      } else if (initialData.isDraft) {
        setStatusState("Draft");
      } else {
        setStatusState("Active");
      }
    }
  }, [isEdit, hasMinimizedData, isRestoredFromMinimized, moduleId]);

  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const newFormData = {
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    };
    setFormData(newFormData);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (pdfChecked) {
      await handleExportPDF();
    }
    if (printEnabled) {
      handlePrintUser(formData);
    }

    // keep switch functionality
    if (keepCreating) {
      toastSuccess("User updated successfully!");
      handleReset();
    } else {
      toastSuccess("User updated successfully!");
      navigate("/user-master");
    }
  };

  // Update handleReset function to use the custom hook
  const handleReset = async () => {
    setFormData({
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
      isDefault: false,
      isStatusActive: true,
      isActive: true,
      isDraft: false,
      isDeleted: false,
      createdAt: new Date(),
      draftedAt: null,
      updatedAt: new Date(),
      deletedAt: null,
    });
    setIsDefaultState("No");
    setStatusState("Active");
    setIsRestoredFromMinimized(false);

    if (formRef.current) {
      formRef.current.reset();
    }

    // Force re-render of all inputs by changing key
    setFormKey((prev) => prev + 1);

    // Reset form data using the custom hook
    if (hasMinimizedData) {
      try {
        await resetModuleData(moduleId);
      } catch (error) {
        console.error("Error resetting form data:", error);
      }
    }

    // Focus the first input field after reset
    setTimeout(() => {
      inputRefs.current["name"]?.focus();
    }, 100);
  };

  const handleResetClick = () => {
    setIsResetModalOpen(true);
  };

  const handlePrintUser = (userData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "User Details",
        data: [userData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          name: "User Name",
          isDefault: "Default User",
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
    try {
      const blob = await pdf(
        <GenericPDF
          data={[formData]}
          title="User Details"
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

  const [popoverOptions, setPopoverOptions] = useState([
    {
      label: "Create",
      icon: <Plus className="w-5 h-5 text-green-500" />,
      onClick: () => {
        navigate("/user-master/create");
      },
      show: canCreate,
    },
    {
      label: "View",
      icon: <Eye className="w-5 h-5 text-green-600" />,
      onClick: () => {
        navigate("/user-master/view");
      },
      show: canView,
    },
  ]);

  useEffect(() => {
    setPopoverOptions((prevOptions) => {
      const filteredOptions = prevOptions.filter(
        (opt) => opt.label !== "Draft"
      );

      if (!formData.isDraft) {
        return [
          ...filteredOptions,
          {
            label: "Draft",
            icon: <Check className="text-green-500" />,
            onClick: () => {
              setFormData((prev) => ({
                ...prev,
                isDraft: true,
              }));
              toastRestore("User saved as draft successfully");
            },
            show: canCreate,
          },
        ];
      }
      return filteredOptions;
    });
  }, [formData.isDraft, canCreate]);

  // Create minimize handler using the custom hook
  const handleMinimize = useCallback((): UserModuleData => {
    return {
      formData,
      hasChanges: true,
      scrollPosition: window.scrollY,
    };
  }, [formData]);

  return (
    <>
      <MinimizablePageLayout
        moduleId={moduleId}
        moduleName={`Edit User Master`}
        moduleRoute={`/user-master/edit/${id || "new"}`}
        onMinimize={handleMinimize}
        title="Edit User Master"
        listPath="user-master"
        popoverOptions={popoverOptions}
        videoSrc={video}
        videoHeader="Tutorial video"
        keepChanges={keepCreating}
        onKeepChangesChange={setKeepCreating}
        pdfChecked={pdfChecked}
        onPdfToggle={canPdf ? handlePDFSwitchChange : undefined}
        printEnabled={printEnabled}
        onPrintToggle={canPrint ? handleSwitchChange : undefined}
        activePage="edit"
        module="user-master"
        additionalFooterButtons={
          canCreate ? (
            <div className="flex gap-4 max-[435px]:gap-2">
              <Button
                variant="outline"
                className="gap-2 hover:bg-primary/90 bg-white rounded-full border-primary w-28 max-[435px]:w-20 font-semibold! text-primary!"
                onClick={handleResetClick}
              >
                Reset
              </Button>
              <Button
                variant="outline"
                className="gap-2 hover:bg-primary/90 bg-white rounded-full border-primary w-28 max-[435px]:w-20 font-semibold! text-primary!"
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </div>
          ) : null
        }
        className="w-full"
      >
        <div dir={isRTL ? "rtl" : "ltr"}>
          <form
            ref={formRef}
            key={formKey}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            {/* First Row: User Name, Mobile Number, Email, User Type */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {/* User Name field - only show if user can edit */}
              {userName && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("name")}
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onNext={() => focusNextInput("mobileNumber")}
                    onCancel={() => setFormData({ ...formData, name: "" })}
                    labelText="User Master Name"
                    tooltipText="Enter the user's full name"
                    required
                  />
                </div>
              )}

              {/* Mobile Number field - only show if user can edit */}
              {mobileNumber && (
                <div className="space-y-2">
                  <MobileEditableInput
                    setRef={setRef("mobileNumber")}
                    id="mobileNumber"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    onNext={() => focusNextInput("email")}
                    onCancel={() =>
                      setFormData({ ...formData, mobileNumber: "" })
                    }
                    labelText="User Master Mobile Number"
                    tooltipText="Enter the user's mobile number"
                    isPhone={true}
                    onPhoneChange={(value) => {
                      setFormData((prev) => ({
                        ...prev,
                        mobileNumber: value || "",
                      }));
                    }}
                    required
                  />
                </div>
              )}

              {/* Email field - only show if user can edit */}
              {email && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("email")}
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onNext={() => focusNextInput("userType")}
                    onCancel={() => setFormData({ ...formData, email: "" })}
                    labelText="User Master Email"
                    tooltipText="Enter the user's email address"
                    type="email"
                    required
                  />
                </div>
              )}

              {/* User Type field - only show if user can edit */}
              {userType && (
                <div className="space-y-2 relative">
                  <Autocomplete
                    ref={(el: any) => setRef("userType")(el)}
                    id="userType"
                    name="userType"
                    options={[
                      {
                        label: "Admin",
                        value: "admin",
                      },
                      {
                        label: "Super Admin",
                        value: "super admin",
                      },
                      {
                        label: "User",
                        value: "user",
                      },
                    ]}
                    value={formData.userType}
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({
                        ...prev,
                        userType: value as "admin" | "super admin" | "user",
                      }));
                      focusNextInput("password");
                    }}
                    onEnterPress={() => {
                      focusNextInput("password");
                    }}
                    placeholder="Select user type..."
                    labelText="User Master Type"
                    tooltipText="Select the user type"
                    displayKey="label"
                    valueKey="value"
                    searchKey="label"
                    isSelectableOnly={true}
                    className="relative"
                  />
                </div>
              )}
            </div>

            {/* Second Row: Password, Confirm Password, OTP, Facebook */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {/* Password field - only show if user can edit */}
              {password && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("password")}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    onNext={() => focusNextInput("confirmPassword")}
                    onCancel={() => setFormData({ ...formData, password: "" })}
                    labelText="Password"
                    tooltipText="Enter the user's password"
                    type="password"
                    required
                  />
                </div>
              )}

              {/* Confirm Password field - only show if user can edit */}
              {confirmPassword && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("confirmPassword")}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    onNext={() => focusNextInput("otp")}
                    onCancel={() =>
                      setFormData({ ...formData, confirmPassword: "" })
                    }
                    labelText="Confirm Password"
                    tooltipText="Confirm the user's password"
                    type="password"
                    required
                  />
                </div>
              )}

              {/* OTP field - only show if user can edit */}
              {otp && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("otp")}
                    id="otp"
                    name="otp"
                    value={formData.otp || ""}
                    onChange={handleChange}
                    onNext={() => focusNextInput("facebook")}
                    onCancel={() => setFormData({ ...formData, otp: "" })}
                    labelText="OTP"
                    tooltipText="Enter OTP (optional)"
                    type="text"
                  />
                </div>
              )}

              {/* Facebook field - only show if user can edit */}
              {facebook && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("facebook")}
                    id="facebook"
                    name="facebook"
                    value={formData.facebook || ""}
                    onChange={handleChange}
                    onNext={() => focusNextInput("linkedin")}
                    onCancel={() => setFormData({ ...formData, facebook: "" })}
                    labelText="Facebook"
                    tooltipText="Enter Facebook profile (optional)"
                    type="text"
                  />
                </div>
              )}
            </div>

            {/* Third Row: LinkedIn, Instagram, Default, Status */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {/* LinkedIn field - only show if user can edit */}
              {linkedin && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("linkedin")}
                    id="linkedin"
                    name="linkedin"
                    value={formData.linkedin || ""}
                    onChange={handleChange}
                    onNext={() => focusNextInput("instagram")}
                    onCancel={() => setFormData({ ...formData, linkedin: "" })}
                    labelText="LinkedIn"
                    tooltipText="Enter LinkedIn profile (optional)"
                    type="text"
                  />
                </div>
              )}

              {/* Instagram field - only show if user can edit */}
              {instagram && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("instagram")}
                    id="instagram"
                    name="instagram"
                    value={formData.instagram || ""}
                    onChange={handleChange}
                    onNext={() => focusNextInput("isDefault")}
                    onCancel={() => setFormData({ ...formData, instagram: "" })}
                    labelText="Instagram"
                    tooltipText="Enter Instagram profile (optional)"
                    type="text"
                  />
                </div>
              )}

              {/* Default field - only show if user can edit */}
              {isDefault && (
                <div className="space-y-2 relative">
                  <SwitchSelect
                    ref={(el: any) => setRef("isDefault")(el)}
                    id="isDefault"
                    name="isDefault"
                    multiSelect={false}
                    options={[
                      {
                        label: "Yes",
                        value: "Yes",
                        date: "Set default user",
                      },
                      {
                        label: "No",
                        value: "No",
                        date: "Remove default user",
                      },
                    ]}
                    value={isDefaultState === "Yes" ? "Yes" : "No"}
                    labelClassName="rounded-lg"
                    onValueChange={(value: string | string[]) => {
                      const isYes = Array.isArray(value)
                        ? value[0] === "Yes"
                        : value === "Yes";
                      setIsDefaultState(isYes ? "Yes" : "No");
                      const newValue = isYes;
                      setFormData((prev) => ({
                        ...prev,
                        isDefault: newValue,
                      }));
                      focusNextInput("status");
                    }}
                    onEnterPress={() => {
                      if (
                        formData.isDefault === true ||
                        formData.isDefault === false
                      ) {
                        focusNextInput("status");
                      }
                    }}
                    placeholder=" "
                    labelText="Default"
                    className="relative"
                    tooltipText="Set as default user"
                  />
                </div>
              )}

              {/* Status field */}
              <div className="space-y-2">
                <SwitchSelect
                  ref={(el: any) => setRef("status")(el)}
                  id="status"
                  name="status"
                  labelText="Status"
                  multiSelect={false}
                  options={[
                    {
                      label: "Active",
                      value: "Active",
                      date: "Set active",
                    },
                    {
                      label: "Inactive",
                      value: "InActive",
                      date: "Set inactive",
                    },
                    {
                      label: "Draft",
                      value: "Draft",
                      date: "Set draft",
                    },
                    {
                      label: "Delete",
                      value: "Delete",
                      date: "Set delete",
                    },
                  ]}
                  value={statusState}
                  onValueChange={(value: string | string[]) => {
                    const stringValue = Array.isArray(value)
                      ? value[0] || ""
                      : value;
                    setStatusState(stringValue);

                    setFormData((prev) => ({
                      ...prev,
                      isDraft: stringValue === "Draft",
                      isActive: stringValue === "Active",
                      isDeleted: stringValue === "Delete",
                    }));
                  }}
                  placeholder=""
                  styles={{
                    input: {
                      borderColor: "var(--primary)",
                      "&:focus": {
                        borderColor: "var(--primary)",
                      },
                    },
                  }}
                  tooltipText="Set the user status"
                />
              </div>
            </div>

            {/* Actions Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {/* Actions */}
              <div className="space-y-2">
                <ActionsAutocomplete
                  ref={(el: any) => setRef("actions")(el)}
                  id="actions"
                  name="actions"
                  labelText="Action"
                  value={selectedAction}
                  actions={[
                    {
                      action: "Created",
                      user: "John",
                      role: "Super User",
                      date: "06 Aug 2025",
                      value: "created",
                    },
                    {
                      action: "Updated",
                      user: "Sarah",
                      role: "Admin",
                      date: "08 Aug 2025",
                      value: "updated",
                    },
                    {
                      action: "Inactive",
                      user: "Mike",
                      role: "Admin",
                      date: "08 Aug 2025",
                      value: "inactive",
                    },
                    {
                      action: "Drafted",
                      user: "John",
                      role: "Super User",
                      date: "07 Aug 2025",
                      value: "drafted",
                    },
                  ]}
                  placeholder=""
                  onValueChange={(value: string) => {
                    setSelectedAction(value);
                  }}
                  styles={{
                    input: {
                      borderColor: "var(--primary)",
                      "&:focus": {
                        borderColor: "var(--primary)",
                      },
                    },
                  }}
                  tooltipText="User Action History"
                />
              </div>
            </div>
          </form>
        </div>
      </MinimizablePageLayout>

      <ResetFormModal
        opened={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        onConfirm={handleReset}
        title="Reset Form"
        message="Are you sure you want to reset the form?"
        confirmText="Reset"
        cancelText="Cancel"
      />
    </>
  );
}
