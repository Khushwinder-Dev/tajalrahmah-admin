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
import { Check, Edit, Eye, Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePermission } from "@/hooks/usePermissions";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";

type ProjectTypeDataType = {
  propertyCode: string;
  propertyName: string;
  group: string;
  propertyType: string;
  propertyStyle: string;
  transactionType: string;

  sellingPrice: string;
  propertyNumber?: string;
  propertyCondition: string;
  newConstruction: string;
  yearBuilt?: string;
  availabilityDate?: string; // ISO date string

  lotSizeSqm?: string;
  totalFloors?: string;
  energyEfficiency?: string;
  gasEmission?: string;
  energyEfficient?: string;

  building?: string;
  streetNumber?: string;
  streetName?: string;
  streetType?: string;
  zone?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  areaNumber?: string;
  country: string;
  latitude?: string;
  longitude?: string;

  nearestHospital?: string;
  nearestSchool?: string;
  nearestLandmark?: string;
  description?: string;

  isDefault: boolean;
  isActive: boolean;
  isDeleted: boolean;

  createdAt: Date | null;
  draftedAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;
};

type Props = {
  isEdit?: boolean;
};

const initialData: ProjectTypeDataType = {
  propertyCode: "P-001",
  propertyName: "Sunrise Villa",
  group: "Residential",
  propertyType: "Villa",
  propertyStyle: "Modern",
  transactionType: "Sale",

  sellingPrice: "250000",
  propertyNumber: "SV-101",
  propertyCondition: "Excellent",
  newConstruction: "Yes",
  yearBuilt: "2023",
  availabilityDate: "2025-09-01",

  lotSizeSqm: "450",
  totalFloors: "2",
  energyEfficiency: "A+",
  gasEmission: "Low",
  energyEfficient: "Yes",

  building: "Sunrise Complex",
  streetNumber: "12B",
  streetName: "Lakeview",
  streetType: "Road",
  zone: "Zone-5",
  city: "Dhaka",
  state: "Dhaka Division",
  zipCode: "1207",
  areaNumber: "A-21",
  country: "Bangladesh",
  latitude: "23.8103",
  longitude: "90.4125",

  nearestHospital: "City Care Hospital",
  nearestSchool: "Green Field School",
  nearestLandmark: "Central Park",
  description:
    "A beautiful modern villa with lake view, fully furnished, and ready to move in.",

  isDefault: false,
  isActive: false,
  isDeleted: false,
  createdAt: new Date(),
  draftedAt: null,
  updatedAt: new Date(),
  deletedAt: null,
};

export default function PropertyApprovalEditPage({ isEdit = false }: Props) {
  const navigate = useNavigate();
  const { isRTL } = useSelector((state: RootState) => state.language);

  const [keepCreating, setKeepCreating] = useState(false);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [isDefaultState, setIsDefaultState] = useState<"Yes" | "No" | string>(
    "No"
  );
  const [isActiveState, setIsActiveState] = useState<"Yes" | "No" | string>(
    "No"
  );
  const [isDeletedState, setIsDeletedState] = useState<
    "Delete" | "Restore" | string
  >("");

  const [printEnabled, setPrintEnabled] = useState(false);
  const [pdfChecked, setPdfChecked] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  // Permission checks
  const canCreate = usePermission("propertyApproval", "create");
  const canView = usePermission("propertyApproval", "view");
  const canEdit = usePermission("propertyApproval", "edit");
  const canDelete = usePermission("propertyApproval", "delete");

  console.log("canCreate", canCreate);
  console.log("canView", canView);
  console.log("canEdit", canEdit);
  console.log("canDelete", canDelete);

  // Field-level permissions

  const propertyCode: boolean = usePermission(
    "propertyApproval",
    "create",
    "propertyCode"
  );
  const propertyName: boolean = usePermission(
    "propertyApproval",
    "create",
    "propertyName"
  );
  const group: boolean = usePermission("propertyApproval", "create", "group");
  const propertyType: boolean = usePermission(
    "propertyApproval",
    "create",
    "propertyType"
  );
  const propertyStyle: boolean = usePermission(
    "propertyApproval",
    "create",
    "propertyStyle"
  );
  const transactionType: boolean = usePermission(
    "propertyApproval",
    "create",
    "transactionType"
  );

  const sellingPrice: boolean = usePermission(
    "propertyApproval",
    "create",
    "sellingPrice"
  );
  const propertyNumber: boolean = usePermission(
    "propertyApproval",
    "create",
    "propertyNumber"
  );
  const propertyCondition: boolean = usePermission(
    "propertyApproval",
    "create",
    "propertyCondition"
  );
  const newConstruction: boolean = usePermission(
    "propertyApproval",
    "create",
    "newConstruction"
  );
  const yearBuilt: boolean = usePermission(
    "propertyApproval",
    "create",
    "yearBuilt"
  );
  const availabilityDate: boolean = usePermission(
    "propertyApproval",
    "create",
    "availabilityDate"
  );

  const lotSizeSqm: boolean = usePermission(
    "propertyApproval",
    "create",
    "lotSizeSqm"
  );
  const totalFloors: boolean = usePermission(
    "propertyApproval",
    "create",
    "totalFloors"
  );
  const energyEfficiency: boolean = usePermission(
    "propertyApproval",
    "create",
    "energyEfficiency"
  );
  const gasEmission: boolean = usePermission(
    "propertyApproval",
    "create",
    "gasEmission"
  );
  const energyEfficient: boolean = usePermission(
    "propertyApproval",
    "create",
    "energyEfficient"
  );

  const building: boolean = usePermission(
    "propertyApproval",
    "create",
    "building"
  );
  const streetNumber: boolean = usePermission(
    "propertyApproval",
    "create",
    "streetNumber"
  );
  const streetName: boolean = usePermission(
    "propertyApproval",
    "create",
    "streetName"
  );
  const streetType: boolean = usePermission(
    "propertyApproval",
    "create",
    "streetType"
  );
  const zone: boolean = usePermission("propertyApproval", "create", "zone");
  const city: boolean = usePermission("propertyApproval", "create", "city");
  const state: boolean = usePermission("propertyApproval", "create", "state");
  const zipCode: boolean = usePermission(
    "propertyApproval",
    "create",
    "zipCode"
  );
  const areaNumber: boolean = usePermission(
    "propertyApproval",
    "create",
    "areaNumber"
  );
  const country: boolean = usePermission(
    "propertyApproval",
    "create",
    "country"
  );
  const latitude: boolean = usePermission(
    "propertyApproval",
    "create",
    "latitude"
  );
  const longitude: boolean = usePermission(
    "propertyApproval",
    "create",
    "longitude"
  );

  const nearestHospital: boolean = usePermission(
    "propertyApproval",
    "create",
    "nearestHospital"
  );
  const nearestSchool: boolean = usePermission(
    "propertyApproval",
    "create",
    "nearestSchool"
  );
  const nearestLandmark: boolean = usePermission(
    "propertyApproval",
    "create",
    "nearestLandmark"
  );
  const description: boolean = usePermission(
    "propertyApproval",
    "create",
    "description"
  );

  const isDefault: boolean = usePermission(
    "propertyApproval",
    "create",
    "isDefault"
  );

  const isActive: boolean = usePermission(
    "propertyApproval",
    "create",
    "isActive"
  );
  const isDeleted: boolean = usePermission(
    "propertyApproval",
    "create",
    "isDeleted"
  );

  const isDraft: boolean = usePermission(
    "propertyApproval",
    "create",
    "isDraft"
  );
  const canPdf: boolean = usePermission("propertyApproval", "pdf");
  const canPrint: boolean = usePermission("propertyApproval", "print");

  console.log("propertyCode", propertyCode);
  console.log("isDefault", isDefault);
  console.log("isDraft", isDraft);
  console.log("canPdf", canPdf);
  console.log("canPrint", canPrint);

  // Form state
  const [formData, setFormData] = useState<ProjectTypeDataType>({
    propertyCode: "",
    propertyName: "",
    group: "",
    propertyType: "",
    propertyStyle: "",
    transactionType: "",

    sellingPrice: "",
    propertyNumber: "",
    propertyCondition: "",
    newConstruction: "",
    yearBuilt: "",
    availabilityDate: "",

    lotSizeSqm: "",
    totalFloors: "",
    energyEfficiency: "",
    gasEmission: "",
    energyEfficient: "",

    building: "",
    streetNumber: "",
    streetName: "",
    streetType: "",
    zone: "",
    city: "",
    state: "",
    zipCode: "",
    areaNumber: "",
    country: "",
    latitude: "",
    longitude: "",

    nearestHospital: "",
    nearestSchool: "",
    nearestLandmark: "",
    description: "",

    isDefault: isDefaultState === "Yes",
    isActive: false,
    isDeleted: false,
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
          navigate("/property-approval/create");
        } else {
          navigate("/property-approval/edit/undefined");
        }
      },
      // Only show if user has permission
      show: canCreate,
    },
    {
      label: "View",
      icon: <Eye className="w-5 h-5 text-green-600" />, // Added neutral color for Eye
      onClick: () => {
        navigate("/property-approval/view");
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
      setIsDefaultState(initialData.isDefault ? "Yes" : "No");
      setIsActiveState(initialData.isActive ? "Yes" : "No");
      setIsDeletedState(initialData.isDeleted ? "Delete" : "Restore");
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
      toastSuccess("Property approval created successfully!");
      handleReset();
    } else {
      toastSuccess("Property approval created successfully!");
      navigate("/property-approval");
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
      propertyCode: "",
      propertyName: "",
      group: "",
      propertyType: "",
      propertyStyle: "",

      transactionType: "",

      sellingPrice: "",
      propertyNumber: "",
      propertyCondition: "",
      newConstruction: "",
      yearBuilt: "",
      availabilityDate: "",

      lotSizeSqm: "",
      totalFloors: "",
      energyEfficiency: "",
      gasEmission: "",
      energyEfficient: "",

      building: "",
      streetNumber: "",
      streetName: "",
      streetType: "",
      zone: "",
      city: "",
      state: "",
      zipCode: "",
      areaNumber: "",
      country: "",
      latitude: "",
      longitude: "",

      nearestHospital: "",
      nearestSchool: "",
      nearestLandmark: "",
      description: "",
      isDefault: false,
      isActive: false,
      isDeleted: false,
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
      inputRefs.current["propertyCode"]?.focus();
    }, 100); // Slightly longer delay to ensure re-render is complete
  };

  const formRef = useRef<HTMLFormElement>(null);

  const handlePrintLeaves = (leavesData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Property Approval Details",
        data: [leavesData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          propertyCode: "Property Code",
          propertyName: "Property Name",
          group: "Group",
          propertyType: "Property Type",
          propertyStyle: "Property Style",
          transactionType: "Transaction Type",
          sellingPrice: "Selling Price",
          propertyNumber: "Property Number",
          propertyCondition: "Property Condition",
          newConstruction: "New Construction",
          yearBuilt: "Year Built",
          availabilityDate: "Availability Date",
          lotSizeSqm: "Lot Size SQM",
          totalFloors: "Total Floors",
          energyEfficiency: "Energy Efficiency",
          gasEmission: "Gas Emission",
          energyEfficient: "Energy Efficient",
          building: "Building",
          streetNumber: "Street Number",
          streetName: "Street Name",
          streetType: "Street Type",
          zone: "Zone",
          city: "City",
          state: "State",
          zipCode: "Zip Code",
          areaNumber: "Area Number",
          country: "Country",
          latitude: "Latitude",
          longitude: "Longitude",
          nearestHospital: "Nearest Hospital",
          nearestSchool: "Nearest School",
          nearestLandmark: "Nearest Landmark",
          description: "Description",
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
          title="Property Approval Details"
          subtitle="Property Approval Information"
        />
      ).toBlob();

      console.log("blob", blob);

      const url = URL.createObjectURL(blob);
      console.log("url", url);
      const a = document.createElement("a");
      a.href = url;
      a.download = "property-approval-details.pdf";
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
      if (!formData.isActive) {
        return [
          ...filteredOptions,
          {
            label: "Draft",
            icon: <Check className="text-green-500" />,
            onClick: () => {
              setFormData((prev) => ({
                ...prev,
                isActive: true,
              }));
              toastRestore("Property approval saved as draft successfully");
            },
            show: canCreate, // Only show draft option if user can create
          },
        ];
      }
      return filteredOptions;
    });
  }, [formData.isActive, canCreate]);

  return (
    <>
      <PageLayout
        title={
          isEdit ? "Editing Property Approval" : "Creating Property Approval"
        }
        videoSrc={video}
        videoHeader="Tutorial video"
        listPath="property-approval"
        popoverOptions={popoverOptions}
        keepChanges={keepCreating}
        onKeepChangesChange={setKeepCreating}
        pdfChecked={pdfChecked}
        onPdfToggle={canPdf ? handlePDFSwitchChange : undefined}
        printEnabled={printEnabled}
        onPrintToggle={canPrint ? handleSwitchChange : undefined}
        activePage="edit"
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
              {propertyCode && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("propertyCode")}
                    type="text"
                    id="propertyCode"
                    name="propertyCode"
                    value={formData.propertyCode}
                    onChange={handleChange}
                    onNext={() => focusNextInput("propertyName")}
                    onCancel={() =>
                      setFormData({ ...formData, propertyCode: "" })
                    }
                    labelText="Property Code"
                    tooltipText="Enter property code"
                    required
                  />
                </div>
              )}

              {propertyName && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("propertyName")}
                    type="text"
                    id="propertyName"
                    name="propertyName"
                    value={formData.propertyName}
                    onChange={handleChange}
                    onNext={() => focusNextInput("group")}
                    onCancel={() =>
                      setFormData({ ...formData, propertyName: "" })
                    }
                    labelText="Property Name"
                    tooltipText="Enter property name"
                    required
                  />
                </div>
              )}

              {group && (
                <div className="space-y-2">
                  <Autocomplete
                    ref={(el: any) => setRef("group")(el)}
                    id="group"
                    name="group"
                    options={["Group One", "Group Two"]}
                    value={formData.group}
                    labelClassName="rounded-lg"
                    isSelectableOnly={true}
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({
                        ...prev,
                        group: value,
                      }));
                      // Call focusNextInput if needed
                      focusNextInput("propertyType");
                    }}
                    onEnterPress={() => {
                      if (formData.group) {
                        focusNextInput("propertyType");
                      }
                    }}
                    placeholder=" "
                    labelText="Group"
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

              {propertyType && (
                <div className="space-y-2">
                  <Autocomplete
                    ref={(el: any) => setRef("propertyType")(el)}
                    id="propertyType"
                    name="propertyType"
                    options={["Type One", "Type Two"]}
                    value={formData.propertyType}
                    labelClassName="rounded-lg"
                    isSelectableOnly={true}
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({
                        ...prev,
                        propertyType: value,
                      }));
                      // Call focusNextInput if needed
                      focusNextInput("propertyStyle");
                    }}
                    onEnterPress={() => {
                      if (formData.propertyType) {
                        focusNextInput("propertyStyle");
                      }
                    }}
                    placeholder=" "
                    labelText="Property Type"
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

              {propertyStyle && (
                <div className="space-y-2">
                  <Autocomplete
                    ref={(el: any) => setRef("propertyStyle")(el)}
                    id="propertyStyle"
                    name="propertyStyle"
                    options={["Style One", "Style Two"]}
                    value={formData.propertyStyle}
                    labelClassName="rounded-lg"
                    isSelectableOnly={true}
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({
                        ...prev,
                        propertyStyle: value,
                      }));
                      // Call focusNextInput if needed
                      focusNextInput("transactionType");
                    }}
                    onEnterPress={() => {
                      if (formData.propertyStyle) {
                        focusNextInput("transactionType");
                      }
                    }}
                    placeholder=" "
                    labelText="Property Style"
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

              {transactionType && (
                <div className="space-y-2">
                  <Autocomplete
                    ref={(el: any) => setRef("transactionType")(el)}
                    id="transactionType"
                    name="transactionType"
                    options={["Type One", "Type Two"]}
                    value={formData.transactionType}
                    labelClassName="rounded-lg"
                    isSelectableOnly={true}
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({
                        ...prev,
                        transactionType: value,
                      }));
                      // Call focusNextInput if needed
                      focusNextInput("sellingPrice");
                    }}
                    onEnterPress={() => {
                      if (formData.transactionType) {
                        focusNextInput("sellingPrice");
                      }
                    }}
                    placeholder=" "
                    labelText="Transaction Type"
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

              {sellingPrice && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("sellingPrice")}
                    type="text"
                    id="sellingPrice"
                    name="sellingPrice"
                    value={formData.sellingPrice}
                    onChange={handleChange}
                    onNext={() => focusNextInput("propertyNumber")}
                    onCancel={() =>
                      setFormData({ ...formData, sellingPrice: "" })
                    }
                    labelText="Selling Price"
                    tooltipText="Enter selling price"
                    required
                  />
                </div>
              )}

              {propertyNumber && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("propertyNumber")}
                    type="text"
                    id="propertyNumber"
                    name="propertyNumber"
                    value={formData.propertyNumber || ""}
                    onChange={handleChange}
                    onNext={() => focusNextInput("propertyCondition")}
                    onCancel={() =>
                      setFormData({ ...formData, propertyNumber: "" })
                    }
                    labelText="Property Number"
                    tooltipText="Enter property number"
                    required
                  />
                </div>
              )}

              {propertyCondition && (
                <div className="space-y-2">
                  <Autocomplete
                    ref={(el: any) => setRef("propertyCondition")(el)}
                    id="propertyCondition"
                    name="propertyCondition"
                    options={["Condition One", "Condition Two"]}
                    value={formData.propertyCondition}
                    labelClassName="rounded-lg"
                    isSelectableOnly={true}
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({
                        ...prev,
                        propertyCondition: value,
                      }));
                      // Call focusNextInput if needed
                      focusNextInput("newConstruction");
                    }}
                    onEnterPress={() => {
                      if (formData.propertyCondition) {
                        focusNextInput("newConstruction");
                      }
                    }}
                    placeholder=" "
                    labelText="Property Condition"
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

              {newConstruction && (
                <div className="space-y-2">
                  <Autocomplete
                    ref={(el: any) => setRef("newConstruction")(el)}
                    id="newConstruction"
                    name="newConstruction"
                    options={["Yes", "No"]}
                    value={formData.newConstruction}
                    labelClassName="rounded-lg"
                    isSelectableOnly={true}
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({
                        ...prev,
                        newConstruction: value,
                      }));
                      // Call focusNextInput if needed
                      focusNextInput("yearBuilt");
                    }}
                    onEnterPress={() => {
                      if (formData.newConstruction) {
                        focusNextInput("yearBuilt");
                      }
                    }}
                    placeholder=" "
                    labelText="New Construction"
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

              {yearBuilt && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("yearBuilt")}
                    type="text"
                    id="yearBuilt"
                    name="yearBuilt"
                    value={formData.yearBuilt || ""}
                    onChange={handleChange}
                    onNext={() => focusNextInput("availabilityDate")}
                    onCancel={() => setFormData({ ...formData, yearBuilt: "" })}
                    labelText="Year Built"
                    tooltipText="Enter year built"
                    required
                  />
                </div>
              )}

              {availabilityDate && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("availabilityDate")}
                    type="date"
                    id="availabilityDate"
                    name="availabilityDate"
                    value={formData.availabilityDate || ""}
                    onChange={handleChange}
                    onNext={() => focusNextInput("lotSizeSqm")}
                    onCancel={() =>
                      setFormData({ ...formData, availabilityDate: "" })
                    }
                    labelText="Availability Date"
                    tooltipText="Enter availability date"
                    required
                  />
                </div>
              )}

              {lotSizeSqm && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("lotSizeSqm")}
                    type="text"
                    id="lotSizeSqm"
                    name="lotSizeSqm"
                    value={formData.lotSizeSqm || ""}
                    onChange={handleChange}
                    onNext={() => focusNextInput("totalFloors")}
                    onCancel={() =>
                      setFormData({ ...formData, lotSizeSqm: "" })
                    }
                    labelText="Lot Size (Sqm)"
                    tooltipText="Enter lot size in square meters"
                    required
                  />
                </div>
              )}

              {totalFloors && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("totalFloors")}
                    type="text"
                    id="totalFloors"
                    name="totalFloors"
                    value={formData.totalFloors || ""}
                    onChange={handleChange}
                    onNext={() => focusNextInput("energyEfficiency")}
                    onCancel={() =>
                      setFormData({ ...formData, totalFloors: "" })
                    }
                    labelText="Total Floors"
                    tooltipText="Enter total floors"
                    required
                  />
                </div>
              )}

              {/* Energy Efficiency */}
              {energyEfficiency && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("energyEfficiency")}
                    type="text"
                    id="energyEfficiency"
                    name="energyEfficiency"
                    value={formData.energyEfficiency || ""}
                    onChange={handleChange}
                    onNext={() => focusNextInput("gasEmission")}
                    onCancel={() =>
                      setFormData({ ...formData, energyEfficiency: "" })
                    }
                    labelText="Energy Efficiency"
                    tooltipText="Enter energy efficiency"
                    required
                  />
                </div>
              )}

              {/* Gas Emission */}
              {gasEmission && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("gasEmission")}
                    type="text"
                    id="gasEmission"
                    name="gasEmission"
                    value={formData.gasEmission || ""}
                    onChange={handleChange}
                    onNext={() => focusNextInput("energyEfficient")}
                    onCancel={() =>
                      setFormData({ ...formData, gasEmission: "" })
                    }
                    labelText="Gas Emission"
                    tooltipText="Enter gas emission"
                    required
                  />
                </div>
              )}
              {/* Energy efficient */}
              {energyEfficient && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("energyEfficient")}
                    type="text"
                    id="energyEfficient"
                    name="energyEfficient"
                    value={formData.energyEfficient || ""}
                    onChange={handleChange}
                    onNext={() => focusNextInput("building")}
                    onCancel={() =>
                      setFormData({ ...formData, energyEfficient: "" })
                    }
                    labelText="Energy Efficient"
                    tooltipText="Enter energy efficient"
                    required
                  />
                </div>
              )}
              {/* Building */}
              {building && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("building")}
                    type="text"
                    id="building"
                    name="building"
                    value={formData.building || ""}
                    onChange={handleChange}
                    onNext={() => focusNextInput("streetNumber")}
                    onCancel={() => setFormData({ ...formData, building: "" })}
                    labelText="Building"
                    tooltipText="Enter building"
                    required
                  />
                </div>
              )}

              {/* Street Number */}
              {streetNumber && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("streetNumber")}
                    type="text"
                    id="streetNumber"
                    name="streetNumber"
                    value={formData.streetNumber || ""}
                    onChange={handleChange}
                    onNext={() => focusNextInput("streetName")}
                    onCancel={() =>
                      setFormData({ ...formData, streetNumber: "" })
                    }
                    labelText="Street Number"
                    tooltipText="Enter street number"
                    required
                  />
                </div>
              )}

              {/* Street Name */}
              {streetName && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("streetName")}
                    type="text"
                    id="streetName"
                    name="streetName"
                    value={formData.streetName || ""}
                    onChange={handleChange}
                    onNext={() => focusNextInput("streetType")}
                    onCancel={() =>
                      setFormData({ ...formData, streetName: "" })
                    }
                    labelText="Street Name"
                    tooltipText="Enter street name"
                    required
                  />
                </div>
              )}

              {/* Street Type autocomplete */}
              {streetType && (
                <div className="space-y-2">
                  <Autocomplete
                    ref={(el: any) => setRef("streetType")(el)}
                    id="streetType"
                    name="streetType"
                    options={["Road", "Street", "Avenue"]}
                    value={formData.streetType}
                    labelClassName="rounded-lg"
                    isSelectableOnly={true}
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({
                        ...prev,
                        streetType: value,
                      }));
                      // Call focusNextInput if needed
                      focusNextInput("zone");
                    }}
                    onEnterPress={() => {
                      if (formData.streetType) {
                        focusNextInput("zone");
                      }
                    }}
                    placeholder=" "
                    labelText="Street Type"
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

              {/* Zone */}
              {zone && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("zone")}
                    type="text"
                    id="zone"
                    name="zone"
                    value={formData.zone || ""}
                    onChange={handleChange}
                    onNext={() => focusNextInput("city")}
                    onCancel={() => setFormData({ ...formData, zone: "" })}
                    labelText="Zone"
                    tooltipText="Enter zone"
                    required
                  />
                </div>
              )}

              {/* City */}
              {city && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("city")}
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city || ""}
                    onChange={handleChange}
                    onNext={() => focusNextInput("state")}
                    onCancel={() => setFormData({ ...formData, city: "" })}
                    labelText="City"
                    tooltipText="Enter city"
                    required
                  />
                </div>
              )}

              {/* State */}
              {state && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("state")}
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state || ""}
                    onChange={handleChange}
                    onNext={() => focusNextInput("zipCode")}
                    onCancel={() => setFormData({ ...formData, state: "" })}
                    labelText="State"
                    tooltipText="Enter state"
                    required
                  />
                </div>
              )}

              {/* Zip Code */}
              {zipCode && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("zipCode")}
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode || ""}
                    onChange={handleChange}
                    onNext={() => focusNextInput("areaNumber")}
                    onCancel={() => setFormData({ ...formData, zipCode: "" })}
                    labelText="Zip Code"
                    tooltipText="Enter zip code"
                    required
                  />
                </div>
              )}

              {/* Area Number */}
              {areaNumber && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("areaNumber")}
                    type="text"
                    id="areaNumber"
                    name="areaNumber"
                    value={formData.areaNumber || ""}
                    onChange={handleChange}
                    onNext={() => focusNextInput("country")}
                    onCancel={() =>
                      setFormData({ ...formData, areaNumber: "" })
                    }
                    labelText="Area Number"
                    tooltipText="Enter area number"
                    required
                  />
                </div>
              )}

              {/* Country */}
              {country && (
                <Autocomplete
                  ref={(el: any) => setRef("country")(el)}
                  id="country"
                  name="country"
                  options={["BD", "US", "UK", "IN"]}
                  value={formData.country}
                  labelClassName="rounded-lg"
                  isSelectableOnly={true}
                  onValueChange={(value: string) => {
                    setFormData((prev) => ({
                      ...prev,
                      country: value,
                    }));
                    // Call focusNextInput if needed
                    focusNextInput("latitude");
                  }}
                  onEnterPress={() => {
                    if (formData.country) {
                      focusNextInput("latitude");
                    }
                  }}
                  placeholder=" "
                  labelText="Country"
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
              )}

              {/* Latitude */}
              {latitude && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("latitude")}
                    type="text"
                    id="latitude"
                    name="latitude"
                    value={formData.latitude || ""}
                    onChange={handleChange}
                    onNext={() => focusNextInput("longitude")}
                    onCancel={() => setFormData({ ...formData, latitude: "" })}
                    labelText="Latitude"
                    tooltipText="Enter latitude"
                    required
                  />
                </div>
              )}

              {/* Longitude */}
              {longitude && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("longitude")}
                    type="text"
                    id="longitude"
                    name="longitude"
                    value={formData.longitude || ""}
                    onChange={handleChange}
                    onNext={() => focusNextInput("nearestHospital")}
                    onCancel={() => setFormData({ ...formData, longitude: "" })}
                    labelText="Longitude"
                    tooltipText="Enter longitude"
                    required
                  />
                </div>
              )}

              {/* Nearest Hospital */}
              {nearestHospital && (
                <div className="space-y-2">
                  <Autocomplete
                    ref={(el: any) => setRef("nearestHospital")(el)}
                    id="nearestHospital"
                    name="nearestHospital"
                    options={["Nearest Hospital One", "Nearest Hospital Two"]}
                    value={formData.nearestHospital}
                    labelClassName="rounded-lg"
                    isSelectableOnly={true}
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({
                        ...prev,
                        nearestHospital: value,
                      }));
                      // Call focusNextInput if needed
                      focusNextInput("nearestSchool");
                    }}
                    onEnterPress={() => {
                      if (formData.nearestHospital) {
                        focusNextInput("nearestSchool");
                      }
                    }}
                    placeholder=" "
                    labelText="Nearest Hospital"
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

              {/* Nearest School */}
              {nearestSchool && (
                <div className="space-y-2">
                  <Autocomplete
                    ref={(el: any) => setRef("nearestSchool")(el)}
                    id="nearestSchool"
                    name="nearestSchool"
                    options={["Nearest School One", "Nearest School Two"]}
                    value={formData.nearestSchool}
                    labelClassName="rounded-lg"
                    isSelectableOnly={true}
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({
                        ...prev,
                        nearestSchool: value,
                      }));
                      // Call focusNextInput if needed
                      focusNextInput("nearestLandmark");
                    }}
                    onEnterPress={() => {
                      if (formData.nearestSchool) {
                        focusNextInput("nearestLandmark");
                      }
                    }}
                    placeholder=" "
                    labelText="Nearest School"
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

              {/* Nearest Landmark */}
              {nearestLandmark && (
                <div className="space-y-2">
                  <Autocomplete
                    ref={(el: any) => setRef("nearestLandmark")(el)}
                    id="nearestLandmark"
                    name="nearestLandmark"
                    options={["Nearest Landmark One", "Nearest Landmark Two"]}
                    value={formData.nearestLandmark}
                    labelClassName="rounded-lg"
                    isSelectableOnly={true}
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({
                        ...prev,
                        nearestLandmark: value,
                      }));
                      // Call focusNextInput if needed
                      focusNextInput("description");
                    }}
                    onEnterPress={() => {
                      if (formData.nearestLandmark) {
                        focusNextInput("description");
                      }
                    }}
                    placeholder=" "
                    labelText="Nearest Landmark"
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
              {description && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("description")}
                    type="text"
                    id="description"
                    name="description"
                    value={formData.description || ""}
                    onChange={handleChange}
                    onNext={() => focusNextInput("isDefault")}
                    onCancel={() =>
                      setFormData({ ...formData, description: "" })
                    }
                    labelText="Description"
                    tooltipText="Enter description"
                    required
                  />
                </div>
              )}

              {/* Default field - only show if user can create */}
              {isDefault && (
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

              {isActive && (
                <div className="space-y-2">
                  <Autocomplete
                    ref={(el: any) => setRef("isActive")(el)}
                    id="isActive"
                    name="isActive"
                    labelText="Inactive"
                    isSelectableOnly={true}
                    options={["No", "Yes"]}
                    value={isActiveState === "Yes" ? "Yes" : "No"}
                    onValueChange={(value: string) => {
                      const isYes = value === "Yes";
                      setIsActiveState(isYes ? "Yes" : "No");
                      setFormData((prev) => ({
                        ...prev,
                        isActive: isYes,
                      }));
                      focusNextInput("isDeleted");
                    }}
                    onEnterPress={() => {
                      focusNextInput("isDeleted");
                    }}
                    placeholder=" "
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

              {isDeleted && (
                <div className="space-y-2">
                  <Autocomplete
                    ref={(el: any) => setRef("isDeleted")(el)}
                    id="isDeleted"
                    name="isDeleted"
                    labelText="Status"
                    isSelectableOnly={true}
                    options={["Delete", "Restore"]}
                    value={isDeletedState}
                    onValueChange={(value: "Delete" | "Restore") => {
                      if (value === "Delete" || value === "Restore") {
                        setIsDeletedState(value);
                        const newValue = value === "Delete";
                        setFormData((prev) => ({
                          ...prev,
                          isDeleted: newValue,
                        }));
                      }
                    }}
                    onKeyDown={(e: React.KeyboardEvent) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        focusNextInput("fileUploadElement");
                      }
                    }}
                    placeholder=" "
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
