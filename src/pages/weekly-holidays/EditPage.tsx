/* eslint-disable @typescript-eslint/no-explicit-any */
import video from "@/assets/videos/test.mp4";
import EditableInput from "@/components/common/EditableInput";
import PageLayout from "@/components/common/PageLayout";
import GenericPDF from "@/components/common/pdf";
import { ResetFormModal } from "@/components/common/ResetFormModal";
import { Button } from "@/components/ui/button";
import { PrintCommonLayout } from "@/lib/printContents/PrintCommonLayout";
import { printHtmlContent } from "@/lib/printHtmlContent";
import { Modal } from "@mantine/core";
import { pdf } from "@react-pdf/renderer";
import { Check, Edit, Eye, Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toastError, toastRestore, toastSuccess } from "@/lib/toast";
import { Autocomplete } from "@/components/common/Autocomplete";
import { usePermission } from "@/hooks/usePermissions";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";

type WeeklyHolidayData = {
  holidayName: string;
  fromDate: string;
  endDate: string;
  totalDays: number;
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

const initialData: WeeklyHolidayData = {
  holidayName: "Eid Al-Fitr",
  fromDate: "2024-04-10",
  endDate: "2024-04-12",
  totalDays: 3,
  isActive: true,
  isDraft: false,
  createdAt: new Date(),
  draftedAt: null,
  updatedAt: new Date(),
  deletedAt: null,
  isDeleted: false,
};

export default function WeeklyHolidayEditPage({ isEdit = false }: Props) {
  const navigate = useNavigate();
  const { isRTL } = useSelector((state: RootState) => state.language);

  const [keepCreating, setKeepCreating] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);

  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [printEnabled, setPrintEnabled] = useState(false);
  const [pdfChecked, setPdfChecked] = useState(false);

  // Form state
  const [formData, setFormData] = useState<WeeklyHolidayData>({
    holidayName: "",
    fromDate: "",
    endDate: "",
    totalDays: 0,
    isActive: true,
    isDraft: false,
    isDeleted: false,
    createdAt: null,
    draftedAt: null,
    updatedAt: null,
    deletedAt: null,
  });

  // Field-level permissions
  const holidayName: boolean = usePermission(
    "weeklyHolidays",
    "edit",
    "holidayName"
  );
  const fromDate: boolean = usePermission("weeklyHolidays", "edit", "fromDate");
  const endDate: boolean = usePermission("weeklyHolidays", "edit", "endDate");
  const totalDays: boolean = usePermission(
    "weeklyHolidays",
    "edit",
    "totalDays"
  );

  const canPdf: boolean = usePermission("weeklyHolidays", "pdf");
  const canPrint: boolean = usePermission("weeklyHolidays", "print");

  // Options for autocomplete fields
  const holidayNameOptions = [
    "Eid Al-Fitr",
    "Eid Al-Adha",
    "National Day",
    "Prophet's Birthday",
    "New Year's Day",
    "Saudi Founding Day",
    "Weekend Extension",
    "Spring Break",
    "Summer Vacation",
    "Holiday Season",
    "Company Anniversary",
    "Team Building Day",
    "Public Holiday",
    "Religious Holiday",
    "Special Event",
    "Seasonal Break",
    "Company Event",
    "Staff Meeting",
    "Training Day",
    "Maintenance Day",
  ];

  // focus next input field
  const inputRefs = useRef<Record<string, HTMLElement | null>>({});
  const setRef = (name: string) => (el: HTMLElement | null) => {
    inputRefs.current[name] = el;
  };
  const focusNextInput = (nextField: string) => {
    inputRefs.current[nextField]?.focus();
  };

  // Calculate total days when dates change
  const calculateTotalDays = (fromDate: string, endDate: string) => {
    if (fromDate && endDate) {
      const start = new Date(fromDate);
      const end = new Date(endDate);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 to include both start and end dates
      return diffDays;
    }
    return 0;
  };

  // Initialize with edit data if available
  useEffect(() => {
    if (isEdit && initialData) {
      setFormData({
        ...initialData,
      });
    }
  }, [isEdit, initialData]);

  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData({
      ...formData,
      [name]: newValue,
    });

    // Auto-calculate total days when dates change
    if (name === "fromDate" || name === "endDate") {
      const newFromDate = name === "fromDate" ? value : formData.fromDate;
      const newEndDate = name === "endDate" ? value : formData.endDate;
      const calculatedDays = calculateTotalDays(newFromDate, newEndDate);

      setFormData((prev) => ({
        ...prev,
        [name]: newValue,
        totalDays: calculatedDays,
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);

    if (pdfChecked) {
      await handleExportPDF();
    }
    if (printEnabled) {
      handlePrintHoliday(formData);
    }
    if (keepCreating) {
      handleReset();
      focusNextInput("holidayName");
    } else {
      navigate("/weekly-holidays");
    }
    toastSuccess("Weekly holiday edited successfully");
  };

  const [formKey, setFormKey] = useState(0);

  const handleReset = () => {
    setFormData({
      holidayName: "",
      fromDate: "",
      endDate: "",
      totalDays: 0,
      isActive: true,
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

    setFormKey((prev) => prev + 1);

    setTimeout(() => {
      inputRefs.current["holidayName"]?.focus();
    }, 100);
  };

  const handleResetClick = () => {
    setIsResetModalOpen(true);
  };

  const handlePrintHoliday = (holidayData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Weekly Holiday Details",
        data: [holidayData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          holidayName: "Holiday Name",
          fromDate: "From Date",
          endDate: "End Date",
          totalDays: "Total Days",
          isDefault: "Default Holiday",
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
      console.log("holidayData on pdf click", formData);
      const blob = await pdf(
        <GenericPDF
          data={[formData]}
          title="Weekly Holiday Details"
          subtitle="Holiday Information"
        />
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "weekly-holiday-details.pdf";
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
          navigate("/weekly-holidays/create");
        } else {
          navigate("/weekly-holidays/edit/undefined");
        }
      },
    },
    {
      label: "View",
      icon: <Eye className="w-5 h-5 text-green-600" />,
      onClick: () => {
        navigate("/weekly-holidays/view");
      },
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
              toastRestore("Weekly holiday saved as draft successfully");
            },
          },
        ];
      }
      return filteredOptions;
    });
  }, [formData.isDraft]);

  return (
    <>
      <PageLayout
        title={isEdit ? "Editing Weekly Holiday" : "Creating Weekly Holiday"}
        videoSrc={video}
        videoHeader="Tutorial video"
        listPath="weekly-holidays"
        activePage="edit"
        popoverOptions={popoverOptions}
        keepChanges={keepCreating}
        onKeepChangesChange={setKeepCreating}
        pdfChecked={pdfChecked}
        onPdfToggle={canPdf ? handlePDFSwitchChange : undefined}
        printEnabled={printEnabled}
        onPrintToggle={canPrint ? handleSwitchChange : undefined}
        additionalFooterButtons={
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
              className={`gap-2 text-primary rounded-full border-primary w-32 bg-sky-200 hover:bg-primary font-semibold! focus:ring-2 focus:ring-blue-400 focus:shadow-lg focus:transform focus:scale-105 focus:transition-all focus:duration-300`}
              onClick={() => formRef.current?.requestSubmit()}
            >
              Submit
            </Button>
          </div>
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
            {/* First row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {/* Holiday Name field */}
              {holidayName && (
                <div className="space-y-2">
                  <div className="relative">
                    <Autocomplete
                      ref={(el: any) => setRef("holidayName")(el)}
                      id="holidayName"
                      name="holidayName"
                      allowCustomInput={true}
                      options={holidayNameOptions}
                      value={formData.holidayName}
                      onValueChange={(value: string) => {
                        setFormData({ ...formData, holidayName: value });
                        if (value) {
                          focusNextInput("fromDate");
                        }
                      }}
                      onEnterPress={() => {
                        if (formData.holidayName) {
                          focusNextInput("fromDate");
                        }
                      }}
                      placeholder=" "
                      labelText="Holiday Name"
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
                </div>
              )}

              {/* From Date field */}
              {fromDate && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("fromDate")}
                    id="fromDate"
                    name="fromDate"
                    type="date"
                    value={formData.fromDate}
                    onChange={handleChange}
                    onNext={() => focusNextInput("endDate")}
                    onCancel={() => setFormData({ ...formData, fromDate: "" })}
                    labelText="From Date"
                    tooltipText="Select holiday start date"
                    required
                  />
                </div>
              )}

              {/* End Date field */}
              {endDate && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("endDate")}
                    id="endDate"
                    name="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={handleChange}
                    onNext={() => focusNextInput("submitButton")}
                    onCancel={() => setFormData({ ...formData, endDate: "" })}
                    labelText="End Date"
                    tooltipText="Select holiday end date"
                    required
                  />
                </div>
              )}

              {/* Total Days field (read-only, auto-calculated) */}
              {totalDays && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("totalDays")}
                    id="totalDays"
                    name="totalDays"
                    type="number"
                    value={formData.totalDays.toString()}
                    onChange={handleChange}
                    onNext={() => focusNextInput("submitButton")}
                    onCancel={() => setFormData({ ...formData, totalDays: 0 })}
                    labelText="Total Days"
                    tooltipText="Auto-calculated from dates"
                    readOnly
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
