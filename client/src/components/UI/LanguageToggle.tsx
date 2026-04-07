import { useTranslation } from "react-i18next";
import { ButtonGroup, Button, Tooltip } from "@mui/material";

const LanguageToggle = () => {
  const { i18n, t } = useTranslation();

  return (
    <Tooltip title={t("change_language")}>
      <ButtonGroup size="small" color="inherit">
        <Button
          onClick={() => i18n.changeLanguage("ua")}
          variant={i18n.language === "ua" ? "contained" : "outlined"}
        >
          UA
        </Button>
        <Button
          onClick={() => i18n.changeLanguage("en")}
          variant={i18n.language === "en" ? "contained" : "outlined"}
        >
          EN
        </Button>
      </ButtonGroup>
    </Tooltip>
  );
};

export default LanguageToggle;
