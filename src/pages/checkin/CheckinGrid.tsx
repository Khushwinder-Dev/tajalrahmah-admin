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
const checkinData = [
  {
    id: "1",
    bookingNo: "BK001",
    checkIn: new Date("2024-01-15"),
    checkOut: new Date("2024-01-18"),
    arrivalFrom: "Dubai, UAE",
    bookingType: "Online",
    bookingReference: "REF001",
    bookingRefNo: "BRN001",
    purposeOfVisit: "Business",
    remarks: "VIP Guest",
    roomType: "Deluxe",
    roomNo: "101",
    adults: 2,
    children: 1,
    status: "Active",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-20"),
  },
  {
    id: "2",
    bookingNo: "BK002",
    checkIn: new Date("2024-01-16"),
    checkOut: new Date("2024-01-19"),
    arrivalFrom: "Riyadh, KSA",
    bookingType: "Phone",
    bookingReference: "REF002",
    bookingRefNo: "BRN002",
    purposeOfVisit: "Leisure",
    remarks: "Honeymoon",
    roomType: "Suite",
    roomNo: "201",
    adults: 2,
    children: 0,
    status: "Active",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-16"),
    updatedAt: new Date("2024-01-21"),
  },
  {
    id: "3",
    bookingNo: "BK003",
    checkIn: new Date("2024-01-17"),
    checkOut: new Date("2024-01-20"),
    arrivalFrom: "Kuwait City",
    bookingType: "Walk-in",
    bookingReference: "REF003",
    bookingRefNo: "BRN003",
    purposeOfVisit: "Conference",
    remarks: "Speaker",
    roomType: "Standard",
    roomNo: "301",
    adults: 1,
    children: 0,
    status: "Active",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-17"),
    updatedAt: new Date("2024-01-22"),
  },
  {
    id: "4",
    bookingNo: "BK004",
    checkIn: new Date("2024-01-18"),
    checkOut: new Date("2024-01-21"),
    arrivalFrom: "Doha, Qatar",
    bookingType: "Online",
    bookingReference: "REF004",
    bookingRefNo: "BRN004",
    purposeOfVisit: "Medical",
    remarks: "Hospital appointment",
    roomType: "Accessible",
    roomNo: "401",
    adults: 1,
    children: 0,
    status: "Inactive",
    isActive: false,
    isDeleted: false,
    createdAt: new Date("2024-01-18"),
    updatedAt: new Date("2024-01-23"),
  },
  {
    id: "5",
    bookingNo: "BK005",
    checkIn: new Date("2024-01-19"),
    checkOut: new Date("2024-01-22"),
    arrivalFrom: "Muscat, Oman",
    bookingType: "Travel Agent",
    bookingReference: "REF005",
    bookingRefNo: "BRN005",
    purposeOfVisit: "Family Visit",
    remarks: "Large family",
    roomType: "Family",
    roomNo: "501",
    adults: 4,
    children: 3,
    status: "Active",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-19"),
    updatedAt: new Date("2024-01-24"),
  },
  {
    id: "6",
    bookingNo: "BK006",
    checkIn: new Date("2024-01-20"),
    checkOut: new Date("2024-01-23"),
    arrivalFrom: "Amman, Jordan",
    bookingType: "Online",
    bookingReference: "REF006",
    bookingRefNo: "BRN006",
    purposeOfVisit: "Education",
    remarks: "Student",
    roomType: "Budget",
    roomNo: "601",
    adults: 1,
    children: 0,
    status: "Active",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-20"),
    updatedAt: new Date("2024-01-25"),
  },
  {
    id: "7",
    bookingNo: "BK007",
    checkIn: new Date("2024-01-21"),
    checkOut: new Date("2024-01-24"),
    arrivalFrom: "Beirut, Lebanon",
    bookingType: "Phone",
    bookingReference: "REF007",
    bookingRefNo: "BRN007",
    purposeOfVisit: "Shopping",
    remarks: "Weekend trip",
    roomType: "Deluxe",
    roomNo: "701",
    adults: 2,
    children: 1,
    status: "Inactive",
    isActive: false,
    isDeleted: false,
    createdAt: new Date("2024-01-21"),
    updatedAt: new Date("2024-01-26"),
  },
  {
    id: "8",
    bookingNo: "BK008",
    checkIn: new Date("2024-01-22"),
    checkOut: new Date("2024-01-25"),
    arrivalFrom: "Cairo, Egypt",
    bookingType: "Walk-in",
    bookingReference: "REF008",
    bookingRefNo: "BRN008",
    purposeOfVisit: "Tourism",
    remarks: "First time visitor",
    roomType: "Standard",
    roomNo: "801",
    adults: 2,
    children: 0,
    status: "Active",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-22"),
    updatedAt: new Date("2024-01-27"),
  },
  {
    id: "9",
    bookingNo: "BK009",
    checkIn: new Date("2024-01-23"),
    checkOut: new Date("2024-01-26"),
    arrivalFrom: "Baghdad, Iraq",
    bookingType: "Online",
    bookingReference: "REF009",
    bookingRefNo: "BRN009",
    purposeOfVisit: "Business",
    remarks: "Meeting with clients",
    roomType: "Executive",
    roomNo: "901",
    adults: 1,
    children: 0,
    status: "Active",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-23"),
    updatedAt: new Date("2024-01-28"),
  },
  {
    id: "10",
    bookingNo: "BK010",
    checkIn: new Date("2024-01-24"),
    checkOut: new Date("2024-01-27"),
    arrivalFrom: "Istanbul, Turkey",
    bookingType: "Travel Agent",
    bookingReference: "REF010",
    bookingRefNo: "BRN010",
    purposeOfVisit: "Cultural Exchange",
    remarks: "Artist residency",
    roomType: "Studio",
    roomNo: "1001",
    adults: 1,
    children: 0,
    status: "Inactive",
    isActive: false,
    isDeleted: false,
    createdAt: new Date("2024-01-24"),
    updatedAt: new Date("2024-01-29"),
  },
  {
    id: "11",
    bookingNo: "BK011",
    checkIn: new Date("2024-01-25"),
    checkOut: new Date("2024-01-28"),
    arrivalFrom: "Athens, Greece",
    bookingType: "Online",
    bookingReference: "REF011",
    bookingRefNo: "BRN011",
    purposeOfVisit: "Research",
    remarks: "Academic conference",
    roomType: "Standard",
    roomNo: "1101",
    adults: 1,
    children: 0,
    status: "Active",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-25"),
    updatedAt: new Date("2024-01-30"),
  },
  {
    id: "12",
    bookingNo: "BK012",
    checkIn: new Date("2024-01-26"),
    checkOut: new Date("2024-01-29"),
    arrivalFrom: "New Delhi, India",
    bookingType: "Phone",
    bookingReference: "REF012",
    bookingRefNo: "BRN012",
    purposeOfVisit: "Medical Tourism",
    remarks: "Surgery scheduled",
    roomType: "Medical Suite",
    roomNo: "1201",
    adults: 2,
    children: 0,
    status: "Active",
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

export default function CheckinGrid({
  searchQuery,
  setIsFilterOpen,
  isFilterOpen,
  setIsExportOpen,
  isExportOpen,
}: Props) {
  console.log("Checkin grid rendered");

  const navigate = useNavigate();

  const [checkinDataState, setCheckinDataState] = useState(checkinData);
  const canDelete: boolean = usePermission("checkin", "delete");
  const canRestore: boolean = usePermission("checkin", "restore");
  const canEdit: boolean = usePermission("checkin", "edit");

  // Debug permissions
  console.log("Checkin Permissions:", {
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

    const arrivalFroms = [
      "Dubai, UAE",
      "Riyadh, KSA",
      "Kuwait City",
      "Doha, Qatar",
      "Muscat, Oman",
      "Amman, Jordan",
      "Beirut, Lebanon",
      "Cairo, Egypt",
      "Baghdad, Iraq",
      "Istanbul, Turkey",
      "Athens, Greece",
      "New Delhi, India",
    ];
    const bookingTypes = ["Online", "Phone", "Walk-in", "Travel Agent"];
    const purposes = [
      "Business",
      "Leisure",
      "Conference",
      "Medical",
      "Family Visit",
      "Education",
      "Shopping",
      "Tourism",
      "Cultural Exchange",
      "Research",
      "Medical Tourism",
    ];
    const roomTypes = [
      "Standard",
      "Deluxe",
      "Suite",
      "Accessible",
      "Family",
      "Budget",
      "Executive",
      "Studio",
      "Medical Suite",
    ];
    const statuses = ["Active", "Inactive"];

    const newItems = Array.from({ length: ITEMS_PER_PAGE }, (_, index) => ({
      id: `${Date.now()}-${index}`,
      bookingNo: `BK${String(checkinDataState.length + index + 1).padStart(
        3,
        "0"
      )}`,
      checkIn: new Date(),
      checkOut: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days later
      arrivalFrom:
        arrivalFroms[Math.floor(Math.random() * arrivalFroms.length)],
      bookingType:
        bookingTypes[Math.floor(Math.random() * bookingTypes.length)],
      bookingReference: `REF${String(
        checkinDataState.length + index + 1
      ).padStart(3, "0")}`,
      bookingRefNo: `BRN${String(checkinDataState.length + index + 1).padStart(
        3,
        "0"
      )}`,
      purposeOfVisit: purposes[Math.floor(Math.random() * purposes.length)],
      remarks: "New booking",
      roomType: roomTypes[Math.floor(Math.random() * roomTypes.length)],
      roomNo: `${String(checkinDataState.length + index + 1).padStart(
        3,
        "0"
      )}1`,
      adults: Math.floor(Math.random() * 4) + 1,
      children: Math.floor(Math.random() * 3),
      status: statuses[Math.floor(Math.random() * statuses.length)],
      isActive: Math.random() > 0.3,
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    // Stop loading more after reaching 50 items for demo
    if (checkinDataState.length >= 46) {
      setHasMore(false);
    } else {
      setCheckinDataState((prev) => [...prev, ...newItems]);
      setPage((prev) => prev + 1);
    }

    setIsLoading(false);
  }, [checkinDataState.length, isLoading, hasMore]);

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

  const handleDeleteClick = (checkinId: string) => {
    setCheckinDataState((prevCheckins) =>
      prevCheckins.map((checkin) =>
        checkin.id === checkinId
          ? {
              ...checkin,
              isDeleted: checkin.isDeleted === true ? false : true,
            }
          : checkin
      )
    );
  };

  const handleRestoreClick = (checkinId: string) => {
    setCheckinDataState((prevCheckins) =>
      prevCheckins.map((checkin) =>
        checkin.id === checkinId
          ? {
              ...checkin,
              isDeleted: checkin.isDeleted === true ? false : true,
            }
          : checkin
      )
    );
  };

  // Filter checkin records based on search query
  const filteredCheckin = checkinDataState.filter(
    (checkin) =>
      checkin.bookingNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      checkin.arrivalFrom.toLowerCase().includes(searchQuery.toLowerCase()) ||
      checkin.bookingType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      checkin.purposeOfVisit
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      checkin.roomType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      checkin.roomNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      checkin.status.toLowerCase().includes(searchQuery.toLowerCase())
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
          Total {checkinData.length} checkin records
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
            {filteredCheckin.map((checkin, index) => (
              <Card
                key={index}
                className="transition-all hover:border-primary/90 hover:shadow-lg hover:translate-y-[-5px] relative group dark:bg-gray-800 p-4 duration-200"
              >
                {/* Top Row - Grid with 2 columns: Title | Status */}
                <div className="grid grid-cols-2 items-center gap-2 mb-4">
                  {/* Left - Title */}
                  <CardTitle
                    className="text-lg font-semibold cursor-pointer hover:text-primary transition-colors truncate"
                    onClick={() => navigate(`/checkin/1`)}
                  >
                    {checkin.bookingNo}
                  </CardTitle>

                  {/* Right - Status */}
                  <div className="flex justify-end">
                    <div
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        checkin.status
                      )}`}
                    >
                      {checkin.status}
                    </div>
                  </div>
                </div>

                {/* Bottom Row - Grid with 3 columns: Room Info | Actions | Guest Info */}
                <div className="grid grid-cols-3 items-center gap-4 pt-2 dark:border-gray-700">
                  {/* Room Info */}
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 w-max">
                      Room
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {checkin.roomType} - {checkin.roomNo}
                    </div>
                  </div>

                  {/* Middle - Action Icons */}
                  <div className="flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {/* Delete/Restore */}
                    <Tooltip
                      label={
                        checkin.isDeleted && canRestore
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
                        disabled={checkin.isDeleted && !canRestore}
                        className={`cursor-pointer p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                          checkin.isDeleted ? "text-blue-500" : "text-red-500"
                        }`}
                        onClick={() => {
                          if (canRestore && checkin.isDeleted) {
                            handleRestoreClick(checkin.id);
                            toastRestore(
                              "Checkin record restored successfully"
                            );
                          } else {
                            if (canDelete) {
                              handleDeleteClick(checkin.id);
                              toastDelete(
                                "Checkin record deleted successfully"
                              );
                            }
                          }
                        }}
                      >
                        {checkin.isDeleted && canRestore ? (
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
                          onClick={() => navigate(`/checkin/edit/1`)}
                        >
                          <FontAwesomeIcon icon={faEdit} className="h-4 w-4" />
                        </div>
                      </Tooltip>
                    )}
                  </div>

                  {/* Guest Info */}
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 w-max">
                      Guests
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {checkin.adults}A + {checkin.children}C
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
                <span className="text-sm">Loading more checkin records...</span>
              </div>
            </div>
          )}

          {/* End of data indicator */}
          {!hasMore && filteredCheckin.length > 12 && (
            <div className="flex justify-center items-center py-8">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                No more checkin records to load
              </span>
            </div>
          )}
        </div>

        {/* Filter component - Right side only */}
        {isFilterOpen && (
          <div className="w-80 flex-shrink-0 border-l border-gray-200 dark:border-gray-700 pl-4">
            <div className="h-full flex flex-col">
              <GridFilterComponent
                data={checkinData}
                setFilteredData={setCheckinDataState}
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
                data={checkinData}
                setFilteredData={setCheckinDataState}
                setIsExportOpen={setIsExportOpen}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
