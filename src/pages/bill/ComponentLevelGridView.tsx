import { Card, CardTitle } from "@/components/ui/card";
import { toastDelete, toastRestore } from "@/lib/toast";
import { Tooltip } from "@mantine/core"; // Import Tooltip from Mantine
import { RefreshCw, Trash2 } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn, getModuleFromPath } from "@/lib/utils";
import { useLocation, useNavigate } from "react-router-dom";
import GridExportComponent from "./GridExportComponent";
import GridFilterComponent from "./GridFilterComponent";
import { usePermission } from "@/hooks/usePermissions";
import { SearchFunction } from "@/lib/SearchFunction";
import {
  searchableKeys,
  type ModuleFieldsType,
} from "./config/ModuleLevelConfig";

// do not change
type GridDataType = ModuleFieldsType & {
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

export const plansData: GridDataType[] = [
  {
    id: "1",
    slNo: "1",
    admissionId: "ADM001",
    patientId: "P001",
    billDate: "2025-01-15",
    patientName: "John Smith",
    dateOfBirth: "1985-03-20",
    address: "123 Main St, City",
    sex: "Male",
    doctorName: "Dr. Wilson",
    image: "patient1.jpg",
    admissionDate: "2025-01-10",
    packageName: "Basic Care Package",
    totalDays: "5",
    dischargeDate: "2025-01-15",
    insuranceName: "Health Plus Insurance",
    policyNo: "HP12345",
    serviceName: "Room Charges",
    quantity: "5",
    rate: "200.00",
    subTotal: "1000.00",
    paymentMethod: "Credit Card",
    cardChequeNo: "****1234",
    receiptNo: "RCP001",
    assignDate: "2025-01-10",
    bedNumber: "B101",
    amount: "1500.00",
    notes: "Regular monitoring required",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-01-15"),
    draftedAt: null,
    updatedAt: new Date("2025-01-15"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "2",
    slNo: "2",
    admissionId: "ADM002",
    patientId: "P002",
    billDate: "2025-01-16",
    patientName: "Sarah Johnson",
    dateOfBirth: "1990-07-15",
    address: "456 Oak Ave, Town",
    sex: "Female",
    doctorName: "Dr. Brown",
    image: "patient2.jpg",
    admissionDate: "2025-01-12",
    packageName: "Premium Care Package",
    totalDays: "4",
    dischargeDate: "2025-01-16",
    insuranceName: "MediCare Pro",
    policyNo: "MP67890",
    serviceName: "Surgery",
    quantity: "1",
    rate: "5000.00",
    subTotal: "5000.00",
    paymentMethod: "Insurance",
    cardChequeNo: "INS-2025-001",
    receiptNo: "RCP002",
    assignDate: "2025-01-12",
    bedNumber: "B205",
    amount: "6200.00",
    notes: "Post-surgery care completed",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-01-16"),
    draftedAt: null,
    updatedAt: new Date("2025-01-16"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "3",
    slNo: "3",
    admissionId: "ADM003",
    patientId: "P003",
    billDate: "2025-01-17",
    patientName: "Michael Davis",
    dateOfBirth: "1978-11-30",
    address: "789 Pine St, Village",
    sex: "Male",
    doctorName: "Dr. Taylor",
    image: "patient3.jpg",
    admissionDate: "2025-01-14",
    packageName: "Emergency Package",
    totalDays: "3",
    dischargeDate: "2025-01-17",
    insuranceName: "Life Guard Insurance",
    policyNo: "LG11111",
    serviceName: "Emergency Treatment",
    quantity: "3",
    rate: "800.00",
    subTotal: "2400.00",
    paymentMethod: "Cash",
    cardChequeNo: "CASH",
    receiptNo: "RCP003",
    assignDate: "2025-01-14",
    bedNumber: "B301",
    amount: "2800.00",
    notes: "Emergency treatment successful",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-01-17"),
    draftedAt: null,
    updatedAt: new Date("2025-01-17"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "4",
    slNo: "4",
    admissionId: "ADM004",
    patientId: "P004",
    billDate: "2025-01-18",
    patientName: "Emily Rodriguez",
    dateOfBirth: "1992-12-05",
    address: "321 Elm St, Downtown",
    sex: "Female",
    doctorName: "Dr. Martinez",
    image: "patient4.jpg",
    admissionDate: "2025-01-15",
    packageName: "Surgery Package",
    totalDays: "3",
    dischargeDate: "2025-01-18",
    insuranceName: "Universal Health",
    policyNo: "UH55555",
    serviceName: "Cardiac Surgery",
    quantity: "1",
    rate: "8000.00",
    subTotal: "8000.00",
    paymentMethod: "Insurance",
    cardChequeNo: "INS-2025-002",
    receiptNo: "RCP004",
    assignDate: "2025-01-15",
    bedNumber: "B102",
    amount: "9500.00",
    notes: "Successful cardiac procedure",
    isDefault: false,
    isActive: false,
    isDraft: true,
    createdAt: new Date("2025-01-18"),
    draftedAt: new Date("2025-01-17"),
    updatedAt: new Date("2025-01-18"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "5",
    slNo: "5",
    admissionId: "ADM005",
    patientId: "P005",
    billDate: "2025-01-19",
    patientName: "David Chen",
    dateOfBirth: "1980-08-22",
    address: "654 Maple Ave, Suburbs",
    sex: "Male",
    doctorName: "Dr. Kim",
    image: "patient5.jpg",
    admissionDate: "2025-01-16",
    packageName: "Basic Care Package",
    totalDays: "3",
    dischargeDate: "2025-01-19",
    insuranceName: "Family Care Insurance",
    policyNo: "FC88888",
    serviceName: "Physiotherapy",
    quantity: "6",
    rate: "150.00",
    subTotal: "900.00",
    paymentMethod: "Credit Card",
    cardChequeNo: "****5678",
    receiptNo: "RCP005",
    assignDate: "2025-01-16",
    bedNumber: "B203",
    amount: "1200.00",
    notes: "Physical therapy sessions completed",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-01-19"),
    draftedAt: null,
    updatedAt: new Date("2025-01-19"),
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
  const location = useLocation();

  const detectedModule = getModuleFromPath(location.pathname);

  const [gridData, setGridData] = useState(plansData);
  const canDelete: boolean = usePermission(detectedModule, "delete");
  const canRestore: boolean = usePermission(detectedModule, "restore");
  const canEdit: boolean = usePermission(detectedModule, "edit");

  // Debug permissions
  console.log("Permissions:", {
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
      ...plansData[index % plansData.length],
      id: `${Date.now()}-${index}`,
      slNo: `${gridData.length + index + 1}`,
      admissionId: `ADM${String(gridData.length + index + 1).padStart(3, '0')}`,
      receiptNo: `RCP${String(gridData.length + index + 1).padStart(3, '0')}`,
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

  // filter
  const filteredData = SearchFunction(gridData, searchQuery, searchableKeys);

  // get page name
  const PAGE_NAME = location.pathname.split("/")[1].replace("-", " ");

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
          Total {gridData.length} {PAGE_NAME}
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
                {/* Top Row - Grid with 2 columns: Patient Name | Admission ID */}
                <div className="grid grid-cols-2 items-center gap-2 mb-4">
                  {/* Left - Patient Name */}
                  <CardTitle
                    className="text-lg font-semibold cursor-pointer hover:text-primary transition-colors truncate"
                    onClick={() => navigate(`${location.pathname}/1`)}
                  >
                    {item.patientName}
                  </CardTitle>

                  <div className="text-end">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Admission ID
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {item.admissionId}
                    </div>
                  </div>
                </div>

                {/* Doctor and Amount Row */}
                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                      Doctor
                    </div>
                    <div className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                      {item.doctorName}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                      Total Amount
                    </div>
                    <div className="text-sm font-semibold text-green-600 dark:text-green-400">
                      ${item.amount}
                    </div>
                  </div>
                </div>

                {/* Service and Package Row */}
                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                      Service
                    </div>
                    <div className="text-sm font-semibold text-purple-600 dark:text-purple-400">
                      {item.serviceName}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                      Package
                    </div>
                    <div className="text-sm font-semibold text-orange-600 dark:text-orange-400">
                      {item.packageName}
                    </div>
                  </div>
                </div>

                {/* Bottom Row - Grid with 3 columns: Bed No | Actions | Payment Method */}
                <div className="grid grid-cols-3 items-center gap-4 pt-2 dark:border-gray-700">
                  {/* Bed Number - Left aligned */}
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Bed No
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {item.bedNumber}
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
                            toastRestore(`${PAGE_NAME} restored successfully`);
                          } else {
                            if (canDelete) {
                              handleDeleteClick(item.id);
                              toastDelete(`${PAGE_NAME} deleted successfully`);
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
                          onClick={() =>
                            navigate(`${location.pathname}/edit/1`)
                          }
                        >
                          <FontAwesomeIcon icon={faEdit} className="h-4 w-4" />
                        </div>
                      </Tooltip>
                    )}
                  </div>

                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Payment
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {item.paymentMethod}
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
                <span className="text-sm">Loading more {PAGE_NAME}...</span>
              </div>
            </div>
          )}

          {/* End of data indicator */}
          {!hasMore && gridData.length > 12 && (
            <div className="flex justify-center items-center py-8">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                No more {PAGE_NAME} to load
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
                title={location.pathname.split("/")[1].replace("-", " ")}
                fileName={location.pathname.split("/")[1]}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
