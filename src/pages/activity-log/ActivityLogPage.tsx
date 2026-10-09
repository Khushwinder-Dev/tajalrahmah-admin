/* eslint-disable @typescript-eslint/no-explicit-any */
// ActivityLogPage.tsx
import { useState, useEffect } from "react";
import PageHeader from "./components/PageHeader";
import LogcardPart from "./components/LogcardPart";
import LogDetails from "./components/LogDetails";
import { useAppDispatch, useAppSelector } from "@/store";
import { setSelectedLog } from "@/store/activityLogSlice";
import { useRealTimeActivityLogs } from "@/hooks/useRealTimeActivityLogs";

export type ActivityLogType = {
  id: number;
  time: string;
  title: string;
  userName: string;
  image: string;
  date: string;
  timestamp?: number;
  userId?: string;
  action?: string;
  module?: string;
  details?: any;
};

// Fallback mock data with unique IDs and timestamps
const mockActivityLogData: ActivityLogType[] = [
  {
    id: 10001, // Use higher IDs to avoid conflicts
    time: "1 hour ago",
    title: "Created user",
    userName: "Ayesha K.",
    image: "customer-dummy-image.jpg",
    date: "2025-08-04",
    timestamp: Date.now() - 3600000,
    action: "user_create",
    module: "user_management",
  },
  {
    id: 10002,
    time: "2 hours ago",
    title: "Deleted task",
    userName: "Rahim Uddin",
    image: "customer-dummy-image.jpg",
    date: "2025-08-04",
    timestamp: Date.now() - 7200000,
    action: "task_delete",
    module: "task_management",
  },
  {
    id: 10003,
    time: "5 hours ago",
    title: "Updated settings",
    userName: "Sadia N.",
    image: "customer-dummy-image.jpg",
    date: "2025-08-04",
    timestamp: Date.now() - 18000000,
    action: "settings_update",
    module: "system",
  },
  {
    id: 10004,
    time: "12 hours ago",
    title: "Logged in",
    userName: "Tanvir H.",
    image: "customer-dummy-image.jpg",
    date: "2025-08-04",
    timestamp: Date.now() - 43200000,
    action: "user_login",
    module: "authentication",
  },
];

export default function ActivityLogPage() {
  const dispatch = useAppDispatch();
  const { selectedLog } = useAppSelector((state) => state.activityLogs);
  const { logs, loading, lastUpdated, totalCount, connected } =
    useRealTimeActivityLogs();

  const [dateValue, setDateValue] = useState<[string | null, string | null]>([
    null,
    null,
  ]);

  // Combine and deduplicate logs
  const activityLogData = (() => {
    // Create a Map to track unique logs by ID
    const logMap = new Map<number, ActivityLogType>();

    // Add real-time logs first (they take priority)
    logs.forEach((log) => {
      logMap.set(log.id, log);
    });

    // Add mock data only if the ID doesn't already exist
    mockActivityLogData.forEach((mockLog) => {
      if (!logMap.has(mockLog.id)) {
        logMap.set(mockLog.id, mockLog);
      }
    });

    // Convert back to array and sort by timestamp (newest first)
    return Array.from(logMap.values()).sort((a, b) => {
      const timestampA = a.timestamp || 0;
      const timestampB = b.timestamp || 0;
      return timestampB - timestampA;
    });
  })();

  // Set initial selected item
  useEffect(() => {
    if (activityLogData.length > 0 && !selectedLog) {
      dispatch(setSelectedLog(activityLogData[0]));
    }
  }, [activityLogData, selectedLog, dispatch]);

  // Filter activityLogData based on dateValue
  const filteredData = (() => {
    const [start, end] = dateValue;
    if (!start || !end) return activityLogData;
    return activityLogData.filter((item) => {
      return item.date >= start && item.date <= end;
    });
  })();

  const handleItemSelect = (item: ActivityLogType) => {
    dispatch(setSelectedLog(item));
  };

  return (
    <div className="w-100vw px-2 py-4 dark:bg-gray-900">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-4">
        <PageHeader value={dateValue} setValue={setDateValue} />
      </div>

      <div className="flex gap-8">
        {/* card part */}
        <LogcardPart
          activityLogData={filteredData}
          selectedItem={selectedLog || filteredData[0]}
          setSelectedItem={handleItemSelect}
          loading={loading}
          totalCount={totalCount}
        />

        {/* display part will be here */}
        <LogDetails
          selectedItem={selectedLog || filteredData[0]}
          connected={connected}
          lastUpdated={lastUpdated}
        />
      </div>
    </div>
  );
}
