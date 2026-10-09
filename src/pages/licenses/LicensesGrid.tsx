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
const licensesData = [
  {
    id: "1",
    sn: "001",
    softwareName: "Microsoft Office 365",
    category: "Productivity",
    productKey: "XXXX-XXXX-XXXX-XXXX",
    seats: 50,
    manufacturer: "Microsoft Corporation",
    licensedName: "Tech Solutions Inc",
    licensedEmail: "admin@techsolutions.com",
    supplier: "Microsoft Store",
    orderNumber: "ORD-2024-001",
    purchaseOrderNumber: "PO-2024-001",
    purchaseCost: 2500.0,
    purchaseDate: new Date("2024-01-15"),
    expirationDate: new Date("2025-01-15"),
    terminationDate: null,
    depreciation: "25%",
    notes: "Annual subscription for office productivity suite",
    status: "Active",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-20"),
  },
  {
    id: "2",
    sn: "002",
    softwareName: "Adobe Creative Suite",
    category: "Design",
    productKey: "YYYY-YYYY-YYYY-YYYY",
    seats: 25,
    manufacturer: "Adobe Inc",
    licensedName: "Creative Design Studio",
    licensedEmail: "licenses@creativedesign.com",
    supplier: "Adobe Store",
    orderNumber: "ORD-2024-002",
    purchaseOrderNumber: "PO-2024-002",
    purchaseCost: 1800.0,
    purchaseDate: new Date("2024-01-16"),
    expirationDate: new Date("2025-01-16"),
    terminationDate: null,
    depreciation: "20%",
    notes: "Creative design software for design team",
    status: "Active",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-16"),
    updatedAt: new Date("2024-01-21"),
  },
  {
    id: "3",
    sn: "003",
    softwareName: "AutoCAD Professional",
    category: "Engineering",
    productKey: "ZZZZ-ZZZZ-ZZZZ-ZZZZ",
    seats: 15,
    manufacturer: "Autodesk Inc",
    licensedName: "Engineering Corp",
    licensedEmail: "licenses@engineeringcorp.com",
    supplier: "Autodesk Store",
    orderNumber: "ORD-2024-003",
    purchaseOrderNumber: "PO-2024-003",
    purchaseCost: 3200.0,
    purchaseDate: new Date("2024-01-17"),
    expirationDate: new Date("2025-01-17"),
    terminationDate: null,
    depreciation: "30%",
    notes: "CAD software for engineering team",
    status: "Active",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-17"),
    updatedAt: new Date("2024-01-22"),
  },
  {
    id: "4",
    sn: "004",
    softwareName: "QuickBooks Enterprise",
    category: "Accounting",
    productKey: "AAAA-AAAA-AAAA-AAAA",
    seats: 10,
    manufacturer: "Intuit Inc",
    licensedName: "Finance Corp",
    licensedEmail: "licenses@financecorp.com",
    supplier: "Intuit Store",
    orderNumber: "ORD-2024-004",
    purchaseOrderNumber: "PO-2024-004",
    purchaseCost: 1500.0,
    purchaseDate: new Date("2024-01-18"),
    expirationDate: new Date("2025-01-18"),
    terminationDate: null,
    depreciation: "15%",
    notes: "Accounting software for finance team",
    status: "Inactive",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-18"),
    updatedAt: new Date("2024-01-23"),
  },
  {
    id: "5",
    sn: "005",
    softwareName: "VMware Workstation Pro",
    category: "Virtualization",
    productKey: "BBBB-BBBB-BBBB-BBBB",
    seats: 20,
    manufacturer: "VMware Inc",
    licensedName: "IT Solutions",
    licensedEmail: "licenses@itsolutions.com",
    supplier: "VMware Store",
    orderNumber: "ORD-2024-005",
    purchaseOrderNumber: "PO-2024-005",
    purchaseCost: 1200.0,
    purchaseDate: new Date("2024-01-19"),
    expirationDate: new Date("2025-01-19"),
    terminationDate: null,
    depreciation: "18%",
    notes: "Virtualization software for development team",
    status: "Active",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-19"),
    updatedAt: new Date("2024-01-24"),
  },
  {
    id: "6",
    sn: "006",
    softwareName: "Tableau Desktop",
    category: "Analytics",
    productKey: "CCCC-CCCC-CCCC-CCCC",
    seats: 12,
    manufacturer: "Salesforce Inc",
    licensedName: "Data Analytics Corp",
    licensedEmail: "licenses@dataanalytics.com",
    supplier: "Tableau Store",
    orderNumber: "ORD-2024-006",
    purchaseOrderNumber: "PO-2024-006",
    purchaseCost: 2100.0,
    purchaseDate: new Date("2024-01-20"),
    expirationDate: new Date("2025-01-20"),
    terminationDate: null,
    depreciation: "22%",
    notes: "Data visualization software for analytics team",
    status: "Active",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-20"),
    updatedAt: new Date("2024-01-25"),
  },
  {
    id: "7",
    sn: "007",
    softwareName: "SolidWorks Premium",
    category: "Engineering",
    productKey: "DDDD-DDDD-DDDD-DDDD",
    seats: 8,
    manufacturer: "Dassault Systèmes",
    licensedName: "Manufacturing Inc",
    licensedEmail: "licenses@manufacturing.com",
    supplier: "SolidWorks Store",
    orderNumber: "ORD-2024-007",
    purchaseOrderNumber: "PO-2024-007",
    purchaseCost: 4500.0,
    purchaseDate: new Date("2024-01-21"),
    expirationDate: new Date("2025-01-21"),
    terminationDate: null,
    depreciation: "35%",
    notes: "3D CAD software for manufacturing team",
    status: "Inactive",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-21"),
    updatedAt: new Date("2024-01-26"),
  },
  {
    id: "8",
    sn: "008",
    softwareName: "SAP Business One",
    category: "ERP",
    productKey: "EEEE-EEEE-EEEE-EEEE",
    seats: 30,
    manufacturer: "SAP SE",
    licensedName: "Enterprise Corp",
    licensedEmail: "licenses@enterprisecorp.com",
    supplier: "SAP Store",
    orderNumber: "ORD-2024-008",
    purchaseOrderNumber: "PO-2024-008",
    purchaseCost: 8500.0,
    purchaseDate: new Date("2024-01-22"),
    expirationDate: new Date("2025-01-22"),
    terminationDate: null,
    depreciation: "40%",
    notes: "ERP software for business operations",
    status: "Active",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-22"),
    updatedAt: new Date("2024-01-27"),
  },
  {
    id: "9",
    sn: "009",
    softwareName: "GitHub Enterprise",
    category: "Development",
    productKey: "FFFF-FFFF-FFFF-FFFF",
    seats: 40,
    manufacturer: "Microsoft Corporation",
    licensedName: "Software Dev Inc",
    licensedEmail: "licenses@softwaredev.com",
    supplier: "GitHub Store",
    orderNumber: "ORD-2024-009",
    purchaseOrderNumber: "PO-2024-009",
    purchaseCost: 2800.0,
    purchaseDate: new Date("2024-01-23"),
    expirationDate: new Date("2025-01-23"),
    terminationDate: null,
    depreciation: "25%",
    notes: "Version control platform for development team",
    status: "Active",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-23"),
    updatedAt: new Date("2024-01-28"),
  },
  {
    id: "10",
    sn: "010",
    softwareName: "Cisco AnyConnect",
    category: "Security",
    productKey: "GGGG-GGGG-GGGG-GGGG",
    seats: 100,
    manufacturer: "Cisco Systems",
    licensedName: "Network Security Corp",
    licensedEmail: "licenses@networksecurity.com",
    supplier: "Cisco Store",
    orderNumber: "ORD-2024-010",
    purchaseOrderNumber: "PO-2024-010",
    purchaseCost: 1800.0,
    purchaseDate: new Date("2024-01-24"),
    expirationDate: new Date("2025-01-24"),
    terminationDate: null,
    depreciation: "20%",
    notes: "VPN client for remote access security",
    status: "Active",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-24"),
    updatedAt: new Date("2024-01-29"),
  },
  {
    id: "11",
    sn: "011",
    softwareName: "Slack Enterprise",
    category: "Communication",
    productKey: "HHHH-HHHH-HHHH-HHHH",
    seats: 75,
    manufacturer: "Salesforce Inc",
    licensedName: "Communication Corp",
    licensedEmail: "licenses@communicationcorp.com",
    supplier: "Slack Store",
    orderNumber: "ORD-2024-011",
    purchaseOrderNumber: "PO-2024-011",
    purchaseCost: 1200.0,
    purchaseDate: new Date("2024-01-25"),
    expirationDate: new Date("2025-01-25"),
    terminationDate: null,
    depreciation: "15%",
    notes: "Team collaboration platform",
    status: "Active",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-25"),
    updatedAt: new Date("2024-01-30"),
  },
  {
    id: "12",
    sn: "012",
    softwareName: "Jira Software",
    category: "Project Management",
    productKey: "IIII-IIII-IIII-IIII",
    seats: 35,
    manufacturer: "Atlassian Corporation",
    licensedName: "Project Management Inc",
    licensedEmail: "licenses@projectmanagement.com",
    supplier: "Atlassian Store",
    orderNumber: "ORD-2024-012",
    purchaseOrderNumber: "PO-2024-012",
    purchaseCost: 1600.0,
    purchaseDate: new Date("2024-01-26"),
    expirationDate: new Date("2025-01-26"),
    terminationDate: null,
    depreciation: "18%",
    notes: "Project management software for development teams",
    status: "Active",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-26"),
    updatedAt: new Date("2024-01-31"),
  },
];

type Props = {
  searchQuery: string;
  setIsFilterOpen: (isFilterOpen: boolean) => void;
  isFilterOpen: boolean;
  setIsExportOpen: (isExportOpen: boolean) => void;
  isExportOpen: boolean;
};

export default function LicensesGrid({
  searchQuery,
  setIsFilterOpen,
  isFilterOpen,
  setIsExportOpen,
  isExportOpen,
}: Props) {
  console.log("Licenses grid rendered");

  const navigate = useNavigate();

  const [licensesDataState, setLicensesDataState] = useState(licensesData);
  const canDelete: boolean = usePermission("licenses", "delete");
  const canRestore: boolean = usePermission("licenses", "restore");
  const canEdit: boolean = usePermission("licenses", "edit");

  // Debug permissions
  console.log("Licenses Permissions:", {
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

    const softwareNames = [
      "Microsoft Office 365",
      "Adobe Creative Suite",
      "AutoCAD Professional",
      "QuickBooks Enterprise",
      "VMware Workstation Pro",
      "Tableau Desktop",
      "SolidWorks Premium",
      "SAP Business One",
      "GitHub Enterprise",
      "Cisco AnyConnect",
      "Slack Enterprise",
      "Jira Software",
    ];
    const categories = [
      "Productivity",
      "Design",
      "Engineering",
      "Accounting",
      "Virtualization",
      "Analytics",
      "ERP",
      "Development",
      "Security",
      "Communication",
      "Project Management",
    ];
    const manufacturers = [
      "Microsoft Corporation",
      "Adobe Inc",
      "Autodesk Inc",
      "Intuit Inc",
      "VMware Inc",
      "Salesforce Inc",
      "Dassault Systèmes",
      "SAP SE",
      "Cisco Systems",
      "Atlassian Corporation",
    ];
    const statuses = ["Active", "Inactive"];

    const newItems = Array.from({ length: ITEMS_PER_PAGE }, (_, index) => ({
      id: `${Date.now()}-${index}`,
      sn: `${String(licensesDataState.length + index + 1).padStart(3, "0")}`,
      softwareName:
        softwareNames[Math.floor(Math.random() * softwareNames.length)],
      category: categories[Math.floor(Math.random() * categories.length)],
      productKey: `XXXX-XXXX-XXXX-${String(index + 1).padStart(4, "0")}`,
      seats: Math.floor(Math.random() * 100) + 1,
      manufacturer:
        manufacturers[Math.floor(Math.random() * manufacturers.length)],
      licensedName: "New Company Inc",
      licensedEmail: "licenses@newcompany.com",
      supplier: "Software Store",
      orderNumber: `ORD-${Date.now()}-${index + 1}`,
      purchaseOrderNumber: `PO-${Date.now()}-${index + 1}`,
      purchaseCost: Math.floor(Math.random() * 5000) + 500,
      purchaseDate: new Date(),
      expirationDate: new Date(
        Date.now() + Math.random() * 365 * 24 * 60 * 60 * 1000
      ),
      terminationDate: null,
      depreciation: `${Math.floor(Math.random() * 40) + 10}%`,
      notes: "New software license for company use",
      status: statuses[Math.floor(Math.random() * statuses.length)],
      isActive: Math.random() > 0.3,
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    // Stop loading more after reaching 50 items for demo
    if (licensesDataState.length >= 46) {
      setHasMore(false);
    } else {
      setLicensesDataState((prev) => [...prev, ...newItems]);
      setPage((prev) => prev + 1);
    }

    setIsLoading(false);
  }, [licensesDataState.length, isLoading, hasMore]);

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

  const handleDeleteClick = (licenseId: string) => {
    setLicensesDataState((prevLicenses) =>
      prevLicenses.map((license) =>
        license.id === licenseId
          ? {
              ...license,
              isDeleted: license.isDeleted === true ? false : true,
            }
          : license
      )
    );
  };

  const handleRestoreClick = (licenseId: string) => {
    setLicensesDataState((prevLicenses) =>
      prevLicenses.map((license) =>
        license.id === licenseId
          ? {
              ...license,
              isDeleted: license.isDeleted === true ? false : true,
            }
          : license
      )
    );
  };

  // Filter license records based on search query
  const filteredLicenses = licensesDataState.filter(
    (license) =>
      license.sn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      license.softwareName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      license.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      license.manufacturer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      license.licensedName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      license.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "Inactive":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

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
          Total {licensesData.length} license records
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
            {filteredLicenses.map((license, index) => (
              <Card
                key={index}
                className="transition-all hover:border-primary/90 hover:shadow-lg hover:translate-y-[-5px] relative group dark:bg-gray-800 p-4 duration-200"
              >
                {/* Top Row - Grid with 2 columns: Title | Status */}
                <div className="grid grid-cols-2 items-center gap-2 mb-4">
                  {/* Left - Title */}
                  <CardTitle
                    className="text-lg font-semibold cursor-pointer hover:text-primary transition-colors truncate"
                    onClick={() => navigate(`/licenses/1`)}
                  >
                    {license.softwareName}
                  </CardTitle>

                  {/* Right - Status */}
                  <div className="flex justify-end gap-2">
                    <div
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        license.status
                      )}`}
                    >
                      {license.status}
                    </div>
                  </div>
                </div>

                {/* Bottom Row - Grid with 3 columns: SN | Actions | Expiration Date */}
                <div className="grid grid-cols-3 items-center gap-4 pt-2 dark:border-gray-700">
                  {/* S.N */}
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 w-max">
                      S.N
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {license.sn}
                    </div>
                  </div>

                  {/* Middle - Action Icons */}
                  <div className="flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {/* Delete/Restore */}
                    <Tooltip
                      label={
                        license.isDeleted && canRestore
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
                        disabled={license.isDeleted && !canRestore}
                        className={`cursor-pointer p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                          license.isDeleted ? "text-blue-500" : "text-red-500"
                        }`}
                        onClick={() => {
                          if (canRestore && license.isDeleted) {
                            handleRestoreClick(license.id);
                            toastRestore("License restored successfully");
                          } else {
                            if (canDelete) {
                              handleDeleteClick(license.id);
                              toastDelete("License deleted successfully");
                            }
                          }
                        }}
                      >
                        {license.isDeleted && canRestore ? (
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
                          onClick={() => navigate(`/licenses/edit/1`)}
                        >
                          <FontAwesomeIcon icon={faEdit} className="h-4 w-4" />
                        </div>
                      </Tooltip>
                    )}
                  </div>

                  {/* Expiration Date */}
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 w-max">
                      Expiration Date
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {license.expirationDate.toLocaleDateString()}
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
                <span className="text-sm">Loading more licenses...</span>
              </div>
            </div>
          )}

          {/* End of data indicator */}
          {!hasMore && filteredLicenses.length > 12 && (
            <div className="flex justify-center items-center py-8">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                No more licenses to load
              </span>
            </div>
          )}
        </div>

        {/* Filter component - Right side only */}
        {isFilterOpen && (
          <div className="w-80 flex-shrink-0 border-l border-gray-200 dark:border-gray-700 pl-4">
            <div className="h-full flex flex-col">
              <GridFilterComponent
                data={licensesData}
                setFilteredData={setLicensesDataState}
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
                data={licensesData}
                setFilteredData={setLicensesDataState}
                setIsExportOpen={setIsExportOpen}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
