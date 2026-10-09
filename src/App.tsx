import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import { defaultUser, login } from "./store/authSlice";
import Cookies from "js-cookie";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";

// countries
import CountryPage from "./pages/Country/CountriesPage";
import CountryDetails from "./pages/Country/CountryDetails";
import CountryNewPage from "./pages/Country/CountryPage";
import CountryFormPage from "./pages/Country/CreatePage";
import EditPage from "./pages/Country/EditPage";

function App() {
  const { i18n } = useTranslation();
  const dispatch = useDispatch();

  // Ensure authenticated session and clear any lock on mount
  useEffect(() => {
    dispatch(login(defaultUser));
    if (!Cookies.get("auth_token")) {
      Cookies.set("auth_token", "sample-jwt-token-123", { expires: 7 });
    }
    localStorage.removeItem("isLocked");
  }, [dispatch]);

  useEffect(() => {
    const savedLang = localStorage.getItem("lang") || "en";

    // Set the saved language and direction
    document.documentElement.setAttribute(
      "dir",
      savedLang === "ar" ? "rtl" : "ltr"
    );
    i18n.changeLanguage(savedLang);
  }, [i18n]);

  return (
    <div className="scroll-smooth">
      <BrowserRouter>
        <Routes>
          {/* Auth pages accessible for development */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/register" element={<Signup />} />
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
  );
}

export default App;
