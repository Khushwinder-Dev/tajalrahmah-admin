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
const agentData = [
  {
    id: "1",
    agentCode: "AG001",
    agentName: "Al-Rashid Shipping Agency",
    country: "Saudi Arabia",
    notification: "Email & SMS",
    portType: "Commercial",
    portName: "Jeddah Islamic Port",
    address: "Jeddah, Makkah Province",
    landmark: "Near King Abdulaziz International Airport",
    contact: "Ahmed Al-Rashid",
    mobileNo: "+966-50-123-4567",
    phoneNo: "+966-12-123-4567",
    faxNo: "+966-12-123-4568",
    email: "info@alrashid-shipping.sa",
    website: "www.alrashid-shipping.sa",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-20"),
  },
  {
    id: "2",
    agentCode: "AG002",
    agentName: "Al-Zahrani Maritime Services",
    country: "Saudi Arabia",
    notification: "Email",
    portType: "Commercial",
    portName: "King Abdulaziz Port",
    address: "Dammam, Eastern Province",
    landmark: "Near King Fahd International Airport",
    contact: "Mohammed Al-Zahrani",
    mobileNo: "+966-50-234-5678",
    phoneNo: "+966-13-234-5678",
    faxNo: "+966-13-234-5679",
    email: "info@alzahrani-maritime.sa",
    website: "www.alzahrani-maritime.sa",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-16"),
    updatedAt: new Date("2024-01-21"),
  },
  {
    id: "3",
    agentCode: "AG003",
    agentName: "Al-Otaibi Port Agency",
    country: "Saudi Arabia",
    notification: "SMS & WhatsApp",
    portType: "Industrial",
    portName: "Yanbu Commercial Port",
    address: "Yanbu, Al Madinah Province",
    landmark: "Near Yanbu Industrial City",
    contact: "Khalid Al-Otaibi",
    mobileNo: "+966-50-345-6789",
    phoneNo: "+966-14-345-6789",
    faxNo: "+966-14-345-6790",
    email: "info@alotaibi-port.sa",
    website: "www.alotaibi-port.sa",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-17"),
    updatedAt: new Date("2024-01-22"),
  },
  {
    id: "4",
    agentCode: "AG004",
    agentName: "Al-Shehri Maritime Solutions",
    country: "Saudi Arabia",
    notification: "Email",
    portType: "Industrial",
    portName: "Jubail Commercial Port",
    address: "Jubail, Eastern Province",
    landmark: "Near Jubail Industrial City",
    contact: "Omar Al-Shehri",
    mobileNo: "+966-50-456-7890",
    phoneNo: "+966-13-456-7890",
    faxNo: "+966-13-456-7891",
    email: "info@alshehri-maritime.sa",
    website: "www.alshehri-maritime.sa",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-18"),
    updatedAt: new Date("2024-01-23"),
  },
  {
    id: "5",
    agentCode: "AG005",
    agentName: "Al-Ghamdi Port Services",
    country: "Saudi Arabia",
    notification: "SMS",
    portType: "Commercial",
    portName: "Rabigh Port",
    address: "Rabigh, Makkah Province",
    landmark: "Near King Abdullah Economic City",
    contact: "Salman Al-Ghamdi",
    mobileNo: "+966-50-567-8901",
    phoneNo: "+966-12-567-8901",
    faxNo: "+966-12-567-8902",
    email: "info@alghamdi-port.sa",
    website: "www.alghamdi-port.sa",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-19"),
    updatedAt: new Date("2024-01-24"),
  },
  {
    id: "6",
    agentCode: "AG006",
    agentName: "Al-Harbi Maritime Agency",
    country: "Saudi Arabia",
    notification: "Email & SMS",
    portType: "Commercial",
    portName: "Jizan Port",
    address: "Jizan, Jizan Province",
    landmark: "Near Jizan Economic City",
    contact: "Abdullah Al-Harbi",
    mobileNo: "+966-50-678-9012",
    phoneNo: "+966-17-678-9012",
    faxNo: "+966-17-678-9013",
    email: "info@alharbi-maritime.sa",
    website: "www.alharbi-maritime.sa",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-20"),
    updatedAt: new Date("2024-01-25"),
  },
  {
    id: "7",
    agentCode: "AG007",
    agentName: "Al-Maktoum Shipping",
    country: "UAE",
    notification: "Email",
    portType: "Commercial",
    portName: "Dubai Port",
    address: "Dubai, Dubai Emirate",
    landmark: "Near Dubai Creek",
    contact: "Ali Al-Maktoum",
    mobileNo: "+971-50-789-0123",
    phoneNo: "+971-4-789-0123",
    faxNo: "+971-4-789-0124",
    email: "info@almaktoum-shipping.ae",
    website: "www.almaktoum-shipping.ae",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-21"),
    updatedAt: new Date("2024-01-26"),
  },
  {
    id: "8",
    agentCode: "AG008",
    agentName: "Al-Nahyan Maritime",
    country: "UAE",
    notification: "SMS & WhatsApp",
    portType: "Commercial",
    portName: "Abu Dhabi Port",
    address: "Abu Dhabi, Abu Dhabi Emirate",
    landmark: "Near Mina Zayed",
    contact: "Fatima Al-Nahyan",
    mobileNo: "+971-50-890-1234",
    phoneNo: "+971-2-890-1234",
    faxNo: "+971-2-890-1235",
    email: "info@alnahyan-maritime.ae",
    website: "www.alnahyan-maritime.ae",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-22"),
    updatedAt: new Date("2024-01-27"),
  },
  {
    id: "9",
    agentCode: "AG009",
    agentName: "Al-Qasimi Port Agency",
    country: "UAE",
    notification: "Email",
    portType: "Commercial",
    portName: "Sharjah Port",
    address: "Sharjah, Sharjah Emirate",
    landmark: "Near Khalid Port",
    contact: "Hassan Al-Qasimi",
    mobileNo: "+971-50-901-2345",
    phoneNo: "+971-6-901-2345",
    faxNo: "+971-6-901-2346",
    email: "info@alqasimi-port.ae",
    website: "www.alqasimi-port.ae",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-23"),
    updatedAt: new Date("2024-01-28"),
  },
  {
    id: "10",
    agentCode: "AG010",
    agentName: "Al-Sharqi Maritime",
    country: "UAE",
    notification: "SMS",
    portType: "Commercial",
    portName: "Fujairah Port",
    address: "Fujairah, Fujairah Emirate",
    landmark: "Near Fujairah Free Zone",
    contact: "Rashid Al-Sharqi",
    mobileNo: "+971-50-012-3456",
    phoneNo: "+971-9-012-3456",
    faxNo: "+971-9-012-3457",
    email: "info@alsharqi-maritime.ae",
    website: "www.alsharqi-maritime.ae",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-24"),
    updatedAt: new Date("2024-01-29"),
  },
  {
    id: "11",
    agentCode: "AG011",
    agentName: "Al-Sabah Shipping",
    country: "Kuwait",
    notification: "Email & SMS",
    portType: "Commercial",
    portName: "Kuwait Port",
    address: "Kuwait City, Kuwait",
    landmark: "Near Shuwaikh Port",
    contact: "Nasser Al-Sabah",
    mobileNo: "+965-50-123-4567",
    phoneNo: "+965-1-123-4567",
    faxNo: "+965-1-123-4568",
    email: "info@alsabah-shipping.kw",
    website: "www.alsabah-shipping.kw",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-25"),
    updatedAt: new Date("2024-01-30"),
  },
  {
    id: "12",
    agentCode: "AG012",
    agentName: "Al-Khalifa Maritime",
    country: "Bahrain",
    notification: "Email",
    portType: "Commercial",
    portName: "Bahrain Port",
    address: "Manama, Bahrain",
    landmark: "Near Khalifa Bin Salman Port",
    contact: "Khalid Al-Khalifa",
    mobileNo: "+973-50-234-5678",
    phoneNo: "+973-17-234-5678",
    faxNo: "+973-17-234-5679",
    email: "info@alkhalifa-maritime.bh",
    website: "www.alkhalifa-maritime.bh",
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

export default function AgentMasterGrid({
  searchQuery,
  setIsFilterOpen,
  isFilterOpen,
  setIsExportOpen,
  isExportOpen,
}: Props) {
  console.log("Agent Master grid rendered");

  const navigate = useNavigate();

  const [agentDataState, setAgentDataState] = useState(agentData);
  const canDelete: boolean = usePermission("agentMaster", "delete");
  const canRestore: boolean = usePermission("agentMaster", "restore");
  const canEdit: boolean = usePermission("agentMaster", "edit");

  // Debug permissions
  console.log("Agent Master Permissions:", {
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

    const agentCodes = ["AG013", "AG014", "AG015", "AG016", "AG017", "AG018"];
    const agentNames = [
      "Al-Thani Shipping Agency",
      "Al-Said Maritime Services",
      "Al-Hashemi Port Agency",
      "Aoun Maritime Solutions",
      "El-Sisi Shipping",
      "Al-Kadhimi Maritime",
    ];
    const notifications = [
      "Email",
      "SMS",
      "Email & SMS",
      "WhatsApp",
      "SMS & WhatsApp",
    ];
    const portTypes = ["Commercial", "Industrial", "Fishing", "Tourism"];
    const countries = ["Qatar", "Oman", "Jordan", "Lebanon", "Egypt", "Iraq"];
    const contacts = [
      "Hamad Al-Thani",
      "Sultan Al-Said",
      "Abdullah Al-Hashemi",
      "Michel Aoun",
      "Ahmed El-Sisi",
      "Mustafa Al-Kadhimi",
    ];

    const newItems = Array.from({ length: ITEMS_PER_PAGE }, (_, index) => ({
      id: `${Date.now()}-${index}`,
      agentCode: agentCodes[Math.floor(Math.random() * agentCodes.length)],
      agentName: agentNames[Math.floor(Math.random() * agentNames.length)],
      country: countries[Math.floor(Math.random() * countries.length)],
      notification:
        notifications[Math.floor(Math.random() * notifications.length)],
      portType: portTypes[Math.floor(Math.random() * portTypes.length)],
      portName: "Port Name",
      address: "Agent Address",
      landmark: "Agent Landmark",
      contact: contacts[Math.floor(Math.random() * contacts.length)],
      mobileNo: "+966-50-000-0000",
      phoneNo: "+966-12-000-0000",
      faxNo: "+966-12-000-0001",
      email: "info@agent.com",
      website: "www.agent.com",
      isActive: Math.random() > 0.3,
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    // Stop loading more after reaching 50 items for demo
    if (agentDataState.length >= 46) {
      setHasMore(false);
    } else {
      setAgentDataState((prev) => [...prev, ...newItems]);
      setPage((prev) => prev + 1);
    }

    setIsLoading(false);
  }, [agentDataState.length, isLoading, hasMore]);

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

  const handleDeleteClick = (agentId: string) => {
    setAgentDataState((prevAgents) =>
      prevAgents.map((agent) =>
        agent.id === agentId
          ? {
              ...agent,
              isDeleted: agent.isDeleted === true ? false : true,
            }
          : agent
      )
    );
  };

  const handleRestoreClick = (agentId: string) => {
    setAgentDataState((prevAgents) =>
      prevAgents.map((agent) =>
        agent.id === agentId
          ? {
              ...agent,
              isDeleted: agent.isDeleted === true ? false : true,
            }
          : agent
      )
    );
  };

  // Filter agent records based on search query
  const filteredAgents = agentDataState.filter(
    (agent) =>
      agent.agentCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.agentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.portType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.contact.toLowerCase().includes(searchQuery.toLowerCase())
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
          Total {agentData.length} agent records
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
            {filteredAgents.map((agent, index) => (
              <Card
                key={index}
                className="transition-all hover:border-primary/90 hover:shadow-lg hover:translate-y-[-5px] relative group dark:bg-gray-800 p-4 duration-200"
              >
                {/* Top Row - Grid with 2 columns: Title | Status */}
                <div className="grid grid-cols-2 items-center gap-2 mb-4">
                  {/* Left - Title */}
                  <CardTitle
                    className="text-lg font-semibold cursor-pointer hover:text-primary transition-colors truncate"
                    onClick={() => navigate(`/agent-master/1`)}
                  >
                    {agent.agentName}
                  </CardTitle>

                  {/* Right - Status */}
                  <div className="flex justify-end">
                    <div
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        agent.isActive
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                      }`}
                    >
                      {agent.isActive ? "Active" : "Inactive"}
                    </div>
                  </div>
                </div>

                {/* Bottom Row - Grid with 3 columns: Agent Code | Actions | Country */}
                <div className="grid grid-cols-3 items-center gap-4 pt-2 dark:border-gray-700">
                  {/* Agent Code - Left aligned */}
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 w-max">
                      Agent Code
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {agent.agentCode}
                    </div>
                  </div>

                  {/* Middle - Action Icons */}
                  <div className="flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {/* Delete/Restore */}
                    <Tooltip
                      label={
                        agent.isDeleted && canRestore
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
                        disabled={agent.isDeleted && !canRestore}
                        className={`cursor-pointer p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                          agent.isDeleted ? "text-blue-500" : "text-red-500"
                        }`}
                        onClick={() => {
                          if (canRestore && agent.isDeleted) {
                            handleRestoreClick(agent.id);
                            toastRestore("Agent record restored successfully");
                          } else {
                            if (canDelete) {
                              handleDeleteClick(agent.id);
                              toastDelete("Agent record deleted successfully");
                            }
                          }
                        }}
                      >
                        {agent.isDeleted && canRestore ? (
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
                          onClick={() => navigate(`/agent-master/edit/1`)}
                        >
                          <FontAwesomeIcon icon={faEdit} className="h-4 w-4" />
                        </div>
                      </Tooltip>
                    )}
                  </div>

                  {/* Country - Right aligned */}
                  <div className="text-right">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Country
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {agent.country}
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
                <span className="text-sm">Loading more agent records...</span>
              </div>
            </div>
          )}

          {/* End of data indicator */}
          {!hasMore && filteredAgents.length > 12 && (
            <div className="flex justify-center items-center py-8">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                No more agent records to load
              </span>
            </div>
          )}
        </div>

        {/* Filter component - Right side only */}
        {isFilterOpen && (
          <div className="w-80 flex-shrink-0 border-l border-gray-200 dark:border-gray-700 pl-4">
            <div className="h-full flex flex-col">
              <GridFilterComponent
                data={agentData}
                setFilteredData={setAgentDataState}
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
                data={agentData}
                setFilteredData={setAgentDataState}
                setIsExportOpen={setIsExportOpen}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
