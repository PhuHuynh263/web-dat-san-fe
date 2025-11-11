// src/theme/adminTheme.js
import { createTheme, darken } from '@mui/material/styles';

export const loginSignUpTheme = createTheme({
  palette: {
    primary: {
      main: '#FF9B45',
      minor: '#521C0D',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#D5451B',
      contrastText: '#ffffff',
    },
    background: {
      default: '#F4E7E1',
      paper: '#ffffff',
    },
    text: {
      // Sửa lại: Chữ trắng trên nền sáng (#F4E7E1) sẽ không đọc được
      primary: '#1F2B3B', // Dùng màu tối cho dễ đọc
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

  // ... (Thêm components overrides cho Admin tại đây)
  components: {
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          backgroundColor: '#FF9B45',
          '&:hover': {
            backgroundColor: darken('#FF9B45', 0.2),
          },
        },
      },
    },
  },
});
