// hooks/useNotificationWebSocket.ts
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { connectStart, disconnect } from "../store/websocketSlice";
import type { RootState } from "../store";

export const useNotificationWebSocket = () => {
  const dispatch = useAppDispatch();
  const { connected, connecting, error } = useAppSelector(
    (state: RootState) => state.websocket
  );
  const { unreadCount } = useAppSelector(
    (state: RootState) => state.notifications
  );

  const connect = () => {
    if (!connected && !connecting) {
      dispatch(connectStart());
    }
  };

  const disconnectWs = () => {
    dispatch(disconnect());
  };

  useEffect(() => {
    // Auto-connect when component mounts
    connect();

    // Cleanup on unmount
    return () => {
      disconnectWs();
    };
  }, []);

  return {
    connected,
    connecting,
    error,
    unreadCount,
    connect,
    disconnect: disconnectWs,
  };
};
