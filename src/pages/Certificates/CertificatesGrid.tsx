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
const certificates = [
  {
    id: "1",
    certificateNumber: "CEF-001",
    certificateType: "Basic",
    description:
      "Covers outpatient, inpatient, and emergency services for 3 months.",
    iqamaNo: "IQM-DXB-932847",
    employeeName: "Samiullah Khan",
    employeeDesignation: "Chief Technology Officer",
    employeeBranch: "Dubai",
    isDeleted: false,
  },
  {
    id: "2",
    certificateNumber: "CEF-002",
    certificateType: "Incidental",
    description: "Full life coverage with accidental death benefits.",
    iqamaNo: "IQM-CAN-203948",
    employeeName: "Jonathan Lee",
    employeeDesignation: "Regional Manager",
    employeeBranch: "Toronto",
    isDeleted: false,
  },
  {
    id: "3",
    certificateNumber: "CEF-003",
    certificateType: "Retirement",
    description:
      "Mandatory pension contribution plan for Japan-based employees.",
    iqamaNo: "IQM-JPN-583920",
    employeeName: "Haruto Tanaka",
    employeeDesignation: "Senior Engineer",
    employeeBranch: "Tokyo",
    isDeleted: false,
  },
  {
    id: "4",
    certificateNumber: "CEF-004",
    certificateType: "Pension",
    description:
      "Corporate-funded pension for employees with 5+ years of service.",
    iqamaNo: "IQM-DE-981203",
    employeeName: "Hans Becker",
    employeeDesignation: "Backend Developer",
    employeeBranch: "Berlin",
    isDeleted: false,
  },
  {
    id: "5",
    certificateNumber: "CEF-005",
    certificateType: "Bonus",
    description: "Includes savings on performance bonuses under France law.",
    iqamaNo: "IQM-FR-439204",
    employeeName: "Elise Martin",
    employeeDesignation: "Business Analyst",
    employeeBranch: "Paris",
    isDeleted: false,
  },
  {
    id: "6",
    certificateNumber: "CEF-006",
    certificateType: "Retirement-Medical",
    description:
      "Combined medical and retirement certificates for full-time staff.",
    iqamaNo: "IQM-IT-220194",
    employeeName: "Giulia Rizzo",
    employeeDesignation: "UX Designer",
    employeeBranch: "Rome",
    isDeleted: false,
  },
  {
    id: "7",
    certificateNumber: "CEF-007",
    certificateType: "Adjustment",
    description: "Annual salary-based certificates to adjust for inflation.",
    iqamaNo: "IQM-ES-329194",
    employeeName: "Javier Morales",
    employeeDesignation: "Sales Manager",
    employeeBranch: "Madrid",
    isDeleted: false,
  },
  {
    id: "8",
    certificateNumber: "CEF-008",
    certificateType: "Salary Protection",
    description: "Protects salary during temporary leave or long-term illness.",
    iqamaNo: "IQM-PT-839201",
    employeeName: "Beatriz Silva",
    employeeDesignation: "HR Specialist",
    employeeBranch: "Lisbon",
    isDeleted: false,
  },
  {
    id: "9",
    certificateNumber: "CEF-009",
    certificateType: "Executive Pension",
    description: "High-tier pension certificates for Swiss executives.",
    iqamaNo: "IQM-CH-119394",
    employeeName: "Stefan Huber",
    employeeDesignation: "Finance Director",
    employeeBranch: "Zurich",
    isDeleted: false,
  },
  {
    id: "10",
    certificateNumber: "CEF-010",
    certificateType: "Equity Coverage",
    description: "Certificates covering stock option performance and losses.",
    iqamaNo: "IQM-NL-490123",
    employeeName: "Lisa de Jong",
    employeeDesignation: "Project Lead",
    employeeBranch: "Amsterdam",
    isDeleted: false,
  },
  {
    id: "11",
    certificateNumber: "CEF-011",
    certificateType: "Disability",
    description: "Covers medical leave up to 180 days for injuries or illness.",
    iqamaNo: "IQM-BE-238912",
    employeeName: "Thomas Dupont",
    employeeDesignation: "Technical Support Engineer",
    employeeBranch: "Brussels",
    isDeleted: false,
  },
  {
    id: "12",
    certificateNumber: "CEF-012",
    certificateType: "Executive Coverage",
    description:
      "Life and health certificates with retirement contribution match.",
    iqamaNo: "IQM-UK-998234",
    employeeName: "Charlotte Evans",
    employeeDesignation: "Director of Operations",
    employeeBranch: "London",
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

export default function CertificatesGrid({
  searchQuery,
  setIsFilterOpen,
  isFilterOpen,
  setIsExportOpen,
  isExportOpen,
}: Props) {
  // console.log("Retirement grid rendered");

  const navigate = useNavigate();

  const [certificatesData, setCertificatesData] = useState(certificates);
  const canDelete: boolean = usePermission("certificates", "delete");
  const canRestore: boolean = usePermission("certificates", "restore");
  const canEdit: boolean = usePermission("certificates", "edit");

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
      certificateNumber: `CEF-${certificatesData.length + index + 1}`,
      certificateType: `Certificate Type ${
        certificatesData.length + index + 1
      }`,
      iqamaNo: `IQAMA${certificatesData.length + index + 1}`,
      description: `description for Certificates ${
        certificatesData.length + index + 1
      }`,
      employeeName: `Employee ${certificatesData.length + index + 1}`,
      employeeDesignation: `Designation ${certificatesData.length + index + 1}`,
      employeeBranch: `Branch ${certificatesData.length + index + 1}`,
      isDeleted: false,
    }));

    // Stop loading more after reaching 50 items for demo
    if (certificatesData.length >= 46) {
      setHasMore(false);
    } else {
      setCertificatesData((prev) => [...prev, ...newItems]);
      setPage((prev) => prev + 1);
    }

    setIsLoading(false);
  }, [certificatesData.length, isLoading, hasMore]);

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

  const handleDeleteClick = (certificatesId: string) => {
    setCertificatesData((prevcertificates) =>
      prevcertificates.map((retirement) =>
        retirement.id === certificatesId
          ? {
              ...retirement,
              isDeleted: retirement.isDeleted === true ? false : true,
            }
          : retirement
      )
    );
  };

  const handleRestoreClick = (certificatesId: string) => {
    setCertificatesData((prevcertificates) =>
      prevcertificates.map((retirement) =>
        retirement.id === certificatesId
          ? {
              ...retirement,
              isDeleted: retirement.isDeleted === true ? false : true,
            }
          : retirement
      )
    );
  };

  // Filter certificates based on search query
  const filteredCertificates = certificatesData.filter(
    (retirement) =>
      retirement.certificateNumber
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      retirement.iqamaNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      retirement.description.toLowerCase().includes(searchQuery.toLowerCase())
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
          Total {certificates.length} certificates
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
            {filteredCertificates.map((retirement, index) => (
              <Card
                key={index}
                className="transition-all hover:border-primary/90 hover:shadow-lg hover:translate-y-[-5px] relative group dark:bg-gray-800 p-4 duration-200"
              >
                {/* Top Row - Grid with 3 columns: Title | Icons | Flag */}
                <div className="grid grid-cols-2 items-center gap-2 mb-4">
                  {/* Left - Title */}
                  <CardTitle
                    className="text-lg font-semibold cursor-pointer hover:text-primary transition-colors truncate"
                    onClick={() => navigate(`/certificates/1`)}
                  >
                    {retirement.certificateNumber}
                  </CardTitle>

                  {/* Right - Flag */}
                  {/* <div className="flex justify-end">
                    <img
                      src={`https://flagcdn.com/${country.code.toLowerCase()}.svg`}
                      alt={`${country.name} flag`}
                      className="h-12 w-12 object-cover border rounded-md shadow-sm"
                      onError={(e) => {
                        (
                          e.target as HTMLImageElement
                        ).src = `https://flagcdn.com/us.svg`;
                      }}
                    />
                  </div> */}
                </div>

                {/* Bottom Row - Grid with 2 columns: Code | Currency */}
                <div className="grid grid-cols-3 items-center gap-4 pt-2 dark:border-gray-700">
                  {/* Code - Left aligned */}
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Iqama
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                      {retirement.iqamaNo}
                    </div>
                  </div>

                  {/* Middle - Action Icons */}
                  <div className="flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {/* Delete/Restore */}
                    <Tooltip
                      label={
                        retirement.isDeleted && canRestore
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
                        disabled={retirement.isDeleted && !canRestore}
                        className={`cursor-pointer p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                          retirement.isDeleted
                            ? "text-blue-500"
                            : "text-red-500"
                        }`}
                        onClick={() => {
                          if (canRestore && retirement.isDeleted) {
                            handleRestoreClick(retirement.id);
                            toastRestore("Certificates restored successfully");
                          } else {
                            if (canDelete) {
                              handleDeleteClick(retirement.id);
                              toastDelete("Certificates deleted successfully");
                            }
                          }
                        }}
                      >
                        {retirement.isDeleted && canRestore ? (
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
                          onClick={() => navigate(`/certificates/edit/1`)}
                        >
                          <FontAwesomeIcon icon={faEdit} className="h-4 w-4" />
                        </div>
                      </Tooltip>
                    )}
                  </div>

                  {/* Currency - Right aligned */}
                  <div className="text-right">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Branch
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                      {retirement.employeeBranch}
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
                <span className="text-sm">Loading more certificates...</span>
              </div>
            </div>
          )}

          {/* End of data indicator */}
          {!hasMore && filteredCertificates.length > 12 && (
            <div className="flex justify-center items-center py-8">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                No more certificates to load
              </span>
            </div>
          )}
        </div>

        {/* Filter component - Right side only */}
        {isFilterOpen && (
          <div className="w-80 flex-shrink-0 border-l border-gray-200 dark:border-gray-700 pl-4">
            <div className="h-full flex flex-col">
              <GridFilterComponent
                data={certificates}
                setFilteredData={setCertificatesData}
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
                data={certificates}
                setFilteredData={setCertificatesData}
                setIsExportOpen={setIsExportOpen}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
