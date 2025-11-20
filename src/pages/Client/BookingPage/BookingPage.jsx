import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { clientTheme } from '../../../clientTheme';
import Header from '../../../components/Client/Header/Header';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

// Final static BookingPage: only JSX tags, no state or handlers
const BookingPage = () => {
  const [yard, setYard] = useState();

  const getDataYard = () => {
    axios
      .get("http://127.0.0.1:8000/api/khach-hang/chu-san/data")
      .then((res) => {
        setYard(res.data.data);
      })
      .catch((err) => {
        console.error("Lỗi khi lấy data:", err);
      });
  }

  useEffect(() => {
    getDataYard();
  }, []);

  return (
    <ThemeProvider theme={clientTheme}>
      <CssBaseline />
      <Header />
      <Container maxWidth={false} sx={{ backgroundColor: 'white', py: 3, p: 0 }}>
        <Box sx={{ display: 'flex', gap: 0 }}>
          {/* Static Filter Panel (left) */}
          <Box sx={{ width: '20vw', minHeight: 'calc(100vh - 73px)', backgroundColor: 'white', boxShadow: 3, flexDirection: 'column', p: 3 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>Lọc Tìm Kiếm</Typography>
            <Typography sx={{ mb: 1, fontWeight: 'bold' }}>Thành Phố / Tỉnh</Typography>
            <TextField label="Chọn thành phố" fullWidth sx={{ mb: 2 }} />

            <Typography sx={{ mb: 1, fontWeight: 'bold' }}>Loại Sân</Typography>
            <TextField label="Chọn loại sân" fullWidth sx={{ mb: 2 }} />

            <Typography sx={{ mb: 1, fontWeight: 'bold' }}>Ngày Tháng</Typography>
            <TextField label="Chọn ngày" fullWidth sx={{ mb: 2 }} />

            <Typography sx={{ mb: 1, fontWeight: 'bold' }}>Khung Giờ</Typography>
            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
              <TextField label="Từ giờ" sx={{ flex: 1 }} />
              <TextField label="Đến giờ" sx={{ flex: 1 }} />
            </Box>

            <Typography sx={{ mb: 1, fontWeight: 'bold' }}>Tiện Ích</Typography>
            <Box sx={{ mb: 2 }}>
              <Typography>- Bãi đỗ xe</Typography>
              <Typography>- WiFi</Typography>
              <Typography>- Phòng thay đồ</Typography>
            </Box>

            <Button variant="contained" fullWidth sx={{ backgroundColor: 'primary.main' }}>Tìm Kiếm</Button>
          </Box>

          {/* Static Results List (right) */}
          <Box sx={{ flex: 1, width: '100%', pl: 4, minHeight: 'calc(100vh - 73px)' }}>
            <Box sx={{ mb: 3 }}>
              <Button sx={{ textTransform: 'none', fontWeight: 'bold' }}>Lọc</Button>
            </Box>

            <Grid container spacing={3}>
              {yard?.map((item) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
                  <Card>
                    <CardMedia
                      component="img"
                      height="140"
                      // image={item.image || 'https://via.placeholder.com/300x140'}
                      image='https://tse1.mm.bing.net/th/id/OIP.6koCM750UfzYdM8Qjj2a6QHaE8?rs=1&pid=ImgDetMain&o=7&rm=3'
                      alt={`Sân bóng ${item.ten_san || item.id}`}
                    />
                    <CardContent>
                      <Typography variant="h6">
                        {item.ten_san || `Sân bóng mẫu #${item.id}`}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.mo_ta || 'Mô tả ngắn gọn về sân.'}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default BookingPage;

