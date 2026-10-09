// hooks/useWebSocket.ts
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { connectStart, disconnect } from "../store/websocketSlice";
import type { RootState } from "../store";

export const useWebSocket = () => {
  const dispatch = useAppDispatch();
  const { connected, connecting, error } = useAppSelector(
    (state: RootState) => state.websocket
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
    return () => {
      disconnectWs();
    };
  }, []);

  return {
    connected,
    connecting,
    error,
    connect,
    disconnect: disconnectWs,
  };
};
