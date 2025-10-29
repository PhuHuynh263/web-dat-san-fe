import { createTheme, darken } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FF124C',
      contrastText: '#ffffff', // Màu chữ trên nền primary
    },
    secondary: {
      main: '#003C7A',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff', // Màu nền cho các component như Card, Paper
    },
    text: {
      primary: '#1F2B3B', // Màu chữ chính
      secondary: '#344054', // Màu chữ phụ
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
          width: '300px',
        },
        // Ghi đè style cho biến thể 'contained' và màu 'primary'
        containedPrimary: {
          '&:hover': {
            backgroundColor: darken('#FF124C', 0.1), // Làm màu đậm hơn một chút khi hover
          },
        },
        // Ghi đè style cho biến thể 'contained' và màu 'secondary'
        containedSecondary: {
          '&:hover': {
            backgroundColor: darken('#003C7A', 0.1),
          },
        },
      },
    },
  },
});

export default theme;
