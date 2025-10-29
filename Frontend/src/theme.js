import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#FF124C",
      contrastText: "#ffffff", // Màu chữ trên nền primary
    },
    secondary: {
      main: "#003C7A",
      contrastText: "#ffffff",
    },
    background: {
      default: "#f5f5f5",
      paper: "#ffffff", // Màu nền cho các component như Card, Paper
    },
    text: {
      primary: "#1F2B3B", // Màu chữ chính
      secondary: "#344054", // Màu chữ phụ
    },
  },

  // Cấu hình font chữ
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: "2.5rem",
      fontWeight: 700,
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 600,
    },
    body1: {
      fontSize: "1rem",
    },
  },
});

export default theme;
