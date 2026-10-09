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
import { Check, Edit, Eye, Plus } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useUserMasterPermissions,
  usePermission,
} from "@/hooks/usePermissions";
import { useLanguageLabels } from "@/hooks/useLanguageLabels";
import { useAppSelector } from "@/store/hooks";
import MinimizablePageLayout from "@/components/MinimizablePageLayout";
import { SwitchSelect } from "@/components/common/SwitchAutoComplete";
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
  createdAt: Date | null;
  draftedAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;
  isDeleted: boolean;
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
  createdAt: new Date(),
  draftedAt: null,
  updatedAt: new Date(),
  deletedAt: null,
  isDeleted: false,
};

export default function UserFormPage({ isEdit = false }: Props) {
  const navigate = useNavigate();
  const labels = useLanguageLabels();
  const { isRTL } = useAppSelector((state) => state.language);

  const [keepCreating, setKeepCreating] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [isDefaultState, setIsDefaultState] = useState<"Yes" | "No">("No");
  const [statusState, setStatusState] = useState<"Active" | "Draft" | string>(
    "Active"
  );
  const [printEnabled, setPrintEnabled] = useState(false);
  const [pdfChecked, setPdfChecked] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [formKey, setFormKey] = useState(0);

  // Permission checks
  const { canCreate, canView } = useUserMasterPermissions();

  // Field-level permissions
  const userName: boolean = usePermission("user-master", "create", "userName");
  const mobileNumber: boolean = usePermission(
    "user-master",
    "create",
    "mobileNumber"
  );
  const email: boolean = usePermission("user-master", "create", "email");
  const userType: boolean = usePermission("user-master", "create", "userType");
  const password: boolean = usePermission("user-master", "create", "password");
  const confirmPassword: boolean = usePermission(
    "user-master",
    "create",
    "confirmPassword"
  );
  const otp: boolean = usePermission("user-master", "create", "otp");
  const facebook: boolean = usePermission("user-master", "create", "facebook");
  const linkedin: boolean = usePermission("user-master", "create", "linkedin");
  const instagram: boolean = usePermission(
    "user-master",
    "create",
    "instagram"
  );
  const isDefault: boolean = usePermission(
    "user-master",
    "create",
    "isDefault"
  );
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

  // Initialize with edit data if available
  useEffect(() => {
    if (isEdit && initialData) {
      setFormData(initialData);
      setIsDefaultState(initialData.isDefault ? "Yes" : "No");
      setStatusState(initialData.isActive ? "Active" : "Draft");
    }
  }, [isEdit]);

  const [popoverOptions, setPopoverOptions] = useState([
    {
      label: isEdit ? "Create" : "Edit",
      icon: isEdit ? (
        <Plus className="w-5 h-5 text-green-500" />
      ) : (
        <Edit className="w-5 h-5 text-blue-500" />
      ),
      onClick: () => {
        if (isEdit) {
          navigate("/user-master/create");
        } else {
          navigate("/user-master/edit/undefined");
        }
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

  // focus next input field
  const inputRefs = useRef<Record<string, HTMLElement | null>>({});
  const setRef = (name: string) => (el: HTMLElement | null) => {
    inputRefs.current[name] = el;
  };
  const focusNextInput = (nextField: string) => {
    inputRefs.current[nextField]?.focus();
  };

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
      toastSuccess("User created successfully!");
      handleReset();
    } else {
      toastSuccess("User created successfully!");
      navigate("/user-master");
    }
  };

  const handleResetClick = () => {
    setIsResetModalOpen(true);
  };

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

    if (formRef.current) {
      formRef.current.reset();
    }

    // Force re-render of all inputs by changing key
    setFormKey((prev) => prev + 1);

    // Focus the first input field after reset
    setTimeout(() => {
      inputRefs.current["name"]?.focus();
    }, 100);
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

  useEffect(() => {
    setPopoverOptions((prevOptions) => {
      // Filter out any existing draft option first
      const filteredOptions = prevOptions.filter(
        (opt) => opt.label !== "Draft"
      );

      // Add draft option only if not already a draft
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

  // Create minimize handler
  const handleMinimize = useCallback(() => {
    return {
      formData,
      hasChanges: true,
      scrollPosition: window.scrollY,
    };
  }, [formData]);

  return (
    <>
      <MinimizablePageLayout
        moduleId="user-form-module"
        moduleName={isEdit ? "Edit User Master" : "Adding User Master"}
        moduleRoute={
          isEdit ? `/user-master/edit/${formData.name || "new"}` : "/user-master/create"
        }
        onMinimize={handleMinimize}
        title={isEdit ? "Edit User Master" : "Add User Master"}
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
        activePage="create"
        module="user-master"
        additionalFooterButtons={
          canCreate ? (
            <div className="flex gap-4 max-[435px]:gap-2">
              <Button
                variant="outline"
                className="gap-2 hover:bg-primary/90! bg-white dark:bg-gray-900 rounded-full border-primary w-28 max-[435px]:w-20 font-semibold! text-primary!"
                onClick={handleResetClick}
              >
                {labels.reset}
              </Button>
              <Button
                variant="outline"
                className="gap-2 hover:bg-primary/90 bg-white dark:bg-gray-900 rounded-full border-primary w-28 max-[435px]:w-20 font-semibold! text-primary!"
                onClick={handleSubmit}
              >
                {labels.submit}
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
            className="space-y-6 relative"
          >
            {/* First Row: User Name and Mobile Number */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {/* User Name field - only show if user can create */}
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

              {/* Mobile Number field - only show if user can create */}
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

              {/* Email field - only show if user can create */}
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

              {/* User Type field - only show if user can create */}
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

            {/* Third Row: Password and Confirm Password */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {/* Password field - only show if user can create */}
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

              {/* Confirm Password field - only show if user can create */}
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

              {/* OTP field - only show if user can create */}
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

              {/* Facebook field - only show if user can create */}
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

            {/* Fifth Row: LinkedIn and Instagram */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {/* LinkedIn field - only show if user can create */}
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

              {/* Instagram field - only show if user can create */}
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

              {/* Default field - only show if user can create */}
              {isDefault && (
                <div className="space-y-2 relative">
                  <SwitchSelect
                    ref={(el: any) => setRef("isDefault")(el)}
                    id="isDefault"
                    name="isDefault"
                    multiSelect={false}
                    options={[
                      {
                        label: labels.yes,
                        value: labels.yes,
                        date: "Set default user",
                      },
                      {
                        label: labels.no,
                        value: labels.no,
                        date: "Remove default user",
                      },
                    ]}
                    value={isDefaultState === "Yes" ? labels.yes : labels.no}
                    labelClassName="rounded-lg"
                    onValueChange={(value: string | string[]) => {
                      const isYes = Array.isArray(value)
                        ? value[0] === labels.yes
                        : value === labels.yes;
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
                  multiSelect={false} // Single select mode
                  options={[
                    {
                      label: "Active",
                      value: "Active",
                      date: "Set active",
                    },
                    { label: "Draft", value: "Draft", date: "Set draft" },
                  ]}
                  value={statusState}
                  onValueChange={(value: string | string[]) => {
                    const stringValue = Array.isArray(value)
                      ? value[0] || ""
                      : value;
                    setStatusState(stringValue);

                    // Update your form data
                    setFormData((prev) => ({
                      ...prev,
                      isDraft: stringValue === "Draft",
                      isActive: stringValue === "Active",
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
          </form>
        </div>
      </MinimizablePageLayout>

      <ResetFormModal
        opened={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        onConfirm={handleReset}
        title={labels.resetForm}
        message={labels.resetFormMessage}
        confirmText={labels.resetFormConfirm}
        cancelText={labels.cancel}
      />
    </>
  );
}
