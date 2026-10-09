import { Card, CardTitle } from "@/components/ui/card";
import { ArrowRightLeft, ArrowRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import GridFilterComponent from "@/pages/Country/GridFilterComponent";
import useIsMobile from "@/hooks/useIsMobile";
// import { useTranslation } from "react-i18next";

// Define StockTransfer interface
interface StockTransfer {
  id: string;
  documentNumber: string;
  sourceBranch: string;
  destinationBranch: string;
  documentDate: Date;
  remarks: string;
  amount: number;
  isActive: boolean;
  isDraft: boolean;
  createdAt: Date | null;
  draftedAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;
  isDeleted: boolean;
}

// Mock data for stock transfers
const stockTransfers: StockTransfer[] = [
  {
    id: "1",
    documentNumber: "ST001",
    sourceBranch: "Main Branch",
    destinationBranch: "North Branch",
    documentDate: new Date("2024-01-15"),
    remarks: "Initial inventory setup",
    amount: 15000.5,
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
    documentNumber: "ST002",
    sourceBranch: "North Branch",
    destinationBranch: "South Branch",
    documentDate: new Date("2024-01-16"),
    remarks: "Quarterly stock adjustment",
    amount: 8750.25,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2024-01-16"),
    draftedAt: null,
    updatedAt: new Date("2024-01-21"),
    deletedAt: null,
    isDeleted: false,
  },
  // ... (rest of your existing mock data - just change documentNumber prefix to ST)
];

type Props = {
  searchQuery: string;
  setIsFilterOpen: (isFilterOpen: boolean) => void;
  isFilterOpen: boolean;
  setIsExportOpen: (isExportOpen: boolean) => void;
  isExportOpen: boolean;
};

export default function StockTransferGrid({
  searchQuery,
  setIsFilterOpen,
  isFilterOpen,
  setIsExportOpen,
  isExportOpen,
}: Props) {
  console.log("Stock Transfer grid rendered");

  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { isRTL } = useSelector((state: RootState) => state.language);
  const isMobile = useIsMobile();
  // const { t } = useTranslation();

  const [transferData, setTransferData] = useState(stockTransfers);

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

    const branches = [
      "Main Branch",
      "North Branch",
      "South Branch",
      "East Branch",
      "West Branch",
      "Central Branch",
      "Downtown Branch",
      "Suburban Branch",
    ];

    const remarks = [
      "Monthly inventory transfer",
      "Quarterly stock redistribution",
      "Stock rebalancing",
      "New location stock setup",
      "Seasonal inventory movement",
      "Year-end stock redistribution",
      "Emergency stock transfer",
    ];

    const newItems = Array.from({ length: ITEMS_PER_PAGE }, (_, index) => {
      const sourceBranch =
        branches[Math.floor(Math.random() * branches.length)];
      const availableDestinations = branches.filter((b) => b !== sourceBranch);
      const destinationBranch =
        availableDestinations[
          Math.floor(Math.random() * availableDestinations.length)
        ];
      const randomRemarks = remarks[Math.floor(Math.random() * remarks.length)];

      return {
        id: `${Date.now()}-${index}`,
        documentNumber: `ST${(transferData.length + index + 1)
          .toString()
          .padStart(3, "0")}`,
        sourceBranch,
        destinationBranch,
        documentDate: new Date(),
        remarks: randomRemarks,
        amount: Math.floor(Math.random() * 25000) + 1000 + Math.random(),
        isActive: Math.random() > 0.3,
        isDraft: Math.random() > 0.7,
        createdAt: new Date(),
        draftedAt: Math.random() > 0.7 ? new Date() : null,
        updatedAt: new Date(),
        deletedAt: null,
        isDeleted: false,
      };
    });

    // Stop loading more after reaching 50 items for demo
    if (transferData.length >= 46) {
      setHasMore(false);
    } else {
      setTransferData((prev) => [...prev, ...newItems]);
      setPage((prev) => prev + 1);
    }

    setIsLoading(false);
  }, [transferData.length, isLoading, hasMore]);

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

  // Filter transfers based on search query
  const filteredTransfers = transferData.filter(
    (transfer) =>
      transfer.documentNumber
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      transfer.sourceBranch.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transfer.destinationBranch
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      transfer.remarks.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transfer.amount.toString().includes(searchQuery.toLowerCase())
  );

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const handleViewClick = (transferId: string) => {
    const viewMode = searchParams.get("view") || "grid";
    navigate(`${location.pathname}/view/${transferId}?fromView=${viewMode}`);
  };

  return (
    <div
      className={cn(
        "h-full flex flex-col bg-white dark:bg-gray-900 parent relative rounded-lg overflow-hidden"
      )}
    >
      {/* Main content area */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Cards container with animated width */}
        <div
          ref={scrollContainerRef}
          className={cn(
            "overflow-y-auto grid-scroll transition-all duration-300 ease-in-out",
            isRTL ? "" : ""
          )}
          style={{
            width: isFilterOpen || isExportOpen ? "calc(100% - 320px)" : "100%",
          }}
        >
          <div
            className={cn(
              "grid gap-6 pb-4 p-5",
              // Mobile: 1 column, Tablet: 2 columns, Desktop: 3-4 columns
              isMobile
                ? "grid-cols-1"
                : "grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
            )}
          >
            {filteredTransfers.map((transfer, index) => (
              <Card
                key={index}
                className={cn(
                  "transition-all relative group dark:bg-gray-800 duration-200 w-full shadow-[2px_3px_8px_0_rgba(0,0,0,0.10)] border-[#E2E4EB] border border-solid rounded-[12px] flex p-5 flex-col items-start gap-5 cursor-pointer",
                  // Different hover effects for mobile vs desktop
                  isMobile
                    ? "hover:shadow-lg hover:border-primary"
                    : "hover:scale-110 hover:z-50 hover:relative hover:border-primary min-w-[250px]"
                )}
                onClick={() => handleViewClick(transfer.id)}
              >
                {/* Top Row - Transfer Icon and Document Number */}
                <div className="grid grid-cols-2 items-center gap-2 w-full mt-[-8px]">
                  {/* Left - Document Number */}
                  <CardTitle
                    className="text-base font-normal transition-colors truncate"
                    style={{ fontSize: "18px" }}
                  >
                    {transfer.documentNumber}
                  </CardTitle>

                  {/* Right - Transfer Icon */}
                  <div className="flex justify-end">
                    <div className="h-12 w-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white shadow-md">
                      <ArrowRightLeft className="h-6 w-6" />
                    </div>
                  </div>
                </div>

                {/* Middle Row - Transfer Route (From -> To) */}
                <div className="w-full">
                  <div className="flex items-center gap-2">
                    {/* Source Branch */}
                    <div className="flex-1 min-w-0">
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        From
                      </div>
                      <div className="text-sm font-normal text-gray-900 dark:text-gray-100 truncate">
                        {transfer.sourceBranch}
                      </div>
                    </div>

                    {/* Arrow */}
                    <div className="flex-shrink-0 px-1">
                      <ArrowRight className="h-4 w-4 text-primary" />
                    </div>

                    {/* Destination Branch */}
                    <div className="flex-1 min-w-0">
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        To
                      </div>
                      <div className="text-sm font-normal text-gray-900 dark:text-gray-100 truncate">
                        {transfer.destinationBranch}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Row - Date and Status */}
                <div className="grid grid-cols-2 items-center justify-between gap-2 w-full dark:border-gray-700">
                  {/* Transfer Date - Left aligned */}
                  <div className="min-w-0">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Date
                    </div>
                    <div className="text-sm font-normal text-gray-900 dark:text-gray-100 truncate">
                      {transfer.documentDate.toLocaleDateString()}
                    </div>
                  </div>

                  {/* Status - Right */}
                  <div className="text-right min-w-0">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Status
                    </div>
                    <div className="text-sm font-normal text-gray-900 dark:text-gray-100 truncate">
                      <span
                        className={cn(
                          "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium",
                          transfer.isActive &&
                            !transfer.isDraft &&
                            "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
                          transfer.isDraft &&
                            "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
                          !transfer.isActive &&
                            !transfer.isDraft &&
                            "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
                        )}
                      >
                        {transfer.isDraft
                          ? "Draft"
                          : transfer.isActive
                          ? "Active"
                          : "Inactive"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Amount section */}
                <div className="w-full pt-2 border-t dark:border-gray-700">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        Amount
                      </div>
                      <div className="text-sm font-normal text-gray-900 dark:text-gray-100">
                        {formatCurrency(transfer.amount)}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        Remarks
                      </div>
                      <div className="text-sm text-gray-700 dark:text-gray-300 truncate">
                        {transfer.remarks}
                      </div>
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
          {!hasMore && filteredTransfers.length > 12 && (
            <div className="flex justify-center items-center py-8">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                No more transfers to load
              </span>
            </div>
          )}
        </div>

        {/* Animated Filter Panel */}
        <div
          className={cn(
            "absolute top-0 h-full transition-all duration-300 ease-in-out transform z-10",
            isRTL ? "left-0" : "right-0",
            isFilterOpen
              ? "translate-x-0 opacity-100 visible"
              : isRTL
              ? "-translate-x-full opacity-0 invisible"
              : "translate-x-full opacity-0 invisible"
          )}
          style={{
            width: isMobile ? "100%" : "320px", // Full width on mobile
          }}
        >
          <div
            className={cn(
              "h-full",
              isMobile ? "pb-4 mt-1" : "p-2" // Less padding on mobile
            )}
          >
            <div
              className={cn(
                "w-full flex-shrink-0 border rounded-[20px] border-gray-200 dark:border-gray-700 h-full bg-white dark:bg-gray-800 shadow-2xl transition-all duration-300 ease-in-out",
                isFilterOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
              )}
            >
              <GridFilterComponent
                key={`filter-panel-${isFilterOpen}`}
                data={stockTransfers}
                setFilteredData={setTransferData}
                setShowTabs={setIsFilterOpen}
                defaultTab="filter"
              />
            </div>
          </div>
        </div>

        {/* Animated Export Panel */}
        <div
          className={cn(
            "absolute top-0 h-full transition-all duration-300 ease-in-out transform z-10",
            isRTL ? "left-0" : "right-0",
            isExportOpen
              ? "translate-x-0 opacity-100"
              : isRTL
              ? "-translate-x-full opacity-0"
              : "translate-x-full opacity-0"
          )}
          style={{
            width: isMobile ? "100%" : "320px", // Full width on mobile
          }}
        >
          <div
            className={cn(
              "h-full",
              isMobile ? "pb-4 mt-1" : "p-2" // Less padding on mobile
            )}
          >
            <div
              className={cn(
                "w-full flex-shrink-0 border rounded-[20px] border-gray-200 dark:border-gray-700 h-full bg-white dark:bg-gray-800 shadow-2xl transition-all duration-300 ease-in-out",
                isExportOpen ? "opacity-100" : "opacity-0"
              )}
            >
              <GridFilterComponent
                key={`export-panel-${isExportOpen}`}
                data={stockTransfers}
                setFilteredData={setTransferData}
                setShowTabs={setIsExportOpen}
                defaultTab="export"
              />
            </div>
          </div>
        </div>

        {/* Backdrop overlay for mobile/smaller screens */}
        {(isFilterOpen || isExportOpen) && (
          <div
            className={cn(
              "fixed inset-0 bg-black bg-opacity-30 transition-opacity duration-300 ease-in-out z-5",
              isMobile ? "" : "md:hidden", // Always show overlay on mobile
              isFilterOpen || isExportOpen ? "opacity-100" : "opacity-0"
            )}
            onClick={() => {
              setIsFilterOpen(false);
              setIsExportOpen(false);
            }}
          />
        )}
      </div>
    </div>
  );
}
