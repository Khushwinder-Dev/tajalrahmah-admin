/* eslint-disable @typescript-eslint/no-explicit-any */
import video from "@/assets/videos/test.mp4";
import { Autocomplete } from "@/components/common/Autocomplete";
import EditableInput from "@/components/common/EditableInput";
import GenericPDF from "@/components/common/pdf";
import { ResetFormModal } from "@/components/common/ResetFormModal";
import { Button } from "@/components/ui/button";
import { PrintCommonLayout } from "@/lib/printContents/PrintCommonLayout";
import { printHtmlContent } from "@/lib/printHtmlContent";
import { toastError, toastRestore, toastSuccess } from "@/lib/toast";
import { pdf } from "@react-pdf/renderer";
import { Check, Edit, Eye, Plus } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { usePermission } from "@/hooks/usePermissions";
import { useAppSelector } from "@/store/hooks";
import MinimizablePageLayout from "@/components/MinimizablePageLayout";
import { useMinimizedModuleData } from "@/hooks/useMinimizedModuleData";
import { SwitchSelect } from "@/components/common/SwitchAutoComplete";
import { ImageUploader } from "@/components/common/ImageUploader";
import { ActionsAutocomplete } from "@/components/common/ActionsAutocomplete";

type DeliverymanData = {
  code: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  nationalId: string;
  vehicleType: string;
  assignedArea: string;
  customerLogo: string | null;
  isDefault: boolean;
  isActive: boolean;
  isDraft: boolean;
  isDeleted: boolean;
  createdAt: Date | null;
  draftedAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;
};

type DeliverymanModuleData = {
  formData: DeliverymanData;
  hasChanges: boolean;
  scrollPosition: number;
};

type Props = {
  isEdit?: boolean;
};

const initialData: DeliverymanData = {
  code: "DM-001",
  name: "John Doe",
  phone: "+1 202-555-0147",
  email: "john.doe@example.com",
  address: "123 Main St, New York, USA",
  nationalId: "A123456789",
  vehicleType: "Bike",
  assignedArea: "Manhattan",
  customerLogo: null,
  isDefault: false,
  isActive: true,
  isDraft: false,
  isDeleted: false,
  createdAt: new Date(),
  draftedAt: null,
  updatedAt: new Date(),
  deletedAt: null,
};

export default function DeliverymanEditPage({ isEdit = true }: Props) {
  const navigate = useNavigate();
  const { id } = useParams();
  const { isRTL } = useAppSelector((state) => state.language);

  const moduleId = `deliveryman-edit-module-${id || "new"}`;

  const {
    moduleData,
    hasMinimizedData,
    resetModuleData,
    getModuleScrollPosition,
  } = useMinimizedModuleData<DeliverymanModuleData>(moduleId);

  const [keepCreating, setKeepCreating] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [isDefaultState, setIsDefaultState] = useState<"Yes" | "No">("No");
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [printEnabled, setPrintEnabled] = useState(false);
  const [pdfChecked, setPdfChecked] = useState(false);
  const [formKey, setFormKey] = useState(0);
  const [isRestoredFromMinimized, setIsRestoredFromMinimized] = useState(false);
  const [statusState, setStatusState] = useState<string>("Active");
  const [selectedAction, setSelectedAction] = useState<string>("");

  // Permission checks
  const canCreate: boolean = usePermission("deliverymen", "create");
  const canView: boolean = usePermission("deliverymen", "view");

  // Field-level permissions
  const codePerm: boolean = usePermission("deliverymen", "edit", "code");
  const namePerm: boolean = usePermission("deliverymen", "edit", "name");
  const phonePerm: boolean = usePermission("deliverymen", "edit", "phone");
  const emailPerm: boolean = usePermission("deliverymen", "edit", "email");
  const addressPerm: boolean = usePermission("deliverymen", "edit", "address");
  const nationalIdPerm: boolean = usePermission(
    "deliverymen",
    "edit",
    "nationalId"
  );
  const vehicleTypePerm: boolean = usePermission(
    "deliverymen",
    "edit",
    "vehicleType"
  );
  const assignedAreaPerm: boolean = usePermission(
    "deliverymen",
    "edit",
    "assignedArea"
  );
  const customerLogoPerm: boolean = usePermission(
    "deliverymen",
    "edit",
    "customerLogo"
  );
  const isDefaultPerm: boolean = usePermission(
    "deliverymen",
    "edit",
    "isDefault"
  );
  const canPdf: boolean = usePermission("deliverymen", "pdf");
  const canPrint: boolean = usePermission("deliverymen", "print");

  // Vehicle type options
  const vehicleTypes = ["Bike", "Car", "Van", "Scooter", "Truck", "Motorcycle"];

  // Assigned area options
  const assignedAreas = [
    "Downtown",
    "Uptown",
    "Westside",
    "Eastside",
    "Central",
    "Harbour",
    "North Zone",
    "South Zone",
  ];

  // Form state
  const [formData, setFormData] = useState<DeliverymanData>({
    code: "",
    name: "",
    phone: "",
    email: "",
    address: "",
    nationalId: "",
    vehicleType: "",
    assignedArea: "",
    customerLogo: null,
    isDefault: false,
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

  // Restore logic using the custom hook
  useEffect(() => {
    const shouldAutoRestore =
      hasMinimizedData &&
      moduleData?.formData &&
      !isRestoredFromMinimized &&
      !formData.name &&
      !formData.code;

    if (hasMinimizedData && moduleData?.formData && shouldAutoRestore) {
      setFormData(moduleData.formData);
      setIsDefaultState(moduleData.formData.isDefault ? "Yes" : "No");
      if (moduleData.formData.isDeleted) {
        setStatusState("Delete");
      } else if (moduleData.formData.isDraft) {
        setStatusState("Draft");
      } else if (moduleData.formData.isActive) {
        setStatusState("Active");
      } else {
        setStatusState("InActive");
      }
      setIsRestoredFromMinimized(true);

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
    formData.name,
    formData.code,
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
      } else if (initialData.isActive) {
        setStatusState("Active");
      } else {
        setStatusState("InActive");
      }
    }
  }, [isEdit, hasMinimizedData, isRestoredFromMinimized]);

  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const newFormData = {
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    } as DeliverymanData;
    setFormData(newFormData);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (pdfChecked) {
      await handleExportPDF();
    }
    if (printEnabled) {
      handlePrint(formData);
    }

    toastSuccess("Deliveryman updated successfully!");
    navigate("/deliverymen");
  };

  // Update handleReset function to use the custom hook
  const handleReset = async () => {
    setFormData({
      code: "",
      name: "",
      phone: "",
      email: "",
      address: "",
      nationalId: "",
      vehicleType: "",
      assignedArea: "",
      customerLogo: null,
      isDefault: false,
      isActive: true,
      isDraft: false,
      isDeleted: false,
      createdAt: new Date(),
      draftedAt: null,
      updatedAt: new Date(),
      deletedAt: null,
    });
    setIsDefaultState("No");
    setIsRestoredFromMinimized(false);

    if (formRef.current) {
      formRef.current.reset();
    }

    setFormKey((prev) => prev + 1);

    if (hasMinimizedData) {
      try {
        await resetModuleData(moduleId);
      } catch (error) {
        console.error("Error resetting form data:", error);
      }
    }

    setTimeout(() => {
      inputRefs.current["code"]?.focus();
    }, 100);
  };

  const handleResetClick = () => {
    setIsResetModalOpen(true);
  };

  const handlePrint = (data: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Deliveryman Details",
        data: [data],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          code: "Code",
          name: "Name",
          phone: "Phone",
          email: "Email",
          address: "Address",
          nationalId: "National ID",
          vehicleType: "Vehicle Type",
          assignedArea: "Assigned Area",
          customerLogo: "Customer Logo",
          isDefault: "Default",
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
          title="Deliveryman Details"
          subtitle="Deliveryman Information"
        />
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "deliveryman-details.pdf";
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error);
      toastError("Something went wrong when generating PDF");
    }
  };

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
          navigate("/deliverymen/create");
        } else {
          navigate(`/deliverymen/edit/${id || "new"}`);
        }
      },
      show: canCreate,
    },
    {
      label: "View",
      icon: <Eye className="w-5 h-5 text-green-600" />,
      onClick: () => {
        navigate("/deliverymen/view");
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
              setFormData((prev) => ({ ...prev, isDraft: true }));
              toastRestore("Deliveryman saved as draft successfully");
            },
            show: canCreate,
          },
        ];
      }
      return filteredOptions;
    });
  }, [formData.isDraft, canCreate]);

  const handleMinimize = useCallback((): DeliverymanModuleData => {
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
        moduleName={`Edit Deliveryman`}
        moduleRoute={`/deliverymen/edit/${id || "new"}`}
        onMinimize={handleMinimize}
        title="Edit Deliveryman"
        listPath="deliverymen"
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
        module="deliverymen"
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
            {/* First Row: Code, Name, Phone, Email */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {/* Code */}
              {codePerm && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("code")}
                    id="code"
                    name="code"
                    value={formData.code}
                    onChange={handleChange}
                    onNext={() => focusNextInput("name")}
                    onCancel={() => setFormData({ ...formData, code: "" })}
                    labelText="Code"
                    tooltipText="Enter the deliveryman code"
                    required
                  />
                </div>
              )}

              {/* Name */}
              {namePerm && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("name")}
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onNext={() => focusNextInput("phone")}
                    onCancel={() => setFormData({ ...formData, name: "" })}
                    labelText="Name"
                    tooltipText="Enter the deliveryman name"
                    required
                  />
                </div>
              )}

              {/* Phone */}
              {phonePerm && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("phone")}
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    onNext={() => focusNextInput("email")}
                    onCancel={() => setFormData({ ...formData, phone: "" })}
                    labelText="Phone"
                    tooltipText="Enter phone number"
                    required
                  />
                </div>
              )}

              {/* Email */}
              {emailPerm && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("email")}
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onNext={() => focusNextInput("address")}
                    onCancel={() => setFormData({ ...formData, email: "" })}
                    labelText="Email"
                    tooltipText="Enter email address"
                    required
                    type="email"
                  />
                </div>
              )}
            </div>

            {/* Second Row: Address, National ID, Vehicle Type, Assigned Area */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {/* Address */}
              {addressPerm && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("address")}
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    onNext={() => focusNextInput("nationalId")}
                    onCancel={() => setFormData({ ...formData, address: "" })}
                    labelText="Address"
                    tooltipText="Enter address"
                    required
                  />
                </div>
              )}

              {/* National ID */}
              {nationalIdPerm && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("nationalId")}
                    id="nationalId"
                    name="nationalId"
                    value={formData.nationalId}
                    onChange={handleChange}
                    onNext={() => focusNextInput("vehicleType")}
                    onCancel={() =>
                      setFormData({ ...formData, nationalId: "" })
                    }
                    labelText="National ID"
                    tooltipText="Enter national ID"
                    required
                  />
                </div>
              )}

              {/* Vehicle Type */}
              {vehicleTypePerm && (
                <div className="space-y-2">
                  <Autocomplete
                    ref={(el: any) => setRef("vehicleType")(el)}
                    id="vehicleType"
                    name="vehicleType"
                    allowCustomInput={true}
                    options={vehicleTypes}
                    value={formData.vehicleType}
                    onValueChange={(value: string) => {
                      setFormData({ ...formData, vehicleType: value });
                      if (value) focusNextInput("assignedArea");
                    }}
                    onEnterPress={() => {
                      if (formData.vehicleType) focusNextInput("assignedArea");
                    }}
                    placeholder=" "
                    labelText="Vehicle Type"
                    className="relative"
                    tooltipText="Select vehicle type"
                    userLang={isRTL ? "ar" : "en"}
                  />
                </div>
              )}

              {/* Assigned Area */}
              {assignedAreaPerm && (
                <div className="space-y-2">
                  <Autocomplete
                    ref={(el: any) => setRef("assignedArea")(el)}
                    id="assignedArea"
                    name="assignedArea"
                    allowCustomInput={true}
                    options={assignedAreas}
                    value={formData.assignedArea}
                    onValueChange={(value: string) => {
                      setFormData({ ...formData, assignedArea: value });
                      if (value) focusNextInput("isDefault");
                    }}
                    onEnterPress={() => {
                      if (formData.assignedArea) focusNextInput("isDefault");
                    }}
                    placeholder=" "
                    labelText="Assigned Area"
                    className="relative"
                    tooltipText="Select assigned area"
                    userLang={isRTL ? "ar" : "en"}
                  />
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {/* Default */}
              {isDefaultPerm && (
                <div className="space-y-2">
                  <SwitchSelect
                    ref={(el: any) => setRef("isDefault")(el)}
                    id="isDefault"
                    name="isDefault"
                    labelText="Default"
                    multiSelect={false}
                    options={[
                      { label: "Yes", value: "Yes", date: "Set default" },
                      { label: "No", value: "No", date: "Remove default" },
                    ]}
                    value={isDefaultState === "Yes" ? "Yes" : "No"}
                    onValueChange={(value: string | string[]) => {
                      const isYes = Array.isArray(value)
                        ? value[0] === "Yes"
                        : value === "Yes";
                      setIsDefaultState(isYes ? "Yes" : "No");
                      setFormData((prev) => ({
                        ...prev,
                        isDefault: isYes,
                      }));
                    }}
                    placeholder=""
                  />
                </div>
              )}
              {/* Status - Active, InActive, Draft, Delete */}
              <div className="space-y-2">
                <SwitchSelect
                  ref={(el: any) => setRef("status")(el)}
                  id="status"
                  name="status"
                  labelText="Status"
                  multiSelect={false}
                  options={[
                    { label: "Active", value: "Active", date: "Set active" },
                    {
                      label: "InActive",
                      value: "InActive",
                      date: "Set inactive",
                    },
                    { label: "Draft", value: "Draft", date: "Set draft" },
                    { label: "Delete", value: "Delete", date: "Set delete" },
                  ]}
                  value={statusState}
                  onValueChange={(value: string | string[]) => {
                    const stringValue = Array.isArray(value)
                      ? value[0] || ""
                      : value;
                    setStatusState(stringValue);
                    setFormData((prev) => ({
                      ...prev,
                      isDeleted: stringValue === "Delete",
                      isDraft: stringValue === "Draft",
                      isActive: stringValue === "Active",
                    }));
                  }}
                  placeholder=""
                />
              </div>

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
                />
              </div>
            </div>

            {/* Customer Logo Upload at bottom */}
            {customerLogoPerm && (
              <div className="space-y-2 my-4">
                <ImageUploader
                  onImageSelect={(file: any) => {
                    try {
                      const reader = new FileReader();
                      reader.onload = (e) => {
                        setFormData((prev) => ({
                          ...prev,
                          customerLogo: (e.target?.result as string) || null,
                        }));
                      };
                      reader.readAsDataURL(file);
                    } catch (err) {
                      console.log(err);
                    }
                  }}
                  existingImages={
                    formData.customerLogo ? [formData.customerLogo] : []
                  }
                />
              </div>
            )}
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
