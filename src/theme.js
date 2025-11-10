import { createTheme, darken } from '@mui/material/styles';

const theme = createTheme({
  client: {
    palette: {
      primary: {
        main: '#df1b3f',
        minor: '#fcb300',
        contrastText: '#ffffff', // Màu chữ trên nền primary
      },
      secondary: {
        main: '#19204e',
        minor: '#d6d6d6',
        contrastText: '#ffffff',
      },
      text: {
        primary: '#ffffff', // Màu chữ chính
        secondary: '#cccccc', // Màu chữ phụ
      },
    },
  },

  palette: {
    primary: {
      main: '#FF9B45',
      minor: '#521C0D',
      contrastText: '#ffffff', // Màu chữ trên nền primary
    },
    secondary: {
      main: '#D5451B',
      contrastText: '#ffffff',
    },
    background: {
      default: '#F4E7E1',
      paper: '#ffffff', // Màu nền cho các component như Card, Paper
    },
    text: {
      primary: '#ffffff', // Màu chữ chính
      secondary: '#cccccc', // Màu chữ phụ
    },
  },

  // Cấu hình font chữ
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

  // ✨ THÊM PHẦN NÀY ĐỂ CUSTOMIZE BUTTON ✨
  components: {
    // Tên component là MuiButton
    MuiButton: {
      // Đặt các props mặc định
      defaultProps: {
        variant: 'contained', // Biến thể mặc định là 'contained'
        disableElevation: true, // Tắt hiệu ứng shadow mặc định
      },
      // Ghi đè style
      styleOverrides: {
        // 'root' là style cho tất cả các button
        root: {
          borderRadius: 8, // Bo góc mềm mại
          textTransform: 'none', // Không tự động viết hoa chữ
          fontWeight: 600,
          padding: '10px 24px', // Tăng khoảng cách padding
          
        },
        // Ghi đè style cho biến thể 'contained' và màu 'primary'
        containedPrimary: {
          '&:hover': {
            backgroundColor: (theme) => darken(theme.client.palette.primary.main, 0.1), // Làm màu đậm hơn một chút khi hover
          },
        },
        // Ghi đè style cho biến thể 'contained' và màu 'secondary'
        containedSecondary: {
          '&:hover': {
            backgroundColor: (theme) => darken(theme.client.palette.primary.main, 0.1),
          },
        },
      },
    },
  },
});

export default theme;
