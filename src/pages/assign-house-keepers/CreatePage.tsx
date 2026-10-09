/* eslint-disable @typescript-eslint/no-explicit-any */
import video from "@/assets/videos/test.mp4";

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
import { Autocomplete } from "@/components/common/Autocomplete";

type HouseKeeperData = {
  houseKeeperName: string;
  roomSizeName: string;
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

const initialData: HouseKeeperData = {
  houseKeeperName: "",
  roomSizeName: "",
  isDraft: false,
  createdAt: new Date(),
  draftedAt: null,
  updatedAt: new Date(),
  deletedAt: null,
  isDeleted: false,
};

export default function HouseKeeperFormPage({ isEdit = false }: Props) {
  const navigate = useNavigate();
  const { isRTL } = useSelector((state: RootState) => state.language);

  const [keepCreating, setKeepCreating] = useState(false);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);

  const [printEnabled, setPrintEnabled] = useState(false);
  const [pdfChecked, setPdfChecked] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  // no interviewer options for house keeper

  // File upload states (removed for bonus)

  // Permission checks
  const canCreate = usePermission("assignHouseKeepers", "create");
  const canView = usePermission("assignHouseKeepers", "view");
  const canEdit = usePermission("assignHouseKeepers", "edit");
  const canDelete = usePermission("assignHouseKeepers", "delete");

  console.log("canCreate", canCreate);
  console.log("canView", canView);
  console.log("canEdit", canEdit);
  console.log("canDelete", canDelete);

  // Field-level permissions
  const houseKeeperNamePerm: boolean = usePermission(
    "assignHouseKeepers",
    "create",
    "houseKeeperName"
  );
  const roomSizeNamePerm: boolean = usePermission(
    "assignHouseKeepers",
    "create",
    "roomSizeName"
  );
  const canPdf: boolean = usePermission("assignHouseKeepers", "pdf");
  const canPrint: boolean = usePermission("assignHouseKeepers", "print");

  console.log("canPdf", canPdf);
  console.log("canPrint", canPrint);

  // No iqama/branch/from/to for house keeper create

  // Form state
  const [formData, setFormData] = useState<HouseKeeperData>({
    houseKeeperName: "",
    roomSizeName: "",
    isDraft: false,
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
          navigate("/assign-house-keepers/create");
        } else {
          navigate("/assign-house-keepers/edit/undefined");
        }
      },
      // Only show if user has permission
      show: canCreate,
    },
    {
      label: "View",
      icon: <Eye className="w-5 h-5 text-green-600" />, // Added neutral color for Eye
      onClick: () => {
        navigate("/assign-house-keepers");
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
    }
  }, [isEdit]);

  // no auto-calculation needed for house keeper

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Normal submit logic here (API call)------------

    if (pdfChecked) {
      await handleExportPDF();
    }
    if (printEnabled) {
      handlePrintHouseKeeper(formData);
    }

    // keep switch functionality
    if (keepCreating) {
      toastSuccess("House Keeper created successfully!");
      handleReset();
    } else {
      toastSuccess("House Keeper assigned successfully!");
      navigate("/assign-house-keepers");
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
      houseKeeperName: "",
      roomSizeName: "",
      isDraft: false,
      isDeleted: false,
      createdAt: new Date(),
      draftedAt: null,
      updatedAt: new Date(),
      deletedAt: null,
    });

    if (formRef.current) {
      formRef.current.reset();
    }

    // Reset file preview (removed for bonus)

    // Force re-render of all inputs by changing key
    setFormKey((prev) => prev + 1);

    // Focus the first input field after reset
    setTimeout(() => {
      inputRefs.current["houseKeeperName"]?.focus();
    }, 100); // Slightly longer delay to ensure re-render is complete
  };

  const formRef = useRef<HTMLFormElement>(null);

  // File upload handlers (removed for bonus)

  const handlePrintHouseKeeper = (data: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Assign House Keeper Details",
        data: [data],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          houseKeeperName: "House Keeper",
          roomSizeName: "Room Size",
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
      console.log("houseKeeperData on pdf click", formData);
      const blob = await pdf(
        <GenericPDF
          data={[formData]}
          title="Assign House Keeper Details"
          subtitle="House Keeper Assignment Information"
        />
      ).toBlob();

      console.log("blob", blob);

      const url = URL.createObjectURL(blob);
      console.log("url", url);
      const a = document.createElement("a");
      a.href = url;
      a.download = "house-keeper-details.pdf";
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
              toastRestore("House Keeper saved as draft successfully");
            },
            show: canCreate, // Only show draft option if user can create
          },
        ];
      }
      return filteredOptions;
    });
  }, [formData.isDraft, canCreate]);

  return (
    <>
      <PageLayout
        title={isEdit ? "Editing House Keeper" : "Creating House Keeper"}
        videoSrc={video}
        videoHeader="Tutorial video"
        listPath="assign-house-keepers"
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
            {/* Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8 relative">
              {houseKeeperNamePerm && (
                <div className="space-y-2">
                  <Autocomplete
                    ref={(el: any) => setRef("houseKeeperName")(el)}
                    id="houseKeeperName"
                    name="houseKeeperName"
                    allowCustomInput={true}
                    options={[
                      "John Smith",
                      "Maria Garcia",
                      "Ahmed Hassan",
                      "Sarah Johnson",
                      "Lisa Chen",
                      "David Wilson",
                      "Fatima Al-Zahra",
                      "Michael Brown",
                      "Elena Petrov",
                      "James Lee",
                      "Aisha Patel",
                    ]}
                    value={formData.houseKeeperName}
                    onValueChange={(value: string) => {
                      setFormData({ ...formData, houseKeeperName: value });
                      if (value) {
                        focusNextInput("roomSizeName");
                      }
                    }}
                    onEnterPress={() => {
                      if (formData.houseKeeperName) {
                        focusNextInput("roomSizeName");
                      }
                    }}
                    placeholder=" "
                    labelText="House Keeper"
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

              {roomSizeNamePerm && (
                <div className="space-y-2">
                  <Autocomplete
                    ref={(el: any) => setRef("roomSizeName")(el)}
                    id="roomSizeName"
                    name="roomSizeName"
                    allowCustomInput={true}
                    options={[
                      "VIP Suite",
                      "Standard Room",
                      "Conference Room",
                      "Dining Area",
                      "Pool Area",
                      "Spa & Wellness",
                      "Lobby & Reception",
                      "Staff Quarters",
                      "Gym & Fitness",
                      "Banquet Hall",
                      "Parking Area",
                      "Laundry & Storage",
                    ]}
                    value={formData.roomSizeName}
                    onValueChange={(value: string) => {
                      setFormData({ ...formData, roomSizeName: value });
                      if (value) {
                        focusNextInput("submitButton");
                      }
                    }}
                    onEnterPress={() => {
                      if (formData.roomSizeName) {
                        focusNextInput("submitButton");
                      }
                    }}
                    placeholder=" "
                    labelText="Room Size"
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

      {/* Removed employee modal for house keeper create */}

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
