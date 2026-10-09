import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
  Search,
  X,
  Globe,
  ChevronLeft,
  ChevronRight,
  Sun,
  Moon,
  Receipt,
  Calculator,
  Undo2,
} from "lucide-react";
import clsx from "clsx";
import { useTheme } from "@/hooks/useTheme";
import SubSidebar from "./SubSidebar";
import type { LucideIcon } from "lucide-react";
import useIsMobile from "@/hooks/useIsMobile";

type SubSidebarItem = {
  label: string;
  path: string;
  icon: LucideIcon;
};

const Sidebar = ({
  isSidebarCollapsed: isCollapsed,
  onSidebarCollapseChange: setIsCollapsed,
}: {
  isSidebarCollapsed: boolean;
  onSidebarCollapseChange: (collapsed: boolean) => void;
}) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState("search");
  const [subSidebarWidth, setSubSidebarWidth] = useState("w-0");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("general");
  const { theme, toggleTheme } = useTheme();
  const [subSidebarItems, setSubSidebarItems] = useState<SubSidebarItem[]>([]);
  const [subSidebarTitle, setSubSidebarTitle] = useState<string>("");
  const isMobile = useIsMobile();

  const isRTL = i18n.language === "ar";

  const fixedTopMenus = [
    {
      key: "search",
      icon: Search,
      label: t("sidebar.menu.search"),
      path: "/search",
    },
  ];

  const scrollableMenus = [
    {
      key: "country",
      icon: Globe,
      label: t("sidebar.menu.country"),
      path: "/countries",
    },
  ];

  const fixedBottomMenus = [
    {
      key: "theme",
      icon: theme === "dark" ? Sun : Moon,

      label:
        theme === "dark" ? t("navbar.theme.light") : t("navbar.theme.dark"),
      action: toggleTheme,
    },
  ];

  const handleMenuClick = (
    key: string,
    path?: string | null,
    action?: () => void
  ) => {
    setActiveMenu(key);
    if (action) {
      action();
    }
    // ---- here we can use our relative logic --------------
    else if (key === "sales") {
      setSubSidebarItems([
        {
          label: t("sidebar.menu.salesInvoice"),
          path: "/sales-invoice",
          icon: Receipt,
        },
        {
          label: t("sidebar.menu.salesReturn"),
          path: "/sales-return",
          icon: Undo2,
        },
        {
          label: t("sidebar.menu.salesQuotation"),
          path: "/sales-quotation",
          icon: Calculator,
        },
      ]);
      setSubSidebarTitle(t("sidebar.menu.sales"));
      setSubSidebarWidth("w-56");
    } else if (path) {
      setSubSidebarItems([]);
      setSubSidebarTitle("");
      setSubSidebarWidth("w-56");
      navigate(path);
    }
  };

  const handleSubSidebarNavigate = (path: string) => {
    navigate(path);
    // no need to close......
  };

  const closeSubSidebar = () => setSubSidebarWidth("w-0");
  const handleTabClick = (tab: string) => setActiveTab(tab);
  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  return (
    <div className="flex h-screen relative">
      {/* Collapse/Expand Button */}
      {isMobile ? null : (
        <button
          onClick={toggleSidebar}
          className={clsx(
            "absolute z-10 w-8 h-8 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 flex items-center justify-center shadow-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-all",
            isRTL
              ? isCollapsed
                ? "right-0 translate-x-1/32"
                : "right-[6rem] translate-x-1/32"
              : isCollapsed
              ? "left-0 -translate-x-1/32"
              : "left-[6rem] -translate-x-1/32"
          )}
          style={{ top: "7%", transform: "translateY(-50%)" }}
        >
          {isCollapsed ? (
            isRTL ? (
              <ChevronLeft className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )
          ) : isRTL ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </button>
      )}
      {/* Main Sidebar */}
      <div
        className={clsx(
          "flex flex-col transition-all duration-300 h-[calc(100vh-4rem)] font-sans",
          isRTL ? "border-l border-[#3596FF]" : "border-r border-[#3596FF]",
          isCollapsed ? "w-0 overflow-hidden" : `${isMobile ? "w-20" : "w-32"}`
        )}
        style={{
          background:
            "var(--sidebar-bg, linear-gradient(270deg, #3596FF 0%, #79B9FA 118.42%))",
        }}
      >
        {/* Top Fixed Menus */}
        {!isCollapsed && (
          <div className="space-y-2 w-full px-2">
            {fixedTopMenus.map(({ key, icon: Icon, label, path }) => (
              <button
                key={key}
                className={clsx(
                  "relative group flex flex-col items-center transition-all w-full py-2 text-center",
                  activeMenu === key ? "rounded-xl border" : ""
                )}
                style={
                  activeMenu === key
                    ? {
                        borderRadius: "12px",
                        border: "1px solid rgba(255, 255, 255, 0.20)",
                        background: "rgba(255, 255, 255, 0.10)",
                        boxShadow: "2px 2px 12px 0 #0053AD",
                        color: "#FFF",
                        fontSize: "14px",
                        fontStyle: "normal",
                        fontWeight: "700",
                        lineHeight: "100%",
                      }
                    : {
                        color: "#FFF",
                        fontSize: "14px",
                        fontStyle: "normal",
                        fontWeight: "700",
                        lineHeight: "100%",
                      }
                }
                onClick={() => handleMenuClick(key, path)}
              >
                <div className="flex flex-col items-center w-full">
                  <Icon className="w-6 h-6" />
                  <span className="text-xs mt-2 whitespace-nowrap">
                    {label}
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Scrollable Middle Menus */}
        {!isCollapsed && (
          <div className="flex-1 overflow-y-auto overflow-x-hidden py-2 px-2 smooth-scroll scroll-smooth">
            {scrollableMenus.map(({ key, icon: Icon, label, path }) => (
              <button
                key={key}
                className={clsx(
                  "relative group flex flex-col items-center transition-all w-full my-2 py-2 cursor-pointer text-center",
                  activeMenu === key ? "rounded-xl border" : ""
                )}
                style={
                  activeMenu === key
                    ? {
                        borderRadius: "12px",
                        border: "1px solid rgba(255, 255, 255, 0.20)",
                        background: "rgba(255, 255, 255, 0.10)",
                        boxShadow: "2px 2px 12px 0 #0053AD",
                        color: "#FFF",
                        fontSize: "14px",
                        fontStyle: "normal",
                        fontWeight: "700",
                        lineHeight: "100%",
                      }
                    : {
                        color: "#FFF",
                        fontSize: "14px",
                        fontStyle: "normal",
                        fontWeight: "700",
                        lineHeight: "100%",
                      }
                }
                onClick={() => handleMenuClick(key, path)}
              >
                <div className="flex flex-col items-center w-full">
                  <Icon className="w-6 h-6" />
                  <span className="text-xs mt-2 whitespace-nowrap">
                    {label}
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Bottom Fixed Menus */}
        {!isCollapsed && (
          <div className="space-y-8 w-full px-2 py-4">
            {fixedBottomMenus.map(({ key, icon: Icon, label, action }) => (
              <button
                key={key}
                className={clsx(
                  "relative group flex flex-col items-center transition-all w-full py-1 text-center",
                  activeMenu === key ? "rounded-xl border" : ""
                )}
                style={
                  activeMenu === key
                    ? {
                        borderRadius: "12px",
                        border: "1px solid rgba(255, 255, 255, 0.20)",
                        background: "rgba(255, 255, 255, 0.10)",
                        boxShadow: "2px 2px 12px 0 #0053AD",
                        color: "#FFF",
                        fontSize: "14px",
                        fontStyle: "normal",
                        fontWeight: "700",
                        lineHeight: "100%",
                      }
                    : {
                        color: "#FFF",
                        fontSize: "14px",
                        fontStyle: "normal",
                        fontWeight: "700",
                        lineHeight: "100%",
                      }
                }
                onClick={() => handleMenuClick(key, null, action)}
              >
                <div className="flex flex-col items-center w-full">
                  <Icon className="w-6 h-6" />
                  <span className="text-xs mt-2 whitespace-nowrap">
                    {label}
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Sub Sidebar */}
      <div
        className={clsx(
          "transition-all duration-300 overflow-hidden bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 relative flex flex-col font-sans",
          subSidebarWidth,
          isRTL ? "border-l" : "border-r"
        )}
        dir={i18n.language}
      >
        {subSidebarWidth === "w-56" && subSidebarItems.length > 0 && (
          <SubSidebar
            items={subSidebarItems}
            onNavigate={handleSubSidebarNavigate}
            onClose={closeSubSidebar}
            title={subSidebarTitle}
          />
        )}
        {subSidebarWidth === "w-56" && subSidebarItems.length === 0 && (
          <>
            <button
              onClick={closeSubSidebar}
              className={clsx(
                "absolute top-2 p-1 mb-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-300 cursor-pointer",
                isRTL ? "left-2" : "right-2"
              )}
              aria-label={t("sidebar.close")}
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex flex-col flex-1 p-4 pt-8 overflow-y-auto">
              {activeMenu === "search" && (
                <>
                  <div className="mb-4">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder={t("sidebar.search.placeholder")}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className={clsx(
                          "w-full pl-8 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-brand",
                          isRTL ? "text-right pr-8 pl-4" : "text-left pl-8 pr-4"
                        )}
                      />
                      <Search
                        className={clsx(
                          "absolute top-2.5 h-4 w-4 text-gray-400",
                          isRTL ? "right-2" : "left-2"
                        )}
                      />
                    </div>
                  </div>
                  <div className="flex gap-2 mb-4">
                    {["general", "favourite", "recent"].map((tab) => (
                      <button
                        key={tab}
                        className={clsx(
                          "px-3 py-1 rounded text-sm",
                          activeTab === tab
                            ? "bg-blue-100 dark:bg-blue-900 text-blue-500 dark:text-blue-300"
                            : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                        )}
                        onClick={() => handleTabClick(tab)}
                      >
                        {t(`sidebar.search.tabs.${tab}`)}
                      </button>
                    ))}
                  </div>
                </>
              )}

              <div className="flex-1">
                {activeMenu === "search" && searchQuery && (
                  <p
                    className={clsx(
                      "text-sm text-gray-600 dark:text-gray-300",
                      isRTL ? "text-right" : "text-left"
                    )}
                  >
                    {t("sidebar.search.results", { query: searchQuery })}
                  </p>
                )}

                {activeMenu === "dashboard" && (
                  <div className={isRTL ? "text-right" : "text-left"}>
                    <h3 className="font-medium mb-2">
                      {t("sidebar.dashboard.title")}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {t("sidebar.dashboard.content")}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
