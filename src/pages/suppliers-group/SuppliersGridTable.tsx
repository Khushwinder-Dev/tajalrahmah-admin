import { Card, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Trash2,
  List,
  Import,
  Download,
  Filter,
  Mic,
  Search,
  RefreshCw,
  CheckCircle2,
  Circle,
  Pencil,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Modal, Tooltip } from "@mantine/core"; // Import Tooltip from Mantine
import { useDisclosure } from "@mantine/hooks";
import ImportStepperTemp from "@/components/common/IMportTemp";
import { toastSuccess } from "@/lib/toast";

import GridFilterComponent from "./GridFilterComponent";
import GridExportComponent from "./GridExportComponent";

type SupplierGroup = {
  id: string;
  groupName: string;
  vatNumber: string;
  country: string;
  currency: "USD" | "EUR" | "BDT" | "INR" | "GBP";
  status: "active" | "inactive" | "draft";
  isDeleted: boolean;
};

const suppliersGroups: SupplierGroup[] = [
  {
    id: "1",
    groupName: "Global Tech Solutions Group",
    vatNumber: "VAT1001",
    country: "United States",
    currency: "USD",
    status: "active",
    isDeleted: false,
  },
  {
    id: "2",
    groupName: "Dhaka Mart Group",
    vatNumber: "VAT1002",
    country: "Bangladesh",
    currency: "BDT",
    status: "active",
    isDeleted: false,
  },
  {
    id: "3",
    groupName: "Eurozone Imports Group",
    vatNumber: "VAT1003",
    country: "Germany",
    currency: "EUR",
    status: "inactive",
    isDeleted: false,
  },
  {
    id: "4",
    groupName: "Indian Bazaar Group",
    vatNumber: "VAT1004",
    country: "India",
    currency: "INR",
    status: "inactive",
    isDeleted: false,
  },
  {
    id: "5",
    groupName: "London Supplies Group",
    vatNumber: "VAT1005",
    country: "United Kingdom",
    currency: "GBP",
    status: "active",
    isDeleted: false,
  },
  {
    id: "6",
    groupName: "Tokyo Electronics Group",
    vatNumber: "VAT1006",
    country: "Japan",
    currency: "USD",
    status: "inactive",
    isDeleted: false,
  },
  {
    id: "7",
    groupName: "Canberra Construction Group",
    vatNumber: "VAT1007",
    country: "Australia",
    currency: "USD",
    status: "active",
    isDeleted: false,
  },
  {
    id: "8",
    groupName: "Paris Fashion Group",
    vatNumber: "VAT1008",
    country: "France",
    currency: "EUR",
    status: "inactive",
    isDeleted: false,
  },
  {
    id: "9",
    groupName: "Toronto Machines Group",
    vatNumber: "VAT1009",
    country: "Canada",
    currency: "USD",
    status: "inactive",
    isDeleted: false,
  },
  {
    id: "10",
    groupName: "Dubai Oil Traders Group",
    vatNumber: "VAT1010",
    country: "United Arab Emirates",
    currency: "USD",
    status: "inactive",
    isDeleted: false,
  },
];

export default function SuppliersGridTable({
  setViewMode,
}: {
  setViewMode: (viewMode: "grid" | "list") => void;
}) {
  console.log("Suppliers group grid rendered");
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [suppliersGroupsData, setSuppliersGroupsData] =
    useState(suppliersGroups);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const [modalData, setModalData] = useState({
    title: "Import Supplier Group",
    message: <ImportStepperTemp />,
  });

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
      groupName: `${(suppliersGroupsData.length + index + 1)
        .toString()
        .padStart(2, "0")} Supplier Group`,
      vatNumber: `VAT${suppliersGroupsData.length + index + 1}`,
      country: "USA",
      currency: "USD",
      status:
        Math.random() > 0.3
          ? "active"
          : Math.random() > 0.5
          ? "inactive"
          : "draft",
      isDeleted: false,
    }));

    // Stop loading more after reaching 50 items for demo
    if (suppliersGroupsData.length >= 46) {
      setHasMore(false);
    } else {
      setSuppliersGroupsData((prev) => [
        ...prev,
        ...(newItems as SupplierGroup[]),
      ]);
      setPage((prev) => prev + 1);
    }

    setIsLoading(false);
  }, [suppliersGroupsData.length, isLoading, hasMore]);

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

  const handleDeleteClick = (supplierGroupId: string) => {
    setSuppliersGroupsData((prevGroups) =>
      prevGroups.map((group) =>
        group.id === supplierGroupId
          ? {
              ...group,
              isDeleted: group.isDeleted === true ? false : true,
            }
          : group
      )
    );
  };

  const handleRestoreClick = (supplierGroupId: string) => {
    setSuppliersGroupsData((prevGroups) =>
      prevGroups.map((group) =>
        group.id === supplierGroupId
          ? {
              ...group,
              isDeleted: group.isDeleted === true ? false : true,
            }
          : group
      )
    );
  };

  const handleViewModeChange = (viewMode: "grid" | "list") => {
    setViewMode(viewMode);
  };

  const toggleStatus = (supplierGroupId: string) => {
    setSuppliersGroupsData((prevGroups) =>
      prevGroups.map((group) =>
        group.id === supplierGroupId
          ? {
              ...group,
              status: group.status === "active" ? "inactive" : "active",
            }
          : group
      )
    );
  };

  // Filter suppliers groups based on search query
  const filteredGroups = suppliersGroupsData.filter(
    (group) =>
      group.groupName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.vatNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="px-4 py-3 h-full flex flex-col bg-white dark:bg-gray-900 parent">
      {/* Fixed header controls - keep existing header */}
      <div className="sticky top-0 z-20 bg-white dark:bg-gray-900 pb-2">
        <div className="grid grid-cols-12 gap-4 items-center">
          {/* Left buttons */}
          <div className="col-span-4 flex items-center gap-2">
            <Button
              variant="outline"
              className="gap-  rounded-full min-w-[60px] sm:min-w-[80px]"
              onClick={() => handleViewModeChange("list")}
            >
              <List className="h-4 w-4" />
              <span className="hidden sm:inline">List</span>
            </Button>
            <Button
              variant="outline"
              className="gap-2 cursor-pointer rounded-full"
              onClick={() => {
                open();
                setModalData({
                  title: "Import Supplier Group",
                  message: <ImportStepperTemp />,
                });
              }}
            >
              <Import className="h-4 w-4" />
              <span className="hidden sm:inline">{t("common.import")}</span>
            </Button>
          </div>

          {/* Search */}
          <div className="col-span-4 flex justify-center">
            <div className="w-full max-w-xs mx-auto">
              <div className="relative flex items-center rounded-full">
                <Search className="absolute left-3 h-4 w-4 text-gray-400 z-10" />
                <Input
                  placeholder="Search..."
                  className="pl-9 pr-9 w-full rounded-full relative z-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Tooltip
                  arrowOffset={10}
                  arrowSize={7}
                  withArrow
                  position="top"
                  label="Search by voice"
                >
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute right-2 h-6 w-6 rounded-full cursor-pointer p-0 z-10"
                  >
                    <Mic className="h-4 w-4 text-blue-700" />
                  </Button>
                </Tooltip>
              </div>
            </div>
          </div>

          {/* Right buttons */}
          <div className="col-span-4 flex items-center justify-end gap-2">
            <Button
              variant="outline"
              className={`gap-2 rounded-full ${
                isExportOpen ? "bg-primary text-white" : ""
              }`}
              onClick={() => {
                setIsExportOpen(!isExportOpen);
                setIsFilterOpen(false);
              }}
            >
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">{t("common.export")}</span>
            </Button>

            <Button
              variant="outline"
              className={`gap-2 rounded-full ${
                isFilterOpen ? "bg-primary text-white" : ""
              }`}
              onClick={() => {
                setIsFilterOpen(!isFilterOpen);
                setIsExportOpen(false);
              }}
            >
              <Filter className="h-4 w-4" />
              <span className="hidden sm:inline">{t("common.filters")}</span>
            </Button>
          </div>
        </div>
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
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pb-4">
            {filteredGroups.map((group) => (
              <Card
                key={group.id}
                className="transition-all hover:border-primary hover:shadow-md relative group dark:bg-gray-800 p-4"
              >
                {/* Top Row - Grid with 3 columns: Title | Icons | Flag */}
                <div className="grid grid-cols-3 items-center gap-2 mb-4">
                  {/* Left - Title */}
                  <Tooltip label={group.groupName} position="top" withArrow>
                    <CardTitle
                      className="text-lg font-semibold cursor-pointer hover:text-primary transition-colors truncate"
                      onClick={() => navigate(`/suppliers-group/1`)}
                    >
                      {group.groupName}
                    </CardTitle>
                  </Tooltip>

                  {/* Middle - Action Icons */}
                  <div className="flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {/* Status Toggle */}
                    <Tooltip
                      label={
                        group.status === "active"
                          ? "CLick to Inactivate"
                          : "CLick to Activate"
                      }
                      position="top"
                      withArrow
                    >
                      <div
                        className={`cursor-pointer p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                          group.status === "active"
                            ? "text-green-500"
                            : "text-gray-400"
                        }`}
                        onClick={() => {
                          toggleStatus(group.id);
                          toastSuccess(
                            group.status === "active"
                              ? "Supplier group activated successfully"
                              : "Supplier group inactivated successfully"
                          );
                        }}
                      >
                        {group.status === "active" ? (
                          <CheckCircle2 className="h-4 w-4" />
                        ) : (
                          <Circle className="h-4 w-4" />
                        )}
                      </div>
                    </Tooltip>

                    {/* Delete/Restore */}
                    <Tooltip
                      label={group.isDeleted ? "Restore" : "Delete"}
                      position="top"
                      withArrow
                    >
                      <div
                        className={`cursor-pointer p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                          group.isDeleted ? "text-blue-500" : "text-red-500"
                        }`}
                        onClick={() => {
                          if (group.isDeleted) {
                            handleRestoreClick(group.id);
                          } else {
                            handleDeleteClick(group.id);
                          }
                          toastSuccess(
                            group.isDeleted
                              ? "Supplier group restored successfully"
                              : "Supplier group deleted successfully"
                          );
                        }}
                      >
                        {group.isDeleted ? (
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
                        onClick={() => navigate(`/suppliers-group/edit/1`)}
                      >
                        <Pencil className="h-4 w-4" />
                      </div>
                    </Tooltip>
                  </div>

                  {/* Right - Flag */}
                  <div className="flex justify-end text-end">
                    <div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        Vat Number
                      </div>
                      <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                        {group.vatNumber}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Row - Grid with 2 columns: country | Currency */}
                <div className="grid grid-cols-2 items-center gap-4 pt-2 dark:border-gray-700">
                  {/* Country - Left aligned */}
                  <div className="text-left">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Country
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                      {group.country}
                    </div>
                  </div>

                  {/* Currency - Right aligned */}
                  <div className="text-right">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Currency
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                      {group.currency}
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
                <span className="text-sm">Loading more supplier groups...</span>
              </div>
            </div>
          )}

          {/* End of data indicator */}
          {!hasMore && filteredGroups.length > 12 && (
            <div className="flex justify-center items-center py-8">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                No more supplier groups to load
              </span>
            </div>
          )}
        </div>

        {/* Filter component - Right side only */}
        {isFilterOpen && (
          <div className="w-80 flex-shrink-0 border-l border-gray-200 dark:border-gray-700 pl-4">
            <div className="h-full flex flex-col">
              <GridFilterComponent
                data={suppliersGroupsData}
                setFilteredData={setSuppliersGroupsData}
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
                data={suppliersGroupsData}
                setFilteredData={setSuppliersGroupsData}
                setIsExportOpen={setIsExportOpen}
              />
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      <Modal
        opened={opened}
        onClose={close}
        title={
          <div className="">
            <h3 className="text-lg font-semibold pl-4 ">
              Import Supplier Group
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
