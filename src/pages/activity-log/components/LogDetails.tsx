// LogDetails.tsx
import type { ActivityLogType } from "../ActivityLogPage";
import {
  Wifi,
  WifiOff,
  Clock,
  Monitor,
  MapPin,
  User,
  Settings,
} from "lucide-react";

type Props = {
  selectedItem: ActivityLogType;
  connected?: boolean; // Added optional prop
  lastUpdated?: number | null; // Added optional prop
};

const LogDetails = ({
  selectedItem,
  connected = false,
  lastUpdated,
}: Props) => {
  // Helper function to get status badge
  const getStatusBadge = (status: string = "Success") => {
    const statusConfig = {
      Success: { icon: "✅", color: "text-green-600", bg: "bg-green-50" },
      Failed: { icon: "❌", color: "text-red-600", bg: "bg-red-50" },
      Pending: { icon: "⏳", color: "text-yellow-600", bg: "bg-yellow-50" },
    };

    const config =
      statusConfig[status as keyof typeof statusConfig] || statusConfig.Success;

    return (
      <span
        className={`${config.color} ${config.bg} px-2 py-1 rounded-full text-sm font-medium flex items-center gap-2`}
      >
        <span>{config.icon}</span> {status}
      </span>
    );
  };

  // Helper function to format detailed info
  const getDetailedInfo = (item: ActivityLogType) => {
    return {
      actionId: item.id
        ? `#LOG-${String(item.id).padStart(5, "0")}`
        : "#LOG-00000",
      module: item.module || "User Management",
      performedBy: item.userId || "Admin",
      when: item.time,
      status: "Success",
      ipAddress: "192.168.1.22", // This would come from server in real app
      device: "Chrome on Windows", // This would come from server in real app
      action: item.action || item.title,
      oldValue: item.details?.oldValue || "User → Moderator",
      newValue: item.details?.newValue || "Moderator → Admin",
    };
  };

  if (!selectedItem) {
    return (
      <div className="flex-1 h-[calc(100vh-210px)] overflow-y-auto">
        <div className="flex flex-col items-center justify-center h-full text-gray-500">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
            📋
          </div>
          <p className="text-lg font-medium">No log selected</p>
          <p className="text-sm">Select an activity log to view details</p>
        </div>
      </div>
    );
  }

  const detailInfo = getDetailedInfo(selectedItem);

  return (
    <div className="flex-1 h-[calc(100vh-210px)] overflow-y-auto">
      <div className="mx-auto border border-gray-200 rounded-xl p-6 bg-white space-y-4">
        {/* Connection Status Banner */}
        {connected !== undefined && (
          <div
            className={`flex items-center gap-2 p-3 rounded-lg text-sm ${
              connected
                ? "bg-green-50 text-green-700 border border-green-200"
                : "bg-red-50 text-red-700 border border-red-200"
            }`}
          >
            {connected ? <Wifi size={16} /> : <WifiOff size={16} />}
            <span>
              {connected
                ? "Real-time updates active"
                : "Offline - Using cached data"}
            </span>
            {lastUpdated && (
              <span className="ml-auto text-xs opacity-75">
                Last updated: {new Date(lastUpdated).toLocaleTimeString()}
              </span>
            )}
          </div>
        )}

        {/* User Info Header */}
        <div className="flex items-center space-x-4">
          <img
            src={selectedItem.image}
            alt="user"
            className="w-12 h-12 rounded-full object-cover border"
            onError={(e) => {
              e.currentTarget.src = "/default-avatar.jpg";
            }}
          />
          <div className="flex-1">
            <p className="text-lg font-semibold text-gray-800">
              {selectedItem.userName}
            </p>
            <p className="text-xs text-gray-500 uppercase flex items-center gap-1">
              <Clock size={12} />
              {selectedItem.time}
            </p>
          </div>

          {/* Real-time indicator for new items */}
          {selectedItem.timestamp &&
            Date.now() - selectedItem.timestamp < 300000 && (
              <div className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                Recent
              </div>
            )}
        </div>

        {/* Action Summary */}
        <div className="border-t pt-4">
          <p className="text-gray-700 font-semibold flex items-center gap-2">
            <Settings size={16} />
            Action: {selectedItem.title}
          </p>

          <div className="mt-2">
            <p className="font-medium text-gray-700">System Message:</p>
            <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg mt-1">
              User <b>{selectedItem.userName}</b> performed{" "}
              <b>{selectedItem.title}</b> action <b>{selectedItem.time}</b> in
              the system.
            </p>
          </div>
        </div>

        {/* Detailed Log Information */}
        <div className="border-t pt-4">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            📊 Log Details
          </h2>

          <div className="grid grid-cols-2 gap-x-6 gap-y-4 text-gray-700">
            <div>
              <p className="text-sm font-medium text-gray-500 flex items-center gap-1">
                <span>🆔</span> Action ID
              </p>
              <p className="text-base font-semibold text-gray-900">
                {detailInfo.actionId}
              </p>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-500 flex items-center gap-1">
                <span>📦</span> Module
              </p>
              <p className="text-base font-semibold text-gray-900">
                {detailInfo.module}
              </p>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-500 flex items-center gap-1">
                <User size={14} /> Performed By
              </p>
              <p className="text-base font-semibold text-gray-900">
                {detailInfo.performedBy}
              </p>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-500 flex items-center gap-1">
                <Clock size={14} /> When
              </p>
              <p className="text-base font-semibold text-gray-900">
                {detailInfo.when}
              </p>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-500">Status</p>
              <div className="mt-1">{getStatusBadge(detailInfo.status)}</div>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-500 flex items-center gap-1">
                <MapPin size={14} /> IP Address
              </p>
              <p className="text-base font-semibold text-gray-900">
                {detailInfo.ipAddress}
              </p>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-500 flex items-center gap-1">
                <Monitor size={14} /> Device
              </p>
              <p className="text-base font-semibold text-gray-900">
                {detailInfo.device}
              </p>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-500">Action</p>
              <p className="text-base font-semibold text-gray-900">
                {detailInfo.action}
              </p>
            </div>

            {/* Change Details */}
            {(selectedItem.details?.oldValue ||
              selectedItem.details?.newValue) && (
              <>
                <div className="col-span-2">
                  <p className="text-sm font-medium text-gray-500">
                    📄 Old Value
                  </p>
                  <p className="text-base font-semibold text-gray-900 bg-red-50 p-2 rounded">
                    {detailInfo.oldValue}
                  </p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm font-medium text-gray-500">
                    📝 New Value
                  </p>
                  <p className="text-base font-semibold text-gray-900 bg-green-50 p-2 rounded">
                    {detailInfo.newValue}
                  </p>
                </div>
              </>
            )}

            {/* Additional Details */}
            {selectedItem.details && (
              <div className="col-span-2">
                <p className="text-sm font-medium text-gray-500">
                  🔍 Additional Details
                </p>
                <pre className="text-sm bg-gray-50 p-3 rounded mt-1 overflow-x-auto">
                  {JSON.stringify(selectedItem.details, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </div>

        {/* Timestamp Info */}
        {selectedItem.timestamp && (
          <div className="border-t pt-4 text-xs text-gray-500">
            <p>
              Raw timestamp: {new Date(selectedItem.timestamp).toLocaleString()}
            </p>
            <p>Log ID: {selectedItem.id}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LogDetails;
