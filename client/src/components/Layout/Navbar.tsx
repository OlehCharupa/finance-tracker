import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../context/AuthContext";
import ThemeToggle from "../UI/ThemeToggle";
import LanguageToggle from "../UI/LanguageToggle";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

const Navbar = () => {
  const { t } = useTranslation();
  const { logout, isAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: t("nav_expenses"), path: "/expenses" },
    { label: t("nav_categories"), path: "/categories" },
    { label: t("nav_analytics"), path: "/analytics" }
  ];

  return (
    <AppBar position="sticky" elevation={0} sx={{ borderBottom: "1px solid", borderColor: "divider" }}>
      <Toolbar sx={{ gap: 2 }}>
        <AccountBalanceWalletIcon />
        <Typography variant="h6" fontWeight={700} sx={{ flexGrow: 0, mr: 3 }}>
          Finance Tracker
        </Typography>

        {isAuth && (
          <Box sx={{ display: "flex", gap: 1, flexGrow: 1 }}>
            {navItems.map(item => (
              <Button
                key={item.path}
                color="inherit"
                onClick={() => navigate(item.path)}
                sx={{
                  fontWeight: location.pathname === item.path ? 700 : 400,
                  borderBottom: location.pathname === item.path ? "2px solid" : "none"
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>
        )}

        <Box sx={{ display: "flex", alignItems: "center", gap: 1, ml: "auto" }}>
          <LanguageToggle />
          <ThemeToggle />
          {isAuth && (
            <Button color="inherit" onClick={() => { logout(); navigate("/login"); }}>
              {t("logout")}
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
