import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  Box,
  CssBaseline,
  Typography,
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Drawer,
  useTheme,
  useMediaQuery,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  TextField,
} from "@mui/material";

import { ThemeProvider } from "@emotion/react";
import TuneIcon from "@mui/icons-material/Tune";
import CloseIcon from "@mui/icons-material/Close";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { clientTheme } from "../../../clientTheme";
import Header from "../../../components/Client/Header/Header";
import dataAddress from "./dataAddress.js";
 
const BookingPage = () => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  const [yard, setYard] = useState([]);
  const [filterOpen, setFilterOpen] = useState(true);

  // Filter state
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [districts, setDistricts] = useState([]);
  const [fieldType, setFieldType] = useState("");

  // GET SÂN TỪ API
  const getDaTaChuSan = () => {
    axios
      .get("http://127.0.0.1:8000/api/khach-hang/chu-san/data-open")
      .then((res) => {
        if (res.data.status) {
          setYard(res.data.data);
          toast.success(res.data.message);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch(() => toast.error("Lỗi khi tải dữ liệu sân bóng"));
  };

  useEffect(() => {
    getDaTaChuSan();
  }, []);

  const handleChangeCity = (value) => {
    setCity(value);
    setDistrict("");
    setDistricts(dataAddress[value] || []);
  };

  const handleSearch = () => {
    const searchData = {
      city,
      district,
      // fieldType,
    };
    console.log("Thông tin search:", searchData);
    axios
      .post("http://127.0.0.1:8000/api/khach-hang/tim-kiem", searchData)
      .then((res => {
        if (res.data.status) {
          setYard(res.data.data);
        }
      }))
    if (!isDesktop) setFilterOpen(false);
  };

  return (
    <ThemeProvider theme={clientTheme}>
      <CssBaseline />
      <Header />

      <Box sx={{ display: "flex", minHeight: "calc(100vh - 73px)" }}>
        {/* FILTER DESKTOP */}
        {isDesktop && (
          <Box
            sx={{
              width: filterOpen ? "30vw" : 0,
              backgroundColor: "white",
              boxShadow: filterOpen ? 3 : 0,
              transition: "width 0.3s ease",
              overflow: "hidden",
              borderRight: filterOpen ? "1px solid #eee" : "none",
              
            }}
          >
            {filterOpen && (
              <Box sx={{ p: 3 }}>
                {/* Desktop Close */}
                <Box sx={{ textAlign: "right", mb: 2 }}>
                  <IconButton onClick={() => setFilterOpen(false)}>
                    <CloseIcon />
                  </IconButton>
                </Box>

                {/* CITY */}
                <Box sx={{ mb: 3 }}>
                  <Typography sx={{ mb: 1, fontWeight: "bold" }}>
                    Thành Phố
                  </Typography>
                  <FormControl fullWidth size="small">
                    <InputLabel>Chọn thành phố</InputLabel>
                    <Select
                      value={city}
                      label="Chọn thành phố"
                      onChange={(e) => handleChangeCity(e.target.value)}
                    >
                      <MenuItem value="">-- Chọn thành phố --</MenuItem>
                      {Object.keys(dataAddress).map((c) => (
                        <MenuItem key={c} value={c}>
                          {c}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>

                {/* DISTRICT */}
                <Box sx={{ mb: 3 }}>
                  <Typography sx={{ mb: 1, fontWeight: "bold" }}>
                    Quận/Huyện
                  </Typography>
                  <FormControl fullWidth size="small">
                    <InputLabel>Chọn quận/huyện</InputLabel>
                    <Select
                      value={district}
                      label="Chọn quận/huyện"
                      onChange={(e) => setDistrict(e.target.value)}
                      disabled={!city}
                    >
                      <MenuItem value="">-- Chọn quận/huyện --</MenuItem>
                      {districts.map((d, i) => (
                        <MenuItem key={i} value={d}>
                          {d}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>

                {/* FIELD TYPE */}
                <Box sx={{ mb: 3 }}>
                  <Typography sx={{ mb: 1, fontWeight: "bold" }}>Loại Sân</Typography>
                  <FormControl fullWidth size="small">
                    <InputLabel>Chọn loại sân</InputLabel>
                    <Select
                      value={fieldType}
                      label="Chọn loại sân"
                      onChange={(e) => setFieldType(e.target.value)}
                    >
                      <MenuItem value="">-- Chọn --</MenuItem>
                      <MenuItem value="5v5">Sân 5v5</MenuItem>
                      <MenuItem value="7v7">Sân 7v7</MenuItem>
                      <MenuItem value="11v11">Sân 11v11</MenuItem>
                      <MenuItem value="futsal">Sân Futsal</MenuItem>
                    </Select>
                  </FormControl>
                </Box>

                <Button
                  variant="contained"
                  fullWidth
                  sx={{ py: 1.5, fontWeight: "bold" }}
                  onClick={handleSearch}
                >
                  Tìm Kiếm
                </Button>
              </Box>
            )}
          </Box>
        )}

        {/* TOGGLE BUTTON */}
        {isDesktop && !filterOpen && (
          <IconButton
            onClick={() => setFilterOpen(true)}
            sx={{
              position: "fixed",
              left: 16,
              top: "50%",
              transform: "translateY(-50%)",
              backgroundColor: "primary.main",
              color: "white",
              zIndex: 1100,
            }}
          >
            <ChevronRightIcon />
          </IconButton>
        )}

        {/* RESULTS */}
        <Box sx={{ flex: 1, p: 3, overflowY: "auto" }}>
          {!isDesktop && (
            <Box sx={{ mb: 3 }}>
              <Button
                startIcon={<TuneIcon />}
                onClick={() => setFilterOpen(true)}
                sx={{
                  color: "primary.main",
                  fontWeight: "bold",
                  fontSize: "0.95rem",
                  textTransform: "none",
                }}
              >
                Lọc
              </Button>
            </Box>
          )}

          <Typography variant="h6" sx={{ mb: 3, fontWeight: "bold" }}>
            Kết Quả Tìm Kiếm
          </Typography>

          <Grid container spacing={3}>
            {yard.map((item) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    cursor: "pointer",
                    transition: "transform 0.2s",
                    "&:hover": { transform: "scale(1.02)" },
                    maxWidth: 300,
                    margin: "auto",
                  }}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={
                      "https://fpt123.net/uploads/images/san-co-nhan-tao/san-bong-5-nguoi.jpg"
                    }
                    alt={`Sân bóng ${item.ten_san}`}
                  />
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                      {item.ten_san}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ my: 1 }}
                    >
                      {item.dia_chi}, {item.quan_huyen}, {item.thanh_pho}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: "bold", color: "primary.main", mb: 1 }}
                    >
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

        {/* MOBILE DRAWER */}
        <Drawer
          anchor="bottom"
          open={!isDesktop && filterOpen}
          onClose={() => setFilterOpen(false)}
          sx={{
            "& .MuiDrawer-paper": {
              borderRadius: "16px 16px 0 0",
              maxHeight: "90vh",
            },
          }}
        >
          <Box sx={{ p: 3 }}>
            {/* MOBILE TITLE */}
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Lọc Tìm Kiếm
              </Typography>
              <IconButton onClick={() => setFilterOpen(false)}>
                <CloseIcon />
              </IconButton>
            </Box>

            {/* CITY */}
            <Box sx={{ mb: 3 }}>
              <Typography sx={{ mb: 1, fontWeight: "bold" }}>Thành Phố</Typography>
              <FormControl fullWidth size="small">
                <InputLabel>Chọn thành phố</InputLabel>
                <Select
                  value={city}
                  label="Chọn thành phố"
                  onChange={(e) => handleChangeCity(e.target.value)}
                >
                  <MenuItem value="">-- Chọn thành phố --</MenuItem>
                  {Object.keys(dataAddress).map((c) => (
                    <MenuItem key={c} value={c}>
                      {c}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            {/* DISTRICT */}
            <Box sx={{ mb: 3 }}>
              <Typography sx={{ mb: 1, fontWeight: "bold" }}>Quận/Huyện</Typography>
              <FormControl fullWidth size="small">
                <InputLabel>Chọn quận/huyện</InputLabel>
                <Select
                  value={district}
                  label="Chọn quận/huyện"
                  onChange={(e) => setDistrict(e.target.value)}
                  disabled={!city}
                >
                  <MenuItem value="">-- Chọn quận/huyện --</MenuItem>
                  {districts.map((d, i) => (
                    <MenuItem key={i} value={d}>
                      {d}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            {/* FIELD TYPE */}
            <Box sx={{ mb: 3 }}>
              <Typography sx={{ mb: 1, fontWeight: "bold" }}>Loại Sân</Typography>
              <FormControl fullWidth size="small">
                <InputLabel>Chọn loại sân</InputLabel>
                <Select
                  value={fieldType}
                  label="Chọn loại sân"
                  onChange={(e) => setFieldType(e.target.value)}
                >
                  <MenuItem value="">-- Chọn --</MenuItem>
                  <MenuItem value="5v5">Sân 5v5</MenuItem>
                  <MenuItem value="7v7">Sân 7v7</MenuItem>
                  <MenuItem value="11v11">Sân 11v11</MenuItem>
                  <MenuItem value="futsal">Sân Futsal</MenuItem>
                </Select>
              </FormControl>
            </Box>

            {/* Ngày */}
            {/* <Box sx={{ mb: 3 }}>
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
            </Box> */}

            {/* Từ giờ */}
            {/* <Box sx={{ mb: 3 }}>
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
            </Box> */}

            {/* Đến giờ  */}
            {/* <Box sx={{ mb: 4 }}>
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
            </Box> */}
            <Button
              variant="contained"
              fullWidth
              sx={{ py: 1.5, fontWeight: "bold" }}
              onClick={handleSearch}
            >
              Tìm Kiếm
            </Button>
          </Box>
        </Drawer>
      </Box>
    </ThemeProvider>
  );
};

export default BookingPage;
