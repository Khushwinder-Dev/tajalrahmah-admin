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

type TableAssignsType = {
  waiterName: string;
  tableNo: string;
  description: string;
  photo: string;

  // these will be same for every component
  id: string;
  status: "active" | "inactive" | "draft";
  isDeleted: boolean;
};

const mockTableAssignments: TableAssignsType[] = [
  {
    id: "ta1",
    waiterName: "Rahim Uddin",
    tableNo: "T01",
    description: "Main hall corner table near window.",
    photo: "/customer-dummy-image.jpg",
    status: "active",
    isDeleted: false,
  },
  {
    id: "ta2",
    waiterName: "Karim Mia",
    tableNo: "T02",
    description: "Next to kitchen entrance.",
    photo: "/customer-dummy-image.jpg",
    status: "inactive",
    isDeleted: false,
  },
  {
    id: "ta3",
    waiterName: "Salma Akter",
    tableNo: "T03",
    description: "Family table with 6 seats.",
    photo: "/customer-dummy-image.jpg",
    status: "draft",
    isDeleted: false,
  },
  {
    id: "ta4",
    waiterName: "Nayeem Hasan",
    tableNo: "T04",
    description: "VIP table near stage.",
    photo: "/customer-dummy-image.jpg",
    status: "active",
    isDeleted: false,
  },
  {
    id: "ta5",
    waiterName: "Jhumur Begum",
    tableNo: "T05",
    description: "Next to bar counter.",
    photo: "/customer-dummy-image.jpg",
    status: "inactive",
    isDeleted: true,
  },
  {
    id: "ta6",
    waiterName: "Shamim Reza",
    tableNo: "T06",
    description: "Outdoor seating under umbrella.",
    photo: "/customer-dummy-image.jpg",
    status: "active",
    isDeleted: false,
  },
  {
    id: "ta7",
    waiterName: "Anika Sultana",
    tableNo: "T07",
    description: "Private booth with 4 seats.",
    photo: "/customer-dummy-image.jpg",
    status: "draft",
    isDeleted: true,
  },
  {
    id: "ta8",
    waiterName: "Imran Hossain",
    tableNo: "T08",
    description: "Middle of main hall.",
    photo: "/customer-dummy-image.jpg",
    status: "active",
    isDeleted: false,
  },
];

export default function TableAssignsGridTable({
  setViewMode,
}: {
  setViewMode: (viewMode: "grid" | "list") => void;
}) {
  console.log("Waiters grid rendered");
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [tableAssignsData, setTableAssignsData] =
    useState(mockTableAssignments);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const [modalData, setModalData] = useState({
    title: "Import Waiter",
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
      waiterName: `Waiter${tableAssignsData.length + index + 1}`,
      tableNo: `Table${tableAssignsData.length + index + 1}`,
      description: `Description${tableAssignsData.length + index + 1}`,
      photo: `/customer-dummy-image.jpg`,
      status:
        Math.random() > 0.3
          ? "active"
          : Math.random() > 0.5
          ? "inactive"
          : "draft",
      isDeleted: false,
    }));

    // Stop loading more after reaching 50 items for demo
    if (tableAssignsData.length >= 46) {
      setHasMore(false);
    } else {
      setTableAssignsData((prev) => [
        ...prev,
        ...(newItems as TableAssignsType[]),
      ]);
      setPage((prev) => prev + 1);
    }

    setIsLoading(false);
  }, [tableAssignsData.length, isLoading, hasMore]);

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
    setTableAssignsData((prev) =>
      prev.map((tableAssign) =>
        tableAssign.id === id
          ? {
              ...tableAssign,
              isDeleted: tableAssign.isDeleted === true ? false : true,
            }
          : tableAssign
      )
    );
  };

  const handleRestoreClick = (id: string) => {
    setTableAssignsData((prev) =>
      prev.map((tableAssign) =>
        tableAssign.id === id
          ? {
              ...tableAssign,
              isDeleted: tableAssign.isDeleted === true ? false : true,
            }
          : tableAssign
      )
    );
  };

  const handleViewModeChange = (viewMode: "grid" | "list") => {
    setViewMode(viewMode);
  };

  const toggleStatus = (id: string) => {
    setTableAssignsData((prev) =>
      prev.map((tableAssign) =>
        tableAssign.id === id
          ? {
              ...tableAssign,
              status: tableAssign.status === "active" ? "inactive" : "active",
            }
          : tableAssign
      )
    );
  };

  // Filter waiters based on search query
  const filteredTableAssigns = tableAssignsData.filter(
    (tableAssign) =>
      tableAssign.waiterName
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      tableAssign.tableNo.toLowerCase().includes(searchQuery.toLowerCase())
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
                  title: "Import Customer",
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
            {filteredTableAssigns.map((tableAssign) => (
              <Card
                key={tableAssign.id}
                className="transition-all hover:border-primary hover:shadow-md relative group dark:bg-gray-800 p-4"
              >
                {/* Top Row - Grid with 3 columns: Title | Icons | Flag */}
                <div className="grid grid-cols-3 items-center gap-2 mb-4">
                  {/* Left - Title */}
                  <Tooltip
                    label={tableAssign.waiterName}
                    position="top"
                    withArrow
                  >
                    <CardTitle
                      className="text-lg font-semibold cursor-pointer hover:text-primary transition-colors truncate"
                      onClick={() => navigate(`/table-assigns/1`)}
                    >
                      {tableAssign.waiterName}
                    </CardTitle>
                  </Tooltip>

                  {/* Middle - Action Icons */}
                  <div className="flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {/* Status Toggle */}
                    <Tooltip
                      label={
                        tableAssign.status === "active"
                          ? "CLick to Inactivate"
                          : "CLick to Activate"
                      }
                      position="top"
                      withArrow
                    >
                      <div
                        className={`cursor-pointer p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                          tableAssign.status === "active"
                            ? "text-green-500"
                            : "text-gray-400"
                        }`}
                        onClick={() => {
                          toggleStatus(tableAssign.id);
                          toastSuccess(
                            tableAssign.status === "active"
                              ? "Table Assign activated successfully"
                              : "Table Assign inactivated successfully"
                          );
                        }}
                      >
                        {tableAssign.status === "active" ? (
                          <CheckCircle2 className="h-4 w-4" />
                        ) : (
                          <Circle className="h-4 w-4" />
                        )}
                      </div>
                    </Tooltip>

                    {/* Delete/Restore */}
                    <Tooltip
                      label={tableAssign.isDeleted ? "Restore" : "Delete"}
                      position="top"
                      withArrow
                    >
                      <div
                        className={`cursor-pointer p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                          tableAssign.isDeleted
                            ? "text-blue-500"
                            : "text-red-500"
                        }`}
                        onClick={() => {
                          if (tableAssign.isDeleted) {
                            handleRestoreClick(tableAssign.id);
                          } else {
                            handleDeleteClick(tableAssign.id);
                          }
                          toastSuccess(
                            tableAssign.isDeleted
                              ? "Table Assign restored successfully"
                              : "Table Assign deleted successfully"
                          );
                        }}
                      >
                        {tableAssign.isDeleted ? (
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
                        onClick={() => navigate(`/table-assigns/edit/1`)}
                      >
                        <Pencil className="h-4 w-4" />
                      </div>
                    </Tooltip>
                  </div>

                  {/* Right - Image */}
                  <div className="flex justify-end">
                    <img
                      src={tableAssign.photo}
                      alt={`${tableAssign.waiterName}`}
                      className="h-12 w-12 object-cover border rounded-md shadow-sm"
                      onError={(e) => {
                        (
                          e.target as HTMLImageElement
                        ).src = `/customer-dummy-image.jpg`;
                      }}
                    />
                  </div>
                </div>

                {/* Bottom Row - Grid with 2 columns: country | Currency */}
                <div className="grid grid-cols-2 items-center gap-4 pt-2 dark:border-gray-700">
                  {/* Country - Left aligned */}
                  <div className="text-left">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Waiter Name
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                      {tableAssign.waiterName}
                    </div>
                  </div>

                  {/* Currency - Right aligned */}
                  <div className="text-right">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Table No
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                      {tableAssign.tableNo}
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
                <span className="text-sm">Loading more table assigns...</span>
              </div>
            </div>
          )}

          {/* End of data indicator */}
          {!hasMore && filteredTableAssigns.length > 12 && (
            <div className="flex justify-center items-center py-8">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                No more table assigns to load
              </span>
            </div>
          )}
        </div>

        {/* Filter component - Right side only */}
        {isFilterOpen && (
          <div className="w-80 flex-shrink-0 border-l border-gray-200 dark:border-gray-700 pl-4">
            <div className="h-full flex flex-col">
              <GridFilterComponent
                data={tableAssignsData}
                setFilteredData={setTableAssignsData}
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
                data={tableAssignsData}
                setFilteredData={setTableAssignsData}
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
            <h3 className="text-lg font-semibold pl-4 ">Import Table Assign</h3>
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
