import { Card, CardTitle } from "@/components/ui/card";
import { toastDelete, toastRestore } from "@/lib/toast";
import { Tooltip } from "@mantine/core"; // Import Tooltip from Mantine
import { RefreshCw, Trash2 } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import GridExportComponent from "./GridExportComponent";
import GridFilterComponent from "./GridFilterComponent";
import { usePermission } from "@/hooks/usePermissions";

// Mock data - replace with real data from your API
const jobPostData = [
  {
    id: "1",
    sn: "001",
    company: "Tech Solutions Inc",
    jobTitle: "Senior React Developer",
    jobCategory: "Software Development",
    jobType: "Full-time",
    noOfVacancies: 3,
    closingDate: new Date("2024-02-15"),
    gender: "Any",
    minimumExperience: "5 years",
    isFeatured: true,
    status: "Active",
    shortDescription:
      "Experienced React developer needed for enterprise applications",
    longDescription:
      "We are looking for a senior React developer with 5+ years of experience...",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-20"),
  },
  {
    id: "2",
    sn: "002",
    company: "Digital Marketing Pro",
    jobTitle: "Marketing Manager",
    jobCategory: "Marketing",
    jobType: "Part-time",
    noOfVacancies: 1,
    closingDate: new Date("2024-02-20"),
    gender: "Any",
    minimumExperience: "3 years",
    isFeatured: false,
    status: "Active",
    shortDescription: "Creative marketing professional for digital campaigns",
    longDescription:
      "Join our team as a marketing manager to lead digital campaigns...",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-16"),
    updatedAt: new Date("2024-01-21"),
  },
  {
    id: "3",
    sn: "003",
    company: "Finance Corp",
    jobTitle: "Financial Analyst",
    jobCategory: "Finance",
    jobType: "Full-time",
    noOfVacancies: 2,
    closingDate: new Date("2024-02-25"),
    gender: "Any",
    minimumExperience: "4 years",
    isFeatured: true,
    status: "Active",
    shortDescription: "Financial analyst for corporate finance team",
    longDescription:
      "We need a skilled financial analyst to join our corporate finance team...",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-17"),
    updatedAt: new Date("2024-01-22"),
  },
  {
    id: "4",
    sn: "004",
    company: "Healthcare Plus",
    jobTitle: "Registered Nurse",
    jobCategory: "Healthcare",
    jobType: "Full-time",
    noOfVacancies: 5,
    closingDate: new Date("2024-03-01"),
    gender: "Any",
    minimumExperience: "2 years",
    isFeatured: false,
    status: "Inactive",
    shortDescription: "Compassionate nurses for hospital setting",
    longDescription: "Join our healthcare team as a registered nurse...",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-18"),
    updatedAt: new Date("2024-01-23"),
  },
  {
    id: "5",
    sn: "005",
    company: "Education First",
    jobTitle: "English Teacher",
    jobCategory: "Education",
    jobType: "Contract",
    noOfVacancies: 2,
    closingDate: new Date("2024-02-28"),
    gender: "Any",
    minimumExperience: "3 years",
    isFeatured: false,
    status: "Active",
    shortDescription: "Experienced English teacher for international school",
    longDescription: "We are seeking an experienced English teacher...",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-19"),
    updatedAt: new Date("2024-01-24"),
  },
  {
    id: "6",
    sn: "006",
    company: "Logistics Express",
    jobTitle: "Supply Chain Manager",
    jobCategory: "Logistics",
    jobType: "Full-time",
    noOfVacancies: 1,
    closingDate: new Date("2024-03-05"),
    gender: "Any",
    minimumExperience: "6 years",
    isFeatured: true,
    status: "Active",
    shortDescription: "Supply chain expert for logistics operations",
    longDescription: "Join our logistics team as a supply chain manager...",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-20"),
    updatedAt: new Date("2024-01-25"),
  },
  {
    id: "7",
    sn: "007",
    company: "Creative Design Studio",
    jobTitle: "UI/UX Designer",
    jobCategory: "Design",
    jobType: "Freelance",
    noOfVacancies: 3,
    closingDate: new Date("2024-02-22"),
    gender: "Any",
    minimumExperience: "4 years",
    isFeatured: false,
    status: "Inactive",
    shortDescription: "Creative designer for digital products",
    longDescription: "We need a talented UI/UX designer...",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-21"),
    updatedAt: new Date("2024-01-26"),
  },
  {
    id: "8",
    sn: "008",
    company: "Sales Force",
    jobTitle: "Sales Representative",
    jobCategory: "Sales",
    jobType: "Full-time",
    noOfVacancies: 4,
    closingDate: new Date("2024-03-10"),
    gender: "Any",
    minimumExperience: "2 years",
    isFeatured: false,
    status: "Active",
    shortDescription: "Dynamic sales professional for B2B sales",
    longDescription: "Join our sales team as a sales representative...",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-22"),
    updatedAt: new Date("2024-01-27"),
  },
  {
    id: "9",
    sn: "009",
    company: "Tech Innovations",
    jobTitle: "Data Scientist",
    jobCategory: "Data Science",
    jobType: "Full-time",
    noOfVacancies: 2,
    closingDate: new Date("2024-03-15"),
    gender: "Any",
    minimumExperience: "5 years",
    isFeatured: true,
    status: "Active",
    shortDescription: "Data scientist for machine learning projects",
    longDescription: "We are looking for a skilled data scientist...",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-23"),
    updatedAt: new Date("2024-01-28"),
  },
  {
    id: "10",
    sn: "010",
    company: "Legal Partners",
    jobTitle: "Corporate Lawyer",
    jobCategory: "Legal",
    jobType: "Full-time",
    noOfVacancies: 1,
    closingDate: new Date("2024-03-20"),
    gender: "Any",
    minimumExperience: "7 years",
    isFeatured: false,
    status: "Inactive",
    shortDescription: "Experienced corporate lawyer for legal team",
    longDescription: "Join our legal team as a corporate lawyer...",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-24"),
    updatedAt: new Date("2024-01-29"),
  },
  {
    id: "11",
    sn: "011",
    company: "Media Productions",
    jobTitle: "Video Editor",
    jobCategory: "Media",
    jobType: "Contract",
    noOfVacancies: 2,
    closingDate: new Date("2024-03-25"),
    gender: "Any",
    minimumExperience: "3 years",
    isFeatured: false,
    status: "Active",
    shortDescription: "Creative video editor for content creation",
    longDescription: "We need a talented video editor...",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-25"),
    updatedAt: new Date("2024-01-30"),
  },
  {
    id: "12",
    sn: "012",
    company: "Consulting Group",
    jobTitle: "Business Consultant",
    jobCategory: "Consulting",
    jobType: "Full-time",
    noOfVacancies: 3,
    closingDate: new Date("2024-03-30"),
    gender: "Any",
    minimumExperience: "6 years",
    isFeatured: true,
    status: "Active",
    shortDescription: "Strategic business consultant for clients",
    longDescription: "Join our consulting team as a business consultant...",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-26"),
    updatedAt: new Date("2024-01-31"),
  },
];

type Props = {
  searchQuery: string;
  setIsFilterOpen: (isFilterOpen: boolean) => void;
  isFilterOpen: boolean;
  setIsExportOpen: (isExportOpen: boolean) => void;
  isExportOpen: boolean;
};

export default function JobPostGrid({
  searchQuery,
  setIsFilterOpen,
  isFilterOpen,
  setIsExportOpen,
  isExportOpen,
}: Props) {
  console.log("Job post grid rendered");

  const navigate = useNavigate();

  const [jobPostDataState, setJobPostDataState] = useState(jobPostData);
  const canDelete: boolean = usePermission("jobPost", "delete");
  const canRestore: boolean = usePermission("jobPost", "restore");
  const canEdit: boolean = usePermission("jobPost", "edit");

  // Debug permissions
  console.log("Job Post Permissions:", {
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

    const companies = [
      "Tech Solutions Inc",
      "Digital Marketing Pro",
      "Finance Corp",
      "Healthcare Plus",
      "Education First",
      "Logistics Express",
      "Creative Design Studio",
      "Sales Force",
      "Tech Innovations",
      "Legal Partners",
      "Media Productions",
      "Consulting Group",
    ];
    const jobTitles = [
      "Senior React Developer",
      "Marketing Manager",
      "Financial Analyst",
      "Registered Nurse",
      "English Teacher",
      "Supply Chain Manager",
      "UI/UX Designer",
      "Sales Representative",
      "Data Scientist",
      "Corporate Lawyer",
      "Video Editor",
      "Business Consultant",
    ];
    const jobCategories = [
      "Software Development",
      "Marketing",
      "Finance",
      "Healthcare",
      "Education",
      "Logistics",
      "Design",
      "Sales",
      "Data Science",
      "Legal",
      "Media",
      "Consulting",
    ];
    const jobTypes = ["Full-time", "Part-time", "Contract", "Freelance"];
    const statuses = ["Active", "Inactive"];

    const newItems = Array.from({ length: ITEMS_PER_PAGE }, (_, index) => ({
      id: `${Date.now()}-${index}`,
      sn: `${String(jobPostDataState.length + index + 1).padStart(3, "0")}`,
      company: companies[Math.floor(Math.random() * companies.length)],
      jobTitle: jobTitles[Math.floor(Math.random() * jobTitles.length)],
      jobCategory:
        jobCategories[Math.floor(Math.random() * jobCategories.length)],
      jobType: jobTypes[Math.floor(Math.random() * jobTypes.length)],
      noOfVacancies: Math.floor(Math.random() * 10) + 1,
      closingDate: new Date(
        Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000
      ),
      gender: "Any",
      minimumExperience: `${Math.floor(Math.random() * 8) + 1} years`,
      isFeatured: Math.random() > 0.7,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      shortDescription: "New job opportunity in growing company",
      longDescription:
        "We are looking for talented professionals to join our team...",
      isActive: Math.random() > 0.3,
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    // Stop loading more after reaching 50 items for demo
    if (jobPostDataState.length >= 46) {
      setHasMore(false);
    } else {
      setJobPostDataState((prev) => [...prev, ...newItems]);
      setPage((prev) => prev + 1);
    }

    setIsLoading(false);
  }, [jobPostDataState.length, isLoading, hasMore]);

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

  const handleDeleteClick = (jobPostId: string) => {
    setJobPostDataState((prevJobPosts) =>
      prevJobPosts.map((jobPost) =>
        jobPost.id === jobPostId
          ? {
              ...jobPost,
              isDeleted: jobPost.isDeleted === true ? false : true,
            }
          : jobPost
      )
    );
  };

  const handleRestoreClick = (jobPostId: string) => {
    setJobPostDataState((prevJobPosts) =>
      prevJobPosts.map((jobPost) =>
        jobPost.id === jobPostId
          ? {
              ...jobPost,
              isDeleted: jobPost.isDeleted === true ? false : true,
            }
          : jobPost
      )
    );
  };

  // Filter job post records based on search query
  const filteredJobPosts = jobPostDataState.filter(
    (jobPost) =>
      jobPost.sn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      jobPost.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      jobPost.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      jobPost.jobCategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
      jobPost.jobType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      jobPost.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "Inactive":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const getFeaturedBadge = (isFeatured: boolean) => {
    if (isFeatured) {
      return (
        <div className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
          Featured
        </div>
      );
    }
    return null;
  };

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
          Total {jobPostData.length} job post records
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
            {filteredJobPosts.map((jobPost, index) => (
              <Card
                key={index}
                className="transition-all hover:border-primary/90 hover:shadow-lg hover:translate-y-[-5px] relative group dark:bg-gray-800 p-4 duration-200"
              >
                {/* Top Row - Grid with 2 columns: Title | Status */}
                <div className="grid grid-cols-2 items-center gap-2 mb-4">
                  {/* Left - Title */}
                  <CardTitle
                    className="text-lg font-semibold cursor-pointer hover:text-primary transition-colors truncate"
                    onClick={() => navigate(`/job-post/1`)}
                  >
                    {jobPost.jobTitle}
                  </CardTitle>

                  {/* Right - Status */}
                  <div className="flex justify-end gap-2">
                    {getFeaturedBadge(jobPost.isFeatured)}
                    <div
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        jobPost.status
                      )}`}
                    >
                      {jobPost.status}
                    </div>
                  </div>
                </div>

                {/* Bottom Row - Grid with 3 columns: SN | Actions | Closing Date */}
                <div className="grid grid-cols-3 items-center gap-4 pt-2 dark:border-gray-700">
                  {/* S.N */}
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 w-max">
                      S.N
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {jobPost.sn}
                    </div>
                  </div>

                  {/* Middle - Action Icons */}
                  <div className="flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {/* Delete/Restore */}
                    <Tooltip
                      label={
                        jobPost.isDeleted && canRestore
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
                        disabled={jobPost.isDeleted && !canRestore}
                        className={`cursor-pointer p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                          jobPost.isDeleted ? "text-blue-500" : "text-red-500"
                        }`}
                        onClick={() => {
                          if (canRestore && jobPost.isDeleted) {
                            handleRestoreClick(jobPost.id);
                            toastRestore("Job post restored successfully");
                          } else {
                            if (canDelete) {
                              handleDeleteClick(jobPost.id);
                              toastDelete("Job post deleted successfully");
                            }
                          }
                        }}
                      >
                        {jobPost.isDeleted && canRestore ? (
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
                          onClick={() => navigate(`/job-post/edit/1`)}
                        >
                          <FontAwesomeIcon icon={faEdit} className="h-4 w-4" />
                        </div>
                      </Tooltip>
                    )}
                  </div>

                  {/* Closing Date */}
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 w-max">
                      Closing Date
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {jobPost.closingDate.toLocaleDateString()}
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
                <span className="text-sm">Loading more job posts...</span>
              </div>
            </div>
          )}

          {/* End of data indicator */}
          {!hasMore && filteredJobPosts.length > 12 && (
            <div className="flex justify-center items-center py-8">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                No more job posts to load
              </span>
            </div>
          )}
        </div>

        {/* Filter component - Right side only */}
        {isFilterOpen && (
          <div className="w-80 flex-shrink-0 border-l border-gray-200 dark:border-gray-700 pl-4">
            <div className="h-full flex flex-col">
              <GridFilterComponent
                data={jobPostData}
                setFilteredData={setJobPostDataState}
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
                data={jobPostData}
                setFilteredData={setJobPostDataState}
                setIsExportOpen={setIsExportOpen}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
