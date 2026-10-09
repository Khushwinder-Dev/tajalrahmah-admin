// hooks/useRealTimeActivityLogs.ts
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { useNotificationWebSocket } from "./useNotificationWebSocket";
import { setLoading } from "../store/activityLogSlice";

export const useRealTimeActivityLogs = () => {
  const dispatch = useAppDispatch();
  const { connected } = useNotificationWebSocket();

  const {
    logs,
    selectedLog,
    loading,
    error,
    lastUpdated,
    totalCount,
    hasMore,
  } = useAppSelector((state) => state.activityLogs);

  // Load initial activity logs when WebSocket connects
  useEffect(() => {
    if (connected) {
      console.log("🔌 WebSocket connected, requesting activity logs sync");
      // You could send a message to request initial data
      // wsService.send({ type: 'REQUEST_ACTIVITY_LOGS', payload: { limit: 50 } });
    }
  }, [connected]);

  // Function to request more logs (for pagination)
  const loadMoreLogs = () => {
    if (connected && hasMore && !loading) {
      // Send request for more logs
      // wsService.send({
      //   type: 'REQUEST_MORE_ACTIVITY_LOGS',
      //   payload: { offset: logs.length, limit: 20 }
      // });
    }
  };

  // Function to refresh logs
  const refreshLogs = () => {
    if (connected) {
      dispatch(setLoading(true));
      // wsService.send({ type: 'REQUEST_ACTIVITY_LOGS_REFRESH' });
    }
  };

  return {
    logs,
    selectedLog,
    loading,
    error,
    lastUpdated,
    totalCount,
    hasMore,
    connected,
    loadMoreLogs,
    refreshLogs,
  };
};
