/* eslint-disable @typescript-eslint/no-explicit-any */
// store/websocketSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface WebSocketState {
  connected: boolean;
  connecting: boolean;
  error: string | null;
  lastMessage: any;
}

const initialState: WebSocketState = {
  connected: false,
  connecting: false,
  error: null,
  lastMessage: null,
};

export const websocketSlice = createSlice({
  name: "websocket",
  initialState,
  reducers: {
    connectStart: (state) => {
      state.connecting = true;
      state.error = null;
    },
    connectSuccess: (state) => {
      state.connected = true;
      state.connecting = false;
      state.error = null;
    },
    connectFailure: (state, action: PayloadAction<string>) => {
      state.connected = false;
      state.connecting = false;
      state.error = action.payload;
    },
    disconnect: (state) => {
      state.connected = false;
      state.connecting = false;
      state.error = null;
    },
    messageReceived: (state, action: PayloadAction<any>) => {
      state.lastMessage = action.payload;
    },
  },
});

export const {
  connectStart,
  connectSuccess,
  connectFailure,
  disconnect,
  messageReceived,
} = websocketSlice.actions;

export default websocketSlice.reducer;
