import { Card, CardTitle } from "@/components/ui/card";
// import { toastDelete, toastRestore } from "@/lib/toast";
// import { Tooltip } from "@mantine/core";
// import { RefreshCw, Trash2, Check, Pause } from "lucide-react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import {
  Mail,
  Phone,
  Facebook,
  Linkedin,
  Instagram,
  Shield,
  User,
  Crown,
} from "lucide-react";
// import GridExportComponent from "./GridExportComponent";
import GridFilterComponent from "./GridFilterComponent";
import useIsMobile from "@/hooks/useIsMobile";

// import { usePermission } from "@/hooks/usePermissions";

// User interface
interface User {
  id: string;
  name: string;
  mobileNumber: string;
  email: string;
  userType: "admin" | "super admin" | "user";
  password: string;
  confirmPassword: string;
  otp?: string;
  facebook?: string;
  linkedin?: string;
  instagram?: string;
}

// Mock data - replace with real data from your API
const users: User[] = [
  {
    id: "1",
    name: "John Doe",
    mobileNumber: "+1234567890",
    email: "john.doe@example.com",
    userType: "admin",
    password: "********",
    confirmPassword: "********",
    otp: "123456",
    facebook: "john.doe.fb",
    linkedin: "john-doe-linkedin",
    instagram: "john_doe_insta",
  },
  {
    id: "2",
    name: "Jane Smith",
    mobileNumber: "+1234567891",
    email: "jane.smith@example.com",
    userType: "super admin",
    password: "********",
    confirmPassword: "********",
    facebook: "jane.smith.fb",
    linkedin: "jane-smith-linkedin",
  },
  {
    id: "3",
    name: "Michael Johnson",
    mobileNumber: "+1234567892",
    email: "michael.johnson@example.com",
    userType: "user",
    password: "********",
    confirmPassword: "********",
    instagram: "michael_johnson_insta",
  },
  {
    id: "4",
    name: "Emily Davis",
    mobileNumber: "+1234567893",
    email: "emily.davis@example.com",
    userType: "admin",
    password: "********",
    confirmPassword: "********",
    linkedin: "emily-davis-linkedin",
  },
  {
    id: "5",
    name: "David Wilson",
    mobileNumber: "+1234567894",
    email: "david.wilson@example.com",
    userType: "user",
    password: "********",
    confirmPassword: "********",
    facebook: "david.wilson.fb",
  },
  {
    id: "6",
    name: "Sarah Brown",
    mobileNumber: "+1234567895",
    email: "sarah.brown@example.com",
    userType: "admin",
    password: "********",
    confirmPassword: "********",
    instagram: "sarah_brown_insta",
  },
  {
    id: "7",
    name: "Robert Miller",
    mobileNumber: "+1234567896",
    email: "robert.miller@example.com",
    userType: "user",
    password: "********",
    confirmPassword: "********",
  },
  {
    id: "8",
    name: "Lisa Anderson",
    mobileNumber: "+1234567897",
    email: "lisa.anderson@example.com",
    userType: "super admin",
    password: "********",
    confirmPassword: "********",
    linkedin: "lisa-anderson-linkedin",
    facebook: "lisa.anderson.fb",
  },
  {
    id: "9",
    name: "James Taylor",
    mobileNumber: "+1234567898",
    email: "james.taylor@example.com",
    userType: "user",
    password: "********",
    confirmPassword: "********",
    instagram: "james_taylor_insta",
  },
  {
    id: "10",
    name: "Maria Garcia",
    mobileNumber: "+1234567899",
    email: "maria.garcia@example.com",
    userType: "admin",
    password: "********",
    confirmPassword: "********",
    facebook: "maria.garcia.fb",
    linkedin: "maria-garcia-linkedin",
  },
  {
    id: "11",
    name: "Christopher Martinez",
    mobileNumber: "+1234567800",
    email: "christopher.martinez@example.com",
    userType: "user",
    password: "********",
    confirmPassword: "********",
  },
  {
    id: "12",
    name: "Jennifer Thompson",
    mobileNumber: "+1234567801",
    email: "jennifer.thompson@example.com",
    userType: "admin",
    password: "********",
    confirmPassword: "********",
    instagram: "jennifer_thompson_insta",
  },
  {
    id: "13",
    name: "Daniel Rodriguez",
    mobileNumber: "+1234567802",
    email: "daniel.rodriguez@example.com",
    userType: "user",
    password: "********",
    confirmPassword: "********",
    linkedin: "daniel-rodriguez-linkedin",
  },
  {
    id: "14",
    name: "Jessica White",
    mobileNumber: "+1234567803",
    email: "jessica.white@example.com",
    userType: "super admin",
    password: "********",
    confirmPassword: "********",
    facebook: "jessica.white.fb",
  },
  {
    id: "15",
    name: "Matthew Lee",
    mobileNumber: "+1234567804",
    email: "matthew.lee@example.com",
    userType: "user",
    password: "********",
    confirmPassword: "********",
  },
  {
    id: "16",
    name: "Ashley Harris",
    mobileNumber: "+1234567805",
    email: "ashley.harris@example.com",
    userType: "admin",
    password: "********",
    confirmPassword: "********",
    instagram: "ashley_harris_insta",
    linkedin: "ashley-harris-linkedin",
  },
  {
    id: "17",
    name: "Daniel Garcia",
    mobileNumber: "+1234567806",
    email: "daniel.garcia@example.com",
    userType: "user",
    password: "********",
    confirmPassword: "********",
  },
  {
    id: "18",
    name: "Andrew Martinez",
    mobileNumber: "+1234567807",
    email: "andrew.martinez@example.com",
    userType: "admin",
    password: "********",
    confirmPassword: "********",
    facebook: "andrew.martinez.fb",
  },
  {
    id: "19",
    name: "Brandon Davis",
    mobileNumber: "+1234567808",
    email: "brandon.davis@example.com",
    userType: "user",
    password: "********",
    confirmPassword: "********",
    linkedin: "brandon-davis-linkedin",
  },
  {
    id: "20",
    name: "Jonathan Rodriguez",
    mobileNumber: "+1234567809",
    email: "jonathan.rodriguez@example.com",
    userType: "admin",
    password: "********",
    confirmPassword: "********",
    instagram: "jonathan_rodriguez_insta",
  },
];

type Props = {
  searchQuery: string;
  setIsFilterOpen: (isFilterOpen: boolean) => void;
  isFilterOpen: boolean;
  setIsExportOpen: (isExportOpen: boolean) => void;
  isExportOpen: boolean;
};

export default function UsersGrid({
  searchQuery,
  setIsFilterOpen,
  isFilterOpen,
  setIsExportOpen,
  isExportOpen,
}: Props) {
  console.log("Users grid rendered");

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isRTL } = useSelector((state: RootState) => state.language);
  const isMobile = useIsMobile();

  const [usersData, setUsersData] = useState(users);
  // const canDelete: boolean = usePermission("users", "delete");
  // const canRestore: boolean = usePermission("users", "restore");
  // const canEdit: boolean = usePermission("users", "edit");

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

    const firstNames = [
      "John",
      "Jane",
      "Michael",
      "Emily",
      "David",
      "Sarah",
      "Robert",
      "Lisa",
      "James",
      "Maria",
    ];
    const lastNames = [
      "Smith",
      "Johnson",
      "Williams",
      "Brown",
      "Jones",
      "Garcia",
      "Miller",
      "Davis",
      "Rodriguez",
      "Martinez",
    ];

    const userTypes: User["userType"][] = ["admin", "super admin", "user"];
    const domains = ["gmail.com", "yahoo.com", "hotmail.com", "company.com"];

    const newItems: User[] = Array.from(
      { length: ITEMS_PER_PAGE },
      (_, index) => {
        const firstName =
          firstNames[Math.floor(Math.random() * firstNames.length)];
        const lastName =
          lastNames[Math.floor(Math.random() * lastNames.length)];
        const fullName = `${firstName} ${lastName}`;
        const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${
          domains[Math.floor(Math.random() * domains.length)]
        }`;

        return {
          id: `${Date.now()}-${index}`,
          name: fullName,
          mobileNumber: `+123456${Math.floor(Math.random() * 10000)
            .toString()
            .padStart(4, "0")}`,
          email: email,
          userType: userTypes[Math.floor(Math.random() * userTypes.length)],
          password: "********",
          confirmPassword: "********",
          facebook:
            Math.random() > 0.5
              ? `${firstName.toLowerCase()}.${lastName.toLowerCase()}.fb`
              : undefined,
          linkedin:
            Math.random() > 0.5
              ? `${firstName.toLowerCase()}-${lastName.toLowerCase()}-linkedin`
              : undefined,
          instagram:
            Math.random() > 0.5
              ? `${firstName.toLowerCase()}_${lastName.toLowerCase()}_insta`
              : undefined,
        };
      }
    );

    // Stop loading more after reaching 50 items for demo
    if (usersData.length >= 46) {
      setHasMore(false);
    } else {
      setUsersData((prev) => [...prev, ...newItems]);
      setPage((prev) => prev + 1);
    }

    setIsLoading(false);
  }, [usersData.length, isLoading, hasMore]);

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

  // Filter users based on search query (search across multiple fields)
  const filteredUsers = usersData.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.mobileNumber.includes(searchQuery) ||
      user.userType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // const handleEditClick = (userId: string) => {
  //   const viewMode = searchParams.get("view") || "grid";
  //   navigate(`/users/edit/${userId}?fromView=${viewMode}`);
  // };

  const handleViewClick = (userId: string) => {
    const viewMode = searchParams.get("view") || "grid";
    navigate(`/users/view/${userId}?fromView=${viewMode}`);
  };

  return (
    <div
      className={cn(
        "h-full flex flex-col bg-white dark:bg-gray-900 parent relative rounded-lg overflow-hidden"
      )}
    >
      {/* Main content area */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Cards container with animated width */}
        <div
          ref={scrollContainerRef}
          className={cn(
            "overflow-y-auto grid-scroll transition-all duration-300 ease-in-out",
            isRTL ? "" : ""
          )}
          style={{
            width: isFilterOpen || isExportOpen ? "calc(100% - 320px)" : "100%",
          }}
        >
          <div
            className={cn(
              "grid gap-6 pb-4 p-5",
              // Mobile: 1 column, Tablet: 2 columns, Desktop: 3-4 columns
              isMobile
                ? "grid-cols-1"
                : "grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
            )}
          >
            {filteredUsers.map((user, index) => {
              // Function to get user type icon and color
              const getUserTypeInfo = (userType: User["userType"]) => {
                switch (userType) {
                  case "super admin":
                    return {
                      icon: Crown,
                      color: "text-purple-600",
                      bgColor: "bg-purple-100",
                    };
                  case "admin":
                    return {
                      icon: Shield,
                      color: "text-blue-600",
                      bgColor: "bg-blue-100",
                    };
                  default:
                    return {
                      icon: User,
                      color: "text-gray-600",
                      bgColor: "bg-gray-100",
                    };
                }
              };

              const userTypeInfo = getUserTypeInfo(user.userType);
              const UserTypeIcon = userTypeInfo.icon;

              return (
                <Card
                  key={index}
                  className={cn(
                    "transition-all relative group dark:bg-gray-800 duration-200 w-full shadow-[2px_3px_8px_0_rgba(0,0,0,0.10)] border-[#E2E4EB] border border-solid rounded-[12px] flex p-5 flex-col gap-4 cursor-pointer",
                    // Different hover effects for mobile vs desktop
                    isMobile
                      ? "hover:shadow-lg hover:border-primary"
                      : "hover:scale-105 hover:z-50 hover:relative hover:border-primary min-w-[280px]"
                  )}
                  onClick={() => handleViewClick(user.id)}
                >
                  {/* User Header with Name and Type */}
                  <div className="flex items-center justify-between">
                    <CardTitle
                      className="text-lg font-semibold transition-colors flex-1"
                      style={{ fontSize: "18px" }}
                    >
                      {user.name}
                    </CardTitle>
                    <div
                      className={cn(
                        "flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium",
                        userTypeInfo.bgColor,
                        userTypeInfo.color
                      )}
                    >
                      <UserTypeIcon className="w-3 h-3" />
                      <span className="capitalize">{user.userType}</span>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 flex-shrink-0" />
                      <span className="truncate">{user.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 flex-shrink-0" />
                      <span>{user.mobileNumber}</span>
                    </div>
                  </div>

                  {/* Social Media Links */}
                  {(user.facebook || user.linkedin || user.instagram) && (
                    <div className="flex items-center gap-3 pt-2 border-t border-gray-200 dark:border-gray-700">
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        Social:
                      </span>
                      <div className="flex gap-2">
                        {user.facebook && (
                          <div className="p-1 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors">
                            <Facebook className="w-3 h-3" />
                          </div>
                        )}
                        {user.linkedin && (
                          <div className="p-1 rounded-full bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors">
                            <Linkedin className="w-3 h-3" />
                          </div>
                        )}
                        {user.instagram && (
                          <div className="p-1 rounded-full bg-pink-50 text-pink-600 hover:bg-pink-100 transition-colors">
                            <Instagram className="w-3 h-3" />
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </Card>
              );
            })}
          </div>

          {/* Loading indicator */}
          {isLoading && (
            <div className="flex justify-center items-center py-8">
              <div className="flex items-center gap-2 text-blue-600">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                <span className="text-sm">Loading more users...</span>
              </div>
            </div>
          )}

          {/* End of data indicator */}
          {!hasMore && filteredUsers.length > 12 && (
            <div className="flex justify-center items-center py-8">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                No more users to load
              </span>
            </div>
          )}
        </div>

        {/* Animated Filter Panel */}
        <div
          className={cn(
            "absolute top-0 h-full transition-all duration-300 ease-in-out transform z-10",
            isRTL ? "left-0" : "right-0",
            isFilterOpen
              ? "translate-x-0 opacity-100 visible"
              : isRTL
              ? "-translate-x-full opacity-0 invisible"
              : "translate-x-full opacity-0 invisible"
          )}
          style={{
            width: isMobile ? "100%" : "320px", // Full width on mobile
          }}
        >
          <div
            className={cn(
              "h-full",
              isMobile ? "pb-4 mt-1" : "p-2" // Less padding on mobile
            )}
          >
            <div
              className={cn(
                "w-full flex-shrink-0 border rounded-[20px] border-gray-200 dark:border-gray-700 h-full bg-white dark:bg-gray-800 shadow-2xl transition-all duration-300 ease-in-out",
                isFilterOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
              )}
            >
              <GridFilterComponent
                key={`filter-panel-${isFilterOpen}`}
                data={users}
                setFilteredData={setUsersData}
                setShowTabs={setIsFilterOpen}
                defaultTab="filter"
              />
            </div>
          </div>
        </div>

        {/* Animated Export Panel */}
        <div
          className={cn(
            "absolute top-0 h-full transition-all duration-300 ease-in-out transform z-10",
            isRTL ? "left-0" : "right-0",
            isExportOpen
              ? "translate-x-0 opacity-100"
              : isRTL
              ? "-translate-x-full opacity-0"
              : "translate-x-full opacity-0"
          )}
          style={{
            width: isMobile ? "100%" : "320px", // Full width on mobile
          }}
        >
          <div
            className={cn(
              "h-full",
              isMobile ? "pb-4 mt-1" : "p-2" // Less padding on mobile
            )}
          >
            <div
              className={cn(
                "w-full flex-shrink-0 border rounded-[20px] border-gray-200 dark:border-gray-700 h-full bg-white dark:bg-gray-800 shadow-2xl transition-all duration-300 ease-in-out",
                isExportOpen ? "opacity-100" : "opacity-0"
              )}
            >
              <GridFilterComponent
                key={`export-panel-${isExportOpen}`}
                data={users}
                setFilteredData={setUsersData}
                setShowTabs={setIsExportOpen}
                defaultTab="export"
              />
            </div>
          </div>
        </div>

        {/* Backdrop overlay for mobile/smaller screens */}
        {(isFilterOpen || isExportOpen) && (
          <div
            className={cn(
              "fixed inset-0 bg-black bg-opacity-30 transition-opacity duration-300 ease-in-out z-5",
              isMobile ? "" : "md:hidden", // Always show overlay on mobile
              isFilterOpen || isExportOpen ? "opacity-100" : "opacity-0"
            )}
            onClick={() => {
              setIsFilterOpen(false);
              setIsExportOpen(false);
            }}
          />
        )}
      </div>
    </div>
  );
}
