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
const packingData = [
  {
    id: "1",
    sn: "001",
    documentName: "Packing List - Electronics",
    selectFile: "electronics_packing.pdf",
    status: "Active",
    date: new Date("2024-01-15"),
    loginId: "user001",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-20"),
  },
  {
    id: "2",
    sn: "002",
    documentName: "Packing List - Clothing",
    selectFile: "clothing_packing.pdf",
    status: "Inactive",
    date: new Date("2024-01-16"),
    loginId: "user002",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-16"),
    updatedAt: new Date("2024-01-21"),
  },
  {
    id: "3",
    sn: "003",
    documentName: "Packing List - Furniture",
    selectFile: "furniture_packing.pdf",
    status: "Active",
    date: new Date("2024-01-17"),
    loginId: "user003",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-17"),
    updatedAt: new Date("2024-01-22"),
  },
  {
    id: "4",
    sn: "004",
    documentName: "Packing List - Books",
    selectFile: "books_packing.pdf",
    status: "Active",
    date: new Date("2024-01-18"),
    loginId: "user004",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-18"),
    updatedAt: new Date("2024-01-23"),
  },
  {
    id: "5",
    sn: "005",
    documentName: "Packing List - Toys",
    selectFile: "toys_packing.pdf",
    status: "Inactive",
    date: new Date("2024-01-19"),
    loginId: "user005",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-19"),
    updatedAt: new Date("2024-01-24"),
  },
  {
    id: "6",
    sn: "006",
    documentName: "Packing List - Kitchen",
    selectFile: "kitchen_packing.pdf",
    status: "Active",
    date: new Date("2024-01-20"),
    loginId: "user006",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-20"),
    updatedAt: new Date("2024-01-25"),
  },
  {
    id: "7",
    sn: "007",
    documentName: "Packing List - Garden",
    selectFile: "garden_packing.pdf",
    status: "Inactive",
    date: new Date("2024-01-21"),
    loginId: "user007",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-21"),
    updatedAt: new Date("2024-01-26"),
  },
  {
    id: "8",
    sn: "008",
    documentName: "Packing List - Sports",
    selectFile: "sports_packing.pdf",
    status: "Active",
    date: new Date("2024-01-22"),
    loginId: "user008",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-22"),
    updatedAt: new Date("2024-01-27"),
  },
  {
    id: "9",
    sn: "009",
    documentName: "Packing List - Tools",
    selectFile: "tools_packing.pdf",
    status: "Active",
    date: new Date("2024-01-23"),
    loginId: "user009",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-23"),
    updatedAt: new Date("2024-01-28"),
  },
  {
    id: "10",
    sn: "010",
    documentName: "Packing List - Art",
    selectFile: "art_packing.pdf",
    status: "Inactive",
    date: new Date("2024-01-24"),
    loginId: "user010",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-24"),
    updatedAt: new Date("2024-01-29"),
  },
  {
    id: "11",
    sn: "011",
    documentName: "Packing List - Music",
    selectFile: "music_packing.pdf",
    status: "Active",
    date: new Date("2024-01-25"),
    loginId: "user011",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-25"),
    updatedAt: new Date("2024-01-30"),
  },
  {
    id: "12",
    sn: "012",
    documentName: "Packing List - Jewelry",
    selectFile: "jewelry_packing.pdf",
    status: "Active",
    date: new Date("2024-01-26"),
    loginId: "user012",
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

export default function PackingGrid({
  searchQuery,
  setIsFilterOpen,
  isFilterOpen,
  setIsExportOpen,
  isExportOpen,
}: Props) {
  console.log("Packing grid rendered");

  const navigate = useNavigate();

  const [packingDataState, setPackingDataState] = useState(packingData);
  const canDelete: boolean = usePermission("packing", "delete");
  const canRestore: boolean = usePermission("packing", "restore");
  const canEdit: boolean = usePermission("packing", "edit");

  // Debug permissions
  console.log("Packing Permissions:", {
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

    const documentNames = [
      "Packing List - Electronics",
      "Packing List - Clothing",
      "Packing List - Furniture",
      "Packing List - Books",
      "Packing List - Toys",
      "Packing List - Kitchen",
      "Packing List - Garden",
      "Packing List - Sports",
      "Packing List - Tools",
      "Packing List - Art",
      "Packing List - Music",
      "Packing List - Jewelry",
    ];
    const selectFiles = [
      "electronics_packing.pdf",
      "clothing_packing.pdf",
      "furniture_packing.pdf",
      "books_packing.pdf",
      "toys_packing.pdf",
      "kitchen_packing.pdf",
      "garden_packing.pdf",
      "sports_packing.pdf",
      "tools_packing.pdf",
      "art_packing.pdf",
      "music_packing.pdf",
      "jewelry_packing.pdf",
    ];
    const statuses = ["Active", "Inactive"];
    const loginIds = [
      "user013",
      "user014",
      "user015",
      "user016",
      "user017",
      "user018",
    ];

    const newItems = Array.from({ length: ITEMS_PER_PAGE }, (_, index) => ({
      id: `${Date.now()}-${index}`,
      sn: `${String(packingDataState.length + index + 1).padStart(3, "0")}`,
      documentName:
        documentNames[Math.floor(Math.random() * documentNames.length)],
      selectFile: selectFiles[Math.floor(Math.random() * selectFiles.length)],
      status: statuses[Math.floor(Math.random() * statuses.length)],
      date: new Date(),
      loginId: loginIds[Math.floor(Math.random() * loginIds.length)],
      isActive: Math.random() > 0.3,
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    // Stop loading more after reaching 50 items for demo
    if (packingDataState.length >= 46) {
      setHasMore(false);
    } else {
      setPackingDataState((prev) => [...prev, ...newItems]);
      setPage((prev) => prev + 1);
    }

    setIsLoading(false);
  }, [packingDataState.length, isLoading, hasMore]);

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

  const handleDeleteClick = (packingId: string) => {
    setPackingDataState((prevPackings) =>
      prevPackings.map((packing) =>
        packing.id === packingId
          ? {
              ...packing,
              isDeleted: packing.isDeleted === true ? false : true,
            }
          : packing
      )
    );
  };

  const handleRestoreClick = (packingId: string) => {
    setPackingDataState((prevPackings) =>
      prevPackings.map((packing) =>
        packing.id === packingId
          ? {
              ...packing,
              isDeleted: packing.isDeleted === true ? false : true,
            }
          : packing
      )
    );
  };

  // Filter packing records based on search query
  const filteredPacking = packingDataState.filter(
    (packing) =>
      packing.sn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      packing.documentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      packing.selectFile.toLowerCase().includes(searchQuery.toLowerCase()) ||
      packing.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
      packing.loginId.toLowerCase().includes(searchQuery.toLowerCase())
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
          Total {packingData.length} packing records
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
            {filteredPacking.map((packing, index) => (
              <Card
                key={index}
                className="transition-all hover:border-primary/90 hover:shadow-lg hover:translate-y-[-5px] relative group dark:bg-gray-800 p-4 duration-200"
              >
                {/* Top Row - Grid with 2 columns: Title | Status */}
                <div className="grid grid-cols-2 items-center gap-2 mb-4">
                  {/* Left - Title */}
                  <CardTitle
                    className="text-lg font-semibold cursor-pointer hover:text-primary transition-colors truncate"
                    onClick={() => navigate(`/packing/1`)}
                  >
                    {packing.documentName}
                  </CardTitle>

                  {/* Right - Status */}
                  <div className="flex justify-end">
                    <div
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        packing.status
                      )}`}
                    >
                      {packing.status}
                    </div>
                  </div>
                </div>

                {/* Bottom Row - Grid with 3 columns: SN | Actions | File */}
                <div className="grid grid-cols-3 items-center gap-4 pt-2 dark:border-gray-700">
                  {/* S.N */}
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 w-max">
                      S.N
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {packing.sn}
                    </div>
                  </div>

                  {/* Middle - Action Icons */}
                  <div className="flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {/* Delete/Restore */}
                    <Tooltip
                      label={
                        packing.isDeleted && canRestore
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
                        disabled={packing.isDeleted && !canRestore}
                        className={`cursor-pointer p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                          packing.isDeleted ? "text-blue-500" : "text-red-500"
                        }`}
                        onClick={() => {
                          if (canRestore && packing.isDeleted) {
                            handleRestoreClick(packing.id);
                            toastRestore(
                              "Packing record restored successfully"
                            );
                          } else {
                            if (canDelete) {
                              handleDeleteClick(packing.id);
                              toastDelete(
                                "Packing record deleted successfully"
                              );
                            }
                          }
                        }}
                      >
                        {packing.isDeleted && canRestore ? (
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
                          onClick={() => navigate(`/packing/edit/1`)}
                        >
                          <FontAwesomeIcon icon={faEdit} className="h-4 w-4" />
                        </div>
                      </Tooltip>
                    )}
                  </div>

                  {/* File Name */}
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 w-max">
                      File Name
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {packing.selectFile}
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
                <span className="text-sm">Loading more packing records...</span>
              </div>
            </div>
          )}

          {/* End of data indicator */}
          {!hasMore && filteredPacking.length > 12 && (
            <div className="flex justify-center items-center py-8">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                No more packing records to load
              </span>
            </div>
          )}
        </div>

        {/* Filter component - Right side only */}
        {isFilterOpen && (
          <div className="w-80 flex-shrink-0 border-l border-gray-200 dark:border-gray-700 pl-4">
            <div className="h-full flex flex-col">
              <GridFilterComponent
                data={packingData}
                setFilteredData={setPackingDataState}
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
                data={packingData}
                setFilteredData={setPackingDataState}
                setIsExportOpen={setIsExportOpen}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
