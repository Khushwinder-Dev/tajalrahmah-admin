/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  Archive,
  Trash2,
  Edit,
  Eye,
  Settings,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";

type TabId = "total" | "draft" | "active" | "inactive" | "deleted" | "updated";
type TabColor = "blue" | "orange" | "green" | "gray" | "red";

interface TabData {
  count: number;
  unread: number;
  color: TabColor;
}

interface TabConfig {
  id: TabId;
  label: string;
  icon: any;
  description: string;
}

interface MaterialGmailTabsProps {
  dataTableFilter: any;
  setDataTableFilter: any;
  viewMode?: string;
  setViewMode: (viewMode: string) => void;
  setIsExportOpen?: (isExportOpen: boolean) => void;
  isExportOpen?: boolean;
  setIsFilterOpen?: (isFilterOpen: boolean) => void;
  setShowVisibility?: (showVisibility: boolean) => void;
}

const MaterialGmailTabs: React.FC<MaterialGmailTabsProps> = ({
  dataTableFilter,
  setDataTableFilter,
}) => {
  const [activeTab, setActiveTab] = useState<TabId>("total");
  const [hiddenTabs] = useState<TabId[]>([]);
  const [transitioning, setTransitioning] = useState(false);

  const handleTabChange = (tabId: TabId, label: string) => {
    if (transitioning || activeTab === tabId) return;

    setTransitioning(true);
    setTimeout(() => {
      setActiveTab(tabId);
      setDataTableFilter({ ...dataTableFilter, status: label });
      setTransitioning(false);
    }, 150); // Match this duration with the CSS transition duration
  };

  // Sample data for demonstration
  const tabData: Record<TabId, TabData> = {
    total: { count: 1247, unread: 23, color: "blue" },
    active: { count: 892, unread: 15, color: "green" },
    inactive: { count: 203, unread: 3, color: "gray" },
    draft: { count: 8, unread: 0, color: "orange" },
    deleted: { count: 144, unread: 5, color: "red" },
    updated: { count: 144, unread: 5, color: "green" },
  };

  const tabConfig: TabConfig[] = [
    {
      id: "total",
      label: "Total",
      icon: Eye,
      description: "All items",
    },
    {
      id: "active",
      label: "Active",
      icon: Archive,
      description: "Active items",
    },
    {
      id: "inactive",
      label: "Inactive",
      icon: Settings,
      description: "Inactive items",
    },
    {
      id: "draft",
      label: "Draft",
      icon: Edit,
      description: "Draft items",
    },
    {
      id: "updated",
      label: "Updated",
      icon: CheckCircle2,
      description: "Updated items",
    },
    {
      id: "deleted",
      label: "Deleted",
      icon: Trash2,
      description: "Deleted items",
    },
  ];

  const visibleTabs = tabConfig.filter((tab) => !hiddenTabs.includes(tab.id));

  // const handleExportClick = () => {
  //   setIsExportOpen?.(!isExportOpen);
  //   setIsFilterOpen?.(false);
  //   setShowVisibility?.(false);
  // };

  return (
    <>
      <style>{`
        .pill-tabs-container {
          font-family: 'Google Sans', 'Inter', system-ui, -apple-system, sans-serif;
          width: 100%;
        }

        .tabs-container-wrapper {
          background: #F2F0EF;
          border: 1px solid #e8eaed;
          border-radius: 50px;
          width: 100%;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }

        .pill-tabs-wrapper {
          display: flex;
          gap: 4px;
          width: 100%;
          overflow-x: auto;
          scrollbar-width: none;
          -ms-overflow-style: none;
          position: relative;
        }

        .pill-tabs-wrapper::-webkit-scrollbar {
          display: none;
        }

        .pill-tab {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 22px 4px;
          border: none;
          background: #F2F0EF;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border-radius: 60px;
          flex: 1;
          min-width: 0;
          color: #002F72;
          font-size: 16px;
          font-weight: 500;
          letter-spacing: 0.1px;
          min-height: 30px;
          transform-origin: center;
          will-change: transform, background, color;
          overflow: hidden;
        }

        /* Background animation pseudo-element - ONLY for active state */
        .pill-tab::before {
          content: '';
          position: absolute;
          top: 0;
          left: 50%;
          width: 0%;
          height: 100%;
          background: #1976d2;
          border-radius: 80px;
          transform: translateX(-50%);
          transition: width 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          z-index: 0;
        }

        /* Hover state - normal background fill, no center-to-edges animation */
        .pill-tab:hover:not(.active) {
          background: #9dccfa;
          color: white;
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 4px 12px rgba(25, 118, 210, 0.3);
        }

        /* Active state - center-to-edges animation */
        .pill-tab.active::before {
          width: 100%;
          background: #1976d2;
        }

        .pill-tab:focus-visible {
          outline: 3px solid #9dccfa;
          outline-offset: 2px;
        }

        .pill-tab.active {
          color: white;
          font-weight: 100;
          transform: translateY(-2px) scale(1.03);
          z-index: 1;
          background: transparent;
        }

        .pill-tab-content {
          display: flex;
          align-items: center;
          gap: 8px;
          justify-content: center;
          flex-direction: row;
          min-width: 0;
          width: 100%;
          border-radius: 80px;
          padding: 4px 8px;
          transition: all 0.3s ease;
          position: relative;
          z-index: 1;
        }

        .pill-tab-icon {
          width: 20px;
          height: 20px;
          flex-shrink: 0;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.3s ease;
        }

        .pill-tab.active .pill-tab-icon {
          transform: scale(1.1);
        }

        .pill-tab-label {
          font-weight: inherit;
          font-size: inherit;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          min-width: 0;
          display: inline-block;
          text-align: left;
          margin: 0;
          line-height: 1;
          transition: all 0.3s ease;
        }

        .pill-tab.active .pill-tab-label {
          font-weight: 500;
          letter-spacing: 0.2px;
        }

        .pill-tab-badge {
          padding: 4px 8px;
          border-radius: 80px;
          font-size: 12px;
          font-weight: 800;
          min-width: 24px;
          text-align: center;
          line-height: 1;
          flex-shrink: 0;
          background: rgba(255, 255, 255, 0.2);
          color: inherit;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .pill-tab:not(.active) .pill-tab-badge {
          background: rgba(0, 0, 0, 0.1);
          color: #495057;
        }

        .pill-tab:hover:not(.active) .pill-tab-badge {
          background: rgba(255, 255, 255, 0.3);
          color: white;
        }

        .pill-tab.active .pill-tab-badge {
          transform: scale(1.1);
          background: rgba(255, 255, 255, 0.4);
        }

        /* Ripple effect */
        .pill-tab::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 5px;
          height: 5px;
          background: rgba(255, 255, 255, 0.5);
          opacity: 0;
          border-radius: 100%;
          transform: scale(1, 1) translate(-50%, -50%);
          transform-origin: 50% 50%;
          z-index: 2;
        }

        .pill-tab.active::after {
          animation: ripple 0.6s ease-out;
        }

        @keyframes ripple {
          0% {
            transform: scale(0, 0) translate(-50%, -50%);
            opacity: 0.5;
          }
          100% {
            transform: scale(20, 20) translate(-50%, -50%);
            opacity: 0;
          }
        }

        /* Responsive breakpoints */
        @media (max-width: 1024px) {
          .pill-tab {
            padding: 14px 18px;
            font-size: 15px;
          }
          
          .pill-tab-icon {
            width: 18px;
            height: 18px;
          }
        }

        @media (max-width: 768px) {
          .tabs-container-wrapper {
            padding: 6px;
          }

          .pill-tabs-wrapper {
            gap: 3px;
          }
          
          .pill-tab {
            padding: 12px 16px;
            font-size: 14px;
            min-height: 48px;
          }

          .pill-tab-icon {
            width: 16px;
            height: 16px;
          }

          .pill-tab-badge {
            font-size: 11px;
            padding: 3px 6px;
            min-width: 20px;
          }

          .pill-tab-content {
            gap: 6px;
          }
        }

        @media (max-width: 640px) {
          .tabs-container-wrapper {
            padding: 5px;
          }

          .pill-tabs-wrapper {
            overflow-x: scroll;
            scrollbar-width: thin;
            scrollbar-color: #ccc transparent;
            gap: 2px;
          }

          .pill-tabs-wrapper::-webkit-scrollbar {
            display: block;
            height: 4px;
          }

          .pill-tabs-wrapper::-webkit-scrollbar-track {
            background: transparent;
          }

          .pill-tabs-wrapper::-webkit-scrollbar-thumb {
            background: #ccc;
            border-radius: 2px;
          }
          
          .pill-tab {
            flex: 0 0 auto;
            min-width: 120px;
            padding: 10px 14px;
            font-size: 13px;
          }
          
          .pill-tab-content {
            gap: 5px;
          }

          .pill-tab-icon {
            width: 14px;
            height: 14px;
          }
        }

        @media (max-width: 480px) {
          .pill-tab {
            min-width: 100px;
            padding: 8px 12px;
            font-size: 12px;
          }

          .pill-tab-content {
            gap: 4px;
          }

          .pill-tab-badge {
            font-size: 10px;
            padding: 2px 5px;
            min-width: 18px;
          }
        }

        @media (max-width: 360px) {
          .pill-tab {
            min-width: 90px;
            padding: 6px 10px;
            font-size: 11px;
          }

          .pill-tab-content {
            gap: 3px;
          }
        }
      `}</style>

      <div className="w-full pill-tabs-container mt-4 px-4">
        <div className="tabs-container-wrapper">
          <div className="pill-tabs-wrapper" role="tablist">
            {visibleTabs.map((tab) => {
              const data = tabData[tab.id];
              const isActive = activeTab === tab.id;
              const IconComponent = tab.icon;

              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id, tab.label)}
                  className={cn(
                    "pill-tab",
                    isActive && "active",
                    transitioning && "pointer-events-none"
                  )}
                  aria-label={`${tab.label} - ${data.count} items`}
                  role="tab"
                  aria-selected={isActive}
                  tabIndex={isActive ? 0 : -1}
                  id={`tab-${tab.id}`}
                  aria-controls={`tabpanel-${tab.id}`}
                >
                  <div className="pill-tab-content">
                    <IconComponent className="pill-tab-icon" />
                    <span className="pill-tab-label">{tab.label}</span>
                    <span className="pill-tab-badge">{data.count}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default MaterialGmailTabs;
