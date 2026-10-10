import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  LayoutGrid,
  ShoppingCart,
  Package,
  Calculator,
  ChevronRight,
  PanelLeftClose,
  PanelLeftOpen,
  Globe,
  Receipt,
  RotateCcw,
  FileSpreadsheet,
  Boxes,
  Warehouse,
  ArrowLeftRight,
  ClipboardList,
  BookOpen,
  Coins,
  Building,
  Sparkles,
} from "lucide-react";
import clsx from "clsx";
import useIsMobile from "@/hooks/useIsMobile";

interface SubMenuItem {
  label: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

interface MenuItem {
  key: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  path?: string;
  subItems?: SubMenuItem[];
}

export const Sidebar: React.FC<{
  isSidebarCollapsed: boolean;
  onSidebarCollapseChange: (collapsed: boolean) => void;
}> = ({ isSidebarCollapsed, onSidebarCollapseChange }) => {
  const { i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const isRTL = i18n.language === "ar";

  // Active flyout menu state
  const [activeFlyoutKey, setActiveFlyoutKey] = useState<string | null>(null);
  const flyoutRef = useRef<HTMLDivElement>(null);

  const menuItems: MenuItem[] = [
    {
      key: "dashboard",
      label: "Dashboard",
      icon: LayoutGrid,
      path: "/dashboard",
    },
    {
      key: "sales",
      label: "Sales",
      icon: ShoppingCart,
      subItems: [
        {
          label: "Sales Invoice",
          path: "/sales-invoice",
          icon: Receipt,
        },
        {
          label: "Sales Return",
          path: "/sales-return",
          icon: RotateCcw,
        },
        {
          label: "Sales Quotation",
          path: "/sales-quotation",
          icon: FileSpreadsheet,
        },
      ],
    },
    {
      key: "inventory",
      label: "Inventory",
      icon: Package,
      subItems: [
        {
          label: "Item Master",
          path: "/item",
          icon: Boxes,
        },
        {
          label: "Warehouse Management",
          path: "/warehouse",
          icon: Warehouse,
        },
        {
          label: "Stock Transfer",
          path: "/stock-transfer",
          icon: ArrowLeftRight,
        },
        {
          label: "Stock Reports",
          path: "/current-stock-reports",
          icon: ClipboardList,
        },
      ],
    },
    {
      key: "accounting",
      label: "Accounting",
      icon: Calculator,
      subItems: [
        {
          label: "Chart of Accounts",
          path: "/chart-of-accounts",
          icon: BookOpen,
        },
        {
          label: "Journal Entry",
          path: "/JournalEntry",
          icon: FileSpreadsheet,
        },
        {
          label: "Cash Accounts",
          path: "/cash",
          icon: Coins,
        },
        {
          label: "Bank Accounts",
          path: "/bank",
          icon: Building,
        },
      ],
    },
    {
      key: "countries",
      label: "Countries",
      icon: Globe,
      path: "/countries",
    },
  ];

  // Close flyout when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        flyoutRef.current &&
        !flyoutRef.current.contains(event.target as Node)
      ) {
        setActiveFlyoutKey(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMenuClick = (item: MenuItem) => {
    if (item.subItems && item.subItems.length > 0) {
      setActiveFlyoutKey(activeFlyoutKey === item.key ? null : item.key);
    } else if (item.path) {
      setActiveFlyoutKey(null);
      navigate(item.path);
    }
  };

  const handleSubItemClick = (path: string) => {
    navigate(path);
    setActiveFlyoutKey(null);
  };

  const activeFlyoutItem = menuItems.find(
    (item) => item.key === activeFlyoutKey
  );

  return (
    <div
      ref={flyoutRef}
      className="relative flex h-full select-none"
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Main Sidebar Container */}
      <aside
        className={clsx(
          "h-full flex flex-col bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 transition-all duration-300 ease-in-out font-sans z-30 shadow-xs",
          isRTL ? "border-l" : "border-r",
          isSidebarCollapsed ? "w-[72px]" : "w-64"
        )}
      >
        {/* Top Header: Company Profile */}
        <div className="p-3.5 flex items-center justify-between border-b border-gray-100 dark:border-gray-800">
          <div
            className="flex items-center gap-3 cursor-pointer overflow-hidden"
            onClick={() => isSidebarCollapsed && onSidebarCollapseChange(false)}
            title={isSidebarCollapsed ? "Click to expand" : undefined}
          >
            {/* ABC Company Logo Badge */}
            <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-gray-800 border border-slate-200/80 dark:border-gray-700 shadow-xs flex items-center justify-center p-1.5 shrink-0">
              <svg
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
              >
                <path
                  d="M12 28L20 12L28 28"
                  stroke="#0070ba"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M16 23H24"
                  stroke="#10b981"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            {/* Company Info (Visible when expanded) */}
            {!isSidebarCollapsed && (
              <div className="min-w-0">
                <h2 className="text-sm font-bold text-slate-900 dark:text-white tracking-tight truncate leading-tight">
                  ABC Trading LLC
                </h2>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5 font-normal">
                  Client company
                </p>
              </div>
            )}
          </div>

          {/* Collapse/Expand Toggle Button */}
          {!isSidebarCollapsed ? (
            <button
              onClick={() => onSidebarCollapseChange(true)}
              className="text-slate-400 hover:text-slate-700 dark:hover:text-white p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors shrink-0 cursor-pointer"
              title="Collapse sidebar"
              aria-label="Collapse sidebar"
            >
              <PanelLeftClose className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => onSidebarCollapseChange(false)}
              className="text-slate-400 hover:text-slate-700 dark:hover:text-white p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors shrink-0 cursor-pointer"
              title="Expand sidebar"
              aria-label="Expand sidebar"
            >
              <PanelLeftOpen className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Navigation Menu List */}
        <nav className="flex-1 py-4 px-2 space-y-1.5 overflow-y-auto overflow-x-hidden">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isItemActive =
              (item.path && location.pathname === item.path) ||
              item.subItems?.some((sub) => location.pathname === sub.path);
            const isFlyoutOpen = activeFlyoutKey === item.key;

            return (
              <button
                key={item.key}
                type="button"
                onClick={() => handleMenuClick(item)}
                className={clsx(
                  "sidebar-btn w-full flex items-center rounded-lg transition-all duration-150 cursor-pointer group text-left",
                  isSidebarCollapsed
                    ? "justify-center p-2.5"
                    : "justify-between px-3.5 py-3",
                  isItemActive || isFlyoutOpen
                    ? "text-[#0070ba] font-semibold dark:text-[#38bdf8]"
                    : "text-slate-600 hover:text-[#0070ba] dark:text-slate-400 dark:hover:text-[#38bdf8]"
                )}
                title={isSidebarCollapsed ? item.label : undefined}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={clsx(
                      "w-6 h-6 flex items-center justify-center shrink-0 transition-colors",
                      isItemActive || isFlyoutOpen
                        ? "text-[#0070ba] dark:text-[#38bdf8]"
                        : "text-slate-400 group-hover:text-[#0070ba] dark:text-slate-500 dark:group-hover:text-[#38bdf8]"
                    )}
                  >
                    <Icon className="w-5 h-5 stroke-[1.8]" />
                  </div>

                  {!isSidebarCollapsed && (
                    <span className="text-sm tracking-wide truncate">
                      {item.label}
                    </span>
                  )}
                </div>

                {/* Right Chevron arrow for expandable items in expanded mode */}
                {!isSidebarCollapsed && item.subItems && (
                  <ChevronRight
                    className={clsx(
                      "w-4 h-4 transition-transform duration-200 shrink-0",
                      isFlyoutOpen
                        ? "rotate-90 text-[#0070ba] dark:text-[#38bdf8]"
                        : isItemActive
                        ? "text-[#0070ba] dark:text-[#38bdf8]"
                        : "text-slate-400 group-hover:text-[#0070ba] dark:text-slate-500 dark:group-hover:text-[#38bdf8]"
                    )}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Footer: Rapid ERP Branding */}
        <div className="p-3.5 border-t border-gray-100 dark:border-gray-800 flex items-center gap-3">
          {/* Rapid ERP Logo Badge */}
          <div className="w-9 h-9 rounded-xl bg-slate-50 dark:bg-gray-800 border border-slate-200/80 dark:border-gray-700 shadow-xs flex items-center justify-center p-1.5 shrink-0">
            <svg
              viewBox="0 0 36 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full text-[#0070ba]"
            >
              <rect
                x="6"
                y="10"
                width="24"
                height="4"
                rx="2"
                fill="#0070ba"
              />
              <rect
                x="8"
                y="17"
                width="20"
                height="4"
                rx="2"
                fill="#008fd3"
              />
              <rect
                x="10"
                y="24"
                width="16"
                height="4"
                rx="2"
                fill="#10b981"
              />
            </svg>
          </div>

          {!isSidebarCollapsed && (
            <div className="min-w-0">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white tracking-tight leading-tight truncate">
                Rapid ERP
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5 font-normal">
                Powered by Rapid ERP
              </p>
            </div>
          )}
        </div>
      </aside>

      {/* Flyout Submenu Panel (Image 2 Requirement) */}
      {activeFlyoutItem && activeFlyoutItem.subItems && (
        <div
          className={clsx(
            "absolute top-12 z-50 w-72 bg-white dark:bg-slate-900 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-slate-200 dark:border-slate-800 p-4 transition-all duration-200",
            isRTL
              ? isSidebarCollapsed
                ? "right-[80px]"
                : "right-[268px]"
              : isSidebarCollapsed
                ? "left-[80px]"
                : "left-[268px]"
          )}
        >
          {/* Flyout Header */}
          <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#0070ba]/10 text-[#0070ba] flex items-center justify-center">
                <activeFlyoutItem.icon className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-slate-800 dark:text-white">
                {activeFlyoutItem.label}
              </h4>
            </div>
            <button
              onClick={() => setActiveFlyoutKey(null)}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xs font-semibold px-1.5 py-0.5 rounded cursor-pointer"
            >
              ✕
            </button>
          </div>

          {/* Submenu List */}
          <div className="space-y-1">
            {activeFlyoutItem.subItems.map((subItem) => {
              const SubIcon = subItem.icon;
              const isSubActive = location.pathname === subItem.path;

              return (
                <button
                  key={subItem.path}
                  onClick={() => handleSubItemClick(subItem.path)}
                  className={clsx(
                    "sidebar-btn w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs sm:text-[13px] font-medium transition-colors text-left cursor-pointer group",
                    isSubActive
                      ? "text-[#0070ba] font-semibold dark:text-[#38bdf8]"
                      : "text-slate-600 dark:text-slate-300 hover:text-[#0070ba] dark:hover:text-[#38bdf8]"
                  )}
                >
                  <div className="flex items-center gap-2.5">
                    <SubIcon
                      className={clsx(
                        "w-4 h-4 transition-colors",
                        isSubActive
                          ? "text-[#0070ba] dark:text-[#38bdf8]"
                          : "text-slate-400 group-hover:text-[#0070ba] dark:group-hover:text-[#38bdf8]"
                      )}
                    />
                    <span>{subItem.label}</span>
                  </div>

                  <ChevronRight
                    className={clsx(
                      "w-3.5 h-3.5 transition-colors",
                      isSubActive
                        ? "text-[#0070ba] dark:text-[#38bdf8]"
                        : "text-slate-400 group-hover:text-[#0070ba] dark:group-hover:text-[#38bdf8]"
                    )}
                  />
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
