import { Card, CardTitle } from "@/components/ui/card";
import { Trash2, RefreshCw, CheckCircle2, Circle, Pencil } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Modal, Tooltip } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import ImportStepperTemp from "@/components/common/IMportTemp";
import { toastSuccess } from "@/lib/toast";
import { cn } from "@/lib/utils";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import useIsMobile from "@/hooks/useIsMobile";

import GridFilterComponent from "@/pages/Country/GridFilterComponent";

interface GridCardDataType {
  documentNumber: string;
  purchaseInvoiceNumber: string;
  poNumber: string;
  poDate: string;
  supplierName: string;
  paymentType: string;
  dueDays: number;
  paymentDate: string;
  supplierNumber: string;
  supplierStatus: string;
  supplierGroup: string;
  remarks: string;
  country: string;
  state: string;
  city: string;
  id: string;
  status: "active" | "inactive" | "draft";
  isDeleted: boolean;
}

const gridCardData: GridCardDataType[] = [
  {
    documentNumber: "PR-2001",
    purchaseInvoiceNumber: "INV-7001",
    poNumber: "PO-8001",
    poDate: "2025-06-10",
    supplierName: "Global Traders Ltd.",
    paymentType: "Credit",
    dueDays: 30,
    paymentDate: "2025-07-10",
    supplierNumber: "SUP-101",
    supplierStatus: "Verified",
    supplierGroup: "Local",
    remarks: "Returned damaged boxes",
    country: "Bangladesh",
    state: "Dhaka",
    city: "Dhaka",

    id: "PR-2001",
    status: "active",
    isDeleted: false,
  },
  {
    documentNumber: "PR-2002",
    purchaseInvoiceNumber: "INV-7002",
    poNumber: "PO-8002",
    poDate: "2025-06-12",
    supplierName: "Sunshine Imports",
    paymentType: "Cash",
    dueDays: 0,
    paymentDate: "2025-06-12",
    supplierNumber: "SUP-102",
    supplierStatus: "Active",
    supplierGroup: "International",
    remarks: "Over shipment",
    country: "India",
    state: "West Bengal",
    city: "Kolkata",
    id: "PR-2002",
    status: "inactive",
    isDeleted: false,
  },
  {
    documentNumber: "PR-2003",
    purchaseInvoiceNumber: "INV-7003",
    poNumber: "PO-8003",
    poDate: "2025-06-14",
    supplierName: "Oceanic Supplies",
    paymentType: "Bank Transfer",
    dueDays: 15,
    paymentDate: "2025-06-29",
    supplierNumber: "SUP-103",
    supplierStatus: "Pending",
    supplierGroup: "International",
    remarks: "Item not matching spec",
    country: "China",
    state: "Guangdong",
    city: "Shenzhen",
    id: "PR-2003",
    status: "draft",
    isDeleted: false,
  },
  {
    documentNumber: "PR-2004",
    purchaseInvoiceNumber: "INV-7004",
    poNumber: "PO-8004",
    poDate: "2025-06-15",
    supplierName: "Delta Distributors",
    paymentType: "Credit",
    dueDays: 20,
    paymentDate: "2025-07-05",
    supplierNumber: "SUP-104",
    supplierStatus: "Active",
    supplierGroup: "Local",
    remarks: "Short quantity delivered",
    country: "Bangladesh",
    state: "Chattogram",
    city: "Chattogram",
    id: "PR-2004",
    status: "active",
    isDeleted: false,
  },
  {
    documentNumber: "PR-2005",
    purchaseInvoiceNumber: "INV-7005",
    poNumber: "PO-8005",
    poDate: "2025-06-17",
    supplierName: "Brightway Exports",
    paymentType: "Cash",
    dueDays: 0,
    paymentDate: "2025-06-17",
    supplierNumber: "SUP-105",
    supplierStatus: "Verified",
    supplierGroup: "International",
    remarks: "Rejected due to wrong model",
    country: "Thailand",
    state: "Bangkok",
    city: "Bangkok",
    id: "PR-2005",
    status: "inactive",
    isDeleted: false,
  },
  {
    documentNumber: "PR-2006",
    purchaseInvoiceNumber: "INV-7006",
    poNumber: "PO-8006",
    poDate: "2025-06-18",
    supplierName: "Green Fields Co.",
    paymentType: "Credit",
    dueDays: 10,
    paymentDate: "2025-06-28",
    supplierNumber: "SUP-106",
    supplierStatus: "Active",
    supplierGroup: "Local",
    remarks: "Product expired",
    country: "Bangladesh",
    state: "Rajshahi",
    city: "Rajshahi",
    id: "PR-2006",
    status: "draft",
    isDeleted: true,
  },
  {
    documentNumber: "PR-2007",
    purchaseInvoiceNumber: "INV-7007",
    poNumber: "PO-8007",
    poDate: "2025-06-19",
    supplierName: "Techzone BD",
    paymentType: "Bank Transfer",
    dueDays: 25,
    paymentDate: "2025-07-14",
    supplierNumber: "SUP-107",
    supplierStatus: "Verified",
    supplierGroup: "Local",
    remarks: "Excess items returned",
    country: "Bangladesh",
    state: "Sylhet",
    city: "Sylhet",
    id: "PR-2007",
    status: "active",
    isDeleted: false,
  },
  {
    documentNumber: "PR-2008",
    purchaseInvoiceNumber: "INV-7008",
    poNumber: "PO-8008",
    poDate: "2025-06-20",
    supplierName: "NovaTech Supplies",
    paymentType: "Credit",
    dueDays: 5,
    paymentDate: "2025-06-25",
    supplierNumber: "SUP-108",
    supplierStatus: "Pending",
    supplierGroup: "International",
    remarks: "Packaging issues",
    country: "Malaysia",
    state: "Selangor",
    city: "Shah Alam",
    id: "PR-2008",
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
  setViewMode: (viewMode: "grid" | "list") => void;
};

export default function PurchaseReturnsGrid({
  searchQuery,
  setIsFilterOpen,
  isFilterOpen,
  setIsExportOpen,
  isExportOpen,
}: Props) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isRTL } = useSelector((state: RootState) => state.language);
  const isMobile = useIsMobile();

  const [gridData, setGridData] = useState(gridCardData);
  const [opened, { close }] = useDisclosure(false);
  const [modalData] = useState({
    title: "Import purchase returns",
    message: <ImportStepperTemp opened={opened} onClose={close} />,
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
      id: `${Date.now()}-${index}`,
      documentNumber: `PR-${gridData.length + index + 1}`,
      purchaseInvoiceNumber: `INV-${gridData.length + index + 1}`,
      poNumber: `PO-${gridData.length + index + 1}`,
      poDate: `2025-06-15`,
      supplierName: `Supplier Name#${gridData.length + index + 1}`,
      paymentType: `Payment Type#${gridData.length + index + 1}`,
      dueDays: 30,
      paymentDate: `2025-07-15`,
      supplierNumber: `SUP-${gridData.length + index + 1}`,
      supplierStatus: `Supplier Status#${gridData.length + index + 1}`,
      supplierGroup: `Supplier Group#${gridData.length + index + 1}`,
      remarks: `Remarks${gridData.length + index + 1}`,
      country: `Country#${gridData.length + index + 1}`,
      state: `State#${gridData.length + index + 1}`,
      city: `City#${gridData.length + index + 1}`,
      status:
        Math.random() > 0.3
          ? "active"
          : Math.random() > 0.5
          ? "inactive"
          : "draft",
      isDeleted: false,
    }));

    // Stop loading more after reaching 50 items for demo
    if (gridData.length >= 46) {
      setHasMore(false);
    } else {
      setGridData((prev) => [...prev, ...(newItems as GridCardDataType[])]);
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

  const toggleStatus = (id: string) => {
    setGridData((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status: item.status === "active" ? "inactive" : "active",
            }
          : item
      )
    );
  };

  // Filter purchase returns based on search query
  const filteredGridData = gridData.filter(
    (item) =>
      item.documentNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.purchaseInvoiceNumber
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      item.poNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.poDate.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.supplierName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.paymentType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.dueDays.toString().includes(searchQuery.toLowerCase()) ||
      item.paymentDate.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.supplierNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.supplierStatus.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.supplierGroup.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.remarks.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEditClick = (id: string) => {
    const viewMode = searchParams.get("view") || "grid";
    navigate(`/purchase-returns/edit/${id}?fromView=${viewMode}`);
  };

  const handleViewClick = (id: string) => {
    const viewMode = searchParams.get("view") || "grid";
    navigate(`/purchase-returns/view/${id}?fromView=${viewMode}`);
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
              isMobile
                ? "grid-cols-1"
                : "grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
            )}
          >
            {filteredGridData.map((item) => (
              <Card
                key={item.id}
                className={cn(
                  "transition-all relative group dark:bg-gray-800 duration-200 w-full shadow-[2px_3px_8px_0_rgba(0,0,0,0.10)] border-[#E2E4EB] border border-solid rounded-[12px] flex p-5 flex-col items-start gap-5 cursor-pointer",
                  isMobile
                    ? "hover:shadow-lg hover:border-primary"
                    : "hover:scale-110 hover:z-50 hover:relative hover:border-primary min-w-[250px]"
                )}
                onClick={() => handleViewClick(item.id)}
              >
                {/* Top Row - Document Number and Due Days */}
                <div className="grid grid-cols-2 items-center gap-2 w-full mt-[-8px]">
                  {/* Left - Document Number */}
                  <CardTitle
                    className="text-base font-normal transition-colors truncate"
                    style={{ fontSize: "18px" }}
                  >
                    {item.documentNumber}
                  </CardTitle>

                  {/* Right - Due Days */}
                  <div className="flex justify-end">
                    <div className="text-right">
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        Due Days
                      </div>
                      <div className="text-sm font-normal text-gray-900 dark:text-gray-100">
                        {item.dueDays}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Middle Row - Purchase Invoice Number and PO Date */}
                <div className="grid grid-cols-2 gap-2 w-full">
                  {/* Purchase Invoice Number - Left */}
                  <div className="min-w-0">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Invoice Number
                    </div>
                    <div className="text-sm font-normal text-gray-900 dark:text-gray-100 truncate">
                      {item.purchaseInvoiceNumber}
                    </div>
                  </div>

                  {/* PO Date - Right */}
                  <div className="text-right min-w-0">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      PO Date
                    </div>
                    <div className="text-sm font-normal text-gray-900 dark:text-gray-100 truncate">
                      {item.poDate}
                    </div>
                  </div>
                </div>

                {/* Bottom Row - Supplier Name and Action Icons */}
                <div className="grid grid-cols-2 items-center justify-between gap-2 w-full dark:border-gray-700 border-t pt-4">
                  {/* Supplier Name - Left aligned */}
                  <div className="min-w-0">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Supplier
                    </div>
                    <div className="text-sm font-normal text-gray-900 dark:text-gray-100 truncate">
                      {item.supplierName}
                    </div>
                  </div>

                  {/* Right - Action Icons */}
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {/* Status Toggle */}
                    <Tooltip
                      label={
                        item.status === "active"
                          ? "Click to Inactivate"
                          : "Click to Activate"
                      }
                      position="top"
                      withArrow
                    >
                      <div
                        className={`cursor-pointer p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                          item.status === "active"
                            ? "text-green-500"
                            : "text-gray-400"
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleStatus(item.id);
                          toastSuccess(
                            item.status === "active"
                              ? "Purchase Return inactivated successfully"
                              : "Purchase Return activated successfully"
                          );
                        }}
                      >
                        {item.status === "active" ? (
                          <CheckCircle2 className="h-4 w-4" />
                        ) : (
                          <Circle className="h-4 w-4" />
                        )}
                      </div>
                    </Tooltip>

                    {/* Delete/Restore */}
                    <Tooltip
                      label={item.isDeleted ? "Restore" : "Delete"}
                      position="top"
                      withArrow
                    >
                      <div
                        className={`cursor-pointer p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                          item.isDeleted ? "text-blue-500" : "text-red-500"
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (item.isDeleted) {
                            handleRestoreClick(item.id);
                          } else {
                            handleDeleteClick(item.id);
                          }
                          toastSuccess(
                            item.isDeleted
                              ? "Purchase Return restored successfully"
                              : "Purchase Return deleted successfully"
                          );
                        }}
                      >
                        {item.isDeleted ? (
                          <RefreshCw className="h-4 w-4" />
                        ) : (
                          <Trash2 className="h-4 w-4" />
                        )}
                      </div>
                    </Tooltip>

                    {/* Edit */}
                    <Tooltip label="Edit" position="top" withArrow>
                      <div
                        className="cursor-pointer p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-blue-500"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditClick(item.id);
                        }}
                      >
                        <Pencil className="h-4 w-4" />
                      </div>
                    </Tooltip>
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
                  Loading more purchase returns...
                </span>
              </div>
            </div>
          )}

          {/* End of data indicator */}
          {!hasMore && filteredGridData.length > 12 && (
            <div className="flex justify-center items-center py-8">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                No more purchase returns to load
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
            width: isMobile ? "100%" : "320px",
          }}
        >
          <div className={cn("h-full", isMobile ? "pb-4 mt-1" : "p-2")}>
            <div
              className={cn(
                "w-full flex-shrink-0 border rounded-[20px] border-gray-200 dark:border-gray-700 h-full bg-white dark:bg-gray-800 shadow-2xl transition-all duration-300 ease-in-out",
                isFilterOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
              )}
            >
              <GridFilterComponent
                key={`filter-panel-${isFilterOpen}`}
                data={gridData}
                setFilteredData={setGridData}
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
            width: isMobile ? "100%" : "320px",
          }}
        >
          <div className={cn("h-full", isMobile ? "pb-4 mt-1" : "p-2")}>
            <div
              className={cn(
                "w-full flex-shrink-0 border rounded-[20px] border-gray-200 dark:border-gray-700 h-full bg-white dark:bg-gray-800 shadow-2xl transition-all duration-300 ease-in-out",
                isExportOpen ? "opacity-100" : "opacity-0"
              )}
            >
              <GridFilterComponent
                key={`export-panel-${isExportOpen}`}
                data={gridData}
                setFilteredData={setGridData}
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
              isMobile ? "" : "md:hidden",
              isFilterOpen || isExportOpen ? "opacity-100" : "opacity-0"
            )}
            onClick={() => {
              setIsFilterOpen(false);
              setIsExportOpen(false);
            }}
          />
        )}
      </div>

      {/* Modal */}
      <Modal
        opened={opened}
        onClose={close}
        title={
          <div className="">
            <h3 className="text-lg font-semibold pl-4">
              Import Purchase Returns
            </h3>
          </div>
        }
        size="xl"
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
        style={{ zIndex: 9999 }}
        className="z-[9999]"
        centered
      >
        <div className="pt-5 pb-14 px-5">{modalData.message}</div>
      </Modal>
    </div>
  );
}
