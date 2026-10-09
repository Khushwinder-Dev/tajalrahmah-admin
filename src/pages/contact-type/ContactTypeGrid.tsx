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
const contactTypesData = [
  {
    id: "1",
    name: "Customer",
    description: "End user who purchases goods or services.",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-20"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "2",
    name: "Supplier",
    description: "Company that supplies inventory items.",
    createdAt: new Date("2024-01-16"),
    updatedAt: new Date("2024-01-21"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "3",
    name: "Partner",
    description: "Business partner for joint ventures.",
    createdAt: new Date("2024-01-17"),
    updatedAt: new Date("2024-01-22"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "4",
    name: "Employee",
    description: "Internal staff member contact type.",
    createdAt: new Date("2024-01-18"),
    updatedAt: new Date("2024-01-25"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "5",
    name: "Distributor",
    description: "External distributor of products.",
    createdAt: new Date("2024-01-19"),
    updatedAt: new Date("2024-01-24"),
    deletedAt: new Date("2024-02-01"),
    isDeleted: true,
  },
  {
    id: "6",
    name: "Agent",
    description: "Sales agent or representative.",
    createdAt: new Date("2024-01-20"),
    updatedAt: new Date("2024-01-25"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "7",
    name: "Vendor",
    description: "Third-party vendor providing services.",
    createdAt: new Date("2024-01-21"),
    updatedAt: new Date("2024-01-26"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "8",
    name: "Consultant",
    description: "External consultant working on projects.",
    createdAt: new Date("2024-01-22"),
    updatedAt: new Date("2024-01-27"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "9",
    name: "Franchisee",
    description: "Franchise business operator.",
    createdAt: new Date("2024-01-23"),
    updatedAt: new Date("2024-01-28"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "10",
    name: "Investor",
    description: "Stakeholder with financial investment.",
    createdAt: new Date("2024-01-24"),
    updatedAt: new Date("2024-01-29"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "11",
    name: "Auditor",
    description: "External or internal auditor contact.",
    createdAt: new Date("2024-01-25"),
    updatedAt: new Date("2024-01-30"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "12",
    name: "Tenant",
    description: "Renter of company assets or space.",
    createdAt: new Date("2024-01-26"),
    updatedAt: new Date("2024-01-31"),
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

export default function ContactTypeGrid({
  searchQuery,
  setIsFilterOpen,
  isFilterOpen,
  setIsExportOpen,
  isExportOpen,
}: Props) {
  console.log("Contact Type grid rendered");

  const navigate = useNavigate();

  const [contactTypesState, setContactTypesState] = useState(contactTypesData);
  const canDelete: boolean = usePermission("contactType", "delete");
  const canRestore: boolean = usePermission("contactType", "restore");
  const canEdit: boolean = usePermission("contactType", "edit");

  // Debug permissions
  console.log("Contact Type Permissions:", {
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

    const typeNames = [
      "Customer",
      "Supplier",
      "Partner",
      "Employee",
      "Distributor",
      "Agent",
      "Vendor",
      "Consultant",
      "Franchisee",
      "Investor",
      "Auditor",
      "Tenant",
    ];
    const descriptions = [
      "General business contact",
      "Provides goods or services",
      "Collaborates on projects",
      "Internal organization member",
      "Distributes inventory to outlets",
      "Represents sales activities",
      "Delivers specialized services",
      "Advises on domain expertise",
      "Operates under brand license",
      "Financial stakeholder",
      "Conducts audits and reviews",
      "Rents assets or locations",
    ];

    const newItems = Array.from({ length: ITEMS_PER_PAGE }, (_, index) => {
      const name = typeNames[Math.floor(Math.random() * typeNames.length)];
      const description =
        descriptions[Math.floor(Math.random() * descriptions.length)];
      return {
        id: `${Date.now()}-${index}`,
        name,
        description,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
        isDeleted: Math.random() > 0.85, // small chance of deleted
      };
    });

    // Stop loading more after reaching 50 items for demo
    if (contactTypesState.length >= 46) {
      setHasMore(false);
    } else {
      setContactTypesState((prev) => [...prev, ...newItems]);
      setPage((prev) => prev + 1);
    }

    setIsLoading(false);
  }, [contactTypesState.length, isLoading, hasMore]);

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

  const handleDeleteClick = (contactTypeId: string) => {
    setContactTypesState((prev) =>
      prev.map((ct) =>
        ct.id === contactTypeId
          ? {
              ...ct,
              isDeleted: ct.isDeleted === true ? false : true,
            }
          : ct
      )
    );
  };

  const handleRestoreClick = (contactTypeId: string) => {
    setContactTypesState((prev) =>
      prev.map((ct) =>
        ct.id === contactTypeId
          ? {
              ...ct,
              isDeleted: ct.isDeleted === true ? false : true,
            }
          : ct
      )
    );
  };

  // Filter interviews based on search query
  const filteredContactTypes = contactTypesState.filter((t) => {
    const q = searchQuery.toLowerCase();
    return (
      t.name.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q)
    );
  });

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
          Total {contactTypesData.length} contact types
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
            {filteredContactTypes.map((contactType, index) => (
              <Card
                key={index}
                className="transition-all hover:border-primary/90 hover:shadow-lg hover:translate-y-[-5px] relative group dark:bg-gray-800 p-4 duration-200"
              >
                {/* Top Row - Grid with 2 columns: Title | Status */}
                <div className="grid grid-cols-2 items-center gap-2 mb-4">
                  {/* Left - Title */}
                  <CardTitle
                    className="text-lg font-semibold cursor-pointer hover:text-primary transition-colors truncate"
                    onClick={() => navigate(`/contact-type/${contactType.id}`)}
                  >
                    {contactType.name}
                  </CardTitle>

                  {/* Right - Status */}
                  <div className="flex justify-end">
                    <div
                      className={`px-2 py-1 rounded-full text-[10px] 2xl:text-xs font-medium ${
                        !contactType.isDeleted
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                      }`}
                    >
                      {!contactType.isDeleted ? "Active" : "Deleted"}
                    </div>
                  </div>
                </div>

                {/* Bottom Row - Grid with 3 columns: Description | Actions | Created */}
                <div className="grid grid-cols-3 items-center gap-4 pt-2 dark:border-gray-700">
                  {/* Description - Left aligned */}
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Description
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {contactType.description}
                    </div>
                  </div>

                  {/* Middle - Action Icons */}
                  <div className="flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {/* Delete/Restore */}
                    <Tooltip
                      label={
                        contactType.isDeleted && canRestore
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
                        disabled={contactType.isDeleted && !canRestore}
                        className={`cursor-pointer p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                          contactType.isDeleted
                            ? "text-blue-500"
                            : "text-red-500"
                        }`}
                        onClick={() => {
                          if (canRestore && contactType.isDeleted) {
                            handleRestoreClick(contactType.id);
                            toastRestore("Contact Type restored successfully");
                          } else {
                            if (canDelete) {
                              handleDeleteClick(contactType.id);
                              toastDelete("Contact Type deleted successfully");
                            }
                          }
                        }}
                      >
                        {contactType.isDeleted && canRestore ? (
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
                          onClick={() =>
                            navigate(`/contact-type/edit/${contactType.id}`)
                          }
                        >
                          <FontAwesomeIcon icon={faEdit} className="h-4 w-4" />
                        </div>
                      </Tooltip>
                    )}
                  </div>

                  {/* Created - Right aligned */}
                  <div className="text-right">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Created
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {new Date(contactType.createdAt).toLocaleDateString()}
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
                <span className="text-sm">Loading more contact types...</span>
              </div>
            </div>
          )}

          {/* End of data indicator */}
          {!hasMore && filteredContactTypes.length > 12 && (
            <div className="flex justify-center items-center py-8">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                No more contact types to load
              </span>
            </div>
          )}
        </div>

        {/* Filter component - Right side only */}
        {isFilterOpen && (
          <div className="w-80 flex-shrink-0 border-l border-gray-200 dark:border-gray-700 pl-4">
            <div className="h-full flex flex-col">
              <GridFilterComponent
                data={contactTypesData}
                setFilteredData={setContactTypesState}
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
                data={contactTypesData}
                setFilteredData={setContactTypesState}
                setIsExportOpen={setIsExportOpen}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
