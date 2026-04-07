import { createTheme } from "@mui/material/styles";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#1976d2" },
    secondary: { main: "#f50057" },
    background: { default: "#f0f2f5", paper: "#ffffff" }
  },
  shape: { borderRadius: 12 },
  components: {
    MuiTextField: {
      defaultProps: { fullWidth: true, variant: "outlined", size: "small" }
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: { borderRadius: 8, textTransform: "none", fontWeight: 600 }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: { backgroundImage: "none" }
      }
    }
  }
});

export default lightTheme;
