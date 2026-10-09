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
const mockData = [
  {
    id: "1",
   booking: "Deluxe Suite",
    roomSize: "350",
    roomSizeName: "sq ft",
    capacity: "2",
    extraCapacity: "1",
    rate: "4500",
    bedCharge: "500",
    personalCharges: "300",
    review: "Excellent room with sea view",
    description:
      "Spacious deluxe suite with modern amenities, a king-size bed, and a private balcony.",
    bookingType: " ( 1800 x 1500 ) ",
    status: "active",
    isDeleted: false,
  },
  {
    id: "2",
   booking: "Executive Room",
    roomSize: "320",
    roomSizeName: "sq ft",
    capacity: "2",
    extraCapacity: "1",
    rate: "4200",
    bedCharge: "400",
    personalCharges: "250",
    review: "Cozy and comfortable with city view",
    description:
      "Well-furnished executive room with a queen-size bed, work desk, and modern bathroom.",
    bookingType: " ( 1600 x 1400 ) ",
    status: "archived",
    isDeleted: false,
  },
  {
    id: "3",
   booking: "Modern Office Space",
    roomSize: "500",
    roomSizeName: "sq ft",
    capacity: "8",
    extraCapacity: "2",
    rate: "8000",
    bedCharge: "0",
    personalCharges: "0",
    review: "Perfect for corporate meetings",
    description:
      "Central London, modern office space with conference facilities and fast Wi-Fi.",
    bookingType: " ( 3200 x 2500 ) ",
    status: "archived",
    isDeleted: false,
  },
  {
    id: "4",
   booking: "Luxury Penthouse",
    roomSize: "1200",
    roomSizeName: "sq ft",
    capacity: "6",
    extraCapacity: "2",
    rate: "20000",
    bedCharge: "1000",
    personalCharges: "500",
    review: "Breathtaking city and marina views",
    description:
      "Dubai Marina, luxury penthouse suite with rooftop pool and premium services.",
    bookingType: " ( 5000 x 4200 ) ",
    status: "archived",
    isDeleted: false,
  },
  {
    id: "5",
   booking: "Small Café Interior",
    roomSize: "300",
    roomSizeName: "sq ft",
    capacity: "20",
    extraCapacity: "5",
    rate: "6000",
    bedCharge: "0",
    personalCharges: "0",
    review: "Cozy ambiance for coffee lovers",
    description:
      "Paris, small café shop interior with vintage décor and warm lighting.",
    bookingType: " ( 1500 x 1200 ) ",
    status: "archived",
    isDeleted: false,
  },
  {
    id: "6",
   booking: "Conference Hall",
    roomSize: "1500",
    roomSizeName: "sq ft",
    capacity: "100",
    extraCapacity: "20",
    rate: "25000",
    bedCharge: "0",
    personalCharges: "0",
    review: "Premium facilities for business events",
    description:
      "Singapore, premium conference hall with state-of-the-art AV equipment.",
    bookingType: " ( 4500 x 3800 ) ",
    status: "archived",
    isDeleted: false,
  },
  {
    id: "7",
   booking: "Urban Apartment",
    roomSize: "400",
    roomSizeName: "sq ft",
    capacity: "2",
    extraCapacity: "1",
    rate: "5500",
    bedCharge: "500",
    personalCharges: "300",
    review: "Compact and efficient city living",
    description:
      "Tokyo, compact urban apartment with modern kitchen and smart storage.",
    bookingType: " ( 2000 x 1700 ) ",
    status: "archived",
    isDeleted: false,
  },
  {
    id: "8",
   booking: "Boutique Hotel Room",
    roomSize: "350",
    roomSizeName: "sq ft",
    capacity: "2",
    extraCapacity: "1",
    rate: "4800",
    bedCharge: "400",
    personalCharges: "250",
    review: "Charming and stylish stay",
    description:
      "Rome, boutique hotel room with artistic décor and private balcony.",
    bookingType: " ( 2400 x 2000 ) ",
    status: "archived",
    isDeleted: false,
  },
  {
    id: "9",
   booking: "Rooftop Bar",
    roomSize: "800",
    roomSizeName: "sq ft",
    capacity: "50",
    extraCapacity: "10",
    rate: "15000",
    bedCharge: "0",
    personalCharges: "0",
    review: "Panoramic city skyline views",
    description: "Bangkok, open-air rooftop bar with live music and cocktails.",
    bookingType: " ( 3500 x 2800 ) ",
    status: "archived",
    isDeleted: false,
  },
  {
    id: "10",
   booking: "Coworking Space",
    roomSize: "600",
    roomSizeName: "sq ft",
    capacity: "12",
    extraCapacity: "3",
    rate: "7000",
    bedCharge: "0",
    personalCharges: "0",
    review: "Ideal for freelancers and startups",
    description:
      "San Francisco, coworking space with high-speed internet and lounge areas.",
    bookingType: " ( 3000 x 2500 ) ",
    status: "upcoming",
    isDeleted: false,
  },
  {
    id: "11",
   booking: "Private Art Gallery",
    roomSize: "900",
    roomSizeName: "sq ft",
    capacity: "40",
    extraCapacity: "5",
    rate: "12000",
    bedCharge: "0",
    personalCharges: "0",
    review: "Elegant exhibition space",
    description:
      "Berlin, private art gallery with modern lighting and climate control.",
    bookingType: " ( 2800 x 2300 ) ",
    status: "draft",
    isDeleted: false,
  },
  {
    id: "12",
   booking: "Beachfront Villa",
    roomSize: "1500",
    roomSizeName: "sq ft",
    capacity: "6",
    extraCapacity: "2",
    rate: "18000",
    bedCharge: "1000",
    personalCharges: "500",
    review: "Stunning oceanfront location",
    description:
      "Sydney, beachfront holiday villa with private pool and BBQ area.",
    bookingType: " ( 4000 x 3500 ) ",
    status: "draft",
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

export default function SectionGrid({
  searchQuery,
  setIsFilterOpen,
  isFilterOpen,
  setIsExportOpen,
  isExportOpen,
}: Props) {
  // console.log("roomSizes grid rendered");

  const navigate = useNavigate();

  const [RoomSizeData, setRoomSizeData] = useState(mockData);
  const canDelete: boolean = usePermission("rooms", "delete");
  const canRestore: boolean = usePermission("rooms", "restore");
  const canEdit: boolean = usePermission("rooms", "edit");

  // Infinite scroll states
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [, setPage] = useState(1);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const ITEMS_PER_PAGE = 4;

  // ... (keep all your existing functions: loadMoreData, handleScroll, etc.)
  // Simulate API call to load more data
  const loadMoreData = useCallback(async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 800));
    const newItems = Array.from({ length: ITEMS_PER_PAGE }, (_, index) => ({
      id: `${Date.now()}-${index}`,
     booking: `Log Books ${Date.now()}-${index}`,
      roomSize: `${Date.now()}-${index}`,
      roomSizeName: "sq ft",
      capacity: `${Date.now()}-${index}`,
      bookingType: ` ( ${Date.now()}-${index} x ${Date.now()}-${index} ) `,
      extraCapacity: `${Date.now()}-${index}`,
      rate: `${Date.now()}-${index}`,
      bedCharge: `${Date.now()}-${index}`,
      personalCharges: `${Date.now()}-${index}`,
      review: `Review ${Date.now()}-${index}`,
      description: `Description ${Date.now()}-${index}`,
      status: "active",
      isDeleted: false,
    }));

    // Stop loading more after reaching 50 items for demo
    if (RoomSizeData.length >= 46) {
      setHasMore(false);
    } else {
      setRoomSizeData((prev) => [...prev, ...newItems]);
      setPage((prev) => prev + 1);
    }

    setIsLoading(false);
  }, [RoomSizeData.length, isLoading, hasMore]);

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

  const handleDeleteClick = (roomSizeId: string) => {
    setRoomSizeData((prevRoomSize) =>
      prevRoomSize.map((roomSize) =>
        roomSize.id === roomSizeId
          ? {
              ...roomSize,
              isDeleted: roomSize.isDeleted === true ? false : true,
            }
          : roomSize
      )
    );
  };

  const handleRestoreClick = (roomSizeId: string) => {
    setRoomSizeData((prevRoomSize) =>
      prevRoomSize.map((roomSize) =>
        roomSize.id === roomSizeId
          ? {
              ...roomSize,
              isDeleted: roomSize.isDeleted === true ? false : true,
            }
          : roomSize
      )
    );
  };

  // Filter roomSizes based on search query
  const filteredRoomSize = RoomSizeData.filter((roomSize) =>
    roomSize.bookingType.toLowerCase().includes(searchQuery.toLowerCase())
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
          Total {filteredRoomSize.length} Log Books
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
            {filteredRoomSize.map((roomSizes, index) => (
              <Card
                key={index}
                className="transition-all hover:border-primary/90 hover:shadow-lg hover:translate-y-[-5px] relative group dark:bg-gray-800 p-4 duration-200"
              >
                {/* Top Row - Grid with 3 columns: Title | Icons | Flag */}
                <div className="grid grid-cols-2 items-center gap-2 mb-4">
                  {/* Left - Title */}
                  <CardTitle
                    className="text-lg font-semibold cursor-pointer hover:text-primary transition-colors truncate"
                    onClick={() => navigate(`/rooms/1`)}
                  >
                    {roomSizes.booking}
                  </CardTitle>

                  {/* Right - Flag */}
                  {/* <div className="flex justify-end">
                    <img
                      src={`https://flagcdn.com/${country.code.toLowerCase()}.svg`}
                      alt={`${country.name} flag`}
                      className="h-12 w-12 object-cover border rounded-md shadow-sm"
                      onError={(e) => {
                        (
                          e.target as HTMLImageElement
                        ).src = `https://flagcdn.com/us.svg`;
                      }}
                    />
                  </div> */}
                </div>

                {/* Bottom Row - Grid with 2 columns: Code | Currency */}
                <div className="grid grid-cols-3 items-center gap-4 pt-2 dark:border-gray-700">
                  {/* Code - Left aligned */}
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Id
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                      {roomSizes.id}
                    </div>
                  </div>

                  {/* Middle - Action Icons */}
                  <div className="flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {/* Delete/Restore */}
                    <Tooltip
                      label={
                        roomSizes.isDeleted && canRestore
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
                        disabled={roomSizes.isDeleted && !canRestore}
                        className={`cursor-pointer p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                          roomSizes.isDeleted ? "text-blue-500" : "text-red-500"
                        }`}
                        onClick={() => {
                          if (canRestore && roomSizes.isDeleted) {
                            handleRestoreClick(roomSizes.id);
                            toastRestore("Log Books restored successfully");
                          } else {
                            if (canDelete) {
                              handleDeleteClick(roomSizes.id);
                              toastDelete("Log Books deleted successfully");
                            }
                          }
                        }}
                      >
                        {roomSizes.isDeleted && canRestore ? (
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
                          onClick={() => navigate(`/log-books/edit/1`)}
                        >
                          <FontAwesomeIcon icon={faEdit} className="h-4 w-4" />
                        </div>
                      </Tooltip>
                    )}
                  </div>

                  {/* Currency - Right aligned */}
                  <div className="text-right">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Status
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                      {roomSizes.isDeleted ? "Deleted" : "Active"}
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
                <span className="text-sm">Loading more roomSize Years...</span>
              </div>
            </div>
          )}

          {/* End of data indicator */}
          {!hasMore && filteredRoomSize.length > 12 && (
            <div className="flex justify-center items-center py-8">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                No more Log Bookss to load
              </span>
            </div>
          )}
        </div>

        {/* Filter component - Right side only */}
        {isFilterOpen && (
          <div className="w-80 flex-shrink-0 border-l border-gray-200 dark:border-gray-700 pl-4">
            <div className="h-full flex flex-col">
              <GridFilterComponent
                data={mockData}
                setFilteredData={setRoomSizeData}
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
                data={mockData}
                setFilteredData={setRoomSizeData}
                setIsExportOpen={setIsExportOpen}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
