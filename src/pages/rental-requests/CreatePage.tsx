/* eslint-disable @typescript-eslint/no-explicit-any */
import video from "@/assets/videos/test.mp4";
import { Autocomplete } from "@/components/common/Autocomplete";
import EditableInput from "@/components/common/EditableInput";
import PageLayout from "@/components/common/PageLayout";
import GenericPDF from "@/components/common/pdf";
import { ResetFormModal } from "@/components/common/ResetFormModal";
import { Button } from "@/components/ui/button";
import { PrintCommonLayout } from "@/lib/printContents/PrintCommonLayout";
import { printHtmlContent } from "@/lib/printHtmlContent";
import { toastError, toastRestore, toastSuccess } from "@/lib/toast";
import { Modal } from "@mantine/core";
import { pdf } from "@react-pdf/renderer";
import {
  BedSingle,
  Check,
  Edit,
  EthernetPort,
  Eye,
  MapPin,
  MapPinned,
  Maximize,
  Plus,
  ShowerHead,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePermission } from "@/hooks/usePermissions";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";

type ProjectTypeDataType = {
  propertyName: string;
  customer: string;
  requestNumber: string;
  inspectionDate: string;
  leaseStartDate: string;
  term: string;
  endDate: string;
  dateCreated: string;
  propertyPrice: string;
  contractAmount: string;
  clientNote: string;
  adminNote: string;

  isDefault: boolean;
  isDraft: boolean;

  createdAt: Date | null;
  draftedAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;
};

type Props = {
  isEdit?: boolean;
};

const initialData: ProjectTypeDataType = {
  propertyName: "Greenwood Apartments",
  customer: "John Doe",
  requestNumber: "REQ-1001",
  inspectionDate: "2025-01-15",
  leaseStartDate: "2025-01-15",
  term: "12 months",
  endDate: "2026-01-14",
  dateCreated: "2025-01-01",
  propertyPrice: "150000",
  contractAmount: "12000",
  clientNote: "Wants early move-in.",
  adminNote: "Check documents before finalizing.",

  isDefault: false,
  isDraft: false,
  createdAt: new Date(),
  draftedAt: null,
  updatedAt: new Date(),
  deletedAt: null,
};

export default function RentalRequestsCreatePage({ isEdit = false }: Props) {
  const navigate = useNavigate();
  const { isRTL } = useSelector((state: RootState) => state.language);

  const [keepCreating, setKeepCreating] = useState(false);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [isDefaultState, setIsDefaultState] = useState<"Yes" | "No">("No");
  const [isDraftState, setIsDraftState] = useState<"Yes" | "No">("No");

  const [printEnabled, setPrintEnabled] = useState(false);
  const [pdfChecked, setPdfChecked] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  // Permission checks
  const canCreate = usePermission("rentalRequests", "create");
  const canView = usePermission("rentalRequests", "view");
  const canEdit = usePermission("rentalRequests", "edit");
  const canDelete = usePermission("rentalRequests", "delete");
  const canPdf: boolean = usePermission("rentalRequests", "pdf");
  const canPrint: boolean = usePermission("rentalRequests", "print");

  console.log("canCreate", canCreate);
  console.log("canView", canView);
  console.log("canEdit", canEdit);
  console.log("canDelete", canDelete);

  // Field-level permissions

  const permissionsFieldLevel = usePermission<keyof ProjectTypeDataType>(
    "rentalRequests",
    "create",
    [
      "propertyName",
      "customer",
      "requestNumber",
      "inspectionDate",
      "leaseStartDate",
      "term",
      "endDate",
      "dateCreated",
      "propertyPrice",
      "contractAmount",
      "clientNote",
      "adminNote",
      "isDefault",
      "isDraft",
    ]
  );

  console.log("permissionsFieldLevel", permissionsFieldLevel);

  // Form state
  const [formData, setFormData] = useState<ProjectTypeDataType>({
    propertyName: "",
    customer: "",
    requestNumber: "",
    inspectionDate: "",
    leaseStartDate: "",
    term: "",
    endDate: "",
    dateCreated: "",
    propertyPrice: "",
    contractAmount: "",
    clientNote: "",
    adminNote: "",
    isDefault: isDefaultState === "Yes",
    isDraft: false,
    createdAt: null,
    draftedAt: null,
    updatedAt: null,
    deletedAt: null,
  });

  const [popoverOptions, setPopoverOptions] = useState([
    {
      label: isEdit ? "Create" : "Edit",
      icon: isEdit ? (
        <Plus className="w-5 h-5 text-green-500" /> // Green for Plus
      ) : (
        <Edit className="w-5 h-5 text-blue-500" /> // Blue for Edit
      ),
      onClick: () => {
        if (isEdit) {
          navigate("/rental-requests/create");
        } else {
          navigate("/rental-requests/edit/undefined");
        }
      },
      // Only show if user has permission
      show: canCreate,
    },
    {
      label: "View",
      icon: <Eye className="w-5 h-5 text-green-600" />, // Added neutral color for Eye
      onClick: () => {
        navigate("/rental-requests/view");
      },
      // Only show if user has permission
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

  // Initialize with edit data if available
  useEffect(() => {
    if (isEdit && initialData) {
      setFormData({
        ...initialData,
      });
      setIsDraftState(initialData.isDraft ? "Yes" : "No");
    }
  }, [isEdit, initialData]);

  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Normal submit logic here (API call)------------

    if (pdfChecked) {
      await handleExportPDF();
    }
    if (printEnabled) {
      handlePrintLeaves(formData);
    }

    // keep switch functionality
    if (keepCreating) {
      toastSuccess("Rental Request created successfully!");
      handleReset();
    } else {
      toastSuccess("Rental Request created successfully!");
      navigate("/rental-requests");
    }
  };

  const handleResetClick = () => {
    setIsResetModalOpen(true);
  };

  // Add this state
  const [formKey, setFormKey] = useState(0);

  // Update handleReset function
  const handleReset = () => {
    setFormData({
      propertyName: "",
      customer: "",
      requestNumber: "",
      inspectionDate: "",
      leaseStartDate: "",
      term: "",
      endDate: "",
      dateCreated: "",
      propertyPrice: "",
      contractAmount: "",
      clientNote: "",
      adminNote: "",

      isDefault: false,
      isDraft: false,
      createdAt: new Date(),
      draftedAt: null,
      updatedAt: new Date(),
      deletedAt: null,
    });
    setIsDefaultState("No");

    if (formRef.current) {
      formRef.current.reset();
    }

    // Force re-render of all inputs by changing key
    setFormKey((prev) => prev + 1);

    // Focus the first input field after reset
    setTimeout(() => {
      inputRefs.current["propertyName"]?.focus();
    }, 100); // Slightly longer delay to ensure re-render is complete
  };

  const formRef = useRef<HTMLFormElement>(null);

  const handlePrintLeaves = (leavesData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Rental Requests Details",
        data: [leavesData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          propertyName: "Property Name",
          customer: "Customer",
          requestNumber: "Request Number",
          inspectionDate: "Inspection Date",
          leaseStartDate: "Lease Start Date",
          term: "Term",
          endDate: "End Date",
          dateCreated: "Date Created",
          propertyPrice: "Property Price",
          contractAmount: "Contract Amount",
          clientNote: "Client Note",
          adminNote: "Admin Note",

          isDefault: "Default Leave",
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
      console.log("sampleReceivingData on pdf click", formData);
      const blob = await pdf(
        <GenericPDF
          data={[formData]}
          title="Rental Requests Details"
          subtitle="Rental Requests Information"
        />
      ).toBlob();

      console.log("blob", blob);

      const url = URL.createObjectURL(blob);
      console.log("url", url);
      const a = document.createElement("a");
      a.href = url;
      a.download = "rental-requests-details.pdf";
      a.click();
      console.log("a", a);
      console.log("url", url);
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
              toastRestore("Rental Request saved as draft successfully");
            },
            show: canCreate, // Only show draft option if user can create
          },
        ];
      }
      return filteredOptions;
    });
  }, [formData.isDraft, canCreate]);

  const propertyOptions: {
    label: string;
    value: string;
    propertyPrice: string;
    contractAmount: string;
  }[] = [
    {
      label: "Greenwood Apartments",
      value: "Greenwood Apartments",
      propertyPrice: "150000",
      contractAmount: "12000",
    },
    {
      label: "Lakeside Villa",
      value: "Lakeside Villa",
      propertyPrice: "150000",
      contractAmount: "12000",
    },
    {
      label: "Downtown Office Space",
      value: "Downtown Office Space",
      propertyPrice: "150000",
      contractAmount: "12000",
    },
    {
      label: "Seaside Cottage",
      value: "Seaside Cottage",
      propertyPrice: "150000",
      contractAmount: "12000",
    },
  ];

  const newitem = propertyOptions.find(
    (item) => item.value === formData.propertyName
  );

  return (
    <>
      <PageLayout
        title={isEdit ? "Editing Rental Request" : "Creating Rental Request"}
        videoSrc={video}
        videoHeader="Tutorial video"
        listPath="rental-requests"
        popoverOptions={popoverOptions}
        keepChanges={keepCreating}
        onKeepChangesChange={setKeepCreating}
        pdfChecked={pdfChecked}
        onPdfToggle={canPdf ? handlePDFSwitchChange : undefined}
        printEnabled={printEnabled}
        onPrintToggle={canPrint ? handleSwitchChange : undefined}
        activePage="create"
        // Removed onExport prop
        additionalFooterButtons={
          // Only show buttons if user can create
          canCreate ? (
            <div className="flex gap-4 items-center">
              <Button
                variant="outline"
                className="gap-2 text-primary bg-sky-200 hover:bg-primary rounded-full border-primary w-32 font-semibold!"
                onClick={handleResetClick}
              >
                Reset
              </Button>
              <Button
                ref={(el) => setRef("submitButton")(el as HTMLButtonElement)}
                id="submitButton"
                name="submitButton"
                variant="outline"
                className={`gap-2 text-primary rounded-full border-primary w-32 bg-sky-200 hover:bg-primary font-semibold!`}
                onClick={() => formRef.current?.requestSubmit()}
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
            className="space-y-6 relative"
          >
            {/* All fields in one 4-column row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {/* Leave Types field - only show if user can create */}
              {permissionsFieldLevel.propertyName && (
                <div className="space-y-2">
                  <Autocomplete
                    ref={(el: any) => setRef("propertyName")(el)}
                    id="propertyName"
                    name="propertyName"
                    options={propertyOptions.map((option) => option.label)}
                    value={formData.propertyName}
                    labelClassName="rounded-lg"
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({
                        ...prev,
                        propertyName: value,
                      }));
                      // Call focusNextInput if needed
                      focusNextInput("customer");
                    }}
                    onEnterPress={() => {
                      if (formData.propertyName) {
                        focusNextInput("customer");
                      }
                    }}
                    placeholder=" "
                    labelText="Property Name"
                    className="relative"
                    styles={{
                      input: {
                        borderColor: "var(--primary)",
                        "&:focus": {
                          borderColor: "var(--primary)",
                        },
                      },
                    }}
                  />
                </div>
              )}

              {permissionsFieldLevel.customer && (
                <div className="space-y-2">
                  <Autocomplete
                    ref={(el: any) => setRef("customer")(el)}
                    id="customer"
                    name="customer"
                    options={[
                      "John Doe",
                      "Jane Smith",
                      "TechCorp Ltd",
                      "Emily Johnson",
                    ]}
                    value={formData.customer}
                    labelClassName="rounded-lg"
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({
                        ...prev,
                        customer: value,
                      }));
                      // Call focusNextInput if needed
                      focusNextInput("requestNumber");
                    }}
                    onEnterPress={() => {
                      if (formData.customer) {
                        focusNextInput("requestNumber");
                      }
                    }}
                    placeholder=" "
                    labelText="Customer"
                    className="relative"
                    styles={{
                      input: {
                        borderColor: "var(--primary)",
                        "&:focus": {
                          borderColor: "var(--primary)",
                        },
                      },
                    }}
                  />
                </div>
              )}

              {permissionsFieldLevel.requestNumber && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("requestNumber")}
                    type="text"
                    id="requestNumber"
                    name="requestNumber"
                    value={formData.requestNumber}
                    onChange={handleChange}
                    onNext={() => focusNextInput("inspectionDate")}
                    onCancel={() =>
                      setFormData({ ...formData, requestNumber: "" })
                    }
                    labelText="Request Number"
                    tooltipText="Enter request number"
                    required
                    readOnly
                  />
                </div>
              )}

              {permissionsFieldLevel.inspectionDate && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("inspectionDate")}
                    type="date"
                    id="inspectionDate"
                    name="inspectionDate"
                    value={formData.inspectionDate}
                    onChange={handleChange}
                    onNext={() => focusNextInput("leaseStartDate")}
                    onCancel={() =>
                      setFormData({ ...formData, inspectionDate: "" })
                    }
                    labelText="Inspection Date"
                    tooltipText="Enter inspection date"
                    required
                    readOnly
                  />
                </div>
              )}

              {permissionsFieldLevel.leaseStartDate && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("leaseStartDate")}
                    type="date"
                    id="leaseStartDate"
                    name="leaseStartDate"
                    value={formData.leaseStartDate}
                    onChange={handleChange}
                    onNext={() => focusNextInput("term")}
                    onCancel={() =>
                      setFormData({ ...formData, leaseStartDate: "" })
                    }
                    labelText="Lease Start Date"
                    tooltipText="Enter lease start date"
                    required
                  />
                </div>
              )}

              {permissionsFieldLevel.term && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("term")}
                    type="text"
                    id="term"
                    name="term"
                    value={formData.term}
                    onChange={handleChange}
                    onNext={() => focusNextInput("endDate")}
                    onCancel={() => setFormData({ ...formData, term: "" })}
                    labelText="Term [ Month(s) ]"
                    tooltipText="Enter term"
                    required
                  />
                </div>
              )}

              {permissionsFieldLevel.endDate && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("endDate")}
                    type="date"
                    id="endDate"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    onNext={() => focusNextInput("dateCreated")}
                    onCancel={() => setFormData({ ...formData, endDate: "" })}
                    labelText="End Date"
                    tooltipText="Enter end date"
                    required
                  />
                </div>
              )}

              {permissionsFieldLevel.dateCreated && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("dateCreated")}
                    type="datetime-local"
                    id="dateCreated"
                    name="dateCreated"
                    value={formData.dateCreated}
                    onChange={handleChange}
                    onNext={() => focusNextInput("clientNote")}
                    onCancel={() =>
                      setFormData({ ...formData, dateCreated: "" })
                    }
                    labelText="Date Created"
                    tooltipText="Enter date created"
                    required
                  />
                </div>
              )}

              {permissionsFieldLevel.clientNote && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("clientNote")}
                    type="text"
                    id="clientNote"
                    name="clientNote"
                    value={formData.clientNote}
                    onChange={handleChange}
                    onNext={() => focusNextInput("adminNote")}
                    onCancel={() =>
                      setFormData({ ...formData, clientNote: "" })
                    }
                    labelText="Client Note"
                    tooltipText="Enter client note"
                    required
                  />
                </div>
              )}

              {permissionsFieldLevel.adminNote && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("adminNote")}
                    type="text"
                    id="adminNote"
                    name="adminNote"
                    value={formData.adminNote}
                    onChange={handleChange}
                    onNext={() => focusNextInput("adminNote")}
                    onCancel={() => setFormData({ ...formData, adminNote: "" })}
                    labelText="Admin Note"
                    tooltipText="Enter admin note"
                    required
                  />
                </div>
              )}

              {/* Default field - only show if user can create */}
              {permissionsFieldLevel.isDefault && (
                <div className="space-y-2 relative">
                  <Autocomplete
                    ref={(el: any) => setRef("isDefault")(el)}
                    id="isDefault"
                    name="isDefault"
                    options={["No", "Yes"]}
                    value={isDefaultState === "Yes" ? "Yes" : "No"}
                    labelClassName="rounded-lg"
                    isSelectableOnly={true}
                    onValueChange={(value: string) => {
                      const isYes = value === "Yes";
                      setIsDefaultState(isYes ? "Yes" : "No");
                      const newValue = isYes;
                      setFormData((prev) => ({
                        ...prev,
                        isDefault: newValue,
                      }));
                      // Call focusNextInput if needed
                      focusNextInput("isDraft");
                    }}
                    onEnterPress={() => {
                      if (
                        formData.isDefault === true ||
                        formData.isDefault === false
                      ) {
                        focusNextInput("isDraft");
                      }
                    }}
                    placeholder=" "
                    labelText="Default"
                    className="relative"
                    styles={{
                      input: {
                        borderColor: "var(--primary)",
                        "&:focus": {
                          borderColor: "var(--primary)",
                        },
                      },
                    }}
                  />
                </div>
              )}

              {/* Draft field - only show if user can create */}
              {permissionsFieldLevel.isDraft && (
                <div className="space-y-2 relative">
                  <Autocomplete
                    ref={(el: any) => setRef("isDraft")(el)}
                    id="isDraft"
                    name="isDraft"
                    options={["No", "Yes"]}
                    value={isDraftState === "Yes" ? "Yes" : "No"}
                    labelClassName="rounded-lg"
                    isSelectableOnly={true}
                    onValueChange={(value: string) => {
                      const isYes = value === "Yes";
                      setIsDraftState(isYes ? "Yes" : "No");
                      const newValue = isYes;
                      setFormData((prev) => ({
                        ...prev,
                        isDraft: newValue,
                      }));
                      focusNextInput("submitButton");
                    }}
                    onEnterPress={() => {
                      if (
                        formData.isDraft === true ||
                        formData.isDraft === false
                      ) {
                        focusNextInput("submitButton");
                      }
                    }}
                    placeholder=" "
                    labelText="Draft"
                    className="relative"
                    styles={{
                      input: {
                        borderColor: "var(--primary)",
                        "&:focus": {
                          borderColor: "var(--primary)",
                        },
                      },
                    }}
                  />
                </div>
              )}
            </div>
            {newitem && (
              <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row max-h-[250px]">
                <div className="md:w-1/3 w-full">
                  <img
                    src="/customer-dummy-image.jpg"
                    alt="Property Image"
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="p-6 flex-1">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-semibold text-gray-800">
                      {newitem.label}
                    </h2>
                    <a
                      href="#"
                      className="text-sm hover:underline flex items-center gap-1"
                    >
                      <MapPinned size={16} /> Show on Map
                    </a>
                  </div>
                  <p className="text-gray-500 mt-1 flex items-center text-sm gap-1">
                    <MapPin size={16} />
                    Saudi Arabia
                  </p>

                  <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="flex flex-col items-center bg-gray-50 p-3 rounded-lg shadow-sm gap-1">
                      <span className="text-sm text-gray-500">
                        Lot Size (SqM)
                      </span>
                      <span className="font-bold text-gray-800 flex items-center gap-1 text-sm">
                        <Maximize size={14} /> 0.00
                      </span>
                    </div>
                    <div className="flex flex-col items-center bg-gray-50 p-3 rounded-lg shadow-sm gap-1">
                      <span className="text-sm text-gray-500">Beds</span>
                      <span className="font-bold text-gray-800 flex gap-1 text-sm items-center">
                        <BedSingle size={14} />0
                      </span>
                    </div>
                    <div className="flex flex-col items-center bg-gray-50 p-3 rounded-lg shadow-sm gap-1">
                      <span className="text-sm text-gray-500">Baths</span>
                      <span className="font-bold text-gray-800 flex gap-1 text-sm items-center">
                        <ShowerHead size={14} />0
                      </span>
                    </div>
                    <div className="flex flex-col items-center bg-gray-50 p-3 rounded-lg shadow-sm gap-1">
                      <span className="text-sm text-gray-500">Garage</span>
                      <span className="font-bold text-gray-800 flex items-center gap-1 text-sm">
                        <EthernetPort size={14} />0
                      </span>
                    </div>
                  </div>

                  <div className="max-w-[200px] ml-auto mt-4 space-y-2">
                    <div className="flex items-center gap-2 justify-between">
                      <span className="text-sm text-gray-500">
                        Property Price:
                      </span>
                      <span>{newitem.propertyPrice}</span>
                    </div>
                    <div className="flex items-center gap-2 justify-between">
                      <span className="text-sm text-gray-500">
                        Contract Amount:
                      </span>
                      <span>{newitem.contractAmount}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>
      </PageLayout>

      <ResetFormModal
        opened={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        onConfirm={handleReset}
        title="Reset Form"
        message="Are you sure you want to reset the form? All changes will be lost."
        confirmText="Reset"
        cancelText="Cancel"
      />

      {/* Options Modal */}
      <Modal
        opened={isOptionModalOpen}
        onClose={() => setIsOptionModalOpen(false)}
        title="Options"
        size="xl"
        overlayProps={{ backgroundOpacity: 0.55, blur: 3 }}
      >
        <div className="pt-5 pb-14 px-5">Modal Content</div>
      </Modal>
    </>
  );
}
