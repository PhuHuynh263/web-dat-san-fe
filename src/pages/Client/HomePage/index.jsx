import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Header from "../../../components/Client/Header/Header";
import {
  CssBaseline,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Chip,
  Paper,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  MenuItem,
  InputAdornment,
  IconButton,
  Badge,
  Slider,
  FormControlLabel,
  Checkbox,
  Rating,
  Autocomplete
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

// Thêm icons từ MUI Material
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import CloseIcon from '@mui/icons-material/Close';
import BoltIcon from '@mui/icons-material/Bolt';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import StarIcon from '@mui/icons-material/Star';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import GroupIcon from '@mui/icons-material/Group';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';


// --- MOCK DATA & THEME ---

// 1. Theme (Màu đỏ chủ đạo)
const clientTheme = createTheme({
  palette: {
    primary: {
      main: "#D32F2F",
      light: "#EF5350",
      contrastText: "#fff"
    },
    secondary: {
      main: "#FF6D00",
      contrastText: "#fff"
    },
    background: {
      default: "#f5f5f5",
    },
    text: { primary: "#1a1a1a", secondary: "#666666" }
  },
  components: {
    MuiButton: { styleOverrides: { root: { borderRadius: 8, textTransform: 'none', fontWeight: 600 } } },
    MuiCard: { styleOverrides: { root: { borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', transition: '0.3s', '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 8px 24px rgba(0,0,0,0.12)' } } } },
    MuiPaper: { styleOverrides: { root: { borderRadius: 12 } } }
  }
});

// 2. Ảnh giả lập
const images = {
  banner: "https://images.unsplash.com/photo-1526232761682-d26e03ac148e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
  ballSvg: "https://upload.wikimedia.org/wikipedia/commons/d/d3/Soccerball.svg"
};

const HomePage = () => {
  const navigate = useNavigate(); // Hook chuyển trang

  const sportNames = [
    { label: "Sân 5 người", key: 5 },
    { label: "Sân 7 người", key: 7 },
    { label: "Sân 9 người", key: 9 },
    { label: "Sân 11 người", key: 11 },
  ];

  const districtNames = [
    { label: "Quận Hải Châu" },
    { label: "Quận Cẩm Lệ" },
    { label: "Quận Liên Chiểu" },
    { label: "Quận Ngũ Hành Sơn" },
    { label: "Quận Sơn Trà" },
    { label: "Quận Thanh Khê" },
    { label: "Huyện Hòa Vang" },
    { label: "Huyện Hoàng Sa" },
  ];

  const categories = [
    { name: "Sân 5 người", icon: "5️⃣", count: "30 sân" },
    { name: "Sân 7 người", icon: "7️⃣", count: "15 sân" },
    { name: "Sân có mái che", icon: "☂️", count: "5 sân" },
    { name: "Tìm đối đá", icon: "⚔️", count: "Đang tìm: 12" },
    { name: "Thuê trọng tài", icon: "🏁", count: "Sẵn sàng" },
    { name: "Đặt áo đấu", icon: "👕", count: "Shop" }, // Mục tiêu click
  ];

  const featuredCourts = [
    {
      id: 1,
      name: "Sân Bóng Tuyên Sơn",
      address: "Hải Châu, Đà Nẵng",
      price: "300.000đ/h",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      category: "Sân 7"
    },
    {
      id: 2,
      name: "Sân Chuyên Việt",
      address: "Cẩm Lệ, Đà Nẵng",
      price: "250.000đ/h",
      rating: 4.5,
      image: "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      category: "Sân 5"
    },
    {
      id: 3,
      name: "Sân ĐH Thể Dục TT",
      address: "Thanh Khê, Đà Nẵng",
      price: "280.000đ/h",
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      category: "Sân 7"
    },
    {
      id: 4,
      name: "Sân Cỏ Nhân Tạo 911",
      address: "Liên Chiểu, Đà Nẵng",
      price: "200.000đ/h",
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1518091043644-c1d4457512c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      category: "Sân 5"
    }
  ];

  const STYLE_AUTOCOMPLETE = {
    flexGrow: 1,
    display: { xs: "none", md: "block" },
    "& .MuiInputLabel-root": {
      color: "primary.main",
      "&.Mui-focused": { color: "primary.main" },
    },
    "& .MuiOutlinedInput-root": {
      fontSize: 14,
      "& .MuiOutlinedInput-notchedOutline": { borderColor: "primary.main" },
      "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "primary.main" },
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "primary.main" },
    },
  };

  const STYLE_DATEPICKER = {
    flexGrow: 1,
    display: { xs: "none", md: "block" },
    "& .MuiInputLabel-root": {
      color: "primary.main",
      "&.Mui-focused": { color: "primary.main" },
    },
    "& .MuiOutlinedInput-root": {
      fontSize: 14,
      "& .MuiOutlinedInput-notchedOutline": { borderColor: "primary.main" },
      "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "primary.main" },
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "primary.main" },
      "& .MuiOutlinedInput-input": { color: "primary.main" },
      "& .MuiIconButton-root": { color: "primary.main" },
    },
  };

  // --- HÀM XỬ LÝ CLICK DANH MỤC ---
  const handleCategoryClick = (categoryName) => {
    if (categoryName === "Đặt áo đấu") {
      navigate('/booking-shop');
    } else {
      // Xử lý logic cho các mục khác nếu cần (ví dụ scroll xuống list sân)
      console.log("Clicked:", categoryName);
    }
  };

  return (
    <ThemeProvider theme={clientTheme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <Header />

        {/* Section 1 - Hero & Search */}
        <Box
          sx={{
            width: "100%",
            height: "60vh",
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "60vh",
              backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.5)), url(${images.banner})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
              position: "relative",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Container
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box sx={{ display: "flex", width: "100%", height: "300px" }}>
                <Box sx={{ width: "30%", height: "100%" }}>
                  <img
                    src={images.ballSvg}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      borderRadius: "8px",
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "left",
                  }}
                >
                  <Typography variant="h2" sx={{ color: "white", fontWeight: 'bold' }}>
                    <Typography
                      variant="span"
                      sx={{
                        color: "primary.main",
                        fontWeight: "bold",
                        fontSize: 'inherit'
                      }}
                    >
                      Hi5port
                    </Typography>{" "}
                    - Ứng dụng đặt sân tập thể thao hàng đầu tại Việt Nam.
                  </Typography>
                  <Typography variant="h6" sx={{ color: "#e0e0e0", mt: 2 }}>
                    Mang đến trải nghiệm đặt sân trực tuyến thuận tiện và linh
                    hoạt cho người chơi.
                  </Typography>
                </Box>
              </Box>
            </Container>

            <Container
              sx={{
                position: "absolute",
                bottom: "-80px",
                left: "50%",
                transform: "translateX(-50%)",
                zIndex: 10,
              }}
            >
              <Box
                sx={{
                  p: 3,
                  borderRadius: 4,
                  backgroundColor: "white",
                  height: "auto",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                }}
              >
                <Box sx={{ display: "flex", flexDirection: "column", mb: 3, gap: "5px" }}>
                  <Typography variant="h4" sx={{ color: "primary.main", fontWeight: "bold" }}>
                    Đặt sân thể thao ngay
                  </Typography>
                  <Typography variant="body1" sx={{ color: "text.secondary" }}>
                    Tìm kiếm sân chơi thể thao, thi đấu khắp cả nước
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    alignItems: "stretch",
                    gap: 2,
                  }}
                >
                  <Autocomplete
                    disablePortal
                    options={sportNames}
                    sx={STYLE_AUTOCOMPLETE}
                    renderInput={(params) => <TextField {...params} label="Loại sân" />}
                  />
                  <Autocomplete
                    disablePortal
                    options={districtNames}
                    sx={STYLE_AUTOCOMPLETE}
                    renderInput={(params) => <TextField {...params} label="Quận/Huyện" />}
                  />

                  {/* Thay thế DatePicker bằng TextField type date cho môi trường Preview */}
                  <TextField
                    label="Chọn ngày"
                    type="date"
                    sx={STYLE_DATEPICKER}
                    InputLabelProps={{ shrink: true }}
                  />

                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<SearchIcon />}
                    sx={{
                      flexShrink: 0,
                      width: { xs: "100%", md: "auto" },
                      px: 4,
                      fontWeight: 'bold',
                      fontSize: '1rem',
                      bgcolor: 'primary.main',
                      '&:hover': {
                        bgcolor: 'primary.dark',
                      }
                    }}
                  >
                    Tìm kiếm
                  </Button>
                </Box>
              </Box>
            </Container>
          </Box>
        </Box>

        {/* ===================================================================== */}
        {/* SECTION 2: PHẦN TRIỂN KHAI THÊM NỘI DUNG */}
        {/* ===================================================================== */}

        {/* Spacer để tránh Box tìm kiếm đè lên nội dung */}
        <Box sx={{ height: { xs: "350px", md: "150px" } }} />

        <Box sx={{ bgcolor: "#f9f9f9", pb: 8 }}>
          <Container>

            {/* --- DANH MỤC PHỔ BIẾN --- */}
            <Box sx={{ mb: 8, pt: 4 }}>
              <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold', color: 'primary.main', textAlign: 'center' }}>
                Khám phá sân chơi
              </Typography>
              <Grid container spacing={3} justifyContent="center">
                {categories.map((cat, index) => (
                  <Grid item xs={6} sm={4} md={2} key={index}>
                    <Paper
                      elevation={0}
                      onClick={() => handleCategoryClick(cat.name)} // Gắn sự kiện click
                      sx={{
                        p: 3,
                        textAlign: 'center',
                        borderRadius: 4,
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        border: '1px solid transparent',
                        bgcolor: 'white',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                        '&:hover': {
                          borderColor: 'primary.main',
                          transform: 'translateY(-5px)',
                          boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
                        }
                      }}
                    >
                      <Typography variant="h3" sx={{ mb: 1 }}>{cat.icon}</Typography>
                      <Typography variant="subtitle1" fontWeight="bold">{cat.name}</Typography>
                      <Typography variant="caption" color="text.secondary">{cat.count}</Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Box>

            {/* --- SÂN NỔI BẬT --- */}
            <Box sx={{ mb: 8 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <BoltIcon sx={{ color: "#FF6D00" }} />
                  <Typography variant="h5" fontWeight="bold" color="text.primary">Sân "hot" giờ vàng</Typography>
                </Box>
                <Button endIcon={<ArrowForwardIcon />} sx={{ color: 'primary.main', fontWeight: 'bold' }}>Xem tất cả</Button>
              </Box>

              <Grid container spacing={3}>
                {featuredCourts.map((court) => (
                  <Grid item xs={12} sm={6} md={3} key={court.id}>
                    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', transition: '0.3s', borderRadius: 3, '&:hover': { transform: 'translateY(-4px)', boxShadow: 6 } }}>
                      <Box sx={{ position: 'relative' }}>
                        <CardMedia
                          component="img"
                          height="180"
                          image={court.image}
                          alt={court.name}
                        />
                        <Chip
                          label={court.category}
                          color="primary"
                          size="small"
                          sx={{ position: 'absolute', top: 10, right: 10, fontWeight: 'bold', boxShadow: 2 }}
                        />
                        <Box sx={{ position: 'absolute', bottom: 10, left: 10, bgcolor: 'white', px: 1, py: 0.5, borderRadius: 1, display: 'flex', alignItems: 'center', boxShadow: 1 }}>
                          <StarIcon sx={{ fontSize: 16, color: "#FFD700", mr: 0.5 }} />
                          <Typography variant="caption" fontWeight="bold">{court.rating}</Typography>
                        </Box>
                      </Box>
                      <CardContent sx={{ flexGrow: 1, pb: 1 }}>
                        <Typography gutterBottom variant="h6" fontWeight="bold" noWrap sx={{ color: 'text.primary', fontSize: '1.1rem' }}>
                          {court.name}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, color: 'text.secondary' }}>
                          <LocationOnIcon sx={{ fontSize: 16, mr: 0.5, color: 'primary.light' }} />
                          <Typography variant="body2" noWrap>{court.address}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 'auto' }}>
                          <Typography variant="h6" color="secondary.main" fontWeight="bold">
                            {court.price}
                          </Typography>
                        </Box>
                      </CardContent>
                      <CardActions sx={{ p: 2, pt: 0 }}>
                        <Button variant="contained" fullWidth disableElevation sx={{ borderRadius: 2, textTransform: 'none', fontSize: '1rem' }}>Đặt ngay</Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>

            {/* --- TẠI SAO CHỌN CHÚNG TÔI --- */}
            <Paper sx={{ p: { xs: 3, md: 6 }, borderRadius: 4, bgcolor: 'white', overflow: 'hidden' }} elevation={1}>
              <Grid container spacing={6} alignItems="center">
                <Grid item xs={12} md={5}>
                  <Chip label="Ưu điểm vượt trội" color="secondary" size="small" sx={{ mb: 2, fontWeight: 'bold' }} />
                  <Typography variant="h3" fontWeight="bold" gutterBottom sx={{ color: 'primary.main' }}>
                    Tại sao phủi thủ chọn Hi5port?
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>
                    Hệ thống đặt sân thông minh giúp bạn tiết kiệm thời gian và tận hưởng niềm đam mê bóng đá trọn vẹn nhất.
                  </Typography>

                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    {[
                      { title: "Tìm sân siêu tốc", desc: "Chỉ 30 giây để có sân đá ngay.", icon: <AccessTimeIcon /> },
                      { title: "Ghép kèo dễ dàng", desc: "Cộng đồng đông đảo, không lo thiếu đối.", icon: <GroupIcon /> },
                      { title: "Đặt cọc an toàn", desc: "Hoàn tiền 100% nếu chủ sân hủy kèo.", icon: <CheckCircleIcon /> }
                    ].map((item, idx) => (
                      <Box key={idx} sx={{ display: 'flex', gap: 2.5, alignItems: 'flex-start' }}>
                        <Avatar sx={{ bgcolor: 'primary.50', color: 'primary.main', width: 48, height: 48 }}>{item.icon}</Avatar>
                        <Box>
                          <Typography variant="h6" fontWeight="bold" sx={{ color: 'text.primary', fontSize: '1.1rem' }}>{item.title}</Typography>
                          <Typography variant="body2" color="text.secondary">{item.desc}</Typography>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                </Grid>
                <Grid item xs={12} md={7}>
                  <Box
                    component="img"
                    src="https://images.unsplash.com/photo-1551958219-acbc608c6377?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                    sx={{ width: '100%', borderRadius: 4, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
                  />
                </Grid>
              </Grid>
            </Paper>

          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default HomePage;