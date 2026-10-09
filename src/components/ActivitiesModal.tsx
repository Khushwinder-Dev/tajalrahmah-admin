import { useState, useMemo } from "react";

const ActivityLogs = () => {
  // Extended sample data with more activities
  const allActivities = [
    {
      id: "LOG-10001",
      user: "John Doe",
      image: "https://i.pravatar.cc/150?img=1",
      action: "Logged in",
      module: "Authentication",
      time: "2025-09-06 10:32 AM",
      status: "success",
      ip: "192.168.1.10",
      device: "Chrome on Windows",
    },
    {
      id: "LOG-10002",
      user: "Jane Smith",
      image: "https://i.pravatar.cc/150?img=2",
      action: "Updated profile",
      module: "Profile",
      time: "2025-09-06 09:45 AM",
      status: "info",
      ip: "192.168.1.11",
      device: "Firefox on Mac",
    },
    {
      id: "LOG-10003",
      user: "Michael Lee",
      image: "https://i.pravatar.cc/150?img=3",
      action: "Deleted a post",
      module: "Posts",
      time: "2025-09-06 09:20 AM",
      status: "danger",
      ip: "192.168.1.12",
      device: "Edge on Windows",
    },
    {
      id: "LOG-10004",
      user: "Sarah Wilson",
      image: "https://i.pravatar.cc/150?img=4",
      action: "Created new post",
      module: "Posts",
      time: "2025-09-06 08:45 AM",
      status: "success",
      ip: "192.168.1.13",
      device: "Safari on Mac",
    },
    {
      id: "LOG-10005",
      user: "David Chen",
      image: "https://i.pravatar.cc/150?img=5",
      action: "Failed login attempt",
      module: "Authentication",
      time: "2025-09-06 08:30 AM",
      status: "danger",
      ip: "192.168.1.14",
      device: "Chrome on Android",
    },
    {
      id: "LOG-10006",
      user: "Emma Davis",
      image: "https://i.pravatar.cc/150?img=6",
      action: "Changed password",
      module: "Security",
      time: "2025-09-06 08:15 AM",
      status: "info",
      ip: "192.168.1.15",
      device: "Firefox on Windows",
    },
    {
      id: "LOG-10007",
      user: "Alex Thompson",
      image: "https://i.pravatar.cc/150?img=7",
      action: "Uploaded file",
      module: "Files",
      time: "2025-09-06 08:00 AM",
      status: "success",
      ip: "192.168.1.16",
      device: "Chrome on Mac",
    },
    {
      id: "LOG-10008",
      user: "Lisa Rodriguez",
      image: "https://i.pravatar.cc/150?img=8",
      action: "Updated settings",
      module: "Settings",
      time: "2025-09-06 07:45 AM",
      status: "info",
      ip: "192.168.1.17",
      device: "Edge on Windows",
    },
    {
      id: "LOG-10009",
      user: "James Miller",
      image: "https://i.pravatar.cc/150?img=9",
      action: "Deleted account",
      module: "Profile",
      time: "2025-09-06 07:30 AM",
      status: "danger",
      ip: "192.168.1.18",
      device: "Safari on iPhone",
    },
  ];

  // State management
  const [selectedModule, setSelectedModule] = useState("All Modules");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [displayCount, setDisplayCount] = useState(3);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Get unique modules and statuses for filter options
  const modules = [
    "All Modules",
    ...new Set(allActivities.map((activity) => activity.module)),
  ];
  const statuses = [
    "All Status",
    ...new Set(allActivities.map((activity) => activity.status)),
  ];

  // Filter activities based on selected filters
  const filteredActivities = useMemo(() => {
    return allActivities.filter((activity) => {
      const moduleMatch =
        selectedModule === "All Modules" || activity.module === selectedModule;
      const statusMatch =
        selectedStatus === "All Status" || activity.status === selectedStatus;
      return moduleMatch && statusMatch;
    });
  }, [selectedModule, selectedStatus]);

  // Get activities to display based on current display count
  const activitiesToShow = filteredActivities.slice(0, displayCount);

  // Handle refresh
  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate API call delay
    setTimeout(() => {
      setDisplayCount(3);
      setIsRefreshing(false);
    }, 1000);
  };

  // Handle load more
  const handleLoadMore = () => {
    setDisplayCount((prev) => Math.min(prev + 3, filteredActivities.length));
  };

  // Calculate stats based on filtered data
  const stats = {
    total: filteredActivities.length,
    active: filteredActivities.filter((a) => a.status === "success").length,
    failed: filteredActivities.filter((a) => a.status === "danger").length,
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "bg-green-100 text-green-800 border-green-200";
      case "info":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "danger":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
        );
      case "info":
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
        );
      case "danger":
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">
            Activity Logs
          </h1>
          <p className="text-slate-600">
            Monitor and track user activities across your system
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">
                  Total Activities
                </p>
                <p className="text-2xl font-bold text-slate-900">
                  {stats.total}
                </p>
              </div>
              <div className="bg-blue-100 rounded-full p-3">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">
                  Successful Activities
                </p>
                <p className="text-2xl font-bold text-slate-900">
                  {stats.active}
                </p>
              </div>
              <div className="bg-green-100 rounded-full p-3">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">
                  Failed Attempts
                </p>
                <p className="text-2xl font-bold text-slate-900">
                  {stats.failed}
                </p>
              </div>
              <div className="bg-red-100 rounded-full p-3">
                <svg
                  className="w-6 h-6 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 mb-6">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-4">
              <select
                value={selectedModule}
                onChange={(e) => {
                  setSelectedModule(e.target.value);
                  setDisplayCount(3);
                }}
                className="px-4 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {modules.map((module) => (
                  <option key={module} value={module}>
                    {module}
                  </option>
                ))}
              </select>
              <select
                value={selectedStatus}
                onChange={(e) => {
                  setSelectedStatus(e.target.value);
                  setDisplayCount(3);
                }}
                className="px-4 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status === "All Status"
                      ? status
                      : status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  const dataStr = JSON.stringify(filteredActivities, null, 2);
                  const dataBlob = new Blob([dataStr], {
                    type: "application/json",
                  });
                  const url = URL.createObjectURL(dataBlob);
                  const link = document.createElement("a");
                  link.href = url;
                  link.download = "activity-logs.json";
                  link.click();
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                Export
              </button>
              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isRefreshing && (
                  <svg
                    className="animate-spin w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                )}
                Refresh
              </button>
            </div>
          </div>
        </div>

        {/* Results Info */}
        <div className="mb-4">
          <p className="text-sm text-slate-600">
            Showing {activitiesToShow.length} of {filteredActivities.length}{" "}
            activities
            {(selectedModule !== "All Modules" ||
              selectedStatus !== "All Status") && (
              <span className="ml-2 text-blue-600">
                (filtered by{" "}
                {selectedModule !== "All Modules" ? selectedModule : ""}
                {selectedModule !== "All Modules" &&
                selectedStatus !== "All Status"
                  ? " and "
                  : ""}
                {selectedStatus !== "All Status" ? selectedStatus : ""})
              </span>
            )}
          </p>
        </div>

        {/* Activity Cards */}
        <div className="space-y-4">
          {activitiesToShow.length > 0 ? (
            activitiesToShow.map((activity) => (
              <div
                key={activity.id}
                className="bg-white rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow duration-200"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      {/* User Avatar */}
                      <div className="relative">
                        <img
                          src={activity.image}
                          alt={activity.user}
                          className="w-12 h-12 rounded-full border-2 border-slate-200"
                        />
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
                      </div>

                      {/* Activity Details */}
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-slate-900">
                            {activity.user}
                          </h3>
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                              activity.status
                            )}`}
                          >
                            {getStatusIcon(activity.status)}
                            {activity.status.charAt(0).toUpperCase() +
                              activity.status.slice(1)}
                          </span>
                        </div>

                        <div className="text-slate-600 mb-3">
                          <span className="font-medium text-slate-800">
                            {activity.action}
                          </span>{" "}
                          in {activity.module}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-slate-500">
                          <div className="flex items-center gap-2">
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            <span>{activity.time}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0 0V3"
                              />
                            </svg>
                            <span>{activity.ip}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                              />
                            </svg>
                            <span>{activity.device}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Log ID */}
                    <div className="text-right">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-mono">
                        {activity.id}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
              <div className="text-slate-400 mb-4">
                <svg
                  className="w-16 h-16 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-slate-900 mb-2">
                No activities found
              </h3>
              <p className="text-slate-500">
                Try adjusting your filters to see more results.
              </p>
            </div>
          )}
        </div>

        {/* Load More Button */}
        {filteredActivities.length > displayCount && (
          <div className="mt-8 text-center">
            <button
              onClick={handleLoadMore}
              className="px-6 py-3 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors font-medium"
            >
              Load More Activities ({filteredActivities.length - displayCount}{" "}
              remaining)
            </button>
          </div>
        )}

        {/* Show message when all items are loaded */}
        {filteredActivities.length > 0 &&
          filteredActivities.length <= displayCount && (
            <div className="mt-8 text-center">
              <p className="text-slate-500 text-sm">All activities loaded</p>
            </div>
          )}
      </div>
    </div>
  );
};

export default ActivityLogs;
