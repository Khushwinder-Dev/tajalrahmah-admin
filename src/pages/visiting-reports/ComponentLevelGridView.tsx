import { Card, CardTitle } from "@/components/ui/card";
import { usePermission } from "@/hooks/usePermissions";
import { SearchFunction } from "@/lib/SearchFunction";
import { cn, getModuleFromPath } from "@/lib/utils";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  searchableKeys,
  type ModuleFieldsType,
} from "./config/ModuleLevelConfig";
import GridExportComponent from "./GridExportComponent";
import GridFilterComponent from "./GridFilterComponent";

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

const plansData: GridDataType[] = [
  {
    id: "1",
    patientId: "P-2001",
    visitType: "General Checkup",
    visitBy: "Dr. Rahman",
    visitDate: "2025-09-01",
    visitTime: "10:00 AM",
    finding: "Mild fever",
    instructions: "Take paracetamol 500mg",
    fees: "500",
    isDefault: false,
    isActive: true,
    isDraft: false,
    isDeleted: false,
    createdAt: new Date("2025-09-01T09:30:00Z"),
    draftedAt: null,
    updatedAt: new Date("2025-09-01T10:30:00Z"),
    deletedAt: null,
  },
  {
    id: "2",
    patientId: "P-2002",
    visitType: "Dental",
    visitBy: "Dr. Karim",
    visitDate: "2025-09-02",
    visitTime: "11:30 AM",
    finding: "Toothache",
    instructions: "Prescribed antibiotics",
    fees: "800",
    isDefault: false,
    isActive: true,
    isDraft: false,
    isDeleted: false,
    createdAt: new Date("2025-09-02T11:00:00Z"),
    draftedAt: null,
    updatedAt: new Date("2025-09-02T11:45:00Z"),
    deletedAt: null,
  },
  {
    id: "3",
    patientId: "P-2003",
    visitType: "Eye Checkup",
    visitBy: "Dr. Ayesha",
    visitDate: "2025-09-03",
    visitTime: "09:45 AM",
    finding: "Vision blur",
    instructions: "Prescribed glasses",
    fees: "600",
    isDefault: false,
    isActive: true,
    isDraft: false,
    isDeleted: false,
    createdAt: new Date("2025-09-03T09:20:00Z"),
    draftedAt: null,
    updatedAt: new Date("2025-09-03T10:00:00Z"),
    deletedAt: null,
  },
  {
    id: "4",
    patientId: "P-2004",
    visitType: "ENT",
    visitBy: "Dr. Hasan",
    visitDate: "2025-09-04",
    visitTime: "01:00 PM",
    finding: "Ear infection",
    instructions: "Antibiotics & ear drops",
    fees: "700",
    isDefault: false,
    isActive: true,
    isDraft: false,
    isDeleted: false,
    createdAt: new Date("2025-09-04T12:45:00Z"),
    draftedAt: null,
    updatedAt: new Date("2025-09-04T01:30:00Z"),
    deletedAt: null,
  },
  {
    id: "5",
    patientId: "P-2005",
    visitType: "Pediatrics",
    visitBy: "Dr. Jahan",
    visitDate: "2025-09-05",
    visitTime: "02:15 PM",
    finding: "Cold & cough",
    instructions: "Cough syrup & rest",
    fees: "400",
    isDefault: true,
    isActive: true,
    isDraft: false,
    isDeleted: false,
    createdAt: new Date("2025-09-05T02:00:00Z"),
    draftedAt: null,
    updatedAt: new Date("2025-09-05T02:45:00Z"),
    deletedAt: null,
  },
  {
    id: "6",
    patientId: "P-2006",
    visitType: "Orthopedic",
    visitBy: "Dr. Alam",
    visitDate: "2025-09-06",
    visitTime: "03:30 PM",
    finding: "Back pain",
    instructions: "Pain relief & physiotherapy",
    fees: "1000",
    isDefault: false,
    isActive: true,
    isDraft: false,
    isDeleted: false,
    createdAt: new Date("2025-09-06T03:00:00Z"),
    draftedAt: null,
    updatedAt: new Date("2025-09-06T04:00:00Z"),
    deletedAt: null,
  },
  {
    id: "7",
    patientId: "P-2007",
    visitType: "Dermatology",
    visitBy: "Dr. Tahmina",
    visitDate: "2025-09-07",
    visitTime: "10:30 AM",
    finding: "Skin rash",
    instructions: "Topical cream",
    fees: "550",
    isDefault: false,
    isActive: true,
    isDraft: false,
    isDeleted: false,
    createdAt: new Date("2025-09-07T10:00:00Z"),
    draftedAt: null,
    updatedAt: new Date("2025-09-07T11:00:00Z"),
    deletedAt: null,
  },
  {
    id: "8",
    patientId: "P-2008",
    visitType: "Neurology",
    visitBy: "Dr. Kabir",
    visitDate: "2025-09-08",
    visitTime: "12:00 PM",
    finding: "Headache",
    instructions: "MRI recommended",
    fees: "1500",
    isDefault: false,
    isActive: true,
    isDraft: false,
    isDeleted: false,
    createdAt: new Date("2025-09-08T11:45:00Z"),
    draftedAt: null,
    updatedAt: new Date("2025-09-08T12:10:00Z"),
    deletedAt: null,
  },
  {
    id: "9",
    patientId: "P-2009",
    visitType: "General Checkup",
    visitBy: "Dr. Rahman",
    visitDate: "2025-09-09",
    visitTime: "09:15 AM",
    finding: "Routine checkup",
    instructions: "Healthy diet",
    fees: "300",
    isDefault: false,
    isActive: true,
    isDraft: false,
    isDeleted: false,
    createdAt: new Date("2025-09-09T09:00:00Z"),
    draftedAt: null,
    updatedAt: new Date("2025-09-09T09:45:00Z"),
    deletedAt: null,
  },
  {
    id: "10",
    patientId: "P-2010",
    visitType: "Cardiology",
    visitBy: "Dr. Sultana",
    visitDate: "2025-09-10",
    visitTime: "02:45 PM",
    finding: "Chest pain",
    instructions: "ECG & follow up",
    fees: "2000",
    isDefault: false,
    isActive: true,
    isDraft: false,
    isDeleted: false,
    createdAt: new Date("2025-09-10T02:20:00Z"),
    draftedAt: null,
    updatedAt: new Date("2025-09-10T03:00:00Z"),
    deletedAt: null,
  },
  {
    id: "11",
    patientId: "P-2011",
    visitType: "Dental",
    visitBy: "Dr. Karim",
    visitDate: "2025-09-11",
    visitTime: "04:30 PM",
    finding: "Cavity",
    instructions: "Filling required",
    fees: "1200",
    isDefault: false,
    isActive: true,
    isDraft: false,
    isDeleted: true,
    createdAt: new Date("2025-09-11T04:00:00Z"),
    draftedAt: null,
    updatedAt: new Date("2025-09-11T05:00:00Z"),
    deletedAt: new Date("2025-09-12T05:00:00Z"),
  },
  {
    id: "12",
    patientId: "P-2012",
    visitType: "Gynecology",
    visitBy: "Dr. Farzana",
    visitDate: "2025-09-12",
    visitTime: "11:15 AM",
    finding: "Routine checkup",
    instructions: "Vitamin supplements",
    fees: "900",
    isDefault: true,
    isActive: true,
    isDraft: false,
    isDeleted: false,
    createdAt: new Date("2025-09-12T11:00:00Z"),
    draftedAt: null,
    updatedAt: new Date("2025-09-12T11:40:00Z"),
    deletedAt: null,
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
      ...plansData[index],
      id: `${Date.now()}-${index}`,
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
                {/* Top Row - Grid with 2 columns: Title | Status */}
                <div className="grid grid-cols-2 items-center gap-2 mb-4">
                  {/* Left - Title */}
                  <CardTitle
                    className="text-lg font-semibold cursor-pointer hover:text-primary transition-colors truncate"
                    onClick={() => navigate(`${location.pathname}/1`)}
                  >
                    {item.patientId}
                  </CardTitle>

                  <div className="text-end">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Visit By
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {item.visitBy}
                    </div>
                  </div>
                </div>

                {/* Bottom Row - Grid with 3 columns: Leave Type | Actions | Notes */}
                <div className="grid grid-cols-3 items-center gap-4 pt-2 dark:border-gray-700">
                  {/* Leave Type - Left aligned */}
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Visit Date
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {item.visitDate}
                    </div>
                  </div>

                  {/* Middle - Action Icons */}
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Visit Time
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {item.visitTime}
                    </div>
                  </div>

                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Fees
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {item.fees}
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
