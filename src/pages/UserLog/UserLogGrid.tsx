import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { toastDelete, toastRestore } from "@/lib/toast";
import { Tooltip } from "@mantine/core"; // Import Tooltip from Mantine
import { RefreshCw, Trash2 } from "lucide-react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
// import { useNavigate } from "react-router-dom";
import GridExportComponent from "./GridExportComponent";
import GridFilterComponent from "./GridFilterComponent";
import { usePermission } from "@/hooks/usePermissions";
// import { id } from "date-fns/locale";

// Mock data - replace with real data from your API
const MokData = [
  {
    id: 1,
    user: "Allen Wang",
    time: "2023-01-10 09:15",
    mobile: "+1-202-555-0147",
    email: "allen.wang@example.com",
    city: "New York",
    country: "USA",
    status: "active",
    isDeleted: false,
  },
  {
    id: 2,
    user: "Bob Alice",
    time: "2023-01-11 14:20",
    mobile: "+1-202-555-0199",
    email: "bob.alice@example.com",
    city: "Los Angeles",
    country: "USA",
    status: "inactive",
    isDeleted: false,
  },
  {
    id: 3,
    user: "Michael Smith",
    time: "2023-01-12 11:00",
    mobile: "+1-305-555-2233",
    email: "m.smith@americargo.com",
    city: "Miami",
    country: "USA",
    status: "draft",
    isDeleted: false,
  },
  {
    id: 4,
    user: "James Brown",
    time: "2023-01-13 10:45",
    mobile: "+44-20-7946-1234",
    email: "j.brown@britannia.com",
    city: "London",
    country: "UK",
    status: "active",
    isDeleted: false,
  },
  {
    id: 5,
    user: "Hans Müller",
    time: "2023-01-14 16:10",
    mobile: "+49-30-1234567",
    email: "h.mueller@deutsche.com",
    city: "Berlin",
    country: "Germany",
    status: "active",
    isDeleted: false,
  },
  {
    id: 6,
    user: "Sophie Laurent",
    time: "2023-01-15 09:30",
    mobile: "+33-1-23456789",
    email: "s.laurent@parislogistics.fr",
    city: "Paris",
    country: "France",
    status: "active",
    isDeleted: false,
  },
  {
    id: 7,
    user: "Oliver Wilson",
    time: "2023-01-16 12:25",
    mobile: "+61-2-98765432",
    email: "o.wilson@aussiecargo.com.au",
    city: "Sydney",
    country: "Australia",
    status: "active",
    isDeleted: false,
  },
  {
    id: 8,
    user: "Thabo Nkosi",
    time: "2023-01-17 10:05",
    mobile: "+27-21-4567890",
    email: "t.nkosi@capetowncargo.co.za",
    city: "Cape Town",
    country: "South Africa",
    status: "active",
    isDeleted: false,
  },
  {
    id: 9,
    user: "Carlos Silva",
    time: "2023-01-18 11:40",
    mobile: "+55-11-987654321",
    email: "c.silva@brasilfreight.com.br",
    city: "São Paulo",
    country: "Brazil",
    status: "active",
    isDeleted: false,
  },
  {
    id: 10,
    user: "Diego Fernández",
    time: "2023-01-19 13:15",
    mobile: "+54-11-45678900",
    email: "d.fernandez@buenoscargo.com.ar",
    city: "Buenos Aires",
    country: "Argentina",
    status: "active",
    isDeleted: false,
  },
  {
    id: 11,
    user: "Luis Martinez",
    time: "2023-01-20 15:50",
    mobile: "+52-55-12345678",
    email: "l.martinez@mexitran.com.mx",
    city: "Mexico City",
    country: "Mexico",
    status: "active",
    isDeleted: false,
  },
  {
    id: 12,
    user: "Amit Sharma",
    time: "2023-01-21 09:10",
    mobile: "+91-9876543210",
    email: "amit.sharma@bharatcargo.in",
    city: "Delhi",
    country: "India",
    status: "active",
    isDeleted: false,
  },
  {
    id: 13,
    user: "Li Wei",
    time: "2023-01-22 14:35",
    mobile: "+86-10-87654321",
    email: "li.wei@dragonexpress.cn",
    city: "Shanghai",
    country: "China",
    status: "active",
    isDeleted: false,
  },
  {
    id: 14,
    user: "Hiroshi Tanaka",
    time: "2023-01-23 11:25",
    mobile: "+81-3-12345678",
    email: "h.tanaka@nipponfreight.jp",
    city: "Tokyo",
    country: "Japan",
    status: "active",
    isDeleted: false,
  },
  {
    id: 15,
    user: "Ivan Petrov",
    time: "2023-01-24 16:45",
    mobile: "+7-495-1234567",
    email: "i.petrov@moscocargo.ru",
    city: "Moscow",
    country: "Russia",
    status: "active",
    isDeleted: false,
  },
  {
    id: 16,
    user: "Kim Min-Jun",
    time: "2023-01-25 10:55",
    mobile: "+82-2-12345678",
    email: "minjun.kim@seoullogistics.kr",
    city: "Seoul",
    country: "South Korea",
    status: "active",
    isDeleted: false,
  },
  {
    id: 17,
    user: "Mehmet Kaya",
    time: "2023-01-26 09:40",
    mobile: "+90-212-1234567",
    email: "mehmet.kaya@ankarafreight.tr",
    city: "Ankara",
    country: "Turkey",
    status: "active",
    isDeleted: false,
  },
  {
    id: 18,
    user: "Abdullah Al-Saud",
    time: "2023-01-27 14:05",
    mobile: "+966-11-1234567",
    email: "abdullah.alsaud@riyadhcargo.sa",
    city: "Riyadh",
    country: "Saudi Arabia",
    status: "active",
    isDeleted: false,
  },
  {
    id: 19,
    user: "Omar Hassan",
    time: "2023-01-28 12:50",
    mobile: "+20-2-98765432",
    email: "omar.hassan@cairologistics.eg",
    city: "Cairo",
    country: "Egypt",
    status: "active",
    isDeleted: false,
  },
  {
    id: 20,
    user: "Chinedu Okafor",
    time: "2023-01-29 11:15",
    mobile: "+234-1-7654321",
    email: "c.okafor@lagostransport.ng",
    city: "Lagos",
    country: "Nigeria",
    status: "active",
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

export default function UserLogGrid({
  searchQuery,
  setIsFilterOpen,
  isFilterOpen,
  setIsExportOpen,
  isExportOpen,
}: Props) {
  // console.log("Countries grid rendered");

  // const navigate = useNavigate();

  const [user, setUser] = useState(MokData);
  const canDelete: boolean = usePermission("userLog", "delete");
  const canRestore: boolean = usePermission("userLog", "restore");
  // const canEdit: boolean = usePermission("userLog", "edit");

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
      id: user.length + index + 1,
      user: `User ${user.length + index + 1}`,
      time: new Date().toLocaleString(),
      mobile: "+1-202-555-0147",
      email: `user${user.length + index + 1}@example.com`,
      city: "New York",
      country: "United States",
      status: ["active", "inactive", "draft"][Math.floor(Math.random() * 3)],
      isDeleted: false,
    }));

    if (user.length >= 50) {
      setHasMore(false);
    } else {
      setUser((prev) => [...prev, ...newItems]);
      setPage((prev) => prev + 1);
    }

    setIsLoading(false);
  }, [user.length, isLoading, hasMore]);

  const handleScroll = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const { scrollTop, scrollHeight, clientHeight } = container;
    const threshold = 100;

    if (scrollHeight - scrollTop <= clientHeight + threshold) {
      loadMoreData();
    }
  }, [loadMoreData]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const handleDeleteClick = (id: number | string) => {
    setUser((prevuser) =>
      prevuser.map((user) =>
        user.id === id ? { ...user, isDeleted: !user.isDeleted } : user
      )
    );
  };

  const handleRestoreClick = (id: number | string) => {
    setUser((prevuser) =>
      prevuser.map((user) =>
        user.id === id ? { ...user, isDeleted: false } : user
      )
    );
  };

  const filteredUser = user.filter(
    (rent) =>
      rent.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rent.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rent.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rent.mobile.toLowerCase().includes(searchQuery.toLowerCase())
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
          Total {filteredUser?.length} User Logs
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
            {filteredUser.map((rent, index) => (
              <Card
                key={index}
                className="transition-all hover:border-primary/90 hover:shadow-lg hover:translate-y-[-5px] relative group dark:bg-gray-800 p-4 duration-200"
              >
                {/* Top Row - Grid with 3 columns: Title | Icons | Flag */}
                <div className="grid grid-cols-2 items-center gap-2 mb-4">
                  {/* Left - Title */}
                  <CardTitle
                    className="text-lg font-semibold cursor-pointer hover:text-primary transition-colors truncate"
                    // onClick={() => navigate(`/supplier-master/1`)}
                  >
                    {rent.user}
                  </CardTitle>

                  <div className="flex items-center justify-end">
                    <div className="inline-block rounded-full px-3 py-1 text-xs font-semibold capitalize bg-purple-200 text-purple-800">
                      {rent.id}
                    </div>
                  </div>
                </div>

                {/* Middle Row */}

                {/* <CardDescription>{rent.contactPerson}</CardDescription> */}

                {/* Bottom Row - Grid with 2 columns: Code | Currency */}
                <div className="grid grid-cols-3 items-center gap-4 pt-2 dark:border-gray-700">
                  {/* Code - Left aligned */}
                  <CardDescription>{rent.email}</CardDescription>
                  {/* Middle - Action Icons */}
                  <div className="flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {/* Delete/Restore */}
                    <Tooltip
                      label={
                        rent.isDeleted && canRestore
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
                        disabled={rent.isDeleted && !canRestore}
                        className={`cursor-pointer p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                          rent.isDeleted ? "text-blue-500" : "text-red-500"
                        }`}
                        onClick={() => {
                          if (canRestore && rent.isDeleted) {
                            handleRestoreClick(rent.id);
                            toastRestore("user restored successfully");
                          } else {
                            if (canDelete) {
                              handleDeleteClick(rent.id);
                              toastDelete("user deleted successfully");
                            }
                          }
                        }}
                      >
                        {rent.isDeleted && canRestore ? (
                          <RefreshCw className="h-4 w-4" />
                        ) : (
                          canDelete && <Trash2 className="h-4 w-4" />
                        )}
                      </button>
                    </Tooltip>

                    {/* Edit */}
                    {/* {canEdit && (
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
                          onClick={() => navigate(`/user-log/edit/1`)}
                        >
                          <FontAwesomeIcon icon={faEdit} className="h-4 w-4" />
                        </div>
                      </Tooltip>
                    )} */}
                  </div>

                  {/* Right - stats section */}
                  <div className="flex justify-end">
                    <div
                      className={cn(
                        "inline-block rounded-full px-3 py-1 text-xs font-semibold capitalize",
                        {
                          "bg-green-100 text-green-800":
                            rent.status === "active",
                          "bg-yellow-100 text-yellow-800":
                            rent.status === "draft",
                          "bg-red-100 text-red-800": rent.status === "inactive",
                          "bg-gray-200 text-gray-800": ![
                            "active",
                            "draft",
                            "inactive",
                          ].includes(rent.status),
                        }
                      )}
                    >
                      {rent.status}
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
                <span className="text-sm">Loading more countries...</span>
              </div>
            </div>
          )}

          {/* End of data indicator */}
          {!hasMore && filteredUser.length > 12 && (
            <div className="flex justify-center items-center py-8">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                No more countries to load
              </span>
            </div>
          )}
        </div>

        {/* Filter component - Right side only */}
        {isFilterOpen && (
          <div className="w-80 flex-shrink-0 border-l border-gray-200 dark:border-gray-700 pl-4">
            <div className="h-full flex flex-col">
              <GridFilterComponent
                data={user}
                setFilteredData={setUser}
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
                data={user}
                setFilteredData={setUser}
                setIsExportOpen={setIsExportOpen}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
