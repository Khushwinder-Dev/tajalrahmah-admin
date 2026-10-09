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
  code: string;
  ownerName: string;
  vatNumber: string;
  email: string;
  phoneNumber: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  profileImage: string;

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

const propertyOwnerData: GridDataType[] = [
  {
    id: "1",
    code: "C001",
    ownerName: "John Doe",
    vatNumber: "VAT1001",
    email: "john@example.com",
    phoneNumber: "+1-202-555-0101",
    address: "123 Main St",
    city: "New York",
    state: "NY",
    zipCode: "10001",
    country: "USA",
    profileImage: "https://picsum.photos/200?1",
    isDefault: true,
    isActive: true,
    isDraft: false,
    createdAt: new Date(),
    draftedAt: null,
    updatedAt: new Date(),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "2",
    code: "C002",
    ownerName: "Alice Smith",
    vatNumber: "VAT1002",
    email: "alice@example.com",
    phoneNumber: "+44-20-7946-1234",
    address: "456 Queen St",
    city: "London",
    state: "London",
    zipCode: "SW1A 1AA",
    country: "UK",
    profileImage: "https://picsum.photos/200?2",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date(),
    draftedAt: null,
    updatedAt: new Date(),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "3",
    code: "C003",
    ownerName: "Michael Johnson",
    vatNumber: "VAT1003",
    email: "michael@example.com",
    phoneNumber: "+49-30-123456",
    address: "789 Alexanderplatz",
    city: "Berlin",
    state: "Berlin",
    zipCode: "10178",
    country: "Germany",
    profileImage: "https://picsum.photos/200?3",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date(),
    draftedAt: null,
    updatedAt: new Date(),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "4",
    code: "C004",
    ownerName: "Sophia Lee",
    vatNumber: "VAT1004",
    email: "sophia@example.com",
    phoneNumber: "+61-2-9876-5432",
    address: "12 Harbour St",
    city: "Sydney",
    state: "NSW",
    zipCode: "2000",
    country: "Australia",
    profileImage: "https://picsum.photos/200?4",
    isDefault: false,
    isActive: false,
    isDraft: true,
    createdAt: new Date(),
    draftedAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "5",
    code: "C005",
    ownerName: "David Kim",
    vatNumber: "VAT1005",
    email: "david@example.com",
    phoneNumber: "+82-2-1234-5678",
    address: "88 Gangnam St",
    city: "Seoul",
    state: "Seoul",
    zipCode: "06236",
    country: "South Korea",
    profileImage: "https://picsum.photos/200?5",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date(),
    draftedAt: null,
    updatedAt: new Date(),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "6",
    code: "C006",
    ownerName: "Emma Brown",
    vatNumber: "VAT1006",
    email: "emma@example.com",
    phoneNumber: "+33-1-2345-6789",
    address: "23 Rue Lafayette",
    city: "Paris",
    state: "Île-de-France",
    zipCode: "75009",
    country: "France",
    profileImage: "https://picsum.photos/200?6",
    isDefault: false,
    isActive: false,
    isDraft: false,
    createdAt: new Date(),
    draftedAt: null,
    updatedAt: new Date(),
    deletedAt: new Date(),
    isDeleted: true,
  },
  {
    id: "7",
    code: "C007",
    ownerName: "Liam Wilson",
    vatNumber: "VAT1007",
    email: "liam@example.com",
    phoneNumber: "+91-98765-43210",
    address: "56 MG Road",
    city: "Bangalore",
    state: "Karnataka",
    zipCode: "560001",
    country: "India",
    profileImage: "https://picsum.photos/200?7",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date(),
    draftedAt: null,
    updatedAt: new Date(),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "8",
    code: "C008",
    ownerName: "Olivia Davis",
    vatNumber: "VAT1008",
    email: "olivia@example.com",
    phoneNumber: "+34-91-123-4567",
    address: "22 Gran Via",
    city: "Madrid",
    state: "Madrid",
    zipCode: "28013",
    country: "Spain",
    profileImage: "https://picsum.photos/200?8",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date(),
    draftedAt: null,
    updatedAt: new Date(),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "9",
    code: "C009",
    ownerName: "Noah Martinez",
    vatNumber: "VAT1009",
    email: "noah@example.com",
    phoneNumber: "+52-55-1234-5678",
    address: "45 Reforma",
    city: "Mexico City",
    state: "CDMX",
    zipCode: "06000",
    country: "Mexico",
    profileImage: "https://picsum.photos/200?9",
    isDefault: true,
    isActive: true,
    isDraft: false,
    createdAt: new Date(),
    draftedAt: null,
    updatedAt: new Date(),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "10",
    code: "C010",
    ownerName: "Ava Taylor",
    vatNumber: "VAT1010",
    email: "ava@example.com",
    phoneNumber: "+39-06-1234-5678",
    address: "12 Colosseum St",
    city: "Rome",
    state: "Lazio",
    zipCode: "00184",
    country: "Italy",
    profileImage: "https://picsum.photos/200?10",
    isDefault: false,
    isActive: false,
    isDraft: true,
    createdAt: new Date(),
    draftedAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "11",
    code: "C011",
    ownerName: "Ethan Clark",
    vatNumber: "VAT1011",
    email: "ethan@example.com",
    phoneNumber: "+81-3-1234-5678",
    address: "5 Shibuya Crossing",
    city: "Tokyo",
    state: "Tokyo",
    zipCode: "150-0002",
    country: "Japan",
    profileImage: "https://picsum.photos/200?11",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date(),
    draftedAt: null,
    updatedAt: new Date(),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "12",
    code: "C012",
    ownerName: "Mia Anderson",
    vatNumber: "VAT1012",
    email: "mia@example.com",
    phoneNumber: "+55-11-1234-5678",
    address: "123 Paulista Ave",
    city: "São Paulo",
    state: "SP",
    zipCode: "01311-200",
    country: "Brazil",
    profileImage: "https://picsum.photos/200?12",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date(),
    draftedAt: null,
    updatedAt: new Date(),
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

export default function ComponentLevelGridView({
  searchQuery,
  setIsFilterOpen,
  isFilterOpen,
  setIsExportOpen,
  isExportOpen,
}: Props) {
  console.log("grid rendered");

  const navigate = useNavigate();

  const [gridData, setGridData] = useState(propertyOwnerData);
  const canDelete: boolean = usePermission("propertyOwner", "delete");
  const canRestore: boolean = usePermission("propertyOwner", "restore");
  const canEdit: boolean = usePermission("propertyOwner", "edit");

  // Debug permissions
  console.log("propertyOwner Permissions:", {
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

      code: `C00${index + 1}`,
      ownerName: `Owner ${index + 1}`,
      vatNumber: `VAT${index + 1}`,
      email: `owner${index + 1}@example.com`,
      phoneNumber: `+1-202-555-010${index + 1}`,
      address: `123 Main St ${index + 1}`,
      city: `New York ${index + 1}`,
      state: `NY ${index + 1}`,
      zipCode: `10001 ${index + 1}`,
      country: `USA ${index + 1}`,
      profileImage: `https://picsum.photos/200?${index + 1}`,

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
      item.ownerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.vatNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.phoneNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.zipCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.country.toLowerCase().includes(searchQuery.toLowerCase())
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
          Total {gridData.length} Property Owner
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
                    onClick={() => navigate(`/property-owner/1`)}
                  >
                    {item.ownerName}
                  </CardTitle>

                  {/* Right - Status */}
                  <div className="flex items-end flex-col">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Status
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {item.isActive ? "Active" : "Inactive"}
                    </div>
                  </div>
                </div>

                {/* Bottom Row - Grid with 3 columns: Leave Type | Actions | Notes */}
                <div className="grid grid-cols-3 items-center gap-4 pt-2 dark:border-gray-700">
                  {/* Leave Type - Left aligned */}
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Code
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {item.code}
                    </div>
                  </div>

                  {/* Middle - Action Icons */}
                  <div className="flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
                            toastRestore(
                              "Property Owner restored successfully"
                            );
                          } else {
                            if (canDelete) {
                              handleDeleteClick(item.id);
                              toastDelete(
                                "Property Owner deleted successfully"
                              );
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
                          onClick={() => navigate(`/property-owner/edit/1`)}
                        >
                          <FontAwesomeIcon icon={faEdit} className="h-4 w-4" />
                        </div>
                      </Tooltip>
                    )}
                  </div>
                  <div className="text-end">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      VAT Number
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {item.vatNumber}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 items-center gap-4 pt-2 dark:border-gray-700 border-t">
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      City
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {item.city}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      State
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {item.state}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Country
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {item.country}
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
                <span className="text-sm">Loading more property owners...</span>
              </div>
            </div>
          )}

          {/* End of data indicator */}
          {!hasMore && gridData.length > 12 && (
            <div className="flex justify-center items-center py-8">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                No more property owners to load
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
