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

// Holiday Name options for autocomplete
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

export default function WeeklyHolidayDetailsPage() {
  const navigate = useNavigate();
  const { isRTL } = useSelector((state: RootState) => state.language);

  const [keepChanges, setKeepChanges] = useState(false);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [selectedHolidayName, setSelectedHolidayName] = useState("Eid Al-Fitr");
  const location = useLocation();
  const isViewPage = location.pathname.includes("/view");
  const [pdfChecked, setPdfChecked] = useState(false);
  const [printEnabled, setPrintEnabled] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  // get permission
  const canCreate: boolean = usePermission("weeklyHolidays", "create");
  const canView: boolean = usePermission("weeklyHolidays", "view");
  const canEdit: boolean = usePermission("weeklyHolidays", "edit");
  const canDelete: boolean = usePermission("weeklyHolidays", "delete");
  const canExport: boolean = usePermission("weeklyHolidays", "export");
  const canPdf: boolean = usePermission("weeklyHolidays", "pdf");
  const canPrint: boolean = usePermission("weeklyHolidays", "pdf");
  const canSeeHistory: boolean = usePermission("weeklyHolidays", "history");

  // Field-level permissions
  const canViewHolidayName: boolean = usePermission(
    "weeklyHolidays",
    "view",
    "holidayName"
  );
  const canViewFromDate: boolean = usePermission(
    "weeklyHolidays",
    "view",
    "fromDate"
  );
  const canViewEndDate: boolean = usePermission(
    "weeklyHolidays",
    "view",
    "endDate"
  );
  const canViewTotalDays: boolean = usePermission(
    "weeklyHolidays",
    "view",
    "totalDays"
  );
  const canViewIsActive: boolean = usePermission(
    "weeklyHolidays",
    "view",
    "isActive"
  );
  const canViewIsDraft: boolean = usePermission(
    "weeklyHolidays",
    "view",
    "isDraft"
  );
  const canViewIsDeleted: boolean = usePermission(
    "weeklyHolidays",
    "view",
    "isDeleted"
  );

  console.log("canCreate", canCreate);
  console.log("canView", canView);
  console.log("canEdit", canEdit);
  console.log("canDelete", canDelete);
  console.log("canExport", canExport);

  // Get weekly holiday data based on selected holiday name
  const getWeeklyHolidayData = (holidayName: string): WeeklyHolidayData => {
    const holidayMap: Record<string, WeeklyHolidayData> = {
      "Eid Al-Fitr": {
        holidayName: "Eid Al-Fitr",
        fromDate: "2024-04-10",
        endDate: "2024-04-12",
        totalDays: 3,
        isActive: true,
        isDraft: false,
        createdAt: new Date("2024-01-15T10:30:00Z"),
        draftedAt: null,
        updatedAt: new Date("2024-01-20T14:45:00Z"),
        deletedAt: null,
        isDeleted: false,
      },
      "Eid Al-Adha": {
        holidayName: "Eid Al-Adha",
        fromDate: "2024-06-17",
        endDate: "2024-06-19",
        totalDays: 3,
        isActive: true,
        isDraft: false,
        createdAt: new Date("2024-01-16T09:15:00Z"),
        draftedAt: null,
        updatedAt: new Date("2024-01-21T11:30:00Z"),
        deletedAt: null,
        isDeleted: false,
      },
      "National Day": {
        holidayName: "National Day",
        fromDate: "2024-09-23",
        endDate: "2024-09-23",
        totalDays: 1,
        isActive: true,
        isDraft: false,
        createdAt: new Date("2023-05-15T16:20:00Z"),
        draftedAt: null,
        updatedAt: new Date("2024-01-22T13:45:00Z"),
        deletedAt: null,
        isDeleted: false,
      },
      "Prophet's Birthday": {
        holidayName: "Prophet's Birthday",
        fromDate: "2024-09-28",
        endDate: "2024-09-28",
        totalDays: 1,
        isActive: true,
        isDraft: true,
        createdAt: new Date("2024-01-18T12:00:00Z"),
        draftedAt: new Date("2024-01-25T10:00:00Z"),
        updatedAt: new Date("2024-01-25T10:00:00Z"),
        deletedAt: null,
        isDeleted: false,
      },
      "Summer Vacation": {
        holidayName: "Summer Vacation",
        fromDate: "2024-07-01",
        endDate: "2024-07-31",
        totalDays: 31,
        isActive: true,
        isDraft: false,
        createdAt: new Date("2021-12-15T08:30:00Z"),
        draftedAt: null,
        updatedAt: new Date("2024-01-28T15:20:00Z"),
        deletedAt: null,
        isDeleted: false,
      },
    };

    return holidayMap[holidayName] || initialData;
  };

  const [weeklyHolidayData, setWeeklyHolidayData] = useState<WeeklyHolidayData>(
    getWeeklyHolidayData(selectedHolidayName)
  );

  const inputRef = useRef<HTMLInputElement>(null);

  // Update weekly holiday data when selection changes
  useEffect(() => {
    const newHolidayData = getWeeklyHolidayData(selectedHolidayName);
    setWeeklyHolidayData(newHolidayData);
  }, [selectedHolidayName]);

  // Handle holiday name change
  const handleHolidayNameChange = (value: string) => {
    setSelectedHolidayName(value);
  };

  // Focus input when dropdown opens
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    console.log("isViewPage", isViewPage);
  }, []);

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
      console.log("holidayData on pdf click", weeklyHolidayData);
      const blob = await pdf(
        <GenericPDF
          data={[weeklyHolidayData]}
          title="Weekly Holiday Details"
          subtitle="Holiday Information"
        />
      ).toBlob();

      console.log("blob", blob);

      const url = URL.createObjectURL(blob);
      console.log("url", url);
      const a = document.createElement("a");
      a.href = url;
      a.download = "weekly-holiday-details.pdf";
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
        title="Viewing Weekly Holiday"
        videoSrc={video}
        videoHeader="Tutorial video"
        onListClick={() => navigate("/weekly-holidays")}
        listText="List"
        listPath="weekly-holidays"
        activePage="view"
        popoverOptions={[
          {
            label: "Create",
            icon: <Plus className="w-5 h-5 text-green-600" />,
            onClick: () => navigate("/weekly-holidays/create"),
          },
          {
            label: "Edit",
            icon: <Edit className="w-5 h-5 text-blue-600" />,
            onClick: () => navigate("/weekly-holidays/edit/1"),
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
                  handlePrintHoliday(weeklyHolidayData);
                }
              }
            : undefined
        }
      >
        <div dir={isRTL ? "rtl" : "ltr"}>
          {/* Row 1: Holiday Name */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            {canViewHolidayName && (
              <div className="mt-1">
                <Autocomplete
                  options={holidayNameOptions}
                  value={selectedHolidayName}
                  onValueChange={handleHolidayNameChange}
                  placeholder="Select Holiday Name..."
                  displayKey="holidayName"
                  valueKey="holidayName"
                  searchKey="holidayName"
                  disabled={false}
                  className="w-[96%] bg-gray-100 rounded-xl"
                  labelClassName="bg-gray-50 rounded-2xl"
                  labelText="Holiday Name"
                  inputClassName="border-none bg-stone-50 focus-visible:ring-offset-0 focus-visible:ring-0 focus-visible:border-2! focus-visible:border-blue-500"
                />
              </div>
            )}

            {canViewFromDate && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">From Date</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(weeklyHolidayData.fromDate)}
                </div>
              </div>
            )}

            {canViewEndDate && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">End Date</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(weeklyHolidayData.endDate)}
                </div>
              </div>
            )}

            {canViewTotalDays && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Total Days</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(weeklyHolidayData.totalDays)} days
                </div>
              </div>
            )}
          </div>

          {/* Row 2: From Date, End Date, Total Days */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
            {canViewIsActive && (
              <div className="flex flex-col">
                <div className="">
                  <span className="text-[15px] text-gray-600">Active</span>
                </div>
                <div className="">
                  {weeklyHolidayData.isActive ? (
                    <span className="font-bold text-[15px]">Yes</span>
                  ) : (
                    <span className="font-bold text-[15px]">No</span>
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
                  {weeklyHolidayData.isDraft ? (
                    <span className="text-orange-600 font-bold text-[15px]">
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
                  {weeklyHolidayData.isDeleted ? (
                    <span className="text-red-600 font-bold text-[15px]">
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
          created: getRelativeTime(weeklyHolidayData.createdAt),
          updated: getRelativeTime(weeklyHolidayData.updatedAt),
          drafted: getRelativeTime(weeklyHolidayData.draftedAt),
          deleted: getRelativeTime(weeklyHolidayData.deletedAt),
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
