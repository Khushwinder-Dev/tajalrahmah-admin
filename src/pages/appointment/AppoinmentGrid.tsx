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
const appointmentData = [
  {
    id: "1",
    name: "John Smith",
    mobile: "+1 555-0123",
    email: "john.smith@email.com",
    appointmentDate: new Date("2024-01-15"),
    appointmentTime: "09:00 AM",
    appointmentBy: "Dr. Sarah Johnson",
    isActive: true,
    isDeleted: false,
  },
  {
    id: "2",
    name: "Emily Davis",
    mobile: "+1 555-0124",
    email: "emily.davis@email.com",
    appointmentDate: new Date("2024-01-16"),
    appointmentTime: "10:30 AM",
    appointmentBy: "Dr. Michael Chen",
    isActive: true,
    isDeleted: false,
  },
  {
    id: "3",
    name: "Robert Wilson",
    mobile: "+1 555-0125",
    email: "robert.wilson@email.com",
    appointmentDate: new Date("2024-01-17"),
    appointmentTime: "02:15 PM",
    appointmentBy: "Dr. Lisa Rodriguez",
    isActive: true,
    isDeleted: false,
  },
  {
    id: "4",
    name: "Maria Garcia",
    mobile: "+1 555-0126",
    email: "maria.garcia@email.com",
    appointmentDate: new Date("2024-01-18"),
    appointmentTime: "11:45 AM",
    appointmentBy: "Dr. David Thompson",
    isActive: true,
    isDeleted: false,
  },
  {
    id: "5",
    name: "James Brown",
    mobile: "+1 555-0127",
    email: "james.brown@email.com",
    appointmentDate: new Date("2024-01-19"),
    appointmentTime: "03:30 PM",
    appointmentBy: "Dr. Sarah Johnson",
    isActive: true,
    isDeleted: false,
  },
  {
    id: "6",
    name: "Jennifer Lee",
    mobile: "+1 555-0128",
    email: "jennifer.lee@email.com",
    appointmentDate: new Date("2024-01-20"),
    appointmentTime: "09:15 AM",
    appointmentBy: "Dr. Michael Chen",
    isActive: true,
    isDeleted: false,
  },
  {
    id: "7",
    name: "Christopher Taylor",
    mobile: "+1 555-0129",
    email: "christopher.taylor@email.com",
    appointmentDate: new Date("2024-01-21"),
    appointmentTime: "01:00 PM",
    appointmentBy: "Dr. Lisa Rodriguez",
    isActive: true,
    isDeleted: false,
  },
  {
    id: "8",
    name: "Amanda Martinez",
    mobile: "+1 555-0130",
    email: "amanda.martinez@email.com",
    appointmentDate: new Date("2024-01-22"),
    appointmentTime: "04:45 PM",
    appointmentBy: "Dr. David Thompson",
    isActive: true,
    isDeleted: false,
  },
  {
    id: "9",
    name: "Daniel Anderson",
    mobile: "+1 555-0131",
    email: "daniel.anderson@email.com",
    appointmentDate: new Date("2024-01-23"),
    appointmentTime: "10:00 AM",
    appointmentBy: "Dr. Sarah Johnson",
    isActive: true,
    isDeleted: false,
  },
  {
    id: "10",
    name: "Jessica White",
    mobile: "+1 555-0132",
    email: "jessica.white@email.com",
    appointmentDate: new Date("2024-01-24"),
    appointmentTime: "02:30 PM",
    appointmentBy: "Dr. Michael Chen",
    isActive: true,
    isDeleted: false,
  },
  {
    id: "11",
    name: "Matthew Harris",
    mobile: "+1 555-0133",
    email: "matthew.harris@email.com",
    appointmentDate: new Date("2024-01-25"),
    appointmentTime: "11:00 AM",
    appointmentBy: "Dr. Lisa Rodriguez",
    isActive: true,
    isDeleted: false,
  },
  {
    id: "12",
    name: "Nicole Clark",
    mobile: "+1 555-0134",
    email: "nicole.clark@email.com",
    appointmentDate: new Date("2024-01-26"),
    appointmentTime: "03:15 PM",
    appointmentBy: "Dr. David Thompson",
    isActive: true,
    isDeleted: false,
  },
];

type Appointment = {
  id: string;
  name: string;
  mobile: string;
  email: string;
  appointmentDate: Date;
  appointmentTime: string;
  appointmentBy: string;
  isActive: boolean;
  isDeleted: boolean;
};

type Props = {
  searchQuery: string;
  setIsFilterOpen: (isFilterOpen: boolean) => void;
  isFilterOpen: boolean;
  setIsExportOpen: (isExportOpen: boolean) => void;
  isExportOpen: boolean;
};

export default function AppointmentGrid({
  searchQuery,
  setIsFilterOpen,
  isFilterOpen,
  setIsExportOpen,
  isExportOpen,
}: Props) {
  console.log("Appointment grid rendered");

  const navigate = useNavigate();

  const [appointmentDataState, setAppointmentDataState] =
    useState<Appointment[]>(appointmentData);
  const canDelete: boolean = usePermission("appointments", "delete");
  const canRestore: boolean = usePermission("appointments", "restore");
  const canEdit: boolean = usePermission("appointments", "edit");

  // Debug permissions
  console.log("Appointment Permissions:", {
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

    const names = [
      "Alex Johnson",
      "Sarah Williams",
      "Michael Brown",
      "Emma Davis",
      "David Wilson",
      "Lisa Anderson",
    ];

    const doctors = [
      "Dr. Sarah Johnson",
      "Dr. Michael Chen",
      "Dr. Lisa Rodriguez",
      "Dr. David Thompson",
    ];

    const newItems = Array.from({ length: ITEMS_PER_PAGE }, (_, index) => ({
      id: `${Date.now()}-${index}`,
      name: names[Math.floor(Math.random() * names.length)],
      mobile: `+1 555-${String(Math.floor(Math.random() * 9000) + 1000)}`,
      email: `appointment${Date.now()}${index}@email.com`,
      appointmentDate: new Date(),
      appointmentTime: `${Math.floor(Math.random() * 12) + 1}:${
        Math.random() > 0.5 ? "00" : "30"
      } ${Math.random() > 0.5 ? "AM" : "PM"}`,
      appointmentBy: doctors[Math.floor(Math.random() * doctors.length)],
      isActive: Math.random() > 0.3,
      isDeleted: false,
    }));

    // Stop loading more after reaching 50 items for demo
    if (appointmentDataState.length >= 46) {
      setHasMore(false);
    } else {
      setAppointmentDataState((prev: Appointment[]) => [...prev, ...newItems]);
      setPage((prev) => prev + 1);
    }

    setIsLoading(false);
  }, [appointmentDataState.length, isLoading, hasMore]);

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

  const handleDeleteClick = (appointmentId: string) => {
    setAppointmentDataState((prevAppointments: Appointment[]) =>
      prevAppointments.map((appointment: Appointment) =>
        appointment.id === appointmentId
          ? {
              ...appointment,
              isDeleted: appointment.isDeleted === true ? false : true,
            }
          : appointment
      )
    );
  };

  const handleRestoreClick = (appointmentId: string) => {
    setAppointmentDataState((prevAppointments: Appointment[]) =>
      prevAppointments.map((appointment: Appointment) =>
        appointment.id === appointmentId
          ? {
              ...appointment,
              isDeleted: appointment.isDeleted === true ? false : true,
            }
          : appointment
      )
    );
  };

  // Filter appointments based on search query
  const filteredAppointments = appointmentDataState.filter(
    (appointment: Appointment) =>
      appointment.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appointment.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appointment.appointmentBy
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
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
          Total {appointmentData.length} appointments
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
            {filteredAppointments.map(
              (appointment: Appointment, index: number) => (
                <Card
                  key={index}
                  className="transition-all hover:border-primary/90 hover:shadow-lg hover:translate-y-[-5px] relative group dark:bg-gray-800 p-4 duration-200"
                >
                  {/* Top Row - Grid with 2 columns: Name | Status */}
                  <div className="grid grid-cols-2 items-center gap-2 mb-4">
                    {/* Left - Name */}
                    <CardTitle
                      className="text-lg font-semibold cursor-pointer hover:text-primary transition-colors truncate"
                      onClick={() => navigate(`/appointment/1`)}
                    >
                      {appointment.name}
                    </CardTitle>

                    {/* Right - Status */}
                    <div className="flex justify-end">
                      <div
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          appointment.isActive
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                            : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                        }`}
                      >
                        {appointment.isActive ? "Active" : "Inactive"}
                      </div>
                    </div>
                  </div>

                  {/* Bottom Row - Grid with 3 columns: Mobile | Actions | Email */}
                  <div className="grid grid-cols-3 items-center gap-4 pt-2 dark:border-gray-700">
                    {/* Mobile - Left aligned */}
                    <div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        Mobile
                      </div>
                      <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                        {appointment.mobile}
                      </div>
                    </div>

                    {/* Middle - Action Icons */}
                    <div className="flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {/* Delete/Restore */}
                      <Tooltip
                        label={
                          appointment.isDeleted && canRestore
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
                          disabled={appointment.isDeleted && !canRestore}
                          className={`cursor-pointer p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                            appointment.isDeleted
                              ? "text-blue-500"
                              : "text-red-500"
                          }`}
                          onClick={() => {
                            if (canRestore && appointment.isDeleted) {
                              handleRestoreClick(appointment.id);
                              toastRestore("Appointment restored successfully");
                            } else {
                              if (canDelete) {
                                handleDeleteClick(appointment.id);
                                toastDelete("Appointment deleted successfully");
                              }
                            }
                          }}
                        >
                          {appointment.isDeleted && canRestore ? (
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
                            onClick={() => navigate(`/appointment/edit/1`)}
                          >
                            <FontAwesomeIcon
                              icon={faEdit}
                              className="h-4 w-4"
                            />
                          </div>
                        </Tooltip>
                      )}
                    </div>

                    {/* Email - Right aligned */}
                    <div className="text-right">
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        Email
                      </div>
                      <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                        {appointment.email}
                      </div>
                    </div>
                  </div>
                </Card>
              )
            )}
          </div>

          {/* Loading indicator */}
          {isLoading && (
            <div className="flex justify-center items-center py-8">
              <div className="flex items-center gap-2 text-blue-600">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                <span className="text-sm">Loading more leaves...</span>
              </div>
            </div>
          )}

          {/* End of data indicator */}
          {!hasMore && filteredAppointments.length > 12 && (
            <div className="flex justify-center items-center py-8">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                No more appointments to load
              </span>
            </div>
          )}
        </div>

        {/* Filter component - Right side only */}
        {isFilterOpen && (
          <div className="w-80 flex-shrink-0 border-l border-gray-200 dark:border-gray-700 pl-4">
            <div className="h-full flex flex-col">
              <GridFilterComponent
                data={appointmentData}
                setFilteredData={setAppointmentDataState}
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
                data={appointmentData}
                setFilteredData={setAppointmentDataState}
                setIsExportOpen={setIsExportOpen}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
