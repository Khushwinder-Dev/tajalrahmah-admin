import { Card, CardTitle } from "@/components/ui/card";
import { toastDelete, toastRestore } from "@/lib/toast";
import { Tooltip } from "@mantine/core"; // Import Tooltip from Mantine
import { RefreshCw, Trash2 } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn, getModuleFromPath } from "@/lib/utils";
import { useLocation, useNavigate } from "react-router-dom";
import GridExportComponent from "./GridExportComponent";
import GridFilterComponent from "./GridFilterComponent";
import { usePermission } from "@/hooks/usePermissions";
import { SearchFunction } from "@/lib/SearchFunction";

// changeable types
export type ModuleFieldsType = {
  campaignCode: string;
  campaignName: string;
  recruitmentPlan: string;
  recruitmentChannel: string;
  position: string;
  company: string;
  recruitedQuantity: string;
  workingFrom: string;
  department: string;
  workplace: string;
  startingSalaryFrom: string;
  startingSalaryTo: string;
  fromDate: string;
  toDate: string;
  reason: string;
  jobDescription: string;
  managers: string;
  followers: string;
  metaTitle: string;
  metaDescription: string;
  ageFrom: string;
  ageTo: string;
  gender: string;
  height: string;
  weight: string;
  literacy: string;
  seniority: string;
  attachment: string;
};

// do not change
type GridDataType = ModuleFieldsType & {
  id: string;
  isDefault: boolean;
  isActive: boolean;
  isDraft: boolean;
  createdAt: Date;
  draftedAt: Date | null;
  updatedAt: Date;
  deletedAt: Date | null;
  isDeleted: boolean;
};

const searchableKeys: (keyof GridDataType)[] = [
  "campaignCode",
  "position",
  "department",
  "recruitedQuantity",
  "workingFrom",
  "workplace",
  "startingSalaryFrom",
  "startingSalaryTo",
  "fromDate",
  "toDate",
  "reason",
  "jobDescription",
  "managers",
  "ageFrom",
  "ageTo",
  "gender",
  "height",
  "weight",
  "literacy",
  "seniority",
];

export const plansData: GridDataType[] = [
  {
    id: "1",
    campaignCode: "CMP-001",
    campaignName: "Software Engineer Recruitment Drive",
    recruitmentPlan: "Hiring 10 engineers for upcoming projects",
    recruitmentChannel: "LinkedIn, Job Boards, University Outreach",
    position: "Software Engineer",
    company: "Best Electronics LTD",
    recruitedQuantity: "10",
    workingFrom: "2025-10-01",
    department: "IT Department",
    workplace: "Dhaka, Bangladesh",
    startingSalaryFrom: "40000",
    startingSalaryTo: "60000",
    fromDate: "2025-09-01",
    toDate: "2025-12-31",
    reason: "Team expansion for new ERP project",
    jobDescription:
      "Develop and maintain software applications using .NET, React, and MySQL.",
    managers: "Mr. Rahim (HR Manager)",
    followers: "25",
    metaTitle: "Software Engineer Jobs in Dhaka - Best Electronics LTD",
    metaDescription:
      "Apply for Software Engineer positions at Best Electronics LTD. Competitive salary, career growth, and great work environment.",
    ageFrom: "22",
    ageTo: "35",
    gender: "Any",
    height: "Not Required",
    weight: "Not Required",
    literacy: "Bachelor’s in Computer Science or related field",
    seniority: "Entry to Mid-level",
    attachment: "JD_Frontend.pdf",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-08-01"),
    draftedAt: null,
    updatedAt: new Date("2025-08-15"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "2",
    campaignCode: "CMP-001",
    campaignName: "Software Engineer Recruitment Drive",
    recruitmentPlan: "Hiring 10 engineers for upcoming projects",
    recruitmentChannel: "LinkedIn, Job Boards, University Outreach",
    position: "Software Engineer",
    company: "Best Electronics LTD",
    recruitedQuantity: "10",
    workingFrom: "2025-10-01",
    department: "IT Department",
    workplace: "Dhaka, Bangladesh",
    startingSalaryFrom: "40000",
    startingSalaryTo: "60000",
    fromDate: "2025-09-01",
    toDate: "2025-12-31",
    reason: "Team expansion for new ERP project",
    jobDescription:
      "Develop and maintain software applications using .NET, React, and MySQL.",
    managers: "Mr. Rahim (HR Manager)",
    followers: "25",
    metaTitle: "Software Engineer Jobs in Dhaka - Best Electronics LTD",
    metaDescription:
      "Apply for Software Engineer positions at Best Electronics LTD. Competitive salary, career growth, and great work environment.",
    ageFrom: "22",
    ageTo: "35",
    gender: "Any",
    height: "Not Required",
    weight: "Not Required",
    literacy: "Bachelor’s in Computer Science or related field",
    seniority: "Entry to Mid-level",
    attachment: "JD_Marketing.pdf",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-08-03"),
    draftedAt: null,
    updatedAt: new Date("2025-08-16"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "3",
    campaignCode: "CMP-004",
    campaignName: "HR Manager Hiring",
    recruitmentPlan: "Hiring 1 HR Manager to lead the HR team",
    recruitmentChannel: "LinkedIn, BDJobs, Executive Search",
    position: "HR Manager",
    company: "Best Electronics LTD",
    recruitedQuantity: "1",
    workingFrom: "2025-10-01",
    department: "Human Resources",
    workplace: "Dhaka HQ",
    startingSalaryFrom: "70000",
    startingSalaryTo: "90000",
    fromDate: "2025-09-15",
    toDate: "2025-11-30",
    reason: "Leadership expansion",
    jobDescription: "Manage recruitment, HR policies, and employee engagement.",
    managers: "CEO & HR Director",
    followers: "18",
    metaTitle: "HR Manager Jobs in Dhaka - Best Electronics LTD",
    metaDescription:
      "Apply for HR Manager role at Best Electronics LTD. Leadership role with attractive salary and benefits.",
    ageFrom: "28",
    ageTo: "40",
    gender: "Any",
    height: "Not Required",
    weight: "Not Required",
    literacy: "MBA in HR or equivalent",
    seniority: "Senior",
    attachment: "JD_HRManager.pdf",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-08-05"),
    draftedAt: null,
    updatedAt: new Date("2025-08-17"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "4",
    campaignCode: "CMP-004",
    campaignName: "HR Manager Hiring",
    recruitmentPlan: "Hiring 1 HR Manager to lead the HR team",
    recruitmentChannel: "LinkedIn, BDJobs, Executive Search",
    position: "HR Manager",
    company: "Best Electronics LTD",
    recruitedQuantity: "1",
    workingFrom: "2025-10-01",
    department: "Human Resources",
    workplace: "Dhaka HQ",
    startingSalaryFrom: "70000",
    startingSalaryTo: "90000",
    fromDate: "2025-09-15",
    toDate: "2025-11-30",
    reason: "Leadership expansion",
    jobDescription: "Manage recruitment, HR policies, and employee engagement.",
    managers: "CEO & HR Director",
    followers: "18",
    metaTitle: "HR Manager Jobs in Dhaka - Best Electronics LTD",
    metaDescription:
      "Apply for HR Manager role at Best Electronics LTD. Leadership role with attractive salary and benefits.",
    ageFrom: "28",
    ageTo: "40",
    gender: "Any",
    height: "Not Required",
    weight: "Not Required",
    literacy: "MBA in HR or equivalent",
    seniority: "Senior",
    attachment: "JD_HRManager.pdf",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-08-06"),
    draftedAt: null,
    updatedAt: new Date("2025-08-18"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "5",
    campaignCode: "CMP-004",
    campaignName: "HR Manager Hiring",
    recruitmentPlan: "Hiring 1 HR Manager to lead the HR team",
    recruitmentChannel: "LinkedIn, BDJobs, Executive Search",
    position: "HR Manager",
    company: "Best Electronics LTD",
    recruitedQuantity: "1",
    workingFrom: "2025-10-01",
    department: "Human Resources",
    workplace: "Dhaka HQ",
    startingSalaryFrom: "70000",
    startingSalaryTo: "90000",
    fromDate: "2025-09-15",
    toDate: "2025-11-30",
    reason: "Leadership expansion",
    jobDescription: "Manage recruitment, HR policies, and employee engagement.",
    managers: "CEO & HR Director",
    followers: "18",
    metaTitle: "HR Manager Jobs in Dhaka - Best Electronics LTD",
    metaDescription:
      "Apply for HR Manager role at Best Electronics LTD. Leadership role with attractive salary and benefits.",
    ageFrom: "28",
    ageTo: "40",
    gender: "Any",
    height: "Not Required",
    weight: "Not Required",
    literacy: "MBA in HR or equivalent",
    seniority: "Senior",
    attachment: "JD_HRManager.pdf",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-08-07"),
    draftedAt: null,
    updatedAt: new Date("2025-08-18"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "6",
    campaignCode: "CMP-003",
    campaignName: "Customer Support Hiring",
    recruitmentPlan: "Hiring 15 support agents for call center operations",
    recruitmentChannel: "Job Boards, Walk-in Interviews, Employee Referrals",
    position: "Customer Support Agent",
    company: "Best Electronics LTD",
    recruitedQuantity: "15",
    workingFrom: "2025-09-20",
    department: "Customer Support",
    workplace: "Call Center - Dhaka",
    startingSalaryFrom: "20000",
    startingSalaryTo: "30000",
    fromDate: "2025-09-01",
    toDate: "2025-11-20",
    reason: "Increase in customer base",
    jobDescription:
      "Handle customer queries, tickets, and complaints professionally.",
    managers: "Ms. Ayesha (Support Lead)",
    followers: "30",
    metaTitle: "Customer Support Jobs in Dhaka - Best Electronics LTD",
    metaDescription:
      "Join Best Electronics LTD as a Customer Support Agent. Great team environment and growth opportunities.",
    ageFrom: "20",
    ageTo: "30",
    gender: "Any",
    height: "Not Required",
    weight: "Not Required",
    literacy: "Bachelor’s degree in any discipline",
    seniority: "Entry-level",
    attachment: "JD_SupportAgent.pdf",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-08-08"),
    draftedAt: null,
    updatedAt: new Date("2025-08-19"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "7",
    campaignCode: "CMP-003",
    campaignName: "Customer Support Hiring",
    recruitmentPlan: "Hiring 15 support agents for call center operations",
    recruitmentChannel: "Job Boards, Walk-in Interviews, Employee Referrals",
    position: "Customer Support Agent",
    company: "Best Electronics LTD",
    recruitedQuantity: "15",
    workingFrom: "2025-09-20",
    department: "Customer Support",
    workplace: "Call Center - Dhaka",
    startingSalaryFrom: "20000",
    startingSalaryTo: "30000",
    fromDate: "2025-09-01",
    toDate: "2025-11-20",
    reason: "Increase in customer base",
    jobDescription:
      "Handle customer queries, tickets, and complaints professionally.",
    managers: "Ms. Ayesha (Support Lead)",
    followers: "30",
    metaTitle: "Customer Support Jobs in Dhaka - Best Electronics LTD",
    metaDescription:
      "Join Best Electronics LTD as a Customer Support Agent. Great team environment and growth opportunities.",
    ageFrom: "20",
    ageTo: "30",
    gender: "Any",
    height: "Not Required",
    weight: "Not Required",
    literacy: "Bachelor’s degree in any discipline",
    seniority: "Entry-level",
    attachment: "JD_SupportAgent.pdf",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-08-09"),
    draftedAt: null,
    updatedAt: new Date("2025-08-19"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "8",
    campaignCode: "CMP-003",
    campaignName: "Customer Support Hiring",
    recruitmentPlan: "Hiring 15 support agents for call center operations",
    recruitmentChannel: "Job Boards, Walk-in Interviews, Employee Referrals",
    position: "Customer Support Agent",
    company: "Best Electronics LTD",
    recruitedQuantity: "15",
    workingFrom: "2025-09-20",
    department: "Customer Support",
    workplace: "Call Center - Dhaka",
    startingSalaryFrom: "20000",
    startingSalaryTo: "30000",
    fromDate: "2025-09-01",
    toDate: "2025-11-20",
    reason: "Increase in customer base",
    jobDescription:
      "Handle customer queries, tickets, and complaints professionally.",
    managers: "Ms. Ayesha (Support Lead)",
    followers: "30",
    metaTitle: "Customer Support Jobs in Dhaka - Best Electronics LTD",
    metaDescription:
      "Join Best Electronics LTD as a Customer Support Agent. Great team environment and growth opportunities.",
    ageFrom: "20",
    ageTo: "30",
    gender: "Any",
    height: "Not Required",
    weight: "Not Required",
    literacy: "Bachelor’s degree in any discipline",
    seniority: "Entry-level",
    attachment: "JD_SupportAgent.pdf",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-08-10"),
    draftedAt: null,
    updatedAt: new Date("2025-08-20"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "9",
    campaignCode: "CMP-003",
    campaignName: "Customer Support Hiring",
    recruitmentPlan: "Hiring 15 support agents for call center operations",
    recruitmentChannel: "Job Boards, Walk-in Interviews, Employee Referrals",
    position: "Customer Support Agent",
    company: "Best Electronics LTD",
    recruitedQuantity: "15",
    workingFrom: "2025-09-20",
    department: "Customer Support",
    workplace: "Call Center - Dhaka",
    startingSalaryFrom: "20000",
    startingSalaryTo: "30000",
    fromDate: "2025-09-01",
    toDate: "2025-11-20",
    reason: "Increase in customer base",
    jobDescription:
      "Handle customer queries, tickets, and complaints professionally.",
    managers: "Ms. Ayesha (Support Lead)",
    followers: "30",
    metaTitle: "Customer Support Jobs in Dhaka - Best Electronics LTD",
    metaDescription:
      "Join Best Electronics LTD as a Customer Support Agent. Great team environment and growth opportunities.",
    ageFrom: "20",
    ageTo: "30",
    gender: "Any",
    height: "Not Required",
    weight: "Not Required",
    literacy: "Bachelor’s degree in any discipline",
    seniority: "Entry-level",
    attachment: "JD_SupportAgent.pdf",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-08-11"),
    draftedAt: null,
    updatedAt: new Date("2025-08-20"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "10",
    campaignCode: "CMP-003",
    campaignName: "Customer Support Hiring",
    recruitmentPlan: "Hiring 15 support agents for call center operations",
    recruitmentChannel: "Job Boards, Walk-in Interviews, Employee Referrals",
    position: "Customer Support Agent",
    company: "Best Electronics LTD",
    recruitedQuantity: "15",
    workingFrom: "2025-09-20",
    department: "Customer Support",
    workplace: "Call Center - Dhaka",
    startingSalaryFrom: "20000",
    startingSalaryTo: "30000",
    fromDate: "2025-09-01",
    toDate: "2025-11-20",
    reason: "Increase in customer base",
    jobDescription:
      "Handle customer queries, tickets, and complaints professionally.",
    managers: "Ms. Ayesha (Support Lead)",
    followers: "30",
    metaTitle: "Customer Support Jobs in Dhaka - Best Electronics LTD",
    metaDescription:
      "Join Best Electronics LTD as a Customer Support Agent. Great team environment and growth opportunities.",
    ageFrom: "20",
    ageTo: "30",
    gender: "Any",
    height: "Not Required",
    weight: "Not Required",
    literacy: "Bachelor’s degree in any discipline",
    seniority: "Entry-level",
    attachment: "JD_SupportAgent.pdf",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-08-12"),
    draftedAt: null,
    updatedAt: new Date("2025-08-21"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "11",
    campaignCode: "CMP-003",
    campaignName: "Customer Support Hiring",
    recruitmentPlan: "Hiring 15 support agents for call center operations",
    recruitmentChannel: "Job Boards, Walk-in Interviews, Employee Referrals",
    position: "Customer Support Agent",
    company: "Best Electronics LTD",
    recruitedQuantity: "15",
    workingFrom: "2025-09-20",
    department: "Customer Support",
    workplace: "Call Center - Dhaka",
    startingSalaryFrom: "20000",
    startingSalaryTo: "30000",
    fromDate: "2025-09-01",
    toDate: "2025-11-20",
    reason: "Increase in customer base",
    jobDescription:
      "Handle customer queries, tickets, and complaints professionally.",
    managers: "Ms. Ayesha (Support Lead)",
    followers: "30",
    metaTitle: "Customer Support Jobs in Dhaka - Best Electronics LTD",
    metaDescription:
      "Join Best Electronics LTD as a Customer Support Agent. Great team environment and growth opportunities.",
    ageFrom: "20",
    ageTo: "30",
    gender: "Any",
    height: "Not Required",
    weight: "Not Required",
    literacy: "Bachelor’s degree in any discipline",
    seniority: "Entry-level",
    attachment: "JD_SupportAgent.pdf",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-08-13"),
    draftedAt: null,
    updatedAt: new Date("2025-08-21"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "12",
    campaignCode: "CMP-003",
    campaignName: "Customer Support Hiring",
    recruitmentPlan: "Hiring 15 support agents for call center operations",
    recruitmentChannel: "Job Boards, Walk-in Interviews, Employee Referrals",
    position: "Customer Support Agent",
    company: "Best Electronics LTD",
    recruitedQuantity: "15",
    workingFrom: "2025-09-20",
    department: "Customer Support",
    workplace: "Call Center - Dhaka",
    startingSalaryFrom: "20000",
    startingSalaryTo: "30000",
    fromDate: "2025-09-01",
    toDate: "2025-11-20",
    reason: "Increase in customer base",
    jobDescription:
      "Handle customer queries, tickets, and complaints professionally.",
    managers: "Ms. Ayesha (Support Lead)",
    followers: "30",
    metaTitle: "Customer Support Jobs in Dhaka - Best Electronics LTD",
    metaDescription:
      "Join Best Electronics LTD as a Customer Support Agent. Great team environment and growth opportunities.",
    ageFrom: "20",
    ageTo: "30",
    gender: "Any",
    height: "Not Required",
    weight: "Not Required",
    literacy: "Bachelor’s degree in any discipline",
    seniority: "Entry-level",
    attachment: "JD_SupportAgent.pdf",
    isDefault: true,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-08-14"),
    draftedAt: null,
    updatedAt: new Date("2025-08-22"),
    deletedAt: null,
    isDeleted: false,
  },
];

type Props = {
  searchQuery: string;
  setIsFilterOpen: (isFilterOpen: boolean) => void;
  isFilterOpen: boolean;
  setIsExportOpen: (isExportOpen: boolean) => void;
  isExportOpen: boolean;
};

export default function ComponentLevelGridView({
  searchQuery,
  setIsFilterOpen,
  isFilterOpen,
  setIsExportOpen,
  isExportOpen,
}: Props) {
  console.log("grid rendered");

  const navigate = useNavigate();
  const location = useLocation();

  const detectedModule = getModuleFromPath(location.pathname);

  const [gridData, setGridData] = useState(plansData);
  const canDelete: boolean = usePermission(detectedModule, "delete");
  const canRestore: boolean = usePermission(detectedModule, "restore");
  const canEdit: boolean = usePermission(detectedModule, "edit");

  // Debug permissions
  console.log("Permissions:", {
    canDelete,
    canRestore,
    canEdit,
  });

  // Infinite scroll states
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [, setPage] = useState(1);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const ITEMS_PER_PAGE = 4;

  // Simulate API call to load more data
  const loadMoreData = useCallback(async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 800));

    const newItems = Array.from({ length: ITEMS_PER_PAGE }, (_, index) => ({
      ...plansData[index],
      id: `${Date.now()}-${index}`,
      isDefault: false,
      isActive: Math.random() > 0.3,
      isDraft: Math.random() > 0.7,
      createdAt: new Date(),
      draftedAt: null,
      updatedAt: new Date(),
      deletedAt: null,
      isDeleted: false,
    }));

    // Stop loading more after reaching 50 items for demo
    if (gridData.length >= 46) {
      setHasMore(false);
    } else {
      setGridData((prev) => [...prev, ...newItems] as GridDataType[]);
      setPage((prev) => prev + 1);
    }

    setIsLoading(false);
  }, [gridData.length, isLoading, hasMore]);

  // Infinite scroll handler
  const handleScroll = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const { scrollTop, scrollHeight, clientHeight } = container;
    const threshold = 100; // Load more when 100px from bottom

    if (scrollHeight - scrollTop <= clientHeight + threshold) {
      loadMoreData();
    }
  }, [loadMoreData]);

  // Add scroll event listener
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const handleDeleteClick = (id: string) => {
    setGridData((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              isDeleted: item.isDeleted === true ? false : true,
            }
          : item
      )
    );
  };

  const handleRestoreClick = (id: string) => {
    setGridData((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              isDeleted: item.isDeleted === true ? false : true,
            }
          : item
      )
    );
  };

  const filteredData = SearchFunction(gridData, searchQuery, searchableKeys);

  const PAGE_NAME = location.pathname.split("/")[1].replace("-", " ");

  return (
    <div
      className={cn(
        "px-4 py-3 h-full flex flex-col bg-white dark:bg-gray-900 parent relative rounded-lg"
      )}
    >
      {/* Floating Label - Left Top */}
      <div
        className={cn(
          "absolute -top-4 left-6 rtl:left-auto rtl:right-6 py-1 rounded-md z-40! bg-white w-fit"
        )}
      >
        <span
          className={cn(
            "text-md font-semibold tracking-wide capitalize text-gray-600"
          )}
        >
          Total {gridData.length} {PAGE_NAME}
        </span>
      </div>

      {/* Main content area */}
      <div className="flex flex-1 overflow-hidden mt-2">
        {/* Cards container */}
        <div
          ref={scrollContainerRef}
          className="overflow-y-auto scroll-smooth smooth-scroll pr-4"
          style={{
            width: isFilterOpen || isExportOpen ? "calc(100% - 320px)" : "100%",
          }}
        >
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pb-4 p-2">
            {filteredData.map((item, index) => (
              <Card
                key={index}
                className="transition-all hover:border-primary/90 hover:shadow-lg hover:translate-y-[-5px] relative group dark:bg-gray-800 p-4 duration-200"
              >
                {/* Top Row - Grid with 2 columns: Title | Status */}
                <div className="grid grid-cols-2 items-center gap-2 mb-4">
                  {/* Left - Title */}
                  <CardTitle
                    className="text-lg font-semibold cursor-pointer hover:text-primary transition-colors truncate"
                    onClick={() => navigate(`${location.pathname}/1`)}
                  >
                    {item.campaignName}
                  </CardTitle>

                  <div className="text-end">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Position
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {item.position}
                    </div>
                  </div>
                </div>

                {/* Bottom Row - Grid with 3 columns: Leave Type | Actions | Notes */}
                <div className="grid grid-cols-3 items-center gap-4 pt-2 dark:border-gray-700">
                  {/* Leave Type - Left aligned */}
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Working Form
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {item.workingFrom}
                    </div>
                  </div>

                  {/* Middle - Action Icons */}
                  <div className="flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {/* Delete/Restore */}
                    <Tooltip
                      label={
                        item.isDeleted && canRestore
                          ? "Restore"
                          : canDelete
                          ? "Delete"
                          : ""
                      }
                      position="top"
                      arrowSize={8}
                      withArrow
                      styles={{
                        tooltip: {
                          fontSize: "14px",
                          padding: "8px 12px",
                          backgroundColor: "#374151",
                          color: "white",
                          borderRadius: "6px",
                          fontWeight: "500",
                          boxShadow:
                            "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                        },
                        arrow: {
                          backgroundColor: "#374151",
                        },
                      }}
                    >
                      <button
                        disabled={item.isDeleted && !canRestore}
                        className={`cursor-pointer p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                          item.isDeleted ? "text-blue-500" : "text-red-500"
                        }`}
                        onClick={() => {
                          if (canRestore && item.isDeleted) {
                            handleRestoreClick(item.id);
                            toastRestore(`${PAGE_NAME} restored successfully`);
                          } else {
                            if (canDelete) {
                              handleDeleteClick(item.id);
                              toastDelete(`${PAGE_NAME} deleted successfully`);
                            }
                          }
                        }}
                      >
                        {item.isDeleted && canRestore ? (
                          <RefreshCw className="h-4 w-4" />
                        ) : (
                          canDelete && <Trash2 className="h-4 w-4" />
                        )}
                      </button>
                    </Tooltip>

                    {/* Edit */}
                    {canEdit && (
                      <Tooltip
                        label="Edit"
                        position="top"
                        arrowSize={8}
                        withArrow
                        styles={{
                          tooltip: {
                            fontSize: "14px",
                            padding: "8px 12px",
                            backgroundColor: "#374151",
                            color: "white",
                            borderRadius: "6px",
                            fontWeight: "500",
                            boxShadow:
                              "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                          },
                          arrow: {
                            backgroundColor: "#374151",
                          },
                        }}
                      >
                        <div
                          className="cursor-pointer p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-blue-500 flex items-center justify-center w-8 h-8"
                          onClick={() =>
                            navigate(`${location.pathname}/edit/1`)
                          }
                        >
                          <FontAwesomeIcon icon={faEdit} className="h-4 w-4" />
                        </div>
                      </Tooltip>
                    )}
                  </div>

                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Department
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {item.department}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 items-center gap-4 pt-2 dark:border-gray-700 border-t">
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Quantity To Be Recruited
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {item.company}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Workplace
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {item.workplace}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-end text-gray-500 dark:text-gray-400">
                      Starting Salary From
                    </div>
                    <div className="text-sm font-semibold text-end text-gray-900 dark:text-gray-100 truncate">
                      {item.startingSalaryFrom}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Loading indicator */}
          {isLoading && (
            <div className="flex justify-center items-center py-8">
              <div className="flex items-center gap-2 text-blue-600">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                <span className="text-sm">Loading more {PAGE_NAME}...</span>
              </div>
            </div>
          )}

          {/* End of data indicator */}
          {!hasMore && gridData.length > 12 && (
            <div className="flex justify-center items-center py-8">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                No more {PAGE_NAME} to load
              </span>
            </div>
          )}
        </div>

        {/* Filter component - Right side only */}
        {isFilterOpen && (
          <div className="w-80 flex-shrink-0 border-l border-gray-200 dark:border-gray-700 pl-4">
            <div className="h-full flex flex-col">
              <GridFilterComponent
                data={gridData}
                setFilteredData={setGridData}
                setShowFilter={setIsFilterOpen}
              />
            </div>
          </div>
        )}

        {/* Export component - Right side only */}
        {isExportOpen && (
          <div className="w-80 flex-shrink-0 border-l border-gray-200 dark:border-gray-700 pl-4">
            <div className="h-full flex flex-col">
              <GridExportComponent
                data={gridData}
                setFilteredData={setGridData}
                setIsExportOpen={setIsExportOpen}
                title={location.pathname.split("/")[1].replace("-", " ")}
                fileName={location.pathname.split("/")[1]}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
