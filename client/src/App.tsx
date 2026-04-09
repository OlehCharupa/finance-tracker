import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SnackbarProvider } from "notistack";

import { AuthProvider, useAuth } from "./context/AuthContext";
import CustomThemeProvider from "./context/ThemeContext";
import Navbar from "./components/Layout/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Categories from "./pages/Categories";
import Expenses from "./pages/Expenses";
import Analytics from "./pages/Analytics";
import "./i18n";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuth } = useAuth();
  return isAuth ? children : <Navigate to="/login" />;
};

function AppRoutes() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/expenses"
          element={
            <PrivateRoute>
              <Expenses />
            </PrivateRoute>
          }
        />
        <Route
          path="/categories"
          element={
            <PrivateRoute>
              <Categories />
            </PrivateRoute>
          }
        />
        <Route
          path="/analytics"
          element={
            <PrivateRoute>
              <Analytics />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/expenses" />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <CustomThemeProvider>
      <SnackbarProvider
        maxSnack={3}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <BrowserRouter>
          <AuthProvider>
            <AppRoutes />
          </AuthProvider>
        </BrowserRouter>
      </SnackbarProvider>
    </CustomThemeProvider>
  );
}
