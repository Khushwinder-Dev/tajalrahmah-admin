/* eslint-disable @typescript-eslint/no-explicit-any */
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
const assetsData = [
  {
    id: 1,
    assetName: "Home Asset",
    description:
      "This asset represents resources and details related to the user's home.",
    status: "active",
    isDeleted: false,
  },
  {
    id: 2,
    assetName: "Canada Asset",
    description:
      "This asset represents resources and details related to Canada.",
    status: "inactive",
    isDeleted: false,
  },
  {
    id: 3,
    assetName: "United States Asset",
    description:
      "This asset represents resources and details related to the United States.",
    status: "draft",
    isDeleted: false,
  },
  {
    id: 4,
    assetName: "United Kingdom Asset",
    description:
      "This asset represents resources and details related to the United Kingdom.",
    status: "active",
    isDeleted: false,
  },
  {
    id: 5,
    assetName: "Germany Asset",
    description:
      "This asset represents resources and details related to Germany.",
    status: "active",
    isDeleted: false,
  },
  {
    id: 6,
    assetName: "France Asset",
    description:
      "This asset represents resources and details related to France.",
    status: "active",
    isDeleted: false,
  },
  {
    id: 7,
    assetName: "Australia Asset",
    description:
      "This asset represents resources and details related to Australia.",
    status: "active",
    isDeleted: false,
  },
  {
    id: 8,
    assetName: "South Africa Asset",
    description:
      "This asset represents resources and details related to South Africa.",
    status: "active",
    isDeleted: false,
  },
  {
    id: 9,
    assetName: "Brazil Asset",
    description:
      "This asset represents resources and details related to Brazil.",
    status: "active",
    isDeleted: false,
  },
  {
    id: 10,
    assetName: "Argentina Asset",
    description:
      "This asset represents resources and details related to Argentina.",
    status: "active",
    isDeleted: false,
  },
  {
    id: 11,
    assetName: "Mexico Asset",
    description:
      "This asset represents resources and details related to Mexico.",
    status: "active",
    isDeleted: false,
  },
  {
    id: 12,
    assetName: "India Asset",
    description:
      "This asset represents resources and details related to India.",
    status: "active",
    isDeleted: false,
  },
  {
    id: 13,
    assetName: "China Asset",
    description:
      "This asset represents resources and details related to China.",
    status: "active",
    isDeleted: false,
  },
  {
    id: 14,
    assetName: "Japan Asset",
    description:
      "This asset represents resources and details related to Japan.",
    status: "active",
    isDeleted: false,
  },
  {
    id: 15,
    assetName: "Russia Asset",
    description:
      "This asset represents resources and details related to Russia.",
    status: "active",
    isDeleted: false,
  },
  {
    id: 16,
    assetName: "South Korea Asset",
    description:
      "This asset represents resources and details related to South Korea.",
    status: "active",
    isDeleted: false,
  },
  {
    id: 17,
    assetName: "Turkey Asset",
    description:
      "This asset represents resources and details related to Turkey.",
    status: "active",
    isDeleted: false,
  },
  {
    id: 18,
    assetName: "Saudi Arabia Asset",
    description:
      "This asset represents resources and details related to Saudi Arabia.",
    status: "active",
    isDeleted: false,
  },
  {
    id: 19,
    assetName: "Egypt Asset",
    description:
      "This asset represents resources and details related to Egypt.",
    status: "active",
    isDeleted: false,
  },
  {
    id: 20,
    assetName: "Nigeria Asset",
    description:
      "This asset represents resources and details related to Nigeria.",
    status: "active",
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

export default function AssetsGrid({
  searchQuery,
  setIsFilterOpen,
  isFilterOpen,
  setIsExportOpen,
  isExportOpen,
}: Props) {
  console.log("Countries grid rendered");

  const navigate = useNavigate();

  const [assets, setAssets] = useState(assetsData);
  const canDelete: boolean = usePermission("countries", "delete");
  const canRestore: boolean = usePermission("countries", "restore");
  const canEdit: boolean = usePermission("countries", "edit");

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
      assetName: `Asset ${assets.length + index + 1}`,
      description: `This is a mock asset item number ${
        assets.length + index + 1
      }.`,
      status: ["active", "inactive", "draft"][Math.floor(Math.random() * 3)],
      isDeleted: false,
    }));

    if (assets.length >= 50) {
      setHasMore(false);
    } else {
      setAssets((prev: any) => [...prev, ...newItems]);
      setPage((prev: any) => prev + 1);
    }

    setIsLoading(false);
  }, [assets.length, isLoading, hasMore]);

  const handleScroll = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const { scrollTop, scrollHeight, clientHeight } = container;
    const threshold = 100;

    if (scrollHeight - scrollTop <= clientHeight + threshold) {
      loadMoreData();
    }
  }, [loadMoreData]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const handleDeleteClick = (id: number | string) => {
    setAssets((prevAssets) =>
      prevAssets.map((asset) =>
        asset.id === id ? { ...asset, isDeleted: !asset.isDeleted } : asset
      )
    );
  };

  const handleRestoreClick = (id: number | string) => {
    setAssets((prevAssets) =>
      prevAssets.map((asset) =>
        asset.id === id ? { ...asset, isDeleted: false } : asset
      )
    );
  };

  const filteredAssets = assets.filter((asset) =>
    asset.assetName.toLowerCase().includes(searchQuery.toLowerCase())
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
          Total {filteredAssets?.length} assets
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
            {filteredAssets.map((asset, index) => (
              <Card
                key={index}
                className="transition-all hover:border-primary/90 hover:shadow-lg hover:translate-y-[-5px] relative group dark:bg-gray-800 p-4 duration-200"
              >
                {/* Top Row - Grid with 3 columns: Title | Icons | Flag */}
                <div className="grid grid-cols-2 items-center gap-2 mb-4">
                  {/* Left - Title */}
                  <CardTitle
                    className="text-lg font-semibold cursor-pointer hover:text-primary transition-colors truncate"
                    onClick={() => navigate(`/countries/1`)}
                  >
                    {asset.assetName}
                  </CardTitle>
                </div>

                {/* Bottom Row - Grid with 2 columns: Code | Currency */}
                <div className="grid grid-cols-3 items-center gap-4 pt-2 dark:border-gray-700">
                  {/* Code - Left aligned */}
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Code
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                      {asset.id}
                    </div>
                  </div>

                  {/* Middle - Action Icons */}
                  <div className="flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {/* Delete/Restore */}
                    <Tooltip
                      label={
                        asset.isDeleted && canRestore
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
                        disabled={asset.isDeleted && !canRestore}
                        className={`cursor-pointer p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                          asset.isDeleted ? "text-blue-500" : "text-red-500"
                        }`}
                        onClick={() => {
                          if (canRestore && asset.isDeleted) {
                            handleRestoreClick(asset.id);
                            toastRestore("Asset restored successfully");
                          } else {
                            if (canDelete) {
                              handleDeleteClick(asset.id);
                              toastDelete("Asset deleted successfully");
                            }
                          }
                        }}
                      >
                        {asset.isDeleted && canRestore ? (
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
                          onClick={() => navigate(`/assets-category/edit/1`)}
                        >
                          <FontAwesomeIcon icon={faEdit} className="h-4 w-4" />
                        </div>
                      </Tooltip>
                    )}
                  </div>

                  {/* Right - stats section */}
                  <div className="flex justify-end">
                    <div
                      className={cn(
                        "inline-block rounded-full px-3 py-1 text-xs font-semibold capitalize",
                        {
                          "bg-green-100 text-green-800":
                            asset.status === "active",
                          "bg-yellow-100 text-yellow-800":
                            asset.status === "draft",
                          "bg-red-100 text-red-800":
                            asset.status === "inactive",
                          "bg-gray-200 text-gray-800": ![
                            "active",
                            "draft",
                            "inactive",
                          ].includes(asset.status),
                        }
                      )}
                    >
                      {asset.status}
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
                <span className="text-sm">Loading more countries...</span>
              </div>
            </div>
          )}

          {/* End of data indicator */}
          {!hasMore && filteredAssets.length > 12 && (
            <div className="flex justify-center items-center py-8">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                No more countries to load
              </span>
            </div>
          )}
        </div>

        {/* Filter component - Right side only */}
        {isFilterOpen && (
          <div className="w-80 flex-shrink-0 border-l border-gray-200 dark:border-gray-700 pl-4">
            <div className="h-full flex flex-col">
              <GridFilterComponent
                data={assets}
                setFilteredData={setAssets}
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
                data={assets}
                setFilteredData={setAssets}
                setIsExportOpen={setIsExportOpen}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
