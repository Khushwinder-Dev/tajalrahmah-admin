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
const interviewData = [
  {
    id: "1",
    interviewDate: new Date("2024-02-15"),
    candidateName: "John Doe",
    interviewer: "Jane Smith",
    vivaMarks: 18,
    writtenTotalMarks: 75,
    mcqTotalMarks: 40,
    totalMarks: 133,
    recommendation: true, // true = Recommended, false = Not Recommended
    isDraft: false,
    createdAt: new Date("2024-01-15"),
    draftedAt: null,
    updatedAt: new Date("2024-01-20"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "2",
    interviewDate: new Date("2024-02-10"),
    candidateName: "Mary Johnson",
    interviewer: "Ahmed Khan",
    vivaMarks: 15,
    writtenTotalMarks: 68,
    mcqTotalMarks: 35,
    totalMarks: 118,
    recommendation: true,
    isDraft: false,
    createdAt: new Date("2024-01-16"),
    draftedAt: null,
    updatedAt: new Date("2024-01-21"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "3",
    interviewDate: new Date("2024-02-20"),
    candidateName: "Ali Hassan",
    interviewer: "Sara Lee",
    vivaMarks: 10,
    writtenTotalMarks: 55,
    mcqTotalMarks: 28,
    totalMarks: 93,
    recommendation: false,
    isDraft: false,
    createdAt: new Date("2024-01-17"),
    draftedAt: null,
    updatedAt: new Date("2024-01-22"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "4",
    interviewDate: new Date("2024-02-25"),
    candidateName: "Noah Brown",
    interviewer: "Emily Davis",
    vivaMarks: 20,
    writtenTotalMarks: 80,
    mcqTotalMarks: 45,
    totalMarks: 145,
    recommendation: true,
    isDraft: true,
    createdAt: new Date("2024-01-18"),
    draftedAt: new Date("2024-01-25"),
    updatedAt: new Date("2024-01-25"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "5",
    interviewDate: new Date("2024-02-28"),
    candidateName: "Emma Wilson",
    interviewer: "Omar Faruk",
    vivaMarks: 12,
    writtenTotalMarks: 60,
    mcqTotalMarks: 30,
    totalMarks: 102,
    recommendation: false,
    isDraft: false,
    createdAt: new Date("2024-01-19"),
    draftedAt: null,
    updatedAt: new Date("2024-01-24"),
    deletedAt: new Date("2024-02-01"),
    isDeleted: true,
  },
  {
    id: "6",
    interviewDate: new Date("2024-03-01"),
    candidateName: "Liam Martinez",
    interviewer: "Priya Patel",
    vivaMarks: 17,
    writtenTotalMarks: 70,
    mcqTotalMarks: 37,
    totalMarks: 124,
    recommendation: true,
    isDraft: false,
    createdAt: new Date("2024-01-20"),
    draftedAt: null,
    updatedAt: new Date("2024-01-25"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "7",
    interviewDate: new Date("2024-03-05"),
    candidateName: "Olivia Taylor",
    interviewer: "Mohammed Ali",
    vivaMarks: 19,
    writtenTotalMarks: 78,
    mcqTotalMarks: 42,
    totalMarks: 139,
    recommendation: true,
    isDraft: false,
    createdAt: new Date("2024-01-21"),
    draftedAt: null,
    updatedAt: new Date("2024-01-26"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "8",
    interviewDate: new Date("2024-03-10"),
    candidateName: "William Anderson",
    interviewer: "Fatima Noor",
    vivaMarks: 14,
    writtenTotalMarks: 65,
    mcqTotalMarks: 33,
    totalMarks: 112,
    recommendation: true,
    isDraft: false,
    createdAt: new Date("2024-01-22"),
    draftedAt: null,
    updatedAt: new Date("2024-01-27"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "9",
    interviewDate: new Date("2024-03-15"),
    candidateName: "Sophia Thomas",
    interviewer: "David Kim",
    vivaMarks: 16,
    writtenTotalMarks: 72,
    mcqTotalMarks: 39,
    totalMarks: 127,
    recommendation: true,
    isDraft: false,
    createdAt: new Date("2024-01-23"),
    draftedAt: null,
    updatedAt: new Date("2024-01-28"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "10",
    interviewDate: new Date("2024-03-20"),
    candidateName: "James Scott",
    interviewer: "Ibrahim Musa",
    vivaMarks: 13,
    writtenTotalMarks: 62,
    mcqTotalMarks: 31,
    totalMarks: 106,
    recommendation: false,
    isDraft: false,
    createdAt: new Date("2024-01-24"),
    draftedAt: null,
    updatedAt: new Date("2024-01-29"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "11",
    interviewDate: new Date("2024-03-25"),
    candidateName: "Ava Robinson",
    interviewer: "Chen Wei",
    vivaMarks: 20,
    writtenTotalMarks: 84,
    mcqTotalMarks: 44,
    totalMarks: 148,
    recommendation: true,
    isDraft: false,
    createdAt: new Date("2024-01-25"),
    draftedAt: null,
    updatedAt: new Date("2024-01-30"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "12",
    interviewDate: new Date("2024-03-30"),
    candidateName: "Mia Clark",
    interviewer: "Yuki Tanaka",
    vivaMarks: 11,
    writtenTotalMarks: 58,
    mcqTotalMarks: 29,
    totalMarks: 98,
    recommendation: false,
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

export default function InterviewsGrid({
  searchQuery,
  setIsFilterOpen,
  isFilterOpen,
  setIsExportOpen,
  isExportOpen,
}: Props) {
  console.log("Interviews grid rendered");

  const navigate = useNavigate();

  const [interviewDataState, setInterviewDataState] = useState(interviewData);
  const canDelete: boolean = usePermission("interview", "delete");
  const canRestore: boolean = usePermission("interview", "restore");
  const canEdit: boolean = usePermission("interview", "edit");

  // Debug permissions
  console.log("Interview Permissions:", {
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

    const candidateFirstNames = [
      "John",
      "Mary",
      "Ali",
      "Noah",
      "Emma",
      "Liam",
      "Olivia",
      "William",
      "Sophia",
      "James",
      "Ava",
      "Mia",
    ];
    const candidateLastNames = [
      "Doe",
      "Johnson",
      "Hassan",
      "Brown",
      "Wilson",
      "Martinez",
      "Taylor",
      "Anderson",
      "Thomas",
      "Scott",
      "Robinson",
      "Clark",
    ];
    const interviewers = [
      "Jane Smith",
      "Ahmed Khan",
      "Sara Lee",
      "Emily Davis",
      "Omar Faruk",
      "Priya Patel",
      "Mohammed Ali",
      "Fatima Noor",
      "David Kim",
      "Ibrahim Musa",
      "Chen Wei",
      "Yuki Tanaka",
    ];

    const newItems = Array.from({ length: ITEMS_PER_PAGE }, (_, index) => {
      const viva = Math.floor(Math.random() * 20) + 1;
      const written = Math.floor(Math.random() * 85) + 1;
      const mcq = Math.floor(Math.random() * 45) + 1;
      const total = viva + written + mcq;
      const recommended = total >= 120;
      return {
        id: `${Date.now()}-${index}`,
        interviewDate: new Date(),
        candidateName: `${
          candidateFirstNames[
            Math.floor(Math.random() * candidateFirstNames.length)
          ]
        } ${
          candidateLastNames[
            Math.floor(Math.random() * candidateLastNames.length)
          ]
        }`,
        interviewer:
          interviewers[Math.floor(Math.random() * interviewers.length)],
        vivaMarks: viva,
        writtenTotalMarks: written,
        mcqTotalMarks: mcq,
        totalMarks: total,
        recommendation: recommended,
        isDraft: Math.random() > 0.7,
        createdAt: new Date(),
        draftedAt: null,
        updatedAt: new Date(),
        deletedAt: null,
        isDeleted: false,
      };
    });

    // Stop loading more after reaching 50 items for demo
    if (interviewDataState.length >= 46) {
      setHasMore(false);
    } else {
      setInterviewDataState((prev) => [...prev, ...newItems]);
      setPage((prev) => prev + 1);
    }

    setIsLoading(false);
  }, [interviewDataState.length, isLoading, hasMore]);

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

  const handleDeleteClick = (interviewId: string) => {
    setInterviewDataState((prevInterviews) =>
      prevInterviews.map((interview) =>
        interview.id === interviewId
          ? {
              ...interview,
              isDeleted: interview.isDeleted === true ? false : true,
            }
          : interview
      )
    );
  };

  const handleRestoreClick = (interviewId: string) => {
    setInterviewDataState((prevInterviews) =>
      prevInterviews.map((interview) =>
        interview.id === interviewId
          ? {
              ...interview,
              isDeleted: interview.isDeleted === true ? false : true,
            }
          : interview
      )
    );
  };

  // Filter interviews based on search query
  const filteredInterviews = interviewDataState.filter((t) => {
    const q = searchQuery.toLowerCase();
    const dateStr =
      t.interviewDate instanceof Date
        ? t.interviewDate.toISOString().split("T")[0]
        : String(t.interviewDate);
    return (
      t.candidateName.toLowerCase().includes(q) ||
      t.interviewer.toLowerCase().includes(q) ||
      dateStr.includes(searchQuery) ||
      String(t.totalMarks).includes(searchQuery) ||
      String(t.vivaMarks).includes(searchQuery) ||
      String(t.writtenTotalMarks).includes(searchQuery) ||
      String(t.mcqTotalMarks).includes(searchQuery)
    );
  });

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
          Total {interviewData.length} interviews
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
            {filteredInterviews.map((interview, index) => (
              <Card
                key={index}
                className="transition-all hover:border-primary/90 hover:shadow-lg hover:translate-y-[-5px] relative group dark:bg-gray-800 p-4 duration-200"
              >
                {/* Top Row - Grid with 2 columns: Title | Status */}
                <div className="grid grid-cols-2 items-center gap-2 mb-4">
                  {/* Left - Title */}
                  <CardTitle
                    className="text-lg font-semibold cursor-pointer hover:text-primary transition-colors truncate"
                    onClick={() => navigate(`/interview/1`)}
                  >
                    {interview.candidateName}
                  </CardTitle>

                  {/* Right - Status */}
                  <div className="flex justify-end">
                    <div
                      className={`px-2 py-1 rounded-full text-[10px] 2xl:text-xs font-medium ${
                        interview.recommendation
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                      }`}
                    >
                      {interview.recommendation
                        ? "Recommended"
                        : "Not Recommended"}
                    </div>
                  </div>
                </div>

                {/* Bottom Row - Grid with 3 columns: Bonus Type | Actions | Notes */}
                <div className="grid grid-cols-3 items-center gap-4 pt-2 dark:border-gray-700">
                  {/* Interviewer - Left aligned */}
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Interviewer
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {interview.interviewer}
                    </div>
                  </div>

                  {/* Middle - Action Icons */}
                  <div className="flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {/* Delete/Restore */}
                    <Tooltip
                      label={
                        interview.isDeleted && canRestore
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
                        disabled={interview.isDeleted && !canRestore}
                        className={`cursor-pointer p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                          interview.isDeleted ? "text-blue-500" : "text-red-500"
                        }`}
                        onClick={() => {
                          if (canRestore && interview.isDeleted) {
                            handleRestoreClick(interview.id);
                            toastRestore("Interview restored successfully");
                          } else {
                            if (canDelete) {
                              handleDeleteClick(interview.id);
                              toastDelete("Interview deleted successfully");
                            }
                          }
                        }}
                      >
                        {interview.isDeleted && canRestore ? (
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
                          onClick={() => navigate(`/interview/edit/1`)}
                        >
                          <FontAwesomeIcon icon={faEdit} className="h-4 w-4" />
                        </div>
                      </Tooltip>
                    )}
                  </div>

                  {/* Total Marks - Right aligned */}
                  <div className="text-right">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Total Marks
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {interview.totalMarks}
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
                <span className="text-sm">Loading more transfers...</span>
              </div>
            </div>
          )}

          {/* End of data indicator */}
          {!hasMore && filteredInterviews.length > 12 && (
            <div className="flex justify-center items-center py-8">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                No more interviews to load
              </span>
            </div>
          )}
        </div>

        {/* Filter component - Right side only */}
        {isFilterOpen && (
          <div className="w-80 flex-shrink-0 border-l border-gray-200 dark:border-gray-700 pl-4">
            <div className="h-full flex flex-col">
              <GridFilterComponent
                data={interviewData}
                setFilteredData={setInterviewDataState}
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
                data={interviewData}
                setFilteredData={setInterviewDataState}
                setIsExportOpen={setIsExportOpen}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
