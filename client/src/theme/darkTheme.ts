import { createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#90caf9" },
    secondary: { main: "#f48fb1" },
    background: { default: "#0a0a0a", paper: "#1a1a2e" }
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

export default darkTheme;
