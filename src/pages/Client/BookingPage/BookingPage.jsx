import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import {
  Box,
  Container,
  CssBaseline,
  Typography,
  TextField,
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import { clientTheme } from '../../../clientTheme';
import Header from '../../../components/Client/Header/Header';

const BookingPage = () => {
  const [city, setCity] = useState('');
  const [fieldType, setFieldType] = useState('');
  const [date, setDate] = useState('');
  const [fromTime, setFromTime] = useState('');
  const [toTime, setToTime] = useState('');

  const [yard, setYard] = useState([]);

  const getDaTaChuSan = () => {
    axios
      .get('http://127.0.0.1:8000/api/khach-hang/chu-san/data')
      .then((res) => {
        if (res.data.status) {
          setYard(res.data.data);
          toast.success(res.data.message);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        toast.error('Lỗi khi tải dữ liệu sân bóng');
        console.error(err);
      });
  };

  useEffect(() => {
    getDaTaChuSan();
  }, []);

  return (
    <ThemeProvider theme={clientTheme}>
      <CssBaseline />
      <Header />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Bộ lọc tìm kiếm */}
        <Box
          sx={{
            background: "#ffffff",
            p: 3,
            borderRadius: 3,
            mb: 4,
            boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
            border: "1px solid #eee"
          }}
        >
          <Typography
            variant="h6"
            sx={{ mb: 3, fontWeight: "700", fontSize: "1.15rem" }}
          >
            Lọc Tìm Kiếm
          </Typography>

          <Grid container spacing={2}>

            {/* Thành phố */}
            <Grid item xs={12} sm={6} md={2.5}>
              <FormControl fullWidth size="small">
                <InputLabel>Thành Phố</InputLabel>
                <Select
                  value={city}
                  label="Thành Phố"
                  onChange={(e) => setCity(e.target.value)}
                  sx={{
                    borderRadius: 2,
                    bgcolor: "#fafafa",
                    width: "170px"
                  }}
                >
                  <MenuItem value=""><em>-- Chọn --</em></MenuItem>
                  <MenuItem value="Hà Nội">Hà Nội</MenuItem>
                  <MenuItem value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</MenuItem>
                  <MenuItem value="Đà Nẵng">Đà Nẵng</MenuItem>
                  <MenuItem value="Hải Phòng">Hải Phòng</MenuItem>
                  <MenuItem value="Cần Thơ">Cần Thơ</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Loại sân */}
            <Grid item xs={12} sm={6} md={2.5}>
              <FormControl fullWidth size="small">
                <InputLabel>Loại Sân</InputLabel>
                <Select
                  value={fieldType}
                  label="Loại Sân"
                  onChange={(e) => setFieldType(e.target.value)}
                  sx={{
                    borderRadius: 2,
                    bgcolor: "#fafafa",
                    width: "170px"
                  }}
                >
                  <MenuItem value=""><em>-- Chọn --</em></MenuItem>
                  <MenuItem value="5v5">Sân 5v5</MenuItem>
                  <MenuItem value="7v7">Sân 7v7</MenuItem>
                  <MenuItem value="11v11">Sân 11v11</MenuItem>
                  <MenuItem value="futsal">Sân Futsal</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Ngày */}
            <Grid item xs={12} sm={6} md={2}>
              <TextField
                label="Ngày"
                type="date"
                size="small"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                sx={{
                  borderRadius: 2,
                  bgcolor: "#fafafa",
                }}
              />
            </Grid>

            {/* Từ giờ */}
            <Grid item xs={12} sm={6} md={2}>
              <TextField
                label="Từ giờ"
                type="time"
                size="small"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={fromTime}
                onChange={(e) => setFromTime(e.target.value)}
                sx={{
                  borderRadius: 2,
                  bgcolor: "#fafafa",
                }}
              />
            </Grid>

            {/* Đến giờ */}
            <Grid item xs={12} sm={6} md={2}>
              <TextField
                label="Đến giờ"
                type="time"
                size="small"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={toTime}
                onChange={(e) => setToTime(e.target.value)}
                sx={{
                  borderRadius: 2,
                  bgcolor: "#fafafa",
                }}
              />
            </Grid>

            {/* Nút tìm */}
            <Grid item xs={12} sm={6} md={1.5}>
              <Button
                variant="contained"
                fullWidth
                onClick={getDaTaChuSan}
                sx={{
                  height: "40px",
                  fontWeight: 700,
                  textTransform: "none",
                  borderRadius: 2,
                }}
              >
                Tìm kiếm
              </Button>
            </Grid>

          </Grid>
        </Box>


        {/* Kết quả tìm kiếm */}
        <Box>
          <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold' }}>
            Kết Quả Tìm Kiếm
          </Typography>

          <Grid container spacing={3}>
            {yard.map((item) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    cursor: 'pointer',
                    transition: 'transform 0.2s',
                    '&:hover': { transform: 'scale(1.02)' },
                    maxWidth: 300,
                    margin: 'auto',
                    flexDirection: 'column',
                  }}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={'https://fpt123.net/uploads/images/san-co-nhan-tao/san-bong-5-nguoi.jpg'}
                    alt={`Sân bóng ${item.ten_san}`}
                  />
                  <CardContent sx={{ flex: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                      {item.ten_san}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {item.dia_chi}, {item.thanh_pho}
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'primary.main', mb: 1 }}>
                      Liên hệ: {item.so_dien_thoai}
                    </Typography>
                    <Button variant="outlined" fullWidth size="small">
                      Xem Chi Tiết
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default BookingPage;