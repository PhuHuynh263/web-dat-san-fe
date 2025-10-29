import Box from '@mui/material/Box';
import Header from '../../../components/Header/Header';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import images from '../../../assets/images/images';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const HomePage = () => {
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

  return (
    <>
      <Header></Header>

      {/* Section 1 */}
      <Box
        sx={{
          width: '100%',
          height: '60vh',
        }}
      >
        <Box
          sx={{
            width: '100%',
            height: '60vh',
            backgroundImage: `url(${images.banner})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Container
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Box sx={{ display: 'flex', width: '100%', height: '300px' }}>
              <Box
                sx={{
                  width: '30%',
                  height: '100%',
                }}
              >
                <img
                  src={images.ballSvg}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain', // Hoặc 'contain'
                    borderRadius: '8px',
                    color: 'white',
                  }}
                ></img>
              </Box>
              <Box
                sx={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'left',
                }}
              >
                <Typography variant='h1' sx={{ color: 'white' }}>
                  <Typography variant='span' sx={{ color: 'primary.main' }}>
                    Hi5port
                  </Typography>{' '}
                  - Ứng dụng đặt sân tập thể thao hàng đầu tại Việt Nam.
                </Typography>
                <Typography variant='span' sx={{ color: '#ccc' }}>
                  Mang đến trải nghiệm đặt sân trực tuyến thuận tiện và linh
                  hoạt cho người chơi.
                </Typography>
              </Box>
            </Box>
          </Container>
          <Container
            sx={{
              position: 'absolute',
              bottom: '-160px',
              left: '50%',
              transform: 'translateX(-50%)',
            }}
          >
            <Box
              sx={{
                p: 1,
                borderRadius: 4,
                backgroundColor: 'white',
                height: 'auto',
                boxShadow: 3,
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  m: 2,
                  gap: '10px',
                }}
              >
                <Typography variant='h2' sx={{ color: '#003d7b' }}>
                  Đặt sân thể thao ngay
                </Typography>
                <Typography variant='p' sx={{ color: '#667085' }}>
                  Tìm kiếm sân chơi thể thao, thi đấu khắp cả nước
                </Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', md: 'row' },
                  alignItems: 'stretch', // Giúp các item có cùng chiều cao khi ở dạng 'row'
                  gap: 2, // Dùng đơn vị spacing của theme (2 = 16px)
                  p: 2, // Dùng padding thay cho margin để kiểm soát không gian bên trong tốt hơn
                  borderRadius: 2,
                }}
              >
                <Autocomplete
                  disablePortal
                  options={sportNames}
                  // flexGrow: 1 để các Autocomplete tự chia đều không gian còn lại
                  sx={{ flexGrow: 1 }}
                  renderInput={(params) => (
                    <TextField {...params} label='Loại sân' />
                  )}
                />
                <Autocomplete
                  disablePortal
                  options={districtNames}
                  sx={{ flexGrow: 1 }}
                  renderInput={(params) => (
                    <TextField {...params} label='Quận/Huyện' />
                  )}
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker label='Chọn ngày' sx={{ flexGrow: 1 }} />
                </LocalizationProvider>
                <Button variant='contained' sx={{ flexShrink: 0, px: 3 }}>
                  Tìm kiếm
                </Button>
              </Box>
            </Box>
          </Container>
        </Box>
      </Box>

      {/* Section 2 */}
    </>
  );
};

export default HomePage;
