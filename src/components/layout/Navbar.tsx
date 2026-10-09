import { logout } from "@/store/authSlice";
import clsx from "clsx";
import {
  Bell,
  Camera,
  ChevronRight,
  Clock,
  Heart,
  History,
  Maximize2,
  Menu,
  Mic,
  Search,
  TrendingUp,
  UserCircle,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import LanguageSelector from "@/components/LanguageSelector";
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
  const [searchQuery, setSearchQuery] = useState("");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const [openedProfile, { open: openProfile, close: closeProfile }] =
    useDisclosure(false);
  const [openedActivities, { open: openActivities, close: closeActivities }] =
    useDisclosure(false);
  const [openedSettings, { open: openSettings, close: closeSettings }] =
    useDisclosure(false);
  const [openedLanguage, { open: openLanguage, close: closeLanguage }] =
    useDisclosure(false);

  const [searchHistory, setSearchHistory] = useState([
    "react table components",
    "data visualization",
    "dashboard design patterns",
    "user interface components",
    "responsive web design",
  ]);
  const [suggestions] = useState([
    "google account",
    "google.com search",
    "google map",
    "google classroom",
    "google mail",
    "google chrome",
    "google play",
    "google sign in",
    "google search",
  ]);

  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
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

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsSearchOpen(false);
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Focus input when search opens
  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearchOpen]);

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      setSearchQuery("");
      setShowSuggestions(false);
    }
  };

  const handleInputFocus = () => {
    setShowSuggestions(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
    // Add to search history if not already present
    if (!searchHistory.includes(suggestion)) {
      setSearchHistory((prev) => [suggestion, ...prev.slice(0, 4)]);
    }
    // Perform search here
    console.log("Searching for:", suggestion);
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      // Add to search history
      if (!searchHistory.includes(searchQuery)) {
        setSearchHistory((prev) => [searchQuery, ...prev.slice(0, 4)]);
      }
      setShowSuggestions(false);
      console.log("Searching for:", searchQuery);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setShowSuggestions(false);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const removeFromHistory = (item: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSearchHistory((prev) => prev.filter((h) => h !== item));
  };

  // Filter suggestions based on search query
  const filteredSuggestions = suggestions.filter((suggestion) =>
    suggestion.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            <>
              {/* When search is open on mobile, show full-width search */}
              {isSearchOpen ? (
                <div
                  className="flex items-center w-full relative"
                  ref={searchRef}
                >
                  <div className="flex items-center bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-200 w-full">
                    <button
                      onClick={handleSearch}
                      className="p-2 text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                      aria-label={t("navbar.search.search")}
                    >
                      <Search size={18} />
                    </button>

                    <input
                      ref={inputRef}
                      type="text"
                      placeholder={t("navbar.search.placeholder")}
                      value={searchQuery}
                      onChange={handleInputChange}
                      onFocus={handleInputFocus}
                      onKeyPress={handleKeyPress}
                      className={clsx(
                        "flex-1 py-2 bg-transparent border-0 focus:ring-0 text-gray-700 dark:text-gray-300 text-sm outline-none",
                        isRTL ? "pr-2 text-right" : "pl-2 text-left"
                      )}
                      dir={i18n.language}
                    />

                    {searchQuery && (
                      <button
                        onClick={clearSearch}
                        className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                        aria-label="Clear search"
                      >
                        <X size={16} />
                      </button>
                    )}

                    <button
                      onClick={toggleSearch}
                      className="p-2 mr-1 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                      aria-label={t("navbar.search.close")}
                    >
                      <X size={16} />
                    </button>
                  </div>

                  {/* Mobile Suggestions Dropdown */}
                  {showSuggestions && (
                    <div className="absolute top-full left-0 right-0 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-xl max-h-80 overflow-y-auto z-50 mt-2">
                      {/* Search History */}
                      {searchHistory.length > 0 && !searchQuery && (
                        <div className="py-2">
                          <div className="px-3 py-2 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Recent searches
                          </div>
                          {searchHistory.map((item, index) => (
                            <div
                              key={index}
                              className="flex items-center px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer group"
                              onClick={() => handleSuggestionClick(item)}
                            >
                              <Clock
                                size={14}
                                className="text-gray-400 mr-2 flex-shrink-0"
                              />
                              <span className="flex-1 text-sm text-gray-700 dark:text-gray-300">
                                {item}
                              </span>
                              <button
                                onClick={(e) => removeFromHistory(item, e)}
                                className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-all"
                                aria-label="Remove from history"
                              >
                                <X size={14} />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Search Suggestions */}
                      {searchQuery && filteredSuggestions.length > 0 && (
                        <div className="py-2">
                          {filteredSuggestions
                            .slice(0, 6)
                            .map((suggestion, index) => (
                              <div
                                key={index}
                                className="flex items-center px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                                onClick={() =>
                                  handleSuggestionClick(suggestion)
                                }
                              >
                                <Search
                                  size={14}
                                  className="text-gray-400 mr-2 flex-shrink-0"
                                />
                                <span className="text-sm text-gray-700 dark:text-gray-300">
                                  {suggestion
                                    .split(new RegExp(`(${searchQuery})`, "gi"))
                                    .map((part, i) =>
                                      part.toLowerCase() ===
                                      searchQuery.toLowerCase() ? (
                                        <strong key={i} className="font-medium">
                                          {part}
                                        </strong>
                                      ) : (
                                        part
                                      )
                                    )}
                                </span>
                              </div>
                            ))}
                        </div>
                      )}

                      {/* No results */}
                      {searchQuery && filteredSuggestions.length === 0 && (
                        <div className="px-3 py-6 text-center text-sm text-gray-500 dark:text-gray-400">
                          No suggestions found for "{searchQuery}"
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <>
                  {/* Mobile: Menu button + Brand + Icons */}
                  <div className="flex items-center">
                    <button
                      onClick={toggleSidebar}
                      className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors mr-2"
                      aria-label="Toggle sidebar"
                    >
                      <Menu size={18} />
                    </button>
                  </div>

                  <div className="flex-1 flex justify-start">
                    <div className="text-xl font-bold text-brand dark:text-brand text-primary">
                      RAPID
                    </div>
                  </div>

                  <div className="flex items-center space-x-1">
                    {/* Mobile Icons - Smaller size */}
                    <button
                      onClick={toggleSearch}
                      className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                      aria-label={t("navbar.search.open")}
                    >
                      <Search size={18} />
                    </button>

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
                </>
              )}
            </>
          ) : (
            <>
              {/* Desktop Layout - Original */}
              {/* Left: Brand Logo - 2 columns */}
              <div className="col-span-2">
                <div className="text-2xl font-bold text-brand dark:text-brand text-primary">
                  RAPID
                </div>
              </div>

              {/* Middle: Empty Space - 3 columns */}
              <div className="col-span-2"></div>

              {/* Right: Controls and Search - 7 columns */}
              <div className="col-span-5 flex items-center justify-end relative">
                {/* Google-Style Search Field */}
                <div
                  ref={searchRef}
                  className={clsx(
                    "absolute right-0 top-1/2 -translate-y-1/2 transition-all duration-300 ease-in-out",
                    isSearchOpen
                      ? "w-150 sm:w-150 opacity-100"
                      : "w-0 opacity-0 overflow-hidden"
                  )}
                  style={{
                    transformOrigin: "right center",
                  }}
                >
                  {isSearchOpen && (
                    <div className="relative">
                      {/* Main Search Input */}
                      <div className="flex items-center bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-200">
                        <button
                          onClick={handleSearch}
                          className="p-3 text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                          aria-label={t("navbar.search.search")}
                        >
                          <Search size={20} />
                        </button>

                        <input
                          ref={inputRef}
                          type="text"
                          placeholder={t("navbar.search.placeholder")}
                          value={searchQuery}
                          onChange={handleInputChange}
                          onFocus={handleInputFocus}
                          onKeyPress={handleKeyPress}
                          className={clsx(
                            "flex-1 py-3 bg-transparent border-0 focus:ring-0 text-gray-700 dark:text-gray-300 text-base outline-none",
                            isRTL ? "pr-2 text-right" : "pl-2 text-left"
                          )}
                          dir={i18n.language}
                        />

                        {/* Clear button */}
                        {searchQuery && (
                          <button
                            onClick={clearSearch}
                            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                            aria-label="Clear search"
                          >
                            <X size={18} />
                          </button>
                        )}

                        {/* Voice and Camera buttons */}
                        <div className="flex items-center px-2 border-l border-gray-200 dark:border-gray-600 ml-2">
                          <button
                            type="button"
                            className="p-2 text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                            aria-label={t("navbar.search.voice")}
                            onClick={() => console.log("Voice search clicked")}
                          >
                            <Mic size={20} />
                          </button>
                          <button
                            type="button"
                            className="p-2 text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                            aria-label={t("navbar.search.camera")}
                            onClick={() => console.log("Camera search clicked")}
                          >
                            <Camera size={20} />
                          </button>
                        </div>

                        <button
                          onClick={toggleSearch}
                          className="p-2 mr-1 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                          aria-label={t("navbar.search.close")}
                        >
                          <ChevronRight size={18} />
                        </button>
                      </div>

                      {/* Desktop Suggestions Dropdown - Original */}
                      {showSuggestions && (
                        <div className="absolute top-full left-0 right-0 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-xl max-h-96 overflow-y-auto z-50">
                          {/* Search History */}
                          {searchHistory.length > 0 && !searchQuery && (
                            <div className="py-2">
                              <div className="px-4 py-2 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                Recent searches
                              </div>
                              {searchHistory.map((item, index) => (
                                <div
                                  key={index}
                                  className="flex items-center px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer group"
                                  onClick={() => handleSuggestionClick(item)}
                                >
                                  <Clock
                                    size={16}
                                    className="text-gray-400 mr-3 flex-shrink-0"
                                  />
                                  <span className="flex-1 text-gray-700 dark:text-gray-300">
                                    {item}
                                  </span>
                                  <button
                                    onClick={(e) => removeFromHistory(item, e)}
                                    className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-all"
                                    aria-label="Remove from history"
                                  >
                                    <X size={16} />
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Search Suggestions */}
                          {searchQuery && filteredSuggestions.length > 0 && (
                            <div className="py-2">
                              {!searchQuery && (
                                <div className="px-4 py-2 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                  Suggestions
                                </div>
                              )}
                              {filteredSuggestions
                                .slice(0, 8)
                                .map((suggestion, index) => (
                                  <div
                                    key={index}
                                    className="flex items-center px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                                    onClick={() =>
                                      handleSuggestionClick(suggestion)
                                    }
                                  >
                                    <Search
                                      size={16}
                                      className="text-gray-400 mr-3 flex-shrink-0"
                                    />
                                    <span className="text-gray-700 dark:text-gray-300">
                                      {/* Highlight matching text */}
                                      {suggestion
                                        .split(
                                          new RegExp(`(${searchQuery})`, "gi")
                                        )
                                        .map((part, i) =>
                                          part.toLowerCase() ===
                                          searchQuery.toLowerCase() ? (
                                            <strong
                                              key={i}
                                              className="font-medium"
                                            >
                                              {part}
                                            </strong>
                                          ) : (
                                            part
                                          )
                                        )}
                                    </span>
                                  </div>
                                ))}
                            </div>
                          )}

                          {/* Trending searches (optional) */}
                          {!searchQuery && searchHistory.length === 0 && (
                            <div className="py-2">
                              <div className="px-4 py-2 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                Trending
                              </div>
                              {[
                                "react hooks",
                                "typescript tutorial",
                                "css grid",
                              ].map((trend, index) => (
                                <div
                                  key={index}
                                  className="flex items-center px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                                  onClick={() => handleSuggestionClick(trend)}
                                >
                                  <TrendingUp
                                    size={16}
                                    className="text-gray-400 mr-3 flex-shrink-0"
                                  />
                                  <span className="text-gray-700 dark:text-gray-300">
                                    {trend}
                                  </span>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* No results */}
                          {searchQuery && filteredSuggestions.length === 0 && (
                            <div className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                              No suggestions found for "{searchQuery}"
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div className="col-span-3 flex items-center justify-end relative">
                {/* Desktop Icons Container */}
                <div className="flex items-center space-x-1 sm:space-x-3">
                  {/* Search Toggle Button - Only visible when search is closed */}
                  {!isSearchOpen && (
                    <button
                      onClick={toggleSearch}
                      className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                      aria-label={t("navbar.search.open")}
                    >
                      <Search size={20} />
                    </button>
                  )}

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
