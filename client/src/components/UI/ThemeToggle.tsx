import { useContext } from "react";
import { IconButton, Tooltip } from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { ColorModeContext } from "../../context/ThemeContext";
import { useTranslation } from "react-i18next";
import { useTheme } from "@mui/material/styles";

const ThemeToggle = () => {
  const { toggle } = useContext(ColorModeContext);
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <Tooltip title={t("toggle_theme")}>
      <IconButton onClick={toggle} color="inherit">
        {theme.palette.mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
      </IconButton>
    </Tooltip>
  );
};

export default ThemeToggle;
