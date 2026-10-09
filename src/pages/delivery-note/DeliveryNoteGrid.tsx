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
import GridFilterComponent from "./GridFilterComponent";
import GridExportComponent from "./GridExportComponent";
import { Modal, Tooltip } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import ImportStepperTemp from "@/components/common/IMportTemp";
import { toastSuccess } from "@/lib/toast";

// Define DeliveryNote interface
interface DeliveryNote {
  id: string;
  deliveryNo: string;
  branch: string;
  deliveryDate: Date;
  customerName: string;
  quotationNumber: string;
  isActive: boolean;
  isDraft: boolean;
  createdAt: Date | null;
  draftedAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;
  isDeleted: boolean;
}

// Mock data for delivery notes
const deliveryNotes: DeliveryNote[] = [
  {
    id: "1",
    deliveryNo: "DN001",
    branch: "Main Branch",
    deliveryDate: new Date("2024-01-15"),
    customerName: "ABC Corporation",
    quotationNumber: "QT001",
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
    deliveryNo: "DN002",
    branch: "North Branch",
    deliveryDate: new Date("2024-01-16"),
    customerName: "XYZ Ltd",
    quotationNumber: "QT002",
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
    deliveryNo: "DN003",
    branch: "South Branch",
    deliveryDate: new Date("2024-01-17"),
    customerName: "Global Industries",
    quotationNumber: "QT003",
    isActive: true,
    isDraft: false,
    createdAt: new Date("2024-01-17"),
    draftedAt: null,
    updatedAt: new Date("2024-01-22"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "4",
    deliveryNo: "DN004",
    branch: "East Branch",
    deliveryDate: new Date("2024-01-18"),
    customerName: "Tech Solutions Inc",
    quotationNumber: "QT004",
    isActive: true,
    isDraft: false,
    createdAt: new Date("2024-01-18"),
    draftedAt: null,
    updatedAt: new Date("2024-01-23"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "5",
    deliveryNo: "DN005",
    branch: "West Branch",
    deliveryDate: new Date("2024-01-19"),
    customerName: "Metro Supplies",
    quotationNumber: "QT005",
    isActive: true,
    isDraft: false,
    createdAt: new Date("2024-01-19"),
    draftedAt: null,
    updatedAt: new Date("2024-01-24"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "6",
    deliveryNo: "DN006",
    branch: "Central Branch",
    deliveryDate: new Date("2024-01-20"),
    customerName: "Prime Logistics",
    quotationNumber: "QT006",
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
    deliveryNo: "DN007",
    branch: "Downtown Branch",
    deliveryDate: new Date("2024-01-21"),
    customerName: "Urban Enterprises",
    quotationNumber: "QT007",
    isActive: true,
    isDraft: true,
    createdAt: new Date("2024-01-21"),
    draftedAt: new Date("2024-01-21"),
    updatedAt: new Date("2024-01-26"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "8",
    deliveryNo: "DN008",
    branch: "Suburban Branch",
    deliveryDate: new Date("2024-01-22"),
    customerName: "Retail Partners Co",
    quotationNumber: "QT008",
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
    deliveryNo: "DN009",
    branch: "Uptown Branch",
    deliveryDate: new Date("2024-01-23"),
    customerName: "Express Trading",
    quotationNumber: "QT009",
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
    deliveryNo: "DN010",
    branch: "Riverside Branch",
    deliveryDate: new Date("2024-01-24"),
    customerName: "Coastal Imports",
    quotationNumber: "QT010",
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
    deliveryNo: "DN011",
    branch: "Hillside Branch",
    deliveryDate: new Date("2024-01-25"),
    customerName: "Mountain View Corp",
    quotationNumber: "QT011",
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
    deliveryNo: "DN012",
    branch: "Lakeside Branch",
    deliveryDate: new Date("2024-01-26"),
    customerName: "Lakefront Industries",
    quotationNumber: "QT012",
    isActive: true,
    isDraft: false,
    createdAt: new Date("2024-01-26"),
    draftedAt: null,
    updatedAt: new Date("2024-01-31"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "13",
    deliveryNo: "DN013",
    branch: "Garden Branch",
    deliveryDate: new Date("2024-01-27"),
    customerName: "Green Valley Co",
    quotationNumber: "QT013",
    isActive: true,
    isDraft: true,
    createdAt: new Date("2024-01-27"),
    draftedAt: new Date("2024-01-27"),
    updatedAt: new Date("2024-02-01"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "14",
    deliveryNo: "DN014",
    branch: "Plaza Branch",
    deliveryDate: new Date("2024-01-28"),
    customerName: "Plaza Retailers",
    quotationNumber: "QT014",
    isActive: true,
    isDraft: false,
    createdAt: new Date("2024-01-28"),
    draftedAt: null,
    updatedAt: new Date("2024-02-02"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "15",
    deliveryNo: "DN015",
    branch: "Metro Branch",
    deliveryDate: new Date("2024-01-29"),
    customerName: "Metropolitan Goods",
    quotationNumber: "QT015",
    isActive: true,
    isDraft: false,
    createdAt: new Date("2024-01-29"),
    draftedAt: null,
    updatedAt: new Date("2024-02-03"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "16",
    deliveryNo: "DN016",
    branch: "Business District",
    deliveryDate: new Date("2024-01-30"),
    customerName: "Corporate Solutions",
    quotationNumber: "QT016",
    isActive: true,
    isDraft: false,
    createdAt: new Date("2024-01-30"),
    draftedAt: null,
    updatedAt: new Date("2024-02-04"),
    deletedAt: null,
    isDeleted: false,
  },
];

export default function DeliveryNoteGrid({
  setViewMode,
}: {
  setViewMode: (viewMode: "grid" | "list") => void;
}) {
  console.log("Delivery note grid rendered");
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [deliveryData, setDeliveryData] = useState(deliveryNotes);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const [modalData, setModalData] = useState({
    title: "Import Delivery Notes",
    message: <ImportStepperTemp />,
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

    const customers = [
      "ABC Corporation",
      "XYZ Ltd",
      "Global Industries",
      "Tech Solutions Inc",
      "Metro Supplies",
      "Prime Logistics",
      "Urban Enterprises",
      "Retail Partners Co",
      "Express Trading",
      "Coastal Imports",
    ];

    const newItems = Array.from({ length: ITEMS_PER_PAGE }, (_, index) => {
      const randomBranch =
        branches[Math.floor(Math.random() * branches.length)];
      const randomCustomer =
        customers[Math.floor(Math.random() * customers.length)];

      return {
        id: `${Date.now()}-${index}`,
        deliveryNo: `DN${(deliveryData.length + index + 1)
          .toString()
          .padStart(3, "0")}`,
        branch: randomBranch,
        deliveryDate: new Date(),
        customerName: randomCustomer,
        quotationNumber: `QT${(deliveryData.length + index + 1)
          .toString()
          .padStart(3, "0")}`,
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
    if (deliveryData.length >= 46) {
      setHasMore(false);
    } else {
      setDeliveryData((prev) => [...prev, ...newItems]);
      setPage((prev) => prev + 1);
    }

    setIsLoading(false);
  }, [deliveryData.length, isLoading, hasMore]);

  // Infinite scroll handler
  const handleScroll = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const { scrollTop, scrollHeight, clientHeight } = container;
    const threshold = 100;

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

  const handleDeleteClick = (deliveryId: string) => {
    setDeliveryData((prevDelivery) =>
      prevDelivery.map((delivery) =>
        delivery.id === deliveryId
          ? {
              ...delivery,
              isDeleted: !delivery.isDeleted,
              deletedAt: !delivery.isDeleted ? new Date() : null,
            }
          : delivery
      )
    );
  };

  const handleRestoreClick = (deliveryId: string) => {
    setDeliveryData((prevDelivery) =>
      prevDelivery.map((delivery) =>
        delivery.id === deliveryId
          ? {
              ...delivery,
              isDeleted: false,
              deletedAt: null,
            }
          : delivery
      )
    );
  };

  const handleViewModeChange = (viewMode: "grid" | "list") => {
    setViewMode(viewMode);
  };

  const toggleStatus = (deliveryId: string) => {
    setDeliveryData((prevDelivery) =>
      prevDelivery.map((delivery) =>
        delivery.id === deliveryId
          ? {
              ...delivery,
              isActive: !delivery.isActive,
              updatedAt: new Date(),
            }
          : delivery
      )
    );
  };

  // Filter delivery notes based on search query
  const filteredDelivery = deliveryData.filter(
    (delivery) =>
      delivery.deliveryNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      delivery.branch.toLowerCase().includes(searchQuery.toLowerCase()) ||
      delivery.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      delivery.quotationNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Format date
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  };

  return (
    <div className="px-4 py-3 h-full flex flex-col bg-white dark:bg-gray-900 parent">
      {/* Fixed header controls */}
      <div className="sticky top-0 z-20 bg-white dark:bg-gray-900 pb-2">
        <div className="grid grid-cols-12 gap-4 items-center">
          {/* Left buttons */}
          <div className="col-span-4 flex items-center gap-2">
            <Button
              variant="outline"
              className="gap-2 rounded-full min-w-[60px] sm:min-w-[80px]"
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
                  title: "Import Delivery Notes",
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
                  placeholder="Search delivery notes..."
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
            {filteredDelivery.map((delivery) => (
              <Card
                key={delivery.id}
                className="transition-all hover:border-primary hover:shadow-md relative group dark:bg-gray-800 p-4"
              >
                {/* Top Row - 2 Column Grid Layout */}
                <div className="grid grid-cols-2 items-center gap-4 mb-4">
                  {/* Left - Title */}
                  <div className="min-w-0">
                    <Tooltip
                      label={delivery.deliveryNo}
                      position="top"
                      withArrow
                    >
                      <CardTitle
                        className="text-lg font-semibold cursor-pointer hover:text-primary transition-colors truncate"
                        onClick={() =>
                          navigate(`/delivery-notes/${delivery.id}`)
                        }
                      >
                        {delivery.deliveryNo}
                      </CardTitle>
                    </Tooltip>
                  </div>

                  {/* Right - Action Icons */}
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {/* Status Toggle */}
                    <Tooltip
                      label={
                        delivery.isActive
                          ? "Click to Deactivate"
                          : "Click to Activate"
                      }
                      position="top"
                      withArrow
                    >
                      <div
                        className={`cursor-pointer p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center justify-center ${
                          delivery.isActive ? "text-green-500" : "text-gray-400"
                        }`}
                        onClick={() => {
                          toggleStatus(delivery.id);
                          toastSuccess(
                            delivery.isActive
                              ? "Delivery note deactivated successfully"
                              : "Delivery note activated successfully"
                          );
                        }}
                      >
                        {delivery.isActive ? (
                          <CheckCircle2 className="h-4 w-4" />
                        ) : (
                          <Circle className="h-4 w-4" />
                        )}
                      </div>
                    </Tooltip>

                    {/* Delete/Restore */}
                    <Tooltip
                      label={delivery.isDeleted ? "Restore" : "Delete"}
                      position="top"
                      withArrow
                    >
                      <div
                        className={`cursor-pointer p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center justify-center ${
                          delivery.isDeleted ? "text-blue-500" : "text-red-500"
                        }`}
                        onClick={() => {
                          if (delivery.isDeleted) {
                            handleRestoreClick(delivery.id);
                          } else {
                            handleDeleteClick(delivery.id);
                          }
                          toastSuccess(
                            delivery.isDeleted
                              ? "Delivery note restored successfully"
                              : "Delivery note deleted successfully"
                          );
                        }}
                      >
                        {delivery.isDeleted ? (
                          <RefreshCw className="h-4 w-4" />
                        ) : (
                          <Trash2 className="h-4 w-4" />
                        )}
                      </div>
                    </Tooltip>

                    {/* Edit */}
                    <Tooltip label="Edit" position="top" withArrow>
                      <div
                        className="cursor-pointer p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-blue-500 flex items-center justify-center"
                        onClick={() =>
                          navigate(`/delivery-notes/edit/${delivery.id}`)
                        }
                      >
                        <Pencil className="h-4 w-4" />
                      </div>
                    </Tooltip>
                  </div>
                </div>

                {/* Middle Row - Branch and Date */}
                <div className="grid grid-cols-2 items-start gap-4 mb-3">
                  {/* Branch */}
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Branch
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {delivery.branch}
                    </div>
                  </div>

                  {/* Delivery Date */}
                  <div className="text-right">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Delivery Date
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                      {formatDate(delivery.deliveryDate)}
                    </div>
                  </div>
                </div>

                {/* Bottom Row - Status Badges */}
                {/* <div className="flex justify-center items-center gap-1 mb-3 pt-2 border-t dark:border-gray-700">
                  {delivery.isActive && (
                    <span className="text-[10px] sm:text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full font-medium whitespace-nowrap">
                      Active
                    </span>
                  )}
                  {!delivery.isActive && (
                    <span className="text-[10px] sm:text-xs bg-gray-100 text-gray-800 px-2 py-0.5 rounded-full font-medium whitespace-nowrap">
                      Inactive
                    </span>
                  )}
                  {delivery.isDraft && (
                    <span className="text-[10px] sm:text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full font-medium whitespace-nowrap">
                      Draft
                    </span>
                  )}
                </div> */}

                {/* Customer and Quotation section */}
                <div className="pt-2 border-t dark:border-gray-700">
                  <div className="grid grid-cols-2 gap-2">
                    {/* Customer Name */}
                    <div className="col-span-1">
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        Customer Name
                      </div>
                      <div className="text-sm text-gray-700 dark:text-gray-300 truncate font-medium">
                        {delivery.customerName}
                      </div>
                    </div>

                    {/* Quotation Number */}
                    <div className="col-span-1 justify-center">
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        Quotation Number
                      </div>
                      <div className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                        {delivery.quotationNumber}
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
                <span className="text-sm">Loading more delivery notes...</span>
              </div>
            </div>
          )}

          {/* End of data indicator */}
          {!hasMore && filteredDelivery.length > 12 && (
            <div className="flex justify-center items-center py-8">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                No more delivery notes to load
              </span>
            </div>
          )}
        </div>

        {/* Filter component - Right side only */}
        {isFilterOpen && (
          <div className="w-80 flex-shrink-0 border-l border-gray-200 dark:border-gray-700 pl-4">
            <div className="h-full flex flex-col">
              <GridFilterComponent
                data={deliveryNotes}
                setFilteredData={setDeliveryData}
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
                data={deliveryNotes}
                setFilteredData={setDeliveryData}
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
            <h3 className="text-lg font-semibold pl-4">
              Import Delivery Notes
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
