/* eslint-disable @typescript-eslint/no-explicit-any */
// middleware/websocketMiddleware.ts
import type { Middleware } from "@reduxjs/toolkit";
import { WebSocketService } from "../src/services/websocket";
import {
  connectStart,
  connectSuccess,
  connectFailure,
  disconnect,
  messageReceived,
} from "../src/store/websocketSlice";
import {
  addNotification,
  updateUnreadCount,
  setNotifications,
} from "../src/store/notificationSlice";
import {
  addNewLog,
  removeLog,
  setLogs,
  setTotalCount,
  updateLog,
} from "@/store/activityLogSlice";

let wsService: WebSocketService | null = null;

export const websocketMiddleware: Middleware =
  (store) => (next) => (action: any) => {
    const result = next(action);

    switch (action.type) {
      case connectStart.type:
        console.log("VITE_WS_SERVER", import.meta.env.VITE_WS_SERVER); // Changed from process.env

        if (!wsService) {
          wsService = new WebSocketService(
            import.meta.env.VITE_WS_SERVER || "ws://localhost:8080" // Changed from process.env
          );
        }

        wsService
          .connect((message) => {
            console.log("📨 WebSocket message received:", message);
            store.dispatch(messageReceived(message));

            // Handle different message types
            switch (message.type) {
              case "NEW_NOTIFICATION":
                console.log("🔔 Adding new notification:", message.payload);
                store.dispatch(addNotification(message.payload));
                break;
              case "NOTIFICATION_COUNT_UPDATE":
                console.log(
                  "🔢 Updating notification count:",
                  message.payload.count
                );
                store.dispatch(updateUnreadCount(message.payload.count));
                break;
              case "NOTIFICATIONS_SYNC":
                console.log(
                  "🔄 Syncing notifications:",
                  message.payload.notifications
                );
                store.dispatch(setNotifications(message.payload.notifications));
                break;
              case "NEW_ACTIVITY_LOG":
                console.log("📝 New activity log received:", message.payload);
                store.dispatch(addNewLog(message.payload));
                break;

              case "ACTIVITY_LOGS_SYNC":
                console.log("🔄 Syncing activity logs:", message.payload.logs);
                store.dispatch(setLogs(message.payload.logs));
                if (message.payload.totalCount) {
                  store.dispatch(setTotalCount(message.payload.totalCount));
                }
                break;

              case "ACTIVITY_LOG_UPDATED":
                console.log("📝 Activity log updated:", message.payload);
                store.dispatch(
                  updateLog({
                    id: message.payload.id,
                    data: message.payload.data,
                  })
                );
                break;

              case "ACTIVITY_LOG_DELETED":
                console.log("🗑️ Activity log deleted:", message.payload.id);
                store.dispatch(removeLog(message.payload.id));
                break;
              // Add other message types as needed
              default:
                console.log("❓ Unknown message type:", message.type);
            }
          })
          .then(() => {
            console.log("✅ WebSocket connected successfully");
            store.dispatch(connectSuccess());
          })
          .catch((error) => {
            console.error("❌ WebSocket connection failed:", error);
            store.dispatch(connectFailure(error.message));
          });
        break;

      case disconnect.type:
        console.log("🔌 Disconnecting WebSocket");
        if (wsService) {
          wsService.disconnect();
          wsService = null;
        }
        break;
    }

    return result;
  };
