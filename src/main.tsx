import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./store";
import { MantineProvider, createTheme } from "@mantine/core";
import "@mantine/core/styles.css"; // <-- Required for styles
import "./index.css";
import "./i18n";
import { Toaster } from "react-hot-toast";

// Optional custom theme
const theme = createTheme({
  primaryColor: "blue",
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MantineProvider theme={theme}>
          <Toaster
            position="top-right"
            reverseOrder={false}
            toastOptions={{
              style: {
                minWidth: "400px",
              },
            }}
          />
          <App />
        </MantineProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
