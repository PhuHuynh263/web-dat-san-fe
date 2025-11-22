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
  IconButton,
  Drawer,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import TuneIcon from '@mui/icons-material/Tune';
import CloseIcon from '@mui/icons-material/Close';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { clientTheme } from '../../../clientTheme';
import Header from '../../../components/Client/Header/Header';

const BookingPage = () => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  const [city, setCity] = useState('');
  const [fieldType, setFieldType] = useState('');
  const [date, setDate] = useState('');
  const [fromTime, setFromTime] = useState('');
  const [toTime, setToTime] = useState('');
  const [filterOpen, setFilterOpen] = useState(true);
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
      
      {/* Main Layout Container */}
      <Box sx={{ display: 'flex', minHeight: 'calc(100vh - 73px)' }}>
        
        {/* FilterPanel - Desktop Sidebar */}
        {isDesktop && (
          <Box
            sx={{
              width: filterOpen ? '30vw' : 0,
              backgroundColor: 'white',
              boxShadow: filterOpen ? 3 : 0,
              transition: 'width 0.3s ease',
              overflow: 'hidden',
              borderRight: filterOpen ? '1px solid #eee' : 'none',
            }}
          >
            {filterOpen && <FilterPanelContent onClose={() => setFilterOpen(false)} />}
          </Box>
        )}

        {/* ChevronRightIcon - Desktop Only - Fixed */}
        {isDesktop && !filterOpen && (
          <IconButton
            onClick={() => setFilterOpen(true)}
            sx={{
              position: 'fixed',
              left: 16,
              top: '50%',
              transform: 'translateY(-50%)',
              backgroundColor: 'primary.main',
              color: 'white',
              zIndex: 1100,
              '&:hover': {
                backgroundColor: 'primary.dark',
              },
            }}
          >
            <ChevronRightIcon />
          </IconButton>
        )}

        {/* Results Section */}
        <Box
          sx={{
            flex: 1,
            width: isDesktop && filterOpen ? '70vw' : '100%',
            p: isDesktop && filterOpen ? 3 : 3,
            pl: isDesktop && filterOpen ? 3 : 3,
            overflowY: 'auto',
            transition: 'width 0.3s ease',
          }}
        >
          {/* Filter Button - Mobile Only */}
          {!isDesktop && (
            <Box sx={{ mb: 3 }}>
              <Button
                startIcon={<TuneIcon />}
                onClick={() => setFilterOpen(true)}
                sx={{
                  color: 'primary.main',
                  fontWeight: 'bold',
                  fontSize: '0.95rem',
                  textTransform: 'none',
                  '&:hover': {
                    backgroundColor: 'rgba(223, 27, 63, 0.08)',
                  },
                }}
              >
                Lọc
              </Button>
            </Box>
          )}

          {/* Results Title */}
          <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold' }}>
            Kết Quả Tìm Kiếm
          </Typography>

          {/* Results Grid */}
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

        {/* FilterPanel - Mobile Modal */}
        <Drawer
          anchor="bottom"
          open={!isDesktop && filterOpen}
          onClose={() => setFilterOpen(false)}
          sx={{
            '& .MuiDrawer-paper': {
              borderRadius: '16px 16px 0 0',
              maxHeight: '90vh',
            },
          }}
        >
          <FilterPanelContent onClose={() => setFilterOpen(false)} isMobile />
        </Drawer>
      </Box>
    </ThemeProvider>
  );
};

// FilterPanel Component
const FilterPanelContent = ({ onClose, isMobile }) => {
  const [city, setCity] = useState('');
  const [fieldType, setFieldType] = useState('');
  const [date, setDate] = useState('');
  const [fromTime, setFromTime] = useState('');
  const [toTime, setToTime] = useState('');

  const handleSearch = () => {
    // TODO: Implement filter logic
    console.log({
      city,
      fieldType,
      date,
      fromTime,
      toTime,
    });
    if (isMobile) {
      onClose();
    }
  };

  return (
    <Box sx={{ p: 3, minHeight: isMobile ? 'auto' : '100%' }}>
      {/* Header */}
      {isMobile && (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Lọc Tìm Kiếm
          </Typography>
          <IconButton onClick={onClose} sx={{ p: 0 }}>
            <CloseIcon sx={{ color: 'black' }} />
          </IconButton>
        </Box>
      )}

      {/* Close Button - Desktop */}
      {!isMobile && (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
          <IconButton onClick={onClose} sx={{ p: 0 }}>
            <CloseIcon sx={{ color: 'black' }} />
          </IconButton>
        </Box>
      )}

      {/* Thành phố */}
      <Box sx={{ mb: 3 }}>
        <Typography sx={{ mb: 1, fontWeight: 'bold', fontSize: '0.9rem' }}>Thành Phố</Typography>
        <FormControl fullWidth size="small">
          <InputLabel>Chọn thành phố</InputLabel>
          <Select
            value={city}
            label="Chọn thành phố"
            onChange={(e) => setCity(e.target.value)}
            sx={{ borderRadius: 1 }}
          >
            <MenuItem value=""><em>-- Chọn --</em></MenuItem>
            <MenuItem value="Hà Nội">Hà Nội</MenuItem>
            <MenuItem value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</MenuItem>
            <MenuItem value="Đà Nẵng">Đà Nẵng</MenuItem>
            <MenuItem value="Hải Phòng">Hải Phòng</MenuItem>
            <MenuItem value="Cần Thơ">Cần Thơ</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Loại sân */}
      <Box sx={{ mb: 3 }}>
        <Typography sx={{ mb: 1, fontWeight: 'bold', fontSize: '0.9rem' }}>Loại Sân</Typography>
        <FormControl fullWidth size="small">
          <InputLabel>Chọn loại sân</InputLabel>
          <Select
            value={fieldType}
            label="Chọn loại sân"
            onChange={(e) => setFieldType(e.target.value)}
            sx={{ borderRadius: 1 }}
          >
            <MenuItem value=""><em>-- Chọn --</em></MenuItem>
            <MenuItem value="5v5">Sân 5v5</MenuItem>
            <MenuItem value="7v7">Sân 7v7</MenuItem>
            <MenuItem value="11v11">Sân 11v11</MenuItem>
            <MenuItem value="futsal">Sân Futsal</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Ngày */}
      <Box sx={{ mb: 3 }}>
        <Typography sx={{ mb: 1, fontWeight: 'bold', fontSize: '0.9rem' }}>Ngày</Typography>
        <TextField
          label="Chọn ngày"
          type="date"
          size="small"
          fullWidth
          InputLabelProps={{ shrink: true }}
          value={date}
          onChange={(e) => setDate(e.target.value)}
          sx={{ borderRadius: 1 }}
        />
      </Box>

      {/* Từ giờ */}
      <Box sx={{ mb: 3 }}>
        <Typography sx={{ mb: 1, fontWeight: 'bold', fontSize: '0.9rem' }}>Từ Giờ</Typography>
        <TextField
          label="Từ giờ"
          type="time"
          size="small"
          fullWidth
          InputLabelProps={{ shrink: true }}
          value={fromTime}
          onChange={(e) => setFromTime(e.target.value)}
          sx={{ borderRadius: 1 }}
        />
      </Box>

      {/* Đến giờ */}
      <Box sx={{ mb: 4 }}>
        <Typography sx={{ mb: 1, fontWeight: 'bold', fontSize: '0.9rem' }}>Đến Giờ</Typography>
        <TextField
          label="Đến giờ"
          type="time"
          size="small"
          fullWidth
          InputLabelProps={{ shrink: true }}
          value={toTime}
          onChange={(e) => setToTime(e.target.value)}
          sx={{ borderRadius: 1 }}
        />
      </Box>

      {/* Nút Tìm Kiếm */}
      <Button
        variant="contained"
        fullWidth
        onClick={handleSearch}
        sx={{
          backgroundColor: 'primary.main',
          color: 'white',
          fontWeight: 'bold',
          py: 1.5,
          fontSize: '1rem',
          borderRadius: 1,
          '&:hover': {
            backgroundColor: 'primary.dark',
          },
        }}
      >
        Tìm Kiếm
      </Button>
    </Box>
  );
};

export default BookingPage;