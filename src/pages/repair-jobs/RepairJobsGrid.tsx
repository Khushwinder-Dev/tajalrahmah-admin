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
interface RepairJob {
  id: string;
  repairJobId: string;
  repairJobName: string;
  appointmentDate: Date;
  estimatedCompletionDate: Date;
  device: string;
  repairLocation: string;
  billingType: string;
  deliveryType: string;
  appointmentType: string;
  collectionType: string;
  mechanic: string;
  customer: string;
  status: string;
  reference: string;
  discount: number;
  issueDescription: string;
  jobDescription: string;
  additionDescription: string;
  termsCondition: string;
  isActive: boolean;
  isDraft: boolean;
  createdAt: Date;
  draftedAt: Date | null;
  updatedAt: Date;
  deletedAt: Date | null;
  isDeleted: boolean;
}

const repairJobsData: RepairJob[] = [
  {
    id: "1",
    repairJobId: "RJ001",
    repairJobName: "Printer Maintenance Service",
    appointmentDate: new Date("2024-01-15"),
    estimatedCompletionDate: new Date("2024-01-17"),
    device: "HP LaserJet Pro M404dn",
    repairLocation: "Customer Site",
    billingType: "Hourly",
    deliveryType: "On-Site",
    appointmentType: "Scheduled",
    collectionType: "Pickup",
    mechanic: "John Smith",
    customer: "ABC Corporation",
    status: "In Progress",
    reference: "REF001",
    discount: 0,
    issueDescription: "Printer jamming frequently and print quality issues",
    jobDescription: "Complete maintenance and cleaning of printer mechanisms",
    additionDescription: "Replace worn rollers and clean print heads",
    termsCondition: "Standard 30-day warranty on repairs",
    isActive: true,
    isDraft: false,
    createdAt: new Date("2024-01-15"),
    draftedAt: null,
    updatedAt: new Date("2024-01-15"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "2",
    repairJobId: "RJ002",
    repairJobName: "Desktop Computer Upgrade",
    appointmentDate: new Date("2024-01-20"),
    estimatedCompletionDate: new Date("2024-01-22"),
    device: "Dell OptiPlex 7090 MT",
    repairLocation: "Workshop",
    billingType: "Fixed",
    deliveryType: "Drop-off",
    appointmentType: "Walk-in",
    collectionType: "Customer Pickup",
    mechanic: "Sarah Johnson",
    customer: "XYZ Solutions",
    status: "Completed",
    reference: "REF002",
    discount: 50,
    issueDescription: "Slow performance and outdated hardware",
    jobDescription: "RAM and SSD upgrade installation",
    additionDescription: "Install additional 16GB RAM and 1TB SSD",
    termsCondition: "6-month warranty on new components",
    isActive: true,
    isDraft: false,
    createdAt: new Date("2024-01-20"),
    draftedAt: null,
    updatedAt: new Date("2024-01-22"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "3",
    repairJobId: "RJ003",
    repairJobName: "Network Equipment Configuration",
    appointmentDate: new Date("2024-01-25"),
    estimatedCompletionDate: new Date("2024-01-26"),
    device: "Cisco ISR 4331 Router",
    repairLocation: "Customer Site",
    billingType: "Fixed",
    deliveryType: "On-Site",
    appointmentType: "Emergency",
    collectionType: "N/A",
    mechanic: "Mike Wilson",
    customer: "Tech Innovations Ltd",
    status: "Pending",
    reference: "REF003",
    discount: 0,
    issueDescription: "Network connectivity issues and configuration errors",
    jobDescription: "Reconfigure router settings and update firmware",
    additionDescription: "Optimize network security settings",
    termsCondition: "24/7 support for 30 days",
    isActive: true,
    isDraft: false,
    createdAt: new Date("2024-01-25"),
    draftedAt: null,
    updatedAt: new Date("2024-01-25"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "4",
    repairJobId: "RJ004",
    repairJobName: "Monitor Display Repair",
    appointmentDate: new Date("2024-02-01"),
    estimatedCompletionDate: new Date("2024-02-03"),
    device: "Samsung 27CF391 Monitor",
    repairLocation: "Workshop",
    billingType: "Hourly",
    deliveryType: "Drop-off",
    appointmentType: "Scheduled",
    collectionType: "Delivery",
    mechanic: "David Lee",
    customer: "Creative Agency",
    status: "In Progress",
    reference: "REF004",
    discount: 25,
    issueDescription: "Display flickering and color distortion",
    jobDescription: "Replace faulty display panel components",
    additionDescription: "Calibrate color settings and test display quality",
    termsCondition: "90-day warranty on display repairs",
    isActive: true,
    isDraft: false,
    createdAt: new Date("2024-02-01"),
    draftedAt: null,
    updatedAt: new Date("2024-02-01"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "5",
    repairJobId: "RJ005",
    repairJobName: "Laptop Battery Replacement",
    appointmentDate: new Date("2024-02-05"),
    estimatedCompletionDate: new Date("2024-02-06"),
    device: "Lenovo ThinkPad X1 Carbon",
    repairLocation: "Workshop",
    billingType: "Fixed",
    deliveryType: "Drop-off",
    appointmentType: "Scheduled",
    collectionType: "Customer Pickup",
    mechanic: "Lisa Chen",
    customer: "Consulting Group",
    status: "Completed",
    reference: "REF005",
    discount: 0,
    issueDescription: "Battery not holding charge and overheating",
    jobDescription: "Replace laptop battery and thermal management",
    additionDescription: "Clean internal components and update BIOS",
    termsCondition: "1-year warranty on battery replacement",
    isActive: true,
    isDraft: false,
    createdAt: new Date("2024-02-05"),
    draftedAt: null,
    updatedAt: new Date("2024-02-06"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "6",
    repairJobId: "RJ006",
    repairJobName: "Network Switch Configuration",
    appointmentDate: new Date("2024-02-10"),
    estimatedCompletionDate: new Date("2024-02-12"),
    device: "Cisco Catalyst Switch",
    repairLocation: "Customer Site",
    billingType: "Fixed",
    deliveryType: "On-Site",
    appointmentType: "Scheduled",
    collectionType: "N/A",
    mechanic: "Mike Wilson",
    customer: "Tech Innovations Ltd",
    status: "In Progress",
    reference: "REF006",
    discount: 0,
    issueDescription: "Network configuration and VLAN setup",
    jobDescription: "Configure switch ports and VLANs",
    additionDescription: "Test network connectivity",
    termsCondition: "Standard warranty terms apply",
    isActive: true,
    isDraft: false,
    createdAt: new Date("2024-02-10"),
    draftedAt: null,
    updatedAt: new Date("2024-02-12"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "7",
    repairJobId: "RJ007",
    repairJobName: "Server Maintenance",
    appointmentDate: new Date("2024-02-15"),
    estimatedCompletionDate: new Date("2024-02-16"),
    device: "Dell PowerEdge Server",
    repairLocation: "Data Center",
    billingType: "Hourly",
    deliveryType: "On-Site",
    appointmentType: "Emergency",
    collectionType: "N/A",
    mechanic: "David Lee",
    customer: "Data Solutions Inc",
    status: "Completed",
    reference: "REF007",
    discount: 100,
    issueDescription: "Server performance issues",
    jobDescription: "Hardware maintenance and updates",
    additionDescription: "Performance optimization",
    termsCondition: "Extended warranty available",
    isActive: true,
    isDraft: false,
    createdAt: new Date("2024-02-15"),
    draftedAt: null,
    updatedAt: new Date("2024-02-16"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "8",
    repairJobId: "RJ008",
    repairJobName: "Workstation Setup",
    appointmentDate: new Date("2024-02-20"),
    estimatedCompletionDate: new Date("2024-02-21"),
    device: "HP Z2 Workstation",
    repairLocation: "Workshop",
    billingType: "Fixed",
    deliveryType: "Drop-off",
    appointmentType: "Scheduled",
    collectionType: "Delivery",
    mechanic: "Lisa Chen",
    customer: "Design Studio Pro",
    status: "Pending",
    reference: "REF008",
    discount: 0,
    issueDescription: "New workstation setup required",
    jobDescription: "Install OS and software",
    additionDescription: "Data migration from old system",
    termsCondition: "Standard warranty terms apply",
    isActive: true,
    isDraft: false,
    createdAt: new Date("2024-02-20"),
    draftedAt: null,
    updatedAt: new Date("2024-02-20"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "9",
    repairJobId: "RJ009",
    repairJobName: "Security Camera Installation",
    appointmentDate: new Date("2024-02-25"),
    estimatedCompletionDate: new Date("2024-02-26"),
    device: "IP Security Camera System",
    repairLocation: "Customer Site",
    billingType: "Fixed",
    deliveryType: "On-Site",
    appointmentType: "Scheduled",
    collectionType: "N/A",
    mechanic: "John Smith",
    customer: "Security Solutions",
    status: "In Progress",
    reference: "REF009",
    discount: 50,
    issueDescription: "New security system installation",
    jobDescription: "Install cameras and DVR",
    additionDescription: "Configure remote access",
    termsCondition: "2-year warranty on equipment",
    isActive: true,
    isDraft: false,
    createdAt: new Date("2024-02-25"),
    draftedAt: null,
    updatedAt: new Date("2024-02-25"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "10",
    repairJobId: "RJ010",
    repairJobName: "UPS Battery Replacement",
    appointmentDate: new Date("2024-03-01"),
    estimatedCompletionDate: new Date("2024-03-02"),
    device: "APC Smart-UPS",
    repairLocation: "Customer Site",
    billingType: "Fixed",
    deliveryType: "On-Site",
    appointmentType: "Scheduled",
    collectionType: "N/A",
    mechanic: "Sarah Johnson",
    customer: "Office Solutions",
    status: "Completed",
    reference: "REF010",
    discount: 0,
    issueDescription: "UPS battery failure",
    jobDescription: "Replace UPS batteries",
    additionDescription: "Test backup power system",
    termsCondition: "1-year warranty on batteries",
    isActive: true,
    isDraft: false,
    createdAt: new Date("2024-03-01"),
    draftedAt: null,
    updatedAt: new Date("2024-03-02"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "11",
    repairJobId: "RJ011",
    repairJobName: "Wireless Network Setup",
    appointmentDate: new Date("2024-03-05"),
    estimatedCompletionDate: new Date("2024-03-06"),
    device: "Wireless Router System",
    repairLocation: "Customer Site",
    billingType: "Hourly",
    deliveryType: "On-Site",
    appointmentType: "Scheduled",
    collectionType: "N/A",
    mechanic: "Mike Wilson",
    customer: "Small Business Co",
    status: "Pending",
    reference: "REF011",
    discount: 25,
    issueDescription: "New wireless network setup",
    jobDescription: "Install and configure routers",
    additionDescription: "Network security setup",
    termsCondition: "Standard warranty terms apply",
    isActive: true,
    isDraft: false,
    createdAt: new Date("2024-03-05"),
    draftedAt: null,
    updatedAt: new Date("2024-03-05"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "12",
    repairJobId: "RJ012",
    repairJobName: "Printer Network Setup",
    appointmentDate: new Date("2024-03-10"),
    estimatedCompletionDate: new Date("2024-03-11"),
    device: "HP LaserJet Pro",
    repairLocation: "Customer Site",
    billingType: "Fixed",
    deliveryType: "On-Site",
    appointmentType: "Scheduled",
    collectionType: "N/A",
    mechanic: "David Lee",
    customer: "Print Services Ltd",
    status: "In Progress",
    reference: "REF012",
    discount: 0,
    issueDescription: "Network printer configuration",
    jobDescription: "Setup network printing",
    additionDescription: "User access configuration",
    termsCondition: "Standard warranty terms apply",
    isActive: true,
    isDraft: false,
    createdAt: new Date("2024-03-10"),
    draftedAt: null,
    updatedAt: new Date("2024-03-10"),
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

export default function RepairJobsGrid({
  searchQuery,
  setIsFilterOpen,
  isFilterOpen,
  setIsExportOpen,
  isExportOpen,
}: Props) {
  console.log("Repair jobs grid rendered");

  const navigate = useNavigate();

  const [repairJobsDataState, setRepairJobsDataState] =
    useState(repairJobsData);
  const canDelete: boolean = usePermission("repairJobs", "delete");
  const canRestore: boolean = usePermission("repairJobs", "restore");
  const canEdit: boolean = usePermission("repairJobs", "edit");

  // Debug permissions
  console.log("Repair Jobs Permissions:", {
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

    const deviceTypes = [
      "Printer",
      "Desktop Computer",
      "Laptop",
      "Monitor",
      "Router",
      "Switch",
      "Projector",
      "Scanner",
    ];

    const customers = [
      "ABC Corporation",
      "XYZ Solutions",
      "Tech Innovations Ltd",
      "Creative Agency",
      "Consulting Group",
      "Marketing Solutions",
    ];

    const newItems = Array.from({ length: ITEMS_PER_PAGE }, (_, index) => ({
      id: `${Date.now()}-${index}`,
      repairJobId: `RJ${String(Date.now() + index).slice(-3)}`,
      repairJobName: `${
        deviceTypes[Math.floor(Math.random() * deviceTypes.length)]
      } Repair Service`,
      appointmentDate: new Date(
        Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000
      ),
      estimatedCompletionDate: new Date(
        Date.now() + Math.random() * 7 * 24 * 60 * 60 * 1000
      ),
      device: `${
        deviceTypes[Math.floor(Math.random() * deviceTypes.length)]
      } Device`,
      repairLocation: Math.random() > 0.5 ? "Customer Site" : "Workshop",
      billingType: Math.random() > 0.5 ? "Hourly" : "Fixed",
      deliveryType: Math.random() > 0.5 ? "On-Site" : "Drop-off",
      appointmentType: ["Scheduled", "Walk-in", "Emergency"][
        Math.floor(Math.random() * 3)
      ],
      collectionType: ["Pickup", "Delivery", "Customer Pickup", "N/A"][
        Math.floor(Math.random() * 4)
      ],
      mechanic: [
        "John Smith",
        "Sarah Johnson",
        "Mike Wilson",
        "David Lee",
        "Lisa Chen",
      ][Math.floor(Math.random() * 5)],
      customer: customers[Math.floor(Math.random() * customers.length)],
      status: ["Pending", "In Progress", "Completed"][
        Math.floor(Math.random() * 3)
      ],
      reference: `REF${Math.floor(Math.random() * 900000) + 100000}`,
      discount: Math.floor(Math.random() * 100),
      issueDescription: "Sample repair issue description",
      jobDescription: "Sample repair job description",
      additionDescription: "Sample additional work description",
      termsCondition: "Standard warranty terms apply",
      isActive: Math.random() > 0.3,
      isDraft: Math.random() > 0.7,
      createdAt: new Date(),
      draftedAt: null,
      updatedAt: new Date(),
      deletedAt: null,
      isDeleted: false,
    }));

    // Stop loading more after reaching 50 items for demo
    if (repairJobsDataState.length >= 46) {
      setHasMore(false);
    } else {
      setRepairJobsDataState((prev) => [...prev, ...newItems]);
      setPage((prev) => prev + 1);
    }

    setIsLoading(false);
  }, [repairJobsDataState.length, isLoading, hasMore]);

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

  const handleDeleteClick = (repairJobId: string) => {
    setRepairJobsDataState((prevRepairJobs) =>
      prevRepairJobs.map((repairJob) =>
        repairJob.id === repairJobId
          ? {
              ...repairJob,
              isDeleted: repairJob.isDeleted === true ? false : true,
            }
          : repairJob
      )
    );
  };

  const handleRestoreClick = (repairJobId: string) => {
    setRepairJobsDataState((prevRepairJobs) =>
      prevRepairJobs.map((repairJob) =>
        repairJob.id === repairJobId
          ? {
              ...repairJob,
              isDeleted: repairJob.isDeleted === true ? false : true,
            }
          : repairJob
      )
    );
  };

  // Filter repair jobs based on search query
  const filteredRepairJobs = repairJobsDataState.filter(
    (repairJob) =>
      repairJob.repairJobName
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      repairJob.repairJobId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      repairJob.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      repairJob.device.toLowerCase().includes(searchQuery.toLowerCase()) ||
      repairJob.mechanic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      repairJob.status.toLowerCase().includes(searchQuery.toLowerCase())
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
          Total {repairJobsData.length} repair jobs
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
            {filteredRepairJobs.map((repairJob: RepairJob, index: number) => (
              <Card
                key={index}
                className="transition-all hover:border-primary/90 hover:shadow-lg hover:translate-y-[-5px] relative group dark:bg-gray-800 p-4 duration-200"
              >
                {/* Top Row - Grid with 2 columns: Title | Status */}
                <div className="grid grid-cols-2 items-center gap-2 mb-4">
                  {/* Left - Title */}
                  <CardTitle
                    className="text-lg font-semibold cursor-pointer hover:text-primary transition-colors truncate"
                    onClick={() => navigate(`/repair-jobs/1`)}
                  >
                    {repairJob.repairJobName}
                  </CardTitle>

                  {/* Right - Status */}
                  <div className="flex justify-end">
                    <div
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        repairJob.status === "Completed"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          : repairJob.status === "In Progress"
                          ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                          : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                      }`}
                    >
                      {repairJob.status}
                    </div>
                  </div>
                </div>

                {/* Bottom Row - Grid with 3 columns: Repair Job ID | Actions | Customer */}
                <div className="grid grid-cols-3 items-center gap-4 pt-2 dark:border-gray-700">
                  {/* Repair Job ID - Left aligned */}
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 w-max">
                      Job ID
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {repairJob.repairJobId}
                    </div>
                  </div>

                  {/* Middle - Action Icons */}
                  <div className="flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {/* Delete/Restore */}
                    <Tooltip
                      label={
                        repairJob.isDeleted && canRestore
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
                        disabled={repairJob.isDeleted && !canRestore}
                        className={`cursor-pointer p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                          repairJob.isDeleted ? "text-blue-500" : "text-red-500"
                        }`}
                        onClick={() => {
                          if (canRestore && repairJob.isDeleted) {
                            handleRestoreClick(repairJob.id);
                            toastRestore("Repair job restored successfully");
                          } else {
                            if (canDelete) {
                              handleDeleteClick(repairJob.id);
                              toastDelete("Repair job deleted successfully");
                            }
                          }
                        }}
                      >
                        {repairJob.isDeleted && canRestore ? (
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
                          onClick={() => navigate(`/repair-jobs/edit/1`)}
                        >
                          <FontAwesomeIcon icon={faEdit} className="h-4 w-4" />
                        </div>
                      </Tooltip>
                    )}
                  </div>

                  {/* Customer - Right aligned */}
                  <div className="text-right">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Customer
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {repairJob.customer}
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
                <span className="text-sm">Loading more repair jobs...</span>
              </div>
            </div>
          )}

          {/* End of data indicator */}
          {!hasMore && filteredRepairJobs.length > 12 && (
            <div className="flex justify-center items-center py-8">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                No more repair jobs to load
              </span>
            </div>
          )}
        </div>

        {/* Filter component - Right side only */}
        {isFilterOpen && (
          <div className="w-80 flex-shrink-0 border-l border-gray-200 dark:border-gray-700 pl-4">
            <div className="h-full flex flex-col">
              <GridFilterComponent
                data={repairJobsData}
                setFilteredData={setRepairJobsDataState}
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
                data={repairJobsData}
                setFilteredData={setRepairJobsDataState}
                setIsExportOpen={setIsExportOpen}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
