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

// Mock data for benefit and penalty - replace with real data from your API
const benefitPenaltyData = [
  {
    id: "1",
    type: "Benefit",
    subject: "Performance Bonus",
    criteria: "Exceeds targets by 20%",
    date: new Date("2024-02-15"),
    driver: "Ahmed Al-Rashid",
    formality: "Monthly Review",
    description: "Outstanding performance in Q1 2024",
    isActive: true,
    isDraft: false,
    createdAt: new Date("2024-01-15"),
    draftedAt: null,
    updatedAt: new Date("2024-01-20"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "2",
    type: "Penalty",
    subject: "Late Arrival",
    criteria: "3+ late arrivals in month",
    date: new Date("2024-02-10"),
    driver: "Mohammed Al-Zahrani",
    formality: "HR Warning",
    description: "Multiple late arrivals without notice",
    isActive: true,
    isDraft: false,
    createdAt: new Date("2024-01-16"),
    draftedAt: null,
    updatedAt: new Date("2024-01-21"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "3",
    type: "Benefit",
    subject: "Safety Award",
    criteria: "Zero accidents for 6 months",
    date: new Date("2024-02-20"),
    driver: "Omar Al-Saadi",
    formality: "Quarterly Review",
    description: "Maintained perfect safety record",
    isActive: false,
    isDraft: false,
    createdAt: new Date("2024-01-17"),
    draftedAt: null,
    updatedAt: new Date("2024-01-22"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "4",
    type: "Penalty",
    subject: "Vehicle Damage",
    criteria: "Minor damage to company vehicle",
    date: new Date("2024-02-25"),
    driver: "Khalid Al-Mansouri",
    formality: "Incident Report",
    description: "Scratched company van during parking",
    isActive: true,
    isDraft: true,
    createdAt: new Date("2024-01-18"),
    draftedAt: new Date("2024-01-25"),
    updatedAt: new Date("2024-01-25"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "5",
    type: "Benefit",
    subject: "Customer Service",
    criteria: "95% customer satisfaction",
    date: new Date("2024-02-28"),
    driver: "Abdullah Al-Qahtani",
    formality: "Monthly Review",
    description: "Excellent customer feedback ratings",
    isActive: true,
    isDraft: false,
    createdAt: new Date("2024-01-19"),
    draftedAt: null,
    updatedAt: new Date("2024-01-24"),
    deletedAt: new Date("2024-02-01"),
    isDeleted: true,
  },
  {
    id: "6",
    type: "Penalty",
    subject: "Route Deviation",
    criteria: "Unauthorized route change",
    date: new Date("2024-03-01"),
    driver: "Hassan Al-Otaibi",
    formality: "Manager Review",
    description: "Changed route without approval",
    isActive: true,
    isDraft: false,
    createdAt: new Date("2024-01-20"),
    draftedAt: null,
    updatedAt: new Date("2024-01-25"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "7",
    type: "Benefit",
    subject: "Fuel Efficiency",
    criteria: "15% below fuel budget",
    date: new Date("2024-03-05"),
    driver: "Saleh Al-Harbi",
    formality: "Monthly Review",
    description: "Consistently maintained fuel efficiency",
    isActive: true,
    isDraft: false,
    createdAt: new Date("2024-01-21"),
    draftedAt: null,
    updatedAt: new Date("2024-01-26"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "8",
    type: "Penalty",
    subject: "Documentation",
    criteria: "Missing delivery receipts",
    date: new Date("2024-03-10"),
    driver: "Fahad Al-Dossary",
    formality: "HR Warning",
    description: "Failed to collect delivery confirmations",
    isActive: true,
    isDraft: false,
    createdAt: new Date("2024-01-22"),
    draftedAt: null,
    updatedAt: new Date("2024-01-27"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "9",
    type: "Benefit",
    subject: "Team Player",
    criteria: "Helped 3+ colleagues",
    date: new Date("2024-03-15"),
    driver: "Yousef Al-Shammari",
    formality: "Peer Recognition",
    description: "Assisted team members with deliveries",
    isActive: true,
    isDraft: false,
    createdAt: new Date("2024-01-23"),
    draftedAt: null,
    updatedAt: new Date("2024-01-28"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "10",
    type: "Penalty",
    subject: "Vehicle Maintenance",
    criteria: "Skipped scheduled maintenance",
    date: new Date("2024-03-20"),
    driver: "Ibrahim Al-Rashid",
    formality: "Manager Review",
    description: "Missed vehicle service appointment",
    isActive: true,
    isDraft: false,
    createdAt: new Date("2024-01-24"),
    draftedAt: null,
    updatedAt: new Date("2024-01-29"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "11",
    type: "Benefit",
    subject: "Innovation",
    criteria: "Process improvement suggestion",
    date: new Date("2024-03-25"),
    driver: "Nasser Al-Mutairi",
    formality: "Management Review",
    description: "Proposed new delivery route optimization",
    isActive: true,
    isDraft: false,
    createdAt: new Date("2024-01-25"),
    draftedAt: null,
    updatedAt: new Date("2024-01-30"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "12",
    type: "Penalty",
    subject: "Communication",
    criteria: "Failed to report delays",
    date: new Date("2024-03-30"),
    driver: "Majed Al-Zahrani",
    formality: "HR Warning",
    description: "Did not inform about delivery delays",
    isActive: true,
    isDraft: false,
    createdAt: new Date("2024-01-26"),
    draftedAt: null,
    updatedAt: new Date("2024-01-31"),
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

export default function BenefitPenaltyGrid({
  searchQuery,
  setIsFilterOpen,
  isFilterOpen,
  setIsExportOpen,
  isExportOpen,
}: Props) {
  console.log("Benefit penalty grid rendered");

  const navigate = useNavigate();

  const [benefitPenaltyDataState, setBenefitPenaltyDataState] =
    useState(benefitPenaltyData);
  const canDelete: boolean = usePermission("benefitPenalty", "delete");
  const canRestore: boolean = usePermission("benefitPenalty", "restore");
  const canEdit: boolean = usePermission("benefitPenalty", "edit");

  // Debug permissions
  console.log("Benefit Penalty Permissions:", {
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

    const types = ["Benefit", "Penalty"];
    const subjects = [
      "Performance Bonus",
      "Late Arrival",
      "Safety Award",
      "Vehicle Damage",
      "Customer Service",
      "Route Deviation",
      "Fuel Efficiency",
      "Documentation",
      "Team Player",
      "Vehicle Maintenance",
      "Innovation",
      "Communication",
    ];
    const formalities = [
      "Monthly Review",
      "HR Warning",
      "Quarterly Review",
      "Incident Report",
      "Manager Review",
      "Peer Recognition",
      "Management Review",
    ];

    const newItems = Array.from({ length: ITEMS_PER_PAGE }, (_, index) => ({
      id: `${Date.now()}-${index}`,
      type: types[Math.floor(Math.random() * types.length)],
      subject: subjects[Math.floor(Math.random() * subjects.length)],
      criteria: "Sample criteria for benefit/penalty",
      date: new Date(),
      driver: `Driver ${Math.floor(Math.random() * 1000)}`,
      formality: formalities[Math.floor(Math.random() * formalities.length)],
      description: "Sample benefit/penalty description",
      isActive: Math.random() > 0.3,
      isDraft: Math.random() > 0.7,
      createdAt: new Date(),
      draftedAt: null,
      updatedAt: new Date(),
      deletedAt: null,
      isDeleted: false,
    }));

    // Stop loading more after reaching 50 items for demo
    if (benefitPenaltyDataState.length >= 46) {
      setHasMore(false);
    } else {
      setBenefitPenaltyDataState((prev) => [...prev, ...newItems]);
      setPage((prev) => prev + 1);
    }

    setIsLoading(false);
  }, [benefitPenaltyDataState.length, isLoading, hasMore]);

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

  const handleDeleteClick = (benefitPenaltyId: string) => {
    setBenefitPenaltyDataState((prevBenefitPenalties) =>
      prevBenefitPenalties.map((benefitPenalty) =>
        benefitPenalty.id === benefitPenaltyId
          ? {
              ...benefitPenalty,
              isDeleted: benefitPenalty.isDeleted === true ? false : true,
            }
          : benefitPenalty
      )
    );
  };

  const handleRestoreClick = (benefitPenaltyId: string) => {
    setBenefitPenaltyDataState((prevBenefitPenalties) =>
      prevBenefitPenalties.map((benefitPenalty) =>
        benefitPenalty.id === benefitPenaltyId
          ? {
              ...benefitPenalty,
              isDeleted: benefitPenalty.isDeleted === true ? false : true,
            }
          : benefitPenalty
      )
    );
  };

  // Filter benefit penalties based on search query
  const filteredBenefitPenalties = benefitPenaltyDataState.filter(
    (benefitPenalty) =>
      benefitPenalty.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      benefitPenalty.subject
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      benefitPenalty.driver.toLowerCase().includes(searchQuery.toLowerCase()) ||
      benefitPenalty.formality
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      benefitPenalty.description
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
  );

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
          Total {benefitPenaltyData.length} benefit/penalty records
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
            {filteredBenefitPenalties.map((benefitPenalty, index) => (
              <Card
                key={index}
                className="transition-all hover:border-primary/90 hover:shadow-lg hover:translate-y-[-5px] relative group dark:bg-gray-800 p-4 duration-200"
              >
                {/* Top Row - Grid with 2 columns: Title | Status */}
                <div className="grid grid-cols-2 items-center gap-2 mb-4">
                  {/* Left - Title */}
                  <CardTitle
                    className="text-lg font-semibold cursor-pointer hover:text-primary transition-colors truncate"
                    onClick={() => navigate(`/benefit-penalty/1`)}
                  >
                    {benefitPenalty.type}
                  </CardTitle>

                  {/* Right - Status */}
                  <div className="flex justify-end">
                    <div
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        benefitPenalty.isActive
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                      }`}
                    >
                      {benefitPenalty.isActive ? "Active" : "Inactive"}
                    </div>
                  </div>
                </div>

                {/* Bottom Row - Grid with 3 columns: Subject | Actions | Description */}
                <div className="grid grid-cols-3 items-center gap-4 pt-2 dark:border-gray-700">
                  {/* Subject - Left aligned */}
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Subject
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {benefitPenalty.subject}
                    </div>
                  </div>

                  {/* Middle - Action Icons */}
                  <div className="flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {/* Delete/Restore */}
                    <Tooltip
                      label={
                        benefitPenalty.isDeleted && canRestore
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
                        disabled={benefitPenalty.isDeleted && !canRestore}
                        className={`cursor-pointer p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                          benefitPenalty.isDeleted
                            ? "text-blue-500"
                            : "text-red-500"
                        }`}
                        onClick={() => {
                          if (canRestore && benefitPenalty.isDeleted) {
                            handleRestoreClick(benefitPenalty.id);
                            toastRestore(
                              "Benefit/penalty record restored successfully"
                            );
                          } else {
                            if (canDelete) {
                              handleDeleteClick(benefitPenalty.id);
                              toastDelete(
                                "Benefit/penalty record deleted successfully"
                              );
                            }
                          }
                        }}
                      >
                        {benefitPenalty.isDeleted && canRestore ? (
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
                          onClick={() => navigate(`/benefit-penalty/edit/1`)}
                        >
                          <FontAwesomeIcon icon={faEdit} className="h-4 w-4" />
                        </div>
                      </Tooltip>
                    )}
                  </div>

                  {/* Description - Right aligned */}
                  <div className="text-right">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Description
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {benefitPenalty.description}
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
                <span className="text-sm">
                  Loading more benefit/penalty records...
                </span>
              </div>
            </div>
          )}

          {/* End of data indicator */}
          {!hasMore && filteredBenefitPenalties.length > 12 && (
            <div className="flex justify-center items-center py-8">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                No more benefit/penalty records to load
              </span>
            </div>
          )}
        </div>

        {/* Filter component - Right side only */}
        {isFilterOpen && (
          <div className="w-80 flex-shrink-0 border-l border-gray-200 dark:border-gray-700 pl-4">
            <div className="h-full flex flex-col">
              <GridFilterComponent
                data={benefitPenaltyData}
                setFilteredData={setBenefitPenaltyDataState}
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
                data={benefitPenaltyData}
                setFilteredData={setBenefitPenaltyDataState}
                setIsExportOpen={setIsExportOpen}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
