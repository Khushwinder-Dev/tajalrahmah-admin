/* eslint-disable @typescript-eslint/no-explicit-any */
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useInactivityTimer } from "./hooks/useInactivityTimer";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import ForgotPassword from "./pages/ForgotPassword";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoute from "./routes/ProtectedRoute";

// countries
import CountryPage from "./pages/Country/CountriesPage";
import CountryDetails from "./pages/Country/CountryDetails";
import CountryNewPage from "./pages/Country/CountryPage";
import CountryFormPage from "./pages/Country/CreatePage";
import EditPage from "./pages/Country/EditPage";
import { LockScreen } from "./components/common/LockScreen";
import { cn } from "./lib/utils";

function App() {
  const { i18n } = useTranslation();
  const isAuthenticated = useSelector(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (state: any) => state.auth.isAuthenticated
  );

  useEffect(() => {
    const savedLang = localStorage.getItem("lang") || "en";

    // Set the saved language and direction
    document.documentElement.setAttribute(
      "dir",
      savedLang === "ar" ? "rtl" : "ltr"
    );
    i18n.changeLanguage(savedLang);
  }, [i18n]);

  const CORRECT_PIN = "1234";
  const [locked, setLocked] = useState(false);

  // Reset lock state when user logs out or logs in
  useEffect(() => {
    if (!isAuthenticated) {
      // Clear on logout
      setLocked(false);
      localStorage.removeItem("isLocked");
      localStorage.removeItem("lastActivity");
    } else {
      // On login
      const isLockedInStorage = localStorage.getItem("isLocked") === "true";
      if (isLockedInStorage) {
        setLocked(true);
      } else {
        // Make sure lastActivity is set fresh before timer starts
        const now = Date.now();
        localStorage.setItem("lastActivity", now.toString());
        setLocked(false);
      }
    }
  }, [isAuthenticated]);

  // Only start inactivity timer if user is authenticated
  useInactivityTimer(
    () => {
      setLocked(true);
    },
    1 * 60 * 10000000000000,
    200,
    isAuthenticated
  );

  useEffect(() => {
    const isLockedInStorage = localStorage.getItem("isLocked") === "true";
    if (isLockedInStorage && isAuthenticated) {
      setLocked(true);
    }
  }, []);

  // useEffect(() => {
  //   // Disable right-click context menu
  //   const handleContextMenu = (e: any) => {
  //     e.preventDefault();
  //     return false;
  //   };

  //   // Add event listener
  //   document.addEventListener("contextmenu", handleContextMenu);

  //   // Cleanup on unmount
  //   return () => {
  //     document.removeEventListener("contextmenu", handleContextMenu);
  //   };
  // }, []);

  return (
    <>
      {locked && isAuthenticated && (
        <LockScreen
          correctPin={CORRECT_PIN}
          onUnlock={() => setLocked(false)}
        />
      )}
      <div
        className={cn(
          locked && isAuthenticated
            ? "pointer-events-none blur-md select-none"
            : "scroll-smooth"
        )}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            {/* Protected layout */}
            <Route element={<ProtectedRoute />}>
              <Route element={<MainLayout />}>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/search" element={<Dashboard />} />
                {/* Users */}

                <Route path="/country" element={<CountryNewPage />} />

                {/* Countries */}
                <Route path="/countries" element={<CountryPage />} />
                <Route path="/countries/:id" element={<CountryDetails />} />
                <Route
                  path="/countries/create"
                  element={<CountryFormPage isEdit={false} />}
                />
                <Route
                  path="/countries/:id/edit"
                  element={<CountryFormPage isEdit={true} />}
                />
                <Route
                  path="/countries/edit/:id"
                  element={<EditPage isEdit={true} />}
                />
                <Route path="/countries/view" element={<CountryDetails />} />
              </Route>
            </Route>

            {/* Fallback route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
