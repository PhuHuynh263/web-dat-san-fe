import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import Grid from '@mui/material/Grid';
import ReUseableCard from '../reUseableComponent/reUseableCard';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { clientTheme } from '../../../clientTheme';
import Header from '../../../components/Client/Header/Header';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useState } from 'react';
import dayjs from 'dayjs';

const BookingPage = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedFieldType, setSelectedFieldType] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);

  const sportNames = [
    { label: 'Sân 5 người', key: 5 },
    { label: 'Sân 7 người', key: 7 },
    { label: 'Sân 9 người', key: 9 },
    { label: 'Sân 11 người', key: 11 },
  ];

  const districtNames = [
    { label: 'Quận Hải Châu' },
    { label: 'Quận Cẩm Lệ' },
    { label: 'Quận Liên Chiểu' },
    { label: 'Quận Ngũ Hành Sơn' },
    { label: 'Quận Sơn Trà' },
    { label: 'Quận Thanh Khê' },
    { label: 'Huyện Hòa Vang' },
    { label: 'Huyện Hoàng Sa' },
  ];

  const STYLE_AUTOCOMPLETE = {
    '& .MuiInputLabel-root': {
      color: 'primary.main',
      '&.Mui-focused': {
        color: 'primary.main',
      },
    },
    '& .MuiOutlinedInput-root': {
      fontSize: 14,
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: 'primary.main',
      },
      '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: 'primary.main',
      },
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: 'primary.main',
      },
    },
  };

  const STYLE_DATEPICKER = {
    '& .MuiInputLabel-root': {
      color: 'primary.main',
      '&.Mui-focused': {
        color: 'primary.main',
      },
    },
    '& .MuiOutlinedInput-root': {
      fontSize: 14,
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: 'primary.main',
      },
      '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: 'primary.main',
      },
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: 'primary.main',
      },
      '& .MuiOutlinedInput-input': {
        color: 'primary.main',
      },
      '& .MuiIconButton-root': {
        color: 'primary.main',
      },
    },
  };

  const handleSearch = () => {
    // TODO: Implement search functionality
    console.log('Search:', {
      date: selectedDate,
      fieldType: selectedFieldType,
      district: selectedDistrict,
    });
  };

  // Test data - 5 sân bóng
  const testFieldsData = [
    {
      id: 1,
      name: 'Sân Đa Phước',
      district: 'Quận Thanh Khê',
      rating: 5,
      openingHours: '5:00 - 23:00',
      isHot: true,
      description: 'Sân bóng đá chất lượng cao với cỏ nhân tạo, phù hợp cho các trận đấu và tập luyện.',
      price: 200000,
      image: 'https://img5.thuthuatphanmem.vn/uploads/2021/12/11/hinh-anh-san-co-bong-da-tuyet-dep_101436722.jpg'
    },
    {
      id: 2,
      name: 'Sân Bóng Hải Châu',
      district: 'Quận Hải Châu',
      rating: 4.5,
      openingHours: '6:00 - 22:00',
      isHot: false,
      description: 'Sân bóng rộng rãi, có đầy đủ tiện nghi và dịch vụ hỗ trợ.',
      price: 180000,
      image: 'https://suachualaptop24h.com/upload_images/images/2024/08/06/hinh-nen-san-bong-da-dep-19.jpeg'
    },
    {
      id: 3,
      name: 'Sân Thể Thao Cẩm Lệ',
      district: 'Quận Cẩm Lệ',
      rating: 4.8,
      openingHours: '5:00 - 23:00',
      isHot: true,
      description: 'Sân bóng hiện đại với hệ thống chiếu sáng tốt, phù hợp chơi ban đêm.',
      price: 220000,
      image: 'https://nld.mediacdn.vn/2018/6/2/mordovia-arena-saransk-1527915860667205779137.jpg'
    },
    {
      id: 4,
      name: 'Sân Bóng Sơn Trà',
      district: 'Quận Sơn Trà',
      rating: 4.2,
      openingHours: '6:00 - 22:00',
      isHot: false,
      description: 'Sân bóng gần biển, không gian thoáng mát, lý tưởng cho các hoạt động thể thao.',
      price: 190000,
      image: 'https://tse2.mm.bing.net/th/id/OIP.Ajy_viDE43sRRqgKW9nKRgHaGc?rs=1&pid=ImgDetMain&o=7&rm=3'
    },
    {
      id: 5,
      name: 'Sân Bóng Liên Chiểu',
      district: 'Quận Liên Chiểu',
      rating: 4.6,
      openingHours: '5:00 - 23:00',
      isHot: true,
      description: 'Sân bóng mới với cỏ nhân tạo chất lượng cao, có bãi đỗ xe rộng rãi.',
      price: 210000,
    },
  ];

  return (
    <ThemeProvider theme={clientTheme}>
      <CssBaseline />
      <Header />
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ mb: 6, textAlign: 'center' }}>
          <Typography
            variant="h1"
            sx={{
              color: 'primary.main',
              fontWeight: 'bold',
              mb: 2,
            }}
          >
            Đặt Sân
          </Typography>
          <Typography variant="h6" sx={{ color: 'text.secondary' }}>
            Tìm kiếm và đặt sân thể thao yêu thích của bạn
          </Typography>
        </Box>

        {/* Search Form */}
        <Box
          sx={{
            p: 4,
            borderRadius: 2,
            boxShadow: 3,
            backgroundColor: 'background.paper',
            mb: 6,
          }}
        >
          <Typography variant="h3" sx={{ color: 'primary.main', mb: 3 }}>
            Tìm kiếm sân
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              gap: 2,
              alignItems: 'stretch',
            }}
          >
            <Autocomplete
              disablePortal
              options={sportNames}
              value={selectedFieldType}
              onChange={(event, newValue) => {
                setSelectedFieldType(newValue);
              }}
              sx={{ flexGrow: 1, ...STYLE_AUTOCOMPLETE }}
              renderInput={(params) => (
                <TextField {...params} label="Loại sân" />
              )}
            />
            <Autocomplete
              disablePortal
              options={districtNames}
              value={selectedDistrict}
              onChange={(event, newValue) => {
                setSelectedDistrict(newValue);
              }}
              sx={{ flexGrow: 1, ...STYLE_AUTOCOMPLETE }}
              renderInput={(params) => (
                <TextField {...params} label="Quận/Huyện" />
              )}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Chọn ngày"
                value={selectedDate}
                onChange={(newValue) => {
                  setSelectedDate(newValue);
                }}
                minDate={dayjs()}
                sx={{ flexGrow: 1, ...STYLE_DATEPICKER }}
              />
            </LocalizationProvider>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSearch}
              sx={{
                flexShrink: 0,
                width: { xs: '100%', md: 'auto' },
                px: 4,
                py: 1.5,
              }}
            >
              Tìm kiếm
            </Button>
          </Box>
        </Box>

        {/* Results Section */}
        <Box>
          <Typography variant="h3" sx={{ color: 'primary.main', mb: 3 }}>
            Kết quả tìm kiếm
          </Typography>
          <Grid container spacing={3}>
            {testFieldsData.map((field) => (
              <Grid
                size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                key={field.id}
              >
                <ReUseableCard
                  id={field.id}
                  name={field.name}
                  district={field.district}
                  rating={field.rating}
                  openingHours={field.openingHours}
                  isHot={field.isHot}
                  image={field.image}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default BookingPage;

