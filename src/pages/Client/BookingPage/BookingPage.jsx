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
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

// Static BookingPage: only JSX tags, horizontal filter, fully responsive
const BookingPage = () => {
  return (
    <ThemeProvider theme={clientTheme}>
      <CssBaseline />
      <Header />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Horizontal Filter Panel */}
        <Box
          sx={{
            backgroundColor: '#f5f5f5',
            p: { xs: 2, sm: 3, md: 4 },
            borderRadius: 2,
            mb: 4,
            boxShadow: 1,
          }}
        >
          <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold', fontSize: { xs: '1rem', md: '1.25rem' } }}>
            Lọc Tìm Kiếm
          </Typography>

          <Grid container spacing={2}>
            {/* City Dropdown */}
            <Grid item xs={12} sm={6} md={2}>
              <FormControl fullWidth size="small">
                <InputLabel>Thành Phố</InputLabel>
                <Select label="Thành Phố" defaultValue="">
                  <MenuItem value="">-- Chọn --</MenuItem>
                  <MenuItem value="hanoi">Hà Nội</MenuItem>
                  <MenuItem value="hochiminh">TP. Hồ Chí Minh</MenuItem>
                  <MenuItem value="danang">Đà Nẵng</MenuItem>
                  <MenuItem value="haiphong">Hải Phòng</MenuItem>
                  <MenuItem value="cantho">Cần Thơ</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Field Type Dropdown */}
            <Grid item xs={12} sm={6} md={2}>
              <FormControl fullWidth size="small">
                <InputLabel>Loại Sân</InputLabel>
                <Select label="Loại Sân" defaultValue="">
                  <MenuItem value="">-- Chọn --</MenuItem>
                  <MenuItem value="5v5">Sân 5v5</MenuItem>
                  <MenuItem value="7v7">Sân 7v7</MenuItem>
                  <MenuItem value="11v11">Sân 11v11</MenuItem>
                  <MenuItem value="futsal">Sân Futsal</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Date */}
            <Grid item xs={12} sm={6} md={2}>
              <TextField label="Ngày Tháng" fullWidth size="small" type="date" InputLabelProps={{ shrink: true }} />
            </Grid>

            {/* From Time */}
            <Grid item xs={12} sm={6} md={1.5}>
              <TextField label="Từ giờ" fullWidth size="small" type="time" InputLabelProps={{ shrink: true }} />
            </Grid>

            {/* To Time */}
            <Grid item xs={12} sm={6} md={1.5}>
              <TextField label="Đến giờ" fullWidth size="small" type="time" InputLabelProps={{ shrink: true }} />
            </Grid>

            {/* Search Button */}
            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ display: 'flex', alignItems: 'flex-end', height: '100%' }}>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    backgroundColor: 'primary.main',
                    textTransform: 'none',
                    fontWeight: 'bold',
                    py: 1,
                  }}
                >
                  Tìm Kiếm
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* Results Grid */}
        <Box>
          <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold' }}>
            Kết Quả Tìm Kiếm
          </Typography>

          <Grid container spacing={3}>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((id) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={id}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', cursor: 'pointer', transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.02)' } }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image="https://via.placeholder.com/300x200?text=Sân+bóng"
                    alt={`Sân bóng ${id}`}
                  />
                  <CardContent sx={{ flex: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                      Sân bóng mẫu #{id}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      Mô tả ngắn gọn về sân bóng đặc sắc tại địa phương.
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'primary.main', mb: 1 }}>
                      200.000 VNĐ / giờ
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

