// src/theme/clientTheme.js
import { createTheme, darken } from '@mui/material/styles';

export const clientTheme = createTheme({
  palette: {
    primary: {
      main: '#df1b3f',
      minor: '#fcb300',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#19204e',
      minor: '#d6d6d6',
      contrastText: '#ffffff',
    },
    // Thêm background và text mặc định cho trang client
    background: {
      default: '#ffffff',
      paper: '#f5f5f5',
    },
    text: {
      primary: '#1F2B3B', // Chữ màu tối
      secondary: '#344054',
    },
  },

  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    body1: {
      fontSize: '1rem',
    },
  },

  // ... (Thêm components overrides cho Client tại đây)
  components: {
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          backgroundColor: '#df1b3f',
          '&:hover': {
            backgroundColor: darken('#df1b3f', 0.2),
          },
        },
      },
    },
  },
});
