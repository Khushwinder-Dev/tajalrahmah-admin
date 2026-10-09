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
import { Modal, Tooltip } from "@mantine/core"; // Import Tooltip from Mantine
import { useDisclosure } from "@mantine/hooks";
import ImportStepperTemp from "@/components/common/IMportTemp";
import { toastSuccess } from "@/lib/toast";

// Define Order interface to ensure type consistency
interface Order {
  id: string;
  documentNumber: string;
  poNumber: string;
  poDate: Date;
  supplierName: string;
  paymentMode: string;
  dueDays: number;
  paymentDate: Date;
  supplierNumber: string;
  supplierStatus: string;
  supplierGroup: string;
  remarks: string;
  country: string;
  state: string;
  city: string;
  isActive: boolean;
  isDraft: boolean;
  createdAt: Date | null;
  draftedAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;
  isDeleted: boolean;
}

// Mock data - replace with real data from your API
const orders: Order[] = [
  {
    id: "1",
    documentNumber: "DOC001",
    poNumber: "PO-2024-001",
    poDate: new Date("2024-01-15"),
    supplierName: "ABC Food Supplies",
    paymentMode: "Bank Transfer",
    dueDays: 30,
    paymentDate: new Date("2024-02-14"),
    supplierNumber: "SUP001",
    supplierStatus: "Active",
    supplierGroup: "Food & Beverages",
    remarks: "Urgent delivery required",
    country: "United States",
    state: "California",
    city: "Los Angeles",
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
    documentNumber: "DOC002",
    poNumber: "PO-2024-002",
    poDate: new Date("2024-01-16"),
    supplierName: "XYZ Restaurant Equipment",
    paymentMode: "Credit Card",
    dueDays: 15,
    paymentDate: new Date("2024-01-31"),
    supplierNumber: "SUP002",
    supplierStatus: "Active",
    supplierGroup: "Equipment",
    remarks: "Standard delivery",
    country: "United States",
    state: "New York",
    city: "New York",
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
    documentNumber: "DOC003",
    poNumber: "PO-2024-003",
    poDate: new Date("2024-01-17"),
    supplierName: "Fresh Produce Co.",
    paymentMode: "Cash",
    dueDays: 7,
    paymentDate: new Date("2024-01-24"),
    supplierNumber: "SUP003",
    supplierStatus: "Active",
    supplierGroup: "Fresh Produce",
    remarks: "Daily fresh delivery",
    country: "United States",
    state: "Florida",
    city: "Miami",
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
    documentNumber: "DOC004",
    poNumber: "PO-2024-004",
    poDate: new Date("2024-01-18"),
    supplierName: "Premium Meat Suppliers",
    paymentMode: "Check",
    dueDays: 45,
    paymentDate: new Date("2024-03-04"),
    supplierNumber: "SUP004",
    supplierStatus: "Active",
    supplierGroup: "Meat & Poultry",
    remarks: "Temperature controlled delivery",
    country: "United States",
    state: "Texas",
    city: "Houston",
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
    documentNumber: "DOC005",
    poNumber: "PO-2024-005",
    poDate: new Date("2024-01-19"),
    supplierName: "Ocean Fresh Seafood",
    paymentMode: "ACH Transfer",
    dueDays: 21,
    paymentDate: new Date("2024-02-09"),
    supplierNumber: "SUP005",
    supplierStatus: "Active",
    supplierGroup: "Seafood",
    remarks: "Live delivery required",
    country: "United States",
    state: "Washington",
    city: "Seattle",
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
    documentNumber: "DOC006",
    poNumber: "PO-2024-006",
    poDate: new Date("2024-01-20"),
    supplierName: "Dairy Farm Products",
    paymentMode: "Net Banking",
    dueDays: 14,
    paymentDate: new Date("2024-02-03"),
    supplierNumber: "SUP006",
    supplierStatus: "Active",
    supplierGroup: "Dairy",
    remarks: "Refrigerated transport",
    country: "United States",
    state: "Wisconsin",
    city: "Milwaukee",
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
    documentNumber: "DOC007",
    poNumber: "PO-2024-007",
    poDate: new Date("2024-01-21"),
    supplierName: "Organic Vegetables Ltd",
    paymentMode: "PayPal",
    dueDays: 10,
    paymentDate: new Date("2024-01-31"),
    supplierNumber: "SUP007",
    supplierStatus: "Pending",
    supplierGroup: "Organic Produce",
    remarks: "Organic certification required",
    country: "United States",
    state: "Oregon",
    city: "Portland",
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
    documentNumber: "DOC008",
    poNumber: "PO-2024-008",
    poDate: new Date("2024-01-22"),
    supplierName: "Spice World International",
    paymentMode: "Wire Transfer",
    dueDays: 60,
    paymentDate: new Date("2024-03-23"),
    supplierNumber: "SUP008",
    supplierStatus: "Active",
    supplierGroup: "Spices & Herbs",
    remarks: "Bulk order - quarterly supply",
    country: "United States",
    state: "Louisiana",
    city: "New Orleans",
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
    documentNumber: "DOC009",
    poNumber: "PO-2024-009",
    poDate: new Date("2024-01-23"),
    supplierName: "Beverage Distributors Inc",
    paymentMode: "Credit Line",
    dueDays: 30,
    paymentDate: new Date("2024-02-22"),
    supplierNumber: "SUP009",
    supplierStatus: "Active",
    supplierGroup: "Beverages",
    remarks: "Weekly delivery schedule",
    country: "United States",
    state: "Georgia",
    city: "Atlanta",
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
    documentNumber: "DOC010",
    poNumber: "PO-2024-010",
    poDate: new Date("2024-01-24"),
    supplierName: "Kitchen Supplies Pro",
    paymentMode: "Cash on Delivery",
    dueDays: 0,
    paymentDate: new Date("2024-01-24"),
    supplierNumber: "SUP010",
    supplierStatus: "Active",
    supplierGroup: "Kitchen Supplies",
    remarks: "Installation included",
    country: "United States",
    state: "Illinois",
    city: "Chicago",
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
    documentNumber: "DOC011",
    poNumber: "PO-2024-011",
    poDate: new Date("2024-01-25"),
    supplierName: "Bakery Ingredients Corp",
    paymentMode: "Debit Card",
    dueDays: 20,
    paymentDate: new Date("2024-02-14"),
    supplierNumber: "SUP011",
    supplierStatus: "Active",
    supplierGroup: "Bakery",
    remarks: "Temperature sensitive items",
    country: "United States",
    state: "Colorado",
    city: "Denver",
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
    documentNumber: "DOC012",
    poNumber: "PO-2024-012",
    poDate: new Date("2024-01-26"),
    supplierName: "Frozen Foods Express",
    paymentMode: "Electronic Payment",
    dueDays: 25,
    paymentDate: new Date("2024-02-20"),
    supplierNumber: "SUP012",
    supplierStatus: "Active",
    supplierGroup: "Frozen Foods",
    remarks: "Frozen storage required",
    country: "United States",
    state: "Minnesota",
    city: "Minneapolis",
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
    documentNumber: "DOC013",
    poNumber: "PO-2024-013",
    poDate: new Date("2024-01-27"),
    supplierName: "Gourmet Food Imports",
    paymentMode: "Letter of Credit",
    dueDays: 90,
    paymentDate: new Date("2024-04-26"),
    supplierNumber: "SUP013",
    supplierStatus: "Pending",
    supplierGroup: "Gourmet Foods",
    remarks: "Import documentation pending",
    country: "United States",
    state: "Nevada",
    city: "Las Vegas",
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
    documentNumber: "DOC014",
    poNumber: "PO-2024-014",
    poDate: new Date("2024-01-28"),
    supplierName: "Cleaning Supplies Direct",
    paymentMode: "Mobile Payment",
    dueDays: 15,
    paymentDate: new Date("2024-02-12"),
    supplierNumber: "SUP014",
    supplierStatus: "Active",
    supplierGroup: "Cleaning Supplies",
    remarks: "Eco-friendly products only",
    country: "United States",
    state: "Arizona",
    city: "Phoenix",
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
    documentNumber: "DOC015",
    poNumber: "PO-2024-015",
    poDate: new Date("2024-01-29"),
    supplierName: "Restaurant Furniture Co",
    paymentMode: "Installment Plan",
    dueDays: 120,
    paymentDate: new Date("2024-05-28"),
    supplierNumber: "SUP015",
    supplierStatus: "Active",
    supplierGroup: "Furniture",
    remarks: "Custom design requirements",
    country: "United States",
    state: "North Carolina",
    city: "Charlotte",
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
    documentNumber: "DOC016",
    poNumber: "PO-2024-016",
    poDate: new Date("2024-01-30"),
    supplierName: "Tech Solutions Restaurant",
    paymentMode: "Crypto Payment",
    dueDays: 30,
    paymentDate: new Date("2024-03-01"),
    supplierNumber: "SUP016",
    supplierStatus: "Active",
    supplierGroup: "Technology",
    remarks: "Software licensing included",
    country: "United States",
    state: "Massachusetts",
    city: "Boston",
    isActive: true,
    isDraft: false,
    createdAt: new Date("2024-01-30"),
    draftedAt: null,
    updatedAt: new Date("2024-02-04"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "17",
    documentNumber: "DOC017",
    poNumber: "PO-2024-017",
    poDate: new Date("2024-01-31"),
    supplierName: "Uniform & Apparel Supply",
    paymentMode: "Gift Card Credit",
    dueDays: 45,
    paymentDate: new Date("2024-03-17"),
    supplierNumber: "SUP017",
    supplierStatus: "Active",
    supplierGroup: "Uniforms",
    remarks: "Custom embroidery required",
    country: "United States",
    state: "Tennessee",
    city: "Nashville",
    isActive: true,
    isDraft: false,
    createdAt: new Date("2024-01-31"),
    draftedAt: null,
    updatedAt: new Date("2024-02-05"),
    deletedAt: null,
    isDeleted: false,
  },
];

export default function OrdersGrid({
  setViewMode,
}: {
  setViewMode: (viewMode: "grid" | "list") => void;
}) {
  console.log("Orders grid rendered");
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [ordersData, setOrdersData] = useState(orders);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const [modalData, setModalData] = useState({
    title: "Import Orders",
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

    const supplierGroups = [
      "Food & Beverages",
      "Equipment",
      "Fresh Produce",
      "Meat & Poultry",
      "Seafood",
      "Dairy",
      "Organic Produce",
    ];
    const paymentModes = [
      "Bank Transfer",
      "Credit Card",
      "Cash",
      "Check",
      "ACH Transfer",
      "Wire Transfer",
      "PayPal",
    ];
    const cities = [
      "New York",
      "Los Angeles",
      "Chicago",
      "Houston",
      "Phoenix",
      "Philadelphia",
      "San Antonio",
    ];
    const states = [
      "California",
      "Texas",
      "Florida",
      "New York",
      "Illinois",
      "Pennsylvania",
      "Ohio",
    ];

    const newItems = Array.from({ length: ITEMS_PER_PAGE }, (_, index) => {
      const randomSupplierGroup =
        supplierGroups[Math.floor(Math.random() * supplierGroups.length)];
      const randomPaymentMode =
        paymentModes[Math.floor(Math.random() * paymentModes.length)];
      const randomCity = cities[Math.floor(Math.random() * cities.length)];
      const randomState = states[Math.floor(Math.random() * states.length)];

      return {
        id: `${Date.now()}-${index}`,
        documentNumber: `DOC${(ordersData.length + index + 1)
          .toString()
          .padStart(3, "0")}`,
        poNumber: `PO-2024-${(ordersData.length + index + 1)
          .toString()
          .padStart(3, "0")}`,
        poDate: new Date(),
        supplierName: `Supplier ${ordersData.length + index + 1}`,
        paymentMode: randomPaymentMode,
        dueDays: Math.floor(Math.random() * 90) + 1,
        paymentDate: new Date(
          Date.now() + Math.random() * 90 * 24 * 60 * 60 * 1000
        ),
        supplierNumber: `SUP${(ordersData.length + index + 1)
          .toString()
          .padStart(3, "0")}`,
        supplierStatus: Math.random() > 0.3 ? "Active" : "Pending",
        supplierGroup: randomSupplierGroup,
        remarks: `Order remarks ${ordersData.length + index + 1}`,
        country: "United States",
        state: randomState,
        city: randomCity,
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
    if (ordersData.length >= 46) {
      setHasMore(false);
    } else {
      setOrdersData((prev) => [...prev, ...newItems]);
      setPage((prev) => prev + 1);
    }

    setIsLoading(false);
  }, [ordersData.length, isLoading, hasMore]);

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

  const handleDeleteClick = (orderId: string) => {
    setOrdersData((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId
          ? {
              ...order,
              isDeleted: !order.isDeleted,
              deletedAt: !order.isDeleted ? new Date() : null,
            }
          : order
      )
    );
  };

  const handleRestoreClick = (orderId: string) => {
    setOrdersData((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId
          ? {
              ...order,
              isDeleted: false,
              deletedAt: null,
            }
          : order
      )
    );
  };

  const handleViewModeChange = (viewMode: "grid" | "list") => {
    setViewMode(viewMode);
  };

  const toggleStatus = (orderId: string) => {
    setOrdersData((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId
          ? {
              ...order,
              isActive: !order.isActive,
              updatedAt: new Date(),
            }
          : order
      )
    );
  };

  // Filter orders based on search query
  const filteredOrders = ordersData.filter(
    (order) =>
      order.supplierName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.documentNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.poNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.supplierNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.paymentMode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.supplierGroup.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.state.toLowerCase().includes(searchQuery.toLowerCase())
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
                  title: "Import Orders",
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
                  placeholder="Search orders..."
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
            {filteredOrders.map((order) => (
              <Card
                key={order.id}
                className="transition-all hover:border-primary hover:shadow-md relative group dark:bg-gray-800 p-4"
              >
                {/* Top Row - 2 Column Grid Layout (No Logo) */}
                <div className="grid grid-cols-2 items-center gap-4 mb-4">
                  {/* Left - Title */}
                  <div className="min-w-0">
                    <Tooltip
                      label={order.supplierName}
                      position="top"
                      withArrow
                    >
                      <CardTitle
                        className="text-lg font-semibold cursor-pointer hover:text-primary transition-colors truncate"
                        onClick={() => navigate(`/orders/${order.id}`)}
                      >
                        {order.supplierName}
                      </CardTitle>
                    </Tooltip>
                  </div>

                  {/* Right - Action Icons */}
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {/* Status Toggle */}
                    <Tooltip
                      label={
                        order.isActive
                          ? "Click to Deactivate"
                          : "Click to Activate"
                      }
                      position="top"
                      withArrow
                    >
                      <div
                        className={`cursor-pointer p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center justify-center ${
                          order.isActive ? "text-green-500" : "text-gray-400"
                        }`}
                        onClick={() => {
                          toggleStatus(order.id);
                          toastSuccess(
                            order.isActive
                              ? "Order deactivated successfully"
                              : "Order activated successfully"
                          );
                        }}
                      >
                        {order.isActive ? (
                          <CheckCircle2 className="h-4 w-4" />
                        ) : (
                          <Circle className="h-4 w-4" />
                        )}
                      </div>
                    </Tooltip>

                    {/* Delete/Restore */}
                    <Tooltip
                      label={order.isDeleted ? "Restore" : "Delete"}
                      position="top"
                      withArrow
                    >
                      <div
                        className={`cursor-pointer p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center justify-center ${
                          order.isDeleted ? "text-blue-500" : "text-red-500"
                        }`}
                        onClick={() => {
                          if (order.isDeleted) {
                            handleRestoreClick(order.id);
                          } else {
                            handleDeleteClick(order.id);
                          }
                          toastSuccess(
                            order.isDeleted
                              ? "Order restored successfully"
                              : "Order deleted successfully"
                          );
                        }}
                      >
                        {order.isDeleted ? (
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
                        onClick={() => navigate(`/orders/${order.id}/edit`)}
                      >
                        <Pencil className="h-4 w-4" />
                      </div>
                    </Tooltip>
                  </div>
                </div>

                {/* Bottom Row - Grid with 3 columns: P.O Number | Status Badges | Due Days */}
                <div className="grid grid-cols-3 items-start gap-4 pt-2 border-t dark:border-gray-700">
                  {/* P.O Number - Left aligned */}
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      P.O Number
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                      {order.poNumber}
                    </div>
                  </div>

                  {/* Status Badges - Center aligned */}
                  <div className="flex justify-center items-center gap-1 pt-3">
                    {order.supplierStatus === "Active" && (
                      <span className="text-[10px] sm:text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full font-medium whitespace-nowrap">
                        Active
                      </span>
                    )}
                    {order.supplierStatus === "Pending" && (
                      <span className="text-[10px] sm:text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full font-medium whitespace-nowrap">
                        Pending
                      </span>
                    )}
                    {order.isDraft && (
                      <span className="text-[10px] sm:text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full font-medium whitespace-nowrap">
                        Draft
                      </span>
                    )}
                  </div>

                  {/* Due Days - Right aligned */}
                  <div className="text-right">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Due Days
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                      {order.dueDays} days
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
                <span className="text-sm">Loading more orders...</span>
              </div>
            </div>
          )}

          {/* End of data indicator */}
          {!hasMore && filteredOrders.length > 12 && (
            <div className="flex justify-center items-center py-8">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                No more orders to load
              </span>
            </div>
          )}
        </div>

        {/* Filter component - Right side only */}
        {isFilterOpen && (
          <div className="w-80 flex-shrink-0 border-l border-gray-200 dark:border-gray-700 pl-4">
            <div className="h-full flex flex-col">
              <GridFilterComponent
                data={orders}
                setFilteredData={setOrdersData}
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
                data={orders}
                setFilteredData={setOrdersData}
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
            <h3 className="text-lg font-semibold pl-4 ">Import Orders</h3>
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
