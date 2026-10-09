// LogcardPart.tsx
import { cn } from "@/lib/utils";
import type { ActivityLogType } from "../ActivityLogPage";

type Props = {
  activityLogData: ActivityLogType[];
  selectedItem: ActivityLogType;
  setSelectedItem: (item: ActivityLogType) => void; // Changed this line
  loading?: boolean; // Added optional props
  totalCount?: number; // Added optional props
};

const LogcardPart = ({
  activityLogData,
  selectedItem,
  setSelectedItem,
  loading = false,
  totalCount = 0,
}: Props) => {
  return (
    <div className="flex-1 overflow-y-auto h-[calc(100vh-210px)] scroll-smooth">
      {/* Loading indicator */}
      {loading && (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <span className="ml-2 text-gray-600">Loading activities...</span>
        </div>
      )}

      {/* Total count indicator */}
      {totalCount > 0 && !loading && (
        <div className="text-sm text-gray-500 mb-4 px-4">
          Showing {activityLogData.length} of {totalCount} activities
        </div>
      )}

      {/* Activity logs */}
      {activityLogData.map((item, index) => (
        <div
          key={item.id || index} // Use item.id for better key
          className="flex gap-4 relative group before:h-full before:w-[1px] before:bg-primary before:absolute before:ml-[25px] before:left-0 before:top-2"
        >
          <div className="w-[50px] h-[50px] relative bg-primary rounded-full aspect-square overflow-hidden border-primary border-2">
            <img
              src={item.image}
              alt="User Image"
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback to default avatar if image fails to load
                e.currentTarget.src = "/default-avatar.jpg";
              }}
            />
          </div>

          <div
            onClick={() => setSelectedItem(item)}
            className={cn(
              "flex flex-col border rounded-xl p-4 mb-4 transition-colors duration-200 cursor-pointer flex-1",
              selectedItem?.id === item.id
                ? "border-sky-500 bg-sky-50"
                : "border-gray-200 hover:border-gray-400"
            )}
          >
            <div className="flex justify-between items-center mb-2">
              <p className="text-xs text-gray-500 uppercase">{item.time}</p>
              <p className="text-sm text-gray-700 font-medium capitalize">
                {item.userName}
              </p>
            </div>
            <p className="text-sm text-gray-900 font-semibold truncate">
              {item.title}
            </p>

            {/* Real-time indicator for new items */}
            {item.timestamp && Date.now() - item.timestamp < 60000 && (
              <div className="flex items-center gap-1 mt-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-green-600">New</span>
              </div>
            )}
          </div>
        </div>
      ))}

      {/* Empty state */}
      {!loading && activityLogData.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-gray-500">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
            📝
          </div>
          <p className="text-lg font-medium">No activity logs found</p>
          <p className="text-sm">Activity logs will appear here in real-time</p>
        </div>
      )}
    </div>
  );
};

export default LogcardPart;
