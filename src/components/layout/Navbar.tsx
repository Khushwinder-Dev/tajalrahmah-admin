import { logout } from "@/store/authSlice";
import clsx from "clsx";
import {
  Bell,
  Heart,
  History,
  Maximize2,
  Menu,
  Search,
  UserCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import LanguageSelector from "@/components/LanguageSelector";
import ThemeToggle from "@/components/ThemeToggle";
import UnifiedSearchDropdown from "@/components/common/UnifiedSearchDropdown";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNotificationWebSocket } from "@/hooks/useNotificationWebSocket";
import type { RootState } from "@/store";
import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useDispatch, useSelector } from "react-redux";
import ActivitiesModal from "../ActivitiesModal";
import UserProfileModal from "../UserProfileModal";
import SettingsModal from "../SettingsModal";
import LanguageModal from "../LanguageModal";

const Navbar = ({
  isSidebarCollapsed,
  onSidebarCollapseChange,
}: {
  isSidebarCollapsed: boolean;
  onSidebarCollapseChange: (collapsed: boolean) => void;
}) => {
  const { i18n } = useTranslation();
  const dispatch = useDispatch();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const [openedProfile, { open: openProfile, close: closeProfile }] =
    useDisclosure(false);
  const [openedActivities, { open: openActivities, close: closeActivities }] =
    useDisclosure(false);
  const [openedSettings, { open: openSettings, close: closeSettings }] =
    useDisclosure(false);
  const [openedLanguage, { open: openLanguage, close: closeLanguage }] =
    useDisclosure(false);

  const navigate = useNavigate();

  const { t } = useTranslation();
  const { isRTL } = useSelector((state: RootState) => state.language);

  // WebSocket hook for real-time notification count
  const { unreadCount } = useNotificationWebSocket();

  // Check if device is mobile
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  // Global shortcut to toggle unified search (Ctrl+K or Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Toggle sidebar for mobile
  const toggleSidebar = () => {
    onSidebarCollapseChange(!isSidebarCollapsed);
  };

  // Toggle fullscreen mode
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  return (
    <>
      <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 p-4 w-full relative z-50 h-16">
        <div
          className={clsx(
            "h-full items-center",
            isMobile ? "flex" : "grid grid-cols-12 gap-4"
          )}
        >
          {/* Mobile Layout */}
          {isMobile ? (
            <div className="flex items-center justify-between w-full">
              {/* Mobile: Menu button + Brand */}
              <div className="flex items-center">
                <button
                  onClick={toggleSidebar}
                  className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors mr-2 cursor-pointer"
                  aria-label="Toggle sidebar"
                >
                  <Menu size={18} />
                </button>
                <div className="text-xl font-bold text-brand dark:text-brand text-primary">
                  RAPID
                </div>
              </div>

              <div className="flex items-center space-x-1">
                {/* Search Dropdown -> Combined Search Bar & Results */}
                <UnifiedSearchDropdown
                  isOpen={isSearchOpen}
                  onOpenChange={setIsSearchOpen}
                  align="end"
                  trigger={
                    <button
                      className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                      aria-label={t("navbar.search.open")}
                      title="Search (Ctrl+K)"
                    >
                      <Search size={18} />
                    </button>
                  }
                />

                {/* Real-time Notifications with Badge */}
                <div className="relative">
                  <button
                    className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                    aria-label={t("navbar.notifications")}
                  >
                    <Bell size={18} />
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                        {unreadCount > 99 ? "99+" : unreadCount}
                      </span>
                    )}
                  </button>
                </div>

                {/* Favorites */}
                <button
                  className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                  aria-label={t("navbar.favorites")}
                >
                  <Heart size={18} />
                </button>

                {/* Recent */}
                <button
                  className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                  aria-label={t("navbar.recent")}
                  onClick={() => {
                    navigate("/recent");
                  }}
                >
                  <History size={18} />
                </button>

                {/* Language Toggle */}
                <div className="relative">
                  <LanguageSelector />
                </div>

                {/* Theme Toggle (Light / Dark mode) */}
                <ThemeToggle />

                {/* User Profile */}
                <DropdownMenu>
                  <DropdownMenuTrigger className="cursor-pointer p-2">
                    <UserCircle size={18} />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-[300px] rounded-2xl">
                    <div className="flex p-2 gap-3 items-center">
                      <img
                        src={"https://i.pravatar.cc/150?img=4"}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="">
                        <h3 className="text-base font-semibold">
                          Michel Jonh
                        </h3>
                        <h4 className="text-sm text-gray-600">User</h4>
                      </div>
                    </div>
                    <DropdownMenuSeparator />

                    <DropdownMenuLabel className="text-base font-semibold">
                      Account
                    </DropdownMenuLabel>
                    <DropdownMenuItem
                      onClick={openProfile}
                      className="cursor-pointer"
                    >
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                      Settings
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />
                    <DropdownMenuLabel className="text-base font-semibold">
                      Manage
                    </DropdownMenuLabel>
                    <DropdownMenuItem
                      onClick={openActivities}
                      className="cursor-pointer"
                    >
                      Activity
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                      Help
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="cursor-pointer hover:bg-red-500 hover:text-white"
                      onClick={() => {
                        dispatch(logout());
                        navigate("/login");
                      }}
                    >
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ) : (
            <>
              {/* Desktop Layout */}
              {/* Left: Brand Logo - 2 columns */}
              <div className="col-span-2">
                <div className="text-2xl font-bold text-brand dark:text-brand text-primary">
                  RAPID
                </div>
              </div>

              {/* Middle: Empty Space - 4 columns */}
              <div className="col-span-4"></div>

              {/* Right: Controls - 6 columns */}
              <div className="col-span-6 flex items-center justify-end relative">
                {/* Desktop Icons Container */}
                <div className="flex items-center space-x-1 sm:space-x-3">
                  {/* Search Dropdown -> Combined Search Bar & Results */}
                  <UnifiedSearchDropdown
                    isOpen={isSearchOpen}
                    onOpenChange={setIsSearchOpen}
                    align="end"
                    trigger={
                      <button
                        className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                        aria-label={t("navbar.search.open")}
                        title="Search (Ctrl+K)"
                      >
                        <Search size={20} />
                      </button>
                    }
                  />

                  {/* Fullscreen Toggle */}
                  <button
                    onClick={toggleFullscreen}
                    className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                    aria-label={
                      isFullscreen
                        ? t("navbar.exitFullscreen")
                        : t("navbar.enterFullscreen")
                    }
                  >
                    <Maximize2 size={20} />
                  </button>

                  {/* Real-time Notifications with Badge */}
                  <div className="relative">
                    <button
                      className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                      aria-label={t("navbar.notifications")}
                    >
                      <Bell size={20} />
                      {unreadCount > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                          {unreadCount > 99 ? "99+" : unreadCount}
                        </span>
                      )}
                    </button>
                  </div>

                  {/* Favorites */}
                  <button
                    className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                    aria-label={t("navbar.favorites")}
                  >
                    <Heart size={20} />
                  </button>

                  {/* Recent */}
                  <button
                    className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                    aria-label={t("navbar.recent")}
                    onClick={() => {
                      navigate("/recent");
                    }}
                  >
                    <History size={20} />
                  </button>

                  {/* Language Toggle */}
                  <div className="relative">
                    <LanguageSelector />
                  </div>

                  {/* Theme Toggle (Light / Dark mode) */}
                  <ThemeToggle />

                  {/* User Profile */}
                  <DropdownMenu>
                    <DropdownMenuTrigger className="cursor-pointer">
                      <UserCircle size={20} />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-[370px] rounded-2xl">
                      <div className="flex p-2 gap-4 items-center">
                        <img
                          src={"https://i.pravatar.cc/150?img=4"}
                          className="w-15 h-15 rounded-full object-cover"
                        />
                        <div className="">
                          <h3 className="text-lg font-semibold">Michel Jonh</h3>
                          <h4>User</h4>
                        </div>
                      </div>
                      <DropdownMenuSeparator />

                      <DropdownMenuLabel className="text-lg font-semibold">
                        Account
                      </DropdownMenuLabel>
                      <DropdownMenuItem
                        onClick={openProfile}
                        className="cursor-pointer"
                      >
                        Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={openSettings}
                        className="cursor-pointer"
                      >
                        Settings
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={openLanguage}
                        className="cursor-pointer"
                      >
                        Language
                      </DropdownMenuItem>

                      <DropdownMenuSeparator />
                      <DropdownMenuLabel className="text-lg font-semibold">
                        Manage
                      </DropdownMenuLabel>
                      <DropdownMenuItem
                        onClick={openActivities}
                        className="cursor-pointer"
                      >
                        Activity
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer">
                        Help
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="cursor-pointer hover:bg-red-500 hover:text-white"
                        onClick={() => {
                          dispatch(logout());
                          navigate("/login");
                        }}
                      >
                        Sign Out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </>
          )}
        </div>
      </nav>
      <Modal
        opened={openedProfile}
        onClose={closeProfile}
        centered
        title="User Profile"
        size="xl"
      >
        <UserProfileModal />
      </Modal>
      <Modal
        opened={openedActivities}
        onClose={closeActivities}
        centered
        title="Activities"
        size="xl"
      >
        <ActivitiesModal />
      </Modal>
      <Modal
        opened={openedSettings}
        onClose={closeSettings}
        centered
        title="Settings"
        size="xl"
      >
        <SettingsModal />
      </Modal>
      <Modal
        opened={openedLanguage}
        onClose={closeLanguage}
        centered
        title="Language"
        size="xl"
      >
        <LanguageModal />
      </Modal>
    </>
  );
};

export default Navbar;
