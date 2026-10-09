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

type GridDataType = {
  tenants: string;
  propertyCode: string;
  propertyName: string;
  propertyPrice: string;
  referenceNumber: string;
  primaryContact: string;
  invoice: string;
  invoiceDate: string;
  contract: string;
  contractAmount: string;
  term: string;
  leaseTerm: string;
  status: string;

  id: string;
  isDefault: boolean;
  isActive: boolean;
  isDraft: boolean;
  createdAt: Date;
  draftedAt: Date | null;
  updatedAt: Date;
  deletedAt: Date | null;
  isDeleted: boolean;
};

const tenantData: GridDataType[] = [
  {
    tenants: "John Smith",
    propertyCode: "PR-001",
    propertyName: "Sunset Apartments",
    propertyPrice: "$1,200",
    referenceNumber: "REF-1001",
    primaryContact: "+1-555-1234",
    invoice: "INV-2001",
    invoiceDate: "2025-01-15",
    contract: "CNT-3001",
    contractAmount: "$14,400",
    term: "12 months",
    leaseTerm: "2025-01-15 to 2026-01-14",
    status: "Active",

    id: "1",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-01-10"),
    draftedAt: null,
    updatedAt: new Date("2025-01-15"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    tenants: "Emily Johnson",
    propertyCode: "PR-002",
    propertyName: "Greenwood Villas",
    propertyPrice: "$1,500",
    referenceNumber: "REF-1002",
    primaryContact: "+1-555-5678",
    invoice: "INV-2002",
    invoiceDate: "2025-02-01",
    contract: "CNT-3002",
    contractAmount: "$18,000",
    term: "12 months",
    leaseTerm: "2025-02-01 to 2026-01-31",
    status: "Active",

    id: "2",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-01-28"),
    draftedAt: null,
    updatedAt: new Date("2025-02-01"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    tenants: "Michael Brown",
    propertyCode: "PR-003",
    propertyName: "Lakeside Homes",
    propertyPrice: "$950",
    referenceNumber: "REF-1003",
    primaryContact: "+1-555-9876",
    invoice: "INV-2003",
    invoiceDate: "2025-03-05",
    contract: "CNT-3003",
    contractAmount: "$11,400",
    term: "12 months",
    leaseTerm: "2025-03-05 to 2026-03-04",
    status: "Active",

    id: "3",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-03-01"),
    draftedAt: null,
    updatedAt: new Date("2025-03-05"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    tenants: "Sophia Davis",
    propertyCode: "PR-004",
    propertyName: "Maple Residency",
    propertyPrice: "$1,800",
    referenceNumber: "REF-1004",
    primaryContact: "+1-555-2222",
    invoice: "INV-2004",
    invoiceDate: "2025-04-12",
    contract: "CNT-3004",
    contractAmount: "$21,600",
    term: "12 months",
    leaseTerm: "2025-04-12 to 2026-04-11",
    status: "Active",

    id: "4",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-04-10"),
    draftedAt: null,
    updatedAt: new Date("2025-04-12"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    tenants: "Daniel Wilson",
    propertyCode: "PR-005",
    propertyName: "Hilltop Towers",
    propertyPrice: "$1,300",
    referenceNumber: "REF-1005",
    primaryContact: "+1-555-3333",
    invoice: "INV-2005",
    invoiceDate: "2025-05-01",
    contract: "CNT-3005",
    contractAmount: "$15,600",
    term: "12 months",
    leaseTerm: "2025-05-01 to 2026-04-30",
    status: "Draft",

    id: "5",
    isDefault: false,
    isActive: false,
    isDraft: true,
    createdAt: new Date("2025-04-28"),
    draftedAt: new Date("2025-05-01"),
    updatedAt: new Date("2025-05-01"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    tenants: "Olivia Martinez",
    propertyCode: "PR-006",
    propertyName: "Cedar Park",
    propertyPrice: "$1,400",
    referenceNumber: "REF-1006",
    primaryContact: "+1-555-4444",
    invoice: "INV-2006",
    invoiceDate: "2025-06-10",
    contract: "CNT-3006",
    contractAmount: "$16,800",
    term: "12 months",
    leaseTerm: "2025-06-10 to 2026-06-09",
    status: "Active",

    id: "6",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-06-05"),
    draftedAt: null,
    updatedAt: new Date("2025-06-10"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    tenants: "James Anderson",
    propertyCode: "PR-007",
    propertyName: "Ocean View",
    propertyPrice: "$2,000",
    referenceNumber: "REF-1007",
    primaryContact: "+1-555-5555",
    invoice: "INV-2007",
    invoiceDate: "2025-07-15",
    contract: "CNT-3007",
    contractAmount: "$24,000",
    term: "12 months",
    leaseTerm: "2025-07-15 to 2026-07-14",
    status: "Active",

    id: "7",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-07-10"),
    draftedAt: null,
    updatedAt: new Date("2025-07-15"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    tenants: "Ava Thompson",
    propertyCode: "PR-008",
    propertyName: "Riverbank Estates",
    propertyPrice: "$1,100",
    referenceNumber: "REF-1008",
    primaryContact: "+1-555-6666",
    invoice: "INV-2008",
    invoiceDate: "2025-08-05",
    contract: "CNT-3008",
    contractAmount: "$13,200",
    term: "12 months",
    leaseTerm: "2025-08-05 to 2026-08-04",
    status: "Active",

    id: "8",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-08-01"),
    draftedAt: null,
    updatedAt: new Date("2025-08-05"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    tenants: "William Garcia",
    propertyCode: "PR-009",
    propertyName: "Pine Grove",
    propertyPrice: "$900",
    referenceNumber: "REF-1009",
    primaryContact: "+1-555-7777",
    invoice: "INV-2009",
    invoiceDate: "2025-09-12",
    contract: "CNT-3009",
    contractAmount: "$10,800",
    term: "12 months",
    leaseTerm: "2025-09-12 to 2026-09-11",
    status: "Inactive",

    id: "9",
    isDefault: false,
    isActive: false,
    isDraft: false,
    createdAt: new Date("2025-09-10"),
    draftedAt: null,
    updatedAt: new Date("2025-09-12"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    tenants: "Mia Rodriguez",
    propertyCode: "PR-010",
    propertyName: "Elm Street Flats",
    propertyPrice: "$1,250",
    referenceNumber: "REF-1010",
    primaryContact: "+1-555-8888",
    invoice: "INV-2010",
    invoiceDate: "2025-10-01",
    contract: "CNT-3010",
    contractAmount: "$15,000",
    term: "12 months",
    leaseTerm: "2025-10-01 to 2026-09-30",
    status: "Active",

    id: "10",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-09-28"),
    draftedAt: null,
    updatedAt: new Date("2025-10-01"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    tenants: "Benjamin Lee",
    propertyCode: "PR-011",
    propertyName: "Willow Creek",
    propertyPrice: "$1,600",
    referenceNumber: "REF-1011",
    primaryContact: "+1-555-9999",
    invoice: "INV-2011",
    invoiceDate: "2025-11-15",
    contract: "CNT-3011",
    contractAmount: "$19,200",
    term: "12 months",
    leaseTerm: "2025-11-15 to 2026-11-14",
    status: "Draft",

    id: "11",
    isDefault: false,
    isActive: false,
    isDraft: true,
    createdAt: new Date("2025-11-10"),
    draftedAt: new Date("2025-11-15"),
    updatedAt: new Date("2025-11-15"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    tenants: "Charlotte Harris",
    propertyCode: "PR-012",
    propertyName: "Birchwood Heights",
    propertyPrice: "$1,750",
    referenceNumber: "REF-1012",
    primaryContact: "+1-555-0000",
    invoice: "INV-2012",
    invoiceDate: "2025-12-05",
    contract: "CNT-3012",
    contractAmount: "$21,000",
    term: "12 months",
    leaseTerm: "2025-12-05 to 2026-12-04",
    status: "Active",

    id: "12",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-12-01"),
    draftedAt: null,
    updatedAt: new Date("2025-12-05"),
    deletedAt: null,
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

export default function TenantGrid({
  searchQuery,
  setIsFilterOpen,
  isFilterOpen,
  setIsExportOpen,
  isExportOpen,
}: Props) {
  console.log("Terms grid rendered");

  const navigate = useNavigate();

  const [gridData, setGridData] = useState(tenantData);
  const canDelete: boolean = usePermission("tenant", "delete");
  const canRestore: boolean = usePermission("tenant", "restore");
  const canEdit: boolean = usePermission("tenant", "edit");

  // Debug permissions
  console.log("Tenant Permissions:", {
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

    const newItems = Array.from({ length: ITEMS_PER_PAGE }, (_, index) => ({
      id: `${Date.now()}-${index}`,
      tenants: `Tenant ${index + 1}`,
      propertyCode: `Property Code ${index + 1}`,
      propertyName: `Property Name ${index + 1}`,
      propertyPrice: `Property Price ${index + 1}`,
      referenceNumber: `Reference Number ${index + 1}`,
      primaryContact: `Primary Contact ${index + 1}`,
      invoice: `Invoice ${index + 1}`,
      invoiceDate: `Invoice Date ${index + 1}`,
      contract: `Contract ${index + 1}`,
      contractAmount: `Contract Amount ${index + 1}`,
      term: `Term ${index + 1}`,
      leaseTerm: `Lease Term ${index + 1}`,
      status: `Status ${index + 1}`,
      isDefault: false,
      isActive: Math.random() > 0.3,
      isDraft: Math.random() > 0.7,
      createdAt: new Date(),
      draftedAt: null,
      updatedAt: new Date(),
      deletedAt: null,
      isDeleted: false,
    }));

    // Stop loading more after reaching 50 items for demo
    if (gridData.length >= 46) {
      setHasMore(false);
    } else {
      setGridData((prev) => [...prev, ...newItems] as GridDataType[]);
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

  // Filter leaves based on search query
  const filteredData = gridData.filter(
    (item) =>
      item.tenants.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.propertyCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.propertyName.toLowerCase().includes(searchQuery.toLowerCase())
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
          Total {gridData.length} Tenants
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
            {filteredData.map((item, index) => (
              <Card
                key={index}
                className="transition-all hover:border-primary/90 hover:shadow-lg hover:translate-y-[-5px] relative group dark:bg-gray-800 p-4 duration-200"
              >
                {/* Top Row - Grid with 2 columns: Title | Status */}
                <div className="grid grid-cols-2 items-center gap-2 mb-4">
                  {/* Left - Title */}
                  <CardTitle
                    className="text-lg font-semibold cursor-pointer hover:text-primary transition-colors truncate"
                    onClick={() => navigate(`/tenants/1`)}
                  >
                    {item.tenants}
                  </CardTitle>

                  {/* Right - Status */}
                  <div className="flex items-end flex-col">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Property Code
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {item.propertyCode}
                    </div>
                  </div>
                </div>

                {/* Bottom Row - Grid with 3 columns: Leave Type | Actions | Notes */}
                <div className="grid grid-cols-3 items-center gap-4 pt-2 dark:border-gray-700">
                  {/* Leave Type - Left aligned */}
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Property Name
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {item.propertyName}
                    </div>
                  </div>

                  {/* Middle - Action Icons */}
                  <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {/* Delete/Restore */}
                    <Tooltip
                      label={
                        item.isDeleted && canRestore
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
                        disabled={item.isDeleted && !canRestore}
                        className={`cursor-pointer p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                          item.isDeleted ? "text-blue-500" : "text-red-500"
                        }`}
                        onClick={() => {
                          if (canRestore && item.isDeleted) {
                            handleRestoreClick(item.id);
                            toastRestore("Tenant restored successfully");
                          } else {
                            if (canDelete) {
                              handleDeleteClick(item.id);
                              toastDelete("Tenant deleted successfully");
                            }
                          }
                        }}
                      >
                        {item.isDeleted && canRestore ? (
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
                          onClick={() => navigate(`/tenants/edit/1`)}
                        >
                          <FontAwesomeIcon icon={faEdit} className="h-4 w-4" />
                        </div>
                      </Tooltip>
                    )}
                  </div>

                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Property Price
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {item.propertyPrice}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 items-center gap-4 pt-2 dark:border-gray-700 border-t">
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Reference Number
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {item.referenceNumber}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Contract
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {item.contract}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Contact Amount
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {item.contractAmount}
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
                <span className="text-sm">Loading more tenants...</span>
              </div>
            </div>
          )}

          {/* End of data indicator */}
          {!hasMore && gridData.length > 12 && (
            <div className="flex justify-center items-center py-8">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                No more tenants to load
              </span>
            </div>
          )}
        </div>

        {/* Filter component - Right side only */}
        {isFilterOpen && (
          <div className="w-80 flex-shrink-0 border-l border-gray-200 dark:border-gray-700 pl-4">
            <div className="h-full flex flex-col">
              <GridFilterComponent
                data={gridData}
                setFilteredData={setGridData}
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
                data={gridData}
                setFilteredData={setGridData}
                setIsExportOpen={setIsExportOpen}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
